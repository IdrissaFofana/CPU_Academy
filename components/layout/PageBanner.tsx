"use client";

import Image from "next/image";

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export function PageBanner({ title, subtitle, breadcrumb }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 text-white py-16 md:py-24">
      {/* Logo en arrière-plan avec overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src="/images/cpu-logo.png"
            alt="CPU-PME.CI"
            width={600}
            height={600}
            className="w-auto h-[70%] object-contain opacity-60"
          />
        </div>
      </div>
      
      {/* Overlay gradient léger pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/30 to-slate-900/50" />
      
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-sm text-slate-300">
              {breadcrumb.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.href ? (
                    <a href={item.href} className="hover:text-cpu-orange transition-colors">
                      {item.label}
                    </a>
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

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-8 drop-shadow-md">
              {subtitle}
            </p>
          )}

          {/* Footer text */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm md:text-base font-semibold text-slate-100 uppercase tracking-wider drop-shadow-md">
              Confédération Patronale Unique des PME de Côte d'Ivoire
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
