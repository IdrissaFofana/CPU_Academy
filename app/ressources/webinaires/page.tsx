import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  Calendar, 
  Clock, 
  Users, 
  Play,
  Eye,
  CheckCircle2,
  ArrowRight,
  Presentation,
  TrendingUp,
  Bell
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Webinaires & Replays - CPU Formation",
  description: "Participez à nos webinaires ou visionnez les replays",
};

const stats = [
  { icon: Video, value: "30+", label: "Webinaires disponibles" },
  { icon: Users, value: "5,000+", label: "Participants" },
  { icon: Eye, value: "15,000+", label: "Vues replays" },
  { icon: TrendingUp, value: "2x/mois", label: "Nouveaux webinaires" }
];

const prochains = [
  {
    id: 1,
    titre: "Comment réussir sa levée de fonds en Côte d'Ivoire",
    animateur: "Fatou Traoré",
    role: "Expert Finance",
    date: "25 Janvier 2026",
    heure: "15h00 - 16h30",
    duree: "90 min",
    participants: 45,
    places: 100,
    niveau: "Intermédiaire",
    themes: ["Financement", "Investissement", "Business Plan"],
    color: "blue"
  },
  {
    id: 2,
    titre: "Les clés pour remporter des marchés publics",
    animateur: "Jean-Baptiste Yao",
    role: "Expert Marchés Publics",
    date: "02 Février 2026",
    heure: "14h00 - 15h30",
    duree: "90 min",
    participants: 62,
    places: 100,
    niveau: "Débutant",
    themes: ["Marchés Publics", "Appels d'offres", "Administration"],
    color: "green"
  },
  {
    id: 3,
    titre: "Stratégies marketing digital pour PME",
    animateur: "Marie-Claire Koné",
    role: "Expert Marketing Digital",
    date: "08 Février 2026",
    heure: "16h00 - 17h30",
    duree: "90 min",
    participants: 38,
    places: 100,
    niveau: "Tous niveaux",
    themes: ["Marketing", "Digital", "Réseaux Sociaux"],
    color: "purple"
  }
];

const replays = [
  {
    id: 1,
    titre: "Optimiser sa trésorerie en période de croissance",
    animateur: "Ibrahim Diallo",
    date: "15 Décembre 2025",
    duree: "85 min",
    vues: 2340,
    rating: 4.8,
    themes: ["Finance", "Gestion", "Trésorerie"],
    thumbnail: "/webinaires/thumb-1.jpg",
    color: "orange"
  },
  {
    id: 2,
    titre: "Les nouvelles obligations fiscales 2026",
    animateur: "Dr. Kouassi Amani",
    date: "20 Décembre 2025",
    duree: "75 min",
    vues: 1890,
    rating: 4.9,
    themes: ["Fiscalité", "Comptabilité", "Conformité"],
    thumbnail: "/webinaires/thumb-2.jpg",
    color: "blue"
  },
  {
    id: 3,
    titre: "Certification ISO 9001 : par où commencer ?",
    animateur: "Aya N'Guessan",
    date: "10 Janvier 2026",
    duree: "95 min",
    vues: 1560,
    rating: 4.7,
    themes: ["Qualité", "ISO", "Processus"],
    thumbnail: "/webinaires/thumb-3.jpg",
    color: "green"
  },
  {
    id: 4,
    titre: "E-commerce : lancer sa boutique en ligne",
    animateur: "Marie-Claire Koné",
    date: "12 Janvier 2026",
    duree: "100 min",
    vues: 2150,
    rating: 4.9,
    themes: ["E-commerce", "Digital", "Marketplace"],
    thumbnail: "/webinaires/thumb-4.jpg",
    color: "purple"
  },
  {
    id: 5,
    titre: "Recrutement : attirer les meilleurs talents",
    animateur: "Aya N'Guessan",
    date: "18 Janvier 2026",
    duree: "70 min",
    vues: 980,
    rating: 4.6,
    themes: ["RH", "Recrutement", "Management"],
    thumbnail: "/webinaires/thumb-5.jpg",
    color: "indigo"
  },
  {
    id: 6,
    titre: "Export : s'implanter sur les marchés africains",
    animateur: "Dr. Kouassi Amani",
    date: "20 Janvier 2026",
    duree: "90 min",
    vues: 1420,
    rating: 4.8,
    themes: ["Export", "International", "Stratégie"],
    thumbnail: "/webinaires/thumb-6.jpg",
    color: "cyan"
  }
];

