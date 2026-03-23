"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { categories as CategoryType } from "@prisma/client";

export async function getCategories() {
  try {
    return await prisma.categories.findMany({
      orderBy: { name: "asc" },
    });
  } catch (error) {
    console.error("Fetch categories error", error);
    return [];
  }
}

export async function createCategory(data: { name: string, description?: string }) {
  try {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    await prisma.categories.create({
      data: {
        name: data.name,
        slug,
        description: data.description,
      },
    });

    revalidatePath("/admin/categories");
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCategory(id: string, data: { name: string, description?: string }) {
  try {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    
    await prisma.categories.update({
      where: { id },
      data: {
        name: data.name,
        slug,
        description: data.description,
      },
    });

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteCategory(id: string) {
  try {
    // Check if category is used by products
    const productsCount = await prisma.products.count({
      where: { category_id: id }
    });

    if (productsCount > 0) {
      throw new Error(`Kategori tidak bisa dihapus karena masih digunakan oleh ${productsCount} produk.`);
    }

    await prisma.categories.delete({
      where: { id },
    });
    
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
