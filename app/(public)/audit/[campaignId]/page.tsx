"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  AlertTriangle,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
  Link as LinkIcon,
  Copy,
  Check,
  X,
  ExternalLink,
  ChevronRight,
  Database,
  Lock,
  FileText,
  Eye,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

interface PageProps {
  params: Promise<{ campaignId: string }>;
}

interface LedgerBlock {
  index: number;
  blockId: string;
  timestamp: string;
  isoTimestamp: string;
  type: "INFLOW" | "OUTFLOW";
  description: string;
  actor: string;
  amount: number;
  previousHash: string;
  currentHash: string;
  receiptImage?: string;
  receiptStore?: string;
  receiptHash?: string;
}

const INITIAL_LEDGER_DATA: LedgerBlock[] = [
  {
    index: 1,
    blockId: "001",
    timestamp: "12/05/2024 - 08:30 WIB",
    isoTimestamp: "2024-05-12T01:30:00Z",
    type: "INFLOW",
    description: "Donasi Awal Pembukaan Kampanye (Wakaf Tunai)",
    actor: "Hamba Allah",
    amount: 5000000,
    previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
    currentHash: "7d4b1a82f3c09e5e78291a4b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d",
  },
  {
    index: 2,
    blockId: "002",
    timestamp: "15/05/2024 - 11:20 WIB",
    isoTimestamp: "2024-05-15T04:20:00Z",
    type: "INFLOW",
    description: "Donasi via QRIS Komunitas Jamaah Subuh",
    actor: "Jamaah Masjid",
    amount: 3500000,
    previousHash: "7d4b1a82f3c09e5e78291a4b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d",
    currentHash: "c4a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f678",
  },
  {
    index: 3,
    blockId: "003",
    timestamp: "18/05/2024 - 14:15 WIB",
    isoTimestamp: "2024-05-18T07:15:00Z",
    type: "OUTFLOW",
    description: "Pembelian 40 Sak Semen Gresik & Terpal Penutup",
    actor: "Takmir Bendahara (H. Ahmad)",
    amount: 2600000,
    previousHash: "c4a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f67890a1b2c3d4e5f678",
    currentHash: "8f3d05e2978a7c1b3f945391d4e2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3",
    receiptImage: "/nota-semen.jpg",
    receiptStore: "Toko Bangunan Sumber Rejeki (Nota No. 12/X/2023)",
    receiptHash: "a1b2c3d4e5f67890e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934c",
  },
  {
    index: 4,
    blockId: "004",
    timestamp: "20/05/2024 - 09:45 WIB",
    isoTimestamp: "2024-05-20T02:45:00Z",
    type: "INFLOW",
    description: "Donasi Online via Virtual Account BSI",
    actor: "Hamba Allah",
    amount: 10000000,
    previousHash: "8f3d05e2978a7c1b3f945391d4e2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3",
    currentHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
  },
  {
    index: 5,
    blockId: "005",
    timestamp: "24/05/2024 - 16:30 WIB",
    isoTimestamp: "2024-05-24T09:30:00Z",
    type: "OUTFLOW",
    description: "Pembelian Rangka Baja Ringan & Genteng Metal Pasir",
    actor: "Takmir Bendahara (H. Ahmad)",
    amount: 5600000,
    previousHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    currentHash: "1f8e9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
    receiptImage: "/nota-semen.jpg",
    receiptStore: "Depo Baja Mulia Utama (Nota No. DBM-8842)",
    receiptHash: "e9f8a7b6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8",
  },
];

