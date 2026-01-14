"use client";

import { useState } from "react";
import { PageBanner } from "@/components/layout/PageBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Download, 
  BookOpen, 
  Search,
  Video,
  Calendar,
  Clock,
  Users,
  Eye,
  Star,
  Play,
  Bell,
  HelpCircle,
  ChevronDown,
  GraduationCap,
  CreditCard,
  MessageCircle,
  Mail,
  Phone
} from "lucide-react";
import Link from "next/link";

const categories = [
  "Tous",
  "Création d'entreprise",
  "Business Plan",
  "Fiscalité",
  "RH",
  "Marchés publics",
  "Qualité"
];

const ressources = [
  {
    id: 1,
    titre: "Guide de création d'entreprise en Côte d'Ivoire",
    description: "Toutes les étapes pour créer votre entreprise, de l'idée à l'immatriculation",
    pages: 45,
    telechargements: 1250,
    format: "PDF",
    formatColor: "bg-green-500",
    categorie: "Création d'entreprise"
  },
  {
    id: 2,
    titre: "Modèle de Business Plan",
    description: "Template complet avec exemples pour construire votre business plan",
    pages: 20,
    telechargements: 890,
    format: "Word/Excel",
    formatColor: "bg-blue-500",
    categorie: "Business Plan"
  },
  {
    id: 3,
    titre: "Kit de réponse aux appels d'offres",
    description: "Tous les documents types pour répondre aux marchés publics",
    pages: 35,
    telechargements: 670,
    format: "ZIP",
    formatColor: "bg-orange-500",
    categorie: "Marchés publics"
  },
  {
    id: 4,
    titre: "Guide fiscal des PME",
    description: "Comprendre et optimiser sa fiscalité en Côte d'Ivoire",
    pages: 60,
    telechargements: 540,
    format: "PDF",
    formatColor: "bg-green-500",
    categorie: "Fiscalité"
  },
  {
    id: 5,
    titre: "Modèles de contrats de travail",
    description: "CDD, CDI, stage : tous les modèles conformes au droit ivoirien",
    pages: 15,
    telechargements: 980,
    format: "Word",
    formatColor: "bg-blue-500",
    categorie: "RH"
  },
  {
    id: 6,
    titre: "Check-list qualité HACCP",
    description: "Guide pratique pour la mise en conformité agroalimentaire",
    pages: 25,
    telechargements: 320,
    format: "PDF",
    formatColor: "bg-green-500",
    categorie: "Qualité"
  },
  {
    id: 7,
    titre: "Plan de trésorerie prévisionnel",
    description: "Modèle Excel avec formules automatiques sur 3 ans",
    pages: 12,
    telechargements: 1120,
    format: "Excel",
    formatColor: "bg-emerald-500",
    categorie: "Business Plan"
  },
  {
    id: 8,
    titre: "Guide des aides aux entreprises",
    description: "Panorama complet des financements et subventions disponibles",
    pages: 38,
    telechargements: 760,
    format: "PDF",
    formatColor: "bg-green-500",
    categorie: "Création d'entreprise"
  },
  {
    id: 9,
    titre: "Modèles de factures et devis",
    description: "Templates professionnels conformes aux normes comptables",
    pages: 8,
    telechargements: 2150,
    format: "Word/Excel",
    formatColor: "bg-blue-500",
    categorie: "Fiscalité"
  }
];

const prochainsWebinaires = [
  {
    id: 1,
    titre: "Réussir sa levée de fonds en Côte d'Ivoire",
    animateur: "Fatou Traoré",
    role: "Directrice d'investissement",
    date: "25 Janvier 2026",
    heure: "15h00 GMT",
    duree: "90 min",
    participants: 45,
    places: 100,
    niveau: "Intermédiaire",
    themes: ["Finance", "Entrepreneuriat"],
    color: "blue"
  },
  {
    id: 2,
    titre: "Les clés des marchés publics : de l'AO à l'exécution",
    animateur: "Jean-Baptiste Yao",
    role: "Expert marchés publics",
    date: "02 Février 2026",
    heure: "14h00 GMT",
    duree: "120 min",
    participants: 62,
    places: 100,
    niveau: "Tous niveaux",
    themes: ["Marchés publics", "Administratif"],
    color: "green"
  },
  {
    id: 3,
    titre: "Stratégie marketing digital pour PME africaines",
    animateur: "Marie-Claire Koné",
    role: "Consultante Marketing Digital",
    date: "08 Février 2026",
    heure: "16h00 GMT",
    duree: "75 min",
    participants: 38,
    places: 100,
    niveau: "Débutant",
    themes: ["Marketing", "Digital"],
    color: "purple"
  }
];

