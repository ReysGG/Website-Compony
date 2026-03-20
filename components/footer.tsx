import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-10 relative overflow-hidden">
      
      {/* Background Dotted Map Element */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none hidden lg:block">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:12px_12px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
        {/* Fake Blue Pins */}
        <div className="absolute top-[30%] left-[20%] w-1.5 h-1.5 bg-[#2563eb] rounded-full shadow-[0_0_10px_rgba(37,99,235,1)]"></div>
        <div className="absolute top-[45%] left-[30%] w-1.5 h-1.5 bg-[#2563eb] rounded-full shadow-[0_0_10px_rgba(37,99,235,1)]"></div>
        <div className="absolute top-[25%] left-[45%] w-1.5 h-1.5 bg-[#2563eb] rounded-full shadow-[0_0_10px_rgba(37,99,235,1)]"></div>
        <div className="absolute top-[40%] left-[65%] w-1.5 h-1.5 bg-[#2563eb] rounded-full shadow-[0_0_10px_rgba(37,99,235,1)]"></div>
        <div className="absolute top-[60%] left-[75%] w-1.5 h-1.5 bg-[#2563eb] rounded-full shadow-[0_0_10px_rgba(37,99,235,1)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Logo & Contact */}
          <div className="space-y-6 lg:pr-8">
            <div className="mb-6 bg-white/95 p-3 rounded-xl shadow-lg inline-block">
              <Image 
                src="https://www.sokautamaniaga.co.id/wp-content/uploads/2021/11/logo-soka-240.png" 
                alt="Logo PT Soka Utama Niaga" 
                width={150}
                height={48}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
            
            <div className="flex items-start gap-4 text-slate-400">
              <MapPin className="w-5 h-5 shrink-0 mt-1 text-slate-300" />
              <p className="text-sm leading-relaxed">
                Jl. Swadaya Raya, Ruko Swadaya City Square<br/>
                Blok II No.11, RT.11/RW.2, Wijaya Kusuma,<br/>
                Kec. Grogol petamburan, Kota Jakarta Barat,<br/>
                Daerah Khusus Ibukota Jakarta 11460
              </p>
            </div>
            
            <div className="space-y-4 text-slate-400 mt-6">
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 shrink-0 text-slate-300" />
                <p className="text-sm">+ (62) (021) 5646 149</p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 shrink-0 text-slate-300" />
                <p className="text-sm">+ (62) (021) 21254 409</p>
              </div>
              <div className="flex items-center gap-4">
                <svg className="w-5 h-5 shrink-0 text-slate-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.002 0h-.002A12.005 12.005 0 000 12.003c0 2.126.549 4.145 1.597 5.946L.108 23.33l5.524-1.446A11.968 11.968 0 0012 24c6.618 0 12-5.385 12-12C24 5.385 18.618 0 12.002 0zm0 22c-1.88 0-3.666-.492-5.263-1.442l-.377-.224-3.238.847.859-3.15-.246-.39A9.973 9.973 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.404-7.258c-.297-.149-1.758-.868-2.03-.967-.271-.1-.47-.149-.668.149-.198.298-.767.967-.94 1.165-.173.198-.346.224-.643.075-.298-.15-1.258-.464-2.396-1.483-.886-.793-1.486-1.773-1.658-2.072-.173-.298-.018-.459.13-.608.134-.134.298-.348.446-.522.148-.174.198-.298.297-.496.1-.198.05-.372-.025-.521-.075-.15-.668-1.613-.915-2.208-.242-.58-.487-.502-.668-.512-.173-.01-.371-.01-.57-.01-.198 0-.52.074-.793.372-.272.298-1.04 1.016-1.04 2.478s1.065 2.875 1.213 3.074c.148.198 2.095 3.198 5.075 4.484.71.306 1.264.49 1.694.628.712.227 1.36.195 1.871.118.572-.086 1.758-.718 2.005-1.414.248-.696.248-1.291.173-1.414-.075-.124-.272-.198-.57-.347z"/>
                </svg>
                <p className="text-sm">081372626818</p>
              </div>
            </div>
          </div>
          
          {/* Column 2: Produk */}
          <div>
             <h3 className="text-lg font-bold text-white mb-6">Produk</h3>
             <ul className="space-y-4 text-sm text-slate-400">
               <li><Link href="#products" className="hover:text-white transition-colors">Mobile/Truck Crane</Link></li>
               <li><Link href="#products" className="hover:text-white transition-colors">Crawler Crane</Link></li>
               <li><Link href="#products" className="hover:text-white transition-colors">Rough Terrain Crane</Link></li>
             </ul>
          </div>

          {/* Column 3: Jam Operasional */}
          <div>
             <h3 className="text-lg font-bold text-white mb-6">Jam Operasional</h3>
             <p className="text-sm text-slate-400">
               Senin - Sabtu : 08:00 – 17:00
             </p>
          </div>

          {/* Column 4: Lokasi Title (Map sits behind it) */}
          <div>
             <h3 className="text-lg font-bold text-white mb-6">Lokasi Kantor</h3>
             <div className="w-full h-40 md:h-48 rounded-xl overflow-hidden shadow-lg border border-slate-700/50">
                <iframe 
                  src="https://maps.google.com/maps?q=Jl.%20Swadaya%20Raya%2C%20Ruko%20Swadaya%20City%20Square%20Blok%20II%20No.11%2C%20RT.11%2FRW.2%2C%20Wijaya%20Kusuma%2C%20Kec.%20Grogol%20petamburan%2C%20Kota%20Jakarta%20Barat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2011460&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi PT Soka Utama Niaga - Grogol Petamburan"
                ></iframe>
             </div>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} PT Soka Utama Niaga. All rights reserved.
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
