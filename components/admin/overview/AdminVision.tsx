import { prisma } from "@/lib/prisma";
import NextLink from "next/link";
import { ArrowRight } from "lucide-react";

export async function AdminVision() {
  const visionMissionCount = await prisma.vision_mission.count();

  return (
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
  );
}

export function AdminVisionSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <span className="text-sm font-medium text-slate-900 dark:text-white">Vision & Mission</span>
        <div className="w-16 h-5 rounded-full bg-slate-100 dark:bg-slate-700 animate-pulse"></div>
      </div>
      <div className="px-5 py-4">
        <div className="h-4 w-full bg-slate-100 dark:bg-slate-700 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-2/3 bg-slate-100 dark:bg-slate-700 rounded animate-pulse mb-4"></div>
        <div className="h-4 w-24 bg-blue-100 dark:bg-blue-900/30 rounded animate-pulse mt-3"></div>
      </div>
    </div>
  );
}
