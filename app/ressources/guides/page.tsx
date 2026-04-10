"use client";

import { useEffect, useMemo, useState } from "react";
import { PageBanner } from "@/components/layout/PageBanner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";
import { getFriendlyApiErrorMessage } from "@/lib/api/error-messages";
import {
  FileText,
  Download,
  Search,
  ChevronDown,
} from "lucide-react";

type GuideResource = {
  id: string;
  titre: string;
  description: string;
  pages: number;
  telechargements: number;
  format: string;
  formatColor: string;
  categorie: string;
  url: string;
};

const GUIDES_PER_PAGE = 9;

function normalizeArray(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

function normalizeUrl(value: unknown): string {
  if (typeof value !== "string") return "";
  const cleaned = value.trim();
  if (!cleaned) return "";
  if (/^https?:\/\//i.test(cleaned)) return cleaned;
  if (cleaned.startsWith("//")) return `https:${cleaned}`;
  if (cleaned.startsWith("/")) return cleaned;
  return "";
}

function inferFormat(url: string, fallbackName = ""): string {
  const ref = `${url} ${fallbackName}`.toLowerCase();
  if (ref.includes(".pdf")) return "PDF";
  if (ref.includes(".doc") || ref.includes(".docx")) return "Word";
  if (ref.includes(".xls") || ref.includes(".xlsx")) return "Excel";
  if (ref.includes(".ppt") || ref.includes(".pptx")) return "PowerPoint";
  if (ref.includes(".zip") || ref.includes(".rar")) return "ZIP";
  return "Lien";
}

function isDocumentLike(url: string, type: string): boolean {
  const t = type.toLowerCase();
  if (t === "video") return false;
  if (/youtube\.com|youtu\.be|vimeo\.com/i.test(url)) return false;
  return true;
}

function formatColor(format: string): string {
  if (format === "PDF") return "bg-green-500";
  if (format === "Word") return "bg-blue-500";
  if (format === "Excel") return "bg-emerald-500";
  if (format === "PowerPoint") return "bg-orange-500";
  if (format === "ZIP") return "bg-amber-500";
  return "bg-slate-500";
}

function normalizeGuideResources(payload: any): GuideResource[] {
  const items = normalizeArray(payload)
    .map((item: any, idx: number) => {
      const url = normalizeUrl(item?.url || item?.file_url || item?.document_url || item?.download_url || item?.lien);
      const type = String(item?.type || item?.ressource_type || item?.format || "");
      const title = String(item?.titre || item?.title || item?.nom || item?.name || `Ressource ${idx + 1}`);
      const format = String(item?.format || inferFormat(url, title)).toUpperCase();

      if (!url || !isDocumentLike(url, type)) {
        return null;
      }

      return {
        id: String(item?.id || item?._id || `res-${idx}`),
        titre: title,
        description: String(item?.description || item?.resume || item?.summary || "Ressource telechargeable"),
        pages: Math.max(1, Number(item?.pages || item?.nbPages || item?.nombrePages || 8)),
        telechargements: Math.max(0, Number(item?.telechargements || item?.downloads || item?.download_count || 0)),
        format,
        formatColor: formatColor(format),
        categorie: String(item?.categorie || item?.category || item?.theme || "Ressources"),
        url,
      } as GuideResource;
    })
    .filter(Boolean) as GuideResource[];

  const byUrl = new Map<string, GuideResource>();
  items.forEach((item) => {
    if (!byUrl.has(item.url)) {
      byUrl.set(item.url, item);
    }
  });

  return Array.from(byUrl.values());
}

export default function GuidesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);
  const [ressources, setRessources] = useState<GuideResource[]>([]);
  const [isGuidesLoading, setIsGuidesLoading] = useState(true);
  const [guidesError, setGuidesError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchGuidesFromApi() {
      setIsGuidesLoading(true);
      setGuidesError(null);

      try {
        const response = await apiClient.get(API_ENDPOINTS.RESSOURCES.PUBLIC);
        const merged = normalizeGuideResources(response);

        if (!isCancelled) {
          setRessources(merged);
        }
      } catch (error) {
        if (!isCancelled) {
          setGuidesError(getFriendlyApiErrorMessage(error, "guides.list"));
          setRessources([]);
        }
      } finally {
        if (!isCancelled) {
          setIsGuidesLoading(false);
        }
      }
    }

    fetchGuidesFromApi();

    return () => {
      isCancelled = true;
    };
  }, []);

  const categories = useMemo(
    () => ["Tous", ...Array.from(new Set(ressources.map((ressource) => ressource.categorie))).sort()],
    [ressources]
  );

  useEffect(() => {
    if (!categories.includes(selectedCategory)) {
      setSelectedCategory("Tous");
    }
  }, [categories, selectedCategory]);

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

  const totalPages = Math.max(1, Math.ceil(filteredRessources.length / GUIDES_PER_PAGE));
  const startIndex = (currentPage - 1) * GUIDES_PER_PAGE;
  const paginatedRessources = filteredRessources.slice(startIndex, startIndex + GUIDES_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <>
      <PageBanner 
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/ressources/guides" },
          { label: "Guides & Modèles" }
        ]}
        slides={[
          {
            image: "/images/default-formation.jpg",
            title: "Guides & Modèles",
            subtitle: "Téléchargez nos ressources gratuites pour développer votre entreprise",
          },
          {
            image: "/images/formation-agriculture.png",
            title: "Outils Pratiques",
            subtitle: "Modèles, checklist et guides pour votre réussite",
          }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/10">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 text-center border-2 border-slate-100 shadow-md">
              <div className="text-3xl font-bold text-orange-600 mb-1">{ressources.length}</div>
              <div className="text-sm text-slate-600">Ressources</div>
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

          {isGuidesLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mb-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <Card key={idx} className="h-72 animate-pulse bg-slate-100 border-0" />
              ))}
            </div>
          )}

          {guidesError && (
            <Card className="max-w-3xl mx-auto p-6 bg-red-50 border-red-200 text-red-800 mb-8">
              Impossible de charger les guides pour le moment. Veuillez reessayer un peu plus tard.
            </Card>
          )}

          {/* Grille de ressources */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {!isGuidesLoading && !guidesError && paginatedRessources.length > 0 ? (
              paginatedRessources.map((ressource, idx) => (
                <Card
                  key={ressource.id}
                  className="group flex flex-col transition-all duration-500 border-2 border-slate-100 hover:border-orange-200 bg-white overflow-hidden animate-fade-in "
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
                      <Badge className={`${ressource.formatColor} text-white border-0 text-xs font-semibold px-3 py-1 shadow-md transition-all`}>
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
                    <Button asChild className="w-full cursor-pointer bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold shadow-md transition-all duration-300 group-hover:scale-105">
                      <a href={ressource.url} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                        Télécharger
                      </a>
                    </Button>
                  </div>
                </Card>
              ))
            ) : !isGuidesLoading ? (
              <div className="col-span-full text-center py-12">
                <FileText className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                <p className="text-lg text-slate-500">Aucune ressource trouvée</p>
                <p className="text-sm text-slate-400 mt-2">Essayez de modifier vos critères de recherche</p>
              </div>
            ) : null}
          </div>

          {!isGuidesLoading && !guidesError && filteredRessources.length > 0 && (
            <div className="max-w-7xl mx-auto mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-600">
                Page <span className="font-semibold text-slate-900">{currentPage}</span> sur <span className="font-semibold text-slate-900">{totalPages}</span>
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Précédent
                </Button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
                  .map((pageNum) => (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      className={currentPage === pageNum ? "bg-cpu-orange text-white hover:bg-cpu-orange" : ""}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  ))}

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}

