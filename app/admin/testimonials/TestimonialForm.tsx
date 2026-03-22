"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { createTestimonial, updateTestimonial } from "./actions";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function TestimonialForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!initialData?.id;

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    role: initialData?.role || "",
    image_url: initialData?.image_url || "",
    content: initialData?.content || "",
    rating: initialData?.rating || 5,
    is_featured: initialData?.is_featured ?? true,
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
        res = await updateTestimonial(initialData.id, formData);
      } else {
        res = await createTestimonial(formData);
      }

      if (res.success) {
        router.push("/admin/testimonials");
        router.refresh();
      } else {
        setError(res.error || "Gagal menyimpan data testimonial");
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
          <Link href="/admin/testimonials" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-xl font-bold text-slate-800">
            {isEdit ? "Edit Testimonial" : "Tambah Testimonial Baru"}
          </h2>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#2563eb] text-white rounded-lg font-bold hover:bg-blue-700 transition"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isEdit ? "Simpan Perubahan" : "Simpan Testimonial"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200 font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-6">
          <ImageUpload
            label="Foto Klien"
            value={formData.image_url}
            onChange={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
            onRemove={() => setFormData((prev) => ({ ...prev, image_url: "" }))}
          />

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Rating (Bintang)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          
          <div className="pt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  name="is_featured"
                  checked={formData.is_featured}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500"
                />
              </div>
              <div>
                <span className="block text-sm font-semibold text-slate-700">Tampilkan di Homepage</span>
              </div>
            </label>
          </div>
        </div>

        <div className="col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Klien</label>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Misal: John Doe"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Jabatan & Perusahaan (Opsional)</label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Direktur Operasional PT Sinar Mas"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Teks Testimonial</label>
            <textarea
              required
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Sangat puas dengan layanan yang diberikan..."
            />
          </div>
        </div>
      </div>
    </form>
  );
}
