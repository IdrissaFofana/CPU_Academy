import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageBanner } from "@/components/layout/PageBanner";
import {
  Target,
  Eye,
  Heart,
  Users,
  Award,
  Building2,
  TrendingUp,
  Globe,
  CheckCircle2,
  Sparkles,
  Handshake,
  Rocket,
  BookOpen,
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "À propos - CPU Formation",
  description: "Découvrez la mission, la vision et l'équipe derrière CPU Formation",
};

export default function AboutPage() {
  const stats = [
    { icon: Users, value: "10,000+", label: "Apprenants formés" },
    { icon: BookOpen, value: "350+", label: "Formations disponibles" },
    { icon: Award, value: "5,000+", label: "Certifications délivrées" },
    { icon: Building2, value: "500+", label: "Entreprises partenaires" },
  ];

  const values = [
    {
      icon: Target,
      titre: "Excellence",
      description:
        "Nous nous engageons à fournir des formations de la plus haute qualité, adaptées aux besoins du marché ivoirien et africain.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Heart,
      titre: "Impact social",
      description:
        "Notre mission va au-delà de la formation : nous contribuons au développement économique et social de la Côte d'Ivoire.",
      color: "from-red-500 to-red-600",
    },
    {
      icon: Handshake,
      titre: "Partenariat",
      description:
        "Nous collaborons avec les entreprises, institutions et experts pour créer un écosystème d'apprentissage dynamique.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Rocket,
      titre: "Innovation",
      description:
        "Nous adoptons les dernières technologies et méthodologies pédagogiques pour offrir une expérience d'apprentissage moderne.",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const team = [
    {
      nom: "Dr. Kouamé Yao",
      poste: "Directeur Général",
      photo: "/team/ceo.jpg",
      description: "Expert en gestion d'entreprise avec 15 ans d'expérience",
    },
    {
      nom: "Mme Adjoua Koffi",
      poste: "Directrice Pédagogique",
      photo: "/team/pedagogue.jpg",
      description: "Spécialiste en transformation digitale et e-learning",
    },
    {
      nom: "M. Diabaté Ibrahim",
      poste: "Directeur Académique",
      photo: "/team/academic.jpg",
      description: "Expert-comptable et formateur certifié",
    },
    {
      nom: "M. Konan Parfait",
      poste: "Responsable Partenariats",
      photo: "/team/partnerships.jpg",
      description: "Coach en leadership et développement organisationnel",
    },
  ];

  const partenaires = [
    { nom: "Banque Mondiale", logo: "/partners/wb.png" },
    { nom: "PNUD", logo: "/partners/undp.png" },
    { nom: "Chambre de Commerce CI", logo: "/partners/cci.png" },
    { nom: "Ministère de la Formation", logo: "/partners/minform.png" },
    { nom: "Orange CI", logo: "/partners/orange.png" },
    { nom: "MTN CI", logo: "/partners/mtn.png" },
  ];

  const milestones = [
    { year: "2020", event: "Création de CPU Formation" },
    { year: "2021", event: "1,000 premiers apprenants formés" },
    { year: "2022", event: "Lancement des parcours certifiants" },
    { year: "2023", event: "Expansion dans 5 régions" },
    { year: "2024", event: "Partenariat avec 100+ entreprises" },
    { year: "2025", event: "10,000 professionnels formés" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <PageBanner
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "À propos" }
        ]}
        slides={[
          {
            image: "/images/formation-tech.png",
            title: "Former les leaders de demain",
            subtitle: "CPU Formation: plateforme de référence pour le développement des compétences en Côte d'Ivoire",
            buttons: [
              { label: "Notre mission", href: "#mission", icon: <Target className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/formation-agriculture.png",
            title: "Excellence & Innovation",
            subtitle: "Accompagnement des individus et entreprises dans leur montée en compétences",
            buttons: [
              { label: "Nos valeurs", href: "#valeurs", icon: <Heart className="h-5 w-5" /> }
            ]
          }
        ]}
      />

      {/* Stats Section */}
      <section className="py-16 relative z-10">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="p-8 text-center border-2 border-slate-100 hover:border-cpu-orange transition-all duration-300 animate-scale-in bg-white"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-cpu-orange/10 to-orange-100 mb-4">
                    <Icon className="w-8 h-8 text-cpu-orange" />
                  </div>
                  <div className="text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
                  <div className="text-slate-600">{stat.label}</div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="p-10 border-2 border-slate-100 transition-all duration-300 animate-slide-in-left">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-cpu-orange to-orange-600 mb-6">
                <Target className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Notre Mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Démocratiser l'accès à une formation professionnelle de qualité pour tous les Ivoiriens,
                en proposant des parcours adaptés aux besoins du marché du travail et aux réalités locales.
                Nous visons à réduire le chômage et à stimuler l'entrepreneuriat en Côte d'Ivoire.
              </p>
            </Card>

            <Card className="p-10 border-2 border-slate-100 transition-all duration-300 animate-slide-in-right">
              <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 mb-6">
                <Eye className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Notre Vision</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Devenir la première plateforme africaine de développement des compétences, reconnue pour
                l'excellence de ses formations et son impact social. Nous aspirons à former 100,000
                professionnels d'ici 2030 et à contribuer significativement au développement économique de l'Afrique.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <Badge className="bg-cpu-orange text-white border-0 mb-4 px-4 py-2">
              Nos valeurs
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Ce qui nous guide</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Des principes forts qui orientent toutes nos actions et décisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card
                  key={index}
                  className="p-8 border-2 border-slate-100 transition-all duration-300 group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{value.titre}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <Badge className="bg-cpu-orange text-white border-0 mb-4 px-4 py-2">
              Notre parcours
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">L'histoire de CPU Formation</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-cpu-orange to-orange-600"></div>
              
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative mb-12 animate-fade-in-up ${
                    index % 2 === 0 ? "text-right pr-1/2 mr-8" : "text-left pl-1/2 ml-8"
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <Card className="inline-block p-6 border-2 border-slate-100 hover:border-cpu-orange transition-all duration-300">
                    <div className="text-3xl font-bold text-cpu-orange mb-2">{milestone.year}</div>
                    <p className="text-lg text-slate-900 font-semibold">{milestone.event}</p>
                  </Card>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-cpu-orange border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <Badge className="bg-cpu-orange text-white border-0 mb-4 px-4 py-2">
              Notre équipe
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Les experts qui nous dirigent</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Une équipe passionnée et expérimentée au service de votre réussite
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="p-6 border-2 border-slate-100 hover:border-cpu-orange transition-all duration-300 text-center group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cpu-orange/20 to-orange-100 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-16 h-16 text-cpu-orange" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{member.nom}</h3>
                <p className="text-cpu-orange font-semibold mb-3">{member.poste}</p>
                <p className="text-sm text-slate-600">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partenaires */}
      <section className="py-20">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <Badge className="bg-cpu-orange text-white border-0 mb-4 px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              Nos partenaires
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Ils nous font confiance</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Des partenaires prestigieux qui soutiennent notre mission
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partenaires.map((partner, index) => (
              <Card
                key={index}
                className="p-6 border-2 border-slate-100 hover:border-cpu-orange transition-all duration-300 flex items-center justify-center aspect-square animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <Building2 className="w-12 h-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-600 font-semibold">{partner.nom}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-8 lg:px-16 text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à commencer votre parcours ?</h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Rejoignez des milliers de professionnels qui développent leurs compétences avec CPU Formation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-cpu-orange hover:bg-orange-600 text-white px-8 py-6 text-lg" asChild>
              <Link href="/inscription">
                S'inscrire gratuitement
                <Rocket className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-slate-900 px-8 py-6 text-lg" asChild>
              <Link href="/catalogue">Explorer les formations</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

