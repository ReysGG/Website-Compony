import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { ProfileForm } from "./ProfileForm";
import { Save } from "lucide-react";


export default function AdminProfilePage() {
  return (
    <div className="space-y-6">

      {/* Header — konsisten dengan AdminCategoriesPage */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">
            Admin / <span className="text-slate-700 dark:text-slate-200">Profil Perusahaan</span>
          </nav>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Profil Perusahaan
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola identitas, kontak, dan media sosial perusahaan.
          </p>
        </div>

        {/* Tombol submit di luar form via form attribute */}
        <button
          type="submit"
          form="profile-form"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg active:scale-95 transition-all self-start sm:self-auto flex-shrink-0"
        >
          <Save className="w-4 h-4" />
          Simpan Perubahan
        </button>
      </div>

      {/* Content */}
      <Suspense fallback={<ProfileSkeleton />}>
        <ProfileDataWrapper />
      </Suspense>
    </div>
  );
}

async function ProfileDataWrapper() {
  const data = await prisma.company_profile.findFirst();
  return <ProfileForm initialData={data || ({} as any)} />;
}

function ProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 items-start animate-pulse">
      {/* Left skeleton */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
          <div className="h-3 w-24 bg-slate-100 dark:bg-slate-700 rounded" />
        </div>
        <div className="p-5">
          <div className="aspect-square w-full bg-slate-100 dark:bg-slate-700 rounded-lg" />
        </div>
      </div>

      {/* Right skeleton */}
      <div className="flex flex-col gap-4">
        {[
          { label: 24, rows: 2 },
          { label: 24, rows: 3 },
          { label: 24, rows: 1 },
        ].map((block, i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden"
          >
            <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
              <div className="h-3 w-32 bg-slate-100 dark:bg-slate-700 rounded" />
            </div>
            <div className="p-5 flex flex-col gap-3">
              {Array.from({ length: block.rows }).map((_, j) => (
                <div key={j} className="h-9 w-full bg-slate-100 dark:bg-slate-700 rounded-lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}