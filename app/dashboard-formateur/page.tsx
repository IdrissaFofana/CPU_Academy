"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  Star,
  TrendingUp,
  DollarSign,
  Calendar,
  MessageCircle,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Upload,
  CheckCircle2,
  Clock,
  Award,
  Target,
} from "lucide-react";
import Link from "next/link";

export default function DashboardFormateurPage() {
  const [activeTab, setActiveTab] = useState<"vue-ensemble" | "formations" | "revenus" | "messages">("vue-ensemble");

  const stats = {
    formations: 12,
    apprenants: 1450,
    notesMoyenne: 4.7,
    revenusMois: 3500000,
    revenusTotal: 24800000,
    tauxCompletion: 87,
    nouveauxInscrits: 145,
    messages: 23,
  };

  const formationsActives = [
    {
      id: 1,
      titre: "Marketing Digital Avancé",
      apprenants: 342,
      progression: 68,
      note: 4.8,
      revenus: 850000,
      statutPublication: "publié",
      derniereMAJ: "02 Feb 2026",
    },
    {
      id: 2,
      titre: "Gestion Financière pour PME",
      apprenants: 289,
      progression: 72,
      note: 4.9,
      revenus: 720000,
      statutPublication: "publié",
      derniereMAJ: "28 Jan 2026",
    },
    {
      id: 3,
      titre: "Leadership et Management",
      apprenants: 456,
      progression: 85,
      note: 4.7,
      revenus: 1140000,
      statutPublication: "publié",
      derniereMAJ: "25 Jan 2026",
    },
    {
      id: 4,
      titre: "E-commerce Stratégique",
      apprenants: 198,
      progression: 45,
      note: 4.6,
      revenus: 495000,
      statutPublication: "brouillon",
      derniereMAJ: "20 Jan 2026",
    },
  ];

  const sessions = [
    {
      id: 1,
      formation: "Marketing Digital Avancé",
      date: "12 Feb 2026",
      heure: "14:00 - 16:00",
      participants: 45,
      type: "Live",
    },
    {
      id: 2,
      formation: "Gestion Financière",
      date: "15 Feb 2026",
      heure: "10:00 - 12:00",
      participants: 38,
      type: "Présentiel",
    },
    {
      id: 3,
      formation: "Leadership",
      date: "18 Feb 2026",
      heure: "15:00 - 17:00",
      participants: 52,
      type: "Live",
    },
  ];

  const messages = [
    {
      id: 1,
      apprenant: "Kouassi Amani",
      formation: "Marketing Digital",
      message: "Question sur le module SEO avancé...",
      date: "Il y a 2h",
      nonLu: true,
    },
    {
      id: 2,
      apprenant: "Adjoua Fatou",
      formation: "Gestion Financière",
      message: "Merci pour votre réponse détaillée...",
      date: "Il y a 5h",
      nonLu: false,
    },
    {
      id: 3,
      apprenant: "Yao Jean",
      formation: "Leadership",
      message: "Besoin d'aide pour l'exercice pratique...",
      date: "Il y a 1j",
      nonLu: true,
    },
  ];

  const revenusParMois = [
    { mois: "Jan", montant: 2800000 },
    { mois: "Fév", montant: 3500000 },
    { mois: "Mar", montant: 3200000 },
    { mois: "Avr", montant: 4100000 },
    { mois: "Mai", montant: 3900000 },
    { mois: "Juin", montant: 4500000 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Dashboard Formateur</h1>
              <p className="text-slate-300 text-lg">
                Bienvenue, Dr. Kouamé Yao
              </p>
            </div>
            <Button className="bg-cpu-orange hover:bg-orange-600 text-white px-6 py-6 text-base">
              <Plus className="w-5 h-5 mr-2" />
              Créer une formation
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 border-2 border-slate-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <Badge className="bg-blue-50 text-blue-700 border-0">+2 ce mois</Badge>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stats.formations}</div>
            <div className="text-sm text-slate-600">Formations actives</div>
          </Card>

          <Card className="p-6 border-2 border-slate-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <Badge className="bg-green-50 text-green-700 border-0">+{stats.nouveauxInscrits}</Badge>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stats.apprenants}</div>
            <div className="text-sm text-slate-600">Apprenants totaux</div>
          </Card>

          <Card className="p-6 border-2 border-slate-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <Badge className="bg-yellow-50 text-yellow-700 border-0">Excellent</Badge>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{stats.notesMoyenne.toFixed(1)}</div>
            <div className="text-sm text-slate-600">Note moyenne</div>
          </Card>

          <Card className="p-6 border-2 border-slate-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-cpu-orange/10 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-cpu-orange" />
              </div>
              <Badge className="bg-green-50 text-green-700 border-0">+15%</Badge>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {(stats.revenusMois / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-slate-600">Revenus ce mois (FCFA)</div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl mb-8 overflow-x-auto">
          <Button
            onClick={() => setActiveTab("vue-ensemble")}
            variant="ghost"
            className={`rounded-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === "vue-ensemble"
                ? "bg-cpu-orange text-white shadow-md"
                : "hover:bg-white text-slate-700"
            }`}
          >
            <Target className="w-4 h-4 mr-2" />
            Vue d'ensemble
          </Button>
          <Button
            onClick={() => setActiveTab("formations")}
            variant="ghost"
            className={`rounded-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === "formations"
                ? "bg-cpu-orange text-white shadow-md"
                : "hover:bg-white text-slate-700"
            }`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Mes formations
          </Button>
          <Button
            onClick={() => setActiveTab("revenus")}
            variant="ghost"
            className={`rounded-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === "revenus"
                ? "bg-cpu-orange text-white shadow-md"
                : "hover:bg-white text-slate-700"
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            Revenus
          </Button>
          <Button
            onClick={() => setActiveTab("messages")}
            variant="ghost"
            className={`rounded-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === "messages"
                ? "bg-cpu-orange text-white shadow-md"
                : "hover:bg-white text-slate-700"
            }`}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Messages
            {messages.filter((m) => m.nonLu).length > 0 && (
              <Badge className="ml-2 bg-red-500 text-white border-0 h-5 w-5 p-0 flex items-center justify-center">
                {messages.filter((m) => m.nonLu).length}
              </Badge>
            )}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vue d'ensemble */}
            {activeTab === "vue-ensemble" && (
              <>
                {/* Formations actives */}
                <Card className="p-8 border-2 border-slate-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-slate-900">Mes formations</h2>
                    <Button variant="outline" asChild>
                      <Link href="#formations">Voir tout</Link>
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {formationsActives.slice(0, 3).map((formation) => (
                      <Card key={formation.id} className="p-6 border-2 border-slate-100 hover:border-cpu-orange transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-lg text-slate-900">{formation.titre}</h3>
                              <Badge
                                className={
                                  formation.statutPublication === "publié"
                                    ? "bg-green-50 text-green-700 border-0"
                                    : "bg-yellow-50 text-yellow-700 border-0"
                                }
                              >
                                {formation.statutPublication}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-600">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {formation.apprenants} apprenants
                              </span>
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                {formation.note}
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                {(formation.revenus / 1000).toFixed(0)}K FCFA
                              </span>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-600">Progression moyenne</span>
                            <span className="font-bold text-cpu-orange">{formation.progression}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2">
                            <div
                              className="bg-cpu-orange h-full rounded-full transition-all duration-500"
                              style={{ width: `${formation.progression}%` }}
                            ></div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>

                {/* Performance */}
                <Card className="p-8 border-2 border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Performance globale</h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <CheckCircle2 className="w-8 h-8 text-blue-600" />
                        <div>
                          <div className="text-3xl font-bold text-blue-900">{stats.tauxCompletion}%</div>
                          <div className="text-sm text-blue-700">Taux de complétion</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="flex items-center gap-3 mb-3">
                        <TrendingUp className="w-8 h-8 text-green-600" />
                        <div>
                          <div className="text-3xl font-bold text-green-900">+24%</div>
                          <div className="text-sm text-green-700">Croissance mensuelle</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}

            {/* Formations */}
            {activeTab === "formations" && (
              <Card className="p-8 border-2 border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Toutes mes formations</h2>
                  <Button className="bg-cpu-orange hover:bg-orange-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle formation
                  </Button>
                </div>

                <div className="space-y-4">
                  {formationsActives.map((formation) => (
                    <Card key={formation.id} className="p-6 border-2 border-slate-100 hover:border-cpu-orange transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-bold text-xl text-slate-900">{formation.titre}</h3>
                            <Badge
                              className={
                                formation.statutPublication === "publié"
                                  ? "bg-green-50 text-green-700 border-0"
                                  : "bg-yellow-50 text-yellow-700 border-0"
                              }
                            >
                              {formation.statutPublication}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <div className="text-sm text-slate-500">Apprenants</div>
                              <div className="text-lg font-bold text-slate-900">{formation.apprenants}</div>
                            </div>
                            <div>
                              <div className="text-sm text-slate-500">Note</div>
                              <div className="text-lg font-bold text-slate-900 flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                {formation.note}
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-slate-500">Revenus</div>
                              <div className="text-lg font-bold text-slate-900">
                                {(formation.revenus / 1000).toFixed(0)}K
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-slate-500">Progression</div>
                              <div className="text-lg font-bold text-slate-900">{formation.progression}%</div>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Aperçu
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Modifier
                            </Button>
                            <Button variant="outline" size="sm">
                              <BarChart3 className="w-4 h-4 mr-2" />
                              Statistiques
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}

            {/* Revenus */}
            {activeTab === "revenus" && (
              <>
                <Card className="p-8 border-2 border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Évolution des revenus</h2>

                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="p-6 bg-gradient-to-br from-cpu-orange/10 to-orange-100 rounded-xl">
                      <div className="text-sm text-cpu-orange mb-1">Ce mois</div>
                      <div className="text-4xl font-bold text-slate-900 mb-2">
                        {(stats.revenusMois / 1000).toFixed(0)}K FCFA
                      </div>
                      <Badge className="bg-green-50 text-green-700 border-0">+15% vs mois dernier</Badge>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                      <div className="text-sm text-blue-700 mb-1">Total</div>
                      <div className="text-4xl font-bold text-slate-900 mb-2">
                        {(stats.revenusTotal / 1000).toFixed(0)}K FCFA
                      </div>
                      <Badge className="bg-blue-50 text-blue-700 border-0">Depuis le début</Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {revenusParMois.map((mois) => {
                      const maxMontant = Math.max(...revenusParMois.map((m) => m.montant));
                      const percentage = (mois.montant / maxMontant) * 100;
                      
                      return (
                        <div key={mois.mois}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-slate-700">{mois.mois}</span>
                            <span className="font-bold text-slate-900">
                              {(mois.montant / 1000).toFixed(0)}K FCFA
                            </span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-cpu-orange to-orange-600 h-full rounded-full transition-all duration-500"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                <Card className="p-8 border-2 border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Revenus par formation</h2>

                  <div className="space-y-4">
                    {formationsActives
                      .sort((a, b) => b.revenus - a.revenus)
                      .map((formation) => (
                        <div key={formation.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-900">{formation.titre}</h3>
                            <p className="text-sm text-slate-600">{formation.apprenants} apprenants</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-cpu-orange">
                              {(formation.revenus / 1000).toFixed(0)}K
                            </div>
                            <div className="text-xs text-slate-500">FCFA</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>
              </>
            )}

            {/* Messages */}
            {activeTab === "messages" && (
              <Card className="p-8 border-2 border-slate-100">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Messages des apprenants</h2>

                <div className="space-y-4">
                  {messages.map((message) => (
                    <Card
                      key={message.id}
                      className={`p-6 border-2 transition-all duration-300 ${
                        message.nonLu ? "border-cpu-orange bg-orange-50" : "border-slate-100"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cpu-orange to-orange-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                          {message.apprenant.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-bold text-slate-900">{message.apprenant}</h3>
                              <p className="text-sm text-slate-600">{message.formation}</p>
                            </div>
                            <div className="text-sm text-slate-500">{message.date}</div>
                          </div>
                          <p className="text-slate-700 mb-4">{message.message}</p>
                          <Button variant="outline" size="sm">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Répondre
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Prochaines sessions */}
            <Card className="p-6 border-2 border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Prochaines sessions</h3>
              </div>

              <div className="space-y-4">
                {sessions.map((session) => (
                  <Card key={session.id} className="p-4 border-2 border-slate-100 hover:border-green-500 transition-all duration-300">
                    <Badge className="bg-green-50 text-green-700 border-0 mb-2">
                      {session.type}
                    </Badge>
                    <h4 className="font-semibold text-slate-900 text-sm mb-2">{session.formation}</h4>
                    <div className="space-y-1 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" />
                        {session.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {session.heure}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        {session.participants} participants
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 border-2 border-slate-100">
              <h3 className="font-bold text-lg text-slate-900 mb-4">Actions rapides</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start hover:bg-cpu-orange hover:text-white hover:border-cpu-orange">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer une formation
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-cpu-orange hover:text-white hover:border-cpu-orange">
                  <Upload className="w-4 h-4 mr-2" />
                  Ajouter du contenu
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-cpu-orange hover:text-white hover:border-cpu-orange">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Voir les statistiques
                </Button>
                <Button variant="outline" className="w-full justify-start hover:bg-cpu-orange hover:text-white hover:border-cpu-orange">
                  <Award className="w-4 h-4 mr-2" />
                  Gérer les certificats
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

