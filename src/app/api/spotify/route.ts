import { linkCurtoSpotify, parseSpotify, urlSpotify } from "@/lib/presente";

// Resolve links curtos (spotify.link) e busca título/capa via oEmbed público do Spotify.
export async function GET(request: Request) {
  const entrada = new URL(request.url).searchParams.get("url") ?? "";
  let sp = parseSpotify(entrada);

  if (!sp && linkCurtoSpotify(entrada)) {
    try {
      const res = await fetch(entrada.trim(), { redirect: "follow", cache: "no-store" });
      sp = parseSpotify(res.url) ?? parseSpotify(await res.text());
    } catch {
      // segue com sp = null
    }
  }

  if (!sp) {
    return Response.json({ erro: "Link do Spotify não reconhecido." }, { status: 400 });
  }

  let titulo: string | null = null;
  let capa: string | null = null;
  try {
    const res = await fetch(`https://open.spotify.com/oembed?url=${encodeURIComponent(urlSpotify(sp))}`, {
      cache: "no-store",
    });
    if (res.ok) {
      const dados = await res.json();
      titulo = dados.title ?? null;
      capa = dados.thumbnail_url ?? null;
    }
  } catch {
    // metadados são opcionais
  }

  return Response.json({ sp, titulo, capa });
}
