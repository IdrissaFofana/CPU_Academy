"use client";

import Image from "next/image";
import Link from "next/link";
import { Formation } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Trophy } from "lucide-react";

interface FormationDetailHeroProps {
  formation: Formation;
}

export function FormationDetailHero({ formation }: FormationDetailHeroProps) {
  return (
    <div className="relative bg-slate-900 text-white">
      <div className="absolute inset-0 opacity-10">
        {formation.image && (
          <Image
            src={formation.image}
            alt={formation.titre}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link href="/" className="text-slate-300 hover:text-white">
            Accueil
          </Link>
          <span className="text-slate-400">/</span>
          <Link href="/catalogue" className="text-slate-300 hover:text-white">
            Catalogue
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-white">{formation.titre}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Info */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="secondary" className="bg-cpu-orange text-white">
                {formation.niveau}
              </Badge>
              <Badge variant="secondary" className="bg-slate-700 text-white">
                {formation.format}
              </Badge>
              {formation.certifiant && (
                <Badge variant="secondary" className="bg-green-600 text-white flex items-center gap-1 w-fit">
                  <Trophy className="w-3 h-3" /> Certifiant
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold mb-4">{formation.titre}</h1>

            {/* Resume */}
            <p className="text-xl text-slate-300 mb-6">{formation.resume}</p>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span>
                  {formation.notesMoyenne ? formation.notesMoyenne.toFixed(1) : "N/A"} ({formation.nbInscrits} inscrits)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{formation.duree} heures</span>
              </div>

              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                  />
                </svg>
                <span>{formation.langue}</span>
              </div>
            </div>

            {/* Expert */}
            {formation.expert && (
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-700">
                <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-xl font-bold">
                  {formation.expert.prenom[0]}
                  {formation.expert.nom[0]}
                </div>
                <div>
                  <p className="text-sm text-slate-400">Formateur</p>
                  <p className="font-semibold">
                    {formation.expert.prenom} {formation.expert.nom}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right: Preview Image */}
          <div className="hidden lg:block">
            {formation.image && (
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={formation.image}
                  alt={formation.titre}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <button className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                    <svg
                      className="w-8 h-8 text-cpu-orange ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

