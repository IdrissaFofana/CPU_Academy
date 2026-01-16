import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Users, GraduationCap, Award, Briefcase, Star, MapPin, Clock, CheckCircle2, ArrowRight, Mail, Linkedin, Globe, BookOpen, Target, TrendingUp, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Nos experts - CPU Academy",
  description: "Découvrez nos formateurs experts dans leur domaine",
};

const experts = [
  {
    id: 1,
    nom: "Dr. Kouassi Amani",
    specialite: "Entrepreneuriat & Management",
    photo: "/experts/avatar-1.jpg",
    experience: "15 ans",
    formations: 45,
    rating: 4.9,
    certifications: ["MBA", "Consultant CEPICI"],
    domaines: ["Business Plan", "Stratégie", "Finance"],
    localisation: "Abidjan, Plateau",
    disponible: true
  },
  {
    id: 2,
    nom: "Marie-Claire Koné",
    specialite: "Marketing Digital & E-commerce",
    photo: "/experts/avatar-2.jpg",
    experience: "10 ans",
    formations: 38,
    rating: 4.8,
    certifications: ["Google Analytics", "Meta Blueprint"],
    domaines: ["SEO", "Réseaux Sociaux", "Marketplace"],
    localisation: "Abidjan, Cocody",
    disponible: true
  },
  {
    id: 3,
    nom: "Jean-Baptiste Yao",
    specialite: "Marchés Publics & AO",
    photo: "/experts/avatar-3.jpg",
    experience: "12 ans",
    formations: 32,
    rating: 4.9,
    certifications: ["Expert AO", "Juriste"],
    domaines: ["Appels d'offres", "Conformité", "Rédaction"],
    localisation: "Abidjan, Marcory",
    disponible: false
  },
  {
    id: 4,
    nom: "Fatou Traoré",
    specialite: "Finance & Bancabilité",
    photo: "/experts/avatar-4.jpg",
    experience: "18 ans",
    formations: 41,
    rating: 5.0,
    certifications: ["CFA", "Expert Comptable"],
    domaines: ["Comptabilité", "Audit", "Levée de fonds"],
    localisation: "Abidjan, Deux Plateaux",
    disponible: true
  },
  {
    id: 5,
    nom: "Ibrahim Diallo",
    specialite: "Production & Qualité",
    photo: "/experts/avatar-5.jpg",
    experience: "14 ans",
    formations: 28,
    rating: 4.7,
    certifications: ["ISO 9001", "HACCP"],
    domaines: ["Qualité", "Process", "Certification"],
    localisation: "Abidjan, Yopougon",
    disponible: true
  },
  {
    id: 6,
    nom: "Aya N'Guessan",
    specialite: "Ressources Humaines",
    photo: "/experts/avatar-6.jpg",
    experience: "11 ans",
    formations: 35,
    rating: 4.8,
    certifications: ["GPEC", "Coach Certifiée"],
    domaines: ["Recrutement", "Formation", "Management"],
    localisation: "Abidjan, Angré",
    disponible: true
  }
];

const avantagesFormateur = [
  {
    icon: TrendingUp,
    titre: "Revenus attractifs",
    description: "Rémunération compétitive et régulière selon votre volume d'interventions"
  },
  {
    icon: Users,
    titre: "Communauté d'experts",
    description: "Rejoignez un réseau de formateurs qualifiés et échangez les meilleures pratiques"
  },
  {
    icon: BookOpen,
    titre: "Ressources pédagogiques",
    description: "Accédez à nos outils et supports de formation pour faciliter vos interventions"
  },
  {
    icon: Award,
    titre: "Reconnaissance",
    description: "Valorisez votre expertise et développez votre notoriété professionnelle"
  }
];

const criteres = [
  "Expertise reconnue dans votre domaine (minimum 5 ans d'expérience)",
  "Diplôme ou certification professionnelle pertinente",
  "Expérience en formation ou transmission de compétences",
  "Excellentes capacités de communication",
  "Disponibilité pour animer des sessions régulières",
  "Engagement envers la qualité pédagogique"
];

