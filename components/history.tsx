import { BlurFade } from "@/components/ui/blur-fade"; // Pastikan Anda mengimpor komponen ini

export function History() {
  const milestones = [
    {
      year: "1993",
      title: "Pendirian CV. Soka Makmur",
      description:
        "Operasional perusahaan dimulai pada tahun 1993 sebagai CV. Soka Makmur, yang berfokus pada penyediaan dan distribusi suku cadang alat berat di kawasan komersial Pasar Mobil Kemayoran, Jakarta.",
      isCurrent: false,
    },
    {
      year: "2013",
      title: "Transformasi Menjadi Perseroan Terbatas",
      description:
        "Seiring dengan pertumbuhan volume bisnis dan tingginya tingkat kepercayaan klien skala industri, perusahaan secara resmi meningkatkan entitas hukumnya menjadi PT. Soka Utama Niaga.",
      isCurrent: false,
    },
    {
      year: "Saat Ini",
      title: "Mitra Strategis Pengadaan Nasional",
      description:
        "Hingga hari ini, PT. Soka Utama Niaga terus melayani rantai pasok nasional sebagai mitra andalan bagi berbagai perusahaan kontraktor, proyek infrastruktur, dan pertambangan di seluruh Indonesia.",
      isCurrent: true,
    },
  ];

  return (
    <section id="history" className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section dengan Animasi */}
        <BlurFade delay={0.2} inView>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-[#2563eb] font-bold tracking-widest uppercase text-sm mb-4 block">
              Perjalanan Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] mb-4">
              Sejarah Perusahaan
            </h2>
            <div className="w-16 h-1 bg-[#2563eb] mx-auto rounded-full" />
          </div>
        </BlurFade>

        <div className="max-w-3xl mx-auto">
          <div className="relative pl-16 md:pl-20">

            {/* Garis timeline utama */}
            <div className="absolute left-[22px] md:left-[26px] top-2 bottom-0 w-[2px] bg-slate-200" />

            {milestones.map((item, idx) => (
              // Menambahkan efek fade-in bertahap (delay bertambah sesuai index)
              <BlurFade key={idx} delay={0.3 + (idx * 0.15)} inView>
                <div className={`relative ${idx !== milestones.length - 1 ? "mb-12" : ""}`}>

                  {/* Dot marker */}
                  <div className={`
                    absolute -left-[42px] md:-left-[46px] top-1
                    w-7 h-7 rounded-full border-[3px] border-slate-50
                    flex items-center justify-center z-10 shadow-sm transition-transform duration-300 hover:scale-110
                    ${item.isCurrent ? "bg-[#2563eb] shadow-blue-500/30" : "bg-white"}
                  `}>
                    <div className={`w-2 h-2 rounded-full ${item.isCurrent ? "bg-white" : "bg-slate-300"}`} />
                  </div>

                  {/* Tahun & Badge */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`
                      text-2xl md:text-3xl font-black tracking-tight leading-none
                      ${item.isCurrent ? "text-[#2563eb]" : "text-[#0f172a]"}
                    `}>
                      {item.year}
                    </span>
                    {item.isCurrent && (
                      // Perbaikan warna badge agar lebih kontras dan modern
                      <span className="text-xs font-bold bg-blue-100 text-[#2563eb] border border-blue-200 px-3 py-1 rounded-full tracking-wide shadow-sm">
                        Aktif
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className={`
                    p-6 md:p-8 rounded-2xl border transition-all duration-300
                    ${item.isCurrent
                      ? "bg-[#0f172a] border-[#0f172a] shadow-xl transform hover:-translate-y-1"
                      : "bg-white border-slate-200 hover:border-[#2563eb]/50 hover:shadow-md"}
                  `}>
                    <h3 className={`
                      text-xl md:text-2xl font-bold mb-3
                      ${item.isCurrent ? "text-white" : "text-[#0f172a]"}
                    `}>
                      {item.title}
                    </h3>
                    <p className={`
                      text-base md:text-lg leading-relaxed
                      ${item.isCurrent ? "text-slate-300" : "text-slate-600"}
                    `}>
                      {item.description}
                    </p>
                  </div>

                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}