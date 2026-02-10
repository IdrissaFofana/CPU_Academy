"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PageBannerButton {
  label: string;
  href: string;
  variant?: "default" | "outline";
  icon?: React.ReactNode;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
  buttons?: PageBannerButton[];
}

export function PageBanner({ title, subtitle, breadcrumb, buttons }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-orange-900 text-white min-h-[70vh]">
      {/* Logo en arrière-plan avec même design que page entreprises */}
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
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-sm text-slate-300">
              {breadcrumb.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.href ? (
                    <a href={item.href} className="hover:text-orange-400 transition-colors">
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

          {/* Buttons */}
          {buttons && buttons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              {buttons.map((button, index) => (
                <Button
                  key={index}
                  asChild
                  size="lg"
                  variant={button.variant || "default"}
                  className={
                    button.variant === "outline"
                      ? "cursor-pointer border-2 border-white bg-white text-slate-900 hover:bg-white hover:text-orange-500 w-full sm:w-auto"
                      : "cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow-xl w-full sm:w-auto"
                  }
                >
                  <Link href={button.href}>
                    {button.icon && <span className="mr-2">{button.icon}</span>}
                    {button.label}
                  </Link>
                </Button>
              ))}
            </div>
          )}

          {/* Footer text */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-sm md:text-base font-semibold text-slate-100 uppercase tracking-wider drop-shadow-md">
              Confédération Patronale Unique des PME de Côte d'Ivoire
            </p>
          </div>
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
