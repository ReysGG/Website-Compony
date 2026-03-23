import { BlurFade } from "@/components/ui/blur-fade";
import { Building2, TrendingUp, Globe2, LucideIcon } from "lucide-react";
import { getPublicMilestones } from "@/lib/queries/public-cache";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  TrendingUp,
  Globe2,
};

export async function History() {
  const milestones = await getPublicMilestones();

  if (milestones.length === 0) return null;

  return (
    <section id="history" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <BlurFade delay={0.2} inView>
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-[#2563eb] font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
              Jejak Langkah
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tight">
              Sejarah Perusahaan
            </h2>
            <div className="w-20 h-1.5 bg-[#2563eb] mx-auto rounded-full" />
          </div>
        </BlurFade>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[2px] bg-linear-to-b from-blue-100 via-blue-400 to-blue-100 md:-translate-x-1/2 opacity-50" />

          <ol className="relative space-y-12 md:space-y-0">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = (item.icon_name && iconMap[item.icon_name]) || Building2;

              return (
                <li key={item.id} className="relative">
                  <BlurFade delay={0.3 + idx * 0.1} inView>
                    <div className={`flex items-start md:items-center ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}>

                      {/* Content card */}
                      <div className="w-full md:w-1/2 pl-12 md:pl-0">
                        <div className={`
                          relative p-6 md:p-8 rounded-3xl border transition-all duration-500
                          ${item.is_current
                            ? "bg-[#0f172a] border-blue-500/30 shadow-2xl shadow-blue-900/10"
                            : "bg-white border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50"}
                          ${isEven ? "md:ml-12" : "md:mr-12 text-left md:text-right"}
                        `}>
                          {/* Year badge */}
                          <div className={`
                            inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-sm font-bold
                            ${item.is_current
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                              : "bg-blue-50 text-blue-600"}
                          `}>
                            <Icon className="w-4 h-4" />
                            <span>{item.year}</span>
                          </div>

                          <h3 className={`text-xl md:text-2xl font-bold mb-3 tracking-tight ${item.is_current ? "text-white" : "text-[#0f172a]"}`}>
                            {item.title}
                          </h3>
                          {item.description && (
                            <p className={`text-base md:text-lg leading-relaxed ${item.is_current ? "text-slate-400" : "text-slate-600"}`}>
                              {item.description}
                            </p>
                          )}

                          {/* Arrow tip (desktop) */}
                          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 border-b border-r
                            ${isEven ? "-left-2 border-l border-t border-b-0 border-r-0" : "-right-2 border-r border-b border-l-0 border-t-0"}
                            ${item.is_current ? "bg-[#0f172a] border-blue-500/30" : "bg-white border-slate-200"}
                          `} />
                        </div>
                      </div>

                      {/* Marker */}
                      <div className="absolute left-0 md:left-1/2 top-4 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 z-20">
                        <div className={`relative w-9 h-9 rounded-full flex items-center justify-center border-4 border-slate-50 shadow-sm ${item.is_current ? "bg-blue-600" : "bg-white"}`}>
                          {item.is_current && (
                            <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/40" />
                          )}
                          <div className={`w-2.5 h-2.5 rounded-full ${item.is_current ? "bg-white" : "bg-blue-200"}`} />
                        </div>
                      </div>

                      {/* Spacer */}
                      <div className="hidden md:block md:w-1/2" />
                    </div>
                  </BlurFade>
                </li>
              );
            })}
          </ol>
        </div>

      </div>
    </section>
  );
}