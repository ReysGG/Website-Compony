import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { hostname: "www.sokautamaniaga.co.id" },
      { hostname: "psualatberat.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "www.deere.com" },
    ],
  },
};

export default nextConfig;
