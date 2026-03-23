import { prisma } from "@/lib/prisma";
import { PartnerForm } from "../PartnerForm";
import { notFound } from "next/navigation";



export default async function EditPartnerPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const partner = await prisma.partners.findUnique({
    where: { id: params.id },
  });

  if (!partner) notFound();

  return (
    <div className="max-w-screen mx-auto">
      <PartnerForm initialData={partner} />
    </div>
  );
}