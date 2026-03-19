import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";

export function About() {
  return (
    <section id="about" className="py-24 bg-card text-card-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <BlurFade delay={0.2} inView>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
              <AuroraText>Tentang Kami</AuroraText>
            </h2>
          </BlurFade>
          <BlurFade delay={0.4} inView>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          </BlurFade>
        </div>

        <div className="max-w-4xl mx-auto">
          <BlurFade delay={0.6} inView>
            <div className="prose prose-lg md:prose-xl dark:prose-invert text-center mx-auto text-muted-foreground">
              <p className="leading-relaxed">
                <strong className="text-foreground">Didirikan pada 2018 silam</strong>, PT Soka Utama Niaga mendapatkan
                kepercayaan untuk memberikan layanan di bidang peralatan
                konstruksi, peralatan pengangkat, dan alat berat khususnya{" "}
                <span className="text-primary font-semibold">Crane</span>.
                Perusahaan kami didirikan untuk memenuhi kebutuhan Alat Berat guna
                mendukung optimalisasi bisnis dan pekerjaan Anda.
              </p>
              <p className="mt-6 leading-relaxed">
                Kami menyediakan berbagai jenis, fungsi, dan ukuran Crane dengan
                kualitas terbaik. Sebagai mitra yang dapat diandalkan, kami
                membangun hubungan kerja sama jangka panjang, mengutamakan
                ketahanan kualitas crane, layanan purna jual, dan ketersediaan
                suku cadang.
              </p>
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
