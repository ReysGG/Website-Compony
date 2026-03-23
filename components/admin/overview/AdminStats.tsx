import { getAdminCounts } from "@/lib/queries/admin-cache";
import { Box, Users, Handshake, Target } from "lucide-react";
import NextLink from "next/link";

export async function AdminStats() {
  const { productsCount, testimonialsCount, partnersCount, milestonesCount } =
    await getAdminCounts();

  const statsCards = [
    {
      title: "Produk",
      count: productsCount,
      icon: Box,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50 dark:bg-blue-900/20",
      href: "/admin/products",
    },
    {
      title: "Testimoni",
      count: testimonialsCount,
      icon: Users,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
      href: "/admin/testimonials",
    },
    {
      title: "Mitra",
      count: partnersCount,
      icon: Handshake,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50 dark:bg-amber-900/20",
      href: "/admin/partners",
    },
    {
      title: "Milestones",
      count: milestonesCount,
      icon: Target,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50 dark:bg-rose-900/20",
      href: "/admin/milestones",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {statsCards.map((stat) => {
        const Icon = stat.icon;
        return (
          <NextLink
            key={stat.title}
            href={stat.href}
            className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-slate-200 dark:hover:border-slate-600 rounded-xl p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                <Icon className={`w-4 h-4 ${stat.iconColor}`} />
              </div>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">
                {stat.title}
              </span>
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-slate-900 dark:text-white tabular-nums tracking-tight">
                {stat.count}
              </h3>
              <p className="text-xs text-slate-400 mt-1">entri aktif</p>
            </div>
          </NextLink>
        );
      })}
    </div>
  );
}

export function AdminStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-5 flex flex-col gap-3 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700" />
            <div className="w-14 h-3 rounded bg-slate-100 dark:bg-slate-700" />
          </div>
          <div>
            <div className="h-8 w-12 bg-slate-200 dark:bg-slate-600 rounded mb-2" />
            <div className="h-3 w-20 bg-slate-100 dark:bg-slate-700 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
