"use client";

import { PageBanner } from "@/components/layout/PageBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Video,
  Download,
  HelpCircle,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const ressources = [
  {
    id: "guides",
    href: "/ressources/guides",
    icon: FileText,
    title: "Guides & Modèles",
    description: "Téléchargez nos ressources gratuites pour développer votre entreprise",
    color: "orange",
    gradient: "from-orange-500 to-orange-600"
  },
  {
    id: "webinaires",
    href: "/ressources/webinaires",
    icon: Video,
    title: "Webinaires & Replays",
    description: "Participez à nos webinaires en direct ou visionnez les replays",
    color: "blue",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    id: "faq",
    href: "/ressources/faq",
    icon: HelpCircle,
    title: "FAQ",
    description: "Trouvez rapidement des réponses à vos questions",
    color: "green",
    gradient: "from-green-500 to-green-600"
  }
];

export default function RessourcesPage() {
  return (
    <>
      <PageBanner 
        title="Ressources"
        subtitle="Accédez à tous nos outils et supports pour réussir votre développement"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Ressources" }
        ]}
        buttons={[
          { label: "Télécharger guides", href: "/ressources/guides", icon: <Download className="h-5 w-5" /> },
          { label: "Voir webinaires", href: "/webinaires", variant: "outline", icon: <Video className="h-5 w-5" /> }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/20">
        <section className="container mx-auto px-8 lg:px-16 py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Explorez nos ressources
              </h2>
              <p className="text-lg text-slate-600">
                Choisissez le type de ressource qui vous intéresse
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {ressources.map((ressource, index) => {
                const Icon = ressource.icon;
                return (
                  <Card
                    key={ressource.id}
                    className="group relative hover:shadow-2xl transition-all duration-500 border-2 border-slate-100 hover:border-orange-200 overflow-hidden animate-fade-in hover:-translate-y-2"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 via-orange-50/0 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="p-8 text-center relative z-10">
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${ressource.gradient} text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                        <Icon className="w-10 h-10" />
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-orange-600 transition-colors">
                        {ressource.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-600 mb-6 leading-relaxed">
                        {ressource.description}
                      </p>

                      {/* Button */}
                      <Button
                        asChild
                        className={`cursor-pointer w-full bg-gradient-to-r ${ressource.gradient} hover:opacity-90 text-white shadow-md group-hover:shadow-xl transition-all duration-300`}
                      >
                        <Link href={ressource.href} className="flex items-center justify-center">
                          Découvrir
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
