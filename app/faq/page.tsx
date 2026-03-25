"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { PageBanner } from "@/components/layout/PageBanner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFaqs } from "@/hooks/useFaqs";
import {
  Search,
  ChevronDown,
  HelpCircle,
  BookOpen,
  Send,
  CreditCard,
  GraduationCap,
  FileText,
  Users,
  Mail,
  Phone,
  MessageCircle,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Download,
  Video,
  Award,
  Clock,
} from "lucide-react";

function normalizeCategory(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function getCategoryMeta(category: string) {
  const normalized = normalizeCategory(category);

  if (normalized.includes("inscription")) {
    return {
      icon: FileText,
      buttonClass: "bg-green-600 text-white shadow-lg",
      idleClass: "bg-white text-slate-700 border-2 border-slate-200 hover:border-green-300",
      badgeClass: "bg-green-50 text-green-700 border-green-200",
      iconWrapClass: "bg-green-100",
      iconClass: "text-green-600",
    };
  }

  if (normalized.includes("paiement")) {
    return {
      icon: CreditCard,
      buttonClass: "bg-purple-600 text-white shadow-lg",
      idleClass: "bg-white text-slate-700 border-2 border-slate-200 hover:border-purple-300",
      badgeClass: "bg-purple-50 text-purple-700 border-purple-200",
      iconWrapClass: "bg-purple-100",
      iconClass: "text-purple-600",
    };
  }

  if (normalized.includes("certification")) {
    return {
      icon: BookOpen,
      buttonClass: "bg-blue-600 text-white shadow-lg",
      idleClass: "bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-300",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200",
      iconWrapClass: "bg-blue-100",
      iconClass: "text-blue-600",
    };
  }

  if (normalized.includes("entreprise")) {
    return {
      icon: Users,
      buttonClass: "bg-cyan-600 text-white shadow-lg",
      idleClass: "bg-white text-slate-700 border-2 border-slate-200 hover:border-cyan-300",
      badgeClass: "bg-cyan-50 text-cyan-700 border-cyan-200",
      iconWrapClass: "bg-cyan-100",
      iconClass: "text-cyan-600",
    };
  }

  if (normalized.includes("formation")) {
    return {
      icon: GraduationCap,
      buttonClass: "bg-orange-600 text-white shadow-lg",
      idleClass: "bg-white text-slate-700 border-2 border-slate-200 hover:border-orange-300",
      badgeClass: "bg-orange-50 text-orange-700 border-orange-200",
      iconWrapClass: "bg-orange-100",
      iconClass: "text-orange-600",
    };
  }

  return {
    icon: HelpCircle,
    buttonClass: "bg-slate-900 text-white shadow-lg",
    idleClass: "bg-white text-slate-700 border-2 border-slate-200 hover:border-slate-300",
    badgeClass: "bg-slate-100 text-slate-700 border-slate-200",
    iconWrapClass: "bg-slate-100",
    iconClass: "text-slate-600",
  };
}

export default function FAQPage() {
  const { faqs, categories, isLoading, error, recordView } = useFaqs();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  const categoryItems = useMemo(() => {
    return [
      {
        id: "all",
        label: "Toutes",
        icon: HelpCircle,
        buttonClass: "bg-cpu-orange text-white shadow-lg",
        idleClass: "bg-white text-slate-700 border-2 border-slate-200 hover:border-orange-300",
      },
      ...categories.map((category) => {
        const meta = getCategoryMeta(category);
        return {
          id: normalizeCategory(category),
          label: category,
          icon: meta.icon,
          buttonClass: meta.buttonClass,
          idleClass: meta.idleClass,
        };
      }),
    ];
  }, [categories]);

  const filteredFAQs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchCategory =
        selectedCategory === "all" || normalizeCategory(faq.categorie) === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.reponse.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.categorie.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [faqs, searchQuery, selectedCategory]);

  const stats = useMemo(
    () => [
      { icon: HelpCircle, value: `${faqs.length}+`, label: "Questions publiées", wrapClass: "bg-orange-100", iconClass: "text-orange-600" },
      { icon: MessageCircle, value: `${categories.length || 1}`, label: "Catégories actives", wrapClass: "bg-blue-100", iconClass: "text-blue-600" },
      { icon: BookOpen, value: `${filteredFAQs.length}`, label: "FAQ filtrées", wrapClass: "bg-green-100", iconClass: "text-green-600" },
      { icon: Users, value: "24/7", label: "Support disponible", wrapClass: "bg-purple-100", iconClass: "text-purple-600" },
    ],
    [categories.length, faqs.length, filteredFAQs.length]
  );

  const faqListRef = useRef<HTMLDivElement>(null);

  const toggleFAQ = (id: string) => {
    if (openFAQ !== id) {
      void recordView(id);
    }
    setOpenFAQ((current) => (current === id ? null : id));
  };

  const openFeaturedFAQ = (id: string) => {
    setSelectedCategory("all");
    setSearchQuery("");
    setOpenFAQ(id);
    void recordView(id);
    setTimeout(() => {
      faqListRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      <PageBanner
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "FAQ" },
        ]}
        slides={[
          {
            image: "/images/default-formation.jpg",
            title: "Foire aux Questions",
            subtitle: "Trouvez rapidement les réponses aux questions les plus fréquentes sur nos formations et services.",
            buttons: [
              { label: "Contacter le support", href: "/support", icon: <Send className="h-5 w-5" /> },
              { label: "Voir le catalogue", href: "/catalogue", variant: "outline", icon: <BookOpen className="h-5 w-5" /> },
            ],
          },
        ]}
      />

      <div className="min-h-screen bg-slate-50">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {error && (
            <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              Impossible de charger les FAQ depuis l'API.
            </div>
          )}

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 text-center border-2 border-slate-100 shadow-sm"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${stat.wrapClass} flex items-center justify-center`}>
                    <Icon className={`w-8 h-8 ${stat.iconClass}`} />
                  </div>
                  <div className="text-3xl font-bold mb-1 text-slate-900">{stat.value}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              );
            })}
          </div>

          {/* Featured Questions - visible only when browsing all with no search */}
          {!searchQuery && selectedCategory === "all" && faqs.length > 0 && (
            <div className="max-w-4xl mx-auto mb-10">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-5 text-center">
                Questions en vedette
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {faqs.slice(0, 3).map((faq) => {
                  const meta = getCategoryMeta(faq.categorie);
                  const FeatIcon = meta.icon;
                  return (
                    <button
                      key={faq.id}
                      onClick={() => openFeaturedFAQ(faq.id)}
                      className="text-left p-5 bg-white rounded-2xl border-2 border-slate-100 hover:border-orange-300 hover:shadow-md transition-all duration-200 group"
                    >
                      <div className={`w-9 h-9 rounded-xl ${meta.iconWrapClass} flex items-center justify-center mb-3`}>
                        <FeatIcon className={`w-5 h-5 ${meta.iconClass}`} />
                      </div>
                      <p className="font-semibold text-slate-800 text-sm mb-2 line-clamp-2 leading-snug">
                        {faq.question}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-2 mb-3">{faq.reponse}</p>
                      <span className="text-xs text-orange-600 font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Voir la réponse <ArrowRight className="w-3 h-3" />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <Input
                type="text"
                placeholder="Rechercher une question..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full pl-12 pr-12 py-6 text-lg border-2 border-slate-200 rounded-2xl focus:border-cpu-orange"
                suppressHydrationWarning
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer text-xl"
                >
                  ×
                </button>
              )}
            </div>
            <p className="text-center text-sm text-slate-500 mt-3">
              Recherchez par mot-clé, thème ou catégorie.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categoryItems.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    isActive ? category.buttonClass : category.idleClass
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>

          <div ref={faqListRef} className="max-w-4xl mx-auto">
            {isLoading && faqs.length === 0 ? (
              <div className="space-y-4">
                {[0, 1, 2, 3, 4].map((item) => (
                  <div key={item} className="bg-white rounded-2xl border-2 border-slate-100 p-6 animate-pulse">
                    <div className="h-5 w-3/4 bg-slate-200 rounded mb-4" />
                    <div className="h-4 w-full bg-slate-100 rounded mb-2" />
                    <div className="h-4 w-5/6 bg-slate-100 rounded" />
                  </div>
                ))}
              </div>
            ) : filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq) => {
                  const meta = getCategoryMeta(faq.categorie);
                  const Icon = meta.icon;

                  return (
                    <Card
                      key={faq.id}
                      className="overflow-hidden border-2 border-slate-100 hover:border-orange-200 transition-all duration-200"
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full p-6 flex items-start justify-between gap-4 text-left hover:bg-slate-50/70 transition-colors"
                      >
                        <div className="flex-grow">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <div className={`w-8 h-8 rounded-lg ${meta.iconWrapClass} flex items-center justify-center flex-shrink-0`}>
                              <Icon className={`w-5 h-5 ${meta.iconClass}`} />
                            </div>
                            <Badge variant="outline" className={`text-xs ${meta.badgeClass}`}>
                              {faq.categorie}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {faq.question}
                          </h3>
                        </div>
                        <ChevronDown
                          className={`w-6 h-6 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                            openFAQ === faq.id ? "rotate-180 text-cpu-orange" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          openFAQ === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="px-6 pb-6 pt-2">
                          <div className="pl-11 pr-10">
                            <div className="h-px bg-slate-200 mb-4" />
                            <p className="text-slate-700 leading-relaxed">{faq.reponse}</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <p className="text-xl text-slate-500 font-semibold mb-2">Aucune question trouvée</p>
                <p className="text-slate-400">Essayez de modifier votre recherche ou votre filtre.</p>
              </div>
            )}
          </div>

          {/* Tips Section */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-3xl p-8 border-2 border-orange-100">
              <h2 className="font-bold text-slate-900 mb-6 text-lg flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-white" />
                </span>
                Le saviez-vous ?
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {([
                  {
                    icon: Award,
                    text: "Les formations CPU sont éligibles au financement FDFP pour les salariés du secteur privé en Côte d'Ivoire.",
                    colorClass: "bg-orange-100 text-orange-600",
                  },
                  {
                    icon: CheckCircle,
                    text: "Vous obtenez une certification reconnue dès la validation de votre premier parcours de formation.",
                    colorClass: "bg-green-100 text-green-600",
                  },
                  {
                    icon: Clock,
                    text: "Nos formations en ligne sont accessibles 24h/24, 7j/7 depuis n'importe quel appareil connecté à internet.",
                    colorClass: "bg-blue-100 text-blue-600",
                  },
                  {
                    icon: Users,
                    text: "Plus de 20 000 apprenants ont déjà transformé leur carrière ou leur activité grâce aux parcours CPU Academy.",
                    colorClass: "bg-purple-100 text-purple-600",
                  },
                ] as Array<{ icon: React.ElementType; text: string; colorClass: string }>).map((tip, idx) => {
                  const TipIcon = tip.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-2xl p-4 shadow-sm">
                      <div
                        className={`w-8 h-8 rounded-lg ${tip.colorClass} flex items-center justify-center flex-shrink-0 mt-0.5`}
                      >
                        <TipIcon className="w-4 h-4" />
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">{tip.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Complementary Resources */}
          <div className="max-w-4xl mx-auto mt-10">
            <div className="text-center mb-7">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Ressources complémentaires</h2>
              <p className="text-slate-500">Approfondissez vos connaissances avec nos autres contenus</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {([
                {
                  href: "/catalogue",
                  icon: BookOpen,
                  title: "Catalogue",
                  desc: "Toutes nos formations disponibles",
                  from: "from-orange-500",
                  to: "to-orange-600",
                },
                {
                  href: "/ressources/guides",
                  icon: Download,
                  title: "Guides & Modèles",
                  desc: "Documents et templates gratuits",
                  from: "from-blue-500",
                  to: "to-blue-600",
                },
                {
                  href: "/ressources/webinaires",
                  icon: Video,
                  title: "Webinaires",
                  desc: "Sessions live et replays HD",
                  from: "from-purple-500",
                  to: "to-purple-600",
                },
                {
                  href: "/parcours",
                  icon: GraduationCap,
                  title: "Parcours",
                  desc: "Programmes certifiants complets",
                  from: "from-green-500",
                  to: "to-green-600",
                },
              ] as Array<{ href: string; icon: React.ElementType; title: string; desc: string; from: string; to: string }>).map(
                (item) => {
                  const ItemIcon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="group flex flex-col p-5 bg-white rounded-2xl border-2 border-slate-100 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                    >
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.from} ${item.to} flex items-center justify-center mb-3 shadow-md`}
                      >
                        <ItemIcon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1 text-sm">{item.title}</h3>
                      <p className="text-xs text-slate-500 flex-1">{item.desc}</p>
                      <span className="text-xs text-orange-600 font-medium mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explorer <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  );
                }
              )}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-white rounded-3xl p-8 md:p-12 border-2 border-slate-100 shadow-sm">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-cpu-orange flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                  Vous ne trouvez pas la réponse ?
                </h2>
                <p className="text-lg text-slate-600">Notre équipe est là pour vous aider.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <a
                  href="mailto:contact@cpuformation.ci"
                  className="group flex flex-col items-center p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 hover:border-orange-300 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-3 group-hover:bg-orange-500 transition-colors">
                    <Mail className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                  <p className="text-sm text-slate-600 text-center">contact@cpuformation.ci</p>
                </a>

                <a
                  href="tel:+22527000000"
                  className="group flex flex-col items-center p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 hover:border-blue-300 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-500 transition-colors">
                    <Phone className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Téléphone</h3>
                  <p className="text-sm text-slate-600 text-center">+225 27 XX XX XX XX</p>
                </a>

                <a
                  href="/support"
                  className="group flex flex-col items-center p-6 bg-slate-50 rounded-2xl border-2 border-slate-100 hover:border-green-300 transition-all duration-200"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-3 group-hover:bg-green-500 transition-colors">
                    <MessageCircle className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Support</h3>
                  <p className="text-sm text-slate-600 text-center">Écrivez-nous directement</p>
                </a>
              </div>

              <div className="text-center">
                <Button className="bg-cpu-orange hover:bg-orange-600 text-white" asChild>
                  <a href="/support">Contacter le support</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

