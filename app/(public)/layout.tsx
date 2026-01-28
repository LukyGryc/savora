import type { Metadata } from "next";

import PublicHeader from "@/app/(public)/PublicHeader";
import Footer from "@/components/layout/Footer";
import { isUserLoggedIn } from "@/util/userUtil";
import AppHeader from "../(app)/AppHeader";

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

  return (
    <div
      className={`bg-bg-primary min-h-screen flex flex-col`}
    >
      {isLoggedIn ? <AppHeader /> : <PublicHeader />}
      {children}
      <Footer />
    </div>
  );
}
