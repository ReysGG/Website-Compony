import { prisma } from "@/lib/prisma";
import { VisionMissionForm } from "../VisionMissionForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditVisionMissionPage({ params }: { params: { id: string } }) {
  const item = await prisma.vision_mission.findUnique({
    where: { id: params.id },
  });

  if (!item) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Visi / Misi</h1>
        <p className="text-slate-500 mt-2">
          Perbarui teks pernyataan atau ubah tipe dari Visi/Misi ini.
        </p>
      </div>

      <VisionMissionForm initialData={item} />
    </div>
  );
}
