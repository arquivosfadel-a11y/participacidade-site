import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Participa Cidade — Sua cidade ouve você. Sua gestão age com dados.",
  description:
    "O Participa Cidade conecta cidadãos e gestores públicos em um canal direto, transparente e rastreável. Do relato ao resultado, tudo em tempo real.",
  keywords:
    "gestão pública, participação cidadã, prefeitura digital, transparência, smart city, demandas municipais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
