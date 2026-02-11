"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Building, ShoppingCart, ShoppingBag, Banknote, Factory, BarChart, Users, CheckCircle2, ArrowRight, Target, TrendingUp, Award } from "lucide-react";
import Link from "next/link";

const parcoursData = [
  {
    id: "entrepreneur",
    href: "/parcours/entrepreneur",
    icon: Briefcase,
    title: "Entrepreneur & PME",
    color: "orange",
    gradient: "from-orange-500 to-orange-600",
    bgLight: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
    description: "Développez les compétences essentielles pour créer et gérer votre PME",
    stats: { formations: 18, duree: "60h", niveau: "Débutant" }
  },
  {
    id: "corporate",
    href: "/parcours/corporate",
    icon: Building,
    title: "Entreprise & Corporate",
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    description: "Solutions de formation sur-mesure pour grandes entreprises",
    stats: { formations: 22, duree: "Sur mesure", niveau: "Tous niveaux" }
  },
  {
    id: "marches",
    href: "/parcours/marches",
    icon: ShoppingCart,
    title: "Accès Marchés (AO)",
    color: "indigo",
    gradient: "from-indigo-500 to-indigo-600",
    bgLight: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-600",
    description: "Maîtrisez les appels d'offres et remportez plus de marchés",
    stats: { formations: 12, duree: "40h", niveau: "Intermédiaire" }
  },
  {
    id: "marketplace",
    href: "/parcours/marketplace",
    icon: ShoppingBag,
    title: "Marketplace & Vente",
    color: "green",
    gradient: "from-green-500 to-green-600",
    bgLight: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
    description: "Développez vos ventes en ligne et sur les marketplaces",
    stats: { formations: 15, duree: "50h", niveau: "Tous niveaux" }
  },
  {
    id: "financement",
    href: "/parcours/financement",
    icon: Banknote,
    title: "Financement & Bancabilité",
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
    description: "Obtenez les financements pour votre croissance",
    stats: { formations: 10, duree: "35h", niveau: "Intermédiaire" }
  },
  {
    id: "incubateur",
    href: "/parcours/incubateur",
    icon: Factory,
    title: "Incubateur / Production++",
    color: "cyan",
    gradient: "from-cyan-500 to-cyan-600",
    bgLight: "bg-cyan-50",
    borderColor: "border-cyan-200",
    textColor: "text-cyan-600",
    description: "Industrialisez et certifiez votre production",
    stats: { formations: 14, duree: "45h", niveau: "Avancé" }
  }
];

export function ParcoursContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
      {/* Hero Section */}
      <section className="container mx-auto px-8 lg:px-16 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-cpu-orange text-white">
            <Target className="w-4 h-4 mr-2" />
            6 Parcours structurés
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
            Choisissez votre parcours de développement
          </h2>
          <p className="text-lg text-slate-600">
            Des parcours conçus pour vous accompagner étape par étape vers vos objectifs professionnels
          </p>
        </div>

        {/* Parcours Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {parcoursData.map((parcours, index) => {
            const Icon = parcours.icon;
            return (
              <div
                key={parcours.id}
                className={`group relative bg-white rounded-2xl border-2 ${parcours.borderColor} p-8 transition-all duration-300 hover:-translate-y-2 animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${parcours.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-slate-900">
                  {parcours.title}
                </h3>

                {/* Description */}
                <p className="text-slate-600 mb-6">
                  {parcours.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-6 text-sm text-slate-500">
                  <span>{parcours.stats.formations} formations</span>
                  <span>•</span>
                  <span>{parcours.stats.duree}</span>
                  <span>•</span>
                  <span>{parcours.stats.niveau}</span>
                </div>

                {/* Button */}
                <Button
                  asChild
                  className={`cursor-pointer w-full bg-gradient-to-r ${parcours.gradient} hover:opacity-90 text-white`}
                >
                  <a href={`#${parcours.id}`}>
                    Découvrir le parcours
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Detailed Sections */}
      {parcoursData.map((parcours, index) => {
        const Icon = parcours.icon;
        const isEven = index % 2 === 0;
        
        return (
          <section
            key={parcours.id}
            id={parcours.id}
            className={`py-20 ${isEven ? 'bg-white' : 'bg-slate-50'}`}
          >
            <div className="container mx-auto px-8 lg:px-16">
              <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${parcours.gradient} text-white`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <Badge className={`${parcours.bgLight} ${parcours.textColor} border-0`}>
                      {parcours.stats.formations} formations disponibles
                    </Badge>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-900">
                    {parcours.title}
                  </h2>

                  <p className="text-lg text-slate-600 mb-8">
                    {parcours.description}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <Button
                      asChild
                      size="lg"
                      className={`cursor-pointer bg-gradient-to-r ${parcours.gradient} hover:opacity-90 text-white`}
                    >
                      <Link href={`/catalogue?parcours=${parcours.id}`}>
                        Voir les formations
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="cursor-pointer border-2"
                    >
                      <Link href="/ressources/faq">
                        Être accompagné
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Visual Card */}
                <div className="flex-1">
                  <div className={`${parcours.bgLight} rounded-2xl p-8 border-2 ${parcours.borderColor}`}>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl p-6 text-center shadow-md">
                        <TrendingUp className={`w-10 h-10 mx-auto mb-3 ${parcours.textColor}`} />
                        <div className="text-3xl font-bold mb-1 text-slate-900">{parcours.stats.formations}</div>
                        <div className="text-sm text-slate-600">Formations</div>
                      </div>
                      <div className="bg-white rounded-xl p-6 text-center shadow-md">
                        <Target className={`w-10 h-10 mx-auto mb-3 ${parcours.textColor}`} />
                        <div className="text-3xl font-bold mb-1 text-slate-900">{parcours.stats.duree}</div>
                        <div className="text-sm text-slate-600">Durée totale</div>
                      </div>
                      <div className="bg-white rounded-xl p-6 text-center shadow-md">
                        <Award className={`w-10 h-10 mx-auto mb-3 ${parcours.textColor}`} />
                        <div className="text-xl font-bold mb-1 text-slate-900">Certifiant</div>
                        <div className="text-sm text-slate-600">Badge CPU</div>
                      </div>
                      <div className="bg-white rounded-xl p-6 text-center shadow-md">
                        <Users className={`w-10 h-10 mx-auto mb-3 ${parcours.textColor}`} />
                        <div className="text-xl font-bold mb-1 text-slate-900">{parcours.stats.niveau}</div>
                        <div className="text-sm text-slate-600">Niveau requis</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA Final */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-8 lg:px-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pas sûr du parcours à choisir ?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Nos conseillers sont là pour vous aider à identifier le parcours le plus adapté à vos objectifs professionnels.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="cursor-pointer bg-cpu-orange hover:bg-orange-600 text-white"
            >
              <Link href="/support">
                Être accompagné gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cursor-pointer bg-white/10 border-2 border-white text-white hover:bg-white hover:text-slate-900"
            >
              <Link href="/catalogue">
                Explorer toutes les formations
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

