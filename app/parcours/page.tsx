import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { ParcoursContent } from "@/components/parcours/ParcoursContent";

export const metadata: Metadata = {
  title: "Parcours de formation - CPU Academy",
  description: "Découvrez nos parcours structurés pour atteindre vos objectifs",
};

export default function ParcoursPage() {
  return (
    <>
      <PageBanner 
        title="Nos parcours de formation"
        subtitle="Des parcours structurés pour vous accompagner vers vos objectifs professionnels"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Parcours" }
        ]}
      />
      <ParcoursContent />
    </>
  );
}
