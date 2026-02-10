"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Play } from "lucide-react";
import type { Formation } from "@/types/dashboard";

interface FormationCardProps {
  formation: Formation;
}

export function FormationCard({ formation }: FormationCardProps) {
  return (
    <Card className="p-6 border-2 border-slate-100 hover:border-cpu-orange hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-8 h-8 text-cpu-orange" />
        </div>
        <div className="flex-1 min-w-0">
          <Badge className="bg-slate-100 text-slate-700 text-xs mb-2">
            {formation.categorie}
          </Badge>
          <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-cpu-orange transition-colors">
            {formation.titre}
          </h3>
          <p className="text-sm text-slate-600">
            <Clock className="w-4 h-4 inline mr-1" />
            {formation.duree} • Prochain: {formation.prochainModule}
          </p>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 font-medium">Progression</span>
          <span className="text-cpu-orange font-bold">{formation.progression}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div
            className="bg-cpu-orange h-full rounded-full"
            style={{ width: `${formation.progression}%` }}
            role="progressbar"
            aria-valuenow={formation.progression}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Progression: ${formation.progression}%`}
          ></div>
        </div>
        <Button className="w-full bg-cpu-orange hover:bg-orange-600 text-white mt-3">
          <Play className="w-4 h-4 mr-2" />
          Continuer la formation
        </Button>
      </div>
    </Card>
  );
}
