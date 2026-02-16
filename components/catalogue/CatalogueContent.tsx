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
import { formationsMock } from "@/data/mock";
import { objectifsMetier, regions } from "@/data/constants";
import { Search, Filter, X, Grid3x3, List, LayoutGrid, ArrowUpDown, Award, Building, HelpCircle, SlidersHorizontal, Clock, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useFavorites } from "@/hooks/useFavorites";
import { useFormations } from "@/hooks/useFormations";

type ViewMode = "grid" | "list" | "compact";
type SortOption = "recent" | "popular" | "title" | "price";

const ITEMS_PER_PAGE = 12; // 3 colonnes × 4 lignes en desktop
const DEFAULT_SECTEURS = ["Secteur Primaire", "Secteur Secondaire", "Secteur Tertiaire", "Secteur Quaternaire"];
const DEFAULT_NIVEAUX = ["Débutant", "Intermédiaire", "Avancé"] as const;
const DEFAULT_FORMATS = ["Vidéo", "Live", "Présentiel", "Hybride"] as const;

type CatalogueFormation = (typeof formationsMock)[number];

export function CatalogueContent() {
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
  const [resultCount, setResultCount] = useState(0); // Pour aria-live
  const [currentPage, setCurrentPage] = useState(1); // Phase 3: Pagination
  const { formations: apiFormations } = useFormations({ limit: 200 });

  const mapApiFormation = (formation: any): CatalogueFormation => {
    const levelMap: Record<string, CatalogueFormation["niveau"]> = {
      beginner: "Débutant",
      intermediate: "Intermédiaire",
      advanced: "Avancé",
      debutant: "Débutant",
      intermediaire: "Intermédiaire",
      avance: "Avancé",
      "Débutant": "Débutant",
      "Intermédiaire": "Intermédiaire",
      "Avancé": "Avancé",
    };

    const modeMap: Record<string, CatalogueFormation["format"]> = {
      presentiel: "Présentiel",
      hybride: "Hybride",
      live: "Live",
      webinaire: "Live",
      video: "Vidéo",
      document: "Vidéo",
    };

    const now = new Date().toISOString();
    const rawDuration = formation.duration ?? formation.duree ?? 0;
    const durationHours = Math.max(1, Number(rawDuration) || 1);
    const mode = (formation.mode || formation.format || "").toString().toLowerCase();

    return {
      id: formation.id?.toString() || formation._id?.toString() || "",
      titre: formation.title || formation.titre || "Formation",
      slug: formation.slug || formation.titre?.toString().toLowerCase().replace(/\s+/g, "-") || "",
      description: formation.description || formation.resume || "",
      resume: formation.shortDescription || formation.description || formation.resume || "",
      image: formation.image || formation.thumbnail,
      modalite: formation.mode || formation.modalite || "En ligne",
      niveau: levelMap[formation.level] || levelMap[formation.niveau] || "Débutant",
      secteur: formation.category?.name || formation.category || formation.secteur || "Formation",
      objectifs: formation.objectives || formation.objectifs || [],
      prerequis: formation.prerequisites || formation.prerequis || [],
      livrables: formation.livrables || [],
      competences: formation.tags || formation.competences || [],
      format: modeMap[mode] || formation.format || "Vidéo",
      duree: durationHours,
      langue: formation.langue || "Français",
      moduleLie: formation.moduleLie,
      objectifMetier: formation.objectifMetier,
      parcours: formation.parcours || [],
      region: formation.region || formation.location,
      ville: formation.ville,
      expertId: formation.instructorId || formation.formateur_id || "",
      expert: formation.expert,
      certifiant: Boolean(formation.certifiant || formation.certification_delivrer_badge),
      certificat: formation.certificat,
      gratuit: formation.isPaid === false || formation.price === 0 || formation.gratuit === true,
      prixPublic: formation.price ?? formation.prixPublic ?? formation.prix ?? 0,
      prixMembre: formation.price_member ?? formation.prixMembre ?? formation.prixMembre ?? undefined,
      modules: formation.modules || [],
      chapitres: formation.chapitres || [],
      nbInscrits: formation.totalStudents || formation.nbInscrits,
      notesMoyenne: formation.rating || formation.notesMoyenne,
      tauxCompletion: formation.tauxCompletion,
      statut: formation.status === "published" || formation.statut === "publié"
        ? "publié"
        : formation.status === "archived" || formation.statut === "archivé"
        ? "archivé"
        : "brouillon",
      dateCreation: formation.created_at || formation.dateCreation || now,
      dateModification: formation.updated_at || formation.dateModification || now,
      datePublication: formation.datePublication || formation.updated_at || undefined,
      badges: formation.badges || [],
    };
  };

  const apiFormationsNormalized = useMemo(
    () => apiFormations.map(mapApiFormation),
    [apiFormations]
  );

  const baseFormations = apiFormationsNormalized.length > 0 ? apiFormationsNormalized : formationsMock;

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

    setResultCount(filtered.length);
    return filtered;
  }, [baseFormations, debouncedMotCle, objectif, region, secteur, niveau, format, gratuit, certifiant, expertFilter, regionFilter, sortBy]);

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
    format !== "all" ? format : "",
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
      <PageBanner 
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Catalogue" }
        ]}
        slides={[
          {
            image: "/images/formation-tech.png",
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
            image: "/images/formation-tech.png",
            title: "Solutions Pour Entreprises",
            subtitle: "Des programmes adaptés aux besoins de votre organisation",
            buttons: [
              { label: "Contactez-nous", href: "/entreprises", icon: <Building className="h-5 w-5" /> }
            ]
          }
        ]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

          {/* Mobile Filter Button */}
          <div className="md:hidden mb-6">
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

          <div className="flex flex-col md:flex-row gap-8">
            {/* Desktop Sidebar Filters */}
            <aside className="hidden md:block md:w-80 flex-shrink-0 animate-slide-right">
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
                  <p className="text-slate-600 font-medium" aria-live="polite" aria-atomic="true" role="status">
                    <span className="text-cpu-orange font-bold text-lg">{resultCount}</span> formation{resultCount > 1 ? "s" : ""} trouvée{resultCount > 1 ? "s" : ""}
                  </p>

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
                    {format && format !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-2">
                        {format}
                        <button onClick={() => setFormat("all")} className="cursor-pointer hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Formations Grid/List/Compact with Pagination */}
              {formationsFiltrees.length > 0 ? (
                <>
                  <div className={(viewMode === "grid" 
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
                      : viewMode === "compact"
                      ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4"
                      : "flex flex-col gap-4")}>
                    {formationsPage.map((formation, index) => (
                      <div
                        key={formation.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${Math.min(index * 0.08, 0.6)}s` }}
                      >
                        <EnhancedFormationCard 
                          formation={formation}
                          isFavorite={isFavorite(formation.id)}
                          onFavoriteToggle={toggleFavorite}
                        />
                      </div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-4">
                      <Button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        variant="outline"
                        className="gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Précédent
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
                        className="gap-2 bg-cpu-orange hover:bg-cpu-orange/90 text-white"
                      >
                        Suivant
                        <ChevronRight className="w-4 h-4" />
                      </Button>

                      <span className="ml-4 text-sm text-gray-600">
                        Page {currentPage} sur {totalPages}
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border-2 border-slate-100 animate-scale-in">
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
              <div className="mt-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl animate-fade-in-up animation-delay-400 transition-all duration-500">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px]" />
                <div className="absolute top-0 right-0 w-72 h-72 bg-cpu-orange/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-cpu-green/20 rounded-full blur-3xl" />
                
                <div className="relative text-center px-8 py-12 md:py-16 max-w-4xl mx-auto">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cpu-orange to-orange-600 rounded-2xl mb-6 shadow-lg shadow-orange-500/20 animate-float">
                    <Award className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                    Besoin d&apos;une formation sur mesure ?
                  </h3>
                  
                  <p className="text-slate-300 mb-8 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
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
                  
                  <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-fade-in"
            onClick={() => setIsDrawerOpen(false)}
            aria-hidden="true"
          />
          
          {/* Drawer */}
          <div 
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 md:hidden shadow-2xl animate-slide-left"
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

