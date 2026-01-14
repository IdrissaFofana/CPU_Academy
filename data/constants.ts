import { ParcoursType, Region, Certification } from "@/types";

// Données des parcours
export const parcours: { type: ParcoursType; description: string; icon: string; color: string }[] = [
  {
    type: "Accès Marchés (AO)",
    description: "Maîtrisez les appels d'offres et remportez plus de marchés",
    icon: "briefcase",
    color: "blue"
  },
  {
    type: "Vente & Marketplace",
    description: "Développez vos ventes en ligne et offline",
    icon: "shopping-cart",
    color: "green"
  },
  {
    type: "Financement & Bancabilité",
    description: "Obtenez les financements pour votre croissance",
    icon: "banknote",
    color: "purple"
  },
  {
    type: "Production++ (Qualité, certif, PI)",
    description: "Industrialisez et certifiez votre production",
    icon: "factory",
    color: "orange"
  },
  {
    type: "Pilotage & Data",
    description: "Pilotez votre entreprise par les données",
    icon: "bar-chart",
    color: "cyan"
  },
  {
    type: "Leadership & RH",
    description: "Développez votre leadership et gérez vos équipes",
    icon: "users",
    color: "pink"
  }
];

// Régions de Côte d'Ivoire
export const regions: Region[] = [
  {
    id: "abidjan",
    nom: "Abidjan",
    code: "AB",
    villes: ["Abidjan", "Bingerville", "Anyama"],
    coordonnees: { lat: 5.3600, lng: -4.0083 }
  },
  {
    id: "yamoussoukro",
    nom: "Yamoussoukro",
    code: "YS",
    villes: ["Yamoussoukro"],
    coordonnees: { lat: 6.8276, lng: -5.2893 }
  },
  {
    id: "bouake",
    nom: "Bouaké",
    code: "BK",
    villes: ["Bouaké", "Sakassou", "Béoumi"],
    coordonnees: { lat: 7.6900, lng: -5.0300 }
  },
  {
    id: "san-pedro",
    nom: "San-Pédro",
    code: "SP",
    villes: ["San-Pédro", "Sassandra"],
    coordonnees: { lat: 4.7485, lng: -6.6363 }
  },
  {
    id: "korhogo",
    nom: "Korhogo",
    code: "KH",
    villes: ["Korhogo", "Ferkessédougou"],
    coordonnees: { lat: 9.4580, lng: -5.6290 }
  },
  {
    id: "daloa",
    nom: "Daloa",
    code: "DL",
    villes: ["Daloa", "Issia", "Vavoua"],
    coordonnees: { lat: 6.8900, lng: -6.4500 }
  },
  {
    id: "man",
    nom: "Man",
    code: "MN",
    villes: ["Man", "Danané", "Biankouma"],
    coordonnees: { lat: 7.4125, lng: -7.5544 }
  }
];

// Certifications disponibles
export const certifications: Certification[] = [
  {
    id: "pret-ao",
    nom: "Prêt AO",
    badge: "/badges/pret-ao.svg",
    description: "Certifié pour répondre aux appels d'offres publics",
    formationsRequises: ["ao-fondamentaux", "ao-redaction", "ao-budgetisation"],
    competencesValidees: ["Analyse AO", "Rédaction offre", "Budgétisation"],
    exemple: "/certificats/exemple-ao.pdf"
  },
  {
    id: "bancable",
    nom: "Bancable",
    badge: "/badges/bancable.svg",
    description: "Profil financier optimisé pour l'obtention de crédits",
    formationsRequises: ["finance-fondamentaux", "business-plan", "negociation-bancaire"],
    competencesValidees: ["Business Plan", "Analyse financière", "Négociation"],
    exemple: "/certificats/exemple-bancable.pdf"
  },
  {
    id: "vendeur-pret",
    nom: "Vendeur Prêt",
    badge: "/badges/vendeur-pret.svg",
    description: "Techniques de vente modernes maîtrisées",
    formationsRequises: ["vente-techniques", "marketplace-setup", "marketing-digital"],
    competencesValidees: ["Vente", "Marketing digital", "E-commerce"],
    exemple: "/certificats/exemple-vendeur.pdf"
  },
  {
    id: "qualite-normes",
    nom: "Qualité & Normes",
    badge: "/badges/qualite-normes.svg",
    description: "Systèmes qualité et normes internationales",
    formationsRequises: ["qualite-fondamentaux", "iso-9001", "certification-produits"],
    competencesValidees: ["Gestion Qualité", "Normes ISO", "Certification"],
    exemple: "/certificats/exemple-qualite.pdf"
  }
];

