"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import { RatingStars } from "./RatingStars";

interface ReviewFormProps {
  formationId: string;
  onSubmit?: (review: {
    rating: number;
    titre: string;
    commentaire: string;
  }) => void;
}

export function ReviewForm({ formationId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [titre, setTitre] = useState("");
  const [commentaire, setCommentaire] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      alert("Veuillez sélectionner une note");
      return;
    }

    if (commentaire.trim().length < 20) {
      alert("Votre commentaire doit faire au moins 20 caractères");
      return;
    }

    // Simuler l'envoi
    const newReview = {
      rating,
      titre,
      commentaire,
    };

    if (onSubmit) {
      onSubmit(newReview);
    }

    // Reset et confirmation
    setSubmitted(true);
    setTimeout(() => {
      setRating(0);
      setTitre("");
      setCommentaire("");
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <Card className="p-8 text-center bg-green-50 border-green-200">
        <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold text-green-900 mb-2">
          Merci pour votre avis !
        </h3>
        <p className="text-green-700">
          Votre avis a été publié et sera visible par les autres utilisateurs
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-2xl font-bold text-slate-900 mb-6">
        Laisser un avis
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <Label className="text-base font-semibold text-slate-900 mb-3 block">
            Votre note *
          </Label>
          <div className="flex items-center gap-3">
            <RatingStars
              rating={rating}
              size="lg"
              interactive
              onChange={setRating}
            />
            {rating > 0 && (
              <span className="text-lg font-semibold text-cpu-orange">
                {rating}/5
              </span>
            )}
          </div>
        </div>

        {/* Titre */}
        <div>
          <Label htmlFor="titre" className="text-base font-semibold text-slate-900 mb-2 block">
            Titre de votre avis
          </Label>
          <Input
            id="titre"
            type="text"
            placeholder="Résumé en quelques mots..."
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            className="border-slate-300 focus:border-cpu-orange"
          />
        </div>

        {/* Commentaire */}
        <div>
          <Label htmlFor="commentaire" className="text-base font-semibold text-slate-900 mb-2 block">
            Votre commentaire *
          </Label>
          <textarea
            id="commentaire"
            rows={6}
            placeholder="Partagez votre expérience avec cette formation... (minimum 20 caractères)"
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cpu-orange focus:border-cpu-orange resize-none"
            required
          />
          <p className="text-sm text-slate-600 mt-2">
            {commentaire.length} / 20 caractères minimum
          </p>
        </div>

        {/* Submit */}
        <div className="flex gap-3">
          <Button
            type="submit"
            className="bg-cpu-orange hover:bg-cpu-orange/90 text-white"
            disabled={rating === 0 || commentaire.trim().length < 20}
          >
            Publier mon avis
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setRating(0);
              setTitre("");
              setCommentaire("");
            }}
          >
            Annuler
          </Button>
        </div>

        <p className="text-sm text-slate-600">
          * Champs obligatoires. Votre avis sera publié après validation.
        </p>
      </form>
    </Card>
  );
}

