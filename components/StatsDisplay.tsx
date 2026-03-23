"use client";

import { useEffect, useState, useRef } from "react";
import { BlurFade } from "@/components/ui/blur-fade";

interface StatItem {
  id: string;
  label_prefix: string | null;
  label_main: string;
  value: number;
  suffix: string | null;
}

function Counter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (target <= 0) return;
    const duration = 2000;
    const steps = 60;
    const stepValue = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += stepValue;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}</span>;
}

export function StatsDisplay({ stats }: { stats: StatItem[] }) {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.8'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-16">
          <BlurFade delay={0.1} inView>
            <span className="inline-block font-bold tracking-[0.2em] text-[#2563eb] mb-4 uppercase text-xs md:text-sm">
              Dalam Angka
            </span>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#0f172a]">
              Pencapaian <span className="text-[#2563eb]">Kami</span>
            </h2>
          </BlurFade>
        </div>

        {/* Stats grid */}
        <div className={`grid grid-cols-2 ${stats.length <= 2 ? "max-w-2xl mx-auto" : "lg:grid-cols-4"} gap-6 md:gap-8`}>
          {stats.map((stat, idx) => (
            <BlurFade key={stat.id} delay={0.3 + idx * 0.1} inView>
              <div className="relative flex flex-col gap-4 p-8 bg-white rounded-2xl border border-slate-100 hover:border-[#2563eb]/30 hover:shadow-xl transition-all duration-300 group overflow-hidden">

                {/* Watermark */}
                <div className="absolute top-4 right-4 text-[80px] font-black text-slate-100 leading-none select-none pointer-events-none group-hover:text-blue-50 transition-colors">
                  {stat.value}
                </div>

                <div className="relative z-10">
                  {stat.label_prefix && (
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                      {stat.label_prefix}
                    </p>
                  )}
                  <div className="text-5xl md:text-6xl font-extrabold text-[#0f172a] tabular-nums tracking-tight">
                    <Counter target={stat.value} />
                    {stat.suffix && <span className="text-[#2563eb]">{stat.suffix}</span>}
                  </div>
                  <p className="text-sm md:text-base font-semibold text-slate-500 mt-3 leading-snug">
                    {stat.label_main}
                  </p>
                </div>

                {/* Accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-linear-to-r from-transparent via-[#2563eb]/0 to-transparent group-hover:via-[#2563eb]/40 transition-all duration-500 rounded-full" />
              </div>
            </BlurFade>
          ))}
        </div>

      </div>
    </section>
  );
}
