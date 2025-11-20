import { CloudArrowUp, Files } from "@phosphor-icons/react/dist/ssr";

export default function About() {
  return (
    <section id="tentang" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/10 rounded-full blur-xl"></div>
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
              alt="Digital Archive"
              className="rounded-2xl shadow-2xl relative z-10 w-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-primary mb-4">Transformasi Digital Gereja</h2>
            <div className="w-20 h-1 bg-accent mb-6"></div>
            <p className="text-gray-600 leading-relaxed mb-6">
              Kami mengimplementasikan <strong>Sistem Informasi Manajemen Arsip Digital</strong> berbasis cloud untuk memastikan seluruh data sejarah, administrasi jemaat, dan keuangan tersimpan dengan aman dan mudah diakses.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0">
                  <CloudArrowUp size={24} weight="fill" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Cloud Storage</h4>
                  <p className="text-sm text-gray-500">Akses data real-time dari mana saja.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-primary shrink-0">
                  <Files size={24} weight="fill" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">Arsip Digital</h4>
                  <p className="text-sm text-gray-500">Digitalisasi dokumen fisik gereja.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}