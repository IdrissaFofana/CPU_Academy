import type { Metadata } from "next";
import { Suspense } from "react";
import { BookOpen, PlayCircle } from "lucide-react";
import { PageBanner } from "@/components/layout/PageBanner";
import { CatalogueContent } from "@/components/catalogue/CatalogueContent";

export const metadata: Metadata = {
  title: "Formations à son rythme - CPU Academy",
  description:
    "Apprenez à votre propre rythme avec nos formations e-learning. Accédez aux contenus 24h/24, avancez selon votre disponibilité et obtenez votre certification en ligne.",
};

export default function ASonRythmePage() {
  return (
    <>
      <PageBanner
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Catalogue", href: "/catalogue" },
          { label: "À son rythme" },
        ]}
        slides={[
          {
            image: "/images/default-formation.jpg",
            title: "Formez-vous",
            highlight: "à votre rythme",
            subtitle:
              "Nos formations e-learning sont accessibles 24h/24, 7j/7. Progressez à votre propre vitesse et obtenez votre certificat en ligne, sans contrainte de déplacement.",
            trustBadges: [
              { icon: "check", color: "green", title: "Disponible 24h/24", subtitle: "Accès illimité au contenu" },
              { icon: "users", color: "orange", title: "À votre rythme", subtitle: "Avancez librement" },
              { icon: "building", color: "blue", title: "100 % en ligne", subtitle: "Aucun déplacement requis" },
            ],
            buttons: [
              { label: "Voir les formations", href: "#formations", icon: <BookOpen className="h-5 w-5" /> },
              { label: "Catalogue complet", href: "/catalogue", variant: "outline", icon: <PlayCircle className="h-5 w-5" /> },
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
            lockedModalite="a_son_rythme"
            lockedModaliteLabel="À son rythme"
            hideBanner
          />
        </Suspense>
      </div>
    </>
  );
}
