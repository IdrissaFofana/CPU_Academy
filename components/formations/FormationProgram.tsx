"use client";

import { useState } from "react";
import { Chapitre } from "@/types";

interface FormationProgramProps {
  chapitres: Chapitre[];
}

export function FormationProgram({ chapitres }: FormationProgramProps) {
  const [expandedChapitres, setExpandedChapitres] = useState<string[]>([
    chapitres[0]?.id,
  ]);

  const toggleChapitre = (chapitreId: string) => {
    setExpandedChapitres((prev) =>
      prev.includes(chapitreId)
        ? prev.filter((id) => id !== chapitreId)
        : [...prev, chapitreId]
    );
  };

  const totalLecons = chapitres.reduce(
    (acc, chap) => acc + chap.lecons.length,
    0
  );
  const totalDuree = chapitres.reduce((acc, chap) => acc + chap.duree, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="flex items-center gap-6 text-sm text-slate-600">
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
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <span>
            {chapitres.length} chapitre{chapitres.length > 1 ? "s" : ""}
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
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          <span>
            {totalLecons} leçon{totalLecons > 1 ? "s" : ""}
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
          <span>{Math.floor(totalDuree / 60)}h {totalDuree % 60}min</span>
        </div>
      </div>

      {/* Chapitres List */}
      <div className="divide-y divide-slate-200">
        {chapitres.map((chapitre, index) => (
          <div key={chapitre.id} className="py-4">
            {/* Chapitre Header */}
            <button
              onClick={() => toggleChapitre(chapitre.id)}
              className="w-full flex items-center justify-between text-left group"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cpu-orange/10 text-cpu-orange flex items-center justify-center text-sm font-semibold">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold text-slate-900 group-hover:text-cpu-orange transition-colors">
                    {chapitre.titre}
                  </h3>
                </div>
                {chapitre.description && (
                  <p className="text-sm text-slate-600 ml-11">
                    {chapitre.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-4 ml-4">
                <span className="text-sm text-slate-500">
                  {chapitre.lecons.length} leçon
                  {chapitre.lecons.length > 1 ? "s" : ""} •{" "}
                  {Math.floor(chapitre.duree / 60)}h {chapitre.duree % 60}min
                </span>
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    expandedChapitres.includes(chapitre.id)
                      ? "rotate-180"
                      : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </button>

            {/* Lecons List */}
            {expandedChapitres.includes(chapitre.id) && (
              <div className="ml-11 mt-3 space-y-2">
                {chapitre.lecons.map((lecon) => (
                  <div
                    key={lecon.id}
                    className="flex items-center gap-3 py-2 px-4 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    {/* Icon based on type */}
                    <div className="flex-shrink-0">
                      {lecon.type === "video" && (
                        <svg
                          className="w-5 h-5 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                      {lecon.type === "quiz" && (
                        <svg
                          className="w-5 h-5 text-cpu-orange"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                          />
                        </svg>
                      )}
                      {lecon.type === "texte" && (
                        <svg
                          className="w-5 h-5 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      )}
                    </div>

                    {/* Title */}
                    <span className="flex-1 text-sm text-slate-700">
                      {lecon.titre}
                    </span>

                    {/* Duration */}
                    {lecon.duree && (
                      <span className="text-xs text-slate-500">
                        {lecon.duree} min
                      </span>
                    )}

                    {/* Resources count */}
                    {lecon.ressources && lecon.ressources.length > 0 && (
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        {lecon.ressources.length}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
