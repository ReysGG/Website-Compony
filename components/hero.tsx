import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[#070b19] text-white overflow-hidden pt-28 pb-16"
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      
      {/* Tech Circles Background Elements with Infinite Rotation Animations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full z-0 pointer-events-none animate-[spin_40s_linear_infinite]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full z-0 pointer-events-none border-dashed animate-[spin_60s_linear_reverse_infinite]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/5 rounded-full z-0 pointer-events-none animate-[spin_90s_linear_infinite]"></div>
      
      {/* Glowing Light Beams */}
      <div className="absolute -top-40 right-0 w-1/2 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rotate-45 blur-[2px] opacity-40"></div>
      <div className="absolute top-40 -right-20 w-3/4 h-[2px] bg-gradient-to-r from-transparent via-blue-300 to-transparent rotate-45 blur-[1px] opacity-60 shadow-[0_0_15px_#3b82f6]"></div>
      <div className="absolute bottom-20 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent -rotate-[30deg] blur-[1px] opacity-30 shadow-[0_0_10px_white]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text Content */}
          <div className="max-w-xl">
            <BlurFade delay={0.2} inView>
              <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-[1.2] mb-6">
                <span className="text-white block">Solusi Kebutuhan</span>
                <span className="text-blue-500 block">Alat Berat &</span>
                <span className="text-blue-500 block">Crane</span>
                <span className="text-white block">Anda</span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.4} inView>
              <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
                PT Soka Utama Niaga hadir untuk mendukung optimalisasi bisnis dan
                pekerjaan proyek Anda dengan peralatan konstruksi dan pengangkat
                berkualitas terbaik.
              </p>
            </BlurFade>

            <BlurFade delay={0.6} inView>
              <Link 
                href="#products" 
                className="inline-flex items-center justify-center bg-gradient-to-b from-[#4a9eff] to-[#2563eb] hover:from-[#5aa8ff] hover:to-[#1d4ed8] text-white font-semibold text-lg px-8 py-4 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-blue-400/40 transition-all hover:scale-105"
              >
                Lihat Produk Kami
              </Link>
            </BlurFade>
          </div>

          {/* Right Column: Image */}
          <BlurFade delay={0.8} inView className="relative w-full max-w-lg mx-auto lg:ml-auto">
            {/* Underglow for image */}
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl transform scale-95 rounded-full"></div>
            
            {/* The Image Container */}
            <div className="relative aspect-[3/4] md:aspect-[4/5] bg-slate-800 rounded-sm overflow-hidden border border-slate-700/50 shadow-2xl shadow-black/50">
              <img 
                src="https://psualatberat.com/wp-content/uploads/2024/09/Komponen-excavator-dan-Fungsinya-Ini-Bagian-Utamanya.jpg" 
                alt="Excavator at dusk" 
                className="w-full h-full object-cover opacity-90 mix-blend-luminosity brightness-110 hover:scale-105 transition-transform duration-[2000ms] cursor-pointer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b19] via-transparent to-transparent opacity-60 pointer-events-none"></div>
            </div>
          </BlurFade>

        </div>
      </div>
    </section>
  );
}
