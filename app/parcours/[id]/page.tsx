"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Download,
  Book,
  Target,
  Zap,
  MessageSquare
} from "lucide-react";
import { parcoursMock, formationsMock } from "@/data/mock";
import { useFavorites, useTelemetry } from "@/hooks/useStorage";

interface ParcoursDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ParcoursDetailPage({ params }: ParcoursDetailPageProps) {
  const router = useRouter();
  const [parcours, setParcours] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isParcoursLiked, toggleParcoursFavorite } = useFavorites();
  const { trackCardClick } = useTelemetry();

  useEffect(() => {
    // Unwrap params promise
    params.then(({ id }) => {
      let found = parcoursMock.find((p) => p.id === id);
      
      if (found) {
        // Enrich formations with data from formationsMock
        const enrichedFormations = found.formationsIds
          ?.map((formationId: string) => {
            return formationsMock.find((f) => f.id === formationId);
          })
          .filter((formation): formation is typeof formationsMock[0] => !!formation) || [];
        
        found = {
          ...found,
          formations: enrichedFormations
        };
      }
      
      setParcours(found);
      setLoading(false);

      if (found) {
        trackCardClick(id, `/parcours/${id}`);
      }
    });
  }, [params, trackCardClick]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-cpu-orange border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-slate-600">Chargement du parcours...</p>
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
        title={parcours.titre}
        subtitle={parcours.description}
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Parcours", href: "/parcours" },
          { label: parcours.titre }
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
                  {parcours.contenuDetaille || "Parcours complète conçu pour vous permettre de maîtriser toutes les compétences essentielles dans ce domaine."}
                </p>
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
                                  👤 <span className="font-medium">{formation.expert.nom}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Modules of Formation */}
                        {formation.modules && formation.modules.length > 0 && (
                          <div className="ml-16 space-y-3">
                            <p className="text-sm font-semibold text-slate-700 mb-3">📚 Modules:</p>
                            {formation.modules.map((module: any, modIdx: number) => (
                              <div key={module.id} className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
                                <div className="flex-shrink-0 w-8 h-8 rounded bg-cpu-green/20 text-cpu-green flex items-center justify-center text-xs font-semibold">
                                  {modIdx + 1}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-slate-900 text-sm">{module.titre}</h4>
                                  <p className="text-xs text-slate-600 mt-1">{module.description}</p>
                                  <div className="flex gap-3 mt-2 text-xs text-slate-500">
                                    <span>⏱️ {module.duree}h</span>
                                    {module.objectifs && module.objectifs.length > 0 && (
                                      <span>🎯 {module.objectifs.length} objectif{module.objectifs.length > 1 ? 's' : ''}</span>
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

              {/* Avis et commentaires */}
              <Card className="p-8 border border-slate-200">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-cpu-orange" />
                  Avis des participants
                </h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, idx) => (
                    <div key={idx} className="flex gap-4 pb-4 border-b border-slate-200 last:border-0">
                      <AvatarImage
                        alt={`Participant ${idx + 1}`}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-slate-900">Participant {idx + 1}</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < 4 + (idx % 2)
                                    ? "fill-cpu-orange text-cpu-orange"
                                    : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">
                          Excellent parcours! Les contenus sont très bien expliqués et les instructeurs sont passionnés.
                        </p>
                      </div>
                    </div>
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
                        {parcours.prixOriginal} CFA
                      </span>
                    )}
                    <span className="text-4xl font-bold text-cpu-orange">
                      {parcours.prix}
                    </span>
                    <span className="text-slate-600">CFA</span>
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
                      <p className="text-xs text-slate-600">Évaluation</p>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900">{parcours.notesMoyenne || 4.8}/5</span>
                        <span className="text-xs text-slate-600">({parcours.nbAvis || 150} avis)</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-cpu-orange flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-600">Certificat</p>
                      <p className="font-semibold text-slate-900">Inclus à la fin</p>
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
                    "Accès illimité au contenu",
                    "Certificat de complétion",
                    "Support communautaire",
                    "Mises à jour gratuites"
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
