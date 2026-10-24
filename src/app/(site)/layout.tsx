import Link from "next/link";
import Topo from "@/components/Topo";
import { equipe, FEIRA_URL } from "@/lib/config";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="pular" href="#conteudo">
        Pular para o conteúdo
      </a>
      <Topo />
      <main id="conteudo">{children}</main>
      <footer className="rodape">
        <div className="container rodape-inner">
          <div>
            <strong style={{ color: "var(--texto)" }}>Music Cookies</strong>
            <div>
              Projeto acadêmico — {equipe.curso}. Suporte: {equipe.contatoNome}
              {equipe.contatoEmail && <> · {equipe.contatoEmail}</>}
            </div>
          </div>
          <nav aria-label="Rodapé">
            <Link href="/presente">Presente musical</Link>
            <Link href="/#cardapio">Cardápio</Link>
            <Link href="/proposta">Proposta</Link>
            <a href={FEIRA_URL}>Feira de Empreendedorismo</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
