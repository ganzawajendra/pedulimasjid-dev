import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import Navbar from "@/components/navbar";
import "./globals.css";
import Footer from "@/components/footer";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Peduli Masjid",
  description: "Platform penggalangan dana dan transparansi renovasi masjid terverifikasi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.className} h-full antialiased scroll-smooth`}
    >
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
