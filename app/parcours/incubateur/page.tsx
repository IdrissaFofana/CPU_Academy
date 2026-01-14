import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { ParcoursDetailPage } from "@/components/parcours/ParcoursDetailPage";
import { Rocket, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Parcours Incubateur / Production++ - CPU Academy",
  description: "Industrialisez votre production et obtenez les certifications nécessaires",
};

export default function IncubateurPage() {
  return (
    <>
      <PageBanner 
        title="Parcours Incubateur / Production++"
        subtitle="Industrialisez votre production et obtenez les certifications nécessaires"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Parcours", href: "/parcours" },
          { label: "Incubateur / Production++" }
        ]}
      />
      <ParcoursDetailPage
        icon={Rocket}
        title="Parcours Incubateur / Production++"
        color="cyan"
        gradient="from-cyan-500 to-cyan-600"
        bgLight="bg-cyan-50"
        borderColor="border-cyan-200"
        textColor="text-cyan-600"
        description="Optimisez vos processus de production, améliorez votre qualité et obtenez les certifications qui valoriseront votre entreprise. De l'artisanat à l'industrie, passez à l'échelle supérieure."
        objectifs={[
          "Optimiser et industrialiser vos processus de production",
          "Mettre en place des systèmes de contrôle qualité",
          "Obtenir des certifications reconnues",
          "Protéger votre propriété intellectuelle",
          "Améliorer votre productivité et votre rentabilité"
        ]}
        pourQui={[
          "Entreprises de production et transformation",
          "Artisans souhaitant s'industrialiser",
          "PME manufacturières",
          "Entreprises cherchant des certifications",
          "Innovateurs et créateurs de produits"
        ]}
        competences={[
          "Optimisation de processus industriels",
          "Gestion de la qualité (ISO, HACCP...)",
          "Lean manufacturing",
          "Gestion de la production",
          "Propriété intellectuelle",
          "Certifications et normes",
          "Innovation produit",
          "Maintenance et amélioration continue"
        ]}
        etapes={[
          {
            numero: 1,
            titre: "Audit Production",
            semaines: 2,
            formations: ["Diagnostic processus", "Identification goulots", "Opportunités"]
          },
          {
            numero: 2,
            titre: "Optimisation",
            semaines: 4,
            formations: ["Standardisation", "Chaîne production", "Investissements"]
          },
          {
            numero: 3,
            titre: "Systèmes Qualité",
            semaines: 5,
            formations: ["Contrôle qualité", "Documentation", "Audits"]
          },
          {
            numero: 4,
            titre: "Certification",
            semaines: 4,
            formations: ["ISO", "HACCP", "Propriété intellectuelle", "Amélioration continue"]
          }
        ]}
        currentParcoursId="incubateur"
        badgeInfo={{
          icon: Star,
          label: "Badge Made in CI Ready"
        }}
        stats={{
          formations: 14,
          duree: "45h",
          niveau: "Intermédiaire à Avancé"
        }}
      />
    </>
  );
}
