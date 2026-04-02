"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Play,
  Clock,
  BookOpen,
  Trophy,
  Lock,
  ChevronDown,
  ChevronRight,
  Star,
  Users,
  CheckCircle,
  ArrowRight,
  Download,
  Shield,
  Zap,
  BarChart2,
  Eye,
  GraduationCap,
} from "lucide-react";
import { Formation, Review } from "@/types";
import { EnhancedFormationCard } from "@/components/catalogue/EnhancedFormationCard";
import { FormationInstructor } from "@/components/formations/FormationInstructor";
import { ReviewsStats } from "@/components/reviews/ReviewsStats";
import { ReviewsList } from "@/components/reviews/ReviewsList";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useSimpleAuth } from "@/contexts/SimpleAuthContext";
import { participantService } from "@/lib/api/services";
import { getModeFallbackImage } from "@/lib/utils";

interface ASonRythmeLayoutProps {
  formation: Formation;
  formationReviews: Review[];
  formationsSimilaires: Formation[];
}

type Tab = "apercu" | "programme" | "instructeur" | "avis";

export function ASonRythmeLayout({
  formation,
  formationReviews,
  formationsSimilaires,
}: ASonRythmeLayoutProps) {
  const [activeTab, setActiveTab] = useState<Tab>("apercu");
  const [openChapitres, setOpenChapitres] = useState<Set<string>>(new Set(["0"]));
  const { addItem, isInCart, removeItem } = useCart();
  const { addNotification } = useNotifications();
  const { isAuthenticated, user } = useSimpleAuth();
  const router = useRouter();
  const pathname = usePathname();
  const fallbackImage = getModeFallbackImage(formation.format, formation.modalite);
  const [cardImageSrc, setCardImageSrc] = useState<string>(formation.image || fallbackImage);

  const inCart = isInCart(formation.id.toString());

  const totalLecons =
    formation.chapitres?.reduce((acc, ch) => acc + (ch.lecons?.length || 0), 0) || 0;
  const totalDureeMin =
    formation.chapitres?.reduce(
      (acc, ch) =>
        acc + (ch.lecons?.reduce((a, l) => a + (l.duree || 0), 0) || 0),
      0
    ) || 0;

  const toggleChapitre = (id: string) => {
    setOpenChapitres((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const ensureAuth = () => {
    if (isAuthenticated) return true;
    const redirect = encodeURIComponent(pathname || `/formations/${formation.slug}`);
    router.push(`/connexion?redirect=${redirect}`);
    return false;
  };

  const handleParticipate = async () => {
    if (!ensureAuth()) return false;

    try {
      await participantService.create({
        formation_id: formation.id,
        user_id: user!.id,
        status: "pending",
      });

      addNotification({
        type: "success",
        titre: "Participation enregistrée",
        message: `Votre participation à "${formation.titre}" a été enregistrée.`,
        icon: "✅",
        link: `/formations/${formation.slug}/learn`,
      });
      return true;
    } catch (error: any) {
      const status = error?.response?.status;
      const message =
        status === 409
          ? "Vous êtes déjà inscrit à cette formation."
          : status === 401
          ? "Session expirée. Reconnectez-vous pour participer."
          : "Impossible d'enregistrer la participation pour le moment.";

      addNotification({
        type: "warning",
        titre: "Participation non enregistrée",
        message,
        icon: "⚠️",
        link: status === 401 ? "/connexion" : undefined,
      });
      return false;
    }
  };

  const handleAddToCart = () => {
    if (!ensureAuth()) return;
    addItem({
      id: formation.id.toString(),
      titre: formation.titre,
      categorie: formation.secteur || "Formation",
      duree: `${formation.duree}h`,
      prix: formation.prixMembre || 0,
      image: formation.image,
      certifiant: formation.certifiant || false,
      niveau: formation.niveau,
    });
    addNotification({
      type: "info",
      titre: "Formation ajoutée au panier",
      message: `"${formation.titre}" a été ajouté à votre panier.`,
      icon: "🛒",
      link: "/checkout",
    });
  };

  const handleRemoveFromCart = () => removeItem(formation.id.toString());

  const handleStart = async () => {
    const ok = await handleParticipate();
    if (ok) {
      router.push(`/formations/${formation.slug}/learn`);
    }
  };

  const tabs = [
    { key: "apercu" as Tab, label: "Aperçu", icon: Eye, color: "text-violet-600", activeBg: "bg-gradient-to-r from-violet-500 to-indigo-500" },
    { key: "programme" as Tab, label: "Programme", icon: BookOpen, color: "text-violet-600", activeBg: "bg-gradient-to-r from-violet-500 to-indigo-500", count: formation.chapitres?.length },
    { key: "instructeur" as Tab, label: "Instructeur", icon: GraduationCap, color: "text-violet-600", activeBg: "bg-gradient-to-r from-violet-500 to-indigo-500" },
    { key: "avis" as Tab, label: "Avis", icon: Star, color: "text-violet-600", activeBg: "bg-gradient-to-r from-violet-500 to-indigo-500", count: formationReviews.length },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-900 to-purple-900">
        {/* BG decorative blobs */}
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-[400px] h-[400px] rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-indigo-300 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/catalogue" className="hover:text-white transition-colors">Catalogue</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{formation.titre}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-sm font-medium">
                  <Zap className="w-3.5 h-3.5" /> À son rythme
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm">
                  {formation.niveau}
                </span>
                {formation.certifiant && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/30 border border-amber-400/40 text-amber-200 text-sm font-medium">
                    <Trophy className="w-3.5 h-3.5" /> Certifiant
                  </span>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                {formation.titre}
              </h1>
              <p className="text-indigo-200 text-lg mb-6 leading-relaxed">
                {formation.resume}
              </p>

              {/* Quick stats bar */}
              <div className="flex flex-wrap gap-6 text-sm text-indigo-200">
                {formation.notesMoyenne && (
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-white">{formation.notesMoyenne.toFixed(1)}</span>
                    <span>({formationReviews.length} avis)</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  <span>{formation.nbInscrits?.toLocaleString() || "0"} inscrits</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{formation.duree}h de contenu</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>{totalLecons} leçons</span>
                </div>
              </div>
            </div>

            {/* Right: Card CTA flottante */}
            <div className="lg:flex lg:justify-end">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full lg:max-w-sm">
                {/* Preview image */}
                <div className="relative aspect-video bg-indigo-100">
                  {cardImageSrc ? (
                    <Image
                      src={cardImageSrc}
                      alt={formation.titre}
                      fill
                      className="object-cover"
                      onError={() => {
                        if (cardImageSrc !== fallbackImage) {
                          setCardImageSrc(fallbackImage);
                        } else {
                          setCardImageSrc("");
                        }
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-200 to-purple-200 flex items-center justify-center">
                      <Play className="w-12 h-12 text-indigo-500" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-indigo-900/30 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-indigo-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-2.5 right-2.5 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                    Aperçu gratuit
                  </div>
                </div>

                <div className="p-5">
                  {/* Price */}
                  <div className="mb-4">
                    {formation.gratuit ? (
                      <div className="text-3xl font-extrabold text-green-600">Gratuit</div>
                    ) : (
                      <>
                        <div className="text-3xl font-extrabold text-slate-900">
                          {formation.prixMembre?.toLocaleString()} <span className="text-lg">FCFA</span>
                        </div>
                        {formation.prixPublic && (
                          <div className="text-sm text-slate-400 line-through">
                            {formation.prixPublic.toLocaleString()} FCFA (non-membre)
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="space-y-2.5">
                    {formation.gratuit ? (
                      <Button onClick={handleStart} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11 text-base font-semibold">
                          Commencer maintenant
                      </Button>
                    ) : inCart ? (
                      <Button onClick={handleRemoveFromCart} variant="outline" className="w-full h-11 text-base border-indigo-600 text-indigo-600">
                        Retirer du panier
                      </Button>
                    ) : (
                      <Button onClick={handleAddToCart} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11 text-base font-semibold">
                        Ajouter au panier
                      </Button>
                    )}
                    <Link href="/inscription">
                      <Button variant="outline" className="w-full h-11 text-sm">
                        Inscription entreprise
                      </Button>
                    </Link>
                  </div>

                  {/* Guarantees */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    {[
                      { icon: Shield, text: "Accès à vie" },
                      { icon: Download, text: "Ressources téléchargeables" },
                      { icon: BarChart2, text: "Suivi de progression" },
                      ...(formation.certifiant
                        ? [{ icon: Trophy, text: "Certificat de réussite" }]
                        : []),
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 text-sm text-slate-600">
                        <Icon className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                        {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── WHAT YOU'LL LEARN BANNER ── */}
      {formation.objectifs?.length > 0 && (
        <div className="bg-indigo-50 border-b border-indigo-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-xl font-bold text-indigo-900 mb-6">
              Ce que vous allez apprendre
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formation.objectifs.map((obj, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700 text-sm">{obj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs navbar */}
        <div className="mb-8">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((t) => {
              const Icon = t.icon;
              const isActive = activeTab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setActiveTab(t.key)}
                  className={`group flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl border-2 transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? `${t.activeBg} text-white border-transparent shadow-lg shadow-black/10 scale-[1.03]`
                      : "bg-white border-slate-100 text-slate-600 hover:bg-violet-50 hover:border-violet-200 hover:shadow-md"
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : t.color}`} />
                  <span className="font-semibold text-sm whitespace-nowrap">{t.label}</span>
                  {t.count !== undefined && t.count > 0 && (
                    <span className={`inline-flex items-center justify-center min-w-[1.4rem] h-5 px-1.5 rounded-full text-xs font-bold ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-violet-100"}`}>
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {/* APERCU */}
            {activeTab === "apercu" && (
              <div className="space-y-10">
                <section>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Description</h2>
                  <p className="text-slate-600 leading-relaxed">{formation.description}</p>
                </section>

                {formation.prerequis?.length > 0 && (
                  <section>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Prérequis</h3>
                    <ul className="space-y-2">
                      {formation.prerequis.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-600">
                          <span className="text-indigo-500 mt-1">•</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {formation.livrables?.length > 0 && (
                  <section>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">Ressources incluses</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {formation.livrables.map((l, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-indigo-50 rounded-xl border border-indigo-100">
                          <Download className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{l}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {formation.certifiant && (
                  <section className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-amber-100 rounded-xl">
                        <Trophy className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">
                          Certification incluse
                        </h3>
                        <p className="text-slate-600 text-sm">
                          À l'issue de cette formation, recevez un certificat de réussite
                          reconnu valeur sur le marché.
                        </p>
                        {formation.certificat && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {formation.certificat.criteres.quiz && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">Quiz final</span>
                            )}
                            {formation.certificat.criteres.devoir && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">Devoir pratique</span>
                            )}
                            {formation.certificat.criteres.noteMinimale && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                                Note min. {formation.certificat.criteres.noteMinimale}/100
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* PROGRAMME */}
            {activeTab === "programme" && (
              <div className="space-y-4">
                {/* Summary bar */}
                <div className="flex flex-wrap gap-6 text-sm text-slate-600 pb-4 border-b border-slate-100">
                  <span>{formation.chapitres?.length || 0} chapitres</span>
                  <span>{totalLecons} leçons</span>
                  <span>{Math.round(totalDureeMin / 60)}h {totalDureeMin % 60}min de contenu</span>
                </div>

                {formation.chapitres && formation.chapitres.length > 0 ? (
                  formation.chapitres.map((ch, idx) => {
                    const isOpen = openChapitres.has(String(idx));
                    return (
                      <div key={ch.id} className="border border-slate-200 rounded-xl overflow-hidden">
                        <button
                          onClick={() => toggleChapitre(String(idx))}
                          className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {idx + 1}
                            </span>
                            <div>
                              <div className="font-semibold text-slate-900 text-sm">{ch.titre}</div>
                              <div className="text-xs text-slate-500">
                                {ch.lecons?.length || 0} leçons · {ch.duree} min
                              </div>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        {isOpen && ch.lecons && (
                          <div className="divide-y divide-slate-100">
                            {ch.lecons.map((lecon, li) => {
                              const isFirst = li === 0 && idx === 0;
                              const iconMap: Record<string, string> = {
                                video: "▶",
                                texte: "📄",
                                quiz: "❓",
                                devoir: "✏️",
                                ressources: "📎",
                              };
                              return (
                                <div
                                  key={lecon.id}
                                  className="flex items-center gap-3 px-4 py-3"
                                >
                                  <span className="text-base w-5 text-center flex-shrink-0">
                                    {iconMap[lecon.type] || "▶"}
                                  </span>
                                  <span className="flex-1 text-sm text-slate-700">{lecon.titre}</span>
                                  <div className="flex items-center gap-2">
                                    {isFirst ? (
                                      <span className="text-xs text-indigo-600 font-medium">Gratuit</span>
                                    ) : (
                                      <Lock className="w-3.5 h-3.5 text-slate-300" />
                                    )}
                                    {lecon.duree && (
                                      <span className="text-xs text-slate-400">{lecon.duree}min</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-12 text-slate-400">
                    <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
                    <p>Le programme n'est pas encore disponible.</p>
                  </div>
                )}
              </div>
            )}

            {/* INSTRUCTEUR */}
            {activeTab === "instructeur" && formation.expert && (
              <FormationInstructor expert={formation.expert} />
            )}

            {/* AVIS */}
            {activeTab === "avis" && (
              <div className="space-y-8">
                {formationReviews.length > 0 ? (
                  <>
                    <ReviewsStats reviews={formationReviews} />
                    <ReviewsList reviews={formationReviews} />
                    <div className="pt-8 border-t border-slate-200">
                      <ReviewForm formationId={formation.id} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-center py-12">
                      <Star className="w-10 h-10 mx-auto mb-3 text-slate-200" />
                      <h3 className="text-lg font-semibold text-slate-700 mb-1">Pas encore d'avis</h3>
                      <p className="text-slate-500 text-sm">Soyez le premier à laisser un avis !</p>
                    </div>
                    <ReviewForm formationId={formation.id} />
                  </>
                )}
              </div>
            )}
          </div>

          {/* Sticky sidebar (desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Learning info card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-4">
                  Infos formation
                </h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Durée</span>
                    <span className="font-medium text-slate-800">{formation.duree}h</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2"><BookOpen className="w-4 h-4" /> Leçons</span>
                    <span className="font-medium text-slate-800">{totalLecons}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2"><BarChart2 className="w-4 h-4" /> Niveau</span>
                    <span className="font-medium text-slate-800">{formation.niveau}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">Langue</span>
                    <span className="font-medium text-slate-800">{formation.langue}</span>
                  </li>
                  {formation.certifiant && (
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-2"><Trophy className="w-4 h-4" /> Certifiant</span>
                      <span className="font-medium text-green-700">Oui</span>
                    </li>
                  )}
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2"><Shield className="w-4 h-4" /> Accès</span>
                    <span className="font-medium text-slate-800">À vie</span>
                  </li>
                </ul>
              </div>

              {/* Share / Save */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <p className="text-xs text-slate-500 text-center">
                  Vous êtes une entreprise ?{" "}
                  <Link href="/inscription" className="text-indigo-600 font-medium hover:underline">
                    Inscription groupe <ArrowRight className="w-3 h-3 inline" />
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formations similaires */}
        {formationsSimilaires.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Formations similaires
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {formationsSimilaires.map((f) => (
                <EnhancedFormationCard key={f.id} formation={f} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
