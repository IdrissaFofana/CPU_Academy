"use client";

import { useState, useEffect, useMemo } from "react";
import { PageBanner } from "@/components/layout/PageBanner";
import { ParcoursCardOptimized, ViewModeToggle } from "@/components/parcours/ParcoursCardOptimized";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/search-bar";
import {
  Target,
  Search,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  Rocket,
  Sparkles,
  CheckCircle2,
  Zap,
  Trophy,
  GraduationCap,
  SlidersHorizontal,
  RotateCcw,
  Monitor,
  Video,
  Globe,
  Layers,
  Clock,
  Tag,
  Star,
  Medal,
  X,
  Check,
  ChevronDown,
  ChevronUp,
  Gift,
  CreditCard,
  Flame
} from "lucide-react";
import { useParcours } from "@/hooks/useParcours";
import { buildParcoursFromApi } from "@/lib/adapters/parcours-adapter";
import { useViewMode, useFavorites, useTelemetry } from "@/hooks/useStorage";

export default function ParcoursPage() {
  const [filtreNiveau, setFiltreNiveau] = useState<string>("all");
  const [filtreFormats, setFiltreFormats] = useState<string[]>([]);
  const [filtreDuree, setFiltreDuree] = useState<string>("all");
  const [filtrePrix, setFiltrePrix] = useState<string>("all");
  const [filtreCertifiant, setFiltreCertifiant] = useState(false);
  const [filtreBestseller, setFiltreBestseller] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [triPar, setTriPar] = useState<string>("populaire");
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) =>
    setOpenSection(prev => (prev === section ? null : section));

  const openSections = {
    niveau: openSection === "niveau",
    format: openSection === "format",
    duree: openSection === "duree",
    prix: openSection === "prix",
    options: openSection === "options",
    tri: openSection === "tri",
  };

  const activeFiltersCount = [
    filtreNiveau !== "all",
    filtreFormats.length > 0,
    filtreDuree !== "all",
    filtrePrix !== "all",
    filtreCertifiant,
    filtreBestseller,
  ].filter(Boolean).length;
  
  // Use custom hooks for persistent state
  const [viewMode, setViewMode] = useViewMode("grid");
  const { toggleParcoursFavorite, isParcoursLiked } = useFavorites();
  const { trackViewModeChange, trackFavoriteToggle, trackCardImpression } = useTelemetry();
  const { parcours: apiParcours, isLoading: isParcoursLoading, error: parcoursError } = useParcours();

  const parcoursAvecFormations = useMemo(() => buildParcoursFromApi(apiParcours), [apiParcours]);

  const parcoursMetrics = useMemo(() => {
    const totalParcours = parcoursAvecFormations.length;
    const totalFormations = parcoursAvecFormations.reduce((sum, parcours) => sum + (parcours.formations?.length || 0), 0);
    const totalHours = parcoursAvecFormations.reduce((sum, parcours) => sum + (parcours.dureeTotal || 0), 0);
    const averageRating = totalParcours
      ? parcoursAvecFormations.reduce((sum, parcours) => sum + (parcours.notesMoyenne || 0), 0) / totalParcours
      : 0;
    const certifiantRate = totalParcours
      ? Math.round((parcoursAvecFormations.filter((parcours) => parcours.certifiant).length / totalParcours) * 100)
      : 0;

    return {
      totalParcours,
      totalFormations,
      totalHours,
      averageRating: Number(averageRating.toFixed(1)),
      certifiantRate,
    };
  }, [parcoursAvecFormations]);

  const bannerSlides = useMemo(
    () => [
      {
        image: "/images/default-formation.jpg",
        title: "Parcours de Formation",
        subtitle: "Accélérez votre carrière avec nos parcours certifiants",
        badge: {
          icon: "+",
          number: String(parcoursMetrics.totalParcours || 0),
          text: "Parcours disponibles",
          subtext: "Récupérés depuis l'API parcours métiers",
        },
        trustBadges: [
          {
            icon: "check" as const,
            color: "green",
            title: `${parcoursMetrics.certifiantRate}% certifiants`,
            subtitle: "Reconnaissance professionnelle",
          },
          {
            icon: "users" as const,
            color: "orange",
            title: `${parcoursMetrics.totalFormations} formations liées`,
            subtitle: "Assemblées en parcours métiers",
          },
          {
            icon: "check" as const,
            color: "blue",
            title: `${parcoursMetrics.totalHours}h de contenu`,
            subtitle: "Durée totale du catalogue parcours",
          },
        ],
        buttons: [
          { label: "Commencer maintenant", href: "/inscription", icon: <Rocket className="h-5 w-5" /> },
          { label: "Voir le catalogue", href: "/catalogue", variant: "outline" as const, icon: <BookOpen className="h-5 w-5" /> },
        ],
      },
      {
        image: "/images/formation-agriculture.png",
        title: "Parcours orientés métier",
        subtitle: "Des programmes dynamiques alignés sur les besoins du marché",
        badge: {
          number: `${parcoursMetrics.certifiantRate}%`,
          text: "Parcours certifiants",
          subtext: "Évolution continue du catalogue",
        },
        trustBadges: [
          {
            icon: "users" as const,
            color: "purple",
            title: "Formats flexibles",
            subtitle: "Présentiel, live et hybride",
          },
          {
            icon: "building" as const,
            color: "orange",
            title: "Parcours orientés entreprise",
            subtitle: "Compétences immédiatement activables",
          },
          {
            icon: "check" as const,
            color: "green",
            title: "Données API en temps réel",
            subtitle: "Catalogue toujours à jour",
          },
        ],
        buttons: [{ label: "Explorer les parcours", href: "#parcours", variant: "outline" as const, icon: <BookOpen className="h-5 w-5" /> }],
      },
    ],
    [parcoursMetrics]
  );

  // Filtrer les parcours
  const parcoursFiltres = parcoursAvecFormations.filter(parcours => {
    const matchNiveau = filtreNiveau === "all" || parcours.niveau === filtreNiveau;
    const matchSearch = searchTerm === "" ||
      parcours.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcours.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFormat = filtreFormats.length === 0 || filtreFormats.includes(parcours.format);
    const duree = parcours.dureeTotal || 0;
    const matchDuree =
      filtreDuree === "all" ? true :
      filtreDuree === "lt10" ? duree < 10 :
      filtreDuree === "10-30" ? duree >= 10 && duree <= 30 :
      filtreDuree === "30-60" ? duree > 30 && duree <= 60 :
      filtreDuree === "gt60" ? duree > 60 : true;
    const matchPrix =
      filtrePrix === "all" ? true :
      filtrePrix === "gratuit" ? parcours.gratuit :
      !parcours.gratuit;
    const matchCertifiant = !filtreCertifiant || parcours.certifiant;
    const matchBestseller = !filtreBestseller || (parcours.notesMoyenne || 0) >= 4.5;
    return matchNiveau && matchSearch && matchFormat && matchDuree && matchPrix && matchCertifiant && matchBestseller;
  });
  
  // Trier les parcours
  const parcoursTries = [...parcoursFiltres].sort((a, b) => {
    switch(triPar) {
      case "populaire":
        return (b.formations?.length || 0) - (a.formations?.length || 0);
      case "note":
        return (b.notesMoyenne || 0) - (a.notesMoyenne || 0);
      case "duree-asc":
        return (a.dureeTotal || 0) - (b.dureeTotal || 0);
      case "duree-desc":
        return (b.dureeTotal || 0) - (a.dureeTotal || 0);
      case "prix-asc":
        return (a.prixPublic || 0) - (b.prixPublic || 0);
      case "prix-desc":
        return (b.prixPublic || 0) - (a.prixPublic || 0);
      default:
        return 0;
    }
  });
  
  // Toggle favoris with telemetry tracking
  const toggleFavori = (parcoursId: string) => {
    toggleParcoursFavorite(parcoursId);
    trackFavoriteToggle(parcoursId, "/parcours");
  };

  // Track view mode changes
  useEffect(() => {
    trackViewModeChange(viewMode, "/parcours");
  }, [viewMode, trackViewModeChange]);

  // Track impressions on mount
  useEffect(() => {
    trackCardImpression("/parcours", viewMode);
  }, [viewMode, trackCardImpression]);
  
  // Vérifier si un parcours est nouveau (moins de 30 jours)
  const isParcoursNew = (dateCreation: string): boolean => {
    const creationDate = new Date(dateCreation);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - creationDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  };

  const handleInscription = (parcoursId: string) => {
    window.location.href = `/parcours/${parcoursId}`;
  };

  const resetFilters = () => {
    setFiltreNiveau("all");
    setFiltreFormats([]);
    setFiltreDuree("all");
    setFiltrePrix("all");
    setFiltreCertifiant(false);
    setFiltreBestseller(false);
    setSearchTerm("");
  };

  const toggleFormat = (format: string) => {
    setFiltreFormats(prev =>
      prev.includes(format) ? prev.filter(f => f !== format) : [...prev, format]
    );
  };

  return (
    <>
      <PageBanner
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Parcours" }
        ]}
        slides={bannerSlides}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Section Hero avec statistiques */}
        <section id="statistiques" className="relative py-16 overflow-hidden">
          {/* Background decoratif */}
          <div className="absolute inset-0 bg-gradient-to-br from-cpu-orange/5 via-transparent to-blue-500/5"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-cpu-orange/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>
          
          <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10">
            <div className="text-center mb-12 animate-fade-in-up">
              <Badge className="mb-4 bg-cpu-orange text-white border-0 shadow-lg px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                {parcoursMetrics.totalParcours} Parcours disponibles
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Transformez votre carrière
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Des <span className="text-cpu-orange font-semibold">parcours métiers API-driven</span> conçus pour structurer une vraie montée en compétence. 
                <br className="hidden md:block" />
                Chaque parcours regroupe les formations réellement associées par le backend.
              </p>
            </div>


          </div>
        </section>

        {/* Main layout with sidebar */}
        <section id="parcours" className="py-8 lg:py-12">
          <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Sidebar Filtres */}
              <aside className="w-full lg:w-72 flex-shrink-0">
                <div className="sticky top-24 space-y-3">

                  {/* ── Header ── */}
                  <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800">
                    <div className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-cpu-orange flex items-center justify-center shadow-lg">
                            <SlidersHorizontal className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h2 className="text-white font-bold text-base leading-none">Filtres</h2>
                            <p className="text-slate-400 text-xs mt-0.5">
                              {activeFiltersCount === 0 ? "Aucun filtre actif" : `${activeFiltersCount} filtre${activeFiltersCount > 1 ? "s" : ""} actif${activeFiltersCount > 1 ? "s" : ""}`}
                            </p>
                          </div>
                        </div>
                        {activeFiltersCount > 0 && (
                          <button
                            onClick={resetFilters}
                            className="flex items-center gap-1.5 text-xs text-orange-400 hover:text-orange-300 transition-colors bg-orange-400/10 hover:bg-orange-400/20 px-3 py-1.5 rounded-full"
                          >
                            <RotateCcw className="w-3 h-3" />
                            Reset
                          </button>
                        )}
                      </div>

                      {/* Chips filtres actifs */}
                      {activeFiltersCount > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {filtreNiveau !== "all" && (
                            <button
                              onClick={() => setFiltreNiveau("all")}
                              className="inline-flex items-center gap-1 bg-cpu-orange text-white text-xs px-2.5 py-1 rounded-full hover:bg-orange-600 transition-colors"
                            >
                              {filtreNiveau}
                              <X className="w-3 h-3" />
                            </button>
                          )}
                          {filtreFormats.map(f => (
                            <button
                              key={f}
                              onClick={() => toggleFormat(f)}
                              className="inline-flex items-center gap-1 bg-blue-500 text-white text-xs px-2.5 py-1 rounded-full hover:bg-blue-600 transition-colors"
                            >
                              {f}
                              <X className="w-3 h-3" />
                            </button>
                          ))}
                          {filtreDuree !== "all" && (
                            <button
                              onClick={() => setFiltreDuree("all")}
                              className="inline-flex items-center gap-1 bg-indigo-500 text-white text-xs px-2.5 py-1 rounded-full hover:bg-indigo-600 transition-colors"
                            >
                              {filtreDuree === "lt10" ? "< 10h" : filtreDuree === "10-30" ? "10–30h" : filtreDuree === "30-60" ? "30–60h" : "> 60h"}
                              <X className="w-3 h-3" />
                            </button>
                          )}
                          {filtrePrix !== "all" && (
                            <button
                              onClick={() => setFiltrePrix("all")}
                              className="inline-flex items-center gap-1 bg-green-600 text-white text-xs px-2.5 py-1 rounded-full hover:bg-green-700 transition-colors"
                            >
                              {filtrePrix === "gratuit" ? "Gratuit" : "Payant"}
                              <X className="w-3 h-3" />
                            </button>
                          )}
                          {filtreCertifiant && (
                            <button
                              onClick={() => setFiltreCertifiant(false)}
                              className="inline-flex items-center gap-1 bg-purple-600 text-white text-xs px-2.5 py-1 rounded-full hover:bg-purple-700 transition-colors"
                            >
                              Certifiant
                              <X className="w-3 h-3" />
                            </button>
                          )}
                          {filtreBestseller && (
                            <button
                              onClick={() => setFiltreBestseller(false)}
                              className="inline-flex items-center gap-1 bg-yellow-500 text-white text-xs px-2.5 py-1 rounded-full hover:bg-yellow-600 transition-colors"
                            >
                              Bestseller
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* ── Niveau ── */}
                  <Card className="border border-slate-200 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleSection("niveau")}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider">
                        <Target className="w-4 h-4 text-cpu-orange" />
                        Niveau
                      </span>
                      {openSections.niveau ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {openSections.niveau && (
                      <div className="px-4 pb-4 space-y-1.5">
                        {[
                          { value: "all", label: "Tous les niveaux", Icon: Rocket, color: "text-slate-600" },
                          { value: "Débutant", label: "Débutant", Icon: Sparkles, color: "text-green-600" },
                          { value: "Intermédiaire", label: "Intermédiaire", Icon: Trophy, color: "text-blue-600" },
                          { value: "Avancé", label: "Avancé", Icon: GraduationCap, color: "text-purple-600" },
                        ].map(({ value, label, Icon, color }) => {
                          const count = parcoursAvecFormations.filter(p => value === "all" || p.niveau === value).length;
                          const active = filtreNiveau === value;
                          return (
                            <button
                              key={value}
                              onClick={() => setFiltreNiveau(value)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                                active
                                  ? "bg-cpu-orange text-white shadow-md"
                                  : "text-slate-700 hover:bg-slate-50 border border-slate-100"
                              }`}
                            >
                              <span className="flex items-center gap-2.5">
                                <Icon className={`w-4 h-4 ${active ? "text-white" : color}`} />
                                {label}
                              </span>
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${active ? "bg-white/25 text-white" : "bg-slate-100 text-slate-600"}`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </Card>

                  {/* ── Format ── */}
                  <Card className="border border-slate-200 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleSection("format")}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider">
                        <Monitor className="w-4 h-4 text-cpu-orange" />
                        Format
                      </span>
                      {openSections.format ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {openSections.format && (
                      <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                        {[
                          { value: "Vidéo", Icon: Video, color: "blue" },
                          { value: "Live", Icon: Globe, color: "green" },
                          { value: "Présentiel", Icon: Users, color: "orange" },
                          { value: "Hybride", Icon: Layers, color: "purple" },
                        ].map(({ value, Icon, color }) => {
                          const active = filtreFormats.includes(value);
                          const count = parcoursAvecFormations.filter(p => p.format === value).length;
                          return (
                            <button
                              key={value}
                              onClick={() => toggleFormat(value)}
                              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-xs font-semibold transition-all ${
                                active
                                  ? `border-${color}-500 bg-${color}-50 text-${color}-700`
                                  : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              <div className={`relative w-8 h-8 rounded-lg flex items-center justify-center ${active ? `bg-${color}-100` : "bg-slate-100"}`}>
                                <Icon className={`w-4 h-4 ${active ? `text-${color}-600` : "text-slate-500"}`} />
                                {active && <Check className={`w-3 h-3 text-${color}-600 absolute -top-1 -right-1 bg-white rounded-full`} />}
                              </div>
                              {value}
                              <span className={`text-xs ${active ? `text-${color}-500` : "text-slate-400"}`}>({count})</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </Card>

                  {/* ── Durée ── */}
                  <Card className="border border-slate-200 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleSection("duree")}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider">
                        <Clock className="w-4 h-4 text-cpu-orange" />
                        Durée
                      </span>
                      {openSections.duree ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {openSections.duree && (
                      <div className="px-4 pb-4 space-y-1.5">
                        {[
                          { value: "all", label: "Toutes durées" },
                          { value: "lt10", label: "Moins de 10h" },
                          { value: "10-30", label: "10 – 30h" },
                          { value: "30-60", label: "30 – 60h" },
                          { value: "gt60", label: "Plus de 60h" },
                        ].map(({ value, label }) => {
                          const active = filtreDuree === value;
                          const count = value === "all"
                            ? parcoursAvecFormations.length
                            : parcoursAvecFormations.filter(p => {
                                const d = p.dureeTotal || 0;
                                return value === "lt10" ? d < 10 : value === "10-30" ? d >= 10 && d <= 30 : value === "30-60" ? d > 30 && d <= 60 : d > 60;
                              }).length;
                          return (
                            <button
                              key={value}
                              onClick={() => setFiltreDuree(value)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                                active
                                  ? "bg-indigo-600 text-white shadow-md"
                                  : "text-slate-700 hover:bg-slate-50 border border-slate-100"
                              }`}
                            >
                              <span className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${active ? "bg-white" : "bg-slate-300"}`} />
                                {label}
                              </span>
                              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${active ? "bg-white/25 text-white" : "bg-slate-100 text-slate-600"}`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </Card>

                  {/* ── Prix ── */}
                  <Card className="border border-slate-200 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleSection("prix")}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider">
                        <Tag className="w-4 h-4 text-cpu-orange" />
                        Prix
                      </span>
                      {openSections.prix ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {openSections.prix && (
                      <div className="px-4 pb-4 grid grid-cols-3 gap-2">
                        {[
                          { value: "all", label: "Tous", Icon: Tag },
                          { value: "gratuit", label: "Gratuit", Icon: Gift },
                          { value: "payant", label: "Payant", Icon: CreditCard },
                        ].map(({ value, label, Icon }) => {
                          const active = filtrePrix === value;
                          return (
                            <button
                              key={value}
                              onClick={() => setFiltrePrix(value)}
                              className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-xs font-semibold transition-all ${
                                active
                                  ? "border-green-500 bg-green-50 text-green-700"
                                  : "border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50"
                              }`}
                            >
                              <Icon className={`w-4 h-4 ${active ? "text-green-600" : "text-slate-500"}`} />
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </Card>

                  {/* ── Options spéciales ── */}
                  <Card className="border border-slate-200 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleSection("options")}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider">
                        <Star className="w-4 h-4 text-cpu-orange" />
                        Options
                      </span>
                      {openSections.options ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {openSections.options && (
                      <div className="px-4 pb-4 space-y-2">
                        {[
                          {
                            value: filtreCertifiant,
                            setter: setFiltreCertifiant,
                            label: "Certifiant",
                            sub: "Avec certificat officiel",
                            Icon: Medal,
                            activeColor: "bg-purple-600",
                          },
                          {
                            value: filtreBestseller,
                            setter: setFiltreBestseller,
                            label: "Parcours étoilés",
                            sub: "Notes fortes sur les formations associées",
                            Icon: Flame,
                            activeColor: "bg-yellow-500",
                          },
                        ].map(({ value, setter, label, sub, Icon, activeColor }) => (
                          <button
                            key={label}
                            onClick={() => setter(!value)}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl border-2 text-left transition-all ${
                              value
                                ? "border-slate-700 bg-slate-900"
                                : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                            }`}
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${value ? activeColor : "bg-slate-100"}`}>
                              <Icon className={`w-4 h-4 ${value ? "text-white" : "text-slate-500"}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className={`text-sm font-semibold ${value ? "text-white" : "text-slate-800"}`}>{label}</p>
                              <p className={`text-xs ${value ? "text-slate-400" : "text-slate-500"}`}>{sub}</p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              value ? "bg-cpu-orange border-cpu-orange" : "border-slate-300"
                            }`}>
                              {value && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </Card>

                  {/* ── Trier par ── */}
                  <Card className="border border-slate-200 shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleSection("tri")}
                      className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                    >
                      <span className="flex items-center gap-2 text-sm font-bold text-slate-800 uppercase tracking-wider">
                        <TrendingUp className="w-4 h-4 text-cpu-orange" />
                        Trier par
                      </span>
                      {openSections.tri ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {openSections.tri && (
                      <div className="px-4 pb-4 space-y-1.5">
                        {[
                          { value: "populaire", label: "Plus populaires", Icon: Users },
                          { value: "note", label: "Mieux évalués", Icon: Star },
                          { value: "duree-asc", label: "Durée croissante", Icon: Clock },
                          { value: "duree-desc", label: "Durée décroissante", Icon: Clock },
                          { value: "prix-asc", label: "Prix croissant", Icon: Tag },
                          { value: "prix-desc", label: "Prix décroissant", Icon: Tag },
                        ].map(({ value, label, Icon }) => {
                          const active = triPar === value;
                          return (
                            <button
                              key={value}
                              onClick={() => setTriPar(value)}
                              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                                active
                                  ? "bg-slate-900 text-white"
                                  : "text-slate-700 hover:bg-slate-50 border border-slate-100"
                              }`}
                            >
                              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-cpu-orange" : "text-slate-400"}`} />
                              {label}
                              {active && <Check className="w-3.5 h-3.5 ml-auto text-cpu-orange" />}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </Card>

                </div>
              </aside>

              {/* Contenu principal */}
              <div className="flex-1 min-w-0">
                {parcoursError && parcoursAvecFormations.length === 0 && (
                  <Card className="mb-6 p-4 border border-red-200 bg-red-50 text-red-700">
                    Impossible de charger certains parcours. Les données affichées peuvent être partielles.
                  </Card>
                )}

                {/* Barre de recherche + VIEW MODE TOGGLE */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
                  <div className="flex-1 max-w-md">
                    <SearchBar 
                      value={searchTerm}
                      onChange={setSearchTerm}
                      placeholder="Rechercher un parcours..."
                      size="md"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">{parcoursTries.length}</span> parcours trouvés
                    </div>
                    <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
                  </div>
                </div>

                {isParcoursLoading && parcoursAvecFormations.length === 0 && (
                  <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="h-[410px] rounded-2xl bg-slate-200 animate-pulse" />
                    ))}
                  </div>
                )}

                {!isParcoursLoading && parcoursTries.length > 0 ? (
                  <div
                    className={`
                      ${
                        viewMode === "grid"
                          ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6"
                          : viewMode === "list"
                          ? "space-y-3"
                          : "space-y-2"
                      }
                    `}
                  >
                    {parcoursTries.map((parcours, index) => (
                      <div
                        key={parcours.id}
                        className={viewMode === "grid" ? "animate-fade-in-up" : ""}
                        style={
                          viewMode === "grid"
                            ? { animationDelay: `${Math.min(index * 0.1, 0.8)}s` }
                            : {}
                        }
                      >
                        <ParcoursCardOptimized
                          parcours={parcours}
                          variant={viewMode}
                          onInscription={handleInscription}
                          isFavorite={isParcoursLiked(parcours.id)}
                          onToggleFavorite={toggleFavori}
                          isNew={isParcoursNew(parcours.dateCreation)}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <Card className="relative overflow-hidden p-16 text-center border-2 border-slate-100 animate-scale-in">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white"></div>
                    <div className="relative">
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 mb-6 animate-float">
                        <Search className="w-12 h-12 text-slate-400" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3">
                        Aucun parcours trouvé
                      </h3>
                      <p className="text-slate-600 mb-8 max-w-md mx-auto text-lg">
                        Essayez de modifier vos critères de recherche ou vos filtres
                      </p>
                      <Button 
                        onClick={resetFilters}
                        className="bg-gradient-to-r from-cpu-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:scale-105 transition-all duration-200 shine-effect"
                      >
                        <RotateCcw className="mr-2 h-5 w-5" />
                        Réinitialiser les filtres
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Section avantages */}
        <section id="avantages" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
          {/* Decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cpu-orange/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
          
          <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <Badge className="mb-4 bg-blue-100 text-blue-700 border-0 px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2" />
                Nos avantages
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Pourquoi choisir nos parcours ?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Une approche structurée et progressive pour développer vos compétences
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="relative overflow-hidden p-8 text-center border-2 border-slate-100 hover:border-cpu-orange shadow-lg transition-all duration-300 group animate-fade-in-up animation-delay-100">
                <div className="absolute inset-0 bg-gradient-to-br from-cpu-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cpu-orange/10 to-cpu-orange/5 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Target className="w-10 h-10 text-cpu-orange" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Parcours structurés
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Des programmes progressifs qui combinent plusieurs formations pour une montée en compétence complète et cohérente
                  </p>
                </div>
              </Card>

              <Card className="relative overflow-hidden p-8 text-center border-2 border-slate-100 hover:border-blue-500 shadow-lg transition-all duration-300 group animate-fade-in-up animation-delay-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <GraduationCap className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Certifications reconnues
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Obtenez des certificats officiels CPU Formation valorisables sur le marché du travail ivoirien et africain
                  </p>
                </div>
              </Card>

              <Card className="relative overflow-hidden p-8 text-center border-2 border-slate-100 hover:border-green-500 shadow-lg transition-all duration-300 group animate-fade-in-up animation-delay-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-500/5 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <Users className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Accompagnement personnalisé
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Bénéficiez d'un suivi individualisé tout au long de votre parcours avec nos experts certifiés
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="relative py-24 overflow-hidden">
          {/* Background moderne */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:40px_40px]"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-cpu-orange/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>
          
          <div className="container mx-auto px-6 lg:px-16 max-w-7xl text-center relative z-10">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-cpu-orange to-orange-600 mb-6 shadow-2xl animate-float">
                <Rocket className="w-10 h-10 text-white" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Prêt à démarrer votre parcours ?
              </h2>
              <p className="text-xl mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Explorez <span className="text-cpu-orange font-semibold">{parcoursMetrics.totalParcours}</span> parcours métiers et <span className="text-cpu-orange font-semibold">{parcoursMetrics.totalFormations}</span> formations structurées pour accélérer votre progression.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Button 
                  variant="cpu-orange"
                  size="lg" 
                  className="cursor-pointer"
                  onClick={() => window.location.href = '/catalogue'}
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Commencer maintenant
                </Button>
                <Button 
                  variant="outline"
                  size="lg" 
                  className="cursor-pointer bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-sm"
                  onClick={() => window.location.href = '/support'}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Parler à un conseiller
                </Button>
              </div>

              {/* Garanties / Social proof */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-12 border-t border-white/10">
                <div className="text-center">
                  <CheckCircle2 className="w-8 h-8 mx-auto mb-3 text-cpu-orange" />
                  <div className="text-white font-semibold mb-1">100% Pratique</div>
                  <div className="text-slate-400 text-sm">Projets réels & cas concrets</div>
                </div>
                <div className="text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-3 text-cpu-orange" />
                  <div className="text-white font-semibold mb-1">Certification garantie</div>
                  <div className="text-slate-400 text-sm">Reconnue par les entreprises</div>
                </div>
                <div className="text-center">
                  <Zap className="w-8 h-8 mx-auto mb-3 text-cpu-orange" />
                  <div className="text-white font-semibold mb-1">Accès à vie</div>
                  <div className="text-slate-400 text-sm">Mises à jour incluses</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

