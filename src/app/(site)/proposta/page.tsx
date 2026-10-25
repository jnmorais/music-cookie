import type { Metadata } from "next";
import Link from "next/link";
import BotaoImprimir from "@/components/BotaoImprimir";
import { equipe, FEIRA_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "Proposta — Demanda 1A",
  description: "Problema, solução, implementação e nível de entrega do presente musical da Music Cookies.",
};

export default function Proposta() {
  return (
    <>
    <section className="cabecalho-pagina">
      <div className="container" style={{ maxWidth: 880 }}>
        <span className="sobretitulo">Atividade 1 · Demanda 1A — Solução para uma empresa</span>
        <h1>Proposta técnica</h1>
        <p className="lead">
          Grupo de {equipe.curso}. A solução está implementada e publicada neste site. A Demanda 1B (portal da
          feira) está em um projeto separado: <a href={FEIRA_URL}>{FEIRA_URL.replace(/^https?:\/\//, "")}</a>.
        </p>
        <div className="botoes nao-imprimir">
          <BotaoImprimir className="botao secundario pequeno" texto="Imprimir / salvar em PDF" />
        </div>
      </div>
    </section>
    <section className="secao">
      <div className="container documento" style={{ maxWidth: 880 }}>

        <h2>Demanda 1A — Music Cookies: Presente Musical com QR Code</h2>
        <dl>
          <dt>Empresa atendida</dt>
          <dd>
            <strong>Music Cookies</strong> — venda de cookies com proposta de valor associada a presentes, com um link
            do Spotify na embalagem.
          </dd>

          <dt>Problema / oportunidade</dt>
          <dd>
            A ideia de “cookie com música” depende de levar o link do Spotify até quem recebe o presente. Um link
            impresso não é clicável, um QR Code genérico deixa todas as embalagens iguais e criar um QR Code
            personalizado à mão para cada venda, no ritmo da feira, é inviável. Sem isso, o diferencial do produto (ser
            presenteável e ter uma experiência musical) se perde e o cookie vira só mais um doce.
          </dd>

          <dt>Solução proposta</dt>
          <dd>
            Um gerador web de <strong>presentes musicais</strong>: quem compra informa para quem é, de quem é, uma
            mensagem, a ocasião e cola o link de uma música, álbum ou playlist do Spotify. O sistema gera na hora uma
            <strong> etiqueta com QR Code exclusivo</strong> para a embalagem. Quem recebe escaneia e abre uma página
            de presente animada, com a mensagem e o player do Spotify tocando a música escolhida. Complementos: página
            da marca com cardápio, montagem de pedido enviado pelo WhatsApp e link para retribuir o presente
            (divulgação boca a boca).
          </dd>

          <dt>Como funciona</dt>
          <dd>
            <ol>
              <li>
                O cliente (ou o vendedor, na banca) abre{" "}
                <Link href="/presente">/presente</Link> pelo celular.
              </li>
              <li>Preenche os campos; o link do Spotify é validado e o título/capa da música aparecem.</li>
              <li>
                A etiqueta é gerada na hora e pode ser impressa (A4, várias por folha), baixada como PNG ou enviada
                como link por WhatsApp.
              </li>
              <li>
                Quem recebe escaneia o QR e abre <code>/p</code>: toca para “abrir o presente” e ouve a música.
              </li>
            </ol>
          </dd>

          <dt>Implementação</dt>
          <dd>
            Aplicação Next.js (React + TypeScript) hospedada na Vercel. Os dados do presente ficam{" "}
            <strong>codificados no próprio link</strong> (após o “#”), então não há banco de dados, cadastro nem custo
            de servidor, e a mensagem não é armazenada por nós. O QR Code é gerado no navegador (biblioteca{" "}
            <code>qrcode</code>). Os metadados da música vêm do oEmbed público do Spotify e o player é o embed oficial.
            Para a banca, basta um celular com internet e, opcionalmente, etiquetas impressas com antecedência para
            pedidos feitos antes da feira.
          </dd>

          <dt>Nível de implementação</dt>
          <dd>
            <strong>Versão inicial funcional (MVP) publicada.</strong> Já é possível criar, imprimir, enviar e abrir
            presentes reais. Próximos passos possíveis: personalizar cores/identidade com o grupo, confirmar sabores e
            preços, adicionar número de WhatsApp e Instagram oficiais e testar a impressão no tamanho da embalagem.
          </dd>
        </dl>

        <h2>Contato para suporte e continuidade</h2>
        <dl>
          {equipe.contatoEmail && (
            <>
              <dt>E-mail</dt>
              <dd>{equipe.contatoEmail}</dd>
            </>
          )}
          {equipe.contatoWhatsapp && (
            <>
              <dt>WhatsApp</dt>
              <dd>
                <a href={`https://wa.me/${equipe.contatoWhatsapp}`}>+{equipe.contatoWhatsapp}</a>
              </dd>
            </>
          )}
          <dt>Integrantes</dt>
          <dd>{equipe.integrantes.join(", ")}</dd>
        </dl>
      </div>
    </section>
    </>
  );
}
