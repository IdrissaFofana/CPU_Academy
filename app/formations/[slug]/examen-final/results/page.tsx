"use client";

import { useEffect, useState, use } from "react";
import { useRouter, notFound } from "next/navigation";
import Link from "next/link";
import { formationsMock } from "@/data/mock";
import { Button } from "@/components/ui/button";

export default function ExamenFinalResultsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const formation = formationsMock.find((f) => f.slug === slug);

  if (!formation) {
    notFound();
  }

  const [result, setResult] = useState<any>(null);
  const [showCorrections, setShowCorrections] = useState(false);

  useEffect(() => {
    const resultKey = `examen-final-${formation.id}`;
    const saved = localStorage.getItem(resultKey);
    
    if (saved) {
      const parsedResult = JSON.parse(saved);
      setResult(parsedResult);
      
      // Si réussi, rediriger vers le certificat
      if (parsedResult.passed) {
        router.push(`/formations/${slug}/certificat`);
      }
    }
  }, [formation.id, slug, router]);

  if (!result) {
    return <div>Chargement...</div>;
  }

  // Collecter toutes les questions
  const allQuestions: any[] = [];
  formation.chapitres?.forEach((chapitre) => {
    chapitre.lecons.forEach((lecon) => {
      if (lecon.quiz) {
        allQuestions.push(...lecon.quiz.questions);
      }
    });
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${
              result.passed
                ? "bg-gradient-to-br from-green-500 to-green-600"
                : "bg-gradient-to-br from-red-500 to-red-600"
            }`}
          >
            {result.passed ? (
              <svg
                className="w-12 h-12 text-white"
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
                className="w-12 h-12 text-white"
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
            )}
          </div>

          <h1
            className={`text-4xl font-bold mb-3 ${
              result.passed ? "text-green-600" : "text-red-600"
            }`}
          >
            {result.passed ? "Félicitations !" : "Examen non réussi"}
          </h1>

          <p className="text-xl text-slate-600 mb-8">
            {result.passed
              ? "Vous avez validé la formation avec succès !"
              : "Vous devez obtenir au moins 75% pour valider"}
          </p>

          {/* Score Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-center gap-12 mb-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-slate-900 mb-2">
                  {result.score}%
                </div>
                <div className="text-sm text-slate-600">Score final</div>
              </div>

              <div className="h-16 w-px bg-slate-200" />

              <div className="text-center">
                <div className="text-5xl font-bold text-slate-900 mb-2">
                  {result.correctAnswers}/{result.totalQuestions}
                </div>
                <div className="text-sm text-slate-600">Bonnes réponses</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative h-4 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 transition-all duration-1000 ${
                  result.passed
                    ? "bg-gradient-to-r from-green-500 to-green-600"
                    : "bg-gradient-to-r from-red-500 to-red-600"
                }`}
                style={{ width: `${result.score}%` }}
              />
              {/* Ligne de passage à 75% */}
              <div
                className="absolute inset-y-0 w-px bg-slate-400"
                style={{ left: "75%" }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-slate-600 whitespace-nowrap">
                  75% requis
                </div>
              </div>
            </div>
          </div>

          {!result.passed && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 text-left">
              <div className="flex gap-3">
                <svg
                  className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <p className="font-semibold text-red-900 mb-2">
                    Pourquoi votre examen n'est pas validé ?
                  </p>
                  <p className="text-sm text-red-800 mb-2">
                    Pour obtenir votre certificat, vous devez obtenir un score
                    d'au moins 75%. Votre score actuel est de {result.score}%.
                  </p>
                  <p className="text-sm text-red-800">
                    <strong>Attention :</strong> L'examen final ne peut être
                    passé qu'une seule fois. Vous devrez réviser la formation et
                    repasser tous les quiz pour débloquer une nouvelle tentative.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Afficher les corrections */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <Button
            variant="outline"
            onClick={() => setShowCorrections(!showCorrections)}
            className="w-full mb-6"
          >
            {showCorrections ? "Masquer" : "Afficher"} les corrections
            <svg
              className={`w-5 h-5 ml-2 transition-transform ${
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

          {showCorrections && (
            <div className="space-y-6">
              {allQuestions.map((question, index) => {
                const userAnswer = result.answers[question.id];
                const isCorrect = userAnswer === question.reponseCorrecte;

                return (
                  <div
                    key={question.id}
                    className={`border-2 rounded-lg p-6 ${
                      isCorrect
                        ? "border-green-200 bg-green-50"
                        : "border-red-200 bg-red-50"
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          isCorrect
                            ? "bg-green-600 text-white"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900 mb-4">
                          {question.question}
                        </p>

                        <div className="space-y-3 mb-4">
                          {question.options?.map((option: string, i: number) => {
                            const isUserAnswer = userAnswer === option;
                            const isCorrectAnswer =
                              question.reponseCorrecte === option;

                            return (
                              <div
                                key={i}
                                className={`p-3 rounded-lg border-2 ${
                                  isCorrectAnswer
                                    ? "border-green-400 bg-green-100"
                                    : isUserAnswer && !isCorrect
                                    ? "border-red-400 bg-red-100"
                                    : "border-slate-200 bg-white"
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  {isCorrectAnswer && (
                                    <svg
                                      className="w-5 h-5 text-green-600"
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
                                  )}
                                  {isUserAnswer && !isCorrect && (
                                    <svg
                                      className="w-5 h-5 text-red-600"
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
                                  )}
                                  <span
                                    className={`${
                                      isCorrectAnswer
                                        ? "font-semibold text-green-900"
                                        : isUserAnswer && !isCorrect
                                        ? "font-semibold text-red-900"
                                        : "text-slate-700"
                                    }`}
                                  >
                                    {option}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {question.explication && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm font-medium text-blue-900 mb-1">
                              Explication
                            </p>
                            <p className="text-sm text-blue-800">
                              {question.explication}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href={`/formations/${slug}/learn`}
            className="flex-1"
          >
            <Button variant="outline" className="w-full">
              Retour au cours
            </Button>
          </Link>

          {!result.passed && (
            <Link
              href={`/formations/${slug}`}
              className="flex-1"
            >
              <Button className="w-full bg-cpu-orange hover:bg-cpu-orange/90 text-white">
                Revoir le programme
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
