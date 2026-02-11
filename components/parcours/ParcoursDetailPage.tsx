import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, ArrowRight, Users, Clock, Award, Target, BookOpen, Briefcase, Building, ShoppingCart, ShoppingBag, Banknote, Factory, Lightbulb, Wallet, Rocket, UserPlus, FileText, Star } from "lucide-react";
import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ParcoursPageProps {
  icon: LucideIcon;
  title: string;
  color: string;
  gradient: string;
  bgLight: string;
  borderColor: string;
  textColor: string;
  description: string;
  objectifs: string[];
  pourQui: string[];
  competences: string[];
  etapes: Array<{
    numero: number;
    titre: string;
    semaines: number;
    formations: string[];
  }>;
  stats: {
    formations: number;
    duree: string;
    niveau: string;
  };
  formations?: Array<{
    titre: string;
    duree: string;
    niveau: string;
  }>;
  currentParcoursId: string;
  badgeInfo: {
    icon: LucideIcon;
    label: string;
  };
}

const allParcours = [
  { id: "entrepreneur", href: "/parcours/entrepreneur", icon: Lightbulb, title: "Entrepreneur & PME", color: "orange", gradient: "from-orange-500 to-orange-600", bgLight: "bg-orange-50", borderColor: "border-orange-200", textColor: "text-orange-600", description: "Développez les compétences essentielles pour créer et gérer votre PME" },
  { id: "corporate", href: "/parcours/corporate", icon: Building, title: "Entreprise & Corporate", color: "blue", gradient: "from-blue-500 to-blue-600", bgLight: "bg-blue-50", borderColor: "border-blue-200", textColor: "text-blue-600", description: "Solutions de formation sur-mesure pour grandes entreprises" },
  { id: "marches", href: "/parcours/marches", icon: Briefcase, title: "Accès Marchés (AO)", color: "indigo", gradient: "from-indigo-500 to-indigo-600", bgLight: "bg-indigo-50", borderColor: "border-indigo-200", textColor: "text-indigo-600", description: "Maîtrisez les appels d'offres et remportez plus de marchés" },
  { id: "marketplace", href: "/parcours/marketplace", icon: ShoppingCart, title: "Marketplace & Vente", color: "green", gradient: "from-green-500 to-green-600", bgLight: "bg-green-50", borderColor: "border-green-200", textColor: "text-green-600", description: "Développez vos ventes en ligne et sur les marketplaces" },
  { id: "financement", href: "/parcours/financement", icon: Wallet, title: "Financement & Bancabilité", color: "purple", gradient: "from-purple-500 to-purple-600", bgLight: "bg-purple-50", borderColor: "border-purple-200", textColor: "text-purple-600", description: "Obtenez les financements pour votre croissance" },
  { id: "incubateur", href: "/parcours/incubateur", icon: Rocket, title: "Incubateur / Production++", color: "cyan", gradient: "from-cyan-500 to-cyan-600", bgLight: "bg-cyan-50", borderColor: "border-cyan-200", textColor: "text-cyan-600", description: "Industrialisez et certifiez votre production" },
];

