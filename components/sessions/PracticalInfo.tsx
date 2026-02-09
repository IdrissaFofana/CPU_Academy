"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Coffee,
  Wifi,
  Car,
  Users,
  BookOpen,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface PracticalInfoProps {
  formationMode?: "presentiel" | "hybride" | "en-ligne";
}

export function PracticalInfo({ formationMode = "presentiel" }: PracticalInfoProps) {
  return (
    <div className="space-y-6">
      {/* Modalités */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">
          📍 Format de la formation
        </h3>

        <div className="space-y-4">
          {formationMode === "presentiel" && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="font-semibold text-blue-900 mb-2">
                Formation 100% présentielle
              </p>
              <p className="text-blue-800 text-sm">
                Cette formation se déroule intégralement dans nos centres de formation.
                Profitez d'un apprentissage en groupe avec un formateur expert.
              </p>
            </div>
          )}

          {formationMode === "hybride" && (
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
              <p className="font-semibold text-purple-900 mb-2">
                Formation hybride
              </p>
              <p className="text-purple-800 text-sm">
                Combinez le meilleur des deux mondes : sessions présentielles pour
                la pratique et modules en ligne pour la théorie.
              </p>
            </div>
          )}

          {/* Avantages du présentiel */}
          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Interaction directe</p>
                <p className="text-sm text-slate-600">
                  Échangez avec le formateur et les autres participants
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Pratique intensive</p>
                <p className="text-sm text-slate-600">
                  Exercices pratiques et cas réels tout au long de la formation
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Pauses conviviales</p>
                <p className="text-sm text-slate-600">
                  Networking pendant les pauses café et déjeuner
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900">Certification</p>
                <p className="text-sm text-slate-600">
                  Certificat remis en main propre en fin de formation
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Équipements */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">
          🏢 Nos équipements
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <Wifi className="w-5 h-5 text-cpu-orange" />
            <span className="text-slate-700">Wi-Fi haut débit</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <Car className="w-5 h-5 text-cpu-orange" />
            <span className="text-slate-700">Parking gratuit</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <Coffee className="w-5 h-5 text-cpu-orange" />
            <span className="text-slate-700">Espace café</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <BookOpen className="w-5 h-5 text-cpu-orange" />
            <span className="text-slate-700">Supports fournis</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <Users className="w-5 h-5 text-cpu-orange" />
            <span className="text-slate-700">Salles climatisées</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
            <MapPin className="w-5 h-5 text-cpu-orange" />
            <span className="text-slate-700">Accès transports</span>
          </div>
        </div>
      </Card>

      {/* Informations pratiques */}
      <Card className="p-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">
          ℹ️ Informations pratiques
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-slate-900">Restauration</p>
              <p className="text-sm text-slate-600">
                Pause déjeuner de 12h à 13h. Plusieurs restaurants et snacks à
                proximité de nos centres.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-slate-900">Matériel requis</p>
              <p className="text-sm text-slate-600">
                Ordinateur portable personnel recommandé. Possibilité de location
                sur demande (5000 FCFA/jour).
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-slate-900">Accessibilité</p>
              <p className="text-sm text-slate-600">
                Tous nos centres sont accessibles aux personnes à mobilité réduite.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-semibold text-slate-900">Annulation</p>
              <p className="text-sm text-slate-600">
                Annulation gratuite jusqu'à 7 jours avant le début de la formation.
                Remboursement à 100% ou report sur une autre session.
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
