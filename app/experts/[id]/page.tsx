"use client";

import { PageBanner } from "@/components/layout/PageBanner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  BookOpen, 
  Mail, 
  Phone,
  Linkedin,
  Globe,
  Award,
  CheckCircle2,
  Calendar,
  Heart,
  Share2,
  Download,
  ArrowLeft,
  GraduationCap,
  TrendingUp,
  Languages
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import { useExpertFavorites } from "@/hooks/useExpertFavorites";
import { useState } from "react";

// Mock expert data - dans un vrai projet, ceci viendrait d'une API ou base de données
const expertsData = [
  {
    id: 1,
    nom: "Dr. Kouassi Amani",
    specialite: "Entrepreneuriat & Management",
    photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    coverPhoto: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop",
    experience: "15 ans",
    formations: 45,
    studentsCount: 1250,
    rating: 4.9,
    reviewsCount: 287,
    certifications: ["MBA - HEC Paris", "Consultant CEPICI", "PMP", "Lean Six Sigma Black Belt"],
    domaines: ["Business Plan", "Stratégie d'entreprise", "Finance", "Gestion de projet", "Leadership"],
    localisation: "Plateau, Abidjan",
    disponible: true,
    bio: "Expert en entrepreneuriat avec plus de 15 ans d'expérience dans l'accompagnement des startups et PME africaines. Spécialisé dans le développement stratégique et la transformation digitale.",
    bioLong: "Dr. Kouassi Amani est un entrepreneur et consultant reconnu avec plus de 15 ans d'expérience dans l'écosystème entrepreneurial ivoirien et africain. Après des études à HEC Paris et une carrière réussie dans le conseil en management, il s'est spécialisé dans l'accompagnement des startups et PME.\n\nPassionné par la transmission de connaissances, il a formé plus de 1250 entrepreneurs à travers ses formations pratiques et ses programmes d'incubation. Son approche combine méthodologie rigoureuse et adaptation au contexte africain.\n\nReconnu comme l'un des meilleurs formateurs en entrepreneuriat de la région, il intervient régulièrement dans des conférences internationales et collabore avec plusieurs institutions de développement.",
    tarif: "50 000 FCFA/h",
    tarifFormation: "A partir de 150 000 FCFA",
    langues: ["Français", "Anglais", "Baoulé"],
    prochaineDispo: "15 mars 2024",
    email: "k.amani@cpuformation.ci",
    phone: "+225 07 XX XX XX XX",
    linkedin: "https://linkedin.com/in/kouassi-amani",
    website: "https://example.com",
    isTop: true,
    parcours: [
      { periode: "2020 - Présent", titre: "Formateur Senior", entreprise: "CPU Formation" },
      { periode: "2015 - 2020", titre: "Consultant Senior", entreprise: "Deloitte Côte d'Ivoire" },
      { periode: "2010 - 2015", titre: "Directeur Stratégie", entreprise: "NSIA Banque" },
      { periode: "2008 - 2010", titre: "Manager", entreprise: "PwC Paris" }
    ],
    expertises: [
      "Business Model Canvas",
      "Lean Startup",
      "Design Thinking",
      "Pitch Deck",
      "Levée de fonds",
      "Stratégie Marketing"
    ],
    formationsPopulaires: [
      { id: "f1", titre: "Entrepreneuriat : De l'idée au Business Plan", prix: "150 000", duree: "40h", inscrits: 245 },
      { id: "f2", titre: "Gestion stratégique d'entreprise", prix: "200 000", duree: "30h", inscrits: 189 },
      { id: "f3", titre: "Leadership & Management d'équipe", prix: "180 000", duree: "25h", inscrits: 312 }
    ],
    temoignages: [
      {
        auteur: "Adjoua Konan",
        role: "CEO, Tech Startup",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        note: 5,
        texte: "Dr. Amani m'a accompagnée de l'idée à la levée de fonds. Son expertise et ses conseils ont été déterminants pour le succès de ma startup.",
        date: "Janvier 2024"
      },
      {
        auteur: "Yao Kouamé",
        role: "Entrepreneur",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
        note: 5,
        texte: "Formateur exceptionnel ! Approche pratique, exemples concrets et suivi personnalisé. Je recommande vivement.",
        date: "Décembre 2023"
      },
      {
        auteur: "Marie Diabaté",
        role: "Directrice PME",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop",
        note: 4,
        texte: "Une formation de qualité qui a transformé ma vision de l'entreprise. Merci pour ce partage d'expérience.",
        date: "Novembre 2023"
      }
    ]
  }
  // Plus d'experts peuvent être ajoutés
];

