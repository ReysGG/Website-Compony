import Link from "next/link";
import { Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#070b19] text-white pt-20 pb-10 border-t-4 border-blue-600 relative overflow-hidden">
      
      {/* Background Dotted Map Element */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none hidden lg:block">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:12px_12px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
        {/* Fake Blue Pins */}
        <div className="absolute top-[30%] left-[20%] w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
        <div className="absolute top-[45%] left-[30%] w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
        <div className="absolute top-[25%] left-[45%] w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
        <div className="absolute top-[40%] left-[65%] w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
        <div className="absolute top-[60%] left-[75%] w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Logo & Contact */}
          <div className="space-y-6 lg:pr-8">
            <div className="mb-6 bg-white/95 p-3 rounded-xl shadow-lg inline-block">
              <img 
                src="https://www.sokautamaniaga.co.id/wp-content/uploads/2021/11/logo-soka-240.png" 
                alt="Logo PT Soka Utama Niaga" 
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
            
            <div className="flex items-start gap-4 text-slate-400">
              <MapPin className="w-5 h-5 shrink-0 mt-1 text-slate-300" />
              <p className="text-sm leading-relaxed">
                Jl. Swadaya Raya Ruko<br/>
                Swadaya Square Blok 2 No.11<br/>
                Grogol Petamburan, Jakarta Barat
              </p>
            </div>
            
            <div className="flex items-center gap-4 text-slate-400 mt-4">
              <Phone className="w-5 h-5 shrink-0 text-slate-300" />
              <div className="text-sm space-y-1">
                <p>+ (62) (021) 5646 149</p>
                <p>+ (62) (021) 21254 409</p>
                <p>081372626818</p>
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
             <h3 className="text-lg font-bold text-white mb-6">Lokasi</h3>
             {/* Map visual is absolute anchored to the footer container globally */}
             <div className="lg:hidden h-32 relative mt-4 opacity-40">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:10px_10px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>
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
