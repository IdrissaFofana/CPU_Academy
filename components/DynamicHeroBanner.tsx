"use client";

interface DynamicHeroBannerProps {
  position: string;
  title: string;
  subtitle?: string;
}

/**
 * Composant de bannière hero dynamique simplifié
 * Affiche un titre et un sous-titre sur fond dégradé
 */
export function DynamicHeroBanner({ position, title, subtitle }: DynamicHeroBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white py-16 md:py-20">
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-orange-900/50" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 animate-fade-in">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto animate-fade-in-up">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
