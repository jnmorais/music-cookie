"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Acessibilidade from "./Acessibilidade";

const links = [
  { href: "/", texto: "Visão geral" },
  { href: "/music-cookies", texto: "Music Cookies" },
  { href: "/feira", texto: "Feira" },
  { href: "/feira/mapa", texto: "Mapa" },
  { href: "/feira/votar", texto: "Votação" },
  { href: "/feira/resultados", texto: "Painel" },
  { href: "/proposta", texto: "Proposta" },
];

export default function Topo() {
  const caminho = usePathname();
  return (
    <header className="topo">
      <div className="container topo-inner">
        <Link href="/" className="marca">
          <span className="marca-simbolo">MC</span>
          <span className="marca-texto">
            <strong>Music Cookies</strong>
            <span>Feira de Empreendedorismo 2026</span>
          </span>
        </Link>
        <nav className="nav" aria-label="Principal">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={caminho === l.href ? "page" : undefined}>
              {l.texto}
            </Link>
          ))}
        </nav>
        <Acessibilidade />
      </div>
    </header>
  );
}
