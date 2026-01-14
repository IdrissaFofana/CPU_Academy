import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { ParcoursDetailPage } from "@/components/parcours/ParcoursDetailPage";
import { Lightbulb, Star } from "lucide-react";

export const metadata: Metadata = {
  title: "Parcours Entrepreneur & PME - CPU Academy",
  description: "Développez votre entreprise avec des compétences entrepreneuriales solides",
};

export default function EntrepreneurPage() {
  return (
    <>
      <PageBanner 
        title="Parcours Entrepreneur & PME"
        subtitle="Développez votre entreprise avec des compétences entrepreneuriales solides"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Parcours", href: "/parcours" },
          { label: "Entrepreneur & PME" }
        ]}
      />
      <ParcoursDetailPage
        icon={Lightbulb}
        title="Parcours Entrepreneur & PME"
        color="orange"
        gradient="from-orange-500 to-orange-600"
        bgLight="bg-orange-50"
        borderColor="border-orange-200"
        textColor="text-orange-600"
        description="Développez les compétences essentielles pour créer, gérer et faire croître votre PME en Côte d'Ivoire. De l'idée à la réalisation, ce parcours vous accompagne dans toutes les étapes de votre aventure entrepreneuriale."
        objectifs={[
          "Structurer et formaliser votre projet d'entreprise",
          "Maîtriser les fondamentaux de la gestion d'une PME",
          "Développer une stratégie de croissance durable",
          "Comprendre les enjeux financiers et juridiques",
          "Créer un réseau professionnel solide"
        ]}
        pourQui={[
          "Porteurs de projets souhaitant créer leur entreprise",
          "Entrepreneurs en phase de démarrage (0-3 ans)",
          "Dirigeants de PME cherchant à structurer leur activité",
          "Repreneurs d'entreprises",
          "Auto-entrepreneurs souhaitant passer à l'échelle"
        ]}
        competences={[
          "Élaboration de business plan",
          "Gestion financière et comptable",
          "Marketing et développement commercial",
          "Management d'équipe",
          "Conformité juridique et fiscale",
          "Stratégie de croissance",
          "Gestion des risques",
          "Innovation et adaptation"
        ]}
        etapes={[
          {
            numero: 1,
            titre: "Idéation & Business Model",
            semaines: 3,
            formations: ["Étude de marché", "Canvas business model", "Proposition de valeur"]
          },
          {
            numero: 2,
            titre: "Formalisation juridique",
            semaines: 2,
            formations: ["Formes juridiques", "Démarches administratives", "Fiscalité de base"]
          },
          {
            numero: 3,
            titre: "Gestion financière",
            semaines: 4,
            formations: ["Comptabilité", "Trésorerie", "Budget prévisionnel"]
          },
          {
            numero: 4,
            titre: "Marketing & Ventes",
            semaines: 4,
            formations: ["Stratégie marketing", "Techniques de vente", "Fidélisation"]
          },
          {
            numero: 5,
            titre: "Management & RH",
            semaines: 3,
            formations: ["Recrutement", "Leadership", "Gestion d'équipe"]
          },
          {
            numero: 6,
            titre: "Digital & Croissance",
            semaines: 4,
            formations: ["Présence en ligne", "E-commerce", "Scaling"]
          }
        ]}
        currentParcoursId="entrepreneur"
        badgeInfo={{
          icon: Star,
          label: "Badge Entrepreneur Certifié"
        }}
        stats={{
          formations: 18,
          duree: "60h",
          niveau: "Débutant à Intermédiaire"
        }}
      />
    </>
  );
}
