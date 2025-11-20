import { HourglassHigh, Quotes } from "@phosphor-icons/react/dist/ssr";

export default function History() {
  return (
    <section id="sejarah" className="py-20 bg-light">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <div className="flex justify-center mb-4">
            <HourglassHigh size={48} className="text-primary" weight="duotone" />
        </div>
        <h2 className="text-3xl font-bold text-primary mb-2">Sejarah Singkat</h2>
        <p className="text-gray-500 mb-10">Perjalanan iman dan pelayanan kami.</p>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm text-left border-l-4 border-accent relative">
          <Quotes size={36} weight="fill" className="text-gray-200 absolute top-4 right-8" />
          <p className="text-gray-600 leading-loose mb-4">
            Gereja ini berdiri pada tahun 1980, bermula dari persekutuan doa kecil yang terdiri dari 10 keluarga. Atas kasih karunia Tuhan, kami terus bertumbuh menjadi komunitas yang melayani ratusan jemaat saat ini.
          </p>
          <p className="text-gray-600 leading-loose">
            Di era modern ini, kami berkomitmen tidak hanya membangun iman secara rohani, tetapi juga menata administrasi gereja secara profesional melalui pemanfaatan teknologi informasi agar pelayanan dapat menjangkau lebih luas.
          </p>
        </div>
      </div>
    </section>
  );
}