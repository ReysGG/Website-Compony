import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export const metadata = {
  title: "Kontak | PT Soka Utama Niaga",
  description: "Informasi kontak dan lokasi PT Soka Utama Niaga",
};

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-24 flex flex-col">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Hubungi Kami</h1>
           <p className="text-lg text-slate-600 max-w-2xl mx-auto">
             Tim kami siap membantu kebutuhan pengadaan alat berat dan suku cadang perusahaan Anda. Silakan hubungi kami melalui saluran di bawah ini.
           </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Contact Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Kantor Pusat</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Jl. Swadaya Raya, Ruko Swadaya City Square Blok II No.11, RT.11/RW.2, Wijaya Kusuma, Kec. Grogol petamburan, Kota Jakarta Barat, 11460
              </p>
            </div>

            {/* Contact Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Telepon & Email</h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-center gap-3">
                  <span className="font-medium shrink-0">Telp 1:</span> + (62) (021) 5646 149
                </li>
                <li className="flex items-center gap-3">
                  <span className="font-medium shrink-0">Telp 2:</span> + (62) (021) 21254 409
                </li>
                <li className="flex items-center gap-3">
                  <span className="font-medium shrink-0">WhatsApp:</span> 081372626818
                </li>
                <li className="flex items-center gap-3">
                  <span className="font-medium shrink-0">Email:</span> info@sokautamaniaga.co.id
                </li>
              </ul>
            </div>

            {/* Contact Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Jam Operasional</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex justify-between items-center">
                  <span>Senin - Jumat</span>
                  <span className="font-medium text-slate-900">08:00 - 17:00</span>
                </li>
                <li className="flex justify-between items-center">
                  <span>Sabtu</span>
                  <span className="font-medium text-slate-900">08:00 - 17:00</span>
                </li>
                <li className="flex justify-between items-center text-red-600 font-medium pt-2 border-t border-slate-100 mt-2">
                  <span>Minggu / Libur</span>
                  <span>Tutup</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Standard Form Section */}
            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Kirim Pesan</h3>
              <p className="text-slate-600 mb-8">Punya pertanyaan umum, penawaran kerja sama, atau butuh bantuan? Silakan isi formulir di bawah ini.</p>
              
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-slate-50" placeholder="John Doe" required/>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">Alamat Email</label>
                    <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-slate-50" placeholder="john@example.com" required/>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Subjek Pesan</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all bg-slate-50 text-slate-700">
                    <option>Pertanyaan Umum</option>
                    <option>Penawaran Kerja Sama / Promosi</option>
                    <option>Layanan Pelanggan / Keluhan</option>
                    <option>Lainnya</option>
                  </select>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">Isi Pesan</label>
                  <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all resize-none bg-slate-50" placeholder="Tuliskan pesan Anda di sini..." required></textarea>
                </div>
                
                <Button className="w-full py-6 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Kirim Pesan
                </Button>
              </form>
            </div>

            {/* Map Section */}
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 h-[600px] lg:h-auto">
              <div className="w-full h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-100">
                <iframe 
                  src="https://maps.google.com/maps?q=Jl.%20Swadaya%20Raya%2C%20Ruko%20Swadaya%20City%20Square%20Blok%20II%20No.11%2C%20RT.11%2FRW.2%2C%20Wijaya%20Kusuma%2C%20Kec.%20Grogol%20petamburan%2C%20Kota%20Jakarta%20Barat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2011460&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi PT Soka Utama Niaga - Grogol Petamburan"
                ></iframe>
              </div>
            </div>
          </div>

        </div>
      </section>
      
      <Footer />
    </main>
  );
}
