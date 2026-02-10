"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown, LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number;
  evolution: number;
  trend: "up" | "down";
}

export function StatCard({
  icon: Icon,
  label,
  value,
  evolution,
  trend,
}: StatCardProps) {
  const TrendIcon = trend === "up" ? ArrowUp : ArrowDown;

  return (
    <Card className="p-6 hover:shadow-lg transition-all duration-300 border-0 bg-white">
      <div className="flex items-start justify-between mb-4">
        <div className="bg-orange-50 p-3 rounded-xl">
          <Icon className="w-6 h-6 text-cpu-orange" />
        </div>
        {evolution !== 0 && (
          <Badge className="bg-cpu-orange/10 text-cpu-orange border-0">
            <TrendIcon className="w-3 h-3 mr-1" />
            +{Math.abs(evolution)}%
          </Badge>
        )}
      </div>
      <div className="text-3xl font-bold text-slate-900 mb-1">{value}</div>
      <div className="text-sm text-slate-600">{label}</div>
    </Card>
  );
}
