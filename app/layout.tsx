import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { BottomNavigation } from "@/components/layout/BottomNavigation";
import { CartProvider } from "@/contexts/CartContext";
import { NotificationProvider } from "@/contexts/NotificationContext";

// Configuration des polices Google Fonts
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({ 
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CPU Formation - Formations pratiques pour PME ivoiriennes",
  description: "Développez les compétences qui font grandir vos activités. Formations pratiques, certifiantes et ancrées dans la réalité des PME ivoiriennes.",
  keywords: ["formation", "PME", "Côte d'Ivoire", "certification", "compétences"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased bg-white text-gray-900">
        <NotificationProvider>
          <CartProvider>
            <ScrollProgress />
            <AnnouncementBar />
            <Navbar />
            <main className="min-h-screen pb-16 lg:pb-0">
              {children}
            </main>
            <Footer />
            <StickyCTA />
            <BottomNavigation />
          </CartProvider>
        </NotificationProvider>
      </body>
    </html>
  );
}

