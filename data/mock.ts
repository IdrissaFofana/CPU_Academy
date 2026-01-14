import type { Formation, Expert } from "@/types";

// Experts mockés
export const expertsMock: Expert[] = [
  {
    id: "expert-1",
    nom: "Kouassi",
    prenom: "Jean-Marc",
    photo: "/experts/expert-1.jpg",
    bio: "Expert en marchés publics avec 15 ans d'expérience",
    domaines: ["Marchés publics", "Appels d'offres", "Budgétisation"],
    region: "Abidjan",
    realisations: [
      "Formation de 500+ entreprises aux AO",
      "Consultant pour la Banque Mondiale"
    ],
    notemoyenne: 4.8,
    nbCours: 12,
    nbApprenants: 3500
  },
  {
    id: "expert-2",
    nom: "Traoré",
    prenom: "Aminata",
    photo: "/experts/expert-2.jpg",
    bio: "Spécialiste en marketing digital et e-commerce",
    domaines: ["Marketing digital", "E-commerce", "Réseaux sociaux"],
    region: "Abidjan",
    ville: "Cocody",
    realisations: [
      "Fondatrice d'une agence digitale primée",
      "Auteure de 'Vendre en ligne en Afrique'"
    ],
    notemoyenne: 4.9,
    nbCours: 8,
    nbApprenants: 2800
  },
  {
    id: "expert-3",
    nom: "Yao",
    prenom: "Koffi",
    photo: "/experts/expert-3.jpg",
    bio: "Expert financier et bancaire",
    domaines: ["Finance", "Bancabilité", "Business plan"],
    region: "Abidjan",
    realisations: [
      "Directeur financier pendant 10 ans",
      "A aidé 200+ entreprises à obtenir des financements"
    ],
    notemoyenne: 4.7,
    nbCours: 10,
    nbApprenants: 1900
  }
];

