import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Suspense } from "react";
import { Edit, Plus, FolderTree } from "lucide-react";
import { DeleteCategoryButton } from "./DeleteCategoryButton";


export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">
            Admin / <span className="text-slate-700 dark:text-slate-200">Kategori</span>
          </nav>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Kategori Produk
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola pengelompokan produk alat berat
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          Tambah Kategori
        </Link>
      </div>

      {/* Table Area with Suspense */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesTable />
        </Suspense>
      </div>
    </div>
  );
}

async function CategoriesTable() {
  const categories = await prisma.categories.findMany({
    include: {
      _count: {
        select: { products: true }
      }
    },
    orderBy: { name: "asc" },
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700">
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-center">
                Total Unit
              </th>
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <FolderTree className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        Belum ada kategori
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Mulai dengan pengelompokan produk pertama Anda
                      </p>
                    </div>
                    <Link
                      href="/admin/categories/new"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition mt-1"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Kategori
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              categories.map((cat: any) => (
                <tr key={cat.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        <FolderTree className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                          {cat.name}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5 max-w-sm truncate">
                          /{cat.slug} {cat.description ? `· ${cat.description}` : ""}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                      {cat._count.products} Unit
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                         href={`/admin/categories/${cat.id}`}
                         className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
                      </Link>
                      <DeleteCategoryButton id={cat.id} name={cat.name} productsCount={cat._count.products} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {categories.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            Menampilkan {categories.length} kategori
          </p>
        </div>
      )}
    </>
  );
}

function CategoriesSkeleton() {
  return (
    <div className="overflow-x-auto pointer-events-none">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-700">
            <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">Kategori</th>
            <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-center">Total Unit</th>
            <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i}>
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 animate-pulse shrink-0"></div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-32 bg-slate-100 dark:bg-slate-700 rounded animate-pulse"></div>
                    <div className="h-3 w-48 bg-slate-50 dark:bg-slate-800 rounded animate-pulse"></div>
                  </div>
                </div>
              </td>
              <td className="px-5 py-4 text-center">
                <div className="w-16 h-6 bg-slate-100 dark:bg-slate-700 rounded-full mx-auto animate-pulse"></div>
              </td>
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
