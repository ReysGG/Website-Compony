"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPartner(data: any) {
  try {
    await prisma.partners.create({
      data: {
        name: data.name,
        logo_url: data.logo_url,
        order_index: parseInt(data.order_index) || 0,
      },
    });

    revalidatePath("/admin/partners");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Create partner error", error);
    return { success: false, error: error.message };
  }
}

export async function updatePartner(id: string, data: any) {
  try {
    await prisma.partners.update({
      where: { id },
      data: {
        name: data.name,
        logo_url: data.logo_url,
        order_index: parseInt(data.order_index) || 0,
      },
    });

    revalidatePath("/admin/partners");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Update partner error", error);
    return { success: false, error: error.message };
  }
}

export async function deletePartner(id: string) {
  try {
    await prisma.partners.delete({
      where: { id },
    });
    
    revalidatePath("/admin/partners");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
