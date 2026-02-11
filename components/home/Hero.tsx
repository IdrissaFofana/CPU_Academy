"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface HeroSlide {
  title: string;
  highlight: string;
  description: string;
  primaryButton: { label: string; href: string };
  secondaryButton: { label: string; href: string };
  image: string;
  badge: { icon: string; number: string; text: string; subtext: string };
  trustBadges: Array<{
    icon: "check" | "users" | "building";
    color: string;
    title: string;
    subtitle: string;
  }>;
}

const heroSlides: HeroSlide[] = [
  {
    title: "Formez-vous aux métiers d'avenir avec",
    highlight: "CPU Formation",
    description: "La plateforme de formation professionnelle de la Confédération Patronale Unique des PME de Côte d'Ivoire.",
    primaryButton: { label: "Découvrir nos formations", href: "/catalogue" },
    secondaryButton: { label: "Pour les entreprises", href: "/entreprises" },
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=600",
    badge: { icon: "+", number: "350", text: "Formations disponibles", subtext: "Pour tous les niveaux" },
    trustBadges: [
      { icon: "check", color: "orange", title: "Certifié CPU", subtitle: "Reconnu nationalement" },
      { icon: "users", color: "green", title: "+10,000 apprenants", subtitle: "Déjà formés" },
      { icon: "building", color: "orange", title: "500+ entreprises", subtitle: "Partenaires publics" }
    ]
  },
  {
    title: "Développez les compétences de vos équipes avec",
    highlight: "CPU Formation",
    description: "Solutions sur mesure pour entreprises. Prise en charge FDFP jusqu'à 70%. Formations certifiantes adaptées à vos besoins.",
    primaryButton: { label: "Demander un devis", href: "/entreprises" },
    secondaryButton: { label: "Voir le catalogue", href: "/catalogue" },
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800&h=600",
    badge: { icon: "", number: "70%", text: "Prise en charge FDFP", subtext: "Pour vos formations" },
    trustBadges: [
      { icon: "building", color: "blue", title: "200+ entreprises", subtitle: "Nous font confiance" },
      { icon: "check", color: "green", title: "95% satisfaction", subtitle: "Taux de réussite" },
      { icon: "users", color: "orange", title: "3,500+ collaborateurs", subtitle: "Formés en 2025" }
    ]
  },
  {
    title: "Obtenez une certification reconnue avec",
    highlight: "CPU Formation",
    description: "Certifications professionnelles officielles. Valorisez vos compétences auprès des employeurs. Formations conformes aux standards.",
    primaryButton: { label: "Voir les certifications", href: "/certifications" },
    secondaryButton: { label: "S'inscrire maintenant", href: "/inscription" },
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800&h=600",
    badge: { icon: "+", number: "5,000", text: "Certifications délivrées", subtext: "Reconnues officiellement" },
    trustBadges: [
      { icon: "check", color: "green", title: "Certifications officielles", subtitle: "Reconnues par l'État" },
      { icon: "users", color: "orange", title: "Experts certifiés", subtitle: "Formateurs qualifiés" },
      { icon: "building", color: "blue", title: "Standards ISO", subtitle: "Qualité garantie" }
    ]
  },
  {
    title: "Accélérez votre carrière professionnelle avec",
    highlight: "CPU Formation",
    description: "Parcours personnalisés. Accompagnement individuel. Accès aux formations en ligne et en présentiel. Communauté de 10,000+ apprenants.",
    primaryButton: { label: "Explorer les parcours", href: "/parcours" },
    secondaryButton: { label: "Créer mon compte", href: "/inscription" },
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800&h=600",
    badge: { icon: "", number: "24/7", text: "Accès aux formations", subtext: "À votre rythme" },
    trustBadges: [
      { icon: "users", color: "purple", title: "Communauté active", subtitle: "10,000+ membres" },
      { icon: "check", color: "green", title: "Suivi personnalisé", subtitle: "Coaching inclus" },
      { icon: "building", color: "orange", title: "Réseau professionnel", subtitle: "Opportunités d'emploi" }
    ]
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = heroSlides.length;

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 6000); // Change toutes les 6 secondes

    return () => clearInterval(interval);
  }, [totalSlides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const currentData = heroSlides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white min-h-[70vh]">
      {/* Logo en background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/images/cpu-logo.png"
            alt="CPU Formation Logo"
            width={650}
            height={650}
            className="w-auto h-[70%] object-contain opacity-60"
            priority
          />
        </div>
      </div>
      
      {/* Overlay gradient pour lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-orange-900/50" />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Contenu texte avec animation */}
          <div key={`content-${currentSlide}`} className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {currentData.title} <span className="text-orange-400">{currentData.highlight}</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-lg">
              {currentData.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                asChild 
                className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white font-semibold shadow-xl w-full sm:w-auto"
              >
                <Link href={currentData.primaryButton.href}>
                  {currentData.primaryButton.label} <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="cursor-pointer border-2 border-white bg-white text-slate-900 hover:bg-white hover:text-orange-500 font-semibold w-full sm:w-auto"
              >
                <Link href={currentData.secondaryButton.href}>{currentData.secondaryButton.label}</Link>
              </Button>
            </div>
            
            {/* Badges de confiance dynamiques */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {currentData.trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20">
                  <div className={`w-10 h-10 rounded-full bg-${badge.color}-500 flex items-center justify-center flex-shrink-0`}>
                    {badge.icon === "check" && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                    {badge.icon === "users" && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    )}
                    {badge.icon === "building" && (
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">{badge.title}</div>
                    <div className="text-xs text-slate-300">{badge.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Image avec badge dynamique */}
          <div className="hidden lg:block relative">
            <div key={`image-${currentSlide}`} className="aspect-video rounded-lg overflow-hidden shadow-2xl transform rotate-2 relative h-96 animate-fade-in">
              <Image 
                src={currentData.image}
                alt={`Slide ${currentSlide + 1} - CPU Formation`}
                fill
                className="object-cover"
                priority={currentSlide === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-slate-800 rounded-lg p-4 shadow-lg transform -rotate-3 max-w-xs border border-orange-500/30 animate-fade-in">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {currentData.badge.icon}{currentData.badge.number}
                </div>
                <div className="ml-3">
                  <div className="text-white font-medium text-sm">{currentData.badge.text}</div>
                  <div className="text-xs text-slate-300">{currentData.badge.subtext}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="mt-12 flex justify-center items-center gap-4 relative z-30">
          {/* Arrow Left */}
          <button
            onClick={prevSlide}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md border-2 border-white/40 rounded-full p-3 transition-all hover:scale-110 shadow-lg"
            aria-label="Slide précédent"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Dots */}
          <div className="flex gap-3 bg-slate-800/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all rounded-full ${
                  index === currentSlide
                    ? "w-10 h-3 bg-orange-500 shadow-lg shadow-orange-500/50"
                    : "w-3 h-3 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Arrow Right */}
          <button
            onClick={nextSlide}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md border-2 border-white/40 rounded-full p-3 transition-all hover:scale-110 shadow-lg"
            aria-label="Slide suivant"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
      
      {/* Vague décorative */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
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

