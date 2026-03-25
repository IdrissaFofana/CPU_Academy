"use client";

import { useState, use, useMemo } from "react";
import { notFound } from "next/navigation";
import { reviewsMock, sessionsPresentielMock } from "@/data/mock";
import { FormationDetailHero } from "@/components/formations/FormationDetailHero";
import { FormationProgram } from "@/components/formations/FormationProgram";
import { FormationInstructor } from "@/components/formations/FormationInstructor";
import { FormationSidebar } from "@/components/formations/FormationSidebar";
import { EnhancedFormationCard } from "@/components/catalogue/EnhancedFormationCard";
import { ReviewsStats } from "@/components/reviews/ReviewsStats";
import { ReviewsList } from "@/components/reviews/ReviewsList";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { SessionCard } from "@/components/sessions/SessionCard";
import { PracticalInfo } from "@/components/sessions/PracticalInfo";
import { useFormationContent, useFormations } from "@/hooks/useFormations";
import { mapApiFormationToAppFormation } from "@/lib/adapters/formation-adapter";

type Tab = "apercu" | "programme" | "sessions" | "instructeur" | "avis";

export default function FormationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [activeTab, setActiveTab] = useState<Tab>("apercu");
  const { formations, isLoading, hasFetched } = useFormations({ limit: 200 });

  const formationsNormalized = useMemo(
    () => formations.map((item) => mapApiFormationToAppFormation(item)),
    [formations]
  );

  // Trouver la formation par slug
  const formation = formationsNormalized.find((f) => f.slug === slug);
  const { chapitres } = useFormationContent(formation?.id || "", Boolean(formation?.id));
  const formationWithContent = useMemo(
    () =>
      formation
        ? {
            ...formation,
            chapitres: chapitres.length > 0 ? chapitres : formation.chapitres,
          }
        : null,
    [formation, chapitres]
  );

  if ((isLoading || !hasFetched) && !formation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (hasFetched && !formation) {
    notFound();
  }

  // Reviews pour cette formation
  const formationReviews = reviewsMock.filter(
    (r) => r.formationId === formationWithContent?.id
  );

  // Sessions présentielles pour cette formation
  const formationSessions = sessionsPresentielMock.filter(
    (s) => s.formationId === formationWithContent?.id
  );

  // Formations similaires (même secteur ou même parcours)
  const formationsSimilaires = formationsNormalized
    .filter((f) => f.id !== formationWithContent?.id && f.secteur === formationWithContent?.secteur)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <FormationDetailHero formation={formationWithContent!} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-slate-200 mb-6 overflow-x-auto">
              <nav className="-mb-px flex space-x-4 md:space-x-8 min-w-max">
                <button
                  onClick={() => setActiveTab("apercu")}
                  className={`py-4 px-2 whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "apercu"
                      ? "border-cpu-orange text-cpu-orange"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  Aperçu
                </button>
                <button
                  onClick={() => setActiveTab("programme")}
                  className={`py-4 px-2 whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "programme"
                      ? "border-cpu-orange text-cpu-orange"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  Programme
                </button>
                <button
                  onClick={() => setActiveTab("sessions")}
                  className={`py-4 px-2 whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "sessions"
                      ? "border-cpu-orange text-cpu-orange"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  Sessions {formationSessions.length > 0 && `(${formationSessions.length})`}
                </button>
                <button
                  onClick={() => setActiveTab("instructeur")}
                  className={`py-4 px-2 whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "instructeur"
                      ? "border-cpu-orange text-cpu-orange"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  Instructeur
                </button>
                <button
                  onClick={() => setActiveTab("avis")}
                  className={`py-4 px-2 whitespace-nowrap border-b-2 font-medium text-sm transition-colors ${
                    activeTab === "avis"
                      ? "border-cpu-orange text-cpu-orange"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  Avis {formationReviews.length > 0 && `(${formationReviews.length})`}
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              {activeTab === "apercu" && (
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">
                      Description
                    </h2>
                    <p className="text-slate-600 leading-relaxed">
                      {formationWithContent!.description}
                    </p>
                  </div>

                  {/* Objectifs */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Ce que vous allez apprendre
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {formationWithContent!.objectifs.map((obj, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                            <svg
                              className="w-3 h-3 text-green-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-slate-700">{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prérequis */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Prérequis
                    </h3>
                    <ul className="space-y-2">
                      {formationWithContent!.prerequis.map((prereq, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-slate-700"
                        >
                          <span className="text-cpu-orange mt-1">•</span>
                          <span>{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Livrables */}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      Ressources incluses
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {formationWithContent!.livrables.map((livrable, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                        >
                          <svg
                            className="w-5 h-5 text-cpu-orange flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span className="text-sm text-slate-700">
                            {livrable}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "programme" && (
                <FormationProgram chapitres={formationWithContent!.chapitres || []} />
              )}

              {activeTab === "sessions" && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-2">
                      Sessions présentielles disponibles
                    </h2>
                    <p className="text-slate-600 mb-8">
                      Rejoignez nos formations en présentiel dans l'un de nos centres
                      équipés. Places limitées.
                    </p>
                  </div>

                  {formationSessions.length > 0 ? (
                    <div className="space-y-6">
                      {formationSessions.map((session) => (
                        <SessionCard key={session.id} session={session} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-lg">
                      <div className="text-6xl mb-4">📅</div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">
                        Aucune session programmée pour le moment
                      </h3>
                      <p className="text-slate-600 mb-6">
                        Nous organiserons de nouvelles sessions prochainement.
                        Inscrivez-vous à la liste d'attente pour être notifié.
                      </p>
                      <button className="px-6 py-3 bg-cpu-orange text-white rounded-lg hover:bg-cpu-orange/90 transition-colors">
                        Rejoindre la liste d'attente
                      </button>
                    </div>
                  )}

                  <PracticalInfo formationMode="presentiel" />
                </div>
              )}

              {activeTab === "instructeur" && formationWithContent!.expert && (
                <FormationInstructor expert={formationWithContent!.expert} />
              )}

              {activeTab === "avis" && (
                <div className="space-y-8">
                  {formationReviews.length > 0 ? (
                    <>
                      <ReviewsStats reviews={formationReviews} />
                      <ReviewsList reviews={formationReviews} />
                      <div className="pt-8 border-t border-slate-200">
                        <ReviewForm formationId={formationWithContent!.id} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">💬</div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                          Pas encore d'avis
                        </h3>
                        <p className="text-slate-600">
                          Soyez le premier à laisser un avis sur cette formation !
                        </p>
                      </div>
                      <ReviewForm formationId={formationWithContent!.id} />
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="lg:col-span-1">
            <FormationSidebar formation={formationWithContent!} />
          </div>
        </div>

        {/* Formations similaires */}
        {formationsSimilaires.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Formations similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {formationsSimilaires.map((f) => (
                <EnhancedFormationCard key={f.id} formation={f} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
