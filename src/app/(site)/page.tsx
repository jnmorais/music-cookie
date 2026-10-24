import Link from "next/link";
import { feira } from "@/lib/config";

export default function Inicio() {
  return (
    <>
      <section className="hero hero-cookie">
        <div className="container">
          <span className="etiqueta">Atividade 1 · SI / Engenharia de Software</span>
          <h1>Tecnologia para a Music Cookies e para a Feira de Empreendedorismo</h1>
          <p className="lead">
            Duas soluções aplicadas e funcionando: um gerador de presentes musicais com QR Code para as embalagens da
            Music Cookies (Demanda 1A) e um portal digital da feira com mapa, expositores, votação e painel ao vivo
            (Demanda 1B).
          </p>
          <div className="botoes">
            <Link className="botao verde" href="/music-cookies/presente">
              🎵 Criar presente musical
            </Link>
            <Link className="botao feira" href="/feira">
              🗺️ Portal da Feira
            </Link>
            <Link className="botao contorno" href="/proposta">
              Ler a proposta
            </Link>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container grade-2">
          <article className="cartao">
            <span className="etiqueta cookie">Demanda 1A</span>
            <h2>Music Cookies: o cookie que vem com trilha sonora</h2>
            <p>
              A proposta de valor do grupo é transformar o cookie em presente com um link do Spotify na embalagem. Nós
              tornamos isso real: quem compra escolhe a música, escreve uma mensagem e recebe na hora uma etiqueta com
              QR Code. Quem ganha escaneia e abre uma página de presente com a mensagem e a música tocando.
            </p>
            <ul>
              <li>Sem cadastro, sem app e sem banco de dados</li>
              <li>Etiqueta pronta para imprimir ou mostrar no celular</li>
              <li>Cardápio digital e pedido pelo WhatsApp</li>
            </ul>
            <div className="botoes">
              <Link className="botao verde pequeno" href="/music-cookies">
                Ver a loja
              </Link>
              <Link className="botao contorno pequeno" href="/p#eyJhIjoiVm9jw6oiLCJkIjoiTXVzaWMgQ29va2llcyIsIm0iOiJFc3RlIMOpIHVtIGV4ZW1wbG8gZGUgcHJlc2VudGUgbXVzaWNhbC4gQXBlcnRlIG8gcGxheSBlIGFwcm92ZWl0ZSBvIGNvb2tpZSEiLCJzIjoiMDZkR25ZSWVYbUhkY2lrZHpOTkRNbTIiLCJmIjoidHJhZGljaW9uYWwiLCJ0IjoiYW1pemFkZSJ9">
                Ver um presente de exemplo
              </Link>
            </div>
          </article>

          <article className="cartao">
            <span className="etiqueta">Demanda 1B</span>
            <h2>Portal da Feira de Empreendedorismo</h2>
            <p>
              {feira.dataTexto}, {feira.horario}, no {feira.local.toLowerCase()}. Um único QR Code na entrada leva o
              visitante a tudo o que precisa: quem está expondo, onde fica cada banca, como votar na favorita e como
              pedir ajuda.
            </p>
            <ul>
              <li>Mapa interativo das bancas</li>
              <li>Página e QR Code para cada expositor</li>
              <li>Votação + avaliação da feira e painel ao vivo para telão</li>
              <li>Recursos de acessibilidade (texto maior e alto contraste)</li>
            </ul>
            <div className="botoes">
              <Link className="botao feira pequeno" href="/feira">
                Abrir o portal
              </Link>
              <Link className="botao contorno pequeno" href="/feira/qrcodes">
                QR Codes para imprimir
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
