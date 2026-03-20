import { BlurFade } from "@/components/ui/blur-fade";

export function VisiMisi() {
  const misiList = [
    "Menyediakan solusi alat berat secara tepat dan cepat demi kelancaran operasional klien.",
    "Senantiasa membangun citra perusahaan dan bertindak profesional dalam setiap interaksi.",
    "Menciptakan pelayanan dan lingkungan pekerjaan yang saling mendukung dan nyaman.",
    "Berpartisipasi aktif dalam menjaga kelestarian alam dan ramah terhadap lingkungan.",
    "Menunjang kesuksesan pembangunan Indonesia, khususnya dalam bidang konstruksi dan alat berat.",
    "Meningkatkan tata kelola dan kompetensi sumber daya manusia secara berkesinambungan.",
  ];

  return (
    <section className="py-20 bg-white" id="visi-misi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16">
            <span className="text-[#2563eb] font-bold tracking-widest uppercase text-sm mb-4 block">
              Nilai Perusahaan
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-4">
              Visi &amp; Misi Perusahaan
            </h2>
            <div className="w-16 h-1 bg-[#2563eb] mx-auto rounded-full" />
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* VISI */}
          <BlurFade delay={0.2} inView className="lg:col-span-2">
            <div className="h-full bg-white border border-slate-200 rounded-2xl p-8 md:p-10 flex flex-col justify-between gap-8 hover:border-[#2563eb]/50 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col gap-4">
                <span className="text-xs font-bold tracking-[0.2em] text-[#2563eb] uppercase">
                  Visi
                </span>
                <p className="text-[#0f172a] text-2xl md:text-3xl leading-snug font-bold">
                  &ldquo;Menjadi perusahaan penyedia alat berat yang paling{" "}
                  <span className="border-b-2 border-[#2563eb]">
                    diandalkan dan direkomendasikan
                  </span>{" "}
                  berkat kualitas pelayanan dan produk unggul.&rdquo;
                </p>
              </div>
              {/* Keyword tags */}
              <div className="flex flex-wrap gap-2">
                {["Alat Berat", "Kualitas Pelayanan", "Produk Unggul"].map((tag) => (
                  <span
                    key={tag}
                    className="text-sm font-semibold bg-[#0f172a] text-white px-4 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </BlurFade>

          {/* MOTTO */}
          <BlurFade delay={0.3} inView className="lg:col-span-1">
            <div className="h-full bg-[#0f172a] rounded-2xl p-8 md:p-10 flex flex-col justify-between text-white relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#2563eb] opacity-20 rounded-full blur-2xl group-hover:opacity-40 transition-all duration-500" />
              <div className="flex flex-col gap-3 relative z-10">
                <span className="text-xs font-bold tracking-[0.2em] text-[#2563eb] uppercase">
                  Motto
                </span>
                <p className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                  &ldquo;Tercepat,<br />Terpercaya,<br />Berkualitas&rdquo;
                </p>
              </div>
              <div className="border-t border-white/10 pt-5 mt-6 relative z-10">
                <span className="text-white/60 text-sm font-medium tracking-wide">
                  Standar Mutlak Perseroan
                </span>
              </div>
            </div>
          </BlurFade>

          {/* MISI */}
          <BlurFade delay={0.4} inView className="lg:col-span-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 md:p-10 hover:border-[#2563eb]/50 hover:shadow-lg transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-8 lg:gap-12">

                {/* Left */}
                <div className="w-full md:w-1/4 shrink-0 md:border-r md:border-slate-200 md:pr-10">
                  <span className="text-xs font-bold tracking-[0.2em] text-[#0f172a] uppercase block mb-3">
                    Misi
                  </span>
                  <p className="text-slate-500 font-medium text-base leading-relaxed">
                    Langkah strategis kami untuk mewujudkan visi perusahaan.
                  </p>
                </div>

                {/* Right */}
                <div className="w-full md:w-3/4">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
                    {misiList.map((misi, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="text-base font-black text-[#2563eb] shrink-0 leading-relaxed flex items-center justify-center h-6 w-6 rounded-full bg-[#2563eb]/10">
                          {String(i + 1)}
                        </span>
                        <span className="text-slate-700 text-base leading-relaxed">
                          {misi}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          </BlurFade>

        </div>
      </div>
    </section>
  );
}
