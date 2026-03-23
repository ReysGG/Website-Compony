import NextLink from "next/link";
import { Suspense } from "react";
import {
  Layers,
  Users,
  Handshake,
  Target,
  LayoutDashboard,
  BookOpen,
  UserCircle2,
  Star,
  Image,
  TrendingUp,
  Eye,
  ChevronRight,
} from "lucide-react";

import { AdminStats, AdminStatsSkeleton } from "@/components/admin/overview/AdminStats";
import { AdminActivity, AdminActivitySkeleton } from "@/components/admin/overview/AdminActivity";


const adminPages = [
  { label: "Produk", desc: "Kelola katalog produk", href: "/admin/products", icon: Layers, color: "text-blue-600 bg-blue-50 dark:bg-blue-900/20" },
  { label: "Kategori", desc: "Kategori produk", href: "/admin/categories", icon: BookOpen, color: "text-violet-600 bg-violet-50 dark:bg-violet-900/20" },
  { label: "Mitra", desc: "Partner & distributor", href: "/admin/partners", icon: Handshake, color: "text-amber-600 bg-amber-50 dark:bg-amber-900/20" },
  { label: "Testimoni", desc: "Ulasan pelanggan", href: "/admin/testimonials", icon: Star, color: "text-rose-600 bg-rose-50 dark:bg-rose-900/20" },
  { label: "Direktur", desc: "Pesan direktur", href: "/admin/director", icon: UserCircle2, color: "text-teal-600 bg-teal-50 dark:bg-teal-900/20" },
  { label: "Visi & Misi", desc: "Nilai perusahaan", href: "/admin/vision-mission", icon: Eye, color: "text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20" },
  { label: "Pencapaian", desc: "Statistik angka", href: "/admin/stats", icon: TrendingUp, color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" },
  { label: "Milestones", desc: "Sejarah & tonggak", href: "/admin/milestones", icon: Target, color: "text-orange-600 bg-orange-50 dark:bg-orange-900/20" },
  { label: "Profil", desc: "Info perusahaan", href: "/admin/profile", icon: Image, color: "text-slate-600 bg-slate-50 dark:bg-slate-700" },
];

export default function AdminDashboardPage() {
  const now = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  const date = new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="space-y-8 py-2 animate-in fade-in slide-in-from-bottom-2 duration-500">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <nav className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
            Admin / <span className="text-slate-600 dark:text-slate-300">Overview</span>
          </nav>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-sm text-slate-400 mt-1">{date} · {now} WIB</p>
        </div>

        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800 px-3 py-1.5 rounded-full self-start sm:self-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Live</span>
        </div>
      </div>

      {/* ── Stats ── */}
      <Suspense fallback={<AdminStatsSkeleton />}>
        <AdminStats />
      </Suspense>

      {/* ── Main Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* Left: Activity */}
        <div className="lg:col-span-2">
          <Suspense fallback={<AdminActivitySkeleton />}>
            <AdminActivity />
          </Suspense>
        </div>

        {/* Right: Quick Access to pages */}
        <div className="flex flex-col gap-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Kelola Konten</span>
              <LayoutDashboard className="w-3.5 h-3.5 text-slate-300" />
            </div>
            <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {adminPages.map((page) => {
                const Icon = page.icon;
                return (
                  <NextLink
                    key={page.href}
                    href={page.href}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group"
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${page.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-100 leading-none">{page.label}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">{page.desc}</p>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </NextLink>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}