import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import SocialProofStripCard from "@/components/social-proof-strip-card";
import ProblemSolutionCard from "@/components/problem-solution-card";
import TechnologyCard from "@/components/technology-card";
import CampaignCard from "@/components/campaign-card";
import TakmirRegistrationForm from "@/components/takmir-registration-form";
import {HOW_IT_WORKS} from "@/constants/how-it-works";
import {SHOWCASE_TECHNOLOGY} from "@/constants/showcase-technology"
import {DUMMY_CAMPAIGNS} from "@/datas/dummy-campaigns"

export default function HomePage() {
  return (
    <div>
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
              <Link href="/campaigns" className="bg-white text-black px-5 py-2 rounded text-base">
                Jelajahi Kampanye
              </Link>
              <a href="#daftar-takmir">
                <div className="flex px-5 py-2 gap-2 bg-black/50 rounded text-base">
                  <p>Ajukan Renovasi</p>
                  <ChevronDown />
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="flex items-center justify-center text-center py-10">
        <div className="w-200 flex flex-col items-end gap-5">
          <p className="text-base">
            &quot;Mengubah paradigma penggalangan dana fisik konvensional menjadi
            ekosistem digital yang akuntabel. Setiap proposal perbaikan
            diverifikasi kelayakan fisiknya secara objektif menggunakan{" "}
            <span className="font-bold italic">Computer Vision</span>, dan setiap rupiah mutasi kas
            dikunci dengan <span className="font-bold italic">Cryptographic Hash Chain</span>.&quot;
          </p>
          <p className="italic">-- Peduli Masjid</p>
        </div>
      </div>

      {/* Social Proof Strip */}
      <div className="py-10 px-30 flex items-center justify-between">
        {/* Card */}
        <SocialProofStripCard main="100%" secondary="Otomatis" />
        <SocialProofStripCard main="SHA-256" secondary="Tamper-Evident" />
        <SocialProofStripCard
          main="0%"
          secondary="Potongan Biaya Tersembunyi"
        />
      </div>

      {/* Problem & Solution */}
      <div className="flex flex-col items-center justify-center px-30 py-10 border-b-1 border-slate-400">
        <h3 className="text-2xl font-semibold mb-12">
          Menjawab Krisis Kepercayaan dalam Penggalangan Dana Konvensional
        </h3>
        <div className="flex gap-10">
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

      {/* How it Works */}
      <div id="how-it-works" className="flex flex-col items-center justify-center px-30 py-10 border-b-1 border-slate-400">
        <h3 className="text-2xl font-semibold mb-12">
          Cara Kerja
        </h3>
        <div className="w-full max-w-4xl flex flex-col">
          {HOW_IT_WORKS.map((item, index, arr) => {
            const isLast = index === arr.length - 1;
            return (
              <div key={item.number} className="flex items-stretch gap-8">
                {/* Kolom Langkah */}
                <div className="flex-1 text-right pt-1.5">
                  <span className="font-semibold text-neutral-800">
                    {item.step}
                  </span>
                </div>

                {/* Nomor dan Garis-garis */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-neutral-100 shrink-0">
                    {item.number}
                  </div>
                  {!isLast && (
                    <div className="w-0 flex-1 border-l-2 border-dashed border-neutral-400 my-2 min-h-16" />
                  )}
                </div>

                {/* Kolom Penjelasan */}
                <div
                  className={`flex-1 text-left pt-1.5 ${
                    isLast ? "pb-4" : "pb-12"
                  }`}
                >
                  <h4 className="font-semibold text-lg text-neutral-900">
                    {item.title}
                  </h4>
                  <p className="text-neutral-600 mt-2 leading-relaxed text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Showcase Technology */}
      <div id="showcase-technology" className="flex flex-col items-center justify-center px-30 py-10 border-b-1 border-slate-400">
        <h3 className="text-2xl font-semibold mb-12">
          Fitur Integritas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {SHOWCASE_TECHNOLOGY.map((item) => (
              <TechnologyCard
                badge={item.badge}
                icon={item.icon}
                title={item.title}
                description={item.description}
                keyFeatures={item.keyFeatures}
              />
            ))}
        </div>
      </div>

      {/* Featured Campaign Active */}
      <div id="recent-campaigns" className="flex flex-col items-center justify-center px-30 py-16 border-b-1 border-slate-400">
        <div className="flex items-end justify-between w-full max-w-6xl mb-12">
          <h3 className="text-2xl font-semibold">
            Kampanye Terbaru
          </h3>
          <Link
            href="/campaigns"
            className="inline-flex items-center gap-2 text-neutral-900 text-sm transition-all hover:font-semibold"
          >
            <span>Lihat Selengkapnya</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {DUMMY_CAMPAIGNS.slice(0, 3).map((campaign) => {
              return (
                <CampaignCard
                  id={campaign.id}
                  imageSrc={campaign.imageSrc}
                  badgeText={campaign.badgeText}
                  title={campaign.title}
                  location={campaign.location}
                  collectedAmount={campaign.collectedAmount}
                  targetAmount={campaign.targetAmount}
                  key={campaign.id}
                />
              )
            })}
        </div>
      </div>

      {/* Ask for Renovation */}
      <div id="daftar-takmir" className="flex flex-col items-center justify-center px-30 py-16 border-b-1 border-slate-400">
        <h3 className="text-2xl font-semibold">
          Daftar Sebagai Takmir
        </h3>
        <p className="text-sm text-neutral-600 max-w-lg text-center mb-10 leading-relaxed">
          Daftarkan masjid Anda untuk mendapatkan verifikasi kondisi kerusakan fisik objektif dan pembukaan penggalangan dana renovasi yang akuntabel.
        </p>
        <TakmirRegistrationForm />
      </div>
    </div>
  );
}
