import { VisionMissionForm } from "../VisionMissionForm";

export const dynamic = "force-dynamic";

export default function NewVisionMissionPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Tambah Visi / Misi</h1>
        <p className="text-slate-500 mt-2">
          Masukkan pernyataan visi atau langkah misi perusahaan yang baru.
        </p>
      </div>

      <VisionMissionForm />
    </div>
  );
}
