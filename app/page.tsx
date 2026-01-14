import { Hero } from "@/components/home/Hero";
import { ParcoursSection } from "@/components/home/ParcoursSection";
import { AboutSection } from "@/components/home/FormationsFeatured";
import { ImpactSection } from "@/components/home/ImpactSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CalendarSection } from "@/components/home/CalendarSection";
import { CertificationsSection } from "@/components/home/CertificationsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ParcoursSection />
      <AboutSection />
      <ImpactSection />
      <TestimonialsSection />
      <CalendarSection />
      <CertificationsSection />
    </>
  );
}

