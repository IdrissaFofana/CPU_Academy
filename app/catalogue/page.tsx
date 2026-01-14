import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogueContent } from "@/components/catalogue/CatalogueContent";

export const metadata: Metadata = {
  title: "Catalogue des formations - CPU Academy",
  description: "Explorez notre catalogue complet de formations pour développer vos compétences",
};

export default function CataloguePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    }>
      <CatalogueContent />
    </Suspense>
  );
}
