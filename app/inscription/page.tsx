import { Suspense } from "react";
import { PageBanner } from "@/components/layout/PageBanner";
import { Rocket, BookOpen } from "lucide-react";
import { InscriptionForm } from "@/components/inscription/InscriptionForm";

export default function InscriptionPage() {
  return (
    <>
      <PageBanner 
        title="Inscription à la formation"
        subtitle="Complétez votre inscription en quelques étapes"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Catalogue", href: "/catalogue" },
          { label: "Inscription" }
        ]}
        buttons={[
          { label: "Commencer", href: "#formulaire", icon: <Rocket className="h-5 w-5" /> },
          { label: "Retour au catalogue", href: "/catalogue", variant: "outline", icon: <BookOpen className="h-5 w-5" /> }
        ]}
      />

      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      }>
        <InscriptionForm />
      </Suspense>
    </>
  );
}