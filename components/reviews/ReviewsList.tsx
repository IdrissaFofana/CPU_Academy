"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "./ReviewCard";
import { Star } from "lucide-react";
import type { Review } from "@/types";

interface ReviewsListProps {
  reviews: Review[];
}

export function ReviewsList({ reviews }: ReviewsListProps) {
  const [filter, setFilter] = useState<"all" | 1 | 2 | 3 | 4 | 5>("all");
  const [sortBy, setSortBy] = useState<"recent" | "helpful">("recent");

  // Filtrer
  const filteredReviews =
    filter === "all"
      ? reviews
      : reviews.filter((r) => r.rating === filter);

  // Trier
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.helpful - a.helpful;
    }
  });

  return (
    <div className="space-y-6">
      {/* Filtres et tri */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-700">Filtrer:</span>
          <div className="flex gap-2">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={
                filter === "all"
                  ? "bg-cpu-orange hover:bg-cpu-orange/90"
                  : ""
              }
            >
              Tous
            </Button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant={filter === rating ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(rating as any)}
                className={
                  filter === rating
                    ? "bg-cpu-orange hover:bg-cpu-orange/90"
                    : ""
                }
              >
                {rating} <Star className="w-4 h-4 fill-current inline" />
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <span className="text-sm font-medium text-slate-700">Trier par:</span>
          <div className="flex gap-2">
            <Button
              variant={sortBy === "recent" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("recent")}
              className={
                sortBy === "recent"
                  ? "bg-cpu-orange hover:bg-cpu-orange/90"
                  : ""
              }
            >
              Plus récents
            </Button>
            <Button
              variant={sortBy === "helpful" ? "default" : "outline"}
              size="sm"
              onClick={() => setSortBy("helpful")}
              className={
                sortBy === "helpful"
                  ? "bg-cpu-orange hover:bg-cpu-orange/90"
                  : ""
              }
            >
              Plus utiles
            </Button>
          </div>
        </div>
      </div>

      {/* Liste des avis */}
      <div className="space-y-4">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <div className="text-center py-12 text-slate-600">
            Aucun avis ne correspond à ce filtre
          </div>
        )}
      </div>
    </div>
  );
}

