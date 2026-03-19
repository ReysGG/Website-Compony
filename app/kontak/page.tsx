import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Kontak | PT Soka Utama Niaga",
  description: "Hubungi PT Soka Utama Niaga",
};

export default function KontakPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans flex flex-col pt-12 md:pt-0">
      <Navbar />
      
      {/* Split Screen Layout Container */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-80px)] mt-0 md:mt-12">
        
        {/* Left Side: Dark Contact Info Pane */}
        <div className="lg:w-5/12 bg-[#070b19] text-white p-10 lg:p-20 flex flex-col justify-center relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15),transparent_60%)]"></div>
          
          <div className="relative z-10 w-full max-w-md mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-5xl font-black mb-6 tracking-tight leading-tight">Mari Mulai Kolaborasi!</h1>
            <p className="text-slate-400 mb-12 text-lg leading-relaxed">Hubungi teknisi spesialis kami untuk mengonsultasikan kebutuhan pengadaan armada dan komponen suku cadang alat berat tingkat B2B Anda.</p>
            
            <div className="space-y-10">
              <div className="flex gap-6 items-start">
                <div className="mt-1 w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 shadow-lg shadow-blue-900/20">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-white">Kantor Pusat</h3>
                  <p className="text-slate-400 leading-relaxed text-base">Komp. Ruko Pemuda PRB No 6<br/>Jl. Pemuda No 296, Pulo Gadung,<br/>Jakarta Timur 13220</p>
                </div>
              </div>

              <div className="flex gap-6 items-start">
                <div className="mt-1 w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 shadow-lg shadow-blue-900/20">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 text-white">Jalur Resmi Akses Cepat</h3>
                  <p className="text-slate-400 leading-relaxed text-base">021-4809224<br/>admin@sokautamaniaga.co.id</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side: White Professional Inquiry Form */}
        <div className="lg:w-7/12 bg-white p-8 lg:p-20 flex items-center justify-center relative">
          <div className="w-full max-w-xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Kirim Permohonan Penawaran</h2>
            <p className="text-slate-500 mb-10 text-lg">Lengkapi formulir komersial ini dan perwakilan penjualan kami akan menghubungi Bapak/Ibu sesegera mungkin.</p>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nama Perusahaan / Instansi *</label>
                  <input type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50 font-medium" placeholder="PT Contoh Konstruksi" required/>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Diwakili Oleh *</label>
                  <input type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50 font-medium" placeholder="Budi Santoso" required/>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Alamat Email Perusahaan *</label>
                <input type="email" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50 font-medium" placeholder="pengadaan@contoh.com" required/>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Subjek Kebutuhan Pokok</label>
                <input type="text" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all bg-slate-50 font-medium" placeholder="Pembelian Mobile Crane / Servis Berkala"/>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Rincian Modifikasi / Pesan Spesifik *</label>
                <textarea rows={5} className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none bg-slate-50 font-medium" placeholder="Kami membutuhkan alat berat bertenaga spesifik untuk medan pertambangan..." required></textarea>
              </div>
              
              <Button className="w-full py-7 text-lg font-bold bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-500/20 rounded-xl transition-all hover:-translate-y-1">
                Kirim Pesan Penawaran Resmi
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
