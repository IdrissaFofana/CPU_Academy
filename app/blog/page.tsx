"use client";

import { useState, useMemo } from "react";
import type { Metadata } from "next";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PageBanner } from "@/components/layout/PageBanner";
import {
  Calendar,
  Clock,
  User,
  Search,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Award,
  ArrowRight,
  Tag,
  Eye,
  MessageCircle,
  ChevronRight,
  Filter,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", label: "Tous", count: 24 },
    { id: "entrepreneuriat", label: "Entrepreneuriat", count: 8 },
    { id: "formation", label: "Formation", count: 6 },
    { id: "success-stories", label: "Success Stories", count: 5 },
    { id: "tech", label: "Tech & Innovation", count: 5 },
  ];

  const articles = [
    {
      id: 1,
      titre: "10 compétences clés pour réussir en 2026",
      slug: "10-competences-cles-2026",
      extrait:
        "Découvrez les compétences les plus recherchées par les employeurs en 2026 et comment les développer avec CPU Formation.",
      image: "/blog/competences-2026.jpg",
      categorie: "formation",
      auteur: "Dr. Kouamé Yao",
      datePublication: "05 Feb 2026",
      tempsLecture: 8,
      vues: 1250,
      commentaires: 34,
      featured: true,
    },
    {
      id: 2,
      titre: "Comment Amani a transformé son entreprise grâce à la formation",
      slug: "success-story-amani",
      extrait:
        "L'histoire inspirante d'Amani qui a suivi nos formations en gestion et a triplé son chiffre d'affaires en 12 mois.",
      image: "/blog/success-amani.jpg",
      categorie: "success-stories",
      auteur: "Mme Adjoua Koffi",
      datePublication: "02 Feb 2026",
      tempsLecture: 6,
      vues: 2180,
      commentaires: 56,
      featured: true,
    },
    {
      id: 3,
      titre: "L'IA dans l'éducation: opportunités pour l'Afrique",
      slug: "ia-education-afrique",
      extrait:
        "L'intelligence artificielle révolutionne l'apprentissage. Découvrez comment CPU Formation intègre ces technologies.",
      image: "/blog/ia-education.jpg",
      categorie: "tech",
      auteur: "M. Diabaté Ibrahim",
      datePublication: "30 Jan 2026",
      tempsLecture: 10,
      vues: 980,
      commentaires: 28,
      featured: true,
    },
    {
      id: 4,
      titre: "Financer sa formation: guide complet des aides disponibles",
      slug: "financer-formation",
      extrait:
        "Un guide pratique pour trouver des financements pour votre formation professionnelle en Côte d'Ivoire.",
      image: "/blog/financement.jpg",
      categorie: "formation",
      auteur: "M. Konan Parfait",
      datePublication: "28 Jan 2026",
      tempsLecture: 7,
      vues: 1540,
      commentaires: 42,
      featured: false,
    },
    {
      id: 5,
      titre: "5 erreurs à éviter quand on lance son entreprise",
      slug: "erreurs-lancement-entreprise",
      extrait:
        "Les pièges les plus courants rencontrés par les entrepreneurs débutants et comment les éviter.",
      image: "/blog/erreurs-entrepreneur.jpg",
      categorie: "entrepreneuriat",
      auteur: "Dr. Kouamé Yao",
      datePublication: "25 Jan 2026",
      tempsLecture: 5,
      vues: 3200,
      commentaires: 78,
      featured: false,
    },
    {
      id: 6,
      titre: "La révolution du e-learning en Côte d'Ivoire",
      slug: "revolution-elearning-ci",
      extrait:
        "Comment la formation en ligne transforme le paysage éducatif ivoirien et ouvre de nouvelles opportunités.",
      image: "/blog/elearning-ci.jpg",
      categorie: "tech",
      auteur: "Mme Adjoua Koffi",
      datePublication: "22 Jan 2026",
      tempsLecture: 9,
      vues: 1680,
      commentaires: 45,
      featured: false,
    },
  ];

  // Séparer l'article hero (premier featured) des autres
  const heroArticle = articles.find((a) => a.featured);
  const featuredArticles = articles.filter((a) => a.featured && a.id !== heroArticle?.id);
  const regularArticles = articles.filter((a) => !a.featured);

  // Filtrage
  const allArticles = [...featuredArticles, ...regularArticles];
  const filteredArticles = allArticles.filter((article) => {
    const matchesCategory = selectedCategory === "all" || article.categorie === selectedCategory;
    const matchesSearch =
      article.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.extrait.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Tags populaires
  const popularTags = useMemo(() => [
    "Formation professionnelle",
    "Entrepreneuriat",
    "Digital",
    "Leadership",
    "Innovation",
    "Success Stories",
  ], []);

  // Articles populaires (par nombre de vues)
  const popularArticles = useMemo(() => 
    [...articles].sort((a, b) => b.vues - a.vues).slice(0, 3),
    []
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <PageBanner
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Blog & Actualités" }
        ]}
        slides={[
          {
            image: "/images/default-formation.jpg",
            title: "Blog & Actualités",
            subtitle: "Conseils d'experts, actualités et success stories pour booster votre carrière",
            buttons: [
              { label: "Découvrir", href: "#contenu", icon: <BookOpen className="h-5 w-5" /> }
            ]
          }
        ]}
      />

      <div id="contenu" className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Article - Article principal en vedette */}
        {heroArticle && !searchTerm && selectedCategory === "all" && (
          <div className="mb-16 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-cpu-orange p-3 rounded-xl shadow-lg">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-slate-900">
                Article à la une
              </h2>
            </div>

            <Card className="overflow-hidden border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 group">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Image */}
                <div className="relative h-[400px] lg:h-full bg-orange-100 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-32 h-32 text-cpu-orange/30" />
                  </div>
                  <div className="absolute inset-0 bg-black/30" />
                  
                  {/* Badge catégorie */}
                  <Badge className="absolute top-6 left-6 bg-cpu-orange text-white border-0 text-sm px-4 py-2 shadow-lg">
                    <Tag className="w-4 h-4 mr-2" />
                    {categories.find((c) => c.id === heroArticle.categorie)?.label}
                  </Badge>

                  {/* Stats */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-4 text-white">
                    <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Eye className="w-4 h-4" />
                      {heroArticle.vues.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full">
                      <MessageCircle className="w-4 h-4" />
                      {heroArticle.commentaires}
                    </span>
                  </div>
                </div>

                {/* Contenu */}
                <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
                  <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {heroArticle.auteur}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {heroArticle.datePublication}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {heroArticle.tempsLecture} min
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 group-hover:text-cpu-orange transition-colors leading-tight">
                    {heroArticle.titre}
                  </h3>
                  
                  <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {heroArticle.extrait}
                  </p>

                  <Button 
                    size="lg" 
                    className="bg-cpu-orange hover:bg-orange-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group w-full sm:w-auto"
                    asChild
                  >
                    <Link href={`/blog/${heroArticle.slug}`}>
                      Lire l'article complet
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Recherche et filtres */}
        <div className="mb-12 animate-fade-in-up animation-delay-100">
          <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-100">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Recherche */}
              <div className="flex-1">
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Rechercher un article
                </label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Tapez un mot-clé..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 py-6 text-base border-2 border-slate-200 focus:border-cpu-orange rounded-xl"
                    suppressHydrationWarning
                  />
                </div>
              </div>

              {/* Filtres catégories */}
              <div className="lg:w-1/3">
                <label className="text-sm font-medium text-slate-700 mb-2 block">
                  Catégorie
                </label>
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 z-10" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full pl-12 pr-4 py-6 text-base border-2 border-slate-200 focus:border-cpu-orange rounded-xl bg-white appearance-none cursor-pointer hover:border-slate-300 transition-colors"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label} ({cat.count})
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 rotate-90 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Tags actifs */}
            {(searchTerm || selectedCategory !== "all") && (
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                <span className="text-sm text-slate-600 font-medium">Filtres actifs:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1">
                    <Search className="w-3 h-3" />
                    {searchTerm}
                    <button 
                      onClick={() => setSearchTerm("")}
                      className="hover:text-red-600 transition-colors ml-1"
                    >
                      ×
                    </button>
                  </Badge>
                )}
                {selectedCategory !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-2 px-3 py-1">
                    <Tag className="w-3 h-3" />
                    {categories.find(c => c.id === selectedCategory)?.label}
                    <button 
                      onClick={() => setSelectedCategory("all")}
                      className="hover:text-red-600 transition-colors ml-1"
                    >
                      ×
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Contenu principal avec sidebar */}
        <div className="grid lg:grid-cols-[1fr_350px] gap-12">
          {/* Articles */}
          <div className="animate-fade-in-up animation-delay-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-slate-900">
                {searchTerm ? "Résultats de recherche" : "Derniers articles"}
              </h2>
              <span className="text-slate-500 font-medium">
                {filteredArticles.length} article{filteredArticles.length > 1 ? "s" : ""}
              </span>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-8">
                {filteredArticles.map((article, index) => (
                  <Card
                    key={article.id}
                    className="group overflow-hidden border-2 border-slate-100 hover:border-cpu-orange hover:shadow-xl transition-all duration-500 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Image */}
                    <Link href={`/blog/${article.slug}`} className="block relative h-56 bg-slate-100 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <BookOpen className="w-20 h-20 text-slate-300" />
                      </div>
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <Badge className="absolute top-4 left-4 bg-white/95 text-slate-700 border-0 backdrop-blur-sm shadow-md">
                        {categories.find((c) => c.id === article.categorie)?.label}
                      </Badge>
                    </Link>

                    {/* Contenu */}
                    <div className="p-6">
                      <Link href={`/blog/${article.slug}`}>
                        <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-cpu-orange transition-colors leading-snug">
                          {article.titre}
                        </h3>
                      </Link>
                      
                      <p className="text-slate-600 mb-4 line-clamp-2 text-sm leading-relaxed">
                        {article.extrait}
                      </p>

                      {/* Meta info */}
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100">
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {article.auteur.split(' ').slice(-2).join(' ')}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.datePublication}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.tempsLecture} min
                        </span>
                      </div>

                      {/* Footer avec stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {article.vues.toLocaleString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4" />
                            {article.commentaires}
                          </span>
                        </div>

                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-cpu-orange hover:bg-cpu-orange hover:text-white"
                          asChild
                        >
                          <Link href={`/blog/${article.slug}`}>
                            Lire
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-16 text-center border-2 border-slate-100 animate-fade-in">
                <Search className="w-20 h-20 text-slate-300 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Aucun article trouvé</h3>
                <p className="text-slate-600 mb-8 max-w-md mx-auto">
                  Nous n'avons pas trouvé d'articles correspondant à vos critères. Essayez avec d'autres mots-clés ou explorez toutes les catégories.
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  className="bg-cpu-orange hover:bg-orange-600 text-white"
                >
                  Réinitialiser les filtres
                </Button>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8 animate-fade-in-up animation-delay-300">
            {/* Catégories */}
            <Card className="p-6 border-2 border-slate-100 shadow-lg sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Catégories</h3>
              </div>
              
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                      selectedCategory === cat.id
                        ? "bg-cpu-orange text-white shadow-md"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span className="font-medium">{cat.label}</span>
                    <Badge 
                      className={`${
                        selectedCategory === cat.id 
                          ? "bg-white/20 text-white" 
                          : "bg-slate-200 text-slate-700"
                      } border-0`}
                    >
                      {cat.count}
                    </Badge>
                  </button>
                ))}
              </div>
            </Card>

            {/* Articles populaires */}
            <Card className="p-6 border-2 border-slate-100 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-500 p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Populaires</h3>
              </div>
              
              <div className="space-y-4">
                {popularArticles.map((article, index) => (
                  <Link 
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    className="group block"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-20 h-20 bg-orange-100 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <span className="text-2xl font-bold text-cpu-orange">{index + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-sm text-slate-900 line-clamp-2 group-hover:text-cpu-orange transition-colors mb-1">
                          {article.titre}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Eye className="w-3 h-3" />
                          {article.vues.toLocaleString()} vues
                        </div>
                      </div>
                    </div>
                    {index < popularArticles.length - 1 && (
                      <div className="border-b border-slate-100 mt-4" />
                    )}
                  </Link>
                ))}
              </div>
            </Card>

            {/* Tags populaires */}
            <Card className="p-6 border-2 border-slate-100 shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-500 p-2 rounded-lg">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Tags</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="cursor-pointer hover:bg-cpu-orange hover:text-white hover:border-cpu-orange transition-all duration-200 px-3 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          </aside>
        </div>

        {/* Newsletter CTA */}
        <Card className="mt-16 p-12 lg:p-16 bg-cpu-orange text-white border-0 shadow-2xl animate-fade-in-up animation-delay-400 overflow-hidden relative">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3" />
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <div className="inline-flex p-4 rounded-2xl bg-white/10 backdrop-blur-sm mb-6 shadow-xl">
              <Award className="w-12 h-12" />
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              Restez informé·e des dernières actualités
            </h2>
            
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Recevez nos meilleurs articles, conseils d'experts et offres exclusives directement dans votre boîte mail chaque semaine
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Entrez votre email..."
                className="flex-1 py-7 px-6 text-lg bg-white text-slate-900 border-0 rounded-xl shadow-xl placeholder:text-slate-400"
                suppressHydrationWarning
              />
              <Button 
                size="lg"
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-7 text-lg whitespace-nowrap rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                S'abonner
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </div>
            
            <p className="text-sm text-orange-100 mt-4">
              🔒 Vos données sont protégées. Désabonnement en un clic.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

