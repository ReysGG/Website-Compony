import { prisma } from "@/lib/prisma";
import { TestimonialForm } from "../TestimonialForm";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const testimonial = await prisma.testimonials.findUnique({
    where: { id: params.id },
  });

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Edit Testimoni</h1>
        <p className="text-slate-500 mt-2">
          Koreksi ejaan, ubah rating, atau kelola visibilitas ulasan ini.
        </p>
      </div>

      <TestimonialForm initialData={testimonial} />
    </div>
  );
}
