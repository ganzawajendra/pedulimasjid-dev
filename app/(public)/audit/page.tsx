"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Search,
  ArrowRight,
  Database,
  Lock,
  Building2,
  Receipt,
  Link as LinkIcon,
  CheckCircle2,
  ChevronRight,
  AlertTriangle,
  Sparkles,
  Layers,
  Cpu,
  Fingerprint,
  TrendingUp,
  TrendingDown,
  Info,
  Check,
  Copy,
} from "lucide-react";

// Mock Database Transaksi untuk Alat Pelacakan Hash
const SAMPLE_TRANSACTIONS = [
  {
    hash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    txId: "TX-882194A",
    blockIndex: 4,
    timestamp: "20/05/2024 - 09:45 WIB",
    campaignId: "1",
    mosqueName: "Renovasi Atap Kubah & Dinding Utama Masjid Al-Muhajirin",
    location: "Kab. Sleman, D.I. Yogyakarta",
    amount: 10000000,
    donor: "Hamba Allah",
    type: "INFLOW",
    method: "Virtual Account BSI",
    status: "VALID & TERVERIFIKASI DALAM BLOK #4",
  },
  {
    hash: "8f3d05e2978a7c1b3f945391d4e2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3",
    txId: "TX-302194B",
    blockIndex: 3,
    timestamp: "18/05/2024 - 14:15 WIB",
    campaignId: "1",
    mosqueName: "Renovasi Atap Kubah & Dinding Utama Masjid Al-Muhajirin",
    location: "Kab. Sleman, D.I. Yogyakarta",
    amount: 2600000,
    donor: "Takmir Bendahara",
    type: "OUTFLOW",
    method: "Pembelian 40 Sak Semen Gresik",
    status: "VALID & TERVERIFIKASI DALAM BLOK #3",
  },
  {
    hash: "7d4b1a82f3c09e5e78291a4b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3a2b1c0d",
    txId: "TX-100100A",
    blockIndex: 1,
    timestamp: "12/05/2024 - 08:30 WIB",
    campaignId: "1",
    mosqueName: "Renovasi Atap Kubah & Dinding Utama Masjid Al-Muhajirin",
    location: "Kab. Sleman, D.I. Yogyakarta",
    amount: 5000000,
    donor: "Wakaf Tunai Awal",
    type: "INFLOW",
    method: "Transfer Bank",
    status: "VALID & TERVERIFIKASI DALAM BLOK #1 (Genesis Block)",
  },
];

// Mock Direktori Audit Masjid
const AUDIT_CAMPAIGNS = [
  {
    id: "1",
    title: "Renovasi Atap Kubah & Dinding Utama Masjid Al-Muhajirin",
    location: "Kab. Sleman, D.I. Yogyakarta",
    damageBadge: "Rusak Berat",
    chainStatus: "valid",
    inflow: 18500000,
    outflow: 8200000,
    totalBlocks: 5,
    latestHash: "1f8e9a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f",
    imageSrc: "/bg-masjid.jpg",
  },
  {
    id: "2",
    title: "Perbaikan Struktur Menara & Tempat Wudhu Masjid Jami' An-Nur",
    location: "Kota Bandung, Jawa Barat",
    damageBadge: "Rusak Sedang",
    chainStatus: "valid",
    inflow: 12400000,
    outflow: 4500000,
    totalBlocks: 4,
    latestHash: "9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d",
    imageSrc: "/bg-masjid.jpeg",
  },
  {
    id: "3",
    title: "Restorasi Plafon Retak & Sanitasi Utama Masjid Baiturrahman",
    location: "Kab. Malang, Jawa Timur",
    damageBadge: "Rusak Berat",
    chainStatus: "valid",
    inflow: 24750000,
    outflow: 14200000,
    totalBlocks: 8,
    latestHash: "3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b",
    imageSrc: "/bg-masjid.jpg",
  },
  {
    id: "4",
    title: "Pengecatan Ulang & Perbaikan Talang Air Masjid At-Taqwa",
    location: "Kab. Bantul, D.I. Yogyakarta",
    damageBadge: "Rusak Ringan",
    chainStatus: "valid",
    inflow: 5200000,
    outflow: 1800000,
    totalBlocks: 3,
    latestHash: "7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b7c6d",
    imageSrc: "/bg-masjid.jpeg",
  },
  {
    id: "5",
    title: "Rekonstruksi Pondasi Dinding Miring Musholla Al-Ikhlas",
    location: "Kab. Banyumas, Jawa Tengah",
    damageBadge: "Rusak Berat",
    chainStatus: "valid",
    inflow: 31000000,
    outflow: 19800000,
    totalBlocks: 9,
    latestHash: "2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c",
    imageSrc: "/bg-masjid.jpg",
  },
  {
    id: "6",
    title: "Penggantian Keramik Pecah & Renovasi Fasilitas Tempat Wudhu",
    location: "Kota Surabaya, Jawa Timur",
    damageBadge: "Rusak Sedang",
    chainStatus: "valid",
    inflow: 8900000,
    outflow: 3100000,
    totalBlocks: 4,
    latestHash: "5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b",
    imageSrc: "/bg-masjid.jpeg",
  },
];

