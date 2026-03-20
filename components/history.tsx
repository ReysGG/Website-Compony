import { BlurFade } from "@/components/ui/blur-fade";
import { Building2, TrendingUp, Globe2 } from "lucide-react";

export function History() {
  const milestones = [
    {
      year: "1993",
      title: "Pendirian CV. Soka Makmur",
      description:
        "Operasional perusahaan dimulai sebagai CV. Soka Makmur, berfokus pada distribusi suku cadang alat berat di Pasar Mobil Kemayoran, Jakarta.",
      icon: <Building2 className="w-4 h-4" />,
      isCurrent: false,
    },
    {
      year: "2013",
      title: "Transformasi Menjadi PT",
      description:
        "Meningkatkan entitas hukum menjadi PT. Soka Utama Niaga seiring dengan pertumbuhan volume bisnis dan kepercayaan klien industri.",
      icon: <TrendingUp className="w-4 h-4" />,
      isCurrent: false,
    },
    {
      year: "Saat Ini",
      title: "Mitra Strategis Nasional",
      description:
        "Terus melayani rantai pasok nasional sebagai mitra andalan bagi berbagai kontraktor, proyek infrastruktur, dan pertambangan di seluruh Indonesia.",
      icon: <Globe2 className="w-4 h-4" />,
      isCurrent: true,
    },
  ];

  return (
    <section id="history" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
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
          {/* Main Timeline Line - Centered on desktop, left-aligned on mobile */}
          <div className="absolute left-[18px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-100 via-blue-400 to-blue-100 md:-translate-x-1/2 opacity-50" />

          <ol className="relative space-y-12 md:space-y-0">
            {milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <li key={idx} className="relative">
                  <BlurFade delay={0.3 + idx * 0.1} inView>
                    <div className={`flex items-start md:items-center ${isEven ? "md:flex-row-reverse" : "md:flex-row"}`}>
                      {/* 1. Content Card Container */}
                      <div className="w-full md:w-1/2 pl-12 md:pl-0">
                        <div className={`
                          relative p-6 md:p-8 rounded-3xl border transition-all duration-500
                          ${item.isCurrent
                            ? "bg-[#0f172a] border-blue-500/30 shadow-2xl shadow-blue-900/10"
                            : "bg-white border-slate-200 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50"}
                          ${isEven ? "md:ml-12" : "md:mr-12 text-left md:text-right"}
                        `}>
                          {/* Year Badge */}
                          <div className={`
                            inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-sm font-bold
                            ${item.isCurrent 
                              ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20" 
                              : "bg-blue-50 text-blue-600"}
                          `}>
                            {item.icon}
                            <span>{item.year}</span>
                          </div>

                          <h3 className={`
                            text-xl md:text-2xl font-bold mb-3 tracking-tight
                            ${item.isCurrent ? "text-white" : "text-[#0f172a]"}
                          `}>
                            {item.title}
                          </h3>
                          <p className={`
                            text-base md:text-lg leading-relaxed
                            ${item.isCurrent ? "text-slate-400" : "text-slate-600"}
                          `}>
                            {item.description}
                          </p>
                          
                          {/* Arrow tip (Desktop only) */}
                          <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 rotate-45 border-b border-r
                            ${isEven ? "-left-2 border-l border-t border-b-0 border-r-0" : "-right-2 border-r border-b border-l-0 border-t-0"}
                            ${item.isCurrent ? "bg-[#0f172a] border-blue-500/30" : "bg-white border-slate-200"}
                          `} />
                        </div>
                      </div>

                      {/* 2. Timeline Marker (Centered on desktop, left-aligned on mobile) */}
                      <div className="absolute left-0 md:left-1/2 top-4 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 z-20">
                        <div className={`
                          relative w-9 h-9 rounded-full flex items-center justify-center border-[4px] border-slate-50 shadow-sm
                          ${item.isCurrent ? "bg-blue-600" : "bg-white"}
                        `}>
                          {item.isCurrent && (
                            <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/40" />
                          )}
                          <div className={`w-2.5 h-2.5 rounded-full ${item.isCurrent ? "bg-white" : "bg-blue-200"}`} />
                        </div>
                      </div>

                      {/* 3. Empty spacer for the other side (Desktop only) */}
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