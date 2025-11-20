import { createClient } from "@/utils/supabase/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Schedule from "@/components/Schedule"; // Komponen Schedule perlu disesuaikan agar menerima props, atau biarkan statis sebagai preview
import Footer from "@/components/Footer";

// Agar halaman ini tidak full statis (karena fetch data), kita set revalidate
export const revalidate = 60; // Refresh data setiap 60 detik

export default async function Home() {
  const supabase = await createClient();

  // 1. Ambil Info Gereja
  const { data: settings } = await supabase
    .from('organization_settings')
    .select('*')
    .eq('id', 1)
    .single();

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Kita bisa passing data settings ke komponen Hero jika ingin teksnya dinamis */}
      {/* Untuk sekarang kita biarkan default, tapi Footer sudah dinamis */}
      <Hero /> 
      
      <div className="py-10 bg-blue-50 text-center">
         <p className="text-primary font-semibold">
            Selamat Datang di Website Resmi {settings?.nama_gereja || 'Gereja Cloud'}
         </p>
      </div>

      <About />
      
      {/* Schedule di Home biasanya hanya preview, bisa kita biarkan statis atau fetch data juga */}
      <Schedule /> 
      
      <Footer />
    </main>
  );
}