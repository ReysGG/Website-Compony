"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateDirectorMessage(data: any) {
  try {
    const existing = await prisma.director_message.findFirst();

    const quoteParagraphs = typeof data.quote_paragraphs === 'string' 
      ? data.quote_paragraphs.split('\n\n').filter((p: string) => p.trim() !== '') 
      : data.quote_paragraphs;

    if (existing) {
      await prisma.director_message.update({
        where: { id: existing.id },
        data: {
          director_name: data.director_name,
          role: data.role,
          image_url: data.image_url,
          quote_paragraphs: quoteParagraphs,
          year: parseInt(data.year) || new Date().getFullYear(),
        },
      });
    } else {
      await prisma.director_message.create({
        data: {
          director_name: data.director_name,
          role: data.role,
          image_url: data.image_url,
          quote_paragraphs: quoteParagraphs,
          year: parseInt(data.year) || new Date().getFullYear(),
        },
      });
    }

    revalidatePath("/admin/director");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update director message", error);
    return { success: false, error: error.message };
  }
}
