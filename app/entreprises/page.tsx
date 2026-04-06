"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { PageBanner } from "@/components/layout/PageBanner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
  Wallet,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";


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

type PackMetier = {
  titre: string;
  icon: any;
  description: string;
  duree: string;
  modules: number;
  formations: string[];
  prix: {
    parPersonne: number;
    groupe8Plus?: number;
    groupe15Plus?: number;
  };
  financement: {
    fdfpEligible: boolean;
    priseEnCharge: string;
    resteACharge: number;
  };
  color: string;
  gradient: string;
};

type ContactFormData = {
  entreprise: string;
  secteur: string;
  nom: string;
  fonction: string;
  email: string;
  tel: string;
  typebesoin: string;
  packInteresse: string;
  collaborateurs: string;
  delai: string;
  message: string;
  rgpd: boolean;
};

const initialFormData: ContactFormData = {
  entreprise: "",
  secteur: "",
  nom: "",
  fonction: "",
  email: "",
  tel: "",
  typebesoin: "",
  packInteresse: "",
  collaborateurs: "",
  delai: "",
  message: "",
  rgpd: false,
};

const packsMetiers: PackMetier[] = [
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
    entreprise: "Nova Finance CI",
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
    entreprise: "AgriSaveurs Côte d'Ivoire",
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
    entreprise: "MarketLink CI",
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

const criteres = [
  "Identifier précisément vos besoins en formation",
  "Définir vos objectifs de montée en compétences",
  "Prévoir un budget formation adapté",
  "Désigner un référent formation dans votre structure",
  "S'engager dans un processus d'amélioration continue"
];

type ApiPartenaire = {
  nom: string;
  countLabel: string;
  countValue: number;
  logo?: string;
};

type ApiFaqEntreprise = {
  id: string;
  question: string;
  reponse: string;
};

type ApiRessourceEntreprise = {
  id: string;
  titre: string;
  description: string;
  format: string;
  taille: string;
  badge?: string;
  downloads?: number;
  url?: string;
};

function normalizeArray(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

function parseCountLabel(raw: any): { countLabel: string; countValue: number } {
  const numberCandidate = Number(raw?.count ?? raw?.total ?? raw?.nombre ?? raw?.nb ?? 0);
  if (Number.isFinite(numberCandidate) && numberCandidate > 0) {
    return { countLabel: `${numberCandidate}+`, countValue: numberCandidate };
  }

  const textCandidate =
    raw?.countLabel || raw?.count_text || raw?.countText || raw?.label || raw?.value || "Partenaire actif";

  const extracted = String(textCandidate).match(/\d+/);
  const countValue = extracted ? Number(extracted[0]) : 0;

  return {
    countLabel: String(textCandidate),
    countValue: Number.isFinite(countValue) ? countValue : 0,
  };
}

function normalizePartenaires(payload: any): ApiPartenaire[] {
  const rawItems = normalizeArray(payload);

  const mapped = rawItems
    .map((item: any) => {
      const nom =
        item?.nom ||
        item?.name ||
        item?.entreprise ||
        item?.entreprise_nom ||
        item?.secteur ||
        item?.title;

      if (!nom) return null;

      const { countLabel, countValue } = parseCountLabel(item);

      return {
        nom: String(nom),
        countLabel,
        countValue,
        logo: item?.logo || item?.logo_url || item?.logoUrl || item?.image || undefined,
      } as ApiPartenaire;
    })
    .filter(Boolean) as ApiPartenaire[];

  const byName = new Map<string, ApiPartenaire>();
  mapped.forEach((item) => {
    if (!byName.has(item.nom)) {
      byName.set(item.nom, item);
    }
  });

  return Array.from(byName.values());
}

function normalizeFaqEntreprises(payload: any): ApiFaqEntreprise[] {
  const rawItems = normalizeArray(payload);

  return rawItems
    .map((item: any, index: number) => {
      const question = item?.question || item?.titre || item?.title;
      const reponse = item?.reponse || item?.answer || item?.description;
      const statut = String(item?.statut || item?.status || "").toLowerCase();

      if (!question || !reponse) return null;
      if (statut && !["publie", "publié", "published", "actif", "active"].includes(statut)) {
        return null;
      }

      return {
        id: String(item?.id || item?._id || `faq-${index}`),
        question: String(question),
        reponse: String(reponse),
      } as ApiFaqEntreprise;
    })
    .filter(Boolean) as ApiFaqEntreprise[];
}

function normalizeRessourcesEntreprises(payload: any): ApiRessourceEntreprise[] {
  const rawItems = normalizeArray(payload);

  return rawItems
    .map((item: any, index: number) => {
      const titre = item?.titre || item?.title || item?.nom || item?.name;
      const description = item?.description || item?.resume || item?.summary || "Ressource entreprise";

      if (!titre) return null;

      return {
        id: String(item?.id || item?._id || `ressource-${index}`),
        titre: String(titre),
        description: String(description),
        format: String(item?.format || item?.type || "PDF"),
        taille: String(item?.taille || item?.size || "-"),
        badge: item?.badge ? String(item.badge) : undefined,
        downloads: Number.isFinite(Number(item?.downloads ?? item?.telechargements))
          ? Number(item?.downloads ?? item?.telechargements)
          : undefined,
        url: item?.url || item?.file_url || item?.document_url || item?.download_url || item?.lien || undefined,
      } as ApiRessourceEntreprise;
    })
    .filter(Boolean) as ApiRessourceEntreprise[];
}

export default function EntreprisesPage() {
  const [apiPartenaires, setApiPartenaires] = useState<ApiPartenaire[]>([]);
  const [isPartenairesLoading, setIsPartenairesLoading] = useState(true);
  const [apiFaqEntreprises, setApiFaqEntreprises] = useState<ApiFaqEntreprise[]>([]);
  const [isFaqLoading, setIsFaqLoading] = useState(true);
  const [apiRessourcesEntreprises, setApiRessourcesEntreprises] = useState<ApiRessourceEntreprise[]>([]);
  const [isRessourcesLoading, setIsRessourcesLoading] = useState(true);
  const [selectedPackIndex, setSelectedPackIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    let isCancelled = false;

    async function fetchPartenaires() {
      setIsPartenairesLoading(true);
      try {
        const response = await apiClient.get('/api/formation/partenaire');
        const normalized = normalizePartenaires(response);
        if (!isCancelled) {
          setApiPartenaires(normalized);
        }
      } catch {
        if (!isCancelled) {
          setApiPartenaires([]);
        }
      } finally {
        if (!isCancelled) {
          setIsPartenairesLoading(false);
        }
      }
    }

    async function fetchFaqEntreprises() {
      setIsFaqLoading(true);
      try {
        const response = await apiClient.get('/api/formation/faqs/public');
        const normalized = normalizeFaqEntreprises(response);
        if (!isCancelled) {
          setApiFaqEntreprises(normalized);
        }
      } catch {
        if (!isCancelled) {
          setApiFaqEntreprises([]);
        }
      } finally {
        if (!isCancelled) {
          setIsFaqLoading(false);
        }
      }
    }

    async function fetchRessourcesEntreprises() {
      setIsRessourcesLoading(true);
      try {
        const response = await apiClient.get(API_ENDPOINTS.RESSOURCES.PUBLIC);
        const normalized = normalizeRessourcesEntreprises(response);
        if (!isCancelled) {
          setApiRessourcesEntreprises(normalized);
        }
      } catch {
        if (!isCancelled) {
          setApiRessourcesEntreprises([]);
        }
      } finally {
        if (!isCancelled) {
          setIsRessourcesLoading(false);
        }
      }
    }

    fetchPartenaires();
    fetchFaqEntreprises();
    fetchRessourcesEntreprises();

    return () => {
      isCancelled = true;
    };
  }, []);

  const logosClients = useMemo(
    () => apiPartenaires.map((partenaire) => partenaire.nom).slice(0, 12),
    [apiPartenaires]
  );

  const partenairesCards = useMemo(
    () => apiPartenaires.slice(0, 6),
    [apiPartenaires]
  );

  const totalPartenaires = useMemo(() => {
    const sum = apiPartenaires.reduce((acc, partenaire) => acc + partenaire.countValue, 0);
    return sum > 0 ? `${sum}+` : `${apiPartenaires.length}+`;
  }, [apiPartenaires]);

  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isPackDetailModalOpen, setIsPackDetailModalOpen] = useState(false);
  const selectedPack = selectedPackIndex !== null ? packsMetiers[selectedPackIndex] : null;
  const PackDetailIcon: React.ComponentType<{ className?: string }> = selectedPack?.icon ?? Target;

  const openGeneralContactModal = () => {
    setFormData(initialFormData);
    setSubmitStatus("idle");
    setIsContactModalOpen(true);
  };

  const handleInputChange = (field: keyof ContactFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submitStatus !== "idle") {
      setSubmitStatus("idle");
    }
  };

  const handleViewPackDetails = (index: number) => {
    setSelectedPackIndex(index);
    setIsPackDetailModalOpen(true);
  };

  const handleApplyToPack = (pack: PackMetier) => {
    setSelectedPackIndex(null);
    setFormData({
      ...initialFormData,
      typebesoin: "pack-metier",
      packInteresse: pack.titre,
      message: `Nous souhaitons postuler au ${pack.titre} (${pack.duree}, ${pack.modules} modules). Merci de nous envoyer les modalités de démarrage et les options de financement adaptées.`,
    });
    setSubmitStatus("idle");
    setIsContactModalOpen(true);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.rgpd) {
      setSubmitStatus("error");
      return;
    }
    setSubmitStatus("success");
    console.log("Demande entreprise:", formData);
    setTimeout(() => {
      setIsContactModalOpen(false);
      setFormData(initialFormData);
      setSubmitStatus("idle");
    }, 2500);
  };

  return (
    <>
      <PageBanner
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Entreprises" }
        ]}
        slides={[
          {
            image: "/images/default-formation.jpg",
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
              icon: "?? ",
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
            image: "/images/default-formation.jpg",
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
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12 border-b border-slate-100">
          <p className="text-center text-sm text-slate-600 mb-6 md:mb-8">
            Plus de {totalPartenaires} entreprises nous font confiance
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto items-center">
            {isPartenairesLoading && Array.from({ length: 6 }).map((_, idx) => (
              <div key={`loading-${idx}`} className="p-2 sm:p-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto rounded-full bg-slate-100 animate-pulse" />
              </div>
            ))}

            {!isPartenairesLoading && logosClients.map((client, idx) => (
              <div
                key={client}
                className="flex items-center justify-center p-2 sm:p-4 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 animate-fade-in"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="text-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto rounded-full bg-slate-100 flex items-center justify-center mb-2">
                    <Building className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-slate-400" />
                  </div>
                  <p className="text-xs text-slate-500 font-medium">{client}</p>
                </div>
              </div>
            ))}

            {!isPartenairesLoading && logosClients.length === 0 && (
              <div className="col-span-full text-center text-sm text-slate-500 py-6">
                Aucune entreprise partenaire disponible pour le moment.
              </div>
            )}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 sm:gap-6 relative">
              {/* Ligne connectrice sur desktop */}
              <div className="hidden xl:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 z-0" style={{ top: '4rem' }}></div>
              
              {processusCollaboration.map((etape, idx) => {
                const Icon = etape.icon;
                return (
                  <div
                    key={idx}
                    className="relative z-10 animate-slide-up"
                    style={{ animationDelay: `${idx * 150}ms` }}
                  >
                    <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-slate-100 shadow-lg transition-all text-center h-full">
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
        <section id="services-entreprises" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10 sm:mb-12 animate-slide-up">
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-0">
              <Briefcase className="w-3 h-3 mr-1" />
              Nos services
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Des solutions adaptées à vos besoins
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Un accompagnement complet pour développer les compétences de vos collaborateurs
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 max-w-6xl mx-auto">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Card
                  key={idx}
                  className="p-5 sm:p-6 transition-all duration-300 border-2 hover:border-orange-200 animate-slide-up"
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
        <section id="former-vos-equipes" className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10 sm:mb-12 animate-slide-up">
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-0">
              <Briefcase className="w-3 h-3 mr-1" />
              Packs métiers
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Packs métiers
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
              Des parcours de formation thématiques pour chaque fonction clé de l'entreprise
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6 max-w-7xl mx-auto">
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-3 mb-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${pack.gradient} text-white shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex flex-wrap gap-2 w-full sm:w-auto">
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
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
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

                    {/* CTA Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer border-slate-300 hover:bg-slate-50 text-xs sm:text-sm"
                        onClick={() => handleViewPackDetails(idx)}
                      >
                        En savoir plus
                      </Button>
                      <Button
                        type="button"
                        className={`cursor-pointer bg-gradient-to-r ${pack.gradient} hover:opacity-90 text-white shadow-md transition-all text-xs sm:text-sm`}
                        onClick={() => handleApplyToPack(pack)}
                      >
                        Postuler
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* CTA général */}
          <div className="text-center mt-12 px-4">
            <p className="text-slate-600 mb-4">Besoin d'un pack personnalisé ?</p>
            <Button
              size="lg"
              variant="outline"
              className="cursor-pointer border-2 border-orange-500 text-orange-600 hover:bg-orange-50 w-full sm:w-auto"
              onClick={openGeneralContactModal}
            >
              <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
              <span className="text-xs sm:text-base leading-tight">
                <span className="hidden sm:inline">Contactez-nous pour un programme sur mesure</span>
                <span className="sm:hidden">Programme sur mesure</span>
              </span>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
                size="lg"
                className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:opacity-90 text-white shadow-lg"
                onClick={openGeneralContactModal}
              >
                <Shield className="mr-2 h-5 w-5" />
                Télécharger le guide FDFP
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

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
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
        <section id="solutions-sur-mesure" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 bg-gradient-to-br from-orange-50/30 via-white to-blue-50/20">
          <div className="text-center mb-10 sm:mb-12 md:mb-16 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Pourquoi choisir CPU Formation ?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 sm:gap-8 max-w-7xl mx-auto">
            {avantages.map((avantage, idx) => {
              const Icon = avantage.icon;
              return (
                <div
                  key={idx}
                  className="flex sm:flex-col items-start sm:items-center gap-4 sm:gap-0 text-left sm:text-center group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Cercle avec icône */}
                  <div className="relative sm:mb-6 flex-shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-7 h-7 sm:w-9 sm:h-9 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Effet de pulse au survol */}
                    <div className="absolute inset-0 rounded-full bg-orange-200 opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {avantage.titre}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {avantage.description}
                    </p>
                  </div>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {isPartenairesLoading && Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={`partenaire-loading-${idx}`}
                  className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm animate-pulse"
                >
                  <div className="h-8 w-20 mx-auto bg-slate-200 rounded mb-2" />
                  <div className="h-4 w-28 mx-auto bg-slate-100 rounded" />
                </div>
              ))}

              {!isPartenairesLoading && partenairesCards.map((partenaire, idx) => (
                <div
                  key={partenaire.nom}
                  className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm transition-all animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="text-2xl font-bold text-orange-600 mb-1">{partenaire.countLabel}</div>
                  <div className="text-sm text-slate-600">{partenaire.nom}</div>
                </div>
              ))}

              {!isPartenairesLoading && partenairesCards.length === 0 && (
                <div className="sm:col-span-2 lg:col-span-3 text-center text-sm text-slate-500 py-6">
                  Les données partenaires sont temporairement indisponibles.
                </div>
              )}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow-lg"
                onClick={openGeneralContactModal}
              >
                <Mail className="mr-2 h-5 w-5" />
                Devenir partenaire
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
              {isFaqLoading && Array.from({ length: 4 }).map((_, idx) => (
                <div key={`faq-loading-${idx}`} className="rounded-xl md:rounded-2xl border-2 border-slate-100 bg-white p-5 md:p-6 animate-pulse">
                  <div className="h-5 w-3/4 bg-slate-200 rounded mb-4" />
                  <div className="h-4 w-full bg-slate-100 rounded" />
                </div>
              ))}

              {!isFaqLoading && apiFaqEntreprises.map((faq, idx) => (
                <details
                  key={faq.id}
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

              {!isFaqLoading && apiFaqEntreprises.length === 0 && (
                <div className="text-center text-sm text-slate-500 py-8 bg-white rounded-xl md:rounded-2xl border-2 border-slate-100">
                  Impossible de charger les FAQ pour le moment.
                </div>
              )}
            </div>

            <div className="text-center mt-8">
              <p className="text-slate-600 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
              <Button
                size="lg"
                variant="outline"
                className="cursor-pointer border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                onClick={openGeneralContactModal}
              >
                <Mail className="mr-2 h-5 w-5" />
                Contactez-nous
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {isRessourcesLoading && Array.from({ length: 4 }).map((_, idx) => (
                <div key={`ressource-loading-${idx}`} className="bg-white rounded-2xl p-6 border-2 border-slate-100 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-slate-200" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 w-2/3 bg-slate-200 rounded" />
                      <div className="h-4 w-full bg-slate-100 rounded" />
                      <div className="h-4 w-1/2 bg-slate-100 rounded" />
                    </div>
                  </div>
                </div>
              ))}

              {!isRessourcesLoading && apiRessourcesEntreprises.map((ressource, idx) => {
                const colorThemes = [
                  {
                    iconWrap: "bg-orange-100",
                    iconColor: "text-orange-600",
                    buttonClass: "from-orange-500 to-orange-600",
                  },
                  {
                    iconWrap: "bg-green-100",
                    iconColor: "text-green-600",
                    buttonClass: "from-green-500 to-green-600",
                  },
                  {
                    iconWrap: "bg-blue-100",
                    iconColor: "text-blue-600",
                    buttonClass: "from-blue-500 to-blue-600",
                  },
                  {
                    iconWrap: "bg-purple-100",
                    iconColor: "text-purple-600",
                    buttonClass: "from-purple-500 to-purple-600",
                  },
                ];
                const theme = colorThemes[idx % colorThemes.length];
                const Icon = FileText;

                return (
                  <div
                    key={ressource.id}
                    className="bg-white rounded-2xl p-6 border-2 border-slate-100 transition-all  animate-slide-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      {/* Icône */}
                      <div className={`w-14 h-14 flex-shrink-0 rounded-xl ${theme.iconWrap} flex items-center justify-center`}>
                        <Icon className={`w-7 h-7 ${theme.iconColor}`} />
                      </div>

                      {/* Contenu */}
                      <div className="flex-1 min-w-0 w-full">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 break-words">
                            {ressource.titre}
                          </h3>
                          {ressource.badge && (
                            <Badge className="bg-orange-100 text-orange-700 text-xs w-fit sm:ml-2">
                              {ressource.badge}
                            </Badge>
                          )}
                        </div>

                        <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                          {ressource.description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
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
                            size="sm"
                            className={`cursor-pointer bg-gradient-to-r ${theme.buttonClass} hover:opacity-90 text-white w-full sm:w-auto`}
                            onClick={() => {
                              if (ressource.url) {
                                window.open(ressource.url, "_blank", "noopener,noreferrer");
                                return;
                              }
                              openGeneralContactModal();
                            }}
                          >
                            <Download className="mr-1 h-4 w-4" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {!isRessourcesLoading && apiRessourcesEntreprises.length === 0 && (
                <div className="lg:col-span-2 text-center text-sm text-slate-500 py-8 bg-white rounded-2xl border-2 border-slate-100">
                  Aucune ressource téléchargeable disponible pour le moment.
                </div>
              )}
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

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
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

        {/* CTA Section - Démarrons votre projet */}
        <section id="contact" className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 rounded-3xl p-8 md:p-12 text-white text-center shadow-2xl overflow-hidden">
              {/* Décorations subtiles */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/3 pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 mb-6 shadow-lg">
                  <Send className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
                  Démarrons votre projet ensemble
                </h2>
                <p className="text-orange-100 mb-8 max-w-xl mx-auto text-base md:text-lg">
                  Obtenez une proposition personnalisée adaptée à vos besoins. Nos experts vous répondent sous 24h ouvrées.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                  <Button
                    size="lg"
                    className="cursor-pointer bg-white text-orange-600 hover:bg-orange-50 shadow-lg font-semibold px-8"
                    onClick={openGeneralContactModal}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Demander un devis gratuit
                  </Button>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 text-sm max-w-2xl mx-auto">
                  <a href="tel:+22527202122" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-3">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>+225 27 20 21 22 23</span>
                  </a>
                  <a href="mailto:entreprises@cpu-formation.ci" className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 transition-colors rounded-xl p-3 min-w-0">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="truncate">entreprises@cpu-formation.ci</span>
                  </a>
                  <div className="flex items-center justify-center gap-2 bg-white/10 rounded-xl p-3">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>Lun-Sam : 8h-18h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ══════════════════════════════════════
          Modal — Détail Pack Métier
      ══════════════════════════════════════ */}
      <Dialog
        open={isPackDetailModalOpen}
        onOpenChange={(open) => {
          setIsPackDetailModalOpen(open);
          if (!open) setSelectedPackIndex(null);
        }}
      >
        <DialogContent hideClose className="max-w-xl w-full max-h-[92vh] overflow-y-auto p-0 gap-0">
          {selectedPack && (
            <>
              {/* ── Header gradient pack ── */}
              <div className={`relative p-6 md:p-8 bg-gradient-to-br ${selectedPack.gradient} overflow-hidden`}>
                {/* Cercles décoratifs */}
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/10 rounded-full pointer-events-none" />
                <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-white/10 rounded-full pointer-events-none" />
                <div className="absolute top-1/2 right-20 w-16 h-16 bg-white/5 rounded-full pointer-events-none" />

                {/* Bouton fermer */}
                <DialogClose className="absolute right-4 top-4 z-20 w-9 h-9 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition-all duration-200 hover:scale-110">
                  <X className="w-4 h-4 text-white" />
                </DialogClose>

                <DialogHeader className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg ring-2 ring-white/30">
                      <PackDetailIcon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <Badge className="mb-1.5 bg-white/25 text-white border-white/40 text-xs font-semibold">
                        Pack métier
                      </Badge>
                      <DialogTitle className="text-xl font-bold text-white leading-tight">
                        {selectedPack.titre}
                      </DialogTitle>
                    </div>
                  </div>
                  <DialogDescription className="text-white/80 text-sm leading-relaxed">
                    {selectedPack.description}
                  </DialogDescription>
                </DialogHeader>

                {/* ── Barre KPI ── */}
                <div className="relative z-10 grid grid-cols-3 mt-5 bg-black/15 rounded-2xl overflow-hidden">
                  <div className="text-center px-4 py-4">
                    <p className="text-2xl font-bold text-white">{selectedPack.duree}</p>
                    <p className="text-xs text-white/65 mt-0.5 uppercase tracking-wide">Durée</p>
                  </div>
                  <div className="text-center px-4 py-4 border-x border-white/20">
                    <p className="text-2xl font-bold text-white">{selectedPack.modules}</p>
                    <p className="text-xs text-white/65 mt-0.5 uppercase tracking-wide">Modules</p>
                  </div>
                  <div className="text-center px-4 py-4">
                    <p className="text-2xl font-bold text-white">{(selectedPack.financement.resteACharge / 1000).toFixed(0)}k</p>
                    <p className="text-xs text-white/65 mt-0.5 uppercase tracking-wide">FCFA/pers*</p>
                  </div>
                </div>
              </div>

              {/* ── Body ── */}
              <div className="p-6 md:p-8 space-y-6 bg-white">
                {/* Formations incluses */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                      <GraduationCap className="w-3.5 h-3.5" />
                      Formations incluses
                    </div>
                    <div className="flex-1 h-px bg-slate-100" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedPack.formations.map((formation, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 bg-slate-50 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-all rounded-xl p-3 group cursor-default"
                      >
                        <div className="w-6 h-6 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 transition-colors">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-800">{formation}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tarification */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide">
                      <CreditCard className="w-3.5 h-3.5" />
                      Tarification
                    </div>
                    <div className="flex-1 h-px bg-slate-100" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl px-4 py-3.5">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Users className="w-4 h-4 text-slate-400" />
                        Par personne
                      </div>
                      <span className="font-bold text-slate-900">{selectedPack.prix.parPersonne.toLocaleString()} FCFA</span>
                    </div>
                    {selectedPack.prix.groupe8Plus && (
                      <div className="flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl px-4 py-3.5">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Users className="w-4 h-4 text-slate-400" />
                          Groupe 8+
                          <Badge variant="outline" className="text-xs border-blue-200 text-blue-600 bg-blue-50">-15%</Badge>
                        </div>
                        <span className="font-bold text-slate-900">{selectedPack.prix.groupe8Plus.toLocaleString()} FCFA</span>
                      </div>
                    )}
                    {selectedPack.prix.groupe15Plus && (
                      <div className="flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors rounded-xl px-4 py-3.5">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Users className="w-4 h-4 text-slate-400" />
                          Groupe 15+
                          <Badge variant="outline" className="text-xs border-green-200 text-green-700 bg-green-50">-25%</Badge>
                        </div>
                        <span className="font-bold text-slate-900">{selectedPack.prix.groupe15Plus.toLocaleString()} FCFA</span>
                      </div>
                    )}
                  </div>

                  {/* FDFP */}
                  {selectedPack.financement.fdfpEligible && (
                    <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 mt-3">
                      <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-green-800">Éligible au financement FDFP</p>
                        <p className="text-xs text-green-600 mt-0.5">
                          Prise en charge {selectedPack.financement.priseEnCharge} — Reste à charge :{" "}
                          <span className="font-bold">{(selectedPack.financement.resteACharge / 1000).toFixed(0)}k FCFA/pers</span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* CTA Postuler */}
                <Button
                  size="lg"
                  className={`w-full cursor-pointer bg-gradient-to-r ${selectedPack.gradient} hover:opacity-90 text-white shadow-lg h-12 rounded-xl font-semibold transition-all hover:shadow-xl hover:scale-[1.01]`}
                  onClick={() => {
                    setIsPackDetailModalOpen(false);
                    handleApplyToPack(selectedPack);
                  }}
                >
                  Postuler à ce pack
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-xs text-center text-slate-400">
                  *Prix estimé avec prise en charge FDFP à {selectedPack.financement.priseEnCharge}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* ══════════════════════════════════════
          Modal — Formulaire Contact / Candidature
      ══════════════════════════════════════ */}
      <Dialog
        open={isContactModalOpen}
        onOpenChange={(open) => {
          setIsContactModalOpen(open);
          if (!open) {
            setFormData(initialFormData);
            setSubmitStatus("idle");
          }
        }}
      >
        <DialogContent hideClose className="max-w-2xl w-full max-h-[92vh] overflow-y-auto p-0 gap-0">
          {/* ── Header ── */}
          <div
            className={`relative p-6 md:p-8 overflow-hidden ${
              formData.packInteresse
                ? "bg-gradient-to-br from-orange-500 to-orange-700"
                : "bg-gradient-to-br from-slate-800 to-slate-900"
            }`}
          >
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/5 rounded-full pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white/5 rounded-full pointer-events-none" />

            {/* Bouton fermer */}
            <DialogClose className="absolute right-4 top-4 z-20 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center transition-all duration-200 hover:scale-110">
              <X className="w-4 h-4 text-white" />
            </DialogClose>

            <DialogHeader className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-white/15 rounded-xl flex items-center justify-center ring-2 ring-white/20">
                  <Send className="w-5 h-5 text-white" />
                </div>
                {formData.packInteresse && (
                  <Badge className="bg-white/20 text-white border-white/35 text-xs font-semibold">
                    <Briefcase className="w-3 h-3 mr-1.5" />
                    {formData.packInteresse}
                  </Badge>
                )}
              </div>
              <DialogTitle className="text-xl md:text-2xl font-bold text-white leading-tight">
                {formData.packInteresse ? "Postuler à ce pack métier" : "Démarrons votre projet ensemble"}
              </DialogTitle>
              <DialogDescription className="text-white/75 mt-2 text-sm leading-relaxed">
                Nos experts vous répondront sous 24h ouvrées avec une proposition personnalisée
              </DialogDescription>
            </DialogHeader>
          </div>

          {/* ── Corps du formulaire ── */}
          <div className="p-6 md:p-8 bg-white">
            <form className="space-y-6" onSubmit={handleSubmit}>

              {/* ─── Section Entreprise ─── */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide flex-shrink-0">
                    <Building className="w-3.5 h-3.5" />
                    Votre entreprise
                  </div>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="m-entreprise" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Nom de l'entreprise *
                    </Label>
                    <Input
                      id="m-entreprise"
                      placeholder="Votre entreprise"
                      required
                      value={formData.entreprise}
                      onChange={(e) => handleInputChange("entreprise", e.target.value)}
                      className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder:text-slate-400 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="m-secteur" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Secteur d'activité *
                    </Label>
                    <Input
                      id="m-secteur"
                      placeholder="Ex: Banque, Télécom..."
                      required
                      value={formData.secteur}
                      onChange={(e) => handleInputChange("secteur", e.target.value)}
                      className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder:text-slate-400 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="m-nom" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Votre nom *
                    </Label>
                    <Input
                      id="m-nom"
                      placeholder="Nom complet"
                      required
                      value={formData.nom}
                      onChange={(e) => handleInputChange("nom", e.target.value)}
                      className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder:text-slate-400 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="m-fonction" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Votre fonction *
                    </Label>
                    <Input
                      id="m-fonction"
                      placeholder="Ex: DRH, Directeur..."
                      required
                      value={formData.fonction}
                      onChange={(e) => handleInputChange("fonction", e.target.value)}
                      className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder:text-slate-400 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="m-email" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Email professionnel *
                    </Label>
                    <Input
                      id="m-email"
                      type="email"
                      placeholder="email@entreprise.ci"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder:text-slate-400 text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="m-tel" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Téléphone *
                    </Label>
                    <Input
                      id="m-tel"
                      type="tel"
                      placeholder="+225 XX XX XX XX XX"
                      required
                      value={formData.tel}
                      onChange={(e) => handleInputChange("tel", e.target.value)}
                      className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all placeholder:text-slate-400 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* ─── Section Besoin ─── */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide flex-shrink-0">
                    <Target className="w-3.5 h-3.5" />
                    Votre besoin
                  </div>
                  <div className="flex-1 h-px bg-slate-100" />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="m-typebesoin" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Type de besoin *
                  </Label>
                  <Select value={formData.typebesoin} onValueChange={(value) => handleInputChange("typebesoin", value)}>
                    <SelectTrigger
                      id="m-typebesoin"
                      className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm"
                    >
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-0 shadow-xl">
                      <SelectItem value="pack-metier">Pack métier existant</SelectItem>
                      <SelectItem value="sur-mesure">Formation sur mesure</SelectItem>
                      <SelectItem value="accompagnement">Accompagnement stratégique</SelectItem>
                      <SelectItem value="audit">Audit & diagnostic</SelectItem>
                      <SelectItem value="autre">Autre besoin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.typebesoin === "pack-metier" && (
                  <div className="space-y-1.5">
                    <Label htmlFor="m-pack" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Pack sélectionné
                    </Label>
                    <Input
                      id="m-pack"
                      value={formData.packInteresse}
                      onChange={(e) => handleInputChange("packInteresse", e.target.value)}
                      placeholder="Ex: Pack Direction & Management"
                      className="h-11 rounded-xl border-2 border-orange-200 bg-orange-50 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all text-sm font-medium"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="m-collaborateurs" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Collaborateurs *
                    </Label>
                    <Select value={formData.collaborateurs} onValueChange={(value) => handleInputChange("collaborateurs", value)}>
                      <SelectTrigger
                        id="m-collaborateurs"
                        className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm"
                      >
                        <SelectValue placeholder="Nombre" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-0 shadow-xl">
                        <SelectItem value="1-10">1 à 10</SelectItem>
                        <SelectItem value="11-30">11 à 30</SelectItem>
                        <SelectItem value="31-50">31 à 50</SelectItem>
                        <SelectItem value="50+">Plus de 50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="m-delai" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Délai souhaité *
                    </Label>
                    <Select value={formData.delai} onValueChange={(value) => handleInputChange("delai", value)}>
                      <SelectTrigger
                        id="m-delai"
                        className="h-11 rounded-xl border-2 border-slate-200 bg-slate-50 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 text-sm"
                      >
                        <SelectValue placeholder="Délai" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-0 shadow-xl">
                        <SelectItem value="urgent">Urgent (&lt; 1 mois)</SelectItem>
                        <SelectItem value="court">Court terme (1-3 mois)</SelectItem>
                        <SelectItem value="moyen">Moyen terme (3-6 mois)</SelectItem>
                        <SelectItem value="long">Programmation future (&gt; 6 mois)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="m-message" className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Décrivez votre besoin
                  </Label>
                  <Textarea
                    id="m-message"
                    placeholder="Décrivez vos objectifs, vos attentes, les compétences à développer..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    className="rounded-xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all resize-none placeholder:text-slate-400 text-sm"
                  />
                </div>
              </div>

              {/* ─── RGPD ─── */}
              <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 border border-slate-100">
                <Checkbox
                  id="m-rgpd"
                  className="mt-0.5 border-2 border-slate-300 data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-500"
                  checked={formData.rgpd}
                  onCheckedChange={(checked) => handleInputChange("rgpd", checked === true)}
                />
                <Label htmlFor="m-rgpd" className="text-xs text-slate-600 leading-relaxed cursor-pointer">
                  J'accepte d'être contacté par CPU Formation et j'ai lu la politique de confidentialité.
                  Mes données seront utilisées uniquement pour traiter ma demande. *
                </Label>
              </div>

              {/* ─── Feedback états ─── */}
              {submitStatus === "error" && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-xl p-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <p className="text-sm text-red-700">Veuillez accepter la politique de confidentialité pour envoyer votre demande.</p>
                </div>
              )}

              {submitStatus === "success" && (
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl p-4 animate-in fade-in zoom-in-95 duration-200">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-green-800">Demande envoyée avec succès !</p>
                    <p className="text-xs text-green-600 mt-0.5">Notre équipe vous recontactera sous 24h ouvrées.</p>
                  </div>
                </div>
              )}

              {/* ─── Bouton Submit ─── */}
              <Button
                type="submit"
                size="lg"
                disabled={submitStatus === "success"}
                className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl disabled:opacity-60 h-12 rounded-xl font-semibold transition-all hover:scale-[1.01]"
              >
                <Send className="mr-2 h-5 w-5" />
                {submitStatus === "success" ? "Demande envoyée !" : "Envoyer ma demande"}
              </Button>

              <p className="text-xs text-center text-slate-400">
                Réponse sous 24h ouvrées · Appelez-nous : +225 27 20 21 22 23
              </p>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
