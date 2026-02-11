"use client";

import { useState, useEffect, useRef } from "react";
import { Users, BookOpen, TrendingUp, Building2 } from "lucide-react";

export function ImpactSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState([0, 0, 0, 0]);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: 10000,
      suffix: "+",
      label: "Apprenants formés",
      description: "Professionnels qui ont suivi nos formations"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      value: 350,
      suffix: "+",
      label: "Formations disponibles",
      description: "Dans tous les secteurs d'activité clés"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: 85,
      suffix: "%",
      label: "Taux d'employabilité",
      description: "De nos apprenants certifiés trouvent un emploi"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      value: 200,
      suffix: "+",
      label: "Entreprises partenaires",
      description: "Qui recrutent nos talents certifiés"
    }
  ];

  const employabilityData = [
    {
      sector: "Numérique & Digital",
      percentage: 92,
      color: "bg-blue-500"
    },
    {
      sector: "Agro-industrie",
      percentage: 78,
      color: "bg-green-500"
    },
    {
      sector: "Commerce & Services",
      percentage: 85,
      color: "bg-purple-500"
    }
  ];

  // Détecter prefers-reduced-motion
  useEffect(() => {
    // Vérifier que window existe (SSR protection)
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    // Si reduced motion, afficher directement les valeurs finales
    if (prefersReducedMotion) {
      setAnimatedValues(stats.map(stat => stat.value));
      return;
    }

    // Tableau pour stocker tous les timers et les nettoyer correctement
    const timers: NodeJS.Timeout[] = [];

    stats.forEach((stat, index) => {
      const duration = 2000;
      const steps = 60;
      const increment = stat.value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const newValue = Math.min(Math.floor(increment * currentStep), stat.value);
        
        setAnimatedValues((prev) => {
          const updated = [...prev];
          updated[index] = newValue;
          return updated;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, duration / steps);

      timers.push(timer);
    });

    // Nettoyage correct de TOUS les timers
    return () => {
      timers.forEach(timer => clearInterval(timer));
    };
  }, [isVisible, prefersReducedMotion]);

  return (
    <section ref={sectionRef} className="py-12 md:py-20 bg-[#f5f1ed]">
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
        {/* Impact en chiffres */}
        <div className="text-center mb-12 animate-slide-down">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
            Notre impact en chiffres
          </h2>
          <p className="text-base text-slate-600 max-w-3xl mx-auto">
            CPU Formation s'engage à former les professionnels et entrepreneurs ivoiriens pour répondre aux besoins du marché du travail.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group bg-white rounded-2xl p-6 border border-slate-200 
                hover:border-cpu-orange-orange/20
                hover:-translate-y-2 hover:scale-105
                transition-all duration-500 cursor-pointer
                animate-scale-in animation-delay-${(index + 1) * 100}`}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cpu-orange/10 to-cpu-green/10 
                  flex items-center justify-center text-cpu-orange
                  group-hover:scale-125 group-hover:rotate-12 group-hover:bg-gradient-to-br 
                  group-hover:from-cpu-orange group-hover:to-cpu-green group-hover:text-white
                  transition-all duration-500 shadow-md">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-slate-900 tabular-nums group-hover:text-cpu-orange transition-colors duration-300">
                  {isVisible ? (
                    <>
                      {animatedValues[index].toLocaleString('fr-FR')}
                      <span className="text-cpu-orange">{stat.suffix}</span>
                    </>
                  ) : (
                    <>0{stat.suffix}</>
                  )}
                </div>
                <div className="font-semibold text-slate-900 text-sm group-hover:text-cpu-orange transition-colors">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Employabilité par filière */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10 animate-fade-in animation-delay-400">
            <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
              Employabilité par filière
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {employabilityData.map((item, index) => (
              <div
                key={index}
                className={`group bg-white rounded-xl p-6 border border-slate-200 
                  hover:border-cpu-orange-orange/10
                  hover:-translate-y-1 hover:scale-102
                  transition-all duration-500 cursor-pointer
                  animate-slide-up animation-delay-${(index + 5) * 100}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 text-sm group-hover:text-cpu-orange transition-colors">
                      {item.sector}
                    </span>
                    <span className="text-2xl font-bold text-slate-900 tabular-nums group-hover:text-cpu-orange transition-colors duration-300">
                      {isVisible ? item.percentage : 0}%
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xs text-slate-600 group-hover:text-slate-700 transition-colors">
                      Taux d'employabilité
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden shadow-inner">
                      <div 
                        className={`h-full ${item.color} rounded-full transition-all duration-[2000ms] ease-out 
                          transform origin-left group-hover:scale-x-105 shadow-lg`}
                        style={{ 
                          width: isVisible ? `${item.percentage}%` : '0%',
                          transitionDelay: `${(index + 5) * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

