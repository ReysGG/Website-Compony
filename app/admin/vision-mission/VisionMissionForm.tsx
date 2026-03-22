"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createVisionMission, updateVisionMission } from "./actions";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function VisionMissionForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!initialData?.id;

  const [formData, setFormData] = useState({
    type: initialData?.type || "vision",
    content: initialData?.content || "",
    order_index: initialData?.order_index || 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      let res;
      if (isEdit) {
        res = await updateVisionMission(initialData.id, formData);
      } else {
        res = await createVisionMission(formData);
      }

      if (res.success) {
        router.push("/admin/vision-mission");
        router.refresh();
      } else {
        setError(res.error || "Gagal menyimpan data visi/misi");
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
          <Link href="/admin/vision-mission" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-xl font-bold text-slate-800">
            {isEdit ? "Edit Visi / Misi" : "Tambah Visi / Misi Baru"}
          </h2>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#2563eb] text-white rounded-lg font-bold hover:bg-blue-700 transition"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isEdit ? "Simpan Perubahan" : "Simpan Data"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200 font-medium">
          {error}
        </div>
      )}

      <div className="max-w-3xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tipe</label>
            <select
              required
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium"
            >
              <option value="vision">Visi</option>
              <option value="mission">Misi</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Urutan (Order Index)</label>
            <input
              type="number"
              name="order_index"
              value={formData.order_index}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Pernyataan Lengkap</label>
          <textarea
            required
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Menjadi penyedia layanan alat berat terkemuka..."
          />
        </div>
      </div>
    </form>
  );
}
