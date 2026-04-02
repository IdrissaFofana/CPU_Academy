"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  MapPin,
  Clock,
  Users,
  Calendar,
  ChevronRight,
  Star,
  CheckCircle,
  Trophy,
  Coffee,
  Wifi,
  ChevronDown,
  Phone,
  Mail,
  ArrowRight,
  Download,
  Building2,
  ShieldCheck,
  Eye,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { Formation, Review, SessionPresentiel } from "@/types";
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

interface PresentielLayoutProps {
  formation: Formation;
  formationReviews: Review[];
  formationSessions: SessionPresentiel[];
  formationsSimilaires: Formation[];
}

type Tab = "apercu" | "sessions" | "programme" | "instructeur" | "avis";

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function SessionCard({
  session,
  onReserve,
}: {
  session: SessionPresentiel;
  onReserve?: () => void;
}) {
  const placesLeft = session.capacite - session.inscrits;
  const isFull = placesLeft <= 0;
  const isAlmostFull = placesLeft > 0 && placesLeft <= 5;

  return (
    <div className={`rounded-2xl border ${isFull ? "border-slate-200 bg-slate-50" : "border-green-100 bg-white"} p-5 shadow-sm`}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        {/* Date & location */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-green-600" />
            <span className="font-bold text-slate-900">
              {formatDate(new Date(session.dateDebut))}
            </span>
          </div>
          <div className="text-sm text-slate-500 mb-2 ml-6">
            {new Date(session.dateDebut).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} →{" "}
            {new Date(session.dateFin).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} · {session.horaires}
          </div>

          {session.centre && (
            <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
              <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>
                <span className="font-medium">{session.centre.nom}</span> —{" "}
                {session.centre.adresse}, {session.centre.ville}
              </span>
            </div>
          )}

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {session.materielFourni?.map((m) => (
              <span key={m} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs border border-green-100">
                <CheckCircle className="w-3 h-3" /> {m}
              </span>
            ))}
            {session.restauration && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 text-xs border border-amber-100">
                <Coffee className="w-3 h-3" /> Restauration incluse
              </span>
            )}
          </div>
        </div>

        {/* Right: price + seats */}
        <div className="flex flex-col items-end gap-2 shrink-0">
          <div className="text-right">
            <div className="text-2xl font-extrabold text-slate-900">
              {session.prix.toLocaleString()} <span className="text-base font-normal text-slate-500">FCFA</span>
            </div>
          </div>

          {isFull ? (
            <span className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-500 text-sm font-medium">
              Complet
            </span>
          ) : (
            <Button onClick={onReserve} className="bg-green-600 hover:bg-green-700 text-white px-4 h-9 text-sm">
              Réserver ma place
            </Button>
          )}

          <span className={`text-xs font-medium ${isFull ? "text-slate-400" : isAlmostFull ? "text-red-500" : "text-green-600"}`}>
            {isFull
              ? "Toutes les places sont prises"
              : isAlmostFull
              ? `⚠ Plus que ${placesLeft} place${placesLeft > 1 ? "s" : ""} !`
              : `${placesLeft} places disponibles`}
          </span>
        </div>
      </div>
    </div>
  );
}

