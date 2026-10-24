"use client";

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
          <div style={{ fontSize: "3rem" }}>🍪</div>
          <h1 style={{ fontSize: "1.5rem" }}>Presente não encontrado</h1>
          <p>O link parece incompleto. Tente escanear o QR Code de novo.</p>
          <Link className="botao verde" href="/music-cookies">
            Conhecer a Music Cookies
          </Link>
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
          <span className="caixa" aria-hidden>
            🎁
          </span>
          <span style={{ fontSize: "1.4rem", fontWeight: 800 }}>{presente.para ? `${presente.para}, ` : ""}você recebeu um presente!</span>
          <span className="botao" style={{ background: t.destaque }}>
            Toque para abrir
          </span>
        </button>
      ) : (
        <article className="presente-cartao">
          <div style={{ fontSize: "2.5rem" }} aria-hidden>
            {t.emoji}🍪🎵
          </div>
          <h1 style={{ fontSize: "1.6rem", color: t.destaque }}>Para {presente.para || "você"}</h1>
          {presente.msg && <p className="presente-msg">“{presente.msg}”</p>}
          {presente.de && <p style={{ fontWeight: 700 }}>— {presente.de}</p>}

          {presente.sp && (
            <>
              <iframe
                className="spotify-embed"
                src={urlEmbed(presente.sp)}
                height={presente.sp.t === "track" || presente.sp.t === "episode" ? 152 : 352}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                title="Música do presente no Spotify"
              />
              <p className="pequeno" style={{ marginTop: 8 }}>
                <a href={urlSpotify(presente.sp)} target="_blank" rel="noreferrer">
                  Abrir no app do Spotify
                </a>
              </p>
            </>
          )}

          {sabor && (
            <p className="pequeno" style={{ color: "#6b5a4c" }}>
              Seu cookie: <strong>{sabor.nome}</strong>. Bom apetite!
            </p>
          )}

          <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "20px 0" }} />
          <p className="pequeno" style={{ color: "#6b5a4c" }}>
            Presente feito com {musicCookies.nome} — {musicCookies.slogan}
          </p>
          <div className="botoes" style={{ justifyContent: "center" }}>
            <Link className="botao verde pequeno" href="/music-cookies/presente">
              Retribuir com um presente
            </Link>
            {musicCookies.instagram && (
              <a className="botao contorno pequeno" href={`https://instagram.com/${musicCookies.instagram}`} target="_blank" rel="noreferrer">
                @{musicCookies.instagram}
              </a>
            )}
          </div>
        </article>
      )}
    </div>
  );
}
