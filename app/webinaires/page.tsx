"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { SearchBar } from "@/components/ui/search-bar";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { PageBanner } from "@/components/layout/PageBanner";
import { useFormations } from "@/hooks/useFormations";
import {
  formatWebinaireDate,
  isWebinaireFormation,
  mapApiFormationToWebinaire,
  type WebinaireStatus,
} from "@/lib/adapters/webinaire-adapter";
import {
  Building2, Calendar, Check, ChevronLeft, ChevronRight,
  Clock, Grid3x3, LayoutGrid, List, Play, SlidersHorizontal,
  Sparkles, Tag, Users, Video, X,
} from "lucide-react";

type ViewMode = "grid" | "list" | "compact";
const ITEMS_PER_PAGE = 9;

const STATUT_TABS: Array<{
  value: "all" | WebinaireStatus;
  label: string;
  activeBg: string;
  color: string;
}> = [
  { value: "all",      label: "Tous",       activeBg: "bg-slate-900",                                   color: "text-slate-600" },
  { value: "a-venir",  label: "À venir",    activeBg: "bg-gradient-to-r from-blue-500 to-cyan-500",     color: "text-blue-600" },
  { value: "live",     label: "En direct",  activeBg: "bg-gradient-to-r from-red-500 to-rose-500",      color: "text-red-600" },
  { value: "termine",  label: "Replays",    activeBg: "bg-gradient-to-r from-orange-500 to-red-500",    color: "text-orange-600" },
];

function statusBadge(statut: WebinaireStatus) {
  if (statut === "live") return (
    <Badge className="bg-red-500 text-white border-0 animate-pulse">
      <Sparkles className="w-3 h-3 mr-1" /> EN DIRECT
    </Badge>
  );
  if (statut === "a-venir") return (
    <Badge className="bg-blue-500 text-white border-0">
      <Calendar className="w-3 h-3 mr-1" /> À VENIR
    </Badge>
  );
  return (
    <Badge className="bg-green-600 text-white border-0">
      <Play className="w-3 h-3 mr-1" /> REPLAY
    </Badge>
  );
}

