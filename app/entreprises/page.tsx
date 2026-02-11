"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PageBanner } from "@/components/layout/PageBanner";
import { 
  Building, 
  Users, 
  TrendingUp, 
  Award, 
  Target, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  Rocket, 
  Shield, 
  BarChart, 
  HeadphonesIcon,
  Mail,
  Phone,
  ArrowRight,
  Clock,
  MapPin,
  Zap,
  Lightbulb,
  Settings,
  FileText,
  Star,
  Calendar,
  Send,
  Download,
  PlayCircle,
  Search,
  ExternalLink,
  CheckCircle,
  XCircle,
  Sparkles,
  Quote,
  ChevronDown,
  CreditCard,
  Wallet
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";


const services = [
  {
    icon: GraduationCap,
    titre: "Formations sur mesure",
    description: "Des programmes personnalisés adaptés à vos besoins spécifiques et votre secteur d'activité",
    features: ["Diagnostic des besoins", "Contenu personnalisé", "Formateurs experts", "Suivi post-formation"],
    color: "orange"
  },
  {
    icon: Briefcase,
    titre: "Accompagnement stratégique",
    description: "Un accompagnement complet pour transformer vos projets en succès concrets",
    features: ["Audit organisationnel", "Plan d'action", "Coaching dirigeants", "Reporting régulier"],
    color: "blue"
  },
  {
    icon: Target,
    titre: "Conseil & Expertise",
    description: "Bénéficiez de l'expertise de nos consultants pour optimiser vos processus",
    features: ["Études de marché", "Stratégie commerciale", "Optimisation RH", "Certification qualité"],
    color: "green"
  },
  {
    icon: Rocket,
    titre: "Innovation & Digital",
    description: "Accompagnement dans votre transformation digitale et l'innovation",
    features: ["Transformation digitale", "E-commerce", "Marketing digital", "Automatisation"],
    color: "purple"
  }
];

const packsMetiers = [
  {
    titre: "Pack Direction & Management",
    icon: Target,
    description: "Pour les dirigeants et managers",
    duree: "8 jours",
    modules: 6,
    formations: [
      "Leadership stratégique",
      "Gestion financière avancée",
      "Prise de décision et gestion des risques",
      "Management d'équipe performante"
    ],
    prix: {
      parPersonne: 480000,
      groupe8Plus: 408000,
      groupe15Plus: 360000
    },
    financement: {
      fdfpEligible: true,
      priseEnCharge: "60-70%",
      resteACharge: 144000
    },
    color: "orange",
    gradient: "from-orange-500 to-orange-600"
  },
  {
    titre: "Pack Commercial & Marketing",
    icon: TrendingUp,
    description: "Pour les équipes commerciales",
    duree: "6 jours",
    modules: 5,
    formations: [
      "Techniques de vente avancées",
      "Marketing digital & réseaux sociaux",
      "Négociation commerciale",
      "Gestion de la relation client"
    ],
    prix: {
      parPersonne: 360000,
      groupe8Plus: 306000,
      groupe15Plus: 270000
    },
    financement: {
      fdfpEligible: true,
      priseEnCharge: "60-70%",
      resteACharge: 108000
    },
    color: "blue",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    titre: "Pack Finance & Comptabilité",
    icon: BarChart,
    description: "Pour les équipes financières",
    duree: "7 jours",
    modules: 5,
    formations: [
      "Comptabilité générale et analytique",
      "Analyse financière et tableaux de bord",
      "Fiscalité d'entreprise",
      "Contrôle de gestion"
    ],
    prix: {
      parPersonne: 420000,
      groupe8Plus: 357000,
      groupe15Plus: 315000
    },
    financement: {
      fdfpEligible: true,
      priseEnCharge: "60-70%",
      resteACharge: 126000
    },
    color: "green",
    gradient: "from-green-500 to-green-600"
  },
  {
    titre: "Pack Ressources Humaines",
    icon: Users,
    description: "Pour les équipes RH",
    duree: "6 jours",
    modules: 5,
    formations: [
      "Recrutement et intégration",
      "Gestion de la paie et administration",
      "Droit du travail ivoirien",
      "Développement des compétences"
    ],
    prix: {
      parPersonne: 360000,
      groupe8Plus: 306000,
      groupe15Plus: 270000
    },
    financement: {
      fdfpEligible: true,
      priseEnCharge: "60-70%",
      resteACharge: 108000
    },
    color: "purple",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    titre: "Pack Production & Qualité",
    icon: Settings,
    description: "Pour les équipes opérationnelles",
    duree: "5 jours",
    modules: 4,
    formations: [
      "Gestion de production",
      "Management de la qualité ISO 9001",
      "Amélioration continue (Lean, Kaizen)",
      "Gestion des stocks et logistique"
    ],
    prix: {
      parPersonne: 300000,
      groupe8Plus: 255000,
      groupe15Plus: 225000
    },
    financement: {
      fdfpEligible: true,
      priseEnCharge: "60-70%",
      resteACharge: 90000
    },
    color: "indigo",
    gradient: "from-indigo-500 to-indigo-600"
  },
  {
    titre: "Pack Digital & IT",
    icon: Zap,
    description: "Pour les équipes techniques",
    duree: "7 jours",
    modules: 6,
    formations: [
      "Transformation digitale",
      "Cybersécurité et protection des données",
      "Gestion de projet Agile",
      "Outils collaboratifs (Microsoft 365, etc.)"
    ],
    prix: {
      parPersonne: 420000,
      groupe8Plus: 357000,
      groupe15Plus: 315000
    },
    financement: {
      fdfpEligible: true,
      priseEnCharge: "60-70%",
      resteACharge: 126000
    },
    color: "cyan",
    gradient: "from-cyan-500 to-cyan-600"
  }
];

// Témoignages clients
const temoignages = [
  {
    entreprise: "Banque Atlantique CI",
    secteur: "Secteur bancaire",
    responsable: "Kouamé Jacques",
    poste: "DRH",
    temoignage: "CPU Formation nous accompagne depuis 3 ans. La montée en compétences de nos équipes commerciales a été impressionnante. +25% de performance en 6 mois.",
    resultat: "+25% de performance",
    collaborateursFormes: 120,
    satisfaction: 4.9,
    programmes: ["Pack Commercial", "Leadership", "Digital Banking"]
  },
  {
    entreprise: "Nestlé Côte d'Ivoire",
    secteur: "Industrie agroalimentaire",
    responsable: "Aminata Traoré",
    poste: "Directrice Formation",
    temoignage: "L'approche sur-mesure de CPU et leur expertise dans le management de la qualité ont transformé nos processus. Certification ISO obtenue en 8 mois.",
    resultat: "ISO 9001 obtenue",
    collaborateursFormes: 85,
    satisfaction: 5.0,
    programmes: ["Pack Qualité ISO", "Management", "Lean Manufacturing"]
  },
  {
    entreprise: "Jumia CI",
    secteur: "E-commerce",
    responsable: "David Mendy",
    poste: "CEO",
    temoignage: "Excellent accompagnement dans notre transformation digitale. Les formations ont permis à nos équipes de gagner en autonomie sur les outils.",
    resultat: "+40% gains productivité",
    collaborateursFormes: 60,
    satisfaction: 4.8,
    programmes: ["Pack Digital", "E-commerce", "Data Analytics"]
  }
];

// Processus de collaboration
const processusCollaboration = [
  {
    numero: 1,
    titre: "Audit & Diagnostic",
    description: "Analyse de vos besoins, diagnostic des compétences existantes et identification des gaps",
    duree: "1-2 jours",
    deliverables: ["Rapport d'audit", "Cartographie des compétences", "Recommandations"],
    icon: Target,
    gratuit: true
  },
  {
    numero: 2,
    titre: "Proposition sur mesure",
    description: "Conception d'un programme de formation personnalisé avec objectifs SMART et indicateurs de succès",
    duree: "2-3 jours",
    deliverables: ["Devis détaillé", "Programme pédagogique", "Planning prévisionnel"],
    icon: FileText
  },
  {
    numero: 3,
    titre: "Validation & Convention",
    description: "Signature de la convention de formation et planification détaillée des sessions",
    duree: "1 jour",
    deliverables: ["Convention signée", "Calendrier définitif", "Kit pédagogique"],
    icon: CheckCircle2
  },
  {
    numero: 4,
    titre: "Déploiement",
    description: "Réalisation des formations avec formateurs experts et suivi rapproché des participants",
    duree: "Variable",
    deliverables: ["Sessions de formation", "Supports pédagogiques", "Évaluations continues"],
    icon: GraduationCap
  },
  {
    numero: 5,
    titre: "Suivi & Évaluation",
    description: "Mesure des acquis, évaluation de la satisfaction et recommandations pour la suite",
    duree: "1 mois post-formation",
    deliverables: ["Rapport de satisfaction", "Attestations", "Plan de suivi", "Badge ROI"],
    icon: BarChart
  }
];

// Options de financement
const optionsFinancement = [
  {
    titre: "FDFP - Fonds de Développement de la Formation Professionnelle",
    description: "Jusqu'à 70% de prise en charge par le FDFP pour les formations éligibles",
    avantages: [
      "Prise en charge jusqu'à 70%",
      "Dossier monté par CPU Formation",
      "Remboursement sous 60 jours",
      "Toutes nos formations sont éligibles"
    ],
    eligibilite: "Entreprises privées cotisantes au FDFP",
    icon: Shield,
    color: "green",
    badge: "Recommandé"
  },
  {
    titre: "Paiement échelonné",
    description: "Paiement en plusieurs tranches sans frais pour faciliter votre trésorerie",
    avantages: [
      "Jusqu'à 3 échéances",
      "Sans frais ni intérêt",
      "Début de formation immédiat",
      "Flexible selon budget"
    ],
    icon: CreditCard,
    color: "blue"
  },
  {
    titre: "Budget formation annuel",
    description: "Convention cadre avec engagement annuel et tarifs préférentiels",
    avantages: [
      "Remise de 10 à 20%",
      "Planning annuel flexible",
      "Reporting trimestriel",
      "Chef de projet dédié"
    ],
    icon: TrendingUp,
    color: "purple",
    badge: "Grandes entreprises"
  }
];

// Résultats clients
const resultatsClients = [
  {
    metrique: "+32%",
    label: "Augmentation moyenne de la productivité",
    description: "Mesurée 6 mois après formation",
    icon: TrendingUp,
    source: "Étude interne 2024 - 50 entreprises"
  },
  {
    metrique: "4.8/5",
    label: "Satisfaction moyenne",
    description: "Note donnée par les entreprises clientes",
    icon: Star,
    source: "200+ avis vérifiés"
  },
  {
    metrique: "89%",
    label: "Taux de complétion",
    description: "Des collaborateurs terminent leur parcours",
    icon: CheckCircle2,
    source: "Données 2024-2025"
  },
  {
    metrique: "3,2 mois",
    label: "Délai moyen de ROI",
    description: "Retour sur investissement formation",
    icon: Clock,
    source: "Étude de cas 2023-2024"
  }
];

// FAQ Entreprises
const faqEntreprises = [
  {
    question: "Quels sont les délais pour mettre en place une formation ?",
    reponse: "Selon l'urgence : formation express possible en 2 semaines. Standard : 4-6 semaines. Nos programmes sur mesure nécessitent 6-8 semaines de préparation."
  },
  {
    question: "Comment se passe la prise en charge FDFP ?",
    reponse: "Nous gérons l'intégralité du dossier administratif FDFP. Démarche : 1) Vous validez la formation, 2) Nous montons le dossier, 3) Soumission au FDFP, 4) Formation démarrée, 5) Remboursement sous 60-90 jours. Taux de prise en charge moyen : 60-70%."
  },
  {
    question: "Les formations peuvent-elles se faire en interne (dans nos locaux) ?",
    reponse: "Oui, nous proposons 3 modalités : 1) Intra-entreprise (dans vos locaux), 2) Inter-entreprises (dans nos centres), 3) Hybride (mix présentiel/distanciel). Le format intra est recommandé pour 8+ collaborateurs."
  },
  {
    question: "Quel est le minimum de participants pour une formation sur mesure ?",
    reponse: "Pas de minimum strict. Pour une formation intra personnalisée, nous recommandons 6-8 participants minimum pour optimiser le ROI. Pour moins de 6 personnes, nous proposons nos formations inter-entreprises."
  },
  {
    question: "Proposez-vous un suivi post-formation ?",
    reponse: "Oui ! Inclus dans tous nos packs : 1) Évaluation à chaud (fin formation), 2) Évaluation à froid (J+30 et J+90), 3) Plan d'actions personnalisé, 4) Coaching de suivi (optionnel), 5) Accès plateforme ressources pendant 6 mois."
  },
  {
    question: "Comment garantissez-vous la qualité des formations ?",
    reponse: "4 piliers qualité : 1) Formateurs certifiés avec 5+ ans d'expérience, 2) Contenus actualisés tous les 6 mois, 3) Évaluation systématique (95% satisfaction), 4) Certifications Qualiopi et ISO 9001."
  }
];

// Ressources téléchargeables
const ressourcesEntreprises = [
  {
    titre: "Catalogue Formations Entreprises 2026",
    description: "L'intégralité de notre offre : 50+ formations, packs métiers, tarifs indicatifs",
    format: "PDF - 42 pages",
    taille: "5.2 MB",
    icon: FileText,
    color: "orange",
    badge: "Populaire",
    downloads: 1250
  },
  {
    titre: "Guide FDFP : Financer vos formations",
    description: "Tout savoir sur la prise en charge FDFP : démarches, taux, délais, exemples",
    format: "PDF - 18 pages",
    taille: "2.1 MB",
    icon: Shield,
    color: "green",
    badge: "Nouveau",
    downloads: 890
  },
  {
    titre: "ROI de la formation : 10 cas d'usage",
    description: "Exemples concrets d'entreprises qui ont transformé leurs équipes",
    format: "PDF - 24 pages",
    taille: "3.8 MB",
    icon: TrendingUp,
    color: "blue",
    downloads: 670
  },
  {
    titre: "Checklist : Réussir son plan de formation",
    description: "Template Excel + guide étape par étape pour construire votre plan annuel",
    format: "Excel + PDF",
    taille: "1.5 MB",
    icon: CheckCircle2,
    color: "purple",
    downloads: 540
  }
];

// Certifications et labels
const certificationsLabels = [
  {
    nom: "Qualiopi",
    description: "Certification qualité des formations",
    delivredPar: "Ministère du Travail - France",
    annee: 2024
  },
  {
    nom: "ISO 9001:2015",
    description: "Management de la qualité",
    delivredPar: "AFNOR Certification",
    annee: 2023
  },
  {
    nom: "FDFP Agréé",
    description: "Organisme de formation agréé",
    delivredPar: "FDFP Côte d'Ivoire",
    annee: 2020
  },
  {
    nom: "Datadock",
    description: "Référencé qualité formations",
    delivredPar: "OPCA France",
    annee: 2023
  }
];

// Logos clients (exemples)
const logosClients = [
  "Banque Atlantique",
  "Orange CI",
  "MTN",
  "Nestlé",
  "Société Générale",
  "NSIA Banque",
  "Ecobank",
  "Bolloré",
  "CFAO",
  "Unilever",
  "Jumia",
  "Wave"
];

const avantages = [
  {
    icon: Target,
    titre: "Formations ciblées",
    description: "Contenus adaptés à votre secteur et vos enjeux"
  },
  {
    icon: BarChart,
    titre: "ROI mesurable",
    description: "Suivi des compétences acquises et impact métier"
  },
  {
    icon: Settings,
    titre: "Flexibilité totale",
    description: "Présentiel, en ligne ou hybride selon vos besoins"
  },
  {
    icon: FileText,
    titre: "Documentation",
    description: "Supports pédagogiques personnalisés"
  },
  {
    icon: Award,
    titre: "Certifications",
    description: "Attestations et certificats officiels"
  },
  {
    icon: TrendingUp,
    titre: "Reporting",
    description: "Tableau de bord de suivi des formations"
  }
];

const partenaires = [
  { nom: "Secteur Bancaire", count: "15+ banques" },
  { nom: "Télécommunications", count: "8+ opérateurs" },
  { nom: "Industrie", count: "50+ entreprises" },
  { nom: "Services", count: "100+ PME" },
  { nom: "Administration", count: "20+ institutions" },
  { nom: "ONG & Projets", count: "30+ organisations" }
];

const criteres = [
  "Identifier précisément vos besoins en formation",
  "Définir vos objectifs de montée en compétences",
  "Prévoir un budget formation adapté",
  "Désigner un référent formation dans votre structure",
  "S'engager dans un processus d'amélioration continue"
];

export default function EntreprisesPage() {
  return (
    <>
      <PageBanner
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Entreprises" }
        ]}
        slides={[
          {
            image: "/images/formation-tech.png",
            title: "Investissez dans vos équipes, récoltez la performance",
            subtitle: "200+ entreprises nous font confiance pour développer les compétences de leurs collaborateurs",
            badge: {
              icon: "+",
              number: "200",
              text: "Entreprises partenaires",
              subtext: "Vous accompagnent"
            },
            trustBadges: [
              {
                icon: "check",
                color: "green",
                title: "FDFP 70%",
                subtitle: "Prise en charge formation"
              },
              {
                icon: "users",
                color: "orange",
                title: "3,500+",
                subtitle: "Collaborateurs formés"
              },
              {
                icon: "check",
                color: "blue",
                title: "95%",
                subtitle: "Taux de satisfaction"
              }
            ],
            buttons: [
              { label: "Demander un devis", href: "#contact", icon: <Send className="h-5 w-5" /> },
              { label: "Télécharger le catalogue", href: "#ressources", variant: "outline", icon: <Download className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/formation-agriculture.png",
            title: "Solutions Sur Mesure pour Entreprises",
            subtitle: "Prise en charge FDFP jusqu'à 70% - Formations adaptées à vos besoins",
            badge: {
              icon: "🎯 ",
              number: "70%",
              text: "Prise en charge FDFP",
              subtext: "Sur vos formations"
            },
            trustBadges: [
              {
                icon: "building",
                color: "purple",
                title: "PME & Grandes entreprises",
                subtitle: "Tous secteurs d'activité"
              },
              {
                icon: "check",
                color: "green",
                title: "Certifications officielles",
                subtitle: "Reconnues par l'État"
              },
              {
                icon: "users",
                color: "orange",
                title: "Formations flexibles",
                subtitle: "Présentiel ou en ligne"
              }
            ],
            buttons: [
              { label: "Nous contacter", href: "#contact", icon: <Send className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/formation-tech.png",
            title: "ROI Mesurable & Certifications",
            subtitle: "Formations certifiantes avec suivi des performances de vos équipes",
            badge: {
              number: "85%",
              text: "ROI positif en 6 mois",
              subtext: "Selon nos clients"
            },
            trustBadges: [
              {
                icon: "check",
                color: "blue",
                title: "Qualité certifiée",
                subtitle: "Organisme agréé"
              },
              {
                icon: "users",
                color: "orange",
                title: "Experts métiers",
                subtitle: "15+ années d'expérience"
              },
              {
                icon: "check",
                color: "green",
                title: "Suivi personnalisé",
                subtitle: "Avant, pendant, après"
              }
            ],
            buttons: [
              { label: "Voir nos offres", href: "#services", icon: <Building className="h-5 w-5" /> }
            ]
          }
        ]}
      />

      {/* Content */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
        {/* Logos Clients Section */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 border-b border-slate-100">
          <p className="text-center text-sm text-slate-600 mb-6 md:mb-8">
            Plus de 200 entreprises nous font confiance
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-6 md:gap-8 max-w-6xl mx-auto items-center">
            {logosClients.slice(0, 12).map((client, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center p-4 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-2">
                    <Building className="w-6 h-6 md:w-8 md:h-8 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{client}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Témoignages Clients Section */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center mb-8 md:mb-12">
            <Badge className="mb-3 md:mb-4 bg-blue-100 text-blue-700 border-blue-200 px-3 md:px-4 py-1 text-sm">
              <Quote className="w-3 h-3 mr-1" />
              Témoignages
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
              Ils ont transformé leurs équipes
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Découvrez comment nos formations ont généré des résultats concrets pour nos clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {temoignages.map((temoignage, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg transition-all  animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 mb-1">{temoignage.entreprise}</h3>
                    <p className="text-sm text-slate-500">{temoignage.secteur}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
                    <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                    <span className="text-sm font-bold text-orange-700">{temoignage.satisfaction}</span>
                  </div>
                </div>

                {/* Citation */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-orange-200 mb-2" />
                  <p className="text-sm text-slate-700 italic leading-relaxed">
                    "{temoignage.temoignage}"
                  </p>
                </div>

                {/* Résultat */}
                <div className="mb-4 p-3 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-green-700">{temoignage.resultat}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                      {temoignage.responsable.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-slate-900">{temoignage.responsable}</p>
                      <p className="text-xs text-slate-500">{temoignage.poste}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users className="w-4 h-4" />
                    <span>{temoignage.collaborateursFormes} collaborateurs formés</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Process en 5 étapes Section */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 md:mb-4 bg-orange-100 text-orange-700 border-orange-200 px-3 md:px-4 py-1 text-sm">
                <Target className="w-3 h-3 mr-1" />
                Notre processus
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                Comment nous collaborons
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                Un processus simple et efficace en 5 étapes pour garantir le succès de votre projet
              </p>
            </div>

            <div className="grid md:grid-cols-5 gap-6 relative">
              {/* Ligne connectrice sur desktop */}
              <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 z-0" style={{ top: '4rem' }}></div>
              
              {processusCollaboration.map((etape, idx) => {
                const Icon = etape.icon;
                return (
                  <div
                    key={idx}
                    className="relative z-10 animate-slide-up"
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-lg transition-all  text-center">
                      {/* Numéro avec icône */}
                      <div className="relative inline-flex mb-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          {etape.numero}
                        </div>
                        {etape.gratuit && (
                          <div className="absolute -top-2 -right-2">
                            <Badge className="bg-green-500 text-white text-xs">GRATUIT</Badge>
                          </div>
                        )}
                      </div>

                      {/* Icône */}
                      <div className="mb-3">
                        <Icon className="w-8 h-8 mx-auto text-orange-600" />
                      </div>

                      {/* Titre */}
                      <h3 className="text-base font-bold text-slate-900 mb-2">
                        {etape.titre}
                      </h3>

                      {/* Durée */}
                      <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-3">
                        <Clock className="w-3 h-3" />
                        <span>{etape.duree}</span>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed mb-3">
                        {etape.description}
                      </p>

                      {/* Livrables */}
                      <div className="pt-3 border-t border-slate-100">
                        <p className="text-xs font-semibold text-slate-700 mb-2">Livrables :</p>
                        <div className="space-y-1">
                          {etape.deliverables.slice(0, 2).map((deliverable, i) => (
                            <div key={i} className="flex items-center gap-1 text-xs text-slate-600">
                              <CheckCircle2 className="w-3 h-3 text-green-600 flex-shrink-0" />
                              <span className="truncate">{deliverable}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services-entreprises" className="container mx-auto px-8 lg:px-16 py-16">
          <div className="text-center mb-12 animate-slide-up">
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-0">
              <Briefcase className="w-3 h-3 mr-1" />
              Nos services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Des solutions adaptées à vos besoins
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Un accompagnement complet pour développer les compétences de vos collaborateurs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Card
                  key={idx}
                  className="p-6 transition-all duration-300 border-2 hover:border-orange-200 animate-slide-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${service.color}-100 mb-3`}>
                    <Icon className={`w-6 h-6 text-${service.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.titre}</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Packs Métiers Section */}
        <section id="former-vos-equipes" className="container mx-auto px-8 lg:px-16 py-16">
          <div className="text-center mb-12 animate-slide-up">
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-0">
              <Briefcase className="w-3 h-3 mr-1" />
              Packs métiers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Packs métiers
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Des parcours de formation thématiques pour chaque fonction clé de l'entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {packsMetiers.map((pack, idx) => {
              const Icon = pack.icon;
              return (
                <Card
                  key={idx}
                  className="group relative bg-white transition-all duration-300 border-2 border-slate-100 hover:border-orange-200 animate-slide-up overflow-hidden"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Barre colorée en haut */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pack.gradient}`}></div>

                  <div className="p-6">
                    {/* Header avec icône */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${pack.gradient} text-white shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs bg-slate-50">
                          <Clock className="w-3 h-3 mr-1" />
                          {pack.duree}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-slate-50">
                          {pack.modules} modules
                        </Badge>
                      </div>
                    </div>

                    {/* Titre et description */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {pack.titre}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">{pack.description}</p>

                    {/* Prix avec FDFP */}
                    {pack.prix && (
                      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-4 mb-4 border border-slate-200">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-slate-600">À partir de</span>
                          {pack.financement.fdfpEligible && (
                            <Badge variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">
                              <Shield className="w-3 h-3 mr-1" />
                              FDFP -{pack.financement.priseEnCharge}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <div className="text-2xl font-bold text-orange-600">
                            {(pack.financement.resteACharge / 1000).toFixed(0)}k
                          </div>
                          <span className="text-sm text-slate-600">FCFA/pers</span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          <span className="line-through">{(pack.prix.parPersonne / 1000).toFixed(0)}k FCFA</span>
                          <span className="ml-1">• Avec prise en charge FDFP</span>
                        </div>
                        {pack.prix.groupe8Plus && (
                          <div className="text-xs text-slate-600 mt-2 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>Tarif dégressif dès 8+ personnes</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Liste des formations */}
                    <div className="space-y-2 mb-6">
                      <p className="text-xs font-semibold text-slate-900 mb-2">Formations incluses :</p>
                      <ul className="space-y-2">
                        {pack.formations.map((formation, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{formation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Button
                      asChild
                      className={`w-full cursor-pointer bg-gradient-to-r ${pack.gradient} hover:opacity-90 text-white shadow-md transition-all`}
                    >
                      <Link href="#contact">
                        En savoir plus
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* CTA général */}
          <div className="text-center mt-12 px-4">
            <p className="text-slate-600 mb-4">Besoin d'un pack personnalisé ?</p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cursor-pointer border-2 border-orange-500 text-orange-600 hover:bg-orange-50 w-full sm:w-auto"
            >
              <Link href="#contact" className="flex items-center justify-center px-3 py-2 sm:px-6">
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="text-xs sm:text-base leading-tight">
                  <span className="hidden sm:inline">Contactez-nous pour un programme sur mesure</span>
                  <span className="sm:hidden">Programme sur mesure</span>
                </span>
              </Link>
            </Button>
          </div>
        </section>

        {/* Section Financement & FDFP */}
        <section id="financement" className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 md:mb-4 bg-green-100 text-green-700 border-green-200 px-3 md:px-4 py-1 text-sm">
                <Shield className="w-3 h-3 mr-1" />
                Financement
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                Financez vos formations facilement
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                Plusieurs options de financement pour faciliter l'accès à la formation de vos équipes
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {optionsFinancement.map((option, idx) => {
                const Icon = option.icon;
                return (
                  <Card
                    key={idx}
                    className="relative p-6 md:p-8 transition-all border-2 hover:border-orange-200 animate-slide-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {option.badge && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-orange-500 text-white">{option.badge}</Badge>
                      </div>
                    )}

                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-${option.color}-100 mb-4`}>
                      <Icon className={`w-7 h-7 text-${option.color}-600`} />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                      {option.titre}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                      {option.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      {option.avantages.map((avantage, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                          <span>{avantage}</span>
                        </div>
                      ))}
                    </div>

                    {option.eligibilite && (
                      <div className="pt-4 border-t border-slate-100">
                        <p className="text-xs text-slate-500">
                          <span className="font-semibold">Éligibilité :</span> {option.eligibilite}
                        </p>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            <div className="text-center mt-8 md:mt-12">
              <p className="text-slate-600 mb-4">Besoin d'aide pour le financement ?</p>
              <Button
                asChild
                size="lg"
                className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 text-white shadow-lg"
              >
                <Link href="#contact">
                  <Shield className="mr-2 h-5 w-5" />
                  Télécharger le guide FDFP
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Section Résultats & ROI */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 bg-gradient-to-br from-orange-50 to-blue-50/30">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 md:mb-4 bg-orange-100 text-orange-700 border-orange-200 px-3 md:px-4 py-1 text-sm">
                <BarChart className="w-3 h-3 mr-1" />
                ROI & Résultats
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                Des résultats mesurables
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                L'impact concret de nos formations sur la performance de nos clients
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {resultatsClients.map((resultat, idx) => {
                const Icon = resultat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 text-center border-2 border-slate-100 shadow-lg transition-all  animate-fade-in"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 mb-4">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
                      {resultat.metrique}
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-2">
                      {resultat.label}
                    </h3>
                    <p className="text-xs text-slate-600 mb-3">
                      {resultat.description}
                    </p>
                    <p className="text-xs text-slate-400 italic">
                      {resultat.source}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Avantages Section */}
        <section id="solutions-sur-mesure" className="container mx-auto px-8 lg:px-16 py-20 bg-gradient-to-br from-orange-50/30 via-white to-blue-50/20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Pourquoi choisir CPU Formation ?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
            {avantages.map((avantage, idx) => {
              const Icon = avantage.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Cercle avec icône */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-9 h-9 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Effet de pulse au survol */}
                    <div className="absolute inset-0 rounded-full bg-orange-200 opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
                  </div>

                  {/* Titre */}
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {avantage.titre}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {avantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Partenaires Section */}
        <section id="partenariats" className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-blue-50 rounded-2xl md:rounded-3xl p-8 md:p-12 border-2 border-slate-100">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-orange-500 text-white border-0">
                <Building className="w-3 h-3 mr-1" />
                Partenariats
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Ils nous font confiance
              </h2>
              <p className="text-base md:text-lg text-slate-600">
                Des partenariats solides avec les acteurs majeurs de l'économie ivoirienne
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {partenaires.map((partenaire, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm transition-all animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="text-2xl font-bold text-orange-600 mb-1">{partenaire.count}</div>
                  <div className="text-sm text-slate-600">{partenaire.nom}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow-lg"
              >
                <Link href="#contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Devenir partenaire
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Entreprises Section */}
        <section id="faq" className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 md:mb-4 bg-blue-100 text-blue-700 border-blue-200 px-3 md:px-4 py-1 text-sm">
                <HeadphonesIcon className="w-3 h-3 mr-1" />
                FAQ
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                Questions fréquentes
              </h2>
              <p className="text-base md:text-lg text-slate-600">
                Tout ce que vous devez savoir sur nos formations entreprises
              </p>
            </div>

            <div className="space-y-4">
              {faqEntreprises.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white rounded-xl md:rounded-2xl border-2 border-slate-100 overflow-hidden transition-all animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer list-none">
                    <h3 className="text-base md:text-lg font-semibold text-slate-900 pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown className="w-5 h-5 text-orange-600 flex-shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed">
                      {faq.reponse}
                    </p>
                  </div>
                </details>
              ))}
            </div>

            <div className="text-center mt-8">
              <p className="text-slate-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="cursor-pointer border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                <Link href="#contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Contactez-nous
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Ressources téléchargeables Section */}
        <section id="ressources" className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 md:mb-4 bg-purple-100 text-purple-700 border-purple-200 px-3 md:px-4 py-1 text-sm">
                <Download className="w-3 h-3 mr-1" />
                Ressources gratuites
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                Téléchargez nos ressources
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                Guides, catalogues et outils pour vous aider à construire votre plan de formation
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {ressourcesEntreprises.map((ressource, idx) => {
                const Icon = ressource.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-6 border-2 border-slate-100 transition-all  animate-slide-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icône */}
                      <div className={`w-14 h-14 flex-shrink-0 rounded-xl bg-${ressource.color}-100 flex items-center justify-center`}>
                        <Icon className={`w-7 h-7 text-${ressource.color}-600`} />
                      </div>

                      {/* Contenu */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-slate-900">
                            {ressource.titre}
                          </h3>
                          {ressource.badge && (
                            <Badge className="bg-orange-100 text-orange-700 text-xs ml-2">
                              {ressource.badge}
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                          {ressource.description}
                        </p>

                        <div className="flex items-center justify-between">
<div className="flex items-center gap-3 text-xs text-slate-500">
                            <span>{ressource.format}</span>
                            <span>•</span>
                            <span>{ressource.taille}</span>
                            {ressource.downloads && (
                              <>
                                <span>•</span>
                                <span>{ressource.downloads} téléchargements</span>
                              </>
                            )}
                          </div>

                          <Button
                            asChild
                            size="sm"
                            className={`cursor-pointer bg-gradient-to-r from-${ressource.color}-500 to-${ressource.color}-600 hover:opacity-90 text-white`}
                          >
                            <Link href="#contact">
                              <Download className="mr-1 h-4 w-4" />
                              Télécharger
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Certifications & Labels Section */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 md:mb-4 bg-green-100 text-green-700 border-green-200 px-3 md:px-4 py-1 text-sm">
                <Award className="w-3 h-3 mr-1" />
                Qualité certifiée
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                Nos certifications & labels
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                Un gage de qualité et de sérieux reconnu par les instances officielles
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {certificationsLabels.map((certif, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 text-center border-2 border-slate-100 transition-all  animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {certif.nom}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">
                    {certif.description}
                  </p>
                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-xs text-slate-500">{certif.delivredPar}</p>
                    <p className="text-xs text-orange-600 font-semibold mt-1">{certif.annee}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact/Devis Section avec formulaire */}
        <section id="contact" className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <Badge className="mb-3 md:mb-4 bg-orange-100 text-orange-700 border-orange-200 px-3 md:px-4 py-1 text-sm">
                <Send className="w-3 h-3 mr-1" />
                Demande de devis
              </Badge>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                Démarrons votre projet ensemble
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
                Remplissez ce formulaire et nos experts vous répondront sous 24h ouvrées
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Colonne gauche - Formulaire */}
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-xl">
                <form className="space-y-4">
                  {/* Informations entreprise */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-lg text-slate-900 mb-4">Informations entreprise</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="entreprise" className="text-sm font-semibold text-slate-700 mb-2 block">
                          Nom de l'entreprise *
                        </Label>
                        <Input 
                          id="entreprise"
                          placeholder="Votre entreprise" 
                          required 
                          className="border-2 border-slate-200 focus:border-orange-500"
                          suppressHydrationWarning
                        />
                      </div>
                      <div>
                        <Label htmlFor="secteur" className="text-sm font-semibold text-slate-700 mb-2 block">
                          Secteur d'activité *
                        </Label>
                        <Input 
                          id="secteur"
                          placeholder="Ex: Banque, Télécom..." 
                          required 
                          className="border-2 border-slate-200 focus:border-orange-500"
                          suppressHydrationWarning
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="nom" className="text-sm font-semibold text-slate-700 mb-2 block">
                          Votre nom *
                        </Label>
                        <Input 
                          id="nom"
                          placeholder="Nom complet" 
                          required 
                          className="border-2 border-slate-200 focus:border-orange-500"
                          suppressHydrationWarning
                        />
                      </div>
                      <div>
                        <Label htmlFor="fonction" className="text-sm font-semibold text-slate-700 mb-2 block">
                          Votre fonction *
                        </Label>
                        <Input 
                          id="fonction"
                          placeholder="Ex: DRH, Directeur..." 
                          required 
                          className="border-2 border-slate-200 focus:border-orange-500"
                          suppressHydrationWarning
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-700 mb-2 block">
                          Email professionnel *
                        </Label>
                        <Input 
                          id="email"
                          type="email" 
                          placeholder="email@entreprise.ci" 
                          required 
                          className="border-2 border-slate-200 focus:border-orange-500"
                          suppressHydrationWarning
                        />
                      </div>
                      <div>
                        <Label htmlFor="tel" className="text-sm font-semibold text-slate-700 mb-2 block">
                          Téléphone *
                        </Label>
                        <Input 
                          id="tel"
                          type="tel" 
                          placeholder="+225 XX XX XX XX XX" 
                          required 
                          className="border-2 border-slate-200 focus:border-orange-500"
                          suppressHydrationWarning
                        />
                      </div>
                    </div>
                  </div>

                  {/* Besoins de formation */}
                  <div className="space-y-4 pt-4 border-t border-slate-100">
                    <h3 className="font-bold text-lg text-slate-900 mb-4">Votre besoin de formation</h3>
                    
                    <div>
                      <Label htmlFor="typebesoin" className="text-sm font-semibold text-slate-700 mb-2 block">
                        Type de besoin *
                      </Label>
                      <Select>
                        <SelectTrigger id="typebesoin" className="border-2 border-slate-200 focus:border-orange-500">
                          <SelectValue placeholder="Sélectionnez un type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pack-metier">Pack métier existant</SelectItem>
                          <SelectItem value="sur-mesure">Formation sur mesure</SelectItem>
                          <SelectItem value="accompagnement">Accompagnement stratégique</SelectItem>
                          <SelectItem value="audit">Audit & diagnostic</SelectItem>
                          <SelectItem value="autre">Autre besoin</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="collaborateurs" className="text-sm font-semibold text-slate-700 mb-2 block">
                          Nombre de collaborateurs *
                        </Label>
                        <Select>
                          <SelectTrigger id="collaborateurs" className="border-2 border-slate-200 focus:border-orange-500">
                            <SelectValue placeholder="Nombre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-10">1 à 10</SelectItem>
                            <SelectItem value="11-30">11 à 30</SelectItem>
                            <SelectItem value="31-50">31 à 50</SelectItem>
                            <SelectItem value="50+">Plus de 50</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="delai" className="text-sm font-semibold text-slate-700 mb-2 block">
                          Délai souhaité *
                        </Label>
                        <Select>
                          <SelectTrigger id="delai" className="border-2 border-slate-200 focus:border-orange-500">
                            <SelectValue placeholder="Délai" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="urgent">Urgent (&lt; 1 mois)</SelectItem>
                            <SelectItem value="court">Court terme (1-3 mois)</SelectItem>
                            <SelectItem value="moyen">Moyen terme (3-6 mois)</SelectItem>
                            <SelectItem value="long">Programmation future (&gt; 6 mois)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm font-semibold text-slate-700 mb-2 block">
                        Décrivez votre besoin
                      </Label>
                      <Textarea 
                        id="message"
                        placeholder="Décrivez vos objectifs, vos attentes, les compétences à développer..." 
                        rows={4}
                        className="border-2 border-slate-200 focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* RGPD */}
                  <div className="flex items-start gap-3 pt-4">
                    <Checkbox id="rgpd" className="mt-1" />
                    <Label htmlFor="rgpd" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                      J'accepte d'être contacté par CPU Formation et j'ai lu la politique de confidentialité. 
                      Mes données seront utilisées uniquement pour traiter ma demande. *
                    </Label>
                  </div>

                  {/* Submit */}
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow-lg"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Envoyer ma demande
                  </Button>

                  <p className="text-xs text-center text-slate-500">
                    ⚡ Réponse sous 24h ouvrées • 📞 Ou appelez-nous : +225 27 20 21 22 23
                  </p>
                </form>
              </div>

              {/* Colonne droite - Informations & Critères */}
              <div className="space-y-6">
                {/* Card 1 - Process simplifié */}
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl">
                  <Sparkles className="w-12 h-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-3">
                    Obtenez votre devis personnalisé
                  </h3>
                  <p className="text-orange-100 mb-6">
                    Notre équipe analyse votre besoin et vous propose une solution adaptée sous 24h
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Analyse gratuite de vos besoins</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Devis détaillé sous 24h</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Accompagnement FDFP offert</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-sm">Sans engagement</span>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Critères */}
                <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-xl">
                  <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-orange-600" />
                    Pour bien démarrer
                  </h3>
                  <div className="space-y-3">
                    {criteres.map((critere, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700">{critere}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card 3 - Contact direct */}
                <div className="bg-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-8 text-white shadow-xl">
                  <h3 className="font-bold text-lg mb-4">Besoin d'échanger directement ?</h3>
                  <div className="space-y-3">
                    <a href="tel:+22527202122 23" className="flex items-center gap-3 hover:text-orange-400 transition-colors">
                      <Phone className="w-5 h-5 text-orange-500" />
                      <span className="text-sm">+225 27 20 21 22 23</span>
                    </a>
                    <a href="mailto:entreprises@cpu-formation.ci" className="flex items-center gap-3 hover:text-orange-400 transition-colors">
                      <Mail className="w-5 h-5 text-orange-500" />
                      <span className="text-sm">entreprises@cpu-formation.ci</span>
                    </a>
                    <div className="flex items-center gap-3 text-slate-300">
                      <Clock className="w-5 h-5 text-orange-500" />
                      <span className="text-sm">Lun-Ven: 8h-18h, Sam: 9h-13h</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

