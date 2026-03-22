"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Helper to convert textarea formats to array/json
const parseFeatures = (text: string) => {
  if (!text) return [];
  return text.split("\n").filter((line) => line.trim() !== "");
};

const parseSpecs = (text: string) => {
  if (!text) return {};
  const specs: Record<string, string> = {};
  text.split("\n").forEach((line) => {
    const [key, ...val] = line.split(":");
    if (key && val.length > 0) {
      specs[key.trim()] = val.join(":").trim();
    }
  });
  return specs;
};

// Also export backwards parser for the client form
export async function stringifySpecs(specs: any) {
  if (!specs || typeof specs !== 'object') return "";
  return Object.entries(specs)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

export async function createProduct(data: any) {
  try {
    const features = typeof data.features === 'string' ? parseFeatures(data.features) : data.features;
    const specifications = typeof data.specifications === 'string' ? parseSpecs(data.specifications) : data.specifications;

    // Generate a simple slug
    const baseSlug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const slug = `${baseSlug}-${Math.floor(Math.random() * 1000)}`;

    await prisma.products.create({
      data: {
        title: data.title,
        slug,
        description: data.description,
        image_url: data.image_url,
        category: data.category,
        order_index: parseInt(data.order_index) || 0,
        features: features,
        specifications: specifications,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath("/produk");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Create product error", error);
    return { success: false, error: error.message };
  }
}

export async function updateProduct(id: string, data: any) {
  try {
    const features = typeof data.features === 'string' ? parseFeatures(data.features) : data.features;
    const specifications = typeof data.specifications === 'string' ? parseSpecs(data.specifications) : data.specifications;

    await prisma.products.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        image_url: data.image_url,
        category: data.category,
        order_index: parseInt(data.order_index) || 0,
        features: features,
        specifications: specifications,
      },
    });

    revalidatePath("/admin/products");
    revalidatePath(`/produk/${data.slug}`);
    revalidatePath("/produk");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Update product error", error);
    return { success: false, error: error.message };
  }
}

export async function deleteProduct(id: string) {
  try {
    await prisma.products.delete({
      where: { id },
    });
    
    revalidatePath("/admin/products");
    revalidatePath("/produk");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
