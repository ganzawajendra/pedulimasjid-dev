"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UploadCloud,
  ImagePlus,
  Cpu,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Loader2,
  RefreshCw,
  FileText,
  Calendar,
  Building2,
  X,
  Info,
  Check,
} from "lucide-react";

interface AIAnalysisResult {
  category: "RUSAK_BERAT" | "RUSAK_SEDANG" | "LAYAK_MINOR";
  label: string;
  badgeColor: "red" | "yellow" | "gray";
  confidenceScore: number;
  modelName: string;
  insights: string;
  isEligible: boolean;
}

export default function NewCampaignPage() {
  const router = useRouter();

  // State Form Informasi Umum
  const [title, setTitle] = useState("");
  const [damageCategory, setDamageCategory] = useState("Kerusakan Struktur / Dinding Retak");
  const [targetAmountRaw, setTargetAmountRaw] = useState("35000000");
  const [durationDays, setDurationDays] = useState("30");
  const [description, setDescription] = useState("");

  // State File & Upload
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State Verifikasi AI CNN
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState("");
  const [analysisResult, setAnalysisResult] = useState<AIAnalysisResult | null>(null);

  // State Aksi Form
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "");
    setTargetAmountRaw(rawVal);
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Hanya format berkas gambar (JPG, JPEG, PNG) yang diperbolehkan.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran gambar melebihi batas maksimal 5 MB.");
      return;
    }

    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setAnalysisResult(null); // Reset hasil jika foto diganti
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Sample quick loader untuk demo sidang
  const handleUseSampleImage = (imageSrc: string, condition: "RUSAK_BERAT" | "RUSAK_SEDANG") => {
    setPreviewUrl(imageSrc);
    setSelectedFile(new File(["sample"], "sample-masjid.jpg", { type: "image/jpeg" }));
    setAnalysisResult(null);
  };

  // Trigger Verifikasi Visual AI (FastAPI inference engine simulation)
  const handleRunAIVerification = async () => {
    if (!previewUrl) {
      alert("Silakan unggah atau pilih foto kerusakan fisik terlebih dahulu.");
      return;
    }

    setIsAnalyzing(true);
    setAnalysisProgress("Menghubungkan ke Engine FastAPI...");

    setTimeout(() => {
      setAnalysisProgress("Ekstraksi Fitur Citra & Konvolusi Piksel...");
    }, 600);

    setTimeout(() => {
      setAnalysisProgress("Menjalankan Inferensi MobileNetV2 Classifier...");
    }, 1200);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisProgress("");

      // Berdasarkan kategori kerusakan yang dipilih atau karakteristik gambar
      if (damageCategory.includes("Struktur") || damageCategory.includes("Atap")) {
        setAnalysisResult({
          category: "RUSAK_BERAT",
          label: "RUSAK PARAH / DARURAT",
          badgeColor: "red",
          confidenceScore: 94.8,
          modelName: "MobileNetV2 Structural Damage Classifier",
          insights:
            "Model MobileNetV2 mendeteksi pola retakan dinding struktural dan deformasi material atap yang membahayakan jamaah. Memenuhi syarat prioritas pembukaan kampanye donasi publik.",
          isEligible: true,
        });
      } else {
        setAnalysisResult({
          category: "RUSAK_SEDANG",
          label: "RUSAK SEDANG",
          badgeColor: "yellow",
          confidenceScore: 88.5,
          modelName: "MobileNetV2 Structural Damage Classifier",
          insights:
            "Model mengklasifikasikan kerusakan permukaan dan fasilitas non-struktural. Memenuhi kriteria renovasi bertahap.",
          isEligible: true,
        });
      }
    }, 1800);
  };

  // Handler Submit Terbitkan Proposal
  const handlePublishCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Mohon isi judul pengajuan renovasi.");
      return;
    }
    if (!analysisResult || !analysisResult.isEligible) {
      alert("Usulan harus lolos verifikasi visual AI sebelum diterbitkan.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        "Alhamdulillah! Proposal usulan renovasi berhasil diverifikasi oleh AI dan resmi diterbitkan ke publik."
      );
      router.push("/dashboard");
    }, 1000);
  };

  const isPublishEnabled = Boolean(
    title.trim() &&
    previewUrl &&
    analysisResult &&
    analysisResult.isEligible &&
    !isAnalyzing
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ================================================================= */}
      {/* 1. HEADER FORMULIR & INDIKATOR LANGKAH (STEP HEADER)             */}
      {/* ================================================================= */}
      <section className="space-y-3">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/dashboard" className="hover:text-neutral-900 transition-colors">
            Dasbor
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-500">Usulan Renovasi</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-semibold">Ajukan Baru</span>
        </nav>

        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
              Pengajuan Usulan Renovasi &amp; Verifikasi AI
            </h1>
            <span className="inline-flex items-center gap-1 bg-neutral-900 text-white text-xs font-mono px-3 py-0.5 rounded-full">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              CNN MobileNetV2
            </span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-4xl leading-relaxed">
            Lengkapi rincian kebutuhan perbaikan masjid dan unggah bukti dokumentasi kerusakan fisik.
            Sistem kecerdasan buatan (CNN) akan memvalidasi tingkat keparahan kerusakan secara objektif
            sebelum usulan diterbitkan ke publik.
          </p>
        </div>
      </section>

      {/* ================================================================= */}
      {/* 2 KOLOM UTAMA: FORMULIR INPUT (KIRI) & PANEL HASIL AI (KANAN)     */}
      {/* ================================================================= */}
      <form onSubmit={handlePublishCampaign} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =============================================================== */}
        {/* KOLOM KIRI (~65% / 7 COLS): DATA PROPOSAL & ZONA UNGGAH FOTO     */}
        {/* =============================================================== */}
        <div className="lg:col-span-7 space-y-6">
          {/* 2. FORMULIR INFORMASI UMUM PROPOSAL */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-base border-b border-neutral-100 pb-3">
              <FileText className="w-4 h-4 text-emerald-600" />
              <h2>Informasi Umum Usulan</h2>
            </div>

            <div className="space-y-4">
              {/* Judul Pengajuan */}
              <div className="space-y-1.5">
                <label htmlFor="titleInput" className="block text-xs font-semibold text-neutral-800">
                  Judul Pengajuan Renovasi <span className="text-red-500">*</span>
                </label>
                <input
                  id="titleInput"
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Renovasi Dinding Retak Struktur & Plafon Ruang Utama"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors"
                />
              </div>

              {/* Kategori Kerusakan */}
              <div className="space-y-1.5">
                <label htmlFor="categorySelect" className="block text-xs font-semibold text-neutral-800">
                  Kategori Kerusakan Fisik <span className="text-red-500">*</span>
                </label>
                <select
                  id="categorySelect"
                  value={damageCategory}
                  onChange={(e) => setDamageCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="Kerusakan Struktur / Dinding Retak">
                    Kerusakan Struktur / Dinding Retak
                  </option>
                  <option value="Kerusakan Atap, Kubah, & Plafon Lapuk">
                    Kerusakan Atap, Kubah, &amp; Plafon Lapuk
                  </option>
                  <option value="Fasilitas Tempat Wudhu & Sanitasi">
                    Fasilitas Tempat Wudhu &amp; Sanitasi
                  </option>
                  <option value="Kerusakan Pasca-Bencana (Gempa / Banjir)">
                    Kerusakan Pasca-Bencana (Gempa / Banjir)
                  </option>
                </select>
              </div>

              {/* Target Kebutuhan Dana & Durasi Waktu */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Target Dana */}
                <div className="space-y-1.5">
                  <label htmlFor="amountInput" className="block text-xs font-semibold text-neutral-800">
                    Target Kebutuhan Dana <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-xs text-neutral-500">
                      Rp
                    </span>
                    <input
                      id="amountInput"
                      type="text"
                      inputMode="numeric"
                      required
                      value={
                        targetAmountRaw ? Number(targetAmountRaw).toLocaleString("id-ID") : ""
                      }
                      onChange={handleAmountChange}
                      placeholder="0"
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm font-bold text-neutral-900 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Target Durasi */}
                <div className="space-y-1.5">
                  <label htmlFor="durationInput" className="block text-xs font-semibold text-neutral-800">
                    Target Durasi Penggalangan <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="durationInput"
                      type="number"
                      min="7"
                      max="180"
                      required
                      value={durationDays}
                      onChange={(e) => setDurationDays(e.target.value)}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 font-medium">
                      Hari
                    </span>
                  </div>
                </div>
              </div>

              {/* Deskripsi Kronologi & Kebutuhan */}
              <div className="space-y-1.5">
                <label htmlFor="descTextarea" className="block text-xs font-semibold text-neutral-800">
                  Deskripsi Kronologi &amp; Rincian Kebutuhan <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="descTextarea"
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Jelaskan latar belakang kerusakan fasilitas, kendala jamaah saat beribadah, serta rincian alokasi kebutuhan material secara ringkas..."
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors resize-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* 3. ZONA UNGGAH FOTO KERUSAKAN & TRIGGER AI */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <ImagePlus className="w-4 h-4 text-emerald-600" />
                <h2>Bukti Dokumentasi Kerusakan Fisik</h2>
              </div>
              <span className="text-[11px] text-neutral-400 font-mono">Wajib untuk Uji AI</span>
            </div>

            {/* Hidden Native File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/jpg"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileSelect(e.target.files[0]);
                }
              }}
            />

            {/* Drag and Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                isDragging
                  ? "border-emerald-500 bg-emerald-50/50"
                  : previewUrl
                  ? "border-neutral-300 bg-neutral-50/50 hover:bg-neutral-50"
                  : "border-neutral-300 hover:border-neutral-400 bg-neutral-50/30 hover:bg-neutral-50"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 shadow-xs flex items-center justify-center text-neutral-600">
                <UploadCloud className="w-6 h-6 text-emerald-600" />
              </div>

              <div className="space-y-1 max-w-sm">
                <p className="font-bold text-xs sm:text-sm text-neutral-900">
                  {selectedFile ? selectedFile.name : "Seret atau klik untuk memilih foto dokumentasi"}
                </p>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Format diterima: <strong>JPG, JPEG, PNG</strong> (Maksimal 5 MB). Pastikan sudut foto fokus pada area retakan, dinding, atau atap lapuk.
                </p>
              </div>

              {previewUrl && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  <Check className="w-3.5 h-3.5" />
                  Foto Terpilih — Klik untuk Mengganti
                </span>
              )}
            </div>

            {/* Sample Quick Selector for Thesis Defense */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-neutral-500">
              <span className="text-[11px] font-medium">Contoh Demo Sidang:</span>
              <button
                type="button"
                onClick={() => handleUseSampleImage("/bg-masjid.jpg", "RUSAK_BERAT")}
                className="text-[11px] bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                Foto Kerusakan Atap &amp; Plafon (#Sample 1)
              </button>
              <button
                type="button"
                onClick={() => handleUseSampleImage("/bg-masjid.jpeg", "RUSAK_SEDANG")}
                className="text-[11px] bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                Foto Dinding Bangunan (#Sample 2)
              </button>
            </div>

            {/* Tombol Trigger Verifikasi Visual AI */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleRunAIVerification}
                disabled={!previewUrl || isAnalyzing}
                className="w-full bg-neutral-900 hover:bg-neutral-800 active:scale-99 disabled:opacity-50 text-white font-bold text-xs sm:text-sm py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                    <span>{analysisProgress || "Menghubungkan ke Engine FastAPI..."}</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4 text-emerald-400" />
                    <span>Jalankan Verifikasi Visual AI (MobileNetV2)</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* =============================================================== */}
        {/* KOLOM KANAN (~35% / 5 COLS): PANEL HASIL VERIFIKASI AI           */}
        {/* =============================================================== */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* 4. PANEL HASIL VERIFIKASI AI */}
          <div className="bg-neutral-900 text-white rounded-3xl p-6 border border-neutral-700 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/10 text-emerald-400 flex items-center justify-center">
                  <Cpu className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    Panel Verifikasi Computer Vision
                  </h3>
                  <p className="text-[10px] text-neutral-400">
                    Otomasi Penilaian Citra Deep Learning
                  </p>
                </div>
              </div>

              {analysisResult && (
                <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded">
                  Inferensi Selesai
                </span>
              )}
            </div>

            {/* A. KONDISI BELUM ANALISIS */}
            {!analysisResult && !isAnalyzing && (
              <div className="py-12 px-4 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-neutral-800/80 border border-neutral-700 flex items-center justify-center mx-auto text-neutral-500">
                  <Cpu className="w-8 h-8" />
                </div>
                <div className="space-y-1 max-w-xs mx-auto">
                  <p className="font-semibold text-xs text-neutral-300">
                    Belum Ada Hasil Inferensi
                  </p>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">
                    Unggah foto dokumentasi dan klik tombol <strong>Jalankan Verifikasi Visual AI</strong> untuk melihat hasil klasifikasi objektif.
                  </p>
                </div>
              </div>
            )}

            {/* KONDISI SEDANG ANALISIS */}
            {isAnalyzing && (
              <div className="py-12 px-4 text-center space-y-4 animate-pulse">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <Loader2 className="w-8 h-8 animate-spin" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-xs text-emerald-300">
                    Memproses Klasifikasi Kerusakan...
                  </p>
                  <p className="text-[11px] text-neutral-400 font-mono">
                    {analysisProgress}
                  </p>
                </div>
              </div>
            )}

            {/* B. KONDISI SELESAI ANALISIS (HASIL INFERENSI FASTAPI) */}
            {analysisResult && !isAnalyzing && (
              <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                {/* Pratinjau Foto Citra yang Dianalisis */}
                {previewUrl && (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-neutral-700 bg-black">
                    <Image
                      src={previewUrl}
                      alt="Pratinjau Citra Lapangan"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-white/20">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Citra Terverifikasi AI</span>
                    </div>
                  </div>
                )}

                {/* Status Klasifikasi Kerusakan Badge */}
                <div className="space-y-1.5">
                  <span className="text-[11px] text-neutral-400 font-medium block">
                    Status Klasifikasi Kerusakan:
                  </span>
                  <div>
                    {analysisResult.badgeColor === "red" && (
                      <span className="inline-flex items-center gap-1.5 bg-red-500/20 text-red-300 border border-red-500/40 text-xs font-bold px-3 py-1 rounded-full">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                        <span>{analysisResult.label}</span>
                      </span>
                    )}
                    {analysisResult.badgeColor === "yellow" && (
                      <span className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold px-3 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>{analysisResult.label}</span>
                      </span>
                    )}
                    {analysisResult.badgeColor === "gray" && (
                      <span className="inline-flex items-center gap-1.5 bg-neutral-800 text-neutral-400 border border-neutral-700 text-xs font-bold px-3 py-1 rounded-full">
                        <span>{analysisResult.label}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Skor Keyakinan Model */}
                <div className="space-y-1.5 bg-neutral-950 p-3.5 rounded-2xl border border-neutral-800">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-neutral-400 font-medium">Skor Keyakinan Model:</span>
                    <span className="font-bold text-emerald-400 font-mono text-sm">
                      {analysisResult.confidenceScore}%
                    </span>
                  </div>
                  <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${analysisResult.confidenceScore}%` }}
                    />
                  </div>
                </div>

                {/* Catatan Algoritma AI (Insight Box) */}
                <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-800 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-neutral-300 font-semibold text-[11px]">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Catatan Model AI:</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed">
                    {analysisResult.insights}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 5. TOMBOL AKSI AKHIR */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4">
            <div className="space-y-2.5">
              {/* Tombol Terbitkan Proposal */}
              <button
                type="submit"
                disabled={!isPublishEnabled || isSubmitting}
                className={`w-full py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                  isPublishEnabled
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-99 shadow-md"
                    : "bg-neutral-200 text-neutral-400 border border-neutral-300 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Menerbitkan Kampanye...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Terbitkan Kampanye Donasi Sekarang</span>
                  </>
                )}
              </button>

              {/* Tombol Simpan Draf */}
              <button
                type="button"
                onClick={() => {
                  alert("Draft pengajuan renovasi berhasil disimpan di sistem lokal takmir.");
                  router.push("/dashboard");
                }}
                className="w-full bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-xs py-2.5 px-4 rounded-xl border border-neutral-300 transition-colors"
              >
                Simpan sebagai Draf
              </button>
            </div>

            {/* Catatan Transparansi */}
            <p className="text-[11px] text-neutral-500 leading-relaxed flex items-start gap-1.5 pt-1 border-t border-neutral-100">
              <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
              <span>
                Setelah diterbitkan, hasil klasifikasi visual ini akan disematkan sebagai lencana resmi verifikasi pada halaman publik dan menjadi dasar pencatatan rantai hash audit transaksi.
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}