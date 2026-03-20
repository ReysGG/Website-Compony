import Image from "next/image";
import Link from "next/link"; // Tambahkan Link untuk tombol CTA
import { BlurFade } from "@/components/ui/blur-fade";
import { ArrowRight } from "lucide-react"; // Opsional: icon untuk tombol

export function Intro() {
  return (
    <section id="intro" className="py-24 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section dengan Eyebrow Text */}
        <BlurFade delay={0.2} inView>
          <div className="text-center mb-16 max-w-4xl mx-auto">
            <span className="text-[#2563eb] font-bold tracking-widest uppercase text-sm mb-4 block">
              Tentang Kami
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-[#0f172a]">
              Pilihan Alat Berat yang Tepat Akan Menentukan Keberhasilan Pekerjaan Anda
            </h2>
          </div>
        </BlurFade>

        <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Kolom Teks */}
          <div className="lg:col-span-7 space-y-6 text-lg md:text-xl text-slate-700 font-medium leading-relaxed">
            <BlurFade delay={0.4} inView>
              <p>
                Kehadiran alat berat sangat dibutuhkan untuk melaksanakan proyek infrastruktur, proses produksi di pabrik, bongkar muat dan lain sebagainya. Ya, ketika tenaga manusia mungkin tidak dapat menyelesaikan tugas berat, Anda sangat membutuhkan alat berat seperti Crawler Crane, Mobile/Truck Crane, Rough Terrain Crane, dll.
              </p>
            </BlurFade>
            
            <BlurFade delay={0.5} inView>
              <p>
                Jenis Crane apapun yang Anda butuhkan, kami siap membantu Anda di setiap langkah. Kami membuatnya nyaman dan mudah untuk menemukan peralatan konstruksi yang tepat untuk Anda. Dan <span className="text-[#0f172a] font-bold">PT. Soka Utama Niaga</span> hadir sebagai perusahaan pemasok alat berat yang lengkap dan terpercaya.
              </p>
            </BlurFade>

            {/* Tambahan Call to Action (CTA) */}
            <BlurFade delay={0.6} inView>
              <div className="pt-4">
                <Link 
                  href="/produk" 
                  className="inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-white transition-all duration-300 bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] hover:shadow-lg hover:shadow-blue-500/30 group"
                >
                  Lihat Katalog Produk
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </BlurFade>
          </div>

          {/* Kolom Gambar dengan perbaikan struktur layout */}
          <div className="lg:col-span-5">
            <BlurFade delay={0.6} inView>
              <div className="p-2 rounded-2xl border-2 border-slate-100 bg-white group hover:border-[#2563eb]/50 transition-colors shadow-sm">
                {/* Inner wrapper khusus untuk image agar 'fill' dan padding tidak bentrok */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
                  <Image 
                    src="https://www.deere.com/assets/images/common/products/excavators/870g/870G-Large-Excavator-1366x768.jpg" 
                    alt="Alat Berat PT Soka Utama Niaga" 
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </BlurFade>
          </div>

        </div>
      </div>
    </section>
  );
}