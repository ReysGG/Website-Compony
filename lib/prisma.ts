// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const prismaClientSingleton = () => {
  // Hanya jalankan di Server
  if (typeof window !== "undefined") {
    return {} as PrismaClient;
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Transaction Pooler: tiap query pakai 1 koneksi lalu langsung dilepas
    // max:1 cukup untuk serverless — tidak perlu hold multiple connections
    max: 1,
    idleTimeoutMillis: 30000,         // Biarkan idle lebih lama agar tidak putus-nyambung terus
    connectionTimeoutMillis: 15000,   // Berikan waktu 15 detik kalau Supabase sedang "bangun" (Cold Start)
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
  });

  const adapter = new PrismaPg(pool);

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
