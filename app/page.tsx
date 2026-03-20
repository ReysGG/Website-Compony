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
    <main className="min-h-screen bg-background text-foreground selection:bg-accent/20 font-sans">
      <Navbar />
      <Hero />
      <Partnership />
      <Stats />
      <Intro />
      <History />
      <VisiMisi />
      <Products />
      <Satisfaction />
      <Director />
      <Footer />
    </main>
  );
}
