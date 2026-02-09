"use client";

import { Chapitre } from "@/types";

interface ChaptersSidebarProps {
  chapitres: Chapitre[];
  currentLeconId: string;
  completedLecons: string[];
  onLeconSelect: (leconId: string) => void;
}

export function ChaptersSidebar({
  chapitres,
  currentLeconId,
  completedLecons,
  onLeconSelect,
}: ChaptersSidebarProps) {
  return (
    <div className="w-80 bg-white border-r border-slate-200 overflow-y-auto">
      <div className="p-4 border-b border-slate-200">
        <h2 className="font-semibold text-slate-900">Contenu de la formation</h2>
      </div>

      <div className="divide-y divide-slate-200">
        {chapitres.map((chapitre, chapIndex) => (
          <div key={chapitre.id} className="p-4">
            {/* Chapitre Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-cpu-orange/10 text-cpu-orange flex items-center justify-center text-xs font-bold">
                {chapIndex + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-slate-900 leading-tight">
                  {chapitre.titre}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {chapitre.lecons.length} leçon
                  {chapitre.lecons.length > 1 ? "s" : ""} •{" "}
                  {Math.floor(chapitre.duree / 60)}h {chapitre.duree % 60}min
                </p>
              </div>
            </div>

            {/* Leçons List */}
            <div className="space-y-1 ml-9">
              {chapitre.lecons.map((lecon) => {
                const isCompleted = completedLecons.includes(lecon.id);
                const isCurrent = currentLeconId === lecon.id;

                return (
                  <button
                    key={lecon.id}
                    onClick={() => onLeconSelect(lecon.id)}
                    className={`w-full text-left p-2 rounded text-sm transition-colors ${
                      isCurrent
                        ? "bg-cpu-orange text-white"
                        : isCompleted
                        ? "bg-green-50 text-green-800 hover:bg-green-100"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {/* Icon */}
                      <div className="flex-shrink-0">
                        {isCompleted ? (
                          <svg
                            className={`w-4 h-4 ${
                              isCurrent ? "text-white" : "text-green-600"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        ) : lecon.type === "video" ? (
                          <svg
                            className={`w-4 h-4 ${
                              isCurrent ? "text-white" : "text-slate-400"
                            }`}
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
                        ) : lecon.type === "quiz" ? (
                          <svg
                            className={`w-4 h-4 ${
                              isCurrent ? "text-white" : "text-cpu-orange"
                            }`}
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
                        ) : (
                          <svg
                            className={`w-4 h-4 ${
                              isCurrent ? "text-white" : "text-slate-400"
                            }`}
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
                      <span className="flex-1 truncate">{lecon.titre}</span>

                      {/* Duration */}
                      {lecon.duree && (
                        <span
                          className={`text-xs ${
                            isCurrent
                              ? "text-white/80"
                              : "text-slate-500"
                          }`}
                        >
                          {lecon.duree}min
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
