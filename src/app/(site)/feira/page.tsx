import type { Metadata } from "next";
import Link from "next/link";
import { feira } from "@/lib/config";
import { expositores } from "@/lib/expositores";
import Contagem from "./Contagem";

export const metadata: Metadata = {
  title: "Feira de Empreendedorismo",
  description: "Expositores, mapa das bancas, votação e informações da Feira de Empreendedorismo de 03/11.",
};

export default function Feira() {
  return (
    <>
      <section className="hero hero-feira">
        <div className="container">
          <span className="etiqueta">{feira.dataTexto} · {feira.horario}</span>
          <h1>{feira.nome}</h1>
          <p className="lead">
            {feira.local}. Descubra os empreendimentos dos alunos, encontre as bancas no mapa e vote na sua favorita.
          </p>
          <Contagem />
          <div className="botoes" style={{ marginTop: 20 }}>
            <Link className="botao feira" href="/feira/mapa">
              🗺️ Mapa das bancas
            </Link>
            <Link className="botao verde" href="/feira/votar">
              ⭐ Votar na favorita
            </Link>
            <Link className="botao contorno" href="/feira/resultados">
              📊 Painel ao vivo
            </Link>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <h2>Expositores</h2>
          <div className="grade">
            {expositores.map((e) => (
              <Link
                key={e.slug}
                href={`/feira/expositores/${e.slug}`}
                className="cartao expositor"
                style={{ "--cor": e.cor } as React.CSSProperties}
              >
                <span className="icone" aria-hidden>
                  {e.emoji}
                </span>
                <strong>{e.nome}</strong>
                <span className="suave pequeno">{e.categoria}</span>
                <span className="pequeno">{e.resumo}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container grade-2">
          <div className="cartao">
            <h2>Informações</h2>
            <ul>
              <li>
                <strong>Quando:</strong> {feira.dataTexto}, {feira.horario}
              </li>
              <li>
                <strong>Onde:</strong> {feira.local}
              </li>
              <li>{feira.destaque} Chegue um pouco antes para aproveitar com calma.</li>
              <li>Os grupos vendem nas bancas; confira formas de pagamento em cada uma.</li>
            </ul>
          </div>
          <div className="cartao">
            <h2>Precisa de ajuda?</h2>
            <p>
              Procure a banca <strong>Suporte TI (SI/ES)</strong> no mapa. Os alunos de Sistemas de Informação e
              Engenharia de Software estão na feira para ajudar visitantes e expositores com os QR Codes, a votação e o
              portal.
            </p>
            <p className="suave pequeno">
              Acessibilidade: use os botões <strong>A+</strong> (texto maior) e <strong>◐</strong> (alto contraste) no
              topo da página.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
