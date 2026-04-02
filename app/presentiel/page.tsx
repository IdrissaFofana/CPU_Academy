import type { Metadata } from "next";
import { Suspense } from "react";
import { MapPin, ArrowRight, BookOpen } from "lucide-react";
import { PageBanner } from "@/components/layout/PageBanner";
import { CatalogueContent } from "@/components/catalogue/CatalogueContent";

export const metadata: Metadata = {
  title: "Formations en présentiel - CPU Academy",
  description:
    "Formations professionnelles en salle avec nos experts. Apprenez en groupe, bénéficiez d'une interaction directe avec votre formateur dans nos centres en Côte d'Ivoire.",
};

export default function PresentielPage() {
  return (
    <>
      <PageBanner
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Catalogue", href: "/catalogue" },
          { label: "Présentiel" },
        ]}
        slides={[
          {
            image: "/images/default-formation.jpg",
            title: "Formations en",
            highlight: "présentiel",
            subtitle:
              "Rejoignez nos formations en salle pour une expérience immersive. Interaction directe avec l'expert, travaux pratiques en groupe et mise en réseau avec d'autres professionnels.",
            trustBadges: [
              { icon: "check", color: "green", title: "Apprentissage collaboratif", subtitle: "Échangez en groupe" },
              { icon: "users", color: "orange", title: "Experts certifiés", subtitle: "Formateurs qualifiés" },
              { icon: "building", color: "blue", title: "Centres en CI", subtitle: "Partout en Côte d'Ivoire" },
            ],
            buttons: [
              { label: "Voir les formations", href: "#formations", icon: <BookOpen className="h-5 w-5" /> },
              { label: "Nos centres", href: "/centres-formation", variant: "outline", icon: <MapPin className="h-5 w-5" /> },
            ],
          },
        ]}
      />

      <div id="formations">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
            </div>
          }
        >
          <CatalogueContent
            lockedModalite="presentiel"
            lockedModaliteLabel="Présentiel"
            hideBanner
          />
        </Suspense>
      </div>
    </>
  );
}
