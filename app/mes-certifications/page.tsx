"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Download,
  Share2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Linkedin,
  Mail,
  Trophy,
  Star,
  Shield,
} from "lucide-react";

export default function MesCertificationsPage() {
  const [certifications] = useState([
    {
      id: 1,
      titre: "Expert en Marketing Digital",
      formation: "Marketing Digital Avancé",
      dateObtention: "08 Jan 2026",
      numeroSerie: "CPU-MD-2026-001234",
      validite: "Permanent",
      formateur: "Mme Adjoua Koffi",
      note: 92,
      competences: ["SEO/SEM", "Social Media", "Analytics", "Content Marketing"],
      niveau: "Avancé",
      heures: 20,
      color: "from-blue-500 to-blue-600",
    },
    {
      id: 2,
      titre: "Comptable certifié SYSCOHADA",
      formation: "Comptabilité et Fiscalité SYSCOHADA",
      dateObtention: "15 Dec 2025",
      numeroSerie: "CPU-CF-2025-005678",
      validite: "3 ans",
      dateExpiration: "15 Dec 2028",
      formateur: "M. Diabaté Ibrahim",
      note: 95,
      competences: ["Comptabilité générale", "Fiscalité", "États financiers", "SYSCOHADA"],
      niveau: "Expert",
      heures: 25,
      color: "from-green-500 to-green-600",
    },
    {
      id: 3,
      titre: "Spécialiste E-commerce",
      formation: "E-commerce et Marketplace",
      dateObtention: "20 Nov 2025",
      numeroSerie: "CPU-EC-2025-009012",
      validite: "Permanent",
      formateur: "Mme Adjoua Koffi",
      note: 88,
      competences: ["Vente en ligne", "Marketplace", "Logistique", "Paiement digital"],
      niveau: "Intermédiaire",
      heures: 12,
      color: "from-purple-500 to-purple-600",
    },
  ]);

  const [badges] = useState([
    {
      id: 1,
      titre: "Apprenant assidu",
      description: "10 jours consécutifs d'apprentissage",
      icon: Trophy,
      color: "from-yellow-400 to-yellow-500",
      dateObtention: "05 Feb 2026",
    },
    {
      id: 2,
      titre: "Expert certifié",
      description: "Obtention de 3 certifications niveau expert",
      icon: Star,
      color: "from-cpu-orange to-orange-600",
      dateObtention: "08 Jan 2026",
    },
    {
      id: 3,
      titre: "100% de réussite",
      description: "Toutes les formations complétées avec succès",
      icon: CheckCircle2,
      color: "from-green-500 to-green-600",
      dateObtention: "15 Dec 2025",
    },
  ]);

  const handleDownload = (certId: number) => {
    console.log("Téléchargement du certificat:", certId);
    // Logique de téléchargement
  };

  const handleShare = (certId: number, platform: string) => {
    console.log("Partage sur", platform, "du certificat:", certId);
    // Logique de partage
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <Award className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2">Mes Certifications</h1>
              <p className="text-slate-300 text-lg">
                Vos réussites et certifications officielles CPU Academy
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-500/20 p-3 rounded-lg">
                  <Award className="w-6 h-6 text-yellow-300" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{certifications.length}</div>
                  <div className="text-sm text-slate-300">Certifications</div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <Trophy className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{badges.length}</div>
                  <div className="text-sm text-slate-300">Badges</div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <Star className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    {Math.round(certifications.reduce((acc, c) => acc + c.note, 0) / certifications.length)}%
                  </div>
                  <div className="text-sm text-slate-300">Note moyenne</div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    {certifications.reduce((acc, c) => acc + c.heures, 0)}h
                  </div>
                  <div className="text-sm text-slate-300">Heures certifiées</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 lg:px-16 py-12">
        {/* Certifications */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-cpu-orange to-orange-600 p-2 rounded-lg">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Certifications officielles</h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <Card
                key={cert.id}
                className="relative overflow-hidden border-2 border-slate-100 hover:border-cpu-orange hover:shadow-2xl transition-all duration-500 group animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient Header */}
                <div className={`h-2 bg-gradient-to-r ${cert.color}`}></div>

                <div className="p-8">
                  {/* Header avec badge niveau */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <Badge className={`bg-gradient-to-r ${cert.color} text-white border-0 mb-3`}>
                        {cert.niveau}
                      </Badge>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-cpu-orange transition-colors">
                        {cert.titre}
                      </h3>
                      <p className="text-slate-600 text-sm">{cert.formation}</p>
                    </div>
                    <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 p-4 rounded-full">
                      <Award className="w-10 h-10 text-yellow-600" />
                    </div>
                  </div>

                  {/* Informations */}
                  <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Date d'obtention</span>
                        <p className="font-semibold text-slate-900 flex items-center gap-2 mt-1">
                          <Calendar className="w-4 h-4 text-cpu-orange" />
                          {cert.dateObtention}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500">Validité</span>
                        <p className="font-semibold text-slate-900 flex items-center gap-2 mt-1">
                          <Shield className="w-4 h-4 text-green-500" />
                          {cert.validite}
                          {cert.dateExpiration && <span className="text-xs text-slate-500">({cert.dateExpiration})</span>}
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500">Note finale</span>
                        <p className="font-semibold text-slate-900 flex items-center gap-2 mt-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          {cert.note}%
                        </p>
                      </div>
                      <div>
                        <span className="text-slate-500">Volume horaire</span>
                        <p className="font-semibold text-slate-900 mt-1">{cert.heures}h</p>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <span className="text-slate-500 text-sm">Numéro de série</span>
                      <p className="font-mono text-sm font-semibold text-slate-900 mt-1">{cert.numeroSerie}</p>
                    </div>

                    {/* Compétences */}
                    <div className="pt-4 border-t border-slate-100">
                      <span className="text-slate-500 text-sm mb-3 block">Compétences certifiées</span>
                      <div className="flex flex-wrap gap-2">
                        {cert.competences.map((comp, idx) => (
                          <Badge key={idx} className="bg-slate-100 text-slate-700 border-0">
                            {comp}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                    <Button
                      onClick={() => handleDownload(cert.id)}
                      className="flex-1 bg-cpu-orange hover:bg-orange-600 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Télécharger PDF
                    </Button>
                    <Button
                      onClick={() => handleShare(cert.id, "linkedin")}
                      variant="outline"
                      className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-500"
                    >
                      <Linkedin className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => handleShare(cert.id, "email")}
                      variant="outline"
                      className="hover:bg-slate-100"
                    >
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" className="hover:bg-slate-100">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Formateur */}
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <p className="text-sm text-slate-600">
                      Délivré par <span className="font-semibold text-slate-900">{cert.formateur}</span>
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Mes badges</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {badges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <Card
                  key={badge.id}
                  className="p-8 text-center border-2 border-slate-100 hover:border-purple-500 hover:shadow-xl transition-all duration-300 group animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`inline-flex p-6 rounded-full bg-gradient-to-br ${badge.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{badge.titre}</h3>
                  <p className="text-slate-600 mb-4">{badge.description}</p>
                  <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    Obtenu le {badge.dateObtention}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Partage LinkedIn */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/10 p-4 rounded-full">
              <Linkedin className="w-10 h-10" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2">Partagez vos réussites sur LinkedIn</h3>
              <p className="text-blue-100">
                Valorisez vos compétences et certifications auprès de votre réseau professionnel
              </p>
            </div>
            <Button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8">
              <Linkedin className="w-5 h-5 mr-2" />
              Partager sur LinkedIn
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
