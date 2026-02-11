"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Star } from "lucide-react";
import type { FormationRecommandee } from "@/types/dashboard";

interface RecommandationCardProps {
  formation: FormationRecommandee;
}

export function RecommandationCard({ formation }: RecommandationCardProps) {
  return (
    <Card className="p-5 border-2 border-slate-100 hover:border-cpu-orange transition-all duration-300 group">
      <Badge className="bg-orange-50 text-cpu-orange border-0 mb-3">
        {formation.niveau}
      </Badge>
      <h3 className="font-bold text-base text-slate-900 mb-3 group-hover:text-cpu-orange transition-colors line-clamp-2 min-h-[3rem]">
        {formation.titre}
      </h3>
      <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
        <span className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {formation.duree}
        </span>
        <span className="flex items-center gap-1">
          <Star className="w-4 h-4 fill-cpu-orange text-cpu-orange" />
          {formation.note}
        </span>
      </div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl font-bold text-cpu-orange">
          {formation.prix.toLocaleString()}{" "}
          <span className="text-sm">FCFA</span>
        </span>
      </div>
      <Link href={formation.slug ? `/formations/${formation.slug}` : "#"}>
        <Button className="w-full bg-cpu-orange hover:bg-orange-600 text-white">
          Voir détails
        </Button>
      </Link>
    </Card>
  );
}

