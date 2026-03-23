import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { Save } from "lucide-react";
import { StatsForm } from "./StatsForm";


export default function AdminStatsPage() {
  return (
    <div className="space-y-6">

      {/* Header — selalu render langsung, tidak kena Suspense */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">
            Admin / <span className="text-slate-700 dark:text-slate-200">Angka Pencapaian</span>
          </nav>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Angka Pencapaian
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola angka pencapaian perusahaan yang tampil di halaman publik.
          </p>
        </div>
        <button
          type="submit"
          form="stats-form"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg active:scale-95 transition-all self-start sm:self-auto shrink-0"
        >
          <Save className="w-4 h-4" />
          Simpan Perubahan
        </button>
      </div>

      {/* Hanya bagian data yang dibungkus Suspense */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsDataWrapper />
      </Suspense>
    </div>
  );
}

async function StatsDataWrapper() {
  const stats = await prisma.stats.findMany({
    orderBy: { order_index: "asc" },
  });
  return <StatsForm initialData={stats} />;
}

function StatsSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden animate-pulse">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
        <div className="h-3 w-40 bg-slate-100 dark:bg-slate-700 rounded" />
        <div className="h-3 w-12 bg-slate-100 dark:bg-slate-700 rounded" />
      </div>
      <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="px-5 py-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-slate-100 dark:bg-slate-700 rounded-lg" />
              <div className="h-3 w-24 bg-slate-100 dark:bg-slate-700 rounded" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="h-9 bg-slate-100 dark:bg-slate-700 rounded-lg" />
              <div className="h-9 bg-slate-100 dark:bg-slate-700 rounded-lg" />
              <div className="h-9 bg-slate-100 dark:bg-slate-700 rounded-lg" />
              <div className="h-9 bg-slate-100 dark:bg-slate-700 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
