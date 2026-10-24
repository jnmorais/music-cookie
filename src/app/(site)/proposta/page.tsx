import type { Metadata } from "next";
import Link from "next/link";
import BotaoImprimir from "@/components/BotaoImprimir";
import { equipe, feira } from "@/lib/config";

export const metadata: Metadata = {
  title: "Proposta — Demandas 1A e 1B",
  description: "Problema, solução, implementação e nível de entrega das soluções para a Music Cookies e para a Feira.",
};

export default function Proposta() {
  return (
    <section className="secao">
      <div className="container documento" style={{ maxWidth: 820 }}>
        <span className="etiqueta">Atividade 1 · Soluções para as empresas e para a feira</span>
        <h1>Proposta do grupo de {equipe.curso}</h1>
        <p className="suave">
          Uma única atividade com duas demandas complementares. As duas soluções já estão implementadas e publicadas
          neste site.
        </p>
        <div className="botoes nao-imprimir">
          <BotaoImprimir className="botao contorno pequeno" texto="🖨️ Imprimir / salvar PDF" />
        </div>

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
                <Link href="/music-cookies/presente">/music-cookies/presente</Link> pelo celular.
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

        <h2>Demanda 1B — Portal digital da Feira de Empreendedorismo</h2>
        <dl>
          <dt>Para quem</dt>
          <dd>
            Visitantes (alunos, familiares e público externo), grupos expositores e organização da Feira de{" "}
            {feira.dataTexto}, {feira.horario}, no {feira.local.toLowerCase()}.
          </dd>

          <dt>Problema / oportunidade</dt>
          <dd>
            A feira dura duas horas e meia, com pico no intervalo. O visitante não sabe de antemão quem está expondo,
            onde fica cada banca nem o que cada uma vende; os grupos não têm um canal único de divulgação; e a
            organização não tem um jeito rápido de medir a opinião do público.
          </dd>

          <dt>Solução proposta</dt>
          <dd>
            Um <strong>portal web acessado por QR Code</strong>, sem instalar app:
            <ul>
              <li>
                <Link href="/feira">Página da feira</Link> com informações e contagem regressiva;
              </li>
              <li>
                <Link href="/feira">Página de cada expositor</Link>, com resumo e produtos;
              </li>
              <li>
                <Link href="/feira/mapa">Mapa interativo</Link> das bancas, incluindo o ponto de Suporte TI;
              </li>
              <li>
                <Link href="/feira/votar">Votação</Link> na banca favorita + nota da feira + sugestões (1 voto por
                aparelho);
              </li>
              <li>
                <Link href="/feira/resultados">Painel ao vivo</Link> para TV/projetor, com ranking e QR para votar;
              </li>
              <li>
                <Link href="/feira/qrcodes">Folha de QR Codes</Link> pronta para imprimir (entrada, mesas e uma placa
                por banca);
              </li>
              <li>Acessibilidade: texto maior, alto contraste, navegação por teclado e leitores de tela.</li>
            </ul>
          </dd>

          <dt>Como será implementado</dt>
          <dd>
            Mesmo projeto Next.js na Vercel. Os votos são gravados no Upstash Redis (integração gratuita da Vercel) por
            uma API própria que valida os dados e impede voto duplicado do mesmo aparelho. Os comentários ficam visíveis
            apenas para a organização (painel com chave de acesso). No dia: QR Codes impressos na entrada e nas bancas,
            painel em uma TV/notebook e alunos de SI/ES na banca de suporte.
          </dd>

          <dt>Nível de implementação</dt>
          <dd>
            <strong>Versão inicial funcional publicada.</strong> Falta apenas confirmar com a organização a disposição
            real das mesas no pátio (ajustável em um arquivo) e conectar o banco de votos na Vercel.
          </dd>
        </dl>

        <h2>Contato para suporte e continuidade</h2>
        <dl>
          <dt>Responsável</dt>
          <dd>{equipe.contatoNome}</dd>
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
  );
}