const replays = [
  {
    id: 1,
    titre: "Maîtriser sa trésorerie en période de crise",
    animateur: "Dr. Amadou Diallo",
    date: "15 Décembre 2025",
    duree: "85 min",
    vues: 2340,
    rating: 4.8,
    themes: ["Finance", "Gestion"],
    thumbnail: "orange"
  },
  {
    id: 2,
    titre: "Fiscalité des entreprises en Côte d'Ivoire",
    animateur: "Sophie Kouassi",
    date: "20 Décembre 2025",
    duree: "75 min",
    vues: 1890,
    rating: 4.9,
    themes: ["Fiscalité", "Comptabilité"],
    thumbnail: "blue"
  },
  {
    id: 3,
    titre: "Certification ISO 9001 : guide pratique",
    animateur: "Pierre N'Guessan",
    date: "10 Janvier 2026",
    duree: "95 min",
    vues: 1560,
    rating: 4.7,
    themes: ["Qualité", "Normes"],
    thumbnail: "green"
  },
  {
    id: 4,
    titre: "Lancer son e-commerce en Afrique",
    animateur: "Aïcha Bamba",
    date: "12 Janvier 2026",
    duree: "100 min",
    vues: 2150,
    rating: 4.9,
    themes: ["E-commerce", "Digital"],
    thumbnail: "purple"
  },
  {
    id: 5,
    titre: "RH : recruter et fidéliser les talents",
    animateur: "Laurent Kouamé",
    date: "18 Janvier 2026",
    duree: "70 min",
    vues: 980,
    rating: 4.6,
    themes: ["RH", "Management"],
    thumbnail: "indigo"
  },
  {
    id: 6,
    titre: "Développer son business à l'international",
    animateur: "Isabelle Touré",
    date: "20 Janvier 2026",
    duree: "90 min",
    vues: 1420,
    rating: 4.8,
    themes: ["Export", "Commerce"],
    thumbnail: "cyan"
  }
];

const faqCategories = [
  { id: "all", label: "Toutes", icon: HelpCircle, color: "orange" },
  { id: "formations", label: "Formations", icon: GraduationCap, color: "blue" },
  { id: "inscriptions", label: "Inscriptions", icon: FileText, color: "green" },
  { id: "paiements", label: "Paiements", icon: CreditCard, color: "purple" },
  { id: "certifications", label: "Certifications", icon: BookOpen, color: "indigo" },
  { id: "entreprises", label: "Entreprises", icon: Users, color: "cyan" }
];

