"use client";

import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/search-bar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, CheckCircle2, Clock, Users, TrendingUp, Shield, BookOpen, Send, FileCheck, Star, ArrowRight, Download, Sparkles, FileText, Wallet, ShoppingBag, Factory, Search, Grid3x3, List, LayoutGrid, Calendar, MapPin, CreditCard, Banknote, Briefcase, Quote, SlidersHorizontal, RotateCcw, Tag, BarChart3 } from "lucide-react";
import { useMemo } from "react";
import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";

type Certification = {
  id: string | number;
  title: string;
  category: string;
  niveau: string;
  duree: string;
  modules: number;
  color: string;
  gradient: string;
  bgLight: string;
  textColor: string;
  description: string;
  competences: string[];
  validite: string;
};

type VerifyResponse = {
  valid: boolean;
  certification?: {
    id?: string;
    code?: string;
    typeCertification?: {
      nom?: string;
      code?: string;
      niveau?: string;
    };
    formation?: {
      title?: string;
    };
    dateExpiration?: string | null;
    dateDelivrance?: string | null;
    tauxReussite?: string | number;
  };
};

const CERTIFICATION_STYLES = [
  { color: "orange", gradient: "from-orange-500 to-orange-600", bgLight: "bg-orange-50", borderColor: "border-orange-200", textColor: "text-orange-600" },
  { color: "indigo", gradient: "from-indigo-500 to-indigo-600", bgLight: "bg-indigo-50", borderColor: "border-indigo-200", textColor: "text-indigo-600" },
  { color: "green", gradient: "from-green-500 to-green-600", bgLight: "bg-green-50", borderColor: "border-green-200", textColor: "text-green-600" },
  { color: "purple", gradient: "from-purple-500 to-purple-600", bgLight: "bg-purple-50", borderColor: "border-purple-200", textColor: "text-purple-600" },
  { color: "cyan", gradient: "from-cyan-500 to-cyan-600", bgLight: "bg-cyan-50", borderColor: "border-cyan-200", textColor: "text-cyan-600" },
  { color: "blue", gradient: "from-blue-500 to-blue-600", bgLight: "bg-blue-50", borderColor: "border-blue-200", textColor: "text-blue-600" },
] as const;

