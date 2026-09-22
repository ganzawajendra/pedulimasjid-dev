import Image from "next/image";
import { ChevronDown } from "lucide-react";
import SocialProofStripCard from "@/components/social-proof-strip-card";
import ProblemSolutionCard from "@/components/problem-solution-card";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="border-b-1 h-[64px] flex items-center justify-between px-20 hidden">
        <Image
          src="/logo-black.png"
          width={110}
          height={62}
          alt="Logo Peduli Masjid Dark"
          className="w-[110px] h-auto"
        />
        <div className="nav-menu flex items-center gap-10">
          <a href="">Kampanye</a>
          <a href="">Cara Kerja</a>
          <a href="">Fitur Integritas</a>
          <a href="">Audit & Transparansi</a>
        </div>
        <div className="action bg-black text-[var(--background)] px-3 py-1 rounded">
          <a href="">Masuk</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        {/* Gambar Background Fullscreen */}
        <Image
          src="/bg-masjid.jpg"
          alt="Latar Belakang Masjid"
          fill
          priority // Prioritas unduh cepat karena berada di atas lipatan layar
          className="object-cover object-center -z-10"
        />

        {/* Lapisan Overlay Gelap (Opsional, agar teks putih terbaca jelas) */}
        <div className="absolute inset-0 bg-black/50 -z-10" />

        {/* Konten Hero (Teks, Tombol, dsb) */}
        <div className="flex flex-col items-center justify-center text-center text-white h-120">
          <Image
            src="/logo-white.png"
            width={150}
            height={85}
            alt="Logo Peduli Masjid White"
            className="w-[150px] h-auto"
            priority
          />
          <div className="h-full flex justify-center flex-col gap-10">
            <h1 className="text-4xl font-semibold">
              Salurkan Kebaikan Berbasis Bukti Nyata, Bebas Manipulasi.
            </h1>
            <div className="gap-10 flex justify-center ">
              <a href="" className="bg-white text-black px-5 py-2 rounded">
                Jelajahi Kampanye
              </a>
              <a href="">
                <div className="flex px-5 py-2 gap-2">
                  <p>Ajukan Renovasi</p>
                  <ChevronDown />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex items-center justify-center text-center h-60 border-b-1 border-slate-400">
        <div className="w-200 flex flex-col items-end gap-5">
          <p>
            &quot;Mengubah paradigma penggalangan dana fisik konvensional menjadi
            ekosistem digital yang akuntabel. Setiap proposal perbaikan
            diverifikasi kelayakan fisiknya secara objektif menggunakan{" "}
            <strong>Computer Vision</strong>, dan setiap rupiah mutasi kas
            dikunci dengan <strong>Cryptographic Hash Chain</strong>.&quot;
          </p>
          <p className="italic">-- Peduli Masjid</p>
        </div>
      </div>

      {/* Social Proof Strip */}
      <div className="py-10 flex items-center justify-evenly">
        {/* Card */}
        <SocialProofStripCard main="100%" secondary="Otomatis" />
        <SocialProofStripCard main="SHA-256" secondary="Tamper-Evident" />
        <SocialProofStripCard
          main="0%"
          secondary="Potongan Biaya Tersembunyi"
        />
      </div>

      {/* Problem & Solution */}
      <div className="flex flex-col items-center justify-center mx-30">
        <h3 className="text-2xl font-semibold">
          Menjawab Krisis Kepercayaan dalam Penggalangan Dana Konvensional
        </h3>
        <div className="flex gap-10 mt-10">
          <ProblemSolutionCard
            id="problem"
            title="Tantangan Konvensional"
            list={[
              "Penarikan Sumbangan Berisiko di Jalan Raya: Membahayakan keselamatan lalu lintas dan rentan menimbulkan ketidaktertiban.",
              "Verifikasi Subjektif & Lambat: Sulit membuktikan urgensi kerusakan fisik tanpa biaya survei manual.",
              "Pencatatan Finansial Tertutup: Basis data biasa rentan penyuntingan nominal tanpa jejak audit publik.",
            ]}
          />
          <ProblemSolutionCard
            id="solution"
            title="Solusi Komputasi Platform"
            list={[
              "Penggalangan Terpusat & Bermartabat: Platform digital formal berbasis bukti visual yang valid.",
              "Screening Cerdas berbasis CNN: Model klasifikasi citra menilai kelayakan kondisi bangunan secara instan dan objektif.",
              "Ledger Mutasi Tamper-Evident: Rantai hash kriptografis memastikan histori uang keluar dan nota belanja tidak bisa dipalsukan sepihak.",
            ]}
          />
        </div>
      </div>
    </div>
  );
}
