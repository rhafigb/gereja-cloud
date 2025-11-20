'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// 1. CREATE
export async function createTransaksi(formData: FormData) {
  const supabase = await createClient();
  
  const data = {
    keterangan: formData.get('keterangan') as string,
    jenis: formData.get('jenis') as string, // 'masuk' atau 'keluar'
    jumlah: Number(formData.get('jumlah')),
    tanggal: formData.get('tanggal') as string,
  };

  const { error } = await supabase.from('transaksi').insert(data);

  if (error) return { error: error.message };
  
  revalidatePath('/dashboard/keuangan');
  return { success: true };
}

// 2. UPDATE
export async function updateTransaksi(formData: FormData) {
  const supabase = await createClient();
  
  const id = formData.get('id') as string;
  const data = {
    keterangan: formData.get('keterangan') as string,
    jenis: formData.get('jenis') as string,
    jumlah: Number(formData.get('jumlah')),
    tanggal: formData.get('tanggal') as string,
  };

  const { error } = await supabase.from('transaksi').update(data).eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/dashboard/keuangan');
  return { success: true };
}

// 3. DELETE
export async function deleteTransaksi(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('transaksi').delete().eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/dashboard/keuangan');
  return { success: true };
}