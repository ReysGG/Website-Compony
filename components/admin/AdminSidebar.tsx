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
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";
import { UserButton, SignOutButton, useUser } from "@clerk/nextjs";
import { useState } from "react";

const menuGroups = [
  {
    title: "Utama",
    items: [
      { href: "/admin", label: "Overview", icon: LayoutDashboard },
      { href: "/admin/products", label: "Produk & Alat Berat", icon: Box },
      { href: "/admin/categories", label: "Kategori Produk", icon: Target }, // Menambahkan Kategori
    ]
  },
  {
    title: "Konten Website",
    items: [
      { href: "/admin/milestones", label: "Sejarah / Timeline", icon: History },
      { href: "/admin/director", label: "Pesan Direktur", icon: MessageSquareQuote },
      { href: "/admin/stats", label: "Angka Pencapaian", icon: TrendingUp },
      { href: "/admin/vision-mission", label: "Visi & Misi", icon: Target },
    ],
  },
  {
    title: "Profil & Relasi",
    items: [
      { href: "/admin/profile", label: "Profil Perusahaan", icon: Building2 },
      { href: "/admin/testimonials", label: "Testimonials", icon: Users },
      { href: "/admin/partners", label: "Mitra / Partners", icon: Handshake },
    ],
  },
];

function SidebarContent({ onNavClick }: { onNavClick?: () => void }) {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-6 py-6 border-b border-white/5">
        <Link href="/admin" className="block group">
          <h1 className="text-base font-semibold tracking-tight text-white group-hover:text-blue-400 transition-colors">
            Soka Utama Niaga
          </h1>
          <p className="text-[10px] text-slate-500 mt-0.5 uppercase tracking-widest">
            Admin Portal
          </p>
        </Link>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <p className="px-3 text-[10px] font-medium text-slate-600 uppercase tracking-widest mb-1">
              {group.title}
            </p>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href === "/admin"
                    ? pathname === "/admin"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onNavClick}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150 group ${
                      isActive
                        ? "bg-blue-600/15 text-white"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        isActive
                          ? "text-blue-400"
                          : "text-slate-500 group-hover:text-slate-300"
                      }`}
                    />
                    <span className="text-sm font-medium truncate">{item.label}</span>
                    {isActive && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* View Site Link */}
      <div className="px-3 pb-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all group"
        >
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-medium">Lihat Website</span>
        </Link>
      </div>

      {/* User Footer */}
      <div className="border-t border-white/5 px-3 py-3">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5">
          <UserButton
            appearance={{
              elements: {
                avatarBox: "w-7 h-7",
              },
            }}
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user?.firstName ?? "Admin"}
            </p>
            <p className="text-[11px] text-slate-500 truncate">
              {user?.primaryEmailAddress?.emailAddress ?? ""}
            </p>
          </div>
          <SignOutButton>
            <button
              title="Logout"
              className="p-1.5 rounded-md text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all flex-shrink-0"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </SignOutButton>
        </div>
      </div>
    </div>
  );
}

export function AdminSidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-60 bg-slate-950 h-screen hidden lg:flex flex-col fixed left-0 top-0 z-50 border-r border-white/5">
        <SidebarContent />
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-900 border border-white/10 text-white shadow-lg"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <aside className="lg:hidden fixed left-0 top-0 h-full w-64 bg-slate-950 z-50 border-r border-white/5 shadow-2xl flex flex-col animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <span className="text-sm font-semibold text-white">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <SidebarContent onNavClick={() => setMobileOpen(false)} />
          </aside>
        </>
      )}
    </>
  );
}