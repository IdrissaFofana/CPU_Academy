import type { Metadata } from "next";
import { PageBanner } from "@/components/layout/PageBanner";
import { LifeBuoy, HelpCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Support - CPU Formation",
  description: "Contactez-nous pour toute question ou assistance",
};

export default function SupportPage() {
  return (
    <>
      <PageBanner 
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Support" }
        ]}
        slides={[
          {
            image: "/images/formation-tech.png",
            title: "Support & Assistance",
            subtitle: "Contactez-nous pour toute question ou assistance",
            buttons: [
              { label: "Ouvrir un ticket", href: "/support", icon: <LifeBuoy className="h-5 w-5" /> },
              { label: "Consulter la FAQ", href: "/faq", variant: "outline", icon: <HelpCircle className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/formation-agriculture.png",
            title: "Nous Sommes Là Pour Vous",
            subtitle: "Une équipe dédiée à votre service 24/7",
            buttons: [
              { label: "Nous contacter", href: "/support", icon: <LifeBuoy className="h-5 w-5" /> }
            ]
          }
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

