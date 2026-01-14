import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star, 
  MapPin, 
  Calendar,
  BookOpen,
  Award,
  TrendingUp,
  Grid3X3,
  List
} from "lucide-react";
import { allCourses, sectors, levels, formats, regions, villes, filieres } from "@/data/courses";

const Formations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("Tous");
  const [selectedLevel, setSelectedLevel] = useState("Tous");
  const [selectedFormat, setSelectedFormat] = useState("Tous");
  const [selectedRegion, setSelectedRegion] = useState("Toutes");
  const [selectedVille, setSelectedVille] = useState("Toutes");
  const [selectedFiliere, setSelectedFiliere] = useState("Toutes");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Obtenir les filières disponibles selon le secteur sélectionné
  const availableFilieres = useMemo(() => {
    if (selectedSector === "Tous") return ["Toutes"];
    return ["Toutes", ...(filieres[selectedSector as keyof typeof filieres] || [])];
  }, [selectedSector]);

  const filteredCourses = useMemo(() => {
    return allCourses.filter((course) => {
      const matchesSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSector = selectedSector === "Tous" || course.sector === selectedSector;
      const matchesLevel = selectedLevel === "Tous" || course.level === selectedLevel;
      const matchesFormat = selectedFormat === "Tous" || course.format === selectedFormat;
      const matchesRegion = selectedRegion === "Toutes" || course.region === selectedRegion;
      const matchesVille = selectedVille === "Toutes" || course.location === selectedVille;
      const matchesFiliere = selectedFiliere === "Toutes" || course.filiere === selectedFiliere;

      return matchesSearch && matchesSector && matchesLevel && matchesFormat && matchesRegion && matchesVille && matchesFiliere;
    });
  }, [searchQuery, selectedSector, selectedLevel, selectedFormat, selectedRegion, selectedVille, selectedFiliere]);

  const popularCourses = useMemo(() => {
    return [...allCourses].sort((a, b) => b.students - a.students).slice(0, 4);
  }, []);

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedSector("Tous");
    setSelectedLevel("Tous");
    setSelectedFormat("Tous");
    setSelectedRegion("Toutes");
    setSelectedVille("Toutes");
    setSelectedFiliere("Toutes");
  };

  // Reset filière quand le secteur change
  const handleSectorChange = (value: string) => {
    setSelectedSector(value);
    setSelectedFiliere("Toutes");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="mb-4 bg-primary/20 text-primary hover:bg-primary/30">
                <BookOpen className="w-4 h-4 mr-2" />
                Catalogue de formations
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Développez vos compétences avec nos formations
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Plus de {allCourses.length} formations professionnelles adaptées aux besoins 
                du marché ivoirien, dispensées par des experts reconnus.
              </p>
              
              {/* Barre de recherche principale */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Rechercher une formation..."
                  className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-primary/20 focus:border-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Stats rapides */}
        <section className="py-8 bg-card border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{allCourses.length}+</div>
                <div className="text-sm text-muted-foreground">Formations disponibles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">8</div>
                <div className="text-sm text-muted-foreground">Secteurs d'activité</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">
                  {allCourses.reduce((acc, c) => acc + c.students, 0).toLocaleString()}+
                </div>
                <div className="text-sm text-muted-foreground">Apprenants formés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">
                  {allCourses.filter(c => c.certification).length}
                </div>
                <div className="text-sm text-muted-foreground">Formations certifiantes</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filtres et résultats */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="all" className="w-full">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    Toutes les formations
                  </TabsTrigger>
                  <TabsTrigger value="popular" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Populaires
                  </TabsTrigger>
                  <TabsTrigger value="certified" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                    <Award className="w-4 h-4 mr-2" />
                    Certifiantes
                  </TabsTrigger>
                </TabsList>

                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Filtres */}
              <div className="bg-card rounded-lg p-4 mb-8 border">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Filtrer les formations</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Secteur</label>
                    <Select value={selectedSector} onValueChange={handleSectorChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Secteur" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectors.map((sector) => (
                          <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Filière</label>
                    <Select value={selectedFiliere} onValueChange={setSelectedFiliere} disabled={selectedSector === "Tous"}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filière" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableFilieres.map((filiere) => (
                          <SelectItem key={filiere} value={filiere}>{filiere}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Niveau</label>
                    <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Niveau" />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Format</label>
                    <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                      <SelectTrigger>
                        <SelectValue placeholder="Format" />
                      </SelectTrigger>
                      <SelectContent>
                        {formats.map((format) => (
                          <SelectItem key={format} value={format}>{format}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Région</label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger>
                        <SelectValue placeholder="Région" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region} value={region}>{region}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Ville</label>
                    <Select value={selectedVille} onValueChange={setSelectedVille}>
                      <SelectTrigger>
                        <SelectValue placeholder="Ville" />
                      </SelectTrigger>
                      <SelectContent>
                        {villes.map((ville) => (
                          <SelectItem key={ville} value={ville}>{ville}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    Réinitialiser les filtres
                  </Button>
                </div>
              </div>

              <TabsContent value="all">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    {filteredCourses.length} formation{filteredCourses.length > 1 ? "s" : ""} trouvée{filteredCourses.length > 1 ? "s" : ""}
                  </p>
                </div>
                <CourseGrid courses={filteredCourses} viewMode={viewMode} />
              </TabsContent>

              <TabsContent value="popular">
                <CourseGrid courses={popularCourses} viewMode={viewMode} />
              </TabsContent>

              <TabsContent value="certified">
                <CourseGrid 
                  courses={filteredCourses.filter(c => c.certification)} 
                  viewMode={viewMode} 
                />
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Besoin d'une formation sur mesure ?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              CPU-Académie propose également des formations personnalisées pour les entreprises et organisations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/entreprises">Formations entreprises</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
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

interface CourseGridProps {
  courses: typeof allCourses;
  viewMode: "grid" | "list";
}

const CourseGrid = ({ courses, viewMode }: CourseGridProps) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-16">
        <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Aucune formation trouvée</h3>
        <p className="text-muted-foreground">
          Essayez de modifier vos critères de recherche
        </p>
      </div>
    );
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        {courses.map((course) => (
          <CourseListItem key={course.id} course={course} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

const CourseCard = ({ course }: { course: typeof allCourses[0] }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
      <div className="aspect-[16/10] w-full overflow-hidden relative">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {course.certification && (
          <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
            <Award className="w-3 h-3 mr-1" />
            Certifiante
          </Badge>
        )}
        <Badge className="absolute top-3 left-3 bg-background/90 text-foreground">
          {course.format}
        </Badge>
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start gap-2 mb-2">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {course.sector}
          </Badge>
          <Badge variant="secondary" className="bg-secondary/20 text-secondary">
            {course.level}
          </Badge>
        </div>
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className="line-clamp-2 mb-4">
          {course.description}
        </CardDescription>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
              <span>{course.rating}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{course.location}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.students}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="font-bold text-lg text-primary">
          {course.price.toLocaleString()} FCFA
        </div>
        <Button size="sm" asChild>
          <Link to={`/formations/${course.id}`}>Voir le détail</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const CourseListItem = ({ course }: { course: typeof allCourses[0] }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 h-48 md:h-auto overflow-hidden relative flex-shrink-0">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover"
          />
          {course.certification && (
            <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
              <Award className="w-3 h-3 mr-1" />
              Certifiante
            </Badge>
          )}
        </div>
        <div className="flex-grow p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {course.sector}
            </Badge>
            <Badge variant="secondary" className="bg-secondary/20 text-secondary">
              {course.level}
            </Badge>
            <Badge variant="outline">{course.format}</Badge>
          </div>
          <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
            <Link to={`/formations/${course.id}`}>{course.title}</Link>
          </h3>
          <p className="text-muted-foreground mb-4">{course.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{course.location}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Prochaine session: {course.nextSession}</span>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
              <span>{course.rating}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span>{course.students} apprenants</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl text-primary">
              {course.price.toLocaleString()} FCFA
            </div>
            <Button asChild>
              <Link to={`/formations/${course.id}`}>Voir le détail</Link>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Formations;
