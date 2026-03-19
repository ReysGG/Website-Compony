export function VisiMisi() {
  return (
    <section className="py-20 bg-white" id="visi-misi">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Visi & Misi Perusahaan</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* VISI - Large Horizontal Bento (2 cols) */}
          <div className="lg:col-span-2">
            <div className="h-full bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12 flex flex-col justify-center transition-shadow hover:shadow-md">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 text-blue-700 mb-6">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl tracking-widest text-slate-500 font-bold mb-3 uppercase">Visi</h3>
              <p className="text-slate-900 text-2xl md:text-3xl leading-snug font-bold">
                "Menjadi perusahaan penyedia alat berat yang paling <span className="text-blue-600">diandalkan dan direkomendasikan</span> berkat kualitas pelayanan dan produk unggul."
              </p>
            </div>
          </div>

          {/* MOTTO - Small Dark Bento (1 col) */}
          <div className="lg:col-span-1">
            <div className="h-full bg-blue-600 rounded-2xl p-8 md:p-12 flex flex-col justify-center text-white shadow-md">
              <div className="relative z-10 flex flex-col items-start h-full justify-between">
                <div>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg uppercase tracking-widest text-blue-200 font-bold mb-2">Motto</h3>
                  <p className="text-white text-2xl md:text-3xl font-bold leading-snug">
                    "Tercepat, Terpercaya,<br/> Berkualitas"
                  </p>
                </div>
                <div className="w-full mt-8 pt-6 border-t border-white/20">
                  <span className="text-blue-100 font-medium">
                    Standar Mutlak Perseroan 
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* MISI - Super Wide Bottom Bento (3 cols) */}
          <div className="lg:col-span-3 mt-2">
             <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12">
               <div className="flex flex-col md:flex-row gap-8 lg:gap-16">
                 {/* Left Title Area */}
                 <div className="w-full md:w-1/4 shrink-0">
                    <h3 className="text-xl uppercase tracking-widest text-blue-600 font-bold mb-2">Misi</h3>
                    <p className="text-slate-600 font-medium">Langkah strategis kami untuk mewujudkan visi perusahaan.</p>
                 </div>
                 
                 {/* Right List Area */}
                 <div className="w-full md:w-3/4">
                   <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                    {[
                      "Menyediakan solusi alat berat secara tepat dan cepat demi kelancaran operasional klien.",
                      "Senantiasa membangun citra perusahaan dan bertindak profesional dalam setiap interaksi.",
                      "Menciptakan pelayanan dan lingkungan pekerjaan yang saling mendukung dan nyaman.",
                      "Berpartisipasi aktif dalam menjaga kelestarian alam dan ramah terhadap lingkungan.",
                      "Menunjang kesuksesan pembangunan Indonesia, khususnya dalam bidang konstruksi dan alat berat.",
                      "Meningkatkan tata kelola dan kompetensi sumber daya manusia secara berkesinambungan."
                    ].map((misi, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="shrink-0 mt-1 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
                          {i + 1}
                        </div>
                        <span className="text-slate-700 text-base leading-relaxed">{misi}</span>
                      </li>
                    ))}
                   </ul>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
