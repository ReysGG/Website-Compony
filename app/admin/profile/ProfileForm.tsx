"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { updateCompanyProfile } from "./actions";
import { Loader2, Save } from "lucide-react";

export function ProfileForm({ initialData }: { initialData: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    tagline: initialData?.tagline || "",
    description: initialData?.description || "",
    address: initialData?.address || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    logo_url: initialData?.logo_url || "",
    // Social media expects JSON object, converting stringify wasn't used but we can parse back and forth
    social_media: initialData?.social_media || { facebook: "", instagram: "", linkedin: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      social_media: {
        ...prev.social_media,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await updateCompanyProfile(formData);
      if (res.success) {
        setMessage({ type: "success", text: "Profil perusahaan berhasil diperbarui!" });
      } else {
        setMessage({ type: "error", text: res.error || "Gagal memperbarui profil" });
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <ImageUpload
            label="Logo Perusahaan / Header Image"
            value={formData.logo_url}
            onChange={(url) => setFormData((prev) => ({ ...prev, logo_url: url }))}
            onRemove={() => setFormData((prev) => ({ ...prev, logo_url: "" }))}
          />
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nama Perusahaan</label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="PT Soka Utama Niaga"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Tagline Singkat</label>
            <input
              type="text"
              name="tagline"
              value={formData.tagline}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Daya Angkat Tanpa Batas..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Perusahaan</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="info@sokautamaniaga.co.id"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Nomor Telepon / WhatsApp</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="+62 812..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Alamat Lengkap</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              placeholder="Jl. Perusahaan No. 123..."
            />
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-slate-100">
        <label className="block text-sm font-semibold text-slate-700 mb-4">Deskripsi Panjang (Tentang Kami)</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
          placeholder="PT. Soka Utama Niaga hadir sebagai perusahaan pemasok alat berat..."
        />
      </div>

      <div className="pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Instagram (URL)</label>
          <input
            type="url"
            name="instagram"
            value={formData.social_media?.instagram || ""}
            onChange={handleSocialChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Facebook (URL)</label>
          <input
            type="url"
            name="facebook"
            value={formData.social_media?.facebook || ""}
            onChange={handleSocialChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">LinkedIn (URL)</label>
          <input
            type="url"
            name="linkedin"
            value={formData.social_media?.linkedin || ""}
            onChange={handleSocialChange}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          disabled={isSaving}
          className="flex items-center gap-2 px-8 py-3 bg-[#2563eb] text-white rounded-lg font-bold hover:bg-blue-700 transition"
        >
          {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Simpan Perubahan
        </button>
      </div>
    </form>
  );
}
