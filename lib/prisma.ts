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
    // Tambahkan pengaturan pool untuk Supabase jika perlu
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
  
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({ 
    adapter,
    log: ["query", "error", "warn"] 
  });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
