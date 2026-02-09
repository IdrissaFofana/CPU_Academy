"use client";

import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ReviewsStatsProps {
  reviews: Array<{
    rating: number;
  }>;
}

export function ReviewsStats({ reviews }: ReviewsStatsProps) {
  const totalReviews = reviews.length;
  const averageRating =
    reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews || 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = reviews.filter((r) => r.rating === rating).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { rating, count, percentage };
  });

  return (
    <Card className="p-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Note moyenne */}
        <div className="text-center">
          <div className="text-6xl font-bold text-cpu-orange mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${
                  star <= Math.round(averageRating)
                    ? "fill-cpu-orange text-cpu-orange"
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>
          <p className="text-slate-600">
            Basé sur {totalReviews} avis
          </p>
        </div>

        {/* Distribution */}
        <div className="space-y-3">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-20">
                <span className="text-sm font-medium text-slate-700">
                  {rating}
                </span>
                <Star className="w-4 h-4 fill-cpu-orange text-cpu-orange" />
              </div>
              <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-cpu-orange transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-slate-600 w-12 text-right">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
