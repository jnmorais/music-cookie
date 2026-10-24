"use client";

import { Gift } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { musicCookies } from "@/lib/config";
import { decodificarPresente, temas, urlEmbed, urlSpotify, type Presente } from "@/lib/presente";

export default function AbrirPresente() {
  const [presente, setPresente] = useState<Presente | null | undefined>(undefined);
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    const ler = () => setPresente(decodificarPresente(window.location.hash.slice(1)));
    ler();
    window.addEventListener("hashchange", ler);
    return () => window.removeEventListener("hashchange", ler);
  }, []);

  if (presente === undefined) return <div className="presente-pagina" />;

  if (!presente) {
    return (
      <div className="presente-pagina">
        <div className="presente-cartao">
          <div className="presente-corpo">
            <h1 style={{ fontSize: "1.35rem" }}>Presente não encontrado</h1>
            <p style={{ color: "#5b6472" }}>O link parece incompleto. Escaneie o QR Code novamente.</p>
            <Link className="botao" href="/music-cookies">
              Conhecer a Music Cookies
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const t = temas[presente.tema];
  const sabor = musicCookies.sabores.find((s) => s.id === presente.sabor);

  return (
    <div className="presente-pagina" style={{ background: t.fundo }}>
      {!aberto ? (
        <button className="presente-caixa" onClick={() => setAberto(true)} autoFocus>
          <span className="presente-icone" style={{ background: t.destaque }} aria-hidden>
            <Gift size={32} strokeWidth={1.75} />
          </span>
          <span style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: t.destaque }}>
            {musicCookies.nome}
          </span>
          <span style={{ fontSize: "1.35rem", fontWeight: 650, lineHeight: 1.3 }}>
            {presente.para ? `${presente.para}, você` : "Você"} recebeu um presente
          </span>
          <span className="botao" style={{ background: t.destaque, borderColor: t.destaque, marginTop: 8 }}>
            Abrir presente
          </span>
        </button>
      ) : (
        <article className="presente-cartao">
          <div className="presente-faixa" style={{ background: t.destaque }} />
          <div className="presente-corpo">
            <div style={{ fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700, color: t.destaque }}>
              {musicCookies.nome} · {t.nome}
            </div>
            <h1 style={{ fontSize: "1.6rem", margin: "10px 0 0" }}>Para {presente.para || "você"}</h1>
            {presente.msg && <p className="presente-msg">“{presente.msg}”</p>}
            {presente.de && <p style={{ fontWeight: 600, color: "#5b6472" }}>— {presente.de}</p>}

            {presente.sp && (
              <div style={{ marginTop: 24 }}>
                <iframe
                  className="spotify-embed"
                  src={urlEmbed(presente.sp)}
                  height={presente.sp.t === "track" || presente.sp.t === "episode" ? 152 : 352}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Música do presente no Spotify"
                />
                <p className="pequeno" style={{ marginTop: 10 }}>
                  <a href={urlSpotify(presente.sp)} target="_blank" rel="noreferrer" style={{ color: "#5b6472" }}>
                    Abrir no aplicativo do Spotify
                  </a>
                </p>
              </div>
            )}

            {sabor && (
              <p className="pequeno" style={{ color: "#5b6472" }}>
                Acompanha: cookie <strong>{sabor.nome}</strong>
              </p>
            )}
          </div>
          <div style={{ borderTop: "1px solid #ece8e3", padding: "18px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <span className="pequeno" style={{ color: "#5b6472" }}>{musicCookies.slogan}</span>
            <div className="botoes">
              <Link className="botao pequeno" href="/music-cookies/presente">
                Enviar um presente
              </Link>
              {musicCookies.instagram && (
                <a className="botao secundario pequeno" href={`https://instagram.com/${musicCookies.instagram}`} target="_blank" rel="noreferrer">
                  @{musicCookies.instagram}
                </a>
              )}
            </div>
          </div>
        </article>
      )}
    </div>
  );
}