export default function WebinairesPage() {
  return (
    <>
      <PageBanner 
        title="Webinaires & Replays"
        subtitle="Participez à nos sessions en direct ou visionnez les replays"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Ressources" },
          { label: "Webinaires" }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
        {/* Stats Section */}
        <section className="container mx-auto px-8 lg:px-16 py-16">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 text-orange-600" />
                  <div className="text-3xl font-bold mb-1 text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Prochains webinaires */}
        <section className="container mx-auto px-8 lg:px-16 py-16">
          <div className="text-center mb-12 animate-slide-up">
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-0">
              <Calendar className="w-3 h-3 mr-1" />
              À venir
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Prochains webinaires
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Inscrivez-vous gratuitement et participez en direct
            </p>
          </div>

          <div className="space-y-6 max-w-5xl mx-auto">
            {prochains.map((webinaire, idx) => (
              <Card
                key={webinaire.id}
                className="group hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-200 animate-slide-up overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row">
                  {/* Colonne gauche - Info principale */}
                  <div className="flex-grow p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-2 h-2 rounded-full bg-${webinaire.color}-500 mt-2`}></div>
                      <div className="flex-grow">
                        <Badge variant="outline" className="mb-3 bg-blue-50 text-blue-700 border-blue-200">
                          <Bell className="w-3 h-3 mr-1" />
                          Inscription ouverte
                        </Badge>
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {webinaire.titre}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                          <Presentation className="w-4 h-4 text-orange-600" />
                          <span className="font-semibold">{webinaire.animateur}</span>
                          <span className="text-slate-400">•</span>
                          <span>{webinaire.role}</span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-600" />
                            <span className="font-semibold">{webinaire.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-green-600" />
                            <span>{webinaire.heure}</span>
                          </div>
                          <Badge variant="outline" className="bg-slate-50">
                            {webinaire.niveau}
                          </Badge>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {webinaire.themes.map((theme, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-orange-50 text-orange-700">
                              {theme}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Colonne droite - CTA */}
                  <div className="lg:w-64 bg-gradient-to-br from-orange-50 to-blue-50 p-6 flex flex-col justify-center items-center border-l border-slate-100">
                    <div className="text-center mb-4">
                      <div className="text-2xl font-bold text-slate-900 mb-1">
                        {webinaire.participants}/{webinaire.places}
                      </div>
                      <div className="text-xs text-slate-600">participants inscrits</div>
                      <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                        <div 
                          className={`bg-${webinaire.color}-500 h-2 rounded-full`}
                          style={{ width: `${(webinaire.participants / webinaire.places) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <Button
                      className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      S'inscrire gratuitement
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Replays disponibles */}
        <section className="container mx-auto px-8 lg:px-16 py-16">
          <div className="text-center mb-12 animate-slide-up">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-0">
              <Video className="w-3 h-3 mr-1" />
              Replays
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Webinaires en replay
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Accédez aux enregistrements de nos précédents webinaires
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {replays.map((replay, idx) => (
              <Card
                key={replay.id}
                className="group flex flex-col hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-200 animate-slide-up overflow-hidden"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Thumbnail avec play button */}
                <div className="relative h-48 bg-gradient-to-br from-slate-900 to-slate-700 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer">
                      <Play className="w-8 h-8 text-white ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/90 text-slate-900 border-0">
                      {replay.duree}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex-grow flex flex-col">
                  {/* Titre */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {replay.titre}
                  </h3>

                  {/* Animateur */}
                  <p className="text-sm text-slate-600 mb-3">
                    Par <span className="font-semibold">{replay.animateur}</span>
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{replay.vues.toLocaleString()} vues</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{replay.date}</span>
                    </div>
                  </div>

                  {/* Themes */}
                  <div className="flex flex-wrap gap-1.5 mb-6 flex-grow">
                    {replay.themes.map((theme, i) => (
                      <Badge key={i} variant="outline" className="text-xs bg-slate-50">
                        {theme}
                      </Badge>
                    ))}
                  </div>

                  {/* Bouton */}
                  <Button
                    className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white"
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Regarder le replay
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* CTA voir tous */}
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cursor-pointer border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              <Link href="/ressources/webinaires">
                <Video className="mr-2 h-5 w-5" />
                Voir tous les replays
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="container mx-auto px-8 lg:px-16 py-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-center text-white">
            <Bell className="w-12 h-12 mx-auto mb-4 text-orange-500" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ne manquez aucun webinaire
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Inscrivez-vous à notre newsletter pour être alerté des prochaines sessions
            </p>
            <Button
              asChild
              size="lg"
              className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow-lg"
            >
              <Link href="/ressources/faq">
                <Bell className="mr-2 h-5 w-5" />
                M'abonner aux notifications
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
