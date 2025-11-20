import { Sun, UsersThree, MusicNotes } from "@phosphor-icons/react/dist/ssr";

export default function Schedule() {
  return (
    <section id="jadwal" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Jadwal Ibadah & Kegiatan</h2>
          <p className="text-gray-500 mt-2">Mari bersekutu dan memuji nama Tuhan bersama.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition p-8 text-center group">
            <div className="w-16 h-16 mx-auto bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition">
              <Sun size={32} weight="fill" />
            </div>
            <h3 className="text-xl font-bold mb-2">Ibadah Umum 1</h3>
            <p className="text-accent font-semibold mb-4">Minggu, 07:00 WIB</p>
            <p className="text-gray-500 text-sm">Gedung Utama Lt. 1 <br /> (Tersedia Sekolah Minggu)</p>
          </div>

          {/* Card 2 */}
          <div className="bg-primary text-white rounded-xl shadow-lg hover:shadow-xl transition p-8 text-center transform md:-translate-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-10 -mt-10"></div>
            <div className="w-16 h-16 mx-auto bg-white/20 text-white rounded-full flex items-center justify-center mb-6">
              <UsersThree size={32} weight="fill" />
            </div>
            <h3 className="text-xl font-bold mb-2">Ibadah Umum 2</h3>
            <p className="text-accent font-bold mb-4 bg-white/10 inline-block px-3 py-1 rounded-full">Minggu, 10:00 WIB</p>
            <p className="text-blue-100 text-sm">Gedung Utama Lt. 1 <br /> (Live Streaming Tersedia)</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-100 rounded-xl shadow-lg hover:shadow-xl transition p-8 text-center group">
            <div className="w-16 h-16 mx-auto bg-blue-50 text-primary rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition">
               <MusicNotes size={32} weight="fill" />
            </div>
            <h3 className="text-xl font-bold mb-2">Ibadah Pemuda</h3>
            <p className="text-accent font-semibold mb-4">Sabtu, 18:00 WIB</p>
            <p className="text-gray-500 text-sm">Aula Serbaguna Lt. 2 <br /> (Youth Community)</p>
          </div>
        </div>
      </div>
    </section>
  );
}