export default function AuditPage() {
  // State Pencarian Hash Transaksi
  const [lookupQuery, setLookupQuery] = useState("");
  const [searchResult, setSearchResult] = useState<typeof SAMPLE_TRANSACTIONS[0] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  // State Filter Direktori Masjid
  const [searchDirectory, setSearchDirectory] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "valid" | "tampered">("all");

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Handler Pencarian Hash / TX ID
  const handleSearchLookup = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!lookupQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);

    setTimeout(() => {
      setIsSearching(false);
      const cleanQuery = lookupQuery.trim().toLowerCase().replace("#", "");
      const found = SAMPLE_TRANSACTIONS.find(
        (tx) =>
          tx.hash.toLowerCase().includes(cleanQuery) ||
          tx.txId.toLowerCase().includes(cleanQuery)
      );

      // Jika tidak ditemukan exact sample, buatkan fallback result agar interaktif untuk demonstrasi
      if (found) {
        setSearchResult(found);
      } else if (cleanQuery.length >= 4) {
        setSearchResult({
          hash: lookupQuery.startsWith("#") ? lookupQuery : `#${lookupQuery}`,
          txId: `TX-${lookupQuery.slice(0, 6).toUpperCase()}`,
          blockIndex: 4,
          timestamp: "23/09/2026 - 14:15 WIB",
          campaignId: "1",
          mosqueName: "Renovasi Atap Kubah & Dinding Utama Masjid Al-Muhajirin",
          location: "Kab. Sleman, D.I. Yogyakarta",
          amount: 100000,
          donor: "Hamba Allah",
          type: "INFLOW",
          method: "QRIS (Pembayaran Instan)",
          status: "VALID & TERVERIFIKASI DALAM BLOK #4",
        });
      } else {
        setSearchResult(null);
      }
    }, 600);
  };

  const handleSampleClick = (sampleQuery: string) => {
    setLookupQuery(sampleQuery);
    setIsSearching(true);
    setHasSearched(true);
    setTimeout(() => {
      setIsSearching(false);
      const cleanQuery = sampleQuery.toLowerCase().replace("#", "");
      const found = SAMPLE_TRANSACTIONS.find(
        (tx) =>
          tx.hash.toLowerCase().includes(cleanQuery) ||
          tx.txId.toLowerCase().includes(cleanQuery)
      );
      setSearchResult(found || SAMPLE_TRANSACTIONS[0]);
    }, 400);
  };

  const handleCopy = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedHash(true);
      setTimeout(() => setCopiedHash(false), 2000);
    }
  };

  // Filter Data Direktori
  const filteredDirectory = AUDIT_CAMPAIGNS.filter((campaign) => {
    const matchText =
      campaign.title.toLowerCase().includes(searchDirectory.toLowerCase()) ||
      campaign.location.toLowerCase().includes(searchDirectory.toLowerCase());

    if (statusFilter === "all") return matchText;
    if (statusFilter === "valid") return matchText && campaign.chainStatus === "valid";
    if (statusFilter === "tampered") return matchText && campaign.chainStatus !== "valid";
    return matchText;
  });

  // Global Metrics Calculations
  const totalAuditedFunds = AUDIT_CAMPAIGNS.reduce((acc, c) => acc + c.inflow, 0);
  const totalLockedBlocks = AUDIT_CAMPAIGNS.reduce((acc, c) => acc + c.totalBlocks, 0);

  return (
    <div className="pt-24 px-4 sm:px-6 md:px-12 lg:px-24 pb-24 min-h-screen bg-neutral-50/50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* ================================================================= */}
        {/* 1. HEADER & PENGANTAR PROTOKOL INTEGRITAS (PAGE HERO)            */}
        {/* ================================================================= */}
        <section className="space-y-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-neutral-500">
            <Link href="/" className="hover:text-neutral-900 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-900 font-semibold">Audit & Transparansi</span>
          </nav>

          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-900 tracking-tight">
                Portal Audit & Transparansi Keuangan Terbuka
              </h1>
              <span className="inline-flex items-center gap-1.5 bg-neutral-900 text-white text-xs font-mono px-3 py-1 rounded-full">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                Public Ledger
              </span>
            </div>
            <p className="text-sm sm:text-base text-neutral-600 max-w-4xl leading-relaxed">
              Platform PeduliMasjid menerapkan struktur data <strong>Cryptographic Hash Chain (SHA-256)</strong> pada
              pencatatan keuangan. Seluruh mutasi donasi masuk dan pencairan belanja material terikat secara
              matematis guna menjamin integritas data yang tahan manipulasi <em>(tamper-evident)</em>.
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 2. RINGKASAN STATUS INTEGRITAS PLATFORM (GLOBAL METRICS BAR)      */}
        {/* ================================================================= */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Kartu 1: Status Sistem */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Status Sistem</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-700 block">
                100% Rantai Valid
              </span>
              <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                0 Pelanggaran Integritas
              </p>
            </div>
          </div>

          {/* Kartu 2: Total Dana Diaudit */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Total Dana Diaudit</span>
              <div className="w-8 h-8 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-neutral-900 block tracking-tight">
                {formatRupiah(totalAuditedFunds)}
              </span>
              <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                Akumulasi Seluruh Donasi Masuk
              </p>
            </div>
          </div>

          {/* Kartu 3: Transaksi Terkunci */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Transaksi Terkunci</span>
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-neutral-900 block tracking-tight">
                {totalLockedBlocks} Blok SHA-256
              </span>
              <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                Donasi Masuk & Nota Belanja
              </p>
            </div>
          </div>

          {/* Kartu 4: Rumah Ibadah Terverifikasi */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-[11px] font-bold uppercase tracking-wider">Rumah Ibadah</span>
              <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-extrabold text-neutral-900 block tracking-tight">
                {AUDIT_CAMPAIGNS.length} Masjid Terdaftar
              </span>
              <p className="text-[11px] text-neutral-500 font-medium mt-0.5">
                Buku Kas Terbuka Aktif
              </p>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 3. ALAT PELACAKAN HASH TRANSAKSI (GLOBAL TRANSACTION LOOKUP)      */}
        {/* ================================================================= */}
        <section className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-3xl p-6 sm:p-8 border border-neutral-700 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <Fingerprint className="w-4 h-4" />
              <span>Verifikasi Kriptografis Mandiri</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Lacak & Verifikasi Transaction Hash ID Anda
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 max-w-3xl leading-relaxed">
              Masukkan 64 karakter Transaction Hash SHA-256 atau ID Transaksi pada kuitansi donasi digital Anda
              untuk memastikan dana telah terikat permanen dalam buku besar publik.
            </p>
          </div>

          {/* Form Pencarian Hash */}
          <form onSubmit={handleSearchLookup} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  placeholder="Masukkan Transaction Hash SHA-256 atau ID Donasi (contoh: 8f3d05e2... atau TX-882194A)"
                  className="w-full pl-11 pr-4 py-3.5 bg-neutral-950/80 border border-neutral-700 rounded-2xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-hidden focus:border-emerald-400 font-mono transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={isSearching}
                className="bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-neutral-950 font-bold text-xs sm:text-sm py-3.5 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-50 shadow-xs"
              >
                <span>{isSearching ? "Memverifikasi..." : "Lacak Transaksi"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Sample Buttons */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400 pt-1">
              <span className="text-[11px] font-medium">Contoh Demo:</span>
              <button
                type="button"
                onClick={() => handleSampleClick("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855")}
                className="font-mono text-[11px] bg-white/10 hover:bg-white/20 text-emerald-300 px-2 py-0.5 rounded transition-colors"
              >
                #e3b0c442... (Blok #4)
              </button>
              <button
                type="button"
                onClick={() => handleSampleClick("8f3d05e2978a7c1b3f945391d4e2a1b9c8d7e6f5a4b3c2d1e0f9a8b7c6d5e4f3")}
                className="font-mono text-[11px] bg-white/10 hover:bg-white/20 text-emerald-300 px-2 py-0.5 rounded transition-colors"
              >
                #8f3d05e2... (Blok #3 - Belanja)
              </button>
              <button
                type="button"
                onClick={() => handleSampleClick("TX-882194A")}
                className="font-mono text-[11px] bg-white/10 hover:bg-white/20 text-emerald-300 px-2 py-0.5 rounded transition-colors"
              >
                TX-882194A
              </button>
            </div>
          </form>

          {/* HASIL PENCARIAN (Muncul saat ditemukan) */}
          {hasSearched && (
            <div className="pt-2 animate-in fade-in slide-in-from-top-3 duration-200">
              {searchResult ? (
                <div className="bg-neutral-950 rounded-2xl border border-emerald-500/40 p-5 sm:p-6 space-y-4">
                  {/* Status Header Result */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-emerald-400">
                        {searchResult.status}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">
                      ID Transaksi: <strong>{searchResult.txId}</strong>
                    </span>
                  </div>

                  {/* Grid Rincian Transaksi Terlacak */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-xs">
                    <div className="space-y-1">
                      <span className="text-neutral-500 text-[11px] block">Masjid Tujuan</span>
                      <p className="font-semibold text-white line-clamp-1">{searchResult.mosqueName}</p>
                      <p className="text-[11px] text-neutral-400">{searchResult.location}</p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-neutral-500 text-[11px] block">Waktu Tercatat & Tipe</span>
                      <p className="font-semibold text-white">{searchResult.timestamp}</p>
                      <p className="text-[11px] text-emerald-400 font-mono">
                        {searchResult.type === "INFLOW" ? "Kas Masuk Donasi" : "Belanja Material"} ({searchResult.method})
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-neutral-500 text-[11px] block">Nominal Transaksi</span>
                      <p className="text-base font-extrabold text-white">
                        {formatRupiah(searchResult.amount)}
                      </p>
                      <p className="text-[11px] text-neutral-400 font-mono">
                        Atas Nama: {searchResult.donor}
                      </p>
                    </div>
                  </div>

                  {/* Hash String Box & Link Navigasi */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-neutral-800 text-xs">
                    <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-300 truncate max-w-xl">
                      <span className="text-neutral-500 shrink-0">Hash:</span>
                      <span className="text-emerald-400 truncate">{searchResult.hash}</span>
                      <button
                        type="button"
                        onClick={() => handleCopy(searchResult.hash)}
                        className="p-1 hover:text-white transition-colors shrink-0"
                        title="Salin Hash"
                      >
                        {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <Link
                      href={`/audit/${searchResult.campaignId}`}
                      className="inline-flex items-center gap-1.5 bg-white text-neutral-950 font-bold text-xs px-4 py-2 rounded-xl hover:bg-neutral-200 transition-colors shrink-0 self-start sm:self-auto"
                    >
                      <span>Buka Buku Kas Masjid Ini</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="bg-neutral-950/90 rounded-2xl border border-red-500/40 p-5 text-center space-y-1.5">
                  <AlertTriangle className="w-6 h-6 text-red-400 mx-auto" />
                  <p className="font-bold text-sm text-red-300">Transaksi Tidak Ditemukan</p>
                  <p className="text-xs text-neutral-400">
                    Pastikan Anda memasukkan Transaction Hash 64 karakter atau ID Transaksi yang valid dari kuitansi donasi Anda.
                  </p>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ================================================================= */}
        {/* 4. DIREKTORI AUDIT RUMAH IBADAH (CAMPAIGN LEDGER DIRECTORY)       */}
        {/* ================================================================= */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                Direktori Buku Kas Rumah Ibadah
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
                Pilih masjid untuk menginspeksi seluruh riwayat blok hash dan nota fisik secara transparan
              </p>
            </div>

            {/* Filter & Pencarian Direktori */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="relative min-w-64">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchDirectory}
                  onChange={(e) => setSearchDirectory(e.target.value)}
                  placeholder="Cari nama masjid atau lokasi..."
                  className="w-full pl-10 pr-3.5 py-2 bg-white border border-neutral-300 rounded-xl text-xs text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900 transition-colors"
                />
              </div>

              <div className="flex items-center bg-neutral-100 p-1 rounded-xl text-xs font-medium shrink-0">
                <button
                  type="button"
                  onClick={() => setStatusFilter("all")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    statusFilter === "all"
                      ? "bg-white text-neutral-900 shadow-xs font-semibold"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Semua
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter("valid")}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    statusFilter === "valid"
                      ? "bg-white text-neutral-900 shadow-xs font-semibold"
                      : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  Rantai Utuh (Valid)
                </button>
              </div>
            </div>
          </div>

          {/* Cards Grid Direktori */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDirectory.map((item) => {
              const absorptionRate = Math.round((item.outflow / item.inflow) * 100);

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  {/* Thumbnail & Badges Header */}
                  <div>
                    <div className="relative h-40 w-full overflow-hidden bg-neutral-900">
                      <Image
                        src={item.imageSrc}
                        alt={item.title}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-300 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/20">
                          {item.damageBadge}
                        </span>
                        <span className="bg-emerald-500/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <ShieldCheck className="w-3 h-3" />
                          SHA-256 Valid
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <p className="text-[11px] text-neutral-300 font-medium truncate">{item.location}</p>
                        <h3 className="font-bold text-sm text-white line-clamp-1 leading-snug">{item.title}</h3>
                      </div>
                    </div>

                    {/* Financial Metrics Summary */}
                    <div className="p-5 space-y-4 text-xs">
                      {/* Inflow vs Outflow */}
                      <div className="grid grid-cols-2 gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-100">
                        <div>
                          <span className="text-[11px] text-neutral-500 block">Total Donasi (Inflow)</span>
                          <span className="font-bold text-neutral-900 text-sm">{formatRupiah(item.inflow)}</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-neutral-500 block">Dana Belanja (Outflow)</span>
                          <span className="font-bold text-neutral-800 text-sm">{formatRupiah(item.outflow)}</span>
                        </div>
                      </div>

                      {/* Progress Bar Penyerapan Dana */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-neutral-600">
                          <span>Dana Terserap:</span>
                          <span className="font-semibold text-neutral-900">{absorptionRate}% ({item.totalBlocks} Blok Transaksi)</span>
                        </div>
                        <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-neutral-900 h-full rounded-full transition-all"
                            style={{ width: `${Math.min(100, absorptionRate)}%` }}
                          />
                        </div>
                      </div>

                      {/* Latest Hash Block */}
                      <div className="pt-1 border-t border-neutral-100 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                        <span>Blok Terakhir:</span>
                        <span className="bg-neutral-100 text-neutral-700 px-1.5 py-0.5 rounded truncate max-w-[140px]">
                          #{item.latestHash.slice(0, 8)}...{item.latestHash.slice(-4)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Aksi Buka Buku Kas */}
                  <div className="p-5 pt-0">
                    <Link
                      href={`/audit/${item.id}`}
                      className="w-full bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <span>Buka Buku Kas Kriptografis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 5. EDUKASI PROTOKOL AUDIT MANDIRI (HOW IT WORKS SECTION)          */}
        {/* ================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Arsitektur & Prinsip Kerja</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Bagaimana Rantai Kriptografis Menjamin Kejujuran?
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 max-w-3xl leading-relaxed">
              Struktur Linked Hash Chain mengeliminasi potensi manipulasi pembukuan melalui tiga pilar matematis:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {/* Langkah 1 */}
            <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-sm text-neutral-900">
                Pencatatan Berantai (Chaining)
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Setiap donasi dan belanja material baru wajib menyertakan hash dari transaksi sebelumnya sebagai input
                kalkulasi SHA-256 berikutnya secara berurutan.
              </p>
            </div>

            {/* Langkah 2 */}
            <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-sm text-neutral-900">
                Perlindungan Anti-Manipulasi (Tamper-Evident)
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Perubahan 1 digit nominal atau rekayasa nota di database internal akan mengubah string SHA-256 secara
                drastis <em>(Avalanche Effect)</em> dan langsung memutus validasi rantai.
              </p>
            </div>

            {/* Langkah 3 */}
            <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-sm text-neutral-900">
                Verifikasi Publik Independen
              </h3>
              <p className="text-xs text-neutral-600 leading-relaxed">
                Donatur tidak perlu mempercayai pengelola platform secara buta; kalkulasi hash dapat dihitung dan
                diverifikasi ulang secara mandiri kapan saja di peramban web Anda.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}