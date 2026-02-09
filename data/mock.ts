import type {
  Formation,
  Expert,
  Parcours,
  CentreFormation,
  SessionPresentiel,
  Webinaire,
  Review,
} from "@/types";

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
    modules: [
      {
        id: "mod-1-1",
        titre: "Fondamentaux des marchés publics",
        description: "Comprendre les concepts, types et structure des appels d'offres",
        ordre: 1,
        duree: 3,
        objectifs: [
          "Définir ce qu'est un appel d'offres",
          "Connaître les 4 types d'AO",
          "Comprendre les acteurs impliqués"
        ]
      },
      {
        id: "mod-1-2",
        titre: "Analyse et décortication du DAO",
        description: "Apprendre à lire et analyser un Dossier d'Appel d'Offres",
        ordre: 2,
        duree: 4,
        objectifs: [
          "Identifier les sections critiques",
          "Repérer les critères d'évaluation",
          "Éviter les pièges courants"
        ]
      },
      {
        id: "mod-1-3",
        titre: "Rédaction et budgétisation d'offre",
        description: "Élaborer une offre technique conforme et budgétisée",
        ordre: 3,
        duree: 3,
        objectifs: [
          "Rédiger une offre technique compétitive",
          "Budgétiser correctement son offre",
          "Optimiser les prix tout en restant rentable"
        ]
      }
    ],
    chapitres: [
      {
        id: "chap-1",
        titre: "Introduction aux marchés publics",
        description: "Découvrez les fondamentaux des appels d'offres en Côte d'Ivoire",
        ordre: 1,
        duree: 180,
        lecons: [
          {
            id: "lecon-1-1",
            titre: "Qu'est-ce qu'un appel d'offres ?",
            type: "video",
            ordre: 1,
            duree: 45,
            videoUrl: "https://example.com/video-1-1.mp4",
            contenu: "Dans cette leçon, nous allons découvrir ce qu'est un appel d'offres et pourquoi il est essentiel pour les PME ivoiriennes.",
            ressources: [
              {
                id: "res-1-1",
                nom: "Guide des marchés publics CI.pdf",
                type: "pdf",
                url: "/ressources/guide-marches-publics.pdf",
                taille: "2.5 MB"
              }
            ]
          },
          {
            id: "lecon-1-2",
            titre: "Les types d'appels d'offres",
            type: "video",
            ordre: 2,
            duree: 35,
            videoUrl: "https://example.com/video-1-2.mp4",
            contenu: "Apprenez à distinguer les différents types d'AO : ouverts, restreints, nationaux, internationaux.",
            ressources: [
              {
                id: "res-1-2",
                nom: "Tableau comparatif types AO.xlsx",
                type: "xls",
                url: "/ressources/types-ao.xlsx",
                taille: "120 KB"
              }
            ]
          },
          {
            id: "lecon-1-3",
            titre: "Le processus de soumission",
            type: "video",
            ordre: 3,
            duree: 40,
            videoUrl: "https://example.com/video-1-3.mp4",
            contenu: "Comprendre les étapes clés du processus de soumission d'une offre."
          },
          {
            id: "lecon-1-4",
            titre: "Quiz : Chapitre 1",
            type: "quiz",
            ordre: 4,
            duree: 15,
            quiz: {
              id: "quiz-chap-1",
              noteMinimale: 75,
              tentativesMax: 3,
              questions: [
                {
                  id: "q1-1",
                  question: "Qu'est-ce qu'un appel d'offres ?",
                  type: "qcm",
                  options: [
                    "Une invitation à soumettre une offre pour un marché",
                    "Un contrat direct entre deux entreprises",
                    "Une demande de devis informelle",
                    "Une vente aux enchères"
                  ],
                  reponseCorrecte: "Une invitation à soumettre une offre pour un marché",
                  explication: "Un appel d'offres est une procédure formelle où un acheteur public ou privé invite les entreprises à soumettre leurs offres pour remporter un marché."
                },
                {
                  id: "q1-2",
                  question: "Les appels d'offres ouverts sont accessibles à toutes les entreprises qualifiées.",
                  type: "vrai-faux",
                  options: ["Vrai", "Faux"],
                  reponseCorrecte: "Vrai",
                  explication: "Les AO ouverts sont publiés publiquement et toute entreprise répondant aux critères peut soumettre une offre."
                },
                {
                  id: "q1-3",
                  question: "Quelle est la première étape du processus de soumission ?",
                  type: "qcm",
                  options: [
                    "Soumettre l'offre",
                    "Analyser le dossier d'appel d'offres",
                    "Négocier le prix",
                    "Signer le contrat"
                  ],
                  reponseCorrecte: "Analyser le dossier d'appel d'offres",
                  explication: "Avant toute chose, il faut obtenir et analyser en détail le dossier d'AO pour comprendre les exigences."
                },
                {
                  id: "q1-4",
                  question: "Combien de types principaux d'AO existent en Côte d'Ivoire ?",
                  type: "qcm",
                  options: ["2 types", "3 types", "4 types", "5 types"],
                  reponseCorrecte: "4 types",
                  explication: "Il existe 4 types principaux : ouvert, restreint, sur appel à manifestation d'intérêt, et de gré à gré."
                }
              ]
            }
          }
        ]
      },
      {
        id: "chap-2",
        titre: "Analyse du dossier d'appel d'offres",
        description: "Maîtrisez l'art d'analyser un DAO pour identifier les opportunités et risques",
        ordre: 2,
        duree: 240,
        lecons: [
          {
            id: "lecon-2-1",
            titre: "Lecture approfondie du DAO",
            type: "video",
            ordre: 1,
            duree: 50,
            videoUrl: "https://example.com/video-2-1.mp4",
            contenu: "Apprenez à décortiquer chaque section du Dossier d'Appel d'Offres méthodiquement.",
            ressources: [
              {
                id: "res-2-1",
                nom: "Checklist analyse DAO.pdf",
                type: "checklist",
                url: "/ressources/checklist-dao.pdf",
                taille: "450 KB"
              }
            ]
          },
          {
            id: "lecon-2-2",
            titre: "Identifier les critères d'évaluation",
            type: "video",
            ordre: 2,
            duree: 40,
            videoUrl: "https://example.com/video-2-2.mp4",
            contenu: "Comprendre comment votre offre sera évaluée et notée."
          },
          {
            id: "lecon-2-3",
            titre: "Repérer les pièges et clauses critiques",
            type: "video",
            ordre: 3,
            duree: 55,
            videoUrl: "https://example.com/video-2-3.mp4",
            contenu: "Les erreurs à éviter absolument qui peuvent conduire à l'élimination de votre offre.",
            ressources: [
              {
                id: "res-2-3",
                nom: "Guide des erreurs fatales.pdf",
                type: "pdf",
                url: "/ressources/erreurs-fatales.pdf",
                taille: "1.2 MB"
              }
            ]
          },
          {
            id: "lecon-2-4",
            titre: "Étude de cas pratique",
            type: "video",
            ordre: 4,
            duree: 60,
            videoUrl: "https://example.com/video-2-4.mp4",
            contenu: "Analysons ensemble un vrai dossier d'appel d'offres pour un marché de fournitures."
          },
          {
            id: "lecon-2-5",
            titre: "Quiz : Chapitre 2",
            type: "quiz",
            ordre: 5,
            duree: 20,
            quiz: {
              id: "quiz-chap-2",
              noteMinimale: 75,
              tentativesMax: 3,
              questions: [
                {
                  id: "q2-1",
                  question: "Quelle est la section la plus importante à lire en premier dans un DAO ?",
                  type: "qcm",
                  options: [
                    "Les spécifications techniques",
                    "Les critères d'évaluation et de sélection",
                    "Le calendrier de soumission",
                    "Les modalités de paiement"
                  ],
                  reponseCorrecte: "Les critères d'évaluation et de sélection",
                  explication: "Comprendre comment vous serez évalué permet d'orienter toute votre stratégie de réponse."
                },
                {
                  id: "q2-2",
                  question: "Une erreur de forme peut entraîner l'élimination automatique de votre offre.",
                  type: "vrai-faux",
                  options: ["Vrai", "Faux"],
                  reponseCorrecte: "Vrai",
                  explication: "De nombreux AO ont des critères de conformité stricts. Une signature manquante ou un document absent peut éliminer votre dossier."
                },
                {
                  id: "q2-3",
                  question: "Que signifie le terme 'GO/NO GO' dans l'analyse d'un AO ?",
                  type: "qcm",
                  options: [
                    "La date limite de soumission",
                    "La décision de soumissionner ou non",
                    "Le montant du marché",
                    "Le type de garantie à fournir"
                  ],
                  reponseCorrecte: "La décision de soumissionner ou non",
                  explication: "Le GO/NO GO est l'analyse préliminaire qui détermine si vous avez les capacités et l'intérêt de répondre à cet AO."
                },
                {
                  id: "q2-4",
                  question: "Combien de jours minimum faut-il généralement prévoir pour préparer une offre de qualité ?",
                  type: "qcm",
                  options: ["2-3 jours", "5-7 jours", "10-15 jours", "20-30 jours"],
                  reponseCorrecte: "10-15 jours",
                  explication: "Une offre de qualité nécessite du temps pour l'analyse, la rédaction, la collecte de documents et les vérifications."
                },
                {
                  id: "q2-5",
                  question: "Les clauses en petits caractères dans un DAO peuvent être ignorées.",
                  type: "vrai-faux",
                  options: ["Vrai", "Faux"],
                  reponseCorrecte: "Faux",
                  explication: "Toutes les clauses sont importantes. Les 'petits caractères' contiennent souvent des conditions critiques."
                }
              ]
            }
          }
        ]
      },
      {
        id: "chap-3",
        titre: "Rédaction de l'offre technique",
        description: "Rédigez une offre technique convaincante et conforme aux exigences",
        ordre: 3,
        duree: 300,
        lecons: [
          {
            id: "lecon-3-1",
            titre: "Structure d'une offre technique",
            type: "video",
            ordre: 1,
            duree: 45,
            videoUrl: "https://example.com/video-3-1.mp4",
            contenu: "Découvrez la structure idéale d'une offre technique gagnante.",
            ressources: [
              {
                id: "res-3-1",
                nom: "Modèle offre technique.docx",
                type: "modele",
                url: "/ressources/modele-offre-technique.docx",
                taille: "1.8 MB"
              }
            ]
          },
          {
            id: "lecon-3-2",
            titre: "Rédiger la présentation de l'entreprise",
            type: "video",
            ordre: 2,
            duree: 40,
            videoUrl: "https://example.com/video-3-2.mp4",
            contenu: "Comment présenter votre entreprise de manière professionnelle et convaincante."
          },
          {
            id: "lecon-3-3",
            titre: "Méthodologie et plan de travail",
            type: "video",
            ordre: 3,
            duree: 50,
            videoUrl: "https://example.com/video-3-3.mp4",
            contenu: "Élaborez une méthodologie claire et un plan de travail détaillé."
          },
          {
            id: "lecon-3-4",
            titre: "Présenter vos références et expériences",
            type: "video",
            ordre: 4,
            duree: 35,
            videoUrl: "https://example.com/video-3-4.mp4",
            contenu: "Valoriser vos réalisations passées pour maximiser votre score."
          },
          {
            id: "lecon-3-5",
            titre: "La budgétisation de l'offre",
            type: "video",
            ordre: 5,
            duree: 60,
            videoUrl: "https://example.com/video-3-5.mp4",
            contenu: "Établir un budget réaliste et compétitif.",
            ressources: [
              {
                id: "res-3-5",
                nom: "Tableau budgétisation.xlsx",
                type: "xls",
                url: "/ressources/budget-template.xlsx",
                taille: "540 KB"
              }
            ]
          },
          {
            id: "lecon-3-6",
            titre: "Vérification finale avant soumission",
            type: "video",
            ordre: 6,
            duree: 30,
            videoUrl: "https://example.com/video-3-6.mp4",
            contenu: "La checklist ultime avant de soumettre votre offre.",
            ressources: [
              {
                id: "res-3-6",
                nom: "Checklist soumission finale.pdf",
                type: "checklist",
                url: "/ressources/checklist-finale.pdf",
                taille: "380 KB"
              }
            ]
          },
          {
            id: "lecon-3-7",
            titre: "Quiz : Chapitre 3",
            type: "quiz",
            ordre: 7,
            duree: 20,
            quiz: {
              id: "quiz-chap-3",
              noteMinimale: 75,
              tentativesMax: 3,
              questions: [
                {
                  id: "q3-1",
                  question: "Quelle section doit apparaître en premier dans une offre technique ?",
                  type: "qcm",
                  options: [
                    "Le budget",
                    "La présentation de l'entreprise",
                    "La méthodologie",
                    "Les références"
                  ],
                  reponseCorrecte: "La présentation de l'entreprise",
                  explication: "La présentation de l'entreprise établit votre crédibilité et doit apparaître en premier."
                },
                {
                  id: "q3-2",
                  question: "Il est recommandé de copier-coller les exigences du DAO dans votre offre technique.",
                  type: "vrai-faux",
                  options: ["Vrai", "Faux"],
                  reponseCorrecte: "Faux",
                  explication: "Copiez les exigences pour montrer votre conformité, mais ajoutez votre valeur ajoutée et votre approche unique."
                },
                {
                  id: "q3-3",
                  question: "Un bon plan de travail doit inclure :",
                  type: "qcm",
                  options: [
                    "Seulement les grandes étapes",
                    "Un chronogramme détaillé avec jalons et livrables",
                    "Uniquement la durée totale",
                    "Le nom de l'équipe projet"
                  ],
                  reponseCorrecte: "Un chronogramme détaillé avec jalons et livrables",
                  explication: "Un plan de travail détaillé avec chronogramme, jalons clairs et livrables démontre votre professionnalisme."
                },
                {
                  id: "q3-4",
                  question: "Dans la budgétisation, il faut toujours proposer le prix le plus bas possible.",
                  type: "vrai-faux",
                  options: ["Vrai", "Faux"],
                  reponseCorrecte: "Faux",
                  explication: "Le prix doit être compétitif mais réaliste. Un prix trop bas peut être suspect et compromettre la qualité de l'exécution."
                },
                {
                  id: "q3-5",
                  question: "Avant la soumission, combien de personnes devraient relire votre offre ?",
                  type: "qcm",
                  options: [
                    "Aucune, vous connaissez votre offre",
                    "Au moins 2-3 personnes",
                    "Seulement le directeur",
                    "Uniquement un juriste"
                  ],
                  reponseCorrecte: "Au moins 2-3 personnes",
                  explication: "Une relecture multiple par différents profils permet de détecter les erreurs et améliorer la clarté."
                }
              ]
            }
          }
        ]
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
    modules: [
      {
        id: "mod-2-1",
        titre: "Fondamentaux de l'e-commerce",
        description: "Comprendre les principes clés de la vente en ligne",
        ordre: 1,
        duree: 4,
        objectifs: [
          "Connaître les plateformes africaines",
          "Comprendre les flux e-commerce",
          "Apprendre les tendances du marché"
        ]
      },
      {
        id: "mod-2-2",
        titre: "Création et optimisation de la boutique",
        description: "Mettre en place et optimiser votre présence en ligne",
        ordre: 2,
        duree: 6,
        objectifs: [
          "Créer une boutique attractive",
          "Optimiser les fiches produits",
          "Gérer les photos et descriptions"
        ]
      },
      {
        id: "mod-2-3",
        titre: "Logistique et service client",
        description: "Gérer les commandes et la satisfaction client",
        ordre: 3,
        duree: 3,
        objectifs: [
          "Mettre en place la logistique",
          "Gérer l'après-vente",
          "Fidéliser les clients"
        ]
      },
      {
        id: "mod-2-4",
        titre: "Marketing et croissance",
        description: "Développer votre visibilité et vos ventes",
        ordre: 4,
        duree: 3,
        objectifs: [
          "Mettre en place une stratégie marketing",
          "Utiliser les réseaux sociaux",
          "Analyser vos performances"
        ]
      }
    ],
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
    modules: [
      {
        id: "mod-3-1",
        titre: "Fondamentaux du business planning",
        description: "Comprendre la structure et l'importance d'un business plan",
        ordre: 1,
        duree: 4,
        objectifs: [
          "Connaître les sections essentielles",
          "Comprendre les attentes des banques",
          "Identifier les point critiques"
        ]
      },
      {
        id: "mod-3-2",
        titre: "Études de marché et positionnement",
        description: "Analyser le marché et définir votre positionnement",
        ordre: 2,
        duree: 5,
        objectifs: [
          "Effectuer une étude de marché",
          "Analyser la concurrence",
          "Définir votre avantage compétitif"
        ]
      },
      {
        id: "mod-3-3",
        titre: "Projections financières et trésorerie",
        description: "Élaborer des prévisions financières réalistes",
        ordre: 3,
        duree: 6,
        objectifs: [
          "Créer un compte de résultat prévisionnel",
          "Construire un bilan prévisionnel",
          "Analyser la trésorerie"
        ]
      },
      {
        id: "mod-3-4",
        titre: "Présentation et négociation bancaire",
        description: "Présenter votre projet de manière convaincante",
        ordre: 4,
        duree: 5,
        objectifs: [
          "Structurer une présentation percutante",
          "Anticiper les objections",
          "Négocier les meilleures conditions"
        ]
      }
    ],
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
      nom: "Entrepreneur Certifié CPU Formation",
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
    nbAvis: 156,
    nbInscritsMonth: 42,
    nbInscritsWeek: 8,
    notesMoyenne: 4.7,
    tauxCompletion: 68,
    instructeur: {
      nom: "Kofi Mensah",
      titre: "Expert Entrepreneuriat",
      photo: "https://i.pravatar.cc/150?img=10",
      specialite: "Business Plans & PME Setup"
    },
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
    nbAvis: 127,
    nbInscritsMonth: 38,
    nbInscritsWeek: 9,
    notesMoyenne: 4.8,
    tauxCompletion: 75,
    instructeur: {
      nom: "Ama Owusu",
      titre: "Consultante Marchés Publics",
      photo: "https://i.pravatar.cc/150?img=11",
      specialite: "Appels d'Offres & Procurement"
    },
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
    nbAvis: 287,
    nbInscritsMonth: 156,
    nbInscritsWeek: 34,
    notesMoyenne: 4.9,
    tauxCompletion: 82,
    instructeur: {
      nom: "Fatou Traore",
      titre: "Spécialiste E-Commerce",
      photo: "https://i.pravatar.cc/150?img=12",
      specialite: "Digital Commerce & Marketplaces"
    },
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
    nbAvis: 198,
    nbInscritsMonth: 67,
    nbInscritsWeek: 12,
    notesMoyenne: 4.7,
    tauxCompletion: 71,
    instructeur: {
      nom: "Dr. Yusuf Ibrahim",
      titre: "Expert Financement d'Entreprise",
      photo: "https://i.pravatar.cc/150?img=13",
      specialite: "Levée de Fonds & Bancabilité"
    },
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
    nbAvis: 102,
    nbInscritsMonth: 28,
    nbInscritsWeek: 5,
    notesMoyenne: 4.6,
    tauxCompletion: 69,
    instructeur: {
      nom: "Kwesi Osei",
      titre: "Expert ISO & Qualité",
      photo: "https://i.pravatar.cc/150?img=14",
      specialite: "Systèmes Qualité & Certifications"
    },
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
    nbAvis: 234,
    nbInscritsMonth: 89,
    nbInscritsWeek: 18,
    notesMoyenne: 4.8,
    tauxCompletion: 77,
    instructeur: {
      nom: "Amara Diallo",
      titre: "Coach Leadership",
      photo: "https://i.pravatar.cc/150?img=15",
      specialite: "Management & Leadership"
    },
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

// ==================== PHASE 2: DATA MOCK ====================

// Centres de formation
export const centresFormationMock: CentreFormation[] = [
  {
    id: "centre-1",
    nom: "CPU Formation - Plateau",
    adresse: "Rue des Jardins, Immeuble le Terminus, 3ème étage",
    ville: "Abidjan",
    region: "Abidjan",
    coordonnees: {
      lat: 5.3259,
      lng: -4.0234,
    },
    photos: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800",
    ],
    horaires: "Lun-Ven: 8h-18h, Sam: 9h-13h",
    contact: {
      telephone: "+225 27 20 30 40 50",
      email: "plateau@cpu-formation.ci",
    },
    formationsDisponibles: ["form-001", "form-002"],
    capacite: 40,
    equipements: ["Projecteurs", "Wi-Fi", "Ordinateurs", "Climatisation"],
    parking: true,
    restauration: true,
    transportsPublics: ["Bus 03", "Bus 15", "Gbaka Plateau-Adjamé"],
  },
  {
    id: "centre-2",
    nom: "CPU Formation - Cocody",
    adresse: "Boulevard Latrille, Résidence les Ambassadeurs",
    ville: "Abidjan",
    region: "Abidjan",
    coordonnees: {
      lat: 5.3471,
      lng: -3.9874,
    },
    photos: [
      "https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800",
    ],
    horaires: "Lun-Ven: 8h-19h, Sam: 9h-14h",
    contact: {
      telephone: "+225 27 20 31 41 51",
      email: "cocody@cpu-formation.ci",
    },
    formationsDisponibles: ["form-001", "form-002", "form-003"],
    capacite: 30,
    equipements: ["Salles climatisées", "Wi-Fi", "Écrans interactifs", "Matériel pédagogique"],
    parking: true,
    restauration: false,
    transportsPublics: ["Bus 11", "Bus 28"],
  },
  {
    id: "centre-3",
    nom: "CPU Formation - Bouaké",
    adresse: "Quartier Commerce, Avenue de la République",
    ville: "Bouaké",
    region: "Vallée du Bandama",
    coordonnees: {
      lat: 7.6905,
      lng: -5.0300,
    },
    photos: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
    ],
    horaires: "Lun-Ven: 8h-17h, Sam: 9h-12h",
    contact: {
      telephone: "+225 27 31 40 50 60",
      email: "bouake@cpu-formation.ci",
    },
    formationsDisponibles: ["form-001"],
    capacite: 25,
    equipements: ["Projecteurs", "Wi-Fi", "Climatisation"],
    parking: true,
    restauration: false,
    transportsPublics: ["Gare routière à 500m"],
  },
];

