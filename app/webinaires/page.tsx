"use client";

import { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { webinairesMock } from "@/data/mock";

export default function WebinairesPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedTheme, setSelectedTheme] = useState<string>("all");

  const statuses = ["all", "a-venir", "live", "termine"];
  const themes = [
    "all",
    ...new Set(webinairesMock.flatMap((w) => w.themes)),
  ];

  const filteredWebinaires = webinairesMock.filter((w) => {
    if (selectedStatus !== "all" && w.statut !== selectedStatus) return false;
    if (selectedTheme !== "all" && !w.themes.includes(selectedTheme)) return false;
    return true;
  });

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "live":
        return (
          <Badge className="bg-red-500 text-white border-0 animate-pulse">
            <Sparkles className="w-3 h-3 mr-1" />
            EN DIRECT
          </Badge>
        );
      case "a-venir":
        return (
          <Badge className="bg-blue-500 text-white border-0">
            <Calendar className="w-3 h-3 mr-1" />
            À VENIR
          </Badge>
        );
      case "termine":
        return (
          <Badge className="bg-green-600 text-white border-0">
            <CheckCircle2 className="w-3 h-3 mr-1" />
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
        title="Webinaires Live"
        subtitle="Participez à nos sessions live avec des experts et posez vos questions en direct"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Webinaires" }
        ]}
      />

      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl py-8 lg:py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 lg:mb-12">
          <Card className="p-6 bg-blue-50 border-blue-200">
            <div className="flex items-center gap-4">
              <div className="bg-blue-500 text-white p-3 rounded-lg">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-900">
                  {webinairesMock.filter((w) => w.statut === "a-venir").length}
                </p>
                <p className="text-sm text-blue-700">À venir</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-red-50 border-red-200">
            <div className="flex items-center gap-4">
              <div className="bg-red-500 text-white p-3 rounded-lg animate-pulse">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-red-900">
                  {webinairesMock.filter((w) => w.statut === "live").length}
                </p>
                <p className="text-sm text-red-700">En direct maintenant</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-green-50 border-green-200">
            <div className="flex items-center gap-4">
              <div className="bg-green-600 text-white p-3 rounded-lg">
                <Play className="w-6 h-6" />
              </div>
              <div>
                <p className="text-3xl font-bold text-green-900">
                  {webinairesMock.filter((w) => w.statut === "termine" && w.replay).length}
                </p>
                <p className="text-sm text-green-700">Replays disponibles</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main layout with sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filtres */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <Card className="p-6 border border-slate-200 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-6">Filtres</h2>
              
              {/* Filtrer par statut */}
              <div className="mb-8 pb-8 border-b border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide text-slate-700">
                  Statut
                </h3>
                <div className="space-y-2">
                  {statuses.map((status) => (
                    <Button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      variant="ghost"
                      className={`w-full justify-start text-sm transition-all ${
                        selectedStatus === status
                          ? "bg-cpu-orange text-white hover:bg-cpu-orange"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {status === "all"
                        ? "Tous"
                        : status === "a-venir"
                        ? "À venir"
                        : status === "live"
                        ? "En direct"
                        : "Replays"}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Filtrer par thème */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide text-slate-700">
                  Thème
                </h3>
                <div className="space-y-2">
                  {themes.map((theme) => (
                    <Button
                      key={theme}
                      onClick={() => setSelectedTheme(theme)}
                      variant="ghost"
                      className={`w-full justify-start text-sm transition-all ${
                        selectedTheme === theme
                          ? "bg-cpu-orange text-white hover:bg-cpu-orange"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {theme === "all" ? "Tous les thèmes" : theme}
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          </aside>

          {/* Contenu principal */}
          <div className="flex-1 min-w-0">
            {/* Nombre de résultats */}
            <div className="mb-6">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{filteredWebinaires.length}</span> webinaire{filteredWebinaires.length > 1 ? "s" : ""} trouvé{filteredWebinaires.length > 1 ? "s" : ""}
              </p>
            </div>

            {/* Liste des webinaires */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6 mb-8">
          {filteredWebinaires.map((webinaire) => (
            <Card
              key={webinaire.id}
              className={`p-4 md:p-5 border-2 hover:shadow-xl transition-all duration-300 ${
                webinaire.statut === "live"
                  ? "border-red-500 shadow-lg shadow-red-100"
                  : "border-slate-100 hover:border-cpu-orange"
              }`}
            >
              {/* Image & Badge */}
              <div className="relative h-32 md:h-40 rounded-lg overflow-hidden mb-4">
                <img
                  src={webinaire.thumbnail}
                  alt={webinaire.titre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  {getStatusBadge(webinaire.statut)}
                </div>
                {webinaire.statut === "live" && (
                  <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                    <div className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg animate-pulse">
                      EN DIRECT MAINTENANT
                    </div>
                  </div>
                )}
              </div>

              {/* Infos */}
              <div className="space-y-3">
                <div>
                  <Badge className="bg-slate-100 text-slate-700 border-0 mb-2 text-xs">
                    {webinaire.themes[0]}
                  </Badge>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1 line-clamp-2">
                    {webinaire.titre}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 line-clamp-2">
                    {webinaire.description}
                  </p>
                </div>

                {/* Formateur */}
                <div className="flex items-center gap-2 py-2 border-y border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-cpu-orange flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                    {webinaire.formateur.nom.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">
                      {webinaire.formateur.prenom} {webinaire.formateur.nom}
                    </p>
                    <p className="text-xs text-slate-600 truncate">
                      Expert en {webinaire.formateur.domaines[0]}
                    </p>
                  </div>
                </div>

                {/* Détails */}
                <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
                  <div className="flex items-center gap-1 md:gap-2 text-slate-600">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4 text-cpu-orange flex-shrink-0" />
                    <span className="truncate">{formatDate(webinaire.date).split(" à ")[0]}</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2 text-slate-600">
                    <Clock className="w-3 h-3 md:w-4 md:h-4 text-cpu-orange flex-shrink-0" />
                    <span className="truncate">{webinaire.duree} min</span>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2 text-slate-600">
                    <Users className="w-3 h-3 md:w-4 md:h-4 text-cpu-orange flex-shrink-0" />
                    <span className="truncate">{webinaire.inscrits} inscrits</span>
                  </div>
                  {webinaire.gratuit && (
                    <div className="flex items-center gap-1 md:gap-2 text-green-600 font-semibold">
                      <TrendingUp className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                      <span>Gratuit</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-3">
                  <Link href={`/webinaires/${webinaire.id}`} className="block">
                    <Button
                      size="sm"
                      className={`w-full text-xs md:text-sm ${
                        webinaire.statut === "live"
                          ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
                          : "bg-cpu-orange hover:bg-cpu-orange/90 text-white"
                      }`}
                    >
                      {webinaire.statut === "live" ? (
                        <>
                          <Video className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          <span>Rejoindre</span>
                        </>
                      ) : webinaire.statut === "a-venir" ? (
                        <>
                          <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          <span>S'inscrire</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                          <span>Replay</span>
                        </>
                      )}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
            </div>

            {filteredWebinaires.length === 0 && (
              <div className="text-center py-12 md:py-16">
                <Video className="w-12 h-12 md:w-16 md:h-16 text-slate-300 mx-auto mb-3 md:mb-4" />
                <p className="text-slate-500 text-sm md:text-base">
                  Aucun webinaire ne correspond à vos critères de filtrage.
                </p>
              </div>
            )}

            {/* CTA Final */}
            <div className="mt-8 md:mt-12 lg:mt-16 bg-cpu-orange rounded-xl md:rounded-2xl p-8 md:p-12 text-center text-white">
              <h3 className="text-2xl md:text-3xl font-bold mb-3">Vous ne trouvez pas ce que vous cherchez ?</h3>
              <p className="text-base md:text-lg text-orange-50 mb-6">Découvrez nos formations complètes avec accompagnement personnalisé.</p>
              <Link href="/catalogue">
                <Button className="bg-white text-cpu-orange hover:bg-orange-50 font-bold">
                  Explorer nos formations
                </Button>
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
