import { CalendarDays, Clock, LifeBuoy, MapPin } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import Monograma from "@/components/Monograma";
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
      <section className="cabecalho-pagina">
        <div className="container layout-lateral" style={{ alignItems: "center" }}>
          <div>
            <span className="sobretitulo">Demanda 1B · Portal da feira</span>
            <h1>{feira.nome}</h1>
            <p className="lead">
              Descubra o que os colegas estão empreendendo, ache as bancas no pátio e vote na sua favorita.
            </p>
            <div className="botoes">
              <Link className="botao" href="/feira/mapa">
                Mapa das bancas
              </Link>
              <Link className="botao secundario" href="/feira/votar">
                Votar
              </Link>
              <Link className="botao secundario" href="/feira/resultados">
                Painel ao vivo
              </Link>
            </div>
          </div>
          <div className="cartao" style={{ padding: 20 }}>
            <dl className="dados" style={{ gridTemplateColumns: "24px 1fr", alignItems: "center" }}>
              <dt>
                <CalendarDays size={18} aria-label="Data" />
              </dt>
              <dd>{feira.dataTexto}</dd>
              <dt>
                <Clock size={18} aria-label="Horário" />
              </dt>
              <dd>{feira.horario}</dd>
              <dt>
                <MapPin size={18} aria-label="Local" />
              </dt>
              <dd>{feira.local}</dd>
            </dl>
            <div style={{ borderTop: "1px solid var(--borda)", marginTop: 16, paddingTop: 16 }}>
              <Contagem />
            </div>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <div className="cartao-titulo">
            <h2>Expositores</h2>
            <span className="selo">{expositores.length} empreendimentos</span>
          </div>
          <div className="grade">
            {expositores.map((e) => (
              <Link key={e.slug} href={`/feira/expositores/${e.slug}`} className="cartao expositor">
                <div className="expositor-topo">
                  <Monograma expositor={e} />
                  <div>
                    <strong>{e.nome}</strong>
                    <span className="suave pequeno">{e.categoria}</span>
                  </div>
                </div>
                <span className="pequeno suave">{e.resumo}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container grade-2">
          <div className="cartao">
            <h3>Dicas para aproveitar</h3>
            <ul className="pequeno" style={{ margin: 0 }}>
              <li>{feira.destaque} Chegue um pouco antes para circular com calma.</li>
              <li>As vendas são direto nas bancas — confira as formas de pagamento de cada uma.</li>
              <li>No fim da visita, não esquece de votar na sua banca favorita.</li>
            </ul>
          </div>
          <div className="cartao">
            <div className="icone-caixa">
              <LifeBuoy size={20} aria-hidden />
            </div>
            <h3>Precisa de ajuda?</h3>
            <p className="pequeno suave" style={{ margin: 0 }}>
              O pessoal de SI e Engenharia de Software fica no ponto <strong>Suporte TI</strong>{" "}
              (está no mapa). No topo da página dá para aumentar o texto e ativar o alto contraste.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
