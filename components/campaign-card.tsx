import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

export interface CampaignCardProps {
  id?: string | number;
  imageSrc: string;
  badgeText?: string;
  title: string;
  location?: string;
  collectedAmount: number;
  targetAmount: number;
  slug?: string;
}

export default function CampaignCard({
  id,
  imageSrc,
  badgeText = "Terverifikasi: Rusak Berat",
  title,
  location,
  collectedAmount,
  targetAmount,
  slug = "",
}: CampaignCardProps) {
  const percentage = Math.min(100, Math.round((collectedAmount / targetAmount) * 100));

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const campaignId = id ?? slug;

  return (
    <div className="flex flex-col bg-neutral-50 border border-neutral-300 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all">
      {/* Gambar & Badge Verifikasi */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover object-center hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-0 bg-black/75 backdrop-blur-sm text-white text-xs px-2.5 py-1 flex items-center gap-1.5 border border-white/20">
          <Check className="w-3.5 h-3.5 text-green-400" />
          <span>{badgeText}</span>
        </div>
      </div>

      {/* Konten Card */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          {location && (
            <p className="text-xs text-neutral-600 mb-1">
              {location}
            </p>
          )}
          <h4 className="text-lg font-semibold text-neutral-900 line-clamp-2 mb-4 leading-snug">
            {title}
          </h4>

          {/* Progress Donasi */}
          <div className="space-y-1.5 mb-5">
            <div className="w-full bg-neutral-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-green-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold text-neutral-900">
                {formatRupiah(collectedAmount)}
              </span>
              <span className="text-neutral-500">
                Target {formatRupiah(targetAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex items-center gap-2 pt-2 border-t border-neutral-200">
          <Link
            href={campaignId ? `/campaigns/${campaignId}` : "/campaigns"}
            className="flex-1 bg-black text-white text-xs font-semibold py-2.5 px-3 rounded-md text-center hover:bg-neutral-800 transition-colors"
          >
            Beri Donasi
          </Link>
          <Link
            href={campaignId ? `/audit/${campaignId}` : "#audit"}
            className="flex-1 border border-neutral-300 bg-white text-neutral-800 text-xs font-medium py-2.5 px-3 rounded-md text-center hover:bg-neutral-100 transition-colors"
          >
            Lihat Audit Mutasi
          </Link>
        </div>
      </div>
    </div>
  );
}