export default function ExpertDetailPage() {
  const params = useParams();
  const expertId = parseInt(params.id as string);
  const expert = expertsData.find(e => e.id === expertId);
  
  const { toggleFavorite, isFavorite } = useExpertFavorites();
  const [showContactModal, setShowContactModal] = useState(false);

  if (!expert) {
    notFound();
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${expert.nom} - Expert ${expert.specialite}`,
          text: expert.bio,
          url: window.location.href
        });
      } catch (error) {
        console.log("Erreur partage:", error);
      }
    } else {
      // Fallback: copier le lien
      navigator.clipboard.writeText(window.location.href);
      alert("Lien copié dans le presse-papier !");
    }
  };

  return (
    <>
      <PageBanner 
        title={expert.nom}
        subtitle={expert.specialite}
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Experts", href: "/experts" },
          { label: expert.nom }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
        {/* Cover Photo */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <Image
            src={expert.coverPhoto}
            alt="Cover"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 md:px-8 lg:px-16 -mt-32 relative z-10">
          {/* Header Card */}
          <Card className="p-6 md:p-8 mb-8 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Photo */}
              <div className="relative">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden ring-4 ring-white shadow-xl">
                  <Image
                    src={expert.photo}
                    alt={expert.nom}
                    fill
                    className="object-cover"
                  />
                </div>
                {expert.isTop && (
                  <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
                    <Award className="w-3 h-3 mr-1" />
                    Top Formateur
                  </Badge>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                      {expert.nom}
                    </h1>
                    <p className="text-xl text-cpu-orange font-medium mb-3">
                      {expert.specialite}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{expert.localisation}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{expert.experience} d'expérience</span>
                      </div>
                      {expert.disponible && (
                        <Badge className="bg-green-500 text-white animate-pulse">
                          Disponible
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFavorite(expert.id)}
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(expert.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-2xl font-bold text-gray-900">{expert.rating}</span>
                    </div>
                    <div className="text-xs text-gray-600">{expert.reviewsCount} avis</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span className="text-2xl font-bold text-gray-900">{expert.formations}</span>
                    </div>
                    <div className="text-xs text-gray-600">Formations</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="w-4 h-4 text-green-500" />
                      <span className="text-2xl font-bold text-gray-900">{expert.studentsCount}+</span>
                    </div>
                    <div className="text-xs text-gray-600">Étudiants</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Award className="w-4 h-4 text-purple-500" />
                      <span className="text-2xl font-bold text-gray-900">{expert.certifications.length}</span>
                    </div>
                    <div className="text-xs text-gray-600">Certifications</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                className="flex-1 bg-cpu-orange hover:bg-cpu-orange/90" 
                onClick={() => setShowContactModal(true)}
              >
                <Mail className="w-5 h-5 mr-2" />
                Contacter l'expert
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="flex-1" 
                asChild
              >
                <Link href={`/catalogue?expert=${expert.id}`}>
                  <BookOpen className="w-5 h-5 mr-2" />
                  Voir les formations
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
              >
                <Download className="w-5 h-5 mr-2" />
                CV
              </Button>
            </div>
          </Card>

          {/* Main Content */}
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* À propos */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-cpu-orange" />
                  À propos
                </h2>
                <div className="prose prose-gray max-w-none">
                  {expert.bioLong.split('\n').map((paragraph, idx) => (
                    <p key={idx} className="text-gray-700 mb-4">{paragraph}</p>
                  ))}
                </div>
              </Card>

              {/* Parcours */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-cpu-orange" />
                  Parcours professionnel
                </h2>
                <div className="space-y-4">
                  {expert.parcours.map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start">
                      <div className="flex-shrink-0 w-2 h-2 bg-cpu-orange rounded-full mt-2" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-gray-900">{item.titre}</h3>
                          <span className="text-sm text-gray-500">{item.periode}</span>
                        </div>
                        <p className="text-gray-600">{item.entreprise}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Témoignages */}
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-cpu-orange" />
                  Témoignages ({expert.temoignages.length})
                </h2>
                <div className="space-y-6">
                  {expert.temoignages.map((temoignage, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src={temoignage.photo}
                            alt={temoignage.auteur}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <h4 className="font-semibold text-gray-900">{temoignage.auteur}</h4>
                              <p className="text-sm text-gray-600">{temoignage.role}</p>
                            </div>
                            <div className="flex gap-0.5">
                              {[...Array(temoignage.note)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-2">{temoignage.texte}</p>
                      <p className="text-xs text-gray-500">{temoignage.date}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Informations */}
              <Card className="p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">Informations</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Tarif horaire</p>
                    <p className="text-2xl font-bold text-cpu-orange">{expert.tarif}</p>
                  </div>

                  {expert.prochaineDispo && (
                    <div>
                      <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Prochaine disponibilité
                      </p>
                      <p className="font-semibold">{expert.prochaineDispo}</p>
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-gray-600 mb-2 flex items-center gap-1">
                      <Languages className="w-4 h-4" />
                      Langues
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {expert.langues.map((langue, idx) => (
                        <Badge key={idx} variant="outline">{langue}</Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600 mb-3">Contact</p>
                    <div className="space-y-2">
                      {expert.linkedin && (
                        <a href={expert.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                          <Linkedin className="w-4 h-4" />
                          LinkedIn
                        </a>
                      )}
                      {expert.website && (
                        <a href={expert.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                          <Globe className="w-4 h-4" />
                          Site web
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Certifications */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-cpu-orange" />
                  Certifications
                </h3>
                <div className="space-y-2">
                  {expert.certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-sm text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Domaines d'expertise */}
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-4">Domaines d'expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {expert.expertises.map((expertise, idx) => (
                    <Badge key={idx} variant="outline" className="bg-orange-50 border-orange-200">
                      {expertise}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Formations populaires */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Formations populaires
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {expert.formationsPopulaires.map((formation) => (
                <Card key={formation.id} className="p-6 hover:shadow-xl transition-shadow">
                  <h3 className="font-bold text-lg mb-3">{formation.titre}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Durée</span>
                      <span className="font-semibold">{formation.duree}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Inscrits</span>
                      <span className="font-semibold">{formation.inscrits} étudiants</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 text-sm">Prix</span>
                      <span className="text-xl font-bold text-cpu-orange">{formation.prix} FCFA</span>
                    </div>
                  </div>
                  <Button className="w-full bg-cpu-orange hover:bg-cpu-orange/90" asChild>
                    <Link href={`/catalogue?formation=${formation.id}`}>
                      Voir la formation
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Back button */}
          <div className="text-center pb-12">
            <Button variant="outline" size="lg" asChild>
              <Link href="/experts">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour à la liste des experts
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
