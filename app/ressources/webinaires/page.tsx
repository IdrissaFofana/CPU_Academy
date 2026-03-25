"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageBanner } from "@/components/layout/PageBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/ui/search-bar";
import { useFormations } from "@/hooks/useFormations";
import {
  formatWebinaireDate,
  isWebinaireFormation,
  mapApiFormationToWebinaire,
} from "@/lib/adapters/webinaire-adapter";
import { Calendar, Eye, Grid3x3, LayoutGrid, List, Play, TrendingUp, Users, Video } from "lucide-react";

type ViewMode = "grid" | "list" | "compact";
const REPLAYS_PER_PAGE = 9;

export default function RessourcesWebinairesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentReplayPage, setCurrentReplayPage] = useState(1);

  const { formations, isLoading, error } = useFormations({ limit: 500 });

  const webinaires = useMemo(
    () => formations.filter(isWebinaireFormation).map(mapApiFormationToWebinaire),
    [formations]
  );

  const prochains = useMemo(() => webinaires.filter((w) => w.statut !== "termine"), [webinaires]);
  const replays = useMemo(() => webinaires.filter((w) => w.statut === "termine"), [webinaires]);

  const filteredReplays = useMemo(
    () =>
      replays.filter((replay) => {
        if (!searchTerm) return true;
        const q = searchTerm.toLowerCase();
        return (
          replay.titre.toLowerCase().includes(q) ||
          replay.formateur.nomComplet.toLowerCase().includes(q) ||
          replay.themes.some((t) => t.toLowerCase().includes(q))
        );
      }),
    [replays, searchTerm]
  );

  const totalReplayPages = Math.max(1, Math.ceil(filteredReplays.length / REPLAYS_PER_PAGE));
  const replayStartIndex = (currentReplayPage - 1) * REPLAYS_PER_PAGE;
  const paginatedReplays = filteredReplays.slice(
    replayStartIndex,
    replayStartIndex + REPLAYS_PER_PAGE
  );

  useEffect(() => {
    setCurrentReplayPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (currentReplayPage > totalReplayPages) {
      setCurrentReplayPage(totalReplayPages);
    }
  }, [currentReplayPage, totalReplayPages]);

  return (
    <>
      <PageBanner
        breadcrumb={[{ label: "Accueil", href: "/" }, { label: "Ressources" }, { label: "Webinaires" }]}
        slides={[
          {
            image: "/images/default-formation.jpg",
            title: "Webinaires et replays",
            subtitle: "Contenu synchronise en direct depuis l'API formations",
          },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-6 text-center border-2 border-slate-100 shadow-sm">
              <Video className="w-10 h-10 mx-auto mb-3 text-orange-600" />
              <div className="text-3xl font-bold text-slate-900">{webinaires.length}</div>
              <div className="text-sm text-slate-600">Webinaires API</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border-2 border-slate-100 shadow-sm">
              <Calendar className="w-10 h-10 mx-auto mb-3 text-blue-600" />
              <div className="text-3xl font-bold text-slate-900">{prochains.length}</div>
              <div className="text-sm text-slate-600">A venir / live</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border-2 border-slate-100 shadow-sm">
              <Play className="w-10 h-10 mx-auto mb-3 text-green-600" />
              <div className="text-3xl font-bold text-slate-900">{replays.length}</div>
              <div className="text-sm text-slate-600">Replays</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center border-2 border-slate-100 shadow-sm">
              <Users className="w-10 h-10 mx-auto mb-3 text-purple-600" />
              <div className="text-3xl font-bold text-slate-900">{webinaires.reduce((a, w) => a + w.inscrits, 0)}</div>
              <div className="text-sm text-slate-600">Participants</div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-0">
              <Calendar className="w-3 h-3 mr-1" /> Agenda
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Prochains webinaires</h2>
          </div>

          {isLoading && webinaires.length === 0 && (
            <div className="space-y-4 max-w-5xl mx-auto">
              {Array.from({ length: 3 }).map((_, idx) => (
                <Card key={idx} className="h-40 animate-pulse bg-slate-100 border-0" />
              ))}
            </div>
          )}

          {error && <Card className="max-w-5xl mx-auto p-6 bg-red-50 border-red-200 text-red-800">Impossible de charger les webinaires.</Card>}

          {!isLoading && !error && (
            <div className="space-y-6 max-w-5xl mx-auto">
              {prochains.map((webinaire) => (
                <Card key={webinaire.id} className="group transition-all duration-300 border-2 hover:border-orange-200 overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    <div className="flex-grow p-6">
                      <Badge variant="outline" className="mb-3 bg-blue-50 text-blue-700 border-blue-200">
                        {webinaire.statut === "live" ? "En direct" : "Inscription ouverte"}
                      </Badge>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{webinaire.titre}</h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm mb-4 text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600" />
                          <span>{formatWebinaireDate(webinaire.date)}</span>
                        </div>
                        <Badge variant="outline" className="bg-slate-50">{webinaire.dureeMinutes} min</Badge>
                        <Badge variant="outline" className="bg-slate-50">{webinaire.gratuit ? "Gratuit" : `${webinaire.prix} FCFA`}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {webinaire.themes.slice(0, 5).map((theme) => (
                          <Badge key={theme} variant="outline" className="text-xs bg-orange-50 text-orange-700">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="lg:w-64 bg-gradient-to-br from-orange-50 to-blue-50 p-6 flex flex-col justify-center items-center border-l border-slate-100">
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-slate-900">{webinaire.inscrits}</div>
                        <div className="text-xs text-slate-600">participants</div>
                      </div>
                      <Button asChild className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white">
                        <Link href={`/webinaires/${webinaire.id}`}>Voir le detail</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-purple-100 text-purple-700 border-0">
              <Video className="w-3 h-3 mr-1" /> Replays
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Webinaires en replay</h2>
          </div>

          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8 max-w-7xl mx-auto">
            <div className="flex-1 max-w-md">
              <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Rechercher un replay..." size="md" />
            </div>
            <div className="flex items-center gap-4">
              <p className="text-sm text-slate-600">
                <span className="font-semibold">{filteredReplays.length}</span> replay(s)
              </p>
              <div className="flex items-center gap-2">
                <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "bg-cpu-orange text-white" : ""}>
                  <Grid3x3 className="w-4 h-4" />
                </Button>
                <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")} className={viewMode === "list" ? "bg-cpu-orange text-white" : ""}>
                  <List className="w-4 h-4" />
                </Button>
                <Button variant={viewMode === "compact" ? "default" : "outline"} size="sm" onClick={() => setViewMode("compact")} className={viewMode === "compact" ? "bg-cpu-orange text-white" : ""}>
                  <LayoutGrid className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          <div
            className={
              (viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                : viewMode === "compact"
                ? "grid md:grid-cols-4 gap-4"
                : "space-y-4") + " max-w-7xl mx-auto"
            }
          >
            {paginatedReplays.map((replay) => {
              const isListMode = viewMode === "list";
              const isCompactMode = viewMode === "compact";

              return (
                <Card key={replay.id} className={`group flex border-2 hover:border-orange-200 overflow-hidden ${isListMode ? "flex-row" : "flex-col"}`}>
                  <div className={`relative bg-slate-900 overflow-hidden ${isListMode ? "w-64 h-48" : isCompactMode ? "h-32" : "h-48"}`}>
                    <img src={replay.thumbnail} alt={replay.titre} className="w-full h-full object-cover opacity-70" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-7 h-7 text-white ml-1" />
                      </div>
                    </div>
                  </div>

                  <div className={`${isCompactMode ? "p-4" : "p-6"} flex-grow flex flex-col`}>
                    <h3 className={`${isCompactMode ? "text-sm" : "text-lg"} font-bold text-slate-900 mb-2 line-clamp-2`}>{replay.titre}</h3>
                    {!isCompactMode && <p className="text-sm text-slate-600 mb-3">Par {replay.formateur.nomComplet}</p>}

                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{replay.inscrits.toLocaleString()}</span>
                      </div>
                      {!isCompactMode && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{formatWebinaireDate(replay.date, false)}</span>
                        </div>
                      )}
                    </div>

                    {!isCompactMode && (
                      <div className="flex flex-wrap gap-1.5 mb-5 flex-grow">
                        {replay.themes.slice(0, isListMode ? 5 : 3).map((theme) => (
                          <Badge key={theme} variant="outline" className="text-xs bg-slate-50">
                            {theme}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <Button asChild className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white">
                      <Link href={`/webinaires/${replay.id}`}>
                        <Play className="mr-2 h-4 w-4" />
                        {isCompactMode ? "Voir" : "Regarder le replay"}
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {!isLoading && !error && filteredReplays.length > 0 && (
            <div className="max-w-7xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-600">
                Page <span className="font-semibold text-slate-900">{currentReplayPage}</span> sur <span className="font-semibold text-slate-900">{totalReplayPages}</span>
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentReplayPage((p) => Math.max(1, p - 1))}
                  disabled={currentReplayPage === 1}
                >
                  Precedent
                </Button>

                {Array.from({ length: totalReplayPages }, (_, i) => i + 1)
                  .slice(Math.max(0, currentReplayPage - 3), Math.min(totalReplayPages, currentReplayPage + 2))
                  .map((pageNum) => (
                    <Button
                      key={pageNum}
                      variant={currentReplayPage === pageNum ? "default" : "outline"}
                      size="sm"
                      className={currentReplayPage === pageNum ? "bg-cpu-orange text-white hover:bg-cpu-orange" : ""}
                      onClick={() => setCurrentReplayPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentReplayPage((p) => Math.min(totalReplayPages, p + 1))}
                  disabled={currentReplayPage === totalReplayPages}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}

          {!isLoading && !error && filteredReplays.length === 0 && (
            <div className="text-center py-12 text-slate-500">Aucun replay ne correspond a votre recherche.</div>
          )}
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-center text-white">
            <TrendingUp className="w-12 h-12 mx-auto mb-4 text-orange-500" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Continuer votre progression</h2>
            <p className="text-lg text-slate-300 mb-8">Accedez a toutes les formations pour approfondir les thematiques vues en webinaire.</p>
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white">
              <Link href="/catalogue">Explorer le catalogue</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
