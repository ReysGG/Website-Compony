import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/lib/data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, Send } from "lucide-react";
import Link from "next/link";
import { Metadata } from 'next';

type Props = {
  params: { slug: string }
};

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Produk Tidak Ditemukan' };
  }
  return {
    title: `${product.title} | PT Soka Utama Niaga`,
    description: product.description,
  };
}

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const waMessage = `Halo Soka Utama Niaga, saya tertarik untuk menanyakan detail harga dan ketersediaan mesin *${product.title}*. Mohon diinfokan kelanjutannya, terima kasih.`;
  const waUrl = `https://wa.me/6281111111111?text=${encodeURIComponent(waMessage)}`; // Dummy corporate number

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans pt-24">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* Breadcrumb / Back Link */}
        <Link href="/produk" className="inline-flex items-center text-slate-500 hover:text-blue-600 font-medium mb-8 transition-colors group">
           <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
           Kembali ke Daftar Produk
        </Link>
        
        <div className="bg-white rounded-[2rem] shadow-sm border border-slate-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
            
            {/* Left: Product Image Gallery */}
            <div className="w-full lg:w-1/2 p-8 md:p-12">
               <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                 <img 
                   src={product.image} 
                   alt={product.title} 
                   className="w-full h-full object-cover"
                 />
                 <div className="absolute top-4 left-4">
                   <span className="px-3 py-1 bg-white/90 backdrop-blur text-blue-700 text-xs font-bold uppercase tracking-widest rounded shadow-sm">
                     Tersedia
                   </span>
                 </div>
               </div>
            </div>

            {/* Right: Product Details & CTA */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col">
               <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">
                 {product.title}
               </h1>
               
               <p className="text-lg text-slate-600 leading-relaxed mb-10">
                 {product.description}
               </p>

               {/* Specs Grid */}
               <div className="mb-10">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Spesifikasi Singkat</h3>
                 <div className="grid grid-cols-2 gap-4">
                   {Object.entries(product.specifications).map(([key, value]) => (
                     <div key={key} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="text-xs text-slate-500 font-medium mb-1">{key}</div>
                        <div className="text-slate-900 font-bold">{value}</div>
                     </div>
                   ))}
                 </div>
               </div>

               {/* Features List */}
               <div className="mb-12 flex-1">
                 <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Fitur Utama</h3>
                 <ul className="space-y-3">
                   {product.features.map((feature, idx) => (
                     <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                     </li>
                   ))}
                 </ul>
               </div>

               {/* Call To Action Sticky Bottom Area */}
               <div className="pt-8 border-t border-slate-100 mt-auto">
                 <Button 
                   size="lg" 
                   className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl h-16 text-lg font-bold shadow-lg shadow-[#25D366]/20 transition-all hover:-translate-y-1 hover:shadow-xl group"
                   asChild
                 >
                   <a href={waUrl} target="_blank" rel="noopener noreferrer">
                     <Send className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                     Beli via WhatsApp Sekarang
                   </a>
                 </Button>
                 <p className="text-center text-xs text-slate-400 mt-4 font-medium">
                   Tim Sales kami akan membalas pesan Anda maksimal dalam 1x24 jam kerja.
                 </p>
               </div>
            </div>

          </div>
        </div>
        
      </div>

      <Footer />
    </main>
  );
}
