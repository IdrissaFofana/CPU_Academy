"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/ui/search-bar";
import { PageBanner } from "@/components/layout/PageBanner";
import { useFormations } from "@/hooks/useFormations";
import {
  formatWebinaireDate,
  isWebinaireFormation,
  mapApiFormationToWebinaire,
  type WebinaireStatus,
} from "@/lib/adapters/webinaire-adapter";
import { Calendar, Clock, Grid3x3, List, LayoutGrid, Play, Sparkles, Users, Video } from "lucide-react";

type ViewMode = "grid" | "list" | "compact";
const ITEMS_PER_PAGE = 9;

const statuses: Array<{ value: "all" | WebinaireStatus; label: string }> = [
  { value: "all", label: "Tous" },
  { value: "a-venir", label: "A venir" },
  { value: "live", label: "En direct" },
  { value: "termine", label: "Replays" },
];

function statusBadge(statut: WebinaireStatus) {
  if (statut === "live") {
    return (
      <Badge className="bg-red-500 text-white border-0 animate-pulse">
        <Sparkles className="w-3 h-3 mr-1" /> EN DIRECT
      </Badge>
    );
  }

  if (statut === "a-venir") {
    return (
      <Badge className="bg-blue-500 text-white border-0">
        <Calendar className="w-3 h-3 mr-1" /> A VENIR
      </Badge>
    );
  }

  return (
    <Badge className="bg-green-600 text-white border-0">
      <Play className="w-3 h-3 mr-1" /> REPLAY
    </Badge>
  );
}

