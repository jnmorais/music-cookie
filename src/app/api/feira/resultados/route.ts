import { connection } from "next/server";
import { obterResultados, usandoRedis } from "@/lib/armazenamento";

export async function GET(request: Request) {
  await connection();
  const chave = new URL(request.url).searchParams.get("chave");
  const admin = Boolean(process.env.FEIRA_ADMIN_KEY) && chave === process.env.FEIRA_ADMIN_KEY;

  try {
    const resultados = await obterResultados(admin);
    return Response.json(
      { ...resultados, admin, persistente: usandoRedis },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (e) {
    console.error(e);
    return Response.json({ erro: "Falha ao carregar resultados." }, { status: 500 });
  }
}
