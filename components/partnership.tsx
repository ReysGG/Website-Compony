import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";

const partners = [
  { name: "KATO" },
  { name: "KOBELCO" },
  { name: "TADANO" },
  { name: "Sumitomo" },
];

export function Partnership() {
  return (
    <section className="pt-20 md:pt-24 pb-20 bg-background relative overflow-hidden border-b border-border">
      {/* Removed the dark gradient from Hero so it doesn't bleed and overlap on mobile */}

      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-[100vw] mx-auto relative z-10 px-0">
        <div className="text-center mb-10 md:mb-16 px-4">
          <BlurFade delay={0.1} inView>
            {/* Using text-[#0f172a] for high contrast and robust typography */}
            <h2 className="text-sm md:text-base font-black uppercase tracking-[0.3em] text-[#0f172a]">
              Pilihan Manufaktur Terkemuka
            </h2>
          </BlurFade>
        </div>

        <BlurFade delay={0.3} inView>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:30s] [--gap:5rem] sm:[--gap:8rem] py-4" repeat={5}>
              {partners.map((partner, idx) => (
                <div key={idx} className="flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300">
                  {partner.name === "KATO" && <span className="text-5xl md:text-6xl font-black tracking-tighter text-yellow-500">KATO</span>}
                  {partner.name === "KOBELCO" && <span className="text-5xl md:text-6xl font-black tracking-tight text-[#006C9B]">KOBELCO</span>}
                  {partner.name === "TADANO" && (
                    <div className="flex items-center">
                      <div className="flex -space-x-1 mr-2 mt-1">
                        <div className="w-8 h-8 bg-[#00A1DF] transform skew-x-[-20deg]"></div>
                        <div className="w-8 h-8 bg-[#0f172a] transform skew-x-[-20deg]"></div>
                      </div>
                      <span className="text-5xl md:text-6xl font-black tracking-tight text-[#0f172a]">TADANO</span>
                    </div>
                  )}
                  {partner.name === "Sumitomo" && (
                    <div className="flex items-center gap-3">
                      <svg className="w-10 h-10 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12,2 22,12 12,22 2,12" />
                      </svg>
                      <span className="text-5xl md:text-6xl font-black text-foreground">Sumitomo</span>
                    </div>
                  )}
                </div>
              ))}
            </Marquee>
            
            {/* Elegant Light Fade Gradients */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white to-transparent"></div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
