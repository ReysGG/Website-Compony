import Image from "next/image";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export function Intro() {
  return (
    <section id="intro" className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[grid-linear-gradient(to_right,#80808012_1px,transparent_1px),grid-linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <BlurFade delay={0.2} inView>
          <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 font-bold tracking-wider uppercase text-[10px] md:text-xs">
                Partner Alat Berat Terpercaya
              </span>
            </div>
            <h2 className="text-3xl md:text-6xl font-black tracking-tight leading-[1.1] text-[#0f172a] mb-8">
              Pilihan Alat Berat yang Tepat Menentukan <span className="text-blue-600">Keberhasilan Anda</span>
            </h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full" />
          </div>
        </BlurFade>

        <div className="grid lg:grid-cols-12 gap-16 items-center">
          
          {/* Kolom Teks */}
          <div className="lg:col-span-6 space-y-8 order-2 lg:order-1">
            <BlurFade delay={0.4} inView>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                  Kehadiran alat berat sangat vital untuk proyek infrastruktur, industri, hingga logistik. Saat tenaga manual mencapai batasnya, <span className="text-[#0f172a] font-bold">PT. Soka Utama Niaga</span> hadir dengan solusi armada tangguh.
                </p>
                
                <div className="grid sm:grid-cols-2 gap-4 pt-4">
                  {[
                    "Crawler Crane",
                    "Mobile/Truck Crane",
                    "Rough Terrain Crane",
                    "Suku Cadang Lengkap"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-700 font-semibold">
                      <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <p className="text-lg text-slate-500 italic border-l-4 border-blue-200 pl-6 py-2">
                  "Kami memberikan kemudahan akses peralatan konstruksi berkualitas tinggi untuk setiap langkah proyek Anda."
                </p>
              </div>
            </BlurFade>

            {/* CTA Button */}
            <BlurFade delay={0.6} inView>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link 
                  href="/produk" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-blue-600 rounded-2xl hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/40 group active:scale-95"
                >
                  Jelajahi Katalog
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Link>
                <Link 
                  href="/kontak" 
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 transition-all duration-300 bg-white border-2 border-blue-50 rounded-2xl hover:border-blue-200 hover:bg-blue-50 active:scale-95"
                >
                  Konsultasi Gratis
                </Link>
              </div>
            </BlurFade>
          </div>

          {/* Kolom Gambar */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <BlurFade delay={0.5} inView>
              <div className="relative">
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-60" />
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-slate-200 rounded-full blur-3xl opacity-40" />
                
                {/* Image Container */}
                <div className="relative z-10 p-3 rounded-[2.5rem] border-2 border-slate-100 bg-white/80 backdrop-blur-sm shadow-2xl overflow-hidden group">
                  <div className="relative aspect-[4/5] sm:aspect-[4/3] w-full overflow-hidden rounded-[2rem]">
                    <Image 
                      src="https://www.deere.com/assets/images/common/products/excavators/870g/870G-Large-Excavator-1366x768.jpg" 
                      alt="Alat Berat PT Soka Utama Niaga" 
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    
                    {/* Floating Trust Badge */}
                    <div className="absolute bottom-6 right-6 left-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-xl border border-white/50 transform transition-transform duration-500 group-hover:-translate-y-2">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                          30+
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900 leading-none">Tahun Pengalaman</p>
                          <p className="text-xs font-bold text-blue-600">Melayani Proyek Nasional</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

        </div>
      </div>
    </section>
  );
}