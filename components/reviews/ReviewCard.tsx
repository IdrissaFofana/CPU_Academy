"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, CheckCircle2, MessageSquare } from "lucide-react";
import { RatingStars } from "./RatingStars";
import type { Review } from "@/types";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [helpful, setHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);

  const handleHelpful = () => {
    if (!helpful) {
      setHelpful(true);
      setHelpfulCount((prev) => prev + 1);
    }
  };

  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(dateObj);
  };

  return (
    <Card className="p-6 border border-slate-200 hover:border-cpu-orange transition-colors">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cpu-orange to-orange-600 flex items-center justify-center text-white font-bold">
              {review.userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-slate-900">
                {review.userName}
              </p>
              <p className="text-sm text-slate-600">
                {formatDate(review.date)}
              </p>
            </div>
          </div>
        </div>
        <RatingStars rating={review.rating} />
      </div>

      {/* Titre */}
      {review.titre && (
        <h4 className="font-bold text-slate-900 mb-2">{review.titre}</h4>
      )}

      {/* Commentaire */}
      <p className="text-slate-700 mb-4 leading-relaxed">
        {review.commentaire}
      </p>

      {/* Certification */}
      {review.formationTerminee && (
        <div className="flex items-center gap-2 mb-4">
          <Badge className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Achat vérifié
          </Badge>
        </div>
      )}

      {/* Réponse instructeur */}
      {review.reponseInstructeur && (
        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <div className="flex items-start gap-3 mb-2">
            <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-blue-900 text-sm mb-1">
                Réponse de l'instructeur
              </p>
              <p className="text-slate-700 text-sm leading-relaxed">
                {review.reponseInstructeur.texte}
              </p>
              <p className="text-xs text-slate-600 mt-2">
                {formatDate(review.reponseInstructeur.date)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleHelpful}
          disabled={helpful}
          className={`${
            helpful
              ? "text-cpu-orange"
              : "text-slate-600 hover:text-cpu-orange"
          }`}
        >
          <ThumbsUp
            className={`w-4 h-4 mr-2 ${helpful ? "fill-cpu-orange" : ""}`}
          />
          Utile ({helpfulCount})
        </Button>
      </div>
    </Card>
  );
}

