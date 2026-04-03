import "./globals.css";
import Navbar from "@/components/Navbar";
import type { ReactNode } from "react";

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-10">
          {children}
        </main>
      </body>
    </html>
  );
}