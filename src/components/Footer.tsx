import Link from "next/link";
import { Church, FacebookLogo, InstagramLogo, YoutubeLogo, LockKey, MapPin, Phone, Envelope } from "@phosphor-icons/react/dist/ssr";
import { createClient } from "@/utils/supabase/server";

export default async function Footer() {
  const supabase = await createClient();
  
  // Fetch Data Settings
  const { data: settings } = await supabase
    .from('organization_settings')
    .select('*')
    .eq('id', 1)
    .single();

  return (
    <footer id="kontak" className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
              <Church size={32} weight="fill" className="text-accent" />
              <span>{settings?.nama_gereja?.split(' ')[0] || 'GEREJA'}<span className="text-accent">CLOUD</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Mewujudkan administrasi gereja yang efisien, transparan, dan modern.
            </p>
            {/* Social Media Icons (Static for now) */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent transition text-white"><FacebookLogo weight="fill" size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-accent transition text-white"><InstagramLogo weight="fill" size={20} /></a>
            </div>
          </div>

          {/* Quick Links (Static) */}
          <div>
            <h4 className="font-bold text-lg mb-6">Menu Navigasi</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-accent transition">Beranda</Link></li>
              <li><Link href="/warta" className="hover:text-accent transition">Warta Jemaat</Link></li>
              <li><Link href="/jadwal" className="hover:text-accent transition">Jadwal Ibadah</Link></li>
              <li><Link href="/login" className="hover:text-accent transition flex items-center gap-2"><LockKey weight="bold" /> Login Admin</Link></li>
            </ul>
          </div>

          {/* Alamat Dinamis */}
          <div>
            <h4 className="font-bold text-lg mb-6">Hubungi Kami</h4>
            <ul className="space-y-4 text-gray-400 text-sm">
              <li className="flex gap-3">
                <MapPin weight="fill" className="text-accent text-xl shrink-0" />
                <span>{settings?.alamat}</span>
              </li>
              <li className="flex gap-3">
                <Phone weight="fill" className="text-accent text-xl shrink-0" />
                <span>{settings?.telepon}</span>
              </li>
              <li className="flex gap-3">
                <Envelope weight="fill" className="text-accent text-xl shrink-0" />
                <span>{settings?.email}</span>
              </li>
            </ul>
          </div>

          {/* Map */}
          <div>
            <h4 className="font-bold text-lg mb-6">Peta Lokasi</h4>
            <div className="w-full h-40 bg-gray-800 rounded-lg flex items-center justify-center text-gray-500">
              <span className="text-xs">[Google Maps Embed Area]</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {settings?.nama_gereja}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}