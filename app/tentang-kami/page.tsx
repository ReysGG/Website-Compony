import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { History } from "@/components/history";
import { VisiMisi } from "@/components/visi-misi";
import { BlurFade } from "@/components/ui/blur-fade";
import Image from "next/image";
import { Check } from "lucide-react";

export const metadata = {
  title: "Tentang Kami | PT Soka Utama Niaga",
  description: "Sejarah dan Visi Misi PT Soka Utama Niaga sebagai distributor alat berat terbaik di Indonesia.",
};

export default function TentangKamiPage() {
  const points = [
    "Pengadaan unit crane heavy-duty skala nasional",
    "Layanan purna jual & maintanance berpengalaman",
    "Distribusi suku cadang terlengkap dan tercepat"
  ];

  return (
    <main className="min-h-screen bg-white text-foreground font-sans">
      <Navbar />

      {/* Hero Section untuk About Us (menggunakan padding top ekstra untuk kompensasi floating navbar) */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-white relative overflow-hidden">
        
        {/* Background Decorative Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col">
              <BlurFade delay={0.1}>
                {/* Eyebrow badge style matching homepage */}
                <div className="inline-flex items-center gap-2 bg-[#2563eb]/10 border-l-2 border-[#2563eb] px-3 py-1.5 w-fit mb-6">
                  <span className="text-[10px] font-bold text-[#2563eb] tracking-[0.2em] uppercase">
                    Profil Perusahaan
                  </span>
                </div>
              </BlurFade>

              <BlurFade delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] mb-6 tracking-tight leading-[1.1]">
                  Membangun Negeri dengan <span className="text-[#2563eb]">Alat Berat Terpercaya.</span>
                </h1>
              </BlurFade>

              <BlurFade delay={0.3}>
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-10 border-l-4 border-slate-100 pl-4">
                  PT Soka Utama Niaga adalah mitra terpercaya dalam pengadaan alat berat dan suku cadang industri. Selama lebih dari 3 dekade, kami telah berdiri tegak mendukung sektor infrastruktur, konstruksi, dan pertambangan di seluruh penjuru Indonesia.
                </p>
              </BlurFade>
              
              <BlurFade delay={0.4}>
                <ul className="space-y-5">
                  {points.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 group">
                      <div className="w-6 h-6 rounded-full bg-[#2563eb]/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#2563eb] group-hover:text-white transition-colors duration-300">
                        <Check className="w-3.5 h-3.5 text-[#2563eb] group-hover:text-white transition-colors duration-300" strokeWidth={3} />
                      </div>
                      <span className="text-slate-700 font-bold">{item}</span>
                    </li>
                  ))}
                </ul>
              </BlurFade>
            </div>

            {/* Right Photo Area */}
            <div className="relative group">
              <BlurFade delay={0.5}>
                {/* Decorative off-grid frame */}
                <div className="absolute -inset-4 md:-inset-6 bg-slate-50 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-700 ease-out z-0 border border-slate-200" />
                
                {/* Main Photo Container */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-xl group-hover:shadow-2xl transition-all duration-700 z-10 border border-slate-200/50">
                  <div className="absolute inset-0 bg-[#0f172a]/10 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  
                  <Image 
                    src="https://products.unitedtractors.com/wp-content/uploads/2023/09/2.-Banner-Landscape-01-290823-4-alat-yg-wajib-di-miliki-di-pertambangan-scaled.jpg" 
                    alt="Armada Alat Berat PT Soka Utama Niaga"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  
                  {/* Floating Badge Impactful Style */}
                  <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:w-auto bg-white/95 backdrop-blur-md p-5 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 flex items-center gap-4 z-20 group-hover:-translate-y-1 transition-transform duration-500">
                    <div className="text-3xl md:text-4xl font-black text-[#2563eb]">30+</div>
                    <div className="w-px h-10 bg-slate-200" />
                    <div className="text-xs font-bold text-[#0f172a] uppercase tracking-wider leading-tight">
                      Tahun<br/>Pengalaman
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>

          </div>
        </div>
      </section>

      {/* History menggunakan bg-slate-50 dari komponen aslinya */}
      <History />
      
      {/* Visi Misi menggunakan bg-white dari komponen aslinya */}
      <VisiMisi />
      
      <Footer />
    </main>
  );
}
