'use client';

import { useState } from "react";
import { Plus, PencilSimple, Trash, X, FloppyDisk, CalendarBlank, CurrencyDollar } from "@phosphor-icons/react";
import { createTransaksi, updateTransaksi, deleteTransaksi } from "@/app/dashboard/keuangan/actions";
import toast from "react-hot-toast";

type Transaksi = {
  id: string;
  keterangan: string;
  jenis: string;
  jumlah: number;
  tanggal: string;
};

// --- KOMPONEN 1: ADD BUTTON & MODAL ---
export function AddTransaksiButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const toastId = toast.loading('Menyimpan transaksi...');
    const res = await createTransaksi(formData);
    toast.dismiss(toastId);

    if (res?.error) {
        toast.error(`Gagal: ${res.error}`);
    } else {
        toast.success('Transaksi berhasil dicatat!');
        setIsOpen(false);
    }
    setIsLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="bg-primary hover:bg-blue-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow-sm w-full md:w-auto justify-center"
      >
        <Plus weight="bold" /> Transaksi Baru
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800">Catat Transaksi</h3>
                <button onClick={() => setIsOpen(false)}><X size={24} /></button>
            </div>
            <form action={handleSubmit} className="p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                    <input name="keterangan" type="text" required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" placeholder="Contoh: Kolekte Minggu I" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jenis</label>
                        <select name="jenis" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white">
                            <option value="masuk">Pemasukan</option>
                            <option value="keluar">Pengeluaran</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                        <input name="tanggal" type="date" defaultValue={new Date().toISOString().split('T')[0]} required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah (Rp)</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rp</span>
                        <input name="jumlah" type="number" min="0" required className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" placeholder="0" />
                    </div>
                </div>
                <div className="pt-4 flex gap-3">
                    <button type="button" onClick={() => setIsOpen(false)} className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50">Batal</button>
                    <button type="submit" disabled={isLoading} className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 flex justify-center items-center gap-2 font-bold">
                        {isLoading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// --- KOMPONEN 2: ACTIONS (EDIT & DELETE) ---
export function TransaksiActions({ trx }: { trx: Transaksi }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEdit = async (formData: FormData) => {
    const toastId = toast.loading('Update data...');
    const res = await updateTransaksi(formData);
    toast.dismiss(toastId);
    if (res?.error) toast.error(res.error);
    else {
        toast.success('Data diupdate!');
        setIsEditOpen(false);
    }
  };

  const handleDelete = () => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-md w-full bg-white shadow-2xl rounded-xl flex ring-1 ring-black ring-opacity-5 overflow-hidden`}>
        <div className="flex-1 p-4 flex items-start">
            <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                 <Trash size={20} className="text-red-600" weight="bold" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-bold text-gray-900">Hapus Transaksi?</p>
              <p className="mt-1 text-sm text-gray-500">Data <b>{trx.keterangan}</b> akan dihapus. Saldo akan dikalkulasi ulang.</p>
            </div>
        </div>
        <div className="flex flex-col border-l border-gray-200">
          <button onClick={async () => {
              toast.dismiss(t.id);
              const load = toast.loading('Menghapus...');
              await deleteTransaksi(trx.id); 
              toast.dismiss(load);
              toast.success('Terhapus');
            }} 
            className="w-full border-b border-gray-200 p-3 text-sm font-bold text-red-600 hover:bg-red-50">Hapus</button>
          <button onClick={() => toast.dismiss(t.id)} className="w-full p-3 text-sm text-gray-600 hover:bg-gray-50">Batal</button>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex justify-end gap-2">
      <button onClick={() => setIsEditOpen(true)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"><PencilSimple size={18} weight="bold"/></button>
      <button onClick={handleDelete} className="p-2 text-red-600 hover:bg-red-50 rounded transition"><Trash size={18} weight="bold"/></button>

      {/* Modal Edit */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b bg-blue-50 flex justify-between items-center">
                <h3 className="font-bold text-lg text-primary">Edit Transaksi</h3>
                <button onClick={() => setIsEditOpen(false)}><X size={24}/></button>
            </div>
            <form action={handleEdit} className="p-6 space-y-4">
                <input type="hidden" name="id" value={trx.id} />
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Keterangan</label>
                    <input name="keterangan" defaultValue={trx.keterangan} type="text" required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Jenis</label>
                        <select name="jenis" defaultValue={trx.jenis} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary bg-white">
                            <option value="masuk">Pemasukan</option>
                            <option value="keluar">Pengeluaran</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tanggal</label>
                        <input name="tanggal" defaultValue={trx.tanggal} type="date" required className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jumlah</label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">Rp</span>
                        <input name="jumlah" defaultValue={trx.jumlah} type="number" min="0" required className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-primary" />
                    </div>
                </div>
                <button type="submit" className="w-full py-2 bg-primary text-white rounded-lg font-bold">Simpan Perubahan</button>
            </form>
           </div>
        </div>
      )}
    </div>
  );
}