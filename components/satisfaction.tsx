import { BlurFade } from "@/components/ui/blur-fade";

export function Satisfaction() {
  const items = [
    {
      percent: "100%",
      subtitle: "PENGIRIMAN",
      title: "Produk",
      desc: "semua pesanan produk terkirim dan diterima dengan baik oleh konsumen",
    },
    {
      percent: "98%",
      subtitle: "KEPUASAN",
      title: "Konsumen",
      desc: "tingkat kepuasan konsumen atas produk dan pelayanan kami",
    },
    {
      percent: "100%",
      subtitle: "REPEAT",
      title: "Order",
      desc: "konsumen selalu kembali lagi untuk setiap pesanan berikutnya",
    },
  ];

  return (
    <section className="py-24 bg-white text-slate-900 border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-16 md:gap-8 justify-items-center">
          {items.map((item, idx) => (
            <BlurFade key={idx} delay={0.2 + idx * 0.1} inView>
              <div className="flex flex-col items-center text-center max-w-xs group cursor-default">
                
                {/* Blue Circle */}
                <div className="w-40 h-40 rounded-full border-[3px] border-blue-600 flex items-center justify-center mb-8 relative group-hover:scale-105 transition-transform duration-500 shadow-[0_0_15px_rgba(37,99,235,0.1)]">
                  {/* Subtle inner glow */}
                  <div className="absolute inset-0 rounded-full bg-blue-600/5 scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  
                  <span className="text-5xl font-black text-slate-900 tracking-tighter">
                    {item.percent}
                  </span>
                </div>

                <h4 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-1">
                  {item.subtitle}
                </h4>
                <h3 className="text-3xl font-black text-[#0f172a] mb-4">
                  {item.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm font-medium">
                  {item.desc}
                </p>

              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
