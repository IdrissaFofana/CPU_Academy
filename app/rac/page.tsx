"use client";

import { useState } from "react";
import { 
  CheckCircle, 
  Award, 
  FileCheck, 
  ClipboardCheck, 
  Users, 
  Calendar,
  ArrowRight,
  Download,
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Shield,
  ThumbsUp,
  QrCode,
  Layers,
  Hammer,
  Database,
  Folder,
  UserCheck,
  BadgeCheck,
  Search,
  Car,
  Home,
  Snowflake,
  Wrench,
  Shirt,
  Scissors,
  Wheat,
  Laptop,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageBanner } from "@/components/layout/PageBanner";
import Link from "next/link";

export default function RACPage() {
  const [selectedType, setSelectedType] = useState("professionnel");
  const [openSecteur, setOpenSecteur] = useState<string>("automobile");
  const [searchMetier, setSearchMetier] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Tous");

  const typesRAC = [
    {
      id: "professionnel",
      title: "Professionnel",
      description: "Pour valider vos compétences acquises par l'expérience professionnelle",
      icon: <Briefcase className="w-6 h-6" />,
      color: "orange"
    },
    {
      id: "formation",
      title: "Formation continue",
      description: "Pour reconnaître les acquis de vos formations non diplômantes",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "blue"
    },
    {
      id: "mixte",
      title: "Parcours mixte",
      description: "Combinaison d'expérience professionnelle et de formations",
      icon: <Target className="w-6 h-6" />,
      color: "green"
    }
  ];

  const avantages = [
    {
      icon: <ThumbsUp className="w-8 h-8 text-orange-500" />,
      title: "Pas de formation obligatoire",
      description: "Le RAC valorise ce que vous savez déjà faire. Pas besoin de retourner en formation."
    },
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: "Certification officielle",
      description: "Obtenez un certificat reconnu, vérifiable via QR code dans le registre national."
    },
    {
      icon: <Layers className="w-8 h-8 text-orange-500" />,
      title: "Validation modulaire",
      description: "Validez 1 bloc ou la certification complète selon votre niveau de maîtrise."
    },
    {
      icon: <Hammer className="w-8 h-8 text-orange-500" />,
      title: "Épreuve pratique réelle",
      description: "Au moins 1 mise en situation professionnelle pour garantir la crédibilité."
    },
    {
      icon: <Database className="w-8 h-8 text-orange-500" />,
      title: "Traçabilité numérique",
      description: "Dossier numérique complet, décisions motivées et certificat vérifiable."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-orange-500" />,
      title: "Accès aux marchés",
      description: "Ouvre les portes des appels d'offres, financements et opportunités d'emploi."
    }
  ];

  const etapes = [
    {
      numero: 1,
      titre: "Information & Candidature",
      icon: <FileCheck className="w-6 h-6" />,
      description: "Découvrez le RAC et déposez votre candidature avec vos justificatifs d'expérience",
      duree: "1-2 semaines"
    },
    {
      numero: 2,
      titre: "Analyse de recevabilité",
      icon: <ClipboardCheck className="w-6 h-6" />,
      description: "Vérification de vos preuves et de votre éligibilité au métier choisi",
      duree: "1-2 semaines"
    },
    {
      numero: 3,
      titre: "Constitution du dossier",
      icon: <Folder className="w-6 h-6" />,
      description: "Accompagnement pour documenter vos compétences par blocs",
      duree: "2-4 semaines"
    },
    {
      numero: 4,
      titre: "Évaluation pratique",
      icon: <Hammer className="w-6 h-6" />,
      description: "Mise en situation professionnelle et/ou épreuve pratique devant jury",
      duree: "1-2 jours"
    },
    {
      numero: 5,
      titre: "Jury de certification",
      icon: <UserCheck className="w-6 h-6" />,
      description: "Délibération et décision sur la validation totale ou partielle",
      duree: "1 semaine"
    },
    {
      numero: 6,
      titre: "Délivrance du certificat",
      icon: <BadgeCheck className="w-6 h-6" />,
      description: "Remise du certificat avec QR code de vérification dans le registre national",
      duree: "1-2 semaines"
    }
  ];

  const documentsRequis = [
    "CV détaillé",
    "Copies des diplômes et certifications",
    "Attestations d'employeurs",
    "Preuves de réalisations (projets, rapports, etc.)",
    "Lettre de motivation",
    "Pièce d'identité"
  ];

  const secteursMetiers = [
    {
      id: "automobile",
      nom: "Automobile & Transport",
      icon: <Car className="w-5 h-5" />,
      nombreMetiers: 6,
      metiers: [
        { nom: "Mécanique automobile", blocs: 5, duree: "3-5 mois", niveau: "CAP/BT" },
        { nom: "Peinture automobile", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" },
        { nom: "Logistique & Transport", blocs: 6, duree: "4-8 mois", niveau: "BT/BTS" },
        { nom: "Mécanique moto", blocs: 4, duree: "2-4 mois", niveau: "CAP" },
        { nom: "Électricité automobile", blocs: 5, duree: "3-6 mois", niveau: "BT" },
        { nom: "Carrosserie automobile", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" }
      ]
    },
    {
      id: "btp",
      nom: "BTP & Construction",
      icon: <Home className="w-5 h-5" />,
      nombreMetiers: 7,
      metiers: [
        { nom: "Maçonnerie", blocs: 5, duree: "4-6 mois", niveau: "CAP/BT" },
        { nom: "Plomberie", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" },
        { nom: "Électricité bâtiment", blocs: 5, duree: "4-6 mois", niveau: "BT" },
        { nom: "Menuiserie bois", blocs: 4, duree: "3-5 mois", niveau: "CAP" },
        { nom: "Carrelage & Faïence", blocs: 3, duree: "2-4 mois", niveau: "CAP" },
        { nom: "Peinture bâtiment", blocs: 3, duree: "2-4 mois", niveau: "CAP" },
        { nom: "Chef de chantier", blocs: 6, duree: "5-8 mois", niveau: "BTS" }
      ]
    },
    {
      id: "froid",
      nom: "Froid & Climatisation",
      icon: <Snowflake className="w-5 h-5" />,
      nombreMetiers: 3,
      metiers: [
        { nom: "Froid commercial", blocs: 5, duree: "4-6 mois", niveau: "BT" },
        { nom: "Climatisation", blocs: 5, duree: "4-6 mois", niveau: "BT" },
        { nom: "Maintenance frigorifique", blocs: 6, duree: "5-7 mois", niveau: "BTS" }
      ]
    },
    {
      id: "metallurgie",
      nom: "Métallurgie & Soudure",
      icon: <Wrench className="w-5 h-5" />,
      nombreMetiers: 8,
      metiers: [
        { nom: "Soudure TIG", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" },
        { nom: "Soudure MIG/MAG", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" },
        { nom: "Soudure arc électrique", blocs: 4, duree: "3-5 mois", niveau: "CAP" },
        { nom: "Chaudronnerie", blocs: 5, duree: "4-6 mois", niveau: "BT" },
        { nom: "Métallerie", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" },
        { nom: "Serrurerie", blocs: 4, duree: "3-5 mois", niveau: "CAP" },
        { nom: "Tuyauterie industrielle", blocs: 5, duree: "4-6 mois", niveau: "BT" },
        { nom: "Contrôle qualité soudure", blocs: 4, duree: "3-5 mois", niveau: "BT/BTS" }
      ]
    },
    {
      id: "habillement",
      nom: "Habillement & Couture",
      icon: <Shirt className="w-5 h-5" />,
      nombreMetiers: 4,
      metiers: [
        { nom: "Couture mode", blocs: 4, duree: "3-5 mois", niveau: "CAP" },
        { nom: "Stylisme modélisme", blocs: 5, duree: "4-6 mois", niveau: "BT" },
        { nom: "Retouche & réparation", blocs: 3, duree: "2-4 mois", niveau: "CAP" },
        { nom: "Maroquinerie", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" }
      ]
    },
    {
      id: "coiffure",
      nom: "Coiffure & Esthétique",
      icon: <Scissors className="w-5 h-5" />,
      nombreMetiers: 4,
      metiers: [
        { nom: "Coiffure mixte", blocs: 5, duree: "4-6 mois", niveau: "CAP/BT" },
        { nom: "Tressage africain", blocs: 3, duree: "2-4 mois", niveau: "CAP" },
        { nom: "Esthétique & soins", blocs: 5, duree: "4-6 mois", niveau: "CAP/BT" },
        { nom: "Maquillage professionnel", blocs: 3, duree: "2-4 mois", niveau: "CAP" }
      ]
    },
    {
      id: "agroalimentaire",
      nom: "Agroalimentaire",
      icon: <Wheat className="w-5 h-5" />,
      nombreMetiers: 4,
      metiers: [
        { nom: "Boulangerie-pâtisserie", blocs: 5, duree: "4-6 mois", niveau: "CAP/BT" },
        { nom: "Cuisine professionnelle", blocs: 5, duree: "4-6 mois", niveau: "CAP/BT" },
        { nom: "Transformation alimentaire", blocs: 4, duree: "3-5 mois", niveau: "BT" },
        { nom: "Hygiène alimentaire", blocs: 3, duree: "2-4 mois", niveau: "CAP" }
      ]
    },
    {
      id: "numerique",
      nom: "Numérique & Informatique",
      icon: <Laptop className="w-5 h-5" />,
      nombreMetiers: 4,
      metiers: [
        { nom: "Maintenance informatique", blocs: 5, duree: "4-6 mois", niveau: "BT/BTS" },
        { nom: "Développement web", blocs: 6, duree: "5-8 mois", niveau: "BTS" },
        { nom: "Réseaux & télécoms", blocs: 5, duree: "4-6 mois", niveau: "BT/BTS" },
        { nom: "Bureautique avancée", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" }
      ]
    }
  ];

  const formations = [
    {
      titre: "Gestion de Projet Agile",
      niveau: "Intermédiaire",
      duree: "120 heures d'expérience",
      prix: "75 000 FCFA"
    },
    {
      titre: "Marketing Digital PME",
      niveau: "Avancé",
      duree: "150 heures d'expérience",
      prix: "85 000 FCFA"
    },
    {
      titre: "Gestion Financière PME",
      niveau: "Intermédiaire",
      duree: "100 heures d'expérience",
      prix: "70 000 FCFA"
    },
    {
      titre: "Entrepreneuriat & Innovation",
      niveau: "Tous niveaux",
      duree: "80 heures d'expérience",
      prix: "65 000 FCFA"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <PageBanner 
        title="Reconnaissance des Acquis de Compétences"
        subtitle="Obtenez une certification officielle basée sur votre expérience professionnelle et vos formations, sans avoir à suivre l'intégralité d'un programme de formation."
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "RAC" }
        ]}
      />

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-green-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 group">
              Déposer ma candidature
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="border-2 border-gray-300 hover:border-orange-500 hover:bg-orange-50 px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 group">
              Télécharger le guide
              <Download className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Qu'est-ce que le RAC */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Qu'est-ce que le RAC ?
              </h2>
              <p className="text-lg text-gray-600">
                Le RAC est un processus qui permet d'évaluer et de reconnaître officiellement les compétences 
                que vous avez acquises par votre expérience de travail et vos apprentissages.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-green-50 rounded-2xl p-8 md:p-12 border border-orange-100">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    Pourquoi choisir le RAC ?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Valorisez votre expérience professionnelle</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Réduisez la durée de votre parcours de formation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Obtenez une certification reconnue</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Économisez temps et argent</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-orange-500" />
                    Pour qui ?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Professionnels avec plusieurs années d'expérience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Entrepreneurs et chefs d'entreprise</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Personnes en reconversion professionnelle</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Autodidactes souhaitant obtenir une certification</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types de RAC */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types de RAC proposés
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choisissez le type de reconnaissance qui correspond à votre profil
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {typesRAC.map((type, index) => (
              <Card
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl animate-fade-in group relative overflow-hidden ${
                  selectedType === type.id
                    ? "border-2 border-orange-500 shadow-xl scale-105 bg-gradient-to-br from-orange-50 to-white"
                    : "border-2 border-gray-200 hover:border-orange-300 hover:scale-105 hover:-translate-y-2"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background decoration */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-orange-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                  selectedType === type.id ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg' : 'bg-orange-100'
                }`}>
                  <div className={selectedType === type.id ? 'text-white' : 'text-orange-600'}>
                    {type.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {type.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {type.description}
                </p>
                {selectedType === type.id && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="w-6 h-6 text-orange-500 animate-scale-in" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Avantages
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir le RAC ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Le RAC vous offre une voie rapide et crédible vers la certification
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {avantages.map((avantage, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-200 hover:scale-105 group animate-fade-in relative overflow-hidden" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {avantage.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {avantage.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {avantage.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Validation modulaire */}
      <section className="py-16 bg-gradient-to-br from-white via-orange-50 to-green-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Layers className="w-4 h-4" />
                Blocs de compétences
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Validation modulaire
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Chaque certification est découpée en blocs que vous pouvez valider progressivement
              </p>
            </div>

            {/* Deux options : Partielle vs Complète */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Validation partielle */}
              <Card className="p-8 border-2 border-orange-200 bg-white hover:shadow-xl transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-orange-600 mb-2">
                      Validation partielle
                    </h3>
                    <p className="text-gray-600">
                      Validez un ou plusieurs blocs
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Attestation par bloc validé</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Blocs capitalisables à vie</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Reprise possible pour compléter</span>
                  </li>
                </ul>
              </Card>

              {/* Certification complète */}
              <Card className="p-8 border-2 border-green-200 bg-gradient-to-br from-white to-green-50 hover:shadow-xl transition-all relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMANDÉ
                  </div>
                </div>
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Certification complète
                    </h3>
                    <p className="text-gray-600">
                      Validez tous les blocs requis
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Certificat professionnel officiel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">QR code de vérification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Inscription au registre national</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Exemple : Mécanique automobile */}
            <Card className="p-8 bg-white border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Exemple : Mécanique automobile (5 blocs)
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { num: 1, titre: "Diagnostic moteur" },
                  { num: 2, titre: "Systèmes de freinage" },
                  { num: 3, titre: "Transmission" },
                  { num: 4, titre: "Électricité auto" },
                  { num: 5, titre: "Révision & entretien" }
                ].map((bloc, index) => (
                  <div 
                    key={bloc.num}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 group cursor-pointer animate-fade-in hover:scale-105 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-orange-100 text-gray-700 group-hover:text-orange-600 flex items-center justify-center font-bold mx-auto mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      {bloc.num}
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-orange-600 transition-colors">
                      Bloc {bloc.num}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {bloc.titre}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <p className="text-sm text-blue-900">
                  <strong>Comment ça marche ?</strong> Vous pouvez valider uniquement les blocs 1 et 2 cette année, 
                  puis compléter les blocs 3, 4 et 5 plus tard. Chaque bloc validé reste acquis définitivement.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Processus en 6 étapes */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              6 étapes pour obtenir votre certification RAC
            </h2>
            <p className="text-lg text-gray-600">
              Un parcours simple et accompagné du début à la fin
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {etapes.map((etape, index) => (
                <Card 
                  key={index} 
                  className="p-6 hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-orange-300 hover:scale-105 hover:-translate-y-2 group relative overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Numéro en arrière-plan */}
                  <div className="absolute -top-4 -right-4 text-8xl font-bold text-orange-50 group-hover:text-orange-100 transition-all duration-500 group-hover:scale-110">
                    {etape.numero}
                  </div>
                  
                  <div className="relative z-10">
                    {/* Icône */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {etape.icon}
                    </div>
                    
                    {/* Titre */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {etape.titre}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {etape.description}
                    </p>
                    
                    {/* Durée */}
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <Clock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">Durée : {etape.duree}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents requis */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Documents requis
              </h2>
              <p className="text-lg text-gray-600">
                Préparez ces documents pour constituer votre dossier
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {documentsRequis.map((doc, index) => (
                <Card key={index} className="p-4 flex items-center gap-3 border-2 border-gray-100 hover:border-orange-300 hover:shadow-lg transition-all duration-300 group cursor-pointer hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <FileCheck className="w-6 h-6 text-orange-500 flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                  <span className="text-gray-700 font-medium group-hover:text-orange-600 transition-colors">{doc}</span>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <ClipboardCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Conseil important</h4>
                  <p className="text-blue-800 text-sm">
                    Plus vos documents sont complets et détaillés, plus l'évaluation de votre dossier sera rapide. 
                    N'hésitez pas à fournir tous les éléments prouvant vos compétences (certificats, lettres de recommandation, 
                    portfolios, etc.).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Métiers certifiables RAC */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Métiers certifiables RAC
              </h2>
              <p className="text-lg text-gray-600">
                35+ métiers répartis dans 8 secteurs d'activité
              </p>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                {/* Recherche */}
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un métier..."
                    value={searchMetier}
                    onChange={(e) => setSearchMetier(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                  />
                </div>

                {/* Filtres */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {["Tous", "Automobile & Transport", "BTP & Construction", "Froid & Climatisation"].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all ${
                        selectedFilter === filter
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                          : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      {filter === "Tous" ? "Tous" : filter.split("&")[0].trim()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Liste des secteurs avec accordéon */}
            <div className="space-y-4">
              {secteursMetiers
                .filter(secteur => {
                  // Filtrage par catégorie
                  if (selectedFilter === "Tous") return true;
                  return secteur.nom.includes(selectedFilter.split("&")[0].trim());
                })
                .filter(secteur => {
                  // Filtrage par recherche
                  if (!searchMetier) return true;
                  const searchLower = searchMetier.toLowerCase();
                  return secteur.nom.toLowerCase().includes(searchLower) ||
                         secteur.metiers.some(metier => metier.nom.toLowerCase().includes(searchLower));
                })
                .length === 0 ? (
                  <Card className="p-12 text-center border-2 border-gray-200">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Aucun métier trouvé
                        </h3>
                        <p className="text-gray-600">
                          Essayez de modifier vos critères de recherche ou vos filtres
                        </p>
                      </div>
                      <Button 
                        onClick={() => {
                          setSearchMetier("");
                          setSelectedFilter("Tous");
                        }}
                        variant="outline" 
                        className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                      >
                        Réinitialiser les filtres
                      </Button>
                    </div>
                  </Card>
                ) : (
                  secteursMetiers
                    .filter(secteur => {
                      // Filtrage par catégorie
                      if (selectedFilter === "Tous") return true;
                      return secteur.nom.includes(selectedFilter.split("&")[0].trim());
                    })
                    .filter(secteur => {
                      // Filtrage par recherche
                      if (!searchMetier) return true;
                      const searchLower = searchMetier.toLowerCase();
                      return secteur.nom.toLowerCase().includes(searchLower) ||
                             secteur.metiers.some(metier => metier.nom.toLowerCase().includes(searchLower));
                    })
                    .map((secteur) => (
                <Card 
                  key={secteur.id} 
                  className="border-2 border-gray-200 hover:border-orange-300 transition-all overflow-hidden"
                >
                  {/* En-tête du secteur */}
                  <button
                    onClick={() => setOpenSecteur(openSecteur === secteur.id ? "" : secteur.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                        {secteur.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {secteur.nom}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            {secteur.nombreMetiers} métiers
                          </span>
                        </div>
                      </div>
                    </div>
                    {openSecteur === secteur.id ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </button>

                  {/* Contenu développé */}
                  {openSecteur === secteur.id && (
                    <div className="px-6 pb-6 border-t-2 border-gray-100">
                      <div className="grid md:grid-cols-2 gap-4 pt-4">
                        {secteur.metiers
                          .filter(metier => {
                            // Filtrage par recherche dans les métiers
                            if (!searchMetier) return true;
                            return metier.nom.toLowerCase().includes(searchMetier.toLowerCase());
                          })
                          .map((metier, idx) => (
                          <div 
                            key={idx}
                            className="p-4 bg-white border-2 border-gray-100 rounded-xl hover:border-orange-300 hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-105 hover:-translate-y-1 animate-fade-in relative overflow-hidden"
                            style={{ animationDelay: `${idx * 50}ms` }}
                          >
                            {/* Background glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="relative z-10">
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                  {metier.nom}
                                </h4>
                                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded group-hover:scale-110 transition-transform">
                                  {metier.niveau}
                                </span>
                              </div>
                              <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Layers className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                                  <span>{metier.blocs} blocs</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                                  <span>{metier.duree}</span>
                                </div>
                              </div>
                              <Button className="w-full mt-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm group-hover:shadow-lg transition-all">
                                Postuler
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))
                )}
            </div>

            {/* Bouton voir tous */}
            <div className="text-center mt-8">
              <Link href="/catalogue">
                <Button variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-6 text-lg">
                  Voir tous les métiers certifiables
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Questions fréquentes
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Quelle expérience professionnelle est requise ?",
                  r: "En général, un minimum de 2 à 3 ans d'expérience dans le domaine de la formation visée est recommandé. Cependant, chaque candidature est étudiée au cas par cas."
                },
                {
                  q: "Combien coûte la démarche RAC ?",
                  r: "Les frais varient selon la certification visée, généralement entre 50 000 et 100 000 FCFA. Ce montant est significativement inférieur au coût de la formation complète."
                },
                {
                  q: "Quelle est la durée du processus ?",
                  r: "Le processus complet prend généralement entre 6 et 12 semaines, selon la rapidité de constitution de votre dossier et la complexité de l'évaluation."
                },
                {
                  q: "Que se passe-t-il si ma candidature est refusée ?",
                  r: "Vous recevrez un rapport détaillé expliquant les raisons du refus. Vous pourrez alors suivre une formation complémentaire ciblée pour combler les lacunes identifiées."
                },
                {
                  q: "La certification RAC a-t-elle la même valeur qu'une certification classique ?",
                  r: "Oui, absolument. La certification obtenue via le RAC a exactement la même valeur et reconnaissance qu'une certification obtenue après la formation complète."
                }
              ].map((faq, index) => (
                <Card key={index} className="p-6 border-2 border-gray-100 hover:border-orange-300 hover:shadow-xl transition-all duration-300 group cursor-pointer hover:scale-102 animate-fade-in" style={{ animationDelay: `${index * 80}ms` }}>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-start gap-3 group-hover:text-orange-600 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    {faq.q}
                  </h4>
                  <p className="text-gray-600 pl-8 leading-relaxed">
                    {faq.r}
                  </p>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/ressources/faq">
                <Button variant="outline" className="border-2 border-gray-300 hover:border-orange-500">
                  Voir toutes les FAQ
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 lg:p-16 text-center shadow-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Prêt à démarrer ?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Explorez nos formations et commencez votre parcours dès aujourd'hui
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105 group">
                  Déposer ma candidature
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-base md:text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105">
                  Parler à un conseiller
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
