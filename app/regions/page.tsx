import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { BookOpen, Building, Calendar, Clock, Users, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Régions - CPU Formation",
  description: "Trouvez des formations près de chez vous en Côte d'Ivoire",
};

const regions = [
  {
    id: 1,
    nom: "LAGUNES",
    ville: "Abidjan",
    formations: 45,
    centres: 5,
    dotColor: "bg-blue-500"
  },
  {
    id: 2,
    nom: "VALLÉE DU BANDAMA",
    ville: "Bouaké",
    formations: 18,
    centres: 2,
    dotColor: "bg-green-500"
  },
  {
    id: 3,
    nom: "BAS-SASSANDRA",
    ville: "San-Pédro",
    formations: 12,
    centres: 1,
    dotColor: "bg-cyan-500"
  },
  {
    id: 4,
    nom: "SAVANES",
    ville: "Korhogo",
    formations: 10,
    centres: 1,
    dotColor: "bg-orange-500"
  },
  {
    id: 5,
    nom: "HAUT-SASSANDRA",
    ville: "Daloa",
    formations: 8,
    centres: 1,
    dotColor: "bg-purple-500"
  },
  {
    id: 6,
    nom: "MONTAGNES",
    ville: "Man",
    formations: 7,
    centres: 1,
    dotColor: "bg-red-500"
  },
  {
    id: 7,
    nom: "LACS",
    ville: "Yamoussoukro",
    formations: 15,
    centres: 2,
    dotColor: "bg-amber-500"
  },
  {
    id: 8,
    nom: "ZANZAN",
    ville: "Bondoukou",
    formations: 5,
    centres: 1,
    dotColor: "bg-pink-500"
  },
  {
    id: 9,
    nom: "FROMAGER",
    ville: "Gagnoa",
    formations: 6,
    centres: 1,
    dotColor: "bg-indigo-500"
  },
  {
    id: 10,
    nom: "SUD-COMOE",
    ville: "Aboisso",
    formations: 4,
    centres: 1,
    dotColor: "bg-teal-500"
  },
  {
    id: 11,
    nom: "MOYEN COMOE",
    ville: "Abengourou",
    formations: 5,
    centres: 1,
    dotColor: "bg-emerald-500"
  },
  {
    id: 12,
    nom: "SUD-BANDAMA",
    ville: "Divo",
    formations: 4,
    centres: 1,
    dotColor: "bg-lime-500"
  },
  {
    id: 13,
    nom: "WORODOUGOU",
    ville: "Séguéla",
    formations: 3,
    centres: 1,
    dotColor: "bg-rose-500"
  },
  {
    id: 14,
    nom: "DENGUELE",
    ville: "Odienné",
    formations: 3,
    centres: 1,
    dotColor: "bg-fuchsia-500"
  },
  {
    id: 15,
    nom: "N'ZI COMOE",
    ville: "Dimbokro",
    formations: 4,
    centres: 1,
    dotColor: "bg-violet-500"
  }
];

const prochainessessions = [
  {
    id: 1,
    titre: "Gestion des Marchés Publics",
    region: "LAGUNES",
    ville: "Abidjan",
    date: "25 Janvier 2026",
    duree: "3 jours",
    places: 12,
    niveau: "Intermédiaire",
    prix: "150 000 FCFA",
    dotColor: "bg-blue-500"
  },
  {
    id: 2,
    titre: "Marketing Digital & Réseaux Sociaux",
    region: "VALLÉE DU BANDAMA",
    ville: "Bouaké",
    date: "28 Janvier 2026",
    duree: "2 jours",
    places: 8,
    niveau: "Débutant",
    prix: "120 000 FCFA",
    dotColor: "bg-green-500"
  },
  {
    id: 3,
    titre: "Comptabilité et Finance d'Entreprise",
    region: "LACS",
    ville: "Yamoussoukro",
    date: "02 Février 2026",
    duree: "5 jours",
    places: 15,
    niveau: "Avancé",
    prix: "200 000 FCFA",
    dotColor: "bg-amber-500"
  },
  {
    id: 4,
    titre: "Entrepreneuriat & Business Plan",
    region: "BAS-SASSANDRA",
    ville: "San-Pédro",
    date: "05 Février 2026",
    duree: "4 jours",
    places: 10,
    niveau: "Intermédiaire",
    prix: "180 000 FCFA",
    dotColor: "bg-cyan-500"
  }
];

