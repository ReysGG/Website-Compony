import { prisma } from "@/lib/prisma";
import { DirectorForm } from "./DirectorForm";

export const dynamic = "force-dynamic";

export default async function AdminDirectorPage() {
  const data = await prisma.director_message.findFirst();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Pesan & Sambutan Direktur</h1>
        <p className="text-slate-500 mt-2">
          Kelola foto, nama, jabatan, dan narasi sambutan pimpinan perusahaan yang tampil di halaman utama.
        </p>
      </div>

      <DirectorForm initialData={data || {}} />
    </div>
  );
}
