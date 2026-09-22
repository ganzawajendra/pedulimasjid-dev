"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isDashboard = pathname.startsWith("/dashboard");

  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      // Pada homepage, muncul saat melewati hero section (sekitar 75% viewport)
      const heroThreshold = window.innerHeight * 0.75;
      setIsScrolledPastHero(window.scrollY > heroThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Sembunyikan navbar publik jika berada di dalam area dashboard
  if (isDashboard) {
    return null;
  }

  // Jika bukan di homepage (misal /campaigns), selalu tampil; jika di homepage, tampil saat sudah di-scroll melewati hero
  const isVisible = !isHomePage || isScrolledPastHero;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-[64px] flex items-center justify-between px-6 md:px-12 lg:px-20 bg-white/80 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300 ease-in-out ${
        isVisible
          ? "translate-y-0 opacity-100 shadow-xs pointer-events-auto"
          : "-translate-y-full opacity-0 pointer-events-none"
      }`}
    >
      <Link href="/" className="flex items-center">
        <Image
          src="/logo-black.png"
          width={110}
          height={62}
          alt="Logo Peduli Masjid Dark"
          className="w-[110px] h-auto"
          priority
        />
      </Link>

      <div className="nav-menu flex items-center gap-8 text-sm font-medium text-neutral-700">
        <Link
          href="/campaigns"
          className={`hover:text-black transition-colors ${
            pathname.startsWith("/campaigns") ? "text-black font-semibold" : ""
          }`}
        >
          Kampanye
        </Link>
        <Link
          href={isHomePage ? "#how-it-works" : "/#how-it-works"}
          className="hover:text-black transition-colors"
        >
          Cara Kerja
        </Link>
        <Link
          href={isHomePage ? "#showcase-technology" : "/#showcase-technology"}
          className="hover:text-black transition-colors"
        >
          Fitur Integritas
        </Link>
        <Link
          href={isHomePage ? "#audit" : "/#audit"}
          className="hover:text-black transition-colors"
        >
          Audit &amp; Transparansi
        </Link>
      </div>
    </nav>
  );
}
