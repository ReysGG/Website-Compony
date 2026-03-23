import { prisma } from "@/lib/prisma";
import { ProductForm } from "../ProductForm";


export default async function NewProductPage() {
  const categories = await prisma.categories.findMany({
    orderBy: { name: "asc" }
  });

  return (
    <div className="max-w-screen mx-auto">
      <ProductForm categories={categories} />
    </div>
  );
}
