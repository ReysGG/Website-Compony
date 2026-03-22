"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { updateDirectorMessage } from "./actions";
import { Loader2, Save } from "lucide-react";

export function DirectorForm({ initialData }: { initialData: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    director_name: initialData?.director_name || "",
    role: initialData?.role || "Direktur Utama",
    image_url: initialData?.image_url || "",
    year: initialData?.year || new Date().getFullYear(),
    quote_paragraphs: initialData?.quote_paragraphs?.join("\n\n") || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await updateDirectorMessage(formData);
      if (res.success) {
        setMessage({ type: "success", text: "Pesan Direktur berhasil diperbarui!" });
      } else {
        setMessage({ type: "error", text: res.error || "Gagal memperbarui data" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: "Terjadi kesalahan sistem" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8">
      {message.text && (
        <div className={`p-4 rounded-lg font-medium text-sm ${
          message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <ImageUpload
            label="Foto Profil Direktur"
            value={formData.image_url}
            onChange={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
            onRemove={() => setFormData((prev) => ({ ...prev, image_url: "" }))}
          />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
              <input
                required
                type="text"
                name="director_name"
                value={formData.director_name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Bpk. Budi Santoso"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Jabatan / Peran</label>
              <input
                required
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="Direktur Utama"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tahun / Masa Jabatan</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Misal: 2024"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Isi Sambutan (Pisahkan paragraf dengan Enter 2 kali)
            </label>
            <textarea
              required
              name="quote_paragraphs"
              value={formData.quote_paragraphs}
              onChange={handleChange}
              rows={8}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              placeholder="Paragraf pertama sambutan...&#10;&#10;Paragraf kedua..."
            />
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3 bg-[#2563eb] text-white rounded-lg font-bold hover:bg-blue-700 transition"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Simpan Pesan Direktur
        </button>
      </div>
    </form>
  );
}
