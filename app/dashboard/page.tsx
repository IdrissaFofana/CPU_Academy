"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/layout/Footer";
import { PageBanner } from "@/components/layout/PageBanner";
import {
  BookOpen,
  Award,
  Clock,
  Play,
  CheckCircle2,
  Star,
  Users,
  ChevronRight,
  Search,
  Bell,
  Settings,
  Zap,
  Trophy,
  Grid3x3,
  List,
  LayoutGrid,
  Filter,
  Sparkles,
  Target,
  Calendar,
  AlertCircle,
  TrendingUp,
  Rocket,
} from "lucide-react";
import Link from "next/link";

type ViewMode = "grid" | "list" | "compact";
type FilterStatus = "all" | "in-progress" | "completed" | "upcoming";

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  // Données utilisateur
  const user = {
    name: "Jean Kouassi",
    avatar: "/images/default-avatar.png",
    level: "Apprenant Intermédiaire",
    points: 2840,
    streak: 12,
    completionRate: 68,
  };

  // Last visited course - "Continuer où vous étiez"
  const lastVisitedCourse = {
    id: 1,
    title: "Marketing Digital Avancé",
    instructor: "Dr. Marie Touré",
    progress: 65,
    totalLessons: 24,
    completedLessons: 16,
    currentLesson: "Module 17 : Stratégies SEO avancées",
    thumbnail: "/images/course-1.jpg",
    duration: "8h 30min restantes",
    lastAccessed: "Il y a 2 heures",
  };

  // Formations en cours avec statuts
  const coursesInProgress = [
    {
      id: 1,
      title: "Marketing Digital Avancé",
      instructor: "Dr. Marie Touré",
      progress: 65,
      totalLessons: 24,
      completedLessons: 16,
      nextLesson: "Stratégies SEO avancées",
      thumbnail: "/images/course-1.jpg",
      duration: "8h 30min restantes",
      lastAccessed: "Il y a 2 heures",
      status: "in-progress" as const,
    },
    {
      id: 2,
      title: "Gestion Financière des PME",
      instructor: "Kouadio Yao",
      progress: 42,
      totalLessons: 18,
      completedLessons: 8,
      nextLesson: "Analyse des flux de trésorerie",
      thumbnail: "/images/course-2.jpg",
      duration: "12h 15min restantes",
      lastAccessed: "Il y a 1 jour",
      status: "in-progress" as const,
    },
    {
      id: 3,
      title: "Leadership & Innovation",
      instructor: "Awa Diallo",
      progress: 28,
      totalLessons: 20,
      completedLessons: 6,
      nextLesson: "Communication d'équipe efficace",
      thumbnail: "/images/course-3.jpg",
      duration: "15h 45min restantes",
      lastAccessed: "Il y a 3 jours",
      status: "in-progress" as const,
    },
    {
      id: 4,
      title: "Excel pour Entrepreneurs",
      instructor: "Fatou Ndiaye",
      progress: 100,
      totalLessons: 15,
      completedLessons: 15,
      nextLesson: "Formation terminée",
      thumbnail: "/images/course-4.jpg",
      duration: "Terminée",
      lastAccessed: "Il y a 1 semaine",
      status: "completed" as const,
    },
    {
      id: 5,
      title: "Intelligence Artificielle & Business",
      instructor: "Dr. Kofi Mensah",
      progress: 0,
      totalLessons: 22,
      completedLessons: 0,
      nextLesson: "Début prévu le 20 février",
      thumbnail: "/images/course-5.jpg",
      duration: "Inscription confirmée",
      lastAccessed: "Pas encore démarrée",
      status: "upcoming" as const,
    },
  ];

  // Notifications/Alertes
  const notifications = [
    {
      type: "deadline",
      icon: AlertCircle,
      title: "Examen final dans 3 jours",
      course: "Marketing Digital Avancé",
      time: "15 février 2026",
      urgent: true,
    },
    {
      type: "new-content",
      icon: Sparkles,
      title: "Nouveau module disponible",
      course: "Leadership & Innovation",
      time: "Il y a 2h",
      urgent: false,
    },
    {
      type: "achievement",
      icon: Trophy,
      title: "Badge débloqué : Marathonien",
      course: "10 formations complétées",
      time: "Hier",
      urgent: false,
    },
  ];

  // Activités récentes
  const recentActivities = [
    {
      type: "completed",
      title: "Module complété",
      course: "Marketing Digital Avancé",
      time: "Il y a 2h",
      icon: CheckCircle2,
    },
    {
      type: "certificate",
      title: "Certificat obtenu",
      course: "Excel pour entrepreneurs",
      time: "Hier",
      icon: Award,
    },
    {
      type: "started",
      title: "Nouvelle formation démarrée",
      course: "Leadership & Innovation",
      time: "Il y a 3 jours",
      icon: Play,
    },
  ];

  // Recommandations personnalisées
  const recommendations = [
    {
      id: 1,
      title: "Data Analytics pour Business",
      instructor: "Fatou Ndiaye",
      rating: 4.8,
      students: 1240,
      duration: "6 semaines",
      level: "Intermédiaire",
      price: 85000,
      thumbnail: "/images/rec-1.jpg",
    },
    {
      id: 2,
      title: "E-commerce & Marketplace",
      instructor: "Ibrahim Koné",
      rating: 4.9,
      students: 2150,
      duration: "4 semaines",
      level: "Débutant",
      price: 75000,
      thumbnail: "/images/rec-2.jpg",
    },
    {
      id: 3,
      title: "Gestion de Projet Agile",
      instructor: "Aminata Diop",
      rating: 4.7,
      students: 980,
      duration: "5 semaines",
      level: "Avancé",
      price: 95000,
      thumbnail: "/images/rec-3.jpg",
    },
    {
      id: 4,
      title: "Communication Digitale",
      instructor: "Moussa Traoré",
      rating: 4.6,
      students: 1560,
      duration: "3 semaines",
      level: "Débutant",
      price: 65000,
      thumbnail: "/images/rec-4.jpg",
    },
  ];

  // Statistiques
  const stats = [
    {
      label: "Heures d'apprentissage",
      value: "47h",
      subtext: "+8h cette semaine",
      icon: Clock,
      trend: "+24%",
      color: "text-cpu-orange",
    },
    {
      label: "Formations complétées",
      value: "12",
      subtext: "68% taux de complétion",
      icon: CheckCircle2,
      trend: "+2",
      color: "text-cpu-orange",
    },
    {
      label: "Certifications",
      value: "5",
      subtext: "3 en cours",
      icon: Award,
      trend: "+1",
      color: "text-cpu-orange",
    },
    {
      label: "Série de jours",
      value: `${user.streak}`,
      subtext: "Continuez comme ça!",
      icon: Zap,
      trend: "🔥",
      color: "text-cpu-orange",
    },
  ];

  // Filtrer les formations selon le statut
  const filteredCourses = coursesInProgress.filter((course) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "in-progress") return course.status === "in-progress";
    if (filterStatus === "completed") return course.status === "completed";
    if (filterStatus === "upcoming") return course.status === "upcoming";
    return true;
  });

  // Compter les formations par statut
  const statusCounts = {
    all: coursesInProgress.length,
    "in-progress": coursesInProgress.filter((c) => c.status === "in-progress").length,
    completed: coursesInProgress.filter((c) => c.status === "completed").length,
    upcoming: coursesInProgress.filter((c) => c.status === "upcoming").length,
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* PageBanner identique à celui de la page parcours */}
      <PageBanner
        title="Mon Espace Apprentissage"
        subtitle="Suivez votre progression et continuez votre parcours de formation"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Mon Espace" },
        ]}
        buttons={[
          {
            label: "Explorer les formations",
            href: "/catalogue",
            icon: <Rocket className="h-5 w-5" />,
          },
          {
            label: "Mes certifications",
            href: "/mes-certifications",
            variant: "outline",
            icon: <Award className="h-5 w-5" />,
          },
        ]}
      />

      {/* Contenu principal */}
      <main className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Section hero avec stats */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">
                Bonjour, {user.name.split(" ")[0]}! 👋
              </h1>
              <p className="text-slate-600">
                Prêt à continuer votre parcours d'apprentissage?
              </p>
            </div>
            <Badge className="bg-cpu-orange text-white px-4 py-2 text-sm">
              {user.points} points XP
            </Badge>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <span className="text-xs font-semibold text-green-600">{stat.trend}</span>
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
                  <div className="text-xs text-slate-600 mb-1">{stat.label}</div>
                  <div className="text-xs text-slate-500">{stat.subtext}</div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Formations en cours */}
        <section className="mb-12">
          {/* Continuer où vous étiez - Section spéciale */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Continuer où vous étiez</h2>
            <Card className="overflow-hidden border-2 border-cpu-orange/30 hover:border-cpu-orange transition-all">
              <div className="grid md:grid-cols-3 gap-0">
                {/* Image thumbnail */}
                <div className="relative h-48 md:h-auto bg-gradient-to-br from-slate-200 to-slate-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-slate-400" />
                  </div>
                  <Badge className="absolute top-3 left-3 bg-cpu-orange text-white">
                    {lastVisitedCourse.progress}% terminé
                  </Badge>
                </div>

                {/* Contenu principal */}
                <div className="md:col-span-2 p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {lastVisitedCourse.title}
                      </h3>
                      <p className="text-sm text-slate-600">par {lastVisitedCourse.instructor}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {lastVisitedCourse.lastAccessed}
                    </Badge>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-slate-700 mb-2">
                      <span className="font-semibold">Prochain module :</span>{" "}
                      {lastVisitedCourse.currentLesson}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                      <span>
                        {lastVisitedCourse.completedLessons}/{lastVisitedCourse.totalLessons}{" "}
                        leçons complétées
                      </span>
                      <span>{lastVisitedCourse.duration}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div
                        className="bg-cpu-orange h-3 rounded-full transition-all"
                        style={{ width: `${lastVisitedCourse.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <Button className="w-full md:w-auto bg-cpu-orange hover:bg-orange-600" asChild>
                    <Link href={`/formations/${lastVisitedCourse.id}`}>
                      <Play className="w-4 h-4 mr-2" />
                      Reprendre le cours
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Header avec filtres et view toggles */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Mes formations</h2>
              
              {/* Filtres de statut */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setFilterStatus("all")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === "all"
                      ? "bg-cpu-orange text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Toutes <span className="ml-1 text-xs">({statusCounts.all})</span>
                </button>
                <button
                  onClick={() => setFilterStatus("in-progress")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === "in-progress"
                      ? "bg-cpu-orange text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  En cours <span className="ml-1 text-xs">({statusCounts["in-progress"]})</span>
                </button>
                <button
                  onClick={() => setFilterStatus("completed")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === "completed"
                      ? "bg-cpu-orange text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  Terminées <span className="ml-1 text-xs">({statusCounts.completed})</span>
                </button>
                <button
                  onClick={() => setFilterStatus("upcoming")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === "upcoming"
                      ? "bg-cpu-orange text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  À venir <span className="ml-1 text-xs">({statusCounts.upcoming})</span>
                </button>
              </div>
            </div>

            {/* View toggles - 3 modes */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600 mr-2">Affichage :</span>
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded transition-all ${
                  viewMode === "grid"
                    ? "bg-cpu-orange text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
                title="Grille"
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded transition-all ${
                  viewMode === "list"
                    ? "bg-cpu-orange text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
                title="Liste"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={`p-2 rounded transition-all ${
                  viewMode === "compact"
                    ? "bg-cpu-orange text-white"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
                title="Compact"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Grille des formations avec 3 modes d'affichage */}
          <div
            className={
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                : viewMode === "list"
                ? "space-y-4"
                : "grid md:grid-cols-2 lg:grid-cols-4 gap-4"
            }
          >
            {filteredCourses.map((course) =>
              viewMode === "list" ? (
                // MODE LIST - Horizontal
                <Card
                  key={course.id}
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-row"
                >
                  <div className="relative w-48 flex-shrink-0 bg-gradient-to-br from-slate-200 to-slate-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-slate-400" />
                    </div>
                    <Badge className="absolute top-3 left-3 bg-cpu-orange text-white">
                      {course.progress}%
                    </Badge>
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-cpu-orange transition-colors">
                          {course.title}
                        </h3>
                        <Badge variant="outline" className="ml-2">
                          {course.status === "completed" ? "Terminée" : "En cours"}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">par {course.instructor}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-600 mb-3">
                        <span>
                          {course.completedLessons}/{course.totalLessons} leçons
                        </span>
                        <span>•</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2 mb-3">
                        <div
                          className="bg-cpu-orange h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <Button size="sm" className="w-fit bg-cpu-orange hover:bg-orange-600" asChild>
                      <Link href={`/formations/${course.id}`}>
                        <Play className="w-4 h-4 mr-2" />
                        Reprendre
                      </Link>
                    </Button>
                  </div>
                </Card>
              ) : viewMode === "compact" ? (
                // MODE COMPACT - 4 colonnes minimal
                <Card
                  key={course.id}
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-32 bg-gradient-to-br from-slate-200 to-slate-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-10 h-10 text-slate-400" />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-cpu-orange text-white text-xs">
                      {course.progress}%
                    </Badge>
                  </div>
                  <div className="p-3">
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-cpu-orange transition-colors line-clamp-2 mb-2">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 mb-3 truncate">{course.instructor}</p>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 mb-2">
                      <div
                        className="bg-cpu-orange h-1.5 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full text-xs text-cpu-orange hover:text-orange-600 p-1"
                      asChild
                    >
                      <Link href={`/formations/${course.id}`}>
                        <Play className="w-3 h-3 mr-1" />
                        Reprendre
                      </Link>
                    </Button>
                  </div>
                </Card>
              ) : (
                // MODE GRID - par défaut
                <Card
                  key={course.id}
                  className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-slate-400" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-cpu-orange text-white">{course.progress}%</Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <Button
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 bg-white text-slate-900 hover:bg-slate-100"
                        asChild
                      >
                        <Link href={`/formations/${course.id}`}>
                          <Play className="w-4 h-4 mr-2" />
                          Continuer
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 group-hover:text-cpu-orange transition-colors line-clamp-2 mb-3">
                      {course.title}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">par {course.instructor}</p>
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                        <span>
                          {course.completedLessons}/{course.totalLessons} leçons
                        </span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="bg-cpu-orange h-2 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{course.lastAccessed}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-cpu-orange hover:text-orange-600"
                        asChild
                      >
                        <Link href={`/formations/${course.id}`}>
                          Reprendre
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              )
            )}
          </div>
        </section>

        {/* Section avec 2 colonnes */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Activités récentes */}
          <Card className="lg:col-span-2 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Activités récentes</h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="p-2 bg-cpu-orange/10 rounded-lg">
                      <Icon className="w-5 h-5 text-cpu-orange" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{activity.title}</p>
                      <p className="text-sm text-slate-600">{activity.course}</p>
                      <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <Button variant="outline" className="w-full mt-4">
              Voir tout l'historique
            </Button>
          </Card>

          {/* Objectifs hebdomadaires */}
          <Card className="p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Objectifs de la semaine</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Temps d'étude</span>
                  <span className="text-sm font-bold text-cpu-orange">8/10h</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-cpu-orange h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">Leçons complétées</span>
                  <span className="text-sm font-bold text-cpu-orange">12/15</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div className="bg-cpu-orange h-2 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                  <Trophy className="w-4 h-4 text-cpu-orange" />
                  <span>Série de {user.streak} jours 🔥</span>
                </div>
                <p className="text-xs text-slate-500">
                  Encore 3 jours pour atteindre votre prochain jalon!
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Notifications et alertes */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Alertes & Notifications</h2>
          <div className="space-y-3">
            {notifications.map((notif, index) => {
              const Icon = notif.icon;
              return (
                <Card
                  key={index}
                  className={`p-4 transition-all duration-300 hover:shadow-md ${
                    notif.urgent
                      ? "border-2 border-cpu-orange/50 bg-orange-50"
                      : "border border-slate-200"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg ${
                        notif.urgent ? "bg-cpu-orange/20" : "bg-slate-100"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${notif.urgent ? "text-cpu-orange" : "text-slate-600"}`}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <p className="font-semibold text-slate-900">{notif.title}</p>
                        {notif.urgent && (
                          <Badge className="bg-cpu-orange text-white text-xs">Urgent</Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-1">{notif.course}</p>
                      <p className="text-xs text-slate-500">{notif.time}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recommandations */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-1">
                Recommandé pour vous
              </h2>
              <p className="text-slate-600 text-sm">
                Basé sur vos objectifs et votre parcours
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/catalogue">
                Voir tout le catalogue
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((course) => (
              <Card
                key={course.id}
                className="group hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Thumbnail */}
                <div className="relative h-40 bg-gradient-to-br from-orange-100 to-orange-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-orange-300" />
                  </div>
                  <Badge className="absolute top-3 left-3 bg-white text-slate-900 text-xs">
                    {course.level}
                  </Badge>
                </div>

                {/* Contenu */}
                <div className="p-4">
                  <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-cpu-orange transition-colors">
                    {course.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-3">{course.instructor}</p>

                  <div className="flex items-center gap-4 text-xs text-slate-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-cpu-orange text-cpu-orange" />
                      {course.rating}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {course.students}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <span className="text-lg font-bold text-cpu-orange">
                      {course.price.toLocaleString()} F
                    </span>
                    <Button size="sm" variant="ghost" className="text-cpu-orange">
                      Voir
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
