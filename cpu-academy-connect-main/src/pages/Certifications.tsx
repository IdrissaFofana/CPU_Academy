import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Award, 
  BadgeCheck, 
  CheckCircle2, 
  Download, 
  ExternalLink, 
  FileCheck, 
  GraduationCap, 
  Search, 
  Shield, 
  ShoppingBag, 
  Star, 
  TrendingUp, 
  Wallet 
} from "lucide-react";

const certifications = [
  {
    id: 1,
    name: "Certificat de Gestion PME",
    description: "Attestation officielle de maîtrise des compétences en gestion d'entreprise",
    level: "Professionnel",
    duration: "10 semaines",
    modules: 4,
    icon: <GraduationCap className="h-8 w-8" />,
    color: "bg-blue-500",
    verifiable: true,
  },
  {
    id: 2,
    name: "Certificat Digital & E-commerce",
    description: "Compétences validées en transformation numérique et vente en ligne",
    level: "Professionnel",
    duration: "8 semaines",
    modules: 4,
    icon: <TrendingUp className="h-8 w-8" />,
    color: "bg-purple-500",
    verifiable: true,
  },
  {
    id: 3,
    name: "Certificat Agriculture Innovante",
    description: "Expertise reconnue en techniques agricoles modernes",
    level: "Expert",
    duration: "12 semaines",
    modules: 4,
    icon: <Award className="h-8 w-8" />,
    color: "bg-green-500",
    verifiable: true,
  },
  {
    id: 4,
    name: "Certificat BTP & Gestion de Chantier",
    description: "Qualification professionnelle en gestion de projets de construction",
    level: "Expert",
    duration: "10 semaines",
    modules: 3,
    icon: <Shield className="h-8 w-8" />,
    color: "bg-orange-500",
    verifiable: true,
  },
];

const badges = [
  {
    id: "pret-ao",
    name: "Prêt pour AO",
    description: "Apte à répondre aux appels d'offres publics et privés",
    icon: <FileCheck className="h-6 w-6" />,
    color: "bg-cpu-orange",
    requirements: ["Formation AO validée", "2 simulations réussies", "Dossier type complet"],
  },
  {
    id: "vendeur-verifie",
    name: "Vendeur Vérifié",
    description: "Profil vérifié pour vendre sur la marketplace CPU",
    icon: <BadgeCheck className="h-6 w-6" />,
    color: "bg-cpu-green",
    requirements: ["Identité vérifiée", "Formation marketplace", "Évaluation qualité"],
  },
  {
    id: "bancable",
    name: "Bancable",
    description: "Dossier prêt pour demande de financement bancaire",
    icon: <Wallet className="h-6 w-6" />,
    color: "bg-blue-600",
    requirements: ["Formation financement", "Business plan validé", "Documents conformes"],
  },
  {
    id: "made-in-ci",
    name: "Made in CI Ready",
    description: "Éligible au label Made in Côte d'Ivoire",
    icon: <Star className="h-6 w-6" />,
    color: "bg-amber-500",
    requirements: ["Formation qualité", "Audit production", "Traçabilité validée"],
  },
];

const Certifications = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cpu-orange/10 via-white to-cpu-green/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-cpu-orange/10 text-cpu-orange hover:bg-cpu-orange/20">
                Certifications & Badges
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Valorisez vos compétences
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Obtenez des certifications reconnues et des badges vérifiables qui attestent 
                de votre expertise auprès des employeurs, clients et partenaires.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/formations">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Voir les formations certifiantes
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="#verifier">
                    <Search className="mr-2 h-5 w-5" />
                    Vérifier un certificat
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nos Certifications Professionnelles
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Des certifications officielles délivrées par CPU Academy, 
                reconnues par les entreprises et institutions de Côte d'Ivoire.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert) => (
                <Card key={cert.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="flex flex-row items-start gap-4">
                    <div className={`${cert.color} text-white p-3 rounded-lg`}>
                      {cert.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-xl">{cert.name}</CardTitle>
                        {cert.verifiable && (
                          <Badge variant="outline" className="text-xs">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Vérifiable
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{cert.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        Niveau {cert.level}
                      </span>
                      <span className="flex items-center gap-1">
                        <GraduationCap className="h-4 w-4" />
                        {cert.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileCheck className="h-4 w-4" />
                        {cert.modules} modules
                      </span>
                    </div>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to={`/formations?certification=true`}>
                        Voir les formations
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Badges Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Badges de Compétences
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Des badges qui ouvrent des portes : accès aux marchés publics, 
                marketplace CPU, financement bancaire et label Made in CI.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {badges.map((badge) => (
                <Card key={badge.id} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`${badge.color} text-white p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4`}>
                      {badge.icon}
                    </div>
                    <CardTitle className="text-lg">{badge.name}</CardTitle>
                    <CardDescription>{badge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-left">
                      <p className="text-sm font-medium text-gray-700 mb-2">Prérequis :</p>
                      <ul className="space-y-1">
                        {badge.requirements.map((req, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-cpu-green flex-shrink-0 mt-0.5" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Verification Section */}
        <section id="verifier" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="border-2 border-cpu-orange/20">
                <CardHeader className="text-center">
                  <div className="bg-cpu-orange/10 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-cpu-orange" />
                  </div>
                  <CardTitle className="text-2xl">Vérifier un Certificat</CardTitle>
                  <CardDescription>
                    Entrez le numéro de certificat pour vérifier son authenticité
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ex: CPU-CERT-2024-XXXXX"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cpu-orange"
                    />
                    <Button>
                      <Search className="mr-2 h-4 w-4" />
                      Vérifier
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 text-center">
                    Le numéro de certificat se trouve en bas à droite du document
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-cpu-orange to-cpu-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Prêt à obtenir votre certification ?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Explorez notre catalogue de formations certifiantes et commencez 
              votre parcours vers l'excellence professionnelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-cpu-orange hover:bg-gray-100" asChild>
                <Link to="/formations?certification=true">
                  Formations certifiantes
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/contact">
                  Nous contacter
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

export default Certifications;
