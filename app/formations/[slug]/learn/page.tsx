"use client";

import { useState, useEffect, use } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { formationsMock } from "@/data/mock";
import { Lecon } from "@/types";
import { ChaptersSidebar } from "@/components/learn/ChaptersSidebar";
import { VideoPlayer } from "@/components/learn/VideoPlayer";
import { ContentTabs } from "@/components/learn/ContentTabs";
import { Button } from "@/components/ui/button";

export default function LearnPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const formation = formationsMock.find((f) => f.slug === slug);

  if (!formation) {
    notFound();
  }

  // State pour la progression
  const [currentLeconId, setCurrentLeconId] = useState<string>("");
  const [completedLecons, setCompletedLecons] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});

  // Charger la progression depuis localStorage
  useEffect(() => {
    const storageKey = `formation-progress-${formation.id}`;
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const progress = JSON.parse(saved);
      setCurrentLeconId(progress.currentLeconId || "");
      setCompletedLecons(progress.completedLecons || []);
      setNotes(progress.notes || {});
    }

    // Si pas de leçon courante, prendre la première leçon du premier chapitre
    if (!saved && formation.chapitres && formation.chapitres.length > 0 && formation.chapitres[0].lecons.length > 0) {
      setCurrentLeconId(formation.chapitres[0].lecons[0].id);
    }
  }, [formation.id, formation.chapitres?.length]);

  // Sauvegarder la progression
  useEffect(() => {
    if (currentLeconId) {
      const storageKey = `formation-progress-${formation.id}`;
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
  }, [currentLeconId, completedLecons, notes, formation.id]);

  // Trouver la leçon actuelle
  let currentLecon: Lecon | undefined;
  let currentChapitreIndex = 0;
  for (let i = 0; i < (formation.chapitres?.length || 0); i++) {
    const lecon = formation.chapitres?.[i]?.lecons.find((l) => l.id === currentLeconId);
    if (lecon) {
      currentLecon = lecon;
      currentChapitreIndex = i;
      break;
    }
  }

  // Progression globale
  const totalLecons = (formation.chapitres?.reduce(
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
    if (!currentLecon || !formation.chapitres) return;

    const currentChapitre = formation.chapitres[currentChapitreIndex];
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
    else if (currentChapitreIndex < (formation.chapitres?.length || 0) - 1) {
      const nextChapitre = formation.chapitres?.[currentChapitreIndex + 1];
      if (nextChapitre.lecons.length > 0) {
        setCurrentLeconId(nextChapitre.lecons[0].id);
      }
    } else {
      // Fin de la formation
      alert("🎉 Félicitations ! Vous avez terminé la formation !");
      router.push(`/formations/${formation.slug}`);
    }
  };

  // Navigation vers leçon précédente
  const handlePrevious = () => {
    if (!currentLecon || !formation.chapitres) return;

    const currentChapitre = formation.chapitres[currentChapitreIndex];
    const currentLeconIndex = currentChapitre.lecons.findIndex(
      (l) => l.id === currentLeconId
    );

    // Leçon précédente dans le même chapitre
    if (currentLeconIndex > 0) {
      setCurrentLeconId(currentChapitre.lecons[currentLeconIndex - 1].id);
    }
    // Dernière leçon du chapitre précédent
    else if (currentChapitreIndex > 0) {
      const prevChapitre = formation.chapitres?.[currentChapitreIndex - 1];
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
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <Link
            href={`/formations/${formation.slug}`}
            className="text-cpu-orange hover:text-cpu-orange/80"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
          <div className="flex-1">
            <h1 className="font-semibold text-slate-900 truncate">
              {formation.titre}
            </h1>
            <p className="text-sm text-slate-600">{currentLecon.titre}</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-900">
              Progression: {progressPercentage}%
            </p>
            <div className="w-32 h-2 bg-slate-200 rounded-full mt-1">
              <div
                className="h-full bg-cpu-orange rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentChapitreIndex === 0 && 
                formation.chapitres?.[0]?.lecons.findIndex((l) => l.id === currentLeconId) === 0}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Chapitres */}
        <ChaptersSidebar
          chapitres={formation.chapitres || []}
          currentLeconId={currentLeconId}
          completedLecons={completedLecons}
          onLeconSelect={setCurrentLeconId}
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
              <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-cpu-orange to-orange-600 text-white">
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
                    href={`/formations/${formation.slug}/quiz/${currentLecon.quiz?.id}`}
                  >
                    <Button className="bg-white text-cpu-orange hover:bg-slate-100">
                      Commencer le quiz
                    </Button>
                  </Link>
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
          <div className="bg-white border-t border-slate-200 px-6 py-4 flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentChapitreIndex === 0 && 
                formation.chapitres?.[0]?.lecons.findIndex((l) => l.id === currentLeconId) === 0}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Précédent
            </Button>

            <Button
              variant={completedLecons.includes(currentLeconId) ? "outline" : "default"}
              onClick={handleMarkComplete}
              disabled={completedLecons.includes(currentLeconId)}
              className={completedLecons.includes(currentLeconId) ? "" : "bg-green-600 hover:bg-green-700 text-white"}
            >
              {completedLecons.includes(currentLeconId) ? (
                <>
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Terminé
                </>
              ) : (
                <>Marquer comme terminé</>
              )}
            </Button>

            <Button
              className="bg-cpu-orange hover:bg-cpu-orange/90 text-white"
              onClick={handleNext}
            >
              Suivant
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
