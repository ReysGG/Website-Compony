import { prisma } from "@/lib/prisma";
import { StatsForm } from "./StatsForm";

export const dynamic = "force-dynamic";

export default async function AdminStatsPage() {
  const stats = await prisma.stats.findMany({
    orderBy: { order_index: "asc" },
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Angka Pencapaian</h1>
        <p className="text-slate-500 mt-2">
          Perbarui teks dan angka statistik yang muncul di halaman utama (seksi "Angka yang Bicara").
        </p>
      </div>

      <StatsForm initialData={stats} />
    </div>
  );
}
