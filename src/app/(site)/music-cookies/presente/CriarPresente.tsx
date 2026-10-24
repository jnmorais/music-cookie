"use client";

import { useEffect, useState } from "react";
import QrCode from "@/components/QrCode";
import { useOrigem } from "@/components/useOrigem";
import { musicCookies } from "@/lib/config";
import {
  LIMITE_MSG,
  linkCurtoSpotify,
  parseSpotify,
  temas,
  urlPresente,
  type Presente,
  type Tema,
} from "@/lib/presente";

type InfoMusica = { titulo: string | null; capa: string | null };

export default function CriarPresente() {
  const origem = useOrigem();
  const [para, setPara] = useState("");
  const [de, setDe] = useState("");
  const [msg, setMsg] = useState("");
  const [linkSpotify, setLinkSpotify] = useState("");
  const [sp, setSp] = useState<Presente["sp"]>(null);
  const [info, setInfo] = useState<InfoMusica | null>(null);
  const [erroSpotify, setErroSpotify] = useState("");
  const [sabor, setSabor] = useState(musicCookies.sabores[0].id);
  const [tema, setTema] = useState<Tema>("amor");
  const [copias, setCopias] = useState(1);
  const [qrPng, setQrPng] = useState("");
  const [copiado, setCopiado] = useState(false);

  // Valida o link do Spotify enquanto a pessoa digita/cola.
  useEffect(() => {
    const texto = linkSpotify.trim();
    setErroSpotify("");
    setInfo(null);
    if (!texto) {
      setSp(null);
      return;
    }
    const local = parseSpotify(texto);
    setSp(local);
    if (!local && !linkCurtoSpotify(texto)) {
      setErroSpotify("Cole um link do Spotify (Compartilhar → Copiar link).");
      return;
    }
    const controle = new AbortController();
    const espera = setTimeout(() => {
      fetch(`/api/spotify?url=${encodeURIComponent(texto)}`, { signal: controle.signal })
        .then((r) => r.json())
        .then((d) => {
          if (d.sp) {
            setSp(d.sp);
            setInfo({ titulo: d.titulo, capa: d.capa });
          } else if (!local) {
            setErroSpotify("Não reconhecemos esse link. Abra a música no Spotify e use Compartilhar → Copiar link.");
          }
        })
        .catch(() => {});
    }, 400);
    return () => {
      clearTimeout(espera);
      controle.abort();
    };
  }, [linkSpotify]);

  const presente: Presente = { para: para.trim(), de: de.trim(), msg: msg.trim(), sp, sabor, tema };
  const pronto = Boolean(sp && para.trim());
  const link = origem ? urlPresente(origem, presente) : "";
  const t = temas[tema];

  async function copiar() {
    try {
      await navigator.clipboard.writeText(link);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      prompt("Copie o link do presente:", link);
    }
  }

  async function compartilhar() {
    if (navigator.share) {
      await navigator.share({ title: `Um presente musical para ${para}`, text: "Abra seu presente 🎵🍪", url: link }).catch(() => {});
    } else {
      copiar();
    }
  }

  const etiqueta = (chave?: number) => (
    <div key={chave} className="tag" style={{ background: t.fundo }}>
      <div className="tag-marca">🍪 {musicCookies.nome} 🎵</div>
      <div>
        <div className="pequeno">Para</div>
        <div className="tag-para">{para || "Alguém especial"}</div>
      </div>
      <div className="tag-qr">
        {pronto ? (
          <QrCode valor={link} alt="QR Code do presente musical" />
        ) : (
          <div style={{ aspectRatio: "1", display: "grid", placeItems: "center", fontSize: "0.8rem", color: "#868e96" }}>
            Preencha “Para” e a música
          </div>
        )}
      </div>
      <div className="tag-cta">
        {t.emoji} Aponte a câmera e abra seu presente
        {de && (
          <>
            <br />
            com carinho, {de}
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="grade-2 nao-imprimir">
        <form className="cartao" onSubmit={(e) => e.preventDefault()}>
          <div className="campo">
            <label htmlFor="para">Para *</label>
            <input id="para" value={para} onChange={(e) => setPara(e.target.value)} maxLength={40} placeholder="Ex.: Ana" required />
          </div>
          <div className="campo">
            <label htmlFor="de">De</label>
            <input id="de" value={de} onChange={(e) => setDe(e.target.value)} maxLength={40} placeholder="Ex.: Pedro" />
          </div>
          <div className="campo">
            <label htmlFor="spotify">Link da música no Spotify *</label>
            <input
              id="spotify"
              value={linkSpotify}
              onChange={(e) => setLinkSpotify(e.target.value)}
              placeholder="https://open.spotify.com/track/..."
              inputMode="url"
              aria-describedby="spotify-ajuda"
              aria-invalid={Boolean(erroSpotify)}
            />
            <span id="spotify-ajuda" className="ajuda">
              No Spotify: toque em ⋯ na música → Compartilhar → Copiar link. Vale música, álbum, playlist ou podcast.
            </span>
            {erroSpotify && <span className="erro">{erroSpotify}</span>}
            {sp && (
              <div style={{ display: "flex", gap: 10, alignItems: "center" }} className="aviso ok">
                {info?.capa && <img src={info.capa} alt="" width={40} height={40} style={{ borderRadius: 6 }} />}
                <span>✓ {info?.titulo ?? "Link do Spotify reconhecido"}</span>
              </div>
            )}
          </div>
          <div className="campo">
            <label htmlFor="msg">Mensagem</label>
            <textarea
              id="msg"
              value={msg}
              onChange={(e) => setMsg(e.target.value.slice(0, LIMITE_MSG))}
              placeholder="Escreva um recado curto…"
            />
            <span className="ajuda">
              {msg.length}/{LIMITE_MSG}
            </span>
          </div>
          <div className="campo">
            <label htmlFor="sabor">Sabor do cookie</label>
            <select id="sabor" value={sabor} onChange={(e) => setSabor(e.target.value)}>
              {musicCookies.sabores.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.nome}
                </option>
              ))}
            </select>
          </div>
          <fieldset className="campo">
            <legend>Ocasião</legend>
            <div className="opcoes">
              {(Object.keys(temas) as Tema[]).map((k) => (
                <label key={k} className="opcao">
                  <input type="radio" name="tema" value={k} checked={tema === k} onChange={() => setTema(k)} />
                  <span>
                    {temas[k].emoji} {temas[k].nome}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </form>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 80 }}>
          {etiqueta()}
          <div className="botoes" style={{ justifyContent: "center" }}>
            <button className="botao verde" type="button" disabled={!pronto} onClick={compartilhar}>
              Enviar link
            </button>
            <button className="botao contorno" type="button" disabled={!pronto} onClick={copiar}>
              {copiado ? "Copiado ✓" : "Copiar link"}
            </button>
            <a className="botao contorno" aria-disabled={!pronto} href={pronto ? link : undefined} target="_blank" rel="noreferrer">
              Ver presente
            </a>
          </div>
          <div className="cartao">
            <strong>Imprimir etiquetas</strong>
            <p className="suave pequeno">Tamanho de etiqueta para colar na embalagem (2 por linha em A4).</p>
            <div className="botoes" style={{ alignItems: "center" }}>
              <label className="pequeno" htmlFor="copias">
                Cópias
              </label>
              <select id="copias" value={copias} onChange={(e) => setCopias(Number(e.target.value))} style={{ padding: 8, borderRadius: 8 }}>
                {[1, 2, 4, 6].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              <button className="botao pequeno" type="button" disabled={!pronto} onClick={() => window.print()}>
                🖨️ Imprimir
              </button>
              {pronto && qrPng && (
                <a className="botao contorno pequeno" href={qrPng} download={`presente-${para || "music-cookies"}.png`}>
                  Baixar QR (PNG)
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {pronto && (
        <>
          <div style={{ display: "none" }}>
            <QrCode valor={link} tamanho={1024} onGerado={setQrPng} />
          </div>
          <div className="folha-impressao">{Array.from({ length: copias }, (_, i) => etiqueta(i))}</div>
        </>
      )}
    </>
  );
}
