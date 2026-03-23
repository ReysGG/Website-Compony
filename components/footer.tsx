import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Mail } from "lucide-react";
import { getCompanyProfile, getPublicProducts } from "@/lib/queries/public-cache";

// Social media icons as inline SVGs (no extra dependency)
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12.002 0h-.002A12.005 12.005 0 000 12.003c0 2.126.549 4.145 1.597 5.946L.108 23.33l5.524-1.446A11.968 11.968 0 0012 24c6.618 0 12-5.385 12-12C24 5.385 18.618 0 12.002 0zm0 22c-1.88 0-3.666-.492-5.263-1.442l-.377-.224-3.238.847.859-3.15-.246-.39A9.973 9.973 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10z" />
    </svg>
  );
}

export async function Footer() {
  const [profile, products] = await Promise.all([
    getCompanyProfile(),
    getPublicProducts(),
  ]);

  const companyName = profile?.name ?? "PT Soka Utama Niaga";
  const address = profile?.address ?? "Jl. Swadaya Raya, Ruko Swadaya City Square Blok II No.11, Wijaya Kusuma, Grogol Petamburan, Jakarta Barat 11460";
  const phone = profile?.phone ?? null;
  const email = profile?.email ?? null;

  // Parse social_media JSON — values are usernames, NOT full URLs
  const sm = (profile?.social_media as Record<string, string> | null) ?? {};
  const igUsername  = sm?.instagram?.trim() || null;
  const fbUsername  = sm?.facebook?.trim()  || null;
  const liUsername  = sm?.linkedin?.trim()  || null;
  const waNumber    = sm?.whatsapp?.trim() ?? sm?.wa?.trim() ?? null;

  const waHref = waNumber
    ? `https://wa.me/${waNumber.replace(/\D/g, "").replace(/^0/, "62")}`
    : null;

  const hasSocial = !!(igUsername || fbUsername || liUsername || waNumber);

  const socialLinks = [
    { href: igUsername ? `https://instagram.com/${igUsername}` : null, label: "Instagram", icon: <InstagramIcon /> },
    { href: fbUsername ? `https://facebook.com/${fbUsername}`  : null, label: "Facebook",  icon: <FacebookIcon /> },
    { href: liUsername ? `https://linkedin.com/company/${liUsername}` : null, label: "LinkedIn",  icon: <LinkedInIcon /> },
    { href: waHref, label: "WhatsApp", icon: <WhatsAppIcon /> },
  ].filter((s) => !!s.href);

  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-10 relative overflow-hidden">

      {/* Background dots */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none hidden lg:block">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-size-[12px_12px] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />
        {[[30, 20], [45, 30], [25, 45], [40, 65], [60, 75]].map(([top, left], i) => (
          <div key={i} className="absolute w-1.5 h-1.5 bg-[#2563eb] rounded-full shadow-[0_0_10px_rgba(37,99,235,1)]"
            style={{ top: `${top}%`, left: `${left}%` }} />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Column 1: Logo & Contact */}
          <div className="space-y-5 lg:pr-4">
            <div className="bg-white/95 p-3 rounded-xl shadow-lg inline-block">
              <Image
                src="https://www.sokautamaniaga.co.id/wp-content/uploads/2021/11/logo-soka-240.png"
                alt={`Logo ${companyName}`}
                width={150}
                height={48}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>

            {address && (
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-slate-300" />
                <p className="text-sm leading-relaxed">{address}</p>
              </div>
            )}

            <div className="flex flex-col gap-2.5 text-slate-400">
              {phone && (
                <a href={`tel:${phone}`} className="flex items-center gap-3 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 shrink-0 text-slate-300" />
                  <span className="text-sm">{phone}</span>
                </a>
              )}
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 shrink-0 text-slate-300" />
                  <span className="text-sm">{email}</span>
                </a>
              )}
            </div>

            {/* Social media icons */}
            {hasSocial && (
              <div className="flex items-center gap-3 pt-1">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-all"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Produk */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Produk</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              {products.length > 0 ? (
                products.slice(0, 6).map((p) => (
                  <li key={p.id}>
                    <Link href={`/produk/${p.slug}`} className="hover:text-white transition-colors">
                      {p.title}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li><Link href="/produk" className="hover:text-white transition-colors">Mobile/Truck Crane</Link></li>
                  <li><Link href="/produk" className="hover:text-white transition-colors">Crawler Crane</Link></li>
                  <li><Link href="/produk" className="hover:text-white transition-colors">Rough Terrain Crane</Link></li>
                </>
              )}
            </ul>
          </div>

          {/* Column 3: Navigasi */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/produk" className="hover:text-white transition-colors">Produk</Link></li>
              <li><Link href="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link href="/kontak" className="hover:text-white transition-colors">Kontak</Link></li>
            </ul>

            <div className="mt-6 pt-5 border-t border-slate-800">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Jam Operasional</p>
              <p className="text-sm text-slate-400">Senin – Sabtu</p>
              <p className="text-sm text-slate-400">08:00 – 17:00 WIB</p>
            </div>
          </div>

          {/* Column 4: Lokasi */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-5 uppercase tracking-wider">Lokasi Kantor</h3>
            <div className="w-full h-44 rounded-xl overflow-hidden shadow-lg border border-slate-700/50">
              <iframe
                src="https://maps.google.com/maps?q=Jl.%20Swadaya%20Raya%2C%20Ruko%20Swadaya%20City%20Square%20Blok%20II%20No.11%2C%20RT.11%2FRW.2%2C%20Wijaya%20Kusuma%2C%20Kec.%20Grogol%20petamburan%2C%20Kota%20Jakarta%20Barat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2011460&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Lokasi ${companyName}`}
              />
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-slate-500">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
