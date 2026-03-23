"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { createTestimonial, updateTestimonial } from "@/lib/actions/testimonial-actions";
import { Loader2, Save, ArrowLeft, CheckCircle2, AlertCircle, Star } from "lucide-react";
import Link from "next/link";
import { testimonials as TestimonialType } from "@prisma/client";

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

export function TestimonialForm({ initialData }: { initialData?: TestimonialType }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      e.target.type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : e.target.value;
    setFormData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = isEdit
        ? await updateTestimonial(initialData!.id, formData)
        : await createTestimonial(formData);

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/testimonials");
          router.refresh();
        }, 800);
      } else {
        setError(res.error || "Gagal menyimpan data testimonial.");
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
    <form onSubmit={onSubmit} className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/testimonials"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <nav className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">
              Admin / Testimonials /{" "}
              <span className="text-slate-700 dark:text-slate-200">
                {isEdit ? "Edit" : "Tambah"}
              </span>
            </nav>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {isEdit ? "Edit Testimoni" : "Tambah Testimoni"}
            </h1>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving || success}
          className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all self-start sm:self-auto flex-shrink-0 active:scale-95 disabled:opacity-70 ${
            success
              ? "bg-emerald-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {success ? (
            <><CheckCircle2 className="w-4 h-4" /> Tersimpan!</>
          ) : isSaving ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
          ) : (
            <><Save className="w-4 h-4" /> {isEdit ? "Simpan Perubahan" : "Simpan Testimoni"}</>
          )}
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 items-start">

        {/* Left */}
        <div className="flex flex-col gap-4">
          <Panel title="Foto klien">
            <ImageUpload
              label=""
              value={formData.image_url}
              onChange={(url) => setFormData((p) => ({ ...p, image_url: url }))}
              onRemove={() => setFormData((p) => ({ ...p, image_url: "" }))}
            />
          </Panel>

          <Panel title="Pengaturan">
            <Field label="Rating" hint="Nilai 1 sampai 5">
              <div className="flex items-center gap-1.5 mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, rating: i + 1 }))}
                    className="p-0.5 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        i < formData.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200 dark:text-slate-600"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs text-slate-400 ml-1">{formData.rating}/5</span>
              </div>
            </Field>

            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                name="is_featured"
                checked={formData.is_featured}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <div>
                <span className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Tampilkan di homepage
                </span>
                <span className="block text-[11px] text-slate-400 mt-0.5">
                  Centang untuk menampilkan sebagai featured
                </span>
              </div>
            </label>
          </Panel>
        </div>

        {/* Right */}
        <Panel title="Informasi & ulasan klien">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Nama klien" required>
              <input
                required
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={inputCls}
                placeholder="John Doe"
              />
            </Field>
            <Field label="Jabatan & perusahaan" hint="Opsional">
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={inputCls}
                placeholder="Direktur PT Sinar Mas"
              />
            </Field>
          </div>

          <Field label="Teks testimoni" required>
            <textarea
              required
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={8}
              className={`${inputCls} resize-y leading-relaxed`}
              placeholder="Sangat puas dengan layanan yang diberikan..."
            />
          </Field>
        </Panel>

      </div>
    </form>
  );
}