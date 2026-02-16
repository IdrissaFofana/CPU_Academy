"use client";

import { Target, Eye, CheckCircle2 } from "lucide-react";
import { useMissionVision } from "@/hooks/useMissionVision";

export function MissionVisionSection() {
  const { missionVision, isLoading, error } = useMissionVision();

  if (isLoading) {
    return (
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-slate-200 rounded-full mb-6"></div>
              <div className="h-8 bg-slate-200 rounded mb-4 w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              </div>
            </div>
            <div className="animate-pulse">
              <div className="w-16 h-16 bg-slate-200 rounded-full mb-6"></div>
              <div className="h-8 bg-slate-200 rounded mb-4 w-1/2"></div>
              <div className="space-y-2">
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !missionVision) {
    // Fallback vers le contenu statique en cas d'erreur
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <div className="inline-flex p-4 rounded-full bg-cpu-orange mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Notre Mission</h2>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                Démocratiser l'accès à une formation professionnelle de qualité pour tous les Ivoiriens,
                en proposant des parcours adaptés aux besoins du marché du travail et aux réalités locales.
              </p>
            </div>

            <div>
              <div className="inline-flex p-4 rounded-full bg-cpu-orange mb-6">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Notre Vision</h2>
              <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                Devenir la première plateforme africaine de développement des compétences, reconnue pour
                l'excellence de ses formations et son impact social.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const { mission, vision } = missionVision.data;

  return (
    <section className="py-20 bg-gray-50" id="mission">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Mission Section */}
          <div>
            <div className="flex items-center mb-6">
              <div className="inline-flex p-3 rounded-full bg-cpu-orange/10 mr-4">
                {mission.icone ? (
                  <span className="text-3xl">{mission.icone}</span>
                ) : (
                  <Target className="w-8 h-8 text-cpu-orange" />
                )}
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {mission.titre}
              </h2>
            </div>
            
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-6">
              {mission.textePrincipal}
            </p>

            {mission.objectifs && mission.objectifs.length > 0 && (
              <div>
                <p className="text-base text-gray-600 mb-4">
                  {mission.sousTitre}
                </p>
                <ul className="space-y-3">
                  {mission.objectifs.map((objectif) => (
                    <li key={objectif.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center mt-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span className="text-gray-700 flex-1">{objectif.texte}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Vision Section */}
          <div>
            <div className="flex items-center mb-6">
              <div className="inline-flex p-3 rounded-full bg-cpu-orange/10 mr-4">
                {vision.icone ? (
                  <span className="text-3xl">{vision.icone}</span>
                ) : (
                  <Eye className="w-8 h-8 text-cpu-orange" />
                )}
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {vision.titre}
              </h2>
            </div>
            
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed mb-6">
              {vision.textePrincipal}
            </p>

            {vision.aspirations && vision.aspirations.length > 0 && (
              <div className="mb-6">
                <p className="text-base text-gray-600 mb-4">
                  {vision.sousTitre}
                </p>
                <ul className="space-y-3">
                  {vision.aspirations.map((aspiration) => (
                    <li key={aspiration.id} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cpu-orange flex items-center justify-center mt-1">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                      <span className="text-gray-700 flex-1">{aspiration.texte}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {vision.engagement && (
              <div className="mt-6 p-6 bg-gray-100 rounded-lg">
                {vision.engagement.titre && (
                  <h4 className="font-bold text-gray-900 mb-3">
                    {vision.engagement.titre}
                  </h4>
                )}
                {vision.engagement.citation && (
                  <div>
                    <p className="text-gray-700 italic mb-4 leading-relaxed">
                      "{vision.engagement.citation}"
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                      Dr. Moussa Élias Farakhan Diomandé Président Confédération Patronale Unique des PME de Côte d'Ivoire (CPU-PME CI)
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
