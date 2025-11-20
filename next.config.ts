import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. MENINGKATKAN BATAS UPLOAD SERVER ACTION
  experimental: {
    serverActions: {
      // Tingkatkan batas upload (contoh: 10MB)
      bodySizeLimit: '10mb', 
    },
  },

  // 2. KONFIGURASI GAMBAR (Menggantikan 'images.domains')
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // Untuk gambar dummy Unsplash
      },
      {
        protocol: 'https',
        // Ganti 'xxxxxxxx' dengan project ID Supabase Anda (lihat di .env.local)
        // Contoh: 'abcde12345.supabase.co'
        hostname: '**.supabase.co', 
      },
    ],
  },
};

export default nextConfig;