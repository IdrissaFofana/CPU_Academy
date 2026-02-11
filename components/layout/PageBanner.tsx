"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface TrustBadge {
  icon: "check" | "users" | "building";
  color: string;
  title: string;
  subtitle: string;
}

interface BannerSlide {
  image: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  badge?: {
    icon?: string;
    number: string;
    text: string;
    subtext?: string;
  };
  trustBadges?: TrustBadge[];
  buttons?: Array<{
    label: string;
    href: string;
    variant?: "default" | "outline";
    icon?: React.ReactNode;
  }>;
}

export interface PageBannerProps {
  breadcrumb?: Array<{ label: string; href?: string }>;
  slides: BannerSlide[];
  showLogo?: boolean;
  autoPlayInterval?: number;
}

export function PageBanner({
  breadcrumb,
  slides,
  showLogo = true,
  autoPlayInterval = 6000,
}: PageBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  useEffect(() => {
    if (totalSlides <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [totalSlides, autoPlayInterval]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  const goToSlide = (index: number) => setCurrentSlide(index);

  const currentData = slides[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white min-h-[50vh]">
      {/* Logo en background */}
      {showLogo && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/images/cpu-logo.png"
              alt="CPU Formation Logo"
              width={650}
              height={650}
              className="w-auto h-[50%] object-contain opacity-60"
              priority
            />
          </div>
        </div>
      )}

      {/* Overlay gradient pour lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-orange-900/50" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-6 text-sm text-slate-300">
            {breadcrumb.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.href ? (
                  <Link href={item.href} className="hover:text-orange-400 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-white">{item.label}</span>
                )}
                {index < breadcrumb.length - 1 && (
                  <span className="text-slate-400">/</span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Contenu texte avec animation */}
          <div key={`content-${currentSlide}`} className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
              {currentData.title}
              {currentData.highlight && (
                <span className="text-orange-400"> {currentData.highlight}</span>
              )}
            </h1>
            {currentData.subtitle && (
              <p className="text-lg text-slate-300 mb-6 max-w-lg">
                {currentData.subtitle}
              </p>
            )}

            {/* Buttons */}
            {currentData.buttons && currentData.buttons.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {currentData.buttons.map((button, index) => (
                  <Button
                    key={index}
                    size="lg"
                    asChild
                    variant={button.variant}
                    className={
                      button.variant === "outline"
                        ? "cursor-pointer border-2 border-white bg-white text-slate-900 hover:bg-white hover:text-orange-500 font-semibold w-full sm:w-auto"
                        : "cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white font-semibold shadow-xl w-full sm:w-auto"
                    }
                  >
                    <Link href={button.href}>
                      {button.label}
                      {button.icon && <span className="ml-2">{button.icon}</span>}
                    </Link>
                  </Button>
                ))}
              </div>
            )}

            {/* Badges de confiance dynamiques */}
            {currentData.trustBadges && currentData.trustBadges.length > 0 && (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentData.trustBadges.map((badge, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20"
                  >
                    <div
                      className={`w-10 h-10 rounded-full bg-${badge.color}-500 flex items-center justify-center flex-shrink-0`}
                    >
                      {badge.icon === "check" && (
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {badge.icon === "users" && (
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                        </svg>
                      )}
                      {badge.icon === "building" && (
                        <svg
                          className="w-5 h-5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">
                        {badge.title}
                      </div>
                      <div className="text-xs text-slate-300">
                        {badge.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image avec badge dynamique */}
          <div className="hidden lg:block relative">
            <div
              key={`image-${currentSlide}`}
              className="aspect-video rounded-lg overflow-hidden shadow-2xl transform rotate-2 relative h-64 animate-fade-in"
            >
              <Image
                src={currentData.image}
                alt={`Slide ${currentSlide + 1}`}
                fill
                className="object-cover"
                priority={currentSlide === 0}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {currentData.badge && (
              <Link 
                href={currentData.buttons?.[1]?.href || currentData.buttons?.[0]?.href || "#"}
                className="absolute -bottom-4 -left-4 bg-slate-800 rounded-lg p-4 shadow-lg transform -rotate-3 max-w-xs border border-orange-500/30 animate-fade-in hover:scale-105 hover:border-orange-500 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm group-hover:scale-110 transition-transform">
                      {currentData.badge.icon}
                      {currentData.badge.number}
                    </div>
                    <div className="ml-3">
                      <div className="text-white font-medium text-sm">
                        {currentData.badge.text}
                      </div>
                      <div className="text-xs text-slate-300">
                        {currentData.badge.subtext}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-orange-500 ml-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Navigation Controls */}
        {totalSlides > 1 && (
          <div className="mt-8 flex justify-center items-center gap-4 relative z-30">
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
              {slides.map((_, index) => (
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
        )}
      </div>

      {/* Vague décorative */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

