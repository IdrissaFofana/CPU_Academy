import type { Metadata } from "next";
import { CatalogueContent } from "@/components/catalogue/CatalogueContent";

export const metadata: Metadata = {
  title: "Catalogue des formations - CPU Academy",
  description: "Explorez notre catalogue complet de formations pour développer vos compétences",
};

export default function CataloguePage() {
  return <CatalogueContent />;
}