const faqs = [
  {
    id: 1,
    question: "Comment s'inscrire à une formation ?",
    reponse: "Pour vous inscrire, rendez-vous sur la page de la formation qui vous intéresse, cliquez sur le bouton 'S'inscrire' et suivez les étapes. Vous devrez créer un compte si vous n'en avez pas déjà un, puis compléter le formulaire d'inscription avec vos informations personnelles et professionnelles.",
    categorie: "inscriptions"
  },
  {
    id: 2,
    question: "Quels sont les modes de paiement acceptés ?",
    reponse: "Nous acceptons plusieurs modes de paiement : cartes bancaires (Visa, Mastercard), Mobile Money (Orange Money, MTN Money, Moov Money), virements bancaires et paiements en espèces à nos centres. Pour les entreprises, nous proposons également la facturation avec paiement différé.",
    categorie: "paiements"
  },
  {
    id: 3,
    question: "Les formations sont-elles certifiantes ?",
    reponse: "Oui, toutes nos formations sont certifiantes. À l'issue de votre formation et après validation de vos acquis, vous recevrez une attestation ou un certificat reconnu. Certaines de nos formations préparent également à des certifications internationales (ISO, PMI, etc.).",
    categorie: "certifications"
  },
  {
    id: 4,
    question: "Quelle est la durée moyenne d'une formation ?",
    reponse: "La durée varie selon le type de formation. Les formations courtes durent de 1 à 3 jours (7-21 heures), les formations standard de 1 à 2 semaines (35-70 heures), et les parcours complets peuvent s'étendre sur plusieurs mois avec un rythme flexible adapté aux professionnels.",
    categorie: "formations"
  },
  {
    id: 5,
    question: "Puis-je financer ma formation avec mon CPF ?",
    reponse: "Les formations CPU Academy sont éligibles au financement par différents dispositifs selon votre situation : Plan de développement des compétences pour les salariés, Fonds d'Assurance Formation (FAF) pour les indépendants, et financement personnel avec possibilité d'échelonnement.",
    categorie: "paiements"
  },
  {
    id: 6,
    question: "Proposez-vous des formations sur mesure pour les entreprises ?",
    reponse: "Absolument ! Nous concevons des programmes de formation sur mesure adaptés aux besoins spécifiques de votre entreprise. Notre équipe pédagogique peut intervenir dans vos locaux ou accueillir vos collaborateurs dans nos centres. Contactez notre service entreprises pour un devis personnalisé.",
    categorie: "entreprises"
  },
  {
    id: 7,
    question: "Les formations sont-elles disponibles en ligne ?",
    reponse: "Oui, nous proposons trois formats : formations en présentiel dans nos 15 centres régionaux, formations en ligne via notre plateforme e-learning, et formations hybrides combinant sessions en ligne et présentiel. Toutes nos formations en ligne incluent l'accès aux supports, exercices pratiques et accompagnement par un formateur.",
    categorie: "formations"
  },
  {
    id: 8,
    question: "Comment obtenir mon attestation de formation ?",
    reponse: "Votre attestation est délivrée automatiquement à l'issue de votre formation, après validation de votre assiduité et réussite aux évaluations. Elle est disponible en téléchargement sur votre espace personnel sous 48h et vous recevez également une version papier par courrier.",
    categorie: "certifications"
  },
  {
    id: 9,
    question: "Puis-je annuler ou reporter mon inscription ?",
    reponse: "Oui, vous pouvez annuler ou reporter votre inscription jusqu'à 7 jours avant le début de la formation sans frais. Entre 7 jours et 48h, des frais de 30% s'appliquent. Moins de 48h avant le début, la formation est due en totalité sauf cas de force majeure justifié.",
    categorie: "inscriptions"
  },
  {
    id: 10,
    question: "Y a-t-il des prérequis pour suivre les formations ?",
    reponse: "Les prérequis varient selon les formations. Ils sont clairement indiqués sur chaque fiche formation. Les formations de niveau débutant sont accessibles sans prérequis particulier, tandis que les formations avancées peuvent nécessiter une expérience professionnelle ou des connaissances préalables spécifiques.",
    categorie: "formations"
  },
  {
    id: 11,
    question: "Comment faire une demande de devis pour mon entreprise ?",
    reponse: "Pour obtenir un devis, rendez-vous sur notre page Entreprises et remplissez le formulaire de demande de devis, ou contactez-nous directement au +225 27 XX XX XX XX. Notre équipe vous recontactera sous 24h pour discuter de vos besoins et vous proposer une solution adaptée.",
    categorie: "entreprises"
  },
  {
    id: 12,
    question: "Les supports de cours sont-ils fournis ?",
    reponse: "Oui, tous les supports pédagogiques sont inclus dans le prix de la formation : documentation complète, exercices pratiques, études de cas, et accès à notre plateforme en ligne avec ressources complémentaires. Vous conservez l'accès aux supports pendant 6 mois après la formation.",
    categorie: "formations"
  }
];

