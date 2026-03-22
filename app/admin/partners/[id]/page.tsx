import { prisma } from "@/lib/prisma";
import { PartnerForm } from "../PartnerForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditPartnerPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const partner = await prisma.partners.findUnique({
    where: { id: params.id },
  });

  if (!partner) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Mitra</h1>
        <p className="text-slate-500 mt-2">
          Perbarui logo, tautan, atau urutan tampil mitra ini.
        </p>
      </div>

      <PartnerForm initialData={partner} />
    </div>
  );
}
