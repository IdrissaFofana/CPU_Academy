import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Award, CheckCircle2, Clock, Users, TrendingUp, Shield, BookOpen, FileCheck, Star, ArrowRight, Download, Sparkles, FileText, Wallet, ShoppingBag, Factory, Search } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Certifications - CPU Academy",
  description: "Validez vos compétences avec nos certifications reconnues",
};

const certifications = [
  {
    id: 1,
    title: "Certification Entrepreneur PME",
    category: "Entrepreneuriat",
    niveau: "Fondamental",
    duree: "60h",
    modules: 8,
    color: "orange",
    gradient: "from-orange-500 to-orange-600",
    bgLight: "bg-orange-50",
    borderColor: "border-orange-200",
    textColor: "text-orange-600",
    description: "Validez vos compétences en création et gestion d'entreprise. Cette certification atteste de votre maîtrise des fondamentaux entrepreneuriaux.",
    competences: ["Business Plan", "Gestion financière", "Marketing", "Management", "Juridique"],
    prerequis: "Aucun prérequis",
    validite: "3 ans"
  },
  {
    id: 2,
    title: "Certification Marchés Publics",
    category: "Appels d'offres",
    niveau: "Professionnel",
    duree: "40h",
    modules: 6,
    color: "indigo",
    gradient: "from-indigo-500 to-indigo-600",
    bgLight: "bg-indigo-50",
    borderColor: "border-indigo-200",
    textColor: "text-indigo-600",
    description: "Devenez expert en réponse aux appels d'offres publics et privés. Certification reconnue par les institutions publiques.",
    competences: ["Analyse AO", "Rédaction technique", "Chiffrage", "Conformité", "Négociation"],
    prerequis: "Expérience professionnelle recommandée",
    validite: "2 ans"
  },
  {
    id: 3,
    title: "Certification E-Commerce",
    category: "Digital",
    niveau: "Professionnel",
    duree: "50h",
    modules: 7,
    color: "green",
    gradient: "from-green-500 to-green-600",
    bgLight: "bg-green-50",
    borderColor: "border-green-200",
    textColor: "text-green-600",
    description: "Maîtrisez les stratégies de vente en ligne et de gestion de marketplace. Certification adaptée au marché africain.",
    competences: ["Boutique en ligne", "Marketing digital", "Logistique", "SEO", "Analytics"],
    prerequis: "Connaissances de base en informatique",
    validite: "2 ans"
  },
  {
    id: 4,
    title: "Certification Financement",
    category: "Finance",
    niveau: "Expert",
    duree: "35h",
    modules: 5,
    color: "purple",
    gradient: "from-purple-500 to-purple-600",
    bgLight: "bg-purple-50",
    borderColor: "border-purple-200",
    textColor: "text-purple-600",
    description: "Expertise en montage de dossiers de financement et relations bancaires. Augmentez votre bancabilité.",
    competences: ["Business plan financier", "Analyse financière", "Négociation", "Levée de fonds", "Garanties"],
    prerequis: "Formation en gestion recommandée",
    validite: "3 ans"
  },
  {
    id: 5,
    title: "Certification Qualité ISO",
    category: "Production",
    niveau: "Expert",
    duree: "45h",
    modules: 6,
    color: "cyan",
    gradient: "from-cyan-500 to-cyan-600",
    bgLight: "bg-cyan-50",
    borderColor: "border-cyan-200",
    textColor: "text-cyan-600",
    description: "Maîtrisez les normes de qualité et préparez votre entreprise à la certification ISO. Parcours complet avec audit.",
    competences: ["Normes ISO", "HACCP", "Documentation", "Audit", "Amélioration continue"],
    prerequis: "Responsable production ou qualité",
    validite: "3 ans"
  },
  {
    id: 6,
    title: "Certification Management",
    category: "Leadership",
    niveau: "Professionnel",
    duree: "30h",
    modules: 5,
    color: "blue",
    gradient: "from-blue-500 to-blue-600",
    bgLight: "bg-blue-50",
    borderColor: "border-blue-200",
    textColor: "text-blue-600",
    description: "Développez vos compétences en leadership et management d'équipe. Certification pour managers et futurs dirigeants.",
    competences: ["Leadership", "Gestion d'équipe", "Communication", "Motivation", "Performance"],
    prerequis: "Expérience en management",
    validite: "2 ans"
  }
];

const avantages = [
  {
    icon: Shield,
    title: "Reconnaissance officielle",
    description: "Nos certifications sont reconnues par les institutions et entreprises"
  },
  {
    icon: TrendingUp,
    title: "Évolution de carrière",
    description: "Boostez votre employabilité et accédez à de nouvelles opportunités"
  },
  {
    icon: Users,
    title: "Réseau professionnel",
    description: "Rejoignez une communauté de professionnels certifiés"
  },
  {
    icon: BookOpen,
    title: "Formation continue",
    description: "Accédez à des ressources exclusives et mises à jour régulières"
  }
];

