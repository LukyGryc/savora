import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Savora", template: "%s | Savora" },
  description: "Manage your calendar and events",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="absolute left-4 top-4 z-[100] -translate-y-16 rounded bg-primary px-4 py-2 text-primary-foreground outline-none transition-transform focus:translate-y-0 focus:ring-2 focus:ring-ring"
        >
          Skip to main content
        </a>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
