import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";

export function Director() {
  return (
    <section id="director" className="relative py-32 overflow-hidden bg-[#0f172a]">

      {/* Ambient background texture */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Noise grain overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        {/* Radial glow top-right */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-white/5 blur-[120px]" />
        {/* Radial glow bottom-left */}
        <div className="absolute -bottom-32 -left-16 w-[400px] h-[400px] rounded-full bg-[#2563eb]/20 blur-[100px]" />
        {/* Subtle diagonal rule */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg,
              transparent,
              transparent 40px,
              rgba(255,255,255,0.5) 40px,
              rgba(255,255,255,0.5) 41px
            )`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-20">
          <BlurFade delay={0.05} inView>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-white" />
              <span className="text-[10px] font-black tracking-[0.35em] text-white uppercase">
                Pesan dari Pimpinan
              </span>
            </div>
            <h2
              className="text-5xl md:text-7xl font-black tracking-tight text-white uppercase leading-none"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              Sambutan
              <br />
              <span className="text-transparent" style={{ WebkitTextStroke: "2px rgba(255,255,255,0.2)" }}>
                Direktur
              </span>
            </h2>
          </BlurFade>
        </div>

        {/* ── Main grid ── */}
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* ── Left column ── */}
          <div className="md:col-span-5 lg:col-span-4">
            <BlurFade delay={0.2} inView>

              {/* Photo card */}
              <div className="relative group">
                {/* Decorative frame offset */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-white/40 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
                    alt="Adhi Santoso, Direktur Utama PT Soka Utama Niaga"
                    fill
                    sizes="(max-width: 768px) 80vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />

                  {/* Name plate — bottom */}
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-2xl font-black text-white leading-tight">
                          Adhi Santoso
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <div className="w-4 h-0.5 bg-white" />
                          <span className="text-white font-bold uppercase tracking-widest text-[10px]">
                            Direktur Utama
                          </span>
                        </div>
                      </div>
                      {/* Monogram badge */}
                      <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center shrink-0">
                        <span className="text-xs font-black text-white">AS</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute -top-2 -right-2 w-8 h-8 border-t-2 border-r-2 border-white/50 rounded-tr-lg" />
                <div className="absolute -bottom-2 -left-2 w-8 h-8 border-b-2 border-l-2 border-white/50 rounded-bl-lg" />
              </div>

              {/* Stats card */}
              <div className="mt-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm px-5 py-5 hover:border-white/40 transition-colors duration-300">
                <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.25em] block mb-4">
                  PT Soka Utama Niaga
                </span>
                <div className="flex items-center justify-between">
                  {[
                    { value: "1993", label: "Berdiri" },
                    { value: "30+", label: "Tahun" },
                    { value: "Nasional", label: "Jangkauan" },
                  ].map((stat, i, arr) => (
                    <div key={i} className="flex items-center gap-4">
                      <div>
                        <span className="text-xl font-black text-white leading-none block">
                          {stat.value}
                        </span>
                        <span className="text-[10px] text-white/40 mt-0.5 block">{stat.label}</span>
                      </div>
                      {i < arr.length - 1 && (
                        <div className="w-px h-8 bg-white/10" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </BlurFade>
          </div>

          {/* ── Right column ── */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between gap-6">
            <BlurFade delay={0.4} inView>

              {/* Quote block */}
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-8 md:p-12 hover:border-white/30 transition-colors duration-300 group">

                {/* Large decorative quote mark */}
                <div
                  className="absolute -top-6 -left-4 text-[120px] font-black text-white/10 leading-none select-none pointer-events-none"
                  aria-hidden
                >
                  "
                </div>

                <div className="relative space-y-6 text-base md:text-lg text-white/70 leading-[1.85] font-light">
                  <p>
                    Mitra yang kami hormati,{" "}
                    <span className="text-white font-semibold">PT Soka Utama Niaga</span>{" "}
                    mendapatkan kepercayaan untuk memberikan layanan di bidang peralatan konstruksi,
                    peralatan pengangkat, dan alat berat khususnya{" "}
                    <span className="text-white font-bold">Crane</span>.
                  </p>
                  <p>
                    Perusahaan kami hadir untuk memenuhi segala jenis Crane yang dibutuhkan guna
                    menunjang optimalisasi bisnis pekerjaan perusahaan Anda dengan produk berkualitas.
                    Sebagai mitra yang dapat diandalkan, kemampuan kami untuk membangun hubungan kerja
                    sama jangka panjang, serta ketahanan kualitas crane itu sendiri, melalui layanan
                    purna jual dan ketersediaan suku cadang.
                  </p>
                  <p>
                    Izinkan kami memberikan kontribusi dan peranan dalam mendukung kinerja dan
                    produktivitas perusahaan Bapak/Ibu. Kami berharap kedepannya dapat menjalin
                    kerjasama yang baik dan berkelanjutan.
                  </p>
                </div>

                {/* Signature bar */}
                <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-white/80 flex items-center justify-center shrink-0 shadow-lg shadow-white/20">
                      <span className="text-sm font-black text-[#0f172a]">AS</span>
                    </div>
                    <div>
                      <div className="text-base font-black text-white">Adhi Santoso</div>
                      <div className="text-xs text-white/40 mt-0.5">
                        Direktur Utama · PT Soka Utama Niaga
                      </div>
                    </div>
                  </div>

                  {/* Decorative year tag */}
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-3xl font-black text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>
                      2024
                    </span>
                  </div>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-white/0 to-transparent group-hover:via-white/60 transition-all duration-500 rounded-full" />
              </div>

              {/* Bottom highlight strip */}
              <div className="flex items-center gap-3 px-1">
                <div className="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
                <span className="text-[9px] font-black tracking-[0.3em] text-white/20 uppercase">
                  Est. 1993
                </span>
                <div className="h-px flex-1 bg-gradient-to-l from-white/40 to-transparent" />
              </div>

            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
