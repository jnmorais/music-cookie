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
        <div className="container rodape-inner">
          <div>
            <strong style={{ color: "var(--texto)" }}>Music Cookies · Feira de Empreendedorismo</strong>
            <div>
              Projeto acadêmico — {equipe.curso}. Suporte: {equipe.contatoNome}
              {equipe.contatoEmail && <> · {equipe.contatoEmail}</>}
            </div>
          </div>
          <nav aria-label="Rodapé">
            <Link href="/music-cookies/presente">Presente musical</Link>
            <Link href="/feira">Feira</Link>
            <Link href="/feira/qrcodes">Material impresso</Link>
            <Link href="/proposta">Proposta</Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
