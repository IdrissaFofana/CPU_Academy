import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Building, 
  Users, 
  TrendingUp, 
  Award, 
  Target, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  Rocket, 
  Shield, 
  BarChart, 
  HeadphonesIcon,
  Mail,
  Phone,
  ArrowRight,
  Clock,
  MapPin,
  Zap,
  Lightbulb,
  Settings,
  FileText,
  Star,
  Calendar
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Solutions entreprises - CPU Formation",
  description: "Formez vos équipes avec nos solutions adaptées aux entreprises",
};

const stats = [
  { icon: Building, value: "200+", label: "Entreprises formées" },
  { icon: Users, value: "3,500+", label: "Collaborateurs formés" },
  { icon: Award, value: "95%", label: "Taux de satisfaction" },
  { icon: TrendingUp, value: "12 ans", label: "D'expérience" }
];

const services = [
  {
    icon: GraduationCap,
    titre: "Formations sur mesure",
    description: "Des programmes personnalisés adaptés à vos besoins spécifiques et votre secteur d'activité",
    features: ["Diagnostic des besoins", "Contenu personnalisé", "Formateurs experts", "Suivi post-formation"],
    color: "orange"
  },
  {
    icon: Briefcase,
    titre: "Accompagnement stratégique",
    description: "Un accompagnement complet pour transformer vos projets en succès concrets",
    features: ["Audit organisationnel", "Plan d'action", "Coaching dirigeants", "Reporting régulier"],
    color: "blue"
  },
  {
    icon: Target,
    titre: "Conseil & Expertise",
    description: "Bénéficiez de l'expertise de nos consultants pour optimiser vos processus",
    features: ["Études de marché", "Stratégie commerciale", "Optimisation RH", "Certification qualité"],
    color: "green"
  },
  {
    icon: Rocket,
    titre: "Innovation & Digital",
    description: "Accompagnement dans votre transformation digitale et l'innovation",
    features: ["Transformation digitale", "E-commerce", "Marketing digital", "Automatisation"],
    color: "purple"
  }
];

const packsMetiers = [
  {
    titre: "Pack Direction & Management",
    icon: Target,
    description: "Pour les dirigeants et managers",
    duree: "8 jours",
    modules: 6,
    formations: [
      "Leadership stratégique",
      "Gestion financière avancée",
      "Prise de décision et gestion des risques",
      "Management d'équipe performante"
    ],
    color: "orange",
    gradient: "from-orange-500 to-orange-600"
  },
  {
    titre: "Pack Commercial & Marketing",
    icon: TrendingUp,
    description: "Pour les équipes commerciales",
    duree: "6 jours",
    modules: 5,
    formations: [
      "Techniques de vente avancées",
      "Marketing digital & réseaux sociaux",
      "Négociation commerciale",
      "Gestion de la relation client"
    ],
    color: "blue",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    titre: "Pack Finance & Comptabilité",
    icon: BarChart,
    description: "Pour les équipes financières",
    duree: "7 jours",
    modules: 5,
    formations: [
      "Comptabilité générale et analytique",
      "Analyse financière et tableaux de bord",
      "Fiscalité d'entreprise",
      "Contrôle de gestion"
    ],
    color: "green",
    gradient: "from-green-500 to-green-600"
  },
  {
    titre: "Pack Ressources Humaines",
    icon: Users,
    description: "Pour les équipes RH",
    duree: "6 jours",
    modules: 5,
    formations: [
      "Recrutement et intégration",
      "Gestion de la paie et administration",
      "Droit du travail ivoirien",
      "Développement des compétences"
    ],
    color: "purple",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    titre: "Pack Production & Qualité",
    icon: Settings,
    description: "Pour les équipes opérationnelles",
    duree: "5 jours",
    modules: 4,
    formations: [
      "Gestion de production",
      "Management de la qualité ISO 9001",
      "Amélioration continue (Lean, Kaizen)",
      "Gestion des stocks et logistique"
    ],
    color: "indigo",
    gradient: "from-indigo-500 to-indigo-600"
  },
  {
    titre: "Pack Digital & IT",
    icon: Zap,
    description: "Pour les équipes techniques",
    duree: "7 jours",
    modules: 6,
    formations: [
      "Transformation digitale",
      "Cybersécurité et protection des données",
      "Gestion de projet Agile",
      "Outils collaboratifs (Microsoft 365, etc.)"
    ],
    color: "cyan",
    gradient: "from-cyan-500 to-cyan-600"
  }
];

