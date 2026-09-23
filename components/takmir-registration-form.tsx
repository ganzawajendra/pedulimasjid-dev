"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, CheckCircle2, UserCheck, Building2 } from "lucide-react";

export default function TakmirRegistrationForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);

  const [formData, setFormData] = useState({
    // Form Step 1 -> Data Pengurus
    fullName: "",
    position: "",
    phone: "",
    email: "",
    password: "",
    // Form Step 2 -> Profil Rumah Ibadah
    mosqueName: "",
    city: "",
    address: "",
    bankName: "",
    accountNumber: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validasi Semua field harus terisi
  const isStep1Valid =
    formData.fullName.trim() !== "" &&
    formData.position !== "" &&
    formData.phone.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "";

  // Validasi Semua field profil masjid harus terisi
  const isStep2Valid =
    formData.mosqueName.trim() !== "" &&
    formData.city.trim() !== "" &&
    formData.address.trim() !== "" &&
    formData.bankName !== "" &&
    formData.accountNumber.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && isStep1Valid) {
      setStep(2);
    } else if (step === 2 && isStep2Valid) {
      // Sementara diarahkan ke dasbor
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full max-w-2xl bg-neutral-50 border border-neutral-300 rounded-2xl p-6 md:p-8 shadow-xs">
      {/* Stepper Header */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-5 mb-6">
        {/* Step 1 -> Data Pengurus */}
        <div className={`flex items-center gap-3 transition-colors ${step === 1 ? "text-neutral-900 font-semibold" : "text-neutral-500"}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step === 1 ? "bg-black text-white"
                : isStep1Valid
                ? "bg-green-600 text-white"
                : "bg-neutral-200 text-neutral-600"
            }`}>
            {isStep1Valid && step === 2 ? <CheckCircle2 className="w-4 h-4" /> : "1"}
          </div>
          <div className="text-left">
            <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">Langkah 1</p>
            <p className="text-sm font-medium">Data Takmir</p>
          </div>
        </div>

        <div className="h-0.5 w-12 bg-neutral-600 hidden sm:block" />

        {/* Step 2 -> Profil Rumah Ibadah */}
        <div className={`flex items-center gap-3 transition-colors ${step === 2 ? "text-neutral-900 font-semibold" : "text-neutral-500"}`}>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              step === 2
                ? "bg-black text-white"
                : "bg-neutral-200 text-neutral-600"
            }`}>
            2
          </div>
          <div className="text-left">
            <p className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
              Langkah 2
            </p>
            <p className="text-sm font-medium">Profil Rumah Ibadah</p>
          </div>
        </div>
      </div>
      
      {/* Form Data Takmir dan Rumah Ibadah */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Form Data Takmir */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-center gap-2 pb-2 text-neutral-800">
              <UserCheck className="w-5 h-5 text-black" />
              <h4 className="font-semibold text-base">Identitas &amp; Akun Takmir</h4>
            </div>
            {/* Nama Lengkap Takmir */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Nama Lengkap Takmir <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="contoh: H. Ahmad Fauzi"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <p className="text-xs text-neutral-500 mt-1">
                Menandai penanggung jawab utama atas proposal dan penarikan kas material nanti.
              </p>
            </div>

            {/* Jabatan Kepengurusan */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Jabatan Kepengurusan <span className="text-red-500">*</span>
              </label>
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black"
                required
              >
                <option value="">-- Pilih Jabatan --</option>
                <option value="Ketua DKM">Ketua DKM</option>
                <option value="Sekretaris">Sekretaris</option>
                <option value="Bendahara">Bendahara</option>
                <option value="Ketua Panitia Pembangunan">Ketua Panitia Pembangunan</option>
              </select>
            </div>

            {/* Nomor WhatsApp / HP */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Nomor WhatsApp / HP Aktif <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="contoh: 081234567890"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Alamat Email */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Alamat Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contoh: ahmad.fauzi@gmail.com"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <p className="text-xs text-neutral-500 mt-1">
                Username untuk login ke sistem dasbor.
              </p>
            </div>

            {/* Kata Sandi (Password) */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Kata Sandi (Password) <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan kata sandi aman"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Tombol Lanjut ke Step 2 */}
            <div className="pt-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                disabled={!isStep1Valid}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  isStep1Valid
                    ? "bg-black text-white hover:bg-neutral-800 cursor-pointer shadow-sm"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
              >
                <span>Lanjut</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Form Profil Rumah Ibadah */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-center gap-2 pb-2 text-neutral-800">
              <Building2 className="w-5 h-5 text-neutral-700" />
              <h4 className="font-semibold text-base">Profil &amp; Rekening Rumah Ibadah</h4>
            </div>

            {/* Nama Rumah Ibadah */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Nama Rumah Ibadah <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="mosqueName"
                value={formData.mosqueName}
                onChange={handleChange}
                placeholder="contoh: Masjid Jami' Baiturrahman"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <p className="text-xs text-neutral-500 mt-1">
                Nama masjid yang akan tampil pada kartu kampanye publik.
              </p>
            </div>

            {/* Kabupaten / Kota */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Kabupaten / Kota <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="contoh: Kab. Sleman, D.I. Yogyakarta"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <p className="text-xs text-neutral-500 mt-1">
                Penanda geografis yang muncul di bagian atas kartu kampanye.
              </p>
            </div>

            {/* Alamat Lengkap */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Alamat Lengkap <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                placeholder="contoh: Jl. Kaliurang KM 12, RT 02/RW 05, Candi Karang"
                className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                required
              />
              <p className="text-xs text-neutral-500 mt-1">
                Detail lokasi untuk akurasi data.
              </p>
            </div>

            {/* Informasi Rekening */}
            <div className="mb-6">
              <label className="block text-xs font-semibold text-neutral-800 mb-1">
                Informasi Rekening <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                >
                  <option value="">-- Pilih Bank --</option>
                  <option value="BSI">BSI (Bank Syariah Indonesia)</option>
                  <option value="Mandiri">Bank Mandiri</option>
                  <option value="BRI">Bank BRI</option>
                  <option value="BCA">Bank BCA</option>
                </select>
                <input
                  type="text"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  placeholder="Nomor Rekening (contoh: 7123456789)"
                  className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <p className="text-xs text-neutral-500 mt-1">
                Tujuan pencairan donasi saat target renovasi tercapai.
              </p>
            </div>

            {/* Tombol Aksi Step 2 */}
            <div className="flex items-center gap-3 pt-3">
              {/* Kembali ke Step 1 */}
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-3 px-4 rounded-lg font-semibold text-sm border border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Kembali</span>
              </button>

              {/* Submit */}
              <button
                type="submit"
                disabled={!isStep2Valid}
                className={`flex-2 py-3 px-4 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                  isStep2Valid
                    ? "bg-black text-white hover:bg-neutral-800 cursor-pointer shadow-sm"
                    : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                }`}
              >
                <span>Daftar &amp; Masuk ke Dasbor</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
