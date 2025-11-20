'use client';

import { useState } from "react";
import { Plus, PencilSimple, Trash, X, FloppyDisk, CalendarCheck } from "@phosphor-icons/react";
import { createJadwal, updateJadwal, deleteJadwal } from "@/app/dashboard/jadwal/actions";
import toast from "react-hot-toast";

type Jadwal = {
  id: string;
  nama_kegiatan: string;
  hari: string;
  jam: string;
  lokasi: string | null;
  kategori: string | null;
};

export function AddJadwalButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const load = toast.loading('Menyimpan jadwal...');
    const res = await createJadwal(formData);
    toast.dismiss(load);

    if (res?.error) toast.error(res.error);
    else {
      toast.success('Jadwal berhasil ditambahkan!');
      setIsOpen(false);
    }
    setIsLoading(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm">
        <Plus weight="bold" /> Tambah Jadwal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b bg-blue-50 flex justify-between items-center">
                <h3 className="font-bold text-lg text-primary">Tambah Jadwal Ibadah</h3>
                <button onClick={() => setIsOpen(false)}><X size={24} /></button>
            </div>
            <form action={handleSubmit} className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kegiatan</label>
                    <input name="nama" type="text" required placeholder="Contoh: Ibadah Raya 1" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hari</label>
                        <select name="hari" className="w-full px-4 py-2 border rounded-lg bg-white">
                            <option>Minggu</option><option>Senin</option><option>Selasa</option>
                            <option>Rabu</option><option>Kamis</option><option>Jumat</option><option>Sabtu</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jam</label>
                        <input name="jam" type="text" required placeholder="07:00 WIB" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                    <input name="lokasi" type="text" placeholder="Gedung Utama" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select name="kategori" className="w-full px-4 py-2 border rounded-lg bg-white">
                        <option>Umum</option><option>Pemuda</option><option>Anak</option><option>Wanita</option><option>Pria</option>
                    </select>
                </div>
                <button type="submit" disabled={isLoading} className="w-full py-2 bg-primary text-white rounded-lg font-bold hover:bg-blue-800 transition">
                    {isLoading ? 'Menyimpan...' : 'Simpan Jadwal'}
                </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export function JadwalActions({ jadwal }: { jadwal: Jadwal }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = async (formData: FormData) => {
    const load = toast.loading('Update jadwal...');
    const res = await updateJadwal(formData);
    toast.dismiss(load);
    if (res?.error) toast.error(res.error);
    else { toast.success('Jadwal diupdate!'); setIsEditOpen(false); }
  };

  const handleDelete = () => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-white shadow-xl rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-start">
            <div className="shrink-0"><Trash size={24} className="text-red-500" /></div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">Hapus Jadwal?</p>
              <p className="mt-1 text-sm text-gray-500">Yakin hapus <b>{jadwal.nama_kegiatan}</b>?</p>
            </div>
          </div>
        </div>
        <div className="flex border-t border-gray-200">
          <button onClick={async () => { toast.dismiss(t.id); await deleteJadwal(jadwal.id); toast.success('Terhapus'); }} className="w-full border-r border-gray-200 p-3 text-sm font-medium text-red-600 hover:bg-red-50">Hapus</button>
          <button onClick={() => toast.dismiss(t.id)} className="w-full p-3 text-sm font-medium text-gray-700 hover:bg-gray-50">Batal</button>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex justify-center gap-2">
      <button onClick={() => setIsEditOpen(true)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"><PencilSimple size={18}/></button>
      <button onClick={handleDelete} className="p-2 text-red-600 hover:bg-red-50 rounded transition"><Trash size={18}/></button>

      {/* Modal Edit (Isi form sama dengan Add, tapi ada defaultValue) */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b bg-blue-50 flex justify-between items-center">
                <h3 className="font-bold text-lg text-primary">Edit Jadwal</h3>
                <button onClick={() => setIsEditOpen(false)}><X size={24}/></button>
            </div>
            <form action={handleEdit} className="p-6 space-y-4">
                <input type="hidden" name="id" value={jadwal.id} />
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Kegiatan</label>
                    <input name="nama" defaultValue={jadwal.nama_kegiatan} type="text" required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Hari</label>
                        <select name="hari" defaultValue={jadwal.hari} className="w-full px-4 py-2 border rounded-lg bg-white">
                            <option>Minggu</option><option>Senin</option><option>Selasa</option>
                            <option>Rabu</option><option>Kamis</option><option>Jumat</option><option>Sabtu</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jam</label>
                        <input name="jam" defaultValue={jadwal.jam} type="text" required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                    <input name="lokasi" defaultValue={jadwal.lokasi || ""} type="text" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select name="kategori" defaultValue={jadwal.kategori || "Umum"} className="w-full px-4 py-2 border rounded-lg bg-white">
                        <option>Umum</option><option>Pemuda</option><option>Anak</option><option>Wanita</option><option>Pria</option>
                    </select>
                </div>
                <button type="submit" className="w-full py-2 bg-primary text-white rounded-lg font-bold">Simpan Perubahan</button>
            </form>
           </div>
        </div>
      )}
    </div>
  );
}