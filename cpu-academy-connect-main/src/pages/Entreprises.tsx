import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Award,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Briefcase,
  Building,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Layers,
  PieChart,
  Settings,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const solutions = [
  {
    icon: <Building className="h-8 w-8" />,
    title: "Formations intra-entreprise",
    description: "Programmes sur mesure dispensés dans vos locaux ou en ligne pour vos équipes.",
    features: ["Contenus personnalisés", "Planning flexible", "Formateurs dédiés"],
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Packs équipes",
    description: "Abonnements groupés pour former vos équipes en continu à moindre coût.",
    features: ["Accès illimité au catalogue", "Suivi personnalisé", "Tableau de bord RH"],
  },
  {
    icon: <ClipboardCheck className="h-8 w-8" />,
    title: "Évaluation des compétences",
    description: "Cartographie des compétences et identification des besoins de formation.",
    features: ["Tests en ligne", "Rapports détaillés", "Plans de développement"],
  },
];

const packs = [
  {
    name: "Pack Achats",
    description: "Pour les équipes achats et approvisionnement",
    modules: ["Négociation fournisseurs", "Gestion des stocks", "Conformité achats", "Analyse des coûts"],
    icon: <Briefcase className="h-6 w-6" />,
    color: "bg-blue-500",
  },
  {
    name: "Pack Commercial",
    description: "Pour les équipes commerciales et marketing",
    modules: ["Techniques de vente B2B", "CRM et prospection", "Fidélisation client", "Marketing digital"],
    icon: <TrendingUp className="h-6 w-6" />,
    color: "bg-green-500",
  },
  {
    name: "Pack RH",
    description: "Pour les responsables ressources humaines",
    modules: ["Droit du travail CI", "Recrutement", "GPEC", "Gestion des talents"],
    icon: <Users className="h-6 w-6" />,
    color: "bg-purple-500",
  },
  {
    name: "Pack Conformité",
    description: "Pour la conformité et la qualité",
    modules: ["Normes OHADA", "QHSE", "ISO 9001", "Audit interne"],
    icon: <BadgeCheck className="h-6 w-6" />,
    color: "bg-orange-500",
  },
];

const benefits = [
  { icon: <Target className="h-6 w-6" />, title: "Formations ciblées", description: "Contenus adaptés à votre secteur et vos enjeux" },
  { icon: <BarChart3 className="h-6 w-6" />, title: "ROI mesurable", description: "Suivi des compétences acquises et impact métier" },
  { icon: <Settings className="h-6 w-6" />, title: "Flexibilité totale", description: "Présentiel, en ligne ou hybride selon vos besoins" },
  { icon: <FileText className="h-6 w-6" />, title: "Documentation", description: "Supports pédagogiques personnalisés" },
  { icon: <Award className="h-6 w-6" />, title: "Certifications", description: "Attestations et certificats officiels" },
  { icon: <PieChart className="h-6 w-6" />, title: "Reporting", description: "Tableau de bord de suivi des formations" },
];

const testimonials = [
  {
    quote: "CPU Academy a transformé la montée en compétences de nos équipes achats. Résultats visibles dès le premier trimestre.",
    author: "Directeur Achats",
    company: "Grande distribution",
    logo: "🏢",
  },
  {
    quote: "Le pack RH nous a permis de professionnaliser notre gestion des talents. Excellent accompagnement.",
    author: "DRH",
    company: "Industrie agroalimentaire",
    logo: "🏭",
  },
];

const EntreprisesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cpu-orange/10 via-white to-cpu-green/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-cpu-green/10 text-cpu-green hover:bg-cpu-green/20">
                Solutions Entreprises
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Formez vos équipes, développez votre entreprise
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Des solutions de formation sur mesure pour accompagner la montée en compétences 
                de vos collaborateurs et la performance de votre organisation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/contact">
                    Demander un devis
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="#solutions">
                    Découvrir nos solutions
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-12 text-center">
              <div>
                <div className="text-3xl font-bold text-cpu-orange">150+</div>
                <div className="text-gray-600">Entreprises clientes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cpu-green">5000+</div>
                <div className="text-gray-600">Collaborateurs formés</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cpu-orange">95%</div>
                <div className="text-gray-600">Taux de satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section id="solutions" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos solutions</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Des formules adaptées à tous les besoins, de la PME à la grande entreprise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {solutions.map((solution, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-cpu-orange/10 text-cpu-orange p-3 rounded-lg w-fit mb-4">
                      {solution.icon}
                    </div>
                    <CardTitle>{solution.title}</CardTitle>
                    <CardDescription>{solution.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {solution.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle2 className="h-4 w-4 text-cpu-green" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Packs */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Packs métiers</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Des parcours de formation thématiques pour chaque fonction clé de l'entreprise.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {packs.map((pack, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`${pack.color} text-white p-3 rounded-lg w-fit mb-2`}>
                      {pack.icon}
                    </div>
                    <CardTitle className="text-lg">{pack.name}</CardTitle>
                    <CardDescription>{pack.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      {pack.modules.map((module, mIdx) => (
                        <li key={mIdx} className="text-sm text-gray-600 flex items-start gap-2">
                          <BookOpen className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          {module}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" className="w-full mt-4" size="sm">
                      En savoir plus
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir CPU Academy ?</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-cpu-orange/10 text-cpu-orange p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{benefit.title}</h4>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ils nous font confiance</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((testimonial, idx) => (
                <Card key={idx} className="bg-white">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-4">{testimonial.logo}</div>
                    <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-cpu-orange to-cpu-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à transformer vos équipes ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Contactez-nous pour un diagnostic gratuit de vos besoins en formation 
              et recevez une proposition personnalisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-cpu-orange hover:bg-gray-100" asChild>
                <Link to="/contact">
                  Demander un devis gratuit
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/formations">
                  Explorer le catalogue
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default EntreprisesPage;
