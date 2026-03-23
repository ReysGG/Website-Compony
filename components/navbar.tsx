"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignUpButton, Show, UserButton, useUser } from "@clerk/nextjs";
import { Menu, X, LogIn, UserPlus, LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

export function Navbar() {
  const { user, isLoaded } = useUser();
  // Gunakan optional chaining dan pastikan perbandingannya aman
  const isAdmin = isLoaded && user?.publicMetadata?.role === 'admin';
  
  // Debugging
  useEffect(() => {
    if (isLoaded && user) {
      console.log("Clerk User Metadata:", user.publicMetadata);
    }
  }, [user, isLoaded]);

  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false); // Hide on scroll down
      } else {
        setVisible(true); // Show on scroll up
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Produk", href: "/produk" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Kontak", href: "/kontak" },
  ];

  if (isAdmin) {
    navLinks.push({ name: "Dashboard", href: "/admin" });
  }

  const isHomePage = pathname === "/";
  
  // Perbaikan styling: menggunakan text-white atau slate agar kontras dengan bg gelap
  const navbarClasses = scrolled || !isHomePage
    ? "bg-[#0f172a] border-b border-[#2563eb]/30 shadow-md py-3 backdrop-blur-sm"
    : "bg-transparent py-5";

  const transformClass = visible ? "translate-y-0" : "-translate-y-full";

  return (
    <>
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${navbarClasses} ${transformClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12"> {/* Sedikit diperbesar height-nya */}
          
          {/* Logo - Dibuat lebih clean tanpa scale yang menggeser layout */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" aria-label="PT Soka Utama Niaga - Beranda" className="transition-opacity duration-300 hover:opacity-80 bg-white/90 rounded-md px-2 py-1">
              <Image 
                src="https://www.sokautamaniaga.co.id/wp-content/uploads/2021/11/logo-soka-240.png" 
                alt="Logo PT Soka Utama Niaga" 
                width={120}
                height={40}
                className="h-8 md:h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  // Perbaikan Typografi & Warna
                  className={`text-sm font-semibold tracking-wide uppercase transition-all duration-200 border-b-2 py-1 ${
                    isActive 
                      ? "text-white border-[#2563eb]" 
                      : "text-slate-300 border-transparent hover:text-white hover:border-[#2563eb]/50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            
            {/* Auth Buttons Desktop */}
            <div className="flex items-center gap-4 pl-4 border-l border-slate-700">
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white bg-[#2563eb] hover:bg-[#1d4ed8] px-3 py-1.5 rounded-md transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                    <LogIn className="h-3.5 w-3.5" /> Masuk
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-300 hover:text-white border border-slate-700 hover:border-[#2563eb] px-3 py-1.5 rounded-md transition-all">
                    <UserPlus className="h-3.5 w-3.5" /> Daftar
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <UserButton appearance={{ elements: { userButtonAvatarBox: "h-8 w-8 border-2 border-[#2563eb]" } }}>
                  {isAdmin && (
                    <UserButton.MenuItems>
                      <UserButton.Link
                        label="Dashboard Admin"
                        labelIcon={<LayoutDashboard className="h-4 w-4" />}
                        href="/admin"
                      />
                    </UserButton.MenuItems>
                  )}
                </UserButton>
              </Show>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={isOpen}
              className="text-slate-200 hover:text-white p-2 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown dengan transisi halus */}
      <div 
        className={`lg:hidden absolute top-full left-0 w-full bg-[#0f172a] shadow-xl border-b-2 border-[#2563eb] overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 flex flex-col items-start space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`w-full px-4 py-3 rounded-md text-sm font-semibold uppercase tracking-wide transition-colors ${
                  isActive 
                    ? "bg-[#2563eb] text-white" 
                    : "text-slate-300 hover:bg-[#1e293b] hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          
          {/* Auth Buttons Mobile */}
          <div className="w-full pt-4 mt-2 border-t border-slate-800 flex flex-col gap-3">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="flex items-center justify-center gap-2 w-full py-3 bg-[#2563eb] text-white rounded-md font-bold uppercase text-[10px] tracking-wider">
                  <LogIn className="h-4 w-4" /> Masuk
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="flex items-center justify-center gap-2 w-full py-3 border border-slate-700 text-slate-300 hover:text-white rounded-md font-bold uppercase text-[10px] tracking-wider">
                  <UserPlus className="h-4 w-4" /> Daftar
                </button>
              </SignUpButton>
            </Show>
            <Show when="signed-in">
              <div className="flex items-center gap-4 p-3 bg-slate-900/50 rounded-lg w-full">
                <UserButton showName appearance={{ elements: { userButtonBox: "flex-row-reverse w-full justify-between", userButtonOuterIdentifier: "text-white font-semibold" } }}>
                  {isAdmin && (
                    <UserButton.MenuItems>
                      <UserButton.Link
                        label="Dashboard Admin"
                        labelIcon={<LayoutDashboard className="h-4 w-4" />}
                        href="/admin"
                      />
                    </UserButton.MenuItems>
                  )}
                </UserButton>
              </div>
            </Show>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}