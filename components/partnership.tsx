import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import Image from "next/image";
import { getPublicPartners } from "@/lib/queries/public-cache";

export async function Partnership() {
  const partners = await getPublicPartners();

  // Fallback if no partners in DB yet
  if (partners.length === 0) return null;

  return (
    <section className="pt-20 md:pt-24 pb-20 bg-background relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.03),transparent_70%)] pointer-events-none" />

      <div className="max-w-[100vw] mx-auto relative z-10 px-0">
        <div className="text-center mb-10 md:mb-16 px-4">
          <BlurFade delay={0.1} inView>
            <h2 className="text-sm md:text-base font-black uppercase tracking-[0.3em] text-[#0f172a]">
              Pilihan Manufaktur Terkemuka
            </h2>
          </BlurFade>
        </div>

        <BlurFade delay={0.3} inView>
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:40s] [--gap:5rem] sm:[--gap:8rem] py-4" repeat={4}>
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
                >
                  {partner.logo_url ? (
                    <div className="relative h-12 w-32">
                      <Image
                        src={partner.logo_url}
                        alt={partner.name}
                        fill
                        sizes="128px"
                        className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  ) : (
                    <span className="text-4xl md:text-5xl font-black tracking-tight text-slate-700">
                      {partner.name}
                    </span>
                  )}
                </div>
              ))}
            </Marquee>

            {/* Fade gradients */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-white to-transparent" />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
