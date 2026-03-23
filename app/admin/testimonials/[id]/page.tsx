import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "../TestimonialForm";
import { notFound } from "next/navigation";



export default async function EditTestimonialPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const testimonial = await prisma.testimonials.findUnique({
    where: { id: params.id },
  });

  if (!testimonial) notFound();

  return (
    <div className="max-w-screen mx-auto">
      <TestimonialForm initialData={testimonial} />
    </div>
  );
}