export default function RessourcesPage() {
  const [activeTab, setActiveTab] = useState<"guides" | "webinaires" | "support">("guides");
  const [selectedCategory, setSelectedCategory] = useState<string>("Tous");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedFAQCategory, setSelectedFAQCategory] = useState<string>("all");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Filtrer les ressources selon la catégorie et la recherche
  const filteredRessources = ressources.filter(r => {
    const matchCategory = selectedCategory === "Tous" || r.categorie === selectedCategory;
    const matchSearch = searchQuery === "" || 
      r.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.categorie.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Filtrer les webinaires selon la recherche
  const filteredProchains = prochainsWebinaires.filter(w => 
    searchQuery === "" ||
    w.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.animateur.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.themes.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredReplays = replays.filter(r => 
    searchQuery === "" ||
    r.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.animateur.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.themes.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filtrer les FAQs
  const filteredFAQs = faqs.filter(faq => {
    const matchCategory = selectedFAQCategory === "all" || faq.categorie === selectedFAQCategory;
    const matchSearch = searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.reponse.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <>
      <PageBanner 
        title="Guides, modèles et webinaires"
        subtitle="Des ressources gratuites pour accompagner le développement de votre entreprise"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Ressources" }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/10 relative z-0">
        <section className="container mx-auto px-8 lg:px-16 py-12 relative z-10">
          {/* Tabs et recherche */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8 relative z-20">
            {/* Tabs */}
            <div className="flex gap-2 relative z-30">
              <button
                onClick={() => setActiveTab("guides")}
                className={`inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-all shadow-md ${
                  activeTab === "guides"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200"
                }`}
              >
                <FileText className="w-4 h-4 mr-2" />
                Guides & Modèles
              </button>
              <button
                onClick={() => setActiveTab("webinaires")}
                className={`inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-all shadow-md ${
                  activeTab === "webinaires"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200"
                }`}
              >
                <Video className="w-4 h-4 mr-2" />
                Webinaires
              </button>
              <button
                onClick={() => setActiveTab("support")}
                className={`inline-flex items-center justify-center px-4 py-2 rounded-md font-medium transition-all shadow-md ${
                  activeTab === "support"
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200"
                }`}
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                Support & Assistance
              </button>
            </div>

            {/* Recherche */}
            <div className="relative w-full md:w-80 z-30">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2 border-2 border-slate-200 rounded-md focus:border-orange-500 focus:ring-2 focus:ring-orange-500 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Contenu Guides & Modèles */}
          {activeTab === "guides" && (
            <>
              {/* Filtres par catégorie */}
              <div className="flex flex-wrap gap-2 mb-8 animate-fade-in relative z-20">
                {categories.map((cat, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-md font-medium transition-all ${
                      selectedCategory === cat
                        ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md" 
                        : "bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grille de ressources */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {filteredRessources.length > 0 ? (
                  filteredRessources.map((ressource, idx) => (
                    <Card
                      key={ressource.id}
                      className="group flex flex-col hover:shadow-2xl transition-all duration-500 border-2 border-slate-100 hover:border-orange-200 bg-white overflow-hidden animate-fade-in hover:-translate-y-2"
                      style={{ 
                        animationDelay: `${idx * 80}ms`,
                        transformOrigin: 'center'
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 via-orange-50/0 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="p-6 flex-grow flex flex-col relative z-10">
                        {/* Header avec icône et badge format */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                            <FileText className="w-7 h-7 text-orange-600 group-hover:scale-110 transition-transform" />
                          </div>
                          <Badge className={`${ressource.formatColor} text-white border-0 text-xs font-semibold px-3 py-1 shadow-md group-hover:shadow-lg transition-all`}>
                            {ressource.format}
                          </Badge>
                        </div>

                        {/* Titre */}
                        <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 leading-tight min-h-[3.5rem]">
                          {ressource.titre}
                        </h3>

                        {/* Description */}
                        <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
                          {ressource.description}
                        </p>

                        {/* Badge catégorie */}
                        <div className="mb-4">
                          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 text-xs">
                            {ressource.categorie}
                          </Badge>
                        </div>

                        {/* Infos */}
                        <div className="flex items-center justify-between text-sm text-slate-500 mb-4 pb-4 border-b-2 border-slate-100 group-hover:border-orange-100 transition-colors">
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-orange-600" />
                            <span className="font-medium">{ressource.pages} pages</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Download className="w-4 h-4 text-orange-600" />
                            <span className="font-medium">{ressource.telechargements.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Bouton télécharger */}
                        <Button
                          className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                        >
                          <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                          Télécharger
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <p className="text-lg text-slate-500">Aucune ressource trouvée</p>
                    <p className="text-sm text-slate-400 mt-2">Essayez de modifier vos critères de recherche</p>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Contenu Webinaires */}
          {activeTab === "webinaires" && (
            <div className="animate-fade-in">
              {/* Stats */}
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                {[
                  { icon: Video, value: "30+", label: "Webinaires organisés" },
                  { icon: Users, value: "5,000+", label: "Participants" },
                  { icon: Eye, value: "15,000+", label: "Vues de replays" },
                  { icon: Calendar, value: "2x/mois", label: "Nouveaux webinaires" }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in group"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <Icon className="w-8 h-8 text-orange-600" />
                      </div>
                      <div className="text-3xl font-bold mb-1 text-slate-900 group-hover:text-orange-600 transition-colors">{stat.value}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Prochains webinaires */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping"></div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Prochains webinaires</h2>
                  <Badge className="bg-green-100 text-green-700 border-0">En direct</Badge>
                </div>

                {filteredProchains.length > 0 ? (
                  <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
                    {filteredProchains.map((webinaire, idx) => {
                      const progress = (webinaire.participants / webinaire.places) * 100;
                      return (
                        <Card
                          key={webinaire.id}
                          className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-orange-200 overflow-hidden animate-fade-in hover:-translate-y-2"
                          style={{ animationDelay: `${idx * 100}ms` }}
                        >
                          <div className={`h-2 bg-gradient-to-r from-${webinaire.color}-500 to-${webinaire.color}-600`}></div>
                          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-orange-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          <div className="p-6 relative z-10">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-4">
                              <Badge className="bg-orange-100 text-orange-700 border-0 shadow-sm group-hover:shadow-md transition-all">
                                <Calendar className="w-3 h-3 mr-1" />
                                Inscription ouverte
                              </Badge>
                              <div className={`w-3 h-3 rounded-full bg-${webinaire.color}-500 shadow-lg group-hover:scale-150 transition-all duration-500`}></div>
                            </div>

                            {/* Titre */}
                            <h3 className="text-lg font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                              {webinaire.titre}
                            </h3>

                            {/* Animateur */}
                            <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-slate-100 group-hover:border-orange-100 transition-colors">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-110 group-hover:shadow-xl transition-all duration-500">
                                {webinaire.animateur.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900 text-sm">{webinaire.animateur}</div>
                                <div className="text-xs text-slate-600">{webinaire.role}</div>
                              </div>
                            </div>

                            {/* Infos */}
                            <div className="space-y-2.5 mb-4">
                              <div className="flex items-center gap-2 text-sm text-slate-700 group-hover:translate-x-1 transition-transform">
                                <Calendar className="w-4 h-4 text-orange-600" />
                                <span className="font-semibold">{webinaire.date}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-slate-700 group-hover:translate-x-1 transition-transform">
                                <Clock className="w-4 h-4 text-orange-600" />
                                <span>{webinaire.heure} • {webinaire.duree}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                  {webinaire.niveau}
                                </Badge>
                              </div>
                            </div>

                            {/* Thèmes */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {webinaire.themes.map((theme, i) => (
                                <Badge key={i} variant="outline" className="text-xs bg-slate-50 hover:bg-slate-100 transition-colors">
                                  {theme}
                                </Badge>
                              ))}
                            </div>

                            {/* Jauge */}
                            <div className="mb-4">
                              <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-slate-600 font-medium">Places disponibles</span>
                                <span className="font-bold text-slate-900">
                                  {webinaire.participants}/{webinaire.places}
                                </span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden shadow-inner">
                                <div 
                                  className={`h-full bg-gradient-to-r from-${webinaire.color}-500 to-${webinaire.color}-600 transition-all duration-1000 shadow-lg`}
                                  style={{ width: `${progress}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* CTA */}
                            <Button className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                              <Users className="mr-2 h-4 w-4" />
                              S'inscrire gratuitement
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl">
                    <Video className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <p className="text-lg text-slate-500">Aucun webinaire trouvé</p>
                  </div>
                )}
              </div>

              {/* Replays */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <Play className="w-6 h-6 text-orange-600" />
                  <h2 className="text-2xl font-bold text-slate-900">Replays disponibles</h2>
                  <Badge className="bg-blue-100 text-blue-700 border-0">À la demande</Badge>
                </div>

                {filteredReplays.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredReplays.map((replay, idx) => (
                      <Card
                        key={replay.id}
                        className="group hover:shadow-2xl transition-all duration-500 border-2 hover:border-orange-200 overflow-hidden animate-fade-in hover:-translate-y-2"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        {/* Thumbnail */}
                        <div className={`relative h-48 bg-gradient-to-br from-${replay.thumbnail}-400 to-${replay.thumbnail}-600 flex items-center justify-center overflow-hidden`}>
                          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors"></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                          
                          {/* Play button */}
                          <div className="relative w-20 h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center group-hover:scale-125 group-hover:bg-orange-500 transition-all duration-500 cursor-pointer shadow-2xl z-10">
                            <Play className="w-9 h-9 text-orange-600 group-hover:text-white ml-1 transition-colors" />
                          </div>
                          
                          {/* Durée badge */}
                          <Badge className="absolute top-4 right-4 bg-black/70 text-white border-0 backdrop-blur-sm shadow-lg">
                            <Clock className="w-3 h-3 mr-1" />
                            {replay.duree}
                          </Badge>

                          {/* Rating badge */}
                          <Badge className="absolute top-4 left-4 bg-yellow-500/90 text-white border-0 backdrop-blur-sm shadow-lg font-bold">
                            <Star className="w-3 h-3 mr-1 fill-white" />
                            {replay.rating}
                          </Badge>
                        </div>

                        <div className="p-6">
                          {/* Titre */}
                          <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                            {replay.titre}
                          </h3>

                          {/* Animateur */}
                          <div className="flex items-center gap-2 mb-4 pb-4 border-b-2 border-slate-100 group-hover:border-orange-100 transition-colors">
                            <Users className="w-4 h-4 text-orange-600" />
                            <p className="text-sm font-medium text-slate-700">{replay.animateur}</p>
                          </div>

                          {/* Stats */}
                          <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                            <div className="flex items-center gap-1.5 group-hover:text-orange-600 transition-colors">
                              <Eye className="w-4 h-4" />
                              <span className="font-medium">{replay.vues.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              <span>{replay.date}</span>
                            </div>
                          </div>

                          {/* Thèmes */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {replay.themes.map((theme, i) => (
                              <Badge key={i} variant="outline" className="text-xs bg-slate-50 hover:bg-slate-100 transition-colors">
                                {theme}
                              </Badge>
                            ))}
                          </div>

                          {/* CTA */}
                          <Button className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                            <Play className="mr-2 h-4 w-4" />
                            Regarder le replay
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-2xl">
                    <Play className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <p className="text-lg text-slate-500">Aucun replay trouvé</p>
                  </div>
                )}
              </div>

              {/* Newsletter CTA */}
              <div className="mt-12 bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-center">
                <Bell className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Ne manquez aucun webinaire
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                  Inscrivez-vous à notre newsletter pour recevoir les invitations et ne rater aucune session en direct
                </p>
                <div className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
                  <Input
                    type="email"
                    placeholder="Votre adresse email"
                    className="flex-grow bg-white border-0"
                  />
                  <Button className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white px-8">
                    S'abonner
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Contenu Support & Assistance (FAQ) */}
          {activeTab === "support" && (
            <div className="animate-fade-in">
              {/* Stats rapides */}
              <div className="grid md:grid-cols-4 gap-6 mb-12">
                {[
                  { icon: HelpCircle, value: "12+", label: "Questions fréquentes", color: "orange" },
                  { icon: MessageCircle, value: "24/7", label: "Support disponible", color: "blue" },
                  { icon: Phone, value: "< 2h", label: "Temps de réponse", color: "green" },
                  { icon: Users, value: "1000+", label: "Questions résolues", color: "purple" }
                ].map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                        <Icon className={`w-8 h-8 text-${stat.color}-600`} />
                      </div>
                      <div className={`text-3xl font-bold mb-1 text-slate-900 group-hover:text-${stat.color}-600 transition-colors`}>{stat.value}</div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Catégories FAQ */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {faqCategories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedFAQCategory(cat.id)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        selectedFAQCategory === cat.id
                          ? `bg-gradient-to-r from-${cat.color}-500 to-${cat.color}-600 text-white shadow-lg scale-105`
                          : "bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 shadow-md"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Liste des FAQs */}
              <div className="max-w-4xl mx-auto">
                {filteredFAQs.length > 0 ? (
                  <div className="space-y-4">
                    {filteredFAQs.map((faq, idx) => (
                      <Card
                        key={faq.id}
                        className="overflow-hidden border-2 border-slate-100 hover:border-orange-200 transition-all duration-300 hover:shadow-xl animate-slide-up"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <button
                          onClick={() => toggleFAQ(faq.id)}
                          className="w-full p-6 flex items-start justify-between gap-4 text-left hover:bg-slate-50/50 transition-colors"
                        >
                          <div className="flex-grow">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center flex-shrink-0">
                                <HelpCircle className="w-5 h-5 text-orange-600" />
                              </div>
                              <Badge variant="outline" className="text-xs bg-slate-50">
                                {faqCategories.find(c => c.id === faq.categorie)?.label}
                              </Badge>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                              {faq.question}
                            </h3>
                          </div>
                          <ChevronDown
                            className={`w-6 h-6 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                              openFAQ === faq.id ? "rotate-180 text-orange-600" : ""
                            }`}
                          />
                        </button>
                        
                        <div
                          className={`overflow-hidden transition-all duration-500 ${
                            openFAQ === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="px-6 pb-6 pt-2">
                            <div className="pl-11 pr-10">
                              <div className="h-px bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 mb-4"></div>
                              <p className="text-slate-700 leading-relaxed animate-fade-in">
                                {faq.reponse}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                      <Search className="w-10 h-10 text-slate-300" />
                    </div>
                    <p className="text-xl text-slate-500 font-semibold mb-2">Aucune question trouvée</p>
                    <p className="text-slate-400">Essayez de modifier vos critères de recherche</p>
                  </div>
                )}
              </div>

              {/* Section contact */}
              <div className="max-w-4xl mx-auto mt-16">
                <div className="bg-gradient-to-r from-orange-50 via-white to-blue-50 rounded-3xl p-8 md:p-12 border-2 border-slate-100 shadow-xl">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                      <MessageCircle className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                      Vous ne trouvez pas la réponse ?
                    </h2>
                    <p className="text-lg text-slate-600">
                      Notre équipe est là pour vous aider
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <a
                      href="mailto:contact@cpuacademy.ci"
                      className="group flex flex-col items-center p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-3 group-hover:bg-orange-500 transition-colors">
                        <Mail className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                      <p className="text-sm text-slate-600 text-center">contact@cpuacademy.ci</p>
                    </a>

                    <a
                      href="tel:+22527000000"
                      className="group flex flex-col items-center p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-500 transition-colors">
                        <Phone className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">Téléphone</h3>
                      <p className="text-sm text-slate-600 text-center">+225 27 XX XX XX XX</p>
                    </a>

                    <a
                      href="#chat"
                      onClick={(e) => {
                        e.preventDefault();
                        // Ici vous pouvez ouvrir un widget de chat
                        alert("Chat en direct disponible bientôt !");
                      }}
                      className="group flex flex-col items-center p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-green-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-3 group-hover:bg-green-500 transition-colors">
                        <MessageCircle className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1">Chat en direct</h3>
                      <p className="text-sm text-slate-600 text-center">Réponse immédiate</p>
                    </a>
                  </div>

                  {/* Formulaire de contact */}
                  <div className="bg-white rounded-2xl p-8 border-2 border-slate-100 shadow-md">
                    <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Laissez-nous un message</h3>
                    <p className="text-sm text-slate-600 mb-6 text-center">Nous vous répondrons dans les plus brefs délais</p>
                    
                    <form className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="nom" className="block text-sm font-semibold text-slate-700 mb-2">
                            Nom complet *
                          </label>
                          <input
                            type="text"
                            id="nom"
                            required
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                            placeholder="Votre nom"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            required
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                            placeholder="votre@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="telephone" className="block text-sm font-semibold text-slate-700 mb-2">
                          Téléphone
                        </label>
                        <input
                          type="tel"
                          id="telephone"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                          placeholder="+225 XX XX XX XX XX"
                        />
                      </div>

                      <div>
                        <label htmlFor="sujet" className="block text-sm font-semibold text-slate-700 mb-2">
                          Sujet *
                        </label>
                        <input
                          type="text"
                          id="sujet"
                          required
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                          placeholder="Objet de votre message"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all resize-none"
                          placeholder="Décrivez votre demande ou question..."
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="w-5 h-5" />
                          Envoyer le message
                        </div>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
