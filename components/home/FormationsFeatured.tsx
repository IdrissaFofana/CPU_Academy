import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, BarChart3, BadgeCheck, Users, CheckCircle2 } from "lucide-react";

export function AboutSection() {
  const features = [
    {
      icon: <Award className="w-5 h-5" />,
      title: "Formations certifiantes",
      description: "Des programmes reconnus"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Formateurs experts",
      description: "Professionnels expérimentés"
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: "Formations pratiques",
      description: "Orientées vers l'action"
    },
    {
      icon: <BadgeCheck className="w-5 h-5" />,
      title: "Certifications reconnues",
      description: "Validées nationalement"
    }
  ];

  return (
    <section id="a-propos" className="py-12 md:py-20 bg-slate-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cpu-orange/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cpu-green/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenu texte */}
          <div className="space-y-8 animate-slide-right">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border border-cpu-orange/20 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-cpu-orange" />
              <span className="text-sm font-medium text-slate-700">Académie certifiée</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              L'académie de formation de référence en Côte d'Ivoire
            </h2>
            
            <div className="space-y-4 text-lg">
              <p className="text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-900">CPU-Académie</span> est une initiative de la <span className="text-cpu-orange font-medium">Confédération Patronale Unique des PME de Côte d'Ivoire (CPU-PMECI)</span>, dédiée au renforcement des compétences des entrepreneurs et professionnels ivoiriens.
              </p>
              
              <p className="text-slate-600 leading-relaxed">
                Notre mission est de proposer des <span className="font-medium text-slate-900">formations de qualité</span>, adaptées aux besoins du marché local, pour favoriser le développement des entreprises et la création d'emplois qualifiés en Côte d'Ivoire.
              </p>
            </div>

            {/* Grille des caractéristiques améliorée */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`group flex items-start gap-4 p-5 bg-white rounded-xl border border-slate-200 
                    hover:border-cpu-orange hover:shadow-lg hover:shadow-cpu-orange/10 
                    transition-all duration-300 cursor-pointer
                    animate-fade-in animation-delay-${(index + 1) * 100}`}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cpu-orange 
                    flex items-center justify-center text-white
                    group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 text-sm mb-1 group-hover:text-cpu-orange transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 animate-fade-in animation-delay-500">
              <Button 
                variant="primary" 
                size="lg" 
                className="cursor-pointer group shadow-lg shadow-cpu-orange/20 hover:shadow-xl hover:shadow-cpu-orange/30 transition-all duration-300" 
                asChild
              >
                <a href="https://cpupme.com/" target="_blank" rel="noopener noreferrer">
                  En savoir plus
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>
          </div>

          {/* Image avec badge améliorée */}
          <div className="relative animate-slide-left animation-delay-200 group">
            {/* Effet de fond décoratif */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cpu-orange/20 to-cpu-green/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-200 group-hover:shadow-3xl transition-all duration-500">
              <div className="relative h-[550px]">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                  alt="Formation professionnelle"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-slate-900/10 to-transparent" />
                
                {/* Overlay interactif */}
                <div className="absolute inset-0 bg-cpu-orange/0 group-hover:bg-cpu-orange/5 transition-colors duration-500" />
              </div>
            </div>
            
            {/* Badge certifications amélioré */}
            <div className="absolute bottom-8 right-8 bg-white rounded-2xl shadow-2xl p-5 
              hover:scale-105 transition-all duration-300 cursor-pointer
              animate-scale-in animation-delay-400
              border border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cpu-orange to-cpu-green 
                  flex items-center justify-center flex-shrink-0 shadow-lg">
                  <BadgeCheck className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-base mb-1">
                    Certifications professionnelles
                  </div>
                  <div className="text-sm text-slate-600">
                    Reconnues à l'échelle nationale
                  </div>
                </div>
              </div>
            </div>

            {/* Statistique flottante */}
            <div className="absolute top-8 left-8 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl px-5 py-3
              hover:scale-105 transition-transform duration-300
              animate-fade-in animation-delay-300">
              <div className="flex items-center gap-3">
                <div className="text-3xl font-bold text-cpu-orange">500+</div>
                <div className="text-sm text-slate-700 leading-tight">
                  Entreprises<br/>formées
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
