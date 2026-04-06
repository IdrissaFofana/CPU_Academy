"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { FormationCard } from "@/components/formations/FormationCard";
import { EnhancedFormationCard } from "@/components/catalogue/EnhancedFormationCard";
import { CatalogueFilters } from "@/components/catalogue/CatalogueFilters";
import { SearchAutocomplete } from "@/components/catalogue/SearchAutocomplete";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PageBanner } from "@/components/layout/PageBanner";
import { objectifsMetier, regions } from "@/data/constants";
import { Search, Filter, X, Grid3x3, List, LayoutGrid, ArrowUpDown, Award, Building, HelpCircle, SlidersHorizontal, Clock, ChevronLeft, ChevronRight, BookOpen, Video, MapPin, Wifi, Layers, Monitor } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useFavorites } from "@/hooks/useFavorites";
import { useFormations } from "@/hooks/useFormations";
import type { Formation } from "@/types";
import { mapApiFormationToAppFormation } from "@/lib/adapters/formation-adapter";

type ViewMode = "grid" | "list" | "compact";
type SortOption = "recent" | "popular" | "title" | "price";

const ITEMS_PER_PAGE = 12; // 3 colonnes × 4 lignes en desktop
const DEFAULT_SECTEURS = ["Secteur Primaire", "Secteur Secondaire", "Secteur Tertiaire", "Secteur Quaternaire"];
const DEFAULT_NIVEAUX = ["Débutant", "Intermédiaire", "Avancé"] as const;
const DEFAULT_FORMATS = ["Vidéo", "Live", "Présentiel", "Hybride"] as const;

// Config de la barre de navigation Format
const FORMAT_TABS = [
  {
    value: "all",
    label: "Tous les formats",
    shortLabel: "Tous",
    icon: Layers,
    color: "text-slate-600",
    activeBg: "bg-slate-900",
    activeText: "text-white",
    hoverBg: "hover:bg-slate-100",
    description: "Toutes les formations disponibles",
  },
  {
    value: "Live",
    label: "Webinaires live",
    shortLabel: "Live",
    icon: Wifi,
    color: "text-orange-600",
    activeBg: "bg-gradient-to-r from-orange-500 to-red-500",
    activeText: "text-white",
    hoverBg: "hover:bg-orange-50",
    description: "Sessions en direct avec formateur",
  },
  {
    value: "Présentiel",
    label: "Présentiel",
    shortLabel: "Présentiel",
    icon: MapPin,
    color: "text-emerald-600",
    activeBg: "bg-gradient-to-r from-emerald-500 to-teal-500",
    activeText: "text-white",
    hoverBg: "hover:bg-emerald-50",
    description: "En salle, dans un centre de formation",
  },
  {
    value: "Vidéo",
    label: "À son rythme",
    shortLabel: "À son rythme",
    icon: Monitor,
    color: "text-violet-600",
    activeBg: "bg-gradient-to-r from-violet-500 to-indigo-500",
    activeText: "text-white",
    hoverBg: "hover:bg-violet-50",
    description: "Apprenez quand vous voulez, où vous voulez",
  },
] as const;

type CatalogueFormation = Formation;

interface CatalogueContentProps {
  /** When set, pre-filters to this raw API mode and hides the format filter */
  lockedModalite?: string;
  /** Human-readable label for the locked mode (shown in the toolbar chip) */
  lockedModaliteLabel?: string;
  /** Pass true when the parent page already renders a PageBanner */
  hideBanner?: boolean;
}

