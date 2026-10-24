import type { Metadata } from "next";
import Link from "next/link";
import { musicCookies } from "@/lib/config";
import Pedido from "./Pedido";

export const metadata: Metadata = {
  title: { absolute: "Music Cookies — Cookies com trilha sonora" },
  description: "Cookies artesanais que viram presente: escolha uma música, escreva uma mensagem e gere o QR Code da embalagem.",
};

const real = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const exemploPresente =
  "/p#eyJhIjoiQW5hIiwiZCI6IkVxdWlwZSBNdXNpYyBDb29raWVzIiwibSI6IkVzdGUgw6kgdW0gZXhlbXBsbyBkZSBwcmVzZW50ZSBtdXNpY2FsLiBBcGVydGUgbyBwbGF5IGUgYXByb3ZlaXRlIG8gY29va2llISIsInMiOiIwNmRHbllJZVhtSGRjaWtkek5ORE1tMiIsImYiOiJ0cmFkaWNpb25hbCIsInQiOiJhbWl6YWRlIn0";

export default function MusicCookies() {
  return (
    <>
      <section className="cabecalho-pagina">
        <div className="container">
          <span className="sobretitulo">Demanda 1A · Music Cookies</span>
          <h1>{musicCookies.slogan}</h1>
          <p className="lead">
            Cada cookie pode virar presente: você escolhe uma música do Spotify, escreve uma mensagem e
            a embalagem ganha um QR Code só seu. Quem recebe escaneia e ouve a música.
          </p>
          <div className="botoes">
            <Link className="botao" href="/presente">
              Criar presente musical
            </Link>
            <Link className="botao secundario" href={exemploPresente}>
              Ver um presente de exemplo
            </Link>
            <a className="botao secundario" href="#cardapio">
              Cardápio e pedidos
            </a>
          </div>
        </div>
      </section>

      <section className="secao">
        <div className="container">
          <span className="sobretitulo">Como funciona</span>
          <ol className="passos">
            <li>
              <strong>Escolha do cookie</strong>
              <p className="suave pequeno">Na banca durante a feira ou por pedido antecipado.</p>
            </li>
            <li>
              <strong>Escolha da música</strong>
              <p className="suave pequeno">Qualquer música, álbum ou playlist do Spotify.</p>
            </li>
            <li>
              <strong>Mensagem personalizada</strong>
              <p className="suave pequeno">Destinatário, remetente e um recado curto.</p>
            </li>
            <li>
              <strong>Etiqueta com QR Code</strong>
              <p className="suave pequeno">Impressa ou enviada por link. Quem recebe escaneia e ouve.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="secao" id="cardapio">
        <div className="container layout-lateral">
          <div>
            <div className="cartao-titulo">
              <h2>Cardápio</h2>
              <span className="selo">Valores de referência</span>
            </div>
            <div className="tabela-wrap">
              <table className="tabela">
                <thead>
                  <tr>
                    <th>Sabor</th>
                    <th>Descrição</th>
                    <th className="num">Preço</th>
                  </tr>
                </thead>
                <tbody>
                  {musicCookies.sabores.map((s) => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{s.nome}</td>
                      <td className="suave">{s.descricao}</td>
                      <td className="num">{real.format(s.preco)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="suave pequeno" style={{ marginTop: 12 }}>
              A etiqueta musical acompanha qualquer sabor, sem custo adicional.
            </p>
          </div>
          <Pedido />
        </div>
      </section>
    </>
  );
}
