"use client";

import { AlertCircle, Clock } from "lucide-react";
import type { Deadline } from "@/types/dashboard";

interface DeadlineItemProps {
  deadline: Deadline;
}

export function DeadlineItem({ deadline }: DeadlineItemProps) {
  return (
    <div
      className={`p-4 rounded-lg border-2 ${
        deadline.urgent
          ? "bg-orange-50 border-cpu-orange"
          : "bg-slate-50 border-slate-200"
      }`}
    >
      <div className="flex items-start gap-3">
        {deadline.urgent && (
          <AlertCircle
            className="w-5 h-5 text-cpu-orange flex-shrink-0 mt-0.5"
            aria-label="Urgent"
          />
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-slate-900 text-sm mb-2 line-clamp-2">
            {deadline.titre}
          </h4>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-500" />
            <span
              className={`text-xs font-medium ${
                deadline.urgent ? "text-cpu-orange" : "text-slate-600"
              }`}
            >
              Dans {deadline.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

