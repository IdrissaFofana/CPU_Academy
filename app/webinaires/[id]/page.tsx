"use client";

import { use, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageBanner } from "@/components/layout/PageBanner";
import {
  Video,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  Sparkles,
  Play,
  CheckCircle2,
  ArrowLeft,
  Download,
  Share2,
  BookOpen,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { webinairesMock } from "@/data/mock";
import { notFound } from "next/navigation";

export default function WebinairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const webinaire = webinairesMock.find((w) => w.id === id);

  const [activeTab, setActiveTab] = useState<"apercu" | "programme" | "ressources">("apercu");

  if (!webinaire) {
    notFound();
  }

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "live":
        return (
          <Badge className="bg-red-500 text-white border-0 animate-pulse text-base px-4 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            EN DIRECT
          </Badge>
        );
      case "a-venir":
        return (
          <Badge className="bg-blue-500 text-white border-0 text-base px-4 py-2">
            <Calendar className="w-4 h-4 mr-2" />
            À VENIR
          </Badge>
        );
      case "termine":
        return (
          <Badge className="bg-green-600 text-white border-0 text-base px-4 py-2">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            REPLAY DISPONIBLE
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(dateObj);
  };

  return (
    <>
      <PageBanner
        title={webinaire.titre}
        subtitle={webinaire.description}
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Webinaires", href: "/webinaires" },
          { label: webinaire.titre }
        ]}
      />

      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl py-8">
            {/* Bouton retour */}
            <Link href="/webinaires">
              <Button variant="ghost" className="mb-8">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour aux webinaires
              </Button>
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contenu principal */}
              <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              {getStatusBadge(webinaire.statut)}
              <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-4">
                {webinaire.titre}
              </h1>
              <p className="text-xl text-slate-600">{webinaire.description}</p>
            </div>

            {/* Video / Image */}
            <Card className="p-0 overflow-hidden">
              {webinaire.statut === "live" || (webinaire.statut === "termine" && webinaire.replay) ? (
                <div className="relative aspect-video bg-slate-900">
                  <img
                    src={webinaire.thumbnail}
                    alt={webinaire.titre}
                    className="w-full h-full object-cover opacity-50"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      className={`${
                        webinaire.statut === "live"
                          ? "bg-red-500 hover:bg-red-600 animate-pulse"
                          : "bg-cpu-orange hover:bg-cpu-orange/90"
                      } text-white px-8 py-6 text-lg`}
                    >
                      {webinaire.statut === "live" ? (
                        <>
                          <Video className="w-6 h-6 mr-3" />
                          Rejoindre le live
                        </>
                      ) : (
                        <>
                          <Play className="w-6 h-6 mr-3" />
                          Lire le replay ({webinaire.replay?.duree} min)
                        </>
                      )}
                    </Button>
                  </div>
                  {webinaire.statut === "live" && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500 text-white border-0 text-sm px-3 py-1 animate-pulse">
                        <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse" />
                        EN DIRECT
                      </Badge>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video">
                  <img
                    src={webinaire.thumbnail}
                    alt={webinaire.titre}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </Card>

            {/* Tabs */}
            <div className="border-b border-slate-200">
              <div className="flex gap-6">
                {["apercu", "programme", "ressources"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`pb-4 px-2 font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? "border-b-2 border-cpu-orange text-cpu-orange"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            {activeTab === "apercu" && (
              <Card className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  À propos de ce webinaire
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Public cible</h4>
                    <p className="text-slate-700">{webinaire.publicCible}</p>
                  </div>

                  {webinaire.prerequis && webinaire.prerequis.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Prérequis</h4>
                      <ul className="space-y-2">
                        {webinaire.prerequis.map((prereq, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-700">{prereq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-8 border-t border-slate-200">
                  <h4 className="text-xl font-bold text-slate-900 mb-4">
                    Formateur
                  </h4>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-cpu-orange flex items-center justify-center text-white font-bold text-2xl">
                      {webinaire.formateur.nom.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-lg text-slate-900">
                        {webinaire.formateur.nom} {webinaire.formateur.prenom}
                      </p>
                      <p className="text-slate-600 mb-2">
                        Expert en {webinaire.formateur.domaines[0]}
                      </p>
                      <p className="text-slate-700">
                        {webinaire.formateur.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {activeTab === "programme" && (
              <Card className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Programme détaillé
                </h3>
                <div className="space-y-6">
                  {webinaire.programme.map((section, idx) => (
                    <div
                      key={idx}
                      className="border-l-4 border-cpu-orange pl-6"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-cpu-orange text-white flex items-center justify-center font-bold">
                          {idx + 1}
                        </div>
                        <div>
                          <p className="font-bold text-lg text-slate-900">
                            {section.titre}
                          </p>
                          <p className="text-slate-600 text-sm">
                            {section.temps}
                          </p>
                        </div>
                      </div>
                      <p className="text-slate-700">{section.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {activeTab === "ressources" && (
              <Card className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">
                  Ressources disponibles
                </h3>
                {webinaire.ressources && webinaire.ressources.length > 0 ? (
                  <div className="space-y-4">
                    {webinaire.ressources.map((ressource, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-cpu-orange transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {ressource.type === "pdf" ? (
                            <FileText className="w-5 h-5 text-red-500" />
                          ) : (
                            <BookOpen className="w-5 h-5 text-blue-500" />
                          )}
                          <div>
                            <p className="font-medium text-slate-900">
                              {ressource.titre}
                            </p>
                            <p className="text-sm text-slate-600">
                              {ressource.type === "pdf" ? "Document PDF" : "Lien externe"}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-cpu-orange hover:text-white"
                          onClick={() => window.open(ressource.url, "_blank")}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          {ressource.type === "pdf" ? "Télécharger" : "Ouvrir"}
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-600 text-center py-8">
                    Les ressources seront disponibles après le webinaire
                  </p>
                )}
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Infos clés */}
            <Card className="p-6 sticky top-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-slate-700">
                  <Calendar className="w-5 h-5 text-cpu-orange" />
                  <div>
                    <p className="text-sm text-slate-600">Date</p>
                    <p className="font-semibold">
                      {formatDate(webinaire.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Clock className="w-5 h-5 text-cpu-orange" />
                  <div>
                    <p className="text-sm text-slate-600">Durée</p>
                    <p className="font-semibold">{webinaire.duree} minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <Users className="w-5 h-5 text-cpu-orange" />
                  <div>
                    <p className="text-sm text-slate-600">Inscrits</p>
                    <p className="font-semibold">{webinaire.inscrits} participants</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-slate-700">
                  <TrendingUp className="w-5 h-5 text-cpu-orange" />
                  <div>
                    <p className="text-sm text-slate-600">Accès</p>
                    <p className="font-semibold capitalize">
                      {webinaire.gratuit ? "Gratuit" : `${webinaire.prix} FCFA`}
                    </p>
                  </div>
                </div>
              </div>

              <Button
                className={`w-full mb-3 ${
                  webinaire.statut === "live"
                    ? "bg-red-500 hover:bg-red-600 animate-pulse"
                    : "bg-cpu-orange hover:bg-cpu-orange/90"
                } text-white`}
              >
                {webinaire.statut === "live" ? (
                  <>
                    <Video className="w-4 h-4 mr-2" />
                    Rejoindre maintenant
                  </>
                ) : webinaire.statut === "a-venir" ? (
                  <>
                    <Calendar className="w-4 h-4 mr-2" />
                    M'inscrire gratuitement
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Voir le replay
                  </>
                )}
              </Button>

              <Button variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Partager
              </Button>

              {webinaire.statut === "termine" && webinaire.replay && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <p className="text-sm text-slate-600 mb-2">
                    <CheckCircle2 className="w-4 h-4 inline mr-1 text-green-600" />
                    Replay disponible ({webinaire.replay.duree} min)
                  </p>
                </div>
              )}
            </Card>

            {/* Tags */}
            <Card className="p-6">
              <h4 className="font-bold text-slate-900 mb-3">Thématiques</h4>
              <div className="flex flex-wrap gap-2">
                {webinaire.themes.map((theme, idx) => (
                  <Badge key={idx} className="bg-cpu-orange text-white border-0">
                    {theme}
                  </Badge>
                ))}
              </div>
            </Card>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}
