"use client";

import { useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CardImage } from "@/components/ui/LazyImage";
import { AvatarImage } from "@/components/ui/LazyImage";
import {
  Clock,
  Users,
  Award,
  Star,
  ArrowLeft,
  Check,
  Heart,
  Share2,
  Book,
  Target,
  Zap,
  AlertCircle,
} from "lucide-react";
import { useParcours } from "@/hooks/useParcours";
import { buildParcoursDetailsFromApi } from "@/lib/adapters/parcours-adapter";
import { useFavorites, useTelemetry } from "@/hooks/useStorage";

export default function ParcoursDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const parcoursId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { isParcoursLiked, toggleParcoursFavorite } = useFavorites();
  const { trackCardClick } = useTelemetry();
  const { parcours: apiParcours, isLoading, error } = useParcours();

  const parcours = useMemo(() => {
    if (!parcoursId) return null;
    return buildParcoursDetailsFromApi(apiParcours, parcoursId);
  }, [apiParcours, parcoursId]);

  useEffect(() => {
    if (!parcoursId || !parcours) return;
    trackCardClick(parcoursId, `/parcours/${parcoursId}`);
  }, [parcoursId, parcours, trackCardClick]);

  if (isLoading && !parcours) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-cpu-orange border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-600">Chargement du parcours...</p>
        </div>
      </div>
    );
  }

  if (error && !parcours) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-6 max-w-xl">
          <AlertCircle className="w-14 h-14 mx-auto text-red-500" />
          <h1 className="text-3xl font-bold text-slate-900">Erreur de chargement</h1>
          <p className="text-slate-600">Impossible de charger les données du parcours pour le moment.</p>
          <Button onClick={() => router.push("/parcours")} variant="outline">
            Retourner aux parcours
          </Button>
        </div>
      </div>
    );
  }

  if (!parcours) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-slate-900">Parcours non trouvé</h1>
          <p className="text-slate-600">Le parcours que vous recherchez n'existe pas.</p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retourner aux parcours
          </Button>
        </div>
      </div>
    );
  }

  const isFavorite = isParcoursLiked(parcours.id);

  return (
    <>
      <PageBanner
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Parcours", href: "/parcours" },
          { label: parcours.titre }
        ]}
        slides={[
          {
            image: "/images/formation-tech.png",
            title: parcours.titre,
            subtitle: parcours.description,
            trustBadges: [
              {
                icon: "users",
                color: "orange",
                title: `${parcours.formations.length} formations`,
                subtitle: "Dans ce parcours"
              },
              {
                icon: "check",
                color: "green",
                title: parcours.niveau,
                subtitle: "Niveau requis"
              },
              {
                icon: "building",
                color: "blue",
                title: `${parcours.dureeTotal}h`,
                subtitle: "Durée totale"
              }
            ]
          }
        ]}
      />

      <div className="min-h-screen bg-slate-50 py-16">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
          {/* Bouton retour */}
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retourner aux parcours
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contenu principal */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Hero */}
              <div className="relative rounded-xl overflow-hidden h-96 bg-slate-200 border border-slate-200 shadow-lg">
                <CardImage
                  src={parcours.image}
                  alt={parcours.titre}
                  className="w-full h-full"
                />
                {parcours.bestseller && (
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-cpu-orange text-white">
                      <Zap className="w-3 h-3 mr-1" />
                      Bestseller
                    </Badge>
                  </div>
                )}
              </div>

              {/* Description détaillée */}
              <Card className="p-8 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-4">À propos de ce parcours</h2>
                <p className="text-slate-700 leading-relaxed mb-6">
                  {parcours.description}
                </p>
                <p className="text-slate-600 leading-relaxed">
                  Ce parcours est généré dynamiquement à partir des formations actuellement publiées sur la plateforme.
                  Vous bénéficiez ainsi d'un contenu toujours à jour avec les besoins réels du marché.
                </p>
              </Card>

              <Card className="p-8 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-cpu-orange" />
                  Objectifs du parcours
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {parcours.objectifs.map((objectif, index) => (
                    <div key={index} className="flex items-start gap-2 p-3 rounded-lg bg-slate-50 border border-slate-200">
                      <Check className="w-4 h-4 mt-0.5 text-cpu-orange flex-shrink-0" />
                      <span className="text-sm text-slate-700">{objectif}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Modules et contenu */}
              <Card className="p-8 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Book className="w-6 h-6 text-cpu-orange" />
                  Formations du parcours
                </h2>
                
                {/* Group formations by instructor */}
                <div className="space-y-8">
                  {parcours.formations && parcours.formations.length > 0 ? (
                    parcours.formations.map((formation: any, formIdx: number) => (
                      <div key={formation.id} className="pb-8 border-b border-slate-200 last:border-0">
                        {/* Formation Header */}
                        <div className="flex gap-4 mb-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cpu-orange/20 text-cpu-orange flex items-center justify-center font-bold">
                            {formIdx + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-slate-900">{formation.titre}</h3>
                            <p className="text-sm text-slate-600 mt-1">{formation.resume}</p>
                            
                            {/* Formation Info */}
                            <div className="flex flex-wrap gap-4 mt-3">
                              <span className="flex items-center gap-1 text-xs text-slate-600">
                                <Clock className="w-3 h-3" />
                                {formation.duree}h
                              </span>
                              <span className="flex items-center gap-1 text-xs text-slate-600">
                                <Users className="w-3 h-3" />
                                {formation.nbInscrits || 0}+ inscrits
                              </span>
                              {formation.expert && (
                                <span className="flex items-center gap-1 text-xs text-slate-600">
                                  👤 <span className="font-medium">{formation.expert.prenom} {formation.expert.nom}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Modules of Formation */}
                        {formation.modules && formation.modules.length > 0 && (
                          <div className="ml-16 space-y-3">
                            <p className="text-sm font-semibold text-slate-700 mb-3">Modules:</p>
                            {formation.modules.map((module: any, modIdx: number) => (
                              <div key={module.id} className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                                <div className="flex-shrink-0 w-8 h-8 rounded bg-cpu-green/20 text-cpu-green flex items-center justify-center text-xs font-semibold">
                                  {modIdx + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-slate-900 text-sm">{module.titre}</h4>
                                  <p className="text-xs text-slate-600 mt-1">{module.description}</p>
                                  <div className="flex gap-3 mt-2 text-xs text-slate-500">
                                    <span>{module.duree}h</span>
                                    {module.objectifs && module.objectifs.length > 0 && (
                                      <span>{module.objectifs.length} objectif{module.objectifs.length > 1 ? 's' : ''}</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-slate-600 p-4 bg-slate-50 rounded">
                      Formations en cours de chargement...
                    </div>
                  )}
                </div>
              </Card>

              {/* Étapes dynamiques */}
              <Card className="p-8 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-cpu-orange" />
                  Étapes suggérées
                </h2>
                <div className="space-y-4">
                  {parcours.etapes.map((etape, idx) => (
                    <div key={idx} className="flex gap-4 pb-4 border-b border-slate-200 last:border-0">
                      <div className="w-10 h-10 rounded-full bg-cpu-orange text-white font-bold flex items-center justify-center flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <span className="font-semibold text-slate-900">{etape.titre}</span>
                          <Badge variant="outline" className="text-xs">
                            {etape.duree}h
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {etape.formations.length > 0 ? (
                            etape.formations.map((item, index) => (
                              <Badge key={index} className="bg-slate-100 text-slate-700 border-0 text-xs">
                                {item}
                              </Badge>
                            ))
                          ) : (
                            <span className="text-sm text-slate-500">Contenu modulaire à découvrir dans la formation.</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <Award className="w-6 h-6 text-cpu-orange" />
                  Compétences développées
                </h2>
                <div className="flex flex-wrap gap-2">
                  {parcours.competences.map((competence, idx) => (
                    <Badge key={idx} className="bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1">
                      {competence}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar - Inscription et détails */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8 p-8 border border-slate-200 bg-white shadow-lg">
                {/* Prix */}
                <div className="mb-6">
                  <p className="text-sm text-slate-600 mb-2">Prix du parcours</p>
                  <div className="flex items-baseline gap-2">
                    {parcours.prixOriginal && parcours.prix !== parcours.prixOriginal && (
                      <span className="text-lg text-slate-400 line-through">
                        {parcours.prixOriginal.toLocaleString()} CFA
                      </span>
                    )}
                    <span className="text-4xl font-bold text-cpu-orange">
                      {parcours.prix > 0 ? parcours.prix.toLocaleString() : "Gratuit"}
                    </span>
                    {parcours.prix > 0 && <span className="text-slate-600">CFA</span>}
                  </div>
                </div>

                {/* Statistiques */}
                <div className="space-y-4 mb-6 pb-6 border-b border-slate-200">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-cpu-orange flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-600">Durée</p>
                      <p className="font-semibold text-slate-900">{parcours.dureeTotal} heures</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-cpu-orange flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-600">Inscrits</p>
                      <p className="font-semibold text-slate-900">{parcours.nbInscrits || 0}+ participants</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-cpu-orange flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-600">Évaluation cumulée</p>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{(parcours.notesMoyenne || 0).toFixed(1)} pts</span>
                        <span className="text-xs text-slate-600">({parcours.nbAvis || 150} avis)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-cpu-orange flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-600">Certificat</p>
                      <p className="font-semibold text-slate-900">{parcours.certifiant ? "Inclus à la fin" : "Selon modules"}</p>
                    </div>
                  </div>
                </div>

                {/* Instructeur */}
                {parcours.instructeur && (
                  <div className="mb-6 pb-6 border-b border-slate-200">
                    <p className="text-sm font-semibold text-slate-900 mb-3">Instructeur</p>
                    <div className="flex gap-3">
                      <AvatarImage
                        src={parcours.instructeur.photo}
                        alt={parcours.instructeur.nom}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-slate-900">{parcours.instructeur.nom}</p>
                        <p className="text-xs text-slate-600">{parcours.instructeur.titre}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Avantages */}
                <div className="mb-6 space-y-3">
                  <p className="text-sm font-semibold text-slate-900">Ce que vous obtiendrez</p>
                  {[
                    `${parcours.formations.length} formations structurées`,
                    `${parcours.dureeTotal}h de montée en compétence`,
                    parcours.certifiant ? "Parcours certifiant" : "Parcours professionnalisant",
                    `Format dominant: ${parcours.format}`,
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex gap-2 items-center text-sm text-slate-700">
                      <Check className="w-4 h-4 text-cpu-orange flex-shrink-0" />
                      {benefit}
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 mb-4">
                  <Button className="w-full bg-cpu-orange hover:bg-orange-600 text-white">
                    S'inscrire maintenant
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => toggleParcoursFavorite(parcours.id)}
                  >
                    <Heart
                      className={`w-4 h-4 mr-2 ${
                        isFavorite ? "fill-cpu-orange text-cpu-orange" : ""
                      }`}
                    />
                    {isFavorite ? "Sauvegardé" : "Sauvegarder"}
                  </Button>
                </div>

                {/* Share button */}
                <Button
                  variant="ghost"
                  className="w-full justify-center text-slate-600 hover:text-cpu-orange"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
