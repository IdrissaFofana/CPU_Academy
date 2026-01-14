export interface Course {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  sector: string;
  filiere: string;
  level: string;
  duration: string;
  rating: number;
  students: number;
  image: string;
  price: number;
  instructor: {
    name: string;
    title: string;
    avatar: string;
  };
  objectives: string[];
  prerequisites: string[];
  modules: {
    title: string;
    duration: string;
    lessons: string[];
  }[];
  certification: boolean;
  region: string;
  location: string;
  format: "Présentiel" | "En ligne" | "Hybride";
  nextSession: string;
}

export const allCourses: Course[] = [
  {
    id: 1,
    title: "Gestion opérationnelle des PME",
    description: "Maîtrisez les fondamentaux de la gestion d'entreprise adaptés aux PME ivoiriennes.",
    longDescription: "Cette formation complète vous permettra d'acquérir toutes les compétences nécessaires pour gérer efficacement une PME en Côte d'Ivoire. De la gestion financière à la gestion des ressources humaines, en passant par la stratégie commerciale, vous maîtriserez tous les aspects de la gestion d'entreprise.",
    category: "Business",
    sector: "Secteur Tertiaire",
    filiere: "Commerce & distribution",
    level: "Intermédiaire",
    duration: "10 semaines",
    rating: 4.8,
    students: 245,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=600&h=400",
    price: 350000,
    instructor: {
      name: "Dr. Kouamé Yao",
      title: "Expert en gestion d'entreprise",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100"
    },
    objectives: [
      "Maîtriser les outils de gestion financière",
      "Optimiser la gestion des ressources humaines",
      "Développer une stratégie commerciale efficace",
      "Mettre en place des indicateurs de performance"
    ],
    prerequisites: [
      "Avoir une entreprise ou un projet d'entreprise",
      "Connaissances de base en comptabilité"
    ],
    modules: [
      {
        title: "Fondamentaux de la gestion",
        duration: "2 semaines",
        lessons: ["Introduction à la gestion", "Les fonctions de l'entreprise", "Outils de pilotage"]
      },
      {
        title: "Gestion financière",
        duration: "3 semaines",
        lessons: ["Comptabilité de base", "Analyse financière", "Budgétisation", "Gestion de trésorerie"]
      },
      {
        title: "Ressources humaines",
        duration: "2 semaines",
        lessons: ["Recrutement", "Gestion des talents", "Droit du travail ivoirien"]
      },
      {
        title: "Stratégie commerciale",
        duration: "3 semaines",
        lessons: ["Étude de marché", "Marketing mix", "Techniques de vente", "Fidélisation client"]
      }
    ],
    certification: true,
    region: "LAGUNES",
    location: "Abidjan",
    format: "Hybride",
    nextSession: "15 Janvier 2026"
  },
  {
    id: 2,
    title: "Transformation numérique et E-commerce",
    description: "Développez votre présence en ligne et intégrez les outils digitaux dans votre activité.",
    longDescription: "Dans un monde de plus en plus connecté, cette formation vous accompagne dans la digitalisation de votre entreprise. Apprenez à créer une boutique en ligne, à utiliser les réseaux sociaux pour votre business, et à optimiser votre présence numérique.",
    category: "Digital",
    sector: "Secteur Quaternaire",
    filiere: "Numérique & technologies",
    level: "Débutant",
    duration: "8 semaines",
    rating: 4.7,
    students: 189,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=400",
    price: 280000,
    instructor: {
      name: "Mme Adjoua Koffi",
      title: "Consultante en transformation digitale",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100"
    },
    objectives: [
      "Créer et gérer une boutique en ligne",
      "Maîtriser les réseaux sociaux professionnels",
      "Comprendre le marketing digital",
      "Utiliser les outils de paiement mobile"
    ],
    prerequisites: [
      "Savoir utiliser un ordinateur",
      "Avoir un smartphone"
    ],
    modules: [
      {
        title: "Introduction au digital",
        duration: "1 semaine",
        lessons: ["L'écosystème digital", "Opportunités du numérique en Afrique"]
      },
      {
        title: "Création de boutique en ligne",
        duration: "3 semaines",
        lessons: ["Plateformes e-commerce", "Gestion des produits", "Logistique et livraison"]
      },
      {
        title: "Marketing digital",
        duration: "2 semaines",
        lessons: ["SEO/SEA", "Publicité sur les réseaux sociaux", "Content marketing"]
      },
      {
        title: "Paiements et sécurité",
        duration: "2 semaines",
        lessons: ["Mobile Money", "Sécurité des transactions", "Gestion des fraudes"]
      }
    ],
    certification: true,
    region: "En ligne",
    location: "En ligne",
    format: "En ligne",
    nextSession: "1 Février 2026"
  },
  {
    id: 3,
    title: "Techniques agricoles innovantes",
    description: "Améliorez vos rendements grâce aux nouvelles méthodes adaptées au climat local.",
    longDescription: "Cette formation intensive vous initie aux techniques agricoles modernes adaptées au contexte ivoirien. De l'agriculture de précision à l'agroécologie, découvrez comment augmenter vos rendements tout en préservant l'environnement.",
    category: "Agriculture",
    sector: "Secteur Primaire",
    filiere: "Agriculture végétale",
    level: "Avancé",
    duration: "12 semaines",
    rating: 4.9,
    students: 312,
    image: "/lovable-uploads/8c5a2726-916d-4db3-9d14-63a79bb3b0d0.png",
    price: 420000,
    instructor: {
      name: "Dr. Coulibaly Seydou",
      title: "Ingénieur agronome",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100"
    },
    objectives: [
      "Maîtriser les techniques d'irrigation modernes",
      "Appliquer les principes de l'agroécologie",
      "Utiliser les outils numériques agricoles",
      "Optimiser la gestion des sols"
    ],
    prerequisites: [
      "Expérience en agriculture",
      "Accès à une exploitation agricole"
    ],
    modules: [
      {
        title: "Sols et fertilité",
        duration: "3 semaines",
        lessons: ["Analyse des sols", "Fertilisation organique", "Rotation des cultures"]
      },
      {
        title: "Gestion de l'eau",
        duration: "3 semaines",
        lessons: ["Irrigation goutte-à-goutte", "Récupération d'eau de pluie", "Économie d'eau"]
      },
      {
        title: "Agriculture numérique",
        duration: "3 semaines",
        lessons: ["Drones agricoles", "Capteurs connectés", "Applications mobiles"]
      },
      {
        title: "Agroécologie",
        duration: "3 semaines",
        lessons: ["Biodiversité", "Lutte biologique", "Permaculture"]
      }
    ],
    certification: true,
    region: "LACS",
    location: "Yamoussoukro",
    format: "Présentiel",
    nextSession: "10 Février 2026"
  },
  {
    id: 4,
    title: "Leadership et management d'équipe",
    description: "Développez vos compétences de leader pour motiver et diriger efficacement vos équipes.",
    longDescription: "Devenez un leader inspirant capable de motiver et de guider vos équipes vers le succès. Cette formation couvre tous les aspects du leadership moderne, de la communication à la gestion des conflits.",
    category: "Management",
    sector: "Secteur Tertiaire",
    filiere: "Services",
    level: "Intermédiaire",
    duration: "6 semaines",
    rating: 4.6,
    students: 278,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=600&h=400",
    price: 300000,
    instructor: {
      name: "M. Konan Parfait",
      title: "Coach en leadership",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100"
    },
    objectives: [
      "Développer son style de leadership",
      "Maîtriser la communication interpersonnelle",
      "Gérer les conflits efficacement",
      "Motiver et engager ses équipes"
    ],
    prerequisites: [
      "Avoir une équipe à manager",
      "Minimum 2 ans d'expérience professionnelle"
    ],
    modules: [
      {
        title: "Fondamentaux du leadership",
        duration: "2 semaines",
        lessons: ["Styles de leadership", "Intelligence émotionnelle", "Vision et valeurs"]
      },
      {
        title: "Communication efficace",
        duration: "2 semaines",
        lessons: ["Écoute active", "Feedback constructif", "Prise de parole en public"]
      },
      {
        title: "Gestion d'équipe",
        duration: "2 semaines",
        lessons: ["Délégation", "Gestion des conflits", "Motivation"]
      }
    ],
    certification: true,
    region: "LAGUNES",
    location: "Abidjan",
    format: "Présentiel",
    nextSession: "20 Janvier 2026"
  },
  {
    id: 5,
    title: "Comptabilité et fiscalité des PME",
    description: "Maîtrisez la comptabilité et les obligations fiscales des entreprises ivoiriennes.",
    longDescription: "Une formation complète sur la comptabilité et la fiscalité adaptée au contexte ivoirien. Apprenez à tenir vos comptes, à établir vos déclarations fiscales et à optimiser votre situation fiscale en toute légalité.",
    category: "Finance",
    sector: "Secteur Tertiaire",
    filiere: "Finance & assurances",
    level: "Intermédiaire",
    duration: "8 semaines",
    rating: 4.7,
    students: 198,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=600&h=400",
    price: 320000,
    instructor: {
      name: "M. Diabaté Ibrahim",
      title: "Expert-comptable",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100"
    },
    objectives: [
      "Tenir une comptabilité conforme au SYSCOHADA",
      "Établir les déclarations fiscales",
      "Optimiser la charge fiscale légalement",
      "Préparer les états financiers"
    ],
    prerequisites: [
      "Notions de base en mathématiques",
      "Avoir une activité professionnelle"
    ],
    modules: [
      {
        title: "Comptabilité générale",
        duration: "3 semaines",
        lessons: ["Plan comptable SYSCOHADA", "Écritures comptables", "Journal et grand livre"]
      },
      {
        title: "Fiscalité ivoirienne",
        duration: "3 semaines",
        lessons: ["TVA", "Impôt sur les bénéfices", "Patente et autres taxes"]
      },
      {
        title: "États financiers",
        duration: "2 semaines",
        lessons: ["Bilan", "Compte de résultat", "Annexes"]
      }
    ],
    certification: true,
    region: "LAGUNES",
    location: "Abidjan",
    format: "Hybride",
    nextSession: "5 Mars 2026"
  },
  {
    id: 6,
    title: "Artisanat et design créatif",
    description: "Valorisez vos créations artisanales et développez votre marque personnelle.",
    longDescription: "Transformez votre passion artisanale en entreprise rentable. Cette formation vous guide dans la création d'une marque, la commercialisation de vos produits et le développement de votre activité artisanale.",
    category: "Artisanat",
    sector: "Secteur Secondaire",
    filiere: "Artisanat de production",
    level: "Débutant",
    duration: "6 semaines",
    rating: 4.5,
    students: 156,
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&q=80&w=600&h=400",
    price: 180000,
    instructor: {
      name: "Mme Bamba Fatou",
      title: "Designer et artisane",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100"
    },
    objectives: [
      "Créer une identité de marque forte",
      "Photographier et présenter ses créations",
      "Fixer ses prix correctement",
      "Vendre en ligne et hors ligne"
    ],
    prerequisites: [
      "Avoir une activité artisanale",
      "Passion pour la création"
    ],
    modules: [
      {
        title: "Branding artisanal",
        duration: "2 semaines",
        lessons: ["Identité visuelle", "Storytelling", "Packaging"]
      },
      {
        title: "Production et qualité",
        duration: "2 semaines",
        lessons: ["Standardisation", "Contrôle qualité", "Approvisionnement"]
      },
      {
        title: "Commercialisation",
        duration: "2 semaines",
        lessons: ["Tarification", "Canaux de vente", "Marketing"]
      }
    ],
    certification: false,
    region: "VALLEE DU BANDAMA",
    location: "Bouaké",
    format: "Présentiel",
    nextSession: "12 Février 2026"
  },
  {
    id: 7,
    title: "Transport et logistique",
    description: "Optimisez vos opérations de transport et de logistique pour gagner en efficacité.",
    longDescription: "Une formation pratique sur la gestion du transport et de la logistique en Côte d'Ivoire. Apprenez à optimiser vos flux, réduire vos coûts et améliorer la satisfaction de vos clients.",
    category: "Transport",
    sector: "Secteur Tertiaire",
    filiere: "Transport, logistique & mobilité",
    level: "Intermédiaire",
    duration: "8 semaines",
    rating: 4.4,
    students: 134,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600&h=400",
    price: 290000,
    instructor: {
      name: "M. Ouattara Moussa",
      title: "Expert en logistique",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100"
    },
    objectives: [
      "Optimiser les itinéraires de livraison",
      "Gérer une flotte de véhicules",
      "Maîtriser les procédures douanières",
      "Utiliser les outils de suivi GPS"
    ],
    prerequisites: [
      "Activité dans le transport ou la logistique",
      "Permis de conduire"
    ],
    modules: [
      {
        title: "Fondamentaux de la logistique",
        duration: "2 semaines",
        lessons: ["Chaîne logistique", "Gestion des stocks", "Entreposage"]
      },
      {
        title: "Transport routier",
        duration: "3 semaines",
        lessons: ["Réglementation", "Optimisation des tournées", "Maintenance"]
      },
      {
        title: "Import/Export",
        duration: "3 semaines",
        lessons: ["Procédures douanières", "Incoterms", "Documentation"]
      }
    ],
    certification: true,
    region: "BAS-SASSANDRA",
    location: "San-Pédro",
    format: "Présentiel",
    nextSession: "1 Mars 2026"
  },
  {
    id: 8,
    title: "BTP et gestion de chantier",
    description: "Gérez efficacement vos projets de construction et vos équipes sur le terrain.",
    longDescription: "Formation complète en gestion de chantier pour les professionnels du BTP. Apprenez à planifier, exécuter et contrôler vos projets de construction tout en respectant les normes de sécurité.",
    category: "BTP",
    sector: "Secteur Secondaire",
    filiere: "BTP, construction & immobilier",
    level: "Avancé",
    duration: "10 semaines",
    rating: 4.8,
    students: 167,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=600&h=400",
    price: 450000,
    instructor: {
      name: "Ing. Soro Mamadou",
      title: "Ingénieur en génie civil",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100"
    },
    objectives: [
      "Planifier et ordonnancer un chantier",
      "Gérer les équipes et les sous-traitants",
      "Contrôler les coûts et délais",
      "Appliquer les normes de sécurité"
    ],
    prerequisites: [
      "Expérience dans le BTP",
      "Connaissances techniques de base"
    ],
    modules: [
      {
        title: "Préparation de chantier",
        duration: "3 semaines",
        lessons: ["Lecture de plans", "Métrés et devis", "Planning"]
      },
      {
        title: "Exécution des travaux",
        duration: "4 semaines",
        lessons: ["Suivi de chantier", "Gestion des équipes", "Qualité"]
      },
      {
        title: "Sécurité et réglementation",
        duration: "3 semaines",
        lessons: ["EPI et sécurité", "Réglementation ivoirienne", "Environnement"]
      }
    ],
    certification: true,
    region: "LAGUNES",
    location: "Abidjan",
    format: "Hybride",
    nextSession: "15 Février 2026"
  },
  {
    id: 9,
    title: "Industrie agroalimentaire",
    description: "Transformez et valorisez les produits agricoles locaux selon les normes de qualité.",
    longDescription: "Apprenez à transformer les produits agricoles locaux en produits alimentaires de qualité. Cette formation couvre toute la chaîne de transformation, de la réception des matières premières au conditionnement final.",
    category: "Industrie",
    sector: "Secteur Primaire",
    filiere: "Agro-transformation & agroalimentaire",
    level: "Intermédiaire",
    duration: "10 semaines",
    rating: 4.6,
    students: 145,
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&q=80&w=600&h=400",
    price: 380000,
    instructor: {
      name: "Dr. N'Guessan Ahou",
      title: "Ingénieure agroalimentaire",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100"
    },
    objectives: [
      "Maîtriser les procédés de transformation",
      "Appliquer les normes HACCP",
      "Gérer la qualité et la traçabilité",
      "Optimiser le conditionnement"
    ],
    prerequisites: [
      "Intérêt pour l'agroalimentaire",
      "Connaissances de base en hygiène"
    ],
    modules: [
      {
        title: "Procédés de transformation",
        duration: "4 semaines",
        lessons: ["Conservation", "Transformation", "Équipements"]
      },
      {
        title: "Qualité et sécurité",
        duration: "3 semaines",
        lessons: ["HACCP", "Traçabilité", "Contrôle qualité"]
      },
      {
        title: "Conditionnement et marketing",
        duration: "3 semaines",
        lessons: ["Packaging", "Étiquetage", "Commercialisation"]
      }
    ],
    certification: true,
    region: "LAGUNES",
    location: "Abidjan",
    format: "Présentiel",
    nextSession: "25 Février 2026"
  },
  {
    id: 10,
    title: "Services à la personne",
    description: "Développez une entreprise de services à la personne professionnelle et rentable.",
    longDescription: "Créez et gérez une entreprise de services à la personne de qualité. Cette formation couvre tous les aspects de ce secteur en pleine croissance, de la relation client à la gestion du personnel.",
    category: "Services",
    sector: "Secteur Tertiaire",
    filiere: "Services",
    level: "Débutant",
    duration: "6 semaines",
    rating: 4.5,
    students: 112,
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=600&h=400",
    price: 200000,
    instructor: {
      name: "Mme Touré Aminata",
      title: "Fondatrice d'une entreprise de services",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100&h=100"
    },
    objectives: [
      "Comprendre le marché des services à la personne",
      "Recruter et former du personnel qualifié",
      "Fidéliser sa clientèle",
      "Gérer administrativement son entreprise"
    ],
    prerequisites: [
      "Projet entrepreneurial",
      "Sens du service"
    ],
    modules: [
      {
        title: "Le marché des services",
        duration: "2 semaines",
        lessons: ["Étude de marché", "Positionnement", "Offre de services"]
      },
      {
        title: "Gestion du personnel",
        duration: "2 semaines",
        lessons: ["Recrutement", "Formation", "Management"]
      },
      {
        title: "Relation client",
        duration: "2 semaines",
        lessons: ["Prospection", "Satisfaction client", "Fidélisation"]
      }
    ],
    certification: false,
    region: "LAGUNES",
    location: "Abidjan",
    format: "Hybride",
    nextSession: "8 Mars 2026"
  }
];

