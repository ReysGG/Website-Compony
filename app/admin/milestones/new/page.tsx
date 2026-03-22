import { MilestoneForm } from "../MilestoneForm";

export const dynamic = "force-dynamic";

export default function NewMilestonePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tambah Sejarah Baru</h1>
        <p className="text-slate-500 mt-2">
          Tambahkan rekam jejak pertumbuhan perusahaan ke dalam database.
        </p>
      </div>

      <MilestoneForm />
    </div>
  );
}
