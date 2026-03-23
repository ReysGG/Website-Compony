"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { createProduct, updateProduct } from "@/lib/actions/product-actions";
import { createCategory } from "@/lib/actions/category-actions";
import {
  Loader2,
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  FolderPlus,
} from "lucide-react";
import Link from "next/link";

import { products as ProductType, categories as CategoryType } from "@prisma/client";

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
      <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">
        {label}
        {required && <span className="text-blue-500 ml-1">*</span>}
      </label>
      {children}
      {hint && <p className="text-[10px] text-slate-400 font-medium px-1">{hint}</p>}
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
    <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50 dark:border-slate-700/50">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
          {title}
        </span>
        {action}
      </div>
      <div className="p-6 flex flex-col gap-4">{children}</div>
    </div>
  );
}

const inputCls =
  "w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all duration-200";

// ─── Main Form ────────────────────────────────────────────────────────────────
export function ProductForm({ initialData, categories = [] }: { initialData?: Partial<ProductType>, categories?: CategoryType[] }) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Quick Category State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCatName, setNewCatName] = useState("");
  const [isCreatingCat, setIsCreatingCat] = useState(false);

  const isEdit = !!initialData?.id;

  const [features, setFeatures] = useState<string[]>(
    initialData?.features?.length ? initialData.features : [""]
  );

  const [specs, setSpecs] = useState<SpecRow[]>(
    initialData?.specifications && typeof initialData.specifications === 'object' && !Array.isArray(initialData.specifications)
      ? Object.entries(initialData.specifications as Record<string, string>).map(([key, value]) => ({ key, value }))
      : [{ key: "", value: "" }]
  );

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    category_id: initialData?.category_id || "",
    image_url: initialData?.image_url || "",
    description: initialData?.description || "",
    order_index: initialData?.order_index ?? 0,
    slug: initialData?.slug || "",
  });

  const handleQuickCreateCategory = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newCatName.trim()) return;

    setIsCreatingCat(true);
    try {
      const res = await createCategory({ name: newCatName });
      if (res.success) {
        router.refresh();
        setTimeout(() => {
          setIsCategoryModalOpen(false);
          setNewCatName("");
        }, 500);
      } else {
        alert(res.error || "Gagal membuat kategori");
      }
    } catch (err) {
      alert("Terjadi kesalahan sistem.");
    } finally {
      setIsCreatingCat(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Special check for "new-category" option
    if (name === "category_id" && value === "add-new-special-action") {
      setIsCategoryModalOpen(true);
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "title" && !isEdit ? { slug: toSlug(value) } : {}),
    }));
  };

  // ... (keep feature and spec handlers)
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
      className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors"
    >
      <Plus className="w-3 h-3" />
      Tambah
    </button>
  );

  const DelBtn = ({ onClick }: { onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="p-2 flex-shrink-0 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all active:scale-90"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );

  return (
    <>
      {/* ─── Premium Quick Category Modal ────────────────────────────────── */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" 
            onClick={() => setIsCategoryModalOpen(false)}
          />
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-2xl relative z-10 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <FolderPlus className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Kategori Baru</h3>
              </div>
              <button 
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
                Tambahkan pengelompokan produk secara instan. Kategori baru ini akan langsung tersedia di pilihan form.
              </p>

              <form onSubmit={handleQuickCreateCategory} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Pilih Nama Kategori <span className="text-blue-500">*</span></label>
                  <input
                    autoFocus
                    required
                    type="text"
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                    placeholder="Contoh: Crane & Lifting, Excavator..."
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsCategoryModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={isCreatingCat || !newCatName.trim()}
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-500/20 disabled:opacity-50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                  >
                    {isCreatingCat ? <Loader2 className="w-4 h-4 animate-spin" /> : "Simpan Kategori"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/products"
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all active:scale-90"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tightest uppercase">
                {isEdit ? "Edit Unit" : "Entry Unit Baru"}
              </h1>
              <nav className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">
                Asset Management / <span className="text-blue-600">Product Form</span>
              </nav>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving || success}
            className={`inline-flex items-center gap-3 px-8 py-3.5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all self-start sm:self-auto disabled:opacity-70 active:scale-95 shadow-2xl ${
              success
                ? "bg-emerald-600 text-white shadow-emerald-500/20"
                : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
            }`}
          >
            {success ? (
              <><CheckCircle2 className="w-5 h-5" /> Saved Successfully</>
            ) : isSaving ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
            ) : (
              <><Save className="w-5 h-5" /> {isEdit ? "Update Changes" : "Commit Record"}</>
            )}
          </button>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="flex items-center gap-3 p-5 bg-red-50 border border-red-100 rounded-[1.5rem] text-sm text-red-700 font-bold animate-shake">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">

          {/* Side Column */}
          <div className="flex flex-col gap-8">
            <Panel title="Media Assets">
              <ImageUpload
                label=""
                value={formData.image_url}
                onChange={(url) => setFormData((p) => ({ ...p, image_url: url }))}
                onRemove={() => setFormData((p) => ({ ...p, image_url: "" }))}
              />
            </Panel>

            <Panel title="Record Info">
              <Field label="Priority Order" hint="Lower values appear first">
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
              <Field label="System Slug" hint="Internal URL identifier">
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className={`${inputCls} font-mono text-xs text-slate-500 bg-slate-50/50`}
                  placeholder="excavator-pc200"
                />
              </Field>
            </Panel>
          </div>

          {/* Main Column */}
          <div className="flex flex-col gap-8">

            <Panel title="Primary Information">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Field label="Unit Nomenclature" required>
                  <input
                    required
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={inputCls}
                    placeholder="Contoh: Komatsu PC200-8"
                  />
                </Field>
                <Field label="Classification" required>
                  <select
                    required
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    className={`${inputCls} font-bold appearance-none cursor-pointer`}
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                    <option value="add-new-special-action" className="text-blue-600 font-black">
                      + ADD NEW CATEGORY
                    </option>
                  </select>
                </Field>
              </div>
              <Field label="Executive Summary">
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputCls} resize-none`}
                  placeholder="Provide a high-level overview of the machine's capabilities..."
                />
              </Field>
            </Panel>

            <Panel title="Key Features" action={<AddRowBtn onClick={addFeature} />}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 group/item">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateFeature(i, e.target.value)}
                      className={`${inputCls} text-xs`}
                      placeholder={`Value-add feature ${i + 1}`}
                    />
                    {features.length > 1 && <DelBtn onClick={() => removeFeature(i)} />}
                  </div>
                ))}
              </div>
            </Panel>

            <Panel title="Technical Specifications" action={<AddRowBtn onClick={addSpec} />}>
              <div className="space-y-3">
                {specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-3 group/item">
                    <div className="flex-1 grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={spec.key}
                        onChange={(e) => updateSpec(i, "key", e.target.value)}
                        className={`${inputCls} bg-slate-50/50 border-dashed text-xs uppercase font-black`}
                        placeholder="Parameter (e.g. Engine)"
                      />
                      <input
                        type="text"
                        value={spec.value}
                        onChange={(e) => updateSpec(i, "value", e.target.value)}
                        className={`${inputCls} text-xs`}
                        placeholder="Rating / Spec"
                      />
                    </div>
                    {specs.length > 1 && <DelBtn onClick={() => removeSpec(i)} />}
                  </div>
                ))}
              </div>
            </Panel>

          </div>
        </div>
      </form>
    </>
  );
}