export default function AuditPageDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const campaignId = resolvedParams.campaignId;

  // State Simulasi Sidang (Normal vs Manipulasi Data)
  const [isTampered, setIsTampered] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState<boolean | null>(true);

  // State Modal Inspeksi Blok & Modal Nota
  const [selectedBlock, setSelectedBlock] = useState<LedgerBlock | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<LedgerBlock | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);

  // Perhitungan Ringkasan Saldo Kas
  const totalInflow = INITIAL_LEDGER_DATA.filter((b) => b.type === "INFLOW").reduce(
    (acc, cur) => acc + cur.amount,
    0
  );
  const totalOutflow = INITIAL_LEDGER_DATA.filter((b) => b.type === "OUTFLOW").reduce(
    (acc, cur) => acc + cur.amount,
    0
  );
  const balance = totalInflow - totalOutflow;

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Handler Verifikasi Mandiri Rantai Hash
  const handleVerifyChain = () => {
    setIsVerifying(true);
    setVerificationSuccess(null);
    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(!isTampered);
    }, 1200);
  };

  // Handler Toggle Simulasi Sidang
  const handleToggleTamper = (tamper: boolean) => {
    setIsTampered(tamper);
    setVerificationSuccess(!tamper);
  };

  const handleCopy = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  return (
    <div className="pt-24 px-4 sm:px-6 md:px-12 lg:px-24 pb-24 min-h-screen bg-neutral-50/50">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* ================================================================= */}
        {/* 1. HEADER & STATUS KEAMANAN RANTAI (TOP SECTION)                 */}
        {/* ================================================================= */}
        <section className="space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/campaigns" className="hover:text-neutral-900 transition-colors">
              Kampanye
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link
              href={`/campaigns/${campaignId}`}
              className="hover:text-neutral-900 transition-colors truncate max-w-xs font-medium"
            >
              Masjid Al-Muhajirin
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-900 font-semibold">Audit Kas Terbuka</span>
          </nav>

          {/* Header & Deskripsi */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                Buku Kas Kriptografis & Audit Mutasi Terbuka
              </h1>
              <span className="inline-flex items-center gap-1.5 bg-neutral-900 text-white text-xs font-mono px-3 py-1 rounded-full">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                SHA-256 Hash Chain
              </span>
            </div>
            <p className="text-sm text-neutral-600 max-w-4xl leading-relaxed">
              Seluruh mutasi donasi masuk dan pencairan dana belanja material oleh takmir
              tercatat dalam rantai hash SHA-256 secara berurutan. Setiap entri mengunci data
              entri sebelumnya, menjamin riwayat transaksi bebas dari suntingan sepihak.
            </p>
          </div>

          {/* Tamper-Check Banner & Verification Action Bar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl border transition-all shadow-xs bg-white">
            {/* Status Indicator Banner */}
            <div className="flex items-start sm:items-center gap-3.5">
              {!isTampered ? (
                <div className="flex items-center gap-3 text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-xs sm:text-sm block">
                      STATUS: Rantai Valid & Aman — 0 Anomali Integritas
                    </span>
                    <span className="text-[11px] text-emerald-700 font-mono">
                      Semua blok terkunci konsisten (5/5 Blok Terverifikasi)
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-red-800 bg-red-50 border border-red-200 px-3.5 py-2.5 rounded-xl animate-pulse">
                  <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                  <div>
                    <span className="font-bold text-xs sm:text-sm block">
                      PERINGATAN: Anomali Integritas Terdeteksi pada Blok #003
                    </span>
                    <span className="text-[11px] text-red-700 font-mono">
                      Hash Payload Mismatch: Nilai payload tidak cocok dengan hash induk!
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Aksi Verifikasi & Panel Simulasi Sidang */}
            <div className="flex flex-wrap items-center gap-2.5 self-end md:self-auto">
              {/* Simulasi Sidang Selector */}
              <div className="flex items-center bg-neutral-100 p-1 rounded-xl text-xs">
                <button
                  type="button"
                  onClick={() => handleToggleTamper(false)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    !isTampered
                      ? "bg-white text-neutral-900 shadow-xs font-semibold"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  Kondisi Normal
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleTamper(true)}
                  className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                    isTampered
                      ? "bg-red-600 text-white shadow-xs font-semibold"
                      : "text-neutral-500 hover:text-neutral-800"
                  }`}
                  title="Simulasi pengubahan data untuk demonstrasi sidang skripsi"
                >
                  Simulasi Manipulasi (Sidang)
                </button>
              </div>

              {/* Tombol Aksi Verifikasi Mandiri */}
              <button
                type="button"
                onClick={handleVerifyChain}
                disabled={isVerifying}
                className="bg-neutral-900 hover:bg-neutral-800 active:scale-95 text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all shadow-xs cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isVerifying ? "animate-spin" : ""}`} />
                <span>
                  {isVerifying
                    ? "Sedang Memverifikasi..."
                    : "Jalankan Verifikasi Ulang Integritas"}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. PANEL RINGKASAN SALDO KAS (METRIC CARDS)                      */}
        {/* ================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Kartu 1: Total Donasi Terkunci (Inflow) */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Total Donasi Terkunci (Inflow)
              </span>
              <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight block">
                {formatRupiah(totalInflow)}
              </span>
              <p className="text-[11px] text-neutral-500">
                Terkumpul dari 3 entri blok terverifikasi
              </p>
            </div>
          </div>

          {/* Kartu 2: Dana Terserap / Belanja (Outflow) */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Dana Terserap / Belanja (Outflow)
              </span>
              <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight block">
                {formatRupiah(totalOutflow)}
              </span>
              <p className="text-[11px] text-neutral-500">
                Dialokasikan dengan 2 nota toko terunggah
              </p>
            </div>
          </div>

          {/* Kartu 3: Saldo Kas Tersimpan (Balance) */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-neutral-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-semibold uppercase tracking-wider">
                Saldo Kas Tersimpan (Balance)
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div className="space-y-0.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 tracking-tight block">
                {formatRupiah(balance)}
              </span>
              <p className="text-[11px] text-neutral-500 flex items-center gap-1 font-mono">
                <Lock className="w-3 h-3 text-neutral-400" />
                Saldo akun takmir terverifikasi real-time
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. TABEL MUTASI BUKU BESAR (LEDGER EXPLORER TABLE)               */}
        {/* ================================================================= */}
        <section className="bg-white rounded-2xl border border-neutral-200 shadow-xs overflow-hidden space-y-0">
          <div className="p-5 sm:p-6 border-b border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                Buku Besar Rantai Kriptografis (Ledger Explorer)
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Klik salah satu baris hash untuk membuka inspeksi teknis struktur payload JSON
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Genesis Block #001 aktif</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50/80 text-neutral-600 border-b border-neutral-200 font-semibold uppercase text-[11px] tracking-wider">
                  <th className="py-3.5 px-4">No. Blok</th>
                  <th className="py-3.5 px-4">Waktu (WIB)</th>
                  <th className="py-3.5 px-4">Jenis & Uraian Mutasi</th>
                  <th className="py-3.5 px-4 text-right">Nominal</th>
                  <th className="py-3.5 px-4 text-center">Bukti Fisik</th>
                  <th className="py-3.5 px-4">Jejak Kriptografi (Hash Chain)</th>
                  <th className="py-3.5 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 font-normal">
                {INITIAL_LEDGER_DATA.map((block, idx) => {
                  const isBlockTampered = isTampered && block.index === 3;
                  const displayAmount = isBlockTampered ? 9900000 : block.amount;
                  const displayDesc = isBlockTampered
                    ? "[TERMANIPULASI] Pembelian 40 Sak Semen Gresik"
                    : block.description;

                  return (
                    <tr
                      key={block.blockId}
                      className={`transition-colors hover:bg-neutral-50/80 ${
                        isBlockTampered ? "bg-red-50/70 border-l-4 border-l-red-500" : ""
                      }`}
                    >
                      {/* Kolom 1: No. Blok */}
                      <td className="py-4 px-4 font-mono font-bold text-neutral-900">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded font-mono text-[11px] ${
                            isBlockTampered
                              ? "bg-red-200 text-red-900 font-bold"
                              : "bg-neutral-100 text-neutral-800"
                          }`}
                        >
                          #{block.blockId}
                        </span>
                      </td>

                      {/* Kolom 2: Waktu (Timestamp) */}
                      <td className="py-4 px-4 text-neutral-600 whitespace-nowrap">
                        {block.timestamp}
                      </td>

                      {/* Kolom 3: Jenis Transaksi & Uraian */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            {block.type === "INFLOW" ? (
                              <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                <TrendingUp className="w-3 h-3" />
                                Kas Masuk
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                                <TrendingDown className="w-3 h-3" />
                                Belanja Material
                              </span>
                            )}
                            <span className="text-[11px] text-neutral-400">• {block.actor}</span>
                          </div>
                          <p className="font-medium text-neutral-900 text-xs line-clamp-1">
                            {displayDesc}
                          </p>
                        </div>
                      </td>

                      {/* Kolom 4: Nominal */}
                      <td className="py-4 px-4 text-right font-mono font-bold whitespace-nowrap">
                        {block.type === "INFLOW" ? (
                          <span className="text-green-600">+{formatRupiah(displayAmount)}</span>
                        ) : (
                          <span className="text-neutral-900">-{formatRupiah(displayAmount)}</span>
                        )}
                      </td>

                      {/* Kolom 5: Bukti Fisik / Nota Belanja */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        {block.receiptImage ? (
                          <button
                            type="button"
                            onClick={() => setSelectedReceipt(block)}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-300 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                          >
                            <Receipt className="w-3.5 h-3.5 text-neutral-600" />
                            <span>Lihat Nota Toko</span>
                          </button>
                        ) : (
                          <span className="text-neutral-400 text-xs font-mono">
                            [Resi Sistem]
                          </span>
                        )}
                      </td>

                      {/* Kolom 6: Jejak Kriptografi (Hash Chaining) */}
                      <td className="py-4 px-4 font-mono text-[11px]">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-neutral-400">
                            <span className="text-[10px] text-neutral-400">Prev:</span>
                            <span className="text-neutral-600 bg-neutral-100 px-1 rounded">
                              {block.previousHash.slice(0, 8)}...{block.previousHash.slice(-4)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 font-bold">
                            <LinkIcon className="w-3 h-3 text-emerald-600 rotate-45" />
                            <span
                              className={`px-1.5 py-0.5 rounded ${
                                isBlockTampered
                                  ? "bg-red-100 text-red-700 underline decoration-wavy"
                                  : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              }`}
                            >
                              {block.currentHash.slice(0, 8)}...{block.currentHash.slice(-4)}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Kolom 7: Aksi */}
                      <td className="py-4 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => setSelectedBlock(block)}
                          className="p-1.5 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
                          title="Inspeksi Detail Blok"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 5. CATATAN METODOLOGI SISTEM (FOOTER INFO)                       */}
        {/* ================================================================= */}
        <section className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Prinsip Transparansi PeduliMasjid</span>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed max-w-4xl">
            Data keuangan tidak bergantung pada integritas sepihak administrator, melainkan pada struktur matematis Linked Hash Chain yang dapat diaudit secara independen oleh setiap donatur dan masyarakat umum.
          </p>
        </section>
      </div>

      {/* ================================================================= */}
      {/* 4. POPUP INSPEKSI TEKNIS BLOK (BLOCK INSPECTOR MODAL)            */}
      {/* ================================================================= */}
      {selectedBlock && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-neutral-900 text-white w-full max-w-2xl rounded-2xl border border-neutral-700 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-emerald-400">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-neutral-100">
                    Inspeksi Teknis Blok #{selectedBlock.blockId}
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Struktur Data Payload Kriptografi SHA-256
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBlock(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-xs max-h-[80vh] overflow-y-auto">
              {/* Data Mentah (Payload JSON) */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  1. Data Mentah (Payload JSON)
                </span>
                <pre className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed">
                  {JSON.stringify(
                    {
                      block_id: selectedBlock.index,
                      timestamp: selectedBlock.isoTimestamp,
                      type: selectedBlock.type,
                      amount: selectedBlock.amount,
                      description: selectedBlock.description,
                      receipt_hash: selectedBlock.receiptHash || null,
                      previous_hash: selectedBlock.previousHash,
                    },
                    null,
                    2
                  )}
                </pre>
              </div>

              {/* Formula Matematika */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                  2. Formula Matematika Enkripsi
                </span>
                <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 font-mono text-neutral-300">
                  <code>Current_Hash = SHA-256(Block_Payload + Previous_Hash)</code>
                </div>
              </div>

              {/* String Hash Lengkap (64 Karakter) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                    3. String Hash Lengkap (64 Karakter Hex)
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(selectedBlock.currentHash)}
                    className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 hover:underline"
                  >
                    {copiedHash ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>Hash Disalin</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin Hash</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 font-mono text-[11px] text-emerald-400 break-all select-all">
                  {selectedBlock.currentHash}
                </div>
              </div>

              {/* Catatan Validasi Integritas */}
              <div className="bg-emerald-950/40 border border-emerald-800/80 rounded-xl p-4 text-emerald-300 space-y-1">
                <span className="font-bold text-xs block">Catatan Validasi:</span>
                <p className="text-[11px] text-emerald-200/90 leading-relaxed">
                  Perubahan 1 digit pada nominal atau bukti nota fisik akan mengubah string hash di atas dan merusak keterhubungan seluruh blok berikutnya.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-neutral-800 bg-neutral-950/60 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedBlock(null)}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Tutup Inspeksi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* POPUP NOTA BELANJA FISIK (RECEIPT MODAL)                         */}
      {/* ================================================================= */}
      {selectedReceipt && selectedReceipt.receiptImage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-neutral-900 w-full max-w-lg rounded-2xl border border-neutral-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Header Nota */}
            <div className="p-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <Receipt className="w-4 h-4 text-neutral-700" />
                <h3 className="font-bold text-sm text-neutral-900">
                  Bukti Nota Belanja Asli — Blok #{selectedReceipt.blockId}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Foto Nota & Info */}
            <div className="p-5 space-y-4">
              <div className="relative aspect-3/4 w-full rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 shadow-inner">
                <Image
                  src={selectedReceipt.receiptImage}
                  alt="Bukti Nota Belanja Toko"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="bg-neutral-50 rounded-xl p-3.5 border border-neutral-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Toko / Penerbit:</span>
                  <span className="font-semibold text-neutral-900 text-right">
                    {selectedReceipt.receiptStore}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Nominal Belanja:</span>
                  <span className="font-bold text-neutral-900">
                    {formatRupiah(selectedReceipt.amount)}
                  </span>
                </div>
                <div className="space-y-1 pt-1 border-t border-neutral-200">
                  <span className="text-[10px] text-neutral-400 block font-mono">
                    SHA-256 Hash Citra Berkas:
                  </span>
                  <code className="text-[10px] font-mono text-neutral-700 break-all bg-white p-1 rounded border border-neutral-200 block">
                    {selectedReceipt.receiptHash}
                  </code>
                </div>
              </div>
            </div>

            {/* Footer Nota */}
            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Tutup Bukti Nota
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}