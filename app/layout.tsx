import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
