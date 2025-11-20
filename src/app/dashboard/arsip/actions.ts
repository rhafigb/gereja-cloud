'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// 1. CREATE (Upload File + Insert DB)
export async function createArsip(formData: FormData) {
  const supabase = await createClient();
  
  const nama = formData.get('nama') as string;
  const kategori = formData.get('kategori') as string;
  const file = formData.get('file') as File; // Ambil object File

  if (!file) {
    return { error: "File wajib diupload" };
  }

  // A. Upload File ke Supabase Storage
  // Buat nama file unik: timestamp-namafile.pdf
  const fileName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
  
  const { data: uploadData, error: uploadError } = await supabase
    .storage
    .from('arsip')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    return { error: `Upload Gagal: ${uploadError.message}` };
  }

  // B. Dapatkan Public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from('arsip')
    .getPublicUrl(fileName);

  // C. Simpan Metadata ke Database
  const { error: dbError } = await supabase.from('arsip').insert({
    nama_dokumen: nama,
    kategori: kategori,
    url_file: publicUrl, // Simpan link hasil upload
    // Kita bisa simpan nama path file asli jika nanti butuh delete file di storage
    // Tapi untuk MVP, url saja cukup.
  });

  if (dbError) return { error: dbError.message };
  
  revalidatePath('/dashboard/arsip');
  return { success: true };
}

// 2. UPDATE (Hanya Metadata dulu untuk kesederhanaan)
export async function updateArsip(formData: FormData) {
  const supabase = await createClient();
  
  const id = formData.get('id') as string;
  const data = {
    nama_dokumen: formData.get('nama') as string,
    kategori: formData.get('kategori') as string,
    // Fitur ganti file di update butuh logic hapus file lama,
    // Untuk sekarang kita update nama/kategori saja.
  };

  const { error } = await supabase.from('arsip').update(data).eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/dashboard/arsip');
  return { success: true };
}

// 3. DELETE (Hapus Data DB + Hapus File Storage)
export async function deleteArsip(id: string, fileUrl: string | null) {
  const supabase = await createClient();

  // A. Hapus File dari Storage (Jika ada URL)
  if (fileUrl) {
    // Ekstrak nama file dari URL. URL format: .../arsip/nama-file.pdf
    const fileName = fileUrl.split('/').pop(); 
    if (fileName) {
        await supabase.storage.from('arsip').remove([fileName]);
    }
  }

  // B. Hapus Data dari DB
  const { error } = await supabase.from('arsip').delete().eq('id', id);

  if (error) return { error: error.message };

  revalidatePath('/dashboard/arsip');
  return { success: true };
}