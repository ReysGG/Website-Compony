"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Box, 
  History, 
  MessageSquareQuote, 
  TrendingUp, 
  Building2, 
  Users, 
  Handshake, 
  Target,
  ChevronRight,
  LogOut,
  ExternalLink
} from "lucide-react";
import { UserButton, SignOutButton } from "@clerk/nextjs";

const menuGroups = [
  {
    title: "Utama",
    items: [
      { href: "/admin", label: "Overview", icon: LayoutDashboard },
      { href: "/admin/products", label: "Produk & Alat Berat", icon: Box },
    ]
  },
  {
    title: "Konten Website",
    items: [
      { href: "/admin/milestones", label: "Sejarah / Timeline", icon: History },
      { href: "/admin/director", label: "Pesan Direktur", icon: MessageSquareQuote },
      { href: "/admin/stats", label: "Angka Pencapaian", icon: TrendingUp },
      { href: "/admin/vision-mission", label: "Visi & Misi", icon: Target },
    ]
  },
  {
    title: "Profil & Relasi",
    items: [
      { href: "/admin/profile", label: "Profil Perusahaan", icon: Building2 },
      { href: "/admin/testimonials", label: "Testimonials", icon: Users },
      { href: "/admin/partners", label: "Mitra / Partners", icon: Handshake },
    ]
  }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#0f172a] border-r border-slate-800 h-screen hidden lg:flex flex-col fixed left-0 top-0 text-slate-400 z-50 overflow-hidden shadow-2xl">
      {/* Brand Header */}
      <div className="p-8 pb-4">
        <Link href="/admin" className="group flex items-center gap-2">
          <div className="bg-[#2563eb] w-8 h-8 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
            S
          </div>
          <div>
            <h1 className="text-sm font-black text-white uppercase tracking-tighter leading-none">PT SOKA</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-widest">Admin Panel</p>
          </div>
        </Link>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-8 scrollbar-hide">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <h3 className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">
              {group.title}
            </h3>
            <nav className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = item.href === '/admin' ? pathname === '/admin' : pathname.startsWith(item.href);
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-semibold ${
                      isActive 
                        ? "bg-[#2563eb] text-white shadow-lg shadow-blue-500/20" 
                        : "hover:bg-slate-800/50 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-colors ${isActive ? "text-white" : "text-slate-500 group-hover:text-blue-400"}`} />
                      {item.label}
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                  </Link>
                );
              })}
            </nav>
          </div>
        ))}
        
        {/* Quick Links Group */}
        <div className="pt-4 border-t border-slate-800/50">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-500 hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Lihat Live Website
          </Link>
        </div>
      </div>

      {/* User Session Area */}
      <div className="p-4 border-t border-slate-800/50 bg-slate-900/30 backdrop-blur-sm">
        <div className="bg-slate-800/50 p-3 rounded-2xl border border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserButton 
              appearance={{
                elements: {
                  userButtonAvatarBox: "h-8 w-8 border-2 border-slate-700",
                }
              }}
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">Administrator</p>
              <p className="text-[10px] text-slate-500 truncate">Online</p>
            </div>
          </div>
          <SignOutButton>
            <button className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-all" title="Keluar">
              <LogOut className="w-4 h-4" />
            </button>
          </SignOutButton>
        </div>
      </div>
    </aside>
  );
}
