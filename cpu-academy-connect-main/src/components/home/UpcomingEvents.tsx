
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, MapPin, Clock, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Données de démonstration pour les prochaines sessions de formation
const upcomingEvents = [
  {
    id: 1,
    title: "Gestion financière pour PME",
    date: "2 Novembre 2025",
    location: "Abidjan, Plateau",
    time: "9h00 - 17h00",
    type: "Présentiel",
    availability: "Places disponibles",
  },
  {
    id: 2,
    title: "Marketing digital & Réseaux sociaux",
    date: "15 Novembre 2025",
    location: "En ligne",
    time: "14h00 - 16h30",
    type: "Classe virtuelle",
    availability: "Places limitées",
  },
  {
    id: 3,
    title: "Certification en techniques de vente",
    date: "5 Décembre 2025",
    location: "Yamoussoukro",
    time: "9h00 - 17h00",
    type: "Présentiel",
    availability: "Places disponibles",
  },
  {
    id: 4,
    title: "Intelligence artificielle pour entrepreneurs",
    date: "20 Décembre 2025",
    location: "En ligne",
    time: "14h00 - 16h30",
    type: "Webinaire",
    availability: "Inscription ouverte",
  },
];

const UpcomingEvents = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Calendrier des formations</h2>
            <p className="text-gray-600 max-w-2xl">
              Consultez les prochaines sessions de formation et réservez votre place dès maintenant.
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" asChild>
            <Link to="/calendrier">
              Voir tout le calendrier <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button size="lg" asChild>
            <Link to="/calendrier">
              Explorer toutes les sessions <CalendarIcon className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

interface EventCardProps {
  event: {
    id: number;
    title: string;
    date: string;
    location: string;
    time: string;
    type: string;
    availability: string;
  };
}

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge 
            variant={event.type === "Présentiel" ? "default" : "secondary"}
            className={event.type === "Présentiel" ? "bg-cpu-orange" : "bg-cpu-green text-white"}
          >
            {event.type}
          </Badge>
          <Badge variant="outline" className="bg-gray-50">
            {event.availability}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-2">{event.title}</CardTitle>
        <CardDescription>
          <div className="flex items-center mt-1">
            <CalendarIcon className="h-4 w-4 mr-2 text-gray-500" />
            <span>{event.date}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-6 flex-grow flex flex-col">
        <div className="space-y-2 mb-4 flex-grow">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-600">{event.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <span className="text-sm text-gray-600">{event.time}</span>
          </div>
        </div>
        <Button variant="outline" className="w-full" asChild>
          <Link to={`/sessions/${event.id}`}>S'inscrire</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
