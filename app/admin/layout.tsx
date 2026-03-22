import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
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
    <div className="flex min-h-screen bg-[#f7f9fb] font-sans antialiased text-[#191c1e]">
      {/* SideNavBar (Authority Source) */}
      <AdminSidebar />
      
      {/* Main Content Shell */}
      <main className="lg:ml-64 flex-1 min-h-screen flex flex-col">
        {/* TopNavBar */}
        <header className="fixed top-0 right-0 lg:w-[calc(100%-16rem)] w-full z-30 bg-white/80 backdrop-blur-xl flex justify-between items-center h-16 px-8 shadow-sm border-b border-slate-200">
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </span>
              <input 
                className="pl-10 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-blue-500/20 w-64" 
                placeholder="Search data..." 
                type="text"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden border border-blue-200">
               <UserButton appearance={{ elements: { userButtonAvatarBox: "h-8 w-8" } }} />
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="pt-24 px-6 md:px-10 pb-12">
          {children}
        </div>

        <footer className="mt-auto py-6 px-10 border-t border-slate-200 text-slate-400 text-xs flex justify-between items-center bg-white/50">
          <span>&copy; {new Date().getFullYear()} PT Soka Utama Niaga. Executive Portal.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
