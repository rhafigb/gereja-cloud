import { Heart, HandCoins, QrCode } from "@phosphor-icons/react/dist/ssr";

export default function Donation() {
  return (
    <section id="persembahan" className="py-20">
      <div className="container mx-auto px-6">
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
          {/* Pattern Background */}
          <Heart weight="fill" className="text-[200px] absolute -top-10 -right-10 text-white/5" />
          <HandCoins weight="fill" className="text-[200px] absolute -bottom-10 -left-10 text-white/5" />

          <h2 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Persembahan Kasih</h2>
          <p className="text-blue-100 mb-10 max-w-xl mx-auto relative z-10">
            "Hendaklah masing-masing memberikan menurut kerelaan hatinya, jangan dengan sedih hati atau karena paksaan." (2 Korintus 9:7)
          </p>

          <div className="bg-white text-gray-800 rounded-xl p-8 max-w-lg mx-auto shadow-2xl relative z-10">
            <div className="flex flex-col items-center">
              <p className="text-sm font-bold text-gray-400 uppercase mb-2">Transfer Bank</p>
              <h3 className="text-2xl font-bold text-primary">BCA 123-456-7890</h3>
              <p className="text-gray-600 mb-6">a.n Gereja Cloud Indonesia</p>

              <div className="w-full border-t border-gray-200 my-4 relative">
                <span className="bg-white px-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-sm">ATAU SCAN QRIS</span>
              </div>

              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <QrCode size={96} className="text-gray-400" weight="light" />
              </div>
              <p className="text-xs text-gray-400">Scan menggunakan GoPay, OVO, Dana, atau Mobile Banking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}