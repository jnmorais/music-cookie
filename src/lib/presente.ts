// Presente musical: os dados ficam codificados no próprio link (após o "#"),
// então não é preciso banco de dados e o conteúdo não passa pelo servidor.

export type TipoSpotify = "track" | "album" | "playlist" | "episode" | "show" | "artist";

export type Presente = {
  para: string;
  de: string;
  msg: string;
  sp: { t: TipoSpotify; id: string } | null;
  sabor: string;
  tema: Tema;
};

export const temas = {
  amor: { nome: "Amor", fundo: "#f6e9e9", destaque: "#9f1239" },
  amizade: { nome: "Amizade", fundo: "#f5ede3", destaque: "#8a5a2b" },
  aniversario: { nome: "Aniversário", fundo: "#e8edf5", destaque: "#1e3a8a" },
  obrigado: { nome: "Agradecimento", fundo: "#e7f0ea", destaque: "#166534" },
} as const;

export type Tema = keyof typeof temas;

export const LIMITE_MSG = 280;

const TIPOS: TipoSpotify[] = ["track", "album", "playlist", "episode", "show", "artist"];

/** Aceita links open.spotify.com (inclusive /intl-pt/) e URIs spotify:tipo:id. */
export function parseSpotify(entrada: string): Presente["sp"] {
  const texto = entrada.trim();
  const uri = texto.match(/^spotify:(track|album|playlist|episode|show|artist):([A-Za-z0-9]{10,40})$/);
  if (uri) return { t: uri[1] as TipoSpotify, id: uri[2] };
  const url = texto.match(
    /open\.spotify\.com\/(?:intl-[a-z-]+\/)?(?:embed\/)?(track|album|playlist|episode|show|artist)\/([A-Za-z0-9]{10,40})/,
  );
  if (url) return { t: url[1] as TipoSpotify, id: url[2] };
  return null;
}

export function linkCurtoSpotify(entrada: string) {
  return /^https?:\/\/(spotify\.link|spotify\.app\.link)\//i.test(entrada.trim());
}

export function urlEmbed(sp: NonNullable<Presente["sp"]>) {
  return `https://open.spotify.com/embed/${sp.t}/${sp.id}?utm_source=generator`;
}

export function urlSpotify(sp: NonNullable<Presente["sp"]>) {
  return `https://open.spotify.com/${sp.t}/${sp.id}`;
}

function base64UrlEncode(texto: string) {
  const bytes = new TextEncoder().encode(texto);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(codigo: string) {
  const b64 = codigo.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64 + "===".slice((b64.length + 3) % 4));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

// Chaves curtas deixam o link (e portanto o QR Code) menor.
export function codificarPresente(p: Presente) {
  const compacto = {
    a: p.para,
    d: p.de,
    m: p.msg,
    s: p.sp ? `${TIPOS.indexOf(p.sp.t)}${p.sp.id}` : "",
    f: p.sabor,
    t: p.tema,
  };
  return base64UrlEncode(JSON.stringify(compacto));
}

export function decodificarPresente(codigo: string): Presente | null {
  try {
    const c = JSON.parse(base64UrlDecode(codigo));
    const tipo = c.s ? TIPOS[Number(c.s[0])] : undefined;
    return {
      para: String(c.a ?? "").slice(0, 40),
      de: String(c.d ?? "").slice(0, 40),
      msg: String(c.m ?? "").slice(0, LIMITE_MSG),
      sp: tipo ? { t: tipo, id: String(c.s).slice(1) } : null,
      sabor: String(c.f ?? ""),
      tema: c.t in temas ? c.t : "amor",
    };
  } catch {
    return null;
  }
}

export function urlPresente(origem: string, p: Presente) {
  return `${origem}/p#${codificarPresente(p)}`;
}
