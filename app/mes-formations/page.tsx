"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Clock,
  Play,
  CheckCircle2,
  Star,
  Calendar,
  Filter,
  Search,
  Download,
  Award,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { formationsMock } from "@/data/mock";

interface FormationProgress {
  id: string;
  titre: string;
  slug: string;
  categorie: string;
  duree: string;
  formateur: string;
  note: number;
  progression: number;
  totalLecons: number;
  completedLecons: number;
  currentLeconId: string | null;
  prochainChapitre: string | null;
  prochainLecon: string | null;
  quizPassed: number;
  quizTotal: number;
  tempsEstime: string;
  dateInscription: string;
  status: "en-cours" | "completee";
  examPassed?: boolean;
  certificatObtenu?: boolean;
}

export default function MesFormationsPage() {
  const [activeTab, setActiveTab] = useState<"en-cours" | "completees" | "toutes">("en-cours");
  const [searchTerm, setSearchTerm] = useState("");
  const [formations, setFormations] = useState<FormationProgress[]>([]);

  useEffect(() => {
    // Charger les formations depuis localStorage
    const loadedFormations: FormationProgress[] = [];

    // Pour la démo, on ajoute la formation mockée si elle a une progression
    formationsMock.forEach((formation) => {
      const storageKey = `formation-progress-${formation.id}`;
      const saved = localStorage.getItem(storageKey);

      if (saved && formation.chapitres) {
        const progress = JSON.parse(saved);
        const totalLecons = formation.chapitres.reduce(
          (acc, chap) => acc + chap.lecons.length,
          0
        );
        const completedLecons = progress.completedLecons?.length || 0;
        const progressionPercent = Math.round(
          (completedLecons / totalLecons) * 100
        );

        // Trouver la prochaine leçon
        let prochainChapitre = null;
        let prochainLecon = null;

        for (const chapitre of formation.chapitres || []) {
          for (const lecon of chapitre.lecons) {
            if (!progress.completedLecons?.includes(lecon.id)) {
              prochainChapitre = chapitre.titre;
              prochainLecon = lecon.titre;
              break;
            }
          }
          if (prochainLecon) break;
        }

        // Compter les quiz réussis
        let quizPassed = 0;
        let quizTotal = 0;
        formation.chapitres?.forEach((chapitre) => {
          chapitre.lecons.forEach((lecon) => {
            if (lecon.quiz) {
              quizTotal++;
              const quizResultKey = `quiz-result-${lecon.quiz.id}`;
              const quizResult = localStorage.getItem(quizResultKey);
              if (quizResult && JSON.parse(quizResult).passed) {
                quizPassed++;
              }
            }
          });
        });

        // Calculer temps estimé (durée moyenne par leçon : 30 min)
        const tempsRestantMin = (totalLecons - completedLecons) * 30;
        const heuresRestantes = Math.floor(tempsRestantMin / 60);
        const minutesRestantes = tempsRestantMin % 60;
        const tempsEstime =
          heuresRestantes > 0
            ? `${heuresRestantes}h${minutesRestantes > 0 ? minutesRestantes : ""}`
            : `${minutesRestantes}min`;

        // Vérifier si l'examen est réussi
        const examResultKey = `examen-final-${formation.id}`;
        const examResult = localStorage.getItem(examResultKey);
        const examPassed = examResult ? JSON.parse(examResult).passed : false;

        // Vérifier si le certificat existe
        const certificatesKey = "my-certificates";
        const certs = localStorage.getItem(certificatesKey);
        const hasCertificate = certs
          ? JSON.parse(certs).some((c: any) => c.formationId === formation.id)
          : false;

        const status =
          progressionPercent === 100 && examPassed ? "completee" : "en-cours";

        loadedFormations.push({
          id: formation.id,
          titre: formation.titre,
          slug: formation.slug,
          categorie: formation.secteur || "Général",
          duree: `${formation.duree}h`,
          formateur: formation.expert
            ? `${formation.expert.prenom} ${formation.expert.nom}`
            : "Expert CPU",
          note: formation.expert?.notemoyenne || 4.8,
          progression: progressionPercent,
          totalLecons,
          completedLecons,
          currentLeconId: progress.currentLeconId,
          prochainChapitre,
          prochainLecon,
          quizPassed,
          quizTotal,
          tempsEstime,
          dateInscription: "15 Jan 2026", // Mock
          status,
          examPassed,
          certificatObtenu: hasCertificate,
        });
      }
    });

    setFormations(loadedFormations);
  }, []);

  const getFilteredFormations = () => {
    let filtered = formations;

    if (activeTab === "en-cours") {
      filtered = formations.filter((f) => f.status === "en-cours");
    } else if (activeTab === "completees") {
      filtered = formations.filter((f) => f.status === "completee");
    }

    if (searchTerm) {
      filtered = filtered.filter((f) =>
        f.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.categorie.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredFormations = getFilteredFormations();

  const stats = {
    enCours: formations.filter((f) => f.status === "en-cours").length,
    completees: formations.filter((f) => f.status === "completee").length,
    heuresTotal: formations.reduce((acc, f) => acc + parseInt(f.duree), 0),
    moyenneProgression: Math.round(
      formations.filter((f) => f.status === "en-cours").reduce((acc, f) => acc + f.progression, 0) /
        formations.filter((f) => f.status === "en-cours").length
    ),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <BookOpen className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-5xl font-bold mb-2">Mes Formations</h1>
              <p className="text-slate-300 text-lg">
                Suivez votre progression et reprenez là où vous vous êtes arrêté
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-6 mt-8">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-500/20 p-3 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-300" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{stats.enCours}</div>
                  <div className="text-sm text-slate-300">En cours</div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-500/20 p-3 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-green-300" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{stats.completees}</div>
                  <div className="text-sm text-slate-300">Complétées</div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-orange-500/20 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-300" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{stats.heuresTotal}h</div>
                  <div className="text-sm text-slate-300">Total heures</div>
                </div>
              </div>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-500/20 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-300" />
                </div>
                <div>
                  <div className="text-3xl font-bold">{stats.moyenneProgression}%</div>
                  <div className="text-sm text-slate-300">Progression moy.</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 lg:px-16 py-12">
        {/* Filtres et recherche */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          {/* Recherche */}
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher une formation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cpu-orange focus:outline-none bg-white shadow-sm"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl">
            <Button
              onClick={() => setActiveTab("en-cours")}
              variant="ghost"
              className={`rounded-lg transition-all duration-200 ${
                activeTab === "en-cours"
                  ? "bg-cpu-orange text-white shadow-md"
                  : "hover:bg-white text-slate-700"
              }`}
              size="sm"
            >
              En cours ({stats.enCours})
            </Button>
            <Button
              onClick={() => setActiveTab("completees")}
              variant="ghost"
              className={`rounded-lg transition-all duration-200 ${
                activeTab === "completees"
                  ? "bg-cpu-orange text-white shadow-md"
                  : "hover:bg-white text-slate-700"
              }`}
              size="sm"
            >
              Complétées ({stats.completees})
            </Button>
            <Button
              onClick={() => setActiveTab("toutes")}
              variant="ghost"
              className={`rounded-lg transition-all duration-200 ${
                activeTab === "toutes"
                  ? "bg-cpu-orange text-white shadow-md"
                  : "hover:bg-white text-slate-700"
              }`}
              size="sm"
            >
              Toutes ({formations.length})
            </Button>
          </div>
        </div>

        {/* Liste des formations */}
        {formations.length === 0 ? (
          <Card className="p-12 text-center border-2 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Aucune formation en cours
            </h3>
            <p className="text-slate-600 mb-6">
              Commencez une formation pour voir votre progression ici.
            </p>
            <Link href="/catalogue">
              <Button className="bg-cpu-orange hover:bg-cpu-orange/90 text-white">
                Explorer le catalogue
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredFormations.map((formation, index) => (
              <Card
                key={formation.id}
                className="p-6 border-2 border-slate-100 hover:border-cpu-orange hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="relative w-full lg:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-cpu-orange/10 to-blue-500/10">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-cpu-orange" />
                    </div>
                    {formation.status === "completee" && (
                      <div className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-full">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    )}
                  </div>

                  {/* Contenu */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-slate-100 text-slate-700 border-0">
                              {formation.categorie}
                            </Badge>
                            {formation.status === "completee" && formation.certificatObtenu && (
                              <Badge className="bg-green-100 text-green-700 border-0">
                                <Award className="w-3 h-3 mr-1" />
                                Certifié
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 group-hover:text-cpu-orange transition-colors">
                            {formation.titre}
                          </h3>
                        </div>
                        {formation.status === "completee" && formation.certificatObtenu && (
                          <Link href={`/formations/${formation.slug}/certificat`}>
                            <Button variant="outline" size="sm" className="hover:bg-cpu-orange hover:text-white">
                              <Award className="w-4 h-4 mr-2" />
                              Voir certificat
                            </Button>
                          </Link>
                        )}
                      </div>
                      <p className="text-slate-600 flex items-center gap-2">
                        <span>Par {formation.formateur}</span>
                        <span className="text-slate-400">•</span>
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {formation.note}
                        </span>
                      </p>
                    </div>

                    {/* Stats détaillées */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">
                          {formation.status === "en-cours" 
                            ? `${formation.tempsEstime} restantes`
                            : formation.duree}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">
                          {formation.completedLecons}/{formation.totalLecons} leçons
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">
                          {formation.quizPassed}/{formation.quizTotal} quiz
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">Inscrit le {formation.dateInscription}</span>
                      </div>
                    </div>

                    {/* Progression et prochain module */}
                    {formation.status === "en-cours" && (
                      <>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-600">Progression</span>
                            <span className="text-sm font-bold text-cpu-orange">{formation.progression}%</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-cpu-orange to-orange-600 h-full rounded-full transition-all duration-500"
                            />
                          </div>
                        </div>
                        
                        {formation.prochainChapitre && formation.prochainLecon && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-900">
                              <span className="font-semibold">Prochain chapitre:</span>{" "}
                              {formation.prochainChapitre}
                            </p>
                            <p className="text-sm text-blue-700 mt-1">
                              📚 {formation.prochainLecon}
                            </p>
                          </div>
                        )}
                      </>
                    )}

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      {formation.status === "en-cours" ? (
                        <>
                          <Link href={`/formations/${formation.slug}/learn`}>
                            <Button className="bg-cpu-orange hover:bg-cpu-orange/90 text-white">
                              <Play className="w-4 h-4 mr-2" />
                              Reprendre la formation
                            </Button>
                          </Link>
                          {formation.progression === 100 && formation.quizPassed === formation.quizTotal && (
                            <Link href={`/formations/${formation.slug}/examen-final`}>
                              <Button className="bg-green-600 hover:bg-green-700 text-white">
                                <Award className="w-4 h-4 mr-2" />
                                Passer l'examen final
                              </Button>
                            </Link>
                          )}
                        </>
                      ) : (
                        <>
                          {formation.certificatObtenu && (
                            <Link href={`/formations/${formation.slug}/certificat`}>
                              <Button className="bg-green-600 hover:bg-green-700 text-white">
                                <Award className="w-4 h-4 mr-2" />
                                Voir le certificat
                              </Button>
                            </Link>
                          )}
                          <Link href={`/formations/${formation.slug}/learn`}>
                            <Button variant="outline" className="hover:bg-slate-100">
                              <BarChart3 className="w-4 h-4 mr-2" />
                              Revoir le contenu
                            </Button>
                          </Link>
                        </>
                      )}
                      <Link href={`/formations/${formation.slug}`}>
                        <Button variant="outline" className="hover:bg-slate-100">
                          Voir les détails
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {filteredFormations.length === 0 && formations.length > 0 && (
          <Card className="p-16 text-center border-2 border-slate-100">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Aucune formation trouvée</h3>
            <p className="text-slate-600 mb-6">
              {searchTerm
                ? "Essayez avec d'autres mots-clés"
                : "Commencez votre apprentissage dès maintenant"}
            </p>
            <Button className="bg-cpu-orange hover:bg-cpu-orange/90 text-white" asChild>
              <Link href="/catalogue">
                <BookOpen className="w-4 h-4 mr-2" />
                Explorer le catalogue
              </Link>
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
