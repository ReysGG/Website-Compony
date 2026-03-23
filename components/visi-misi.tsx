import { BlurFade } from "@/components/ui/blur-fade";
import { Target, Rocket, ShieldCheck, Gem, CheckCircle2 } from "lucide-react";
import { getPublicVisionMission } from "@/lib/queries/public-cache";

export async function VisiMisi() {
  const items = await getPublicVisionMission();

  // Separate by type
  const visionItem = items.find((i) => i.type === "visi");
  const mottoItem = items.find((i) => i.type === "motto");
  const misiList = items.filter((i) => i.type === "misi").map((i) => i.content);

  if (!visionItem && misiList.length === 0) return null;

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="visi-misi">
      {/* Background orbs */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 mb-6 shadow-sm">
              <Gem className="w-4 h-4 text-blue-600" />
              <span className="text-blue-700 font-bold tracking-widest uppercase text-[10px] md:text-xs">
                Nilai &amp; Fondasi
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tight">
              Visi &amp; Misi Perusahaan
            </h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full" />
          </div>
        </BlurFade>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">

          {/* Visi card */}
          {visionItem && (
            <BlurFade delay={0.2} inView className="lg:col-span-8">
              <div className="h-full bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between gap-10 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 group">
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform duration-500">
                    <Target className="w-8 h-8" />
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-black tracking-[0.2em] text-blue-600 uppercase">
                      Visi Utama
                    </span>
                    <p className="text-[#0f172a] text-2xl md:text-4xl leading-tight font-black tracking-tight">
                      &ldquo;{visionItem.content}&rdquo;
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Profesional", "Inovatif", "Global Standar"].map((tag) => (
                    <span key={tag} className="text-xs font-bold bg-slate-100 text-slate-600 px-5 py-2 rounded-xl border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </BlurFade>
          )}

          {/* Motto card */}
          <BlurFade delay={0.3} inView className="lg:col-span-4">
            <div className="h-full bg-[#0f172a] rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden group shadow-2xl shadow-blue-950/20">
              <div className="absolute -right-4 -top-4 w-40 h-40 bg-blue-600 opacity-20 rounded-full blur-[80px] group-hover:opacity-40 transition-all duration-700" />
              <div className="absolute -left-10 bottom-0 w-32 h-32 bg-blue-400 opacity-10 rounded-full blur-[60px]" />

              <div className="space-y-8 relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-blue-400">
                  <Rocket className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold tracking-[0.2em] text-blue-400 uppercase">Motto Kami</span>
                  {mottoItem ? (
                    <p className="text-white text-3xl md:text-4xl font-black leading-tight tracking-tight">
                      {mottoItem.content}
                    </p>
                  ) : (
                    <p className="text-white text-4xl md:text-5xl font-black leading-none tracking-tighter">
                      Tercepat,<br />Terpercaya,<br /><span className="text-blue-400">Berkualitas</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 mt-10 relative z-10 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <span className="text-white/60 text-xs font-bold tracking-widest uppercase">Standar Mutlak</span>
              </div>
            </div>
          </BlurFade>
        </div>

        {/* Misi */}
        {misiList.length > 0 && (
          <BlurFade delay={0.4} inView>
            <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-16 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
                <div className="lg:col-span-4 space-y-6">
                  <div className="inline-block px-4 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest">
                    Misi Kami
                  </div>
                  <h3 className="text-3xl font-black text-[#0f172a] leading-tight">
                    Komitmen nyata dalam setiap langkah pelayanan
                  </h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Kami percaya bahwa kesuksesan jangka panjang hanya bisa dicapai melalui dedikasi tinggi dan perbaikan berkelanjutan.
                  </p>
                </div>

                <div className="lg:col-span-8">
                  <ul className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                    {misiList.map((misi, i) => (
                      <li key={i} className="group flex items-start gap-4 transition-all duration-300">
                        <div className="mt-1 shrink-0">
                          <CheckCircle2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <p className="text-slate-700 font-semibold leading-snug group-hover:text-[#0f172a] transition-colors">
                          {misi}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </BlurFade>
        )}

      </div>
    </section>
  );
}
