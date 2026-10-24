"use client";

import { Printer } from "lucide-react";

export default function BotaoImprimir({ texto = "Imprimir", className = "botao" }: { texto?: string; className?: string }) {
  return (
    <button className={className} type="button" onClick={() => window.print()}>
      <Printer size={16} aria-hidden /> {texto}
    </button>
  );
}
