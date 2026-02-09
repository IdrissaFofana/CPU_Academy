"use client";

import { useState } from "react";
import Link from "next/link";
import { Formation } from "@/types";
import { Button } from "@/components/ui/button";

interface FormationSidebarProps {
  formation: Formation;
}

export function FormationSidebar({ formation }: FormationSidebarProps) {
  const [isEnrolled] = useState(false); // TODO: Vérifier si l'utilisateur est inscrit

  return (
    <div className="sticky top-24">
      <div className="bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
        {/* Preview Video Placeholder */}
        <div className="relative aspect-video bg-slate-900">
          {formation.image && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30"
              style={{ backgroundImage: `url(${formation.image})` }}
            />
          )}
          <div className="relative flex items-center justify-center h-full">
            <button className="w-16 h-16 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors">
              <svg
                className="w-8 h-8 text-cpu-orange ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </button>
          </div>
          <div className="absolute top-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-sm">
            Aperçu
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Price */}
          <div>
            {formation.gratuit ? (
              <div className="text-3xl font-bold text-green-600">Gratuit</div>
            ) : (
              <div>
                <div className="text-3xl font-bold text-slate-900">
                  {formation.prixMembre?.toLocaleString()} FCFA
                  <span className="text-sm font-normal text-slate-500 ml-2">
                    / membre
                  </span>
                </div>
                <div className="text-sm text-slate-500 line-through">
                  {formation.prixPublic?.toLocaleString()} FCFA
                </div>
              </div>
            )}
          </div>

          {/* CTA Button */}
          {isEnrolled ? (
            <Link href={`/formations/${formation.slug}/learn`}>
              <Button className="w-full bg-cpu-orange hover:bg-cpu-orange/90 text-white">
                Continuer la formation
              </Button>
            </Link>
          ) : (
            <Link href={`/formations/${formation.slug}/learn`}>
              <Button className="w-full bg-cpu-orange hover:bg-cpu-orange/90 text-white">
                Commencer maintenant
              </Button>
            </Link>
          )}

          {/* Included */}
          <div className="space-y-3 pt-6 border-t border-slate-200">
            <h4 className="font-semibold text-slate-900">
              Cette formation inclut :
            </h4>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{formation.duree} heures de contenu vidéo</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>{formation.livrables.length} ressources téléchargeables</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Accès illimité à vie</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Accès mobile et desktop</span>
              </li>
              {formation.certifiant && (
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Certificat de fin de formation</span>
                </li>
              )}
              <li className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Support formateur</span>
              </li>
            </ul>
          </div>

          {/* Share */}
          <div className="pt-6 border-t border-slate-200">
            <h4 className="font-semibold text-slate-900 mb-3">Partager</h4>
            <div className="flex gap-2">
              <button className="flex-1 p-2 border border-slate-300 rounded hover:bg-slate-50 transition-colors">
                <svg
                  className="w-5 h-5 mx-auto text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button className="flex-1 p-2 border border-slate-300 rounded hover:bg-slate-50 transition-colors">
                <svg
                  className="w-5 h-5 mx-auto text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </button>
              <button className="flex-1 p-2 border border-slate-300 rounded hover:bg-slate-50 transition-colors">
                <svg
                  className="w-5 h-5 mx-auto text-slate-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
