"use client";

import { useState } from "react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { updateCompanyProfile } from "@/lib/actions/profile-actions";
import { Loader2, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { company_profile as ProfileType } from "@prisma/client";

interface SocialMedia {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

const inputCls =
  "w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {hint && <p className="text-[11px] text-slate-400">{hint}</p>}
    </div>
  );
}

function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {action}
      </div>
      <div className="p-5 flex flex-col gap-4">{children}</div>
    </div>
  );
}

export function ProfileForm({ initialData }: { initialData: ProfileType }) {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    tagline: initialData?.tagline || "",
    description: initialData?.description || "",
    address: initialData?.address || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    logo_url: initialData?.logo_url || "",
    social_media: (initialData?.social_media as SocialMedia) || {
      facebook: "",
      instagram: "",
      linkedin: "",
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    setError("");
    setSuccess(false);

    try {
      const res = await updateCompanyProfile(formData);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(res.error || "Gagal memperbarui profil.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setError("Terjadi kesalahan sistem. Silakan coba lagi.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form id="profile-form" onSubmit={onSubmit} className="space-y-6">

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 items-start">

        {/* Left column */}
        <div className="flex flex-col gap-4">
          <Panel title="Logo perusahaan">
            <ImageUpload
              label=""
              value={formData.logo_url}
              onChange={(url) => setFormData((p) => ({ ...p, logo_url: url }))}
              onRemove={() => setFormData((p) => ({ ...p, logo_url: "" }))}
            />
          </Panel>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          <Panel title="Identitas perusahaan">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama perusahaan" required>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="PT Soka Utama Niaga"
                />
              </Field>
              <Field label="Tagline">
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="Daya Angkat Tanpa Batas..."
                />
              </Field>
            </div>
            <Field label="Deskripsi (Tentang Kami)">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className={`${inputCls} resize-y leading-relaxed`}
                placeholder="PT. Soka Utama Niaga hadir sebagai perusahaan pemasok alat berat..."
              />
            </Field>
          </Panel>

          <Panel title="Kontak">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Email perusahaan">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="info@sokautamaniaga.co.id"
                />
              </Field>
              <Field label="Nomor telepon / WhatsApp">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="+62 812..."
                />
              </Field>
            </div>
            <Field label="Alamat lengkap">
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`${inputCls} resize-none`}
                placeholder="Jl. Perusahaan No. 123..."
              />
            </Field>
          </Panel>

          <Panel title="Media sosial" >
            <p className="text-[11px] text-slate-400 -mt-1">Cukup masukkan username / ID akun, tanpa simbol @ dan tanpa link penuh.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Instagram" hint="contoh: sokautamaniaga">
                <input
                  type="text"
                  name="instagram"
                  value={formData.social_media?.instagram || ""}
                  onChange={handleSocialChange}
                  className={inputCls}
                  placeholder="sokautamaniaga"
                />
              </Field>
              <Field label="Facebook" hint="contoh: sokautamaniaga">
                <input
                  type="text"
                  name="facebook"
                  value={formData.social_media?.facebook || ""}
                  onChange={handleSocialChange}
                  className={inputCls}
                  placeholder="sokautamaniaga"
                />
              </Field>
              <Field label="LinkedIn" hint="contoh: soka-utama-niaga">
                <input
                  type="text"
                  name="linkedin"
                  value={formData.social_media?.linkedin || ""}
                  onChange={handleSocialChange}
                  className={inputCls}
                  placeholder="soka-utama-niaga"
                />
              </Field>
            </div>
          </Panel>

        </div>
      </div>
    </form>
  );
}