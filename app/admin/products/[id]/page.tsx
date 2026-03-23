import { prisma } from "@/lib/prisma";
import { ProductForm } from "../ProductForm";
import { notFound } from "next/navigation";



export default async function EditProductPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const [product, categories] = await Promise.all([
    prisma.products.findUnique({
      where: { id: params.id },
    }),
    prisma.categories.findMany({
      orderBy: { name: "asc" }
    })
  ]);

  if (!product) notFound();

  // Prisma returns specifications as JsonValue — cast it safely before passing
  const initialData = {
    ...product,
    specifications:
      product.specifications &&
      typeof product.specifications === "object" &&
      !Array.isArray(product.specifications)
        ? (product.specifications as Record<string, string>)
        : {},
  };

  return (
    // ✅ max-w-5xl biar grid 2 kolom form tidak kepepet
    // ✅ Hapus header — ProductForm sudah punya header sendiri
    <div className="max-w-screen mx-auto">
      <ProductForm initialData={initialData} categories={categories} />
    </div>
  );
}