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
          <h1>Tecnologia para a Music Cookies e para a nossa Feira de Empreendedorismo</h1>
          <p className="lead">
            Duas soluções já funcionando para o dia 03/11: um jeito de transformar cada cookie da Music Cookies em
            presente, com música e QR Code na embalagem, e um portal para quem vai visitar, expor ou organizar a feira.
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
              <div className="rotulo">Soluções no ar</div>
            </div>
            <div>
              <div className="valor">{expositores.length}</div>
              <div className="rotulo">Empreendimentos da feira</div>
            </div>
            <div>
              <div className="valor">03/11</div>
              <div className="rotulo">Data do evento · {feira.horario}</div>
            </div>
            <div>
              <div className="valor">0</div>
              <div className="rotulo">Apps para instalar — é tudo pelo navegador</div>
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
              <span className="selo sucesso">No ar</span>
            </div>
            <h2>Presente musical com QR Code</h2>
            <p className="suave">
              A ideia da Music Cookies é o cookie como presente com trilha sonora. A gente tornou isso real: a
              etiqueta com a música sai em segundos, direto da banca.
            </p>
            <dl className="dados" style={{ marginBottom: 24 }}>
              <dt>Para quem</dt>
              <dd>Music Cookies (grupo de Gestão)</dd>
              <dt>O problema</dt>
              <dd>Levar a música até quem recebe o presente, de forma personalizada</dd>
              <dt>O que fizemos</dt>
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
              <span className="selo sucesso">No ar</span>
            </div>
            <h2>Portal da Feira de Empreendedorismo</h2>
            <p className="suave">
              Tudo da feira num QR Code: quem está expondo, onde fica cada banca, votação na favorita e
              um painel ao vivo com o resultado.
            </p>
            <dl className="dados" style={{ marginBottom: 24 }}>
              <dt>Para quem</dt>
              <dd>Visitantes, expositores e organização</dd>
              <dt>O problema</dt>
              <dd>Informação espalhada e nenhum jeito de saber o que o público achou</dd>
              <dt>O que fizemos</dt>
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
              <h3 style={{ marginBottom: 4 }}>Proposta da atividade</h3>
              <p className="suave pequeno" style={{ margin: 0 }}>
                O que fizemos, para quem, como funciona e como falar com a gente.
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
