"use client";

import { useEffect, useState, use } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { formationsMock } from "@/data/mock";
import { Quiz } from "@/types";
import { Button } from "@/components/ui/button";

interface QuizResult {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  answers: Record<string, string>;
  passed: boolean;
  completedAt: string;
}

export default function QuizResultsPage({
  params,
}: {
  params: Promise<{ slug: string; quizId: string }>;
}) {
  const { slug, quizId } = use(params);
  const router = useRouter();
  const formation = formationsMock.find((f) => f.slug === slug);
  const [result, setResult] = useState<QuizResult | null>(null);
  const [showCorrections, setShowCorrections] = useState(false);

  if (!formation) {
    notFound();
  }

  // Trouver le quiz
  let quiz: Quiz | undefined;
  let chapitreIndex = 0;

  if (formation.chapitres) {
    for (let i = 0; i < formation.chapitres.length; i++) {
      for (const lecon of formation.chapitres[i].lecons) {
        if (lecon.quiz && lecon.quiz.id === quizId) {
          quiz = lecon.quiz;
          chapitreIndex = i;
          break;
        }
      }
      if (quiz) break;
    }
  }

  if (!quiz) {
    notFound();
  }

  // Charger les résultats
  useEffect(() => {
    const resultKey = `quiz-result-${quizId}`;
    const saved = localStorage.getItem(resultKey);
    if (saved) {
      setResult(JSON.parse(saved));
    } else {
      // Pas de résultats trouvés, rediriger vers le quiz
      router.push(`/formations/${slug}/quiz/${quizId}`);
    }
  }, [quizId, slug, router]);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-slate-600">Chargement des résultats...</p>
        </div>
      </div>
    );
  }

  const handleContinue = () => {
    // Si réussi, marquer le quiz comme terminé et retourner au cours
    if (result.passed) {
      const storageKey = `formation-progress-${formation.id}`;
      const saved = localStorage.getItem(storageKey);
      if (saved && formation.chapitres && formation.chapitres[chapitreIndex]) {
        const progress = JSON.parse(saved);
        // Trouver la leçon quiz et la marquer comme complétée
        const quizLeconId = formation.chapitres[chapitreIndex].lecons.find(
          (l) => l.quiz?.id === quizId
        )?.id;
        if (quizLeconId && !progress.completedLecons?.includes(quizLeconId)) {
          progress.completedLecons = [...(progress.completedLecons || []), quizLeconId];
          localStorage.setItem(storageKey, JSON.stringify(progress));
        }
      }
      router.push(`/formations/${slug}/learn`);
    } else {
      // Si échoué, proposer de recommencer
      router.push(`/formations/${slug}/quiz/${quizId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Results Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div
            className={`p-8 text-center ${
              result.passed
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : "bg-gradient-to-r from-red-500 to-red-600"
            } text-white`}
          >
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              {result.passed ? (
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-10 h-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {result.passed ? "🎉 Félicitations !" : "☹️ Quiz non validé"}
            </h1>
            <p className="text-white/90">
              {result.passed
                ? "Vous avez réussi le quiz avec succès !"
                : "Vous n'avez pas atteint le score minimum requis."}
            </p>
          </div>

          {/* Stats */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-slate-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  {result.score}%
                </div>
                <div className="text-sm text-slate-600">Score obtenu</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  {result.correctAnswers}/{result.totalQuestions}
                </div>
                <div className="text-sm text-slate-600">Réponses correctes</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-6 text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">
                  {quiz.noteMinimale}%
                </div>
                <div className="text-sm text-slate-600">Note minimale</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Progression</span>
                <span className="text-sm font-medium text-slate-900">{result.score}%</span>
              </div>
              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    result.passed ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>

            {/* Corrections Toggle */}
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setShowCorrections(!showCorrections)}
                className="w-full"
              >
                {showCorrections ? "Masquer" : "Voir"} les corrections
                <svg
                  className={`w-4 h-4 ml-2 transition-transform ${
                    showCorrections ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </Button>
            </div>

            {/* Corrections */}
            {showCorrections && (
              <div className="space-y-4 mb-8">
                {quiz.questions.map((question, index) => {
                  const userAnswer = result.answers[question.id];
                  const isCorrect = userAnswer === question.reponseCorrecte;

                  return (
                    <div
                      key={question.id}
                      className={`p-4 rounded-lg border-2 ${
                        isCorrect
                          ? "border-green-200 bg-green-50"
                          : "border-red-200 bg-red-50"
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div
                          className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                            isCorrect ? "bg-green-500" : "bg-red-500"
                          } text-white`}
                        >
                          {isCorrect ? (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 mb-2">
                            Question {index + 1}: {question.question}
                          </p>
                          {!isCorrect && (
                            <div className="space-y-2">
                              <p className="text-sm text-red-700">
                                <span className="font-medium">Votre réponse :</span> {userAnswer}
                              </p>
                              <p className="text-sm text-green-700">
                                <span className="font-medium">Bonne réponse :</span> {question.reponseCorrecte as string}
                              </p>
                            </div>
                          )}
                          {question.explication && (
                            <div className="mt-2 p-3 bg-white/50 rounded text-sm text-slate-700">
                              <span className="font-medium">Explication : </span>
                              {question.explication}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <Link href={`/formations/${slug}/learn`} className="flex-1">
                <Button variant="outline" className="w-full">
                  Retour au cours
                </Button>
              </Link>
              {result.passed ? (
                <Button
                  onClick={handleContinue}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  Continuer la formation
                </Button>
              ) : (
                <Button
                  onClick={handleContinue}
                  className="flex-1 bg-cpu-orange hover:bg-cpu-orange/90 text-white"
                >
                  Recommencer le quiz
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Info Box */}
        {!result.passed && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <svg
                className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-sm text-blue-800">
                <p className="font-medium mb-1">Conseils pour réussir :</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>Revoyez les leçons du chapitre</li>
                  <li>Relisez les explications des corrections</li>
                  <li>Prenez votre temps lors de la prochaine tentative</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
