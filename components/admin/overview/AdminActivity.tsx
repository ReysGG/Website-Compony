import { getAdminRecentActivity } from "@/lib/queries/admin-cache";
import { Package, Users, Milestone } from "lucide-react";

export async function AdminActivity() {
  const { latestProducts, latestPartners, latestMilestones } =
    await getAdminRecentActivity();

  const activities = [
    ...latestProducts.map((p) => ({
      event: p.title,
      label: "Produk",
      time: p.created_at
        ? new Date(p.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })
        : "Baru saja",
      timestamp: p.created_at ? new Date(p.created_at).getTime() : Date.now(),
      iconColor: "text-blue-600",
      iconBg: "bg-blue-50 dark:bg-blue-900/20",
      Icon: Package,
    })),
    ...latestPartners.map((p) => ({
      event: p.name,
      label: "Mitra",
      time: "Aktif",
      timestamp: Date.now() - 1000 * 60 * 30,
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50 dark:bg-amber-900/20",
      Icon: Users,
    })),
    ...latestMilestones.map((m) => ({
      event: m.title,
      label: "Milestone",
      time: m.created_at
        ? new Date(m.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short" })
        : "Baru saja",
      timestamp: m.created_at ? new Date(m.created_at).getTime() : Date.now() - 86400000,
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-50 dark:bg-emerald-900/20",
      Icon: Milestone,
    })),
  ]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 7);

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Data Terbaru
        </span>
        <span className="text-[11px] text-slate-400">{activities.length} entri</span>
      </div>

      <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
        {activities.length === 0 ? (
          <p className="px-5 py-10 text-sm text-center text-slate-400 italic">
            Belum ada data terekam.
          </p>
        ) : (
          activities.map((item, i) => {
            const Icon = item.Icon;
            return (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${item.iconBg}`}>
                  <Icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate leading-none">
                    {item.event}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">{item.label}</p>
                </div>
                <span className="text-xs text-slate-400 shrink-0">{item.time}</span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export function AdminActivitySkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
        <div className="h-3 w-24 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
        <div className="h-3 w-12 bg-slate-100 dark:bg-slate-700 rounded animate-pulse" />
      </div>
      <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-3 px-5 py-3 animate-pulse">
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-700 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="h-3.5 w-3/4 bg-slate-200 dark:bg-slate-700 rounded mb-1.5" />
              <div className="h-3 w-1/4 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>
            <div className="h-3 w-10 bg-slate-100 dark:bg-slate-800 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
