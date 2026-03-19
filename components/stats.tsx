"use client";

import { useEffect, useState, useRef } from "react";
import { BlurFade } from "@/components/ui/blur-fade";

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
    const duration = 2500; // 2.5 seconds

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

  return <span ref={ref}>{count}</span>;
}

export function Stats() {
  const stats = [
    { labelPrefix: "Produk", labelMain: "Terjual", value: 87 },
    { labelPrefix: "Total", labelMain: "Client", value: 36 },
    { labelPrefix: "Pengiriman", labelMain: "Sukses", value: 87 },
    { labelPrefix: "Kategori", labelMain: "Alat Berat", value: 3 },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-wrap justify-center items-center gap-16 lg:gap-24">
          {stats.map((stat, idx) => (
            <BlurFade key={idx} delay={0.2 + idx * 0.1} inView>
              <div className="relative group flex items-center justify-center">
                {/* Thin Outline Watermark Number */}
                <div className="absolute left-1/2 top-1/2 -translate-x-[60%] -translate-y-1/2 text-[130px] md:text-[160px] font-black text-transparent [-webkit-text-stroke:1px_#e2e8f0] select-none pointer-events-none z-0 transition-transform duration-700 group-hover:scale-105">
                  {stat.value}
                </div>
                
                <div className="relative z-10 flex items-center gap-4">
                  <h3 className="text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight">
                    <Counter target={stat.value} />
                  </h3>
                  <div className="flex flex-col text-left justify-center">
                    <span className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] leading-none mb-1.5">
                      {stat.labelPrefix}
                    </span>
                    <span className="text-xl md:text-2xl font-black text-[#0f172a] leading-none tracking-tight">
                      {stat.labelMain}
                    </span>
                  </div>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
