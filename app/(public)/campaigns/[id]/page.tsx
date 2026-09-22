"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Share2,
  Heart,
  ArrowRight,
  Receipt,
  TrendingDown,
  TrendingUp,
  Building2,
  BadgeCheck,
  Copy,
  Check,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CampaignDetail({ params }: PageProps) {
  const resolvedParams = use(params);
  const campaignId = resolvedParams.id;

  const [copied, setCopied] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const images = [
    "/bg-masjid.jpg",
    "/bg-masjid.jpeg",
    "/bg-masjid.jpg",
  ];

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const collectedAmount = 18500000;
  const targetAmount = 35000000;
  const percentage = Math.min(
    100,
    Math.round((collectedAmount / targetAmount) * 100)
  );

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  return (
    <div className="pt-24 px-6 md:px-12 lg:px-30 pb-20 min-h-screen bg-neutral-50/50">
      {/* Breadcrumb sederhana */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
        <Link href="/" className="hover:text-neutral-900 transition-colors">
          Beranda
        </Link>
        <span>/</span>
        <Link
          href="/campaigns"
          className="hover:text-neutral-900 transition-colors"
        >
          Daftar Kampanye
        </Link>
        <span>/</span>
        <span className="text-neutral-900 font-medium truncate max-w-xs">
          Renovasi Masjid Al-Muhajirin
        </span>
      </nav>

      {/* Kontainer 2 Kolom (~65% kiri & ~35% kanan) */}
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* ======================================================== */}
        {/* 1. KOLOM KIRI (~65% Width) */}
        {/* ======================================================== */}
        <div className="w-full lg:w-[65%] space-y-8">
          {/* A. Header Kampanye & Tag Lokasi */}
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 leading-tight">
              Renovasi Atap Kubah & Dinding Utama Masjid Al-Muhajirin
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5 font-medium text-neutral-800">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Kab. Sleman, D.I. Yogyakarta</span>
              </div>
              <span className="text-neutral-300">•</span>
              <div className="flex items-center gap-1.5 text-neutral-500">
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span>Diajukan 12 Mei 2024</span>
              </div>
              <span className="text-neutral-300">•</span>
              <span className="bg-neutral-100 border border-neutral-200 text-neutral-700 px-2 py-0.5 rounded font-mono text-[11px]">
                ID: PM-{campaignId.toUpperCase()}
              </span>
            </div>
          </div>

          {/* B. Media Showcase (16:9 Aspect Ratio) */}
          <div className="space-y-3">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 shadow-sm">
              <Image
                src={images[activeImageIndex]}
                alt="Foto Utama Kondisi Fisik Bangunan Masjid"
                fill
                priority
                className="object-cover object-center transition-all duration-300"
              />
              <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-white/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                <span>Bukti Citra Lapangan Asli</span>
              </div>
            </div>

            {/* Thumbnail Gallery Preview */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? "border-black shadow-sm ring-2 ring-black/10"
                      : "border-neutral-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* C. Card Spesial: Verifikasi AI (Computer Vision) */}
          <div className="bg-gradient-to-br from-neutral-900 to-neutral-800 text-white rounded-2xl p-6 border border-neutral-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-700/80 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-green-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    Laporan Verifikasi Computer Vision
                  </h3>
                  <p className="text-[11px] text-neutral-400">
                    Otomasi Penilaian Citra Bangunan Berbasis Deep Learning
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-300 border border-green-500/30 text-xs font-semibold px-3 py-1 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Terverifikasi: Rusak Berat
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                <span className="text-[11px] text-neutral-400 block mb-1">
                  Tingkat Keyakinan Prediksi
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white">94%</span>
                  <span className="text-xs text-green-400 font-medium">
                    Akurasi Deteksi Visual
                  </span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Model mengidentifikasi kerusakan struktural mayor pada area
                  plafon & atap.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-3.5">
                <span className="text-[11px] text-neutral-400 block mb-1">
                  Model AI Pengklasifikasi
                </span>
                <span className="text-sm font-semibold text-white block">
                  MobileNetV2 Structural Damage Classifier
                </span>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Terlatih untuk mengeliminasi manipulasi proposal fisik fiktif.
                </p>
              </div>
            </div>
          </div>

          {/* D. Narasi & Rincian Kebutuhan */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-neutral-900 mb-3">
                Urgensi Perbaikan & Cerita Masjid
              </h2>
              <div className="text-neutral-700 text-sm leading-relaxed space-y-3">
                <p>
                  Akibat cuaca ekstrem dan usia bangunan yang telah mencapai 30
                  tahun, struktur atap kubah utama Masjid Al-Muhajirin mengalami
                  kebocoran parah saat hujan lebat. Rembesan air telah merusak
                  plafon gipsum dan mulai mengikis dinding bagian dalam ruang
                  utama salat.
                </p>
                <p>
                  Kondisi ini sangat membahayakan keselamatan jamaah serta
                  mengganggu pelaksanaan ibadah rutin harian dan pengajian anak-anak.
                  Renovasi segera diperlukan untuk mengganti konstruksi penopang
                  dan pelapis tahan air sebelum kerusakan merambat ke pondasi
                  bangunan utama.
                </p>
              </div>
            </div>

            <hr className="border-neutral-200" />

            <div>
              <h3 className="text-base font-bold text-neutral-900 mb-3">
                Rencana Penggunaan Material & Anggaran
              </h3>
              <div className="border border-neutral-200 rounded-xl overflow-hidden divide-y divide-neutral-200 text-sm">
                <div className="flex justify-between items-center p-3.5 bg-neutral-50/50">
                  <span className="font-medium text-neutral-800">
                    Pembelian Genteng Metal Pasir & Rangka Baja
                  </span>
                  <span className="font-semibold text-neutral-900">
                    Rp 18.000.000
                  </span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-white">
                  <span className="font-medium text-neutral-800">
                    Semen, Pasir Pasang & Waterproofing Dinding
                  </span>
                  <span className="font-semibold text-neutral-900">
                    Rp 9.500.000
                  </span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-neutral-50/50">
                  <span className="font-medium text-neutral-800">
                    Upah Tukang Bangunan & Tenaga Ahli (2 Minggu)
                  </span>
                  <span className="font-semibold text-neutral-900">
                    Rp 7.500.000
                  </span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-neutral-100 font-bold text-neutral-900">
                  <span>Total Target Kebutuhan</span>
                  <span className="text-base">Rp 35.000.000</span>
                </div>
              </div>
            </div>
          </div>

          {/* E. Cuplikan Buku Kas Terbuka (Cryptographic Ledger) */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-neutral-700" />
                <h3 className="font-bold text-neutral-900 text-base">
                  Cuplikan Buku Kas Terbuka
                </h3>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-neutral-500 bg-neutral-100 px-2 py-1 rounded">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                SHA-256 Ledger
              </span>
            </div>

            <p className="text-xs text-neutral-500">
              Setiap rupiah mutasi kas masuk dan nota belanja fisik tercatat
              secara transparan tanpa celah penyuntingan sepihak.
            </p>

            <div className="space-y-2.5">
              {/* Item Transaksi Masuk */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 bg-neutral-50/60 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">
                      Donasi Masuk (#TX-8821)
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      20 Mei 2024 • Donatur Hamba Allah
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-green-600 text-sm">
                  +Rp 500.000
                </span>
              </div>

              {/* Item Transaksi Keluar */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-neutral-200 bg-neutral-50/60 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">
                      Belanja Awal Semen & Terpal Penutup
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      18 Mei 2024 • Nota Terlampir (#BK-003)
                    </p>
                  </div>
                </div>
                <span className="font-semibold text-neutral-900 text-sm">
                  -Rp 1.250.000
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                href={`/campaigns/${campaignId}/audit`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-neutral-600 transition-colors"
              >
                <span>Lihat seluruh Nota Belanja & Audit Mutasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. KOLOM KANAN (~35% Width - Sticky Panel) */}
        {/* ======================================================== */}
        <div className="w-full lg:w-[35%] lg:sticky lg:top-24 space-y-6 self-start">
          {/* A & B. Panel Donasi & Aksi Utama */}
          <div className="bg-white rounded-2xl p-6 border border-neutral-300 shadow-sm space-y-6">
            {/* A. Ringkasan Angka Donasi */}
            <div className="space-y-4">
              <div>
                <span className="text-xs text-neutral-500 font-medium block mb-1">
                  Donasi Terkumpul
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-neutral-900 tracking-tight">
                    {formatRupiah(collectedAmount)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-neutral-500 mt-1">
                  <span>
                    dari target <strong>{formatRupiah(targetAmount)}</strong>
                  </span>
                  <span className="font-semibold text-neutral-800">
                    {percentage}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs text-neutral-600 pt-1">
                <span>
                  <strong>142</strong> Donatur
                </span>
                <span>
                  Sisa <strong>24 hari lagi</strong>
                </span>
              </div>
            </div>

            {/* B. Tombol Aksi Utama */}
            <div className="space-y-2.5 pt-2 border-t border-neutral-200">
              <Link
                href={`/campaigns/${campaignId}/donate`}
                className="w-full bg-black text-white text-sm font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-xs"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>Donasi Sekarang</span>
              </Link>

              <button
                onClick={handleShare}
                className="w-full border border-neutral-300 bg-white text-neutral-800 text-sm font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-neutral-100 transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Tautan Berhasil Disalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-neutral-600" />
                    <span>Bagikan Kampanye</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* C. Profil Takmir & Badge Kepercayaan */}
          <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 font-bold text-base">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-semibold text-sm text-neutral-900 truncate">
                    H. Ahmad Dahlan
                  </h4>
                  <BadgeCheck className="w-4 h-4 text-blue-600 shrink-0" />
                </div>
                <p className="text-xs text-neutral-500">
                  Ketua Takmir Masjid Al-Muhajirin
                </p>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-3 border border-neutral-200/80 space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span className="text-neutral-500">Nomor Pengesahan:</span>
                <span className="font-mono font-medium text-neutral-800">
                  KD.12.04/BA.01.1/045
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Status Akun:</span>
                <span className="text-green-700 font-medium">Terverifikasi</span>
              </div>
            </div>

            <div className="flex items-start gap-2 text-xs text-neutral-600 bg-blue-50/50 border border-blue-100 rounded-xl p-3">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="leading-tight">
                <strong>Akun takmir terverifikasi identitas.</strong> KTP pengurus
                dan surat tugas resmi takmir telah dicocokkan dengan basis data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}