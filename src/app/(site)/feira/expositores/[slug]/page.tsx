import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarExpositor, expositores } from "@/lib/expositores";

export function generateStaticParams() {
  return expositores.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/feira/expositores/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const e = buscarExpositor(slug);
  return e ? { title: e.nome, description: e.resumo } : {};
}

export default async function PaginaExpositor({ params }: PageProps<"/feira/expositores/[slug]">) {
  const { slug } = await params;
  const e = buscarExpositor(slug);
  if (!e) notFound();

  return (
    <section className="secao">
      <div className="container" style={{ maxWidth: 720 }}>
        <Link href="/feira" className="suave pequeno">
          ← Todos os expositores
        </Link>
        <div className="cartao expositor" style={{ "--cor": e.cor, marginTop: 12 } as React.CSSProperties}>
          <span style={{ fontSize: "3.5rem" }} aria-hidden>
            {e.emoji}
          </span>
          <span className="etiqueta" style={{ alignSelf: "flex-start" }}>
            {e.categoria}
          </span>
          <h1>{e.nome}</h1>
          <p style={{ fontSize: "1.1rem" }}>{e.resumo}</p>
          <h2 style={{ fontSize: "1.1rem" }}>O que você encontra</h2>
          <ul>
            {e.produtos.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="botoes">
            <Link className="botao feira" href={`/feira/mapa?banca=${e.slug}`}>
              📍 Ver no mapa
            </Link>
            <Link className="botao verde" href={`/feira/votar?banca=${e.slug}`}>
              ⭐ Votar nesta banca
            </Link>
            {e.destaqueLink && (
              <Link className="botao contorno" href={e.destaqueLink.href}>
                {e.destaqueLink.texto}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