// Formations mockées
export const formationsMock: Formation[] = [
  {
    id: "formation-1",
    titre: "Gestion opérationnelle des PME",
    slug: "gestion-operationnelle-pme",
    description: "Maîtrisez les fondamentaux de la gestion d'entreprise adaptés aux PME ivoiriennes.",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800&h=600",
    modalite: "Hybride",
    niveau: "Intermédiaire",
    secteur: "Secteur Tertiaire",
    resume: "Apprenez à gérer efficacement votre PME au quotidien",
    objectifs: [
      "Analyser un dossier d'appel d'offres",
      "Rédiger une offre technique conforme",
      "Budgétiser précisément votre offre",
      "Éviter les erreurs d'élimination",
      "Augmenter vos chances de succès"
    ],
    prerequis: ["Avoir une entreprise enregistrée", "Connaissance de base en gestion"],
    livrables: [
      "Modèle d'offre technique",
      "Checklist de vérification",
      "Tableaux de budgétisation"
    ],
    competences: ["analyse-ao", "redaction-offre", "budgetisation"],
    format: "Hybride",
    duree: 10,
    langue: "Français",
    moduleLie: "AO",
    objectifMetier: "Gagner des marchés",
    parcours: ["Accès Marchés (AO)"],
    region: "Abidjan",
    ville: "Plateau",
    expertId: "expert-1",
    expert: expertsMock[0],
    certifiant: true,
    certificat: {
      criteres: {
        quiz: true,
        noteMinimale: 75,
        devoir: true
      },
      badge: "/badges/pret-ao.svg",
      nomCertificat: "Prêt AO"
    },
    gratuit: false,
    prixPublic: 350000,
    prixMembre: 75000,
    chapitres: [
      {
        id: "chap-1",
        titre: "Introduction aux marchés publics",
        ordre: 1,
        duree: 180,
        lecons: []
      },
      {
        id: "chap-2",
        titre: "Analyse du dossier d'appel d'offres",
        ordre: 2,
        duree: 240,
        lecons: []
      },
      {
        id: "chap-3",
        titre: "Rédaction de l'offre technique",
        ordre: 3,
        duree: 300,
        lecons: []
      }
    ],
    nbInscrits: 245,
    notesMoyenne: 4.8,
    tauxCompletion: 78,
    statut: "publié",
    dateCreation: "2025-09-15",
    dateModification: "2026-01-05",
    datePublication: "2025-10-01",
    badges: ["Certifiant", "Présentiel"]
  },
  {
    id: "formation-2",
    titre: "Vendre sur les marketplaces en Afrique",
    slug: "vendre-marketplaces-afrique",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800&h=600",
    modalite: "En ligne",
    niveau: "Débutant",
    secteur: "Secteur Tertiaire",
    resume: "Créez et optimisez votre boutique en ligne pour vendre plus",
    description: "Maîtrisez la vente en ligne sur les principales plateformes africaines",
    objectifs: [
      "Créer une boutique attractive",
      "Optimiser vos fiches produits",
      "Gérer la logistique",
      "Développer votre visibilité",
      "Fidéliser vos clients"
    ],
    prerequis: ["Avoir des produits à vendre"],
    livrables: [
      "Guide de création de boutique",
      "Templates de fiches produits",
      "Checklist logistique"
    ],
    competences: ["marketing-digital", "vente-btoc", "e-commerce"],
    format: "Vidéo",
    duree: 16,
    langue: "Français",
    moduleLie: "Marketplace",
    objectifMetier: "Vendre +",
    parcours: ["Vente & Marketplace"],
    expertId: "expert-2",
    expert: expertsMock[1],
    certifiant: true,
    certificat: {
      criteres: {
        quiz: true,
        noteMinimale: 70,
        devoir: true
      },
      badge: "/badges/vendeur-pret.svg",
      nomCertificat: "Vendeur Prêt"
    },
    gratuit: false,
    prixPublic: 75000,
    prixMembre: 0,
    chapitres: [
      {
        id: "chap-1",
        titre: "Introduction à l'e-commerce",
        ordre: 1,
        duree: 120,
        lecons: []
      },
      {
        id: "chap-2",
        titre: "Créer sa boutique",
        ordre: 2,
        duree: 180,
        lecons: []
      }
    ],
    nbInscrits: 892,
    notesMoyenne: 4.9,
    tauxCompletion: 85,
    statut: "publié",
    dateCreation: "2025-08-10",
    dateModification: "2025-12-20",
    datePublication: "2025-09-01",
    badges: ["Certifiant", "Gratuit"]
  },
  {
    id: "formation-3",
    titre: "Construire un business plan bancable",
    slug: "business-plan-bancable",
    image: "/images/formation-agriculture.png",
    modalite: "Présentiel",
    niveau: "Intermédiaire",
    secteur: "Secteur Primaire",
    resume: "Élaborez un business plan convaincant pour obtenir des financements",
    description: "Formation pour créer un business plan solide qui séduira les banques",
    objectifs: [
      "Structurer votre business plan",
      "Réaliser des projections financières réalistes",
      "Présenter votre projet efficacement",
      "Négocier avec les banques",
      "Maximiser vos chances d'obtenir un crédit"
    ],
    prerequis: ["Avoir un projet d'entreprise défini"],
    livrables: [
      "Modèle de business plan",
      "Tableaux financiers Excel",
      "Guide de présentation"
    ],
    competences: ["business-plan", "analyse-financiere", "bancabilite"],
    format: "Live",
    duree: 20,
    langue: "Français",
    moduleLie: "Financement",
    objectifMetier: "Obtenir financement",
    parcours: ["Financement & Bancabilité"],
    expertId: "expert-3",
    expert: expertsMock[2],
    certifiant: true,
    certificat: {
      criteres: {
        quiz: true,
        noteMinimale: 80,
        devoir: true
      },
      badge: "/badges/bancable.svg",
      nomCertificat: "Bancable"
    },
    gratuit: false,
    prixPublic: 125000,
    prixMembre: 50000,
    chapitres: [
      {
        id: "chap-1",
        titre: "Fondamentaux du business plan",
        ordre: 1,
        duree: 240,
        lecons: []
      },
      {
        id: "chap-2",
        titre: "Projections financières",
        ordre: 2,
        duree: 300,
        lecons: []
      }
    ],
    nbInscrits: 567,
    notesMoyenne: 4.7,
    tauxCompletion: 72,
    statut: "publié",
    dateCreation: "2025-07-20",
    dateModification: "2025-11-15",
    datePublication: "2025-08-15",
    badges: ["Certifiant", "Présentiel"]
  },
  {
    id: "formation-4",
    titre: "Introduction à la qualité ISO",
    slug: "introduction-qualite-iso",
    image: "/images/formation-tech.png",
    modalite: "Hybride",
    niveau: "Débutant",
    secteur: "Secteur Secondaire",
    resume: "Découvrez les fondamentaux des normes ISO et de la gestion qualité",
    description: "Formation d'introduction aux systèmes de management de la qualité",
    objectifs: [
      "Comprendre les normes ISO",
      "Mettre en place un SMQ de base",
      "Préparer une certification",
      "Améliorer vos processus"
    ],
    prerequis: [],
    livrables: [
      "Manuel qualité simplifié",
      "Procédures types",
      "Checklist d'audit"
    ],
    competences: ["gestion-qualite", "normes-iso"],
    format: "Vidéo",
    duree: 12,
    langue: "Français",
    moduleLie: "Incubateur",
    objectifMetier: "Industrialiser",
    parcours: ["Production++ (Qualité, certif, PI)"],
    expertId: "expert-1",
    expert: expertsMock[0],
    certifiant: false,
    gratuit: true,
    chapitres: [
      {
        id: "chap-1",
        titre: "Qu'est-ce que la qualité?",
        ordre: 1,
        duree: 120,
        lecons: []
      },
      {
        id: "chap-2",
        titre: "Les normes ISO",
        ordre: 2,
        duree: 180,
        lecons: []
      }
    ],
    nbInscrits: 1234,
    notesMoyenne: 4.6,
    tauxCompletion: 90,
    statut: "publié",
    dateCreation: "2025-06-01",
    dateModification: "2025-10-10",
    datePublication: "2025-07-01",
    badges: ["Gratuit"]
  }
];
