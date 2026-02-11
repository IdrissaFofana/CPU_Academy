"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  TrendingUp,
  Award,
  BookOpen,
  Building2,
  UserPlus,
  Target,
  BarChart3,
  Download,
  FileText,
  Settings,
  CheckCircle2,
  Clock,
  AlertCircle,
  DollarSign,
  Calendar,
  Eye,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

export default function DashboardEntreprisePage() {
  const [activeTab, setActiveTab] = useState<"vue-ensemble" | "collaborateurs" | "formations" | "rapports">("vue-ensemble");

  const statsEntreprise = {
    collaborateursActifs: 145,
    collaborateursTotal: 180,
    formationsEnCours: 324,
    formationsCompletees: 892,
    tauxCompletion: 74,
    budgetUtilise: 18500000,
    budgetTotal: 25000000,
    certificatsObtenus: 152,
  };

  const collaborateurs = [
    {
      id: 1,
      nom: "Kouassi Amani",
      poste: "Responsable Marketing",
      departement: "Marketing",
      formationsEnCours: 3,
      formationsCompletees: 8,
      progression: 68,
      dernierAcces: "Il y a 2h",
      statut: "actif",
    },
    {
      id: 2,
      nom: "Adjoua Fatou",
      poste: "Comptable",
      departement: "Finance",
      formationsEnCours: 2,
      formationsCompletees: 12,
      progression: 85,
      dernierAcces: "Il y a 1j",
      statut: "actif",
    },
    {
      id: 3,
      nom: "Yao Jean",
      poste: "Chef de projet",
      departement: "Operations",
      formationsEnCours: 1,
      formationsCompletees: 5,
      progression: 45,
      dernierAcces: "Il y a 3j",
      statut: "inactif",
    },
    {
      id: 4,
      nom: "N'Guessan Marie",
      poste: "RH Manager",
      departement: "Ressources Humaines",
      formationsEnCours: 4,
      formationsCompletees: 15,
      progression: 92,
      dernierAcces: "Il y a 1h",
      statut: "actif",
    },
  ];

  const formationsAssignees = [
    {
      id: 1,
      titre: "Marketing Digital Avancé",
      inscrits: 42,
      completes: 28,
      enCours: 14,
      tauxCompletion: 67,
      departements: ["Marketing", "Communication"],
    },
    {
      id: 2,
      titre: "Gestion Financière",
      inscrits: 35,
      completes: 30,
      enCours: 5,
      tauxCompletion: 86,
      departements: ["Finance", "Comptabilité"],
    },
    {
      id: 3,
      titre: "Leadership & Management",
      inscrits: 28,
      completes: 18,
      enCours: 10,
      tauxCompletion: 64,
      departements: ["Management", "RH"],
    },
  ];

  const departements = [
    { nom: "Marketing", collaborateurs: 35, progression: 72 },
    { nom: "Finance", collaborateurs: 28, progression: 85 },
    { nom: "Operations", collaborateurs: 42, progression: 68 },
    { nom: "RH", collaborateurs: 25, progression: 78 },
    { nom: "IT", collaborateurs: 30, progression: 81 },
    { nom: "Ventes", collaborateurs: 20, progression: 65 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                <Building2 className="w-10 h-10" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Dashboard Entreprise</h1>
                <p className="text-slate-300 text-lg">
                  ABC Corporation - Gestion des formations
                </p>
              </div>
            </div>
            <Button className="bg-cpu-orange hover:bg-orange-600 text-white px-6 py-6 text-base">
              <UserPlus className="w-5 h-5 mr-2" />
              Ajouter un collaborateur
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 lg:px-16 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 border-2 border-slate-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <Badge className="bg-blue-50 text-blue-700 border-0">
                {statsEntreprise.collaborateursActifs}/{statsEntreprise.collaborateursTotal}
              </Badge>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{statsEntreprise.collaborateursActifs}</div>
            <div className="text-sm text-slate-600">Collaborateurs actifs</div>
          </Card>

          <Card className="p-6 border-2 border-slate-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-50 p-3 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <Badge className="bg-green-50 text-green-700 border-0">{statsEntreprise.tauxCompletion}%</Badge>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{statsEntreprise.formationsCompletees}</div>
            <div className="text-sm text-slate-600">Formations complétées</div>
          </Card>

          <Card className="p-6 border-2 border-slate-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <Badge className="bg-yellow-50 text-yellow-700 border-0">+15 ce mois</Badge>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">{statsEntreprise.certificatsObtenus}</div>
            <div className="text-sm text-slate-600">Certificats obtenus</div>
          </Card>

          <Card className="p-6 border-2 border-slate-100 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-cpu-orange/10 p-3 rounded-lg">
                <DollarSign className="w-6 h-6 text-cpu-orange" />
              </div>
              <Badge className="bg-slate-100 text-slate-700 border-0">
                {Math.round((statsEntreprise.budgetUtilise / statsEntreprise.budgetTotal) * 100)}%
              </Badge>
            </div>
            <div className="text-3xl font-bold text-slate-900 mb-1">
              {(statsEntreprise.budgetUtilise / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-slate-600">Budget utilisé (FCFA)</div>
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
            onClick={() => setActiveTab("collaborateurs")}
            variant="ghost"
            className={`rounded-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === "collaborateurs"
                ? "bg-cpu-orange text-white shadow-md"
                : "hover:bg-white text-slate-700"
            }`}
          >
            <Users className="w-4 h-4 mr-2" />
            Collaborateurs
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
            Formations
          </Button>
          <Button
            onClick={() => setActiveTab("rapports")}
            variant="ghost"
            className={`rounded-lg transition-all duration-200 whitespace-nowrap ${
              activeTab === "rapports"
                ? "bg-cpu-orange text-white shadow-md"
                : "hover:bg-white text-slate-700"
            }`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Rapports
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vue d'ensemble */}
            {activeTab === "vue-ensemble" && (
              <>
                {/* Performance par département */}
                <Card className="p-8 border-2 border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Performance par département</h2>

                  <div className="space-y-4">
                    {departements.map((dept) => (
                      <div key={dept.nom} className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-bold text-slate-900">{dept.nom}</h3>
                            <p className="text-sm text-slate-600">{dept.collaborateurs} collaborateurs</p>
                          </div>
                          <Badge
                            className={`border-0 ${
                              dept.progression >= 80
                                ? "bg-green-50 text-green-700"
                                : dept.progression >= 60
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-red-50 text-red-700"
                            }`}
                          >
                            {dept.progression}%
                          </Badge>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              dept.progression >= 80
                                ? "bg-green-500"
                                : dept.progression >= 60
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${dept.progression}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Formations assignées */}
                <Card className="p-8 border-2 border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Formations en cours</h2>

                  <div className="space-y-4">
                    {formationsAssignees.map((formation) => (
                      <Card key={formation.id} className="p-6 border-2 border-slate-100 hover:border-cpu-orange transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-bold text-lg text-slate-900 mb-2">{formation.titre}</h3>
                            <div className="flex flex-wrap gap-2">
                              {formation.departements.map((dept) => (
                                <Badge key={dept} className="bg-slate-100 text-slate-700 border-0 text-xs">
                                  {dept}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Badge
                            className={`border-0 ${
                              formation.tauxCompletion >= 70
                                ? "bg-green-50 text-green-700"
                                : "bg-yellow-50 text-yellow-700"
                            }`}
                          >
                            {formation.tauxCompletion}%
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="text-sm text-slate-500">Inscrits</div>
                            <div className="text-2xl font-bold text-slate-900">{formation.inscrits}</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">En cours</div>
                            <div className="text-2xl font-bold text-blue-600">{formation.enCours}</div>
                          </div>
                          <div>
                            <div className="text-sm text-slate-500">Complétés</div>
                            <div className="text-2xl font-bold text-green-600">{formation.completes}</div>
                          </div>
                        </div>

                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className="bg-cpu-orange h-full rounded-full transition-all duration-500"
                            style={{ width: `${formation.tauxCompletion}%` }}
                          ></div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {/* Collaborateurs */}
            {activeTab === "collaborateurs" && (
              <Card className="p-8 border-2 border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Tous les collaborateurs</h2>
                  <Button className="bg-cpu-orange hover:bg-orange-600 text-white">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>

                <div className="space-y-4">
                  {collaborateurs.map((collab) => (
                    <Card key={collab.id} className="p-6 border-2 border-slate-100 hover:border-cpu-orange transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cpu-orange to-orange-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                          {collab.nom.charAt(0)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="font-bold text-lg text-slate-900">{collab.nom}</h3>
                              <p className="text-sm text-slate-600">{collab.poste}</p>
                              <Badge className="mt-2 bg-blue-50 text-blue-700 border-0 text-xs">
                                {collab.departement}
                              </Badge>
                            </div>
                            <Badge
                              className={`border-0 ${
                                collab.statut === "actif"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {collab.statut}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                              <div className="text-xs text-slate-500">En cours</div>
                              <div className="text-lg font-bold text-blue-600">{collab.formationsEnCours}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500">Complétées</div>
                              <div className="text-lg font-bold text-green-600">{collab.formationsCompletees}</div>
                            </div>
                            <div>
                              <div className="text-xs text-slate-500">Progression</div>
                              <div className="text-lg font-bold text-cpu-orange">{collab.progression}%</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {collab.dernierAcces}
                            </span>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                Voir
                              </Button>
                              <Button variant="outline" size="sm">
                                <BookOpen className="w-4 h-4 mr-1" />
                                Assigner formation
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}

            {/* Formations */}
            {activeTab === "formations" && (
              <Card className="p-8 border-2 border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-slate-900">Formations disponibles</h2>
                  <Button variant="outline" asChild>
                    <Link href="/catalogue">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Parcourir le catalogue
                    </Link>
                  </Button>
                </div>

                <div className="space-y-4">
                  {formationsAssignees.map((formation) => (
                    <Card key={formation.id} className="p-6 border-2 border-slate-100">
                      <h3 className="font-bold text-xl text-slate-900 mb-4">{formation.titre}</h3>

                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div className="p-4 bg-blue-50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-700">{formation.inscrits}</div>
                          <div className="text-xs text-blue-600">Inscrits</div>
                        </div>
                        <div className="p-4 bg-yellow-50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-yellow-700">{formation.enCours}</div>
                          <div className="text-xs text-yellow-600">En cours</div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-700">{formation.completes}</div>
                          <div className="text-xs text-green-600">Complétés</div>
                        </div>
                        <div className="p-4 bg-cpu-orange/10 rounded-lg text-center">
                          <div className="text-2xl font-bold text-cpu-orange">{formation.tauxCompletion}%</div>
                          <div className="text-xs text-cpu-orange">Complétion</div>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" className="flex-1">
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Statistiques
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <UserPlus className="w-4 h-4 mr-2" />
                          Assigner
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            )}

            {/* Rapports */}
            {activeTab === "rapports" && (
              <>
                <Card className="p-8 border-2 border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Utilisation du budget</h2>

                  <div className="p-6 bg-gradient-to-br from-cpu-orange/10 to-orange-50 rounded-xl mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-slate-600 mb-1">Budget utilisé</div>
                        <div className="text-4xl font-bold text-slate-900">
                          {(statsEntreprise.budgetUtilise / 1000000).toFixed(1)}M FCFA
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-slate-600 mb-1">Sur un total de</div>
                        <div className="text-2xl font-bold text-slate-700">
                          {(statsEntreprise.budgetTotal / 1000000).toFixed(1)}M FCFA
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-white rounded-full h-4">
                      <div
                        className="bg-gradient-to-r from-cpu-orange to-orange-600 h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(statsEntreprise.budgetUtilise / statsEntreprise.budgetTotal) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <FileText className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Rapport mensuel</div>
                        <div className="text-xs text-slate-500">Activité du mois</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <BarChart3 className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Rapport ROI</div>
                        <div className="text-xs text-slate-500">Retour sur investissement</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <Users className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Rapport collaborateurs</div>
                        <div className="text-xs text-slate-500">Performance individuelle</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="justify-start h-auto p-4">
                      <Award className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Rapport certifications</div>
                        <div className="text-xs text-slate-500">Certifications obtenues</div>
                      </div>
                    </Button>
                  </div>
                </Card>

                <Card className="p-8 border-2 border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Actions rapides</h2>

                  <div className="space-y-3">
                    <Button className="w-full bg-cpu-orange hover:bg-orange-600 text-white justify-start h-auto p-4">
                      <Download className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Exporter tous les rapports</div>
                        <div className="text-xs opacity-90">Format PDF et Excel</div>
                      </div>
                    </Button>
                    <Button variant="outline" className="w-full justify-start h-auto p-4">
                      <Calendar className="w-5 h-5 mr-3" />
                      <div className="text-left">
                        <div className="font-semibold">Programmer un rapport automatique</div>
                        <div className="text-xs text-slate-500">Envoi mensuel par email</div>
                      </div>
                    </Button>
                  </div>
                </Card>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Alertes */}
            <Card className="p-6 border-2 border-slate-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-2 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Alertes</h3>
              </div>

              <div className="space-y-4">
                <Card className="p-4 border-2 border-yellow-200 bg-yellow-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-sm text-yellow-900 mb-1">
                        15 collaborateurs inactifs
                      </h4>
                      <p className="text-xs text-yellow-700">
                        N'ont pas accédé à leur formation depuis plus de 7 jours
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 border-2 border-red-200 bg-red-50">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-sm text-red-900 mb-1">
                        Budget à 74%
                      </h4>
                      <p className="text-xs text-red-700">
                        6.5M FCFA restants pour le trimestre
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>

            {/* Quick Stats */}
            <Card className="p-6 border-2 border-slate-100">
              <h3 className="font-bold text-lg text-slate-900 mb-4">Statistiques rapides</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-sm font-medium text-green-900">Taux de complétion</span>
                  <span className="text-xl font-bold text-green-600">{statsEntreprise.tauxCompletion}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-sm font-medium text-blue-900">Formations en cours</span>
                  <span className="text-xl font-bold text-blue-600">{statsEntreprise.formationsEnCours}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-sm font-medium text-yellow-900">Certificats</span>
                  <span className="text-xl font-bold text-yellow-600">{statsEntreprise.certificatsObtenus}</span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-6 border-2 border-slate-100">
              <h3 className="font-bold text-lg text-slate-900 mb-4">Actions rapides</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Ajouter collaborateur
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Assigner formation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Exporter rapport
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Paramètres
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

