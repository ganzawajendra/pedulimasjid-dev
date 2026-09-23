"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  CreditCard,
  Building,
  Heart,
  User,
  Mail,
  MessageSquare,
  Sparkles,
  Info,
  Check,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

const PRESET_AMOUNTS = [
  25000, 50000, 100000, 250000, 500000, 1000000,
];

const PAYMENT_METHODS = [
  {
    id: "qris",
    category: "instan",
    name: "QRIS (Pembayaran Instan)",
    description: "Scan via GoPay, OVO, DANA, ShopeePay, BCA Mobile & Semua M-Banking",
    icon: QrCode,
    badge: "Instan & Otomatis",
  },
  {
    id: "va_bca",
    category: "va",
    name: "BCA Virtual Account",
    description: "Verifikasi otomatis 24 jam",
    icon: CreditCard,
    badge: "Otomatis",
  },
  {
    id: "va_mandiri",
    category: "va",
    name: "Mandiri Virtual Account",
    description: "Verifikasi otomatis 24 jam",
    icon: CreditCard,
    badge: "Otomatis",
  },
  {
    id: "va_bsi",
    category: "va",
    name: "BSI Virtual Account (Syariah)",
    description: "Verifikasi otomatis 24 jam",
    icon: CreditCard,
    badge: "Otomatis",
  },
  {
    id: "va_bri",
    category: "va",
    name: "BRI Virtual Account (BRIVA)",
    description: "Verifikasi otomatis 24 jam",
    icon: CreditCard,
    badge: "Otomatis",
  },
  {
    id: "manual_bsi",
    category: "manual",
    name: "Manual Transfer Bank Syariah (BSI)",
    description: "Transfer langsung ke Rekening Resmi Takmir Masjid",
    icon: Building,
    badge: "Manual",
  },
];

