'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// 1. CREATE (Tambah Jemaat)
export async function createJemaat(formData: FormData) {
  const supabase = await createClient();
  
  const data = {
    nama_lengkap: formData.get('nama') as string,
    wilayah: formData.get('wilayah') as string,
    telepon: formData.get('telepon') as string,
    status: formData.get('status') as string,
  };

  const { error } = await supabase.from('jemaat').insert(data);

  if (error) return { error: error.message };
  
  revalidatePath('/dashboard/jemaat'); // Refresh halaman otomatis
  return { success: true };
}

// 2. UPDATE (Edit Jemaat)
export async function updateJemaat(formData: FormData) {
  const supabase = await createClient();
  
  const id = formData.get('id') as string;
  const data = {
    nama_lengkap: formData.get('nama') as string,
    wilayah: formData.get('wilayah') as string,
    telepon: formData.get('telepon') as string,
    status: formData.get('status') as string,
  };

  const { error } = await supabase.from('jemaat').update(data).eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/dashboard/jemaat');
  return { success: true };
}

// 3. DELETE (Hapus Jemaat)
export async function deleteJemaat(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('jemaat').delete().eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/dashboard/jemaat');
  return { success: true };
}