// Secteurs N1 - Organisation sectorielle CPU-PME Côte d'Ivoire
export const sectors = [
  "Tous",
  "Secteur Primaire",
  "Secteur Secondaire", 
  "Secteur Tertiaire",
  "Secteur Quaternaire",
  "Filières Transversales"
];

// Filières N2 détaillées par secteur
export const filieres: Record<string, string[]> = {
  "Secteur Primaire": [
    "Agriculture végétale",
    "Élevage & productions animales",
    "Pêche & aquaculture",
    "Services, intrants & AgriTech",
    "Agro-transformation & agroalimentaire"
  ],
  "Secteur Secondaire": [
    "Industrie & transformation",
    "Artisanat de production",
    "BTP, construction & immobilier",
    "Énergie & services associés",
    "Environnement & économie circulaire",
    "Mines, carrières & sous-traitance"
  ],
  "Secteur Tertiaire": [
    "Commerce & distribution",
    "Services",
    "Transport, logistique & mobilité",
    "Tourisme, culture & loisirs",
    "Finance & assurances"
  ],
  "Secteur Quaternaire": [
    "Numérique & technologies",
    "Éducation & formation",
    "Santé & sciences de la vie",
    "Recherche, ingénierie & qualité"
  ],
  "Filières Transversales": [
    "Financement & accès au crédit",
    "Exportation & internationalisation",
    "Transformation digitale des PME",
    "Développement durable & RSE",
    "Innovation, incubation & accélération"
  ]
};

