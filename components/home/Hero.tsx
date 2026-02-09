"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white py-16 md:py-24 min-h-[60vh]">
      {/* Forme décorative */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cpu-orange opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cpu-green opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="animate-slide-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Formez-vous aux métiers d'avenir avec <span className="text-cpu-orange">CPU-Académie</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              La plateforme de formation professionnelle de la Confédération Patronale Unique des PME de Côte d'Ivoire.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                asChild 
                className="cursor-pointer bg-cpu-orange hover:bg-cpu-orange/90 text-black hover:text-white font-semibold shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300"
              >
                <Link href="/catalogue">
                  Découvrir nos formations <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="cursor-pointer bg-white/10 backdrop-blur-sm text-white border-2 border-white hover:bg-white hover:text-gray-900 font-semibold shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link href="/entreprises">Pour les entreprises</Link>
              </Button>
            </div>
            
            {/* Badges de confiance */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="w-10 h-10 rounded-full bg-cpu-orange flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Certifié CPU</div>
                  <div className="text-xs text-gray-300">Reconnu nationalement</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="w-10 h-10 rounded-full bg-cpu-green flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">+10,000 apprenants</div>
                  <div className="text-xs text-gray-300">Déjà formés</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                <div className="w-10 h-10 rounded-full bg-cpu-orange flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-bold text-white">500+ entreprises</div>
                  <div className="text-xs text-gray-300">Partenaires publics</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl transform rotate-2 relative h-96">
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=600"
                alt="Apprenants en formation CPU-Académie" 
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-lg transform -rotate-3 max-w-xs">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-cpu-orange rounded-full flex items-center justify-center text-white font-bold">
                  +350
                </div>
                <div className="ml-3">
                  <div className="text-gray-900 font-medium">Formations disponibles</div>
                  <div className="text-sm text-gray-500">Pour tous les niveaux</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Icône de validation
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-5 h-5 ${className}`}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