export default function DonatePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const campaignId = resolvedParams.id;

  const router = useRouter();

  // State Donasi
  const [selectedPreset, setSelectedPreset] = useState<number | null>(100000);
  const [customAmount, setCustomAmount] = useState<string>("100000");

  // State Identitas Donatur
  const [donorName, setDonorName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [contactInfo, setContactInfo] = useState("");
  const [prayerMessage, setPrayerMessage] = useState("");

  // State Metode Pembayaran
  const [paymentMethod, setPaymentMethod] = useState("qris");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "instan" | "va" | "manual">("all");

  // Format angka ke format Rupiah
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const currentAmount = Number(customAmount.replace(/\D/g, "")) || 0;
  const isAmountValid = currentAmount >= 10000;

  const handleSelectPreset = (amount: number) => {
    setSelectedPreset(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    setCustomAmount(rawValue);
    const parsed = Number(rawValue);
    if (PRESET_AMOUNTS.includes(parsed)) {
      setSelectedPreset(parsed);
    } else {
      setSelectedPreset(null);
    }
  };

  const handleAnonymousToggle = (checked: boolean) => {
    setIsAnonymous(checked);
    if (checked) {
      setDonorName("Hamba Allah");
    } else {
      setDonorName("");
    }
  };

  const filteredPaymentMethods = PAYMENT_METHODS.filter((m) => {
    if (selectedCategory === "all") return true;
    return m.category === selectedCategory;
  });

  return (
    <div className="pt-24 px-4 sm:px-6 md:px-12 lg:px-24 pb-24 min-h-screen bg-neutral-50/50">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Tombol Kembali / Breadcrumb Nav */}
        <div className="flex items-center justify-between">
          <Link
            href={`/campaigns/${campaignId}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Detail Kampanye</span>
          </Link>
          <span className="text-xs font-mono bg-neutral-200/70 text-neutral-700 px-2.5 py-1 rounded-md">
            ID: PM-{campaignId.toUpperCase()}
          </span>
        </div>

        {/* 1. RINGKASAN MINI KAMPANYE */}
        <section className="bg-white rounded-2xl p-4 sm:p-5 border border-neutral-200 shadow-xs">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Foto dan Thumbnail Masjid */}
            <div className="relative w-full sm:w-28 h-24 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-neutral-200 bg-neutral-100">
              <Image
                src="/bg-masjid.jpg"
                alt="Thumbnail Masjid"
                fill
                className="object-cover"
              />
            </div>

            {/* Info Singkat */}
            <div className="flex-1 min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                {/* Badge AI */}
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                  <span>Terverifikasi: Rusak Berat</span>
                </span>
                <span className="text-[11px] text-neutral-400 font-mono">
                  • AI Computer Vision 94%
                </span>
              </div>

              <h1 className="text-base sm:text-lg font-bold text-neutral-900 leading-snug line-clamp-2">
                Renovasi Atap Kubah & Dinding Utama Masjid Al-Muhajirin
              </h1>

              {/* Lokasi Singkat */}
              <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>Kab. Sleman, D.I. Yogyakarta</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PILIHAN NOMINAL DONASI */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200 shadow-xs space-y-5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-neutral-900">
              Pilih Nominal Donasi
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Pilih nominal donasi cepat atau tentukan sendiri nominal donasi Anda
            </p>
          </div>

          {/* Grid 2x3 Preset Tombol Cepat */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PRESET_AMOUNTS.map((amount) => {
              const isSelected = selectedPreset === amount && currentAmount === amount;
              return (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleSelectPreset(amount)}
                  className={`py-3.5 px-4 rounded-xl font-semibold text-sm transition-all border text-center flex flex-col items-center justify-center gap-0.5 ${
                    isSelected
                      ? "border-black bg-neutral-900 text-white shadow-xs"
                      : "border-neutral-200 bg-neutral-50 hover:bg-neutral-100/80 text-neutral-900"
                  }`}
                >
                  <span>{formatRupiah(amount)}</span>
                </button>
              );
            })}
          </div>

          {/* Input Nominal Bebas */}
          <div className="space-y-2 pt-2">
            <label
              htmlFor="customAmountInput"
              className="block text-xs font-semibold text-neutral-700"
            >
              Atau Masukkan Nominal Donasi Bebas
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-neutral-500">
                Rp
              </span>
              <input
                id="customAmountInput"
                type="text"
                inputMode="numeric"
                value={
                  customAmount
                    ? Number(customAmount).toLocaleString("id-ID")
                    : ""
                }
                onChange={handleCustomAmountChange}
                placeholder="0"
                className={`w-full pl-12 pr-4 py-3 bg-neutral-50 border rounded-xl font-bold text-base text-neutral-900 focus:outline-hidden focus:bg-white transition-colors ${
                  customAmount && !isAmountValid
                    ? "border-red-400 focus:border-red-500"
                    : "border-neutral-300 focus:border-neutral-900"
                }`}
              />
            </div>

            {/* Validation helper */}
            <div className="flex items-center justify-between text-xs px-1">
              {customAmount && !isAmountValid ? (
                <span className="text-red-500 font-medium">
                  Minimal donasi adalah Rp 10.000
                </span>
              ) : (
                <span className="text-neutral-500">
                  Minimal transaksi donasi sebesar <strong>Rp 10.000</strong>
                </span>
              )}
              {isAmountValid && (
                <span className="text-neutral-600 font-medium font-mono text-[11px]">
                  Terpilih: {formatRupiah(currentAmount)}
                </span>
              )}
            </div>
          </div>
        </section>

        {/* 3. DATA IDENTITAS DONATUR */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200 shadow-xs space-y-5">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-neutral-900">
              Data Identitas Donatur
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Informasi Anda dilindungi dan kuitansi transaksi akan dikirim otomatis
            </p>
          </div>

          <div className="space-y-4">
            {/* Nama Lengkap / Alias & Checkbox Anonim */}
            <div className="space-y-2">
              <label
                htmlFor="donorNameInput"
                className="block text-xs font-semibold text-neutral-700"
              >
                Nama Lengkap / Alias <span className="text-neutral-400 font-normal">(Wajib diisi)</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="donorNameInput"
                  type="text"
                  disabled={isAnonymous}
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Nama lengkap Anda"
                  className={`w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors ${
                    isAnonymous ? "bg-neutral-100 text-neutral-500 cursor-not-allowed italic" : ""
                  }`}
                />
              </div>

              {/* Checkbox Anonim */}
              <label className="flex items-center gap-2.5 cursor-pointer pt-1 group select-none">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => handleAnonymousToggle(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 accent-neutral-900 cursor-pointer"
                />
                <span className="text-xs text-neutral-700 font-medium group-hover:text-neutral-900">
                  Sembunyikan nama saya (Donasi sebagai <strong>Hamba Allah</strong>)
                </span>
              </label>
            </div>

            {/* Email atau Nomor WhatsApp */}
            <div className="space-y-1.5">
              <label
                htmlFor="contactInfoInput"
                className="block text-xs font-semibold text-neutral-700"
              >
                Alamat Email atau Nomor WhatsApp <span className="text-neutral-400 font-normal">(Untuk pelacakan)</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="contactInfoInput"
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="contoh@email.com atau 08123456789"
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors"
                />
              </div>
              <p className="text-[11px] text-neutral-500 flex items-start gap-1.5 leading-relaxed pt-0.5">
                <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>
                  Digunakan untuk mengirim bukti kuitansi digital dan <strong>Transaction Hash ID</strong> unik agar donatur bisa melacak posisi uangnya di halaman audit mutasi.
                </span>
              </p>
            </div>

            {/* Pesan Doa / Dukungan (Opsional) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="prayerMessageInput"
                  className="block text-xs font-semibold text-neutral-700"
                >
                  Pesan Doa & Dukungan
                </label>
                <span className="text-[11px] text-neutral-400 font-medium">Opsional</span>
              </div>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                <textarea
                  id="prayerMessageInput"
                  rows={3}
                  value={prayerMessage}
                  onChange={(e) => setPrayerMessage(e.target.value)}
                  placeholder="Tuliskan doa atau pesan dukungan untuk renovasi masjid ini..."
                  className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-300 rounded-xl text-sm text-neutral-900 focus:outline-hidden focus:border-neutral-900 focus:bg-white transition-colors resize-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. METODE PEMBAYARAN */}
        <section className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-neutral-900">
                Pilih Metode Pembayaran
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Tersedia metode pembayaran instan, virtual account, dan transfer bank
              </p>
            </div>

            {/* Filter Kategori Tab */}
            <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl text-xs font-medium self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSelectedCategory("all")}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedCategory === "all"
                    ? "bg-white text-neutral-900 shadow-xs font-semibold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Semua
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("instan")}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedCategory === "instan"
                    ? "bg-white text-neutral-900 shadow-xs font-semibold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                QRIS
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("va")}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedCategory === "va"
                    ? "bg-white text-neutral-900 shadow-xs font-semibold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Virtual Account
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("manual")}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedCategory === "manual"
                    ? "bg-white text-neutral-900 shadow-xs font-semibold"
                    : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                Transfer Manual
              </button>
            </div>
          </div>

          {/* List Metode Pembayaran */}
          <div className="space-y-2.5">
            {filteredPaymentMethods.map((method) => {
              const isSelected = paymentMethod === method.id;
              const IconComponent = method.icon;

              return (
                <label
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex items-start sm:items-center justify-between p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "border-neutral-900 bg-neutral-50/80 ring-1 ring-neutral-900"
                      : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/40"
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-neutral-100 text-neutral-700 border-neutral-200"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-neutral-900">
                          {method.name}
                        </span>
                        <span className="text-[10px] bg-neutral-100 text-neutral-600 font-medium px-2 py-0.5 rounded border border-neutral-200">
                          {method.badge}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
                        {method.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-1 sm:pt-0 pl-2">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-neutral-900 bg-neutral-900 text-white"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </section>

        {/* 5. KOTAK INFORMASI INTEGRITAS */}
        <section className="bg-gradient-to-br from-emerald-50/80 via-emerald-50/40 to-neutral-50 rounded-2xl p-5 sm:p-6 border border-emerald-200/80 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-emerald-950">
                  Jaminan Integritas & Transparansi Kriptografis
                </h3>
                <span className="inline-flex items-center text-[10px] font-mono font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300/60">
                  SHA-256 Verified
                </span>
              </div>

              <p className="text-xs text-emerald-900/90 leading-relaxed">
                Transaksi Anda akan dicatat langsung ke dalam buku besar kriptografi publik (SHA-256 Hash Chain). Anda dapat memverifikasi pencatatan saldo dan penggunaannya untuk pembelian material fisik secara transparan kapan saja.
              </p>
            </div>
          </div>
        </section>

        {/* 6. TOMBOL AKSI UTAMA */}
        <section className="space-y-3 pt-2">
          {/* Tombol Primer Dinamis */}
          <button
            type="button"
            disabled={!isAmountValid}
            onClick={() => {
              if (isAmountValid) {
                const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
                const dummyTxId = `TX-${Date.now().toString().slice(-4)}${randomHex}`;
                router.push(`/campaigns/${campaignId}/donate/success?tx=${dummyTxId}`);
              }
            }}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-sm ${
              isAmountValid
                ? "bg-neutral-900 text-white hover:bg-neutral-800 hover:shadow-md cursor-pointer active:scale-[0.99]"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed border border-neutral-300"
            }`}
          >
            <Heart className={`w-5 h-5 ${isAmountValid ? "fill-white text-white" : "text-neutral-400"}`} />
            <span>
              {isAmountValid
                ? `Donasi Sekarang • ${formatRupiah(currentAmount)}`
                : "Masukkan Nominal Donasi (Min. Rp 10.000)"}
            </span>
          </button>

          {/* Navigasi Batal */}
          <div className="text-center pt-2">
            <Link
              href={`/campaigns/${campaignId}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-900 transition-colors py-1 px-3 rounded-lg hover:bg-neutral-100"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Batalkan dan Kembali ke Detail Kampanye</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}