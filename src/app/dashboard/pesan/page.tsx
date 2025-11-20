import { createClient } from "@/utils/supabase/server";
import { PesanList } from "@/components/admin/PesanClient";

export default async function PesanPage() {
  const supabase = await createClient();

  // Fetch pesan, urutkan yang belum dibaca di atas, lalu yang terbaru
  const { data: messages } = await supabase
    .from('inbox')
    .select('*')
    .order('is_read', { ascending: true }) 
    .order('created_at', { ascending: false });

  const unreadCount = messages?.filter(m => !m.is_read).length || 0;

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Pesan Masuk</h1>
        <p className="text-gray-500">
            Anda memiliki <span className="font-bold text-primary">{unreadCount} pesan baru</span> dari formulir kontak.
        </p>
      </header>

      <PesanList messages={messages || []} />
    </div>
  );
}