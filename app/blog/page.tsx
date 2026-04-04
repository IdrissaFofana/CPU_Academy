"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { resolveBlogMediaUrl, useBlog, useBlogMediaMap } from "@/hooks/useBlog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Calendar,
  Clock,
  User,
  Search,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Tag,
  Eye,
  MessageCircle,
  Mail,
  X,
  PenLine,
  Layers,
} from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const { posts: apiPosts, loading, error } = useBlog();
  const mediaById = useBlogMediaMap();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Transform API posts to match UI structure
  const articles = useMemo(() => apiPosts.map((post) => ({
    id: post.id,
    titre: post.title,
    slug: post.slug,
    extrait: post.excerpt || post.content.substring(0, 150) + "...",
    categorie: post.categories[0]?.slug || "general",
    auteur: post.author?.name || "Inconnu",
    auteurBio: post.author?.bio || "",
    datePublication: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) : new Date(post.createdAt).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    tempsLecture: post.readingTime || Math.ceil(post.content.split(/\s+/).length / 200),
    imageUrl: resolveBlogMediaUrl(post.featuredImage, mediaById),
    vues: 0,
    commentaires: 0,
    featured: post.isFeatured || false,
  })), [apiPosts, mediaById]);

  // Build categories dynamically from posts
  const dynamicCategories = useMemo(() => {
    const catMap = new Map<string, number>();
    articles.forEach((a) => {
      const count = (catMap.get(a.categorie) || 0) + 1;
      catMap.set(a.categorie, count);
    });
    const cats = [
      { id: "all", label: "Tous les articles", count: articles.length },
      ...Array.from(catMap).map(([slug, count]) => ({
        id: slug,
        label: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, " "),
        count,
      })),
    ];
    return cats;
  }, [articles]);

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
    "Gestion d'entreprise",
    "Entrepreneuriat",
    "Digital",
    "Leadership",
    "Financement",
    "Success Stories",
    "E-learning",
    "RH & Management",
  ], []);

  // Articles populaires (par nombre de vues)
  const popularArticles = useMemo(() => 
    [...articles].sort((a, b) => b.vues - a.vues).slice(0, 3),
    [articles]
  );

  // Scroll reveal refs
  const cardsRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLElement>(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [newsletterVisible, setNewsletterVisible] = useState(false);

  useEffect(() => {
    const obs: IntersectionObserver[] = [];
    const watch = (el: HTMLElement | null, setter: (v: boolean) => void) => {
      if (!el) return;
      const o = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { setter(true); o.disconnect(); } },
        { threshold: 0.08 }
      );
      o.observe(el);
      obs.push(o);
    };
    watch(cardsRef.current, setCardsVisible);
    watch(sidebarRef.current, setSidebarVisible);
    watch(newsletterRef.current, setNewsletterVisible);
    return () => obs.forEach((o) => o.disconnect());
  }, []);

  // Re-trigger card animation on filter change
  useEffect(() => {
    setCardsVisible(false);
    const t = setTimeout(() => {
      if (cardsRef.current) {
        const rect = cardsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight) setCardsVisible(true);
      }
    }, 50);
    return () => clearTimeout(t);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero header ─────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 animate-fade-in">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-xl animate-fade-in-up">
              <div className="flex items-center gap-2 mb-4">
                <PenLine className="w-4 h-4 text-[#F17425]" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#F17425]">
                  Blog CPU Formation
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-[#212121] leading-tight mb-4">
                Des articles écrits par des experts terrain
              </h1>
              <p className="text-base text-gray-500 leading-relaxed">
                Guides pratiques, témoignages, analyses et conseils rédigés par nos formateurs et nos apprenants pour vous aider à progresser.
              </p>
            </div>

            {/* Statistiques blog */}
            <div className="flex items-center gap-6 lg:gap-8 shrink-0">
              <div className="text-center animate-fade-in-up animation-delay-200">
                <div className="text-2xl font-black text-[#212121]">{articles.length}</div>
                <div className="text-xs text-gray-400 mt-0.5 font-medium">Articles</div>
              </div>
              <div className="w-px h-10 bg-gray-200 animate-fade-in animation-delay-300" />
              <div className="text-center animate-fade-in-up animation-delay-300">
                <div className="text-2xl font-black text-[#212121]">
                  {new Set(articles.map((a) => a.auteur)).size}
                </div>
                <div className="text-xs text-gray-400 mt-0.5 font-medium">Auteurs</div>
              </div>
              <div className="w-px h-10 bg-gray-200 animate-fade-in animation-delay-400" />
              <div className="text-center animate-fade-in-up animation-delay-400">
                <div className="text-2xl font-black text-[#212121]">
                  {dynamicCategories.length - 1}
                </div>
                <div className="text-xs text-gray-400 mt-0.5 font-medium">Thématiques</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10">

        {/* ── Article à la une ──────────────────────────────────────────────── */}
        {heroArticle && !searchTerm && selectedCategory === "all" && (
          <section className="mb-14 animate-fade-in-up animation-delay-200">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-5 h-0.5 bg-[#F17425] rounded-full" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Article à la une
              </h2>
            </div>
            <Link href={`/blog/${heroArticle.slug}`} className="group block">
              <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#F17425] hover:shadow-xl transition-all duration-300">
                <div className="grid lg:grid-cols-2">
                  {/* Illustration zone */}
                  <div className="relative h-64 lg:h-auto bg-[#F17425]/5 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100 min-h-[280px]">
                    {heroArticle.imageUrl ? (
                      <img
                        src={heroArticle.imageUrl}
                        alt={heroArticle.titre}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <BookOpen className="w-20 h-20 text-[#F17425]/20" />
                    )}
                    <span className="absolute top-5 left-5 bg-[#F17425] text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wide">
                      {dynamicCategories.find((c) => c.id === heroArticle.categorie)?.label || heroArticle.categorie}
                    </span>
                    <div className="absolute bottom-5 left-5 flex items-center gap-2">
                      <span className="flex items-center gap-1 bg-white border border-gray-200 text-gray-500 text-xs px-2.5 py-1 rounded-full">
                        <Eye className="w-3 h-3" />
                        {heroArticle.vues.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 bg-white border border-gray-200 text-gray-500 text-xs px-2.5 py-1 rounded-full">
                        <MessageCircle className="w-3 h-3" />
                        {heroArticle.commentaires} commentaires
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    {/* Author line */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 rounded-full bg-[#F17425]/10 flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-[#F17425]" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#212121]">{heroArticle.auteur}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Calendar className="w-3 h-3" />
                          {heroArticle.datePublication}
                          <span className="text-gray-300">·</span>
                          <Clock className="w-3 h-3" />
                          {heroArticle.tempsLecture} min de lecture
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold text-[#212121] mb-4 leading-snug group-hover:text-[#F17425] transition-colors duration-200">
                      {heroArticle.titre}
                    </h3>

                    <p className="text-gray-500 leading-relaxed mb-8 text-sm">
                      {heroArticle.extrait}
                    </p>

                    <div className="flex items-center gap-2 text-[#F17425] font-semibold text-sm">
                      Lire l'article complet
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ── Recherche + filtres catégories ───────────────────────────────── */}
        <section className="mb-10 animate-fade-in animation-delay-300">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border-gray-200 focus:border-[#F17425] rounded-xl text-sm"
                suppressHydrationWarning
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Catégories en pills */}
            <div className="flex flex-wrap gap-2">
              {dynamicCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? "bg-[#F17425] text-white border-[#F17425]"
                      : "bg-white text-gray-600 border-gray-200 hover:border-[#F17425] hover:text-[#F17425]"
                  }`}
                >
                  {cat.label}
                  <span className={`ml-1.5 ${selectedCategory === cat.id ? "opacity-75" : "text-gray-400"}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Grille principale + sidebar ──────────────────────────────────── */}
        <div className="grid lg:grid-cols-[1fr_300px] gap-10">

          {/* Articles */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="w-5 h-0.5 bg-[#F17425] rounded-full" />
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                  {searchTerm || selectedCategory !== "all"
                    ? "Résultats"
                    : "Tous les articles"}
                </h2>
              </div>
              <span className="text-xs text-gray-400 font-medium">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
              </span>
            </div>

            {filteredArticles.length > 0 ? (
              <div ref={cardsRef} className="grid sm:grid-cols-2 gap-6">
                {filteredArticles.map((article, index) => (
                  <Link
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    className={`group block transition-all duration-300 ${cardsVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={cardsVisible ? { animationDelay: `${index * 80}ms`, animationFillMode: 'both' } : undefined}
                  >
                    <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#F17425] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                      {/* Illustration */}
                      <div className="h-40 bg-gray-50 flex items-center justify-center border-b border-gray-100">
                        {article.imageUrl ? (
                          <img
                            src={article.imageUrl}
                            alt={article.titre}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <BookOpen className="w-10 h-10 text-gray-200 group-hover:text-[#F17425]/25 transition-colors duration-300" />
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        {/* Category + reading time */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[11px] font-bold uppercase tracking-wide text-[#F17425]">
                            {article.categorie}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] text-gray-400">
                            <Clock className="w-3 h-3" />
                            {article.tempsLecture} min
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-[#212121] leading-snug mb-2 line-clamp-2 group-hover:text-[#F17425] transition-colors duration-200">
                          {article.titre}
                        </h3>

                        <p className="text-sm text-gray-500 leading-relaxed mb-5 line-clamp-2 flex-1">
                          {article.extrait}
                        </p>

                        {/* Author + stats */}
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                              <User className="w-3 h-3 text-gray-400" />
                            </div>
                            <span className="text-xs text-gray-500 font-medium truncate max-w-[100px]">
                              {article.auteur}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {article.vues.toLocaleString()}
                            </span>
                            <span className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              {article.commentaires}
                            </span>
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : loading ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-[#F17425] rounded-full animate-spin mx-auto" />
                <p className="text-sm text-gray-500 mt-4">Chargement des articles...</p>
              </div>
            ) : error ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
                <Search className="w-12 h-12 text-red-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#212121] mb-2">Erreur de chargement</h3>
                <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">{error}</p>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-16 text-center">
                <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-[#212121] mb-2">Aucun article trouvé</h3>
                <p className="text-sm text-gray-500 mb-6 max-w-xs mx-auto">
                  Essayez d'autres mots-clés ou explorez toutes les catégories.
                </p>
                <Button
                  size="sm"
                  onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
                  className="bg-[#F17425] hover:bg-[#d9651f] text-white"
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </section>

          {/* ── Sidebar ────────────────────────────────────────────────────── */}
          <aside ref={sidebarRef} className={`space-y-6 transition-all duration-700 ${sidebarVisible ? 'animate-fade-in-up' : 'opacity-0 translate-x-4'}`}>

            {/* Catégories rapides */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Layers className="w-4 h-4 text-[#F17425]" />
                <h3 className="text-sm font-bold text-[#212121] uppercase tracking-wide">Thématiques</h3>
              </div>
              <div className="space-y-1.5">
                {dynamicCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                      selectedCategory === cat.id
                        ? "bg-[#F17425] text-white"
                        : "text-gray-600 hover:bg-gray-50 hover:text-[#F17425]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`text-xs font-bold ${selectedCategory === cat.id ? "text-white/70" : "text-gray-400"}`}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Articles populaires */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-4 h-4 text-[#26A65B]" />
                <h3 className="text-sm font-bold text-[#212121] uppercase tracking-wide">Articles populaires</h3>
              </div>
              <div className="space-y-5">
                {popularArticles.map((article, index) => (
                  <Link
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    className="group flex items-start gap-3"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-black text-gray-400 group-hover:bg-[#F17425] group-hover:text-white transition-all duration-200">
                      {index + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#212121] line-clamp-2 group-hover:text-[#F17425] transition-colors duration-200 leading-snug mb-1">
                        {article.titre}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <Eye className="w-3 h-3" />
                        {article.vues.toLocaleString()} vues
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Tag className="w-4 h-4 text-gray-400" />
                <h3 className="text-sm font-bold text-[#212121] uppercase tracking-wide">Tags populaires</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium text-gray-600 border border-gray-200 bg-gray-50 px-2.5 py-1 rounded-full hover:border-[#F17425] hover:text-[#F17425] cursor-default transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* ── Newsletter ───────────────────────────────────────────────────── */}
        <section ref={newsletterRef} className={`mt-16 bg-white border border-gray-200 rounded-2xl p-10 lg:p-14 transition-all duration-700 ${newsletterVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-6'}`}>
          <div className="max-w-xl mx-auto text-center">
            <div className="w-12 h-12 bg-[#F17425]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Mail className="w-6 h-6 text-[#F17425]" />
            </div>
            <h2 className="text-2xl font-bold text-[#212121] mb-3">
              Recevez nos nouveaux articles
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Chaque semaine, nos formateurs publient un nouvel article. Recevez-les directement dans votre boîte mail — sans pub, sans bruit.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Input
                type="email"
                placeholder="votre@email.com"
                className="flex-1 border-gray-200 focus:border-[#F17425] rounded-xl py-2.5"
                suppressHydrationWarning
              />
              <Button
                type="submit"
                className="bg-[#F17425] hover:bg-[#d9651f] text-white font-semibold px-6 rounded-xl whitespace-nowrap"
              >
                S'abonner
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
            <p className="text-xs text-gray-400 mt-4">
              Vos données sont protégées. Désabonnement possible à tout moment.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}

