"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, BookOpen, GraduationCap, HelpCircle, Compass } from "lucide-react";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      window.location.href = `/catalogue?q=${encodeURIComponent(searchQuery)}`;
    }
  };
  const popularLinks = [
    {
      title: "Catalogue de formations",
      description: "Explorez nos 350+ formations certifiantes",
      href: "/catalogue",
      icon: BookOpen,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
    },
    {
      title: "Parcours de formation",
      description: "Découvrez nos parcours thématiques",
      href: "/parcours",
      icon: Compass,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      title: "Certifications",
      description: "Obtenez des certifications reconnues",
      href: "/certifications",
      icon: GraduationCap,
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      title: "Centre d'aide",
      description: "Trouvez des réponses à vos questions",
      href: "/support",
      icon: HelpCircle,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-20">
      <div className="max-w-7xl w-full">
        <div className="text-center mb-12">
          {/* Animated 404 Number */}
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-cpu-orange opacity-20 blur-3xl animate-pulse"></div>
            <h1 className="relative text-[180px] md:text-[240px] font-black leading-none text-cpu-orange animate-slide-down">
              404
            </h1>
          </div>

          {/* Error Message */}
          <div className="space-y-4 mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
              Oups ! Page introuvable
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              La page que vous recherchez semble avoir pris des vacances. 
              Mais ne vous inquiétez pas, nous avons plein d'autres ressources à vous proposer !
            </p>
          </div>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-slide-up">
            <Link href="/">
              <Button 
                size="lg" 
                className="cursor-pointer bg-cpu-orange hover:bg-orange-600 text-white font-semibold shadow-xl px-8 py-6 text-lg"
              >
                <Home className="mr-2 h-5 w-5" />
                Retour à l'accueil
              </Button>
            </Link>
            <Link href="/catalogue">
              <Button 
                size="lg" 
                variant="outline"
                className="cursor-pointer border-2 border-slate-300 hover:border-cpu-orange hover:bg-cpu-orange/5 text-slate-900 font-semibold px-8 py-6 text-lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Explorer les formations
              </Button>
            </Link>
          </div>

        </div>

        {/* Popular Links Grid */}
        <div className="max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center animate-fade-in">
            Ou explorez ces sections populaires
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularLinks.map((link, index) => (
              <Link 
                key={link.href} 
                href={link.href}
                className="group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white rounded-xl p-6 border-2 border-slate-100 hover:border-cpu-orange transition-all duration-300 hover:-translate-y-1 h-full animate-slide-up">
                  <div className={`w-14 h-14 rounded-lg ${link.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <link.icon className={`w-7 h-7 ${link.color}`} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 group-hover:text-cpu-orange transition-colors">
                    {link.title}
                  </h4>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {link.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="bg-slate-100 rounded-2xl p-8 max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
              <div className="w-16 h-16 rounded-full bg-cpu-orange/10 flex items-center justify-center flex-shrink-0">
                <HelpCircle className="w-8 h-8 text-cpu-orange" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-slate-900 text-lg mb-2">
                  Besoin d'aide pour trouver quelque chose ?
                </h4>
                <p className="text-slate-600 mb-4">
                  Notre équipe support est là pour vous aider à naviguer sur la plateforme et trouver la formation parfaite pour vous.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/support">
                    <Button 
                      variant="outline" 
                      className="cursor-pointer border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white"
                    >
                      Contacter le support
                    </Button>
                  </Link>
                  <Link href="/faq">
                    <Button 
                      variant="outline"
                      className="cursor-pointer"
                    >
                      Voir la FAQ
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cpu-orange/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-cpu-green/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
}