// Sous-filières N3 (liste simplifiée des principales)
export const sousFilieres = [
  "Céréales & légumineuses",
  "Maraîchage & horticulture",
  "Cultures de rente",
  "Aviculture",
  "Aquaculture & pisciculture",
  "Textile, habillement & mode",
  "Plasturgie & emballages",
  "Bois & ameublement",
  "Cosmétique & beauté",
  "Gros œuvre & génie civil",
  "Second œuvre & finitions",
  "Énergies renouvelables",
  "Commerce de détail",
  "E-commerce",
  "Services professionnels",
  "Marketing, communication & design",
  "Logistique urbaine & dernier kilomètre",
  "Transport routier par camion",
  "Hébergement",
  "Voyages & guidage",
  "Microfinance & SFD",
  "FinTech & paiements",
  "Développement logiciel",
  "Data, IA & IoT",
  "Cybersécurité",
  "Formation professionnelle",
  "EdTech",
  "Cliniques & cabinets",
  "HealthTech"
];

export const levels = ["Tous", "Débutant", "Intermédiaire", "Avancé"];

export const formats = ["Tous", "Présentiel", "En ligne", "Hybride"];

// Régions de Côte d'Ivoire
export const regions = [
  "Toutes",
  "LAGUNES",
  "SAVANES",
  "SUD-COMOE",
  "HAUT-SASSANDRA",
  "AGNEBY",
  "MOYEN COMOE",
  "VALLEE DU BANDAMA",
  "MONTAGNES",
  "SUD-BANDAMA",
  "FROMAGER",
  "LACS",
  "MOYEN CAVALLY",
  "ZANZAN",
  "BAFFING",
  "BAS-SASSANDRA",
  "N'ZI COMOE",
  "MARAHOUE",
  "WORODOUGOU",
  "DENGUELE",
  "En ligne"
];

