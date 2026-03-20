"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "PT Soka Utama Niaga sangat profesional dalam pengiriman unit crane. Tepat waktu, kondisi sempurna, dan after-sales service yang responsif. Sudah 3 kali order dan tidak pernah mengecewakan.",
    author: "Bambang Setiawan",
    role: "Project Manager",
    company: "PT Waskita Konstruksi",
    initial: "BS",
  },
  {
    quote:
      "Kami percayakan kebutuhan alat berat proyek infrastruktur kami kepada Soka Utama. Kualitas unit dan dukungan teknis mereka benar-benar jadi nilai lebih yang kami butuhkan di lapangan.",
    author: "Hendra Kurniawan",
    role: "Kepala Divisi Pengadaan",
    company: "PT Adhi Karya",
    initial: "HK",
  },
  {
    quote:
      "Layanan konsultasi pemilihan unit sangat membantu. Tim Soka benar-benar paham kebutuhan industri tambang. Harga kompetitif dan garansi suku cadang memberikan ketenangan pikiran.",
    author: "Rudi Hartono",
    role: "Site Supervisor",
    company: "PT Freeport Indonesia",
    initial: "RH",
  },
];

export function Satisfaction() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Subtle background pattern */}
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

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <BlurFade key={idx} delay={0.2 + idx * 0.15} inView>
              <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm p-8 hover:shadow-xl hover:-translate-y-1.5 hover:border-[#2563eb]/30 transition-all duration-300 group">

                {/* Quote icon */}
                <Quote className="w-8 h-8 text-[#2563eb]/30 mb-6 group-hover:text-[#2563eb]/60 transition-colors duration-300" />

                {/* Quote text */}
                <p className="text-slate-700 leading-relaxed text-base font-medium flex-1 mb-8">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="w-11 h-11 rounded-full bg-[#0f172a] flex items-center justify-center shrink-0">
                    <span className="text-xs font-black text-white">{item.initial}</span>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0f172a]">{item.author}</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {item.role} · {item.company}
                    </div>
                  </div>
                </div>

              </div>
            </BlurFade>
          ))}
        </div>

        {/* Bottom trust strip */}
        <BlurFade delay={0.6} inView>
          <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-center">
            {[
              { value: "100%", label: "Pengiriman Tepat Waktu" },
              { value: "98%", label: "Kepuasan Konsumen" },
              { value: "100%", label: "Repeat Order" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-3xl font-black text-[#2563eb]">{stat.value}</span>
                <span className="text-sm text-slate-500 font-medium text-left leading-tight max-w-[100px]">
                  {stat.label}
                </span>
                {i < 2 && (
                  <div className="hidden sm:block w-px h-10 bg-slate-200 ml-3" />
                )}
              </div>
            ))}
          </div>
        </BlurFade>

      </div>
    </section>
  );
}