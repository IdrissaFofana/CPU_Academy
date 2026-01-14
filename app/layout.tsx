import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "CPU Academy - Formations pratiques pour PME ivoiriennes",
  description: "Développez les compétences qui font grandir vos activités. Formations pratiques, certifiantes et ancrées dans la réalité des PME ivoiriennes.",
  keywords: ["formation", "PME", "Côte d'Ivoire", "certification", "compétences"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="font-sans antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
