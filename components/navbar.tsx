"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Muncul saat melewati hero section (sekitar 75% tinggi viewport)
      const heroThreshold = window.innerHeight * 0.75;
      if (window.scrollY > heroThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[64px] flex items-center justify-between px-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100 shadow-sm pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <Image
        src="/logo-black.png"
        width={110}
        height={62}
        alt="Logo Peduli Masjid Dark"
        className="w-[110px] h-auto"
      />
      <div className="nav-menu flex items-center gap-10 text-sm font-medium text-neutral-700">
        <a href="" className="hover:text-black transition-colors">
          Kampanye
        </a>
        <a href="" className="hover:text-black transition-colors">
          Cara Kerja
        </a>
        <a href="" className="hover:text-black transition-colors">
          Fitur Integritas
        </a>
        <a href="" className="hover:text-black transition-colors">
          Audit & Transparansi
        </a>
      </div>
      <div className="action bg-black text-white px-4 py-1.5 rounded hover:bg-neutral-800 transition-colors text-sm font-medium">
        <a href="">Masuk</a>
      </div>
    </nav>
  );
}
