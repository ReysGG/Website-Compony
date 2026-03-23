import { auth } from "@clerk/nextjs/server";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Intro } from "@/components/intro";
import { VisiMisi } from "@/components/visi-misi";
import { Products } from "@/components/products";
import { Director } from "@/components/director";
import { Footer } from "@/components/footer";
import { History } from "@/components/history";
import { Stats } from "@/components/stats";
import { Partnership } from "@/components/partnership";
import { Satisfaction } from "@/components/satisfaction";

// force-dynamic: halaman ini fetch dari DB, tidak bisa di-prerender saat build.
// Vercel build machine tidak bisa reach Supabase — render dilakukan saat runtime.
export const dynamic = "force-dynamic";

export default async function Home() {
  const { sessionClaims } = await auth();
  const isAdmin = (sessionClaims?.metadata as any)?.role === 'admin';

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent/20 font-sans">
      <Navbar />
      
      {/* Admin Indicator (Hanya terlihat oleh Admin) */}
      {isAdmin && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-500 text-[10px] font-bold uppercase tracking-widest text-center py-2 mt-16 lg:mt-20">
          Mode Admin Aktif: Anda memiliki akses penuh ke fitur manajemen.
        </div>
      )}

      <Hero />
      <Intro />
      <Partnership />
      <Products />
      <Stats />
      <History />
      <VisiMisi />
      <Satisfaction />
      <Director />
      <Footer />
    </main>
  );
}
