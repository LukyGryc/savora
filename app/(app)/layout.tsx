import type { Metadata } from "next";
import "../../app/globals.css";
import AppHeader from "@/app/(app)/AppHeader";
import Footer from "@/components/layout/Footer";
import { isUserLoggedIn } from "@/server/users";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | Savora",
    default: "Savora",
  },
  description: "Manage your calendar and events",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const isLoggedIn = await isUserLoggedIn();

  if (!isLoggedIn) {
    redirect("/signin");
  }

  return (
    <div
      className={`bg-bg-primary min-h-screen flex flex-col`}
    >
      <AppHeader />
      <main id="main-content" className="flex-1 flex" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
}
