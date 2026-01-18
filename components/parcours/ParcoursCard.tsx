"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Users, 
  Award, 
  BookOpen, 
  ChevronRight,
  Star,
  CheckCircle2,
  Target,
  Sparkles,
  Zap
} from "lucide-react";
import type { Parcours } from "@/types";

interface ParcoursCardProps {
  parcours: Parcours;
  onInscription?: (parcoursId: string) => void;
}

export function ParcoursCard({ parcours, onInscription }: ParcoursCardProps) {
  const handleInscription = () => {
    if (onInscription) {
      onInscription(parcours.id);
    }
  };

  return (
    <Card className="group relative overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 animate-fade-in-up">
      {/* Effet de brillance animé au survol */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-cpu-orange/5 via-transparent to-blue-500/5"></div>
      </div>
      
      {/* Image d'en-tête moderne */}
      <div className="relative h-52 overflow-hidden">
        {/* Gradient overlay animé */}
        <div className={`absolute inset-0 bg-gradient-to-br ${parcours.gradient} opacity-95 group-hover:opacity-100 transition-all duration-500`} />
        
        {/* Image avec effet de zoom */}
        {parcours.image && (
          <img 
            src={parcours.image} 
            alt={parcours.titre}
            className="w-full h-full object-cover mix-blend-overlay group-hover:scale-110 transition-transform duration-700"
          />
        )}
        
        {/* Pattern décoratif */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]"></div>
        
        {/* Badges flottants */}
        <div className="absolute top-4 left-4 flex gap-2 z-10">
          <Badge className="bg-white/95 backdrop-blur-sm text-slate-900 border-0 shadow-lg hover:scale-105 transition-transform">
            <Sparkles className="w-3 h-3 mr-1" />
            {parcours.niveau}
          </Badge>
          {parcours.certifiant && (
            <Badge className="bg-cpu-orange text-white border-0 shadow-lg hover:scale-105 transition-transform">
              <Award className="w-3 h-3 mr-1" />
              Certifiant
            </Badge>
          )}
        </div>
        
        {/* Titre avec effet glassmorphism */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/60 via-black/40 to-transparent backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-white mb-1.5 group-hover:translate-x-1 transition-transform duration-300">
            {parcours.titre}
          </h3>
          <p className="text-white/90 text-sm font-medium">{parcours.sousTitre}</p>
        </div>
        
        {/* Indicateur de progression */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-cpu-orange transition-all duration-300 group-hover:w-full"
            style={{ width: `${parcours.tauxCompletion || 0}%` }}
          ></div>
        </div>
      </div>

      {/* Contenu avec espacement optimisé */}
      <div className="p-6 relative">
        {/* Description */}
        <p className="text-slate-600 mb-5 line-clamp-2 leading-relaxed">{parcours.description}</p>

        {/* Stats avec icônes colorées */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gradient-to-br from-orange-50 to-orange-50/50 group-hover:from-orange-100 group-hover:to-orange-50 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cpu-orange flex items-center justify-center">
              <Clock className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-500 font-medium">Durée</div>
              <div className="text-sm font-bold text-slate-900">{parcours.dureeTotal}h</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gradient-to-br from-blue-50 to-blue-50/50 group-hover:from-blue-100 group-hover:to-blue-50 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-500 font-medium">Cours</div>
              <div className="text-sm font-bold text-slate-900">{parcours.formationsIds.length}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gradient-to-br from-green-50 to-green-50/50 group-hover:from-green-100 group-hover:to-green-50 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-500 font-medium">Inscrits</div>
              <div className="text-sm font-bold text-slate-900">{parcours.nbInscrits || 0}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-gradient-to-br from-yellow-50 to-yellow-50/50 group-hover:from-yellow-100 group-hover:to-yellow-50 transition-colors">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center">
              <Star className="w-4 h-4 text-white fill-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-slate-500 font-medium">Note</div>
              <div className="text-sm font-bold text-slate-900">{parcours.notesMoyenne || 0}/5</div>
            </div>
          </div>
        </div>

        {/* Modules avec style épuré */}
        {parcours.modules && parcours.modules.length > 0 && (
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-50/50">
            <h4 className="font-bold text-slate-900 mb-3 flex items-center gap-2 text-sm">
              <div className="w-6 h-6 rounded-lg bg-cpu-orange flex items-center justify-center">
                <Target className="w-3.5 h-3.5 text-white" />
              </div>
              Modules du parcours
            </h4>
            <div className="space-y-2">
              {parcours.modules.slice(0, 3).map((module) => (
                <div key={module.id} className="flex items-start gap-2.5 text-sm group/item">
                  <CheckCircle2 className="w-4 h-4 text-cpu-orange mt-0.5 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                  <div className="flex-1">
                    <span className="text-slate-700 font-medium group-hover/item:text-cpu-orange transition-colors">{module.titre}</span>
                    <span className="text-slate-500"> · {module.duree}h</span>
                  </div>
                </div>
              ))}
              {parcours.modules.length > 3 && (
                <p className="text-sm text-slate-500 ml-6.5 flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  +{parcours.modules.length - 3} autres modules
                </p>
              )}
            </div>
          </div>
        )}

        {/* Compétences avec design moderne */}
        <div className="mb-6">
          <h4 className="font-semibold text-slate-900 mb-3 text-sm">Compétences développées</h4>
          <div className="flex flex-wrap gap-2">
            {parcours.competences.slice(0, 4).map((comp, idx) => (
              <Badge 
                key={idx} 
                className="bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 border-0 hover:bg-cpu-orange/10 hover:text-cpu-orange transition-all duration-200 px-3 py-1"
              >
                {comp}
              </Badge>
            ))}
            {parcours.competences.length > 4 && (
              <Badge className="bg-gradient-to-r from-slate-100 to-slate-50 text-slate-700 border-0 px-3 py-1">
                +{parcours.competences.length - 4}
              </Badge>
            )}
          </div>
        </div>

        {/* Prix et CTA modernisés */}
        <div className="pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              {parcours.gratuit ? (
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">Gratuit</span>
                  <Sparkles className="w-5 h-5 text-green-500" />
                </div>
              ) : (
                <div>
                  <div className="text-3xl font-bold text-cpu-orange">
                    {parcours.prixMembre?.toLocaleString()} <span className="text-lg">FCFA</span>
                  </div>
                  {parcours.prixPublic && parcours.prixPublic !== parcours.prixMembre && (
                    <div className="text-sm text-slate-500 line-through">
                      {parcours.prixPublic.toLocaleString()} FCFA
                    </div>
                  )}
                </div>
              )}
            </div>
            <Badge className="bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 border-0 px-3 py-1.5">
              {parcours.format}
            </Badge>
          </div>

          <Button 
            onClick={handleInscription}
            className="w-full bg-cpu-orange hover:bg-orange-600 text-white border-0 shadow-lg hover:shadow-xl group/btn py-6 font-semibold text-base shine-effect relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center">
              S'inscrire au parcours
              <ChevronRight className="w-5 h-5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
