import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { ParcoursDetailPage } from "@/components/parcours/ParcoursDetailPage";
import { Building, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Parcours Entreprise & Corporate - CPU Academy",
  description: "Solutions de formation adaptées aux grandes entreprises et structures corporates",
};

export default function CorporatePage() {
  return (
    <>
      <PageBanner 
        title="Parcours Entreprise & Corporate"
        subtitle="Solutions de formation adaptées aux grandes entreprises et structures corporates"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Parcours", href: "/parcours" },
          { label: "Entreprise & Corporate" }
        ]}
      />
      <ParcoursDetailPage
        icon={Building}
        title="Parcours Entreprise & Corporate"
        color="blue"
        gradient="from-blue-500 to-blue-600"
        bgLight="bg-blue-50"
        borderColor="border-blue-200"
        textColor="text-blue-600"
        description="Formations sur-mesure pour les grandes entreprises et organisations souhaitant développer les compétences de leurs équipes. Programmes adaptés à vos enjeux stratégiques et opérationnels."
        objectifs={[
          "Développer les compétences de vos équipes à grande échelle",
          "Aligner les formations avec votre stratégie d'entreprise",
          "Améliorer la performance organisationnelle",
          "Accompagner les transformations digitales et managériales",
          "Renforcer la culture d'entreprise et l'engagement"
        ]}
        pourQui={[
          "Directions des ressources humaines",
          "Responsables formation et développement",
          "Directions générales",
          "Managers et chefs de département",
          "Entreprises de plus de 50 collaborateurs"
        ]}
        competences={[
          "Management stratégique",
          "Transformation digitale",
          "Leadership et coaching",
          "Gestion du changement",
          "Performance organisationnelle",
          "Communication interne",
          "Innovation et agilité",
          "Compliance et gouvernance"
        ]}
        etapes={[
          {
            numero: 1,
            titre: "Diagnostic & Analyse",
            semaines: 2,
            formations: ["Évaluation des besoins", "Cartographie des compétences", "Objectifs stratégiques"]
          },
          {
            numero: 2,
            titre: "Conception sur-mesure",
            semaines: 3,
            formations: ["Co-construction", "Adaptation culturelle", "Modalités pédagogiques"]
          },
          {
            numero: 3,
            titre: "Déploiement",
            semaines: 8,
            formations: ["Présentiel", "Distanciel", "Hybride", "Accompagnement"]
          },
          {
            numero: 4,
            titre: "Évaluation & Suivi",
            semaines: 2,
            formations: ["Mesure d'impact", "Ajustements", "Transfert de compétences"]
          }
        ]}
        currentParcoursId="corporate"
        badgeInfo={{
          icon: Shield,
          label: "Badge Corporate Certifié"
        }}
        stats={{
          formations: 22,
          duree: "Sur mesure",
          niveau: "Tous niveaux"
        }}
      />
    </>
  );
}
