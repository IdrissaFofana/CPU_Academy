import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { ParcoursDetailPage } from "@/components/parcours/ParcoursDetailPage";
import { ShoppingCart, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Parcours Marketplace & Vente - CPU Academy",
  description: "Développez vos ventes en ligne et optimisez votre présence sur les marketplaces",
};

export default function MarketplacePage() {
  return (
    <>
      <PageBanner 
        title="Parcours Marketplace & Vente"
        subtitle="Développez vos ventes en ligne et optimisez votre présence sur les marketplaces"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Parcours", href: "/parcours" },
          { label: "Marketplace & Vente" }
        ]}
      />
      <ParcoursDetailPage
        icon={ShoppingCart}
        title="Parcours Marketplace & Vente"
        color="green"
        gradient="from-green-500 to-green-600"
        bgLight="bg-green-50"
        borderColor="border-green-200"
        textColor="text-green-600"
        description="Exploitez le potentiel du commerce en ligne pour développer vos ventes. Apprenez à vendre efficacement sur les marketplaces et à créer une stratégie e-commerce performante adaptée au marché ivoirien et africain."
        objectifs={[
          "Créer et optimiser votre présence sur les marketplaces",
          "Développer une stratégie e-commerce rentable",
          "Maîtriser les techniques de vente en ligne",
          "Gérer efficacement votre logistique et vos stocks",
          "Fidéliser vos clients et développer votre réputation"
        ]}
        pourQui={[
          "Commerçants souhaitant digitaliser leurs ventes",
          "Producteurs voulant vendre directement en ligne",
          "Entrepreneurs e-commerce débutants",
          "PME cherchant de nouveaux canaux de distribution",
          "Responsables commerciaux"
        ]}
        competences={[
          "Stratégie e-commerce",
          "Gestion de boutiques en ligne",
          "Optimisation de fiches produits",
          "Marketing digital et SEO",
          "Publicité en ligne",
          "Gestion logistique",
          "Service client digital",
          "Analyse de performance"
        ]}
        etapes={[
          {
            numero: 1,
            titre: "Choix Marketplace",
            semaines: 2,
            formations: ["Sélection plateformes", "Spécificités", "Catalogue produits"]
          },
          {
            numero: 2,
            titre: "Création Boutique",
            semaines: 3,
            formations: ["Configuration boutique", "Fiches produits", "Visuels"]
          },
          {
            numero: 3,
            titre: "Marketing Digital",
            semaines: 4,
            formations: ["Campagnes publicitaires", "SEO", "Outils marketing"]
          },
          {
            numero: 4,
            titre: "Gestion & Croissance",
            semaines: 3,
            formations: ["Logistique", "Service client", "Analytics", "Multi-canal"]
          }
        ]}
        currentParcoursId="marketplace"
        badgeInfo={{
          icon: ShoppingBag,
          label: "Badge Vendeur Vérifié"
        }}
        stats={{
          formations: 15,
          duree: "50h",
          niveau: "Débutant à Intermédiaire"
        }}
      />
    </>
  );
}
