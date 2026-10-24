import Link from "next/link";
import Topo from "@/components/Topo";
import { equipe } from "@/lib/config";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="pular" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Topo />
      <main id="conteudo">{children}</main>
      <footer className="rodape">
        <div className="container">
          <p>
            Projeto acadêmico de {equipe.curso} — Atividade 1 (Demandas 1A e 1B) integrada à Feira de
            Empreendedorismo. <Link href="/proposta">Ver proposta completa</Link>.
          </p>
          <p>
            Suporte: {equipe.contatoNome}
            {equipe.contatoEmail && <> · {equipe.contatoEmail}</>}
          </p>
        </div>
      </footer>
    </>
  );
}
