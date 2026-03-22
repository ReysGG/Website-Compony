import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PT Soka Utama Niaga | Solusi Kebutuhan Alat Berat & Crane Anda",
  description: "PT Soka Utama Niaga hadir untuk mendukung optimalisasi bisnis dan pekerjaan proyek Anda dengan peralatan konstruksi dan pengangkat berkualitas terbaik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${manrope.variable} ${inter.variable} h-full antialiased scroll-smooth`}
    >
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
