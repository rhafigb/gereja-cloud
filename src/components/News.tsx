import Link from "next/link";
import { ArrowRight, FileText } from "@phosphor-icons/react/dist/ssr";

export default function News() {
  return (
    <section id="warta" className="py-20 bg-light">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-primary">Warta Jemaat</h2>
            <p className="text-gray-500 mt-2">Berita terbaru seputar pelayanan gereja.</p>
          </div>
          <Link href="#" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:text-accent">
            Lihat Semua Arsip <ArrowRight weight="bold" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* News Item 1 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
            <img src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="News" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Kegiatan</span>
              <h3 className="text-lg font-bold text-gray-800 mt-2 mb-3">Retreat Pemuda 2025</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">Pendaftaran retreat pemuda kini telah dibuka. Silakan mendaftar melalui aplikasi arsip digital atau hubungi sekretariat.</p>
              <a href="#" className="text-primary text-sm font-semibold hover:underline">Baca Selengkapnya</a>
            </div>
          </div>

          {/* News Item 2 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
            <div className="h-48 bg-primary flex items-center justify-center">
              <FileText size={64} weight="duotone" className="text-white/50" />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Administrasi</span>
              <h3 className="text-lg font-bold text-gray-800 mt-2 mb-3">Pembaruan Data Jemaat</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">Mohon seluruh jemaat melakukan pembaruan data keluarga untuk sistem arsip digital gereja sebelum akhir bulan.</p>
              <a href="#" className="text-primary text-sm font-semibold hover:underline">Akses Portal Jemaat</a>
            </div>
          </div>

          {/* News Item 3 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
            <img src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="News" className="w-full h-48 object-cover" />
            <div className="p-6">
              <span className="text-xs font-bold text-accent uppercase tracking-wider">Sosial</span>
              <h3 className="text-lg font-bold text-gray-800 mt-2 mb-3">Bakti Sosial Panti Asuhan</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">Laporan kegiatan bakti sosial bulan ini telah diunggah. Terima kasih atas partisipasi jemaat sekalian.</p>
              <a href="#" className="text-primary text-sm font-semibold hover:underline">Lihat Dokumentasi</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}