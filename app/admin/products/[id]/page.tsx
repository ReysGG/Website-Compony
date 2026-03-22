import { prisma } from "@/lib/prisma";
import { ProductForm } from "../ProductForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.products.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Detail Produk</h1>
        <p className="text-slate-500 mt-2">
          Perbarui informasi, spesifikasi, dan foto kendaraan alat berat ini.
        </p>
      </div>

      <ProductForm initialData={product} />
    </div>
  );
}
