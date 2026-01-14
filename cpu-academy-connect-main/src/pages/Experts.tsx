import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Search,
  Star,
  Users,
} from "lucide-react";
import { useState } from "react";

const experts = [
  {
    id: 1,
    name: "Dr. Kouamé Yao",
    title: "Expert en gestion d'entreprise",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200",
    specialties: ["Gestion PME", "Stratégie", "Finance"],
    region: "Abidjan",
    rating: 4.9,
    students: 450,
    courses: 8,
    bio: "Plus de 15 ans d'expérience dans l'accompagnement des PME ivoiriennes. Docteur en sciences de gestion.",
    certifications: ["MBA HEC Paris", "Expert-comptable OHADA"],
  },
  {
    id: 2,
    name: "Mme Adjoua Koffi",
    title: "Consultante en transformation digitale",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200",
    specialties: ["E-commerce", "Marketing digital", "Réseaux sociaux"],
    region: "Abidjan",
    rating: 4.8,
    students: 320,
    courses: 5,
    bio: "Pionnière du e-commerce en Côte d'Ivoire, accompagne les entreprises dans leur transformation numérique depuis 10 ans.",
    certifications: ["Google Digital Marketing", "Meta Blueprint"],
  },
  {
    id: 3,
    name: "Dr. Coulibaly Seydou",
    title: "Ingénieur agronome",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200",
    specialties: ["Agriculture", "Agroécologie", "AgriTech"],
    region: "Yamoussoukro",
    rating: 4.9,
    students: 520,
    courses: 6,
    bio: "Ingénieur agronome avec 20 ans d'expérience dans l'agriculture durable. Expert en techniques innovantes adaptées au climat tropical.",
    certifications: ["PhD Agronomie", "Certification FAO"],
  },
  {
    id: 4,
    name: "M. Konan Parfait",
    title: "Coach en leadership",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200",
    specialties: ["Leadership", "Management", "Communication"],
    region: "Bouaké",
    rating: 4.7,
    students: 380,
    courses: 4,
    bio: "Ancien DRH de multinationales, aujourd'hui coach certifié accompagnant les leaders africains dans leur développement.",
    certifications: ["ICF Certified Coach", "DISC Certified"],
  },
  {
    id: 5,
    name: "M. Diabaté Ibrahim",
    title: "Expert-comptable",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200&h=200",
    specialties: ["Comptabilité", "Fiscalité", "Audit"],
    region: "Abidjan",
    rating: 4.8,
    students: 290,
    courses: 5,
    bio: "Expert-comptable OHADA avec 18 ans d'expérience. Spécialiste de la fiscalité des PME en Côte d'Ivoire.",
    certifications: ["Expert-comptable ONECCA", "Commissaire aux comptes"],
  },
  {
    id: 6,
    name: "Mme Bamba Fatou",
    title: "Designer et artisane",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200",
    specialties: ["Artisanat", "Design", "Branding"],
    region: "Bouaké",
    rating: 4.6,
    students: 210,
    courses: 3,
    bio: "Créatrice primée, fondatrice d'une marque d'artisanat ivoirien reconnue à l'international.",
    certifications: ["Prix National de l'Artisanat", "Formation CEPICI"],
  },
];

const ExpertsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Tous");

  const allSpecialties = ["Tous", ...new Set(experts.flatMap(e => e.specialties))];

  const filteredExperts = experts.filter(expert => {
    const matchesSearch = expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expert.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === "Tous" || expert.specialties.includes(selectedSpecialty);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cpu-green/10 via-white to-cpu-orange/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-cpu-green/10 text-cpu-green hover:bg-cpu-green/20">
                Nos Experts
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Apprenez des meilleurs
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Nos formateurs sont des experts reconnus dans leurs domaines, 
                avec une expérience terrain en Côte d'Ivoire et dans la région.
              </p>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Rechercher un expert..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {allSpecialties.slice(0, 8).map((specialty) => (
                  <Button
                    key={specialty}
                    variant={selectedSpecialty === specialty ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSpecialty(specialty)}
                  >
                    {specialty}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experts Grid */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredExperts.map((expert) => (
                <Card key={expert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={expert.avatar}
                        alt={expert.name}
                        className="w-20 h-20 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <CardTitle className="text-lg">{expert.name}</CardTitle>
                        <CardDescription>{expert.title}</CardDescription>
                        <div className="flex items-center gap-1 mt-2">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-medium">{expert.rating}</span>
                          <span className="text-gray-400 text-sm">({expert.students} apprenants)</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{expert.bio}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {expert.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {expert.region}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {expert.courses} formations
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="h-4 w-4 mr-1" />
                        Contacter
                      </Button>
                      <Button size="sm" className="flex-1" asChild>
                        <Link to={`/formations?instructor=${expert.id}`}>
                          Voir les formations
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Become an Expert CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 bg-gradient-to-br from-cpu-orange to-cpu-green text-white">
                  <GraduationCap className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Devenez formateur CPU Academy</h3>
                  <p className="opacity-90 mb-6">
                    Partagez votre expertise et accompagnez la montée en compétences des entrepreneurs ivoiriens.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Rémunération attractive
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Flexibilité horaire
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5" />
                      Visibilité nationale
                    </li>
                  </ul>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Conditions requises</h4>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-start gap-2">
                      <Briefcase className="h-5 w-5 text-cpu-orange flex-shrink-0 mt-0.5" />
                      Minimum 5 ans d'expérience dans votre domaine
                    </li>
                    <li className="flex items-start gap-2">
                      <Award className="h-5 w-5 text-cpu-orange flex-shrink-0 mt-0.5" />
                      Diplôme ou certification professionnelle
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="h-5 w-5 text-cpu-orange flex-shrink-0 mt-0.5" />
                      Expérience en formation ou mentorat
                    </li>
                  </ul>
                  <Button size="lg" asChild>
                    <Link to="/devenir-formateur">
                      Postuler maintenant
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ExpertsPage;
