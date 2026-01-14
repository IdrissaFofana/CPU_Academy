
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import Testimonials from "@/components/home/Testimonials";
import Stats from "@/components/home/Stats";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Award, BadgeCheck, BarChart4, Briefcase, GraduationCap, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Section Héro */}
        <Hero />
        
        {/* Section Formations mises en avant */}
        <FeaturedCourses />
        
        {/* Section À propos de CPU-Académie */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  L'académie de formation de référence en Côte d'Ivoire
                </h2>
                <p className="text-gray-600 mb-6">
                  CPU-Académie est une initiative de la Confédération Patronale Unique des PME de Côte d'Ivoire (CPU-PME.CI), 
                  dédiée au renforcement des compétences des entrepreneurs et professionnels ivoiriens.
                </p>
                <p className="text-gray-600 mb-8">
                  Notre mission est de proposer des formations de qualité, adaptées aux besoins du marché local, 
                  pour favoriser le développement des entreprises et la création d'emplois qualifiés en Côte d'Ivoire.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FeatureItem icon={<GraduationCap className="h-5 w-5" />} text="Formations certifiantes" />
                  <FeatureItem icon={<Users className="h-5 w-5" />} text="Formateurs experts" />
                  <FeatureItem icon={<Briefcase className="h-5 w-5" />} text="Formations pratiques" />
                  <FeatureItem icon={<BadgeCheck className="h-5 w-5" />} text="Certifications reconnues" />
                </div>
                
                <div className="mt-8">
                  <Button asChild>
                    <Link to="/a-propos">
                      En savoir plus <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="aspect-square rounded-lg overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800&h=800"
                    alt="Formation CPU-Académie" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white rounded-lg p-4 shadow-lg max-w-xs border-l-4 border-cpu-orange">
                  <div className="flex items-center">
                    <Award className="h-10 w-10 text-cpu-orange mr-3" />
                    <div>
                      <div className="text-gray-900 font-medium">Certifications professionnelles</div>
                      <div className="text-sm text-gray-500">Reconnues à l'échelle nationale</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Section Statistiques */}
        <Stats />
        
        {/* Section Témoignages */}
        <Testimonials />
        
        {/* Section Calendrier */}
        <UpcomingEvents />
        
        {/* Section CTA */}
        <section className="py-16 bg-gradient-to-r from-cpu-orange to-cpu-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à développer vos compétences?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Rejoignez CPU-Académie et accédez à des formations de qualité adaptées aux besoins du marché ivoirien.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" variant="secondary" className="bg-white text-cpu-orange hover:bg-gray-100" asChild>
                <Link to="/formations">Explorer les formations</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
}

const FeatureItem = ({ icon, text }: FeatureItemProps) => {
  return (
    <div className="flex items-center">
      <div className="bg-cpu-orange/10 rounded-full p-2 mr-3">
        <div className="text-cpu-orange">{icon}</div>
      </div>
      <span className="text-gray-700">{text}</span>
    </div>
  );
};

export default Index;
