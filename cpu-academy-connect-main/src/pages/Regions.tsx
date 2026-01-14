import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  BookOpen,
  Building,
  Calendar,
  GraduationCap,
  MapPin,
  Users,
} from "lucide-react";
import { regions, villesParRegion, allCourses } from "@/data/courses";

const regionsData = [
  { name: "LAGUNES", capital: "Abidjan", courses: 45, centers: 5, color: "bg-blue-500" },
  { name: "VALLEE DU BANDAMA", capital: "Bouaké", courses: 18, centers: 2, color: "bg-green-500" },
  { name: "BAS-SASSANDRA", capital: "San-Pédro", courses: 12, centers: 1, color: "bg-cyan-500" },
  { name: "SAVANES", capital: "Korhogo", courses: 10, centers: 1, color: "bg-orange-500" },
  { name: "HAUT-SASSANDRA", capital: "Daloa", courses: 8, centers: 1, color: "bg-purple-500" },
  { name: "MONTAGNES", capital: "Man", courses: 7, centers: 1, color: "bg-red-500" },
  { name: "LACS", capital: "Yamoussoukro", courses: 15, centers: 2, color: "bg-amber-500" },
  { name: "ZANZAN", capital: "Bondoukou", courses: 5, centers: 1, color: "bg-pink-500" },
  { name: "FROMAGER", capital: "Gagnoa", courses: 6, centers: 1, color: "bg-indigo-500" },
  { name: "SUD-COMOE", capital: "Aboisso", courses: 4, centers: 1, color: "bg-teal-500" },
  { name: "MOYEN COMOE", capital: "Abengourou", courses: 5, centers: 1, color: "bg-emerald-500" },
  { name: "SUD-BANDAMA", capital: "Divo", courses: 4, centers: 1, color: "bg-lime-500" },
  { name: "WORODOUGOU", capital: "Séguéla", courses: 3, centers: 1, color: "bg-rose-500" },
  { name: "DENGUELE", capital: "Odienné", courses: 3, centers: 1, color: "bg-fuchsia-500" },
  { name: "N'ZI COMOE", capital: "Dimbokro", courses: 4, centers: 1, color: "bg-violet-500" },
  { name: "MARAHOUE", capital: "Bouaflé", courses: 3, centers: 1, color: "bg-sky-500" },
  { name: "AGNEBY", capital: "Agboville", courses: 4, centers: 1, color: "bg-slate-500" },
  { name: "BAFFING", capital: "Touba", courses: 2, centers: 1, color: "bg-stone-500" },
  { name: "MOYEN CAVALLY", capital: "Guiglo", courses: 3, centers: 1, color: "bg-zinc-500" },
];

const upcomingSessions = [
  { region: "LAGUNES", city: "Abidjan", formation: "Gestion PME", date: "15 Jan 2026", places: 25 },
  { region: "VALLEE DU BANDAMA", city: "Bouaké", formation: "Artisanat créatif", date: "20 Jan 2026", places: 20 },
  { region: "LACS", city: "Yamoussoukro", formation: "Agriculture innovante", date: "10 Fév 2026", places: 30 },
  { region: "BAS-SASSANDRA", city: "San-Pédro", formation: "Transport & Logistique", date: "1 Mar 2026", places: 15 },
  { region: "SAVANES", city: "Korhogo", formation: "Élevage moderne", date: "5 Mar 2026", places: 20 },
];

const RegionsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cpu-green/10 via-white to-cpu-orange/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-cpu-orange/10 text-cpu-orange hover:bg-cpu-orange/20">
                Présence Nationale
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                CPU Academy dans toute la Côte d'Ivoire
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Formations en présentiel disponibles dans les 19 régions du pays, 
                avec des centres partenaires et des sessions régulières.
              </p>
              <div className="flex justify-center gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-cpu-orange">19</div>
                  <div className="text-gray-600">Régions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cpu-green">25+</div>
                  <div className="text-gray-600">Centres partenaires</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-cpu-orange">150+</div>
                  <div className="text-gray-600">Formations/an</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regions Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Sélectionnez votre région
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {regionsData.map((region) => (
                <Link key={region.name} to={`/formations?region=${encodeURIComponent(region.name)}`}>
                  <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className={`w-3 h-3 rounded-full ${region.color} mb-2`}></div>
                      <CardTitle className="text-sm font-semibold">{region.name}</CardTitle>
                      <CardDescription className="text-xs">{region.capital}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <BookOpen className="h-3 w-3" />
                        {region.courses} formations
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <Building className="h-3 w-3" />
                        {region.centers} centre{region.centers > 1 ? 's' : ''}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Sessions */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Prochaines sessions en présentiel</h2>
                <p className="text-gray-600">Inscrivez-vous aux formations près de chez vous</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/formations?format=Présentiel">
                  Voir toutes les sessions
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingSessions.map((session, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge variant="outline" className="mb-2">{session.region}</Badge>
                        <CardTitle className="text-lg">{session.formation}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <MapPin className="h-4 w-4" />
                          {session.city}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        {session.date}
                      </span>
                      <span className="flex items-center gap-1 text-gray-600">
                        <Users className="h-4 w-4" />
                        {session.places} places
                      </span>
                    </div>
                    <Button className="w-full mt-4" size="sm">
                      S'inscrire
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Centers */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos centres partenaires</h2>
                <p className="text-gray-600">
                  CPU Academy s'appuie sur un réseau de centres de formation partenaires 
                  dans tout le pays pour vous offrir des formations de qualité près de chez vous.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="text-center">
                  <CardHeader>
                    <div className="bg-cpu-orange/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                      <Building className="h-8 w-8 text-cpu-orange" />
                    </div>
                    <CardTitle>Chambres de Commerce</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Partenariat avec les CCI régionales pour les formations en entreprise
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="bg-cpu-green/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                      <GraduationCap className="h-8 w-8 text-cpu-green" />
                    </div>
                    <CardTitle>Universités & Grandes Écoles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Accès aux infrastructures académiques pour les formations certifiantes
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center">
                  <CardHeader>
                    <div className="bg-cpu-orange/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                      <Users className="h-8 w-8 text-cpu-orange" />
                    </div>
                    <CardTitle>Espaces coworking</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">
                      Sessions dans les hubs d'innovation et espaces de travail partagés
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-cpu-orange to-cpu-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Vous êtes un centre de formation ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Rejoignez le réseau CPU Academy et accueillez nos formations dans votre établissement.
            </p>
            <Button size="lg" variant="secondary" className="bg-white text-cpu-orange hover:bg-gray-100" asChild>
              <Link to="/contact">Devenir partenaire</Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default RegionsPage;
