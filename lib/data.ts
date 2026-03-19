export type Product = {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  specifications: Record<string, string>;
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "truck-mobile-crane",
    title: "Truck / Mobile Crane",
    description: "Mobile Crane berkinerja tinggi yang dirancang untuk mobilitas jalan raya dan operasi pengangkatan berat di berbagai lokasi konstruksi.",
    image: "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Mobilitas tinggi di jalan raya maupun area proyek",
      "Kapasitas angkat bervariasi mulai dari 10 Ton hingga 100 Ton",
      "Sistem hidrolik canggih untuk pergerakan mulus",
      "Kabin operator berteknologi ergonomis dan aman"
    ],
    specifications: {
      "Kapasitas Maksimal": "Hingga 100 Ton",
      "Tipe Mesin": "Diesel Turbocharged",
      "Sistem Kemudi": "All-Wheel Steering",
      "Aplikasi": "Konstruksi Gedung, Logistik, Tata Kota"
    }
  },
  {
    id: "p2",
    slug: "rough-terrain-crane",
    title: "Rough Terrain Crane",
    description: "Crane andalan untuk medan ekstrem dan tidak rata. Memiliki handling superior dan efisiensi ruang operasi yang sangat baik.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dbd?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Desain ringkas untuk manuver di area sempit",
      "Roda ban khusus untuk medan off-road (berlumpur/berbatu)",
      "Kemampuan Pick-and-Carry yang andal",
      "Tingkat stabilitas tinggi dengan penyangga (outriggers) otomatis"
    ],
    specifications: {
      "Kapasitas Maksimal": "Hingga 80 Ton",
      "Penggerak": "4x4 Four Wheel Drive",
      "Ground Clearance": "Tinggi untuk medan ekstrem",
      "Aplikasi": "Pertambangan, Proyek Infrastruktur Terpencil"
    }
  },
  {
    id: "p3",
    slug: "crawler-crane",
    title: "Crawler Crane",
    description: "Alat angkat berat stasioner dengan kapasitas masif. Cocok untuk proyek infrastruktur berskala raksasa jangka panjang.",
    image: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?q=80&w=1200&auto=format&fit=crop",
    features: [
      "Kapasitas beban raksasa melebihi 200 Ton",
      "Distribusi bobot sempurna melalui track roda rantai",
      "Mampu bergerak sambil membawa beban penuh (Pick and Carry)",
      "Radius operasi sangat luas dengan boom teleskopik atau lattice"
    ],
    specifications: {
      "Kapasitas Maksimal": "100 - 300 Ton",
      "Sistem Roda": "Track Rantai (Crawler)",
      "Radius Pengangkatan": "Sangat Luas",
      "Aplikasi": "Pembangunan Jembatan, Pembangkit Listrik, Pelabuhan"
    }
  }
];

export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug);
}
