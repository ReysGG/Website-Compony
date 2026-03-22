import { prisma } from "@/lib/prisma";
import { ProfileForm } from "./ProfileForm";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const data = await prisma.company_profile.findFirst();

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Profil Perusahaan</h1>
        <p className="text-slate-500 mt-2">
          Perbarui identitas utama, kontak, lokasi, dan penjelasan singkat perusahaan ("Tentang Kami").
        </p>
      </div>

      <ProfileForm initialData={data || {}} />
    </div>
  );
}