export function CatalogueContent({ lockedModalite, lockedModaliteLabel, hideBanner = false }: CatalogueContentProps = {}) {
  const searchParams = useSearchParams();
  const expertParam = searchParams.get('expert');
  const regionParam = searchParams.get('region');
  
  const [motCle, setMotCle] = useState("");
  const debouncedMotCle = useDebounce(motCle, 300); // Quick Win #1: Debounce search
  const { history: searchHistory, addSearch, clearHistory } = useSearchHistory(); // Quick Win #2: History
  const { isFavorite, toggleFavorite } = useFavorites(); // Phase 3: Favorites
  
  const [objectif, setObjectif] = useState<string>("all");
  const [region, setRegion] = useState<string>("all");
  const [secteur, setSecteur] = useState<string>("all");
  const [niveau, setNiveau] = useState<string>("all");
  const [format, setFormat] = useState<string>("all");
  const [gratuit, setGratuit] = useState<boolean | null>(null);
  const [certifiant, setCertifiant] = useState<boolean | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [expertFilter, setExpertFilter] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // resultCount is derived from formationsFiltrees.length below
  const [currentPage, setCurrentPage] = useState(1); // Phase 3: Pagination
  
  // Appel API avec paramètres de filtrage (search, category, level)
  const { formations: apiFormations, isLoading: apiLoading, error: apiError } = useFormations({ 
    limit: 200,
    search: debouncedMotCle || undefined,
    categoryId: secteur !== "all" ? secteur : undefined,
    level: niveau !== "all" ? niveau : undefined,
  });

  const apiFormationsNormalized = useMemo(
    () => apiFormations.map((item) => mapApiFormationToAppFormation(item) as CatalogueFormation),
    [apiFormations]
  );

  const baseFormations = apiFormationsNormalized;

  const objectifOptions = useMemo(() => {
    const values = Array.from(new Set(baseFormations.map((formation) => formation.objectifMetier).filter(Boolean)));
    if (values.length === 0) {
      return objectifsMetier;
    }
    return values.map((value) => ({ value: value as string, label: value as string }));
  }, [baseFormations]);

  const regionOptions = useMemo(() => {
    const values = Array.from(new Set(baseFormations.map((formation) => formation.region).filter(Boolean)));
    if (values.length === 0) {
      return regions.map((reg) => reg.nom);
    }
    return values as string[];
  }, [baseFormations]);

  const secteurOptions = useMemo(() => {
    const values = Array.from(new Set(baseFormations.map((formation) => formation.secteur).filter(Boolean)));
    return (values.length ? values : DEFAULT_SECTEURS) as string[];
  }, [baseFormations]);

  const niveauOptions = useMemo(() => {
    const values = Array.from(new Set(baseFormations.map((formation) => formation.niveau).filter(Boolean)));
    return (values.length ? values : DEFAULT_NIVEAUX) as (typeof DEFAULT_NIVEAUX)[number][];
  }, [baseFormations]);

  const formatOptions = useMemo(() => {
    const values = Array.from(new Set(baseFormations.map((formation) => formation.format).filter(Boolean)));
    return (values.length ? values : DEFAULT_FORMATS) as (typeof DEFAULT_FORMATS)[number][];
  }, [baseFormations]);

  // Sauvegarder la recherche dans l'historique quand elle est finalisée (debounce)
  useEffect(() => {
    if (debouncedMotCle.trim()) {
      addSearch(debouncedMotCle);
    }
  }, [debouncedMotCle, addSearch]);

  useEffect(() => {
    if (expertParam) {
      setExpertFilter(expertParam);
    }
    if (regionParam) {
      setRegionFilter(regionParam);
      setRegion(regionParam);
    }
  }, [expertParam, regionParam]);

  // Block body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDrawerOpen]);

  // Close drawer on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isDrawerOpen) {
        setIsDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isDrawerOpen]);

  // Filtrage et tri des formations (avec useMemo pour éviter re-calculs)
  const formationsFiltrees = useMemo(() => {
    let filtered = baseFormations.filter((formation) => {
      if (expertFilter && formation.expertId !== expertFilter) {
        return false;
      }
      if (regionFilter && formation.region !== regionFilter) {
        return false;
      }
      // Utiliser debouncedMotCle pour éviter les re-rendus excessifs
      if (debouncedMotCle && !formation.titre.toLowerCase().includes(debouncedMotCle.toLowerCase())) {
        return false;
      }
      if (objectif && objectif !== "all" && formation.objectifMetier !== objectif) {
        return false;
      }
      if (region && region !== "all" && formation.region !== region) {
        return false;
      }
      if (secteur && secteur !== "all" && formation.secteur !== secteur) {
        return false;
      }
      if (niveau && niveau !== "all" && formation.niveau !== niveau) {
        return false;
      }
      if (format && format !== "all" && formation.format !== format) {
        return false;
      }
      // Locked mode filter (from parent page — filters on raw modalite field)
      if (lockedModalite && formation.modalite?.toLowerCase() !== lockedModalite.toLowerCase()) {
        return false;
      }
      if (gratuit !== null && formation.gratuit !== gratuit) {
        return false;
      }
      if (certifiant !== null && formation.certifiant !== certifiant) {
        return false;
      }
      return true;
    });

    // Tri amélioré
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popular":
          return (b.nbInscrits || 0) - (a.nbInscrits || 0);
        case "title":
          return a.titre.localeCompare(b.titre, "fr");
        case "price":
          return (a.prixPublic || 0) - (b.prixPublic || 0);
        case "recent":
        default:
          // Tri par position dans le mock (premiers ajoutés = plus récents)
          // En pratique, les premiers dans le tableau sont considérés comme plus récents
          return baseFormations.indexOf(b) - baseFormations.indexOf(a);
      }
    });

    return filtered;
  }, [baseFormations, debouncedMotCle, objectif, region, secteur, niveau, format, gratuit, certifiant, expertFilter, regionFilter, sortBy]);

  const resultCount = formationsFiltrees.length;

  // Phase 3: Pagination - Extraire les formations à afficher
  const totalPages = Math.ceil(formationsFiltrees.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const formationsPage = formationsFiltrees.slice(startIndex, endIndex);

  // Réinitialiser pagination si les filtres changent
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedMotCle, objectif, region, secteur, niveau, format, gratuit, certifiant]);

  const reinitialiserFiltres = () => {
    setMotCle("");
    setObjectif("all");
    setRegion("all");
    setSecteur("all");
    setNiveau("all");
    setFormat("all");
    setGratuit(null);
    setCertifiant(null);
    setExpertFilter(null);
    setRegionFilter(null);
    setCurrentPage(1);
  };

  const nombreFiltresActifs = [
    motCle,
    objectif !== "all" ? objectif : "",
    region !== "all" ? region : "",
    secteur !== "all" ? secteur : "",
    niveau !== "all" ? niveau : "",
    gratuit,
    certifiant,
    expertFilter,
    regionFilter,
  ].filter(Boolean).length;

  // Statistiques rapides
  const stats = {
    total: baseFormations.length,
    gratuit: baseFormations.filter(f => f.gratuit).length,
    certifiant: baseFormations.filter(f => f.certifiant).length,
    regions: new Set(baseFormations.map(f => f.region).filter(Boolean)).size
  };

  return (
    <>
      {!hideBanner && (
        <PageBanner 
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Catalogue" }
        ]}
        slides={[
          {
            image: "/images/default-formation.jpg",
            title: "Catalogue de formations",
            subtitle: `Découvrez nos ${stats.total} formations adaptées aux besoins des entreprises ivoiriennes`,
            buttons: [
              { label: "Voir toutes les formations", href: "#formations", icon: <BookOpen className="h-5 w-5" /> },
              { label: "Solutions entreprises", href: "/entreprises", variant: "outline", icon: <Building className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/formation-agriculture.png",
            title: "Formation Continue d'Excellence",
            subtitle: "Développez vos compétences avec des formations certifiantes",
            buttons: [
              { label: "Explorer le catalogue", href: "#formations", icon: <BookOpen className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/default-formation.jpg",
            title: "Solutions Pour Entreprises",
            subtitle: "Des programmes adaptés aux besoins de votre organisation",
            buttons: [
              { label: "Contactez-nous", href: "/entreprises", icon: <Building className="h-5 w-5" /> },
            ]
          }
        ]}
      />
      )}
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
          {/* Search Bar and Stats */}
          <div className="mb-8 animate-fade-in-up">
            {/* Search Bar with Autocomplete */}
            <div className="max-w-2xl mx-auto mb-6">
              <SearchAutocomplete
                value={motCle}
                onChange={setMotCle}
                suggestions={[...new Set(baseFormations.map(f => f.titre).slice(0, 8))]}
                recentSearches={searchHistory}
                onSelectSuggestion={(suggestion) => addSearch(suggestion)}
                onClearHistory={clearHistory}
              />
            </div>


          </div>

          {/* ═══════════════════════════════════════════════════
               BARRE DE NAVIGATION FORMAT
          ═══════════════════════════════════════════════════ */}
          {!lockedModalite && (
            <div className="mb-8 animate-fade-in-up animation-delay-100">
              {/* Titre de section */}
              <div className="flex items-center gap-2 mb-3 justify-between sm:justify-end">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">Format de formation</span>
                <Layers className="w-4 h-4 text-slate-400" />
              </div>

              {/* Tabs — grille 2×2 sur mobile, 4 colonnes sur sm+ => toujours 1 seule ligne */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2 xl:gap-3">
                {FORMAT_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = format === tab.value;
                  // Compter les formations de ce format
                  const count = tab.value === "all"
                    ? baseFormations.length
                    : baseFormations.filter((f) => f.format === tab.value).length;

                  return (
                    <button
                      key={tab.value}
                      onClick={() => { setFormat(tab.value); setCurrentPage(1); }}
                      className={`
                        group relative w-full flex flex-col items-center gap-1
                        px-2 py-2.5 sm:px-3 sm:py-2.5 xl:px-5 xl:py-3.5 rounded-xl xl:rounded-2xl border-2 transition-all duration-250
                        cursor-pointer select-none
                        ${isActive
                          ? `${tab.activeBg} ${tab.activeText} border-transparent shadow-lg shadow-black/10 scale-[1.03]`
                          : `bg-white border-slate-100 text-slate-600 ${tab.hoverBg} hover:border-slate-200 hover:shadow-md`
                        }
                      `}
                      aria-pressed={isActive}
                    >
                      {/* Icone + label */}
                      <div className="flex items-center gap-2">
                        <Icon
                          className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                            isActive ? "text-white" : tab.color
                          }`}
                        />
                        <span className="font-semibold text-sm whitespace-nowrap">{tab.shortLabel}</span>
                        {/* Badge count */}
                        <span className={`
                          inline-flex items-center justify-center min-w-[1.4rem] h-5 px-1.5
                          rounded-full text-xs font-bold
                          ${ isActive
                            ? "bg-white/20 text-white"
                            : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
                          }
                        `}>
                          {count}
                        </span>
                      </div>
                      {/* Description (visible uniquement xl+) */}
                      <span className={`hidden xl:block text-[11px] leading-tight ${
                        isActive ? "text-white/80" : "text-slate-400"
                      }`}>
                        {tab.description}
                      </span>
                      {/* Barre active en bas */}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rotate-45 bg-white/30 rounded-sm" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Mobile Filter Button — visible jusqu'à xl (tablettes incluses) */}
          <div className="xl:hidden mb-6">
            <Button
              onClick={() => setIsDrawerOpen(true)}
              className="w-full bg-cpu-orange hover:bg-cpu-orange/90 text-white h-12 text-base font-semibold shadow-lg"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filtrer les formations
              {nombreFiltresActifs > 0 && (
                <Badge className="ml-2 bg-white text-cpu-orange">
                  {nombreFiltresActifs}
                </Badge>
              )}
            </Button>
          </div>

          <div className="flex flex-col xl:flex-row gap-8">
            {/* Desktop Sidebar Filters — visible seulement xl+ */}
            <aside className="hidden xl:block xl:w-80 flex-shrink-0 animate-slide-right">
              <div className="sticky top-24">
                <CatalogueFilters
                  objectifOptions={objectifOptions}
                  regionOptions={regionOptions}
                  secteurOptions={secteurOptions}
                  niveauOptions={niveauOptions}
                  formatOptions={formatOptions}
                  objectif={objectif}
                  setObjectif={setObjectif}
                  region={region}
                  setRegion={setRegion}
                  secteur={secteur}
                  setSecteur={setSecteur}
                  niveau={niveau}
                  setNiveau={setNiveau}
                  format={format}
                  setFormat={setFormat}
                  gratuit={gratuit}
                  setGratuit={setGratuit}
                  certifiant={certifiant}
                  setCertifiant={setCertifiant}
                  nombreFiltresActifs={nombreFiltresActifs}
                  reinitialiserFiltres={reinitialiserFiltres}
                />
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="bg-white rounded-2xl p-4 mb-6 border-2 border-slate-100 shadow-lg transition-all duration-300 animate-fade-in-up animation-delay-200">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-slate-600 font-medium" aria-live="polite" aria-atomic="true" role="status">
                      <span className="text-cpu-orange font-bold text-lg">{resultCount}</span> formation{resultCount > 1 ? "s" : ""} trouvée{resultCount > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="w-full lg:w-auto flex flex-wrap items-center gap-3 justify-start lg:justify-end">
                    {/* Sort */}
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="w-4 h-4 text-slate-500" />
                      <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Plus récentes</SelectItem>
                          <SelectItem value="popular">Populaires</SelectItem>
                          <SelectItem value="title">Alphabétique</SelectItem>
                          <SelectItem value="price">Prix</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* View Mode */}
                    <div className="hidden md:flex gap-1 p-1 bg-slate-100 rounded-lg">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={("cursor-pointer p-2 rounded transition-colors " + (viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-white/50"))}
                      >
                        <Grid3x3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={("cursor-pointer p-2 rounded transition-colors " + (viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-white/50"))}
                      >
                        <List className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("compact")}
                        className={("cursor-pointer p-2 rounded transition-colors " + (viewMode === "compact" ? "bg-white shadow-sm" : "hover:bg-white/50"))}
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Filters */}
                {nombreFiltresActifs > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-100">
                    {motCle && (
                      <Badge variant="secondary" className="flex items-center gap-2">
                        Recherche: {motCle}
                        <button onClick={() => setMotCle("")} className="cursor-pointer hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {objectif && objectif !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-2">
                        {objectifOptions.find(o => o.value === objectif)?.label || objectif}
                        <button onClick={() => setObjectif("all")} className="cursor-pointer hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {region && region !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-2">
                        {region}
                        <button onClick={() => setRegion("all")} className="cursor-pointer hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {secteur && secteur !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-2">
                        {secteur}
                        <button onClick={() => setSecteur("all")} className="cursor-pointer hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {niveau && niveau !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-2">
                        {niveau}
                        <button onClick={() => setNiveau("all")} className="cursor-pointer hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {lockedModalite && lockedModaliteLabel && (
                      <Badge className="flex items-center gap-1 bg-cpu-orange/10 text-cpu-orange border border-cpu-orange/30">
                        {lockedModaliteLabel}
                      </Badge>
                    )}

                  </div>
                )}
              </div>

              {/* Formations Grid/List/Compact with Pagination */}
              {formationsFiltrees.length > 0 ? (
                <>
                  <div className={(viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6"
                      : viewMode === "compact"
                      ? "grid grid-cols-1 min-[380px]:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4"
                      : "flex flex-col gap-4")}>
                    {formationsPage.map((formation, index) => {
                      const renderKey = `${formation.id || formation.slug || "formation"}-${startIndex + index}`;
                      const cardId = formation.id || formation.slug || renderKey;

                      return (
                      <div
                        key={renderKey}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${Math.min(index * 0.08, 0.6)}s` }}
                      >
                        <EnhancedFormationCard 
                          formation={formation}
                          isFavorite={isFavorite(cardId)}
                          onFavoriteToggle={() => toggleFavorite(cardId)}
                        />
                      </div>
                      );
                    })}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-6 sm:mt-12 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
                      <Button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        variant="outline"
                        className="gap-1 sm:gap-2 text-sm"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        <span className="hidden sm:inline">Précédent</span>
                      </Button>

                      <div className="flex items-center gap-2">
                        {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                          let pageNum: number;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else {
                            if (currentPage <= 3) {
                              pageNum = i + 1;
                            } else if (currentPage >= totalPages - 2) {
                              pageNum = totalPages - 4 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }
                          }

                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                                currentPage === pageNum
                                  ? "bg-cpu-orange text-white shadow-lg"
                                  : "border-2 border-gray-200 hover:border-cpu-orange"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <Button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="gap-1 sm:gap-2 bg-cpu-orange hover:bg-cpu-orange/90 text-white text-sm"
                      >
                        <span className="hidden sm:inline">Suivant</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>

                      <span className="ml-2 sm:ml-4 text-sm text-gray-600">
                        {currentPage}/{totalPages}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-2xl p-6 sm:p-12 text-center border-2 border-slate-100 animate-scale-in">
                  <div className="mb-6 animate-float">
                    <Search className="h-20 w-20 text-slate-300 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-slate-900">Aucune formation trouvée</h3>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto">
                    Nous n'avons pas trouvé de formation correspondant à vos critères. Essayez de modifier vos filtres.
                  </p>
                  <Button onClick={reinitialiserFiltres} className="bg-cpu-orange hover:bg-cpu-orange/90 hover:scale-105 transition-transform duration-200 shine-effect">
                    <X className="mr-2 h-4 w-4" />
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}

              {/* CTA Formation sur mesure */}
              <div className="mt-8 sm:mt-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl animate-fade-in-up animation-delay-400 transition-all duration-500">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
                <div className="absolute top-0 right-0 w-72 h-72 bg-cpu-orange/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-cpu-green/20 rounded-full blur-3xl" />
                
                <div className="relative text-center px-4 sm:px-8 py-8 sm:py-12 md:py-16 max-w-4xl mx-auto">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cpu-orange to-orange-600 rounded-2xl mb-6 shadow-lg shadow-orange-500/20 animate-float">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
                    Besoin d&apos;une formation sur mesure ?
                  </h3>
                  
                  <p className="text-slate-300 mb-6 sm:mb-8 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    CPU Formation propose également des formations personnalisées pour les entreprises et organisations.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      asChild
                      size="lg"
                      className="cursor-pointer bg-cpu-orange hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30-500/40 transition-all duration-200 border-0 hover:scale-105 shine-effect"
                    >
                      <a href="/entreprises" className="flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        Solutions entreprises
                      </a>
                    </Button>
                    
                    <Button 
                      asChild
                      size="lg"
                      variant="outline"
                      className="cursor-pointer bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 backdrop-blur-sm transition-all duration-200 hover:scale-105"
                    >
                      <a href="/ressources/faq#contact-form" className="flex items-center gap-2">
                        <HelpCircle className="w-5 h-5" />
                        Nous contacter
                      </a>
                    </Button>
                  </div>
                  
                  <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-6">
                    <div className="text-center">
                      <div className="text-cpu-orange font-bold text-2xl mb-1">100%</div>
                      <div className="text-slate-400 text-sm">Personnalisable</div>
                    </div>
                    <div className="text-center">
                      <div className="text-cpu-green font-bold text-2xl mb-1">Sur mesure</div>
                      <div className="text-slate-400 text-sm">Adapté à vos besoins</div>
                    </div>
                    <div className="text-center">
                      <div className="text-orange-400 font-bold text-2xl mb-1">24/7</div>
                      <div className="text-slate-400 text-sm">Support dédié</div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden animate-fade-in"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
          
          {/* Drawer */}
          <div 
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 xl:hidden shadow-2xl animate-slide-left"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
          >
            <CatalogueFilters
              objectifOptions={objectifOptions}
              regionOptions={regionOptions}
              secteurOptions={secteurOptions}
              niveauOptions={niveauOptions}
              formatOptions={formatOptions}
              objectif={objectif}
              setObjectif={setObjectif}
              region={region}
              setRegion={setRegion}
              secteur={secteur}
              setSecteur={setSecteur}
              niveau={niveau}
              setNiveau={setNiveau}
              format={format}
              setFormat={setFormat}
              gratuit={gratuit}
              setGratuit={setGratuit}
              certifiant={certifiant}
              setCertifiant={setCertifiant}
              nombreFiltresActifs={nombreFiltresActifs}
              reinitialiserFiltres={reinitialiserFiltres}
              onClose={() => setIsDrawerOpen(false)}
              isMobile={true}
            />
          </div>
        </>
      )}
    </>
  );
}