const processus = [
  {
    numero: 1,
    titre: "Inscription",
    description: "Choisissez votre certification et inscrivez-vous en ligne"
  },
  {
    numero: 2,
    titre: "Formation",
    description: "Suivez les modules de formation à votre rythme"
  },
  {
    numero: 3,
    titre: "Évaluation",
    description: "Passez les examens et validez vos compétences"
  },
  {
    numero: 4,
    titre: "Certification",
    description: "Recevez votre certificat digital et badge numérique"
  }
];

export default function CertificationsPage() {
  return (
    <>
      <PageBanner 
        title="Certifications"
        subtitle="Validez vos compétences avec nos certifications reconnues"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Certifications" }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
        {/* Stats Section */}
        <section className="container mx-auto px-8 lg:px-16 py-12">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in">
              <Award className="w-10 h-10 mx-auto mb-3 text-orange-600" />
              <div className="text-3xl font-bold mb-1 text-slate-900">6</div>
              <div className="text-sm text-slate-600">Certifications</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in animation-delay-100">
              <Users className="w-10 h-10 mx-auto mb-3 text-blue-600" />
              <div className="text-3xl font-bold mb-1 text-slate-900">500+</div>
              <div className="text-sm text-slate-600">Certifiés</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in animation-delay-200">
              <Star className="w-10 h-10 mx-auto mb-3 text-yellow-600" />
              <div className="text-3xl font-bold mb-1 text-slate-900">4.8/5</div>
              <div className="text-sm text-slate-600">Satisfaction</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in animation-delay-300">
              <TrendingUp className="w-10 h-10 mx-auto mb-3 text-green-600" />
              <div className="text-3xl font-bold mb-1 text-slate-900">95%</div>
              <div className="text-sm text-slate-600">Réussite</div>
            </div>
          </div>
        </section>

        {/* Hero Section - Valorisez vos compétences */}
        <section className="container mx-auto px-8 lg:px-16 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-orange-200 px-4 py-1">
              Certifications & Badges
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Valorisez vos compétences
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Obtenez des certifications reconnues et des badges vérifiables qui attestent de votre expertise auprès des employeurs, clients et partenaires.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow-lg"
              >
                <Link href="#certifications">
                  <Award className="mr-2 h-5 w-5" />
                  Voir les formations certifiantes
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="cursor-pointer border-2"
              >
                <Link href="#verifier-certificat">
                  <FileCheck className="mr-2 h-5 w-5" />
                  Vérifier un certificat
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Certifications Grid */}
        <section id="certifications" className="container mx-auto px-8 lg:px-16 py-12">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Nos Certifications
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choisissez la certification qui correspond à vos objectifs professionnels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {certifications.map((cert, idx) => (
              <div
                key={cert.id}
                className="group bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 animate-slide-up overflow-hidden flex flex-col"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Icon & Category Badge */}
                <div className="p-6 pb-4 flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${cert.gradient} shadow-lg`}>
                      <Award className="w-7 h-7 text-white" />
                    </div>
                    <Badge className={`${cert.bgLight} ${cert.textColor} border-0 font-medium`}>
                      {cert.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:${cert.textColor} transition-colors">
                    {cert.title}
                  </h3>

                  <div className="flex items-center gap-3 text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {cert.duree}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4" />
                      {cert.modules} modules
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    {cert.description}
                  </p>

                  {/* Info Pills */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`px-3 py-1.5 rounded-full ${cert.bgLight} ${cert.textColor} text-xs font-semibold`}>
                      {cert.niveau}
                    </div>
                    <div className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                      Validité: {cert.validite}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100"></div>

                {/* Compétences Section */}
                <div className="p-6 pt-4 pb-4 bg-slate-50/50">
                  <p className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className={`w-4 h-4 ${cert.textColor}`} />
                    Compétences validées
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cert.competences.slice(0, 4).map((comp, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white text-xs text-slate-700 border border-slate-200">
                        {comp}
                      </span>
                    ))}
                    {cert.competences.length > 4 && (
                      <span className="px-2.5 py-1 rounded-lg bg-white text-xs text-slate-500 border border-slate-200">
                        +{cert.competences.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100"></div>

                {/* Footer with CTA */}
                <div className="p-6 pt-4 mt-auto">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-4">
                    <span className="font-medium">Prérequis:</span>
                    <span className="text-slate-500">{cert.prerequis}</span>
                  </div>
                  
                  <Button
                    asChild
                    className={`w-full cursor-pointer bg-gradient-to-r ${cert.gradient} hover:opacity-90 text-white shadow-md group-hover:shadow-lg transition-all`}
                  >
                    <Link href="/faq" className="flex items-center justify-center">
                      S'inscrire à la certification
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Badges de Compétences Section */}
        <section className="container mx-auto px-8 lg:px-16 py-16 bg-gradient-to-br from-slate-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Badges de Compétences
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Des badges qui ouvrent des portes : accès aux marchés publics, marketplace CPU, financement bancaire et label Made in CI.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Badge 1 - Prêt pour AO */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-slide-up">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 text-center mb-3">
                  Prêt pour AO
                </h3>
                <p className="text-sm text-slate-600 text-center mb-6">
                  Apte à répondre aux appels d'offres publics et privés
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-900 mb-3">Prérequis :</p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Formation AO validée</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">2 simulations réussies</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Dossier type complet</span>
                  </div>
                </div>
              </div>

              {/* Badge 2 - Vendeur Vérifié */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-slide-up animation-delay-100">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg">
                    <ShoppingBag className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 text-center mb-3">
                  Vendeur Vérifié
                </h3>
                <p className="text-sm text-slate-600 text-center mb-6">
                  Profil vérifié pour vendre sur la marketplace CPU
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-900 mb-3">Prérequis :</p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Identité vérifiée</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Formation marketplace</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Évaluation qualité</span>
                  </div>
                </div>
              </div>

              {/* Badge 3 - Bancable */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-slide-up animation-delay-200">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                    <Wallet className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 text-center mb-3">
                  Bancable
                </h3>
                <p className="text-sm text-slate-600 text-center mb-6">
                  Dossier prêt pour demande de financement bancaire
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-900 mb-3">Prérequis :</p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Formation financement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Business plan validé</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Documents conformes</span>
                  </div>
                </div>
              </div>

              {/* Badge 4 - Made in CI Ready */}
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-slide-up animation-delay-300">
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg">
                    <Star className="w-10 h-10 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 text-center mb-3">
                  Made in CI Ready
                </h3>
                <p className="text-sm text-slate-600 text-center mb-6">
                  Éligible au label Made in Côte d'Ivoire
                </p>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-900 mb-3">Prérequis :</p>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Formation qualité</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Audit production</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-700">Traçabilité validée</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Vérifier un Certificat Section */}
        <section id="verifier-certificat" className="container mx-auto px-8 lg:px-16 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl p-12 border-2 border-orange-100 shadow-xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-50 mb-6">
                  <Shield className="w-10 h-10 text-orange-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                  Vérifier un Certificat
                </h2>
                <p className="text-lg text-slate-600">
                  Entrez le numéro de certificat pour vérifier son authenticité
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Ex: CPU-CERT-2024-XXXXX"
                  className="flex-1 px-6 py-4 rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:outline-none text-slate-900 placeholder:text-slate-400"
                />
                <Button
                  className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Search className="mr-2 h-5 w-5" />
                  Vérifier
                </Button>
              </div>

              <p className="text-sm text-slate-500 text-center">
                Le numéro de certificat se trouve en bas à droite du document
              </p>
            </div>
          </div>
        </section>

        {/* Avantages Section */}
        <section className="container mx-auto px-8 lg:px-16 py-12">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pourquoi se certifier ?
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Les avantages de nos certifications pour votre carrière
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {avantages.map((avantage, idx) => {
                const Icon = avantage.icon;
                return (
                  <div
                    key={idx}
                    className="text-center group animate-fade-in"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 text-white mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all">
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{avantage.title}</h3>
                    <p className="text-sm text-slate-300">{avantage.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Processus Section */}
        <section className="container mx-auto px-8 lg:px-16 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Comment obtenir votre certification ?
              </h2>
              <p className="text-lg text-slate-600">
                Un processus simple et efficace en 4 étapes
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {processus.map((etape, idx) => (
                <div
                  key={idx}
                  className="relative animate-slide-up"
                  style={{ animationDelay: `${idx * 150}ms` }}
                >
                  <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 text-white text-2xl font-bold mb-4 shadow-lg">
                      {etape.numero}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {etape.titre}
                    </h3>
                    <p className="text-sm text-slate-600">
                      {etape.description}
                    </p>
                  </div>
                  {idx < processus.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-orange-500" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Témoignages / Stats */}
        <section className="container mx-auto px-8 lg:px-16 py-12">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-orange-50 to-blue-50 rounded-3xl p-12 border-2 border-slate-100">
            <div className="text-center">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-orange-600" />
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                Rejoignez nos professionnels certifiés
              </h2>
              <p className="text-lg text-slate-600 mb-8">
                Plus de 500 professionnels ont déjà validé leurs compétences et boosté leur carrière grâce à nos certifications
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow-lg"
                >
                  <Link href="/catalogue">
                    <Award className="mr-2 h-5 w-5" />
                    Découvrir les formations
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="cursor-pointer border-2"
                >
                  <Link href="/faq">
                    <Download className="mr-2 h-5 w-5" />
                    Télécharger la brochure
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
