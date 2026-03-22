import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Edit, Plus, CheckCircle2 } from "lucide-react";
import { DeleteMilestoneButton } from "./DeleteMilestoneButton";

export const dynamic = "force-dynamic";

export default async function AdminMilestonesPage() {
  const milestones = await prisma.milestones.findMany({
    orderBy: { order_index: "asc" },
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sejarah / Timeline</h1>
          <p className="text-slate-500 mt-2">
            Kelola tonggak sejarah perjalanan perusahaan (Milestones).
          </p>
        </div>
        <Link
          href="/admin/milestones/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563eb] text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Tambah Sejarah
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Tahun</th>
                <th className="px-6 py-4">Judul Peristiwa</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Urutan</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {milestones.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Belum ada sejarah yang ditambahkan.
                  </td>
                </tr>
              ) : (
                milestones.map((milestone) => (
                  <tr key={milestone.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-black text-[#2563eb] text-lg">
                      {milestone.year}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-bold text-slate-900">{milestone.title}</p>
                      <p className="text-sm text-slate-500 truncate max-w-sm">{milestone.description}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {milestone.is_current ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Saat Ini
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs font-medium px-3 py-1">Histori</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                      {milestone.order_index}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/milestones/${milestone.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Sejarah"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <DeleteMilestoneButton id={milestone.id} title={milestone.title} />
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
