# Arsitektur Database Dinamis (Supabase + Prisma)

Dokumen ini merangkum transformasi website dari data statis (hardcoded) menjadi data dinamis yang dapat dikelola melalui dashboard Admin.

## 1. Skema Database (Supabase)

Telah dibuat 8 tabel utama di Supabase untuk menampung seluruh konten website:

| Tabel | Deskripsi Content | Fitur Utama |
|-------|-----------|-------------|
| `products` | Katalog produk crane | Slug unik, Array fitur, JSON spesifikasi |
| `milestones` | Sejarah/Timeline perusahaan | Icon identifier, Status 'Saat Ini' |
| `director_message` | Sambutan pimpinan | Array paragraf quote, Foto profil |
| `stats` | Angka pencapaian (Counter) | Prefix, Suffix, Nilai integer |
| `company_profile` | Informasi umum PT | Kontak, Alamat, Media Sosial (JSON) |
| `testimonials` | Kepuasan pelanggan | Rating (1-5), Nama, Jabatan |
| `partners` | Logo mitra strategis | Nama & URL Logo |
| `vision_mission` | Visi & Misi perusahaan | Tipe kategori (vision/mission) |

**Keamanan:** Row Level Security (RLS) telah diaktifkan dengan kebijakan `Public Read Access` (Semua orang bisa melihat data, tapi hanya admin yang bisa mengubah melalui dashboard Supabase).

## 2. Integrasi ORM (Prisma)

Project sekarang menggunakan **Prisma** sebagai ORM untuk memudahkan query data dengan tipe data yang aman (Type-safe).

- **Konfigurasi:** Terletak di `prisma/schema.prisma`
- **Generated Client:** Output client berada di `lib/generated/prisma`
- **Instansi Global:** Tersedia di `lib/prisma.ts` untuk digunakan di seluruh aplikasi Next.js.

### Cara Penggunaan di Server Components (Next.js):

```tsx
import { prisma } from "@/lib/prisma";

export default async function Page() {
  // Mengambil data produk secara dinamis
  const allProducts = await prisma.products.findMany({
    orderBy: { order_index: 'asc' }
  });
  
  // Mengambil data statistik
  const companyStats = await prisma.stats.findMany();
  
  return (
    // Render data...
  );
}
```

## 3. Sinkronisasi Data

Jika Anda melakukan perubahan struktur tabel di dashboard Supabase (misal: menambah kolom baru), lakukan langkah berikut:

1. Tarik perubahan ke lokal:
   ```bash
   npx prisma db pull
   ```
2. Regenerasi tipe data TypeScript:
   ```bash
   npx prisma generate
   ```

## 4. Keuntungan Arsitektur Baru

1. **Admin Friendly:** Konten bisa diubah melalui UI Supabase tanpa menyentuh kode.
2. **Type-Safe:** Kesalahan penulisan properti data (seperti `product.titl` vs `product.title`) akan langsung terdeteksi oleh TypeScript.
3. **Performa:** Menggunakan Server Components untuk mengambil data langsung dari database saat request, membuat website tetap cepat dan SEO friendly.
