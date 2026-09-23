import { ScanEye, ShieldCheck } from "lucide-react";

export const SHOWCASE_TECHNOLOGY = [
    {
        badge: "Computer Vision Layer",
        title: "Verifikasi Kerusakan Fisik berbasis CNN",
        description: "Mengeliminasi manipulasi proposal fiktif. Arsitektur Deep Learning mengekstraksi fitur struktural retak, keropos, atau kebocoran bangunan guna memastikan bantuan tepat sasaran.",
        keyFeatures: "Deteksi multi-level kerusakan, ekstraksi fitur visual otomatis, tanpa bias manusia.",
        icon: <ScanEye className="w-6 h-6" />
    },
    {
        badge: "Data Integrity Layer",
        title: "Mutasi Kas Anti-Manipulasi (Crypto Hash Chain)",
        description: "Mengadopsi prinsip rantai blok ringan tanpa biaya gas fee. Mengaitkan hash transaksi sebelumnya dengan transaksi baru sehingga manipulasi data pada basis data akan otomatis memutus rantai integritas (broken chain).",
        keyFeatures: "Integritas matematis SHA-256, checksum nota pengeluaran fisik, verifikasi mandiri publik satu klik.",
        icon: <ShieldCheck className="w-6 h-6" />
    }
]