export function PresentielLayout({
  formation,
  formationReviews,
  formationSessions,
  formationsSimilaires,
}: PresentielLayoutProps) {
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
        titre: "Participation enregistrée",
        message: `Votre place pour "${formation.titre}" a été réservée.`,
        icon: "✅",
      });
    } catch (error: any) {
      const status = error?.response?.status;
      const message =
        status === 409
          ? "Vous êtes déjà inscrit à cette formation."
          : status === 401
          ? "Session expirée. Reconnectez-vous pour participer."
          : "Réservation impossible pour le moment.";

      addNotification({
        type: "warning",
        titre: "Participation non finalisée",
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
      categorie: formation.secteur || "Formation Présentiel",
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
      icon: "🏛️",
      link: "/checkout",
    });
  };

  const handleRemoveFromCart = () => removeItem(formation.id.toString());

  const tabs = [
    { key: "apercu" as Tab, label: "Aperçu", icon: Eye, color: "text-emerald-600", activeBg: "bg-gradient-to-r from-emerald-500 to-teal-500" },
    { key: "sessions" as Tab, label: "Sessions", icon: Calendar, color: "text-emerald-600", activeBg: "bg-gradient-to-r from-emerald-500 to-teal-500", count: formationSessions.length },
    { key: "programme" as Tab, label: "Programme", icon: BookOpen, color: "text-emerald-600", activeBg: "bg-gradient-to-r from-emerald-500 to-teal-500", count: formation.chapitres?.length },
    { key: "instructeur" as Tab, label: "Formateur", icon: GraduationCap, color: "text-emerald-600", activeBg: "bg-gradient-to-r from-emerald-500 to-teal-500" },
    { key: "avis" as Tab, label: "Avis", icon: Star, color: "text-emerald-600", activeBg: "bg-gradient-to-r from-emerald-500 to-teal-500", count: formationReviews.length },
  ];

  const nextSession = formationSessions.find(
    (s) => new Date(s.dateDebut) >= new Date()
  );

  return (
    <div className="min-h-screen bg-white">
      {/* ── HERO — warm professional green ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-800 via-slate-800 to-green-900">
        {/* BG image */}
        {formation.image && (
          <div className="absolute inset-0">
            <Image src={formation.image} alt={formation.titre} fill className="object-cover opacity-10" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent" />
        {/* Decorative line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-green-400 via-green-500 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-10">
            <Link href="/" className="hover:text-white transition-colors">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/catalogue" className="hover:text-white transition-colors">Catalogue</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-300 max-w-[180px] truncate">{formation.titre}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Left (3/5) */}
            <div className="lg:col-span-3">
              {/* Type badges */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/30 border border-green-500/40 rounded-full">
                  <Building2 className="w-3.5 h-3.5 text-green-300" />
                  <span className="text-green-200 text-sm font-semibold">En présentiel</span>
                </div>
                <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 text-sm">
                  {formation.format}
                </span>
                <span className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white/80 text-sm">
                  {formation.niveau}
                </span>
                {formation.certifiant && (
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-400/30 rounded-full text-amber-200 text-sm">
                    <Trophy className="w-3.5 h-3.5" /> Certifiant
                  </span>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                {formation.titre}
              </h1>
              <p className="text-slate-300 text-lg mb-7 leading-relaxed">{formation.resume}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-5 text-sm text-slate-400 mb-8">
                {formation.notesMoyenne && (
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-semibold text-white">{formation.notesMoyenne.toFixed(1)}</span>
                    <span>({formationReviews.length} avis)</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-green-400" />
                  <span>{formation.nbInscrits?.toLocaleString() || "0"} participants</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span>{formation.duree}h de formation</span>
                </div>
                {formation.ville && (
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span>{formation.ville}</span>
                  </div>
                )}
              </div>

              {/* Next session teaser */}
              {nextSession && (
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                  <div className="p-2.5 bg-green-600/30 rounded-lg flex-shrink-0">
                    <Calendar className="w-5 h-5 text-green-300" />
                  </div>
                  <div>
                    <div className="text-white font-semibold text-sm">Prochaine session</div>
                    <div className="text-slate-400 text-xs">{formatDate(new Date(nextSession.dateDebut))}</div>
                  </div>
                  <button
                    onClick={() => setActiveTab("sessions")}
                    className="ml-auto flex items-center gap-1 text-green-300 text-sm hover:text-green-200 transition-colors"
                  >
                    Voir les sessions <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Right (2/5): Booking card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Image */}
                <div className="relative aspect-video bg-slate-100">
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
                    <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-slate-100 flex items-center justify-center">
                      <Building2 className="w-12 h-12 text-green-400" />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  {/* Price */}
                  <div className="mb-4">
                    {formation.gratuit ? (
                      <div className="text-3xl font-extrabold text-green-600">Gratuit</div>
                    ) : (
                      <>
                        <div className="text-3xl font-extrabold text-slate-900">
                          {formation.prixMembre?.toLocaleString()}{" "}
                          <span className="text-lg font-normal text-slate-500">FCFA</span>
                        </div>
                        {formation.prixPublic && (
                          <div className="text-sm text-slate-400 line-through">
                            {formation.prixPublic.toLocaleString()} FCFA (non-membre)
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="space-y-2.5">
                    <Button
                      onClick={() => setActiveTab("sessions")}
                      className="w-full bg-green-600 hover:bg-green-700 text-white h-11 text-base font-bold"
                    >
                      <Calendar className="w-4 h-4 mr-2" /> Voir les sessions disponibles
                    </Button>
                    {inCart ? (
                      <Button onClick={handleRemoveFromCart} variant="outline" className="w-full h-10 border-slate-300 text-slate-600">
                        Retirer du panier
                      </Button>
                    ) : (
                      <Button onClick={handleAddToCart} variant="outline" className="w-full h-10 border-slate-300 text-slate-600">
                        Ajouter au panier
                      </Button>
                    )}
                  </div>

                  {/* Guarantees */}
                  <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
                    {[
                      { icon: Building2, text: "Salle équipée et climatisée" },
                      { icon: Wifi, text: "Wi-Fi haut débit inclus" },
                      { icon: Download, text: "Supports de cours fournis" },
                      { icon: ShieldCheck, text: "Formateur expert certifié" },
                      ...(formation.certifiant
                        ? [{ icon: Trophy, text: "Certificat de réussite" }]
                        : []),
                    ].map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2 text-sm text-slate-600">
                        <Icon className="w-4 h-4 text-green-600 flex-shrink-0" />
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

      {/* ── OBJECTIVES ── */}
      {formation.objectifs?.length > 0 && (
        <div className="bg-green-50 border-b border-green-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h2 className="text-xl font-bold text-green-900 mb-6">Ce que vous allez apprendre</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formation.objectifs.map((obj, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
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
                      ? `${t.activeBg} text-white border-transparent shadow-lg shadow-black/10 scale-[1.03]`
                      : "bg-white border-slate-100 text-slate-600 hover:bg-emerald-50 hover:border-emerald-200 hover:shadow-md"
                  }`}
                  aria-pressed={isActive}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110 ${isActive ? "text-white" : t.color}`} />
                  <span className="font-semibold text-sm whitespace-nowrap">{t.label}</span>
                  {t.count !== undefined && t.count > 0 && (
                    <span className={`inline-flex items-center justify-center min-w-[1.4rem] h-5 px-1.5 rounded-full text-xs font-bold ${isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-emerald-100"}`}>
                      {t.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
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
                          <span className="text-green-600 mt-1">•</span>
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
                        <div key={i} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border border-green-100">
                          <Download className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{l}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {formation.certifiant && (
                  <section className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-amber-100 rounded-xl flex-shrink-0">
                        <Trophy className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">Certification incluse</h3>
                        <p className="text-slate-600 text-sm">
                          À l'issue de cette formation, obtenez un certificat officiel CPU Formation
                          reconnu par les professionnels du secteur.
                        </p>
                        {formation.certificat && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {formation.certificat.criteres.quiz && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">Évaluation</span>
                            )}
                            {formation.certificat.criteres.devoir && (
                              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">Projet pratique</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </section>
                )}
              </div>
            )}

            {/* SESSIONS */}
            {activeTab === "sessions" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">Sessions disponibles</h2>
                  <p className="text-slate-500 text-sm mb-6">
                    Rejoignez une session dans l'un de nos centres équipés. Places limitées.
                  </p>
                </div>

                {formationSessions.length > 0 ? (
                  formationSessions.map((s) => (
                    <SessionCard key={s.id} session={s} onReserve={handleParticipate} />
                  ))
                ) : (
                  <div className="text-center py-14 bg-slate-50 rounded-2xl border border-slate-200">
                    <Calendar className="w-10 h-10 mx-auto mb-3 text-slate-300" />
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">
                      Aucune session planifiée
                    </h3>
                    <p className="text-slate-500 text-sm mb-5">
                      Inscrivez-vous à la liste d'attente pour être notifié à la prochaine ouverture.
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Rejoindre la liste d'attente
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* PROGRAMME */}
            {activeTab === "programme" && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm text-slate-600 pb-4 border-b border-slate-100">
                  <span>{formation.chapitres?.length || 0} modules</span>
                  <span>
                    {formation.chapitres?.reduce((a, c) => a + (c.lecons?.length || 0), 0) || 0} leçons
                  </span>
                  <span>{formation.duree}h de formation</span>
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
                            <span className="w-7 h-7 rounded-full bg-green-100 text-green-700 text-xs font-bold flex items-center justify-center flex-shrink-0">
                              {idx + 1}
                            </span>
                            <div>
                              <div className="font-semibold text-slate-900 text-sm">{ch.titre}</div>
                              <div className="text-xs text-slate-500">
                                {ch.lecons?.length || 0} leçons · {ch.duree} min
                              </div>
                            </div>
                          </div>
                          <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isOpen && ch.lecons && (
                          <div className="divide-y divide-slate-100">
                            {ch.lecons.map((lecon) => {
                              const icons: Record<string, string> = {
                                video: "▶", texte: "📄", quiz: "❓", devoir: "✏️", ressources: "📎",
                              };
                              return (
                                <div key={lecon.id} className="flex items-center gap-3 px-4 py-3">
                                  <span className="text-base w-5 text-center flex-shrink-0">{icons[lecon.type] || "▶"}</span>
                                  <span className="flex-1 text-sm text-slate-700">{lecon.titre}</span>
                                  {lecon.duree && (
                                    <span className="text-xs text-slate-400">{lecon.duree}min</span>
                                  )}
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
                    <p>Le programme sera disponible prochainement.</p>
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
                      <p className="text-slate-500 text-sm">Soyez le premier à partager votre retour !</p>
                    </div>
                    <ReviewForm formationId={formation.id} />
                  </>
                )}
              </div>
            )}
          </div>

          {/* Sticky sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-5">
              {/* Info card */}
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
                    <span className="text-slate-500 flex items-center gap-2"><Users className="w-4 h-4" /> Participants</span>
                    <span className="font-medium text-slate-800">{formation.nbInscrits?.toLocaleString()}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">Niveau</span>
                    <span className="font-medium text-slate-800">{formation.niveau}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500">Format</span>
                    <span className="font-medium text-slate-800">{formation.format}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-500 flex items-center gap-2"><MapPin className="w-4 h-4" /> Localisation</span>
                    <span className="font-medium text-slate-800">{formation.ville || formation.region || "Multi-sites"}</span>
                  </li>
                  {formationSessions.length > 0 && (
                    <li className="flex items-center justify-between">
                      <span className="text-slate-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Sessions</span>
                      <span className="font-medium text-green-700">{formationSessions.length} disponibles</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Contact */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="text-sm font-bold text-slate-700 mb-3">Une question ?</h3>
                <div className="space-y-2.5">
                  <a
                    href="tel:+22527203040"
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-green-700 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-green-600" />
                    +225 27 20 30 40 50
                  </a>
                  <a
                    href="mailto:formation@cpupme.com"
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-green-700 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-green-600" />
                    formation@cpupme.com
                  </a>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <Link href="/inscription" className="flex items-center gap-1 text-green-600 text-sm hover:underline font-medium">
                    Inscription entreprise <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Formations similaires */}
        {formationsSimilaires.length > 0 && (
          <div className="mt-16 pt-12 border-t border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Formations similaires</h2>
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
