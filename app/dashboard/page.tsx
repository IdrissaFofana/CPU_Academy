"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  Target,
  Calendar,
  ChevronRight,
  Play,
  CheckCircle2,
  Star,
  Zap,
  Trophy,
  Brain,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [userData] = useState({
    nom: "Kouassi Amani",
    photo: "/images/default-avatar.png",
    typeMembre: "or",
    formationsEnCours: 3,
    formationsCompletees: 12,
    certificatsObtenus: 8,
    heuresApprentissage: 156,
    joursConsecutifs: 12,
  });

  const [formationsEnCours] = useState([
    {
      id: 1,
      titre: "Marketing Digital Avancé",
      progression: 65,
      duree: "8h restantes",
      prochainModule: "Stratégie SEO",
      image: "/images/formation-1.jpg",
      categorie: "Marketing"
    },
    {
      id: 2,
      titre: "Gestion Financière pour PME",
      progression: 40,
      duree: "12h restantes",
      prochainModule: "Analyse des ratios",
      image: "/images/formation-2.jpg",
      categorie: "Finance"
    },
    {
      id: 3,
      titre: "Leadership et Management",
      progression: 85,
      duree: "3h restantes",
      prochainModule: "Gestion des conflits",
      image: "/images/formation-3.jpg",
      categorie: "Management"
    },
  ]);

  const [prochainesSessions] = useState([
    {
      id: 1,
      titre: "Webinaire: Export en Afrique de l'Ouest",
      date: "15 Feb 2026",
      heure: "14:00",
      formateur: "Dr. Kouamé Yao",
      participants: 45,
    },
    {
      id: 2,
      titre: "Atelier: Pitch Investisseurs",
      date: "18 Feb 2026",
      heure: "10:00",
      formateur: "Mme Adjoua Koffi",
      participants: 28,
    },
  ]);

  const [recommandations] = useState([
    {
      id: 1,
      titre: "Comptabilité et Fiscalité SYSCOHADA",
      niveau: "Intermédiaire",
      duree: "12h",
      note: 4.8,
      prix: 280000,
    },
    {
      id: 2,
      titre: "E-commerce et Marketplace",
      niveau: "Débutant",
      duree: "8h",
      note: 4.9,
      prix: 250000,
    },
  ]);

  const stats = [
    {
      icon: BookOpen,
      label: "Formations actives",
      value: userData.formationsEnCours,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Award,
      label: "Certifications",
      value: userData.certificatsObtenus,
      color: "text-cpu-orange",
      bgColor: "bg-orange-50",
    },
    {
      icon: Clock,
      label: "Heures d'apprentissage",
      value: userData.heuresApprentissage,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Trophy,
      label: "Jours consécutifs",
      value: userData.joursConsecutifs,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={userData.photo}
                  alt={userData.nom}
                  className="w-24 h-24 rounded-full border-4 border-white/20 object-cover"
                />
                <Badge className="absolute -bottom-2 -right-2 bg-cpu-orange border-0 text-white px-3 py-1">
                  Membre {userData.typeMembre.toUpperCase()}
                </Badge>
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Bienvenue, {userData.nom} ! 👋</h1>
                <p className="text-slate-300 text-lg">
                  Continuez votre apprentissage et atteignez vos objectifs
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 lg:px-16 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-xl transition-all duration-300 border-0 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className={`${stat.bgColor} p-4 rounded-xl`}>
                    <Icon className={`w-7 h-7 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Formations en cours */}
            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-cpu-orange to-orange-600 p-2 rounded-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Mes formations en cours</h2>
                </div>
                <Button variant="ghost" asChild>
                  <Link href="/mes-formations">
                    Voir tout
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </Button>
              </div>

              <div className="space-y-4">
                {formationsEnCours.map((formation) => (
                  <Card key={formation.id} className="p-6 border-2 border-slate-100 hover:border-cpu-orange hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-center gap-6">
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 bg-gradient-to-br from-cpu-orange/10 to-blue-500/10">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-cpu-orange" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <Badge className="bg-slate-100 text-slate-700 border-0 mb-2">
                          {formation.categorie}
                        </Badge>
                        <h3 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-cpu-orange transition-colors">
                          {formation.titre}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formation.duree}
                          </span>
                          <span className="text-slate-400">•</span>
                          <span>Prochain: {formation.prochainModule}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600 font-medium">Progression</span>
                            <span className="text-cpu-orange font-bold">{formation.progression}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-cpu-orange to-orange-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${formation.progression}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <Button className="bg-cpu-orange hover:bg-orange-600 text-white border-0">
                        <Play className="w-4 h-4 mr-2" />
                        Continuer
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-8 border-0 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Recommandé pour vous</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {recommandations.map((formation) => (
                  <Card key={formation.id} className="p-5 border-2 border-slate-100 hover:border-purple-500 hover:shadow-lg transition-all duration-300 group">
                    <Badge className="bg-purple-50 text-purple-700 border-0 mb-3">
                      {formation.niveau}
                    </Badge>
                    <h3 className="font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                      {formation.titre}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formation.duree}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {formation.note}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-cpu-orange">
                        {formation.prix.toLocaleString()} <span className="text-base">FCFA</span>
                      </span>
                      <Button variant="outline" size="sm" className="hover:bg-purple-50 hover:text-purple-600 hover:border-purple-500">
                        Voir
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Prochaines sessions */}
            <Card className="p-6 border-0 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Prochaines sessions</h3>
              </div>

              <div className="space-y-4">
                {prochainesSessions.map((session) => (
                  <Card key={session.id} className="p-4 border-2 border-slate-100 hover:border-green-500 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="bg-green-50 px-3 py-2 rounded-lg text-center flex-shrink-0">
                        <div className="text-xs font-semibold text-green-600">
                          {session.date.split(' ')[0]}
                        </div>
                        <div className="text-lg font-bold text-green-700">
                          {session.date.split(' ')[1]}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 text-sm mb-1 line-clamp-2">
                          {session.titre}
                        </h4>
                        <p className="text-xs text-slate-600 mb-2">{session.formateur}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          {session.heure}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Button variant="outline" className="w-full mt-4 hover:bg-green-50 hover:text-green-600 hover:border-green-500">
                <Calendar className="w-4 h-4 mr-2" />
                Voir le calendrier
              </Button>
            </Card>

            {/* Objectifs */}
            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/10 p-2 rounded-lg">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg">Objectifs hebdomadaires</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Temps d'apprentissage</span>
                    <span className="text-sm font-bold">8h / 10h</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-cpu-orange to-orange-600 h-full rounded-full" style={{ width: "80%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Modules complétés</span>
                    <span className="text-sm font-bold">6 / 8</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <span>Série de {userData.joursConsecutifs} jours ! Continue comme ça 🔥</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 border-0 shadow-lg">
              <h3 className="font-bold text-lg text-slate-900 mb-4">Actions rapides</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start hover:bg-cpu-orange hover:text-white hover:border-cpu-orange" asChild>
                  <Link href="/catalogue">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Parcourir le catalogue
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-cpu-orange hover:text-white hover:border-cpu-orange" asChild>
                  <Link href="/mes-certifications">
                    <Award className="w-4 h-4 mr-2" />
                    Mes certifications
                  </Link>
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-cpu-orange hover:text-white hover:border-cpu-orange" asChild>
                  <Link href="/parcours">
                    <Target className="w-4 h-4 mr-2" />
                    Explorer les parcours
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
