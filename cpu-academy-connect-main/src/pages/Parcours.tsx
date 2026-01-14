import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { 
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Briefcase,
  Building,
  CheckCircle2,
  Clock,
  FileCheck,
  GraduationCap,
  Lightbulb,
  Rocket,
  ShoppingBag,
  Store,
  Target,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

const parcoursData = {
  entrepreneur: {
    title: "Parcours Entrepreneur & PME",
    subtitle: "De l'idée au développement de votre entreprise",
    description: "Un parcours complet pour les créateurs d'entreprise et dirigeants de PME qui souhaitent structurer et développer leur activité.",
    icon: <Lightbulb className="h-12 w-12" />,
    color: "from-orange-500 to-amber-500",
    duration: "6 mois",
    modules: 8,
    certification: "Certificat Entrepreneur PME",
    badge: "Entrepreneur Certifié",
    objectives: [
      "Maîtriser les fondamentaux de la création d'entreprise",
      "Structurer et formaliser son business model",
      "Gérer efficacement les aspects financiers et administratifs",
      "Développer une stratégie commerciale adaptée",
      "Recruter et manager une équipe",
    ],
    steps: [
      { title: "Idéation & Business Model", duration: "3 semaines", modules: ["Étude de marché", "Canvas business model", "Proposition de valeur"] },
      { title: "Formalisation juridique", duration: "2 semaines", modules: ["Formes juridiques", "Démarches administratives", "Fiscalité de base"] },
      { title: "Gestion financière", duration: "4 semaines", modules: ["Comptabilité", "Trésorerie", "Budget prévisionnel"] },
      { title: "Marketing & Ventes", duration: "4 semaines", modules: ["Stratégie marketing", "Techniques de vente", "Fidélisation"] },
      { title: "Management & RH", duration: "3 semaines", modules: ["Recrutement", "Leadership", "Gestion d'équipe"] },
      { title: "Digital & Croissance", duration: "4 semaines", modules: ["Présence en ligne", "E-commerce", "Scaling"] },
    ],
  },
  corporate: {
    title: "Parcours Entreprise & Corporate",
    subtitle: "Solutions pour les organisations et grandes entreprises",
    description: "Des programmes sur mesure pour former vos équipes et développer les compétences clés de votre organisation.",
    icon: <Building className="h-12 w-12" />,
    color: "from-blue-600 to-indigo-600",
    duration: "Sur mesure",
    modules: 12,
    certification: "Certificat Corporate",
    badge: "Entreprise Formée",
    objectives: [
      "Renforcer les compétences métiers de vos équipes",
      "Améliorer la performance collective",
      "Accompagner la transformation digitale",
      "Développer le leadership managérial",
      "Assurer la conformité réglementaire",
    ],
    steps: [
      { title: "Diagnostic des besoins", duration: "1 semaine", modules: ["Audit compétences", "Cartographie", "Objectifs"] },
      { title: "Formation Achats & Approvisionnement", duration: "4 semaines", modules: ["Négociation", "Gestion fournisseurs", "Conformité"] },
      { title: "Formation Ventes & Commercial", duration: "4 semaines", modules: ["Techniques de vente B2B", "CRM", "KPIs"] },
      { title: "Formation RH & Management", duration: "4 semaines", modules: ["GPEC", "Droit du travail", "Entretiens"] },
      { title: "Conformité & Qualité", duration: "3 semaines", modules: ["ISO", "QHSE", "Audits"] },
    ],
  },
  marches: {
    title: "Parcours Accès Marchés (AO)",
    subtitle: "Répondre et remporter les appels d'offres",
    description: "Apprenez à identifier, préparer et remporter les marchés publics et privés en Côte d'Ivoire et dans la région.",
    icon: <ShoppingBag className="h-12 w-12" />,
    color: "from-cpu-orange to-red-500",
    duration: "3 mois",
    modules: 6,
    certification: "Certificat Marchés Publics",
    badge: "Prêt pour AO",
    objectives: [
      "Comprendre le cadre réglementaire des marchés publics",
      "Identifier les opportunités d'appels d'offres",
      "Constituer un dossier de réponse complet",
      "Optimiser sa stratégie de pricing",
      "Gérer l'exécution des marchés remportés",
    ],
    steps: [
      { title: "Cadre réglementaire", duration: "2 semaines", modules: ["Code des marchés", "Procédures", "Acteurs"] },
      { title: "Veille & Opportunités", duration: "2 semaines", modules: ["Sources d'information", "Analyse des DAO", "Critères de sélection"] },
      { title: "Constitution du dossier", duration: "4 semaines", modules: ["Documents administratifs", "Mémoire technique", "Offre financière"] },
      { title: "Soumission & Suivi", duration: "2 semaines", modules: ["Dépôt", "Négociation", "Réclamations"] },
      { title: "Exécution des marchés", duration: "2 semaines", modules: ["Notification", "Suivi", "Réception"] },
    ],
  },
  marketplace: {
    title: "Parcours Marketplace & Vente",
    subtitle: "Vendez efficacement sur les plateformes en ligne",
    description: "Développez votre activité de vente en ligne sur la marketplace CPU et autres plateformes e-commerce.",
    icon: <Store className="h-12 w-12" />,
    color: "from-cpu-green to-emerald-500",
    duration: "2 mois",
    modules: 5,
    certification: "Certificat E-commerce",
    badge: "Vendeur Vérifié",
    objectives: [
      "Créer et optimiser sa boutique en ligne",
      "Photographier et décrire ses produits",
      "Gérer les stocks et la logistique",
      "Maîtriser le service client en ligne",
      "Analyser ses performances de vente",
    ],
    steps: [
      { title: "Création de boutique", duration: "2 semaines", modules: ["Configuration", "Identité visuelle", "Catégories"] },
      { title: "Catalogue produits", duration: "2 semaines", modules: ["Photos", "Descriptions", "Pricing"] },
      { title: "Logistique & Stocks", duration: "2 semaines", modules: ["Gestion stocks", "Expédition", "Livraison"] },
      { title: "Vente & Promotion", duration: "2 semaines", modules: ["Marketing", "Promotions", "Avis clients"] },
    ],
  },
  financement: {
    title: "Parcours Financement & Bancabilité",
    subtitle: "Accédez aux financements pour votre entreprise",
    description: "Préparez un dossier solide pour obtenir des financements bancaires, des subventions ou des investissements.",
    icon: <Wallet className="h-12 w-12" />,
    color: "from-blue-500 to-cyan-500",
    duration: "2 mois",
    modules: 5,
    certification: "Certificat Financement PME",
    badge: "Bancable",
    objectives: [
      "Comprendre les différentes sources de financement",
      "Préparer un business plan bancable",
      "Constituer un dossier de demande de crédit",
      "Négocier avec les banques et investisseurs",
      "Gérer le remboursement et la relation bancaire",
    ],
    steps: [
      { title: "Sources de financement", duration: "2 semaines", modules: ["Banques", "Microfinance", "Investisseurs", "Subventions"] },
      { title: "Business Plan", duration: "3 semaines", modules: ["Rédaction", "Prévisionnel financier", "Valorisation"] },
      { title: "Dossier bancaire", duration: "2 semaines", modules: ["Documents requis", "Garanties", "Scoring"] },
      { title: "Négociation & Suivi", duration: "1 semaine", modules: ["Entretien bancaire", "Négociation", "Suivi post-financement"] },
    ],
  },
  incubateur: {
    title: "Parcours Incubateur / Production++",
    subtitle: "Accélérez le développement de votre startup",
    description: "Un programme d'accompagnement intensif pour les startups et PME innovantes qui veulent scaler rapidement.",
    icon: <Rocket className="h-12 w-12" />,
    color: "from-purple-600 to-pink-500",
    duration: "4 mois",
    modules: 8,
    certification: "Certificat Startup",
    badge: "Made in CI Ready",
    objectives: [
      "Valider son product-market fit",
      "Développer un MVP et itérer",
      "Structurer sa production et sa qualité",
      "Lever des fonds ou obtenir des subventions",
      "Préparer le scaling de son activité",
    ],
    steps: [
      { title: "Validation du concept", duration: "3 semaines", modules: ["Problem-solution fit", "Interviews clients", "Pivots"] },
      { title: "Développement MVP", duration: "4 semaines", modules: ["Prototypage", "Tests utilisateurs", "Itérations"] },
      { title: "Production & Qualité", duration: "4 semaines", modules: ["Process", "Normes", "Traçabilité"] },
      { title: "Croissance & Levée", duration: "4 semaines", modules: ["Pitch", "Due diligence", "Négociation"] },
      { title: "Scaling", duration: "3 semaines", modules: ["Recrutement", "Partenariats", "Internationalisation"] },
    ],
  },
};

const ParcoursPage = () => {
  const { type } = useParams<{ type: string }>();
  const parcours = parcoursData[type as keyof typeof parcoursData];

  if (!parcours) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Parcours non trouvé</h1>
            <p className="text-gray-600 mb-8">Ce parcours n'existe pas.</p>
            <Button asChild>
              <Link to="/">Retour à l'accueil</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className={`bg-gradient-to-br ${parcours.color} py-16 text-white`}>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white/20 p-4 rounded-xl">
                  {parcours.icon}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">{parcours.title}</h1>
                  <p className="text-xl opacity-90">{parcours.subtitle}</p>
                </div>
              </div>
              <p className="text-lg opacity-90 mb-8">{parcours.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge variant="secondary" className="bg-white/20 text-white border-0 text-sm py-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {parcours.duration}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0 text-sm py-1">
                  <BookOpen className="h-4 w-4 mr-1" />
                  {parcours.modules} modules
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0 text-sm py-1">
                  <Award className="h-4 w-4 mr-1" />
                  {parcours.certification}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-0 text-sm py-1">
                  <BadgeCheck className="h-4 w-4 mr-1" />
                  Badge: {parcours.badge}
                </Badge>
              </div>

              <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                S'inscrire à ce parcours
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <Target className="h-8 w-8 text-cpu-orange" />
                <h2 className="text-2xl font-bold text-gray-900">Objectifs du parcours</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {parcours.objectives.map((objective, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <CheckCircle2 className="h-5 w-5 text-cpu-green flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <TrendingUp className="h-8 w-8 text-cpu-orange" />
                <h2 className="text-2xl font-bold text-gray-900">Étapes du parcours</h2>
              </div>

              <div className="space-y-4">
                {parcours.steps.map((step, idx) => (
                  <Card key={idx} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-gray-50 to-white pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`bg-gradient-to-br ${parcours.color} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold`}>
                            {idx + 1}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{step.title}</CardTitle>
                            <CardDescription>{step.duration}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex flex-wrap gap-2">
                        {step.modules.map((module, mIdx) => (
                          <Badge key={mIdx} variant="outline" className="text-sm">
                            {module}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other Parcours */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Découvrez nos autres parcours
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {Object.entries(parcoursData)
                .filter(([key]) => key !== type)
                .slice(0, 3)
                .map(([key, p]) => (
                  <Link key={key} to={`/parcours/${key}`}>
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader className="text-center">
                        <div className={`bg-gradient-to-br ${p.color} text-white p-3 rounded-lg w-fit mx-auto mb-2`}>
                          {p.icon}
                        </div>
                        <CardTitle className="text-lg">{p.title}</CardTitle>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-cpu-orange to-cpu-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Prêt à commencer votre parcours ?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Inscrivez-vous dès maintenant et bénéficiez d'un accompagnement personnalisé.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-cpu-orange hover:bg-gray-100">
                S'inscrire maintenant
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/contact">Demander un devis</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ParcoursPage;
