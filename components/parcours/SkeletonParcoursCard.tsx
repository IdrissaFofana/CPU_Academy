"use client";

interface SkeletonParcoursCardProps {
  variant?: "grid" | "list" | "compact";
}

export function SkeletonParcoursCard({ variant = "grid" }: SkeletonParcoursCardProps) {
  if (variant === "compact") {
    return (
      <div className="h-[60px] bg-slate-200 rounded-lg animate-pulse flex items-center gap-3 px-4">
        <div className="w-8 h-8 bg-slate-300 rounded flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-slate-300 rounded w-3/4" />
          <div className="h-2 bg-slate-300 rounded w-1/2" />
        </div>
        <div className="w-6 h-6 bg-slate-300 rounded flex-shrink-0" />
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-lg animate-pulse">
        <div className="w-20 h-20 bg-slate-200 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-3 bg-slate-200 rounded w-1/2" />
          <div className="flex gap-4">
            <div className="h-3 bg-slate-200 rounded w-20" />
            <div className="h-3 bg-slate-200 rounded w-20" />
          </div>
        </div>
        <div className="space-y-2 flex-shrink-0">
          <div className="h-4 bg-slate-200 rounded w-16" />
          <div className="h-8 bg-slate-200 rounded w-20" />
        </div>
      </div>
    );
  }

  // Grid variant (default)
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-slate-200 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-[180px] bg-slate-200 relative">
        <div className="absolute top-2 right-2 w-8 h-8 bg-slate-300 rounded-full" />
      </div>

      {/* Content skeleton */}
      <div className="p-4 space-y-4">
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-full" />
        </div>

        {/* Instructor */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-slate-200 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-slate-200 rounded w-2/3" />
          </div>
        </div>

        {/* Rating and stats */}
        <div className="space-y-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-slate-200 rounded" />
            ))}
            <div className="ml-auto h-3 bg-slate-200 rounded w-20" />
          </div>

          {/* Duration and inscriptions */}
          <div className="grid grid-cols-2 gap-2">
            <div className="h-3 bg-slate-200 rounded" />
            <div className="h-3 bg-slate-200 rounded" />
          </div>
        </div>

        {/* Benefits section */}
        <div className="flex gap-2">
          <div className="h-5 bg-slate-200 rounded w-16" />
          <div className="h-5 bg-slate-200 rounded w-16" />
        </div>

        {/* Price and CTA */}
        <div className="flex items-end justify-between gap-3 pt-2">
          <div className="flex-1">
            <div className="h-5 bg-slate-200 rounded w-1/2" />
          </div>
          <div className="h-10 bg-slate-200 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

interface SkeletonParcoursGridProps {
  count?: number;
  variant?: "grid" | "list" | "compact";
}

export function SkeletonParcoursGrid({ count = 12, variant = "grid" }: SkeletonParcoursGridProps) {
  if (variant === "compact") {
    return (
      <div className="space-y-2">
        {[...Array(count)].map((_, i) => (
          <SkeletonParcoursCard key={i} variant="compact" />
        ))}
      </div>
    );
  }

  if (variant === "list") {
    return (
      <div className="space-y-3">
        {[...Array(count)].map((_, i) => (
          <SkeletonParcoursCard key={i} variant="list" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <SkeletonParcoursCard key={i} variant="grid" />
      ))}
    </div>
  );
}