// Objectifs métier avec actions liées
export const objectifsMetier = [
  {
    label: "Gagner des marchés",
    value: "Gagner des marchés",
    module: "AO",
    action: "Préparer une soumission",
    actionUrl: "/hub/ao/nouvelle-soumission"
  },
  {
    label: "Vendre +",
    value: "Vendre +",
    module: "Marketplace",
    action: "Créer boutique",
    actionUrl: "/hub/marketplace/creer-boutique"
  },
  {
    label: "Obtenir financement",
    value: "Obtenir financement",
    module: "Financement",
    action: "Démarrer une demande",
    actionUrl: "/hub/financement/nouvelle-demande"
  },
  {
    label: "Industrialiser",
    value: "Industrialiser",
    module: "Incubateur",
    action: "Démarrer parcours Production++",
    actionUrl: "/hub/incubateur/production"
  },
  {
    label: "Digitaliser",
    value: "Digitaliser",
    module: "Data",
    action: "Construire mes KPI",
    actionUrl: "/hub/data/kpi"
  },
  {
    label: "Piloter",
    value: "Piloter",
    module: "Data",
    action: "Tableau de bord",
    actionUrl: "/hub/data/dashboard"
  }
];

// Compétences par catégorie
export const competences = [
  {
    categorie: "Vente & Commercial",
    items: [
      { id: "vente-btob", nom: "Vente BtoB" },
      { id: "vente-btoc", nom: "Vente BtoC" },
      { id: "negociation", nom: "Négociation commerciale" },
      { id: "prospection", nom: "Prospection" },
      { id: "marketing-digital", nom: "Marketing digital" }
    ]
  },
  {
    categorie: "Finance & Gestion",
    items: [
      { id: "comptabilite", nom: "Comptabilité" },
      { id: "gestion-financiere", nom: "Gestion financière" },
      { id: "business-plan", nom: "Business plan" },
      { id: "analyse-financiere", nom: "Analyse financière" },
      { id: "bancabilite", nom: "Bancabilité" }
    ]
  },
  {
    categorie: "Marchés publics",
    items: [
      { id: "analyse-ao", nom: "Analyse appels d'offres" },
      { id: "redaction-offre", nom: "Rédaction d'offres" },
      { id: "budgetisation", nom: "Budgétisation" },
      { id: "reglementation-marches", nom: "Réglementation marchés publics" }
    ]
  },
  {
    categorie: "Production & Qualité",
    items: [
      { id: "gestion-qualite", nom: "Gestion de la qualité" },
      { id: "normes-iso", nom: "Normes ISO" },
      { id: "gestion-production", nom: "Gestion de production" },
      { id: "amelioration-continue", nom: "Amélioration continue" }
    ]
  },
  {
    categorie: "Management & RH",
    items: [
      { id: "leadership", nom: "Leadership" },
      { id: "gestion-equipe", nom: "Gestion d'équipe" },
      { id: "recrutement", nom: "Recrutement" },
      { id: "developpement-rh", nom: "Développement RH" }
    ]
  },
  {
    categorie: "Digital & Data",
    items: [
      { id: "transformation-digitale", nom: "Transformation digitale" },
      { id: "analyse-donnees", nom: "Analyse de données" },
      { id: "kpi", nom: "Pilotage par KPI" },
      { id: "reporting", nom: "Reporting" }
    ]
  }
];

// Niveaux d'abonnement entreprise
export const plansEntreprise = [
  {
    id: "gratuit",
    nom: "Gratuit",
    prix: 0,
    limiteCollaborateurs: 3,
    fonctionnalites: [
      "3 collaborateurs maximum",
      "Formations gratuites uniquement",
      "Suivi de base"
    ]
  },
  {
    id: "starter",
    nom: "Starter",
    prix: 50000,
    limiteCollaborateurs: 10,
    fonctionnalites: [
      "10 collaborateurs",
      "Toutes les formations",
      "Suivi détaillé",
      "Reporting mensuel"
    ]
  },
  {
    id: "business",
    nom: "Business",
    prix: 150000,
    limiteCollaborateurs: 50,
    fonctionnalites: [
      "50 collaborateurs",
      "Toutes les formations",
      "Parcours personnalisés",
      "Reporting avancé",
      "Support prioritaire"
    ]
  },
  {
    id: "entreprise",
    nom: "Entreprise",
    prix: null, // Sur devis
    limiteCollaborateurs: 999999,
    fonctionnalites: [
      "Collaborateurs illimités",
      "Formations sur mesure",
      "Accompagnement dédié",
      "Reporting temps réel",
      "API & Intégrations"
    ]
  }
];

// Liens de navigation principaux
export const menuPrincipal = [
  { label: "Accueil", href: "/" },
  { label: "Catalogue", href: "/catalogue" },
  { label: "Parcours", href: "/parcours" },
  { label: "Certifications", href: "/certifications" },
  { label: "Experts", href: "/experts" },
  { label: "Régions", href: "/regions" },
  { label: "Entreprises", href: "/entreprises" },
  { label: "Ressources", href: "/ressources" },
  { label: "Support", href: "/faq" }
];