const avantages = [
  {
    icon: Target,
    titre: "Formations ciblées",
    description: "Contenus adaptés à votre secteur et vos enjeux"
  },
  {
    icon: BarChart,
    titre: "ROI mesurable",
    description: "Suivi des compétences acquises et impact métier"
  },
  {
    icon: Settings,
    titre: "Flexibilité totale",
    description: "Présentiel, en ligne ou hybride selon vos besoins"
  },
  {
    icon: FileText,
    titre: "Documentation",
    description: "Supports pédagogiques personnalisés"
  },
  {
    icon: Award,
    titre: "Certifications",
    description: "Attestations et certificats officiels"
  },
  {
    icon: TrendingUp,
    titre: "Reporting",
    description: "Tableau de bord de suivi des formations"
  }
];

const partenaires = [
  { nom: "Secteur Bancaire", count: "15+ banques" },
  { nom: "Télécommunications", count: "8+ opérateurs" },
  { nom: "Industrie", count: "50+ entreprises" },
  { nom: "Services", count: "100+ PME" },
  { nom: "Administration", count: "20+ institutions" },
  { nom: "ONG & Projets", count: "30+ organisations" }
];

const criteres = [
  "Identifier précisément vos besoins en formation",
  "Définir vos objectifs de montée en compétences",
  "Prévoir un budget formation adapté",
  "Désigner un référent formation dans votre structure",
  "S'engager dans un processus d'amélioration continue"
];

