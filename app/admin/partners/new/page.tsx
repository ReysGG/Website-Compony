import { PartnerForm } from "../PartnerForm";

export const dynamic = "force-dynamic";

export default function NewPartnerPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tambah Mitra Beru</h1>
        <p className="text-slate-500 mt-2">
          Tambahkan logo manufaktur, dealer, atau klien B2B ke dalam list kemitraan.
        </p>
      </div>

      <PartnerForm />
    </div>
  );
}