// Sessions présentielles
export const sessionsPresentielMock: SessionPresentiel[] = [
  {
    id: "session-1",
    formationId: "form-001",
    centreId: "centre-1",
    dateDebut: new Date("2026-03-15"),
    dateFin: new Date("2026-03-19"),
    horaires: "9h-17h",
    capacite: 20,
    inscrits: 12,
    prix: 350000,
    materielFourni: ["Documentation papier", "ordinateur portable", "Clé USB cours"],
    restauration: true,
    hebergementPartenaires: [
      { nom: "Hôtel Le Terminus", tarif: 35000, distance: "200m" },
      { nom: "Résidence Ivoire", tarif: 25000, distance: "500m" },
    ],
  },
  {
    id: "session-2",
    formationId: "form-001",
    centreId: "centre-2",
    dateDebut: new Date("2026-04-10"),
    dateFin: new Date("2026-04-14"),
    horaires: "9h-17h",
    capacite: 18,
    inscrits: 18,
    prix: 350000,
    materielFourni: ["Documentation papier", "Accès plateforme e-learning 3 mois"],
    restauration: false,
  },
  {
    id: "session-3",
    formationId: "form-001",
    centreId: "centre-3",
    dateDebut: new Date("2026-05-05"),
    dateFin: new Date("2026-05-09"),
    horaires: "8h30-16h30",
    capacite: 15,
    inscrits: 8,
    prix: 320000,
    materielFourni: ["Documentation", "Kit participant"],
    restauration: true,
  },
];

