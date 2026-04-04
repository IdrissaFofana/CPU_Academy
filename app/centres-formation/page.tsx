"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/ui/search-bar";
import { PageBanner } from "@/components/layout/PageBanner";
import {
  MapPin,
  Send,
  Phone,
  Mail,
  ArrowRight,
  Building2,
  Search,
  SlidersHorizontal,
  RotateCcw,
  Navigation,
} from "lucide-react";
import Link from "next/link";
import { centreFormationService } from "@/lib/api/services";
import type { CentreFormationApi } from "@/lib/api/types";

type CentreCardData = {
  id: string;
  nom: string;
  adresse: string;
  ville: string;
  region: string;
  description?: string;
  contact: {
    telephone?: string;
    email?: string;
  };
  displayOrder?: number;
};

const getInitials = (nom: string) =>
  nom
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");

const mapApiToCard = (centre: CentreFormationApi): CentreCardData => {
  const ville = (centre.ville || "Ville non renseignée").trim();
  return {
    id: centre.id,
    nom: centre.nom,
    adresse: centre.adresse?.trim() || "Adresse non renseignée",
    ville,
    region: ville,
    description: centre.description?.trim(),
    contact: {
      telephone: centre.telephone?.trim(),
      email: centre.email?.trim(),
    },
    displayOrder: centre.display_order,
  };
};

