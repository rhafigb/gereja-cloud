'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
  const supabase = await createClient();

  const data = {
    nama_pengirim: formData.get('name') as string,
    email: formData.get('email') as string,
    subjek: formData.get('subject') as string,
    pesan: formData.get('message') as string,
  };

  const { error } = await supabase.from('inbox').insert(data);

  if (error) return { error: error.message };

  return { success: true };
}