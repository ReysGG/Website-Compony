import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Send, MessageCircle } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

export const metadata = {
  title: "Kontak | PT Soka Utama Niaga",
  description: "Informasi kontak dan lokasi PT Soka Utama Niaga sebagai supplier alat berat terpercaya.",
};

export default function KontakPage() {
  const infoCards = [
    {
      icon: <MapPin className="w-5 h-5" />,
      iconBg: "bg-[#2563eb]/10",
      iconColor: "text-[#2563eb]",
      title: "Kantor Pusat",
      content: (
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          Jl. Swadaya Raya, Ruko Swadaya City Square Blok II No.11,
          RT.11/RW.2, Wijaya Kusuma, Grogol Petamburan, Jakarta Barat 11460
        </p>
      ),
    },
    {
      icon: <Phone className="w-5 h-5" />,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      title: "Hubungi Langsung",
      content: (
        <div>
          <a
            href="https://wa.me/6281372626818"
            className="text-base font-black text-green-600 hover:text-green-700 block mb-1 transition-colors"
          >
            081372626818
          </a>
          <p className="text-xs text-slate-400 font-medium mb-3">WhatsApp / Respon Cepat</p>
          <div className="space-y-1.5 text-sm text-slate-600 font-medium border-t border-slate-100 pt-3">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              (021) 5646 149
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              (021) 21254 409
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 shrink-0 flex items-center justify-center text-slate-400 text-[10px] font-bold">@</span>
              <a href="mailto:info@sokautamaniaga.co.id" className="hover:text-[#2563eb] transition-colors">
                info@sokautamaniaga.co.id
              </a>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <Clock className="w-5 h-5" />,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      title: "Jam Operasional",
      content: (
        <ul className="space-y-3 text-sm text-slate-600 font-medium">
          <li className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg">
            <span>Senin - Jumat</span>
            <span className="font-bold text-[#0f172a]">08:00 - 17:00</span>
          </li>
          <li className="flex justify-between items-center bg-slate-50 px-3 py-2 rounded-lg">
            <span>Sabtu</span>
            <span className="font-bold text-[#0f172a]">08:00 - 17:00</span>
          </li>
          <li className="flex justify-between items-center bg-red-50/50 px-3 py-2 rounded-lg border border-red-100 text-red-600">
            <span>Minggu / Libur</span>
            <span className="font-bold">Tutup</span>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-foreground font-sans flex flex-col">
      <Navbar />

      {/* Hero Section Kontak */}
      <section className="bg-[#0f172a] relative overflow-hidden pt-36 pb-16 md:pt-40 md:pb-24">
        {/* Subtle grid pattern for precision/industrial feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <BlurFade delay={0.1}>
                <div className="inline-flex items-center gap-2 bg-white/5 border-l-2 border-[#2563eb] px-3 py-1.5 w-fit mb-6">
                  <span className="text-[10px] font-bold text-[#2563eb] tracking-[0.2em] uppercase">
                    Pusat Bantuan
                  </span>
                </div>
              </BlurFade>
              
              <BlurFade delay={0.2}>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 leading-none">
                  Hubungi Kami
                </h1>
              </BlurFade>
              
              <BlurFade delay={0.3}>
                <p className="text-slate-400 text-lg max-w-xl leading-relaxed font-medium">
                  Tim ahli kami siap membantu kebutuhan pengadaan crane dan suku
                  cadang alat berat khusus proyek berskala nasional Anda.
                </p>
              </BlurFade>
            </div>

            {/* Mini stats */}
            <div className="flex gap-4 shrink-0">
              {[
                { value: "30+", label: "Tahun" },
                { value: "100%", label: "Respon" },
              ].map((s, i) => (
                <BlurFade key={i} delay={0.4 + i * 0.1}>
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-4 text-center hover:bg-white/10 transition-colors">
                    <div className="text-3xl font-black text-white">{s.value}</div>
                    <div className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">{s.label}</div>
                  </div>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="flex-1 py-16 md:py-24 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

          {/* Info Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-32">
            {infoCards.map((card, i) => (
              <BlurFade key={i} delay={0.5 + i * 0.1}>
                <div className="bg-white border border-slate-200 shadow-xl shadow-slate-200/50 rounded-2xl p-6 lg:p-8 flex gap-5 items-start h-full group hover:border-[#2563eb]/50 transition-colors duration-300">
                  <div className={`w-12 h-12 ${card.iconBg} ${card.iconColor} rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-black text-[#0f172a] mb-3">
                      {card.title}
                    </h3>
                    {card.content}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={0.6}>
            <div className="w-full h-px bg-slate-200 my-4" />
          </BlurFade>

          {/* Form & Map Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">

            {/* Message Form Area */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <BlurFade delay={0.7}>
                <div className="mb-8">
                  <h3 className="text-3xl font-black text-[#0f172a] tracking-tight mb-2">
                    Kirim Pesan Cepat
                  </h3>
                  <p className="text-slate-500 font-medium">
                    Kami menjamin balasan resmi dalam 1×24 jam kerja untuk segala kebutuhan quote harga dan ketersediaan crane.
                  </p>
                </div>

                <form className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 outline-none transition-all bg-slate-50/50 hover:bg-white text-sm font-medium placeholder:text-slate-400"
                        placeholder="Cth: Budi Prakoso"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">
                        Email Resmi
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 outline-none transition-all bg-slate-50/50 hover:bg-white text-sm font-medium placeholder:text-slate-400"
                        placeholder="budi@perusahaan.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">
                      Subjek Permintaan
                    </label>
                    <div className="relative">
                      <select className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 outline-none transition-all bg-slate-50/50 hover:bg-white text-sm font-medium text-slate-700 appearance-none cursor-pointer">
                        <option>Permintaan Quotation Harga Unit</option>
                        <option>Ketersediaan Suku Cadang</option>
                        <option>Dukungan Maintenance & Purna Jual</option>
                        <option>Lainnya - Pertanyaan Umum</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">
                      Detail Kebutuhan
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-[#2563eb] focus:ring-4 focus:ring-[#2563eb]/10 outline-none transition-all bg-slate-50/50 hover:bg-white text-sm font-medium resize-none placeholder:text-slate-400"
                      placeholder="Sebutkan merek, spesifikasi, tonase, atau detail permasalahan yang Anda alami..."
                      required
                    />
                  </div>

                  {/* Actions Dual CTA */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button className="flex-1 py-6 text-sm font-bold bg-[#2563eb] text-white hover:bg-[#1d4ed8] hover:shadow-lg hover:shadow-[#2563eb]/30 rounded-xl flex items-center justify-center gap-2 transition-all">
                      <Send className="w-4 h-4" />
                      Kirim Pesan
                    </Button>
                    <a
                      href="https://wa.me/6281372626818"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-green-500 bg-white hover:bg-green-50 text-green-600 font-bold text-sm transition-colors whitespace-nowrap lg:w-fit"
                    >
                      <MessageCircle className="w-4 h-4 fill-green-600/20" />
                      Chat WA
                    </a>
                  </div>
                </form>
              </BlurFade>
            </div>

            {/* Embedded Google Maps Area */}
            <div className="lg:col-span-7 h-full min-h-[500px] flex flex-col">
              <BlurFade delay={0.8} className="h-full">
                <div className="bg-white border border-slate-200 rounded-2xl p-2.5 h-full flex flex-col shadow-sm relative group overflow-hidden">
                  
                  {/* Floating Map Label strictly top-left mapped to brand style */}
                  <div className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.1)] rounded-xl px-5 py-3.5 max-w-[280px]">
                    <div className="flex items-center gap-3 mb-1.5">
                      <div className="w-7 h-7 bg-[#2563eb] rounded flex items-center justify-center">
                        <MapPin className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="font-black text-[#0f172a] text-sm tracking-tight leading-none pt-0.5">PT Soka Utama Niaga</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed pl-10">
                      Ruko Swadaya City Square<br/>Blok II No. 11, Grogol, Jakarta Barat
                    </p>
                  </div>

                  <div className="w-full h-full rounded-xl overflow-hidden bg-slate-100 relative">
                    {/* Placeholder loading state before iframe loads */}
                    <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-slate-200">
                      <MapPin className="w-8 h-8 text-slate-400" />
                    </div>

                    <iframe
                      src="https://maps.google.com/maps?q=Jl.%20Swadaya%20Raya%2C%20Ruko%20Swadaya%20City%20Square%20Blok%20II%20No.11%2C%20RT.11%2FRW.2%2C%20Wijaya%20Kusuma%2C%20Kec.%20Grogol%20petamburan%2C%20Kota%20Jakarta%20Barat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2011460&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      className="absolute inset-0 w-full h-full border-0 grayscale-[20%] contrast-[1.1]"
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Lokasi PT Soka Utama Niaga"
                    />
                  </div>
                </div>
              </BlurFade>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}