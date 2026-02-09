"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Euro,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import type { SessionPresentiel } from "@/types";

interface SessionCardProps {
  session: SessionPresentiel;
}

export function SessionCard({ session }: SessionCardProps) {
  const placesRestantes = session.capacite - session.inscrits;
  const tauxRemplissage = (session.inscrits / session.capacite) * 100;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card
      className={`p-6 border-2 transition-all duration-300 ${
        placesRestantes === 0
          ? "border-red-200 bg-red-50/50"
          : "border-slate-200 hover:border-cpu-orange hover:shadow-lg"
      }`}
    >
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Dates */}
        <div className="lg:w-1/4 flex flex-col items-center justify-center bg-gradient-to-br from-cpu-orange to-orange-600 text-white rounded-xl p-6">
          <Calendar className="w-8 h-8 mb-3" />
          <p className="text-sm font-medium mb-1">Du</p>
          <p className="text-2xl font-bold">
            {new Date(session.dateDebut).getDate()}
          </p>
          <p className="text-sm mb-3">
            {new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(
              new Date(session.dateDebut)
            )}
          </p>
          <p className="text-sm font-medium mb-1">Au</p>
          <p className="text-2xl font-bold">
            {new Date(session.dateFin).getDate()}
          </p>
          <p className="text-sm">
            {new Intl.DateTimeFormat("fr-FR", { month: "long" }).format(
              new Date(session.dateFin)
            )}
          </p>
        </div>

        {/* Infos */}
        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Session {session.id.split("-").pop()}
              </h3>
              {placesRestantes === 0 ? (
                <Badge className="bg-red-500 text-white border-0">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  COMPLET
                </Badge>
              ) : placesRestantes <= 3 ? (
                <Badge className="bg-orange-500 text-white border-0">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Places limitées
                </Badge>
              ) : (
                <Badge className="bg-green-500 text-white border-0">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Places disponibles
                </Badge>
              )}
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-cpu-orange">
                {session.prix.toLocaleString()} FCFA
              </p>
              <p className="text-sm text-slate-600">TVA incluse</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {session.centre && (
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cpu-orange flex-shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-slate-900">
                    {session.centre.nom}
                  </p>
                  <p className="text-sm text-slate-600">
                    {session.centre.ville}
                  </p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-cpu-orange flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold text-slate-900">Horaires</p>
                <p className="text-sm text-slate-600">{session.horaires}</p>
              </div>
            </div>
          </div>

          {/* Jauge de remplissage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-slate-700">
                <Users className="w-4 h-4 text-cpu-orange" />
                <span className="font-medium">
                  {session.inscrits}/{session.capacite} inscrits
                </span>
              </div>
              <span className="text-sm text-slate-600">
                {placesRestantes} {placesRestantes > 1 ? "places restantes" : "place restante"}
              </span>
            </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  tauxRemplissage >= 90
                    ? "bg-red-500"
                    : tauxRemplissage >= 70
                    ? "bg-orange-500"
                    : "bg-green-500"
                }`}
                style={{ width: `${tauxRemplissage}%` }}
              />
            </div>
          </div>

          {/* Matériel */}
          {session.materielFourni && session.materielFourni.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm font-semibold text-blue-900 mb-2">
                Matériel fourni
              </p>
              <div className="flex flex-wrap gap-2">
                {session.materielFourni.map((item, idx) => (
                  <Badge
                    key={idx}
                    variant="outline"
                    className="bg-white border-blue-200 text-blue-700"
                  >
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Action */}
          <div className="flex gap-3 pt-2">
            {placesRestantes > 0 ? (
              <>
                <Button className="flex-1 bg-cpu-orange hover:bg-cpu-orange/90 text-white">
                  Réserver ma place
                </Button>
                <Link href={`/centres-formation`}>
                  <Button variant="outline" className="hover:bg-slate-50">
                    <MapPin className="w-4 h-4 mr-2" />
                    Voir le centre
                  </Button>
                </Link>
              </>
            ) : (
              <Button variant="outline" className="flex-1" disabled>
                <AlertCircle className="w-4 h-4 mr-2" />
                Session complète
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
