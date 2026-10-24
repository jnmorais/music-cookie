import { ArrowRight, Gift, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { feira } from "@/lib/config";
import { expositores } from "@/lib/expositores";

const exemploPresente =
  "/p#eyJhIjoiQW5hIiwiZCI6IkVxdWlwZSBNdXNpYyBDb29raWVzIiwibSI6IkVzdGUgw6kgdW0gZXhlbXBsbyBkZSBwcmVzZW50ZSBtdXNpY2FsLiBBcGVydGUgbyBwbGF5IGUgYXByb3ZlaXRlIG8gY29va2llISIsInMiOiIwNmRHbllJZVhtSGRjaWtkek5ORE1tMiIsImYiOiJ0cmFkaWNpb25hbCIsInQiOiJhbWl6YWRlIn0";

export default function Inicio() {
  return (
    <>
      <section className="cabecalho-pagina">
        <div className="container">
          <span className="sobretitulo">Atividade 1 · Sistemas de Informação e Engenharia de Software</span>
          <h1>Soluções digitais para a Music Cookies e para a Feira de Empreendedorismo</h1>
          <p className="lead">
            Duas soluções aplicadas, publicadas e prontas para uso no evento: um sistema de presentes musicais com QR
            Code para as embalagens da Music Cookies e um portal digital para visitantes, expositores e organização da
            feira.
          </p>
          <div className="botoes">
            <Link className="botao" href="/music-cookies/presente">
              Criar presente musical
            </Link>
            <Link className="botao secundario" href="/feira">
              Acessar portal da feira
            </Link>
            <Link className="botao secundario" href="/proposta">
              Ler a proposta
            </Link>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <div className="estatisticas">
            <div>
              <div className="valor">2</div>
              <div className="rotulo">Soluções entregues</div>
            </div>
            <div>
              <div className="valor">{expositores.length}</div>
              <div className="rotulo">Expositores no portal</div>
            </div>
            <div>
              <div className="valor">03/11</div>
              <div className="rotulo">Data do evento · {feira.horario}</div>
            </div>
            <div>
              <div className="valor">R$ 0</div>
              <div className="rotulo">Custo de infraestrutura</div>
            </div>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container grade-2">
          <article className="cartao">
            <div className="icone-caixa">
              <Gift size={20} aria-hidden />
            </div>
            <div className="botoes" style={{ marginBottom: 10 }}>
              <span className="selo">Demanda 1A</span>
              <span className="selo sucesso">MVP publicado</span>
            </div>
            <h2>Presente musical com QR Code</h2>
            <p className="suave">
              Transforma a proposta de valor da Music Cookies — o cookie como presente com trilha sonora — em uma
              experiência real, gerada em segundos no ponto de venda.
            </p>
            <dl className="dados" style={{ marginBottom: 24 }}>
              <dt>Cliente</dt>
              <dd>Music Cookies (grupo de Gestão)</dd>
              <dt>Problema</dt>
              <dd>Levar a música até quem recebe o presente, de forma personalizada</dd>
              <dt>Entrega</dt>
              <dd>Gerador de etiquetas, página do presente, cardápio e pedidos</dd>
            </dl>
            <div className="botoes">
              <Link className="botao pequeno" href="/music-cookies">
                Ver solução
              </Link>
              <Link className="botao secundario pequeno" href={exemploPresente}>
                Ver presente de exemplo
              </Link>
            </div>
          </article>

          <article className="cartao">
            <div className="icone-caixa">
              <LayoutGrid size={20} aria-hidden />
            </div>
            <div className="botoes" style={{ marginBottom: 10 }}>
              <span className="selo">Demanda 1B</span>
              <span className="selo sucesso">MVP publicado</span>
            </div>
            <h2>Portal da Feira de Empreendedorismo</h2>
            <p className="suave">
              Ponto único de informação acessado por QR Code: quem expõe, onde fica cada banca, votação do público e
              painel de acompanhamento em tempo real.
            </p>
            <dl className="dados" style={{ marginBottom: 24 }}>
              <dt>Público</dt>
              <dd>Visitantes, expositores e organização</dd>
              <dt>Problema</dt>
              <dd>Informação dispersa e nenhuma medição da opinião do público</dd>
              <dt>Entrega</dt>
              <dd>Expositores, mapa, votação, painel, QR Codes e acessibilidade</dd>
            </dl>
            <div className="botoes">
              <Link className="botao pequeno" href="/feira">
                Ver solução
              </Link>
              <Link className="botao secundario pequeno" href="/feira/qrcodes">
                Material impresso
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <div className="cartao" style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
            <div>
              <h3 style={{ marginBottom: 4 }}>Documentação da entrega</h3>
              <p className="suave pequeno" style={{ margin: 0 }}>
                Problema, solução, forma de implementação, nível de entrega e contato para suporte.
              </p>
            </div>
            <Link className="link-seta" href="/proposta">
              Abrir proposta <ArrowRight size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
