import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { Edit, Plus, Handshake } from "lucide-react";
import { DeletePartnerButton } from "./DeletePartnerButton";
import { partners as PartnerType } from "@prisma/client";


export default function AdminPartnersPage() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <nav className="text-[11px] uppercase tracking-widest text-slate-400 font-medium mb-1">
            Admin / <span className="text-slate-700 dark:text-slate-200">Mitra</span>
          </nav>
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Mitra & Partner
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola logo perusahaan mitra untuk ditampilkan di halaman publik.
          </p>
        </div>
        <Link
          href="/admin/partners/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-95 transition-all self-start sm:self-auto flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          Tambah Mitra
        </Link>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl overflow-hidden">
        <Suspense fallback={<PartnersSkeleton />}>
          <PartnersTable />
        </Suspense>
      </div>
    </div>
  );
}

async function PartnersTable() {
  const partners = await prisma.partners.findMany({
    orderBy: { order_index: "asc" },
  });

  return (
    <>
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
        <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">
          Daftar mitra
        </span>
        <span className="text-[11px] text-slate-400">{partners.length} mitra</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700">
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider">
                Logo & Nama
              </th>
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-center w-20">
                Urutan
              </th>
              <th className="px-5 py-3.5 text-[11px] font-medium text-slate-400 uppercase tracking-wider text-right">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700/50">
            {partners.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-5 py-16 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                      <Handshake className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        Belum ada mitra
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        Mulai dengan menambahkan mitra pertama
                      </p>
                    </div>
                    <Link
                      href="/admin/partners/new"
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition mt-1"
                    >
                      <Plus className="w-4 h-4" />
                      Tambah Mitra
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              partners.map((partner: PartnerType) => (
                <tr
                  key={partner.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group"
                >
                  {/* Logo & Nama */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-10 relative flex-shrink-0 bg-slate-50 dark:bg-slate-700 rounded-lg border border-slate-100 dark:border-slate-600 overflow-hidden">
                        {partner.logo_url ? (
                          <Image
                            src={partner.logo_url}
                            alt={partner.name}
                            fill
                            className="object-contain p-1"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-slate-400">
                            No Logo
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {partner.name}
                      </p>
                    </div>
                  </td>

                  {/* Urutan */}
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-slate-100 dark:bg-slate-700 text-xs font-medium text-slate-600 dark:text-slate-300">
                      {partner.order_index}
                    </span>
                  </td>

                  {/* Aksi */}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/admin/partners/${partner.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        Edit
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

      {/* Footer */}
      {partners.length > 0 && (
        <div className="px-5 py-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <p className="text-xs text-slate-400">
            {partners.length} mitra terdaftar
          </p>
          <Link
            href="/admin/partners/new"
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

function PartnersSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-700">
        <div className="h-3 w-24 bg-slate-100 dark:bg-slate-700 rounded" />
        <div className="h-3 w-12 bg-slate-100 dark:bg-slate-700 rounded" />
      </div>
      <div className="divide-y divide-slate-50 dark:divide-slate-700/50">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-5 py-4">
            <div className="w-20 h-10 bg-slate-100 dark:bg-slate-700 rounded-lg flex-shrink-0" />
            <div className="h-4 w-32 bg-slate-100 dark:bg-slate-700 rounded flex-1" />
            <div className="w-7 h-7 bg-slate-100 dark:bg-slate-700 rounded-md mx-auto" />
            <div className="flex gap-1 ml-auto">
              <div className="w-14 h-7 bg-slate-100 dark:bg-slate-700 rounded-lg" />
              <div className="w-8 h-7 bg-slate-100 dark:bg-slate-700 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}