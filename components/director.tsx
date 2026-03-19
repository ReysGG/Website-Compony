import { BlurFade } from "@/components/ui/blur-fade";

export function Director() {
  return (
    <section id="director" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 border-l-8 border-red-600 pl-6">
          <BlurFade delay={0.1} inView>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
              Sambutan Direktur
            </h2>
          </BlurFade>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-center">
          
          <div className="md:col-span-5 lg:col-span-4">
            <BlurFade delay={0.3} inView>
              <div className="relative aspect-square md:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-white max-w-sm mx-auto md:mx-0">
                <img 
                  src="https://placehold.co/600x800/1e293b/FFFFFF?text=Adhi+Santoso" 
                  alt="Adhi Santoso, Direktur PT Soka Utama Niaga" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900 to-transparent p-6">
                  <div className="text-2xl font-black text-white">Adhi Santoso</div>
                  <div className="text-blue-400 font-bold uppercase tracking-wider text-sm mt-1">Direktur</div>
                </div>
              </div>
            </BlurFade>
          </div>

          <div className="md:col-span-7 lg:col-span-8">
            <BlurFade delay={0.5} inView>
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-100">
                <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium text-left">
                  "Mitra yang kami hormati, PT Soka Utama Niaga mendapatkan kepercayaan untuk memberikan layanan di bidang peralatan konstruksi, peralatan pengangkat, dan alat berat khususnya Crane. 
                  <br/><br/>
                  Perusahaan kami hadir untuk memenuhi segala jenis Crane yang dibutuhkan guna menunjang optimalisasi bisnis pekerjaan perusahaan Anda dengan produk berkualitas. Sebagai mitra yang dapat diandalkan, kemampuan kami untuk membangun hubungan kerja sama jangka panjang, serta ketahanan kualitas crane itu sendiri, melalui layanan purna jual dan ketersediaan suku cadang. 
                  <br/><br/>
                  Izinkan kami memberikan kontribusi dan peranan dalam mendukung kinerja dan produktivitas perusahaan Bapak/Ibu. Kami berharap kedepannya dapat menjalin kerjasama yang baik dan berkelanjutan."
                </p>
              </div>
            </BlurFade>
          </div>

        </div>
      </div>
    </section>
  );
}
