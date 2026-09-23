"use client";

import { use, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  Receipt,
  Building2,
  Calendar,
  CreditCard,
  User,
  ExternalLink,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

function SuccessContent({ campaignId }: { campaignId: string }) {
  const searchParams = useSearchParams();
  const txId = searchParams.get("tx") || "TX-882194A";

  const [copied, setCopied] = useState(false);

  const hashId = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const amount = 100000;
  const donorName = "Hamba Allah";
  const methodName = "QRIS (Pembayaran Instan)";

  const handleCopyHash = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hashId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const transactionDate = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date());

  return (
    <div className="max-w-xl mx-auto space-y-8">
      {/* 1. TANDA SUKSES IKON CENTANG HIJAU BESAR & KALIMAT TERIMA KASIH */}
      <div className="text-center space-y-4">
        <div className="relative inline-flex items-center justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow-inner">
            <CheckCircle2 className="w-12 h-12 sm:w-14 sm:h-14 stroke-[2.2]" />
          </div>
          <div className="absolute -inset-1.5 rounded-full border-2 border-dashed border-green-400/60 animate-spin-slow pointer-events-none" />
        </div>

        <div className="space-y-1.5">
          <span className="inline-block text-xs font-bold tracking-wider uppercase text-green-700 bg-green-100/80 px-3 py-1 rounded-full">
            Donasi Berhasil Diverifikasi
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
            Alhamdulillah, Terima Kasih!
          </h1>
          <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            Terima kasih atas kebaikan dan kepedulian Anda. Semoga donasi ini menjadi amal jariyah yang senantiasa mengalirkan keberkahan.
          </p>
        </div>
      </div>

      {/* 2. KUITANSI DIGITAL */}
      <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden relative">
        {/* Header Kuitansi */}
        <div className="bg-neutral-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Receipt className="w-5 h-5 text-neutral-300" />
            <div>
              <h2 className="font-bold text-sm tracking-wide">Kuitansi Digital Resmi</h2>
              <p className="text-[11px] text-neutral-400 font-mono">ID Transaksi: {txId}</p>
            </div>
          </div>
          <span className="bg-green-500/20 text-green-300 border border-green-400/30 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            Lunas
          </span>
        </div>

        {/* Isi Rincian Kuitansi */}
        <div className="p-6 space-y-4 text-sm divide-y divide-neutral-100">
          {/* Nominal Utama */}
          <div className="pb-3 text-center">
            <span className="text-xs text-neutral-500 block mb-1">Total Nominal Donasi</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {formatRupiah(amount)}
            </span>
          </div>

          {/* Baris Rincian */}
          <div className="pt-4 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <span className="text-xs text-neutral-500 flex items-center gap-1.5 shrink-0">
                <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                Masjid Tujuan
              </span>
              <span className="text-xs font-semibold text-neutral-900 text-right">
                Renovasi Atap Kubah & Dinding Utama Masjid Al-Muhajirin
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-neutral-500 flex items-center gap-1.5 shrink-0">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                Waktu Transaksi
              </span>
              <span className="text-xs font-medium text-neutral-800">
                {transactionDate}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-neutral-500 flex items-center gap-1.5 shrink-0">
                <User className="w-3.5 h-3.5 text-neutral-400" />
                Nama Donatur
              </span>
              <span className="text-xs font-semibold text-neutral-900">
                {donorName}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-xs text-neutral-500 flex items-center gap-1.5 shrink-0">
                <CreditCard className="w-3.5 h-3.5 text-neutral-400" />
                Metode Pembayaran
              </span>
              <span className="text-xs font-medium text-neutral-800">
                {methodName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. KOTAK BUKTI INTEGRITAS KRIPTOGRAFIS */}
      <div className="bg-neutral-900 text-white rounded-2xl p-5 sm:p-6 border border-neutral-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-semibold text-sm text-neutral-100">
              Bukti Integritas Kriptografis
            </h3>
          </div>
          <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded">
            SHA-256 Immutable
          </span>
        </div>

        {/* Transaction Hash Box */}
        <div className="space-y-1.5">
          <span className="text-[11px] text-neutral-400 font-medium block">
            Transaction Hash ID:
          </span>
          <div className="flex items-center justify-between gap-2 bg-neutral-950 p-2.5 rounded-xl border border-neutral-800">
            <code className="text-[11px] font-mono text-emerald-400 truncate select-all">
              #{hashId}
            </code>
            <button
              type="button"
              onClick={handleCopyHash}
              className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors shrink-0 flex items-center gap-1 text-[11px] font-medium"
              title="Salin Hash ID"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 text-[10px]">Tersalin</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Salin</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Teks Penjelas Sesuai Brief */}
        <p className="text-xs text-neutral-400 leading-relaxed">
          Sumbangan Anda telah terdaftar dalam rantai buku besar publik. Riwayat ini terlindungi dari suntingan sepihak.
        </p>
      </div>

      {/* 4. 2 TOMBOL NAVIGASI */}
      <div className="space-y-3 pt-2">
        {/* Tombol Primer */}
        <Link
          href={`/audit/${campaignId}`}
          className="w-full bg-black text-white text-sm font-semibold py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-xs"
        >
          <span>Periksa Rantai Hash di Halaman Audit</span>
          <ArrowRight className="w-4 h-4" />
        </Link>

        {/* Tombol Sekunder */}
        <Link
          href={`/campaigns/${campaignId}`}
          className="w-full border border-neutral-300 bg-white text-neutral-800 text-sm font-semibold py-3 px-5 rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Detail Masjid</span>
        </Link>
      </div>
    </div>
  );
}

export default function DonateSuccessPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const campaignId = resolvedParams.id;

  return (
    <div className="pt-24 px-4 sm:px-6 md:px-12 lg:px-24 pb-24 min-h-screen bg-neutral-50/50">
      <Suspense fallback={<div className="max-w-xl mx-auto text-center py-20 text-neutral-500">Memuat rincian kuitansi...</div>}>
        <SuccessContent campaignId={campaignId} />
      </Suspense>
    </div>
  );
}