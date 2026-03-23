import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Edit, Plus, Star, CheckCircle2 } from "lucide-react";
import { DeleteTestimonialButton } from "./DeleteTestimonialButton";
import { testimonials as TestimonialType } from "@prisma/client";


export default function AdminTestimonialsPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">
            Admin / <span className="text-slate-700 dark:text-slate-200">Testimonials</span>
          </nav>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Testimoni Klien
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola ulasan dan testimoni dari klien perusahaan.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all self-start sm:self-auto flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          Tambah Testimoni
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
        <Suspense fallback={<TestimonialsSkeleton />}>
          <TestimonialsTable />
        </Suspense>
      </div>
    </div>
  );
}

async function TestimonialsTable() {
  const testimonials = await prisma.testimonials.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <>
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Daftar ulasan
        </span>
        <span className="text-[11px] text-slate-400">{testimonials.length} testimoni</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700">
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Klien
              </th>
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Ulasan
              </th>
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <Star className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        Belum ada testimoni
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Mulai dengan menambahkan ulasan klien pertama
                      </p>
                    </div>
                    <Link
                      href="/admin/testimonials/new"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition mt-1"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Testimoni
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              testimonials.map((testimonial: TestimonialType) => (
                <tr
                  key={testimonial.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group"
                >
                  {/* Klien */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 relative rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex-shrink-0">
                        {testimonial.image_url ? (
                          <Image
                            src={testimonial.image_url}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-700">
                            {testimonial.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                          {testimonial.name}
                        </p>
                        {testimonial.role && (
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {testimonial.role}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* Ulasan */}
                  <td className="px-5 py-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 max-w-sm italic">
                      "{testimonial.content}"
                    </p>
                  </td>

                  {/* Rating */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < (testimonial.rating || 5)
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-200 dark:text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    {testimonial.is_featured ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium border border-blue-100 dark:border-blue-800">
                        <CheckCircle2 className="w-3 h-3" />
                        Featured
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-400 rounded-full text-xs font-medium">
                        Draft
                      </span>
                    )}
                  </td>

                  {/* Aksi */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/testimonials/${testimonial.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
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

      {/* Footer */}
      {testimonials.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            {testimonials.length} testimoni terdaftar
          </p>
          <Link
            href="/admin/testimonials/new"
            className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Tambah baru
          </Link>
        </div>
      )}
    </>
  );
}

function TestimonialsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
        <div className="h-3 w-24 bg-slate-100 dark:bg-slate-700 rounded" />
        <div className="h-3 w-16 bg-slate-100 dark:bg-slate-700 rounded" />
      </div>
      <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4">
            <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-700 flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 bg-slate-100 dark:bg-slate-700 rounded" />
              <div className="h-3 w-48 bg-slate-50 dark:bg-slate-800 rounded" />
            </div>
            <div className="w-20 h-3 bg-slate-100 dark:bg-slate-700 rounded" />
            <div className="w-16 h-6 bg-slate-100 dark:bg-slate-700 rounded-full" />
            <div className="w-14 h-7 bg-slate-100 dark:bg-slate-700 rounded-lg ml-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}