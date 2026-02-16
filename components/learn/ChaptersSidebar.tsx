"use client";

import { Chapitre } from "@/types";

interface ChaptersSidebarProps {
  chapitres: Chapitre[];
  currentLeconId: string;
  completedLecons: string[];
  onLeconSelect: (leconId: string) => void;
  isVisible?: boolean;
}

export function ChaptersSidebar({
  chapitres,
  currentLeconId,
  completedLecons,
  onLeconSelect,
  isVisible = true,
}: ChaptersSidebarProps) {
  if (!isVisible) {
    return null;
  }
  
  return (
    <div className="w-80 bg-white border-r border-slate-200 overflow-y-auto animate-in slide-in-from-left duration-200 shadow-xl">
      <div className="p-4 border-b border-slate-200 bg-orange-50/30 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cpu-orange flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h2 className="font-bold text-slate-900 text-sm">Contenu de la formation</h2>
            <p className="text-[10px] text-slate-500">{chapitres.length} chapitre{chapitres.length > 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100">
        {chapitres.map((chapitre, chapIndex) => {
          const chapitreLecons = chapitre.lecons.map(l => l.id);
          const completedInChapter = completedLecons.filter(id => chapitreLecons.includes(id)).length;
          const progressPercent = Math.round((completedInChapter / chapitre.lecons.length) * 100);
          
          return (
          <div key={chapitre.id} className="p-4 hover:bg-slate-50/50 transition-colors">
            {/* Chapitre Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-cpu-orange text-white flex items-center justify-center text-xs font-bold shadow-sm">
                {chapIndex + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-900 leading-tight mb-1">
                  {chapitre.titre}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {chapitre.lecons.length} leçon{chapitre.lecons.length > 1 ? 's' : ''}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {Math.floor(chapitre.duree / 60)}h {chapitre.duree % 60}min
                  </span>
                </div>
                {/* Barre de progression du chapitre */}
                <div className="relative w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="absolute inset-y-0 left-0 bg-green-500 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-500 mt-1">{completedInChapter}/{chapitre.lecons.length} terminé{completedInChapter > 1 ? 's' : ''}</p>
              </div>
            </div>

            {/* Leçons List */}
            <div className="space-y-1.5 ml-10">
              {chapitre.lecons.map((lecon) => {
                const isCompleted = completedLecons.includes(lecon.id);
                const isCurrent = currentLeconId === lecon.id;

                return (
                  <button
                    key={lecon.id}
                    onClick={() => onLeconSelect(lecon.id)}
                    className={`group w-full text-left p-2.5 rounded-lg text-sm transition-all duration-200 ${
                      isCurrent
                        ? "bg-cpu-orange text-white shadow-md shadow-orange-200 scale-[1.02]"
                        : isCompleted
                        ? "bg-green-50 text-green-800 hover:bg-green-100 border border-green-200/50"
                        : "text-slate-700 hover:bg-slate-50 border border-transparent hover:border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {/* Icon avec badge */}
                      <div className="flex-shrink-0 relative">
                        {isCompleted ? (
                          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        ) : lecon.type === "video" ? (
                          <div className={`w-5 h-5 rounded-full ${
                            isCurrent ? 'bg-white/20' : 'bg-blue-100'
                          } flex items-center justify-center`}>
                            <svg
                              className={`w-3 h-3 ${
                                isCurrent ? "text-white" : "text-blue-600"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        ) : lecon.type === "quiz" ? (
                          <div className={`w-5 h-5 rounded-full ${
                            isCurrent ? 'bg-white/20' : 'bg-orange-100'
                          } flex items-center justify-center`}>
                            <svg
                              className={`w-3 h-3 ${
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
                          </div>
                        ) : (
                          <div className={`w-5 h-5 rounded-full ${
                            isCurrent ? 'bg-white/20' : 'bg-slate-100'
                          } flex items-center justify-center`}>
                            <svg
                              className={`w-3 h-3 ${
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
                          </div>
                        )}
                      </div>

                      {/* Title */}
                      <span className="flex-1 truncate font-medium">{lecon.titre}</span>

                      {/* Duration badge */}
                      {lecon.duree && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            isCurrent
                              ? "bg-white/20 text-white"
                              : isCompleted
                              ? "bg-green-200 text-green-700"
                              : "bg-slate-100 text-slate-600"
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
          );
        })}
      </div>
    </div>
  );
}

