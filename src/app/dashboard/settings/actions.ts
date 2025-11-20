'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// 1. UPDATE GENERAL SETTINGS (Info Gereja)
export async function updateOrganization(formData: FormData) {
  const supabase = await createClient();
  
  const data = {
    nama_gereja: formData.get('nama_gereja') as string,
    alamat: formData.get('alamat') as string,
    email: formData.get('email') as string,
    telepon: formData.get('telepon') as string,
    // Checkbox mengembalikan 'on' jika dicentang, null jika tidak
    maintenance_mode: formData.get('maintenance') === 'on',
    online_registration: formData.get('registration') === 'on',
    updated_at: new Date().toISOString(),
  };

  // Selalu update row dengan ID = 1
  const { error } = await supabase
    .from('organization_settings')
    .update(data)
    .eq('id', 1);

  if (error) return { error: error.message };
  
  revalidatePath('/dashboard/settings');
  return { success: true };
}

// 2. UPDATE PROFILE (Data Diri)
export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  
  // Ambil ID user yang sedang login
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const data = {
    full_name: formData.get('full_name') as string,
    // role biasanya tidak boleh diubah sendiri, jadi kita skip
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('profiles')
    .update(data)
    .eq('id', user.id);

  if (error) return { error: error.message };

  revalidatePath('/dashboard/settings');
  return { success: true };
}

// 3. CHANGE PASSWORD (Keamanan)
export async function changePassword(formData: FormData) {
  const supabase = await createClient();
  
  const password = formData.get('password') as string;
  const confirm = formData.get('confirm') as string;

  if (password !== confirm) {
    return { error: "Konfirmasi password tidak cocok." };
  }

  if (password.length < 6) {
    return { error: "Password minimal 6 karakter." };
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  });

  if (error) return { error: error.message };

  return { success: true };
}