const getGoogleMapsUrl = (centre: CentreCardData) => {
  const queryParts = [
    centre.nom,
    centre.adresse !== "Adresse non renseignée" ? centre.adresse : "",
    centre.ville !== "Ville non renseignée" ? centre.ville : "",
    "Côte d'Ivoire",
  ].filter(Boolean);

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(queryParts.join(", "))}`;
};

export default function CentresFormationPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [centres, setCentres] = useState<CentreCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadCentres = async () => {
      setIsLoading(true);
      try {
        const apiCentres = await centreFormationService.getAll();

        if (!mounted) return;

        if (Array.isArray(apiCentres) && apiCentres.length > 0) {
          const mapped = apiCentres
            .map(mapApiToCard)
            .sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
          setCentres(mapped);
          setLoadError(null);
          return;
        }

        setCentres([]);
        setLoadError("Aucun centre disponible pour le moment.");
      } catch (_error) {
        if (!mounted) return;
        setCentres([]);
        setLoadError("Impossible de charger les centres depuis l'API.");
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadCentres();

    return () => {
      mounted = false;
    };
  }, []);

  const regions = useMemo(() => ["all", ...new Set(centres.map((c) => c.region))], [centres]);

  const regionCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    centres.forEach((c) => { counts[c.region] = (counts[c.region] || 0) + 1; });
    return counts;
  }, [centres]);

  const filteredCentres = centres.filter((centre) => {
    const matchRegion = selectedRegion === "all" || centre.region === selectedRegion;
    const matchSearch =
      searchTerm === "" ||
      centre.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      centre.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
      centre.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (centre.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    return matchRegion && matchSearch;
  });

  return (
    <>
      <PageBanner
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Centres de Formation" },
        ]}
        slides={[
          {
            image: "/images/default-formation.jpg",
            title: "Nos Centres de Formation",
            subtitle:
              "Découvrez nos espaces équipés et professionnels partout en Côte d'Ivoire",
            buttons: [
              {
                label: "Trouver un centre",
                href: "#centres",
                icon: <MapPin className="h-5 w-5" />,
              },
              {
                label: "Contactez-nous",
                href: "/support",
                variant: "outline",
                icon: <Send className="h-5 w-5" />,
              },
            ],
          },
          {
            image: "/images/formation-agriculture.png",
            title: "Infrastructures Modernes",
            subtitle: "Des équipements de pointe pour une formation optimale",
            buttons: [
              {
                label: "Visiter un centre",
                href: "#centres",
                icon: <MapPin className="h-5 w-5" />,
              },
            ],
          },
          {
            image: "/images/default-formation.jpg",
            title: "Accessibilité Nationale",
            subtitle: "Présents dans toutes les grandes villes de Côte d'Ivoire",
            buttons: [
              {
                label: "Localisation",
                href: "/regions",
                icon: <MapPin className="h-5 w-5" />,
              },
            ],
          },
        ]}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl py-10 lg:py-14">

          {/* ─── Two-column layout ─── */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10" id="centres">

            {/* ── Sidebar ── */}
            <aside className="w-full lg:w-72 flex-shrink-0">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">

                  {/* Sidebar header */}
                  <div className="bg-slate-900 px-5 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cpu-orange/20 flex items-center justify-center">
                      <SlidersHorizontal className="w-4 h-4 text-cpu-orange" />
                    </div>
                    <span className="font-bold text-white text-sm tracking-wide">Filtres</span>
                    {(searchTerm !== "" || selectedRegion !== "all") && (
                      <button
                        onClick={() => { setSearchTerm(""); setSelectedRegion("all"); }}
                        className="ml-auto flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        <RotateCcw className="w-3 h-3" />
                        Réinitialiser
                      </button>
                    )}
                  </div>

                  <div className="p-5 space-y-5">
                    {/* Search */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                        <Search className="w-3.5 h-3.5" />
                        Recherche
                      </label>
                      <SearchBar
                        value={searchTerm}
                        onChange={setSearchTerm}
                        placeholder="Nom, ville, adresse…"
                        size="md"
                      />
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Region filter */}
                    <div>
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                        <MapPin className="w-3.5 h-3.5" />
                        Ville / Région
                      </label>
                      <div className="space-y-1">
                        {regions.map((region) => {
                          const count = region === "all" ? centres.length : (regionCounts[region] || 0);
                          return (
                            <button
                              key={region}
                              onClick={() => setSelectedRegion(region)}
                              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                                selectedRegion === region
                                  ? "bg-cpu-orange text-white shadow-md shadow-orange-200"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                              }`}
                            >
                              <span>{region === "all" ? "Tous les centres" : region}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                                selectedRegion === region
                                  ? "bg-white/25 text-white"
                                  : "bg-slate-100 text-slate-500"
                              }`}>
                                {count}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="h-px bg-slate-100" />

                    {/* Stats */}
                    {!isLoading && (
                      <div className="rounded-xl bg-gradient-to-br from-slate-900 to-slate-800 px-4 py-4 text-center">
                        <p className="text-3xl font-extrabold text-white leading-none">
                          {filteredCentres.length}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          centre{filteredCentres.length > 1 ? "s" : ""} trouvé{filteredCentres.length > 1 ? "s" : ""}
                        </p>
                        {filteredCentres.length !== centres.length && (
                          <p className="text-xs text-cpu-orange mt-1">sur {centres.length} au total</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Main content ── */}
            <div className="flex-1 min-w-0">
              {loadError && (
                <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800 flex items-center gap-3">
                  <Building2 className="w-5 h-5 flex-shrink-0 text-amber-500" />
                  {loadError}
                </div>
              )}

              {/* ── Skeleton ── */}
              {isLoading ? (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <div
                      key={`skeleton-${idx}`}
                      className="rounded-2xl overflow-hidden border border-slate-100 bg-white shadow-sm animate-pulse"
                    >
                      <div className="h-36 bg-slate-200" />
                      <div className="p-5 space-y-3">
                        <div className="h-5 w-3/4 bg-slate-200 rounded-lg" />
                        <div className="h-4 w-full bg-slate-100 rounded-lg" />
                        <div className="h-4 w-5/6 bg-slate-100 rounded-lg" />
                        <div className="h-9 w-full bg-slate-200 rounded-xl mt-2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  {/* ── Grid ── */}
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCentres.map((centre, idx) => {
                      const initials = getInitials(centre.nom);
                      const delay = `${Math.min(idx * 0.07, 0.6)}s`;

                      return (
                        <article
                          key={centre.id}
                          className="group relative flex flex-col rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                          style={{ animationDelay: delay }}
                        >
                          {/* ── Card header ── */}
                          <div className="relative h-36 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center overflow-hidden rounded-t-2xl">
                            {/* Orange accent stripe */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-cpu-orange" />
                            {/* Decorative circles */}
                            <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/5" />
                            <div className="absolute -bottom-8 -left-4 w-24 h-24 rounded-full bg-white/5" />
                            <div className="absolute bottom-2 right-4 w-10 h-10 rounded-full bg-cpu-orange/10" />

                            {/* Initials medallion */}
                            <div className="relative z-10 flex flex-col items-center gap-1">
                              <div className="w-16 h-16 rounded-2xl bg-cpu-orange/15 border border-cpu-orange/40 flex items-center justify-center shadow-lg">
                                <span className="text-cpu-orange font-extrabold text-2xl tracking-tight leading-none select-none">
                                  {initials || <Building2 className="w-8 h-8 text-cpu-orange" />}
                                </span>
                              </div>
                            </div>

                            {/* City badge */}
                            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1 border border-white/10">
                              <MapPin className="w-3 h-3 text-cpu-orange flex-shrink-0" />
                              <span className="text-white text-xs font-semibold truncate max-w-[120px]">
                                {centre.ville}
                              </span>
                            </div>

                            {/* Order badge */}
                            {typeof centre.displayOrder === "number" && centre.displayOrder > 0 && (
                              <div className="absolute top-5 right-3 bg-cpu-orange/20 border border-cpu-orange/30 rounded-full w-7 h-7 flex items-center justify-center">
                                <span className="text-cpu-orange text-xs font-bold">{centre.displayOrder}</span>
                              </div>
                            )}
                          </div>

                          {/* ── Card body ── */}
                          <div className="flex flex-col flex-1 p-5 gap-4">
                            {/* Name + description */}
                            <div>
                              <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-cpu-orange transition-colors duration-200">
                                {centre.nom}
                              </h3>
                              {centre.description ? (
                                <p className="text-slate-500 text-sm mt-1.5 line-clamp-2 leading-relaxed">
                                  {centre.description}
                                </p>
                              ) : (
                                <p className="text-slate-400 text-xs mt-1.5 italic">
                                  Aucune description disponible
                                </p>
                              )}
                            </div>

                            {/* Address */}
                            <div className="flex items-start gap-2 text-sm text-slate-600">
                              <MapPin className="w-4 h-4 text-cpu-orange flex-shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{centre.adresse}</span>
                            </div>

                            {/* Contact */}
                            {(centre.contact.telephone || centre.contact.email) && (
                              <div className="space-y-1.5 pt-1 border-t border-slate-100">
                                {centre.contact.telephone && (
                                  <a
                                    href={`tel:${centre.contact.telephone}`}
                                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-cpu-orange transition-colors group/link"
                                  >
                                    <span className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover/link:bg-cpu-orange transition-colors">
                                      <Phone className="w-3 h-3 text-cpu-orange group-hover/link:text-white transition-colors" />
                                    </span>
                                    <span className="truncate font-medium">{centre.contact.telephone}</span>
                                  </a>
                                )}
                                {centre.contact.email && (
                                  <a
                                    href={`mailto:${centre.contact.email}`}
                                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-cpu-orange transition-colors group/link"
                                  >
                                    <span className="w-6 h-6 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0 group-hover/link:bg-cpu-orange transition-colors">
                                      <Mail className="w-3 h-3 text-cpu-orange group-hover/link:text-white transition-colors" />
                                    </span>
                                    <span className="truncate font-medium">{centre.contact.email}</span>
                                  </a>
                                )}
                              </div>
                            )}

                            {/* CTA */}
                            <div className="mt-auto pt-2 grid grid-cols-[minmax(0,1fr)_2.5rem] gap-2 items-center">
                              <Link href={`/catalogue?region=${encodeURIComponent(centre.ville)}`} className="min-w-0">
                                <Button className="w-full min-w-0 bg-cpu-orange hover:bg-cpu-orange/90 text-white rounded-xl text-sm font-semibold group/btn">
                                  Voir les formations
                                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                </Button>
                              </Link>
                              <a
                                href={getGoogleMapsUrl(centre)}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Voir sur Google Maps"
                                className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-cpu-orange hover:text-cpu-orange flex items-center justify-center transition-all duration-150 text-slate-500 shadow-sm"
                              >
                                <Navigation className="w-4 h-4" />
                              </a>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  {/* ── Empty state ── */}
                  {filteredCentres.length === 0 && !loadError && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-slate-300" />
                      </div>
                      <p className="text-slate-700 font-semibold text-lg mb-1">Aucun centre trouvé</p>
                      <p className="text-slate-400 text-sm max-w-xs">
                        Essayez de modifier votre recherche ou de changer de filtre régional.
                      </p>
                      <button
                        onClick={() => { setSearchTerm(""); setSelectedRegion("all"); }}
                        className="mt-4 text-sm text-cpu-orange hover:underline font-medium"
                      >
                        Réinitialiser les filtres
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* ── CTA Banner ── */}
              <div className="mt-14 relative overflow-hidden rounded-2xl bg-slate-900 p-10 text-center text-white shadow-xl border border-slate-800">
                {/* Glow decorations */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-56 bg-cpu-orange/20 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-56 h-36 bg-cpu-orange/10 rounded-full blur-2xl" />
                  <div className="absolute top-0 right-0 w-40 h-40 bg-cpu-orange/5 rounded-full blur-2xl" />
                </div>
                <div className="relative">
                  <div className="inline-flex items-center gap-2 bg-cpu-orange/15 border border-cpu-orange/30 text-cpu-orange text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
                    <MapPin className="w-3 h-3" />
                    Formation à distance
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
                    Vous ne trouvez pas de centre près de chez vous ?
                  </h2>
                  <p className="text-slate-400 text-base md:text-lg mb-7 max-w-xl mx-auto">
                    Nos formations en ligne sont accessibles partout, à tout moment, avec des experts de haut niveau.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/catalogue">
                      <Button className="bg-cpu-orange hover:bg-cpu-orange/90 text-white font-bold px-6">
                        Explorer les formations en ligne
                      </Button>
                    </Link>
                    <Link href="/support">
                      <Button variant="outline" className="border-white text-slate-900 hover:bg-slate-100 font-bold px-6">
                        Nous contacter
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

