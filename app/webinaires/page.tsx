"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/ui/search-bar";
import { PageBanner } from "@/components/layout/PageBanner";
import {
  Video,
  Calendar,
  BookOpen,
  Clock,
  Users,
  TrendingUp,
  Sparkles,
  Play,
  CheckCircle2,
  Grid3x3,
  List,
  LayoutGrid
} from "lucide-react";
import Link from "next/link";
import { webinairesMock } from "@/data/mock";

type ViewMode = "grid" | "list" | "compact";

export default function WebinairesPage() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const statuses = ["all", "a-venir", "live", "termine"];
  const themes = [
    "all",
    ...new Set(webinairesMock.flatMap((w) => w.themes)),
  ];

  const filteredWebinaires = webinairesMock.filter((w) => {
    if (selectedStatus !== "all" && w.statut !== selectedStatus) return false;
    if (selectedTheme !== "all" && !w.themes.includes(selectedTheme)) return false;
    if (searchTerm !== "" && !w.titre.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !w.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
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
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Webinaires" }
        ]}
        slides={[
          {
            image: "/images/formation-tech.png",
            title: "Webinaires Live",
            subtitle: "Participez à nos sessions live avec des experts et posez vos questions en direct",
            badge: {
              icon: "+",
              number: "60",
              text: "Webinaires par mois",
              subtext: "Thématiques variées"
            },
            trustBadges: [
              {
                icon: "users",
                color: "orange",
                title: "5,000+",
                subtitle: "Participants actifs"
              },
              {
                icon: "users",
                color: "purple",
                title: "Sessions quotidiennes",
                subtitle: "Horaires flexibles"
              },
              {
                icon: "check",
                color: "green",
                title: "Certificat offert",
                subtitle: "Attestation de présence"
              }
            ],
            buttons: [
              { label: "S'inscrire maintenant", href: "#webinaires", icon: <Calendar className="h-5 w-5" /> },
              { label: "Voir formations", href: "/catalogue", variant: "outline", icon: <BookOpen className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/formation-agriculture.png",
            title: "Sessions Interactives",
            subtitle: "Échangez en direct avec nos formateurs experts",
            badge: {
              number: "100%",
              text: "Interaction garantie",
              subtext: "Q&A en direct"
            },
            trustBadges: [
              {
                icon: "users",
                color: "blue",
                title: "Experts reconnus",
                subtitle: "Leaders du secteur"
              },
              {
                icon: "users",
                color: "orange",
                title: "Petits groupes",
                subtitle: "Max 100 participants"
              },
              {
                icon: "check",
                color: "green",
                title: "Documentation fournie",
                subtitle: "Support PDF inclus"
              }
            ],
            buttons: [
              { label: "Voir le calendrier", href: "#webinaires", icon: <Calendar className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/formation-tech.png",
            title: "Replays Disponibles",
            subtitle: "Accédez aux enregistrements de nos sessions passées",
            badge: {
              icon: "📺 ",
              number: "200+",
              text: "Replays disponibles",
              subtext: "Bibliothèque complète"
            },
            trustBadges: [
              {
                icon: "users",
                color: "purple",
                title: "Accès illimité",
                subtitle: "24/7 à la demande"
              },
              {
                icon: "check",
                color: "green",
                title: "Qualité HD",
                subtitle: "Vidéo optimisée"
              },
              {
                icon: "building",
                color: "blue",
                title: "Ressources incluses",
                subtitle: "Slides et documents"
              }
            ],
            buttons: [
              { label: "Voir les replays", href: "/ressources/webinaires", icon: <BookOpen className="h-5 w-5" /> }
            ]
          }
        ]}
      />

      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl py-8 lg:py-12">

        {/* Main layout with sidebar */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filtres */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <Card className="p-6 border-2 border-slate-200 shadow-lg sticky top-24 bg-white">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <div className="w-1 h-6 bg-cpu-orange rounded-full"></div>
                  Filtres
                </h2>
                {(selectedStatus !== "all" || selectedTheme !== "all") && (
                  <button
                    onClick={() => {
                      setSelectedStatus("all");
                      setSelectedTheme("all");
                    }}
                    className="text-xs text-cpu-orange hover:underline font-medium"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
              
              {/* Filtres actifs */}
              {(selectedStatus !== "all" || selectedTheme !== "all") && (
                <div className="mb-6 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-xs font-semibold text-orange-900 mb-2">Filtres actifs:</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedStatus !== "all" && (
                      <Badge className="bg-cpu-orange text-white text-xs">
                        {selectedStatus === "a-venir" ? "À venir" : selectedStatus === "live" ? "En direct" : "Replays"}
                      </Badge>
                    )}
                    {selectedTheme !== "all" && (
                      <Badge className="bg-slate-700 text-white text-xs">
                        {selectedTheme}
                      </Badge>
                    )}
                  </div>
                </div>
              )}
              
              {/* Filtrer par statut */}
              <div className="mb-6 pb-6 border-b-2 border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Video className="w-4 h-4 text-cpu-orange" />
                  Statut
                </h3>
                <div className="space-y-2">
                  {statuses.map((status) => {
                    const count = webinairesMock.filter(w => status === "all" || w.statut === status).length;
                    const Icon = status === "all" ? Video : status === "a-venir" ? Calendar : status === "live" ? Sparkles : Play;
                    const colorClass = status === "live" ? "text-red-600" : status === "a-venir" ? "text-blue-600" : status === "termine" ? "text-green-600" : "text-slate-600";
                    
                    return (
                      <Button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        variant="ghost"
                        className={`w-full justify-between text-sm transition-all group ${
                          selectedStatus === status
                            ? "bg-cpu-orange text-white hover:bg-cpu-orange shadow-md scale-105"
                            : "text-slate-700 hover:bg-slate-100 hover:scale-[1.02]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${selectedStatus === status ? "text-white" : colorClass}`} />
                          {status === "all"
                            ? "Tous"
                            : status === "a-venir"
                            ? "À venir"
                            : status === "live"
                            ? "En direct"
                            : "Replays"}
                        </span>
                        <Badge 
                          className={`text-xs ${
                            selectedStatus === status
                              ? "bg-white/20 text-white border-0"
                              : "bg-slate-200 text-slate-700 border-0"
                          }`}
                        >
                          {count}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Filtrer par thème */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cpu-orange" />
                  Thème
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                  {themes.map((theme) => {
                    const count = webinairesMock.filter(w => theme === "all" || w.themes.includes(theme)).length;
                    
                    return (
                      <Button
                        key={theme}
                        onClick={() => setSelectedTheme(theme)}
                        variant="ghost"
                        className={`w-full justify-between text-sm transition-all group ${
                          selectedTheme === theme
                            ? "bg-cpu-orange text-white hover:bg-cpu-orange shadow-md scale-105"
                            : "text-slate-700 hover:bg-slate-100 hover:scale-[1.02]"
                        }`}
                      >
                        <span className="truncate flex-1 text-left">{theme === "all" ? "Tous les thèmes" : theme}</span>
                        <Badge 
                          className={`text-xs ml-2 ${
                            selectedTheme === theme
                              ? "bg-white/20 text-white border-0"
                              : "bg-slate-200 text-slate-700 border-0"
                          }`}
                        >
                          {count}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Info helper */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800 leading-relaxed">
                  <span className="font-semibold">Astuce:</span> Combinez plusieurs filtres pour affiner votre recherche
                </p>
              </div>
            </Card>
          </aside>

          {/* Contenu principal */}
          <div className="flex-1 min-w-0">
            {/* Nombre de résultats + View Toggle */}
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-900">{filteredWebinaires.length}</span> webinaire{filteredWebinaires.length > 1 ? "s" : ""} trouvé{filteredWebinaires.length > 1 ? "s" : ""}
              </p>
              <div className="flex items-center gap-2">
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-cpu-orange text-white" : ""}
                >
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-cpu-orange text-white" : ""}
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button 
                  variant={viewMode === "compact" ? "default" : "outline"} 
                  size="sm" 
                  onClick={() => setViewMode("compact")}
                  className={viewMode === "compact" ? "bg-cpu-orange text-white" : ""}
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Liste des webinaires */}
            <div className={(viewMode === "grid"
                ? "grid sm:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-6"
                : viewMode === "compact"
                ? "grid md:grid-cols-3 gap-4"
                : "space-y-4") + " mb-8"}>
          {filteredWebinaires.map((webinaire) => {
            const isListMode = viewMode === "list";
            const isCompactMode = viewMode === "compact";
            const isLive = webinaire.statut === "live";
            const borderColor = isLive ? "border-red-500 shadow-lg shadow-red-100" : "border-slate-100 hover:border-cpu-orange";
            const cardClassName = "border-2 transition-all duration-300 " + borderColor + " " + (isListMode ? "flex flex-row p-0 overflow-hidden" : isCompactMode ? "p-3" : "p-4 md:p-5");
            const imageHeight = isListMode ? "h-full w-48" : isCompactMode ? "h-24" : "h-32 md:h-40";
            const padding = isCompactMode ? "p-3" : isListMode ? "p-4 flex-1" : "p-0";
            const titleSize = isCompactMode ? "text-sm" : "text-lg md:text-xl";
            const textSizeSmall = isCompactMode ? "text-xs" : "text-xs md:text-sm";
            const iconSize = isCompactMode ? "w-3 h-3" : "w-3 h-3 md:w-4 md:h-4";
            const buttonText = isLive ? "Rejoindre" : webinaire.statut === "a-venir" ? "S'inscrire" : isCompactMode ? "Voir" : "Replay";
            const ButtonIcon = isLive ? Video : webinaire.statut === "a-venir" ? Calendar : Play;
            const buttonBg = isLive ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" : "bg-cpu-orange hover:bg-cpu-orange/90 text-white";
            const formateurInitial = webinaire.formateur.nom.charAt(0);
            const formateurNomComplet = webinaire.formateur.prenom + " " + webinaire.formateur.nom;
            const dateFormatted = formatDate(webinaire.date).split(" à ")[0];
            
            return (
            <Card key={webinaire.id} className={cardClassName}>
              {/* Image & Badge */}
              <div className={"relative rounded-lg overflow-hidden " + imageHeight + " " + (isListMode ? "flex-shrink-0" : "mb-4")}>
                <img src={webinaire.thumbnail} alt={webinaire.titre} className="w-full h-full object-cover" />
                <div className="absolute top-4 right-4">
                  {getStatusBadge(webinaire.statut)}
                </div>
                {isLive && (
                  <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                    <div className="bg-red-500 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg animate-pulse">
                      EN DIRECT MAINTENANT
                    </div>
                  </div>
                )}
              </div>

              {/* Infos */}
              <div className={(isListMode ? "flex-1 p-4" : padding) + " space-y-3"}>
                <div>
                  <Badge className="bg-slate-100 text-slate-700 border-0 mb-2 text-xs">
                    {webinaire.themes[0]}
                  </Badge>
                  <h3 className={titleSize + " font-bold text-slate-900 mb-1 line-clamp-2"}>
                    {webinaire.titre}
                  </h3>
                  {!isCompactMode && (
                    <p className={textSizeSmall + " text-slate-600 line-clamp-2"}>
                      {webinaire.description}
                    </p>
                  )}
                </div>

                {/* Formateur */}
                {!isCompactMode && (
                  <div className="flex items-center gap-2 py-2 border-y border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-cpu-orange flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                      {formateurInitial}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {formateurNomComplet}
                      </p>
                      <p className="text-xs text-slate-600 truncate">
                        Expert en {webinaire.formateur.domaines[0]}
                      </p>
                    </div>
                  </div>
                )}

                {/* Détails */}
                <div className={"grid gap-2 " + textSizeSmall + " " + (isCompactMode ? "grid-cols-1" : "grid-cols-2")}>
                  <div className={"flex items-center gap-1 text-slate-600 " + (isCompactMode ? "gap-1" : "md:gap-2")}>
                    <Calendar className={iconSize + " text-cpu-orange flex-shrink-0"} />
                    <span className="truncate">{dateFormatted}</span>
                  </div>
                  <div className={"flex items-center gap-1 text-slate-600 " + (isCompactMode ? "gap-1" : "md:gap-2")}>
                    <Clock className={iconSize + " text-cpu-orange flex-shrink-0"} />
                    <span className="truncate">{webinaire.duree} min</span>
                  </div>
                  {!isCompactMode && (
                    <>
                      <div className="flex items-center gap-1 md:gap-2 text-slate-600">
                        <Users className={iconSize + " text-cpu-orange flex-shrink-0"} />
                        <span className="truncate">{webinaire.inscrits} inscrits</span>
                      </div>
                      {webinaire.gratuit && (
                        <div className="flex items-center gap-1 md:gap-2 text-green-600 font-semibold">
                          <TrendingUp className={iconSize + " flex-shrink-0"} />
                          <span>Gratuit</span>
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-3">
                  <Link href={"/webinaires/" + webinaire.id} className="block">
                    <Button size="sm" className={"w-full " + textSizeSmall + " " + buttonBg}>
                      <ButtonIcon className={iconSize + " mr-1"} />
                      <span>{buttonText}</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
            );
          })}
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

