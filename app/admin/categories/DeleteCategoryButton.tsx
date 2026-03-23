"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteCategory } from "@/lib/actions/category-actions";

export function DeleteCategoryButton({ id, name, productsCount }: { id: string, name: string, productsCount: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (productsCount > 0) {
      alert(`Kategori "${name}" tidak bisa dihapus karena masih memiliki ${productsCount} produk. Pindahkan produk ke kategori lain terlebih dahulu.`);
      return;
    }

    if (confirm(`Apakah Anda yakin ingin menghapus kategori "${name}"?`)) {
      startTransition(async () => {
        const res = await deleteCategory(id);
        if (!res.success) {
          alert(res.error);
        }
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
      title="Hapus Kategori"
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
