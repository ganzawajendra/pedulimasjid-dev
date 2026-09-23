"use client";

import { useState } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Users,
  ExternalLink,
  Plus,
  Receipt,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Link2,
  Sparkles,
  Camera,
  Share2,
  ArrowRight,
  Info,
  Calendar,
  Lock,
  Cpu,
  BarChart3,
  X,
} from "lucide-react";

// Mock Data Donasi Harian untuk Grafik Tren
const DAILY_DONATION_DATA_7 = [
  { day: "Sen, 17 Mei", amount: 1200000, donators: 8 },
  { day: "Sel, 18 Mei", amount: 2500000, donators: 15 },
  { day: "Rab, 19 Mei", amount: 1800000, donators: 11 },
  { day: "Kam, 20 Mei", amount: 4500000, donators: 28 },
  { day: "Jum, 21 Mei", amount: 5200000, donators: 39 },
  { day: "Sab, 22 Mei", amount: 2100000, donators: 18 },
  { day: "Min, 23 Mei", amount: 1200000, donators: 23 },
];

const DAILY_DONATION_DATA_30 = [
  { day: "Mgg 1", amount: 4200000, donators: 28 },
  { day: "Mgg 2", amount: 6800000, donators: 45 },
  { day: "Mgg 3", amount: 5100000, donators: 39 },
  { day: "Mgg 4", amount: 2400000, donators: 30 },
];

// Mock 5 Mutasi Terakhir
const RECENT_TRANSACTIONS = [
  {
    blockId: "005",
    timestamp: "24/05/2024 - 16:30 WIB",
    description: "Pembelian Rangka Baja Ringan & Genteng Metal",
    type: "OUTFLOW",
    amount: 5600000,
    receiptStatus: "Nota Toko Terlampir",
    hash: "1f8e9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
  },
  {
    blockId: "004",
    timestamp: "20/05/2024 - 09:45 WIB",
    description: "Donasi Online via Virtual Account BSI",
    type: "INFLOW",
    amount: 10000000,
    receiptStatus: "Resi Sistem",
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  },
  {
    blockId: "003",
    timestamp: "18/05/2024 - 14:15 WIB",
    description: "Pembelian 40 Sak Semen Gresik & Terpal",
    type: "OUTFLOW",
    amount: 2600000,
    receiptStatus: "Nota Toko Terlampir",
    hash: "8f3d05e2978a7c1b3f945391d4e2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3",
  },
  {
    blockId: "002",
    timestamp: "15/05/2024 - 11:20 WIB",
    description: "Donasi via QRIS Komunitas Jamaah Subuh",
    type: "INFLOW",
    amount: 3500000,
    receiptStatus: "Resi Sistem",
    hash: "c4a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f678",
  },
  {
    blockId: "001",
    timestamp: "12/05/2024 - 08:30 WIB",
    description: "Donasi Awal Pembukaan Kampanye (Wakaf Tunai)",
    type: "INFLOW",
    amount: 5000000,
    receiptStatus: "Resi Sistem",
    hash: "7d4b1a82f3c09e5e78291a4b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d",
  },
];

