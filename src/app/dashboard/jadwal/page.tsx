import { createClient } from "@/utils/supabase/server";
import { AddJadwalButton, JadwalActions } from "@/components/admin/JadwalClient";

export default async function JadwalDashboardPage() {
  const supabase = await createClient();
  const { data: jadwal } = await supabase.from('jadwal_ibadah').select('*').order('created_at', { ascending: true });

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Manajemen Jadwal</h1>
            <p className="text-gray-500">Atur jadwal ibadah mingguan.</p>
        </div>
        <AddJadwalButton />
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 min-w-[700px]">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3">Nama Kegiatan</th>
                  <th className="px-6 py-3">Waktu</th>
                  <th className="px-6 py-3">Lokasi</th>
                  <th className="px-6 py-3">Kategori</th>
                  <th className="px-6 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {jadwal?.map((item) => (
                  <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-bold text-gray-900">{item.nama_kegiatan}</td>
                    <td className="px-6 py-4"><span className="bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">{item.hari}, {item.jam}</span></td>
                    <td className="px-6 py-4">{item.lokasi}</td>
                    <td className="px-6 py-4">{item.kategori}</td>
                    <td className="px-6 py-4 text-center"><JadwalActions jadwal={item} /></td>
                  </tr>
                ))}
                {jadwal?.length === 0 && <tr><td colSpan={5} className="text-center py-8 text-gray-400">Belum ada jadwal.</td></tr>}
              </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}