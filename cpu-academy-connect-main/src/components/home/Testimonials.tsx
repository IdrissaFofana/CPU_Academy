
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";

// Données de démonstration pour les témoignages
const testimonials = [
  {
    id: 1,
    name: "Kouassi Amani",
    role: "Entrepreneur, Abidjan",
    image: "",
    initials: "KA",
    content: "La formation en gestion opérationnelle m'a permis de structurer mon entreprise et d'augmenter ma rentabilité de 30% en moins de 6 mois.",
    rating: 5,
  },
  {
    id: 2,
    name: "Fatou Touré",
    role: "Agricultrice, Yamoussoukro",
    image: "",
    initials: "FT",
    content: "Grâce aux techniques agricoles innovantes apprises à CPU-Académie, j'ai pu diversifier mes cultures et améliorer considérablement mes rendements.",
    rating: 5,
  },
  {
    id: 3,
    name: "Ibrahim Kone",
    role: "Technicien, Bouaké",
    image: "",
    initials: "IK",
    content: "La certification en transformation numérique m'a ouvert des portes que je n'aurais jamais imaginées. Je conseille cette formation à tous les entrepreneurs.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que disent nos apprenants</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de professionnels qui ont transformé leur carrière et leur entreprise grâce à nos formations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center bg-gray-100 rounded-full px-6 py-3">
            <div className="font-medium text-gray-900 mr-2">Satisfaction globale:</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} className="text-yellow-500 h-5 w-5 fill-current" />
              ))}
            </div>
            <div className="ml-2 font-bold text-gray-900">4.8/5</div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface TestimonialCardProps {
  testimonial: {
    id: number;
    name: string;
    role: string;
    image: string;
    initials: string;
    content: string;
    rating: number;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
          {Array.from({ length: testimonial.rating }).map((_, index) => (
            <StarIcon key={index} className="inline-block text-yellow-500 h-5 w-5 fill-current" />
          ))}
        </div>
        
        <div className="relative mb-6 flex-grow">
          <QuoteIcon className="absolute -top-2 -left-2 h-8 w-8 text-gray-200" />
          <p className="relative z-10 text-gray-700 italic">{testimonial.content}</p>
        </div>
        
        <div className="flex items-center mt-4">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={testimonial.image} alt={testimonial.name} />
            <AvatarFallback className="bg-cpu-orange text-white">
              {testimonial.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{testimonial.name}</div>
            <div className="text-sm text-gray-500">{testimonial.role}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StarIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
  </svg>
);

export default Testimonials;
