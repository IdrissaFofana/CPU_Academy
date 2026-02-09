"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EnhancedFormationCard } from "@/components/catalogue/EnhancedFormationCard";
import { formationsMock } from "@/data/mock";
import { ArrowRight } from "lucide-react";

export function ParcoursSection() {
  // Prendre les 3 premières formations
  const formations = formationsMock.slice(0, 3);

  return (
    <section id="formations" className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
        <div className="flex items-center justify-between mb-8 animate-slide-down">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-2">Formations en tendance</h2>
            <p className="text-base text-gray-600 max-w-3xl">
              Découvrez nos formations les plus populaires, conçues pour répondre aux besoins du marché ivoirien et aux secteurs en forte demande.
            </p>
          </div>
          <Button 
            variant="outline" 
            asChild 
            className="cursor-pointer hidden lg:flex items-center gap-2 border-2 hover:border-cpu-orange hover:text-cpu-orange transition-all duration-200"
          >
            <Link href="/catalogue">
              Voir toutes les formations
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {formations.map((formation, index) => (
            <div key={formation.id} className={`animation-delay-${(index + 1) * 100}`}>
              <EnhancedFormationCard formation={formation} />
            </div>
          ))}
        </div>

        <div className="text-center lg:hidden">
          <Button variant="outline" asChild className="cursor-pointer border-2 hover:border-cpu-orange hover:text-cpu-orange">
            <Link href="/catalogue">
              Voir toutes les formations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
