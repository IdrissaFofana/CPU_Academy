import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, Star, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { allCourses, Course } from "@/data/courses";

// Utiliser les 4 premières formations du catalogue
const featuredCourses = allCourses.slice(0, 4);

const FeaturedCourses = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Formations en tendance</h2>
            <p className="text-muted-foreground max-w-2xl">
              Découvrez nos formations les plus populaires, conçues pour répondre aux besoins du marché ivoirien et aux secteurs en forte demande.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" asChild>
            <Link to="/formations">
              Voir toutes les formations <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-6">Explorez par secteur d'activité</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <CategoryBadge sector="Numérique">Numérique</CategoryBadge>
            <CategoryBadge sector="Agriculture">Agriculture</CategoryBadge>
            <CategoryBadge sector="Industrie">Industrie</CategoryBadge>
            <CategoryBadge sector="Artisanat">Artisanat</CategoryBadge>
            <CategoryBadge sector="Services">Services</CategoryBadge>
            <CategoryBadge sector="Transport">Transport</CategoryBadge>
            <CategoryBadge sector="Commerce">Commerce</CategoryBadge>
            <CategoryBadge sector="BTP">BTP</CategoryBadge>
          </div>
        </div>
      </div>
    </section>
  );
};

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
      <div className="aspect-[16/9] w-full overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            {course.sector}
          </Badge>
          <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
            {course.level}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <CardDescription className="line-clamp-2 mb-3 h-10">
          {course.description}
        </CardDescription>
        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.students}</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
            <span>{course.rating}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" asChild>
          <Link to={`/formations/${course.id}`}>Voir le détail</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const CategoryBadge = ({ children, sector }: { children: React.ReactNode; sector: string }) => {
  return (
    <Link to={`/formations?sector=${encodeURIComponent(sector)}`}>
      <Badge 
        variant="outline" 
        className="px-4 py-2 text-sm cursor-pointer bg-card hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
      >
        {children}
      </Badge>
    </Link>
  );
};

export default FeaturedCourses;
