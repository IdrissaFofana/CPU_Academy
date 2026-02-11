import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Award, Building2 } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Apprenants actifs",
    color: "text-cpu-orange"
  },
  {
    icon: BookOpen,
    value: "250+",
    label: "Formations disponibles",
    color: "text-cpu-green"
  },
  {
    icon: Award,
    value: "5,000+",
    label: "Certifications délivrées",
    color: "text-cpu-orange"
  },
  {
    icon: Building2,
    value: "500+",
    label: "Entreprises partenaires",
    color: "text-cpu-green"
  }
];

export function StatsSection() {
  return (
    <section className="py-10 md:py-16 bg-white">
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className={`text-center animate-scale-in animation-delay-${(index + 1) * 100}`}>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className={`p-3 rounded-full bg-slate-100 ${stat.color}`}>
                    <stat.icon className="h-8 w-8" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

