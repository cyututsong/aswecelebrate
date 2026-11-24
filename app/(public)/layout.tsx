"use client";

import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { usePathname } from "next/navigation";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hideHeaderFooter = ["/login", "/register"].includes(pathname);

  if (hideHeaderFooter) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />

      <main className="min-h-screen flex items-top flex-col">{children}</main>

      <Footer />
    </>
  );
}
