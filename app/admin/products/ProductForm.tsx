"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { createProduct, updateProduct } from "./actions";
import {
  Loader2,
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface ProductData {
  id?: string;
  title?: string;
  category?: string;
  image_url?: string;
  description?: string;
  features?: string[];
  specifications?: Record<string, string>;
  order_index?: number;
  slug?: string;
}

interface SpecRow {
  key: string;
  value: string;
}

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

// ─── Reusable Field ───────────────────────────────────────────────────────────
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

// ─── Panel ────────────────────────────────────────────────────────────────────
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
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {action}
      </div>
      <div className="p-4 flex flex-col gap-3">{children}</div>
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

// ─── Main Form ────────────────────────────────────────────────────────────────
export function ProductForm({ initialData }: { initialData?: ProductData }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isEdit = !!initialData?.id;

  const [features, setFeatures] = useState<string[]>(
    initialData?.features?.length ? initialData.features : [""]
  );

  const [specs, setSpecs] = useState<SpecRow[]>(
    initialData?.specifications && Object.keys(initialData.specifications).length
      ? Object.entries(initialData.specifications).map(([key, value]) => ({ key, value }))
      : [{ key: "", value: "" }]
  );

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category: initialData?.category || "",
    image_url: initialData?.image_url || "",
    description: initialData?.description || "",
    order_index: initialData?.order_index ?? 0,
    slug: initialData?.slug || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && !isEdit ? { slug: toSlug(value) } : {}),
    }));
  };

  const updateFeature = (i: number, val: string) =>
    setFeatures((p) => p.map((f, idx) => (idx === i ? val : f)));
  const addFeature = () => setFeatures((p) => [...p, ""]);
  const removeFeature = (i: number) =>
    setFeatures((p) => p.filter((_, idx) => idx !== i));

  const updateSpec = (i: number, field: "key" | "value", val: string) =>
    setSpecs((p) => p.map((s, idx) => (idx === i ? { ...s, [field]: val } : s)));
  const addSpec = () => setSpecs((p) => [...p, { key: "", value: "" }]);
  const removeSpec = (i: number) =>
    setSpecs((p) => p.filter((_, idx) => idx !== i));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess(false);

    const payload = {
      ...formData,
      features: features.filter((f) => f.trim() !== ""),
      specifications: specs
        .filter((s) => s.key.trim() !== "")
        .reduce<Record<string, string>>((acc, s) => {
          acc[s.key.trim()] = s.value.trim();
          return acc;
        }, {}),
    };

    try {
      const res = isEdit
        ? await updateProduct(initialData!.id!, payload)
        : await createProduct(payload);

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/products");
          router.refresh();
        }, 900);
      } else {
        setError(res.error || "Gagal menyimpan data produk.");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch {
      setError("Terjadi kesalahan sistem. Silakan coba lagi.");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setIsSaving(false);
    }
  };

  const AddRowBtn = ({ onClick }: { onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
    >
      <Plus className="w-3.5 h-3.5" />
      Tambah
    </button>
  );

  const DelBtn = ({ onClick }: { onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="p-1.5 flex-shrink-0 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
    >
      <Trash2 className="w-3.5 h-3.5" />
    </button>
  );

  return (
    <form onSubmit={onSubmit} className="space-y-5">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-600 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
              {isEdit ? "Edit Produk" : "Tambah Produk Baru"}
            </h1>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Admin / Produk / {isEdit ? "Edit" : "Tambah"}
            </p>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving || success}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all self-start sm:self-auto flex-shrink-0 disabled:opacity-70 active:scale-95 ${
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
            <><Save className="w-4 h-4" /> {isEdit ? "Simpan Perubahan" : "Simpan Produk"}</>
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

        {/* Left column */}
        <div className="flex flex-col gap-4">
          <Panel title="Foto produk">
            <ImageUpload
              label=""
              value={formData.image_url}
              onChange={(url) => setFormData((p) => ({ ...p, image_url: url }))}
              onRemove={() => setFormData((p) => ({ ...p, image_url: "" }))}
            />
          </Panel>

          <Panel title="Pengaturan">
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
            <Field label="Slug URL" hint="Auto-diisi dari nama produk">
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className={`${inputCls} font-mono text-xs`}
                placeholder="excavator-pc200"
              />
            </Field>
          </Panel>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">

          <Panel title="Informasi produk">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama produk" required>
                <input
                  required
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={inputCls}
                  placeholder="Excavator PC200-8"
                />
              </Field>
              <Field label="Kategori" required>
                <select
                  required
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={inputCls}
                >
                  <option value="">Pilih kategori</option>
                  <option value="Excavator">Excavator</option>
                  <option value="Bulldozer">Bulldozer</option>
                  <option value="Crane">Crane</option>
                  <option value="Dump Truck">Dump Truck</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </Field>
            </div>
            <Field label="Deskripsi singkat">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className={`${inputCls} resize-none`}
                placeholder="Mesin handal untuk konstruksi berat..."
              />
            </Field>
          </Panel>

          <Panel title="Fitur unggulan" action={<AddRowBtn onClick={addFeature} />}>
            <div className="flex flex-col gap-2">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-700 text-[10px] font-medium text-slate-400 flex items-center justify-center flex-shrink-0">
                    {i + 1}
                  </span>
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    className={inputCls}
                    placeholder={`Fitur ${i + 1}...`}
                  />
                  {features.length > 1 && <DelBtn onClick={() => removeFeature(i)} />}
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Spesifikasi teknis" action={<AddRowBtn onClick={addSpec} />}>
            <div className="grid grid-cols-2 gap-2 px-1">
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Nama spek
              </span>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Nilai
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) => updateSpec(i, "key", e.target.value)}
                    className={inputCls}
                    placeholder="Engine"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => updateSpec(i, "value", e.target.value)}
                    className={inputCls}
                    placeholder="Komatsu SAA6D107E-1"
                  />
                  {specs.length > 1 && <DelBtn onClick={() => removeSpec(i)} />}
                </div>
              ))}
            </div>
          </Panel>

        </div>
      </div>
    </form>
  );
}