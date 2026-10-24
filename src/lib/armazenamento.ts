import { expositores } from "./expositores";

// Persistência dos votos da feira.
// Em produção usa Upstash Redis (integração gratuita da Vercel), via REST.
// Sem as variáveis de ambiente, cai para memória — serve para testar localmente,
// mas os dados se perdem a cada deploy/reinício.

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const usandoRedis = Boolean(REDIS_URL && REDIS_TOKEN);

const PREFIXO = "feira2026";
const MAX_COMENTARIOS = 300;

export type Voto = {
  votante: string;
  expositor: string;
  nota: number;
  comentario: string;
};

export type Comentario = { expositor: string; nota: number; texto: string; em: number };

export type Resultados = {
  totalVotos: number;
  mediaFeira: number | null;
  porExpositor: { slug: string; votos: number }[];
  comentarios?: Comentario[];
};

async function redis(comandos: (string | number)[][]): Promise<unknown[]> {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
    body: JSON.stringify(comandos),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis respondeu ${res.status}`);
  const json = (await res.json()) as { result?: unknown; error?: string }[];
  return json.map((r) => {
    if (r.error) throw new Error(r.error);
    return r.result;
  });
}

type Memoria = {
  votantes: Set<string>;
  votos: Map<string, number>;
  somaNotas: number;
  qtdNotas: number;
  comentarios: Comentario[];
};

const globalComMemoria = globalThis as typeof globalThis & { __feiraMemoria?: Memoria };
const memoria: Memoria = (globalComMemoria.__feiraMemoria ??= {
  votantes: new Set<string>(),
  votos: new Map<string, number>(),
  somaNotas: 0,
  qtdNotas: 0,
  comentarios: [] as Comentario[],
});

export async function registrarVoto(v: Voto): Promise<"ok" | "duplicado"> {
  const comentario: Comentario = { expositor: v.expositor, nota: v.nota, texto: v.comentario, em: Date.now() };

  if (!usandoRedis) {
    if (memoria.votantes.has(v.votante)) return "duplicado";
    memoria.votantes.add(v.votante);
    memoria.votos.set(v.expositor, (memoria.votos.get(v.expositor) ?? 0) + 1);
    memoria.somaNotas += v.nota;
    memoria.qtdNotas += 1;
    if (v.comentario) memoria.comentarios.unshift(comentario);
    memoria.comentarios.length = Math.min(memoria.comentarios.length, MAX_COMENTARIOS);
    return "ok";
  }

  const [novo] = await redis([["SET", `${PREFIXO}:votante:${v.votante}`, "1", "NX", "EX", 60 * 60 * 24 * 30]]);
  if (novo !== "OK") return "duplicado";

  const comandos: (string | number)[][] = [
    ["HINCRBY", `${PREFIXO}:votos`, v.expositor, 1],
    ["HINCRBY", `${PREFIXO}:notas`, "soma", v.nota],
    ["HINCRBY", `${PREFIXO}:notas`, "qtd", 1],
  ];
  if (v.comentario) {
    comandos.push(["LPUSH", `${PREFIXO}:comentarios`, JSON.stringify(comentario)]);
    comandos.push(["LTRIM", `${PREFIXO}:comentarios`, 0, MAX_COMENTARIOS - 1]);
  }
  await redis(comandos);
  return "ok";
}

export async function obterResultados(incluirComentarios: boolean): Promise<Resultados> {
  let votos: Record<string, number> = {};
  let soma = 0;
  let qtd = 0;
  let comentarios: Comentario[] = [];

  if (!usandoRedis) {
    votos = Object.fromEntries(memoria.votos);
    soma = memoria.somaNotas;
    qtd = memoria.qtdNotas;
    comentarios = memoria.comentarios;
  } else {
    const [hVotos, hNotas, lista] = await redis([
      ["HGETALL", `${PREFIXO}:votos`],
      ["HGETALL", `${PREFIXO}:notas`],
      ["LRANGE", `${PREFIXO}:comentarios`, 0, 99],
    ]);
    votos = paresParaObjeto(hVotos as string[]);
    const notas = paresParaObjeto(hNotas as string[]);
    soma = notas.soma ?? 0;
    qtd = notas.qtd ?? 0;
    comentarios = (lista as string[]).map((c) => JSON.parse(c));
  }

  const porExpositor = expositores
    .map((e) => ({ slug: e.slug, votos: votos[e.slug] ?? 0 }))
    .sort((a, b) => b.votos - a.votos);

  return {
    totalVotos: porExpositor.reduce((s, e) => s + e.votos, 0),
    mediaFeira: qtd ? Math.round((soma / qtd) * 10) / 10 : null,
    porExpositor,
    ...(incluirComentarios ? { comentarios } : {}),
  };
}

function paresParaObjeto(pares: string[] | null): Record<string, number> {
  const obj: Record<string, number> = {};
  for (let i = 0; pares && i < pares.length; i += 2) obj[pares[i]] = Number(pares[i + 1]);
  return obj;
}
