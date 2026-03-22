"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTestimonial(data: any) {
  try {
    await prisma.testimonials.create({
      data: {
        name: data.name,
        role: data.role,
        image_url: data.image_url,
        content: data.content,
        rating: parseInt(data.rating) || 5,
        is_featured: data.is_featured,
      },
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Create testimonial error", error);
    return { success: false, error: error.message };
  }
}

export async function updateTestimonial(id: string, data: any) {
  try {
    await prisma.testimonials.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
        image_url: data.image_url,
        content: data.content,
        rating: parseInt(data.rating) || 5,
        is_featured: data.is_featured,
      },
    });

    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Update testimonial error", error);
    return { success: false, error: error.message };
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonials.delete({
      where: { id },
    });
    
    revalidatePath("/admin/testimonials");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
