"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { certifications } from "@/data/constants";
import { Award, ArrowRight, CheckCircle2, Shield, Star, Trophy } from "lucide-react";

export function CertificationsSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-white via-orange-50/20 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-cpu-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cpu-green/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-8 lg:px-16 relative">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cpu-orange/10 to-cpu-green/10 rounded-full border-2 border-cpu-orange/40 mb-6 animate-fade-in shadow-sm">
            <Trophy className="w-4 h-4 text-cpu-orange" />
            <span className="text-sm font-medium text-slate-900">Certifications professionnelles</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
            Certifications <span className="font-extrabold bg-gradient-to-r from-orange-600 via-orange-500 to-green-600 bg-clip-text text-transparent">reconnues</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Valorisez vos compétences avec des certifications officielles reconnues par les entreprises 
            et validées à l'échelle nationale
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative bg-white rounded-2xl p-6 border border-slate-200 
                hover:border-cpu-orange hover:shadow-2xl hover:shadow-cpu-orange/20
                hover:-translate-y-2 transition-all duration-500 cursor-pointer
                animate-scale-in animation-delay-${(index + 1) * 100}`}
            >
              {/* Badge "Certifié" */}
              <div className="absolute -top-3 -right-3">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-green-500 
                    flex items-center justify-center shadow-lg rotate-12 group-hover:rotate-0 
                    group-hover:scale-110 transition-all duration-500 border-2 border-white">
                    <Shield className="w-8 h-8 text-white drop-shadow-md transition-colors duration-500" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-br from-orange-400/50 to-green-400/50 animate-ping" />
                </div>
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl flex items-center justify-center
                    transition-all duration-500 shadow-lg
                    bg-gradient-to-br from-orange-100 to-green-100 border-2 border-orange-200
                    group-hover:scale-110 group-hover:rotate-3">
                    <Award className="w-12 h-12 text-cpu-orange drop-shadow-sm transition-transform duration-500" />
                  </div>
                  {hoveredCard === index && (
                    <div className="absolute -top-2 -right-2">
                      <Star className="w-6 h-6 text-yellow-500 fill-yellow-400 animate-pulse drop-shadow-lg" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-center text-slate-900 group-hover:text-cpu-orange transition-colors">
                  {cert.nom}
                </h3>
                
                <p className="text-sm text-slate-600 text-center leading-relaxed min-h-[60px]">
                  {cert.description}
                </p>

                {/* Compétences */}
                <div className="space-y-2 pt-4 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    Compétences validées :
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cert.competencesValidees.slice(0, 3).map((comp) => (
                      <Badge 
                        key={comp} 
                        className="text-xs bg-orange-50 text-cpu-orange border border-orange-200 
                          hover:bg-orange-100 transition-colors"
                      >
                        {comp}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cpu-orange/0 to-cpu-green/0 
                group-hover:from-cpu-orange/5 group-hover:to-cpu-green/5 transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 lg:p-16 
          text-white text-center relative overflow-hidden animate-fade-in animation-delay-500">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>

          <div className="relative space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Award className="w-5 h-5 text-cpu-orange" />
              <span className="text-sm font-medium">Certification officielle</span>
            </div>

            <h3 className="text-3xl lg:text-4xl font-bold mb-4">
              Prêt à obtenir votre certification ?
            </h3>
            <p className="text-lg text-orange-200 max-w-2xl mx-auto">
              Rejoignez plus de 5,000 professionnels certifiés et boostez votre carrière avec nos formations reconnues
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                variant="primary" 
                size="lg" 
                className="cursor-pointer shadow-xl group bg-white text-slate-900 hover:bg-orange-50"
                asChild
              >
                <Link href="/certifications">
                  Voir toutes les certifications
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="cursor-pointer bg-white/10 border-white/30 text-white hover:bg-white/20"
                asChild
              >
                <Link href="/faq#contact-form">
                  Nous contacter
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">5,000+</div>
                <div className="text-sm text-orange-200">Certifiés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">95%</div>
                <div className="text-sm text-orange-200">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">100%</div>
                <div className="text-sm text-orange-200">Reconnu</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

