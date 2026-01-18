"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FormationCard } from "@/components/formations/FormationCard";
import { CatalogueFilters } from "@/components/catalogue/CatalogueFilters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PageBanner } from "@/components/layout/PageBanner";
import { formationsMock } from "@/data/mock";
import { objectifsMetier } from "@/data/constants";
import { Search, Filter, X, Grid3x3, List, ArrowUpDown, Award, Building, HelpCircle, SlidersHorizontal } from "lucide-react";

type ViewMode = "grid" | "list";
type SortOption = "recent" | "popular" | "title" | "price";

export function CatalogueContent() {
  const searchParams = useSearchParams();
  const expertParam = searchParams.get('expert');
  const regionParam = searchParams.get('region');
  
  const [motCle, setMotCle] = useState("");
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

  // Filtrage des formations
  const formationsFiltrees = formationsMock.filter((formation) => {
    if (expertFilter && formation.expertId !== expertFilter) {
      return false;
    }
    if (regionFilter && formation.region !== regionFilter) {
      return false;
    }
    if (motCle && !formation.titre.toLowerCase().includes(motCle.toLowerCase())) {
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
    total: formationsMock.length,
    gratuit: formationsMock.filter(f => f.gratuit).length,
    certifiant: formationsMock.filter(f => f.certifiant).length,
    regions: new Set(formationsMock.map(f => f.region)).size
  };

  return (
    <>
      <PageBanner 
        title="Catalogue de formations"
        subtitle={`Découvrez nos ${stats.total} formations adaptées aux besoins des entreprises ivoiriennes`}
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Catalogue" }
        ]}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
        <div className="container mx-auto px-8 lg:px-16 py-12">
          {/* Search Bar and Stats */}
          <div className="mb-8 animate-fade-in-up">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-6">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-cpu-orange" />
                <Input
                  type="text"
                  placeholder="Rechercher une formation, un domaine, une compétence..."
                  value={motCle}
                  onChange={(e) => setMotCle(e.target.value)}
                  className="h-14 pl-12 pr-4 text-lg text-slate-900 placeholder:text-slate-400 bg-white border-2 border-slate-200 shadow-lg focus:shadow-2xl focus:border-cpu-orange transition-all duration-300 rounded-xl"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cpu-orange/5 to-cpu-green/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-4 border-2 border-slate-100 shadow-md hover:shadow-2xl hover:border-cpu-orange transition-all duration-300 cursor-pointer group animate-fade-in-up animation-delay-100">
                <div className="text-3xl font-bold text-cpu-orange mb-1 group-hover:scale-110 transition-transform duration-300">{stats.total}</div>
                <div className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Formations</div>
              </div>
              <div className="bg-white rounded-xl p-4 border-2 border-slate-100 shadow-md hover:shadow-2xl hover:border-green-500 transition-all duration-300 cursor-pointer group animate-fade-in-up animation-delay-200">
                <div className="text-3xl font-bold text-green-500 mb-1 group-hover:scale-110 transition-transform duration-300">{stats.gratuit}</div>
                <div className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Gratuites</div>
              </div>
              <div className="bg-white rounded-xl p-4 border-2 border-slate-100 shadow-md hover:shadow-2xl hover:border-blue-500 transition-all duration-300 cursor-pointer group animate-fade-in-up animation-delay-300">
                <div className="text-3xl font-bold text-blue-500 mb-1 group-hover:scale-110 transition-transform duration-300">{stats.certifiant}</div>
                <div className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Certifiantes</div>
              </div>
              <div className="bg-white rounded-xl p-4 border-2 border-slate-100 shadow-md hover:shadow-2xl hover:border-purple-500 transition-all duration-300 cursor-pointer group animate-fade-in-up animation-delay-400">
                <div className="text-3xl font-bold text-purple-500 mb-1 group-hover:scale-110 transition-transform duration-300">{stats.regions}</div>
                <div className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Régions</div>
              </div>
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
              <div className="bg-white rounded-2xl p-4 mb-6 border-2 border-slate-100 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up animation-delay-200">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-slate-600 font-medium">
                    <span className="text-cpu-orange font-bold text-lg">{formationsFiltrees.length}</span> formation{formationsFiltrees.length > 1 ? "s" : ""} trouvée{formationsFiltrees.length > 1 ? "s" : ""}
                  </p>

                  <div className="flex items-center gap-3">
                    {/* Sort */}
                    <div className="flex items-center gap-2">
                      <ArrowUpDown className="w-4 h-4 text-slate-500" />
                      <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                        <SelectTrigger className="w-40">
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
                        className={`cursor-pointer p-2 rounded transition-colors ${
                          viewMode === "grid" ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                        }`}
                      >
                        <Grid3x3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`cursor-pointer p-2 rounded transition-colors ${
                          viewMode === "list" ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                        }`}
                      >
                        <List className="w-4 h-4" />
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
                        {objectifsMetier.find(o => o.value === objectif)?.label}
                        <button onClick={() => setObjectif("all")} className="cursor-pointer hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {region && region !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-2">
                        📍 {region}
                        <button onClick={() => setRegion("all")} className="cursor-pointer hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {secteur && secteur !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-2">
                        🏢 {secteur}
                        <button onClick={() => setSecteur("all")} className="cursor-pointer hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {niveau && niveau !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-2">
                        📊 {niveau}
                        <button onClick={() => setNiveau("all")} className="cursor-pointer hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                    {format && format !== "all" && (
                      <Badge variant="secondary" className="flex items-center gap-2">
                        💻 {format}
                        <button onClick={() => setFormat("all")} className="cursor-pointer hover:text-red-600">
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Formations Grid/List */}
              {formationsFiltrees.length > 0 ? (
                <div className={`
                  ${viewMode === "grid" 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6" 
                    : "flex flex-col gap-4"
                  }
                `}>
                  {formationsFiltrees.map((formation, index) => (
                    <div
                      key={formation.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${Math.min(index * 0.1, 0.8)}s` }}
                    >
                      <div className="h-full card-hover-effect">
                        <FormationCard formation={formation} />
                      </div>
                    </div>
                  ))}
                </div>
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
              <div className="mt-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl shadow-2xl animate-fade-in-up animation-delay-400 hover:shadow-3xl transition-all duration-500">
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
                    CPU-Académie propose également des formations personnalisées pour les entreprises et organisations.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button 
                      asChild
                      size="lg"
                      className="cursor-pointer bg-cpu-orange hover:bg-orange-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-200 border-0 hover:scale-105 shine-effect"
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
