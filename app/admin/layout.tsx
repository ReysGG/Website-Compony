import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const role = user.publicMetadata?.role;

  // Akses ditolak
  if (role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
        <div className="w-full max-w-sm bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-8 text-center">
          <div className="w-12 h-12 bg-red-50 dark:bg-red-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Akses Ditolak
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-1">
            Akun{" "}
            <span className="font-medium text-slate-700 dark:text-slate-300">
              {user.emailAddresses[0].emailAddress}
            </span>{" "}
            tidak memiliki izin akses admin.
          </p>
          <p className="text-xs text-slate-400 mb-6">
            Role terdeteksi:{" "}
            <code className="font-mono bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-slate-600 dark:text-slate-300">
              {String(role)}
            </code>
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 antialiased">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main — offset sidebar w-60 */}
      <main className="lg:ml-60 flex-1 min-h-screen flex flex-col">

        {/* Topbar */}
        <header className="fixed top-0 right-0 lg:left-60 left-0 z-30 h-14 bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between px-6">
          {/* Left — search */}
          <div className="relative hidden md:block">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              className="pl-9 pr-4 py-1.5 bg-slate-100 dark:bg-slate-700 border-none rounded-lg text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-56 transition"
              placeholder="Search data..."
              type="text"
            />
          </div>

          {/* Right — actions */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Notification */}
            <button className="relative w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-slate-200 dark:bg-slate-600" />

            {/* User */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-7 h-7",
                },
              }}
            />
          </div>
        </header>

        {/* Content */}
        <div className="pt-14 flex flex-col flex-1">
          <div className="flex-1 px-6 md:px-8 py-8">
            {children}
          </div>

          {/* Footer */}
          <footer className="px-6 md:px-8 py-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} PT Soka Utama Niaga
            </span>
            <div className="flex items-center gap-4">
              <a href="#" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                Terms of Service
              </a>
            </div>
          </footer>
        </div>

      </main>
    </div>
  );
}