import { prisma } from "@/lib/prisma";
import { CategoryForm } from "../CategoryForm";
import { notFound } from "next/navigation";



export default async function EditCategoryPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  const category = await prisma.categories.findUnique({
    where: { id: params.id },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="max-w-screen mx-auto pt-4">
      <CategoryForm initialData={category} />
    </div>
  );
}
