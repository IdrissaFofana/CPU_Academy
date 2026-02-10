"use client";

import { Clock } from "lucide-react";
import type { Session } from "@/types/dashboard";

interface SessionCardProps {
  session: Session;
}

export function SessionCard({ session }: SessionCardProps) {
  const [mois, jour] = session.date.split(" ");

  return (
    <div className="p-4 border-2 border-slate-100 rounded-lg hover:border-cpu-orange transition-all">
      <div className="flex items-start gap-3">
        <div className="bg-orange-50 px-3 py-2 rounded-lg text-center flex-shrink-0 border border-orange-200">
          <div className="text-xs font-semibold text-cpu-orange">{mois}</div>
          <div className="text-lg font-bold text-slate-900">{jour}</div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2">
            {session.titre}
          </h4>
          <p className="text-xs text-slate-600 mb-2">{session.formateur}</p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Clock className="w-3 h-3" />
            {session.heure}
          </div>
        </div>
      </div>
    </div>
  );
}
