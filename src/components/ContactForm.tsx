'use client';

import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { submitContactForm } from "@/app/kontak/actions"; // Sesuaikan path import jika perlu
import { PaperPlaneRight } from "@phosphor-icons/react";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    const loadingToast = toast.loading('Mengirim pesan...');

    // Panggil Server Action
    const res = await submitContactForm(formData);
    
    toast.dismiss(loadingToast);

    if (res?.error) {
      toast.error(`Gagal: ${res.error}`);
    } else {
      toast.success('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
      formRef.current?.reset(); // Reset form setelah sukses
    }

    setIsLoading(false);
  };

  return (
    <form ref={formRef} action={clientAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
          <input name="name" type="text" required className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary transition" placeholder="Nama Anda" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input name="email" type="email" required className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary transition" placeholder="email@contoh.com" />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subjek</label>
        <select name="subject" className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary bg-white transition">
          <option>Pertanyaan Umum</option>
          <option>Permohonan Doa</option>
          <option>Masalah Akun Arsip</option>
          <option>Jadwal Ibadah</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Pesan</label>
        <textarea name="message" rows={5} required className="w-full px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-primary transition" placeholder="Tulis pesan Anda..."></textarea>
      </div>
      
      <button 
        type="submit" 
        disabled={isLoading}
        className="bg-accent hover:bg-amber-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-md w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {isLoading ? 'Mengirim...' : <><PaperPlaneRight size={20} weight="bold"/> Kirim Pesan</>}
      </button>
    </form>
  );
}