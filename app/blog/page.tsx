"use client";

import { useState } from "react";
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

  const featuredArticles = articles.filter((a) => a.featured);
  const regularArticles = articles.filter((a) => !a.featured);

  const filteredArticles = regularArticles.filter((article) => {
    const matchesCategory = selectedCategory === "all" || article.categorie === selectedCategory;
    const matchesSearch =
      article.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.extrait.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <PageBanner
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Blog" }
        ]}
        slides={[
          {
            image: "/images/formation-tech.png",
            title: "Blog & Actualités",
            subtitle: "Conseils, actualités et success stories pour votre développement professionnel",
            buttons: [
              { label: "Lire les articles", href: "#articles", icon: <BookOpen className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/formation-agriculture.png",
            title: "Restez Informés",
            subtitle: "Découvrez nos dernières publications et tendances",
            buttons: [
              { label: "Explorer", href: "#articles", icon: <Lightbulb className="h-5 w-5" /> }
            ]
          }
        ]}
      />

      <div className="container mx-auto px-8 lg:px-16 py-12">
        {/* Recherche et filtres */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Recherche */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 text-lg border-2 border-slate-200 focus:border-cpu-orange"
              />
            </div>
          </div>

          {/* Catégories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                variant="ghost"
                className={`rounded-xl transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-cpu-orange text-white shadow-lg"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {category.label}
                <Badge className="ml-2 bg-white/20 text-inherit border-0">{category.count}</Badge>
              </Button>
            ))}
          </div>
        </div>

        {/* Articles à la une */}
        {selectedCategory === "all" && !searchTerm && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-br from-cpu-orange to-orange-600 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900">À la une</h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <Card
                  key={article.id}
                  className="group overflow-hidden border-2 border-slate-100 hover:border-cpu-orange transition-all duration-500 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Image */}
                  <div className="relative h-64 bg-gradient-to-br from-cpu-orange/20 to-blue-500/20 overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-20 h-20 text-cpu-orange/40" />
                    </div>
                    <Badge className="absolute top-4 left-4 bg-cpu-orange text-white border-0 backdrop-blur-sm">
                      {categories.find((c) => c.id === article.categorie)?.label}
                    </Badge>
                  </div>

                  {/* Contenu */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-cpu-orange transition-colors">
                      {article.titre}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-3">{article.extrait}</p>

                    <div className="flex items-center gap-4 text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">
                      <span className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {article.auteur}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {article.datePublication}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.vues}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {article.commentaires}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {article.tempsLecture} min
                        </span>
                      </div>
                    </div>

                    <Button className="w-full mt-4 bg-cpu-orange hover:bg-orange-600 text-white" asChild>
                      <Link href={`/blog/${article.slug}`}>
                        Lire l'article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Autres articles */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">
              {searchTerm ? "Résultats de recherche" : "Derniers articles"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => (
              <Card
                key={article.id}
                className="group overflow-hidden border-2 border-slate-100 hover:border-cpu-orange transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-slate-400" />
                  </div>
                  <Badge className="absolute top-4 left-4 bg-white/90 text-slate-700 border-0 backdrop-blur-sm">
                    {categories.find((c) => c.id === article.categorie)?.label}
                  </Badge>
                </div>

                {/* Contenu */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-cpu-orange transition-colors">
                    {article.titre}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4 line-clamp-2">{article.extrait}</p>

                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-4 pb-4 border-b border-slate-100">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.datePublication}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.tempsLecture} min
                    </span>
                  </div>

                  <Button variant="outline" className="w-full hover:bg-cpu-orange hover:text-white hover:border-cpu-orange" asChild>
                    <Link href={`/blog/${article.slug}`}>
                      Lire plus
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <Card className="p-16 text-center border-2 border-slate-100">
              <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Aucun article trouvé</h3>
              <p className="text-slate-600 mb-6">
                Essayez avec d'autres mots-clés ou parcourez toutes les catégories
              </p>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="bg-cpu-orange hover:bg-orange-600 text-white"
              >
                Voir tous les articles
              </Button>
            </Card>
          )}
        </div>

        {/* Newsletter */}
        <Card className="mt-16 p-12 bg-gradient-to-r from-cpu-orange to-orange-600 text-white border-0">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex p-4 rounded-full bg-white/10 backdrop-blur-sm mb-6">
              <Award className="w-10 h-10" />
            </div>
            <h2 className="text-4xl font-bold mb-4">Ne manquez aucune actualité</h2>
            <p className="text-xl text-orange-100 mb-8">
              Recevez nos derniers articles, conseils et offres exclusives directement dans votre boîte mail
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <Input
                type="email"
                placeholder="Votre email..."
                className="flex-1 py-6 text-lg bg-white text-slate-900 border-0"
              />
              <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 text-lg whitespace-nowrap">
                S'abonner
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

