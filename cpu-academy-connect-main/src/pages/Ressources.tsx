import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  BookOpen,
  Calendar,
  Download,
  FileText,
  Filter,
  FolderOpen,
  Play,
  Search,
  Video,
} from "lucide-react";
import { useState } from "react";

const guides = [
  {
    id: 1,
    title: "Guide de création d'entreprise en Côte d'Ivoire",
    description: "Toutes les étapes pour créer votre entreprise, de l'idée à l'immatriculation.",
    category: "Création d'entreprise",
    type: "PDF",
    pages: 45,
    downloads: 1250,
  },
  {
    id: 2,
    title: "Modèle de Business Plan",
    description: "Template complet avec exemples pour construire votre business plan.",
    category: "Business Plan",
    type: "Word/Excel",
    pages: 20,
    downloads: 890,
  },
  {
    id: 3,
    title: "Kit de réponse aux appels d'offres",
    description: "Tous les documents types pour répondre aux marchés publics.",
    category: "Marchés publics",
    type: "ZIP",
    pages: 35,
    downloads: 670,
  },
  {
    id: 4,
    title: "Guide fiscal des PME",
    description: "Comprendre et optimiser sa fiscalité en Côte d'Ivoire.",
    category: "Fiscalité",
    type: "PDF",
    pages: 60,
    downloads: 540,
  },
  {
    id: 5,
    title: "Modèles de contrats de travail",
    description: "CDD, CDI, stage : tous les modèles conformes au droit ivoirien.",
    category: "RH",
    type: "Word",
    pages: 15,
    downloads: 980,
  },
  {
    id: 6,
    title: "Check-list qualité HACCP",
    description: "Guide pratique pour la mise en conformité agroalimentaire.",
    category: "Qualité",
    type: "PDF",
    pages: 25,
    downloads: 320,
  },
];

const webinars = [
  {
    id: 1,
    title: "Comment lever des fonds pour sa PME en 2026",
    description: "Les stratégies gagnantes pour financer votre croissance.",
    date: "25 Janvier 2026",
    time: "14h00 - 16h00",
    speaker: "M. Kouassi Bernard",
    speakerTitle: "Expert en financement PME",
    status: "upcoming",
    registrations: 145,
  },
  {
    id: 2,
    title: "E-commerce : réussir sa boutique en ligne",
    description: "Les clés du succès pour vendre sur internet en Côte d'Ivoire.",
    date: "5 Février 2026",
    time: "10h00 - 12h00",
    speaker: "Mme Adjoua Koffi",
    speakerTitle: "Consultante e-commerce",
    status: "upcoming",
    registrations: 98,
  },
  {
    id: 3,
    title: "Marchés publics : décrocher son premier contrat",
    description: "Retour d'expérience et conseils pratiques.",
    date: "15 Décembre 2025",
    time: "14h00 - 16h00",
    speaker: "M. Tra Bi Jean",
    speakerTitle: "Expert marchés publics",
    status: "replay",
    views: 520,
  },
  {
    id: 4,
    title: "Comptabilité simplifiée pour les entrepreneurs",
    description: "Les bases pour bien gérer ses comptes.",
    date: "20 Novembre 2025",
    time: "10h00 - 12h00",
    speaker: "M. Diabaté Ibrahim",
    speakerTitle: "Expert-comptable",
    status: "replay",
    views: 890,
  },
];

const categories = ["Tous", "Création d'entreprise", "Business Plan", "Fiscalité", "RH", "Marchés publics", "Qualité"];

const RessourcesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [activeTab, setActiveTab] = useState<"guides" | "webinars">("guides");

  const filteredGuides = guides.filter(guide => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Tous" || guide.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cpu-orange/10 via-white to-cpu-green/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-cpu-orange/10 text-cpu-orange hover:bg-cpu-orange/20">
                Centre de Ressources
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Guides, modèles et webinaires
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Des ressources gratuites pour accompagner le développement de votre entreprise.
              </p>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="py-8 bg-white border-b sticky top-20 z-40">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex gap-2">
                <Button
                  variant={activeTab === "guides" ? "default" : "outline"}
                  onClick={() => setActiveTab("guides")}
                >
                  <FolderOpen className="h-4 w-4 mr-2" />
                  Guides & Modèles
                </Button>
                <Button
                  variant={activeTab === "webinars" ? "default" : "outline"}
                  onClick={() => setActiveTab("webinars")}
                >
                  <Video className="h-4 w-4 mr-2" />
                  Webinaires
                </Button>
              </div>

              {activeTab === "guides" && (
                <div className="flex gap-4 items-center">
                  <div className="relative w-64">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Rechercher..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Guides Section */}
        {activeTab === "guides" && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              {/* Category filters */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGuides.map((guide) => (
                  <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="bg-cpu-orange/10 text-cpu-orange p-3 rounded-lg">
                          <FileText className="h-6 w-6" />
                        </div>
                        <Badge variant="secondary">{guide.type}</Badge>
                      </div>
                      <CardTitle className="text-lg mt-4">{guide.title}</CardTitle>
                      <CardDescription>{guide.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          {guide.pages} pages
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="h-4 w-4" />
                          {guide.downloads} téléchargements
                        </span>
                      </div>
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Webinars Section */}
        {activeTab === "webinars" && (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              {/* Upcoming Webinars */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-cpu-orange" />
                  Prochains webinaires
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {webinars
                    .filter((w) => w.status === "upcoming")
                    .map((webinar) => (
                      <Card key={webinar.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-cpu-orange">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-cpu-orange text-white">À venir</Badge>
                            <span className="text-sm text-gray-500">{webinar.date}</span>
                          </div>
                          <CardTitle>{webinar.title}</CardTitle>
                          <CardDescription>{webinar.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="bg-gray-100 p-2 rounded-full">
                              <Video className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{webinar.speaker}</p>
                              <p className="text-sm text-gray-500">{webinar.speakerTitle}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">
                              {webinar.time} • {webinar.registrations} inscrits
                            </span>
                            <Button>S'inscrire</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>

              {/* Replays */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Play className="h-6 w-6 text-cpu-green" />
                  Replays disponibles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {webinars
                    .filter((w) => w.status === "replay")
                    .map((webinar) => (
                      <Card key={webinar.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">Replay</Badge>
                            <span className="text-sm text-gray-500">{webinar.date}</span>
                          </div>
                          <CardTitle>{webinar.title}</CardTitle>
                          <CardDescription>{webinar.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-3 mb-4">
                            <div className="bg-gray-100 p-2 rounded-full">
                              <Video className="h-5 w-5 text-gray-600" />
                            </div>
                            <div>
                              <p className="font-medium">{webinar.speaker}</p>
                              <p className="text-sm text-gray-500">{webinar.speakerTitle}</p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500">{webinar.views} vues</span>
                            <Button variant="outline">
                              <Play className="h-4 w-4 mr-2" />
                              Voir le replay
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-cpu-orange to-cpu-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Besoin d'un accompagnement personnalisé ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Nos experts sont là pour vous aider dans le développement de votre entreprise.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-cpu-orange hover:bg-gray-100" asChild>
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default RessourcesPage;
