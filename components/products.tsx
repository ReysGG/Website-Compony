import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowRight, Settings } from "lucide-react";
import Link from "next/link";
import Image from "next/image"; // Tambahkan import Image dari Next.js
import { products } from "@/lib/data";

export function Products() {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 md:gap-0">
          <div className="flex gap-4 items-center">
            <BlurFade delay={0.1} inView>
              {/* Eyebrow Text yang konsisten dengan Intro & History */}
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-4 h-4 text-[#2563eb]" />
                <span className="text-sm font-bold tracking-widest text-[#2563eb] uppercase block">
                  Katalog Unit
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
                Produk <span className="text-[#2563eb]">Utama</span>
              </h2>
            </BlurFade>
          </div>
          
          <BlurFade delay={0.15} inView>
            <Link
              href="/produk"
              className="hidden md:flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0f172a] bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 hover:border-slate-300 transition-all duration-300 group"
            >
              Lihat Semua Unit
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </BlurFade>
        </div>

        {/* Grid Produk */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <BlurFade key={product.id} delay={0.2 + idx * 0.15} inView>
              <Link href={`/produk/${product.slug}`} className="block h-full group">
                {/* Desain Card Modern */}
                <div className="h-full bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col relative shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 hover:border-[#2563eb]/30">
                  
                  {/* Gambar dengan Next.js Image & Efek Zoom Halus */}
                  <div className="relative overflow-hidden aspect-[4/3] bg-slate-100">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    
                    {/* Badge kategori - dipindah ke dalam gambar dengan gaya pill/rounded */}
                    {product.category && (
                      <span className="absolute top-4 left-4 text-[10px] font-bold bg-white/95 text-[#0f172a] px-3 py-1.5 rounded-full tracking-wider uppercase shadow-sm backdrop-blur-sm">
                        {product.category}
                      </span>
                    )}
                  </div>

                  {/* Konten Card */}
                  <div className="flex flex-col flex-1 justify-between p-6 md:p-8">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-[#0f172a] mb-3 group-hover:text-[#2563eb] transition-colors duration-300">
                        {product.title}
                      </h3>
                      {product.description && (
                         <p className="text-sm text-slate-600 font-medium leading-relaxed line-clamp-2">
                           {product.description}
                         </p>
                      )}
                    </div>

                    {/* CTA Interaktif dalam Card */}
                    <div className="flex items-center gap-2 text-sm font-bold text-[#2563eb] mt-6 group-hover:text-[#1d4ed8]">
                      <span>Detail Spesifikasi</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </div>
                  </div>

                </div>
              </Link>
            </BlurFade>
          ))}
        </div>

        {/* Mobile: Tombol lihat semua - Disesuaikan dengan gaya utama */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link
            href="/produk"
            className="flex items-center justify-center gap-2 px-6 py-4 text-sm font-semibold text-[#0f172a] bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-all duration-300 group w-full"
          >
            Lihat Semua Unit
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}