export default function RegionsPage() {
  return (
    <>
      <PageBanner 
        title="Formations par région"
        subtitle="Trouvez des formations près de chez vous en Côte d'Ivoire"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Régions" }
        ]}
        buttons={[
          { label: "Voir les formations", href: "/catalogue", icon: <BookOpen className="h-5 w-5" /> },
          { label: "Trouver un centre", href: "/centres-formation", variant: "outline", icon: <MapPin className="h-5 w-5" /> }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Régions Grid */}
        <section className="container mx-auto px-8 lg:px-16 py-20">
          {/* Header Section améliorée */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                15 Régions - Couverture Nationale
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
              Sélectionnez votre région
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Découvrez les formations disponibles dans votre région et développez vos compétences au plus près de chez vous
            </p>
          </div>

          {/* Grid avec effet de survol amélioré */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 max-w-7xl mx-auto">
            {regions.map((region, idx) => (
              <Link
                key={region.id}
                href={`/catalogue?region=${region.nom}`}
                className="group relative bg-white rounded-2xl border-2 border-slate-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 animate-fade-in p-6 cursor-pointer overflow-hidden"
                style={{ animationDelay: `${idx * 30}ms` }}
              >
                {/* Effet de background au survol */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 to-blue-50/0 group-hover:from-orange-50/50 group-hover:to-blue-50/30 transition-all duration-300"></div>
                
                {/* Contenu */}
                <div className="relative z-10">
                  {/* Dot coloré avec pulse effet */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-3 h-3 rounded-full ${region.dotColor} group-hover:scale-125 transition-transform duration-300`}></div>
                    <div className={`w-1.5 h-1.5 rounded-full ${region.dotColor} opacity-40 group-hover:opacity-60 transition-opacity`}></div>
                  </div>

                  {/* Nom de la région */}
                  <h3 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-orange-600 transition-colors line-clamp-2 leading-tight">
                    {region.nom}
                  </h3>

                  {/* Ville avec icône */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-sm text-slate-500 font-medium">
                      {region.ville}
                    </p>
                  </div>

                  {/* Stats avec badges */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 rounded-lg px-3 py-2 group-hover:bg-orange-50/50 transition-colors">
                      <BookOpen className="w-3.5 h-3.5 flex-shrink-0 text-orange-600" />
                      <span className="font-semibold">{region.formations}</span>
                      <span className="text-slate-500">formations</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 rounded-lg px-3 py-2 group-hover:bg-blue-50/50 transition-colors">
                      <Building className="w-3.5 h-3.5 flex-shrink-0 text-blue-600" />
                      <span className="font-semibold">{region.centres}</span>
                      <span className="text-slate-500">{region.centres > 1 ? 'centres' : 'centre'}</span>
                    </div>
                  </div>

                  {/* Arrow indicator au survol */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Stats globales en bas */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-fade-in animation-delay-300">
            <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-3xl font-bold text-orange-600 mb-1">
                {regions.reduce((acc, r) => acc + r.formations, 0)}
              </div>
              <div className="text-sm text-slate-600">Formations totales</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {regions.reduce((acc, r) => acc + r.centres, 0)}
              </div>
              <div className="text-sm text-slate-600">Centres actifs</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-3xl font-bold text-green-600 mb-1">15</div>
              <div className="text-sm text-slate-600">Régions couvertes</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-3xl font-bold text-purple-600 mb-1">100%</div>
              <div className="text-sm text-slate-600">Du territoire</div>
            </div>
          </div>
        </section>

        {/* Prochaines sessions en présentiel */}
        <section className="container mx-auto px-8 lg:px-16 py-20 bg-gradient-to-br from-orange-50/50 via-white to-blue-50/30">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                <Calendar className="w-4 h-4" />
                Sessions à venir
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Prochaines sessions en présentiel
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Inscrivez-vous aux formations près de chez vous
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-4">
            {prochainessessions.map((session, idx) => (
              <div
                key={session.id}
                className="group bg-white rounded-2xl border-2 border-slate-100 hover:border-orange-200 hover:shadow-xl transition-all duration-300 p-6 animate-slide-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  {/* Colonne gauche - Info principale */}
                  <div className="flex-grow">
                    <div className="flex items-start gap-4 mb-3">
                      <div className={`w-3 h-3 rounded-full ${session.dotColor} mt-1.5 group-hover:scale-125 transition-transform`}></div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                          {session.titre}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                          <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-orange-600" />
                            <span className="font-medium">{session.ville}</span>
                            <span className="text-slate-400">•</span>
                            <span>{session.region}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Colonne centrale - Détails */}
                  <div className="flex flex-wrap lg:flex-nowrap items-center gap-4 lg:gap-6">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-slate-900">{session.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-green-600" />
                      <span className="text-slate-600">{session.duree}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-slate-600">{session.places} places</span>
                    </div>
                    <Badge variant="outline" className="bg-slate-50">
                      {session.niveau}
                    </Badge>
                  </div>

                  {/* Colonne droite - Prix et CTA */}
                  <div className="flex items-center gap-4 lg:border-l lg:border-slate-200 lg:pl-6">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-orange-600">{session.prix}</div>
                      <div className="text-xs text-slate-500">par personne</div>
                    </div>
                    <Button
                      asChild
                      className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow-md"
                    >
                      <Link href={`/inscription?formation=formation-${session.id}`}>
                        Réserver
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA pour voir toutes les sessions */}
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cursor-pointer border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
            >
              <Link href="/catalogue">
                <Calendar className="mr-2 h-5 w-5" />
                Voir toutes les sessions
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
