import { BlurFade } from "@/components/ui/blur-fade";
import { getPublicTestimonials } from "@/lib/queries/public-cache";
import { Quote } from "lucide-react";
import Image from "next/image";

/** Makin panjang konten, makin kecil font */
function getQuoteSize(content: string): string {
  const len = content.length;
  if (len < 80)  return "text-lg leading-relaxed";
  if (len < 160) return "text-base leading-relaxed";
  if (len < 260) return "text-sm leading-relaxed";
  return "text-xs leading-relaxed";
}

export async function Satisfaction() {
  const testimonials = await getPublicTestimonials();

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f172a' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-16">
            <span className="text-[#2563eb] font-bold tracking-widest uppercase text-sm mb-4 block">
              Klien Kami Bicara
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
              Kepercayaan yang <span className="text-[#2563eb]">Nyata</span>
            </h2>
            <p className="mt-4 text-slate-500 text-lg max-w-xl mx-auto">
              Mitra bisnis kami berbagi pengalaman bekerja dengan PT Soka Utama Niaga.
            </p>
          </div>
        </BlurFade>

        {/* Cards */}
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
          {testimonials.map((item, idx) => {
            const initial = item.name
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")
              .toUpperCase();

            return (
              <BlurFade key={item.id} delay={0.2 + idx * 0.1} inView>
                <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#2563eb]/30 transition-all duration-300 group">

                  <Quote className="w-8 h-8 text-[#2563eb]/30 mb-6 group-hover:text-[#2563eb]/60 transition-colors duration-300" />

                  <p className={`text-slate-700 font-medium flex-1 mb-8 wrap-break-word ${getQuoteSize(item.content)}`}>
                    &ldquo;{item.content}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                    {item.image_url ? (
                      <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border border-slate-200">
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#0f172a] flex items-center justify-center shrink-0">
                        <span className="text-xs font-black text-white">{initial}</span>
                      </div>
                    )}
                    <div>
                      <div className="text-sm font-bold text-[#0f172a]">{item.name}</div>
                      {item.role && (
                        <div className="text-xs text-slate-500 mt-0.5">{item.role}</div>
                      )}
                    </div>
                  </div>

                </div>
              </BlurFade>
            );
          })}
        </div>

      </div>
    </section>
  );
}