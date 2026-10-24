import { registrarVoto } from "@/lib/armazenamento";
import { buscarExpositor } from "@/lib/expositores";

export async function POST(request: Request) {
  let corpo: Record<string, unknown>;
  try {
    corpo = await request.json();
  } catch {
    return Response.json({ erro: "Requisição inválida." }, { status: 400 });
  }

  const votante = String(corpo.votante ?? "");
  const expositor = String(corpo.expositor ?? "");
  const nota = Number(corpo.nota);
  const comentario = String(corpo.comentario ?? "").trim().slice(0, 280);

  if (!/^[a-zA-Z0-9-]{8,64}$/.test(votante)) {
    return Response.json({ erro: "Identificador inválido." }, { status: 400 });
  }
  if (!buscarExpositor(expositor)) {
    return Response.json({ erro: "Escolha uma banca." }, { status: 400 });
  }
  if (!Number.isInteger(nota) || nota < 1 || nota > 5) {
    return Response.json({ erro: "Dê uma nota de 1 a 5 para a feira." }, { status: 400 });
  }

  try {
    const resultado = await registrarVoto({ votante, expositor, nota, comentario });
    if (resultado === "duplicado") {
      return Response.json({ erro: "Este aparelho já votou. Obrigado!" }, { status: 409 });
    }
    return Response.json({ ok: true });
  } catch (e) {
    console.error(e);
    return Response.json({ erro: "Não foi possível registrar agora. Tente de novo." }, { status: 500 });
  }
}
