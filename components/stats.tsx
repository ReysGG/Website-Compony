"use client";

import { useEffect, useState, useRef } from "react";
import { BlurFade } from "@/components/ui/blur-fade";

// Logika Counter tetap dipertahankan
function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let startTime: number | null = null;
    const duration = 2500;

    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const easeOut = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(target * easeOut));

      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [target, inView]);

  return (
    <span
      ref={ref}
      style={{ fontVariantNumeric: "tabular-nums" }}
    >
      {count}
    </span>
  );
}

export function Stats() {
  const stats = [
    { labelPrefix: "Produk", labelMain: "Terjual", value: 87, suffix: "+" },
    { labelPrefix: "Total", labelMain: "Client", value: 36, suffix: "+" },
    { labelPrefix: "Pengiriman", labelMain: "Sukses", value: 100, suffix: "%" },
    { labelPrefix: "Kategori", labelMain: "Alat Berat", value: 3, suffix: "" },
  ];

  return (
    // bg-slate-50 untuk alternating rhythm (Partnership di atasnya adalah bg-white)
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <BlurFade delay={0.1} inView>
          <div className="text-center mb-12">
            <span className="text-[#2563eb] font-bold tracking-widest uppercase text-sm mb-4 block">
              Pencapaian Kami
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-[#0f172a]">
              Angka yang Bicara
            </h2>
          </div>
        </BlurFade>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <BlurFade key={idx} delay={0.2 + idx * 0.15} inView>
              {/* Card Style Modern Clean */}
              <div className="relative group flex flex-col items-center justify-center px-6 py-10 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden h-full cursor-default hover:border-[#2563eb]/20">

                {/* Watermark Angka Besar (Dibuat elegan & pudar) */}
                <div
                  aria-hidden="true"
                  className="absolute -right-2 -bottom-4 text-8xl md:text-9xl font-extrabold text-slate-50 select-none pointer-events-none z-0 transition-transform duration-700 group-hover:scale-110"
                >
                  {stat.value}
                </div>

                {/* Konten Utama */}
                <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                  <p className="text-xs font-bold text-[#2563eb] uppercase tracking-widest leading-none mb-1">
                    {stat.labelPrefix}
                  </p>

                  <h3 className="text-5xl md:text-6xl font-extrabold text-[#0f172a] tracking-tight leading-none">
                    <Counter target={stat.value} />
                    <span className="text-[#2563eb]">{stat.suffix}</span>
                  </h3>

                  <p className="text-lg md:text-xl font-bold text-slate-700 leading-none tracking-tight mt-1">
                    {stat.labelMain}
                  </p>

                  {/* Garis Aksen Interaktif */}
                  <span className="mt-4 block w-8 h-1.5 bg-[#2563eb] rounded-full group-hover:w-16 transition-all duration-300 ease-out" />
                </div>

              </div>
            </BlurFade>
          ))}
        </div>

      </div>
    </section>
  );
}