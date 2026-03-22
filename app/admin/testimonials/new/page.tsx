import { TestimonialForm } from "../TestimonialForm";

export const dynamic = "force-dynamic";

export default function NewTestimonialPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tambah Testimoni</h1>
        <p className="text-slate-500 mt-2">
          Masukkan ulasan dari klien atau mitra bisnis Anda.
        </p>
      </div>

      <TestimonialForm />
    </div>
  );
}
