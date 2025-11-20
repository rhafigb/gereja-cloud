'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// 1. TANDAI SUDAH DIBACA (Mark as Read)
export async function markAsRead(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('inbox')
    .update({ is_read: true })
    .eq('id', id);

  if (error) return { error: error.message };
  
  revalidatePath('/dashboard/pesan');
  return { success: true };
}

// 2. HAPUS PESAN
export async function deletePesan(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from('inbox').delete().eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/dashboard/pesan');
  return { success: true };
}