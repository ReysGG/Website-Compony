import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";
import { Plus, Eye, Target } from "lucide-react";
import { DeleteVisionMissionButton } from "./DeleteVisionMissionButton";


export default function AdminVisionMissionPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">
            Admin / <span className="text-slate-700 dark:text-slate-200">Visi & Misi</span>
          </nav>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Visi & Misi
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola pernyataan visi dan misi perusahaan
          </p>
        </div>
        <Link
          href="/admin/vision-mission/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          Tambah Entri
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
        <Suspense fallback={<VisionMissionSkeleton />}>
          <VisionMissionTable />
        </Suspense>
      </div>
    </div>
  );
}

async function VisionMissionTable() {
  const entries = await prisma.vision_mission.findMany({
    orderBy: [{ type: "asc" }, { order_index: "asc" }],
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700">
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider w-24">Tipe</th>
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">Pernyataan</th>
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-center w-20">Urutan</th>
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {entries.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <Target className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Belum ada entri</p>
                      <p className="text-xs text-slate-400 mt-1">Mulai dengan menambahkan visi atau misi pertama</p>
                    </div>
                    <Link href="/admin/vision-mission/new" className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition mt-1">
                      <Plus className="w-4 h-4" /> Tambah Entri
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              entries.map((entry: any) => (
                <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${entry.type === "vision" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-800" : "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-800"}`}>
                      {entry.type === "vision" ? "Visi" : "Misi"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm text-slate-800 dark:text-slate-100 line-clamp-2 max-w-xl leading-relaxed">{entry.content}</p>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300">
                      {entry.order_index}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/vision-mission/${entry.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors">
                        <Eye className="w-3.5 h-3.5" /> Edit
                      </Link>
                      <DeleteVisionMissionButton id={entry.id} text={entry.content?.slice(0, 50) ?? ""} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {entries.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <p className="text-xs text-slate-400">{entries.length} entri terdaftar</p>
        </div>
      )}
    </>
  );
}

function VisionMissionSkeleton() {
  return (
    <div className="overflow-x-auto pointer-events-none">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-700">
            <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider w-24">Tipe</th>
            <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">Pernyataan</th>
            <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-center w-20">Urutan</th>
            <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i}>
              <td className="px-5 py-4"><div className="h-6 w-12 bg-slate-100 dark:bg-slate-700 rounded-full animate-pulse"></div></td>
              <td className="px-5 py-4">
                <div className="space-y-2">
                  <div className="h-4 w-64 bg-slate-100 dark:bg-slate-700 rounded animate-pulse"></div>
                  <div className="h-4 w-48 bg-slate-50 dark:bg-slate-800 rounded animate-pulse"></div>
                </div>
              </td>
              <td className="px-5 py-4 text-center"><div className="w-7 h-7 bg-slate-100 dark:bg-slate-700 rounded mx-auto animate-pulse"></div></td>
              <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-16 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                  <div className="w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse"></div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}