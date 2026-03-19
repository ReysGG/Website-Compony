import { BlurFade } from "@/components/ui/blur-fade";

export function Intro() {
  return (
    <section id="intro" className="py-24 bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurFade delay={0.2} inView>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-center mb-16 max-w-4xl mx-auto leading-tight">
            Pilihan Alat Berat yang Tepat Akan Menentukan Keberhasilan Pekerjaan Anda
          </h2>
        </BlurFade>

        <div className="grid lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-lg md:text-xl text-slate-700 font-medium leading-relaxed">
            <BlurFade delay={0.4} inView>
              <p className="text-left">
                Kehadiran alat berat sangat dibutuhkan untuk melaksanakan proyek infrastruktur, proses produksi di pabrik, bongkar muat dan lain sebagainya. Ya, ketika tenaga manusia mungkin tidak dapat menyelesaikan tugas berat, Anda sangat membutuhkan alat berat seperti Crawler Crane, Mobile/Truck Crane, Rough Terrain Crane, dll.
              </p>
            </BlurFade>
            
            <BlurFade delay={0.5} inView>
              <p className="text-left">
                Jenis Crane apapun yang Anda butuhkan, kami siap membantu Anda di setiap langkah. Kami membuatnya nyaman dan mudah untuk menemukan peralatan konstruksi yang tepat untuk Anda. Dan PT. Soka Utama Niaga hadir sebagai perusahaan pemasok alat berat yang lengkap dan terpercaya.
              </p>
            </BlurFade>
          </div>

          {/* Right Image Placeholder Area */}
          <div className="lg:col-span-5 hidden md:block">
            <BlurFade delay={0.6} inView>
              <div className="relative p-2 rounded-2xl border-slate-300 bg-slate-50 w-full aspect-[4/3] flex items-center justify-center group hover:border-blue-400 transition-colors cursor-pointer shadow-sm">
                
                {/* Image Placeholder - User will replace the src */}
                <img 
                  src="https://www.deere.com/assets/images/common/products/excavators/870g/870G-Large-Excavator-1366x768.jpg" 
                  alt="Company Image" 
                  className="w-full h-full object-cover rounded-xl shadow-inner transition-opacity"
                />
              </div>
            </BlurFade>
          </div>

        </div>
      </div>
    </section>
  );
}
