"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FilePlus2,
  Receipt,
  Link2,
  ShieldCheck,
  LogOut,
  Building2,
  MapPin,
  Menu,
  X,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

const NAVIGATION_ITEMS = [
  {
    name: "Ringkasan Dasbor",
    href: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    name: "Ajukan Usulan Renovasi",
    href: "/dashboard/campaigns/new",
    icon: FilePlus2,
    exact: false,
  },
  {
    name: "Pencairan & Nota Belanja",
    href: "/dashboard/expenses/new",
    aliasHrefs: ["/dashboard/disbursement", "/dashboard/expenses"],
    icon: Receipt,
    exact: false,
  },
  {
    name: "Audit Ledger Masjid",
    href: "/audit/1",
    aliasHrefs: ["/dashboard/ledger"],
    icon: Link2,
    exact: false,
  },
];

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Simulasi pembersihan sesi login takmir
    router.push("/");
  };

  const isNavActive = (item: (typeof NAVIGATION_ITEMS)[0]) => {
    if (item.exact) {
      return pathname === item.href;
    }
    if (pathname.startsWith(item.href)) {
      return true;
    }
    if (item.aliasHrefs && item.aliasHrefs.some((alias) => pathname.startsWith(alias))) {
      return true;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-neutral-50/60 flex">
      {/* ================================================================= */}
      {/* 1. SIDEBAR KIRI (FIXED NAVIGATION SIDEBAR)                       */}
      {/* ================================================================= */}
      {/* Backdrop Overlay untuk Layar Mobile */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Bagian Atas: Branding & Menu Navigasi */}
        <div className="flex flex-col">
          {/* A. BRANDING HEADER */}
          <div className="h-16 px-6 border-b border-neutral-100 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 group">
              <Image
                src="/logo-black.png"
                width={105}
                height={55}
                alt="Logo Peduli Masjid"
                className="w-[105px] h-auto object-contain"
                priority
              />
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-1.5 py-0.5 rounded-md tracking-wide uppercase">
                Takmir
              </span>
            </Link>

            {/* Tombol Tutup Mobile Sidebar */}
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* B. MENU NAVIGASI UTAMA */}
          <div className="px-3 py-6 space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
              Menu Pengurus
            </div>

            <nav className="space-y-1">
              {NAVIGATION_ITEMS.map((item) => {
                const active = isNavActive(item);
                const IconComponent = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      active
                        ? "bg-neutral-900 text-white shadow-xs"
                        : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                    }`}
                  >
                    <IconComponent
                      className={`w-4 h-4 shrink-0 ${
                        active ? "text-white" : "text-neutral-500"
                      }`}
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* C. FOOTER SIDEBAR (PROFIL STATUS & AKSI KELUAR) */}
        <div className="p-4 border-t border-neutral-100 space-y-3">
          {/* Indikator Status Akun Takmir */}
          <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-3 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Akun Terverifikasi</span>
            </div>
            <p className="text-[10px] text-emerald-700 leading-tight">
              KTP & SK Takmir terdaftar resmi di sistem PeduliMasjid.
            </p>
          </div>

          {/* Tombol Keluar Sesi */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>

      {/* ================================================================= */}
      {/* 2. AREA KERJA (OFFSET PL-64) & STICKY TOPBAR                     */}
      {/* ================================================================= */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* 3. KOMPONEN HEADER ATAS (STICKY TOPBAR) */}
        <header className="sticky top-0 z-30 h-16 bg-white/85 backdrop-blur-md border-b border-neutral-200 px-4 sm:px-6 md:px-8 flex items-center justify-between">
          {/* Sisi Kiri: Tombol Hamburger & Entitas Masjid */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl text-neutral-600 hover:bg-neutral-100 transition-colors"
              title="Buka Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="space-y-0.5">
              <h2 className="font-bold text-sm sm:text-base text-neutral-900 leading-tight truncate max-w-xs sm:max-w-md">
                Masjid Al-Muhajirin
              </h2>
              <div className="flex items-center gap-1 text-[11px] text-neutral-500">
                <MapPin className="w-3 h-3 text-neutral-400 shrink-0" />
                <span className="truncate">Kab. Sleman, D.I. Yogyakarta</span>
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Status Pengurus & Avatar */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Badge Status */}
            <div className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Takmir Aktif</span>
            </div>

            {/* Avatar Inisial & Profil */}
            <div className="flex items-center gap-2.5 pl-2 sm:border-l sm:border-neutral-200">
              <div className="w-9 h-9 rounded-full bg-neutral-900 text-white font-bold text-xs flex items-center justify-center shadow-xs ring-2 ring-neutral-200">
                HD
              </div>
              <div className="hidden md:block text-left leading-tight">
                <span className="font-bold text-xs text-neutral-900 block">
                  H. Ahmad Dahlan
                </span>
                <span className="text-[10px] text-neutral-500 font-medium">
                  Ketua Takmir
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* 4. AREA KONTEN DINAMIS ({children}) */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 min-w-0">
          {children}
        </main>
      </div>
    </div>
  );
}
