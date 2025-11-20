import { createClient } from "@/utils/supabase/server";
import SettingsClient from "@/components/admin/SettingsClient";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const supabase = await createClient();

  // 1. Cek Auth
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 2. Fetch Data Organisasi (ID = 1)
  const { data: orgData } = await supabase
    .from('organization_settings')
    .select('*')
    .eq('id', 1)
    .single();

  // 3. Fetch Profile User Sendiri
  const { data: profileData } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // 4. Fetch Daftar Semua Admin (Profiles)
  // Ini akan menampilkan semua user yang terdaftar di sistem
  const { data: adminsList } = await supabase
    .from('profiles')
    .select('id, full_name, role');

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Pengaturan Sistem</h1>
        <p className="text-gray-500">Kelola preferensi akun dan konfigurasi website gereja.</p>
      </header>

      <SettingsClient 
        orgData={orgData}
        profileData={profileData}
        userEmail={user.email || ''}
        adminsList={adminsList || []}
      />
    </div>
  );
}