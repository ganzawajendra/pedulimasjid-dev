"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import CampaignCard from "@/components/campaign-card";

const DUMMY_CAMPAIGNS = [
  {
    id: "1",
    title: "Renovasi Atap Kubah & Dinding Utama Masjid Al-Muhajirin",
    location: "Kab. Sleman, D.I. Yogyakarta",
    badgeText: "Terverifikasi: Rusak Berat",
    collectedAmount: 18500000,
    targetAmount: 35000000,
    imageSrc: "/bg-masjid.jpg",
    slug: "masjid-al-muhajirin",
  },
  {
    id: "2",
    title: "Perbaikan Struktur Menara & Tempat Wudhu Masjid Jami' An-Nur",
    location: "Kota Bandung, Jawa Barat",
    badgeText: "Terverifikasi: Rusak Sedang",
    collectedAmount: 12400000,
    targetAmount: 28000000,
    imageSrc: "/bg-masjid.jpeg",
    slug: "masjid-jami-an-nur",
  },
  {
    id: "3",
    title: "Restorasi Plafon Retak & Sanitasi Utama Masjid Baiturrahman",
    location: "Kab. Malang, Jawa Timur",
    badgeText: "Terverifikasi: Rusak Berat",
    collectedAmount: 24750000,
    targetAmount: 40000000,
    imageSrc: "/bg-masjid.jpg",
    slug: "masjid-baiturrahman",
  },
  {
    id: "4",
    title: "Pengecatan Ulang & Perbaikan Talang Air Masjid At-Taqwa",
    location: "Kab. Bantul, D.I. Yogyakarta",
    badgeText: "Terverifikasi: Rusak Ringan",
    collectedAmount: 5200000,
    targetAmount: 15000000,
    imageSrc: "/bg-masjid.jpeg",
    slug: "masjid-at-taqwa",
  },
  {
    id: "5",
    title: "Rekonstruksi Pondasi Dinding Miring Musholla Al-Ikhlas",
    location: "Kab. Banyumas, Jawa Tengah",
    badgeText: "Terverifikasi: Rusak Berat",
    collectedAmount: 31000000,
    targetAmount: 45000000,
    imageSrc: "/bg-masjid.jpg",
    slug: "musholla-al-ikhlas",
  },
  {
    id: "6",
    title: "Penggantian Keramik Pecah & Renovasi Fasilitas Tempat Wudhu",
    location: "Kota Surabaya, Jawa Timur",
    badgeText: "Terverifikasi: Rusak Sedang",
    collectedAmount: 8900000,
    targetAmount: 20000000,
    imageSrc: "/bg-masjid.jpeg",
    slug: "masjid-as-salam",
  },
];

export default function Campaign() {
  const [searchQuery, setSearchQuery] = useState("");
  const [damageFilter, setDamageFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("urgent");

  return (
    <div className="pt-24 px-6 md:px-12 lg:px-30 pb-20 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-neutral-900 mb-2">
          Daftar Rumah Ibadah Terverifikasi
        </h1>
        <p className="text-neutral-600 max-w-3xl text-sm leading-relaxed">
          Seluruh kampanye renovasi dan perbaikan fasilitas telah divalidasi
          kondisi kerusakannya secara objektif menggunakan Computer Vision.
          Pilih rumah ibadah dan pantau akuntabilitas mutasi kasnya secara
          terbuka.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
        {/* Kolom Input Pencarian */}
        <div className="lg:col-span-5 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama masjid atau kabupaten/kota..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        {/* Dropdown Filter 1 — Tingkat Kerusakan (Kategori CNN) */}
        <div className="lg:col-span-3">
          <select
            value={damageFilter}
            onChange={(e) => setDamageFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="all">Semua Tingkat Kerusakan</option>
            <option value="rusak-berat">Rusak Berat (Prioritas Utama)</option>
            <option value="rusak-sedang">Rusak Sedang</option>
            <option value="rusak-ringan">Restorasi / Renovasi Ringan</option>
          </select>
        </div>

        {/* Dropdown Filter 2 — Wilayah / Provinsi */}
        <div className="lg:col-span-2">
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="all">Semua Wilayah</option>
            <option value="diy">D.I. Yogyakarta</option>
            <option value="jateng">Jawa Tengah</option>
            <option value="jatim">Jawa Timur</option>
            <option value="jabar">Jawa Barat</option>
            <option value="banten">Banten</option>
            <option value="dki">DKI Jakarta</option>
            <option value="luar-jawa">Luar Jawa</option>
          </select>
        </div>

        {/* Dropdown Urutkan (Sorting) */}
        <div className="lg:col-span-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-900 focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="urgent">Paling Mendesak</option>
            <option value="least-collected">Terkumpul Paling Sedikit</option>
            <option value="almost-funded">Hampir Terpenuhi</option>
            <option value="newest">Paling Baru Diajukan</option>
          </select>
        </div>
      </div>

      {/* Grid Campaign */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {DUMMY_CAMPAIGNS.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            id={campaign.id}
            title={campaign.title}
            location={campaign.location}
            badgeText={campaign.badgeText}
            collectedAmount={campaign.collectedAmount}
            targetAmount={campaign.targetAmount}
            imageSrc={campaign.imageSrc}
          />
        ))}
      </div>
    </div>
  );
}