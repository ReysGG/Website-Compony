import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Edit, Plus, Target, Flag } from "lucide-react";
import { DeleteVisionMissionButton } from "./DeleteVisionMissionButton";

export const dynamic = "force-dynamic";

export default async function AdminVisionMissionPage() {
  const data = await prisma.vision_mission.findMany({
    orderBy: [
      { type: "desc" }, // vision first, then mission
      { order_index: "asc" }
    ],
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Visi & Misi</h1>
          <p className="text-slate-500 mt-2">
            Kelola tujuan luhur dan langkah strategis (Misi) perusahaan Anda.
          </p>
        </div>
        <Link
          href="/admin/vision-mission/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563eb] text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Tambah Data
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Kategori / Tipe</th>
                <th className="px-6 py-4">Pernyataan Visi/Misi</th>
                <th className="px-6 py-4">Urutan</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                    Belum ada Visi atau Misi yang ditambahkan.
                  </td>
                </tr>
              ) : (
                data.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      {item.type === "vision" ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-bold">
                          <Target className="w-4 h-4" /> Visi Utama
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-bold">
                          <Flag className="w-4 h-4" /> Misi
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-slate-600 max-w-lg">
                        {item.content}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                      {item.order_index}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/vision-mission/${item.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <DeleteVisionMissionButton id={item.id} text={item.content} />
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
