import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Products } from "@/components/products";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Produk | PT Soka Utama Niaga",
  description: "Katalog Alat Berat PT Soka Utama Niaga",
};

export default function ProdukPage() {
  return (
    <main className="min-h-screen bg-card text-foreground font-sans pt-24">
      <Navbar />
      <div className="pb-12">
        <Products />
      </div>
      <Footer />
    </main>
  );
}
