'use client';

import { useState } from "react";
import { Trash, EnvelopeOpen, X, CheckCircle, Envelope } from "@phosphor-icons/react";
import { deletePesan, markAsRead } from "@/app/dashboard/pesan/actions";
import toast from "react-hot-toast";

type Pesan = {
  id: string;
  nama_pengirim: string;
  email: string;
  subjek: string | null;
  pesan: string;
  is_read: boolean;
  created_at: string;
};

export function PesanList({ messages }: { messages: Pesan[] }) {
  const [selectedMessage, setSelectedMessage] = useState<Pesan | null>(null);

  // Handler: Buka Modal & Tandai Dibaca otomatis
  const handleOpen = async (msg: Pesan) => {
    setSelectedMessage(msg);
    
    // Jika belum dibaca, tandai sbg dibaca di background
    if (!msg.is_read) {
        await markAsRead(msg.id);
    }
  };

  // Handler: Hapus Pesan
  const handleDelete = (id: string) => {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} max-w-sm w-full bg-white shadow-xl rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden`}>
        <div className="p-4 flex items-center">
            <div className="shrink-0"><Trash size={24} className="text-red-500" /></div>
            <div className="ml-3"><p className="text-sm font-medium">Hapus pesan ini?</p></div>
        </div>
        <div className="flex border-t">
          <button onClick={async () => { 
              toast.dismiss(t.id); 
              await deletePesan(id); 
              // Jika pesan yang dihapus sedang dibuka, tutup modalnya
              if(selectedMessage?.id === id) setSelectedMessage(null);
              toast.success('Terhapus'); 
            }} className="w-full border-r p-3 text-sm text-red-600 hover:bg-red-50">Ya</button>
          <button onClick={() => toast.dismiss(t.id)} className="w-full p-3 text-sm text-gray-700 hover:bg-gray-50">Batal</button>
        </div>
      </div>
    ));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 min-w-[800px]">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Pengirim</th>
                  <th className="px-6 py-3">Subjek</th>
                  <th className="px-6 py-3">Waktu</th>
                  <th className="px-6 py-3 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((msg) => (
                  <tr key={msg.id} className={`border-b transition hover:bg-gray-50 ${!msg.is_read ? 'bg-blue-50/50' : 'bg-white'}`}>
                    <td className="px-6 py-4">
                        {!msg.is_read ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <Envelope size={14} weight="fill"/> Baru
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                <EnvelopeOpen size={14}/> Dibaca
                            </span>
                        )}
                    </td>
                    <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">{msg.nama_pengirim}</div>
                        <div className="text-xs text-gray-500">{msg.email}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800 truncate max-w-xs">
                        {msg.subjek}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                        {new Date(msg.created_at).toLocaleDateString("id-ID", { 
                            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
                        })}
                    </td>
                    <td className="px-6 py-4 text-center">
                        <div className="flex justify-center gap-2">
                            <button 
                                onClick={() => handleOpen(msg)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded transition" 
                                title="Baca Pesan"
                            >
                                <EnvelopeOpen size={20} weight="bold"/>
                            </button>
                            <button 
                                onClick={() => handleDelete(msg.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded transition" 
                                title="Hapus"
                            >
                                <Trash size={20} weight="bold"/>
                            </button>
                        </div>
                    </td>
                  </tr>
                ))}

                {messages.length === 0 && (
                    <tr>
                        <td colSpan={5} className="text-center py-12 text-gray-400">
                            Kotak masuk kosong.
                        </td>
                    </tr>
                )}
              </tbody>
            </table>
        </div>
      </div>

      {/* MODAL DETAIL PESAN */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in-up">
            {/* Header Modal */}
            <div className="p-6 border-b bg-gray-50 flex justify-between items-start">
                <div>
                    <h3 className="font-bold text-xl text-gray-900">{selectedMessage.subjek}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Dari: <span className="font-bold text-gray-700">{selectedMessage.nama_pengirim}</span> &lt;{selectedMessage.email}&gt;
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Diterima: {new Date(selectedMessage.created_at).toLocaleString("id-ID")}
                    </p>
                </div>
                <button onClick={() => setSelectedMessage(null)} className="text-gray-400 hover:text-red-500"><X size={28}/></button>
            </div>
            
            {/* Isi Pesan */}
            <div className="p-8 max-h-[60vh] overflow-y-auto bg-white">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed text-lg font-serif">
                    {selectedMessage.pesan}
                </p>
            </div>

            {/* Footer Modal */}
            <div className="p-4 bg-gray-50 border-t flex justify-end gap-3">
                <a 
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subjek}`}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-800 font-bold flex items-center gap-2"
                >
                    <Envelope size={20} weight="bold"/> Balas via Email
                </a>
                <button 
                    onClick={() => setSelectedMessage(null)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100"
                >
                    Tutup
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}