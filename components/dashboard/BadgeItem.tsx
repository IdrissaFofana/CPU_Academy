"use client";

import { Lock, LucideIcon } from "lucide-react";

interface BadgeItemProps {
  id: number;
  nom: string;
  description: string;
  icon: LucideIcon;
  unlocked: boolean;
  color: string;
}

export function BadgeItem({
  id,
  nom,
  description,
  icon: Icon,
  unlocked,
  color,
}: BadgeItemProps) {
  return (
    <div
      className={`p-3 rounded-xl border-2 text-center transition-all ${
        unlocked
          ? "border-slate-200 hover:border-cpu-orange cursor-pointer bg-white"
          : "border-slate-100 opacity-50 bg-slate-50"
      }`}
      aria-label={`Badge: ${nom} ${unlocked ? "débloqué" : "verrouillé"}`}
    >
      <div
        className={`${color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 relative`}
      >
        <Icon className="w-6 h-6 text-white" />
        {!unlocked && (
          <div className="absolute inset-0 bg-slate-300/70 rounded-full flex items-center justify-center">
            <Lock className="w-4 h-4 text-slate-500" />
          </div>
        )}
      </div>
      <h4 className="font-bold text-xs text-slate-900 mb-0.5">{nom}</h4>
      <p className="text-[10px] text-slate-600 line-clamp-2">{description}</p>
    </div>
  );
}

