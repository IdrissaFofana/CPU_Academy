"use client";

import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/search-bar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, CheckCircle2, Clock, Users, TrendingUp, Shield, BookOpen, Send, FileCheck, Star, ArrowRight, Download, Sparkles, FileText, Wallet, ShoppingBag, Factory, Search, Grid3x3, List, LayoutGrid, Calendar, MapPin, CreditCard, Banknote, Briefcase, Quote } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Certification = {
  id: number;
  title: string;
  category: string;
  niveau: string;
  duree: string;
  modules: number;
  color: string;
  gradient: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
  description: string;
  competences: string[];
  prerequis: string;
  validite: string;
  // Nouvelles données
  prochaineSessions: {
    date: string;
    placesRestantes: number;
    placesTotal: number;
    deadlineInscription: string;
    mode: string;
    lieu: string;
  };
  prix: {
    public: number;
    entreprise: number;
    paiementFois3: boolean;
    eligibleFDFP: boolean;
  };
};

const certifications: Certification[] = [
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
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
    description: "Validez vos compétences en création et gestion d'entreprise. Cette certification atteste de votre maîtrise des fondamentaux entrepreneuriaux.",
    competences: ["Business Plan", "Gestion financière", "Marketing", "Management", "Juridique"],
    prerequis: "Aucun prérequis",
    validite: "3 ans",
    prochaineSessions: {
      date: "15 Mars 2026",
      placesRestantes: 17,
      placesTotal: 30,
      deadlineInscription: "10 Mars 2026",
      mode: "Hybride",
      lieu: "Abidjan - Plateau"
    },
    prix: {
      public: 450000,
      entreprise: 382500,
      paiementFois3: true,
      eligibleFDFP: true
    }
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
    borderColor: "border-indigo-200",
    textColor: "text-indigo-600",
    description: "Devenez expert en réponse aux appels d'offres publics et privés. Certification reconnue par les institutions publiques.",
    competences: ["Analyse AO", "Rédaction technique", "Chiffrage", "Conformité", "Négociation"],
    prerequis: "Expérience professionnelle recommandée",
    validite: "2 ans",
    prochaineSessions: {
      date: "22 Mars 2026",
      placesRestantes: 23,
      placesTotal: 30,
      deadlineInscription: "18 Mars 2026",
      mode: "Présentiel",
      lieu: "Abidjan - Cocody"
    },
    prix: {
      public: 380000,
      entreprise: 323000,
      paiementFois3: true,
      eligibleFDFP: true
    }
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
    borderColor: "border-green-200",
    textColor: "text-green-600",
    description: "Maîtrisez les stratégies de vente en ligne et de gestion de marketplace. Certification adaptée au marché africain.",
    competences: ["Boutique en ligne", "Marketing digital", "Logistique", "SEO", "Analytics"],
    prerequis: "Connaissances de base en informatique",
    validite: "2 ans",
    prochaineSessions: {
      date: "5 Avril 2026",
      placesRestantes: 12,
      placesTotal: 25,
      deadlineInscription: "1 Avril 2026",
      mode: "100% en ligne",
      lieu: "Formation à distance"
    },
    prix: {
      public: 420000,
      entreprise: 357000,
      paiementFois3: true,
      eligibleFDFP: false
    }
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
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
    description: "Expertise en montage de dossiers de financement et relations bancaires. Augmentez votre bancabilité.",
    competences: ["Business plan financier", "Analyse financière", "Négociation", "Levée de fonds", "Garanties"],
    prerequis: "Formation en gestion recommandée",
    validite: "3 ans",
    prochaineSessions: {
      date: "12 Avril 2026",
      placesRestantes: 8,
      placesTotal: 20,
      deadlineInscription: "8 Avril 2026",
      mode: "Hybride",
      lieu: "Abidjan - Plateau"
    },
    prix: {
      public: 350000,
      entreprise: 297500,
      paiementFois3: true,
      eligibleFDFP: true
    }
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
    borderColor: "border-cyan-200",
    textColor: "text-cyan-600",
    description: "Maîtrisez les normes de qualité et préparez votre entreprise à la certification ISO. Parcours complet avec audit.",
    competences: ["Normes ISO", "HACCP", "Documentation", "Audit", "Amélioration continue"],
    prerequis: "Responsable production ou qualité",
    validite: "3 ans",
    prochaineSessions: {
      date: "20 Avril 2026",
      placesRestantes: 15,
      placesTotal: 25,
      deadlineInscription: "15 Avril 2026",
      mode: "Présentiel",
      lieu: "Abidjan - Zone industrielle"
    },
    prix: {
      public: 480000,
      entreprise: 408000,
      paiementFois3: true,
      eligibleFDFP: true
    }
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
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    description: "Développez vos compétences en leadership et management d'équipe. Certification pour managers et futurs dirigeants.",
    competences: ["Leadership", "Gestion d'équipe", "Communication", "Motivation", "Performance"],
    prerequis: "Expérience en management",
    validite: "2 ans",
    prochaineSessions: {
      date: "28 Avril 2026",
      placesRestantes: 20,
      placesTotal: 30,
      deadlineInscription: "24 Avril 2026",
      mode: "Hybride",
      lieu: "Abidjan - Marcory"
    },
    prix: {
      public: 320000,
      entreprise: 272000,
      paiementFois3: true,
      eligibleFDFP: true
    }
  }
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
      <div className="space-y-4 md:space-y-6">
        {certifications.map((cert, idx) => (
          <Card
            key={cert.id}
            className="group hover:shadow-2xl transition-all duration-300 overflow-hidden"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Left: Icon & Badge */}
              <div className={`md:w-44 lg:w-48 flex-shrink-0 bg-gradient-to-br ${cert.gradient} p-6 flex flex-col items-center justify-center text-center`}>
                <Award className="w-16 h-16 text-white mb-3" />
                <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                  {cert.category}
                </Badge>
              </div>

              {/* Right: Content */}
              <div className="flex-1 p-5 md:p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">{cert.title}</h3>
                  <Badge className={`${cert.bgLight} ${cert.textColor} border-0 font-medium`}>
                    {cert.niveau}
                  </Badge>
                </div>

                <p className="text-slate-600 mb-4">{cert.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>{cert.duree}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-gray-500" />
                    <span>{cert.modules} modules</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-gray-500" />
                    <span>Validité: {cert.validite}</span>
                  </div>
                </div>

                {/* Session Info */}
                <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-lg md:rounded-xl p-3 md:p-4 mb-4">
                  <p className="text-xs font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-cpu-orange" />
                    Prochaine session
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-cpu-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500">Date</p>
                        <p className="text-sm font-semibold">{cert.prochaineSessions.date}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-cpu-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500">Places</p>
                        <p className="text-sm font-semibold">{cert.prochaineSessions.placesRestantes}/{cert.prochaineSessions.placesTotal}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-cpu-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500">Mode</p>
                        <p className="text-sm font-semibold">{cert.prochaineSessions.mode}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Banknote className="w-4 h-4 text-cpu-orange flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500">Prix</p>
                        <p className="text-sm font-semibold">{cert.prix.public.toLocaleString('fr-FR')} FCFA</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {cert.prix.paiementFois3 && (
                      <Badge variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">
                        <CreditCard className="w-3 h-3 mr-1" />
                        Paiement 3× disponible
                      </Badge>
                    )}
                    {cert.prix.eligibleFDFP && (
                      <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                        Éligible FDFP
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Competences */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Compétences validées:</p>
                  <div className="flex flex-wrap gap-2">
                    {cert.competences.slice(0, 5).map((comp, i) => (
                      <Badge key={i} variant="outline" className={`text-xs ${cert.bgLight} ${cert.textColor}`}>
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button asChild className={`flex-1 bg-gradient-to-r ${cert.gradient} text-white`}>
                    <Link href={`/catalogue?certification=${cert.id}`}>
                      Voir la formation
                    </Link>
                  </Button>
                  <Button variant="outline" size="icon">
                    <FileText className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (viewMode === "compact") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {certifications.map((cert) => (
          <Card key={cert.id} className="group hover:shadow-xl transition-all p-3 md:p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${cert.gradient} flex items-center justify-center flex-shrink-0`}>
                <Award className="w-5 h-5 text-white" />
              </div>
              <Badge className={`${cert.bgLight} ${cert.textColor} border-0 text-xs`}>
                {cert.category}
              </Badge>
            </div>
            <h3 className="font-bold text-sm mb-2 line-clamp-2">{cert.title}</h3>
            <div className="flex items-center justify-between text-xs text-gray-600 mb-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {cert.duree}
              </span>
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {cert.modules}
              </span>
            </div>
            
            {/* Session info compact */}
            <div className="bg-slate-50 rounded-lg p-2 mb-3 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs">
                <Calendar className="w-3 h-3 text-cpu-orange flex-shrink-0" />
                <span className="text-slate-700">{cert.prochaineSessions.date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs">
                <Users className="w-3 h-3 text-cpu-orange flex-shrink-0" />
                <span className="text-slate-700">{cert.prochaineSessions.placesRestantes}/{cert.prochaineSessions.placesTotal} places</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cpu-orange">
                <Banknote className="w-3 h-3 flex-shrink-0" />
                <span>{cert.prix.public.toLocaleString('fr-FR')} F</span>
              </div>
            </div>

            <Button asChild size="sm" className={`w-full bg-gradient-to-r ${cert.gradient} text-white text-xs`}>
              <Link href={`/catalogue?certification=${cert.id}`}>
                Découvrir
              </Link>
            </Button>
          </Card>
        ))}
      </div>
    );
  }

  // Mode Grid (par défaut)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {certifications.map((cert, idx) => (
        <div
          key={cert.id}
          className="group bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 animate-slide-up overflow-hidden flex flex-col"
          style={{ animationDelay: `${idx * 100}ms` }}
        >
          {/* Icon & Category Badge */}
          <div className="p-5 md:p-6 pb-3 md:pb-4 flex-grow">
            <div className="flex items-start justify-between mb-4">
              <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${cert.gradient} shadow-lg`}>
                <Award className="w-7 h-7 text-white" />
              </div>
              <Badge className={`${cert.bgLight} ${cert.textColor} border-0 font-medium`}>
                {cert.category}
              </Badge>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:${cert.textColor} transition-colors">
              {cert.title}
            </h3>

            <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {cert.duree}
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300"></span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                {cert.modules} modules
              </span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {cert.description}
            </p>

            {/* Info Pills */}
            <div className="flex items-center gap-2 mb-4">
              <div className={`px-3 py-1.5 rounded-full ${cert.bgLight} ${cert.textColor} text-xs font-semibold`}>
                {cert.niveau}
              </div>
              <div className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                Validité: {cert.validite}
              </div>
            </div>

            {/* Session Info Card */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-lg md:rounded-xl p-3 md:p-4 mb-4 border border-slate-200">
              <p className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cpu-orange" />
                Prochaine session
              </p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Date de démarrage</span>
                  <span className="text-sm font-semibold text-slate-900">{cert.prochaineSessions.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Places disponibles</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {cert.prochaineSessions.placesRestantes}/{cert.prochaineSessions.placesTotal}
                    <span className="text-xs text-slate-500 ml-1">
                      ({Math.round((cert.prochaineSessions.placesRestantes / cert.prochaineSessions.placesTotal) * 100)}%)
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-600">Mode</span>
                  <span className="text-sm font-semibold text-slate-900">{cert.prochaineSessions.mode}</span>
                </div>
                <div className="pt-2 border-t border-slate-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600">Prix public</span>
                    <span className="text-lg font-bold text-cpu-orange">{cert.prix.public.toLocaleString('fr-FR')} F</span>
                  </div>
                  {cert.prix.entreprise < cert.prix.public && (
                    <p className="text-xs text-green-600 mt-1">Prix entreprise: {cert.prix.entreprise.toLocaleString('fr-FR')} F (dès 5 pers.)</p>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-3">
                {cert.prix.paiementFois3 && (
                  <Badge variant="outline" className="text-xs bg-green-50 border-green-200 text-green-700">
                    <CreditCard className="w-3 h-3 mr-1" />
                    3× sans frais
                  </Badge>
                )}
                {cert.prix.eligibleFDFP && (
                  <Badge variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                    FDFP
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Footer - Actions */}
          <div className="p-5 md:p-6 pt-0 mt-auto border-t border-slate-100">
            <div className="mb-4">
              <p className="text-xs font-bold text-slate-900 mb-2">Compétences validées:</p>
              <div className="flex flex-wrap gap-2">
                {cert.competences.slice(0, 3).map((comp, i) => (
                  <Badge key={i} variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    {comp}
                  </Badge>
                ))}
                {cert.competences.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{cert.competences.length - 3}
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                asChild
                className={`flex-1 cursor-pointer bg-gradient-to-r ${cert.gradient} hover:opacity-90 text-white`}
              >
                <Link href={`/catalogue?certification=${cert.id}`}>
                  Voir la formation
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="cursor-pointer"
              >
                <Link href={`/certifications/${cert.id}`}>
                  <FileText className="h-4 w-4" />
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

  // Filtrage des certifications
  const filteredCertifications = certifications.filter((cert) => {
    const matchSearch = searchTerm === "" ||
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.competences.some(comp => comp.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchCategory = filterCategory === "all" || cert.category === filterCategory;
    const matchLevel = filterLevel === "all" || cert.niveau === filterLevel;

    return matchSearch && matchCategory && matchLevel;
  });

  return (
    <>
      <PageBanner 
        title="Certifications"
        subtitle="Validez vos compétences avec nos certifications reconnues"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Certifications" }
        ]}
        buttons={[
          { label: "Voir les formations", href: "/catalogue", icon: <BookOpen className="h-5 w-5" /> },
          { label: "Nous contacter", href: "/support", variant: "outline", icon: <Send className="h-5 w-5" /> }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
        {/* Stats Section */}
        <section className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in">
              <Award className="w-10 h-10 mx-auto mb-3 text-orange-600" />
              <div className="text-3xl font-bold mb-1 text-slate-900">6</div>
              <div className="text-sm text-slate-600">Certifications</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in animation-delay-100">
              <Users className="w-10 h-10 mx-auto mb-3 text-blue-600" />
              <div className="text-3xl font-bold mb-1 text-slate-900">500+</div>
              <div className="text-sm text-slate-600">Certifiés</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in animation-delay-200">
              <Star className="w-10 h-10 mx-auto mb-3 text-yellow-600" />
              <div className="text-3xl font-bold mb-1 text-slate-900">4.8/5</div>
              <div className="text-sm text-slate-600">Satisfaction</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in animation-delay-300">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 text-green-600" />
              <div className="text-3xl font-bold mb-1 text-slate-900">95%</div>
              <div className="text-sm text-slate-600">Réussite</div>
            </div>
          </div>
        </section>

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
            <aside className="w-full lg:w-64 flex-shrink-0">
              <Card className="p-6 sticky top-24">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <svg className="w-5 h-5 text-cpu-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filtres
                </h3>

                {/* Filtre Catégorie */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-slate-700 mb-3 block">Catégorie</label>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-full border-2 border-slate-200 focus:border-cpu-orange">
                      <SelectValue placeholder="Catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      <SelectItem value="Entrepreneuriat">Entrepreneuriat</SelectItem>
                      <SelectItem value="Appels d'offres">Appels d'offres</SelectItem>
                      <SelectItem value="Digital">Digital</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Production">Production</SelectItem>
                      <SelectItem value="Leadership">Leadership</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Filtre Niveau */}
                <div className="mb-6">
                  <label className="text-sm font-semibold text-slate-700 mb-3 block">Niveau</label>
                  <div className="space-y-2">
                    {["all", "Fondamental", "Professionnel", "Expert"].map((level) => (
                      <button
                        key={level}
                        onClick={() => setFilterLevel(level)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm font-medium ${
                          filterLevel === level
                            ? "bg-cpu-orange text-white shadow-md"
                            : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {level === "all" ? "Tous les niveaux" : level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bouton Réinitialiser */}
                {(filterCategory !== "all" || filterLevel !== "all") && (
                  <Button
                    variant="outline"
                    className="w-full border-2 border-slate-200 hover:bg-slate-50"
                    onClick={() => {
                      setFilterCategory("all");
                      setFilterLevel("all");
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                )}
              </Card>
            </aside>

            {/* Contenu Principal */}
            <div className="flex-1">
              {/* Search and View Toggle */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-6">
                <div className="flex-1 max-w-md">
                  <SearchBar 
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Rechercher une certification..."
                    size="md"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{filteredCertifications.length}</span> {filteredCertifications.length > 1 ? 'certifications' : 'certification'}
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
              </div>

              {/* Grid des certifications */}
              <CertificationsGrid certifications={filteredCertifications} viewMode={viewMode} />
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
              <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-slide-up">
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
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-slide-up animation-delay-100">
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
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-slide-up animation-delay-200">
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
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-slide-up animation-delay-300">
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

              <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-3 md:mb-4">
                <input
                  type="text"
                  placeholder="Ex: CPU-CERT-2024-XXXXX"
                  className="flex-1 px-4 md:px-6 py-3 md:py-4 rounded-lg md:rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:outline-none text-slate-900 placeholder:text-slate-400 text-sm md:text-base"
                />
                <Button
                  className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl shadow-lg hover:shadow-xl transition-all text-sm md:text-base"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Vérifier
                </Button>
              </div>

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
                  <div className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center">
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
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in">
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
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in animation-delay-100">
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
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in animation-delay-200">
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
