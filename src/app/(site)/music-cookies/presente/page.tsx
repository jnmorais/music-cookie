import type { Metadata } from "next";
import Link from "next/link";
import CriarPresente from "./CriarPresente";

export const metadata: Metadata = {
  title: "Criar presente musical",
  description: "Escolha uma música do Spotify, escreva uma mensagem e gere a etiqueta com QR Code para a embalagem.",
};

export default function PaginaPresente() {
  return (
    <>
      <section className="cabecalho-pagina nao-imprimir">
        <div className="container">
          <nav className="migalhas" aria-label="Navegação estrutural">
            <Link href="/music-cookies">Music Cookies</Link>
            <span aria-hidden>/</span>
            <span>Presente musical</span>
          </nav>
          <h1>Criar presente musical</h1>
          <p className="lead">
            Preencha os campos e a etiqueta aparece na hora. Cole o QR Code na embalagem, mande o link por
            mensagem ou imprima.
          </p>
        </div>
      </section>
      <section className="secao">
        <div className="container">
          <CriarPresente />
        </div>
      </section>
    </>
  );
}
