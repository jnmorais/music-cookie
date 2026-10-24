"use client";

import { Check, Copy, Download, ExternalLink, Send } from "lucide-react";
import { useEffect, useState } from "react";
import BotaoImprimir from "@/components/BotaoImprimir";
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
            setErroSpotify("Link não reconhecido. Abra a música no Spotify e use Compartilhar → Copiar link.");
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
      await navigator.share({ title: `Um presente musical para ${para}`, text: "Abra seu presente da Music Cookies", url: link }).catch(() => {});
    } else {
      copiar();
    }
  }

  const etiqueta = (chave?: number) => (
    <div key={chave} className="tag" style={{ background: t.fundo }}>
      <div className="tag-marca" style={{ color: t.destaque }}>
        {musicCookies.nome}
      </div>
      <div>
        <div className="tag-rotulo">Um presente para</div>
        <div className="tag-para">{para || "Destinatário"}</div>
      </div>
      <div className="tag-qr">
        {pronto ? (
          <QrCode valor={link} alt="QR Code do presente musical" />
        ) : (
          <div style={{ aspectRatio: "1", display: "grid", placeItems: "center", fontSize: "0.75rem", color: "#8a93a1", padding: 12 }}>
            Informe o destinatário e a música
          </div>
        )}
      </div>
      <div className="tag-cta">
        Aponte a câmera do celular para abrir
        {de && (
          <>
            <br />
            <strong>De: {de}</strong>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="layout-lateral nao-imprimir">
        <form className="cartao" onSubmit={(e) => e.preventDefault()}>
          <h2 style={{ fontSize: "1.1rem", marginBottom: 18 }}>Dados do presente</h2>
          <div className="linha-campos">
            <div className="campo">
              <label htmlFor="para">Para *</label>
              <input id="para" value={para} onChange={(e) => setPara(e.target.value)} maxLength={40} placeholder="Nome de quem recebe" required />
            </div>
            <div className="campo">
              <label htmlFor="de">De</label>
              <input id="de" value={de} onChange={(e) => setDe(e.target.value)} maxLength={40} placeholder="Seu nome" />
            </div>
          </div>

          <div className="campo">
            <label htmlFor="spotify">Link do Spotify *</label>
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
              No Spotify, abra a música e use Compartilhar → Copiar link. Aceita música, álbum, playlist ou podcast.
            </span>
            {erroSpotify && <span className="erro">{erroSpotify}</span>}
            {sp && (
              <div className="aviso ok" style={{ alignItems: "center", margin: "4px 0 0" }}>
                {info?.capa ? (
                  <img src={info.capa} alt="" width={36} height={36} style={{ borderRadius: 4 }} />
                ) : (
                  <Check size={16} aria-hidden />
                )}
                <span>{info?.titulo ?? "Link do Spotify reconhecido"}</span>
              </div>
            )}
          </div>

          <div className="campo">
            <label htmlFor="msg">Mensagem</label>
            <textarea
              id="msg"
              value={msg}
              onChange={(e) => setMsg(e.target.value.slice(0, LIMITE_MSG))}
              placeholder="Escreva um recado curto"
            />
            <span className="ajuda">
              {msg.length} de {LIMITE_MSG} caracteres
            </span>
          </div>

          <div className="secao-form">
            <h3>Detalhes</h3>
            <fieldset className="campo">
              <legend style={{ marginBottom: 6 }}>Ocasião</legend>
              <div className="segmentado">
                {(Object.keys(temas) as Tema[]).map((k) => (
                  <label key={k}>
                    <input type="radio" name="tema" value={k} checked={tema === k} onChange={() => setTema(k)} />
                    <span>{temas[k].nome}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="campo" style={{ maxWidth: 320 }}>
              <label htmlFor="sabor">Sabor do cookie</label>
              <select id="sabor" value={sabor} onChange={(e) => setSabor(e.target.value)}>
                {musicCookies.sabores.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>

        <aside style={{ display: "grid", gap: 16, position: "sticky", top: 88 }}>
          <div className="cartao" style={{ padding: 20 }}>
            <div className="cartao-titulo" style={{ marginBottom: 14 }}>
              <h3 style={{ fontSize: "0.95rem" }}>Pré-visualização</h3>
              {pronto ? <span className="selo sucesso">Pronto</span> : <span className="selo">Incompleto</span>}
            </div>
            {etiqueta()}
            <div style={{ display: "grid", gap: 8, marginTop: 20 }}>
              <button className="botao largo" type="button" disabled={!pronto} onClick={compartilhar}>
                <Send size={16} aria-hidden /> Enviar link
              </button>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                <button className="botao secundario" type="button" disabled={!pronto} onClick={copiar}>
                  {copiado ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />} {copiado ? "Copiado" : "Copiar"}
                </button>
                <a className="botao secundario" aria-disabled={!pronto} href={pronto ? link : undefined} target="_blank" rel="noreferrer">
                  <ExternalLink size={16} aria-hidden /> Visualizar
                </a>
              </div>
            </div>
          </div>

          <div className="cartao" style={{ padding: 20 }}>
            <h3 style={{ fontSize: "0.95rem" }}>Impressão</h3>
            <p className="suave pequeno">Etiquetas em folha A4, duas por linha, com linha de corte.</p>
            <div className="botoes" style={{ alignItems: "center" }}>
              <label className="pequeno" htmlFor="copias">
                Cópias
              </label>
              <select
                id="copias"
                value={copias}
                onChange={(e) => setCopias(Number(e.target.value))}
                style={{ padding: "7px 10px", borderRadius: 6, border: "1px solid var(--borda-forte)", font: "inherit" }}
              >
                {[1, 2, 4, 6].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              {pronto && <BotaoImprimir className="botao secundario pequeno" />}
              {pronto && qrPng && (
                <a className="botao secundario pequeno" href={qrPng} download={`presente-${para || "music-cookies"}.png`}>
                  <Download size={16} aria-hidden /> PNG
                </a>
              )}
            </div>
          </div>
        </aside>
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
