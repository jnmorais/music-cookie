"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";

type Props = {
  valor: string;
  tamanho?: number;
  className?: string;
  alt?: string;
  cor?: string;
  style?: React.CSSProperties;
  onGerado?: (dataUrl: string) => void;
};

export default function QrCode({ valor, tamanho = 512, className, alt = "QR Code", cor = "#000000", style, onGerado }: Props) {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    let ativo = true;
    if (!valor) {
      setSrc(null);
      return;
    }
    QRCode.toDataURL(valor, { width: tamanho, margin: 1, errorCorrectionLevel: "M", color: { dark: cor, light: "#ffffff" } })
      .then((url) => {
        if (!ativo) return;
        setSrc(url);
        onGerado?.(url);
      })
      .catch(() => ativo && setSrc(null));
    return () => {
      ativo = false;
    };
    // onGerado é um callback de notificação; não deve disparar nova geração
  }, [valor, tamanho, cor]);

  if (!src) return <div className={className} aria-hidden style={{ aspectRatio: "1", background: "#f1f3f6", ...style }} />;
  return <img src={src} alt={alt} className={className} width={tamanho} height={tamanho} style={style} />;
}
