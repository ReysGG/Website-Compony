import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Kontak | PT Soka Utama Niaga",
  description: "Informasi kontak dan lokasi PT Soka Utama Niaga",
};

export default function KontakPage() {
  const infoCards = [
    {
      icon: <MapPin className="w-4 h-4" />,
      iconBg: "bg-primary/10",
      iconColor: "text-primary",
      title: "Kantor Pusat",
      content: (
        <p className="text-sm text-slate-600 leading-relaxed">
          Jl. Swadaya Raya, Ruko Swadaya City Square Blok II No.11,
          RT.11/RW.2, Wijaya Kusuma, Grogol Petamburan, Jakarta Barat 11460
        </p>
      ),
    },
    {
      icon: <Phone className="w-4 h-4" />,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
      title: "WhatsApp Langsung",
      content: (
        <div>
          <a
            href="https://wa.me/6281372626818"
            className="text-sm font-bold text-green-600 hover:underline block mb-1"
          >
            081372626818
          </a>
          <p className="text-xs text-slate-400">Respon cepat hari kerja</p>
          <div className="mt-2 space-y-1 text-sm text-slate-600">
            <div>Telp: (021) 5646 149</div>
            <div>Telp: (021) 21254 409</div>
            <div>
              <a href="mailto:info@sokautamaniaga.co.id" className="hover:underline">
                info@sokautamaniaga.co.id
              </a>
            </div>
          </div>
        </div>
      ),
    },
    {
      icon: <Clock className="w-4 h-4" />,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
      title: "Jam Operasional",
      content: (
        <ul className="space-y-2 text-sm text-slate-600">
          <li className="flex justify-between">
            <span>Senin - Jumat</span>
            <span className="font-semibold text-foreground">08:00 - 17:00</span>
          </li>
          <li className="flex justify-between">
            <span>Sabtu</span>
            <span className="font-semibold text-foreground">08:00 - 17:00</span>
          </li>
          <li className="flex justify-between pt-2 border-t border-border text-red-500 font-semibold">
            <span>Minggu / Libur</span>
            <span>Tutup</span>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-card text-foreground font-sans flex flex-col">
      <Navbar />

      {/* Dark Header — menyatukan halaman, konsisten dengan Hero */}
      <section className="bg-foreground text-background pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase block mb-2">
                Kontak
              </span>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-3">
                Hubungi Kami
              </h1>
              <p className="text-slate-400 text-base max-w-xl leading-relaxed">
                Tim kami siap membantu kebutuhan pengadaan alat berat dan suku
                cadang perusahaan Anda. Silakan hubungi kami melalui saluran di
                bawah ini.
              </p>
            </div>
            {/* Mini stats */}
            <div className="flex gap-3 shrink-0">
              {[
                { value: "30+", label: "Tahun Pengalaman" },
                { value: "100%", label: "Tingkat Respon" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 text-center"
                >
                  <div className="text-xl font-black text-white">{s.value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Info Cards — horizontal, compact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {infoCards.map((card, i) => (
              <div
                key={i}
                className="bg-background border border-border rounded-2xl p-6 flex gap-4 items-start"
              >
                <div
                  className={`w-9 h-9 ${card.iconBg} ${card.iconColor} rounded-xl flex items-center justify-center shrink-0`}
                >
                  {card.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-foreground mb-2">
                    {card.title}
                  </h3>
                  {card.content}
                </div>
              </div>
            ))}
          </div>

          {/* Form + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Form */}
            <div className="bg-background border border-border rounded-2xl p-8 md:p-10">
              <h3 className="text-2xl font-bold text-foreground mb-1">
                Kirim Pesan
              </h3>
              <p className="text-slate-500 text-sm mb-7">
                Kami akan membalas dalam 1×24 jam kerja.
              </p>

              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-card text-sm"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-slate-700">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-card text-sm"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">
                    Subjek Pesan
                  </label>
                  <select className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-card text-slate-700 text-sm">
                    <option>Pertanyaan Umum</option>
                    <option>Penawaran Kerja Sama / Promosi</option>
                    <option>Layanan Pelanggan / Keluhan</option>
                    <option>Lainnya</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-bold text-slate-700">
                    Isi Pesan
                  </label>
                  <textarea
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none bg-card text-sm"
                    placeholder="Tuliskan pesan Anda di sini..."
                    required
                  />
                </div>

                {/* Dua CTA: submit + WA langsung */}
                <div className="flex gap-3">
                  <Button className="flex-1 py-6 text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Kirim Pesan
                  </Button>
                  <a
                    href="https://wa.me/6281372626818"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 rounded-xl border border-green-200 bg-green-50 hover:bg-green-100 text-green-700 font-bold text-sm transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WA Kami
                  </a>
                </div>
              </form>
            </div>

            {/* Map */}
            <div className="bg-background border border-border rounded-2xl p-3 flex flex-col gap-3">
              {/* Pin card di atas peta */}
              <div className="bg-card border border-border rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">
                    PT Soka Utama Niaga
                  </div>
                  <div className="text-xs text-slate-400">
                    Grogol Petamburan, Jakarta Barat 11460
                  </div>
                </div>
              </div>

              <div className="flex-1 min-h-[400px] rounded-xl overflow-hidden bg-muted">
                <iframe
                  src="https://maps.google.com/maps?q=Jl.%20Swadaya%20Raya%2C%20Ruko%20Swadaya%20City%20Square%20Blok%20II%20No.11%2C%20RT.11%2FRW.2%2C%20Wijaya%20Kusuma%2C%20Kec.%20Grogol%20petamburan%2C%20Kota%20Jakarta%20Barat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2011460&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi PT Soka Utama Niaga"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}