"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateCompanyProfile(data: any) {
  try {
    // Upsert expects unique input, since there's no guaranteed unique field we'll use findFirst
    const existing = await prisma.company_profile.findFirst();

    if (existing) {
      await prisma.company_profile.update({
        where: { id: existing.id },
        data: {
          name: data.name,
          tagline: data.tagline,
          description: data.description,
          address: data.address,
          phone: data.phone,
          email: data.email,
          logo_url: data.logo_url,
          social_media: data.social_media,
          updated_at: new Date(),
        },
      });
    } else {
      await prisma.company_profile.create({
        data: {
          name: data.name,
          tagline: data.tagline,
          description: data.description,
          address: data.address,
          phone: data.phone,
          email: data.email,
          logo_url: data.logo_url,
          social_media: data.social_media,
        },
      });
    }

    revalidatePath("/admin/profile");
    revalidatePath("/"); // Revalidate homepage as well to reflect changes
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update profile", error);
    return { success: false, error: error.message };
  }
}
