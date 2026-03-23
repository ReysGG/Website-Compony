"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory, updateCategory } from "@/lib/actions/category-actions";
import {
  Loader2,
  Save,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

import { categories as CategoryType } from "@prisma/client";

export function CategoryForm({ initialData }: { initialData?: CategoryType }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!initialData?.id;

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = isEdit
        ? await updateCategory(initialData!.id!, formData)
        : await createCategory(formData);

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/categories");
          router.refresh();
        }, 900);
      } else {
        setError(res.error || "Gagal menyimpan kategori.");
      }
    } catch {
      setError("Terjadi kesalahan sistem.");
    } finally {
      setIsSaving(false);
    }
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white";

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header Form */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/categories"
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all active:scale-90"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tightest uppercase">
              {isEdit ? "Edit Kategori" : "Kategori Baru"}
            </h1>
            <nav className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">
              Asset Management / <span className="text-blue-600">Category Form</span>
            </nav>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving || success}
          className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all self-start sm:self-auto disabled:opacity-70 active:scale-95 shadow-2xl ${
            success
              ? "bg-emerald-600 text-white shadow-emerald-500/20"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
          }`}
        >
          {success ? (
            <><CheckCircle2 className="w-5 h-5" /> Saved Successfully</>
          ) : isSaving ? (
            <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
          ) : (
            <><Save className="w-5 h-5" /> {isEdit ? "Update Changes" : "Commit Record"}</>
          )}
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-5 bg-red-50 border border-red-100 rounded-[1.5rem] text-sm text-red-700 font-bold animate-shake">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Main Form Fields */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50 dark:border-slate-700/50">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
            Primary Information
          </span>
        </div>
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">
              Nama Kategori <span className="text-blue-500 ml-1">*</span>
            </label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200"
              placeholder="Contoh: Excavator, Crane, dsb."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">
              Deskripsi Singkat (Opsional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200 resize-none"
              placeholder="Penjelasan singkat mengenai kategori alat berat ini..."
            />
          </div>
        </div>
      </div>
    </form>
  );
}
