"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createVisionMission(data: any) {
  try {
    await prisma.vision_mission.create({
      data: {
        type: data.type,
        content: data.content,
        order_index: parseInt(data.order_index) || 0,
      },
    });

    revalidatePath("/admin/vision-mission");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Create vision/mission error", error);
    return { success: false, error: error.message };
  }
}

export async function updateVisionMission(id: string, data: any) {
  try {
    await prisma.vision_mission.update({
      where: { id },
      data: {
        type: data.type,
        content: data.content,
        order_index: parseInt(data.order_index) || 0,
      },
    });

    revalidatePath("/admin/vision-mission");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Update vision/mission error", error);
    return { success: false, error: error.message };
  }
}

export async function deleteVisionMission(id: string) {
  try {
    await prisma.vision_mission.delete({
      where: { id },
    });
    
    revalidatePath("/admin/vision-mission");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
