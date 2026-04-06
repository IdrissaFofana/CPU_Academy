"use client";

import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExpertCard } from "@/components/experts/ExpertCard";
import { ExpertFilters } from "@/components/experts/ExpertFilters";
import { useExpertFilters } from "@/hooks/useExpertFilters";
import { useExpertFavorites } from "@/hooks/useExpertFavorites";
import { useFormations } from "@/hooks/useFormations";
import { 
  Users, 
  GraduationCap, 
  Award, 
  Star, 
  TrendingUp, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Grid3x3,
  List,
  LayoutGrid,
  BookOpen,
  UserPlus,
  SlidersHorizontal,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

function hashText(value: string): number {
  return value
    .split("")
    .reduce((acc, char) => (acc + char.charCodeAt(0)) % 1000, 0);
}

function mapFormationsToExperts(formations: any[]) {
  const grouped = new Map<string, any>();

  formations.forEach((formation) => {
    const formateur = formation?.formateur;
    if (!formateur) return;

    const key =
      formateur.id?.toString() ||
      formateur.email ||
      `${formateur.firstname || ""}-${formateur.lastname || ""}`;

    if (!key) return;

    const speciality =
      formateur.titre ||
      formation?.category?.name ||
      formation?.category ||
      "Formateur expert";

    const domain =
      formation?.category?.name ||
      formation?.category ||
      formation?.module?.name ||
      speciality;

    if (!grouped.has(key)) {
      const hash = hashText(key);
      const years = 5 + (hash % 16);
      const baseRating = 4 + (hash % 10) / 10;

      grouped.set(key, {
        apiId: key,
        email: formateur.email || "",
        nom: `${formateur.firstname || ""} ${formateur.lastname || ""}`.trim() || "Expert CPU",
        specialite: speciality,
        photo: formateur.photo || "/images/expert-avatar.svg",
        experience: `${years} ans`,
        formations: 0,
        studentsCount: 0,
        rating: Number(Math.min(5, baseRating).toFixed(1)),
        reviewsCount: 0,
        certifications: [
          ...(formation?.certification_delivrer_badge ? [formation?.certification_nom_badge || "Certifie"] : []),
          ...(formateur.titre ? [formateur.titre] : []),
        ].filter(Boolean),
        domaines: [],
        localisation: formation?.location || "Abidjan",
        disponible: Boolean(formation?.isActive ?? true),
        bio: formateur.bio || "Formateur CPU Academy",
        tarif:
          Number(formation?.price ?? 0) > 0
            ? `${Math.round(Number(formation.price)).toLocaleString("fr-FR")} FCFA`
            : "Tarif sur demande",
        langues: ["Francais"],
        isTop: false,
        isNew: false,
      });
    }

    const current = grouped.get(key);
    current.formations += 1;
    current.studentsCount += Number(formation?.totalStudents || 0);
    current.reviewsCount = Math.max(current.reviewsCount, current.formations * 12);
    current.domaines = Array.from(new Set([...current.domaines, domain]));
    if (current.certifications.length === 0) {
      current.certifications = ["Formateur certifie"];
    }
    current.isTop = current.formations >= 3 || current.studentsCount >= 100;
  });

  return Array.from(grouped.values()).map((expert, index) => ({
    id: index + 1,
    ...expert,
  }));
}

const avantagesFormateur = [
  {
    icon: TrendingUp,
    titre: "Revenus attractifs",
    description: "Rémunération compétitive et régulière selon votre volume d'interventions"
  },
  {
    icon: Users,
    titre: "Communauté d'experts",
    description: "Rejoignez un réseau de formateurs qualifiés et échangez les meilleures pratiques"
  },
  {
    icon: GraduationCap,
    titre: "Ressources pédagogiques",
    description: "Accédez à nos outils et supports de formation pour faciliter vos interventions"
  },
  {
    icon: Award,
    titre: "Reconnaissance",
    description: "Valorisez votre expertise et développez votre notoriété professionnelle"
  }
];

const criteres = [
  "Expertise reconnue dans votre domaine (minimum 5 ans d'expérience)",
  "Diplôme ou certification professionnelle pertinente",
  "Expérience en formation ou transmission de compétences",
  "Excellentes capacités de communication",
  "Disponibilité pour animer des sessions régulières",
  "Engagement envers la qualité pédagogique"
];

const EXPERTS_PER_PAGE = 9;

export default function ExpertsPage() {
  // State for view mode
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const { formations, isLoading, error } = useFormations({ limit: 400 });
  const experts = useMemo(() => mapFormationsToExperts(formations), [formations]);
  
  // Use filters hook
  const {
    filters,
    updateFilters,
    resetFilters,
    filteredExperts,
    resultsCount,
    availableSpecialties,
    availableLocations
  } = useExpertFilters(experts);

  // Use favorites hook
  const { toggleFavorite, isFavorite } = useExpertFavorites();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredExperts.length / EXPERTS_PER_PAGE));
  const startIndex = (currentPage - 1) * EXPERTS_PER_PAGE;
  const paginatedExperts = filteredExperts.slice(startIndex, startIndex + EXPERTS_PER_PAGE);

  useEffect(() => { setCurrentPage(1); }, [filters]);
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [currentPage, totalPages]);

  // Calculate dynamic stats based on filtered experts
  const avgRating = filteredExperts.length > 0
    ? (filteredExperts.reduce((sum, e) => sum + e.rating, 0) / filteredExperts.length).toFixed(1)
    : "4.8";

  const totalFormations = filteredExperts.reduce((sum, e) => sum + e.formations, 0);

  const avgExperience = filteredExperts.length > 0
    ? Math.round(
        filteredExperts.reduce((sum, e) => {
          const match = e.experience.match(/(\d+)/);
          return sum + (match ? parseInt(match[0]) : 0);
        }, 0) / filteredExperts.length
      )
    : 12;

  return (
    <>
      <PageBanner 
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Experts" }
        ]}
        slides={[
          {
            image: "/images/default-formation.jpg",
            title: "Nos Formateurs Experts",
            subtitle: "Découvrez nos formateurs experts dans leur domaine",
            badge: {
              icon: "+",
              number: "150",
              text: "Experts formateurs",
              subtext: "À votre service"
            },
            trustBadges: [
              {
                icon: "users",
                color: "blue",
                title: "15+ années",
                subtitle: "Expérience moyenne"
              },
              {
                icon: "users",
                color: "orange",
                title: "4.8/5",
                subtitle: "Note moyenne étudiants"
              },
              {
                icon: "check",
                color: "green",
                title: "100% qualifiés",
                subtitle: "Experts certifiés"
              }
            ],
            buttons: [
              { label: "Devenir expert", href: "/support", icon: <UserPlus className="h-5 w-5" /> },
              { label: "Voir les formations", href: "/catalogue", variant: "outline", icon: <BookOpen className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/formation-agriculture.png",
            title: "Excellence Pédagogique",
            subtitle: "Des professionnels reconnus qui partagent leur expertise",
            badge: {
              number: "92%",
              text: "Satisfaction apprenants",
              subtext: "Pédagogie unique"
            },
            trustBadges: [
              {
                icon: "building",
                color: "purple",
                title: "Issus d'entreprises",
                subtitle: "Leaders du secteur"
              },
              {
                icon: "check",
                color: "blue",
                title: "Méthodologie éprouvée",
                subtitle: "Cas pratiques"
              },
              {
                icon: "users",
                color: "orange",
                title: "Disponibilité",
                subtitle: "Accompagnement actif"
              }
            ],
            buttons: [
              { label: "Rencontrer nos experts", href: "#experts", icon: <UserPlus className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/default-formation.jpg",
            title: "Rejoignez Notre Équipe",
            subtitle: "Devenez formateur et partagez votre savoir-faire",
            badge: {
              icon: "💼 ",
              number: "50+",
              text: "Postes ouverts",
              subtext: "Rejoignez-nous"
            },
            trustBadges: [
              {
                icon: "users",
                color: "orange",
                title: "Réseau professionnel",
                subtitle: "Croissance continue"
              },
              {
                icon: "check",
                color: "green",
                title: "Rémunération attractive",
                subtitle: "Selon expertise"
              },
              {
                icon: "building",
                color: "blue",
                title: "Développement continu",
                subtitle: "Formation formateurs"
              }
            ],
            buttons: [
              { label: "Candidater", href: "/support", icon: <UserPlus className="h-5 w-5" /> }
            ]
          }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">

        {/* Experts Directory with Sidebar */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3 md:mb-4">
              Annuaire des Experts
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
              Nos formateurs sont des professionnels reconnus, passionnés par la transmission de leur expertise
            </p>
          </div>

          <div className="flex flex-col xl:flex-row gap-6 md:gap-8">
            {/* Sidebar Filtres — visible xl+ seulement */}
            <aside className="hidden xl:block xl:w-80 flex-shrink-0">
              <div className="sticky top-24 overflow-y-auto max-h-[calc(100vh-7rem)]">
              <ExpertFilters
                filters={filters}
                onFiltersChange={updateFilters}
                onReset={resetFilters}
                resultsCount={resultsCount}
                availableSpecialties={availableSpecialties}
                availableLocations={availableLocations}
              />
              </div>
            </aside>

            {/* Bouton Filtrer — visible jusqu'à xl (mobile + tablette) */}
            <div className="xl:hidden">
              <Button
                onClick={() => setIsFilterDrawerOpen(true)}
                className="w-full bg-cpu-orange hover:bg-cpu-orange/90 text-white h-12 text-base font-semibold shadow-lg"
              >
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                Filtrer les experts
                {(filters.specialties.length + filters.locations.length + (filters.availableOnly ? 1 : 0) + (filters.minRating > 0 ? 1 : 0)) > 0 && (
                  <span className="ml-2 bg-white text-cpu-orange text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {filters.specialties.length + filters.locations.length + (filters.availableOnly ? 1 : 0) + (filters.minRating > 0 ? 1 : 0)}
                  </span>
                )}
              </Button>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* View Mode Toggle & Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
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
                <p className="text-sm text-gray-600">
                  {resultsCount} {resultsCount > 1 ? "experts trouvés" : "expert trouvé"}
                </p>
              </div>

              {/* Experts Grid/List */}
              {isLoading && experts.length === 0 ? (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <Card key={idx} className="h-80 animate-pulse bg-slate-100 border-0" />
                  ))}
                </div>
              ) : error ? (
                <Card className="p-8 text-center border-red-200 bg-red-50">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Erreur API formateurs</h3>
                  <p className="text-red-700">Impossible de charger les formateurs depuis l'API pour le moment.</p>
                </Card>
              ) : filteredExperts.length === 0 ? (
                <Card className="p-12 text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Aucun expert trouvé
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Essayez de modifier vos critères de recherche
                  </p>
                  <Button onClick={resetFilters} variant="outline">
                    Réinitialiser les filtres
                  </Button>
                </Card>
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === "grid" 
                    ? "md:grid-cols-2 xl:grid-cols-3" 
                    : viewMode === "compact" 
                    ? "md:grid-cols-3 xl:grid-cols-4" 
                    : "grid-cols-1"
                }`}>
                  {paginatedExperts.map((expert) => (
                    <ExpertCard
                      key={expert.id}
                      expert={expert}
                      variant={viewMode}
                      onToggleFavorite={toggleFavorite}
                      isFavorite={isFavorite(expert.id)}
                    />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!isLoading && !error && filteredExperts.length > 0 && totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  >
                    Précédent
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(p => Math.abs(p - currentPage) <= 2 || p === 1 || p === totalPages)
                    .reduce<(number | string)[]>((acc, page, idx, arr) => {
                      if (idx > 0 && (arr[idx - 1] as number) !== page - 1) acc.push("...");
                      acc.push(page);
                      return acc;
                    }, [])
                    .map((item, idx) =>
                      typeof item === "string" ? (
                        <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">…</span>
                      ) : (
                        <Button
                          key={item}
                          variant={currentPage === item ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(item as number)}
                          className={currentPage === item ? "bg-cpu-orange text-white border-cpu-orange" : ""}
                        >
                          {item}
                        </Button>
                      )
                    )
                  }
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Suivant
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Devenir Formateur Section */}
        <section 
          id="devenir-formateur" 
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16"
        >
          <div className="max-w-6xl mx-auto bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-white">
            <div className="text-center mb-8 md:mb-12">
              <Sparkles className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 text-orange-500" />
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
                Devenez Formateur chez CPU Formation
              </h2>
              <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">
                Partagez votre expertise, impactez des carrières et développez votre activité de formation
              </p>
            </div>

            {/* Avantages */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
              {avantagesFormateur.map((avantage, idx) => {
                const Icon = avantage.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/10 rounded-2xl p-4 md:p-6 backdrop-blur-sm hover:bg-white/15 transition-all"
                  >
                    <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-500/20 mb-3 md:mb-4">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
                    </div>
                    <h3 className="text-base md:text-lg font-bold mb-2">{avantage.titre}</h3>
                    <p className="text-sm text-slate-300">{avantage.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Critères */}
            <div className="bg-white/5 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 backdrop-blur-sm border border-white/10 mb-8 md:mb-12">
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-orange-500" />
                Critères de sélection
              </h3>
              <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                {criteres.map((critere, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-slate-200">{critere}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-base md:text-lg text-slate-300 mb-4 md:mb-6">
                Prêt à rejoindre notre équipe d'experts ?
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
                <Button
                  asChild
                  size="lg"
                  className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow-lg w-full sm:w-auto"
                >
                  <Link href="/support">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Postuler maintenant
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="cursor-pointer border-2 border-white bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900 w-full sm:w-auto"
                >
                  <Link href="/support">
                    <ArrowRight className="mr-2 h-5 w-5" />
                    En savoir plus
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Drawer Filtres — mobile/tablette */}
      {isFilterDrawerOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 xl:hidden"
            onClick={() => setIsFilterDrawerOpen(false)}
          />
          {/* Panneau */}
          <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-50 xl:hidden shadow-2xl flex flex-col">
            {/* Header du drawer */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-white">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-cpu-orange" />
                <span className="font-bold text-lg text-slate-900">Filtres</span>
              </div>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>
            {/* Contenu scrollable */}
            <div className="flex-1 overflow-y-auto p-4">
              <ExpertFilters
                filters={filters}
                onFiltersChange={updateFilters}
                onReset={resetFilters}
                resultsCount={resultsCount}
                availableSpecialties={availableSpecialties}
                availableLocations={availableLocations}
              />
            </div>
            {/* Pied du drawer */}
            <div className="px-4 py-4 border-t border-slate-100 bg-white">
              <Button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-full bg-cpu-orange hover:bg-cpu-orange/90 text-white h-12 font-semibold"
              >
                Voir les {resultsCount} expert{resultsCount > 1 ? 's' : ''}
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

