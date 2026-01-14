import { Suspense } from "react";
import { PageBanner } from "@/components/layout/PageBanner";
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