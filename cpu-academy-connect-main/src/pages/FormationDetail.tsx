import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Clock, 
  Users, 
  Star, 
  MapPin, 
  Calendar,
  Award,
  BookOpen,
  CheckCircle2,
  ArrowLeft,
  Share2,
  Heart,
  Play,
  FileText,
  MessageCircle
} from "lucide-react";
import { allCourses } from "@/data/courses";

const FormationDetail = () => {
  const { id } = useParams();
  const course = allCourses.find(c => c.id === Number(id));

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Formation non trouvée</h1>
            <p className="text-muted-foreground mb-6">
              Cette formation n'existe pas ou a été supprimée.
            </p>
            <Button asChild>
              <Link to="/formations">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au catalogue
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedCourses = allCourses
    .filter(c => c.sector === course.sector && c.id !== course.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-muted/30 py-4 border-b">
          <div className="container mx-auto px-4">
            <nav className="flex items-center text-sm text-muted-foreground">
              <Link to="/" className="hover:text-primary transition-colors">Accueil</Link>
              <span className="mx-2">/</span>
              <Link to="/formations" className="hover:text-primary transition-colors">Formations</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground font-medium truncate">{course.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-8 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contenu principal */}
              <div className="lg:col-span-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-primary/10 text-primary">
                    {course.sector}
                  </Badge>
                  <Badge variant="secondary" className="bg-secondary/20 text-secondary">
                    {course.level}
                  </Badge>
                  <Badge variant="outline">{course.format}</Badge>
                  {course.certification && (
                    <Badge className="bg-secondary text-secondary-foreground">
                      <Award className="w-3 h-3 mr-1" />
                      Certifiante
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl lg:text-4xl font-bold mb-4">{course.title}</h1>
                
                <p className="text-lg text-muted-foreground mb-6">
                  {course.longDescription}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm mb-6">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-500 mr-1 fill-yellow-500" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-muted-foreground ml-1">({course.students} avis)</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-5 w-5 mr-1" />
                    <span>{course.students} apprenants inscrits</span>
                  </div>
                </div>

                {/* Formateur */}
                <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg mb-8">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={course.instructor.avatar} alt={course.instructor.name} />
                    <AvatarFallback>{course.instructor.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{course.instructor.name}</div>
                    <div className="text-sm text-muted-foreground">{course.instructor.title}</div>
                  </div>
                </div>

                {/* Image de la formation */}
                <div className="aspect-video rounded-xl overflow-hidden mb-8">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Objectifs */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2 text-secondary" />
                      Ce que vous apprendrez
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.objectives.map((objective, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span>{objective}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Programme */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-primary" />
                      Programme de la formation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {course.modules.map((module, index) => (
                        <AccordionItem key={index} value={`module-${index}`}>
                          <AccordionTrigger className="hover:no-underline">
                            <div className="flex items-center gap-3 text-left">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                                {index + 1}
                              </div>
                              <div>
                                <div className="font-semibold">{module.title}</div>
                                <div className="text-sm text-muted-foreground">{module.duration}</div>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <ul className="space-y-2 ml-11">
                              {module.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="flex items-center gap-2 text-muted-foreground">
                                  <Play className="h-4 w-4" />
                                  {lesson}
                                </li>
                              ))}
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>

                {/* Prérequis */}
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-primary" />
                      Prérequis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {course.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-center gap-2 text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          {prereq}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card className="shadow-lg">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {course.price.toLocaleString()} FCFA
                      </div>
                      
                      <Button className="w-full mb-3" size="lg">
                        S'inscrire maintenant
                      </Button>
                      
                      <Button variant="outline" className="w-full mb-6" size="lg">
                        <Heart className="mr-2 h-4 w-4" />
                        Ajouter aux favoris
                      </Button>

                      <Separator className="my-6" />

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-muted-foreground">
                            <Clock className="h-5 w-5 mr-2" />
                            Durée
                          </div>
                          <span className="font-semibold">{course.duration}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-muted-foreground">
                            <MapPin className="h-5 w-5 mr-2" />
                            Lieu
                          </div>
                          <span className="font-semibold">{course.location}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-muted-foreground">
                            <Calendar className="h-5 w-5 mr-2" />
                            Prochaine session
                          </div>
                          <span className="font-semibold">{course.nextSession}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-muted-foreground">
                            <BookOpen className="h-5 w-5 mr-2" />
                            Modules
                          </div>
                          <span className="font-semibold">{course.modules.length}</span>
                        </div>
                        
                        {course.certification && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-muted-foreground">
                              <Award className="h-5 w-5 mr-2" />
                              Certification
                            </div>
                            <Badge className="bg-secondary text-secondary-foreground">Incluse</Badge>
                          </div>
                        )}
                      </div>

                      <Separator className="my-6" />

                      <div className="flex items-center justify-center gap-4">
                        <Button variant="ghost" size="sm">
                          <Share2 className="h-4 w-4 mr-2" />
                          Partager
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          Question ?
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Garantie */}
                  <Card className="mt-4 bg-secondary/10 border-secondary/20">
                    <CardContent className="p-4 text-center">
                      <Award className="h-8 w-8 mx-auto mb-2 text-secondary" />
                      <div className="font-semibold mb-1">Satisfaction garantie</div>
                      <div className="text-sm text-muted-foreground">
                        Remboursement possible sous 7 jours
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Formations similaires */}
        {relatedCourses.length > 0 && (
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Formations similaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedCourses.map((relatedCourse) => (
                  <Card key={relatedCourse.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedCourse.image}
                        alt={relatedCourse.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="outline" className="mb-2">{relatedCourse.level}</Badge>
                      <h3 className="font-semibold mb-2 line-clamp-2">{relatedCourse.title}</h3>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{relatedCourse.duration}</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                          {relatedCourse.rating}
                        </div>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-bold text-primary">
                          {relatedCourse.price.toLocaleString()} FCFA
                        </span>
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/formations/${relatedCourse.id}`}>Voir</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FormationDetail;