function normalizeArray(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

function normalizeTypesCertifications(payload: any): Certification[] {
  const rawItems = normalizeArray(payload);

  return rawItems
    .map((item: any, index: number) => {
      const title = item?.nom || item?.title || item?.name;
      if (!title) return null;

      const style = CERTIFICATION_STYLES[index % CERTIFICATION_STYLES.length];
      const category = item?.categorie || item?.category || item?.domaine || "Général";
      const level = item?.niveau || item?.level || "Professionnel";
      const modules = Number(item?.modules || item?.nombreModules || item?.nbModules || 0);
      const competences = Array.isArray(item?.competences)
        ? item.competences.map((c: any) => String(c))
        : Array.isArray(item?.competencesCles)
          ? item.competencesCles.map((c: any) => String(c))
          : [];

      return {
        id: String(item?.id || item?.code || `type-certification-${index}`),
        title: String(title),
        category: String(category),
        niveau: String(level),
        duree: String(item?.duree || (item?.dureeHeures ? `${item.dureeHeures}h` : "")),
        modules: Number.isFinite(modules) && modules > 0 ? modules : 0,
        color: style.color,
        gradient: style.gradient,
        bgLight: style.bgLight,
        textColor: style.textColor,
        description: String(item?.description || "Certification professionnelle"),
        competences,
        validite: item?.dureeValidite ? `${item.dureeValidite} mois` : "",
      } as Certification;
    })
    .filter(Boolean) as Certification[];
}

function normalizeVerifyResponse(payload: any): VerifyResponse {
  const source = payload?.data || payload;
  return {
    valid: Boolean(source?.valid),
    certification: source?.certification,
  };
}

function formatApiDate(value: unknown): string {
  if (!value) return "Non renseignée";
  if (typeof value !== "string") return "Non renseignée";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("fr-FR");
}

const fallbackCertifications: Certification[] = [
  {
    id: 1,
    title: "Certification Entrepreneur PME",
    category: "Entrepreneuriat",
    niveau: "Fondamental",
    duree: "60h",
    modules: 8,
    color: "orange",
    gradient: "from-orange-500 to-orange-600",
    bgLight: "bg-orange-50",
    textColor: "text-orange-600",
    description: "Validez vos compétences en création et gestion d'entreprise. Cette certification atteste de votre maîtrise des fondamentaux entrepreneuriaux.",
    competences: ["Business Plan", "Gestion financière", "Marketing", "Management", "Juridique"],
    validite: "3 ans",
  },
  {
    id: 2,
    title: "Certification Marchés Publics",
    category: "Appels d'offres",
    niveau: "Professionnel",
    duree: "40h",
    modules: 6,
    color: "indigo",
    gradient: "from-indigo-500 to-indigo-600",
    bgLight: "bg-indigo-50",
    textColor: "text-indigo-600",
    description: "Devenez expert en réponse aux appels d'offres publics et privés. Certification reconnue par les institutions publiques.",
    competences: ["Analyse AO", "Rédaction technique", "Chiffrage", "Conformité", "Négociation"],
    validite: "2 ans",
  },
  {
    id: 3,
    title: "Certification E-Commerce",
    category: "Digital",
    niveau: "Professionnel",
    duree: "50h",
    modules: 7,
    color: "green",
    gradient: "from-green-500 to-green-600",
    bgLight: "bg-green-50",
    textColor: "text-green-600",
    description: "Maîtrisez les stratégies de vente en ligne et de gestion de marketplace. Certification adaptée au marché africain.",
    competences: ["Boutique en ligne", "Marketing digital", "Logistique", "SEO", "Analytics"],
    validite: "2 ans",
  },
  {
    id: 4,
    title: "Certification Financement",
    category: "Finance",
    niveau: "Expert",
    duree: "35h",
    modules: 5,
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50",
    textColor: "text-purple-600",
    description: "Expertise en montage de dossiers de financement et relations bancaires. Augmentez votre bancabilité.",
    competences: ["Business plan financier", "Analyse financière", "Négociation", "Levée de fonds", "Garanties"],
    validite: "3 ans",
  },
  {
    id: 5,
    title: "Certification Qualité ISO",
    category: "Production",
    niveau: "Expert",
    duree: "45h",
    modules: 6,
    color: "cyan",
    gradient: "from-cyan-500 to-cyan-600",
    bgLight: "bg-cyan-50",
    textColor: "text-cyan-600",
    description: "Maîtrisez les normes de qualité et préparez votre entreprise à la certification ISO. Parcours complet avec audit.",
    competences: ["Normes ISO", "HACCP", "Documentation", "Audit", "Amélioration continue"],
    validite: "3 ans",
  },
  {
    id: 6,
    title: "Certification Management",
    category: "Leadership",
    niveau: "Professionnel",
    duree: "30h",
    modules: 5,
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    textColor: "text-blue-600",
    description: "Développez vos compétences en leadership et management d'équipe. Certification pour managers et futurs dirigeants.",
    competences: ["Leadership", "Gestion d'équipe", "Communication", "Motivation", "Performance"],
    validite: "2 ans",
  },
];

const avantages = [
  {
    icon: Shield,
    title: "Reconnaissance officielle",
    description: "Nos certifications sont reconnues par les institutions et entreprises"
  },
  {
    icon: TrendingUp,
    title: "Évolution de carrière",
    description: "Boostez votre employabilité et accédez à de nouvelles opportunités"
  },
  {
    icon: Users,
    title: "Réseau professionnel",
    description: "Rejoignez une communauté de professionnels certifiés"
  },
  {
    icon: BookOpen,
    title: "Formation continue",
    description: "Accédez à des ressources exclusives et mises à jour régulières"
  }
];

const processus = [
  {
    numero: 1,
    titre: "Inscription",
    description: "Choisissez votre certification et inscrivez-vous en ligne"
  },
  {
    numero: 2,
    titre: "Formation",
    description: "Suivez les modules de formation à votre rythme"
  },
  {
    numero: 3,
    titre: "Évaluation",
    description: "Passez les examens et validez vos compétences"
  },
  {
    numero: 4,
    titre: "Certification",
    description: "Recevez votre certificat digital et badge numérique"
  }
];

type ViewMode = "grid" | "list" | "compact";

// Composant pour la grille de certifications
function CertificationsGrid({ certifications, viewMode }: { certifications: Certification[]; viewMode: ViewMode }) {

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {certifications.map((cert, idx) => (
          <div
            key={cert.id}
            className="group flex overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
            style={{ animationDelay: `${idx * 0.06}s` }}
          >
            {/* Accent bar */}
            <div className={`w-1.5 flex-shrink-0 bg-gradient-to-b ${cert.gradient}`} />
            {/* Icon column */}
            <div className={`w-20 flex-shrink-0 ${cert.bgLight} flex flex-col items-center justify-center py-5 gap-2`}>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center shadow`}>
                <Award className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xs font-bold ${cert.textColor} text-center px-1 leading-tight`}>{cert.niveau}</span>
            </div>
            {/* Content */}
            <div className="flex-1 p-4 md:p-5 flex flex-col md:flex-row gap-4 min-w-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-cpu-orange transition-colors">{cert.title}</h3>
                  <Badge className={`${cert.bgLight} ${cert.textColor} border-0 whitespace-nowrap flex-shrink-0 text-xs`}>{cert.category}</Badge>
                </div>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{cert.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {cert.validite && (
                    <span className="flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                      <Shield className="w-3 h-3" /> {cert.validite}
                    </span>
                  )}
                  {cert.duree && (
                    <span className="flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                      <Clock className="w-3 h-3" /> {cert.duree}
                    </span>
                  )}
                  {cert.modules > 0 && (
                    <span className="flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                      <BookOpen className="w-3 h-3" /> {cert.modules} modules
                    </span>
                  )}
                </div>
                {cert.competences.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {cert.competences.slice(0, 4).map((comp, i) => (
                      <Badge key={i} variant="outline" className={`text-xs ${cert.bgLight} ${cert.textColor} border-0`}>
                        <CheckCircle2 className="w-3 h-3 mr-1" />{comp}
                      </Badge>
                    ))}
                    {cert.competences.length > 4 && (
                      <Badge variant="outline" className="text-xs text-slate-500">+{cert.competences.length - 4}</Badge>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center md:items-end">
                <Button asChild className={`bg-gradient-to-r ${cert.gradient} text-white text-sm`}>
                  <Link href={`/inscription?certification=${cert.id}`}>
                    S&apos;inscrire <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (viewMode === "compact") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {certifications.map((cert) => (
          <div key={cert.id} className="group bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md overflow-hidden transition-all flex flex-col">
            <div className={`h-1.5 bg-gradient-to-r ${cert.gradient}`} />
            <div className="p-3 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${cert.gradient} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                  <Award className="w-4 h-4 text-white" />
                </div>
                <Badge className={`${cert.bgLight} ${cert.textColor} border-0 text-xs`}>{cert.category}</Badge>
              </div>
              <h3 className="font-bold text-sm mb-1 line-clamp-2 text-slate-900 group-hover:text-cpu-orange transition-colors">{cert.title}</h3>
              <p className={`text-xs font-semibold ${cert.textColor} mb-1`}>{cert.niveau}</p>
              {cert.validite && (
                <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                  <Shield className="w-3 h-3" /> {cert.validite}
                </p>
              )}
              <Button asChild size="sm" className={`mt-auto w-full bg-gradient-to-r ${cert.gradient} text-white text-xs`}>
                <Link href={`/inscription?certification=${cert.id}`}>S&apos;inscrire</Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Mode Grid (par défaut)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {certifications.map((cert, idx) => (
        <div
          key={cert.id}
          className="group bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-slide-up overflow-hidden flex flex-col"
          style={{ animationDelay: `${Math.min(idx * 0.07, 0.5)}s` }}
        >
          {/* Top accent bar */}
          <div className={`h-1.5 bg-gradient-to-r ${cert.gradient}`} />

          <div className="p-5 md:p-6 flex-1 flex flex-col">
            {/* Header row: icon + category */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center shadow-md`}>
                <Award className="w-7 h-7 text-white" />
              </div>
              <Badge className={`${cert.bgLight} ${cert.textColor} border-0 font-semibold`}>
                {cert.category}
              </Badge>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-cpu-orange transition-colors leading-snug">
              {cert.title}
            </h3>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${cert.bgLight} ${cert.textColor}`}>
                {cert.niveau}
              </span>
              {cert.validite && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                  <Shield className="w-3 h-3" /> {cert.validite}
                </span>
              )}
              {cert.duree && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                  <Clock className="w-3 h-3" /> {cert.duree}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
              {cert.description}
            </p>

            {/* Competences */}
            {cert.competences.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {cert.competences.slice(0, 3).map((comp, i) => (
                  <Badge key={i} variant="outline" className={`text-xs ${cert.bgLight} ${cert.textColor} border-0`}>
                    <CheckCircle2 className="w-3 h-3 mr-1" />{comp}
                  </Badge>
                ))}
                {cert.competences.length > 3 && (
                  <Badge variant="outline" className="text-xs text-slate-500">
                    +{cert.competences.length - 3}
                  </Badge>
                )}
              </div>
            )}

            {/* CTA */}
            <div className="mt-auto pt-4 border-t border-slate-100">
              <Button
                asChild
                className={`w-full bg-gradient-to-r ${cert.gradient} hover:opacity-90 text-white font-semibold group/btn`}
              >
                <Link href={`/inscription?certification=${cert.id}`}>
                  S&apos;inscrire à cette certification
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CertificationsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterLevel, setFilterLevel] = useState("all");
  const [certificationsData, setCertificationsData] = useState<Certification[]>(fallbackCertifications);
  const [isCertificationsLoading, setIsCertificationsLoading] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [verifyResult, setVerifyResult] = useState<VerifyResponse | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function fetchTypesCertifications() {
      setIsCertificationsLoading(true);
      try {
        const response = await apiClient.get(API_ENDPOINTS.CERTIFICATIONS.TYPES);
        const normalized = normalizeTypesCertifications(response);

        if (!isCancelled && normalized.length > 0) {
          setCertificationsData(normalized);
        }
      } catch {
        if (!isCancelled) {
          setCertificationsData(fallbackCertifications);
        }
      } finally {
        if (!isCancelled) {
          setIsCertificationsLoading(false);
        }
      }
    }

    fetchTypesCertifications();

    return () => {
      isCancelled = true;
    };
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(certificationsData.map((cert) => cert.category))).sort(),
    [certificationsData]
  );
  const levelOptions = useMemo(
    () => Array.from(new Set(certificationsData.map((cert) => cert.niveau))).sort(),
    [certificationsData]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    certificationsData.forEach((cert) => {
      counts[cert.category] = (counts[cert.category] || 0) + 1;
    });
    return counts;
  }, [certificationsData]);

  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    certificationsData.forEach((cert) => {
      counts[cert.niveau] = (counts[cert.niveau] || 0) + 1;
    });
    return counts;
  }, [certificationsData]);

  // Filtrage des certifications
  const filteredCertifications = certificationsData.filter((cert) => {
    const matchSearch = searchTerm === "" ||
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.competences.some(comp => comp.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchCategory = filterCategory === "all" || cert.category === filterCategory;
    const matchLevel = filterLevel === "all" || cert.niveau === filterLevel;

    return matchSearch && matchCategory && matchLevel;
  });

  const handleVerifyCertificate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const code = verificationCode.trim();
    if (!code) {
      setVerifyResult(null);
      setVerifyError("Veuillez entrer un code de certificat.");
      return;
    }

    setIsVerifying(true);
    setVerifyError(null);
    setVerifyResult(null);

    try {
      const response = await apiClient.get(
        API_ENDPOINTS.CERTIFICATIONS.VERIFY_BY_CODE(encodeURIComponent(code))
      );
      const normalized = normalizeVerifyResponse(response);

      if (normalized.valid) {
        setVerifyResult(normalized);
      } else {
        setVerifyError("Certificat invalide ou introuvable.");
      }
    } catch (error: any) {
      const apiMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Impossible de vérifier ce certificat pour le moment.";
      setVerifyError(String(apiMessage));
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      <PageBanner 
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Certifications" }
        ]}
        slides={[
          {
            image: "/images/default-formation.jpg",
            title: "Certifications Professionnelles",
            subtitle: "Validez vos compétences avec nos certifications reconnues",
            badge: {
              icon: "+",
              number: "25",
              text: "Certifications disponibles",
              subtext: "Tous secteurs"
            },
            trustBadges: [
              {
                icon: "check",
                color: "green",
                title: "Reconnues État",
                subtitle: "Officielles et agréées"
              },
              {
                icon: "building",
                color: "blue",
                title: "Standards internationaux",
                subtitle: "ISO & AFNOR"
              },
              {
                icon: "users",
                color: "orange",
                title: "8,000+",
                subtitle: "Certifiés actifs"
              }
            ],
            buttons: [
              { label: "Voir les formations", href: "/catalogue", icon: <BookOpen className="h-5 w-5" /> },
              { label: "Nous contacter", href: "/support", variant: "outline", icon: <Send className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/formation-agriculture.png",
            title: "Reconnaissance Officielle",
            subtitle: "Obtenez des certifications valorisées par les employeurs",
            badge: {
              number: "96%",
              text: "Employabilité",
              subtext: "De nos certifiés"
            },
            trustBadges: [
              {
                icon: "building",
                color: "purple",
                title: "Employeurs partenaires",
                subtitle: "Recrutement facilité"
              },
              {
                icon: "check",
                color: "green",
                title: "Valeur ajoutée CV",
                subtitle: "Compétences prouvées"
              },
              {
                icon: "users",
                color: "orange",
                title: "Évaluation rigoureuse",
                subtitle: "Examens certifiants"
              }
            ],
            buttons: [
              { label: "Découvrir", href: "#certifications", icon: <BookOpen className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/default-formation.jpg",
            title: "Excellence et Qualité",
            subtitle: "Des programmes conformes aux standards internationaux",
            badge: {
              icon: "🌍 ",
              number: "100%",
              text: "Conformité internationale",
              subtext: "Standards respectés"
            },
            trustBadges: [
              {
                icon: "check",
                color: "blue",
                title: "Qualité certifiée",
                subtitle: "Processus audité"
              },
              {
                icon: "users",
                color: "orange",
                title: "Jury d'experts",
                subtitle: "Professionnels reconnus"
              },
              {
                icon: "check",
                color: "green",
                title: "Validité permanente",
                subtitle: "Sans expiration"
              }
            ],
            buttons: [
              { label: "En savoir plus", href: "/support", icon: <Send className="h-5 w-5" /> }
            ]
          }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">


        {/* Hero Section - Valorisez vos compétences */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-3 md:mb-4 bg-orange-100 text-orange-700 border-orange-200 px-3 md:px-4 py-1 text-sm">
              Certifications & Badges
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 md:mb-6">
              Valorisez vos compétences
            </h2>
            <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 max-w-2xl mx-auto leading-relaxed">
              Obtenez des certifications reconnues et des badges vérifiables qui attestent de votre expertise auprès des employeurs, clients et partenaires.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow-lg"
              >
                <Link href="#certifications">
                  <Award className="mr-2 h-5 w-5" />
                  Voir les formations certifiantes
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="cursor-pointer border-2"
              >
                <Link href="#verifier-certificat">
                  <FileCheck className="mr-2 h-5 w-5" />
                  Vérifier un certificat
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Certifications Grid */}
        <section id="certifications" className="container mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-12">
          <div className="text-center mb-8 md:mb-10 animate-slide-up">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
              Nos Certifications
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Choisissez la certification qui correspond à vos objectifs professionnels
            </p>
          </div>

          {/* Layout avec Sidebar */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Sidebar - Filtres */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">

                  {/* Header */}
                  <div className="bg-slate-900 px-5 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cpu-orange/20 flex items-center justify-center">
                      <SlidersHorizontal className="w-4 h-4 text-cpu-orange" />
                    </div>
                    <span className="font-bold text-white text-sm tracking-wide">Filtres</span>
                    {(filterCategory !== "all" || filterLevel !== "all") && (
                      <button
                        onClick={() => { setFilterCategory("all"); setFilterLevel("all"); }}
                        className="ml-auto flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Réinitialiser
                      </button>
                    )}
                  </div>

                  <div className="p-5 space-y-5">

                    {/* Search */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                        <Search className="w-3.5 h-3.5" />
                        Recherche
                      </label>
                      <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Nom, compétence…"
                        size="md"
                      />
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Filtre Catégorie */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                        <Tag className="w-3.5 h-3.5" />
                        Catégorie
                      </label>
                      <div className="space-y-1">
                        {["all", ...categories].map((category) => {
                          const count = category === "all"
                            ? certificationsData.length
                            : (categoryCounts[category] || 0);
                          return (
                            <button
                              key={category}
                              onClick={() => setFilterCategory(category)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                                filterCategory === category
                                  ? "bg-cpu-orange text-white shadow-md shadow-orange-200"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                            >
                              <span>{category === "all" ? "Toutes les catégories" : category}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                filterCategory === category
                                  ? "bg-white/25 text-white"
                                  : "bg-slate-100 text-slate-500"
                              }`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Filtre Niveau */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                        <BarChart3 className="w-3.5 h-3.5" />
                        Niveau
                      </label>
                      <div className="space-y-1">
                        {["all", ...levelOptions].map((level) => {
                          const count = level === "all"
                            ? certificationsData.length
                            : (levelCounts[level] || 0);
                          return (
                            <button
                              key={level}
                              onClick={() => setFilterLevel(level)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                                filterLevel === level
                                  ? "bg-cpu-orange text-white shadow-md shadow-orange-200"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                            >
                              <span>{level === "all" ? "Tous les niveaux" : level}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                filterLevel === level
                                  ? "bg-white/25 text-white"
                                  : "bg-slate-100 text-slate-500"
                              }`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Stats */}
                    <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-4 text-center">
                      <p className="text-3xl font-extrabold text-white leading-none">
                        {isCertificationsLoading ? "…" : filteredCertifications.length}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        certification{filteredCertifications.length > 1 ? "s" : ""} trouvée{filteredCertifications.length > 1 ? "s" : ""}
                      </p>
                      {!isCertificationsLoading && filteredCertifications.length !== certificationsData.length && (
                        <p className="text-xs text-cpu-orange mt-1">sur {certificationsData.length} au total</p>
                      )}
                    </div>

                  </div>
                </div>
              </div>
            </aside>

            {/* Contenu Principal */}
            <div className="flex-1 min-w-0">
              {/* Count + View Toggle */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <p className="text-sm text-slate-600">
                  {isCertificationsLoading ? (
                    <span className="inline-block w-24 h-4 bg-slate-200 rounded animate-pulse" />
                  ) : (
                    <>
                      <span className="font-bold text-slate-900">{filteredCertifications.length}</span>{" "}
                      certification{filteredCertifications.length > 1 ? "s" : ""}
                    </>
                  )}
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-cpu-orange text-white" : ""}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-cpu-orange text-white" : ""}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "compact" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("compact")}
                    className={viewMode === "compact" ? "bg-cpu-orange text-white" : ""}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Skeleton de chargement */}
              {isCertificationsLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                      key={`skeleton-cert-${idx}`}
                      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col animate-pulse"
                    >
                      <div className="h-1.5 bg-slate-200" />
                      <div className="p-5 md:p-6 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 rounded-2xl bg-slate-200" />
                          <div className="w-20 h-6 rounded-full bg-slate-100" />
                        </div>
                        <div className="h-5 w-4/5 bg-slate-200 rounded-lg mb-3" />
                        <div className="flex gap-2 mb-4">
                          <div className="h-6 w-20 rounded-full bg-slate-100" />
                          <div className="h-6 w-16 rounded-full bg-slate-100" />
                          <div className="h-6 w-14 rounded-full bg-slate-100" />
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="h-3.5 bg-slate-100 rounded-lg" />
                          <div className="h-3.5 w-5/6 bg-slate-100 rounded-lg" />
                          <div className="h-3.5 w-4/6 bg-slate-100 rounded-lg" />
                        </div>
                        <div className="flex gap-1.5 mb-4">
                          <div className="h-6 w-20 rounded-full bg-slate-100" />
                          <div className="h-6 w-24 rounded-full bg-slate-100" />
                          <div className="h-6 w-8 rounded-full bg-slate-100" />
                        </div>
                        <div className="mt-auto pt-4 border-t border-slate-100">
                          <div className="h-10 bg-slate-200 rounded-xl" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <CertificationsGrid certifications={filteredCertifications} viewMode={viewMode} />
              )}
            </div>
          </div>
        </section>

        {/* Badges de Compétences Section */}
        <section className="bg-gradient-to-br from-slate-50 to-white py-10 md:py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                Badges de Compétences
              </h2>
              <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
                Des badges qui ouvrent des portes : accès aux marchés publics, marketplace CPU, financement bancaire et label Made in CI.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {/* Badge 1 - Prêt pour AO */}
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md transition-all  animate-slide-up">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 text-center mb-3">
                  Prêt pour AO
                </h3>
                <p className="text-sm text-slate-600 text-center mb-6">
                  Apte à répondre aux appels d'offres publics et privés
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-900 mb-3">Prérequis :</p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Formation AO validée</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">2 simulations réussies</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Dossier type complet</span>
                  </div>
                </div>
              </div>

              {/* Badge 2 - Vendeur Vérifié */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md transition-all  animate-slide-up animation-delay-100">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                    <ShoppingBag className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 text-center mb-3">
                  Vendeur Vérifié
                </h3>
                <p className="text-sm text-slate-600 text-center mb-6">
                  Profil vérifié pour vendre sur la marketplace CPU
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-900 mb-3">Prérequis :</p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Identité vérifiée</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Formation marketplace</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Évaluation qualité</span>
                  </div>
                </div>
              </div>

              {/* Badge 3 - Bancable */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md transition-all  animate-slide-up animation-delay-200">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Wallet className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 text-center mb-3">
                  Bancable
                </h3>
                <p className="text-sm text-slate-600 text-center mb-6">
                  Dossier prêt pour demande de financement bancaire
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-900 mb-3">Prérequis :</p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Formation financement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Business plan validé</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Documents conformes</span>
                  </div>
                </div>
              </div>

              {/* Badge 4 - Made in CI Ready */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md transition-all  animate-slide-up animation-delay-300">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 text-center mb-3">
                  Made in CI Ready
                </h3>
                <p className="text-sm text-slate-600 text-center mb-6">
                  Éligible au label Made in Côte d'Ivoire
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-900 mb-3">Prérequis :</p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Formation qualité</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Audit production</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Traçabilité validée</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* Vérifier un Certificat Section */}
        <section id="verifier-certificat" className="container mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 border-2 border-orange-100 shadow-xl">
              <div className="text-center mb-6 md:mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-orange-50 mb-4 md:mb-6">
                  <Shield className="w-8 h-8 md:w-10 md:h-10 text-orange-600" />
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                  Vérifier un Certificat
                </h2>
                <p className="text-base md:text-lg text-slate-600">
                  Entrez le numéro de certificat pour vérifier son authenticité
                </p>
              </div>

              <form onSubmit={handleVerifyCertificate} className="flex flex-col md:flex-row gap-3 md:gap-4 mb-3 md:mb-4">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(event) => setVerificationCode(event.target.value)}
                  placeholder="Ex: CERT-NESTJS-PRO"
                  className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:outline-none text-slate-900 placeholder:text-slate-400 text-sm md:text-base"
                />
                <Button
                  type="submit"
                  disabled={isVerifying}
                  className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl shadow-lg transition-all text-sm md:text-base disabled:opacity-70"
                >
                  <Search className="mr-2 h-5 w-5" />
                  {isVerifying ? "Vérification..." : "Vérifier"}
                </Button>
              </form>

              {verifyError && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {verifyError}
                </div>
              )}

              {verifyResult?.valid && verifyResult.certification && (
                <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 md:p-5">
                  <div className="flex items-center gap-2 text-green-700 font-semibold mb-3">
                    <CheckCircle2 className="w-5 h-5" />
                    Certificat valide
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <p className="text-slate-700">
                      <span className="font-semibold">Code :</span> {verifyResult.certification.code || "-"}
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold">Type :</span> {verifyResult.certification.typeCertification?.nom || "-"}
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold">Niveau :</span> {verifyResult.certification.typeCertification?.niveau || "-"}
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold">Formation :</span> {verifyResult.certification.formation?.title || "-"}
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold">Date de délivrance :</span> {formatApiDate(verifyResult.certification.dateDelivrance)}
                    </p>
                    <p className="text-slate-700">
                      <span className="font-semibold">Date d'expiration :</span> {formatApiDate(verifyResult.certification.dateExpiration)}
                    </p>
                  </div>
                </div>
              )}

              <p className="text-sm text-slate-500 text-center">
                Le numéro de certificat se trouve en bas à droite du document
              </p>
            </div>
          </div>
        </section>

        {/* Avantages Section */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-12">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl md:rounded-3xl p-6 md:p-12 text-white">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                Pourquoi se certifier ?
              </h2>
              <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
                Les avantages de nos certifications pour votre carrière
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
              {avantages.map((avantage, idx) => {
                const Icon = avantage.icon;
                return (
                  <div
                    key={idx}
                    className="text-center group animate-fade-in"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-white/10 text-white mb-3 md:mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all">
                      <Icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold mb-1 md:mb-2">{avantage.title}</h3>
                    <p className="text-xs md:text-sm text-slate-300">{avantage.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Processus Section */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
                Comment obtenir votre certification ?
              </h2>
              <p className="text-lg text-slate-600">
                Un processus simple et efficace en 4 étapes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {processus.map((etape, idx) => (
                <div
                  key={idx}
                  className="relative animate-slide-up"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-slate-100 shadow-lg transition-all  text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white text-2xl font-bold mb-4 shadow-lg">
                      {etape.numero}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {etape.titre}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {etape.description}
                    </p>
                  </div>
                  {idx < processus.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-orange-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Témoignages des certifiés */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-10 md:py-16 pb-16 md:pb-20">
          <div className="text-center mb-8 md:mb-12">
            <Badge className="mb-3 md:mb-4 bg-blue-100 text-blue-700 border-blue-200 px-3 md:px-4 py-1 text-sm">
              Témoignages
            </Badge>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
              Ils ont obtenu leur certification
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Découvrez comment nos certifications ont transformé leur carrière professionnelle
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mb-12">
            {/* Témoignage 1 */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg transition-all  animate-fade-in">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  AK
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Aminata Koné</h3>
                  <p className="text-sm text-slate-600">Chef de Projet Digital</p>
                  <p className="text-xs text-slate-500">Orange Digital Center</p>
                </div>
              </div>
              
              <div className="mb-4">
                <Badge className="bg-blue-50 text-blue-700 border-blue-200">
                  <Award className="w-3 h-3 mr-1" />
                  Expert Marketing Digital
                </Badge>
              </div>

              <p className="text-sm text-slate-700 mb-4 italic">
                "La certification en Marketing Digital m'a permis d'acquérir des compétences concrètes et directement applicables. J'ai obtenu une promotion 3 mois après ma certification !"
              </p>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-700">+30% de salaire</span>
              </div>
            </div>

            {/* Témoignage 2 */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg transition-all  animate-fade-in animation-delay-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  YK
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Yao Kouassi</h3>
                  <p className="text-sm text-slate-600">Data Analyst</p>
                  <p className="text-xs text-slate-500">MTN Côte d'Ivoire</p>
                </div>
              </div>
              
              <div className="mb-4">
                <Badge className="bg-orange-50 text-orange-700 border-orange-200">
                  <Award className="w-3 h-3 mr-1" />
                  Expert Data Science
                </Badge>
              </div>

              <p className="text-sm text-slate-700 mb-4 italic">
                "Cette certification est reconnue internationalement. Elle m'a ouvert les portes de grandes entreprises et renforcé ma légitimité face aux clients. Investissement rentabilisé !"
              </p>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-700">Promotion obtenue</span>
              </div>
            </div>

            {/* Témoignage 3 */}
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg transition-all  animate-fade-in animation-delay-200">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  MT
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Marie Touré</h3>
                  <p className="text-sm text-slate-600">Consultante RH Senior</p>
                  <p className="text-xs text-slate-500">Deloitte Afrique</p>
                </div>
              </div>
              
              <div className="mb-4">
                <Badge className="bg-green-50 text-green-700 border-green-200">
                  <Award className="w-3 h-3 mr-1" />
                  Expert Gestion RH
                </Badge>
              </div>

              <p className="text-sm text-slate-700 mb-4 italic">
                "Le programme est complet et les formateurs sont des experts du terrain. Ma certification m'a permis de décrocher des missions de consulting bien mieux rémunérées."
              </p>

              <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                <Users className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">Consultant indépendant</span>
              </div>
            </div>
          </div>

          {/* CTA Final */}
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-orange-50 to-blue-50 rounded-2xl md:rounded-3xl p-6 md:p-12 border-2 border-slate-100">
            <div className="text-center">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-orange-600" />
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-3 md:mb-4">
                Rejoignez nos 500+ professionnels certifiés
              </h2>
              <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8">
                Validez vos compétences et boostez votre carrière avec nos certifications reconnues
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow-lg"
                >
                  <Link href="/catalogue">
                    <Award className="mr-2 h-5 w-5" />
                    Découvrir les formations
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="cursor-pointer border-2"
                >
                  <Link href="/ressources/faq">
                    <Download className="mr-2 h-5 w-5" />
                    Télécharger la brochure
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

