"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users, ArrowRight, Filter, Video } from "lucide-react";
import Link from "next/link";
import { formationService } from "@/lib/api/services/formation.service";
import {
  isWebinaireFormation,
  mapApiFormationToWebinaire,
  type WebinaireViewModel,
} from "@/lib/adapters/webinaire-adapter";

// ─── Types ───────────────────────────────────────────────────────────────────

type SessionDisplay = {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  date: string;
  time: string;
  duration: string;
  location: string;
  mode: string;
  instructor: string;
  inscrits: number | null;
  price: string;
  level: string;
  href: string;
  isLive: boolean;
};

const MAX_VISIBLE_SESSIONS = 4;

// ─── Pure helpers ─────────────────────────────────────────────────────────────

function formatDayMonthYear(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function formatHour(date: Date): string {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatDurationMin(minutes: number): string {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h${m}` : `${h}h`;
  }
  return `${minutes} min`;
}

function slugCategory(secteur: string): string {
  return secteur
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function mapWebinaireToSession(w: WebinaireViewModel): SessionDisplay {
  const cat = slugCategory(w.secteur || "Formation");
  return {
    id: w.id,
    title: w.titre,
    category: cat,
    categoryLabel: w.secteur || "Formation",
    date: w.date ? formatDayMonthYear(w.date) : "Date à confirmer",
    time: w.date ? formatHour(w.date) : "—",
    duration: formatDurationMin(w.dureeMinutes),
    location: "En ligne",
    mode: "Webinaire",
    instructor: w.formateur.nomComplet || "Expert CPU Academy",
    inscrits: w.inscrits || null,
    price: w.gratuit ? "Gratuit" : `${w.prix.toLocaleString("fr-FR")} FCFA`,
    level: "Tous niveaux",
    href: `/webinaires/${w.id}`,
    isLive: w.statut === "live",
  };
}

function getLevelColor(level: string): string {
  switch (level) {
    case "Débutant":      return "bg-green-100 text-green-700 border-green-200";
    case "Intermédiaire": return "bg-orange-100 text-orange-700 border-orange-200";
    case "Avancé":        return "bg-red-100 text-red-700 border-red-200";
    default:              return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

function pickClosestStartWebinaires(items: WebinaireViewModel[]): WebinaireViewModel[] {
  const now = Date.now();

  const withDate = items.filter((w) => w.date);
  const withoutDate = items.filter((w) => !w.date);

  const upcoming = withDate
    .filter((w) => w.date && w.date.getTime() >= now)
    .sort((a, b) => a.date!.getTime() - b.date!.getTime());

  if (upcoming.length >= MAX_VISIBLE_SESSIONS) {
    return upcoming.slice(0, MAX_VISIBLE_SESSIONS);
  }

  const upcomingIds = new Set(upcoming.map((w) => w.id));
  const closestPast = withDate
    .filter((w) => w.date && !upcomingIds.has(w.id))
    .sort((a, b) => Math.abs(a.date!.getTime() - now) - Math.abs(b.date!.getTime() - now));

  const datedClosest = [...upcoming, ...closestPast].slice(0, MAX_VISIBLE_SESSIONS);

  if (datedClosest.length >= MAX_VISIBLE_SESSIONS) {
    return datedClosest;
  }

  // If API does not provide usable start dates, complete with undated webinars
  return [...datedClosest, ...withoutDate].slice(0, MAX_VISIBLE_SESSIONS);
}

// ─── Component ────────────────────────────────────────────────────────────────

export function CalendarSection() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sessions, setSessions] = useState<SessionDisplay[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadWebinaires = async () => {
      setIsLoading(true);
      try {
        const res = await formationService.getPublic();
        if (!mounted) return;

        const raw = res as any;
        const items: any[] = Array.isArray(raw)
          ? raw
          : Array.isArray(raw?.data)
          ? raw.data
          : [];

        const webinaires = items
          .filter(isWebinaireFormation)
          .map(mapApiFormationToWebinaire);

        const closestWebinaires = pickClosestStartWebinaires(webinaires)
          .map(mapWebinaireToSession);

        // Display only the 4 sessions with the closest start dates
        setSessions(closestWebinaires);
      } catch {
        if (!mounted) return;
        // No static fallback: keep API-only behavior
        setSessions([]);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };

    loadWebinaires();
    return () => {
      mounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const all = { id: "all", label: "Toutes" };
    const unique = Array.from(
      new Map(sessions.map((s) => [s.category, s.categoryLabel])).entries()
    ).map(([id, label]) => ({ id, label }));
    return [all, ...unique];
  }, [sessions]);

  const filteredSessions =
    selectedCategory === "all"
      ? sessions
      : sessions.filter((s) => s.category === selectedCategory);

  return (
    <section id="calendrier" className="py-12 md:py-20 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl">

        {/* ── Header ── */}
        <div className="text-center mb-16 animate-slide-down">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full border-2 border-cpu-orange/40 mb-6 animate-fade-in shadow-sm">
            <Calendar className="w-4 h-4 text-cpu-orange" />
            <span className="text-sm font-medium text-slate-900">Prochains webinaires</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
            Calendrier des <span className="font-extrabold text-cpu-orange">webinaires</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Consultez les prochaines sessions live et inscrivez-vous dès maintenant
          </p>
        </div>

        {/* ── Skeleton ── */}
        {isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-8 border border-slate-200 animate-pulse">
                <div className="flex justify-between mb-6">
                  <div className="space-y-2 flex-1 pr-4">
                    <div className="h-5 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-100 rounded w-1/3" />
                  </div>
                  <div className="h-8 bg-slate-200 rounded w-28" />
                </div>
                <div className="space-y-3 mb-6">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-4 bg-slate-100 rounded w-2/3" />
                  ))}
                </div>
                <div className="h-10 bg-slate-200 rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {/* ── Loaded content ── */}
        {!isLoading && (
          <>
            {/* Category filters — shown only if there are sessions */}
            {sessions.length > 0 && (
              <div className="mb-12 animate-fade-in animation-delay-200">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-cpu-orange/30" />
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border-2 border-slate-100 shadow-sm">
                      <Filter className="w-4 h-4 text-cpu-orange" />
                      <span className="text-sm font-semibold text-slate-700">Filtrer par catégorie</span>
                    </div>
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-cpu-orange/30" />
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {categories.map((cat, index) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        style={{ animationDelay: `${index * 50}ms` }}
                        className={`relative px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
                          ${selectedCategory === cat.id
                            ? "bg-cpu-orange text-white shadow-lg shadow-cpu-orange/30 scale-105"
                            : "bg-white text-slate-700 border-2 border-slate-200 hover:border-cpu-orange/50 hover:scale-105"
                          }`}
                      >
                        {selectedCategory === cat.id && (
                          <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                          </span>
                        )}
                        <span className="flex items-center gap-2">
                          <Video className="w-3.5 h-3.5" />
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="text-center mt-5">
                    <p className="text-sm text-slate-600">
                      <span className="font-semibold">{filteredSessions.length}</span>{" "}
                      webinaire{filteredSessions.length > 1 ? "s" : ""}
                      {selectedCategory !== "all"
                        ? " dans cette catégorie"
                        : " disponible" + (filteredSessions.length > 1 ? "s" : "")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Sessions grid */}
            {filteredSessions.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {filteredSessions.map((session, index) => (
                  <div
                    key={session.id}
                    className="group bg-white rounded-2xl p-8 border border-slate-200
                      hover:border-cpu-orange/30 hover:shadow-lg
                      hover:-translate-y-1 transition-all duration-500 animate-slide-up"
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex-1 pr-4">
                        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-cpu-orange transition-colors leading-snug">
                          {session.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={`${getLevelColor(session.level)} text-xs border`}>
                            {session.level}
                          </Badge>
                          {session.isLive ? (
                            <Badge className="bg-red-500 text-white text-xs border-0 animate-pulse">
                              EN DIRECT
                            </Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-700 text-xs border border-slate-200">
                              {session.mode}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-2xl font-bold text-cpu-orange">{session.price}</div>
                        {!session.price.includes("Gratuit") && (
                          <div className="text-xs text-slate-500">TTC</div>
                        )}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-slate-600">
                        <Calendar className="w-5 h-5 text-cpu-orange flex-shrink-0" />
                        <span className="font-medium">{session.date}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-sm text-slate-500">{session.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <Clock className="w-5 h-5 text-cpu-orange flex-shrink-0" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-600">
                        <MapPin className="w-5 h-5 text-cpu-orange flex-shrink-0" />
                        <span>{session.location}</span>
                      </div>
                      {session.inscrits !== null && (
                        <div className="flex items-center gap-3 text-slate-600">
                          <Users className="w-5 h-5 text-cpu-orange flex-shrink-0" />
                          <span className="font-semibold text-emerald-600">
                            {session.inscrits} inscrits
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="pt-5 border-t border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="text-xs text-slate-500">Formateur</div>
                        <div className="text-sm font-semibold text-slate-900">{session.instructor}</div>
                      </div>
                      <Button
                        size="sm"
                        className="cursor-pointer bg-cpu-orange hover:bg-cpu-orange/90 text-white group/btn"
                        asChild
                      >
                        <Link href={session.href}>
                          {session.isLive ? "Rejoindre" : "S'inscrire"}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty state */
              <div className="text-center py-16 mb-12">
                <div className="w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mx-auto mb-4">
                  <Video className="w-8 h-8 text-cpu-orange" />
                </div>
                <p className="text-slate-700 font-semibold text-lg mb-1">
                  Aucun webinaire programmé pour le moment
                </p>
                <p className="text-slate-400 text-sm max-w-xs mx-auto">
                  Revenez bientôt pour découvrir nos prochaines sessions live.
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="text-center animate-fade-in animation-delay-600">
              <Button variant="outline" size="lg" className="cursor-pointer" asChild>
                <Link href="/webinaires">
                  Voir tous les webinaires
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

