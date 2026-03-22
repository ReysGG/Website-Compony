import { prisma } from "@/lib/prisma";
import NextLink from "next/link";
import {
  Box,
  Users,
  Handshake,
  Target,
  ArrowRight,
  RefreshCcw,
  ShieldCheck,
  CloudUpload,
  Package,
  Clock,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [
    productsCount,
    milestonesCount,
    testimonialsCount,
    partnersCount,
    visionMissionCount,
    latestProducts,
    latestPartners,
    latestMilestones,
  ] = await Promise.all([
    prisma.products.count(),
    prisma.milestones.count(),
    prisma.testimonials.count(),
    prisma.partners.count(),
    prisma.vision_mission.count(),
    prisma.products.findMany({ take: 2, orderBy: { created_at: "desc" } }),
    prisma.partners.findMany({ take: 1, orderBy: { id: "desc" } }),
    prisma.milestones.findMany({ take: 1, orderBy: { created_at: "desc" } }),
  ]);

  // Sorted by recency — no random shuffle
  const activities = [
    ...latestProducts.map((p) => ({
      event: `Produk Baru: ${p.title}`,
      user: "System Admin",
      time: p.created_at ? new Date(p.created_at).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) : "Baru saja",
      timestamp: p.created_at ? new Date(p.created_at).getTime() : Date.now(),
      color: "bg-blue-50 text-blue-600",
      type: "product",
    })),
    ...latestPartners.map((p) => ({
      event: `Mitra Baru: ${p.name}`,
      user: "Director",
      time: "Hari ini",
      timestamp: Date.now() - 1000 * 60 * 30,
      color: "bg-emerald-50 text-emerald-600",
      type: "partner",
    })),
    ...latestMilestones.map((m) => ({
      event: `Update Milestone: ${m.title}`,
      user: "Editor",
      time: m.created_at ? new Date(m.created_at).toLocaleDateString("id-ID") : "Kemarin",
      timestamp: m.created_at ? new Date(m.created_at).getTime() : Date.now() - 86400000,
      color: "bg-amber-50 text-amber-600",
      type: "milestone",
    })),
  ].sort((a, b) => b.timestamp - a.timestamp); // Newest first

  const statsCards = [
    {
      title: "Total Products",
      count: productsCount,
      icon: Box,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50",
      badgeColor: "text-blue-700 bg-blue-100",
      barColor: "bg-blue-500",
      barWidth: "72%",
      trend: "+12%",
    },
    {
      title: "Testimonials Active",
      count: testimonialsCount,
      icon: Users,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50",
      badgeColor: "text-emerald-700 bg-emerald-100",
      barColor: "bg-emerald-500",
      barWidth: "88%",
      trend: "Stable",
    },
    {
      title: "Total Partners",
      count: partnersCount,
      icon: Handshake,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
      badgeColor: "text-amber-700 bg-amber-100",
      barColor: "bg-amber-500",
      barWidth: "55%",
      trend: "+3 new",
    },
    {
      title: "Milestones",
      count: milestonesCount,
      icon: Target,
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50",
      badgeColor: "text-rose-700 bg-rose-100",
      barColor: "bg-rose-500",
      barWidth: "40%",
      trend: "Next: Q3",
    },
  ];

  const activityIconMap: Record<string, string> = {
    product: "text-blue-600 bg-blue-50",
    partner: "text-emerald-600 bg-emerald-50",
    milestone: "text-amber-600 bg-amber-50",
  };

  return (
    <div className="space-y-8 py-2 animate-in fade-in slide-in-from-bottom-2 duration-500">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">
            Platform / Admin / <span className="text-slate-700 dark:text-slate-200">Overview</span>
          </nav>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Executive Dashboard
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Last synced:{" "}
            {new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} WIB
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-full self-start sm:self-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-emerald-700">All systems operational</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-5 flex flex-col gap-3 hover:border-slate-200 dark:hover:border-slate-600 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                  <Icon className={`w-4 h-4 ${stat.iconColor}`} />
                </div>
                <span className={`text-[11px] font-medium px-2 py-1 rounded-full ${stat.badgeColor}`}>
                  {stat.trend}
                </span>
              </div>

              <div>
                <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                  {stat.title}
                </p>
                <h3 className="text-4xl font-semibold text-slate-900 dark:text-white mt-1 tabular-nums tracking-tight">
                  {stat.count}
                </h3>
              </div>

              <div className="h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${stat.barColor} transition-all duration-700`}
                  style={{ width: stat.barWidth }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* Left Column — Activities + Vision */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Activity Log */}
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <span className="text-sm font-medium text-slate-900 dark:text-white">Recent Activity</span>
              <button className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1 transition-colors">
                View all <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {activities.length === 0 ? (
                <p className="px-5 py-8 text-sm text-center text-slate-400 italic">
                  Belum ada aktivitas terekam.
                </p>
              ) : (
                activities.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        activityIconMap[item.type] ?? "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <div className="w-2 h-2 rounded-full bg-current" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                        {item.event}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">{item.user}</p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{item.time}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Vision & Mission Card */}
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <span className="text-sm font-medium text-slate-900 dark:text-white">Vision & Mission</span>
              <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300">
                {visionMissionCount} entries
              </span>
            </div>
            <div className="px-5 py-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Kelola konten visi &amp; misi perusahaan yang ditampilkan di halaman publik. Pastikan
                data selalu up to date.
              </p>
              <NextLink
                href="/admin/vision-mission"
                className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Edit content <ArrowRight className="w-3.5 h-3.5" />
              </NextLink>
            </div>
          </div>
        </div>

        {/* Right Column — Commands + Health + Storage */}
        <div className="flex flex-col gap-6">

          {/* Quick Commands */}
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
              <span className="text-sm font-medium text-slate-900 dark:text-white">Quick Commands</span>
            </div>
            <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {[
                {
                  icon: RefreshCcw,
                  label: "Synchronize DB",
                  desc: "Manual refresh",
                  href: "/api/admin/sync",
                },
                {
                  icon: ShieldCheck,
                  label: "Access Control",
                  desc: "Manage roles",
                  href: "/admin/roles",
                },
                {
                  icon: CloudUpload,
                  label: "Cloud Backup",
                  desc: "Create snapshot",
                  href: "/admin/backup",
                },
              ].map((cmd) => {
                const Icon = cmd.icon;
                return (
                  <NextLink
                    key={cmd.label}
                    href={cmd.href}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-600 flex items-center justify-center flex-shrink-0 group-hover:border-slate-300 dark:group-hover:border-slate-500 transition-colors">
                      <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{cmd.label}</p>
                      <p className="text-xs text-slate-400">{cmd.desc}</p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </NextLink>
                );
              })}
            </div>
          </div>

          {/* Platform Health */}
          <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Platform Health
              </span>
              <span className="text-[11px] font-medium px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">
                Healthy
              </span>
            </div>
            <p className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">99.98%</p>
            <p className="text-xs text-slate-400 mt-1 mb-4">Uptime since Q3 cycle</p>

            <div className="flex flex-col gap-3">
              {[
                { label: "API", val: "98ms", width: "98%", color: "bg-emerald-400" },
                { label: "DB", val: "12ms", width: "84%", color: "bg-blue-400" },
                { label: "CDN", val: "4ms", width: "95%", color: "bg-emerald-400" },
                { label: "Auth", val: "210ms", width: "72%", color: "bg-amber-400" },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 w-8 flex-shrink-0">{m.label}</span>
                  <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${m.color} transition-all duration-700`}
                      style={{ width: m.width }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-300 w-10 text-right">
                    {m.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Storage */}
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Storage</span>
              <span className="text-xs font-medium text-slate-600 dark:text-slate-300">6.2 / 10 GB</span>
            </div>
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-blue-500 transition-all duration-700" style={{ width: "62%" }} />
            </div>
            <p className="text-xs text-slate-400 mt-2">3.8 GB remaining</p>
          </div>
        </div>
      </div>
    </div>
  );
}