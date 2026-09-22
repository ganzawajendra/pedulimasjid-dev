import Image from "next/image";
import { ChevronDown } from "lucide-react";
import SocialProofStripCard from "@/components/social-proof-strip-card";
import ProblemSolutionCard from "@/components/problem-solution-card";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

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
      <div className="flex flex-col items-center justify-center px-30 py-10 border-b-1 border-slate-400">
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

      {/* How it Works */}
      <div className="flex flex-col items-center justify-center px-30 py-10">
        <h3 className="text-2xl font-semibold mb-12">
          Cara Kerja
        </h3>
        <div className="w-full max-w-4xl flex flex-col">
          {[
            {
              step: "Langkah 1",
              number: 1,
              title: "Pengajuan & Analisis Visual Otomatis",
              description:
                "Pengurus takmir mengunggah foto kondisi fisik bangunan masjid yang membutuhkan renovasi. Model CNN secara otomatis menganalisis pola kerusakan dan menentukan kelayakan pembukaan kampanye.",
            },
            {
              step: "Langkah 2",
              number: 2,
              title: "Penghimpunan Donasi Aman",
              description:
                "Donatur menyalurkan dana untuk kampanye yang telah tervalidasi. Setiap donasi masuk dicatat langsung sebagai blok transaksi baru di dalam sistem ledger.",
            },
            {
              step: "Langkah 3",
              number: 3,
              title: "Pencairan Dana & Audit Kriptografis",
              description:
                "Setiap penarikan kas untuk belanja material semen atau atap wajib menyertakan foto nota fisik. Berkas nota dan transaksi diikat ke dalam rantai hash (SHA-256) yang dapat diverifikasi mandiri oleh siapa pun.",
            },
          ].map((item, index, arr) => {
            const isLast = index === arr.length - 1;
            return (
              <div key={item.number} className="flex items-stretch gap-8">
                {/* Konten Kiri */}
                <div className="flex-1 text-right pt-1.5">
                  <span className="font-bold text-neutral-800">
                    {item.step}
                  </span>
                </div>

                {/* Tengah: Nomor & Garis Putus-putus */}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-sm shadow-sm ring-4 ring-neutral-100 shrink-0">
                    {item.number}
                  </div>
                  {!isLast && (
                    <div className="w-0 flex-1 border-l-2 border-dashed border-neutral-400 my-2 min-h-16" />
                  )}
                </div>

                {/* Konten Kanan: Penjelasan */}
                <div
                  className={`flex-1 text-left pt-1.5 ${
                    isLast ? "pb-4" : "pb-12"
                  }`}
                >
                  <h4 className="font-semibold text-neutral-900">
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
    </div>
  );
}
