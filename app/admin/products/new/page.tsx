import { ProductForm } from "../ProductForm";

export const dynamic = "force-dynamic";

export default function NewProductPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tambah Produk Baru</h1>
        <p className="text-slate-500 mt-2">
          Lengkapi form di bawah ini untuk menambahkan unit alat berat baru ke dalam katalog.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}
