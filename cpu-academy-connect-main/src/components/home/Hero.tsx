
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 md:py-24">
      {/* Forme décorative */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-cpu-orange opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cpu-green opacity-10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Formez-vous aux métiers d'avenir avec <span className="text-cpu-orange">CPU-Académie</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              La plateforme de formation professionnelle de la Confédération Patronale Unique des PME de Côte d'Ivoire.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/formations">
                  Découvrir nos formations <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/entreprises">Pour les entreprises</Link>
              </Button>
            </div>
            
            <div className="mt-8 flex items-center gap-4 text-sm">
              <div className="flex items-center">
                <CheckIcon className="text-cpu-orange mr-2" />
                <span>Formations certifiantes</span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="text-cpu-orange mr-2" />
                <span>Experts du secteur</span>
              </div>
              <div className="flex items-center">
                <CheckIcon className="text-cpu-orange mr-2" />
                <span>Accompagnement personnalisé</span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl transform rotate-2">
              <img 
                src="/lovable-uploads/4e4206a8-8392-4c0d-bd59-ac3dd2751555.png"
                alt="Apprenants en formation CPU-Académie" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg p-4 shadow-lg transform -rotate-3 max-w-xs">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-cpu-orange rounded-full flex items-center justify-center text-white font-bold">
                  +350
                </div>
                <div className="ml-3">
                  <div className="text-gray-900 font-medium">Formations disponibles</div>
                  <div className="text-sm text-gray-500">Pour tous les niveaux</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Icône de validation
const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`w-5 h-5 ${className}`}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

export default Hero;
