import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StatsSection } from "@/components/home/StatsSection";
import { ParcoursSection } from "@/components/home/ParcoursSection";
import { AboutSection } from "@/components/home/FormationsFeatured";
import { ImpactSection } from "@/components/home/ImpactSection";
import { CalendarSection } from "@/components/home/CalendarSection";
import { CertificationsSection } from "@/components/home/CertificationsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { HomeFaqSection } from "@/components/home/HomeFaqSection";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export const metadata: Metadata = {
  metadataBase: new URL('https://cpu-formation.ci'),
  title: "CPU Formation - Plateforme de Formation Professionnelle en Côte d'Ivoire",
  description: "CPU Formation, la plateforme de formation de la Confédération Patronale Unique des PME. 350+ formations certifiantes pour entrepreneurs et professionnels ivoiriens. Développez vos compétences avec nos experts.",
  keywords: [
    "formation professionnelle côte d'ivoire",
    "CPU PME",
    "formation entrepreneur ivoirien",
    "certification professionnelle abidjan",
    "formation en ligne côte d'ivoire",
    "développement compétences PME",
    "formation certifiante côte d'ivoire"
  ],
  openGraph: {
    type: "website",
    locale: "fr_CI",
    url: "https://cpu-formation.ci",
    siteName: "CPU Formation",
    title: "CPU Formation - Formations Certifiantes pour PME Ivoiriennes",
    description: "350+ formations professionnelles pour entrepreneurs et salariés. Certifications reconnues, experts locaux, accompagnement personnalisé.",
    images: [
      {
        url: "/images/cpu-formation-og.jpg",
        width: 1200,
        height: 630,
        alt: "CPU Formation - Formation professionnelle en Côte d'Ivoire"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "CPU Formation - Formations pour PME Ivoiriennes",
    description: "350+ formations certifiantes | Experts du secteur | Accompagnement personnalisé",
    images: ["/images/cpu-formation-og.jpg"]
  },
  alternates: {
    canonical: "https://cpu-formation.ci"
  }
};

export default function HomePage() {
  return (
    <>
      {/* Hero — its own internal animations, no extra wrapper needed */}
      <Hero />

      <AnimateOnScroll variant="fade-up" duration={650}>
        <StatsSection />
      </AnimateOnScroll>

      <AnimateOnScroll variant="fade-up" delay={80} duration={700}>
        <section id="parcours">
          <ParcoursSection />
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll variant="fade-right" delay={0} duration={750}>
        <AboutSection />
      </AnimateOnScroll>

      <AnimateOnScroll variant="zoom" delay={0} duration={800}>
        <ImpactSection />
      </AnimateOnScroll>

      <AnimateOnScroll variant="fade-left" delay={0} duration={750}>
        <section id="calendrier">
          <CalendarSection />
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll variant="fade-up" delay={0} duration={700}>
        <section id="certifications">
          <CertificationsSection />
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll variant="zoom" delay={0} duration={800}>
        <section id="temoignages">
          <TestimonialsSection />
        </section>
      </AnimateOnScroll>

      <AnimateOnScroll variant="fade-up" delay={0} duration={700}>
        <section id="faq">
          <HomeFaqSection />
        </section>
      </AnimateOnScroll>
    </>
  );
}


