"use client";

export default function BotaoImprimir({ texto = "🖨️ Imprimir", className = "botao" }: { texto?: string; className?: string }) {
  return (
    <button className={className} type="button" onClick={() => window.print()}>
      {texto}
    </button>
  );
}
