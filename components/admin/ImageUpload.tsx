"use client";

import { useState } from "react";
import Image from "next/image";
import { UploadCloud, X, Loader2 } from "lucide-react";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  onRemove: () => void;
  label?: string;
}

export function ImageUpload({ value, onChange, onRemove, label = "Upload Gambar" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran file maksimal 5MB");
      return;
    }

    try {
      setIsUploading(true);
      setError("");
      
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Gagal mengupload gambar");

      onChange(data.url);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Terjadi kesalahan saat upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-semibold text-slate-700">{label}</label>
      
      {value ? (
        <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-slate-200 aspect-video group bg-slate-50">
          <Image
            fill
            src={value}
            alt="Uploaded image"
            className="object-contain"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <button
              type="button"
              onClick={onRemove}
              className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition shadow-lg"
              title="Hapus Gambar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full max-w-sm h-48 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition hover:border-[#2563eb]">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-slate-500">
            {isUploading ? (
              <Loader2 className="w-8 h-8 animate-spin text-[#2563eb] mb-3" />
            ) : (
              <UploadCloud className="w-8 h-8 mb-3 text-slate-400 group-hover:text-[#2563eb]" />
            )}
            <p className="mb-2 text-sm font-medium">
              {isUploading ? "Mengunggah..." : "Klik untuk upload gambar"}
            </p>
            <p className="text-xs text-slate-400">PNG, JPG, WEBP (Maks 5MB)</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/*" 
            onChange={handleUpload}
            disabled={isUploading}
          />
        </label>
      )}
      
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