// Webinaires
export const webinairesMock: Webinaire[] = [
  {
    id: "webinaire-1",
    titre: "Comment réussir ses appels d'offres en 2026",
    slug: "reussir-appels-offres-2026",
    description: "Découvrez les stratégies gagnantes pour remporter vos marchés publics. Session interactive avec études de cas réels et templates pratiques.",
    themes: ["Marchés publics", "Stratégie", "Documentation"],
    publicCible: "Dirigeants PME, Responsables commerciaux, Consultants",
    prerequis: ["Notions de base en marchés publics"],
    formateur: expertsMock[0],
    date: new Date("2026-02-15T14:00:00"),
    duree: 90,
    statut: "a-venir",
    lienMeet: "https://meet.cpu-formation.ci/webinaire-1",
    inscrits: 247,
    capacite: 500,
    gratuit: true,
    prix: 0,
    programme: [
      { temps: "0-15min", titre: "Introduction et contexte 2026", description: "Évolutions réglementaires" },
      { temps: "15-45min", titre: "Les 7 clés pour gagner", description: "Stratégies éprouvées" },
      { temps: "45-70min", titre: "Études de cas pratiques", description: "Analyse de dossiers gagnants" },
      { temps: "70-90min", titre: "Q&A avec les participants", description: "Vos questions, nos réponses" },
    ],
    ressources: [
      { titre: "Checklist DAO.pdf", url: "/ressources/checklist-dao.pdf", type: "pdf" },
      { titre: "Template offre technique", url: "/ressources/template-offre.docx", type: "lien" },
    ],
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "webinaire-2",
    titre: "Marketing Digital pour PME : Les essentiels",
    slug: "marketing-digital-pme-essentiels",
    description: "Maîtrisez les fondamentaux du marketing digital pour développer votre visibilité en ligne. Stratégies concrètes et outils low-cost.",
    themes: ["Marketing digital", "Réseaux sociaux", "E-commerce"],
    publicCible: "Entrepreneurs, Responsables marketing, Commerçants",
    formateur: expertsMock[1],
    date: new Date("2026-02-09T15:30:00"),
    duree: 60,
    statut: "live",
    lienMeet: "https://meet.cpu-formation.ci/webinaire-2",
    inscrits: 412,
    gratuit: true,
    prix: 0,
    programme: [
      { temps: "0-10min", titre: "État des lieux marketing digital CI", description: "Chiffres clés 2026" },
      { temps: "10-35min", titre: "Les 4 piliers du marketing digital", description: "Site web, SEO, réseaux sociaux, email" },
      { temps: "35-55min", titre: "Outils gratuits recommandés", description: "Canva, Mailchimp, Google My Business..." },
      { temps: "55-60min", titre: "Questions-réponses", description: "Session interactive" },
    ],
    ressources: [
      { titre: "Guide réseaux sociaux CI", url: "/ressources/guide-social-media.pdf", type: "pdf" },
    ],
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "webinaire-3",
    titre: "Financement des PME : Ce qui change en 2026",
    slug: "financement-pme-2026",
    description: "Panorama complet des solutions de financement disponibles pour les PME ivoiriennes. Découvrez les nouveaux dispositifs et comment en bénéficier.",
    themes: ["Financement", "Banques", "Subventions"],
    publicCible: "Dirigeants PME, Comptables, Responsables financiers",
    formateur: expertsMock[2],
    date: new Date("2026-01-20T14:00:00"),
    duree: 75,
    statut: "termine",
    inscrits: 356,
    gratuit: false,
    prix: 5000,
    programme: [
      { temps: "0-20min", titre: "Panorama des financements PME", description: "Banques, fonds, subventions" },
      { temps: "20-50min", titre: "Comment monter un dossier bancable", description: "Documents requis, ratios clés" },
      { temps: "50-75min", titre: "Cas pratiques et simulations", description: "Exercices interactifs" },
    ],
    ressources: [
      { titre: "Liste organismes financeurs", url: "/ressources/organismes-financeurs.pdf", type: "pdf" },
      { titre: "Template business plan", url: "/ressources/template-bp.xlsx", type: "lien" },
    ],
    replay: {
      url: "https://player.vimeo.com/video/123456789",
      duree: 75,
    },
    thumbnail: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800",
  },
];

