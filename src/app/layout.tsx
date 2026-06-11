import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DataRakyat — Literasi Data untuk Semua",
  description:
    "Platform edukasi data science gratis untuk warga Indonesia dari Sabang sampai Merauke. Mulai belajar analisis data hari ini.",
  keywords: ["data science", "analisis data", "literasi data", "belajar gratis", "Indonesia"],
  openGraph: {
    title: "DataRakyat — Literasi Data untuk Semua",
    description: "Platform edukasi data science gratis untuk warga Indonesia.",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}