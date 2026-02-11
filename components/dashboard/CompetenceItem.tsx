"use client";

interface CompetenceItemProps {
  nom: string;
  niveau: number;
  couleur: string;
}

export function CompetenceItem({ nom, niveau, couleur }: CompetenceItemProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-slate-900">{nom}</span>
        <span className="text-sm font-bold text-cpu-orange">{niveau}%</span>
      </div>
      <div className="relative w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <div
          className={`${couleur} h-full rounded-full transition-all duration-700`}
          style={{ width: `${niveau}%` }}
          role="progressbar"
          aria-valuenow={niveau}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${nom}: ${niveau}%`}
        ></div>
      </div>
    </div>
  );
}

