'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createRekening(formData: FormData) {
  const supabase = await createClient();
  
  const data = {
    nama_bank: formData.get('bank') as string,
    nomor_rekening: formData.get('norek') as string,
    atas_nama: formData.get('an') as string,
  };

  const { error } = await supabase.from('rekening_gereja').insert(data);
  if (error) return { error: error.message };
  
  revalidatePath('/dashboard/rekening');
  revalidatePath('/persembahan');
  return { success: true };
}

export async function deleteRekening(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('rekening_gereja').delete().eq('id', id);
  if (error) return { error: error.message };

  revalidatePath('/dashboard/rekening');
  revalidatePath('/persembahan');
  return { success: true };
}