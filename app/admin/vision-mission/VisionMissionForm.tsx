"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createVisionMission, updateVisionMission } from "@/lib/actions/vision-mission-actions";
import { Loader2, Save, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { vision_mission as VisionMissionType } from "@prisma/client";

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

export function VisionMissionForm({ initialData }: { initialData?: VisionMissionType }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!initialData?.id;

  const [formData, setFormData] = useState({
    type: initialData?.type || "vision",
    content: initialData?.content || "",
    order_index: initialData?.order_index || 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = isEdit
        ? await updateVisionMission(initialData!.id, formData)
        : await createVisionMission(formData);

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/vision-mission");
          router.refresh();
        }, 800);
      } else {
        setError(res.error || "Gagal menyimpan data visi/misi.");
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

      {/* Header — konsisten dengan AdminCategoriesPage */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/vision-mission"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <nav className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">
              Admin / Visi & Misi /{" "}
              <span className="text-slate-700 dark:text-slate-200">
                {isEdit ? "Edit" : "Tambah"}
              </span>
            </nav>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {isEdit ? "Edit Entri" : "Tambah Visi / Misi"}
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
            <><Save className="w-4 h-4" /> {isEdit ? "Simpan Perubahan" : "Simpan Data"}</>
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

      {/* Panel */}
      <Panel title="Detail entri">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Tipe entri" required>
            <select
              required
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={inputCls}
            >
              <option value="vision">Visi</option>
              <option value="mission">Misi</option>
            </select>
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

        <Field label="Pernyataan lengkap" required>
          <textarea
            required
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={5}
            className={`${inputCls} resize-y leading-relaxed`}
            placeholder="Menjadi penyedia layanan alat berat terkemuka..."
          />
        </Field>
      </Panel>

    </form>
  );
}