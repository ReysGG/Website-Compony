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

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-blue-600/30 font-sans">
      <Navbar />
      <Hero />
      <Partnership />
      <Intro />
      <Stats />
      <Products />
      <Satisfaction />
      <Director />
      <Footer />
    </main>
  );
}
