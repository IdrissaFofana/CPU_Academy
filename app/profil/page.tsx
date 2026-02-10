"use client";

import { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  BookOpen,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  Download,
  Edit,
  Globe,
  GraduationCap,
  Heart,
  Link2,
  Linkedin,
  Mail,
  MapPin,
  Share2,
  Star,
  Target,
  Trophy,
  Twitter,
  User,
  Zap,
  TrendingUp,
  Flame,
  ChevronRight,
  Settings,
  Briefcase,
  Github,
  Facebook,
} from "lucide-react";

type TabType = "overview" | "courses" | "certificates" | "activity" | "settings";

export default function ProfilPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  // Données utilisateur mock
  const userProfile = {
    name: "Jean Kouassi",
    title: "Entrepreneur & Apprenant Passionné",
    bio: "Entrepreneur ivoirien passionné par le digital et l'innovation. En formation continue pour développer mes compétences en marketing digital, gestion de projet et leadership. Mon objectif : créer des solutions innovantes pour l'Afrique.",
    location: "Abidjan, Côte d'Ivoire",
    memberSince: "Janvier 2024",
    email: "jean.kouassi@example.com",
    phone: "+225 07 XX XX XX XX",
    website: "www.jeankouassi.com",
    linkedin: "linkedin.com/in/jeankouassi",
    twitter: "@jeankouassi",
    avatar: "/images/avatar.jpg",
    coverImage: "/images/profile-cover.jpg",
  };

  const stats = {
    coursesCompleted: 12,
    coursesInProgress: 3,
    totalHours: 147,
    certificates: 8,
    badges: 15,
    streak: 23,
    points: 2840,
    rank: "Expert",
  };

  const coursesInProgress = [
    {
      id: 1,
      title: "Marketing Digital Avancé",
      instructor: "Dr. Marie Touré",
      progress: 65,
      thumbnail: "/images/course-1.jpg",
      category: "Marketing",
      enrolledDate: "15 Jan 2026",
    },
    {
      id: 2,
      title: "Gestion Financière des PME",
      instructor: "Kouadio Yao",
      progress: 42,
      thumbnail: "/images/course-2.jpg",
      category: "Finance",
      enrolledDate: "22 Jan 2026",
    },
    {
      id: 3,
      title: "Leadership & Innovation",
      instructor: "Awa Diallo",
      progress: 28,
      thumbnail: "/images/course-3.jpg",
      category: "Management",
      enrolledDate: "01 Feb 2026",
    },
  ];

  const completedCourses = [
    {
      id: 1,
      title: "Excel pour Entrepreneurs",
      instructor: "Fatou Ndiaye",
      completedDate: "05 Feb 2026",
      rating: 5,
      thumbnail: "/images/course-4.jpg",
      certificate: true,
    },
    {
      id: 2,
      title: "Fondamentaux du E-commerce",
      instructor: "Ibrahim Koné",
      completedDate: "28 Jan 2026",
      rating: 5,
      thumbnail: "/images/course-5.jpg",
      certificate: true,
    },
    {
      id: 3,
      title: "Réseaux Sociaux pour Entreprises",
      instructor: "Aminata Diop",
      completedDate: "20 Jan 2026",
      rating: 4,
      thumbnail: "/images/course-6.jpg",
      certificate: true,
    },
  ];

  const certificates = [
    {
      id: 1,
      title: "Certificat en Marketing Digital",
      issuer: "CPU Academy",
      date: "Février 2026",
      credentialId: "CPU-MD-2026-001234",
      image: "/images/cert-1.jpg",
    },
    {
      id: 2,
      title: "Certificat en Gestion de Projet",
      issuer: "CPU Academy",
      date: "Janvier 2026",
      credentialId: "CPU-GP-2026-005678",
      image: "/images/cert-2.jpg",
    },
    {
      id: 3,
      title: "Certificat en Excel Avancé",
      issuer: "CPU Academy",
      date: "Février 2026",
      credentialId: "CPU-EX-2026-009012",
      image: "/images/cert-3.jpg",
    },
  ];

  const skills = [
    { name: "Marketing Digital", level: 85, courses: 5 },
    { name: "Gestion de Projet", level: 72, courses: 4 },
    { name: "Leadership", level: 68, courses: 3 },
    { name: "Excel", level: 90, courses: 2 },
    { name: "E-commerce", level: 75, courses: 4 },
    { name: "Communication", level: 80, courses: 3 },
  ];

  const badges = [
    { name: "Marathonien", icon: Flame, description: "10 formations terminées", unlocked: true },
    { name: "Assidu", icon: Calendar, description: "30 jours de série", unlocked: true },
    { name: "Expert", icon: Trophy, description: "5 certifications obtenues", unlocked: true },
    { name: "Pionnier", icon: Zap, description: "Premier de la classe", unlocked: true },
    { name: "Mentor", icon: Heart, description: "Aidé 10 apprenants", unlocked: false },
    { name: "Légende", icon: Star, description: "50 formations terminées", unlocked: false },
  ];

  const recentActivity = [
    {
      type: "completed",
      title: "Formation terminée",
      course: "Excel pour Entrepreneurs",
      date: "Il y a 5 jours",
      icon: CheckCircle2,
      color: "text-green-600",
    },
    {
      type: "certificate",
      title: "Certificat obtenu",
      course: "Marketing Digital Avancé",
      date: "Il y a 5 jours",
      icon: Award,
      color: "text-cpu-orange",
    },
    {
      type: "badge",
      title: "Badge débloqué",
      course: "Marathonien - 10 formations",
      date: "Il y a 1 semaine",
      icon: Trophy,
      color: "text-yellow-600",
    },
    {
      type: "started",
      title: "Formation démarrée",
      course: "Leadership & Innovation",
      date: "Il y a 1 semaine",
      icon: BookOpen,
      color: "text-blue-600",
    },
  ];

  const learningGoals = [
    { title: "Obtenir 5 certifications", current: 3, target: 5, deadline: "Mars 2026" },
    { title: "Compléter 15 formations", current: 12, target: 15, deadline: "Juin 2026" },
    { title: "Atteindre 200h d'apprentissage", current: 147, target: 200, deadline: "Mai 2026" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Cover Image & Profile Header */}
      <div className="relative">
        {/* Cover Image */}
        <div className="h-72 bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] bg-repeat"></div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white border border-white/20"
          >
            <Camera className="w-4 h-4 mr-2" />
            Modifier la couverture
          </Button>
        </div>

        {/* Profile Info Card */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <Card className="relative -mt-24 mb-6 shadow-xl border-2 border-slate-100">
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-cpu-orange to-cpu-green flex items-center justify-center text-white font-bold text-5xl shadow-2xl ring-4 ring-white">
                    {userProfile.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <Button
                    size="sm"
                    className="absolute bottom-2 right-2 rounded-full w-10 h-10 p-0 bg-white text-slate-900 border-2 border-slate-200 hover:bg-slate-50"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                  {/* Status indicator */}
                  <div className="absolute top-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-slate-900 mb-2">{userProfile.name}</h1>
                      <p className="text-lg text-slate-600 mb-3">{userProfile.title}</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {userProfile.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Membre depuis {userProfile.memberSince}
                        </span>
                        <Badge className="bg-cpu-orange text-white">
                          <Trophy className="w-3 h-3 mr-1" />
                          {stats.rank}
                        </Badge>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button className="bg-cpu-orange hover:bg-orange-600" asChild>
                        <Link href="/profil/modifier">
                          <Edit className="w-4 h-4 mr-2" />
                          Modifier le profil
                        </Link>
                      </Button>
                      <Button variant="outline">
                        <Share2 className="w-4 h-4 mr-2" />
                        Partager
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                      <div className="flex items-center gap-2 mb-1">
                        <GraduationCap className="w-4 h-4 text-cpu-orange" />
                        <span className="text-xs text-slate-600">Formations</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{stats.coursesCompleted}</p>
                      <p className="text-xs text-slate-500">Terminées</p>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-slate-600">Heures</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{stats.totalHours}h</p>
                      <p className="text-xs text-slate-500">D'apprentissage</p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Award className="w-4 h-4 text-yellow-600" />
                        <span className="text-xs text-slate-600">Certificats</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{stats.certificates}</p>
                      <p className="text-xs text-slate-500">Obtenus</p>
                    </div>

                    <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                      <div className="flex items-center gap-2 mb-1">
                        <Flame className="w-4 h-4 text-red-600" />
                        <span className="text-xs text-slate-600">Série</span>
                      </div>
                      <p className="text-2xl font-bold text-slate-900">{stats.streak}</p>
                      <p className="text-xs text-slate-500">Jours 🔥</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === "overview"
                  ? "border-cpu-orange text-cpu-orange"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              Aperçu
            </button>
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === "courses"
                  ? "border-cpu-orange text-cpu-orange"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              Formations ({stats.coursesInProgress + stats.coursesCompleted})
            </button>
            <button
              onClick={() => setActiveTab("certificates")}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === "certificates"
                  ? "border-cpu-orange text-cpu-orange"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              Certifications ({stats.certificates})
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === "activity"
                  ? "border-cpu-orange text-cpu-orange"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              Activité
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === "settings"
                  ? "border-cpu-orange text-cpu-orange"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
              }`}
            >
              Paramètres
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* About */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">À propos</h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">{userProfile.bio}</p>
              <Button variant="ghost" className="w-full text-cpu-orange hover:text-orange-600">
                Modifier la bio
              </Button>
            </Card>

            {/* Contact Info */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Informations de contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-700">{userProfile.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <a href={`https://${userProfile.website}`} className="text-cpu-orange hover:underline">
                    {userProfile.website}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Linkedin className="w-4 h-4 text-slate-400" />
                  <a href={`https://${userProfile.linkedin}`} className="text-cpu-orange hover:underline">
                    LinkedIn
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Twitter className="w-4 h-4 text-slate-400" />
                  <a href={`https://twitter.com/${userProfile.twitter.replace("@", "")}`} className="text-cpu-orange hover:underline">
                    {userProfile.twitter}
                  </a>
                </div>
              </div>
            </Card>

            {/* Skills */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900">Compétences</h3>
                <Button variant="ghost" size="sm" className="text-cpu-orange">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                      <span className="text-xs text-slate-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-cpu-orange to-orange-600 h-2 rounded-full transition-all"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{skill.courses} formations</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Badges */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Badges & Achievements</h3>
              <div className="grid grid-cols-3 gap-3">
                {badges.map((badge, index) => {
                  const Icon = badge.icon;
                  return (
                    <div
                      key={index}
                      className={`relative group cursor-pointer ${
                        badge.unlocked ? "" : "opacity-40 grayscale"
                      }`}
                    >
                      <div className={`w-full aspect-square rounded-xl flex items-center justify-center ${
                        badge.unlocked
                          ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                          : "bg-slate-200"
                      }`}>
                        <Icon className={`w-8 h-8 ${badge.unlocked ? "text-white" : "text-slate-400"}`} />
                      </div>
                      {badge.unlocked && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        <p className="font-semibold">{badge.name}</p>
                        <p className="text-slate-300">{badge.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href="/badges">
                  Voir tous les badges
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <>
                {/* Learning Goals */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Target className="w-5 h-5 text-cpu-orange" />
                      Objectifs d'apprentissage
                    </h3>
                    <Button variant="ghost" size="sm" className="text-cpu-orange">
                      <Edit className="w-4 h-4 mr-2" />
                      Gérer
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {learningGoals.map((goal, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-slate-900">{goal.title}</h4>
                            <p className="text-sm text-slate-500">Échéance : {goal.deadline}</p>
                          </div>
                          <Badge variant="outline" className="bg-white">
                            {goal.current}/{goal.target}
                          </Badge>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2.5">
                          <div
                            className="bg-cpu-orange h-2.5 rounded-full transition-all"
                            style={{ width: `${(goal.current / goal.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Formations en cours */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900">Formations en cours</h3>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/mes-formations" className="text-cpu-orange">
                        Voir tout
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {coursesInProgress.map((course) => (
                      <Card key={course.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex gap-4">
                          <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center flex-shrink-0">
                            <BookOpen className="w-10 h-10 text-slate-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-slate-900 mb-1">{course.title}</h4>
                                <p className="text-sm text-slate-600">par {course.instructor}</p>
                              </div>
                              <Badge variant="outline">{course.category}</Badge>
                            </div>
                            <div className="mt-3">
                              <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                                <span>Progression</span>
                                <span className="font-semibold text-cpu-orange">{course.progress}%</span>
                              </div>
                              <div className="w-full bg-slate-200 rounded-full h-2">
                                <div
                                  className="bg-cpu-orange h-2 rounded-full"
                                  style={{ width: `${course.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Activité récente</h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const Icon = activity.icon;
                      return (
                        <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                          <div className={`p-2 rounded-lg bg-slate-100 ${activity.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900">{activity.title}</p>
                            <p className="text-sm text-slate-600">{activity.course}</p>
                            <p className="text-xs text-slate-500 mt-1">{activity.date}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </>
            )}

            {/* Courses Tab */}
            {activeTab === "courses" && (
              <>
                {/* En cours */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    Formations en cours ({coursesInProgress.length})
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {coursesInProgress.map((course) => (
                      <Card key={course.id} className="p-4 hover:shadow-lg transition-all group">
                        <div className="w-full h-40 bg-gradient-to-br from-slate-200 to-slate-300 rounded-lg flex items-center justify-center mb-4">
                          <BookOpen className="w-16 h-16 text-slate-400" />
                        </div>
                        <Badge variant="outline" className="mb-2">{course.category}</Badge>
                        <h4 className="font-semibold text-slate-900 mb-2 group-hover:text-cpu-orange transition-colors">
                          {course.title}
                        </h4>
                        <p className="text-sm text-slate-600 mb-3">par {course.instructor}</p>
                        <div className="mb-3">
                          <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                            <span>Progression</span>
                            <span className="font-semibold text-cpu-orange">{course.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                              className="bg-cpu-orange h-2 rounded-full"
                              style={{ width: `${course.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <Button className="w-full bg-cpu-orange hover:bg-orange-600" size="sm" asChild>
                          <Link href={`/formations/${course.id}`}>
                            Continuer
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      </Card>
                    ))}
                  </div>
                </Card>

                {/* Terminées */}
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">
                    Formations terminées ({completedCourses.length})
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {completedCourses.map((course) => (
                      <Card key={course.id} className="p-4 hover:shadow-lg transition-all group">
                        <div className="w-full h-40 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-4 relative">
                          <CheckCircle2 className="w-16 h-16 text-green-600" />
                          {course.certificate && (
                            <Badge className="absolute top-2 right-2 bg-yellow-500 text-white">
                              <Award className="w-3 h-3 mr-1" />
                              Certifié
                            </Badge>
                          )}
                        </div>
                        <h4 className="font-semibold text-slate-900 mb-2">{course.title}</h4>
                        <p className="text-sm text-slate-600 mb-3">par {course.instructor}</p>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-1">
                            {[...Array(course.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className="text-xs text-slate-500">Terminé le {course.completedDate}</span>
                        </div>
                        <Button variant="outline" className="w-full" size="sm" asChild>
                          <Link href={`/formations/${course.id}/certificat`}>
                            <Award className="w-4 h-4 mr-2" />
                            Voir le certificat
                          </Link>
                        </Button>
                      </Card>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {/* Certificates Tab */}
            {activeTab === "certificates" && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900">
                    Mes Certifications ({certificates.length})
                  </h3>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Tout télécharger
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {certificates.map((cert) => (
                    <Card key={cert.id} className="p-6 hover:shadow-xl transition-all group">
                      <div className="w-full h-48 bg-gradient-to-br from-amber-50 to-orange-100 rounded-lg flex items-center justify-center mb-4 border-2 border-amber-200">
                        <Award className="w-20 h-20 text-amber-600" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-2 text-lg">{cert.title}</h4>
                      <p className="text-sm text-slate-600 mb-1">Délivré par {cert.issuer}</p>
                      <p className="text-sm text-slate-600 mb-3">{cert.date}</p>
                      <div className="bg-slate-50 rounded p-2 mb-4">
                        <p className="text-xs text-slate-500">ID de certification</p>
                        <p className="text-xs font-mono text-slate-700">{cert.credentialId}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1 bg-cpu-orange hover:bg-orange-600" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Télécharger
                        </Button>
                        <Button variant="outline" className="flex-1" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Partager
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}

            {/* Activity Tab */}
            {activeTab === "activity" && (
              <Card className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Historique d'activité</h3>
                <div className="space-y-6">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start gap-4 pb-6 border-b border-slate-200 last:border-0">
                        <div className={`p-3 rounded-xl bg-slate-100 ${activity.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 text-lg mb-1">{activity.title}</p>
                          <p className="text-slate-600 mb-2">{activity.course}</p>
                          <p className="text-sm text-slate-500 flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {activity.date}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Informations personnelles</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Nom complet</label>
                        <input
                          type="text"
                          value={userProfile.name}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cpu-orange"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Titre professionnel</label>
                        <input
                          type="text"
                          value={userProfile.title}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cpu-orange"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={userProfile.email}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cpu-orange"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Localisation</label>
                      <input
                        type="text"
                        value={userProfile.location}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cpu-orange"
                      />
                    </div>
                    <Button className="bg-cpu-orange hover:bg-orange-600">
                      Enregistrer les modifications
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Réseaux sociaux</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="URL LinkedIn"
                        value={userProfile.linkedin}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cpu-orange"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Twitter className="w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Nom d'utilisateur Twitter"
                        value={userProfile.twitter}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cpu-orange"
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Site web"
                        value={userProfile.website}
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cpu-orange"
                      />
                    </div>
                    <Button className="bg-cpu-orange hover:bg-orange-600">
                      Enregistrer les modifications
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Préférences de confidentialité</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">Profil public</p>
                        <p className="text-sm text-slate-600">Visible par tous les utilisateurs</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5 text-cpu-orange" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">Afficher mes formations</p>
                        <p className="text-sm text-slate-600">Autres utilisateurs peuvent voir vos formations</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5 text-cpu-orange" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-900">Afficher mes certificats</p>
                        <p className="text-sm text-slate-600">Partagez vos réussites</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5 text-cpu-orange" defaultChecked />
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
