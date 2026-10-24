import { sigla, type Expositor } from "@/lib/expositores";

export default function Monograma({ expositor, tamanho }: { expositor: Expositor; tamanho?: "mini" | "grande" }) {
  return (
    <span className={`monograma${tamanho ? ` ${tamanho}` : ""}`} style={{ background: expositor.cor }} aria-hidden>
      {expositor.sigla ?? sigla(expositor.nome)}
    </span>
  );
}
