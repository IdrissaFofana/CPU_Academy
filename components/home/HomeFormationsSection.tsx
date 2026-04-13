"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFormations } from "@/hooks/useFormations";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getModeFallbackImage } from "@/lib/utils";
import { SHOW_A_SON_RYTHME, isASonRythmeFormation } from "@/lib/formation-visibility";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Users,
  GraduationCap,
  Wifi,
  Monitor,
  MapPin,
} from "lucide-react";

function niveauLabel(niveau?: string) {
  const map: Record<string, string> = {
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé",
  };
  return map[niveau?.toLowerCase() ?? ""] ?? niveau ?? "Tous niveaux";
}

function niveauColor(niveau?: string) {
  const n = niveau?.toLowerCase() ?? "";
  if (n === "beginner" || n === "débutant") return "bg-green-100 text-green-700";
  if (n === "intermediate" || n === "intermédiaire") return "bg-orange-100 text-orange-700";
  if (n === "advanced" || n === "avancé") return "bg-red-100 text-red-700";
  return "bg-slate-100 text-slate-600";
}

function modeLabel(mode?: string) {
  const map: Record<string, string> = {
    presentiel: "Présentiel",
    hybride: "Hybride",
    live: "Live",
    webinaire: "Webinaire",
    video: "Vidéo",
    document: "Document",
    a_son_rythme: "À son rythme",
  };
  return map[mode ?? ""] ?? mode ?? "En ligne";
}

function modeIcon(mode?: string) {
  switch (mode) {
    case "presentiel":
      return <MapPin className="w-3 h-3" />;
    case "live":
    case "webinaire":
      return <Wifi className="w-3 h-3" />;
    default:
      return <Monitor className="w-3 h-3" />;
  }
}

interface ApiFormation {
  id: string;
  title: string;
  description?: string;
  category?: string;
  price?: number | null;
  price_member?: number | null;
  duration?: number;
  isPaid?: boolean;
  mode?: string;
  image?: string | null;
  niveau?: string;
  formateur?: { firstname?: string; lastname?: string } | null;
  certification_delivrer_badge?: boolean;
}

function FormationCard({ formation }: { formation: ApiFormation }) {
  const isFree = !formation.isPaid || formation.price === 0 || formation.price === null;
  const fallbackImage = getModeFallbackImage(formation.mode, formation.mode);
  const [imageSrc, setImageSrc] = useState<string>(formation.image || fallbackImage);

  return (
    <div className="group bg-white rounded-2xl border-2 border-slate-100 overflow-hidden hover:border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <div className="relative h-44 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={formation.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onError={() => {
              if (imageSrc !== fallbackImage) {
                setImageSrc(fallbackImage);
              } else {
                setImageSrc("");
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
            <BookOpen className="w-12 h-12 text-orange-200" />
          </div>
        )}

        {/* Overlaid badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isFree && (
            <span className="px-2 py-1 rounded-lg text-xs font-bold bg-green-500 text-white shadow">
              Gratuit
            </span>
          )}
          {formation.certification_delivrer_badge && (
            <span className="px-2 py-1 rounded-lg text-xs font-bold bg-blue-500 text-white shadow">
              Certifiant
            </span>
          )}
        </div>

        {/* Mode badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-white/90 backdrop-blur-sm text-slate-700 shadow">
            {modeIcon(formation.mode)}
            {modeLabel(formation.mode)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Category + level */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {formation.category && (
            <Badge variant="outline" className="text-xs text-slate-600 border-slate-200">
              {formation.category}
            </Badge>
          )}
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${niveauColor(formation.niveau)}`}>
            {niveauLabel(formation.niveau)}
          </span>
        </div>

        <h3 className="font-bold text-slate-900 text-base leading-snug mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {formation.title}
        </h3>

        {formation.description && (
          <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {formation.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-4 mt-auto">
          {formation.duration ? (
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {formation.duration}h
            </span>
          ) : null}
          {formation.formateur && (
            <span className="inline-flex items-center gap-1 truncate">
              <Users className="w-3.5 h-3.5 flex-shrink-0" />
              {formation.formateur.firstname} {formation.formateur.lastname}
            </span>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div>
            {isFree ? (
              <span className="text-lg font-bold text-green-600">Gratuit</span>
            ) : (
              <span className="text-lg font-bold text-slate-900">
                {formation.price?.toLocaleString("fr-CI")} FCFA
              </span>
            )}
          </div>
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-1 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
          >
            Voir plus <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function HomeFormationsSection() {
  const { formations, isLoading, error } = useFormations({ limit: 200 });

  const visibleFormations = SHOW_A_SON_RYTHME
    ? (formations as unknown as ApiFormation[])
    : (formations as unknown as ApiFormation[]).filter(
        (formation) => !isASonRythmeFormation(formation.mode, formation.mode)
      );

  // Show first 8 visible formations
  const featured = visibleFormations.slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-full border border-orange-100 mb-4">
              <GraduationCap className="w-4 h-4 text-cpu-orange" />
              <span className="text-sm font-medium text-slate-700">Formations disponibles</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Nos formations à la une
            </h2>
            <p className="text-slate-500 mt-2 text-lg">
              Choisissez parmi nos programmes certifiants conçus par des experts
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold shrink-0"
          >
            <Link href="/catalogue" className="inline-flex items-center gap-2">
              Voir tout le catalogue <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        {/* Error */}
        {error && !isLoading && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            Impossible de charger les formations. Veuillez réessayer.
          </div>
        )}

        {/* Skeleton loading */}
        {isLoading && formations.length === 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-slate-100 rounded-2xl animate-pulse h-80" />
            ))}
          </div>
        )}

        {/* Grid */}
        {!isLoading && featured.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((formation) => (
              <FormationCard key={formation.id} formation={formation} />
            ))}
          </div>
        )}

        {/* CTA bottom */}
        {!isLoading && featured.length > 0 && (
          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-cpu-orange hover:bg-orange-600 text-white px-8 font-semibold shadow-lg"
            >
              <Link href="/catalogue" className="inline-flex items-center gap-2">
                Explorer toutes les formations
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            {visibleFormations.length > 8 && (
              <p className="text-sm text-slate-400 mt-3">
                {visibleFormations.length - 8} autres formations disponibles dans le catalogue
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
