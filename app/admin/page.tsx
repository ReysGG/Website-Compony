import { prisma } from "@/lib/prisma";
import NextLink from "next/link";
import { 
  Box, 
  History, 
  Users, 
  Handshake, 
  Target,
  ArrowRight,
  Building2,
  MessageSquareQuote,
  TrendingUp
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  // Fetch counts in parallel for performance
  const [
    productsCount, 
    milestonesCount, 
    testimonialsCount, 
    partnersCount,
    visionMissionCount
  ] = await Promise.all([
    prisma.products.count(),
    prisma.milestones.count(),
    prisma.testimonials.count(),
    prisma.partners.count(),
    prisma.vision_mission.count(),
  ]);

  const stats = [
    { title: "Total Produk", count: productsCount, icon: Box, href: "/admin/products", color: "from-blue-500 to-blue-600", lightColor: "bg-blue-50" },
    { title: "Sejarah / Timeline", count: milestonesCount, icon: History, href: "/admin/milestones", color: "from-indigo-500 to-indigo-600", lightColor: "bg-indigo-50" },
    { title: "Testimoni Klien", count: testimonialsCount, icon: Users, href: "/admin/testimonials", color: "from-emerald-500 to-emerald-600", lightColor: "bg-emerald-50" },
    { title: "Mitra Perusahaan", count: partnersCount, icon: Handshake, href: "/admin/partners", color: "from-amber-500 to-amber-600", lightColor: "bg-amber-50" },
    { title: "Visi & Misi", count: visionMissionCount, icon: Target, href: "/admin/vision-mission", color: "from-rose-500 to-rose-600", lightColor: "bg-rose-50" },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-slate-500 mt-2 font-medium">Selamat datang kembali. Berikut adalah ringkasan konten website Anda.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-2">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">System Live</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <NextLink 
              key={stat.title} 
              href={stat.href}
              className="group bg-white rounded-3xl border border-slate-200 p-1 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                </div>
                
                <div className="mt-8">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-[0.15em]">{stat.title}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-4xl font-black text-slate-900 leading-none">{stat.count}</h3>
                    <span className="text-xs font-bold text-slate-400">Data Terdaftar</span>
                  </div>
                </div>
              </div>
              
              {/* Bottom Decorative Bar */}
              <div className={`h-1.5 w-full bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </NextLink>
          );
        })}
      </div>

      {/* Quick Access Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2 uppercase tracking-wide">
            <div className="w-8 h-1 bg-[#2563eb] rounded-full" />
            Pengaturan Cepat
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <NextLink href="/admin/profile" className="flex flex-col p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#2563eb] hover:bg-blue-50/50 transition-all group">
              <Building2 className="w-8 h-8 text-slate-400 group-hover:text-[#2563eb] mb-4 transition-colors" />
              <h3 className="font-bold text-slate-900">Profil</h3>
              <p className="text-xs text-slate-500 mt-1">Logo, Nama, Kontak</p>
            </NextLink>
            
            <NextLink href="/admin/director" className="flex flex-col p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#2563eb] hover:bg-blue-50/50 transition-all group">
              <MessageSquareQuote className="w-8 h-8 text-slate-400 group-hover:text-[#2563eb] mb-4 transition-colors" />
              <h3 className="font-bold text-slate-900">Direktur</h3>
              <p className="text-xs text-slate-500 mt-1">Foto & Sambutan</p>
            </NextLink>
            
            <NextLink href="/admin/stats" className="flex flex-col p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#2563eb] hover:bg-blue-50/50 transition-all group">
              <TrendingUp className="w-8 h-8 text-slate-400 group-hover:text-[#2563eb] mb-4 transition-colors" />
              <h3 className="font-bold text-slate-900">Statistik</h3>
              <p className="text-xs text-slate-500 mt-1">Angka Pencapaian</p>
            </NextLink>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-[#0f172a] rounded-[2.5rem] p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#2563eb] blur-[80px] opacity-30" />
          <div className="relative z-10">
            <h3 className="text-lg font-black uppercase tracking-tighter italic">Tips Admin</h3>
            <p className="text-slate-400 text-sm mt-4 leading-relaxed font-medium">
              Pastikan gambar yang diunggah memiliki rasio yang konsisten (seperti 16:9 atau 4:3) untuk menjaga kerapihan tampilan website utama.
            </p>
          </div>
          <div className="relative z-10 mt-8">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-blue-500 flex items-center justify-center text-[10px] font-bold">PT</div>
              <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-indigo-500 flex items-center justify-center text-[10px] font-bold">SO</div>
              <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold">KA</div>
            </div>
            <p className="text-[10px] font-bold text-slate-500 mt-4 uppercase tracking-widest">Authorized Access Only</p>
          </div>
        </div>
      </div>
    </div>
  );
}
