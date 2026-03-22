import { prisma } from "@/lib/prisma";
import { MilestoneForm } from "../MilestoneForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditMilestonePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const milestone = await prisma.milestones.findUnique({
    where: { id: params.id },
  });

  if (!milestone) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Sejarah</h1>
        <p className="text-slate-500 mt-2">
          Perbarui teks, status, atau judul peristiwa ini.
        </p>
      </div>

      <MilestoneForm initialData={milestone} />
    </div>
  );
}
