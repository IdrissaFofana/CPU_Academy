"use client";

import { useState, useEffect, use } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { formationsMock } from "@/data/mock";
import { Question } from "@/types";
import { Button } from "@/components/ui/button";

export default function ExamenFinalPage({
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

  // Collecter toutes les questions de tous les quiz
  const allQuestions: Question[] = [];
  formation.chapitres?.forEach((chapitre) => {
    chapitre.lecons.forEach((lecon) => {
      if (lecon.quiz) {
        allQuestions.push(...lecon.quiz.questions);
      }
    });
  });

  // Mélanger les questions
  const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(90 * 60); // 90 minutes
  const [examStarted, setExamStarted] = useState(false);
  const [canTakeExam, setCanTakeExam] = useState(false);

  // Vérifier si l'utilisateur peut passer l'examen
  useEffect(() => {
    const storageKey = `formation-progress-${formation.id}`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved && formation.chapitres) {
      const progress = JSON.parse(saved);
      const totalLecons = formation.chapitres.reduce(
        (acc, chap) => acc + chap.lecons.length,
        0
      );
      
      // Vérifier que toutes les leçons sont complétées
      const allCompleted = progress.completedLecons?.length === totalLecons;
      
      // Vérifier que tous les quiz sont réussis
      let allQuizPassed = true;
      formation.chapitres?.forEach((chapitre) => {
        chapitre.lecons.forEach((lecon) => {
          if (lecon.quiz) {
            const quizResultKey = `quiz-result-${lecon.quiz.id}`;
            const quizResult = localStorage.getItem(quizResultKey);
            if (!quizResult || !JSON.parse(quizResult).passed) {
              allQuizPassed = false;
            }
          }
        });
      });
      
      setCanTakeExam(allCompleted && allQuizPassed);
    }
  }, [formation]);

  // Timer
  useEffect(() => {
    if (!examStarted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted, timeRemaining]);

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmitExam = () => {
    // Calculer le score
    let correctAnswers = 0;
    shuffledQuestions.forEach((question) => {
      const userAnswer = answers[question.id];
      if (userAnswer === question.reponseCorrecte) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / shuffledQuestions.length) * 100);
    const passed = score >= 75;

    // Sauvegarder les résultats
    const resultKey = `examen-final-${formation.id}`;
    localStorage.setItem(
      resultKey,
      JSON.stringify({
        score,
        correctAnswers,
        totalQuestions: shuffledQuestions.length,
        answers,
        passed,
        completedAt: new Date().toISOString(),
      })
    );

    // Si réussi, rediriger vers le certificat
    if (passed) {
      router.push(`/formations/${slug}/certificat`);
    } else {
      router.push(`/formations/${slug}/examen-final/results`);
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Page d'accès refusé
  if (!canTakeExam) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Accès à l'examen final verrouillé
            </h1>
            <p className="text-slate-600">
              Vous devez remplir certaines conditions avant de passer l'examen final.
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                Conditions requises :
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
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
                  Compléter toutes les leçons de la formation (100%)
                </li>
                <li className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 flex-shrink-0 mt-0.5"
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
                  Réussir tous les quiz de chapitre (≥75% chacun)
                </li>
              </ul>
            </div>
          </div>

          <Link href={`/formations/${slug}/learn`}>
            <Button className="w-full bg-cpu-orange hover:bg-cpu-orange/90 text-white">
              Retour à la formation
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Page de démarrage
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-cpu-orange to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Examen Final de Certification
            </h1>
            <p className="text-slate-600">{formation.titre}</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <span className="text-slate-700">Nombre de questions</span>
              <span className="font-semibold text-slate-900">
                {shuffledQuestions.length}
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <span className="text-slate-700">Durée</span>
              <span className="font-semibold text-slate-900">90 minutes</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <span className="text-slate-700">Note minimale</span>
              <span className="font-semibold text-slate-900">75%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <span className="text-slate-700">Tentatives</span>
              <span className="font-semibold text-slate-900">1 seule</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <svg
                className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5"
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
              <div className="text-sm text-green-800">
                <p className="font-medium mb-1">Vous êtes prêt(e) !</p>
                <p className="text-green-700">
                  Vous avez complété toutes les leçons et réussi tous les quiz.
                  En cas de réussite, vous obtiendrez votre certificat
                  immédiatement.
                </p>
              </div>
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
                <p className="font-medium mb-1">Points importants :</p>
                <ul className="list-disc list-inside space-y-1 text-blue-700">
                  <li>L'examen couvre tous les chapitres de la formation</li>
                  <li>Les questions sont présentées dans un ordre aléatoire</li>
                  <li>Vous pouvez naviguer entre les questions</li>
                  <li>Une seule tentative est autorisée</li>
                  <li>Le timer démarre dès que vous commencez</li>
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
              onClick={() => setExamStarted(true)}
              className="flex-1 bg-cpu-orange hover:bg-cpu-orange/90 text-white"
            >
              Commencer l'examen
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Page de l'examen
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-slate-900">
              Examen Final : {formation.titre}
            </h1>
            <p className="text-sm text-slate-600">
              Question {currentQuestionIndex + 1} sur {shuffledQuestions.length}
            </p>
          </div>

          {/* Timer */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                timeRemaining < 600
                  ? "bg-red-100 text-red-700"
                  : "bg-slate-100 text-slate-900"
              }`}
            >
              <svg
                className="w-5 h-5"
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
              <span className="font-mono font-semibold">
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
                width: `${
                  ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100
                }%`,
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
              {Object.keys(answers).length} / {shuffledQuestions.length} réponses
            </div>

            {currentQuestionIndex === shuffledQuestions.length - 1 ? (
              <Button
                onClick={handleSubmitExam}
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={Object.keys(answers).length !== shuffledQuestions.length}
              >
                Terminer l'examen
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
