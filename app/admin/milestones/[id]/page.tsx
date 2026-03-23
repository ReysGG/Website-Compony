import { prisma } from "@/lib/prisma";
import { MilestoneForm } from "../MilestoneForm";
import { notFound } from "next/navigation";



export default async function EditMilestonePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const milestone = await prisma.milestones.findUnique({
    where: { id: params.id },
  });

  if (!milestone) notFound();

  return (
    <div className="max-w-screen mx-auto">
      <MilestoneForm initialData={milestone} />
    </div>
  );
}