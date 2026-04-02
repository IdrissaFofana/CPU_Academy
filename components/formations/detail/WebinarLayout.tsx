"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Radio,
  Clock,
  Users,
  Calendar,
  ChevronRight,
  Star,
  Play,
  Mic,
  CheckCircle,
  ArrowRight,
  Bell,
  Download,
  ChevronDown,
  Trophy,
  MessageSquare,
  Eye,
  BookOpen,
} from "lucide-react";
import { Formation, Review } from "@/types";
import { EnhancedFormationCard } from "@/components/catalogue/EnhancedFormationCard";
import { FormationInstructor } from "@/components/formations/FormationInstructor";
import { ReviewsStats } from "@/components/reviews/ReviewsStats";
import { ReviewsList } from "@/components/reviews/ReviewsList";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { useSimpleAuth } from "@/contexts/SimpleAuthContext";
import { participantService } from "@/lib/api/services";
import { getModeFallbackImage } from "@/lib/utils";

interface WebinarLayoutProps {
  formation: Formation;
  formationReviews: Review[];
  formationsSimilaires: Formation[];
}

type Tab = "apercu" | "programme" | "speaker" | "avis";

// Simple countdown hook
function useCountdown(targetDateString?: string) {
  const calcRemaining = useCallback(() => {
    if (!targetDateString) return null;
    const diff = new Date(targetDateString).getTime() - Date.now();
    if (diff <= 0) return null;
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    return { d, h, m, s };
  }, [targetDateString]);

  const [remaining, setRemaining] = useState(calcRemaining);

  useEffect(() => {
    const timer = setInterval(() => setRemaining(calcRemaining()), 1000);
    return () => clearInterval(timer);
  }, [calcRemaining]);

  return remaining;
}

