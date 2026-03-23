import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { getPublicDirector } from "@/lib/queries/public-cache";

export async function Director() {
  const data = await getPublicDirector();

  // If no director data in DB, don't render section
  if (!data) return null;

  const initial = data.director_name
    ? data.director_name.split(" ").map((w: string) => w[0]).slice(0, 2).join("").toUpperCase()
    : "??";

  const paragraphs: string[] = Array.isArray(data.quote_paragraphs)
    ? data.quote_paragraphs
    : [];

  return (
    <section id="director" className="relative py-32 overflow-hidden bg-[#0f172a]">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full bg-white/5 blur-[120px]" />
        <div className="absolute -bottom-32 -left-16 w-[400px] h-[400px] rounded-full bg-[#2563eb]/20 blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-20">
          <BlurFade delay={0.05} inView>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-8 bg-white" />
              <span className="text-[10px] font-black tracking-[0.35em] text-white uppercase">Pesan dari Pimpinan</span>
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

        {/* Grid */}
        <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left — photo */}
          <div className="md:col-span-5 lg:col-span-4">
            <BlurFade delay={0.2} inView>
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-linear-to-br from-white/40 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                <div className="relative aspect-3/4 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  {data.image_url ? (
                    <Image
                      src={data.image_url}
                      alt={data.director_name}
                      fill
                      sizes="(max-width: 768px) 80vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                      <span className="text-6xl font-black text-white/20">{initial}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-[#0f172a]/30 to-transparent" />

                  {/* Name plate */}
                  <div className="absolute bottom-0 inset-x-0 p-6">
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="text-2xl font-black text-white leading-tight">{data.director_name}</div>
                        {data.role && (
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="w-4 h-0.5 bg-white" />
                            <span className="text-white font-bold uppercase tracking-widest text-[10px]">{data.role}</span>
                          </div>
                        )}
                      </div>
                      <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center shrink-0">
                        <span className="text-xs font-black text-white">{initial}</span>
                      </div>
                    </div>
                  </div>

                  {/* Corner accents */}
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
                          <span className="text-xl font-black text-white leading-none block">{stat.value}</span>
                          <span className="text-[10px] text-white/40 mt-0.5 block">{stat.label}</span>
                        </div>
                        {i < arr.length - 1 && <div className="w-px h-8 bg-white/10" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Right — quote */}
          <div className="md:col-span-7 lg:col-span-8 flex flex-col justify-between gap-6">
            <BlurFade delay={0.4} inView>
              <div className="relative rounded-2xl border border-white/10 bg-white/4 backdrop-blur-sm p-8 md:p-12 hover:border-white/30 transition-colors duration-300 group">

                <div className="absolute -top-6 -left-4 text-[120px] font-black text-white/10 leading-none select-none pointer-events-none" aria-hidden>
                  &ldquo;
                </div>

                <div className="relative space-y-6 text-base md:text-lg text-white/70 leading-[1.85] font-light">
                  {paragraphs.length > 0 ? (
                    paragraphs.map((p, i) => <p key={i}>{p}</p>)
                  ) : (
                    <p className="italic text-white/40">Pesan direktur belum tersedia.</p>
                  )}
                </div>

                {/* Signature */}
                <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-white to-white/80 flex items-center justify-center shrink-0 shadow-lg shadow-white/20">
                      <span className="text-sm font-black text-[#0f172a]">{initial}</span>
                    </div>
                    <div>
                      <div className="text-base font-black text-white">{data.director_name}</div>
                      <div className="text-xs text-white/40 mt-0.5">
                        {data.role} · PT Soka Utama Niaga
                      </div>
                    </div>
                  </div>
                  {data.year && (
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-3xl font-black text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.1)" }}>
                        {data.year}
                      </span>
                    </div>
                  )}
                </div>

                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-linear-to-r from-transparent via-white/0 to-transparent group-hover:via-white/60 transition-all duration-500 rounded-full" />
              </div>

              <div className="flex items-center gap-3 px-1 mt-6">
                <div className="h-px flex-1 bg-linear-to-r from-white/40 to-transparent" />
                <span className="text-[9px] font-black tracking-[0.3em] text-white/20 uppercase">Est. 1993</span>
                <div className="h-px flex-1 bg-linear-to-l from-white/40 to-transparent" />
              </div>
            </BlurFade>
          </div>

        </div>
      </div>
    </section>
  );
}
