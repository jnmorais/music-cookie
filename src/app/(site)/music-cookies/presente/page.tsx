import type { Metadata } from "next";
import CriarPresente from "./CriarPresente";

export const metadata: Metadata = {
  title: "Criar presente musical",
  description: "Escolha uma música do Spotify, escreva uma mensagem e gere a etiqueta com QR Code para a embalagem.",
};

export default function PaginaPresente() {
  return (
    <section className="secao">
      <div className="container">
        <div className="nao-imprimir">
          <span className="etiqueta cookie">Music Cookies · Presente musical</span>
          <h1>Crie seu presente musical</h1>
          <p className="suave" style={{ maxWidth: 640 }}>
            Preencha os campos e a etiqueta é gerada na hora. Use o QR Code na embalagem, envie o link por mensagem ou
            imprima as etiquetas.
          </p>
        </div>
        <CriarPresente />
      </div>
    </section>
  );
}