// Villes principales par région
export const villesParRegion: Record<string, string[]> = {
  "LAGUNES": ["Abidjan", "Anyama", "Bingerville", "Songon", "Alépé", "Dabou", "Sikensi", "Grand-Lahou", "Jacqueville", "Tiassalé", "Taabo"],
  "SAVANES": ["Korhogo", "Boundiali", "Ferkessédougou", "Kong", "Tengréla", "Ouangolodougou", "M'bengué", "Sinématiali"],
  "SUD-COMOE": ["Aboisso", "Ayamé", "Tiapoum", "Adiaké", "Grand-Bassam", "Bonoua"],
  "HAUT-SASSANDRA": ["Daloa", "Issia", "Vavoua", "Zoukougbeu"],
  "AGNEBY": ["Agboville", "Azaguié", "Adzopé", "Akoupé"],
  "MOYEN COMOE": ["Abengourou", "Bettié", "Agnibilékrou"],
  "VALLEE DU BANDAMA": ["Bouaké", "Béoumi", "Dabakala", "Katiola", "Sakassou"],
  "MONTAGNES": ["Man", "Biankouma", "Danané", "Bangolo", "Zouan-Hounien"],
  "SUD-BANDAMA": ["Divo", "Fresco", "Lakota", "Hiré"],
  "FROMAGER": ["Gagnoa", "Oumé", "Guibéroua"],
  "LACS": ["Yamoussoukro", "Tiébissou", "Toumodi", "Didiévi"],
  "MOYEN CAVALLY": ["Duékoué", "Guiglo", "Bloléquin", "Toulépleu", "Taï"],
  "ZANZAN": ["Bondoukou", "Bouna", "Tanda", "Nassian"],
  "BAFFING": ["Touba", "Ouaninou", "Koro"],
  "BAS-SASSANDRA": ["San-Pédro", "Sassandra", "Soubré", "Tabou", "Méagui"],
  "N'ZI COMOE": ["Dimbokro", "Bongouanou", "Daoukro", "Bocanda", "M'bahiakro"],
  "MARAHOUE": ["Bouaflé", "Sinfra", "Zuénoula"],
  "WORODOUGOU": ["Séguéla", "Mankono", "Tiéningboué"],
  "DENGUELE": ["Odienné", "Minignan", "Madinani"]
};

// Liste de toutes les villes
export const villes = [
  "Toutes",
  "Abidjan",
  "Yamoussoukro",
  "Bouaké",
  "San-Pédro",
  "Korhogo",
  "Daloa",
  "Man",
  "Gagnoa",
  "Abengourou",
  "Divo",
  "Bondoukou",
  "Agboville",
  "Grand-Bassam",
  "Séguéla",
  "Odienné",
  "En ligne"
];