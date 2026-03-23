"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateStats(statsList: any[]) {
  try {
    // Perform updates in a transaction sequentially
    await prisma.$transaction(
      statsList.map((stat) =>
        prisma.stats.update({
          where: { id: stat.id },
          data: {
            label_prefix: stat.label_prefix,
            label_main: stat.label_main,
            value: parseInt(stat.value) || 0,
            suffix: stat.suffix,
          },
        })
      )
    );

    revalidatePath("/admin/stats");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update stats", error);
    return { success: false, error: error.message };
  }
}
