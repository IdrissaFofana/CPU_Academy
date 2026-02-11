"use client";

import { LucideIcon } from "lucide-react";

interface ActivityItemProps {
  type: string;
  texte: string;
  date: string;
  icon: LucideIcon;
  color: string;
}

export function ActivityItem({
  type,
  texte,
  date,
  icon: Icon,
  color,
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
      <div className="bg-cpu-orange/10 p-2.5 rounded-full flex-shrink-0">
        <Icon className="w-5 h-5 text-cpu-orange" />
      </div>
      <div className="flex-1">
        <p className="text-slate-900 font-medium mb-1">{texte}</p>
        <p className="text-sm text-slate-500">{date}</p>
      </div>
    </div>
  );
}

