import type { Formation, Expert, Parcours } from "@/types";

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

// Parcours complets avec formations
export const parcoursMock: Parcours[] = [
  {
    id: "parcours-1",
    titre: "Parcours Entrepreneur & PME",
    slug: "entrepreneur-pme",
    sousTitre: "De l'idée à la gestion d'entreprise performante",
    description: "Parcours complet pour créer, structurer et développer votre PME en Côte d'Ivoire. Apprenez toutes les compétences essentielles de l'entrepreneuriat moderne.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800",
    color: "orange",
    gradient: "from-orange-500 to-orange-600",
    objectifs: [
      "Élaborer un business plan complet et convaincant",
      "Maîtriser la gestion financière et comptable",
      "Développer une stratégie marketing et commerciale efficace",
      "Gérer les ressources humaines de votre PME",
      "Assurer la conformité juridique et fiscale"
    ],
    publicCible: "Porteurs de projets, créateurs d'entreprise, dirigeants de PME",
    competences: ["business-plan", "gestion-financiere", "marketing", "gestion-rh", "juridique"],
    dureeTotal: 80,
    format: "Hybride",
    niveau: "Intermédiaire",
    formationsIds: ["formation-3", "formation-1", "formation-2"],
    certifiant: true,
    certificat: {
      nom: "Entrepreneur Certifié CPU Academy",
      badge: "/badges/entrepreneur-certifie.svg",
      criteres: [
        "Compléter toutes les formations du parcours",
        "Obtenir 75% minimum à chaque évaluation",
        "Présenter un business plan complet",
        "Valider le projet final"
      ]
    },
    gratuit: false,
    prixPublic: 450000,
    prixMembre: 150000,
    nbInscrits: 342,
    notesMoyenne: 4.7,
    tauxCompletion: 68,
    statut: "publié",
    dateCreation: "2025-06-01",
    datePublication: "2025-07-01",
    modules: [
      {
        id: "module-1",
        titre: "Fondements de l'entrepreneuriat",
        description: "Maîtrisez les bases pour lancer votre entreprise",
        ordre: 1,
        duree: 30,
        formationsIds: ["formation-3"],
        obligatoire: true
      },
      {
        id: "module-2",
        titre: "Gestion opérationnelle",
        description: "Apprenez à gérer votre entreprise au quotidien",
        ordre: 2,
        duree: 25,
        formationsIds: ["formation-1"],
        obligatoire: true
      },
      {
        id: "module-3",
        titre: "Stratégie commerciale",
        description: "Développez vos ventes et votre présence sur le marché",
        ordre: 3,
        duree: 25,
        formationsIds: ["formation-2"],
        obligatoire: true
      }
    ]
  },
  {
    id: "parcours-2",
    titre: "Parcours Accès aux Marchés (AO)",
    slug: "acces-marches-ao",
    sousTitre: "Maîtriser les appels d'offres publics et privés",
    description: "Devenez expert en appels d'offres et augmentez significativement votre taux de succès. Apprenez à identifier, analyser et remporter des marchés publics et privés.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800",
    color: "indigo",
    gradient: "from-indigo-500 to-indigo-600",
    objectifs: [
      "Identifier et sélectionner les bons appels d'offres",
      "Analyser parfaitement un dossier d'AO",
      "Rédiger des offres techniques convaincantes",
      "Budgétiser avec précision et compétitivité",
      "Éviter les erreurs courantes d'élimination",
      "Optimiser vos chances de succès"
    ],
    publicCible: "Entrepreneurs, PME, responsables commerciaux, consultants",
    competences: ["analyse-ao", "redaction-offre", "budgetisation", "strategie-commerciale"],
    dureeTotal: 50,
    format: "Hybride",
    niveau: "Intermédiaire",
    formationsIds: ["formation-1", "formation-3"],
    certifiant: true,
    certificat: {
      nom: "Expert Marchés Publics",
      badge: "/badges/expert-marches-publics.svg",
      criteres: [
        "Compléter toutes les formations",
        "Réussir les cas pratiques d'analyse d'AO",
        "Rédiger une offre complète",
        "Obtenir 80% minimum aux évaluations"
      ]
    },
    gratuit: false,
    prixPublic: 425000,
    prixMembre: 125000,
    nbInscrits: 289,
    notesMoyenne: 4.8,
    tauxCompletion: 75,
    statut: "publié",
    dateCreation: "2025-05-15",
    datePublication: "2025-06-15",
    modules: [
      {
        id: "module-ao-1",
        titre: "Fondamentaux des marchés publics",
        description: "Comprendre l'écosystème des appels d'offres",
        ordre: 1,
        duree: 15,
        formationsIds: ["formation-1"],
        obligatoire: true
      },
      {
        id: "module-ao-2",
        titre: "Analyse et stratégie d'offre",
        description: "Techniques avancées d'analyse et de réponse",
        ordre: 2,
        duree: 20,
        formationsIds: ["formation-1"],
        obligatoire: true
      },
      {
        id: "module-ao-3",
        titre: "Montage financier d'offres",
        description: "Budgétisation et aspects financiers",
        ordre: 3,
        duree: 15,
        formationsIds: ["formation-3"],
        obligatoire: true
      }
    ]
  },
  {
    id: "parcours-3",
    titre: "Parcours Vente & Marketplace",
    slug: "vente-marketplace",
    sousTitre: "Développer vos ventes en ligne et offline",
    description: "Parcours complet pour maîtriser la vente multicanale. Développez votre boutique en ligne, optimisez votre présence sur les marketplaces et boostez vos ventes.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800",
    color: "green",
    gradient: "from-green-500 to-green-600",
    objectifs: [
      "Créer et optimiser votre boutique en ligne",
      "Vendre efficacement sur les marketplaces africaines",
      "Maîtriser le marketing digital et les réseaux sociaux",
      "Gérer la logistique et les livraisons",
      "Fidéliser vos clients et augmenter votre CA"
    ],
    publicCible: "Commerçants, e-commerçants, artisans, producteurs, retailers",
    competences: ["e-commerce", "marketing-digital", "vente-btoc", "logistique"],
    dureeTotal: 45,
    format: "Vidéo",
    niveau: "Débutant",
    formationsIds: ["formation-2"],
    certifiant: true,
    certificat: {
      nom: "Expert Vente Digitale",
      badge: "/badges/expert-vente-digitale.svg",
      criteres: [
        "Compléter toutes les formations",
        "Créer une boutique fonctionnelle",
        "Lancer une campagne marketing",
        "Réaliser des ventes démontrables"
      ]
    },
    gratuit: false,
    prixPublic: 275000,
    prixMembre: 75000,
    nbInscrits: 1156,
    notesMoyenne: 4.9,
    tauxCompletion: 82,
    statut: "publié",
    dateCreation: "2025-07-01",
    datePublication: "2025-08-01",
    modules: [
      {
        id: "module-vente-1",
        titre: "E-commerce moderne",
        description: "Créer et gérer votre boutique en ligne",
        ordre: 1,
        duree: 20,
        formationsIds: ["formation-2"],
        obligatoire: true
      },
      {
        id: "module-vente-2",
        titre: "Marketplaces africaines",
        description: "Vendre sur Jumia, Glotelho et autres plateformes",
        ordre: 2,
        duree: 15,
        formationsIds: ["formation-2"],
        obligatoire: true
      },
      {
        id: "module-vente-3",
        titre: "Marketing digital",
        description: "Promouvoir efficacement vos produits",
        ordre: 3,
        duree: 10,
        formationsIds: ["formation-2"],
        obligatoire: false
      }
    ]
  },
  {
    id: "parcours-4",
    titre: "Parcours Financement & Bancabilité",
    slug: "financement-bancabilite",
    sousTitre: "Obtenir les financements pour votre croissance",
    description: "Parcours dédié à la préparation financière et à l'obtention de financements. Apprenez à construire des dossiers solides et à convaincre les investisseurs et banques.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=800",
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
    objectifs: [
      "Élaborer un business plan bancable",
      "Construire des prévisions financières réalistes",
      "Préparer un dossier de financement complet",
      "Identifier les bonnes sources de financement",
      "Négocier avec succès avec les banques et investisseurs"
    ],
    publicCible: "Entrepreneurs, porteurs de projets, dirigeants de PME en croissance",
    competences: ["business-plan", "analyse-financiere", "bancabilite", "levee-fonds"],
    dureeTotal: 60,
    format: "Hybride",
    niveau: "Intermédiaire",
    formationsIds: ["formation-3"],
    certifiant: true,
    certificat: {
      nom: "Expert Financement d'Entreprise",
      badge: "/badges/expert-financement.svg",
      criteres: [
        "Compléter toutes les formations",
        "Élaborer un business plan complet",
        "Réussir une simulation de pitch investisseurs",
        "Obtenir 80% minimum aux évaluations"
      ]
    },
    gratuit: false,
    prixPublic: 350000,
    prixMembre: 100000,
    nbInscrits: 478,
    notesMoyenne: 4.7,
    tauxCompletion: 71,
    statut: "publié",
    dateCreation: "2025-06-20",
    datePublication: "2025-07-20",
    modules: [
      {
        id: "module-fin-1",
        titre: "Business plan et projections",
        description: "Construire un dossier financier solide",
        ordre: 1,
        duree: 25,
        formationsIds: ["formation-3"],
        obligatoire: true
      },
      {
        id: "module-fin-2",
        titre: "Sources de financement",
        description: "Identifier et accéder aux financements",
        ordre: 2,
        duree: 20,
        formationsIds: ["formation-3"],
        obligatoire: true
      },
      {
        id: "module-fin-3",
        titre: "Pitch et négociation",
        description: "Convaincre investisseurs et banquiers",
        ordre: 3,
        duree: 15,
        formationsIds: ["formation-3"],
        obligatoire: true
      }
    ]
  },
  {
    id: "parcours-5",
    titre: "Parcours Production++ (Qualité & Certification)",
    slug: "production-qualite-certification",
    sousTitre: "Industrialiser et certifier votre production",
    description: "Parcours pour améliorer vos processus de production, obtenir des certifications et accéder aux marchés exigeants. Spécialement conçu pour les entreprises manufacturières.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    color: "cyan",
    gradient: "from-cyan-500 to-cyan-600",
    objectifs: [
      "Mettre en place un système qualité ISO",
      "Optimiser vos processus de production",
      "Préparer les certifications industrielles",
      "Protéger votre propriété intellectuelle",
      "Augmenter votre productivité et qualité"
    ],
    publicCible: "Industriels, producteurs, manufacturiers, artisans en développement",
    competences: ["gestion-qualite", "normes-iso", "optimisation-production", "propriete-intellectuelle"],
    dureeTotal: 55,
    format: "Hybride",
    niveau: "Intermédiaire",
    formationsIds: ["formation-4"],
    certifiant: true,
    certificat: {
      nom: "Expert Qualité et Production",
      badge: "/badges/expert-qualite-production.svg",
      criteres: [
        "Compléter toutes les formations",
        "Mettre en place un SMQ dans votre entreprise",
        "Réussir un audit blanc",
        "Obtenir 75% minimum aux évaluations"
      ]
    },
    gratuit: false,
    prixPublic: 400000,
    prixMembre: 120000,
    nbInscrits: 234,
    notesMoyenne: 4.6,
    tauxCompletion: 69,
    statut: "publié",
    dateCreation: "2025-05-10",
    datePublication: "2025-06-10",
    modules: [
      {
        id: "module-prod-1",
        titre: "Fondamentaux qualité",
        description: "Introduction aux systèmes qualité",
        ordre: 1,
        duree: 15,
        formationsIds: ["formation-4"],
        obligatoire: true
      },
      {
        id: "module-prod-2",
        titre: "Normes ISO et certification",
        description: "Préparer et obtenir vos certifications",
        ordre: 2,
        duree: 25,
        formationsIds: ["formation-4"],
        obligatoire: true
      },
      {
        id: "module-prod-3",
        titre: "Optimisation production",
        description: "Améliorer performances et productivité",
        ordre: 3,
        duree: 15,
        formationsIds: ["formation-4"],
        obligatoire: false
      }
    ]
  },
  {
    id: "parcours-6",
    titre: "Parcours Leadership & Management",
    slug: "leadership-management",
    sousTitre: "Développer vos compétences de leader",
    description: "Parcours complet pour devenir un leader efficace et gérer des équipes performantes. Développez votre intelligence émotionnelle et vos compétences managériales.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    objectifs: [
      "Développer votre leadership personnel",
      "Gérer et motiver des équipes",
      "Maîtriser la communication managériale",
      "Gérer les conflits et situations difficiles",
      "Conduire le changement dans votre organisation"
    ],
    publicCible: "Dirigeants, managers, chefs d'équipe, cadres en développement",
    competences: ["leadership", "management-equipe", "communication", "gestion-conflits"],
    dureeTotal: 40,
    format: "Live",
    niveau: "Intermédiaire",
    formationsIds: ["formation-1"],
    certifiant: true,
    certificat: {
      nom: "Leader Certifié",
      badge: "/badges/leader-certifie.svg",
      criteres: [
        "Compléter toutes les formations",
        "Participer aux ateliers pratiques",
        "Présenter un projet de transformation",
        "Obtenir 75% minimum aux évaluations"
      ]
    },
    gratuit: false,
    prixPublic: 300000,
    prixMembre: 90000,
    nbInscrits: 567,
    notesMoyenne: 4.8,
    tauxCompletion: 77,
    statut: "publié",
    dateCreation: "2025-07-15",
    datePublication: "2025-08-15",
    modules: [
      {
        id: "module-lead-1",
        titre: "Leadership personnel",
        description: "Développer votre posture de leader",
        ordre: 1,
        duree: 15,
        formationsIds: ["formation-1"],
        obligatoire: true
      },
      {
        id: "module-lead-2",
        titre: "Management d'équipe",
        description: "Gérer et développer vos collaborateurs",
        ordre: 2,
        duree: 15,
        formationsIds: ["formation-1"],
        obligatoire: true
      },
      {
        id: "module-lead-3",
        titre: "Conduite du changement",
        description: "Transformer et faire évoluer votre organisation",
        ordre: 3,
        duree: 10,
        formationsIds: ["formation-1"],
        obligatoire: false
      }
    ]
  }
];

