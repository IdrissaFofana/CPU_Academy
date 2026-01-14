import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { ParcoursDetailPage } from "@/components/parcours/ParcoursDetailPage";
import { Briefcase, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Parcours Accès Marchés (AO) - CPU Academy",
  description: "Maîtrisez les appels d'offres et remportez plus de marchés publics et privés",
};

export default function MarchesPage() {
  return (
    <>
      <PageBanner 
        title="Parcours Accès Marchés (AO)"
        subtitle="Maîtrisez les appels d'offres et remportez plus de marchés publics et privés"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Parcours", href: "/parcours" },
          { label: "Accès Marchés (AO)" }
        ]}
      />
      <ParcoursDetailPage
        icon={Briefcase}
        title="Parcours Accès Marchés (AO)"
        color="indigo"
        gradient="from-indigo-500 to-indigo-600"
        bgLight="bg-indigo-50"
        borderColor="border-indigo-200"
        textColor="text-indigo-600"
        description="Développez votre expertise en appels d'offres et augmentez significativement vos chances de remporter des marchés publics et privés. De l'analyse du dossier à la soumission, maîtrisez chaque étape du processus."
        objectifs={[
          "Comprendre les procédures d'appels d'offres publics et privés",
          "Analyser efficacement un dossier d'AO",
          "Rédiger des offres techniques et financières gagnantes",
          "Éviter les erreurs d'élimination",
          "Optimiser vos prix tout en restant compétitif"
        ]}
        pourQui={[
          "PME souhaitant accéder aux marchés publics",
          "Entrepreneurs ciblant les grands comptes",
          "Responsables commerciaux",
          "Chefs de projets",
          "Consultants et prestataires de services"
        ]}
        competences={[
          "Analyse de dossiers d'AO",
          "Rédaction d'offres techniques",
          "Budgétisation et chiffrage",
          "Conformité administrative",
          "Stratégie de réponse",
          "Négociation contractuelle",
          "Gestion de projets AO",
          "Veille et sourcing d'opportunités"
        ]}
        etapes={[
          {
            numero: 1,
            titre: "Veille & Sourcing",
            semaines: 2,
            formations: ["Identification AO", "Plateformes marchés", "Analyse secteur"]
          },
          {
            numero: 2,
            titre: "Analyse & Décision",
            semaines: 3,
            formations: ["Critères éligibilité", "Capacité réponse", "Sélection stratégique"]
          },
          {
            numero: 3,
            titre: "Préparation Offre",
            semaines: 4,
            formations: ["Dossier administratif", "Offre technique", "Offre financière"]
          },
          {
            numero: 4,
            titre: "Soumission & Suivi",
            semaines: 2,
            formations: ["Procédures soumission", "Négociation", "Retour expérience"]
          }
        ]}
        currentParcoursId="marches"
        badgeInfo={{
          icon: FileText,
          label: "Badge Prêt pour AO"
        }}
        stats={{
          formations: 12,
          duree: "40h",
          niveau: "Intermédiaire"
        }}
      />
    </>
  );
}