export default function EntreprisesPage() {
  return (
    <>
      <PageBanner 
        title="Solutions entreprises"
        subtitle="Développez les compétences de vos équipes avec nos solutions sur mesure"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Entreprises" }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
        {/* Stats Section */}
        <section className="container mx-auto px-8 lg:px-16 py-16">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Icon className="w-10 h-10 mx-auto mb-3 text-orange-600" />
                  <div className="text-3xl font-bold mb-1 text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Services Section */}
        <section id="services-entreprises" className="container mx-auto px-8 lg:px-16 py-16">
          <div className="text-center mb-12 animate-slide-up">
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-0">
              <Briefcase className="w-3 h-3 mr-1" />
              Nos services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Des solutions adaptées à vos besoins
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Un accompagnement complet pour développer les compétences de vos collaborateurs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <Card
                  key={idx}
                  className="p-6 hover:shadow-2xl transition-all duration-300 border-2 hover:border-orange-200 animate-slide-up"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-${service.color}-100 mb-3`}>
                    <Icon className={`w-6 h-6 text-${service.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.titre}</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Packs Métiers Section */}
        <section id="former-vos-equipes" className="container mx-auto px-8 lg:px-16 py-16">
          <div className="text-center mb-12 animate-slide-up">
            <Badge className="mb-4 bg-orange-100 text-orange-700 border-0">
              <Briefcase className="w-3 h-3 mr-1" />
              Packs métiers
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Packs métiers
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Des parcours de formation thématiques pour chaque fonction clé de l'entreprise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {packsMetiers.map((pack, idx) => {
              const Icon = pack.icon;
              return (
                <Card
                  key={idx}
                  className="group relative bg-white hover:shadow-2xl transition-all duration-300 border-2 border-slate-100 hover:border-orange-200 animate-slide-up overflow-hidden"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Barre colorée en haut */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${pack.gradient}`}></div>

                  <div className="p-6">
                    {/* Header avec icône */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${pack.gradient} text-white shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline" className="text-xs bg-slate-50">
                          <Clock className="w-3 h-3 mr-1" />
                          {pack.duree}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-slate-50">
                          {pack.modules} modules
                        </Badge>
                      </div>
                    </div>

                    {/* Titre et description */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {pack.titre}
                    </h3>
                    <p className="text-sm text-slate-600 mb-4">{pack.description}</p>

                    {/* Liste des formations */}
                    <div className="space-y-2 mb-6">
                      <p className="text-xs font-semibold text-slate-900 mb-2">Formations incluses :</p>
                      <ul className="space-y-2">
                        {pack.formations.map((formation, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span>{formation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <Button
                      asChild
                      className={`w-full cursor-pointer bg-gradient-to-r ${pack.gradient} hover:opacity-90 text-white shadow-md transition-all`}
                    >
                      <Link href="#contact">
                        En savoir plus
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* CTA général */}
          <div className="text-center mt-12 px-4">
            <p className="text-slate-600 mb-4">Besoin d'un pack personnalisé ?</p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="cursor-pointer border-2 border-orange-500 text-orange-600 hover:bg-orange-50 w-full sm:w-auto"
            >
              <Link href="#contact" className="flex items-center justify-center px-3 py-2 sm:px-6">
                <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="text-xs sm:text-base leading-tight">
                  <span className="hidden sm:inline">Contactez-nous pour un programme sur mesure</span>
                  <span className="sm:hidden">Programme sur mesure</span>
                </span>
              </Link>
            </Button>
          </div>
        </section>

        {/* Avantages Section */}
        <section id="solutions-sur-mesure" className="container mx-auto px-8 lg:px-16 py-20 bg-gradient-to-br from-orange-50/30 via-white to-blue-50/20">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Pourquoi choisir CPU Formation ?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
            {avantages.map((avantage, idx) => {
              const Icon = avantage.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  {/* Cercle avec icône */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-all duration-300 group-hover:scale-110">
                      <Icon className="w-9 h-9 text-orange-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    {/* Effet de pulse au survol */}
                    <div className="absolute inset-0 rounded-full bg-orange-200 opacity-0 group-hover:opacity-20 group-hover:animate-ping"></div>
                  </div>

                  {/* Titre */}
                  <h3 className="text-base font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {avantage.titre}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {avantage.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Partenaires Section */}
        <section id="partenariats" className="container mx-auto px-8 lg:px-16 py-16">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-orange-50 to-blue-50 rounded-3xl p-12 border-2 border-slate-100">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-orange-500 text-white border-0">
                <Building className="w-3 h-3 mr-1" />
                Partenariats
              </Badge>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Ils nous font confiance
              </h2>
              <p className="text-lg text-slate-600">
                Des partenariats solides avec les acteurs majeurs de l'économie ivoirienne
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {partenaires.map((partenaire, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-sm hover:shadow-md transition-all animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="text-2xl font-bold text-orange-600 mb-1">{partenaire.count}</div>
                  <div className="text-sm text-slate-600">{partenaire.nom}</div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                asChild
                size="lg"
                className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow-lg"
              >
                <Link href="#contact">
                  <Mail className="mr-2 h-5 w-5" />
                  Devenir partenaire
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Contact/Devis Section */}
        <section id="contact" className="container mx-auto px-8 lg:px-16 py-16">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Colonne gauche - Info */}
              <div className="p-12 text-white">
                <Badge className="mb-4 bg-orange-500 text-white border-0">
                  <Calendar className="w-3 h-3 mr-1" />
                  Demande de devis
                </Badge>
                <h2 className="text-3xl font-bold mb-4">
                  Démarrons votre projet ensemble
                </h2>
                <p className="text-slate-300 mb-8 leading-relaxed">
                  Nos experts sont à votre disposition pour étudier vos besoins et vous proposer une solution sur mesure.
                </p>

                <div className="space-y-4 mb-8">
                  <h3 className="font-bold text-lg mb-4">Pour bien démarrer :</h3>
                  {criteres.map((critere, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-300">{critere}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-8 border-t border-slate-700">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Phone className="w-5 h-5 text-orange-500" />
                    <span>+225 27 20 21 22 23</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Mail className="w-5 h-5 text-orange-500" />
                    <span>entreprises@cpu-formation.ci</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <Clock className="w-5 h-5 text-orange-500" />
                    <span>Lun-Ven: 8h-18h, Sam: 9h-13h</span>
                  </div>
                </div>
              </div>

              {/* Colonne droite - CTA */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-12 flex flex-col justify-center items-center text-center text-white">
                <GraduationCap className="w-16 h-16 mb-6" />
                <h3 className="text-2xl font-bold mb-4">
                  Obtenez votre devis personnalisé
                </h3>
                <p className="text-orange-100 mb-8">
                  Réponse sous 24h ouvrées
                </p>
                <div className="space-y-4 w-full">
                  <Button
                    asChild
                    size="lg"
                    className="w-full cursor-pointer bg-white text-orange-600 hover:bg-orange-50 shadow-lg"
                  >
                    <Link href="/ressources/faq">
                      <Mail className="mr-2 h-5 w-5" />
                      Demander un devis
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full cursor-pointer border-2 border-white bg-white text-slate-900 hover:bg-white/90 hover:text-orange-600"
                  >
                    <Link href="/catalogue">
                      <FileText className="mr-2 h-5 w-5" />
                      Voir le catalogue
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
