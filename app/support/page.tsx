import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";

export const metadata: Metadata = {
  title: "Support - CPU Academy",
  description: "Contactez-nous pour toute question ou assistance",
};

export default function SupportPage() {
  return (
    <>
      <PageBanner 
        title="Support & Assistance"
        subtitle="Contactez-nous pour toute question ou assistance"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Support" }
        ]}
      />
      <div className="container mx-auto px-4 py-12">
        <p className="text-lg text-slate-600 mb-8">
          Page en construction - Centre d&apos;aide et support client
        </p>
      </div>
    </>
  );
}
