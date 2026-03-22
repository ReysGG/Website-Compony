import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Edit, Plus, Star, CheckCircle2 } from "lucide-react";
import { DeleteTestimonialButton } from "./DeleteTestimonialButton";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await prisma.testimonials.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Testimoni Klien</h1>
          <p className="text-slate-500 mt-2">
            Kelola ulasan dan kepercayaan klien terhadap pelayanan PT Soka Utama Niaga.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563eb] text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Tambah Testimoni
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Klien</th>
                <th className="px-6 py-4">Ulasan</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {testimonials.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Belum ada testimoni yang ditambahkan.
                  </td>
                </tr>
              ) : (
                testimonials.map((testimonial) => (
                  <tr key={testimonial.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 relative rounded-full overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                          {testimonial.image_url ? (
                            <Image src={testimonial.image_url} alt={testimonial.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 bg-slate-200">
                              {testimonial.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">{testimonial.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 line-clamp-2 max-w-sm italic">
                        "{testimonial.content}"
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < (testimonial.rating || 5) ? "fill-current" : "text-slate-200"} `} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {testimonial.is_featured ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Featured
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs font-medium px-3 py-1">Draft</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/testimonials/${testimonial.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Testimonial"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <DeleteTestimonialButton id={testimonial.id} name={testimonial.name} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
