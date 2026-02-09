"use client";

import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { ParcoursCard } from "@/components/parcours/ParcoursCard";
import { ParcoursCardOptimized, ViewModeToggle } from "@/components/parcours/ParcoursCardOptimized";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Target,
  Filter,
  Search,
  TrendingUp,
  Users,
  Award,
  BookOpen,
  Sparkles,
  CheckCircle2,
  Zap,
  Rocket,
  Trophy,
  GraduationCap
} from "lucide-react";
import { parcoursMock, formationsMock } from "@/data/mock";
import { useViewMode, useFavorites, useTelemetry, usePrefersReducedMotion } from "@/hooks/useStorage";

export default function ParcoursPage() {
  const [filtreNiveau, setFiltreNiveau] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [triPar, setTriPar] = useState<string>("populaire");
  
  // Use custom hooks for persistent state
  const [viewMode, setViewMode] = useViewMode("grid");
  const { favorites, toggleParcoursFavorite, isParcoursLiked } = useFavorites();
  const prefersReducedMotion = usePrefersReducedMotion();
  const { trackViewModeChange, trackFavoriteToggle, trackCardClick, trackCardImpression } = useTelemetry();
  
  // Associer les formations aux parcours
  const parcoursAvecFormations = parcoursMock.map(parcours => ({
    ...parcours,
    formations: formationsMock.filter(f => 
      parcours.formationsIds.includes(f.id)
    )
  }));

  // Filtrer les parcours
  const parcoursFiltres = parcoursAvecFormations.filter(parcours => {
    const matchNiveau = filtreNiveau === "all" || parcours.niveau === filtreNiveau;
    const matchSearch = searchTerm === "" || 
      parcours.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parcours.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchNiveau && matchSearch;
  });
  
  // Trier les parcours
  const parcoursTries = [...parcoursFiltres].sort((a, b) => {
    switch(triPar) {
      case "populaire":
        return (b.nbInscrits || 0) - (a.nbInscrits || 0);
      case "duree-asc":
        return (a.dureeTotal || 0) - (b.dureeTotal || 0);
      case "duree-desc":
        return (b.dureeTotal || 0) - (a.dureeTotal || 0);
      case "note":
        return (b.notesMoyenne || 0) - (a.notesMoyenne || 0);
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
    console.log(`Inscription au parcours ${parcoursId}`);
    // TODO: Rediriger vers la page d'inscription
  };

  return (
    <>
      <PageBanner
        title="Parcours de Formation"
        subtitle="Accélérez votre carrière avec nos parcours certifiants"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Parcours" }
        ]}
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
                {parcoursMock.length} Parcours disponibles
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                Transformez votre carrière
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Des <span className="text-cpu-orange font-semibold">parcours complets</span> conçus pour vous faire progresser rapidement. 
                <br className="hidden md:block" />
                De débutant à expert, trouvez votre voie.
              </p>
            </div>

            {/* Statistiques améliorées */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
              <Card className="relative overflow-hidden p-6 text-center border-2 border-slate-100 hover:border-cpu-orange shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group animate-fade-in-up animation-delay-100">
                <div className="absolute inset-0 bg-gradient-to-br from-cpu-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cpu-orange/10 to-cpu-orange/5 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-7 h-7 text-cpu-orange" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-cpu-orange to-orange-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">
                    {parcoursMock.reduce((acc, p) => acc + p.formationsIds.length, 0)}
                  </div>
                  <div className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Formations</div>
                </div>
              </Card>
              
              <Card className="relative overflow-hidden p-6 text-center border-2 border-slate-100 hover:border-blue-500 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group animate-fade-in-up animation-delay-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cpu-orange/10 to-cpu-orange/5 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-7 h-7 text-cpu-orange" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-cpu-orange to-orange-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">
                    {parcoursMock.reduce((acc, p) => acc + (p.nbInscrits || 0), 0)}
                  </div>
                  <div className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Apprenants</div>
                </div>
              </Card>
              
              <Card className="relative overflow-hidden p-6 text-center border-2 border-slate-100 hover:border-green-500 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group animate-fade-in-up animation-delay-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cpu-green/10 to-cpu-green/5 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-7 h-7 text-cpu-green" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-cpu-green to-green-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">
                    {parcoursMock.filter(p => p.certifiant).length}
                  </div>
                  <div className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Certifiants</div>
                </div>
              </Card>
              
              <Card className="relative overflow-hidden p-6 text-center border-2 border-slate-100 hover:border-purple-500 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer group animate-fade-in-up animation-delay-400">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cpu-orange/10 to-cpu-orange/5 mb-3 group-hover:scale-110 transition-transform duration-300">
                    <TrendingUp className="w-7 h-7 text-cpu-orange" />
                  </div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-cpu-orange to-orange-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">
                    {parcoursMock.length > 0 ? Math.round(parcoursMock.reduce((acc, p) => acc + (p.tauxCompletion || 0), 0) / parcoursMock.length) : 0}%
                  </div>
                  <div className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Réussite</div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Filtres et recherche */}
        <section id="recherche" className="py-8 bg-white/80 backdrop-blur-sm sticky top-0 z-30 border-b border-slate-200 shadow-sm animate-fade-in-up animation-delay-300">
          <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Barre de recherche améliorée */}
              <div className="relative flex-1 max-w-xl group">
                <div className="absolute inset-0 bg-gradient-to-r from-cpu-orange/20 to-blue-500/20 rounded-xl blur opacity-0 group-focus-within:opacity-100 transition-opacity duration-300"></div>
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10 group-focus-within:text-cpu-orange transition-colors" />
                <input
                  type="text"
                  placeholder="Rechercher un parcours par nom ou compétence..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="relative w-full pl-12 pr-4 py-3.5 border-2 border-slate-200 rounded-xl focus:border-cpu-orange focus:outline-none bg-white shadow-md focus:shadow-xl transition-all duration-300 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              {/* Filtres par niveau stylisés */}
              <div className="flex items-center gap-3 flex-wrap">
                <Filter className="w-5 h-5 text-slate-500" />
                <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl">
                  {["all", "Débutant", "Intermédiaire", "Avancé"].map((niveau) => (
                    <Button
                      key={niveau}
                      onClick={() => setFiltreNiveau(niveau)}
                      variant="ghost"
                      className={`rounded-lg transition-all duration-200 ${
                        filtreNiveau === niveau 
                          ? "bg-cpu-orange text-white shadow-md hover:shadow-lg" 
                          : "hover:bg-white text-slate-700"
                      }`}
                      size="sm"
                    >
                      {niveau === "all" ? "Tous" : niveau}
                    </Button>
                  ))}
                </div>
              </div>              
              {/* Système de tri */}
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-slate-500" />
                <select
                  value={triPar}
                  onChange={(e) => setTriPar(e.target.value)}
                  className="px-4 py-2 border-2 border-slate-200 rounded-xl focus:border-cpu-orange focus:outline-none bg-white text-slate-700 cursor-pointer hover:border-slate-300 transition-colors"
                >
                  <option value="populaire">Plus populaires</option>
                  <option value="note">Mieux notés</option>
                  <option value="duree-asc">Durée croissante</option>
                  <option value="duree-desc">Durée décroissante</option>
                </select>
              </div>            </div>

            {/* Résultats de recherche stylisés */}
            {searchTerm && (
              <div className="mt-4 flex items-center gap-2 text-sm animate-fade-in">
                <CheckCircle2 className="w-4 h-4 text-cpu-orange" />
                <span className="text-slate-600">
                  <span className="font-bold text-cpu-orange">{parcoursFiltres.length}</span> résultat{parcoursFiltres.length > 1 ? "s" : ""} pour <span className="font-semibold">"{searchTerm}"</span>
                </span>
              </div>
            )}
          </div>
        </section>

        {/* Liste des parcours */}
        <section id="parcours" className="py-16">
          <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
            {/* VIEW MODE TOGGLE */}
            <div className="flex items-center justify-between gap-4 mb-8">
              <div className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{parcoursTries.length}</span> parcours trouvés
              </div>
              <ViewModeToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>

            {parcoursTries.length > 0 ? (
              <div
                className={`
                  ${
                    viewMode === "grid"
                      ? "grid md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                    onClick={() => {
                      setSearchTerm("");
                      setFiltreNiveau("all");
                    }}
                    className="bg-gradient-to-r from-cpu-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 shine-effect"
                  >
                    <Zap className="mr-2 h-5 w-5" />
                    Réinitialiser les filtres
                  </Button>
                </div>
              </Card>
            )}
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
              <Card className="relative overflow-hidden p-8 text-center border-2 border-slate-100 hover:border-cpu-orange shadow-lg hover:shadow-2xl transition-all duration-300 group animate-fade-in-up animation-delay-100">
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

              <Card className="relative overflow-hidden p-8 text-center border-2 border-slate-100 hover:border-blue-500 shadow-lg hover:shadow-2xl transition-all duration-300 group animate-fade-in-up animation-delay-200">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <GraduationCap className="w-10 h-10 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Certifications reconnues
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Obtenez des certificats officiels CPU Academy valorisables sur le marché du travail ivoirien et africain
                  </p>
                </div>
              </Card>

              <Card className="relative overflow-hidden p-8 text-center border-2 border-slate-100 hover:border-green-500 shadow-lg hover:shadow-2xl transition-all duration-300 group animate-fade-in-up animation-delay-300">
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
                Rejoignez des <span className="text-cpu-orange font-semibold">{parcoursMock.reduce((acc, p) => acc + (p.nbInscrits || 0), 0).toLocaleString()}</span> apprenants qui transforment leur carrière avec CPU Academy
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
