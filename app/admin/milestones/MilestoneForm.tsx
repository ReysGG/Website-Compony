"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createMilestone, updateMilestone } from "@/lib/actions/milestone-actions";
import { Loader2, Save, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { milestones as MilestoneType } from "@prisma/client";

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

export function MilestoneForm({ initialData }: { initialData?: MilestoneType }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
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
        ? await updateMilestone(initialData!.id, formData)
        : await createMilestone(formData);

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/milestones");
          router.refresh();
        }, 800);
      } else {
        setError(res.error || "Gagal menyimpan data sejarah.");
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
            href="/admin/milestones"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <nav className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">
              Admin / Sejarah /{" "}
              <span className="text-slate-700 dark:text-slate-200">
                {isEdit ? "Edit" : "Tambah"}
              </span>
            </nav>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {isEdit ? "Edit Sejarah" : "Tambah Sejarah Baru"}
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
            <><Save className="w-4 h-4" /> {isEdit ? "Simpan Perubahan" : "Simpan Sejarah"}</>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">

        {/* Left */}
        <div className="flex flex-col gap-4">
          <Panel title="Informasi utama">
            <Field label="Tahun" required>
              <input
                required
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className={inputCls}
                placeholder="1993"
              />
            </Field>

            <Field label="Judul milestone" required>
              <input
                required
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={inputCls}
                placeholder="Pendirian Perusahaan"
              />
            </Field>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Icon Lucide" hint="Nama icon dari lucide-react">
                <input
                  type="text"
                  name="icon_name"
                  value={formData.icon_name}
                  onChange={handleChange}
                  className={`${inputCls} font-mono text-xs`}
                  placeholder="CheckCircle"
                />
              </Field>
              <Field label="Urutan tampil" hint="Angka kecil tampil lebih awal">
                <input
                  type="number"
                  name="order_index"
                  value={formData.order_index}
                  onChange={handleChange}
                  min={0}
                  className={inputCls}
                  placeholder="0"
                />
              </Field>
            </div>
          </Panel>

          <Panel title="Status">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  name="is_current"
                  checked={formData.is_current}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                />
              </div>
              <div>
                <span className="block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Tandai sebagai "Saat Ini"
                </span>
                <span className="block text-[11px] text-slate-400 mt-0.5">
                  Milestone ini akan diberi highlight di timeline publik
                </span>
              </div>
            </label>
          </Panel>
        </div>

        {/* Right */}
        <Panel title="Deskripsi">
          <Field label="Deskripsi lengkap">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={10}
              className={`${inputCls} resize-y leading-relaxed`}
              placeholder="Ceritakan peristiwa penting pada tahun ini secara detail..."
            />
          </Field>
        </Panel>

      </div>
    </form>
  );
}