"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, ArrowRight, Filter } from "lucide-react";
import Link from "next/link";

export function CalendarSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "Toutes" },
    { id: "ao", label: "Appels d'Offres" },
    { id: "digital", label: "Digital" },
    { id: "finance", label: "Finance" },
    { id: "management", label: "Management" }
  ];

  const upcomingSessions = [
    {
      id: 1,
      title: "Maîtriser les Appels d'Offres Publics",
      category: "ao",
      date: "15 Février 2026",
      time: "09h00 - 17h00",
      duration: "2 jours",
      location: "Abidjan - Plateau",
      mode: "Présentiel",
      instructor: "Dr. Kouassi Yao",
      seats: 12,
      totalSeats: 20,
      price: "150,000 FCFA",
      level: "Intermédiaire"
    },
    {
      id: 2,
      title: "Marketing Digital & Réseaux Sociaux",
      category: "digital",
      date: "20 Février 2026",
      time: "14h00 - 18h00",
      duration: "3 jours",
      location: "En ligne",
      mode: "Distanciel",
      instructor: "Sarah Traoré",
      seats: 5,
      totalSeats: 30,
      price: "120,000 FCFA",
      level: "Débutant"
    },
    {
      id: 3,
      title: "Gestion Financière pour PME",
      category: "finance",
      date: "25 Février 2026",
      time: "09h00 - 17h00",
      duration: "2 jours",
      location: "Abidjan - Cocody",
      mode: "Présentiel",
      instructor: "Mohamed Diallo",
      seats: 8,
      totalSeats: 15,
      price: "180,000 FCFA",
      level: "Avancé"
    },
    {
      id: 4,
      title: "Leadership & Management d'Équipe",
      category: "management",
      date: "1 Mars 2026",
      time: "09h00 - 13h00",
      duration: "3 jours",
      location: "Abidjan - Plateau",
      mode: "Hybride",
      instructor: "Dr. Aminata Koné",
      seats: 10,
      totalSeats: 25,
      price: "200,000 FCFA",
      level: "Intermédiaire"
    }
  ];

  const filteredSessions = selectedCategory === "all" 
    ? upcomingSessions 
    : upcomingSessions.filter(session => session.category === selectedCategory);

  const getLevelColor = (level: string) => {
    switch(level) {
      case "Débutant": return "bg-green-100 text-green-700 border-green-200";
      case "Intermédiaire": return "bg-orange-100 text-orange-700 border-orange-200";
      case "Avancé": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getSeatsColor = (seats: number, total: number) => {
    const percentage = (seats / total) * 100;
    if (percentage <= 30) return "text-red-600";
    if (percentage <= 50) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-8 lg:px-16">
        <div className="text-center mb-16 animate-slide-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cpu-orange/10 to-cpu-green/10 rounded-full border-2 border-cpu-orange/40 mb-6 animate-fade-in shadow-sm">
            <Calendar className="w-4 h-4 text-cpu-orange" />
            <span className="text-sm font-medium text-slate-900">Prochaines sessions</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
            Calendrier des <span className="font-extrabold bg-gradient-to-r from-orange-600 via-orange-500 to-green-600 bg-clip-text text-transparent">formations</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Consultez les prochaines sessions de formation et réservez votre place dès maintenant
          </p>
        </div>

        {/* Filters */}
        <div className="mb-12 animate-fade-in animation-delay-200">
          <div className="max-w-4xl mx-auto">
            {/* Filter Header */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-cpu-orange/30"></div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border-2 border-slate-100 shadow-sm">
                <Filter className="w-4 h-4 text-cpu-orange" />
                <span className="text-sm font-semibold text-slate-700">Filtrer par catégorie</span>
              </div>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-cpu-orange/30"></div>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {categories.map((category, index) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                    ${selectedCategory === category.id
                      ? 'bg-cpu-orange text-white shadow-lg shadow-cpu-orange/30 scale-105'
                      : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-cpu-orange/50 hover:shadow-md hover:scale-105'
                    }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Active indicator */}
                  {selectedCategory === category.id && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                  )}
                  
                  {/* Icon for each category */}
                  <span className="flex items-center gap-2">
                    {category.id === "all" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                    )}
                    {category.id === "ao" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                      </svg>
                    )}
                    {category.id === "digital" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                      </svg>
                    )}
                    {category.id === "finance" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                      </svg>
                    )}
                    {category.id === "management" && (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                      </svg>
                    )}
                    {category.label}
                  </span>
                  
                  {/* Hover effect */}
                  {selectedCategory !== category.id && (
                    <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-cpu-orange/0 to-cpu-green/0 group-hover:from-cpu-orange/5 group-hover:to-cpu-green/5 transition-all duration-300"></span>
                  )}
                </button>
              ))}
            </div>
            
            {/* Results count */}
            <div className="text-center mt-6">
              <p className="text-sm text-slate-600">
                {filteredSessions.length} formation{filteredSessions.length > 1 ? 's' : ''} {selectedCategory === "all" ? "disponible" : "dans cette catégorie"}{filteredSessions.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Sessions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredSessions.map((session, index) => (
            <div
              key={session.id}
              className={`group bg-white rounded-2xl p-8 border border-slate-200 
                hover:border-cpu-orange hover:shadow-2xl hover:shadow-cpu-orange/10
                hover:-translate-y-1 transition-all duration-500
                animate-slide-up animation-delay-${(index + 3) * 100}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cpu-orange transition-colors">
                    {session.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`${getLevelColor(session.level)} text-xs border`}>
                      {session.level}
                    </Badge>
                    <Badge className="bg-slate-100 text-slate-700 text-xs border border-slate-200">
                      {session.mode}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-cpu-orange">{session.price}</div>
                  <div className="text-xs text-slate-500">TTC</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-600">
                  <Calendar className="w-5 h-5 text-cpu-orange flex-shrink-0" />
                  <span className="font-medium">{session.date}</span>
                  <span className="text-slate-400">•</span>
                  <span className="text-sm">{session.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Clock className="w-5 h-5 text-cpu-orange flex-shrink-0" />
                  <span>{session.time}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <MapPin className="w-5 h-5 text-cpu-orange flex-shrink-0" />
                  <span>{session.location}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <Users className="w-5 h-5 text-cpu-orange flex-shrink-0" />
                  <span className={`font-semibold ${getSeatsColor(session.seats, session.totalSeats)}`}>
                    {session.seats} places restantes
                  </span>
                  <span className="text-slate-400">sur {session.totalSeats}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Formateur</div>
                  <div className="text-sm font-semibold text-slate-900">{session.instructor}</div>
                </div>
                <Button 
                  variant="primary" 
                  size="sm"
                  className="cursor-pointer group/btn"
                  asChild
                >
                  <Link href={`/inscription?formation=${session.id}`}>
                    Réserver
                    <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center animate-fade-in animation-delay-600">
          <Button variant="outline" size="lg" className="cursor-pointer" asChild>
            <Link href="/calendrier">
              Voir tout le calendrier
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
