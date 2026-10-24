import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Music Cookies × Feira de Empreendedorismo",
    template: "%s · Music Cookies × Feira",
  },
  description:
    "Presentes musicais com QR Code para a Music Cookies e portal digital da Feira de Empreendedorismo (03/11): mapa, expositores, votação e painel.",
};

export const viewport: Viewport = {
  themeColor: "#3b2416",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={geistSans.variable}>
      <body>{children}</body>
    </html>
  );
}
