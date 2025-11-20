'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createJadwal(formData: FormData) {
  const supabase = await createClient();
  
  const data = {
    nama_kegiatan: formData.get('nama') as string,
    hari: formData.get('hari') as string,
    jam: formData.get('jam') as string,
    lokasi: formData.get('lokasi') as string,
    kategori: formData.get('kategori') as string,
  };

  const { error } = await supabase.from('jadwal_ibadah').insert(data);
  if (error) return { error: error.message };
  
  revalidatePath('/dashboard/jadwal');
  revalidatePath('/jadwal'); // Refresh halaman publik juga
  return { success: true };
}

export async function updateJadwal(formData: FormData) {
  const supabase = await createClient();
  const id = formData.get('id') as string;
  
  const data = {
    nama_kegiatan: formData.get('nama') as string,
    hari: formData.get('hari') as string,
    jam: formData.get('jam') as string,
    lokasi: formData.get('lokasi') as string,
    kategori: formData.get('kategori') as string,
  };

  const { error } = await supabase.from('jadwal_ibadah').update(data).eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/dashboard/jadwal');
  revalidatePath('/jadwal');
  return { success: true };
}

export async function deleteJadwal(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('jadwal_ibadah').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/dashboard/jadwal');
  revalidatePath('/jadwal');
  return { success: true };
}