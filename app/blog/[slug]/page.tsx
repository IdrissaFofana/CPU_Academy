"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { resolveBlogMediaUrl, useBlog, useBlogMediaMap, useBlogPost } from "@/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  MessageCircle,
  User,
  BookOpen,
  ArrowRight,
  Mail,
  Tag,
  Share2,
  ChevronRight,
  Bookmark,
  ThumbsUp,
} from "lucide-react";

// ── Component ──────────────────────────────────────────────────────────────


export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";

  const { post, loading, error } = useBlogPost(slug);
  const { posts: allPosts } = useBlog();
  const mediaById = useBlogMediaMap();

  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [relatedVisible, setRelatedVisible] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && !post && slug) {
      router.replace("/blog");
    }
  }, [post, loading, slug, router]);

  // Fade in on mount
  useEffect(() => {
    const t = setTimeout(() => setContentVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Scroll reveal for related articles
  useEffect(() => {
    const el = relatedRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRelatedVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-[#F17425] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Chargement de l'article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#212121] mb-4">Article non trouvé</h2>
          <p className="text-gray-500 mb-6">Cet article n'existe pas ou a été supprimé.</p>
          <Link href="/blog">
            <Button className="bg-[#F17425] hover:bg-[#d9651f] text-white">
              Retour au blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Get related articles (same category)
  const relatedArticles = allPosts
    .filter((a) => 
      a.categories[0]?.slug === post.categories[0]?.slug && 
      a.id !== post.id
    )
    .slice(0, 2);

  const featuredMediaUrl = resolveBlogMediaUrl(post.featuredImage, mediaById);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Breadcrumb bar ──────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 animate-fade-in">
        <div className="container mx-auto px-4 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-[#F17425] transition-colors duration-200">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <Link href="/blog" className="hover:text-[#F17425] transition-colors duration-200">
              Blog
            </Link>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[#F17425] font-medium truncate max-w-[200px] sm:max-w-xs">
              {post.categories[0]?.name || "Général"}
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_300px] gap-10">

          {/* ── Article principal ──────────────────────────────────────── */}
          <main
            ref={contentRef}
            className={`transition-all duration-700 ${contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >

            {/* Header article */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6">

              {/* Illustration zone */}
              <div className="h-56 sm:h-72 bg-[#F17425]/5 flex items-center justify-center border-b border-gray-100 relative">
                {featuredMediaUrl ? (
                  <img
                    src={featuredMediaUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <BookOpen className="w-24 h-24 text-[#F17425]/15" />
                )}
                <span className="absolute top-5 left-5 bg-[#F17425] text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                  {post.categories[0]?.name || "Général"}
                </span>
              </div>

              <div className="p-6 sm:p-8 lg:p-10">

                {/* Back link */}
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#F17425] transition-colors duration-200 mb-6 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                  Retour au blog
                </Link>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#212121] leading-snug mb-5">
                  {post.title}
                </h1>

                {/* Excerpt */}
                <p className="text-gray-500 text-base leading-relaxed mb-7 border-l-4 border-[#F17425] pl-4">
                  {post.excerpt || post.content.substring(0, 200) + "..."}
                </p>

                {/* Meta bar */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pb-7 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#F17425]/10 flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-[#F17425]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#212121] leading-none mb-0.5">{post.author?.name}</p>
                      <p className="text-xs text-gray-400">Formateur CPU</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }) : new Date(post.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readingTime || Math.ceil(post.content.split(/\s+/).length / 200)} min de lecture
                  </div>
                </div>

                {/* Action bar */}
                <div className="flex items-center gap-3 pt-5">
                  <button
                    onClick={() => setLiked((v) => !v)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                      liked
                        ? "bg-[#F17425] text-white border-[#F17425]"
                        : "border-gray-200 text-gray-500 hover:border-[#F17425] hover:text-[#F17425]"
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    {liked ? "Apprécié" : "J'aime"}
                  </button>
                  <button
                    onClick={() => setBookmarked((v) => !v)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                      bookmarked
                        ? "bg-[#26A65B] text-white border-[#26A65B]"
                        : "border-gray-200 text-gray-500 hover:border-[#26A65B] hover:text-[#26A65B]"
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                    {bookmarked ? "Enregistré" : "Sauvegarder"}
                  </button>
                  <button
                      onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-500 hover:border-gray-400 text-sm font-medium transition-all duration-200 ml-auto"
                  >
                    <Share2 className="w-4 h-4" />
                    Partager
                  </button>
                </div>
              </div>
            </div>

            {/* Article body */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 lg:p-10 mb-6">
              <div
                className="prose prose-gray max-w-none
                  prose-headings:text-[#212121] prose-headings:font-bold
                  prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
                  prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
                  prose-ul:space-y-2 prose-ul:mb-4
                  prose-ol:space-y-2 prose-ol:mb-4
                  prose-li:text-gray-600
                  prose-strong:text-[#212121] prose-strong:font-semibold
                  prose-blockquote:border-l-4 prose-blockquote:border-[#F17425] prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-500"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Tags */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Tag className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-bold text-[#212121] uppercase tracking-wide">Tags</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag.id}
                    className="text-xs font-medium text-gray-600 border border-gray-200 bg-gray-50 px-3 py-1 rounded-full hover:border-[#F17425] hover:text-[#F17425] cursor-default transition-colors duration-200"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Author card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#F17425]/10 flex items-center justify-center shrink-0">
                  <User className="w-7 h-7 text-[#F17425]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#212121] mb-0.5">{post.author?.name}</p>
                  <p className="text-xs text-[#F17425] font-semibold mb-2">Formateur CPU Formation</p>
                  <p className="text-sm text-gray-500 leading-relaxed">{post.author?.bio}</p>
                </div>
              </div>
            </div>

          </main>

          {/* ── Sidebar ───────────────────────────────────────────────── */}
          <aside
            className={`space-y-6 transition-all duration-700 delay-200 ${contentVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
          >

            {/* Progress / Reading info */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-4 h-4 text-[#F17425]" />
                <span className="text-sm font-bold text-[#212121] uppercase tracking-wide">Cet article</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Temps de lecture</span>
                  <span className="font-semibold text-[#212121]">{post.readingTime || Math.ceil(post.content.split(/\s+/).length / 200)} min</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Vues</span>
                  <span className="font-semibold text-[#212121]">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Commentaires</span>
                  <span className="font-semibold text-[#212121]">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Publié le</span>
                  <span className="font-semibold text-[#212121]">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString("fr-FR") : new Date(post.createdAt).toLocaleDateString("fr-FR")}</span>
                </div>
              </div>
            </div>

            {/* Catégorie */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-bold text-[#212121] uppercase tracking-wide">Catégorie</span>
              </div>
              <Link
                href={`/blog`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#F17425]/10 text-[#F17425] text-sm font-semibold rounded-xl hover:bg-[#F17425] hover:text-white transition-all duration-200"
              >
                {post.categories[0]?.name || "Général"}
              </Link>
            </div>

            {/* CTA inscription */}
            <div className="bg-[#212121] rounded-2xl p-6 text-white">
              <div className="w-10 h-10 bg-[#F17425] rounded-xl flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-base mb-2 leading-snug">
                Prêt à vous former ?
              </h3>
              <p className="text-sm text-gray-300 mb-5 leading-relaxed">
                Découvrez nos formations et trouvez celle qui correspond à votre projet.
              </p>
              <Link href="/catalogue">
                <Button className="w-full bg-[#F17425] hover:bg-[#d9651f] text-white font-semibold text-sm rounded-xl">
                  Voir le catalogue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

          </aside>
        </div>

        {/* ── Articles similaires ────────────────────────────────────────── */}
        {relatedArticles.length > 0 && (
          <section
            ref={relatedRef}
            className={`mt-14 transition-all duration-700 ${relatedVisible ? "animate-fade-in-up" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-5 h-0.5 bg-[#F17425] rounded-full" />
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Articles similaires
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel, index) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className={`group block transition-all duration-500 ${relatedVisible ? "animate-fade-in-up" : "opacity-0"}`}
                  style={relatedVisible ? { animationDelay: `${index * 120}ms`, animationFillMode: "both" } : undefined}
                >
                  <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-[#F17425] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                    <div className="h-36 bg-[#F17425]/5 flex items-center justify-center border-b border-gray-100">
                      {resolveBlogMediaUrl(rel.featuredImage, mediaById) ? (
                        <img
                          src={resolveBlogMediaUrl(rel.featuredImage, mediaById) as string}
                          alt={rel.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <BookOpen className="w-8 h-8 text-[#F17425]/20 group-hover:text-[#F17425]/40 transition-colors duration-300" />
                      )}
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-[#F17425]">
                          {rel.categories[0]?.name || "Général"}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-gray-400">
                          <Clock className="w-3 h-3" />
                          {rel.readingTime || Math.ceil(rel.content.split(/\s+/).length / 200)} min
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#212121] leading-snug mb-2 line-clamp-2 group-hover:text-[#F17425] transition-colors duration-200 flex-1">
                        {rel.title}
                      </h3>
                      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                            <User className="w-3 h-3 text-gray-400" />
                          </div>
                          <span className="text-xs text-gray-500 font-medium">{rel.author?.name}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#F17425] group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Newsletter ──────────────────────────────────────────────────── */}
        <section className="mt-14 bg-white border border-gray-200 rounded-2xl p-10 lg:p-14 animate-fade-in-up animation-delay-400">
          <div className="max-w-xl mx-auto text-center">
            <div className="w-12 h-12 bg-[#F17425]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <Mail className="w-6 h-6 text-[#F17425]" />
            </div>
            <h2 className="text-2xl font-bold text-[#212121] mb-3">
              Recevez nos nouveaux articles
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Chaque semaine, nos formateurs publient un nouvel article. Recevez-les directement dans votre boîte mail.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-3">
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
