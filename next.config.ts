import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ["@prisma/client", "prisma"],
  images: {
    remotePatterns: [
      { hostname: "www.sokautamaniaga.co.id" },
      { hostname: "psualatberat.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "www.deere.com" },
      { hostname: "products.unitedtractors.com" },
      { hostname: "qkgipmvvpdjkimqjvoqu.supabase.co" },
    ],
  },
};

export default nextConfig;
