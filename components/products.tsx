import { BlurFade } from "@/components/ui/blur-fade";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/data";

export function Products() {
  return (
    <section id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 border-l-8 border-blue-600 pl-6">
          <BlurFade delay={0.1} inView>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase">
              Produk Utama
            </h2>
          </BlurFade>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, idx) => (
            <BlurFade key={product.id} delay={0.2 + (idx * 0.1)} inView>
              <Link href={`/produk/${product.slug}`} className="block h-full">
                <Card className="overflow-hidden border-0 bg-slate-50 cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 rounded-xl shadow-md h-full flex flex-col">
                  <div className="relative overflow-hidden aspect-4/3">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <CardHeader className="bg-slate-50 border-t border-slate-100 flex-1 flex flex-col justify-center">
                    <CardTitle className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors flex justify-between items-center gap-4">
                      <span>{product.title}</span>
                      <ArrowRight className="w-6 h-6 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
                    </CardTitle>
                  </CardHeader>
                </Card>
              </Link>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
