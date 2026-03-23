/**
 * lib/queries/admin-cache.ts
 *
 * Shared cached queries for admin Server Components.
 * React's `cache()` ensures a query runs at most ONCE per render pass —
 * even when multiple components import and call the same function.
 *
 * Rules:
 * - Use ONLY for read-only queries (never mutations).
 * - Each function fetches the minimum fields needed (select).
 * - `force-dynamic` on page.tsx is NOT needed — cache is invalidated via
 *   `revalidatePath()` already called inside every server action.
 */

import { cache } from "react";
import { prisma } from "@/lib/prisma";

// ── Counts (used by AdminStats) ──────────────────────────────────────────────

export const getAdminCounts = cache(async () => {
  const [productsCount, milestonesCount, testimonialsCount, partnersCount] =
    await Promise.all([
      prisma.products.count(),
      prisma.milestones.count(),
      prisma.testimonials.count(),
      prisma.partners.count(),
    ]);
  return { productsCount, milestonesCount, testimonialsCount, partnersCount };
});

// ── Recent items (used by AdminActivity) ────────────────────────────────────

export const getAdminRecentActivity = cache(async () => {
  const [latestProducts, latestPartners, latestMilestones] = await Promise.all([
    prisma.products.findMany({
      take: 3,
      orderBy: { created_at: "desc" },
      select: { title: true, created_at: true },
    }),
    prisma.partners.findMany({
      take: 2,
      orderBy: { id: "desc" },
      select: { name: true },
    }),
    prisma.milestones.findMany({
      take: 2,
      orderBy: { created_at: "desc" },
      select: { title: true, created_at: true },
    }),
  ]);
  return { latestProducts, latestPartners, latestMilestones };
});

// ── Per-page data fetchers ───────────────────────────────────────────────────

export const getCategories = cache(async () =>
  prisma.categories.findMany({
    orderBy: { created_at: "asc" },
    select: { id: true, name: true, slug: true, description: true, created_at: true },
  })
);

export const getProducts = cache(async () =>
  prisma.products.findMany({
    orderBy: { order_index: "asc" },
    select: {
      id: true,
      title: true,
      slug: true,
      image_url: true,
      order_index: true,
      created_at: true,
      category: { select: { name: true } },
    },
  })
);

export const getPartners = cache(async () =>
  prisma.partners.findMany({
    orderBy: { order_index: "asc" },
    select: { id: true, name: true, logo_url: true, order_index: true },
  })
);

export const getTestimonials = cache(async () =>
  prisma.testimonials.findMany({
    orderBy: { created_at: "desc" },
    select: { id: true, name: true, role: true, content: true, rating: true, is_featured: true, created_at: true },
  })
);

export const getMilestones = cache(async () =>
  prisma.milestones.findMany({
    orderBy: { order_index: "asc" },
    select: { id: true, year: true, title: true, description: true, icon_name: true, is_current: true, order_index: true },
  })
);

export const getStats = cache(async () =>
  prisma.stats.findMany({
    orderBy: { order_index: "asc" },
  })
);

export const getVisionMission = cache(async () =>
  prisma.vision_mission.findMany({
    orderBy: { order_index: "asc" },
    select: { id: true, type: true, content: true, order_index: true },
  })
);

export const getDirectorMessage = cache(async () =>
  prisma.director_message.findFirst()
);

export const getCompanyProfile = cache(async () =>
  prisma.company_profile.findFirst()
);
