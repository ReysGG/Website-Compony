"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createMilestone(data: any) {
  try {
    await prisma.milestones.create({
      data: {
        year: data.year,
        title: data.title,
        description: data.description,
        icon_name: data.icon_name,
        is_current: data.is_current,
        order_index: parseInt(data.order_index) || 0,
      },
    });

    revalidatePath("/admin/milestones");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Create milestone error", error);
    return { success: false, error: error.message };
  }
}

export async function updateMilestone(id: string, data: any) {
  try {
    // If setting as current, maybe we should also unset others if only one is allowed,
    // but schema allows multiple so we'll just update this one.
    await prisma.milestones.update({
      where: { id },
      data: {
        year: data.year,
        title: data.title,
        description: data.description,
        icon_name: data.icon_name,
        is_current: data.is_current,
        order_index: parseInt(data.order_index) || 0,
      },
    });

    revalidatePath("/admin/milestones");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Update milestone error", error);
    return { success: false, error: error.message };
  }
}

export async function deleteMilestone(id: string) {
  try {
    await prisma.milestones.delete({
      where: { id },
    });
    
    revalidatePath("/admin/milestones");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
