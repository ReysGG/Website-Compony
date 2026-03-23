import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Edit, Plus, Package } from "lucide-react";
import { DeleteProductButton } from "./DeleteProductButton";


export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">
            Admin / <span className="text-slate-700 dark:text-slate-200">Produk</span>
          </nav>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Katalog Produk
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola daftar alat berat dan spesifikasinya
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all self-start sm:self-auto shrink-0"
        >
          <Plus className="w-4 h-4" />
          Tambah Produk
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden shadow-sm">
        <Suspense fallback={<ProductsSkeleton />}>
          <ProductsTable />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductsTable() {
  const products = await prisma.products.findMany({
    orderBy: { order_index: "asc" },
    include: {
      category: true
    }
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700">
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">Produk</th>
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">Kategori</th>
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-center">Urutan</th>
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {products.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <Package className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Belum ada produk</p>
                      <p className="text-xs text-slate-400 mt-1">Mulai dengan menambahkan produk pertama</p>
                    </div>
                    <Link href="/admin/products/new" className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition mt-1">
                      <Plus className="w-4 h-4" /> Tambah Produk
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              products.map((product: any) => (
                <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-10 relative rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shrink-0">
                        {product.image_url ? (
                          <Image src={product.image_url} alt={product.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package className="w-4 h-4 text-slate-400" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{product.title}</p>
                        <p className="text-xs text-slate-400 truncate max-w-[180px] mt-0.5">/{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-100 dark:border-blue-800">
                      {product.category?.name || product.category_old || "Uncategorized"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300">
                      {product.order_index}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/products/${product.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors" title="Edit Produk">
                        <Edit className="w-3.5 h-3.5" /> Edit
                      </Link>
                      <DeleteProductButton id={product.id} title={product.title} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {products.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <p className="text-xs text-slate-400">Menampilkan {products.length} produk</p>
        </div>
      )}
    </>
  );
}

function ProductsSkeleton() {
  return (
    <div className="overflow-x-auto pointer-events-none">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-100 dark:border-slate-700">
            <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">Produk</th>
            <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">Kategori</th>
            <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-center">Urutan</th>
            <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-right">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i}>
              <td className="px-5 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg animate-pulse shrink-0"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-slate-100 dark:bg-slate-700 rounded animate-pulse"></div>
                    <div className="h-3 w-24 bg-slate-50 dark:bg-slate-800 rounded animate-pulse"></div>
                  </div>
                </div>
              </td>
              <td className="px-5 py-3.5"><div className="h-6 w-20 bg-slate-100 dark:bg-slate-700 rounded-full animate-pulse"></div></td>
              <td className="px-5 py-3.5 text-center"><div className="w-7 h-7 bg-slate-100 dark:bg-slate-700 rounded mx-auto animate-pulse"></div></td>
              <td className="px-5 py-3.5">
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