export default function WebinairesPage() {
  const [selectedStatus, setSelectedStatus] = useState<"all" | WebinaireStatus>("all");
  const [selectedTheme, setSelectedTheme] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { formations, isLoading, error } = useFormations({ limit: 400 });

  const webinaires = useMemo(
    () => formations.filter(isWebinaireFormation).map(mapApiFormationToWebinaire),
    [formations]
  );

  const themes = useMemo(
    () => ["all", ...new Set(webinaires.flatMap((w) => w.themes))],
    [webinaires]
  );

  const filteredWebinaires = useMemo(
    () =>
      webinaires.filter((w) => {
        if (selectedStatus !== "all" && w.statut !== selectedStatus) return false;
        if (selectedTheme !== "all" && !w.themes.includes(selectedTheme)) return false;

        if (!searchTerm) return true;

        const s = searchTerm.toLowerCase();
        return (
          w.titre.toLowerCase().includes(s) ||
          w.description.toLowerCase().includes(s) ||
          w.formateur.nomComplet.toLowerCase().includes(s) ||
          w.themes.some((t) => t.toLowerCase().includes(s))
        );
      }),
    [webinaires, selectedStatus, selectedTheme, searchTerm]
  );

  const totalPages = Math.max(1, Math.ceil(filteredWebinaires.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedWebinaires = filteredWebinaires.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStatus, selectedTheme, searchTerm]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <PageBanner
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Webinaires" }]}
        slides={[
          {
            image: "/images/default-formation.jpg",
            title: "Webinaires Live",
            subtitle: "Les webinaires proviennent directement du catalogue formations API",
            buttons: [
              { label: "Voir les sessions", href: "#webinaires", icon: <Calendar className="h-5 w-5" /> },
              { label: "Catalogue complet", href: "/catalogue", variant: "outline", icon: <Video className="h-5 w-5" /> },
            ],
          },
        ]}
      />

      <div className="min-h-screen bg-slate-50" id="webinaires">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl py-8 lg:py-12">
          <div className="mb-6 grid gap-4 lg:grid-cols-3">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Rechercher un webinaire..."
              className="lg:col-span-2"
            />
            <div className="rounded-xl border bg-white px-4 py-2 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">{filteredWebinaires.length}</span> resultat(s)
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <aside className="w-full lg:w-72 flex-shrink-0 space-y-5">
              <Card className="p-5 border-2 border-slate-200 bg-white">
                <h2 className="font-bold text-slate-900 mb-4">Statut</h2>
                <div className="space-y-2">
                  {statuses.map((status) => {
                    const count = webinaires.filter((w) => status.value === "all" || w.statut === status.value).length;
                    return (
                      <Button
                        key={status.value}
                        onClick={() => setSelectedStatus(status.value)}
                        variant="ghost"
                        className={`w-full justify-between ${
                          selectedStatus === status.value ? "bg-cpu-orange text-white hover:bg-cpu-orange" : ""
                        }`}
                      >
                        <span>{status.label}</span>
                        <Badge className={selectedStatus === status.value ? "bg-white/20 text-white" : "bg-slate-100 text-slate-700"}>
                          {count}
                        </Badge>
                      </Button>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-5 border-2 border-slate-200 bg-white">
                <h2 className="font-bold text-slate-900 mb-4">Theme</h2>
                <div className="space-y-2 max-h-72 overflow-auto pr-1">
                  {themes.map((theme) => (
                    <Button
                      key={theme}
                      onClick={() => setSelectedTheme(theme)}
                      variant="ghost"
                      className={`w-full justify-start ${selectedTheme === theme ? "bg-cpu-orange text-white hover:bg-cpu-orange" : ""}`}
                    >
                      <span className="truncate">{theme === "all" ? "Tous les themes" : theme}</span>
                    </Button>
                  ))}
                </div>
              </Card>
            </aside>

            <div className="flex-1 min-w-0">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-slate-600">Affichage</p>
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

              {isLoading && webinaires.length === 0 && (
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Card key={idx} className="h-56 animate-pulse bg-slate-100 border-0" />
                  ))}
                </div>
              )}

              {error && (
                <Card className="p-6 border-red-200 bg-red-50 text-red-800">
                  Erreur chargement API webinaires. Veuillez reessayer.
                </Card>
              )}

              {!isLoading && !error && (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid sm:grid-cols-2 gap-4 md:gap-6"
                      : viewMode === "compact"
                      ? "grid md:grid-cols-3 gap-4"
                      : "space-y-4"
                  }
                >
                  {paginatedWebinaires.map((webinaire) => {
                    const isListMode = viewMode === "list";
                    const isCompactMode = viewMode === "compact";

                    return (
                      <Card
                        key={webinaire.id}
                        className={`border-2 transition-all duration-300 ${
                          webinaire.statut === "live" ? "border-red-500 shadow-red-100" : "border-slate-200 hover:border-cpu-orange"
                        } ${isListMode ? "flex flex-row p-0 overflow-hidden" : "p-4"}`}
                      >
                        <div className={`relative rounded-lg overflow-hidden ${isListMode ? "h-full w-56 flex-shrink-0" : isCompactMode ? "h-28 mb-3" : "h-40 mb-4"}`}>
                          <img src={webinaire.thumbnail} alt={webinaire.titre} className="w-full h-full object-cover" />
                          <div className="absolute top-3 right-3">{statusBadge(webinaire.statut)}</div>
                        </div>

                        <div className={isListMode ? "p-4 flex-1" : ""}>
                          <Badge className="bg-slate-100 text-slate-700 border-0 mb-2 text-xs">{webinaire.themes[0]}</Badge>
                          <h3 className={`${isCompactMode ? "text-base" : "text-xl"} font-bold text-slate-900 mb-1 line-clamp-2`}>
                            {webinaire.titre}
                          </h3>
                          {!isCompactMode && <p className="text-sm text-slate-600 line-clamp-2 mb-3">{webinaire.description}</p>}

                          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-4">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-cpu-orange" />
                              <span className="truncate">{formatWebinaireDate(webinaire.date, false)}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-cpu-orange" />
                              <span>{webinaire.dureeMinutes} min</span>
                            </div>
                            {!isCompactMode && (
                              <>
                                <div className="flex items-center gap-1.5">
                                  <Users className="w-3.5 h-3.5 text-cpu-orange" />
                                  <span>{webinaire.inscrits} inscrits</span>
                                </div>
                                <div className="font-semibold text-green-600">{webinaire.gratuit ? "Gratuit" : `${webinaire.prix} FCFA`}</div>
                              </>
                            )}
                          </div>

                          <Button asChild size="sm" className={`w-full ${webinaire.statut === "live" ? "bg-red-500 hover:bg-red-600" : "bg-cpu-orange hover:bg-cpu-orange/90"} text-white`}>
                            <Link href={`/webinaires/${webinaire.id}`}>
                              {webinaire.statut === "live" ? "Rejoindre" : webinaire.statut === "a-venir" ? "S'inscrire" : "Voir replay"}
                            </Link>
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}

              {!isLoading && !error && filteredWebinaires.length > 0 && (
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-slate-600">
                    Page <span className="font-semibold text-slate-900">{currentPage}</span> sur <span className="font-semibold text-slate-900">{totalPages}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      Precedent
                    </Button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
                      .map((pageNum) => (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          className={currentPage === pageNum ? "bg-cpu-orange text-white hover:bg-cpu-orange" : ""}
                          onClick={() => setCurrentPage(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      ))}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              )}

              {!isLoading && !error && filteredWebinaires.length === 0 && (
                <div className="text-center py-16">
                  <Video className="w-14 h-14 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Aucun webinaire ne correspond aux filtres.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
