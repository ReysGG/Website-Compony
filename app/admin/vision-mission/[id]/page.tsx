import { prisma } from "@/lib/prisma";
import { VisionMissionForm } from "../VisionMissionForm";
import { notFound } from "next/navigation";



export default async function EditVisionMissionPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const item = await prisma.vision_mission.findUnique({
    where: { id: params.id },
  });

  if (!item) notFound();

  return (
    <div className="max-w-3xl mx-auto">
      <VisionMissionForm initialData={item} />
    </div>
  );
}