export function WebinarLayout({
  formation,
  formationReviews,
  formationsSimilaires,
}: WebinarLayoutProps) {
  const [activeTab, setActiveTab] = useState<Tab>("apercu");
  const [openChapitres, setOpenChapitres] = useState<Set<string>>(new Set(["0"]));
  const { addItem, isInCart, removeItem } = useCart();
  const { addNotification } = useNotifications();
  const { isAuthenticated, user } = useSimpleAuth();
  const router = useRouter();
  const pathname = usePathname();
  const fallbackImage = getModeFallbackImage(formation.format, formation.modalite);
  const [cardImageSrc, setCardImageSrc] = useState<string>(formation.image || fallbackImage);

  // Try to get next session date from formation fields
  const nextDate = formation.datePublication; // best proxy for a live date
  const countdown = useCountdown(nextDate);
  const isPast = countdown === null && Boolean(nextDate);
  const isUpcoming = countdown !== null;

  const inCart = isInCart(formation.id.toString());

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
    if (!ensureAuth()) return;

    try {
      await participantService.create({
        formation_id: formation.id,
        user_id: user!.id,
        status: "pending",
      });

      addNotification({
        type: "success",
        titre: "Inscription confirmée !",
        message: `Vous êtes inscrit au webinaire "${formation.titre}".`,
        icon: "📡",
      });
    } catch (error: any) {
      const status = error?.response?.status;
      const message =
        status === 409
          ? "Vous êtes déjà inscrit à ce webinaire."
          : status === 401
          ? "Session expirée. Reconnectez-vous pour participer."
          : "Inscription impossible pour le moment.";

      addNotification({
        type: "warning",
        titre: "Inscription non finalisée",
        message,
        icon: "⚠️",
        link: status === 401 ? "/connexion" : undefined,
      });
    }
  };

  const handleAddToCart = () => {
    if (!ensureAuth()) return;
    addItem({
      id: formation.id.toString(),
      titre: formation.titre,
      categorie: formation.secteur || "Webinaire",
      duree: `${formation.duree}h`,
      prix: formation.prixMembre || 0,
      image: formation.image,
      certifiant: formation.certifiant || false,
      niveau: formation.niveau,
    });
    addNotification({
      type: "info",
      titre: "Webinaire ajouté au panier",
      message: `"${formation.titre}" a été ajouté à votre panier.`,
      icon: "🎙️",
      link: "/checkout",
    });
  };

  const handleRemoveFromCart = () => removeItem(formation.id.toString());

  const handleRegister = () => {
    handleParticipate();
  };

  const tabs = [
    { key: "apercu" as Tab, label: "Aperçu", icon: Eye, color: "text-orange-400", activeBg: "bg-gradient-to-r from-orange-500 to-red-500" },
    { key: "programme" as Tab, label: "Programme", icon: BookOpen, color: "text-orange-400", activeBg: "bg-gradient-to-r from-orange-500 to-red-500", count: formation.chapitres?.length },
    { key: "speaker" as Tab, label: "Intervenant", icon: Mic, color: "text-orange-400", activeBg: "bg-gradient-to-r from-orange-500 to-red-500" },
    { key: "avis" as Tab, label: "Avis", icon: Star, color: "text-orange-400", activeBg: "bg-gradient-to-r from-orange-500 to-red-500", count: formationReviews.length },
  ];

  const CountUnit = ({ val, label }: { val: number; label: string }) => (
    <div className="flex flex-col items-center">
      <div className="w-14 h-14 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center text-2xl font-mono font-bold text-white">
        {String(val).padStart(2, "0")}
      </div>
      <div className="text-[10px] text-orange-200 uppercase tracking-widest mt-1">{label}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950">
      {/* ── HERO — dark cinematic ── */}
      <div className="relative overflow-hidden">
        {/* Background image overlay */}
        {formation.image && (
          <div className="absolute inset-0">
            <Image src={formation.image} alt={formation.titre} fill className="object-cover opacity-10" />
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
        {/* Accent glow */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cpu-orange to-transparent" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-cpu-orange/5 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-10">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/catalogue" className="hover:text-white transition-colors">Catalogue</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300 truncate max-w-[180px]">{formation.titre}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left (3/5) */}
            <div className="lg:col-span-3">
              {/* Live badge */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-red-500/20 border border-red-500/40 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                  <span className="text-red-300 text-sm font-semibold uppercase tracking-wider">
                    {isPast ? "Replay disponible" : isUpcoming ? "À venir" : "Webinaire Live"}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-300 text-sm">
                  <Radio className="w-3.5 h-3.5 text-cpu-orange" />
                  Session en direct
                </div>
                {formation.certifiant && (
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/30 rounded-full text-amber-300 text-sm">
                    <Trophy className="w-3.5 h-3.5" /> Certifiant
                  </div>
                )}
              </div>

              <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-5 leading-tight tracking-tight">
                {formation.titre}
              </h1>
              <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                {formation.resume}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-5 text-sm text-slate-400 mb-8">
                {formation.notesMoyenne && (
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-medium text-white">{formation.notesMoyenne.toFixed(1)}</span>
                    <span>({formationReviews.length} avis)</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-cpu-orange" />
                  <span>{formation.nbInscrits?.toLocaleString() || "0"} participants</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-cpu-orange" />
                  <span>{formation.duree}h de session</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mic className="w-4 h-4 text-cpu-orange" />
                  <span>Interactif & Q&A</span>
                </div>
              </div>

              {/* Countdown */}
              {isUpcoming && countdown && (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-2">
                  <div className="flex items-center gap-2 text-orange-300 text-sm mb-4">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Prochain webinaire dans</span>
                  </div>
                  <div className="flex gap-3">
                    <CountUnit val={countdown.d} label="Jours" />
                    <div className="text-white/30 self-center text-2xl font-bold mb-4">:</div>
                    <CountUnit val={countdown.h} label="Heures" />
                    <div className="text-white/30 self-center text-2xl font-bold mb-4">:</div>
                    <CountUnit val={countdown.m} label="Min" />
                    <div className="text-white/30 self-center text-2xl font-bold mb-4">:</div>
                    <CountUnit val={countdown.s} label="Sec" />
                  </div>
                </div>
              )}

              {/* Replay banner */}
              {isPast && (
                <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 flex items-center gap-3">
                  <div className="p-2 bg-cpu-orange/20 rounded-lg">
                    <Play className="w-5 h-5 text-cpu-orange" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Replay disponible</div>
                    <div className="text-slate-400 text-xs">L'enregistrement est accessible aux inscrits</div>
                  </div>
                </div>
              )}
            </div>

            {/* Right (2/5): Registration card */}
            <div className="lg:col-span-2">
              <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl">
                {/* Top image / video */}
                <div className="relative aspect-video bg-black">
                  {cardImageSrc ? (
                    <Image
                      src={cardImageSrc}
                      alt={formation.titre}
                      fill
                      className="object-cover opacity-60"
                      onError={() => {
                        if (cardImageSrc !== fallbackImage) {
                          setCardImageSrc(fallbackImage);
                        } else {
                          setCardImageSrc("");
                        }
                      }}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Radio className="w-12 h-12 text-cpu-orange opacity-40" />
                    </div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-cpu-orange/90 flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Price */}
                  <div className="mb-5">
                    {formation.gratuit ? (
                      <div className="text-3xl font-extrabold text-green-400">Accès gratuit</div>
                    ) : (
                      <>
                        <div className="text-3xl font-extrabold text-white">
                          {formation.prixMembre?.toLocaleString()}{" "}
                          <span className="text-lg text-slate-400">FCFA</span>
                        </div>
                        {formation.prixPublic && (
                          <div className="text-sm text-slate-500 line-through mt-0.5">
                            {formation.prixPublic.toLocaleString()} FCFA
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="space-y-3">
                    {isPast ? (
                      <Button
                        onClick={handleAddToCart}
                        className="w-full bg-cpu-orange hover:bg-cpu-orange/90 text-white h-11 text-base font-bold"
                      >
                        <Play className="w-4 h-4 mr-2" /> Accéder au replay
                      </Button>
                    ) : (
                      <Button
                        onClick={handleRegister}
                        className="w-full bg-cpu-orange hover:bg-cpu-orange/90 text-white h-11 text-base font-bold"
                      >
                        <Bell className="w-4 h-4 mr-2" /> S'inscrire au webinaire
                      </Button>
                    )}
                    {!formation.gratuit && (
                      inCart ? (
                        <Button onClick={handleRemoveFromCart} variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 h-10">
                          Retirer du panier
                        </Button>
                      ) : (
                        <Button onClick={handleAddToCart} variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 h-10">
                          Ajouter au panier
                        </Button>
                      )
                    )}
                  </div>

                  {/* Info list */}
                  <div className="mt-5 pt-5 border-t border-slate-700 space-y-3">
                    {[
                      { icon: Radio, text: "100% en ligne, en direct" },
                      { icon: MessageSquare, text: "Session Q&A interactive" },
                      { icon: Download, text: "Supports de présentation inclus" },
                      { icon: Play, text: "Replay disponible après la session" },
                      ...(formation.certifiant
                        ? [{ icon: Trophy, text: "Attestation de participation" }]
                        : []),
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 text-sm text-slate-400">
                        <Icon className="w-4 h-4 text-cpu-orange flex-shrink-0" />
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

      {/* ── OBJECTIVES STRIP ── */}
      {formation.objectifs?.length > 0 && (
        <div className="bg-slate-900 border-y border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-lg font-bold text-white mb-6">Ce que vous allez apprendre</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formation.objectifs.map((obj, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-cpu-orange mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{obj}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TABS + CONTENT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tabs navbar */}
        <div className="mb-10">
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
                      ? `${t.activeBg} text-white border-transparent shadow-lg shadow-black/20 scale-[1.03]`
                      : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20 hover:shadow-md"
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : t.color}`} />
                  <span className="font-semibold text-sm whitespace-nowrap">{t.label}</span>
                  {t.count !== undefined && t.count > 0 && (
                    <span className={`inline-flex items-center justify-center min-w-[1.4rem] h-5 px-1.5 rounded-full text-xs font-bold ${isActive ? "bg-white/20 text-white" : "bg-white/10 text-slate-400 group-hover:bg-white/20"}`}>
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {/* APERCU */}
          {activeTab === "apercu" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                <section>
                  <h2 className="text-2xl font-bold text-white mb-3">Description</h2>
                  <p className="text-slate-300 leading-relaxed">{formation.description}</p>
                </section>

                {formation.prerequis?.length > 0 && (
                  <section>
                    <h3 className="text-xl font-bold text-white mb-4">Prérequis</h3>
                    <ul className="space-y-2">
                      {formation.prerequis.map((p, i) => (
                        <li key={i} className="flex items-start gap-2 text-slate-400">
                          <span className="text-cpu-orange mt-1">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {formation.livrables?.length > 0 && (
                  <section>
                    <h3 className="text-xl font-bold text-white mb-4">Ressources partagées</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {formation.livrables.map((l, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700">
                          <Download className="w-4 h-4 text-cpu-orange flex-shrink-0" />
                          <span className="text-sm text-slate-300">{l}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Right sidebar info */}
              <div>
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sticky top-24">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4">
                    Infos webinaire
                  </h3>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-2"><Clock className="w-4 h-4" /> Durée</span>
                      <span className="font-medium text-white">{formation.duree}h</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-2"><Users className="w-4 h-4" /> Participants</span>
                      <span className="font-medium text-white">{formation.nbInscrits?.toLocaleString() || "0"}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Niveau</span>
                      <span className="font-medium text-white">{formation.niveau}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500">Langue</span>
                      <span className="font-medium text-white">{formation.langue}</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-2"><MessageSquare className="w-4 h-4" /> Format</span>
                      <span className="font-medium text-white">Live + Q&A</span>
                    </li>
                  </ul>
                  <div className="mt-5 pt-5 border-t border-slate-800">
                    <Link href="/inscription" className="flex items-center gap-1 text-cpu-orange text-sm hover:underline">
                      Inscription groupe <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROGRAMME */}
          {activeTab === "programme" && (
            <div className="max-w-3xl space-y-4">
              {formation.chapitres && formation.chapitres.length > 0 ? (
                formation.chapitres.map((ch, idx) => {
                  const isOpen = openChapitres.has(String(idx));
                  return (
                    <div key={ch.id} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900">
                      <button
                        onClick={() => toggleChapitre(String(idx))}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-800 transition-colors text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-cpu-orange/20 text-cpu-orange text-xs font-bold flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <div>
                            <div className="font-semibold text-white text-sm">{ch.titre}</div>
                            <div className="text-xs text-slate-500">
                              {ch.lecons?.length || 0} segments · {ch.duree} min
                            </div>
                          </div>
                        </div>
                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      {isOpen && ch.lecons && (
                        <div className="divide-y divide-slate-800">
                          {ch.lecons.map((lecon) => (
                            <div key={lecon.id} className="flex items-center gap-3 px-4 py-3">
                              <Mic className="w-4 h-4 text-cpu-orange flex-shrink-0" />
                              <span className="flex-1 text-sm text-slate-300">{lecon.titre}</span>
                              {lecon.duree && (
                                <span className="text-xs text-slate-500">{lecon.duree}min</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-12 text-slate-500">
                  <Mic className="w-10 h-10 mx-auto mb-3 opacity-30" />
                  <p>Le programme sera dévoilé prochainement.</p>
                </div>
              )}
            </div>
          )}

          {/* SPEAKER */}
          {activeTab === "speaker" && formation.expert && (
            <div className="max-w-3xl">
              <FormationInstructor expert={formation.expert} />
            </div>
          )}

          {/* AVIS */}
          {activeTab === "avis" && (
            <div className="max-w-3xl space-y-8">
              {formationReviews.length > 0 ? (
                <>
                  <ReviewsStats reviews={formationReviews} />
                  <ReviewsList reviews={formationReviews} />
                  <div className="pt-8 border-t border-slate-800">
                    <ReviewForm formationId={formation.id} />
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center py-12">
                    <Star className="w-10 h-10 mx-auto mb-3 text-slate-700" />
                    <h3 className="text-lg font-semibold text-white mb-1">Pas encore d'avis</h3>
                    <p className="text-slate-500 text-sm">Soyez le premier à partager votre expérience.</p>
                  </div>
                  <ReviewForm formationId={formation.id} />
                </>
              )}
            </div>
          )}
        </div>

        {/* Webinaires similaires */}
        {formationsSimilaires.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-6">Webinaires similaires</h2>
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
