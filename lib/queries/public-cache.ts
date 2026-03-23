/**
 * lib/queries/public-cache.ts
 *
 * Shared cached queries for public Server Components.
 * React's `cache()` ensures each query runs at most ONCE per render —
 * even if multiple components import and call the same function.
 *
 * Invalidated automatically via `revalidatePath()` inside server actions.
 */

import { cache } from "react";
import { prisma } from "@/lib/prisma";

export const getPublicProducts = cache(async () =>
  prisma.products.findMany({
    orderBy: { order_index: "asc" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      image_url: true,
      order_index: true,
      category: { select: { name: true } },
    },
  })
);

export const getPublicStats = cache(async () =>
  prisma.stats.findMany({
    orderBy: { order_index: "asc" },
  })
);

export const getPublicPartners = cache(async () =>
  prisma.partners.findMany({
    orderBy: { order_index: "asc" },
    select: { id: true, name: true, logo_url: true },
  })
);

export const getPublicTestimonials = cache(async () =>
  prisma.testimonials.findMany({
    where: { is_featured: true },
    orderBy: { created_at: "desc" },
    select: { id: true, name: true, role: true, content: true, rating: true, image_url: true },
  })
);

export const getPublicMilestones = cache(async () =>
  prisma.milestones.findMany({
    orderBy: { order_index: "asc" },
    select: { id: true, year: true, title: true, description: true, icon_name: true, is_current: true },
  })
);

export const getPublicVisionMission = cache(async () =>
  prisma.vision_mission.findMany({
    orderBy: { order_index: "asc" },
    select: { id: true, type: true, content: true, order_index: true },
  })
);

export const getPublicDirector = cache(async () =>
  prisma.director_message.findFirst({
    select: {
      director_name: true,
      role: true,
      image_url: true,
      quote_paragraphs: true,
      year: true,
    },
  })
);

export const getCompanyProfile = cache(async () =>
  prisma.company_profile.findFirst({
    select: { name: true, tagline: true, description: true, phone: true, email: true, address: true, social_media: true },
  })
);
