import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckCircle2, ChevronLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const product = await prisma.products.findUnique({
    where: { slug: params.slug },
  });
  if (!product) return { title: "Produk Tidak Ditemukan" };
  return {
    title: `${product.title} | PT Soka Utama Niaga`,
    description: product.description || "",
  };
}

export default async function ProductDetailPage(props: Props) {
  const params = await props.params;

  // Fetch product + company phone in parallel
  const [product, profile] = await Promise.all([
    prisma.products.findUnique({
      where: { slug: params.slug },
      include: { category: true },
    }),
    prisma.company_profile.findFirst({
      select: { phone: true, name: true },
    }),
  ]);

  if (!product) notFound();

  const specifications = (product.specifications as Record<string, string>) || {};
  const hasSpecs = Object.keys(specifications).length > 0;
  const hasFeatures = product.features?.length > 0;

  // Phone from DB, fallback to default
  const rawPhone = profile?.phone?.replace(/\D/g, "") || "6281111111111";
  const waPhone = rawPhone.startsWith("0") ? `62${rawPhone.slice(1)}` : rawPhone;
  const waMessage = `Halo, saya tertarik menanyakan detail dan ketersediaan unit *${product.title}*. Mohon informasinya, terima kasih.`;
  const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(waMessage)}`;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pt-20">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">

        {/* Breadcrumb */}
        <Link
          href="/produk"
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-700 text-sm font-medium mb-8 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Daftar Produk
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
          <div className="flex flex-col lg:flex-row">

            {/* Image */}
            <div className="w-full lg:w-[45%] bg-slate-50 p-6 md:p-10 flex items-center justify-center">
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-white border border-slate-100 shadow-inner">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 45vw"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-300 text-sm">
                    Tidak ada gambar
                  </div>
                )}

                {/* Category badge */}
                {product.category?.name && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full shadow">
                      {product.category.name}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Detail */}
            <div className="w-full lg:w-[55%] p-6 md:p-10 lg:p-12 flex flex-col">

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight tracking-tight mb-3">
                {product.title}
              </h1>

              {product.description && (
                <p className="text-slate-500 leading-relaxed mb-8 text-[15px]">
                  {product.description}
                </p>
              )}

              {/* Specifications */}
              {hasSpecs && (
                <div className="mb-8">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-3">
                    Spesifikasi teknis
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.entries(specifications).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wide truncate">
                            {key}
                          </p>
                          <p className="text-sm font-semibold text-slate-800 mt-0.5 leading-snug">
                            {value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Features */}
              {hasFeatures && (
                <div className="mb-8">
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-3">
                    Keunggulan unit
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                        </div>
                        <span className="text-sm text-slate-600 leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="mt-auto pt-6 border-t border-slate-100 space-y-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#075E54] hover:bg-[#064d44] text-white rounded-xl px-6 py-3.5 text-sm font-medium transition-all hover:-translate-y-0.5 active:scale-[0.98] shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  Tanyakan via WhatsApp
                </a>
                <p className="text-center text-xs text-slate-400">
                  Tersedia untuk inspeksi langsung di workshop Jakarta
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