// Reviews (avis sur formations)
export const reviewsMock: Review[] = [
  {
    id: "review-1",
    formationId: "form-001",
    userId: "user-1",
    userName: "Kouadio Ange",
    userPhoto: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    titre: "Formation exceptionnelle et très pratique",
    commentaire: "J'ai suivi cette formation il y a 3 mois et j'ai déjà remporté 2 marchés publics grâce aux techniques enseignées. Le formateur est très pédagogue et les cas pratiques sont vraiment pertinents. Je recommande vivement !",
    date: new Date("2025-12-15"),
    formationTerminee: true,
    helpful: 123,
    notHelpful: 5,
    reponseInstructeur: {
      texte: "Merci Ange pour ce retour ! Félicitations pour vos succès, c'est exactement l'objectif de cette formation. N'hésitez pas si vous avez besoin d'accompagnement sur vos prochains dossiers.",
      date: new Date("2025-12-16"),
    },
  },
  {
    id: "review-2",
    formationId: "form-001",
    userId: "user-2",
    userName: "Traoré Fanta",
    userPhoto: "https://i.pravatar.cc/150?img=2",
    rating: 4,
    titre: "Très bon contenu, support à améliorer",
    commentaire: "Formation de qualité avec beaucoup d'informations utiles. Les vidéos sont claires et bien structurées. Seul bémol : les documents PDF fournis ne sont pas toujours à jour par rapport aux nouvelles réglementations 2026. Mais dans l'ensemble, très satisfaite !",
    date: new Date("2026-01-05"),
    formationTerminee: true,
    helpful: 87,
    notHelpful: 12,
  },
  {
    id: "review-3",
    formationId: "form-001",
    userId: "user-3",
    userName: "Yao Emmanuel",
    userPhoto: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    titre: "Le meilleur investissement pour mon entreprise",
    commentaire: "En tant que dirigeant d'une PME de BTP, cette formation m'a ouvert les yeux sur toutes les opportunités que je manquais. Les templates fournis m'ont fait gagner un temps fou. Le formateur répond rapidement aux questions dans le forum. 5 étoiles bien méritées !",
    date: new Date("2026-01-22"),
    formationTerminee: true,
    helpful: 156,
    notHelpful: 3,
  },
  {
    id: "review-4",
    formationId: "form-001",
    userId: "user-4",
    userName: "Bamba Mariam",
    userPhoto: "https://i.pravatar.cc/150?img=4",
    rating: 3,
    titre: "Bien mais un peu long",
    commentaire: "Le contenu est intéressant mais j'ai trouvé la formation un peu longue. Certains modules auraient pu être condensés. Cependant, les quiz de validation sont excellents et les cas pratiques très formateurs.",
    date: new Date("2026-02-01"),
    formationTerminee: false,
    helpful: 34,
    notHelpful: 18,
  },
  {
    id: "review-5",
    formationId: "form-001",
    userId: "user-5",
    userName: "Koné Ibrahim",
    userPhoto: "https://i.pravatar.cc/150?img=5",
    rating: 5,
    titre: "Formateur expert et accessible",
    commentaire: "Jean-Marc Kouassi est vraiment un expert dans son domaine. Il partage son expérience concrète et répond à toutes les questions avec précision. Les études de cas sont tirées de situations réelles. Formation complète et professionnelle !",
    date: new Date("2026-02-08"),
    formationTerminee: true,
    helpful: 201,
    notHelpful: 7,
    reponseInstructeur: {
      texte: "Merci Ibrahim ! Ravi que la formation vous ait apporté les clés que vous cherchiez. N'hésitez pas à rester en contact pour vos futurs projets.",
      date: new Date("2026-02-09"),
    },
  },
];

