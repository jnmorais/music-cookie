import type { Metadata } from "next";
import Link from "next/link";
import { musicCookies } from "@/lib/config";
import Pedido from "./Pedido";

export const metadata: Metadata = {
  title: "Music Cookies",
  description: "Cookies artesanais que viram presente: escolha uma música, escreva uma mensagem e gere o QR Code da embalagem.",
};

const real = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function MusicCookies() {
  return (
    <>
      <section className="hero hero-cookie">
        <div className="container">
          <span className="etiqueta cookie">Music Cookies</span>
          <h1>{musicCookies.slogan}</h1>
          <p className="lead">
            Cada cookie pode virar presente: você escolhe uma música do Spotify, escreve uma mensagem e a embalagem
            ganha um QR Code. Quem recebe escaneia, abre o presente e ouve a música que você escolheu.
          </p>
          <div className="botoes">
            <Link className="botao verde" href="/music-cookies/presente">
              🎁 Criar meu presente musical
            </Link>
            <a className="botao contorno" href="#cardapio">
              Ver sabores
            </a>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <h2>Como funciona</h2>
          <ol className="passos">
            <li>
              <strong>Escolha o cookie</strong>
              <p className="suave pequeno">Na banca ou pelo pedido online.</p>
            </li>
            <li>
              <strong>Escolha a música</strong>
              <p className="suave pequeno">Cole o link de qualquer música, álbum ou playlist do Spotify.</p>
            </li>
            <li>
              <strong>Escreva a mensagem</strong>
              <p className="suave pequeno">Para quem é, de quem é e o recado.</p>
            </li>
            <li>
              <strong>Receba o QR Code</strong>
              <p className="suave pequeno">A etiqueta vai na embalagem. Quem ganha escaneia e ouve.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="secao" id="cardapio">
        <div className="container">
          <h2>Sabores</h2>
          <div className="grade">
            {musicCookies.sabores.map((s) => (
              <article key={s.id} className="cartao sabor">
                <div className="bolinha" style={{ background: s.cor }} aria-hidden />
                <h3>{s.nome}</h3>
                <p className="suave pequeno">{s.descricao}</p>
                <span className="preco">{real.format(s.preco)}</span>
              </article>
            ))}
          </div>
          <p className="suave pequeno" style={{ marginTop: 12 }}>
            A etiqueta musical acompanha qualquer sabor, sem custo adicional.
          </p>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <Pedido />
        </div>
      </section>
    </>
  );
}
