import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  // Jika tidak login, arahkan ke sign-in
  if (!user) {
    redirect("/sign-in");
  }

  // Ambil role langsung dari publicMetadata user
  const role = user.publicMetadata?.role;

  // Debugging di Server Terminal
  console.log("Admin Layout Access Check:", {
    userId: user.id,
    role: role,
  });

  if (role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="max-w-md text-center bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Akses Ditolak</h1>
          <p className="text-slate-600 mb-6">
            Akun Anda ({user.emailAddresses[0].emailAddress}) tidak memiliki izin akses admin. 
            Role terdeteksi: <span className="font-mono font-bold">"{String(role)}"</span>
          </p>
          <a href="/" className="px-6 py-2.5 bg-[#2563eb] text-white rounded-lg font-medium hover:bg-blue-700 transition">
            Kembali ke Beranda
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans antialiased text-slate-900">
      {/* Sidebar Navigation */}
      <AdminSidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        {/* Top Header Placeholder (Bisa ditambah breadcrumbs atau profile di sini nanti) */}
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-8 flex items-center justify-between lg:hidden">
          <span className="font-black text-[#2563eb] tracking-tighter text-xl">SOKA ADMIN</span>
          {/* Mobile menu trigger bisa diletakkan di sini */}
        </header>

        <main className="p-4 md:p-8 lg:p-10 flex-grow">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>

        <footer className="py-6 px-8 border-t border-slate-200 text-center text-slate-400 text-xs">
          &copy; {new Date().getFullYear()} PT Soka Utama Niaga. Managed by Admin Dashboard.
        </footer>
      </div>
    </div>
  );
}
