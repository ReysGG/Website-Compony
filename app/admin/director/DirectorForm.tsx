"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { updateDirectorMessage } from "@/lib/actions/director-actions";
import {
  Loader2,
  AlertCircle,
  Info,
  MessageSquareQuote,
} from "lucide-react";
import { director_message } from "@prisma/client";

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

export function DirectorForm({ initialData }: { initialData: director_message }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    director_name: initialData?.director_name || "",
    role: initialData?.role || "Direktur Utama",
    image_url: initialData?.image_url || "",
    year: initialData?.year || new Date().getFullYear(),
    quote_paragraphs: initialData?.quote_paragraphs?.join("\n\n") || "",
  });

  const paraCount = formData.quote_paragraphs
    .split("\n\n")
    .filter((p) => p.trim().length > 0).length;

  const charCount = formData.quote_paragraphs.length;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await updateDirectorMessage(formData);
      if (res.success) {
        setSuccess(true);
        router.refresh();
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(res.error || "Gagal memperbarui data.");
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
    <div className="space-y-4">

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Success */}
      {success && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg text-sm text-emerald-700 dark:text-emerald-400">
          Perubahan berhasil disimpan!
        </div>
      )}

      {/* Loading indicator saat saving (karena tombol ada di luar form) */}
      {isSaving && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-400">
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" />
          Menyimpan perubahan...
        </div>
      )}

      <form id="director-form" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-4 items-start">

          {/* Left column */}
          <div className="flex flex-col gap-4">

            <Panel title="Foto direktur">
              <ImageUpload
                label=""
                value={formData.image_url}
                onChange={(url) => setFormData((p) => ({ ...p, image_url: url }))}
                onRemove={() => setFormData((p) => ({ ...p, image_url: "" }))}
              />
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Disarankan foto potret (3:4) dengan pencahayaan profesional.
                </p>
              </div>
            </Panel>

            <Panel title="Metadata">
              <Field label="Tahun pesan" hint="Tahun pesan ini dibuat">
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder={String(new Date().getFullYear())}
                />
              </Field>
            </Panel>

          </div>

          {/* Right column */}
          <div className="flex flex-col gap-4">

            <Panel title="Identitas direktur">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Nama direktur" required>
                  <input
                    required
                    type="text"
                    name="director_name"
                    value={formData.director_name}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="Contoh: Bpk. John Doe"
                  />
                </Field>
                <Field label="Jabatan" required>
                  <input
                    required
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="Contoh: Direktur Utama"
                  />
                </Field>
              </div>
            </Panel>

            <Panel
              title="Isi pesan"
              action={
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span>{paraCount} paragraf</span>
                  <span className="text-slate-200 dark:text-slate-600">·</span>
                  <span>{charCount.toLocaleString()} karakter</span>
                </div>
              }
            >
              <div className="flex items-start gap-2">
                <MessageSquareQuote className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Pisahkan paragraf dengan dua kali Enter. Setiap blok ditampilkan sebagai paragraf terpisah di website.
                </p>
              </div>

              <textarea
                required
                name="quote_paragraphs"
                value={formData.quote_paragraphs}
                onChange={handleChange}
                rows={16}
                className={`${inputCls} resize-y leading-relaxed`}
                placeholder={`Tuliskan paragraf pertama di sini...\n\nLanjutkan dengan paragraf kedua setelah baris kosong.\n\nDan seterusnya.`}
              />
            </Panel>

          </div>
        </div>
      </form>
    </div>
  );
}