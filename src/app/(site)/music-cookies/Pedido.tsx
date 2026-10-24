"use client";

import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { musicCookies } from "@/lib/config";

const real = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export default function Pedido() {
  const [qtd, setQtd] = useState<Record<string, number>>({});
  const [nome, setNome] = useState("");
  const [presente, setPresente] = useState(true);
  const [copiado, setCopiado] = useState(false);

  const itens = musicCookies.sabores.filter((s) => (qtd[s.id] ?? 0) > 0);
  const total = itens.reduce((t, s) => t + s.preco * qtd[s.id], 0);

  const texto = [
    `Olá, Music Cookies! Quero fazer um pedido${nome ? ` (${nome})` : ""}:`,
    ...itens.map((s) => `- ${qtd[s.id]}x ${s.nome}: ${real.format(s.preco * qtd[s.id])}`),
    `Total: ${real.format(total)}`,
    presente ? "É para presente, com etiqueta musical." : "",
  ]
    .filter(Boolean)
    .join("\n");

  const alterar = (id: string, delta: number) =>
    setQtd((q) => ({ ...q, [id]: Math.max(0, Math.min(20, (q[id] ?? 0) + delta)) }));

  async function copiar() {
    await navigator.clipboard?.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2500);
  }

  return (
    <aside className="cartao">
      <h2 style={{ fontSize: "1.15rem" }}>Novo pedido</h2>
      <p className="suave pequeno">O pedido é enviado ao WhatsApp do grupo. Na feira, a retirada é na banca.</p>

      <div style={{ display: "grid", gap: 12, margin: "16px 0 20px" }}>
        {musicCookies.sabores.map((s) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between" }}>
            <span className="pequeno">
              <strong>{s.nome}</strong>
              <br />
              <span className="suave">{real.format(s.preco)}</span>
            </span>
            <span className="quantidade">
              <button type="button" onClick={() => alterar(s.id, -1)} aria-label={`Remover ${s.nome}`}>
                <Minus size={14} />
              </button>
              <span aria-live="polite">{qtd[s.id] ?? 0}</span>
              <button type="button" onClick={() => alterar(s.id, 1)} aria-label={`Adicionar ${s.nome}`}>
                <Plus size={14} />
              </button>
            </span>
          </div>
        ))}
      </div>

      <div className="campo">
        <label htmlFor="pedido-nome">Nome para o pedido</label>
        <input id="pedido-nome" value={nome} onChange={(e) => setNome(e.target.value)} maxLength={40} autoComplete="name" />
      </div>
      <label className="pequeno" style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 20 }}>
        <input type="checkbox" checked={presente} onChange={(e) => setPresente(e.target.checked)} /> Incluir etiqueta de
        presente musical
      </label>

      <div
        style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--borda)", paddingTop: 14, marginBottom: 16 }}
      >
        <span className="suave">Total</span>
        <strong style={{ fontVariantNumeric: "tabular-nums" }}>{real.format(total)}</strong>
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {musicCookies.whatsapp ? (
          <a
            className="botao largo"
            aria-disabled={!itens.length}
            href={`https://wa.me/${musicCookies.whatsapp}?text=${encodeURIComponent(texto)}`}
            target="_blank"
            rel="noreferrer"
          >
            Enviar pedido pelo WhatsApp
          </a>
        ) : (
          <button className="botao largo" type="button" disabled={!itens.length} onClick={copiar}>
            {copiado ? "Pedido copiado" : "Copiar resumo do pedido"}
          </button>
        )}
        {presente && (
          <Link className="botao secundario largo" href="/music-cookies/presente">
            Criar etiqueta de presente
          </Link>
        )}
      </div>
    </aside>
  );
}