export default function ExpertsPage() {
  return (
    <>
      <PageBanner 
        title="Nos experts"
        subtitle="Découvrez nos formateurs experts dans leur domaine"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Experts" }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
        {/* Stats Section */}
        <section className="container mx-auto px-8 lg:px-16 py-12">
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in">
              <Users className="w-10 h-10 mx-auto mb-3 text-orange-600" />
              <div className="text-3xl font-bold mb-1 text-slate-900">50+</div>
              <div className="text-sm text-slate-600">Experts</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in animation-delay-100">
              <GraduationCap className="w-10 h-10 mx-auto mb-3 text-blue-600" />
              <div className="text-3xl font-bold mb-1 text-slate-900">200+</div>
              <div className="text-sm text-slate-600">Formations</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in animation-delay-200">
              <Star className="w-10 h-10 mx-auto mb-3 text-yellow-600" />
              <div className="text-3xl font-bold mb-1 text-slate-900">4.8/5</div>
              <div className="text-sm text-slate-600">Satisfaction</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in animation-delay-300">
              <Briefcase className="w-10 h-10 mx-auto mb-3 text-green-600" />
              <div className="text-3xl font-bold mb-1 text-slate-900">12+</div>
              <div className="text-sm text-slate-600">Ans d'expérience moyenne</div>
            </div>
          </div>
        </section>

        {/* Annuaire des experts Section */}
        <section id="annuaire-experts" className="container mx-auto px-8 lg:px-16 py-12">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Annuaire des Experts
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Nos formateurs sont des professionnels reconnus, passionnés par la transmission de leur expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {experts.map((expert, idx) => (
              <div
                key={expert.id}
                className="group bg-white rounded-3xl border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 animate-slide-up overflow-hidden flex flex-col"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Photo & Status */}
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <Users className="w-24 h-24 text-slate-400" />
                  </div>
                  {expert.disponible && (
                    <Badge className="absolute top-4 right-4 bg-green-500 text-white border-0">
                      Disponible
                    </Badge>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-slate-900 mb-1">
                    {expert.nom}
                  </h3>
                  <p className="text-orange-600 font-medium text-sm mb-4">
                    {expert.specialite}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                    <MapPin className="w-4 h-4" />
                    <span>{expert.localisation}</span>
                  </div>

                  <div className="flex items-center gap-4 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700">{expert.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4 text-slate-500" />
                      <span className="text-slate-700">{expert.formations} formations</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-slate-700 font-semibold">{expert.rating}</span>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mb-4">
                    <p className="text-xs font-bold text-slate-900 mb-2">Certifications:</p>
                    <div className="flex flex-wrap gap-2">
                      {expert.certifications.map((cert, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-blue-50 border-blue-200 text-blue-700">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Domaines */}
                  <div className="mb-4">
                    <p className="text-xs font-bold text-slate-900 mb-2">Domaines:</p>
                    <div className="flex flex-wrap gap-2">
                      {expert.domaines.map((domaine, i) => (
                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-50 text-xs text-slate-700 border border-slate-200">
                          {domaine}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 pt-0 mt-auto">
                  <div className="flex gap-3">
                    <Button
                      asChild
                      variant="outline"
                      className="flex-1 cursor-pointer border-2 border-slate-200 hover:bg-slate-50"
                    >
                      <Link href={`/catalogue?expert=expert-${expert.id}`}>
                        <BookOpen className="mr-2 h-4 w-4" />
                        Voir formations
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="flex-1 cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white"
                    >
                      <Link href="/ressources/faq">
                        <Mail className="mr-2 h-4 w-4" />
                        Contacter
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Devenir Formateur Section */}
        <section id="devenir-formateur" className="container mx-auto px-8 lg:px-16 py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Sparkles className="w-12 h-12 mx-auto mb-4 text-orange-500" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Devenez Formateur chez CPU Academy
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Partagez votre expertise, impactez des carrières et développez votre activité de formation
              </p>
            </div>

            {/* Avantages */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {avantagesFormateur.map((avantage, idx) => {
                const Icon = avantage.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/15 transition-all animate-fade-in"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-500/20 mb-4">
                      <Icon className="w-6 h-6 text-orange-400" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{avantage.titre}</h3>
                    <p className="text-sm text-slate-300">{avantage.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Critères */}
            <div className="bg-white/5 rounded-3xl p-8 md:p-12 backdrop-blur-sm border border-white/10 mb-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <Target className="w-7 h-7 text-orange-500" />
                Critères de sélection
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {criteres.map((critere, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200">{critere}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-lg text-slate-300 mb-6">
                Prêt à rejoindre notre équipe d'experts ?
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  asChild
                  size="lg"
                  className="cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:opacity-90 text-white shadow-lg"
                >
                  <Link href="/support">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Postuler maintenant
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="cursor-pointer border-2 border-white bg-white text-slate-900 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Link href="/ressources/faq#contact-form">
                    <Mail className="mr-2 h-5 w-5" />
                    Nous contacter
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
