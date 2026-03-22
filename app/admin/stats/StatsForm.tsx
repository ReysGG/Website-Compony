"use client";

import { useState } from "react";
import { updateStats } from "./actions";
import { Loader2, Save } from "lucide-react";

export function StatsForm({ initialData }: { initialData: any[] }) {
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [stats, setStats] = useState(initialData || []);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newStats = [...stats];
    newStats[index] = { ...newStats[index], [e.target.name]: e.target.value };
    setStats(newStats);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const res = await updateStats(stats);
      if (res.success) {
        setMessage({ type: "success", text: "Statistik berhasil diperbarui!" });
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

      <div className="space-y-6">
        {stats.map((stat, idx) => (
          <div key={stat.id} className="p-6 bg-slate-50 border border-slate-200 rounded-xl relative">
            <div className="absolute top-4 right-4 bg-slate-200 text-slate-500 font-bold px-3 py-1 rounded-md text-xs">
              Statistik #{idx + 1}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div>
                <label className="block text-xs text-slate-500 mb-1 lg:hidden">Prefix</label>
                <input
                  type="text"
                  name="label_prefix"
                  value={stat.label_prefix || ""}
                  onChange={(e) => handleChange(idx, e)}
                  placeholder="Misal: Total"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <p className="text-[10px] text-slate-400 mt-1 hidden lg:block">Label Kecil Atas</p>
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1 lg:hidden">Angka</label>
                <input
                  type="number"
                  name="value"
                  required
                  value={stat.value || 0}
                  onChange={(e) => handleChange(idx, e)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition font-black text-[#2563eb]"
                />
                <p className="text-[10px] text-slate-400 mt-1 hidden lg:block">Nilai Utama (Wajib)</p>
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1 lg:hidden">Suffix</label>
                <input
                  type="text"
                  name="suffix"
                  value={stat.suffix || ""}
                  onChange={(e) => handleChange(idx, e)}
                  placeholder="Misal: +"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <p className="text-[10px] text-slate-400 mt-1 hidden lg:block">Simbol (+, %, dsb)</p>
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1 lg:hidden">Label Utama</label>
                <input
                  type="text"
                  name="label_main"
                  required
                  value={stat.label_main || ""}
                  onChange={(e) => handleChange(idx, e)}
                  placeholder="Misal: Klien"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <p className="text-[10px] text-slate-400 mt-1 hidden lg:block">Teks Utama Bawah</p>
              </div>
            </div>
          </div>
        ))}

        {stats.length === 0 && (
          <p className="text-slate-500 text-center py-6">Tidak ada record statistik ditemukan di database.</p>
        )}
      </div>

      {stats.length > 0 && (
        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-8 py-3 bg-[#2563eb] text-white rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Simpan Perubahan
          </button>
        </div>
      )}
    </form>
  );
}