export default function DashboardPage() {
  const [timeframe, setTimeframe] = useState<"7" | "30">("7");
  const [copiedLink, setCopiedLink] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progressText, setProgressText] = useState("");

  const campaignId = "1";
  const collectedAmount = 18500000;
  const targetAmount = 35000000;
  const percentage = Math.round((collectedAmount / targetAmount) * 100);
  const availableBalance = 10300000;
  const totalOutflow = 8200000;
  const totalDonators = 142;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleCopyDonationLink = () => {
    const url = `${window.location.origin}/campaigns/${campaignId}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const activeChartData = timeframe === "7" ? DAILY_DONATION_DATA_7 : DAILY_DONATION_DATA_30;
  const maxAmount = Math.max(...activeChartData.map((d) => d.amount));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ================================================================= */}
      {/* 1. HEADER SELAMAT DATANG & STATUS KAMPANYE AKTIF (TOP BANNER)    */}
      {/* ================================================================= */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Salam & Informasi Masjid */}
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                KAMPANYE AKTIF
              </span>
              <span className="inline-flex items-center gap-1.5 bg-neutral-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Terverifikasi CNN: Rusak Berat (Akurasi 94.8%)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Assalamu&apos;alaikum, Pengurus H. Ahmad Dahlan
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Berikut adalah ringkasan perkembangan donasi dan mutasi kas renovasi untuk{" "}
              <strong>Masjid Al-Muhajirin</strong> (ID: PM-1).
            </p>
          </div>

          {/* Tombol Pintas Header */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href={`/campaigns/${campaignId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold py-2.5 px-4 rounded-xl border border-neutral-300 transition-colors shadow-xs"
            >
              <span>Lihat Halaman Publik</span>
              <ExternalLink className="w-3.5 h-3.5 text-neutral-500" />
            </Link>

            <Link
              href="/dashboard/expenses/new"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-neutral-800 active:scale-95 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4 text-emerald-400" />
              <span>Ajukan Pencairan Dana</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2. PANEL KARTU METRIK KEUANGAN (FINANCIAL KPI CARDS)             */}
      {/* ================================================================= */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Kartu 1: Total Donasi Terkumpul */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Total Donasi Terkumpul
            </span>
            <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between gap-1">
              <span className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
                {formatRupiah(collectedAmount)}
              </span>
              <span className="text-xs font-bold text-emerald-600">{percentage}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden border border-neutral-200/60">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>

            <div className="flex justify-between text-[11px] text-neutral-500 pt-0.5">
              <span>Target {formatRupiah(targetAmount)}</span>
              <span className="font-semibold text-neutral-700">Sisa 24 hari</span>
            </div>
          </div>
        </div>

        {/* Kartu 2: Saldo Kas Tersedia */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Saldo Kas Tersedia
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-extrabold text-emerald-700 tracking-tight block">
              {formatRupiah(availableBalance)}
            </span>
            <p className="text-[11px] text-neutral-500 leading-tight">
              Dana donasi sah yang siap dicairkan untuk belanja fisik material.
            </p>
          </div>
        </div>

        {/* Kartu 3: Total Kas Terbelanja */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Kas Terbelanja (Outflow)
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight block">
              {formatRupiah(totalOutflow)}
            </span>
            <p className="text-[11px] text-neutral-500 leading-tight">
              3 transaksi pencairan telah dilampiri kuitansi/nota toko fisik.
            </p>
          </div>
        </div>

        {/* Kartu 4: Total Donatur */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-[11px] font-bold uppercase tracking-wider">
              Total Donatur
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight block">
              {totalDonators} Donatur
            </span>
            <p className="text-[11px] text-neutral-500 leading-tight">
              Gabungan donatur terverifikasi dan donatur tamu (Hamba Allah).
            </p>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 3. DUA KOLOM UTAMA: GRAFIK TREN & TINDAKAN CEPAT (MAIN WORKSPACE) */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =============================================================== */}
        {/* A. KOLOM KIRI (LEBAR ~65% / 8 COLS): GRAFIK & MUTASI TERAKHIR    */}
        {/* =============================================================== */}
        <div className="lg:col-span-8 space-y-8">
          {/* 1. Grafik Tren Donasi Harian */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <h2>Tren Arus Donasi Masuk</h2>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Akumulasi donasi yang tercatat ke buku besar SHA-256
                </p>
              </div>

              {/* Timeframe Selector */}
              <div className="flex items-center bg-neutral-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setTimeframe("7")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    timeframe === "7"
                      ? "bg-white text-neutral-900 shadow-xs font-semibold"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  7 Hari Terakhir
                </button>
                <button
                  type="button"
                  onClick={() => setTimeframe("30")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    timeframe === "30"
                      ? "bg-white text-neutral-900 shadow-xs font-semibold"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  30 Hari Terakhir
                </button>
              </div>
            </div>

            {/* Visual Bar Chart */}
            <div className="space-y-4 pt-2">
              <div className="h-56 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-neutral-200">
                {activeChartData.map((item, idx) => {
                  const heightPercent = Math.max(15, Math.round((item.amount / maxAmount) * 100));

                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative"
                    >
                      {/* Tooltip Hover */}
                      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-neutral-900 text-white text-[10px] py-1 px-2 rounded-md pointer-events-none whitespace-nowrap z-10 shadow-md">
                        {formatRupiah(item.amount)} ({item.donators} donatur)
                      </div>

                      <div
                        className="w-full max-w-[48px] bg-neutral-900 hover:bg-emerald-600 rounded-t-lg transition-all duration-300 relative group-hover:shadow-md"
                        style={{ height: `${heightPercent}%` }}
                      >
                        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400 opacity-60" />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Label Sumbu X */}
              <div className="flex justify-between text-[11px] font-medium text-neutral-500 px-2">
                {activeChartData.map((item, idx) => (
                  <span key={idx} className="truncate max-w-[70px] text-center">
                    {item.day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Riwayat 5 Mutasi Terakhir (Mini Ledger Table) */}
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-neutral-900">
                  Riwayat 5 Mutasi Terakhir
                </h3>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Blok buku kas kriptografis terkunci paling baru
                </p>
              </div>
              <span className="text-[11px] font-mono bg-neutral-100 text-neutral-700 px-2.5 py-1 rounded-md">
                SHA-256 Ledger
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-neutral-50/80 text-neutral-600 border-b border-neutral-200 font-semibold uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Waktu</th>
                    <th className="py-3 px-4">Keterangan</th>
                    <th className="py-3 px-4 text-right">Nominal</th>
                    <th className="py-3 px-4 text-center">Bukti Nota</th>
                    <th className="py-3 px-4">Hash Blok</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {RECENT_TRANSACTIONS.map((tx) => (
                    <tr key={tx.blockId} className="hover:bg-neutral-50/70 transition-colors">
                      <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">
                        {tx.timestamp}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-neutral-900 block line-clamp-1">
                            {tx.description}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-400">
                            Blok #{tx.blockId}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold whitespace-nowrap">
                        {tx.type === "INFLOW" ? (
                          <span className="text-green-600">+{formatRupiah(tx.amount)}</span>
                        ) : (
                          <span className="text-neutral-900">-{formatRupiah(tx.amount)}</span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <span
                          className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full ${
                            tx.type === "OUTFLOW"
                              ? "bg-blue-50 text-blue-700 border border-blue-200"
                              : "bg-neutral-100 text-neutral-600"
                          }`}
                        >
                          {tx.receiptStatus}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-600 whitespace-nowrap">
                        <span className="bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-800">
                          #{tx.hash.slice(0, 8)}...{tx.hash.slice(-4)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tautan Bawah */}
            <div className="p-4 bg-neutral-50/60 border-t border-neutral-200 text-center">
              <Link
                href={`/audit/${campaignId}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-neutral-900 hover:text-emerald-700 transition-colors py-1 px-3 rounded-lg"
              >
                <span>Lihat Seluruh Rantai Hash Kas Masjid Ini</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* B. KOLOM KANAN (LEBAR ~35% / 4 COLS): STATUS & PINTASAN AKSI     */}
        {/* =============================================================== */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Kotak Status Integritas Rantai Kriptografi */}
          <div className="bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-800 text-white rounded-3xl p-6 border border-neutral-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">Status Integritas Hash</h3>
              </div>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded">
                SHA-256
              </span>
            </div>

            {/* Badge Rantai Valid */}
            <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-2xl p-3.5 space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Rantai Hash Valid &amp; Konsisten</span>
              </div>
              <p className="text-[11px] text-emerald-200/90 leading-tight">
                0 Anomali data terdeteksi. Seluruh riwayat donasi terkunci permanen.
              </p>
            </div>

            {/* Blok Terakhir */}
            <div className="space-y-1 text-xs">
              <span className="text-neutral-400 text-[11px] block">Blok Terkunci Terkini:</span>
              <div className="p-2 bg-neutral-950 rounded-xl border border-neutral-800 font-mono text-[11px] text-emerald-400 truncate">
                #005: 1f8e9a2b3c4d5e6f7a8b...
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 leading-relaxed pt-1">
              Seluruh pencairan dana wajib menyertakan foto nota fisik yang akan di-hash otomatis ke rantai data publik.
            </p>
          </div>

          {/* 2. Kotak Aksi Utama Pengurus (Quick Actions) */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-neutral-900">
              Pintasan Aksi Pengurus
            </h3>

            <div className="space-y-2.5">
              {/* Tombol 1 */}
              <Link
                href="/dashboard/expenses/new"
                className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-between transition-colors shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <Receipt className="w-4 h-4 text-emerald-400" />
                  <span>Ajukan Pencairan &amp; Unggah Nota</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Tombol 2 */}
              <button
                type="button"
                onClick={() => setShowProgressModal(true)}
                className="w-full bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold py-3 px-4 rounded-xl border border-neutral-300 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Camera className="w-4 h-4 text-neutral-600" />
                  <span>Perbarui Foto Progres Lapangan</span>
                </div>
                <Plus className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {/* Tombol 3 */}
              <button
                type="button"
                onClick={handleCopyDonationLink}
                className="w-full bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-semibold py-3 px-4 rounded-xl border border-neutral-300 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Share2 className="w-4 h-4 text-neutral-600" />
                  <span>{copiedLink ? "Tautan Berhasil Disalin!" : "Salin Tautan Donasi Publik"}</span>
                </div>
                {copiedLink ? (
                  <Check className="w-3.5 h-3.5 text-green-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-neutral-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================= */}
      {/* 4. KOTAK PENGINGAT TRANSPARANSI (TRANSPARENCY NOTICE)             */}
      {/* ================================================================= */}
      <section className="bg-emerald-50/80 border border-emerald-200/80 rounded-3xl p-6 text-xs text-emerald-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
          <Info className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Panduan Transparansi Pengurus Masjid</span>
        </div>
        <p className="leading-relaxed text-emerald-900/90 max-w-4xl">
          Setiap nominal kas yang dicairkan akan langsung terlihat oleh publik pada halaman audit. Pastikan nota belanja toko bangunan terfoto dengan jelas guna menjaga kepercayaan para donatur dan mempermudah sidang pertanggungjawaban.
        </p>
      </section>

      {/* MODAL UPDATE PROGRES LAPANGAN */}
      {showProgressModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-neutral-200 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-neutral-700" />
                <h3 className="font-bold text-sm text-neutral-900">
                  Unggah Progres Renovasi Lapangan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowProgressModal(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-700 block">
                  Foto Dokumentasi Fisik Proyek
                </label>
                <div className="border-2 border-dashed border-neutral-300 rounded-2xl p-6 text-center hover:bg-neutral-50 transition-colors cursor-pointer space-y-1">
                  <Camera className="w-6 h-6 text-neutral-400 mx-auto" />
                  <p className="font-medium text-neutral-700">Pilih foto kondisi terbaru bangunan</p>
                  <p className="text-[11px] text-neutral-400">JPG, PNG (Maks 5MB)</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-neutral-700 block">
                  Deskripsi Singkat Perkembangan
                </label>
                <textarea
                  rows={3}
                  value={progressText}
                  onChange={(e) => setProgressText(e.target.value)}
                  placeholder="Contoh: Pemasangan rangka atap baja ringan telah selesai 80%..."
                  className="w-full p-3 bg-neutral-50 border border-neutral-300 rounded-xl text-xs focus:outline-hidden focus:border-neutral-900 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setShowProgressModal(false)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => {
                  alert("Dokumentasi perkembangan fisik berhasil disimpan!");
                  setShowProgressModal(false);
                }}
                className="px-4 py-2 text-xs font-semibold bg-neutral-900 text-white rounded-xl hover:bg-neutral-800 transition-colors"
              >
                Simpan Pembaruan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}