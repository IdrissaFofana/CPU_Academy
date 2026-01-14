import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { ParcoursDetailPage } from "@/components/parcours/ParcoursDetailPage";
import { Wallet } from "lucide-react";

export const metadata: Metadata = {
  title: "Parcours Financement & Bancabilité - CPU Academy",
  description: "Obtenez les financements nécessaires pour développer votre entreprise",
};

export default function FinancementPage() {
  return (
    <>
      <PageBanner 
        title="Parcours Financement & Bancabilité"
        subtitle="Obtenez les financements nécessaires pour développer votre entreprise"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Parcours", href: "/parcours" },
          { label: "Financement & Bancabilité" }
        ]}
      />
      <ParcoursDetailPage
        icon={Wallet}
        title="Parcours Financement & Bancabilité"
        color="purple"
        gradient="from-purple-500 to-purple-600"
        bgLight="bg-purple-50"
        borderColor="border-purple-200"
        textColor="text-purple-600"
        description="Devenez bancable et accédez aux sources de financement adaptées à votre entreprise. Apprenez à monter des dossiers solides, à présenter votre projet aux investisseurs et à gérer efficacement votre trésorerie."
        objectifs={[
          "Comprendre les critères de bancabilité",
          "Élaborer un business plan convaincant",
          "Identifier les sources de financement adaptées",
          "Préparer et présenter un dossier de financement",
          "Négocier avec les banques et investisseurs"
        ]}
        pourQui={[
          "Entrepreneurs cherchant un financement",
          "PME en phase de croissance",
          "Porteurs de projets innovants",
          "Dirigeants souhaitant lever des fonds",
          "Entreprises cherchant à améliorer leur trésorerie"
        ]}
        competences={[
          "Montage de business plans",
          "Analyse financière",
          "Gestion de trésorerie",
          "Relations bancaires",
          "Levée de fonds",
          "Crowdfunding et financement alternatif",
          "Garanties et sûretés",
          "Négociation financière"
        ]}
        etapes={[
          {
            numero: 1,
            titre: "Bancabilité",
            semaines: 3,
            formations: ["Critères bancaires", "Situation financière", "Crédibilité"]
          },
          {
            numero: 2,
            titre: "Montage Dossier",
            semaines: 4,
            formations: ["Business plan", "États financiers", "Dossier complet"]
          },
          {
            numero: 3,
            titre: "Approche Financeurs",
            semaines: 3,
            formations: ["Sources financement", "Pitch deck", "Prise de contact"]
          },
          {
            numero: 4,
            titre: "Négociation",
            semaines: 2,
            formations: ["Conditions financement", "Accords", "Gestion relation"]
          }
        ]}
        currentParcoursId="financement"
        badgeInfo={{
          icon: Wallet,
          label: "Badge Bancable"
        }}
        stats={{
          formations: 10,
          duree: "35h",
          niveau: "Intermédiaire"
        }}
      />
    </>
  );
}
