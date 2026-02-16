"use client";

import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExpertCard } from "@/components/experts/ExpertCard";
import { ExpertFilters } from "@/components/experts/ExpertFilters";
import { useExpertFilters } from "@/hooks/useExpertFilters";
import { useExpertFavorites } from "@/hooks/useExpertFavorites";
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
  MapPin,
  Filter,
  SlidersHorizontal
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const experts = [
  {
    id: 1,
    nom: "Dr. Kouassi Amani",
    specialite: "Entrepreneuriat & Management",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    experience: "15 ans",
    formations: 45,
    studentsCount: 1250,
    rating: 4.9,
    reviewsCount: 287,
    certifications: ["MBA", "Consultant CEPICI", "PMP"],
    domaines: ["Business Plan", "Stratégie", "Finance"],
    localisation: "Plateau, Abidjan",
    disponible: true,
    bio: "Expert en entrepreneuriat avec plus de 15 ans d'expérience dans l'accompagnement des startups et PME africaines.",
    tarif: "50 000 FCFA/h",
    langues: ["Français", "Anglais"],
    isTop: true,
    isNew: false
  },
  {
    id: 2,
    nom: "Marie-Claire Koné",
    specialite: "Marketing Digital & E-commerce",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    experience: "10 ans",
    formations: 38,
    studentsCount: 980,
    rating: 4.8,
    reviewsCount: 245,
    certifications: ["Google Analytics", "Meta Blueprint", "HubSpot"],
    domaines: ["SEO", "Réseaux Sociaux", "Marketplace"],
    localisation: "Cocody, Abidjan",
    disponible: true,
    bio: "Spécialiste du marketing digital et de la transformation numérique des entreprises en Afrique de l'Ouest.",
    tarif: "45 000 FCFA/h",
    langues: ["Français", "Anglais"],
    isTop: true,
    isNew: false
  },
  {
    id: 3,
    nom: "Jean-Baptiste Yao",
    specialite: "Marchés Publics & AO",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    experience: "12 ans",
    formations: 32,
    studentsCount: 650,
    rating: 4.9,
    reviewsCount: 198,
    certifications: ["Expert AO", "Juriste", "CIPS"],
    domaines: ["Appels d'offres", "Conformité", "Rédaction"],
    localisation: "Marcory, Abidjan",
    disponible: false,
    bio: "Consultant senior en marchés publics et procédures d'appels d'offres internationaux.",
    tarif: "60 000 FCFA/h",
    langues: ["Français"],
    isTop: false,
    isNew: false
  },
  {
    id: 4,
    nom: "Fatou Traoré",
    specialite: "Finance & Bancabilité",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
    experience: "18 ans",
    formations: 41,
    studentsCount: 1450,
    rating: 5.0,
    reviewsCount: 312,
    certifications: ["CFA", "Expert Comptable", "ACCA"],
    domaines: ["Comptabilité", "Audit", "Levée de fonds"],
    localisation: "Deux Plateaux, Abidjan",
    disponible: true,
    bio: "Experte financière reconnue, spécialisée dans l'accompagnement des entreprises vers la bancabilité.",
    tarif: "70 000 FCFA/h",
    langues: ["Français", "Anglais"],
    isTop: true,
    isNew: false
  },
  {
    id: 5,
    nom: "Ibrahim Diallo",
    specialite: "Production & Qualité",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    experience: "14 ans",
    formations: 28,
    studentsCount: 540,
    rating: 4.7,
    reviewsCount: 176,
    certifications: ["ISO 9001", "HACCP", "Lean Six Sigma"],
    domaines: ["Qualité", "Process", "Certification"],
    localisation: "Yopougon, Abidjan",
    disponible: true,
    bio: "Ingénieur qualité certifié avec une expertise approfondie en gestion de la production et des processus.",
    tarif: "40 000 FCFA/h",
    langues: ["Français"],
    isTop: false,
    isNew: false
  },
  {
    id: 6,
    nom: "Aya N'Guessan",
    specialite: "Ressources Humaines",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    experience: "11 ans",
    formations: 35,
    studentsCount: 820,
    rating: 4.8,
    reviewsCount: 234,
    certifications: ["GPEC", "Coach Certifiée", "SHRM"],
    domaines: ["Recrutement", "Formation", "Management"],
    localisation: "Angré, Abidjan",
    disponible: true,
    bio: "Coach RH certifiée, experte en développement des talents et transformation managériale.",
    tarif: "50 000 FCFA/h",
    langues: ["Français", "Anglais"],
    isTop: false,
    isNew: true
  }
];

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

export default function ExpertsPage() {
  // State for view mode
  const [viewMode, setViewMode] = useState<"grid" | "list" | "compact">("grid");
  
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
            image: "/images/formation-tech.png",
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
            image: "/images/formation-tech.png",
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

          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <ExpertFilters
                filters={filters}
                onFiltersChange={updateFilters}
                onReset={resetFilters}
                resultsCount={resultsCount}
                availableSpecialties={availableSpecialties}
                availableLocations={availableLocations}
              />
            </aside>

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
              {filteredExperts.length === 0 ? (
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
                  {filteredExperts.map((expert) => (
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
    </>
  );
}