export default function WebinairesPage() {
  const [selectedStatus, setSelectedStatus] = useState<"all" | WebinaireStatus>("all");
  const [selectedTheme, setSelectedTheme] = useState("all");
  const [selectedSecteur, setSelectedSecteur] = useState("all");
  const [selectedDuree, setSelectedDuree] = useState("all");
  const [onlyGratuit, setOnlyGratuit] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { formations, isLoading, error } = useFormations({ limit: 400 });

  const webinaires = useMemo(
    () => formations.filter(isWebinaireFormation).map(mapApiFormationToWebinaire),
    [formations]
  );

  const allThemes = useMemo(() => {
    const s = new Set<string>();
    webinaires.forEach((w) => w.themes.forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [webinaires]);

  const allSecteurs = useMemo(() => {
    const s = new Set<string>();
    webinaires.forEach((w) => { if (w.secteur) s.add(w.secteur); });
    return Array.from(s).sort();
  }, [webinaires]);

  const themeOptions = [{ value: "all", label: "Tous les thèmes" }, ...allThemes.map((t) => ({ value: t, label: t }))];
  const secteurOptions = [{ value: "all", label: "Tous les secteurs" }, ...allSecteurs.map((s) => ({ value: s, label: s }))];
  const dureeOptions = [
    { value: "all",   label: "Toutes les durées" },
    { value: "court", label: "Court (< 30 min)" },
    { value: "moyen", label: "Moyen (30–60 min)" },
    { value: "long",  label: "Long (> 60 min)" },
  ];

  const nombreFiltresActifs =
    (selectedStatus !== "all" ? 1 : 0) +
    (selectedTheme !== "all" ? 1 : 0) +
    (selectedSecteur !== "all" ? 1 : 0) +
    (selectedDuree !== "all" ? 1 : 0) +
    (onlyGratuit ? 1 : 0);

  const reinitialiserFiltres = () => {
    setSelectedStatus("all");
    setSelectedTheme("all");
    setSelectedSecteur("all");
    setSelectedDuree("all");
    setOnlyGratuit(false);
    setSearchTerm("");
  };

  const filteredWebinaires = useMemo(
    () =>
      webinaires.filter((w) => {
        if (selectedStatus !== "all" && w.statut !== selectedStatus) return false;
        if (selectedTheme !== "all" && !w.themes.includes(selectedTheme)) return false;
        if (selectedSecteur !== "all" && w.secteur !== selectedSecteur) return false;
        if (selectedDuree !== "all") {
          if (selectedDuree === "court" && w.dureeMinutes >= 30) return false;
          if (selectedDuree === "moyen" && (w.dureeMinutes < 30 || w.dureeMinutes > 60)) return false;
          if (selectedDuree === "long" && w.dureeMinutes <= 60) return false;
        }
        if (onlyGratuit && !w.gratuit) return false;
        if (searchTerm) {
          const s = searchTerm.toLowerCase();
          return (
            w.titre.toLowerCase().includes(s) ||
            w.description.toLowerCase().includes(s) ||
            w.formateur.nomComplet.toLowerCase().includes(s) ||
            w.themes.some((t) => t.toLowerCase().includes(s))
          );
        }
        return true;
      }),
    [webinaires, selectedStatus, selectedTheme, selectedSecteur, selectedDuree, onlyGratuit, searchTerm]
  );

  const totalPages = Math.max(1, Math.ceil(filteredWebinaires.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedWebinaires = filteredWebinaires.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => { setCurrentPage(1); }, [selectedStatus, selectedTheme, selectedSecteur, selectedDuree, onlyGratuit, searchTerm]);
  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [currentPage, totalPages]);

  const Sidebar = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-lg h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-orange-500" />
          <h2 className="text-xl font-bold text-slate-900">Filtres</h2>
        </div>
        <div className="flex items-center gap-2">
          {nombreFiltresActifs > 0 && <Badge className="bg-orange-500 text-white">{nombreFiltresActifs}</Badge>}
          {isMobile && (
            <button onClick={() => setShowMobileFilters(false)} className="p-2 hover:bg-slate-100 rounded-lg" aria-label="Fermer">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Statut — pill tabs */}
      <div className="mb-6">
        <Label className="mb-3 block text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-orange-500" />
          Statut
        </Label>
        <div className="flex flex-col gap-2">
          {STATUT_TABS.map((tab) => {
            const isActive = selectedStatus === tab.value;
            const count = webinaires.filter((w) => tab.value === "all" || w.statut === tab.value).length;
            return (
              <button
                key={tab.value}
                onClick={() => setSelectedStatus(tab.value)}
                className={`group flex items-center justify-between px-4 py-2.5 rounded-xl border-2 transition-all duration-200 text-left ${
                  isActive
                    ? `${tab.activeBg} text-white border-transparent shadow-md scale-[1.01]`
                    : `bg-white border-slate-100 ${tab.color} hover:border-orange-200 hover:bg-orange-50`
                }`}
              >
                <span className="font-semibold text-sm">{tab.label}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Thème */}
      <div className="mb-6">
        <Label className="mb-3 block text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Tag className="w-4 h-4 text-orange-500" />
          Thème
        </Label>
        <SearchableSelect value={selectedTheme} onValueChange={setSelectedTheme} options={themeOptions}
          placeholder="Tous les thèmes" searchPlaceholder="Rechercher un thème..." emptyText="Aucun thème trouvé" />
      </div>

      {/* Secteur */}
      <div className="mb-6">
        <Label className="mb-3 block text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-orange-500" />
          Secteur
        </Label>
        <SearchableSelect value={selectedSecteur} onValueChange={setSelectedSecteur} options={secteurOptions}
          placeholder="Tous les secteurs" searchPlaceholder="Rechercher un secteur..." emptyText="Aucun secteur trouvé" />
      </div>

      {/* Durée */}
      <div className="mb-6">
        <Label className="mb-3 block text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Clock className="w-4 h-4 text-orange-500" />
          Durée
        </Label>
        <SearchableSelect value={selectedDuree} onValueChange={setSelectedDuree} options={dureeOptions}
          placeholder="Toutes les durées" emptyText="Aucune durée trouvée" />
      </div>

      {/* Gratuit */}
      <div className="mb-6">
        <button
          onClick={() => setOnlyGratuit(!onlyGratuit)}
          className={`cursor-pointer w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
            onlyGratuit ? "border-orange-500 bg-orange-50 text-orange-700" : "border-slate-200 hover:border-orange-300"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold text-sm">Webinaires gratuits</span>
            {onlyGratuit && <Badge className="bg-orange-500 text-white text-xs"><Check className="w-3 h-3" /></Badge>}
          </div>
        </button>
      </div>

      {/* Reset */}
      {nombreFiltresActifs > 0 && (
        <Button onClick={reinitialiserFiltres} variant="outline"
          className="w-full border-2 border-slate-300 hover:border-orange-500 hover:bg-orange-50 hover:text-orange-700 transition-all">
          <X className="w-4 h-4 mr-2" /> Réinitialiser les filtres
        </Button>
      )}
      {isMobile && (
        <Button onClick={() => setShowMobileFilters(false)} className="w-full mt-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:opacity-90">
          Appliquer les filtres
        </Button>
      )}
    </div>
  );

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

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20" id="webinaires">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-6 sm:py-8 lg:py-12">

          {/* Search bar */}
          <div className="mb-6 flex flex-col sm:grid sm:gap-4 sm:grid-cols-3 gap-3">
            <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Rechercher un webinaire..." className="lg:col-span-2" />
            <div className="rounded-xl border bg-white px-4 py-2 text-sm text-slate-600 flex items-center">
              <span className="font-semibold text-slate-900">{filteredWebinaires.length}</span>&nbsp;résultat(s)
            </div>
          </div>

          {/* Mobile filter button */}
          <div className="flex lg:hidden mb-4">
            <Button variant="outline" onClick={() => setShowMobileFilters(true)} className="border-2 border-orange-200 text-orange-700 hover:bg-orange-50">
              <SlidersHorizontal className="w-4 h-4 mr-2" />
              Filtres
              {nombreFiltresActifs > 0 && <Badge className="ml-2 bg-orange-500 text-white text-xs">{nombreFiltresActifs}</Badge>}
            </Button>
          </div>

          {/* Mobile overlay */}
          {showMobileFilters && (
            <div className="fixed inset-0 z-50 flex lg:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setShowMobileFilters(false)} />
              <div className="relative ml-auto w-80 max-w-full h-full bg-white shadow-2xl overflow-y-auto p-6">
                <Sidebar isMobile />
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar desktop */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="sticky top-6">
                <Sidebar />
              </div>
            </aside>

            {/* Main */}
            <div className="flex-1 min-w-0">
              {/* Toolbar */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm text-slate-600 hidden sm:block">Affichage</p>
                <div className="flex items-center gap-2 ml-auto">
                  <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "bg-cpu-orange text-white" : ""}><Grid3x3 className="w-4 h-4" /></Button>
                  <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")} className={viewMode === "list" ? "bg-cpu-orange text-white" : ""}><List className="w-4 h-4" /></Button>
                  <Button variant={viewMode === "compact" ? "default" : "outline"} size="sm" onClick={() => setViewMode("compact")} className={viewMode === "compact" ? "bg-cpu-orange text-white" : ""}><LayoutGrid className="w-4 h-4" /></Button>
                </div>
              </div>

              {/* Active filter badges */}
              {nombreFiltresActifs > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedStatus !== "all" && (
                    <Badge className="bg-orange-100 text-orange-700 border border-orange-200 flex items-center gap-1 px-3 py-1">
                      {STATUT_TABS.find((t) => t.value === selectedStatus)?.label}
                      <button onClick={() => setSelectedStatus("all")} className="ml-1"><X className="w-3 h-3" /></button>
                    </Badge>
                  )}
                  {selectedTheme !== "all" && (
                    <Badge className="bg-orange-100 text-orange-700 border border-orange-200 flex items-center gap-1 px-3 py-1">
                      <Tag className="w-3 h-3" />{selectedTheme}
                      <button onClick={() => setSelectedTheme("all")} className="ml-1"><X className="w-3 h-3" /></button>
                    </Badge>
                  )}
                  {selectedSecteur !== "all" && (
                    <Badge className="bg-orange-100 text-orange-700 border border-orange-200 flex items-center gap-1 px-3 py-1">
                      <Building2 className="w-3 h-3" />{selectedSecteur}
                      <button onClick={() => setSelectedSecteur("all")} className="ml-1"><X className="w-3 h-3" /></button>
                    </Badge>
                  )}
                  {selectedDuree !== "all" && (
                    <Badge className="bg-orange-100 text-orange-700 border border-orange-200 flex items-center gap-1 px-3 py-1">
                      <Clock className="w-3 h-3" />{dureeOptions.find((d) => d.value === selectedDuree)?.label}
                      <button onClick={() => setSelectedDuree("all")} className="ml-1"><X className="w-3 h-3" /></button>
                    </Badge>
                  )}
                  {onlyGratuit && (
                    <Badge className="bg-orange-100 text-orange-700 border border-orange-200 flex items-center gap-1 px-3 py-1">
                      Gratuit<button onClick={() => setOnlyGratuit(false)} className="ml-1"><X className="w-3 h-3" /></button>
                    </Badge>
                  )}
                </div>
              )}

              {/* Loading */}
              {isLoading && webinaires.length === 0 && (
                <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                  {Array.from({ length: 4 }).map((_, idx) => <Card key={idx} className="h-56 animate-pulse bg-slate-100 border-0" />)}
                </div>
              )}

              {error && <Card className="p-6 border-red-200 bg-red-50 text-red-800">Erreur chargement API webinaires. Veuillez reessayer.</Card>}

              {/* Cards */}
              {!isLoading && !error && (
                <div className={
                  viewMode === "grid" ? "grid sm:grid-cols-2 gap-4 md:gap-6"
                  : viewMode === "compact" ? "grid md:grid-cols-3 gap-4"
                  : "space-y-4"
                }>
                  {paginatedWebinaires.map((webinaire) => {
                    const isListMode = viewMode === "list";
                    const isCompactMode = viewMode === "compact";
                    return (
                      <Card key={webinaire.id} className={`border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                        webinaire.statut === "live" ? "border-red-500 shadow-red-100" : "border-slate-200 hover:border-cpu-orange"
                      } ${isListMode ? "flex flex-row p-0 overflow-hidden" : "p-4"}`}>
                        <div className={`relative rounded-lg overflow-hidden ${isListMode ? "h-full w-32 sm:w-56 flex-shrink-0" : isCompactMode ? "h-24 sm:h-28 mb-3" : "h-36 sm:h-40 mb-4"}`}>
                          <img src={webinaire.thumbnail} alt={webinaire.titre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute top-3 right-3">{statusBadge(webinaire.statut)}</div>
                        </div>
                        <div className={isListMode ? "p-4 flex-1" : ""}>
                          <Badge className="bg-slate-100 text-slate-700 border-0 mb-2 text-xs">{webinaire.themes[0]}</Badge>
                        <h3 className={`${isCompactMode ? "text-sm" : "text-base sm:text-lg"} font-bold text-slate-900 mb-1 line-clamp-2`}>{webinaire.titre}</h3>
                          {!isCompactMode && <p className="text-sm text-slate-600 line-clamp-2 mb-3">{webinaire.description}</p>}
                          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 mb-4">
                            <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-cpu-orange" /><span className="truncate">{formatWebinaireDate(webinaire.date, false)}</span></div>
                            <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-cpu-orange" /><span>{webinaire.dureeMinutes} min</span></div>
                            {!isCompactMode && (
                              <>
                                <div className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 text-cpu-orange" /><span>{webinaire.inscrits} inscrits</span></div>
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

              {/* Pagination */}
              {!isLoading && !error && filteredWebinaires.length > 0 && (
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-slate-600">
                    Page <span className="font-semibold text-slate-900">{currentPage}</span> sur <span className="font-semibold text-slate-900">{totalPages}</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}><ChevronLeft className="w-4 h-4" /></Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
                      .map((pageNum) => (
                        <Button key={pageNum} variant={currentPage === pageNum ? "default" : "outline"} size="sm"
                          className={currentPage === pageNum ? "bg-cpu-orange text-white hover:bg-cpu-orange" : ""}
                          onClick={() => setCurrentPage(pageNum)}>{pageNum}</Button>
                      ))}
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}><ChevronRight className="w-4 h-4" /></Button>
                  </div>
                </div>
              )}

              {!isLoading && !error && filteredWebinaires.length === 0 && (
                <div className="text-center py-10 sm:py-16">
                  <Video className="w-12 h-12 sm:w-14 sm:h-14 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500 text-lg font-medium">Aucun webinaire ne correspond aux filtres.</p>
                  <Button variant="outline" className="mt-4" onClick={reinitialiserFiltres}>Réinitialiser les filtres</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
