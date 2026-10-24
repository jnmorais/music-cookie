import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Monograma from "@/components/Monograma";
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
    <>
      <section className="cabecalho-pagina">
        <div className="container">
          <nav className="migalhas" aria-label="Navegação estrutural">
            <Link href="/feira">Feira</Link>
            <span aria-hidden>/</span>
            <span>Expositores</span>
            <span aria-hidden>/</span>
            <span>{e.nome}</span>
          </nav>
          <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
            <Monograma expositor={e} tamanho="grande" />
            <div>
              <span className="sobretitulo" style={{ marginBottom: 4 }}>
                {e.categoria}
              </span>
              <h1 style={{ margin: 0 }}>{e.nome}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container layout-lateral">
          <div className="cartao">
            <h2 style={{ fontSize: "1.1rem" }}>Sobre</h2>
            <p>{e.resumo}</p>
            <h3 style={{ marginTop: 24 }}>Produtos e serviços</h3>
            <ul style={{ margin: 0 }}>
              {e.produtos.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
          <aside className="cartao" style={{ display: "grid", gap: 8 }}>
            <h3 style={{ fontSize: "0.95rem" }}>Ações</h3>
            <Link className="botao largo" href={`/feira/mapa?banca=${e.slug}`}>
              Localizar no mapa
            </Link>
            <Link className="botao secundario largo" href={`/feira/votar?banca=${e.slug}`}>
              Votar nesta banca
            </Link>
            {e.destaqueLink && (
              <Link className="botao secundario largo" href={e.destaqueLink.href}>
                {e.destaqueLink.texto}
              </Link>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
