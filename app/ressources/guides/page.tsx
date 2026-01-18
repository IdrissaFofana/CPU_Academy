"use client";

import { useState } from "react";
import { PageBanner } from "@/components/layout/PageBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Download, 
  Search,
  ChevronDown
} from "lucide-react";

const categories = [
  "Tous",
  "Création d'entreprise",
  "Business Plan",
  "Fiscalité",
  "RH",
  "Marchés publics",
  "Qualité"
];

const ressources = [
  {
    id: 1,
    titre: "Guide de création d'entreprise en Côte d'Ivoire",
    description: "Toutes les étapes pour créer votre entreprise, de l'idée à l'immatriculation",
    pages: 45,
    telechargements: 1250,
    format: "PDF",
    formatColor: "bg-green-500",
    categorie: "Création d'entreprise"
  },
  {
    id: 2,
    titre: "Modèle de Business Plan",
    description: "Template complet avec exemples pour construire votre business plan",
    pages: 20,
    telechargements: 890,
    format: "Word/Excel",
    formatColor: "bg-blue-500",
    categorie: "Business Plan"
  },
  {
    id: 3,
    titre: "Kit de réponse aux appels d'offres",
    description: "Tous les documents types pour répondre aux marchés publics",
    pages: 35,
    telechargements: 670,
    format: "ZIP",
    formatColor: "bg-orange-500",
    categorie: "Marchés publics"
  },
  {
    id: 4,
    titre: "Guide fiscal des PME",
    description: "Comprendre et optimiser sa fiscalité en Côte d'Ivoire",
    pages: 60,
    telechargements: 540,
    format: "PDF",
    formatColor: "bg-green-500",
    categorie: "Fiscalité"
  },
  {
    id: 5,
    titre: "Modèles de contrats de travail",
    description: "CDD, CDI, stage : tous les modèles conformes au droit ivoirien",
    pages: 15,
    telechargements: 980,
    format: "Word",
    formatColor: "bg-blue-500",
    categorie: "RH"
  },
  {
    id: 6,
    titre: "Check-list qualité HACCP",
    description: "Guide pratique pour la mise en conformité agroalimentaire",
    pages: 25,
    telechargements: 320,
    format: "PDF",
    formatColor: "bg-green-500",
    categorie: "Qualité"
  },
  {
    id: 7,
    titre: "Plan de trésorerie prévisionnel",
    description: "Modèle Excel avec formules automatiques sur 3 ans",
    pages: 12,
    telechargements: 1120,
    format: "Excel",
    formatColor: "bg-emerald-500",
    categorie: "Business Plan"
  },
  {
    id: 8,
    titre: "Guide des aides aux entreprises",
    description: "Panorama complet des financements et subventions disponibles",
    pages: 38,
    telechargements: 760,
    format: "PDF",
    formatColor: "bg-green-500",
    categorie: "Création d'entreprise"
  },
  {
    id: 9,
    titre: "Modèles de factures et devis",
    description: "Templates professionnels conformes aux normes comptables",
    pages: 8,
    telechargements: 2150,
    format: "Word/Excel",
    formatColor: "bg-blue-500",
    categorie: "Fiscalité"
  }
];

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredRessources = ressources.filter((ressource) => {
    // Filtre de recherche
    const matchSearch = !searchQuery || 
      ressource.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ressource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ressource.categorie.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filtre de catégorie
    const matchCategory = selectedCategory === "Tous" || ressource.categorie === selectedCategory;
    
    return matchSearch && matchCategory;
  });

  return (
    <>
      <PageBanner 
        title="Guides & Modèles"
        subtitle="Téléchargez nos ressources gratuites pour développer votre entreprise"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/ressources/guides" },
          { label: "Guides & Modèles" }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/10">
        <section className="container mx-auto px-8 lg:px-16 py-12">
          {/* Recherche */}
          <div className="mb-8 relative z-10">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none z-10" />
              <input
                type="text"
                placeholder="Rechercher un guide ou un modèle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 h-14 text-lg border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none shadow-md transition-all relative z-10 bg-white"
              />
            </div>
          </div>

          {/* Filtres par catégorie - Design mobile-first */}
          <div className="mb-8 relative z-10">
            {/* Version mobile - Select dropdown */}
            <div className="block lg:hidden">
              <div className="relative max-w-md mx-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 pr-10 text-base font-semibold bg-white border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all shadow-md appearance-none cursor-pointer relative z-10"
                >
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Version desktop - Boutons horizontaux */}
            <div className="hidden lg:flex flex-wrap gap-2 justify-center relative z-10">
              {categories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat)}
                  type="button"
                  className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 cursor-pointer relative z-10 ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-105" 
                      : "bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-md hover:scale-105"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Stats rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md">
              <div className="text-3xl font-bold text-orange-600 mb-1">{ressources.length}</div>
              <div className="text-sm text-slate-600">Ressources</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md">
              <div className="text-3xl font-bold text-green-600 mb-1">100%</div>
              <div className="text-sm text-slate-600">Gratuit</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {ressources.reduce((acc, r) => acc + r.telechargements, 0).toLocaleString()}
              </div>
              <div className="text-sm text-slate-600">Téléchargements</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md">
              <div className="text-3xl font-bold text-purple-600 mb-1">{categories.length - 1}</div>
              <div className="text-sm text-slate-600">Catégories</div>
            </div>
          </div>

          {/* Grille de ressources */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredRessources.length > 0 ? (
              filteredRessources.map((ressource, idx) => (
                <Card
                  key={ressource.id}
                  className="group flex flex-col hover:shadow-2xl transition-all duration-500 border-2 border-slate-100 hover:border-orange-200 bg-white overflow-hidden animate-fade-in hover:-translate-y-2"
                  style={{ 
                    animationDelay: `${idx * 80}ms`,
                    transformOrigin: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-50/0 via-orange-50/0 to-orange-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="p-6 flex-grow flex flex-col relative z-10">
                    {/* Header avec icône et badge format */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                        <FileText className="w-7 h-7 text-orange-600 group-hover:scale-110 transition-transform" />
                      </div>
                      <Badge className={`${ressource.formatColor} text-white border-0 text-xs font-semibold px-3 py-1 shadow-md group-hover:shadow-lg transition-all`}>
                        {ressource.format}
                      </Badge>
                    </div>

                    {/* Titre */}
                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 leading-tight min-h-[3.5rem]">
                      {ressource.titre}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 mb-4 line-clamp-3 leading-relaxed flex-grow">
                      {ressource.description}
                    </p>

                    {/* Badge catégorie */}
                    <div className="mb-4">
                      <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 text-xs">
                        {ressource.categorie}
                      </Badge>
                    </div>

                    {/* Infos */}
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-4 pb-4 border-b-2 border-slate-100 group-hover:border-orange-100 transition-colors">
                      <div className="flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-orange-600" />
                        <span className="font-medium">{ressource.pages} pages</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Download className="w-4 h-4 text-orange-600" />
                        <span className="font-medium">{ressource.telechargements.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Bouton télécharger */}
                    <Button
                      className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-md hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                    >
                      <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                      Télécharger
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <p className="text-lg text-slate-500">Aucune ressource trouvée</p>
                <p className="text-sm text-slate-400 mt-2">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
