"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";
import { Lecon } from "@/types";

interface ContentTabsProps {
  lecon: Lecon;
  notes: string;
  onNotesChange: (notes: string) => void;
}

type Tab = "apercu" | "notes" | "ressources" | "transcription";

export function ContentTabs({ lecon, notes, onNotesChange }: ContentTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("apercu");

  return (
    <div className="bg-white">
      {/* Tabs */}
      <div className="border-b border-slate-200 px-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab("apercu")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "apercu"
                ? "border-cpu-orange text-cpu-orange"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            Aperçu
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === "notes"
                ? "border-cpu-orange text-cpu-orange"
                : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
            }`}
          >
            Mes notes
          </button>
          {lecon.ressources && lecon.ressources.length > 0 && (
            <button
              onClick={() => setActiveTab("ressources")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "ressources"
                  ? "border-cpu-orange text-cpu-orange"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              Ressources ({lecon.ressources.length})
            </button>
          )}
          {lecon.type === "video" && (
            <button
              onClick={() => setActiveTab("transcription")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "transcription"
                  ? "border-cpu-orange text-cpu-orange"
                  : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
              }`}
            >
              Transcription
            </button>
          )}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6 min-h-[200px]">
        {activeTab === "apercu" && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">
              {lecon.titre}
            </h3>
            {lecon.contenu && (
              <p className="text-slate-700 leading-relaxed">{lecon.contenu}</p>
            )}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900">Mes notes personnelles</h3>
              <span className="text-xs text-slate-500">
                Sauvegarde automatique
              </span>
            </div>
            <textarea
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              placeholder="Écrivez vos notes ici... Elles seront automatiquement sauvegardées."
              className="w-full h-64 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-cpu-orange focus:border-transparent resize-none"
            />
            <p className="text-xs text-slate-500 flex items-center gap-2">
              <Lightbulb className="w-3 h-3" />
              Astuce : Utilisez cette section pour noter les points clés et vos
              réflexions personnelles.
            </p>
          </div>
        )}

        {activeTab === "ressources" && (
          <div className="space-y-3">
            <h3 className="font-semibold text-slate-900 mb-4">
              Ressources téléchargeables
            </h3>
            {lecon.ressources && lecon.ressources.length > 0 ? (
              <div className="space-y-2">
                {lecon.ressources.map((ressource) => (
                  <div
                    key={ressource.id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon based on type */}
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cpu-orange/10 flex items-center justify-center">
                        {ressource.type === "pdf" && (
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
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                        )}
                        {ressource.type === "xls" && (
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        )}
                        {(ressource.type === "modele" || ressource.type === "checklist" || ressource.type === "doc") && (
                          <svg
                            className="w-5 h-5 text-blue-600"
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

                      {/* Info */}
                      <div>
                        <p className="font-medium text-slate-900">
                          {ressource.nom}
                        </p>
                        {ressource.taille && (
                          <p className="text-sm text-slate-500">
                            {ressource.taille}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Download Button */}
                    <button className="flex items-center gap-2 px-4 py-2 bg-cpu-orange text-white rounded-lg hover:bg-cpu-orange/90 transition-colors">
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
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Télécharger
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-8">
                Aucune ressource disponible pour cette leçon
              </p>
            )}
          </div>
        )}

        {activeTab === "transcription" && (
          <div className="space-y-4">
            <h3 className="font-semibold text-slate-900">
              Transcription de la vidéo
            </h3>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed">
                [Transcription simulée] - Cette fonctionnalité affichera la
                transcription complète de la vidéo une fois l'API intégrée.
              </p>
              <p className="text-slate-600 leading-relaxed">
                {lecon.contenu || "Contenu non disponible"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

