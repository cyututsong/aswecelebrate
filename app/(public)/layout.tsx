// app/(public)/layout.tsx
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-top flex-col">
        {children}
      </main>
      <Footer />
    </>
  );
}