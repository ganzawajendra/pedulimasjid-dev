"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Receipt,
  Camera,
  UploadCloud,
  ShieldCheck,
  Lock,
  Wallet,
  Calendar,
  Building2,
  ChevronRight,
  ArrowRight,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  Info,
  Check,
  FileText,
  Sparkles,
  Database,
  Hash,
} from "lucide-react";

export default function ExpensesNewPage() {
  const router = useRouter();

  // State Kas & Saldo
  const availableBalance = 10300000; // Rp 10.300.000

  // State Form
  const [selectedCampaign, setSelectedCampaign] = useState("1");
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseCategory, setExpenseCategory] = useState("Material Semen, Pasir, & Pondasi");
  const [amountRaw, setAmountRaw] = useState("2600000");
  const [transactionDate, setTransactionDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [storeName, setStoreName] = useState("Toko Bangunan Sumber Rejeki");
  const [additionalNotes, setAdditionalNotes] = useState("");

  // State Upload Nota & Hash
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>("/nota-semen.jpg");
  const [receiptHash, setReceiptHash] = useState(
    "a1b2c3d4e5f67890e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934c"
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State Checkbox Integritas & Loading Submit
  const [isAgreed, setIsAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const parsedAmount = Number(amountRaw.replace(/\D/g, "")) || 0;
  const isAmountValid = parsedAmount >= 10000 && parsedAmount <= availableBalance;
  const isAmountOverBalance = parsedAmount > availableBalance;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleanNum = e.target.value.replace(/\D/g, "");
    setAmountRaw(cleanNum);
  };

  const generateSimpleHash = (str: string) => {
    // Generate simulated SHA-256 hex digest for visual feedback
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, "0");
    return `${hex}e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`.slice(0, 64);
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
    setReceiptHash(generateSimpleHash(file.name + file.size + Date.now()));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAmountValid) {
      if (isAmountOverBalance) {
        alert("Nominal pencairan melebihi saldo kas yang tersedia!");
      } else {
        alert("Nominal pencairan minimal Rp 10.000.");
      }
      return;
    }

    if (!previewUrl) {
      alert("Wajib melampirkan foto nota belanja fisik asli.");
      return;
    }

    if (!isAgreed) {
      alert("Mohon centang pernyataan integritas dan tanggung jawab takmir.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      alert(
        `Alhamdulillah! Kas keluar sebesar ${formatRupiah(
          parsedAmount
        )} untuk ${expenseTitle || "belanja material"} berhasil dikunci pada Blok #006!`
      );
      router.push("/audit/1");
    }, 1500);
  };

  const isSubmitDisabled =
    !expenseTitle.trim() ||
    !isAmountValid ||
    !previewUrl ||
    !isAgreed ||
    isSubmitting;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* ================================================================= */}
      {/* 1. HEADER & INDIKATOR KAS TERSEDIA (PAGE HEADER & BALANCE INFO)   */}
      {/* ================================================================= */}
      <section className="space-y-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-500">
          <Link href="/dashboard" className="hover:text-neutral-900 transition-colors">
            Dasbor
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-500">Kas &amp; Pengeluaran</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-semibold">Catat Pengeluaran Baru</span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-1 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Pencairan Dana Renovasi &amp; Pencatatan Nota Belanja
              </h1>
              <span className="inline-flex items-center gap-1 bg-neutral-900 text-white text-xs font-mono px-3 py-0.5 rounded-full">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                Linked Hash Chain
              </span>
            </div>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              Catat alokasi pengeluaran dana material atau jasa tukang. Setiap pencairan wajib
              melampirkan foto kuitansi/nota toko fisik yang sah untuk diikatkan secara
              kriptografis ke dalam buku besar publik <em>(tamper-evident ledger)</em>.
            </p>
          </div>

          {/* Kartu Saldo Kas Siap Pakai (Available Balance Box) */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 flex items-center gap-4 shrink-0 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Wallet className="w-6 h-6" />
            </div>
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
                Saldo Kas Siap Pakai
              </span>
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-950 tracking-tight block">
                {formatRupiah(availableBalance)}
              </span>
              <p className="text-[10px] text-emerald-700 font-medium">
                Maksimal penarikan sesuai saldo tersedia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================= */}
      {/* FORMULIR UTAMA (2 KOLOM RESPONSIVE)                               */}
      {/* ================================================================= */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =============================================================== */}
        {/* KOLOM KIRI (~65% / 7 COLS): RINCIAN PENGELUARAN & UNGGAH NOTA   */}
        {/* =============================================================== */}
        <div className="lg:col-span-7 space-y-6">
          {/* 2. FORMULIR RINCIAN PENGELUARAN */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-base border-b border-neutral-100 pb-3">
              <Receipt className="w-4 h-4 text-emerald-600" />
              <h2>Rincian Alokasi Belanja</h2>
            </div>

            <div className="space-y-4">
              {/* Usulan Terkait */}
              <div className="space-y-1.5">
                <label htmlFor="campaignSelect" className="block text-xs font-semibold text-neutral-800">
                  Kampanye / Usulan Terkait <span className="text-red-500">*</span>
                </label>
                <select
                  id="campaignSelect"
                  value={selectedCampaign}
                  onChange={(e) => setSelectedCampaign(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="1">
                    Renovasi Atap Kubah &amp; Dinding Utama Masjid Al-Muhajirin
                  </option>
                </select>
              </div>

              {/* Judul Pengeluaran / Keperluan */}
              <div className="space-y-1.5">
                <label htmlFor="titleInput" className="block text-xs font-semibold text-neutral-800">
                  Keperluan / Uraian Belanja <span className="text-red-500">*</span>
                </label>
                <input
                  id="titleInput"
                  type="text"
                  required
                  value={expenseTitle}
                  onChange={(e) => setExpenseTitle(e.target.value)}
                  placeholder="Contoh: Pembelian 40 Sak Semen Gresik & Pasir Muntilan"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors"
                />
              </div>

              {/* Kategori Pengeluaran */}
              <div className="space-y-1.5">
                <label htmlFor="categorySelect" className="block text-xs font-semibold text-neutral-800">
                  Kategori Pengeluaran <span className="text-red-500">*</span>
                </label>
                <select
                  id="categorySelect"
                  value={expenseCategory}
                  onChange={(e) => setExpenseCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors cursor-pointer"
                >
                  <option value="Material Semen, Pasir, & Pondasi">
                    Material Semen, Pasir, &amp; Pondasi
                  </option>
                  <option value="Material Atap, Kayu, Baja Ringan, & Plafon">
                    Material Atap, Kayu, Baja Ringan, &amp; Plafon
                  </option>
                  <option value="Cat, Kuas, & Finishing Dinding">
                    Cat, Kuas, &amp; Finishing Dinding
                  </option>
                  <option value="Instalasi Listrik & Pipa Air Wudhu">
                    Instalasi Listrik &amp; Pipa Air Wudhu
                  </option>
                  <option value="Upah Tenaga Kerja / Tukang Bangunan">
                    Upah Tenaga Kerja / Tukang Bangunan
                  </option>
                  <option value="Biaya Operasional Mendesak / Lainnya">
                    Biaya Operasional Mendesak / Lainnya
                  </option>
                </select>
              </div>

              {/* Nominal Dana yang Dicairkan & Tanggal Transaksi */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Nominal */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label htmlFor="amountInput" className="block text-xs font-semibold text-neutral-800">
                      Nominal Dicairkan <span className="text-red-500">*</span>
                    </label>
                    {isAmountOverBalance && (
                      <span className="text-[11px] font-bold text-red-600">
                        Melebihi Saldo!
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-xs text-neutral-500">
                      Rp
                    </span>
                    <input
                      id="amountInput"
                      type="text"
                      inputMode="numeric"
                      required
                      value={amountRaw ? Number(amountRaw).toLocaleString("id-ID") : ""}
                      onChange={handleAmountChange}
                      placeholder="0"
                      className={`w-full pl-10 pr-4 py-2.5 bg-neutral-50 border rounded-xl text-xs sm:text-sm font-bold text-neutral-900 focus:outline-hidden focus:bg-white transition-colors ${
                        isAmountOverBalance
                          ? "border-red-400 focus:border-red-500 bg-red-50/30"
                          : "border-neutral-300 focus:border-neutral-900"
                      }`}
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Sisa saldo setelah pencairan:{" "}
                    <strong>{formatRupiah(Math.max(0, availableBalance - parsedAmount))}</strong>
                  </p>
                </div>

                {/* Tanggal Transaksi */}
                <div className="space-y-1.5">
                  <label htmlFor="dateInput" className="block text-xs font-semibold text-neutral-800">
                    Tanggal Pembelian / Nota <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="dateInput"
                      type="date"
                      required
                      value={transactionDate}
                      onChange={(e) => setTransactionDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Nama Toko Bangunan / Penerima Dana */}
              <div className="space-y-1.5">
                <label htmlFor="storeInput" className="block text-xs font-semibold text-neutral-800">
                  Nama Toko Bangunan / Penerima Dana <span className="text-red-500">*</span>
                </label>
                <input
                  id="storeInput"
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Contoh: TB. Sumber Rejeki / Mandor Pak Joko"
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors"
                />
              </div>

              {/* Catatan Tambahan */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label htmlFor="notesTextarea" className="block text-xs font-semibold text-neutral-800">
                    Catatan Tambahan
                  </label>
                  <span className="text-[11px] text-neutral-400">Opsional</span>
                </div>
                <textarea
                  id="notesTextarea"
                  rows={2}
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Tuliskan keterangan detail jika ada diskon toko, termin nota, dll."
                  className="w-full px-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* 3. ZONA UNGGAH BUKTI NOTA / KUITANSI FISIK */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div className="flex items-center gap-2 text-neutral-900 font-bold text-base">
                <Camera className="w-4 h-4 text-emerald-600" />
                <h2>Bukti Foto Kuitansi / Nota Belanja Asli</h2>
              </div>
              <span className="text-[11px] text-red-600 font-semibold">* Wajib Diunggah</span>
            </div>

            {/* Hidden Input */}
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

            {/* Dropzone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-3 ${
                isDragging
                  ? "border-emerald-500 bg-emerald-50/50"
                  : "border-neutral-300 hover:border-neutral-400 bg-neutral-50/40 hover:bg-neutral-50"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-white border border-neutral-200 shadow-xs flex items-center justify-center text-neutral-600">
                <UploadCloud className="w-6 h-6 text-emerald-600" />
              </div>

              <div className="space-y-1 max-w-sm">
                <p className="font-bold text-xs sm:text-sm text-neutral-900">
                  {selectedFile ? selectedFile.name : "Seret atau klik untuk mengunggah foto nota toko"}
                </p>
                <p className="text-[11px] text-neutral-500 leading-relaxed">
                  Pastikan foto terlihat jelas, mencakup nama toko, tanggal, cap/stempel toko, rincian barang, dan nominal total.
                </p>
              </div>

              {previewUrl && (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  <Check className="w-3.5 h-3.5" />
                  Nota Fisik Siap Di-Hash (Klik untuk Ganti Foto)
                </span>
              )}
            </div>

            {/* Ekstraksi Hash Nota (Real-Time Digest) */}
            {previewUrl && (
              <div className="bg-neutral-950 text-white p-4 rounded-2xl border border-neutral-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <Hash className="w-4 h-4" />
                    <span>Image Digest (SHA-256):</span>
                  </div>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-800/60">
                    Unique Signature
                  </span>
                </div>
                <div className="font-mono text-[11px] text-emerald-400 break-all bg-neutral-900 p-2.5 rounded-xl border border-neutral-800 select-all">
                  {receiptHash}
                </div>
                <p className="text-[10px] text-neutral-400 leading-relaxed">
                  Foto nota ini akan di-hash secara unik sehingga bukti struk belanja tidak dapat ditukar atau diganti sepihak di kemudian hari.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* =============================================================== */}
        {/* KOLOM KANAN (~35% / 5 COLS): SIMULASI BLOK & SUBMISSION PANEL   */}
        {/* =============================================================== */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* 4. PANEL SIMULASI BLOK KRIPTOGRAFI */}
          <div className="bg-neutral-900 text-white rounded-3xl p-6 border border-neutral-700 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-white">
                    Simulasi Blok Kriptografi
                  </h3>
                  <p className="text-[10px] text-neutral-400">
                    Pratinjau Penguncian Transaksi SHA-256
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-2 py-0.5 rounded">
                Blok #006
              </span>
            </div>

            {/* Pratinjau Bukti Nota */}
            {previewUrl ? (
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden border border-neutral-700 bg-neutral-950">
                <Image
                  src={previewUrl}
                  alt="Pratinjau Nota Fisik"
                  fill
                  className="object-contain p-2"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md border border-white/20">
                  Pratinjau Nota Toko
                </div>
              </div>
            ) : (
              <div className="p-8 text-center bg-neutral-950 rounded-2xl border border-neutral-800 text-neutral-500 text-xs">
                Unggah foto nota untuk melihat pratinjau
              </div>
            )}

            {/* Previous Hash & Rumus */}
            <div className="space-y-3 text-xs">
              <div className="bg-neutral-950 p-3.5 rounded-2xl border border-neutral-800 space-y-1.5">
                <span className="text-[11px] text-neutral-400 block font-medium">
                  Previous Hash (Induk Terakhir Blok #005):
                </span>
                <div className="font-mono text-[11px] text-neutral-300 truncate">
                  #1f8e9a2b3c4d5e6f7a8b9c0d1e2f3a4b...9e0f
                </div>
              </div>

              <div className="bg-neutral-950 p-3.5 rounded-2xl border border-neutral-800 space-y-1.5">
                <span className="text-[11px] text-neutral-400 block font-medium">
                  Rumus Pembentukan Rantai:
                </span>
                <code className="text-[10px] font-mono text-emerald-400 block leading-relaxed">
                  Current_Hash = SHA-256(Block_Index + Timestamp + Outflow_Amount + Receipt_Hash + Prev_Hash)
                </code>
              </div>

              <div className="flex items-center gap-2 text-emerald-400 text-xs bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-2xl">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Siap Mengunci Transaksi ke Buku Kas Terbuka</span>
              </div>
            </div>
          </div>

          {/* 5. PERNYATAAN INTEGRITAS & TOMBOL SUBMIT */}
          <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-5">
            {/* Checkbox Tanggung Jawab */}
            <label className="flex items-start gap-3 cursor-pointer select-none group">
              <input
                type="checkbox"
                required
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900 cursor-pointer"
              />
              <span className="text-xs text-neutral-700 leading-relaxed group-hover:text-neutral-900">
                Saya menyatakan dengan sesungguhnya bahwa transaksi belanja fisik ini benar, nota yang diunggah adalah asli dari penyedia barang/jasa, dan siap dipertanggungjawabkan kepada para donatur secara terbuka.
              </span>
            </label>

            {/* Tombol Aksi Submit & Batal */}
            <div className="space-y-2.5 pt-1">
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={`w-full py-3.5 px-5 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs ${
                  !isSubmitDisabled
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-99 shadow-md"
                    : "bg-neutral-200 text-neutral-400 border border-neutral-300 cursor-not-allowed"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>Menghitung Rantai Hash SHA-256 &amp; Menyimpan Data...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Kunci Transaksi &amp; Simpan Kas Keluar</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="w-full bg-white hover:bg-neutral-50 text-neutral-700 font-semibold text-xs py-2.5 px-4 rounded-xl border border-neutral-300 transition-colors cursor-pointer text-center"
              >
                Batal dan Kembali
              </button>
            </div>

            {/* Pengingat Transparansi */}
            <p className="text-[11px] text-neutral-500 leading-relaxed flex items-start gap-1.5 pt-1 border-t border-neutral-100">
              <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
              <span>
                Setiap nominal kas yang dicairkan akan langsung terlihat oleh publik pada halaman audit. Pastikan nota belanja toko bangunan terfoto dengan jelas guna menjaga kepercayaan para donatur.
              </span>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}