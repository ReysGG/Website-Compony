"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { createProduct, updateProduct } from "./actions";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ProductForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!initialData?.id;

  // Simple string converters for array/json representation in textareas
  const initialFeaturesStr = initialData?.features?.join("\n") || "";
  let initialSpecsStr = "";
  if (initialData?.specifications && typeof initialData.specifications === 'object') {
    initialSpecsStr = Object.entries(initialData.specifications)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
  }

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "",
    image_url: initialData?.image_url || "",
    description: initialData?.description || "",
    features: initialFeaturesStr,
    specifications: initialSpecsStr,
    order_index: initialData?.order_index || 0,
    slug: initialData?.slug || "", // Used for revalidation path reference
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
        res = await updateProduct(initialData.id, formData);
      } else {
        res = await createProduct(formData);
      }

      if (res.success) {
        router.push("/admin/products");
        router.refresh();
      } else {
        setError(res.error || "Gagal menyimpan data produk");
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
          <Link href="/admin/products" className="p-2 hover:bg-slate-100 rounded-full transition text-slate-500">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h2 className="text-xl font-bold text-slate-800">
            {isEdit ? "Edit Produk" : "Tambah Produk Baru"}
          </h2>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-2.5 bg-[#2563eb] text-white rounded-lg font-bold hover:bg-blue-700 transition"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {isEdit ? "Simpan Perubahan" : "Simpan Produk"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200 font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <ImageUpload
            label="Foto Utama Produk"
            value={formData.image_url}
            onChange={(url) => setFormData((prev) => ({ ...prev, image_url: url }))}
            onRemove={() => setFormData((prev) => ({ ...prev, image_url: "" }))}
          />
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Urutan Tampil (Order Index)</label>
            <input
              type="number"
              name="order_index"
              value={formData.order_index}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="0"
            />
            <p className="text-xs text-slate-400 mt-1">Angka lebih kecil tampil lebih awal</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Produk</label>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Excavator PC200-8"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Kategori</label>
              <select
                required
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
              >
                <option value="">Pilih Kategori</option>
                <option value="Excavator">Excavator</option>
                <option value="Bulldozer">Bulldozer</option>
                <option value="Crane">Crane</option>
                <option value="Dump Truck">Dump Truck</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Deskripsi Singkat</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              placeholder="Mesin handal untuk konstruksi berat..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Fitur Unggulan (Pisahkan dengan Enter)
              </label>
              <textarea
                name="features"
                value={formData.features}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                placeholder="Mesin bertenaga Diesel&#10;Kabin ber-AC&#10;Bucket besar"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Spesifikasi (Format -&gt; Kunci: Nilai)
              </label>
              <textarea
                name="specifications"
                value={formData.specifications}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                placeholder="Engine: Komatsu SAA6D107E-1&#10;Power: 138 HP&#10;Weight: 20 Ton"
              />
            </div>
          </div>
          
        </div>
      </div>
    </form>
  );
}
