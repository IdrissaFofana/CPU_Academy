"use client";

import { useState, useEffect, use } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { formationsMock } from "@/data/mock";
import { Question, Quiz } from "@/types";
import { Button } from "@/components/ui/button";

export default function QuizPage({
  params,
}: {
  params: Promise<{ slug: string; quizId: string }>;
}) {
  const { slug, quizId } = use(params);
  const router = useRouter();
  const formation = formationsMock.find((f) => f.slug === slug);

  if (!formation) {
    notFound();
  }

  // Trouver le quiz
  let quiz: Quiz | undefined;
  let chapitreId: string | undefined;

  for (const chapitre of formation.chapitres || []) {
    for (const lecon of chapitre.lecons) {
      if (lecon.quiz && lecon.quiz.id === quizId) {
        quiz = lecon.quiz;
        chapitreId = chapitre.id;
        break;
      }
    }
    if (quiz) break;
  }

  if (!quiz) {
    notFound();
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(quiz.tentativesMax ? 15 * 60 : 0); // 15 minutes par défaut
  const [quizStarted, setQuizStarted] = useState(false);

  // Timer
  useEffect(() => {
    if (!quizStarted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, timeRemaining]);

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Calculer le score
    let correctAnswers = 0;
    quiz.questions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.reponseCorrecte) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / quiz.questions.length) * 100);

    // Sauvegarder les résultats dans localStorage
    const resultKey = `quiz-result-${quiz.id}`;
    localStorage.setItem(
      resultKey,
      JSON.stringify({
        score,
        correctAnswers,
        totalQuestions: quiz.questions.length,
        answers,
        passed: score >= quiz.noteMinimale,
        completedAt: new Date().toISOString(),
      })
    );

    // Rediriger vers la page de résultats
    router.push(`/formations/${slug}/quiz/${quizId}/results`);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Page de démarrage
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-cpu-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-cpu-orange"
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
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Quiz de validation</h1>
            <p className="text-slate-600">{formation.titre}</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <span className="text-slate-700">Nombre de questions</span>
              <span className="font-semibold text-slate-900">{quiz.questions.length}</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <span className="text-slate-700">Durée estimée</span>
              <span className="font-semibold text-slate-900">15 minutes</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <span className="text-slate-700">Note minimale</span>
              <span className="font-semibold text-slate-900">{quiz.noteMinimale}%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <span className="text-slate-700">Tentatives autorisées</span>
              <span className="font-semibold text-slate-900">
                {quiz.tentativesMax || "Illimitées"}
              </span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
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
                  <li>Lisez attentivement chaque question</li>
                  <li>Vous pouvez naviguer entre les questions</li>
                  <li>Vérifiez vos réponses avant de soumettre</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Link href={`/formations/${slug}/learn`} className="flex-1">
              <Button variant="outline" className="w-full">
                Retour au cours
              </Button>
            </Link>
            <Button
              onClick={() => setQuizStarted(true)}
              className="flex-1 bg-cpu-orange hover:bg-cpu-orange/90 text-white"
            >
              Commencer le quiz
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Page du quiz
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Quiz: {formation.titre}
            </h1>
            <p className="text-sm text-slate-600">
              Question {currentQuestionIndex + 1} sur {quiz.questions.length}
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
              <svg
                className="w-5 h-5 text-cpu-orange"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="font-mono font-semibold text-slate-900">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mt-4">
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-cpu-orange transition-all duration-300"
              style={{
                width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => {
              const isSelected = answers[currentQuestion.id] === option;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full text-left p-5 rounded-lg border-2 transition-all ${
                    isSelected
                      ? "border-cpu-orange bg-cpu-orange/5"
                      : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-cpu-orange bg-cpu-orange"
                          : "border-slate-300"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
                    <span className="text-slate-700 font-medium">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="mt-8 pt-8 border-t border-slate-200 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
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

            <div className="text-sm text-slate-600">
              {Object.keys(answers).length} / {quiz.questions.length} réponses
            </div>

            {currentQuestionIndex === quiz.questions.length - 1 ? (
              <Button
                onClick={handleSubmitQuiz}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={Object.keys(answers).length !== quiz.questions.length}
              >
                Terminer le quiz
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                className="bg-cpu-orange hover:bg-cpu-orange/90 text-white"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
