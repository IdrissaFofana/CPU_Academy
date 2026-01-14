"use client";

import { Star, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function TestimonialsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);

  const testimonials = [
    {
      id: 1,
      name: "Kouassi Adjoumani",
      initials: "KA",
      role: "Directeur Général",
      company: "BTP Solutions CI",
      message: "Grâce à la formation sur les appels d'offres, j'ai pu remporter 3 marchés publics en 6 mois. Le retour sur investissement a été immédiat et mes équipes sont maintenant autonomes.",
      formation: "Accès Marchés (AO)"
    },
    {
      id: 2,
      name: "Aïcha Kouamé",
      initials: "AK",
      role: "Directrice Marketing",
      company: "AgriTech Solutions",
      message: "La formation marketplace m'a permis de digitaliser mon commerce. Mon chiffre d'affaires a augmenté de 300% en seulement 6 mois. Je recommande vivement!",
      formation: "Vente & Marketplace"
    },
    {
      id: 3,
      name: "Mohamed Diallo",
      initials: "MD",
      role: "Entrepreneur",
      company: "Tech Innovation CI",
      message: "Le programme Financement & Bancabilité m'a ouvert les portes des banques. J'ai obtenu un prêt de 50 millions FCFA pour développer mon entreprise grâce aux compétences acquises.",
      formation: "Financement & Bancabilité"
    },
    {
      id: 4,
      name: "Fatoumata Traoré",
      initials: "FT",
      role: "Responsable Qualité",
      company: "AgroFood CI",
      message: "La certification Qualité & Normes a transformé notre entreprise. Nous avons obtenu la certification ISO 9001 et nos ventes à l'export ont explosé. Une formation exceptionnelle!",
      formation: "Qualité & Normes"
    },
    {
      id: 5,
      name: "Yao Kouadio",
      initials: "YK",
      role: "Manager Commercial",
      company: "Distribution Plus",
      message: "Formation en Leadership très enrichissante. J'ai appris à mieux gérer mon équipe et les résultats sont visibles : motivation en hausse, turnover en baisse. Merci CPU-Académie!",
      formation: "Leadership & RH"
    },
    {
      id: 6,
      name: "Sarah N'Guessan",
      initials: "SN",
      role: "Consultante",
      company: "Business Consulting",
      message: "Les formations sont vraiment adaptées au contexte ivoirien. Les cas pratiques sont pertinents et les formateurs sont des experts reconnus. Une vraie valeur ajoutée pour ma carrière.",
      formation: "Pilotage & Data"
    }
  ];

  // Dupliquer les témoignages pour un défilement infini
  const allTestimonials = [...testimonials, ...testimonials];

  const scrollToNext = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    // Pause l'animation automatique pendant le défilement manuel
    setIsPaused(true);
    
    scrollContainer.scrollBy({
      left: 416, // largeur carte (400px) + gap (16px)
      behavior: 'smooth'
    });
    
    // Reprendre l'animation après 1 seconde
    setTimeout(() => setIsPaused(false), 1000);
  };

  const scrollToPrev = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    // Pause l'animation automatique pendant le défilement manuel
    setIsPaused(true);
    
    scrollContainer.scrollBy({
      left: -416, // largeur carte (400px) + gap (16px)
      behavior: 'smooth'
    });
    
    // Reprendre l'animation après 1 seconde
    setTimeout(() => setIsPaused(false), 1000);
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollSpeed = 0.5; // Pixels par frame
    let lastTime = performance.now();

    const scroll = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      if (!isPaused && scrollContainer) {
        const currentScroll = scrollContainer.scrollLeft;
        const newScroll = currentScroll + (scrollSpeed * deltaTime / 16);
        
        // Réinitialiser quand on atteint la moitié (car on a dupliqué)
        if (newScroll >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        } else {
          scrollContainer.scrollLeft = newScroll;
        }
      }
      
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    // Pause au survol
    const handleMouseEnter = () => {
      setIsPaused(true);
    };

    const handleMouseLeave = () => {
      setIsPaused(false);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isPaused]);

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-cpu-green/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cpu-orange/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-8 lg:px-16 relative">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cpu-orange/10 to-cpu-green/10 rounded-full border-2 border-cpu-orange/40 mb-6 animate-fade-in shadow-sm">
            <svg className="w-4 h-4 text-cpu-orange" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            <span className="text-sm font-medium text-slate-900">Témoignages</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
            Ce que disent nos <span className="font-extrabold bg-gradient-to-r from-orange-600 via-orange-500 to-green-600 bg-clip-text text-transparent">apprenants</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez les témoignages de professionnels qui ont transformé leur carrière et leur entreprise grâce à nos formations
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={scrollToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 
              bg-white text-slate-900
              w-12 h-12 rounded-full shadow-lg hover:shadow-xl
              flex items-center justify-center transition-all duration-300
              border-2 border-slate-200
              group"
            aria-label="Témoignage précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 
              bg-white text-slate-900
              w-12 h-12 rounded-full shadow-lg hover:shadow-xl
              flex items-center justify-center transition-all duration-300
              border-2 border-slate-200
              group"
            aria-label="Témoignage suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {allTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="group bg-white rounded-2xl p-8 border border-slate-200 
                  hover:border-cpu-orange hover:shadow-xl hover:shadow-cpu-orange/10
                  hover:-translate-y-2 transition-all duration-500 cursor-pointer
                  flex-shrink-0 w-[400px]"
              >
                {/* Header with avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cpu-orange to-cpu-green 
                      flex items-center justify-center text-white font-bold text-xl shadow-lg
                      group-hover:scale-110 transition-transform duration-500">
                      {testimonial.initials}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full">
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 group-hover:text-cpu-orange transition-colors">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                    <p className="text-xs text-cpu-orange font-medium">{testimonial.company}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Message */}
                <p className="text-slate-600 leading-relaxed italic mb-6">
                  "{testimonial.message}"
                </p>

                {/* Formation badge */}
                <div className="pt-4 border-t border-slate-100">
                  <div className="text-xs text-slate-500 mb-1">Formation suivie</div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-cpu-orange/10 to-cpu-green/10 border border-cpu-orange/30">
                    <span className="text-sm font-semibold text-cpu-orange">{testimonial.formation}</span>
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
