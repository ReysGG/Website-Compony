import { prisma } from "@/lib/prisma";
import { Suspense } from "react";
import { Save } from "lucide-react";
import { DirectorForm } from "./DirectorForm";


export default function AdminDirectorPage() {
  return (
    <div className="space-y-6">

      {/* Header — selalu render langsung, tidak kena Suspense */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">
            Admin / <span className="text-slate-700 dark:text-slate-200">Pesan Direktur</span>
          </nav>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Pesan Direktur
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola kata sambutan resmi direktur yang tampil di halaman publik.
          </p>
        </div>
        {/* Tombol submit menggunakan form attribute agar bisa berada di luar form */}
        <button
          type="submit"
          form="director-form"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg active:scale-95 transition-all self-start sm:self-auto shrink-0"
        >
          <Save className="w-4 h-4" />
          Simpan Perubahan
        </button>
      </div>

      {/* Hanya bagian data yang dibungkus Suspense */}
      <Suspense fallback={<DirectorSkeleton />}>
        <DirectorDataWrapper />
      </Suspense>
    </div>
  );
}

async function DirectorDataWrapper() {
  const data = await prisma.director_message.findFirst();
  return <DirectorForm initialData={data || {} as any} />;
}

function DirectorSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 items-start animate-pulse">
      {/* Left */}
      <div className="flex flex-col gap-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
            <div className="h-3 w-24 bg-slate-100 dark:bg-slate-700 rounded" />
          </div>
          <div className="p-5">
            <div className="aspect-3/4 w-full bg-slate-100 dark:bg-slate-700 rounded-lg" />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
            <div className="h-3 w-20 bg-slate-100 dark:bg-slate-700 rounded" />
          </div>
          <div className="p-5">
            <div className="h-9 w-full bg-slate-100 dark:bg-slate-700 rounded-lg" />
          </div>
        </div>
      </div>
      {/* Right */}
      <div className="flex flex-col gap-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
            <div className="h-3 w-32 bg-slate-100 dark:bg-slate-700 rounded" />
          </div>
          <div className="p-5 grid grid-cols-2 gap-3">
            <div className="h-9 bg-slate-100 dark:bg-slate-700 rounded-lg" />
            <div className="h-9 bg-slate-100 dark:bg-slate-700 rounded-lg" />
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
            <div className="h-3 w-20 bg-slate-100 dark:bg-slate-700 rounded" />
          </div>
          <div className="p-5">
            <div className="h-64 w-full bg-slate-100 dark:bg-slate-700 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}
