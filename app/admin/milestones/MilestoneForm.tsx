"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createMilestone, updateMilestone } from "./actions";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function MilestoneForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!initialData?.id;

  const [formData, setFormData] = useState({
    year: initialData?.year || "",
    title: initialData?.title || "",
    description: initialData?.description || "",
    icon_name: initialData?.icon_name || "CheckCircle",
    is_current: initialData?.is_current || false,
    order_index: initialData?.order_index || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      let res;
      if (isEdit) {
        res = await updateMilestone(initialData.id, formData);
      } else {
        res = await createMilestone(formData);
      }

      if (res.success) {
        router.push("/admin/milestones");
        router.refresh();
      } else {
        setError(res.error || "Gagal menyimpan data sejarah");
      }
    } catch (err: any) {
      setError("Terjadi kesalahan sistem");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
      <div className="flex items-center justify-between border-b border-slate-100 pb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/milestones" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-xl font-bold text-slate-800">
            {isEdit ? "Edit Sejarah" : "Tambah Sejarah Baru"}
          </h2>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#2563eb] text-white rounded-lg font-bold hover:bg-blue-700 transition"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isEdit ? "Simpan Perubahan" : "Simpan Sejarah"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200 font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tahun</label>
            <input
              required
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Misal: 1993"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Judul Milestone</label>
            <input
              required
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Pendirian Perusahaan"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Icon Lucide</label>
              <input
                type="text"
                name="icon_name"
                value={formData.icon_name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="CheckCircle"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Urutan (Order Index)</label>
              <input
                type="number"
                name="order_index"
                value={formData.order_index}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          
          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  name="is_current"
                  checked={formData.is_current}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                />
              </div>
              <div>
                <span className="block text-sm font-semibold text-slate-700">Tandai sebagai "Saat Ini"</span>
                <span className="block text-xs text-slate-500">Momen ini akan diberi warna berbeda di timeline</span>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Lengkap</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Ceritakan peristiwa penting pada tahun ini secara detail..."
            />
          </div>
        </div>
      </div>
    </form>
  );
}
