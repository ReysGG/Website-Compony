import Link from "next/link";
import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowRight, ChevronRight, HardHat } from "lucide-react";

export function Hero() {
  const stats = [
    { value: "30+", label: "Tahun Berpengalaman" },
    { value: "87+", label: "Produk Terjual" },
    { value: "100%", label: "Pengiriman Sukses" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-[#050814] text-white overflow-hidden pt-32 pb-32 md:pb-24"
    >
      {/* Blueprint Grid - Industrial */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

      {/* Industrial Accents */}
      <div className="absolute top-0 right-0 w-full md:w-[800px] h-[500px] md:h-[800px] bg-gradient-to-bl from-[#2563eb]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-2/3 md:w-1/3 h-1 bg-gradient-to-r from-[#2563eb] to-transparent" />
      <div className="absolute top-40 right-10 w-px h-32 bg-gradient-to-b from-white/20 to-transparent hidden md:block" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column */}
          <div className="max-w-2xl flex flex-col gap-6 md:gap-8">

            {/* Eyebrow badge */}
            <BlurFade delay={0.1} inView>
              <div className="inline-flex items-center gap-2 bg-[#1A1F35] border-l-2 border-[#2563eb] px-3 py-1.5 w-fit">
                <HardHat className="w-4 h-4 text-[#2563eb]" />
                <span className="text-[9px] md:text-[10px] font-bold text-slate-300 tracking-[0.2em] uppercase">
                  Distributor Resmi Alat Berat
                </span>
              </div>
            </BlurFade>

            {/* H1 — Industrial Bold Typography */}
            <BlurFade delay={0.2} inView>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] md:leading-[1.05] uppercase">
                <span className="text-white block">Daya Angkat</span>
                <span className="text-[#2563eb] block">Tanpa Batas</span>
                <span className="text-slate-400 block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-2 tracking-normal">Untuk Proyek Anda</span>
              </h1>
            </BlurFade>

            {/* Deskripsi */}
            <BlurFade delay={0.35} inView>
              <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed max-w-lg border-l-2 border-white/10 pl-4">
                PT Soka Utama Niaga menyuplai peralatan konstruksi, earthmoving, dan lifting tugas berat dengan standar kualitas dan durabilitas tertinggi.
              </p>
            </BlurFade>

            {/* CTA — primary + secondary */}
            <BlurFade delay={0.5} inView>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-2">
                <Link
                  href="#products"
                  className="inline-flex items-center justify-center bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-black uppercase tracking-wider text-xs md:text-sm px-6 md:px-8 py-3.5 md:py-4 rounded-sm transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] w-full sm:w-auto"
                >
                  Lihat Produk Kami
                </Link>
                <Link
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 text-white hover:text-[#2563eb] bg-white/5 hover:bg-white/10 font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-3.5 md:py-4 border border-white/20 hover:border-[#2563eb] rounded-sm transition-all w-full sm:w-auto"
                >
                  Hubungi Kami
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </BlurFade>
          </div>

          {/* Right Column: Hero Image & Bento Grid Stats */}
          <div className="relative w-full h-full min-h-[350px] md:min-h-[500px] flex items-center justify-center mt-12 lg:mt-0">
            <BlurFade delay={0.6} inView className="absolute inset-0 w-full h-full">
              {/* Main Excavator Image */}
              <div className="relative w-full h-full bg-[#0a0f25] border border-white/10 p-2 md:p-3 group overflow-hidden shadow-2xl shadow-black/80">
                <div className="absolute inset-0 bg-[#2563eb]/10 group-hover:bg-[#2563eb]/0 transition-colors duration-500 z-10 pointer-events-none" />
                <div className="relative w-full h-[280px] sm:h-[350px] md:h-full">
                  <Image
                    src="https://psualatberat.com/wp-content/uploads/2024/09/Komponen-excavator-dan-Fungsinya-Ini-Bagian-Utamanya.jpg"
                    alt="Industrial Excavator"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover filter grayscale-[10%] contrast-[1.15] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                    priority
                  />
                </div>
                
                {/* Tech / HUD Overlays */}
                <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 bg-[#050814]/80 backdrop-blur-md border border-white/10 px-2 py-1 md:px-3 md:py-1.5 flex gap-2 items-center">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[8px] md:text-[10px] font-mono text-white tracking-widest uppercase">STOK TERSEDIA</span>
                </div>
                
                {/* Frame Corners */}
                <div className="absolute top-0 left-0 w-3 h-3 md:w-4 md:h-4 border-t-2 border-l-2 border-[#2563eb] z-20" />
                <div className="absolute bottom-0 right-0 w-3 h-3 md:w-4 md:h-4 border-b-2 border-r-2 border-[#2563eb] z-20" />
              </div>
            </BlurFade>

            {/* Bento Grid Stats Overlapping */}
            {/* Di mode mobile (HP), grid ini menggunakan inset-x-4 sehingga rata tengah, dan memiliki margin/lebar responsif */}
            <BlurFade delay={0.8} inView className="absolute -bottom-16 inset-x-4 md:inset-x-auto md:-bottom-12 md:-left-12 md:max-w-[400px] z-30">
              <div className="bg-[#11162B] border border-white/10 shadow-2xl shadow-black p-4 sm:p-5 md:p-6 grid grid-cols-2 gap-3 sm:gap-4 backdrop-blur-md">
                {stats.map((stat, i) => (
                  <div key={i} className={`flex flex-col justify-center gap-0.5 md:gap-1 ${i === 2 ? 'col-span-2 pt-2 md:pt-3 border-t border-white/10 mt-1 md:mt-2' : ''}`}>
                    <span className="text-2xl sm:text-3xl font-black text-[#2563eb] tracking-tighter">
                      {stat.value}
                    </span>
                    <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-slate-300 uppercase tracking-widest leading-none mt-1">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </BlurFade>
          </div>

        </div>
      </div>
    </section>
  );
}
