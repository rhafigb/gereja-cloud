import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast"; // Import Library Toast

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gereja Digital & Sistem Arsip Cloud",
  description: "Sistem Informasi Manajemen Arsip Digital dan Website Gereja Berbasis Cloud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${montserrat.variable} font-sans antialiased bg-gray-50`}>
        
        {/* KONFIGURASI GLOBAL NOTIFIKASI (UX PRO) */}
        <Toaster 
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            // Gaya Dasar (Clean White)
            duration: 5000,
            className: '',
            style: {
              background: '#fff',
              color: '#1f2937', // Text Gray-800
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Shadow LG
              padding: '16px',
              borderRadius: '12px',
              fontSize: '14px',
              fontFamily: 'var(--font-montserrat)',
              border: '1px solid #e5e7eb',
            },
            
            // Gaya Sukses (Hijau)
            success: {
              iconTheme: {
                primary: '#10B981',
                secondary: '#ECFDF5',
              },
              style: {
                borderLeft: '4px solid #10B981',
              },
            },
            
            // Gaya Error (Merah)
            error: {
              iconTheme: {
                primary: '#EF4444',
                secondary: '#FEF2F2',
              },
              style: {
                borderLeft: '4px solid #EF4444',
              },
            },
            
            // Gaya Loading (Biru Primary)
            loading: {
              iconTheme: {
                primary: '#1e3a8a',
                secondary: '#E0F2FE',
              },
              style: {
                borderLeft: '4px solid #1e3a8a',
              },
            },
          }}
        />
        
        {children}
      </body>
    </html>
  );
}