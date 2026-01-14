
import { Card, CardContent } from "@/components/ui/card";
import { Award, BookOpen, Briefcase, Users } from "lucide-react";

const Stats = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-cpu-orange/10 to-cpu-green/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre impact en chiffres</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            CPU-Académie s'engage à former les professionnels et entrepreneurs ivoiriens pour répondre aux besoins du marché du travail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={<Users className="h-8 w-8 text-cpu-orange" />}
            value="10,000+"
            label="Apprenants formés"
            description="Professionnels qui ont suivi nos formations"
          />
          <StatCard 
            icon={<BookOpen className="h-8 w-8 text-cpu-orange" />}
            value="350+"
            label="Formations disponibles"
            description="Dans tous les secteurs d'activité clés"
          />
          <StatCard 
            icon={<Award className="h-8 w-8 text-cpu-orange" />}
            value="85%"
            label="Taux d'employabilité"
            description="De nos apprenants certifiés trouvent un emploi"
          />
          <StatCard 
            icon={<Briefcase className="h-8 w-8 text-cpu-orange" />}
            value="200+"
            label="Entreprises partenaires"
            description="Qui recrutent nos talents certifiés"
          />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-center mb-8">Employabilité par filière</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <EmployabilityCard 
              sector="Numérique & Digital"
              rate={92}
              color="bg-blue-500"
            />
            <EmployabilityCard 
              sector="Agro-industrie"
              rate={78}
              color="bg-green-500"
            />
            <EmployabilityCard 
              sector="Commerce & Services"
              rate={85}
              color="bg-purple-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
}

const StatCard = ({ icon, value, label, description }: StatCardProps) => {
  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
      <CardContent className="p-6 text-center">
        <div className="inline-flex items-center justify-center rounded-full p-3 bg-gray-100 mb-4">
          {icon}
        </div>
        <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
        <p className="text-lg font-medium text-gray-800 mb-2">{label}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

interface EmployabilityCardProps {
  sector: string;
  rate: number;
  color: string;
}

const EmployabilityCard = ({ sector, rate, color }: EmployabilityCardProps) => {
  return (
    <Card className="border-none shadow-sm overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <h4 className="font-medium text-gray-900 mb-2">{sector}</h4>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold">{rate}%</span>
            <span className="text-sm text-gray-500">Taux d'employabilité</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className={`h-2.5 rounded-full ${color}`} 
              style={{ width: `${rate}%` }}
            ></div>
          </div>
        </div>
        <div className={`${color} h-1 w-full`}></div>
      </CardContent>
    </Card>
  );
};

export default Stats;