export function ParcoursDetailPage({
  icon: Icon,
  title,
  gradient,
  bgLight,
  borderColor,
  textColor,
  description,
  objectifs,
  pourQui,
  competences,
  etapes,
  stats,
  formations = [],
  currentParcoursId,
  badgeInfo
}: ParcoursPageProps) {
  const otherParcours = allParcours.filter(p => p.id !== currentParcoursId);
  const BadgeIcon = badgeInfo.icon;
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
      {/* Hero Section */}
      <section className={`${bgLight} border-b-4 ${borderColor}`}>
        <div className="container mx-auto px-8 lg:px-16 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} text-white mb-6 animate-bounce`}>
              <Icon className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              {title}
            </h1>
            <p className="text-xl text-slate-700 mb-8 leading-relaxed">
              {description}
            </p>
            
            {/* Tags Section */}
            <div className={`inline-flex flex-wrap items-center justify-center gap-3 mb-8 p-4 rounded-2xl ${bgLight} border-2 ${borderColor}`}>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Clock className={`w-5 h-5 ${textColor}`} />
                <span>{stats.duree}</span>
              </div>
              <div className={`w-1 h-1 rounded-full bg-slate-300`}></div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <BookOpen className={`w-5 h-5 ${textColor}`} />
                <span>{stats.formations} modules</span>
              </div>
              <div className={`w-1 h-1 rounded-full bg-slate-300`}></div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <Award className={`w-5 h-5 ${textColor}`} />
                <span>Certificat {title.split('&')[0].trim()}</span>
              </div>
              <div className={`w-1 h-1 rounded-full bg-slate-300`}></div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <BadgeIcon className={`w-5 h-5 ${textColor}`} />
                <span>{badgeInfo.label}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className={`cursor-pointer bg-gradient-to-r ${gradient} hover:opacity-90 text-white shadow-lg`}
              >
                <Link href="/catalogue">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explorer les formations
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="cursor-pointer border-2"
              >
                <Link href="/ressources/faq">
                  <UserPlus className="mr-2 h-5 w-5" />
                  S'inscrire à ce parcours
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-8 lg:px-16 py-12">
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md transition-shadow">
            <BookOpen className={`w-10 h-10 mx-auto mb-3 ${textColor}`} />
            <div className="text-3xl font-bold mb-1 text-slate-900">{stats.formations}</div>
            <div className="text-sm text-slate-600">Formations disponibles</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md transition-shadow">
            <Clock className={`w-10 h-10 mx-auto mb-3 ${textColor}`} />
            <div className="text-3xl font-bold mb-1 text-slate-900">{stats.duree}</div>
            <div className="text-sm text-slate-600">Durée totale estimée</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md transition-shadow">
            <Award className={`w-10 h-10 mx-auto mb-3 ${textColor}`} />
            <div className="text-xl font-bold mb-1 text-slate-900">{stats.niveau}</div>
            <div className="text-sm text-slate-600">Niveau recommandé</div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <div className="container mx-auto px-8 lg:px-16 py-12">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Objectifs */}
          <div className="bg-white rounded-2xl p-8 border-2 border-slate-100 shadow-lg animate-slide-up">
            <div className="flex items-center gap-3 mb-6">
              <Target className={`w-8 h-8 ${textColor}`} />
              <h2 className="text-2xl font-bold text-slate-900">Objectifs du parcours</h2>
            </div>
            <ul className="space-y-4">
              {objectifs.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <CheckCircle2 className={`w-5 h-5 mt-1 flex-shrink-0 ${textColor} group-hover:scale-110 transition-transform`} />
                  <span className="text-slate-700">{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pour qui */}
          <div className="bg-white rounded-2xl p-8 border-2 border-slate-100 shadow-lg animate-slide-up animation-delay-200">
            <div className="flex items-center gap-3 mb-6">
              <Users className={`w-8 h-8 ${textColor}`} />
              <h2 className="text-2xl font-bold text-slate-900">Pour qui ?</h2>
            </div>
            <ul className="space-y-4">
              {pourQui.map((qui, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <CheckCircle2 className={`w-5 h-5 mt-1 flex-shrink-0 ${textColor} group-hover:scale-110 transition-transform`} />
                  <span className="text-slate-700">{qui}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Compétences */}
        <div className="mt-12 bg-white rounded-2xl p-8 border-2 border-slate-100 shadow-lg max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
            <Award className={`w-8 h-8 ${textColor}`} />
            Compétences que vous allez développer
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {competences.map((comp, idx) => (
              <div
                key={idx}
                className={`${bgLight} rounded-xl p-4 border ${borderColor} transition-shadow`}
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className={`w-5 h-5 mt-0.5 flex-shrink-0 ${textColor}`} />
                  <span className="text-slate-700 font-medium">{comp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Étapes du parcours */}
        <div className="mt-12 bg-white rounded-2xl p-4 sm:p-8 border-2 border-slate-100 shadow-lg max-w-6xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 sm:mb-8 flex items-center gap-2">
            <Target className={`w-6 h-6 sm:w-7 sm:h-7 ${textColor}`} />
            Étapes du parcours
          </h2>
          <div className="space-y-4">
            {etapes.map((etape, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 sm:p-6 border-2 border-slate-100 transition-shadow">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center text-lg sm:text-xl font-bold shadow-md`}>
                    {etape.numero}
                  </div>
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">{etape.titre}</h3>
                      <Badge variant="secondary" className="text-xs w-fit">
                        <Clock className="w-3 h-3 mr-1" />
                        {etape.semaines} semaine{etape.semaines > 1 ? 's' : ''}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {etape.formations.map((formation, formIdx) => (
                        <Badge key={formIdx} variant="outline" className="text-xs bg-white border-slate-200 text-slate-700 hover:bg-slate-50">
                          {formation}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-12 text-center text-white max-w-4xl mx-auto">
          <h3 className="text-3xl font-bold mb-4">Prêt à démarrer ?</h3>
          <p className="text-xl text-slate-300 mb-8">
            Explorez nos formations et commencez votre parcours dès aujourd'hui
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className={`cursor-pointer bg-gradient-to-r ${gradient} hover:opacity-90 text-white`}
            >
              <Link href="/catalogue">
                Voir toutes les formations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cursor-pointer bg-white/10 border-2 border-white text-white hover:bg-white hover:text-slate-900"
            >
              <Link href="/support">
                Parler à un conseiller
              </Link>
            </Button>
          </div>
        </div>

        {/* Découvrez nos autres parcours */}
        <div className="mt-12 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Découvrez nos autres parcours
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherParcours.map((parcours) => {
              const ParcoursIcon = parcours.icon;
              return (
                <Link
                  key={parcours.id}
                  href={parcours.href}
                  className="group bg-white rounded-xl p-6 border-2 border-slate-100 shadow-md transition-all "
                >
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${parcours.gradient} text-white mb-4 group-hover:scale-110 transition-transform`}>
                    <ParcoursIcon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:${parcours.textColor} transition-colors">
                    {parcours.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                    {parcours.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-medium ${parcours.textColor}">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

