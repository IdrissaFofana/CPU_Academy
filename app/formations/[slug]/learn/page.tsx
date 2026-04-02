"use client";

import { useState, useEffect, use, useMemo } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { Lecon } from "@/types";
import { ChaptersSidebar } from "@/components/learn/ChaptersSidebar";
import { VideoPlayer } from "@/components/learn/VideoPlayer";
import { ContentTabs } from "@/components/learn/ContentTabs";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronLeft, ChevronRight, X, Play, BookOpen, Award, Clock, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useFormationContent, useFormations } from "@/hooks/useFormations";
import { mapApiFormationToAppFormation } from "@/lib/adapters/formation-adapter";
import { useRequireAuth } from "@/hooks/useRequireAuth";

export default function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { canAccess } = useRequireAuth();
  const { slug } = use(params);
  const router = useRouter();
  const { formations, isLoading, hasFetched } = useFormations({ limit: 200 });
  const formationsNormalized = useMemo(
    () => formations.map((item) => mapApiFormationToAppFormation(item)),
    [formations]
  );
  const formation = formationsNormalized.find((f) => f.slug === slug);
  const { chapitres } = useFormationContent(formation?.id || "", Boolean(formation?.id));
  const formationWithContent = useMemo(
    () =>
      formation
        ? {
            ...formation,
            chapitres: chapitres.length > 0 ? chapitres : formation.chapitres,
          }
        : null,
    [formation, chapitres]
  );

  if ((isLoading || !hasFetched) && !formation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (hasFetched && !formation) {
    notFound();
  }

  // State pour la progression
  const [currentLeconId, setCurrentLeconId] = useState<string>("");
  const [completedLecons, setCompletedLecons] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  if (!canAccess) {
    return null;
  }

  // Détecter si on est en mode mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Charger la progression depuis localStorage
  useEffect(() => {
    const storageKey = `formation-progress-${formationWithContent!.id}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const progress = JSON.parse(saved);
      setCurrentLeconId(progress.currentLeconId || "");
      setCompletedLecons(progress.completedLecons || []);
      setNotes(progress.notes || {});
    }

    // Si pas de leçon courante, prendre la première leçon du premier chapitre
    if (!saved && formationWithContent!.chapitres && formationWithContent!.chapitres.length > 0 && formationWithContent!.chapitres[0].lecons.length > 0) {
      setCurrentLeconId(formationWithContent!.chapitres[0].lecons[0].id);
    }

    // Charger la préférence de sidebar
    const sidebarPref = localStorage.getItem('sidebar-visible');
    if (sidebarPref !== null) {
      setSidebarVisible(sidebarPref === 'true');
    }
  }, [formationWithContent?.id, formationWithContent?.chapitres?.length]);

  // Sauvegarder la progression
  useEffect(() => {
    if (currentLeconId) {
      const storageKey = `formation-progress-${formationWithContent!.id}`;
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          currentLeconId,
          completedLecons,
          notes,
          lastAccessed: new Date().toISOString(),
        })
      );
    }
  }, [currentLeconId, completedLecons, notes, formationWithContent?.id]);

  // Toggle sidebar
  const toggleSidebar = () => {
    const newState = !sidebarVisible;
    setSidebarVisible(newState);
    localStorage.setItem('sidebar-visible', String(newState));
  };

  // Sélectionner une leçon et masquer la sidebar sur mobile
  const handleLeconSelect = (leconId: string) => {
    setCurrentLeconId(leconId);
    // Masquer la sidebar uniquement sur mobile après sélection
    if (isMobile) {
      setSidebarVisible(false);
      localStorage.setItem('sidebar-visible', 'false');
    }
  };

  // Trouver la leçon actuelle
  let currentLecon: Lecon | undefined;
  let currentChapitreIndex = 0;
  for (let i = 0; i < (formationWithContent?.chapitres?.length || 0); i++) {
    const lecon = formationWithContent?.chapitres?.[i]?.lecons.find((l) => l.id === currentLeconId);
    if (lecon) {
      currentLecon = lecon;
      currentChapitreIndex = i;
      break;
    }
  }

  // Progression globale
  const totalLecons = (formationWithContent?.chapitres?.reduce(
    (acc, chap) => acc + chap.lecons.length,
    0
  ) ?? 0);
  const progressPercentage = totalLecons > 0 
    ? Math.round((completedLecons.length / totalLecons) * 100)
    : 0;

  // Marquer comme terminé
  const handleMarkComplete = () => {
    if (currentLeconId && !completedLecons.includes(currentLeconId)) {
      setCompletedLecons([...completedLecons, currentLeconId]);
    }
  };

  // Navigation vers leçon suivante
  const handleNext = () => {
    if (!currentLecon || !formationWithContent?.chapitres) return;

    const currentChapitre = formationWithContent.chapitres[currentChapitreIndex];
    const currentLeconIndex = currentChapitre.lecons.findIndex(
      (l) => l.id === currentLeconId
    );

    // Si ce n'est pas encore marqué comme terminé, le marquer maintenant
    handleMarkComplete();

    // Leçon suivante dans le même chapitre
    if (currentLeconIndex < currentChapitre.lecons.length - 1) {
      setCurrentLeconId(currentChapitre.lecons[currentLeconIndex + 1].id);
    }
    // Premier leçon du chapitre suivant
    else if (currentChapitreIndex < (formationWithContent.chapitres?.length || 0) - 1) {
      const nextChapitre = formationWithContent.chapitres?.[currentChapitreIndex + 1];
      if (nextChapitre.lecons.length > 0) {
        setCurrentLeconId(nextChapitre.lecons[0].id);
      }
    } else {
      // Fin de la formation
      alert("🎉 Félicitations ! Vous avez terminé la formation !");
      router.push(`/formations/${formationWithContent.slug}`);
    }
  };

  // Navigation vers leçon précédente
  const handlePrevious = () => {
    if (!currentLecon || !formationWithContent?.chapitres) return;

    const currentChapitre = formationWithContent.chapitres[currentChapitreIndex];
    const currentLeconIndex = currentChapitre.lecons.findIndex(
      (l) => l.id === currentLeconId
    );

    // Leçon précédente dans le même chapitre
    if (currentLeconIndex > 0) {
      setCurrentLeconId(currentChapitre.lecons[currentLeconIndex - 1].id);
    }
    // Dernière leçon du chapitre précédent
    else if (currentChapitreIndex > 0) {
      const prevChapitre = formationWithContent.chapitres?.[currentChapitreIndex - 1];
      if (prevChapitre.lecons.length > 0) {
        setCurrentLeconId(prevChapitre.lecons[prevChapitre.lecons.length - 1].id);
      }
    }
  };

  if (!currentLecon) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-slate-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Header moderne avec glassmorphism */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200/50 px-4 sm:px-6 py-3 flex items-center justify-between shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Bouton toggle sidebar */}
          <button
            onClick={toggleSidebar}
            className="group relative text-slate-600 hover:text-cpu-orange transition-all duration-200 flex-shrink-0 p-2 hover:bg-orange-50 rounded-lg"
            title={sidebarVisible ? "Masquer le menu" : "Afficher le menu"}
          >
            {sidebarVisible ? (
              <PanelLeftClose className="w-5 h-5" />
            ) : (
              <PanelLeftOpen className="w-5 h-5" />
            )}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-cpu-orange font-medium whitespace-nowrap">
              {sidebarVisible ? "Masquer" : "Afficher"}
            </span>
          </button>
          
          <Link
            href={`/formations/${formationWithContent!.slug}`}
            className="group relative text-slate-600 hover:text-red-500 transition-all duration-200 flex-shrink-0 p-2 hover:bg-red-50 rounded-lg"
            title="Quitter le cours"
          >
            <X className="w-5 h-5" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] text-red-500 font-medium">
              Quitter
            </span>
          </Link>
          
          <div className="flex-1 min-w-0">
            <h1 className="font-bold text-slate-900 truncate text-sm sm:text-base">
              {formationWithContent!.titre}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 truncate flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-cpu-orange animate-pulse"></span>
              {currentLecon.titre}
            </p>
          </div>
        </div>

        {/* Progress et navigation */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Progress circulaire */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wide text-slate-400 font-semibold">Progression</p>
              <p className="text-sm font-bold text-cpu-orange">{progressPercentage}%</p>
            </div>
            <div className="relative w-12 h-12">
              <svg className="transform -rotate-90 w-12 h-12">
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="3"
                  fill="none"
                  className="text-slate-100"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="#fb923c"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - progressPercentage / 100)}`}
                  className="transition-all duration-500 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-cpu-orange">{progressPercentage}</span>
              </div>
            </div>
          </div>

          {/* Boutons de navigation */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrevious}
              disabled={currentChapitreIndex === 0 && 
                formationWithContent!.chapitres?.[0]?.lecons.findIndex((l) => l.id === currentLeconId) === 0}
              className="h-9 w-9 p-0 hover:bg-slate-100 disabled:opacity-30 transition-all duration-200 hover:scale-110 active:scale-95"
              title="Leçon précédente"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNext}
              className="h-9 w-9 p-0 hover:bg-cpu-orange hover:text-white transition-all duration-200 hover:scale-110 active:scale-95"
              title="Leçon suivante"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Chapitres */}
        <ChaptersSidebar
          chapitres={formationWithContent!.chapitres || []}
          currentLeconId={currentLeconId}
          completedLecons={completedLecons}
          onLeconSelect={handleLeconSelect}
          isVisible={sidebarVisible}
        />

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Video Player or Content */}
          <div className="bg-slate-900">
            {currentLecon.type === "video" && <VideoPlayer lecon={currentLecon} />}
            {currentLecon.type === "texte" && (
              <div className="aspect-video flex items-center justify-center text-white">
                <div className="text-center p-8">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-lg">Contenu textuel</p>
                </div>
              </div>
            )}
            {currentLecon.type === "quiz" && (
              <div className="aspect-video flex items-center justify-center bg-cpu-orange text-white">
                <div className="text-center p-8">
                  <svg
                    className="w-16 h-16 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <p className="text-2xl font-bold mb-2">Quiz de validation</p>
                  <p className="text-white/80 mb-6">Testez vos connaissances !</p>
                  <Link
                    href={`/formations/${formationWithContent!.slug}/quiz/${currentLecon.quiz?.id}`}
                  >
                    <Button className="bg-white text-cpu-orange hover:bg-slate-100">
                      Commencer le quiz
                    </Button>
                  </Link>
                </div>
              </div>
            )}
            {currentLecon.type === "ressources" && (
              <div className="aspect-video flex items-center justify-center bg-slate-900 text-white">
                <div className="text-center p-8 max-w-2xl">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-orange-300" />
                  <p className="text-2xl font-bold mb-2">Document de cours</p>
                  <p className="text-white/80 mb-6">{currentLecon.titre}</p>
                  {currentLecon.ressources?.[0]?.url && (
                    <a
                      href={currentLecon.ressources[0].url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button className="bg-white text-cpu-orange hover:bg-slate-100">
                        Ouvrir le document
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Tabs & Actions */}
          <ContentTabs
            lecon={currentLecon}
            notes={notes[currentLeconId] || ""}
            onNotesChange={(newNotes) =>
              setNotes({ ...notes, [currentLeconId]: newNotes })
            }
          />

          {/* Action Buttons */}
          <div className="bg-white border-t border-slate-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 shadow-lg">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentChapitreIndex === 0 && 
                formationWithContent!.chapitres?.[0]?.lecons.findIndex((l) => l.id === currentLeconId) === 0}
              className="group border-2 hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Précédent</span>
            </Button>

            <Button
              onClick={handleMarkComplete}
              disabled={completedLecons.includes(currentLeconId)}
              className={`group font-semibold transition-all duration-300 ${
                completedLecons.includes(currentLeconId)
                  ? "bg-green-500 text-white cursor-default shadow-lg shadow-green-200"
                  : "bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-300 hover:shadow-xl hover:shadow-green-400 hover:scale-105 active:scale-95"
              }`}
            >
              {completedLecons.includes(currentLeconId) ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  <span>Terminé</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                  <span>Marquer comme terminé</span>
                </>
              )}
            </Button>

            <Button
              className="group bg-cpu-orange hover:bg-orange-600 text-white font-semibold shadow-lg shadow-orange-300 hover:shadow-xl hover:shadow-orange-400 transition-all duration-300 hover:scale-105 active:scale-95"
              onClick={handleNext}
            >
              <span>Suivant</span>
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
