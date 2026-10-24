import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { scriptTema } from "@/lib/tema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Music Cookies — Cookies com trilha sonora",
    template: "%s · Music Cookies",
  },
  description:
    "Cookies artesanais que viram presente: escolha uma música do Spotify, escreva uma mensagem e gere o QR Code da embalagem.",
};

export const viewport: Viewport = {
  themeColor: "#111827",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={geistSans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: scriptTema }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
