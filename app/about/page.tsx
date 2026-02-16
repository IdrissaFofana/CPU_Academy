"use client";

import { Suspense, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Target,
  Trophy,
  Users,
  Handshake,
  History,
  Clock,
  Building,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { usePartenairesForSiteWeb, useEquipeForSiteWeb } from "@/hooks/use-api";
import { PageBanner } from "@/components/layout/PageBanner";

function AProposContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "mission";
  const [activeTab, setActiveTab] = useState(initialTab);

  const { data: partenaires = [], isLoading: isLoadingPartenaires } =
    usePartenairesForSiteWeb({ type: "strategique" });
  const { data: equipe = [], isLoading: isLoadingEquipe } =
    useEquipeForSiteWeb();
  const orderedEquipe = [...equipe]
    .map((membre, index) => ({ membre, index }))
    .sort((a, b) => {
      const aOrder = a.membre.odre ?? a.membre.ordre;
      const bOrder = b.membre.odre ?? b.membre.ordre;
      if (aOrder == null && bOrder == null) return a.index - b.index;
      if (aOrder == null) return 1;
      if (bOrder == null) return -1;
      return aOrder - bOrder;
    })
    .map(({ membre }) => membre);

  return (
    <div className="w-full">
      <PageBanner
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "À Propos" }
        ]}
        slides={[
          {
            image: "/images/formation-tech.png",
            title: "À Propos de CPU-PME.CI",
            subtitle: "La Confédération Patronale Unique des PME de Côte d'Ivoire au service des entrepreneurs",
            badge: {
              icon: "+",
              number: "1000",
              text: "Entreprises membres",
              subtext: "Et en croissance"
            },
            trustBadges: [
              {
                icon: "users",
                color: "blue",
                title: "Depuis 2020",
                subtitle: "Au service des PME"
              },
              {
                icon: "check",
                color: "orange",
                title: "Leadership",
                subtitle: "Voix des entrepreneurs"
              },
              {
                icon: "building",
                color: "green",
                title: "National",
                subtitle: "Toutes régions"
              }
            ],
            buttons: [
              { label: "Notre Mission", href: "#mission", icon: <Target className="h-5 w-5" /> },
              { label: "Contactez-nous", href: "/support", variant: "outline", icon: <Users className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/formation-agriculture.png",
            title: "Une Vision pour l'Excellence",
            subtitle: "Faire de la Côte d'Ivoire un pôle d'excellence entrepreneurial en Afrique de l'Ouest",
            badge: {
              number: "100%",
              text: "Engagement qualité",
              subtext: "Pour nos membres"
            },
            trustBadges: [
              {
                icon: "users",
                color: "purple",
                title: "Partenaires",
                subtitle: "Nationaux & Internationaux"
              },
              {
                icon: "check",
                color: "green",
                title: "Reconnu",
                subtitle: "Par les autorités"
              },
              {
                icon: "building",
                color: "blue",
                title: "Innovation",
                subtitle: "Digitalisation"
              }
            ],
            buttons: [
              { label: "Notre Histoire", href: "#histoire", icon: <History className="h-5 w-5" /> }
            ]
          }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Découvrez CPU-PME.CI
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Une organisation au service des PME ivoiriennes depuis sa création
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-center mb-16">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-5xl gap-3 p-2 rounded-2xl bg-white shadow-2xl border-2 border-slate-100">
                {[
                  { value: "mission", label: "Mission & Vision", icon: Target },
                  { value: "histoire", label: "Histoire", icon: History },
                  { value: "equipe", label: "Équipe", icon: Users },
                  { value: "partenaires", label: "Partenaires", icon: Handshake },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold text-sm md:text-base transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:scale-105 data-[state=inactive]:bg-transparent data-[state=inactive]:text-slate-600 hover:bg-slate-50 hover:scale-102"
                    >
                      <Icon className="h-5 w-5 hidden sm:inline" />
                      <span>{tab.label}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>

            {/* Mission & Vision avec design moderne */}
            <TabsContent value="mission" className="mt-0">
              <div className="grid lg:grid-cols-2 gap-8 mb-12">
                {/* Mission Card */}
                <div className="bg-white rounded-3xl border-2 border-slate-100 p-8 md:p-10 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-green-100 to-green-50">
                      <Target className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                      Notre Mission
                    </h2>
                  </div>
                  
                  <p className="text-lg text-slate-700 leading-relaxed mb-8">
                    La Confédération Patronale Unique des PME de Côte d'Ivoire
                    (CPU-PME.CI) a pour mission de soutenir, représenter et
                    défendre les intérêts des Petites et Moyennes Entreprises
                    ivoiriennes.
                  </p>

                  <div className="space-y-4">
                    {[
                      "Renforcer la compétitivité des PME ivoiriennes",
                      "Faciliter l'accès aux financements et aux marchés",
                      "Promouvoir l'innovation et la digitalisation",
                      "Défendre les intérêts des PME auprès des institutions"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4 group">
                        <div className="rounded-full p-2 bg-green-500 mt-0.5 group-hover:scale-125 transition-transform">
                          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-700 leading-relaxed text-lg flex-1">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vision Card */}
                <div className="bg-white rounded-3xl border-2 border-slate-100 p-8 md:p-10 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-50">
                      <Trophy className="h-10 w-10 text-orange-600" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                      Notre Vision
                    </h2>
                  </div>
                  
                  <p className="text-lg text-slate-700 leading-relaxed mb-8">
                    Faire de la Côte d'Ivoire un pôle d'excellence entrepreneurial
                    en Afrique de l'Ouest, où les PME prospèrent dans un
                    environnement innovant et inclusif.
                  </p>

                  <div className="space-y-4">
                    {[
                      "Construire un écosystème entrepreneurial robuste",
                      "Encourager une nouvelle génération d'entrepreneurs",
                      "Positionner les PME comme acteurs clés du développement",
                      "Faciliter l'intégration dans les chaînes de valeur mondiales"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4 group">
                        <div className="rounded-full p-2 bg-orange-500 mt-0.5 group-hover:scale-125 transition-transform">
                          <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-slate-700 leading-relaxed text-lg flex-1">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quote Section */}
              <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 border-l-8 border-orange-500">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold">
                      D
                    </div>
                  </div>
                  <div className="flex-1">
                    <svg className="w-12 h-12 text-orange-500 mb-4" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z" />
                    </svg>
                    <p className="text-xl md:text-2xl text-slate-800 italic mb-6 leading-relaxed font-medium">
                      "Nous nous engageons à porter la voix des PME ivoiriennes et à créer les conditions durables de leur épanouissement."
                    </p>
                    <div>
                      <p className="font-bold text-lg text-slate-900">Dr. Moussa Élias Farakhan Diomandé</p>
                      <p className="text-slate-600 font-medium">Président - CPU-PME CI</p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Histoire avec timeline moderne */}
            <TabsContent value="histoire" className="mt-0">
              <div className="bg-white rounded-3xl border-2 border-slate-100 p-8 md:p-12">
                <div className="flex items-center gap-4 mb-12">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50">
                    <History className="h-10 w-10 text-blue-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Notre Histoire
                  </h2>
                </div>

                <div className="space-y-12 relative before:absolute before:left-8 before:top-0 before:bottom-0 before:w-1 before:bg-gradient-to-b before:from-orange-500 before:via-green-500 before:to-blue-500 before:rounded-full">
                  {[
                    { year: "2019", title: "Création de l'initiative", color: "orange", desc: "Un groupe d'entrepreneurs visionnaires se réunit pour poser les bases d'une organisation représentative unifiée." },
                    { year: "2020", title: "Fondation officielle", color: "green", desc: "La CPU-PME.CI est officiellement fondée lors d'une assemblée constitutive réunissant plus de 200 entrepreneurs." },
                    { year: "2021", title: "Expansion régionale", color: "orange", desc: "Extension de la présence dans toutes les régions avec la création de bureaux régionaux." },
                    { year: "2023", title: "Reconnaissance internationale", color: "green", desc: "Devient membre de plusieurs réseaux internationaux d'organisations patronales." },
                    { year: "2025", title: "Transformation digitale", color: "blue", desc: "Lancement de la plateforme digitale intégrée pour les PME membres." },
                  ].map((milestone, index) => (
                    <div key={index} className="relative pl-24 group">
                      <div className={`absolute left-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${
                        milestone.color === 'orange' ? 'from-orange-500 to-orange-600' :
                        milestone.color === 'green' ? 'from-green-500 to-green-600' :
                        'from-blue-500 to-blue-600'
                      } flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform`}>
                        {milestone.year}
                      </div>
                      <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-6 border-2 border-slate-100 transition-all">
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{milestone.title}</h3>
                        <p className="text-slate-700 leading-relaxed">{milestone.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Équipe avec design moderne */}
            <TabsContent value="equipe" className="mt-0">
              <div className="mb-12">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50">
                    <Users className="h-10 w-10 text-purple-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Équipe Dirigeante
                  </h2>
                </div>

                {isLoadingEquipe ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
                  </div>
                ) : orderedEquipe.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {orderedEquipe.map((membre) => (
                      <Card
                        key={membre.id}
                        className="group overflow-hidden rounded-2xl border-2 border-slate-100 bg-white hover:border-orange-500 transition-all duration-300"
                      >
                        <div className="relative bg-slate-50">
                          <img
                            src={membre.photo}
                            alt={membre.nom}
                            className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.src = "/logo.png";
                            }}
                          />
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                            {membre.nom}
                          </h3>
                          <p className="text-sm font-bold text-orange-600 mt-1">
                            {membre.role}
                          </p>
                          {membre.bio && (
                            <p className="text-sm text-slate-600 leading-relaxed mt-4 line-clamp-4">
                              {membre.bio}
                            </p>
                          )}
                          {membre.reseauxSociaux && (membre.reseauxSociaux.linkedin || membre.reseauxSociaux.email) && (
                            <div className="flex gap-2 pt-5 mt-5 border-t border-slate-100">
                              {membre.reseauxSociaux.linkedin && (
                                <a
                                  href={membre.reseauxSociaux.linkedin}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all text-sm font-medium"
                                >
                                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                  </svg>
                                  <span>LinkedIn</span>
                                </a>
                              )}
                              {membre.reseauxSociaux.email && (
                                <a
                                  href={"mailto:" + membre.reseauxSociaux.email}
                                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-600 hover:text-white transition-all text-sm font-medium"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                  </svg>
                                  <span>Email</span>
                                </a>
                              )}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border-2 border-slate-100">
                    <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-lg text-slate-600">Aucun membre disponible pour le moment.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Partenaires avec design moderne */}
            <TabsContent value="partenaires" className="mt-0">
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-green-100 to-green-50">
                    <Handshake className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Partenaires Stratégiques
                  </h2>
                </div>

                <p className="text-xl text-slate-700 mb-12 max-w-4xl">
                  La CPU-PME.CI collabore avec un réseau de partenaires stratégiques nationaux et internationaux.
                </p>

                {isLoadingPartenaires ? (
                  <div className="flex justify-center items-center py-20">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
                  </div>
                ) : partenaires.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {partenaires.map((partenaire) => (
                      <Card
                        key={partenaire.id}
                        className="group flex items-center justify-center p-6 h-40 rounded-2xl border-2 border-slate-100 bg-white hover:border-orange-500 transition-all duration-300"
                      >
                        {partenaire.lien ? (
                          <a href={partenaire.lien} target="_blank" rel="noopener noreferrer"
                             className="w-full h-full flex items-center justify-center">
                            <img
                              src={partenaire.logo}
                              alt={partenaire.nom}
                              className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => { e.currentTarget.src = "/logo.png"; }}
                            />
                          </a>
                        ) : (
                          <img
                            src={partenaire.logo}
                            alt={partenaire.nom}
                            className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300"
                            onError={(e) => { e.currentTarget.src = "/logo.png"; }}
                          />
                        )}
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-3xl border-2 border-slate-100">
                    <Building className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-lg text-slate-600">Aucun partenaire disponible pour le moment.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense
      fallback={(
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      )}
    >
      <AProposContent />
    </Suspense>
  );
}
