import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      {/* Banner Penutup (CTA) */}
      <div className="border-b border-neutral-800 px-6 lg:px-20 py-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-3">
          <h3 className="text-2xl font-semibold tracking-tight text-white">
            Wujudkan Transparansi Penuh Pengelolaan Dana Rumah Ibadah.
          </h3>
          <p className="text-neutral-400 text-sm max-w-2xl leading-relaxed italic">
            &quot;Mulai ajukan proposal renovasi fisik atau audit secara langsung mutasi penggunaan dana masjid sekarang.&quot;
          </p>
        </div>
      </div>

      {/* Footer Main */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Kolom 1: Profil Ringkas */}
          <div className="flex flex-col gap-4">
            <Image
              src="/logo-white.png"
              width={140}
              height={70}
              alt="Logo Peduli Masjid White"
              className="w-[140px] h-auto"
            />
            <p className="text-neutral-400 text-sm leading-relaxed">
              Platform donasi renovasi rumah ibadah berbasis pembuktian visual objektif dengan Computer Vision dan pencatatan transaksi terverifikasi Cryptographic Hash Chain.
            </p>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-200 mb-1">
              Navigasi Cepat
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-neutral-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#kampanye" className="hover:text-white transition-colors">
                  Kampanye
                </a>
              </li>
              <li>
                <a href="#audit" className="hover:text-white transition-colors">
                  Audit Publik
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Aspek Teknis */}
          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-neutral-200 mb-1">
              Aspek Teknis
            </h4>
            <ul className="flex flex-col gap-2.5 text-sm text-neutral-400">
              <li className="hover:text-neutral-300">
                Convolutional Neural Network (CNN)
              </li>
              <li className="hover:text-neutral-300">
                SHA-256 Cryptographic Ledger
              </li>
              <li className="hover:text-neutral-300">
                REST API Architecture
              </li>
            </ul>
          </div>
        </div>

        {/* Baris Bawah */}
        <div className="border-t border-neutral-800 text-center text-xs text-neutral-500 leading-relaxed flex items-center justify-center mt-10 py-5">
          <p>
            © 2026 Peduli Masjid. Dikembangkan untuk Riset Integritas Perangkat Lunak &amp; Computer Vision.
          </p>
        </div>
      </div>
    </footer>
  );
}
