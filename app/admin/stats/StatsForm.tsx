"use client";

import { useState } from "react";
import { updateStats } from "@/lib/actions/stats-actions";
import { Loader2, AlertCircle, TrendingUp } from "lucide-react";
import { stats as StatType } from "@prisma/client";

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

export function StatsForm({ initialData }: { initialData: StatType[] }) {
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(initialData || []);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [e.target.name]: e.target.value };
    setStats(updated);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess(false);

    try {
      const res = await updateStats(stats);
      if (res.success) {
        setSuccess(true);
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
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Saving indicator & success */}
      {isSaving && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg text-sm text-blue-700 dark:text-blue-400">
          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
          Menyimpan perubahan...
        </div>
      )}
      {success && !isSaving && (
        <div className="flex items-center gap-2.5 px-4 py-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg text-sm text-emerald-700 dark:text-emerald-400">
          Perubahan berhasil disimpan!
        </div>
      )}

      {/* Main card */}
      <form id="stats-form" onSubmit={onSubmit}>
        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">

          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
              Daftar statistik perusahaan
            </span>
            <span className="text-[11px] text-slate-400">
              {stats.length} item
            </span>
          </div>

          {/* Stats list */}
          {stats.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                    Belum ada data statistik
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Tambahkan data statistik melalui database terlebih dahulu.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
              {stats.map((stat, idx) => (
                <div
                  key={stat.id}
                  className="px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors"
                >
                  {/* Row header */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Statistik #{idx + 1}
                    </span>

                    {/* Live preview badge */}
                    {(stat.value || stat.label_main) && (
                      <span className="ml-auto text-xs text-slate-400 dark:text-slate-500 font-mono">
                        {stat.label_prefix ? `${stat.label_prefix} ` : ""}
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">
                          {stat.value}
                        </span>
                        {stat.suffix || ""}
                        {stat.label_main ? ` ${stat.label_main}` : ""}
                      </span>
                    )}
                  </div>

                  {/* Fields — 4 kolom, label responsif pakai satu elemen */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Field
                      label="Label prefix"
                      hint='Contoh: "Total"'
                    >
                      <input
                        type="text"
                        name="label_prefix"
                        value={stat.label_prefix || ""}
                        onChange={(e) => handleChange(idx, e)}
                        placeholder="Total"
                        className={inputCls}
                      />
                    </Field>

                    <Field label="Nilai utama" required>
                      <input
                        type="number"
                        name="value"
                        required
                        value={stat.value ?? 0}
                        onChange={(e) => handleChange(idx, e)}
                        className={`${inputCls} font-semibold text-blue-600 dark:text-blue-400`}
                      />
                    </Field>

                    <Field
                      label="Suffix"
                      hint='Contoh: "+"'
                    >
                      <input
                        type="text"
                        name="suffix"
                        value={stat.suffix || ""}
                        onChange={(e) => handleChange(idx, e)}
                        placeholder="+"
                        className={inputCls}
                      />
                    </Field>

                    <Field label="Teks label" required>
                      <input
                        type="text"
                        name="label_main"
                        required
                        value={stat.label_main || ""}
                        onChange={(e) => handleChange(idx, e)}
                        placeholder="Klien"
                        className={inputCls}
                      />
                    </Field>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer */}
          {stats.length > 0 && (
            <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <p className="text-xs text-slate-400">
                Menampilkan {stats.length} statistik
              </p>
              <p className="text-xs text-slate-400">
                Semua perubahan disimpan sekaligus
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}