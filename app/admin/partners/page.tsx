import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Edit, Plus, CheckCircle2, XCircle } from "lucide-react";
import { DeletePartnerButton } from "./DeletePartnerButton";
import { partners } from "@/lib/generated/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPartnersPage() {
  const partners = await prisma.partners.findMany({
    orderBy: { order_index: "asc" },
  });

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mitra & Partner</h1>
          <p className="text-slate-500 mt-2">
            Kelola logo perusahaan mitra untuk ditampilkan di bagian Pilihan Manufaktur Terkemuka.
          </p>
        </div>
        <Link
          href="/admin/partners/new"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563eb] text-white font-bold rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-5 h-5" />
          Tambah Mitra
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Logo & Nama</th>
                <th className="px-6 py-4">Urutan</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {partners.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-slate-500">
                    Belum ada mitra yang ditambahkan.
                  </td>
                </tr>
              ) : (
                partners.map((partner: partners) => (
                  <tr key={partner.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-10 relative flex items-center justify-center shrink-0">
                          {partner.logo_url ? (
                            <Image 
                              src={partner.logo_url} 
                              alt={partner.name} 
                              fill 
                              className="object-contain" 
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-100 rounded flex items-center justify-center text-[10px] text-slate-400">
                              No Logo
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900">{partner.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                      {partner.order_index}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/partners/${partner.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit Mitra"
                        >
                          <Edit className="w-5 h-5" />
                        </Link>
                        <DeletePartnerButton id={partner.id} name={partner.name} />
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
