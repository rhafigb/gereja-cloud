import { createClient } from "@/utils/supabase/server";
import { AddRekeningButton, DeleteRekeningButton } from "@/components/admin/RekeningClient";
import { Bank } from "@phosphor-icons/react/dist/ssr";

export default async function RekeningDashboardPage() {
  const supabase = await createClient();
  const { data: rekening } = await supabase.from('rekening_gereja').select('*').order('created_at', { ascending: true });

  return (
    <div>
      <header className="mb-8 flex justify-between items-center">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">Rekening & QRIS</h1>
            <p className="text-gray-500">Kelola informasi donasi dan persembahan.</p>
        </div>
        <AddRekeningButton />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {rekening?.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-primary">
                        <Bank size={24} weight="fill"/>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800">{item.nama_bank}</h3>
                        <p className="text-sm font-mono text-gray-600">{item.nomor_rekening || 'QRIS Code'}</p>
                        <p className="text-xs text-gray-400">a.n {item.atas_nama}</p>
                    </div>
                </div>
                <DeleteRekeningButton id={item.id} bank={item.nama_bank} />
            </div>
         ))}
         
         {rekening?.length === 0 && (
             <div className="col-span-full py-12 text-center text-gray-400 bg-white rounded-xl border border-dashed">
                 Belum ada rekening terdaftar.
             </div>
         )}
      </div>
    </div>
  );
}