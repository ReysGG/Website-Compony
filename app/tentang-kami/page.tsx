import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { History } from "@/components/history";
import { VisiMisi } from "@/components/visi-misi";

export const metadata = {
  title: "Tentang Kami | PT Soka Utama Niaga",
  description: "Sejarah dan Visi Misi PT Soka Utama Niaga",
};

export default function TentangKamiPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans pt-24">
      <Navbar />
      
      {/* Clean Corporate Intro with Photo Layout */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left Content */}
            <div className="w-full lg:w-1/2">
              <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 font-bold text-sm tracking-widest uppercase mb-6">
                Profil Perusahaan
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight leading-tight">
                Membangun Negeri dengan <span className="text-blue-600">Alat Berat Terpercaya.</span>
              </h1>
              <div className="w-20 h-1.5 bg-blue-600 mb-8 rounded-full"></div>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                PT Soka Utama Niaga adalah mitra terpercaya dalam pengadaan alat berat dan suku cadang industri. Selama lebih dari 3 dekade, kami telah berdiri tegak mendukung sektor infrastruktur, konstruksi, dan pertambangan di seluruh penjuru Indonesia.
              </p>
              
              {/* Optional Checklist or Stats to fill space professionally */}
              <ul className="space-y-4 mb-4">
                {[
                  "Pengadaan unit standar heavy-duty nasional",
                  "Layanan purna jual & maintanance berpengalaman",
                  "Jaringan distribusi suku cadang terlengkap"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                     <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                       <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                       </svg>
                     </div>
                     <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Photo Placeholder */}
            <div className="w-full lg:w-1/2 relative group">
              {/* Decorative accent */}
              <div className="absolute -inset-4 bg-slate-100 rounded-[2.5rem] transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              
              {/* Main Photo Container */}
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden bg-slate-200 border border-slate-200 shadow-xl group-hover:shadow-2xl transition-shadow duration-500 flex items-center justify-center">
                 {/* 
                   Ganti src gambar di bawah ini dengan foto direksi / kantor / armada 
                   Rekomendasi ukuran: 1200x900px
                 */}
                 <img 
                   src="https://products.unitedtractors.com/wp-content/uploads/2023/09/2.-Banner-Landscape-01-290823-4-alat-yg-wajib-di-miliki-di-pertambangan-scaled.jpg" 
                   alt="Armada Alat Berat PT Soka Utama Niaga" 
                   className="w-full h-full object-cover"
                 />
                 
                 {/* Floating Badge */}
                 <div className="absolute bottom-6 left-6 right-6 md:right-auto bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-slate-100 flex items-center gap-4">
                    <div className="text-4xl font-black text-blue-600">30+</div>
                    <div className="text-sm font-bold text-slate-700 leading-tight uppercase tracking-wider">Tahun<br/>Pengalaman</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Milestones */}
      <History />
      
      {/* Core Philosophy */}
      <VisiMisi />
      
      <Footer />
    </main>
  );
}
