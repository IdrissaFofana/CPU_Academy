"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageBanner } from "@/components/layout/PageBanner";
import { useFormationContent, useFormations } from "@/hooks/useFormations";
import {
  firstReplayUrl,
  formatWebinaireDate,
  isWebinaireFormation,
  mapApiFormationToWebinaire,
  programmeFromChapitres,
  ressourcesFromChapitres,
} from "@/lib/adapters/webinaire-adapter";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  Play,
  Share2,
  Sparkles,
  Users,
  Video,
} from "lucide-react";

type Tab = "apercu" | "programme" | "ressources";

export default function WebinairePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<Tab>("apercu");

  const { formations, isLoading, hasFetched } = useFormations({ limit: 400 });
  const source = useMemo(() => formations.find((f: any) => f.id === id && isWebinaireFormation(f)), [formations, id]);

  const webinaire = useMemo(() => (source ? mapApiFormationToWebinaire(source) : null), [source]);
  const { chapitres, isLoading: isContentLoading } = useFormationContent(webinaire?.id || "", Boolean(webinaire?.id));

  if ((isLoading || !hasFetched) && !webinaire) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (hasFetched && !webinaire) {
    notFound();
  }

  const programme = programmeFromChapitres(chapitres);
  const ressources = ressourcesFromChapitres(chapitres);
  const replayUrl = firstReplayUrl(chapitres) || webinaire!.replayUrl;
  const actionUrl = webinaire!.statut === "termine" ? replayUrl : webinaire!.liveUrl;

  return (
    <>
      <PageBanner
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Webinaires", href: "/webinaires" },
          { label: webinaire!.titre },
        ]}
        slides={[
          {
            image: webinaire!.thumbnail,
            title: webinaire!.titre,
            subtitle: webinaire!.description,
            trustBadges: [
              {
                icon: "users",
                color: "orange",
                title: `${webinaire!.inscrits} inscrits`,
                subtitle: webinaire!.publicCible,
              },
              {
                icon: "check",
                color: "green",
                title: webinaire!.gratuit ? "Gratuit" : `${webinaire!.prix} FCFA`,
                subtitle: "Tarif",
              },
              {
                icon: "users",
                color: "blue",
                title: `${webinaire!.dureeMinutes} min`,
                subtitle: "Duree",
              },
            ],
          },
        ]}
      />

      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl py-8">
          <Button asChild variant="ghost" className="mb-8">
            <Link href="/webinaires">
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour aux webinaires
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <Badge className={`${webinaire!.statut === "live" ? "bg-red-500 animate-pulse" : webinaire!.statut === "a-venir" ? "bg-blue-500" : "bg-green-600"} text-white border-0`}>
                  {webinaire!.statut === "live" ? <Sparkles className="w-3 h-3 mr-1" /> : webinaire!.statut === "a-venir" ? <Calendar className="w-3 h-3 mr-1" /> : <Play className="w-3 h-3 mr-1" />}
                  {webinaire!.statut === "live" ? "EN DIRECT" : webinaire!.statut === "a-venir" ? "A VENIR" : "REPLAY DISPONIBLE"}
                </Badge>
                <h1 className="text-4xl font-bold text-slate-900 mt-4 mb-4">{webinaire!.titre}</h1>
                <p className="text-xl text-slate-600">{webinaire!.description}</p>
              </div>

              <Card className="p-0 overflow-hidden">
                <div className="relative aspect-video bg-slate-900">
                  <img src={webinaire!.thumbnail} alt={webinaire!.titre} className="w-full h-full object-cover opacity-65" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {actionUrl ? (
                      <Button asChild size="lg" className={`${webinaire!.statut === "live" ? "bg-red-500 hover:bg-red-600" : "bg-cpu-orange hover:bg-cpu-orange/90"} text-white px-8 py-6 text-lg`}>
                        <a href={actionUrl} target="_blank" rel="noreferrer">
                          {webinaire!.statut === "termine" ? <Play className="w-6 h-6 mr-3" /> : <Video className="w-6 h-6 mr-3" />}
                          {webinaire!.statut === "termine" ? "Lire le replay" : "Rejoindre le live"}
                        </a>
                      </Button>
                    ) : (
                      <div className="text-center text-white/90">
                        <p className="font-semibold mb-2">Lien de session indisponible</p>
                        <p className="text-sm">Le contenu du cours est disponible dans les onglets ci-dessous.</p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>

              <div className="border-b border-slate-200">
                <div className="flex gap-6">
                  {[
                    { key: "apercu", label: "Apercu" },
                    { key: "programme", label: `Programme (${programme.length})` },
                    { key: "ressources", label: `Ressources (${ressources.length})` },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key as Tab)}
                      className={`pb-4 px-2 font-medium capitalize transition-colors ${
                        activeTab === tab.key ? "border-b-2 border-cpu-orange text-cpu-orange" : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {activeTab === "apercu" && (
                <Card className="p-6 space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">A propos du webinaire</h3>
                    <p className="text-slate-700">{webinaire!.publicCible}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Prerequis</h4>
                    <ul className="space-y-2">
                      {webinaire!.prerequis.map((prereq, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-slate-200">
                    <h4 className="text-xl font-bold text-slate-900 mb-3">Formateur</h4>
                    <p className="font-semibold text-slate-900">{webinaire!.formateur.nomComplet}</p>
                    <p className="text-slate-600 mb-1">Expert en {webinaire!.formateur.domaine}</p>
                    <p className="text-slate-700">{webinaire!.formateur.bio}</p>
                  </div>
                </Card>
              )}

              {activeTab === "programme" && (
                <Card className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Programme detaille</h3>
                  {isContentLoading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 3 }).map((_, idx) => (
                        <div key={idx} className="h-16 rounded-lg bg-slate-100 animate-pulse" />
                      ))}
                    </div>
                  ) : programme.length > 0 ? (
                    <div className="space-y-5">
                      {programme.map((section, idx) => (
                        <div key={section.id} className="border-l-4 border-cpu-orange pl-5">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-cpu-orange text-white flex items-center justify-center font-bold">{idx + 1}</div>
                            <div>
                              <p className="font-bold text-lg text-slate-900">{section.titre}</p>
                              <p className="text-slate-600 text-sm">{section.temps}</p>
                            </div>
                          </div>
                          <p className="text-slate-700">{section.description}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-600">Aucun chapitre detaille disponible pour ce webinaire.</p>
                  )}
                </Card>
              )}

              {activeTab === "ressources" && (
                <Card className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Ressources du cours</h3>
                  {ressources.length > 0 ? (
                    <div className="space-y-3">
                      {ressources.map((ressource) => (
                        <div key={ressource.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-900">{ressource.titre}</p>
                            <p className="text-sm text-slate-600 uppercase">{ressource.type}</p>
                          </div>
                          <Button asChild variant="outline" size="sm" className="hover:bg-cpu-orange hover:text-white">
                            <a href={ressource.url} target="_blank" rel="noreferrer">
                              {ressource.type === "pdf" ? <Download className="w-4 h-4 mr-2" /> : <ExternalLink className="w-4 h-4 mr-2" />}
                              Ouvrir
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-600">Aucune ressource n'est publiee pour ce webinaire.</p>
                  )}
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card className="p-6 sticky top-6">
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-slate-700">
                    <Calendar className="w-5 h-5 text-cpu-orange" />
                    <div>
                      <p className="text-sm text-slate-600">Date</p>
                      <p className="font-semibold">{formatWebinaireDate(webinaire!.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <Clock className="w-5 h-5 text-cpu-orange" />
                    <div>
                      <p className="text-sm text-slate-600">Duree</p>
                      <p className="font-semibold">{webinaire!.dureeMinutes} minutes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <Users className="w-5 h-5 text-cpu-orange" />
                    <div>
                      <p className="text-sm text-slate-600">Inscrits</p>
                      <p className="font-semibold">{webinaire!.inscrits} participants</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700">
                    <BookOpen className="w-5 h-5 text-cpu-orange" />
                    <div>
                      <p className="text-sm text-slate-600">Acces</p>
                      <p className="font-semibold">{webinaire!.gratuit ? "Gratuit" : `${webinaire!.prix} FCFA`}</p>
                    </div>
                  </div>
                </div>

                {actionUrl && (
                  <Button asChild className={`w-full mb-3 ${webinaire!.statut === "live" ? "bg-red-500 hover:bg-red-600 animate-pulse" : "bg-cpu-orange hover:bg-cpu-orange/90"} text-white`}>
                    <a href={actionUrl} target="_blank" rel="noreferrer">
                      {webinaire!.statut === "termine" ? <Play className="w-4 h-4 mr-2" /> : <Video className="w-4 h-4 mr-2" />}
                      {webinaire!.statut === "termine" ? "Voir le replay" : "Rejoindre la session"}
                    </a>
                  </Button>
                )}

                <Button variant="outline" className="w-full" onClick={() => navigator.share?.({ title: webinaire!.titre, url: window.location.href })}>
                  <Share2 className="w-4 h-4 mr-2" /> Partager
                </Button>
              </Card>

              <Card className="p-6">
                <h4 className="font-bold text-slate-900 mb-3">Thematiques</h4>
                <div className="flex flex-wrap gap-2">
                  {webinaire!.themes.map((theme) => (
                    <Badge key={theme} className="bg-cpu-orange text-white border-0">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
