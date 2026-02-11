"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Formation } from "@/types";
import { 
  Clock, MapPin, Users, Star, CheckCircle2, Award, BookOpen, 
  Target, GraduationCap, FileText, Package, Calendar, TrendingUp 
} from "lucide-react";

interface FormationModalProps {
  formation: Formation;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function FormationModal({ formation, open, onOpenChange }: FormationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-hidden p-0">
        <DialogTitle className="sr-only">{formation.titre}</DialogTitle>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 h-full max-h-[95vh]">
          {/* Colonne principale - Contenu défilant */}
          <div className="lg:col-span-2 overflow-y-auto">
            {/* Hero Section avec Image */}
            <div className="relative h-80 bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden animate-fade-in">
              {formation.image ? (
                <>
                  <img 
                    src={formation.image} 
                    alt={formation.titre}
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-cpu-orange/20 to-cpu-green/20" />
              )}
              
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20">
                    {formation.modalite || "Hybride"}
                  </Badge>
                  <Badge className={`${formation.niveau === "Débutant" ? "bg-green-500" : formation.niveau === "Avancé" ? "bg-red-500" : "bg-orange-500"} text-white border-0`}>
                    {formation.niveau || "Intermédiaire"}
                  </Badge>
                  {formation.certifiant && (
                    <Badge className="bg-cpu-green text-white border-0">
                      <Award className="h-3 w-3 mr-1" />
                      Certifiant
                    </Badge>
                  )}
                </div>

                {/* Titre */}
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                  {formation.titre}
                </h2>

                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  {formation.notesMoyenne && (
                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{formation.notesMoyenne}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>{formation.nbInscrits || 0} inscrits</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{formation.duree} semaines</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    <span>{formation.region || "Abidjan"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="p-8 space-y-8">
              {/* Description */}
              <section className="animate-slide-up animation-delay-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-cpu-orange/10 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-cpu-orange" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">À propos de cette formation</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-base">
                  {formation.description}
                </p>
              </section>

              {/* Objectifs */}
              {formation.objectifs && formation.objectifs.length > 0 && (
                <section className="bg-gradient-to-br from-cpu-orange/5 to-cpu-green/5 rounded-2xl p-6 animate-slide-up animation-delay-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-cpu-orange flex items-center justify-center">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Ce que vous allez apprendre</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {formation.objectifs.map((objectif, index) => (
                      <div key={index} className="flex items-start gap-3 bg-white rounded-lg p-3">
                        <CheckCircle2 className="h-5 w-5 text-cpu-green shrink-0 mt-0.5" />
                        <span className="text-gray-700 text-sm">{objectif}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Programme */}
              {formation.chapitres && formation.chapitres.length > 0 && (
                <section className="animate-slide-up animation-delay-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-cpu-green/10 flex items-center justify-center">
                      <GraduationCap className="h-5 w-5 text-cpu-green" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">Programme détaillé</h3>
                  </div>
                  <div className="space-y-3">
                    {formation.chapitres.map((chapitre, index) => (
                      <div key={chapitre.id} className="group border-2 border-gray-200 rounded-xl p-5 hover:border-cpu-orange/50 transition-all duration-200">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-cpu-orange to-cpu-orange/70 flex items-center justify-center text-white font-bold shrink-0 group-hover:scale-110 transition-transform">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 text-lg mb-1">
                                {chapitre.titre}
                              </h4>
                              {chapitre.description && (
                                <p className="text-sm text-gray-600">{chapitre.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 text-sm text-gray-500 shrink-0">
                            <Clock className="h-4 w-4" />
                            <span>{chapitre.duree} min</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Prérequis & Livrables */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formation.prerequis && formation.prerequis.length > 0 && (
                  <section className="border-2 border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="h-5 w-5 text-cpu-orange" />
                      <h3 className="text-lg font-bold text-gray-900">Prérequis</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {formation.prerequis.map((prerequis, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <div className="h-2 w-2 rounded-full bg-cpu-orange shrink-0 mt-2" />
                          <span className="text-gray-700 text-sm">{prerequis}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {formation.livrables && formation.livrables.length > 0 && (
                  <section className="border-2 border-gray-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Package className="h-5 w-5 text-cpu-green" />
                      <h3 className="text-lg font-bold text-gray-900">Livrables</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {formation.livrables.map((livrable, index) => (
                        <li key={index} className="flex items-start gap-2.5">
                          <CheckCircle2 className="h-5 w-5 text-cpu-green shrink-0" />
                          <span className="text-gray-700 text-sm">{livrable}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>

              {/* Expert */}
              {formation.expert && (
                <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 animate-slide-up animation-delay-400">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Votre formateur expert</h3>
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 rounded-xl bg-gradient-to-br from-cpu-orange to-cpu-green flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-lg">
                      {formation.expert.nom?.charAt(0)}{formation.expert.prenom?.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-lg font-bold text-gray-900 mb-1">
                        {formation.expert.nom} {formation.expert.prenom}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">{formation.expert.bio}</p>
                      {formation.expert.notemoyenne && (
                        <div className="flex items-center gap-2 mt-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold text-sm">{formation.expert.notemoyenne}</span>
                          </div>
                          <span className="text-gray-500 text-sm">• {formation.expert.nbCours} formations</span>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              )}

              {/* CTA d'inscription principale */}
              <section className="bg-gradient-to-br from-cpu-orange/5 via-white to-cpu-green/5 rounded-2xl p-8 shadow-lg animate-scale-in animation-delay-500">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Prêt à commencer cette formation ?
                    </h3>
                    <p className="text-gray-600">
                      Rejoignez {formation.nbInscrits || 0} personnes déjà inscrites
                    </p>
                  </div>
                  <div className="flex flex-col items-center md:items-end gap-3">
                    {formation.gratuit ? (
                      <div className="text-3xl font-bold text-cpu-green">Gratuit</div>
                    ) : (
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-gray-900">
                            {((formation.prixMembre || formation.prixPublic || 350000) / 1000).toFixed(0)}K
                          </span>
                          <span className="text-xl text-gray-600">FCFA</span>
                        </div>
                        {formation.prixMembre && formation.prixPublic && formation.prixMembre !== formation.prixPublic && (
                          <p className="text-sm text-gray-500 text-right">
                            Prix public: {(formation.prixPublic / 1000).toFixed(0)}K FCFA
                          </p>
                        )}
                      </div>
                    )}
                    <a href={`/inscription?formation=${formation.id}`}>
                      <Button 
                        className="group cursor-pointer bg-gradient-to-r from-cpu-orange via-cpu-orange to-cpu-orange/80 hover:from-cpu-orange hover:via-cpu-orange/90 hover:to-cpu-orange font-bold px-10 py-6 text-lg rounded-xl shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 text-black hover:text-white border-2 border-cpu-orange/50 hover:border-white relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          S'inscrire maintenant
                          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                        <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                      </Button>
                    </a>
                  </div>
                </div>
              </section>

              {/* CTA d'inscription en bas (mobile sticky) */}
              <section className="lg:hidden sticky bottom-0 -mx-8 -mb-8 bg-white border-t-2 border-gray-200 p-6 shadow-2xl">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    {formation.gratuit ? (
                      <div className="text-2xl font-bold text-cpu-green">Gratuit</div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-gray-900">
                          {((formation.prixMembre || formation.prixPublic || 350000) / 1000).toFixed(0)}K
                        </span>
                        <span className="text-lg text-gray-600">FCFA</span>
                      </div>
                    )}
                  </div>
                  <a href={`/inscription?formation=${formation.id}`}>
                    <Button 
                      className="group cursor-pointer bg-gradient-to-r from-cpu-orange via-cpu-orange to-cpu-orange/80 hover:from-cpu-orange hover:via-cpu-orange/90 hover:to-cpu-orange font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 text-black hover:text-white border-2 border-cpu-orange/50 hover:border-white relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        S'inscrire maintenant
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    </Button>
                  </a>
                </div>
              </section>
            </div>
          </div>

          {/* Sidebar sticky - Prix et inscription */}
          <div className="lg:col-span-1 bg-gray-50 border-l border-gray-200 p-6 lg:p-8 overflow-y-auto animate-slide-left animation-delay-200">
            <div className="sticky top-0 space-y-6">
              {/* Carte de prix */}
              <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
                <div className="text-center mb-6">
                  {formation.gratuit ? (
                    <div>
                      <div className="text-5xl font-bold text-cpu-green mb-2">Gratuit</div>
                      <p className="text-gray-600 text-sm">Accès immédiat et illimité</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-5xl font-bold text-gray-900">
                          {((formation.prixMembre || formation.prixPublic || 350000) / 1000).toFixed(0)}K
                        </span>
                        <span className="text-xl text-gray-600">FCFA</span>
                      </div>
                      {formation.prixMembre && formation.prixPublic && formation.prixMembre !== formation.prixPublic && (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-gray-400 line-through text-sm">
                            {(formation.prixPublic / 1000).toFixed(0)}K
                          </span>
                          <Badge className="bg-red-100 text-red-700 border-0">
                            -{Math.round(((formation.prixPublic - formation.prixMembre) / formation.prixPublic) * 100)}%
                          </Badge>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <a href={`/inscription?formation=${formation.id}`}>
                  <Button 
                    className="cursor-pointer w-full bg-gradient-to-r from-cpu-orange to-cpu-orange/90 hover:from-cpu-orange/90 hover:to-cpu-orange text-black hover:text-white font-bold py-6 text-lg rounded-xl shadow-lg hover:scale-[1.02] transition-all duration-200"
                  >
                    S'inscrire maintenant
                  </Button>
                </a>

                <p className="text-center text-xs text-gray-500 mt-4">
                  Garantie satisfait ou remboursé 30 jours
                </p>
              </div>

              {/* Informations complémentaires */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                  <Calendar className="h-5 w-5 text-cpu-orange" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Durée</p>
                    <p className="text-sm text-gray-600">{formation.duree} semaines</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                  <TrendingUp className="h-5 w-5 text-cpu-green" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Niveau</p>
                    <p className="text-sm text-gray-600">{formation.niveau || "Intermédiaire"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                  <BookOpen className="h-5 w-5 text-cpu-orange" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Format</p>
                    <p className="text-sm text-gray-600">{formation.modalite || "Hybride"}</p>
                  </div>
                </div>

                {formation.certifiant && (
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-200">
                    <Award className="h-5 w-5 text-cpu-green" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Certification</p>
                      <p className="text-sm text-gray-600">Diplôme inclus</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Call to action secondaire */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  🎁 Offre spéciale membre
                </p>
                <p className="text-xs text-gray-600 mb-3">
                  Devenez membre CPU Formation et bénéficiez de réductions sur toutes les formations
                </p>
                <Button variant="outline" className="cursor-pointer w-full text-sm border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white">
                  En savoir plus
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

