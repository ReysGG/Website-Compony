export function History() {
  const milestones = [
    {
      year: "1993",
      title: "Pendirian CV. Soka Makmur",
      description: "Operasional perusahaan dimulai pada tahun 1993 sebagai CV. Soka Makmur, yang berfokus pada penyediaan dan distribusi suku cadang alat berat di kawasan komersial Pasar Mobil Kemayoran, Jakarta."
    },
    {
      year: "2013",
      title: "Transformasi Menjadi Perseroan Terbatas",
      description: "Seiring dengan pertumbuhan volume bisnis dan tingginya tingkat kepercayaan klien skala industri, perusahaan secara resmi meningkatkan entitas hukumnya menjadi PT. Soka Utama Niaga."
    },
    {
      year: "Saat Ini",
      title: "Mitra Strategis Pengadaan Nasional",
      description: "Hingga hari ini, PT. Soka Utama Niaga terus melayani rantai pasok nasional sebagai mitra andalan bagi berbagai perusahaan kontraktor, proyek infrastruktur, dan pertambangan di seluruh Indonesia."
    }
  ];

  return (
    <section id="history" className="py-20 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Sejarah Perusahaan</h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Clean Vertical Line */}
          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-8 py-4">
            {milestones.map((item, idx) => (
              <div key={idx} className="mb-12 ml-10 relative">
                  
                {/* Simple Dot Marker */}
                <div className="absolute -left-[49px] top-1.5 w-4 h-4 bg-blue-600 rounded-full border-[3px] border-slate-50 shadow-sm"></div>
                  
                {/* Standard White Card */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-shadow hover:shadow-md">
                  <span className="inline-block px-4 py-1 rounded bg-blue-50 text-blue-700 font-bold text-sm mb-4">
                    {item.year}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 text-base md:text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
