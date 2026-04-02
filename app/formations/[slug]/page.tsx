"use client";

import { use, useEffect, useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { reviewsMock } from "@/data/mock";
import { useFormationContent, useFormations } from "@/hooks/useFormations";
import { mapApiFormationToAppFormation } from "@/lib/adapters/formation-adapter";
import { ASonRythmeLayout } from "@/components/formations/detail/ASonRythmeLayout";
import { WebinarLayout } from "@/components/formations/detail/WebinarLayout";
import { PresentielLayout } from "@/components/formations/detail/PresentielLayout";
import { centreFormationService, sessionService } from "@/lib/api/services";
import type { CentreFormationApi, FormationSessionPublicApi } from "@/lib/api/types";
import type { CentreFormation, SessionPresentiel } from "@/types";

function mapCentreApiToApp(centre: CentreFormationApi): CentreFormation {
  return {
    id: centre.id,
    nom: centre.nom,
    adresse: centre.adresse || "Adresse non renseignee",
    ville: centre.ville || "Ville non renseignee",
    region: centre.ville || "Non renseignee",
    coordonnees: { lat: 0, lng: 0 },
    photos: [],
    horaires: "Horaires a confirmer",
    contact: {
      telephone: centre.telephone || "",
      email: centre.email || "",
    },
    formationsDisponibles: [],
    capacite: 0,
    equipements: [],
    parking: false,
    restauration: false,
  };
}

function normalizeSessionDate(...candidates: Array<string | Date | undefined>): Date {
  const valid = candidates.find((value) => {
    if (!value) return false;
    const date = new Date(value);
    return !Number.isNaN(date.getTime());
  });

  return valid ? new Date(valid) : new Date();
}

function mapSessionApiToApp(
  session: FormationSessionPublicApi,
  formationId: string,
  formationPrice: number,
  centresById: Record<string, CentreFormation>
): SessionPresentiel {
  const centreId =
    session.centreFormationId ||
    session.centre_formation_id ||
    session.centreFormation?.id ||
    "";

  const startDate = normalizeSessionDate(session.startDate, session.dateDebut, session.date_debut);
  const endDate = normalizeSessionDate(session.endDate, session.dateFin, session.date_fin, startDate);
  const capacite = Number(session.capaciteMax ?? session.capacite ?? 20);
  const inscrits = Number(session.inscrits ?? 0);

  return {
    id: session.id,
    formationId,
    centreId,
    centre: session.centreFormation
      ? mapCentreApiToApp(session.centreFormation)
      : centresById[centreId],
    dateDebut: startDate,
    dateFin: endDate,
    horaires: session.horaires || "09h00-17h00",
    capacite,
    inscrits,
    prix: Number(session.prix ?? session.price ?? formationPrice),
    materielFourni:
      Array.isArray(session.materielFourni) && session.materielFourni.length > 0
        ? session.materielFourni
        : ["Support pedagogique"],
    restauration: Boolean(session.restauration),
  };
}

function extractSessionList(raw: unknown): FormationSessionPublicApi[] {
  if (Array.isArray(raw)) return raw as FormationSessionPublicApi[];
  if (raw && typeof raw === "object") {
    const root = raw as { data?: unknown };
    if (Array.isArray(root.data)) return root.data as FormationSessionPublicApi[];
    if (
      root.data &&
      typeof root.data === "object" &&
      Array.isArray((root.data as { data?: unknown }).data)
    ) {
      return (root.data as { data: FormationSessionPublicApi[] }).data;
    }
  }
  return [];
}

export default function FormationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { formations, isLoading, hasFetched } = useFormations({ limit: 200 });
  const [apiSessions, setApiSessions] = useState<SessionPresentiel[]>([]);

  const formationsNormalized = useMemo(
    () => formations.map((item) => mapApiFormationToAppFormation(item)),
    [formations]
  );

  // Trouver la formation par slug
  const formation = formationsNormalized.find((f) => f.slug === slug);
  const { chapitres } = useFormationContent(formation?.id || "", Boolean(formation?.id));
  const formationWithContent = useMemo(
    () =>
      formation
        ? {
            ...formation,
            chapitres: chapitres.length > 0 ? chapitres : formation.chapitres,
          }
        : null,
    [formation, chapitres]
  );

  useEffect(() => {
    const currentFormation = formationWithContent;
    if (!currentFormation?.id) return;

    let mounted = true;

    const loadSessions = async () => {
      setApiSessions([]);
      try {
        const [sessionsRaw, centresRaw] = await Promise.all([
          sessionService.getPublic({ formationId: currentFormation.id }),
          centreFormationService.getAll(),
        ]);

        if (!mounted) return;

        const centresById = (Array.isArray(centresRaw) ? centresRaw : []).reduce<Record<string, CentreFormation>>(
          (acc, centre) => {
            acc[centre.id] = mapCentreApiToApp(centre);
            return acc;
          },
          {}
        );

        const sessionsList = extractSessionList(sessionsRaw);
        const mapped = sessionsList.map((session) =>
          mapSessionApiToApp(
            session,
            currentFormation.id,
            currentFormation.prixMembre || currentFormation.prixPublic || 0,
            centresById
          )
        );

        setApiSessions(mapped);
      } catch {
        if (!mounted) return;
        setApiSessions([]);
      }
    };

    loadSessions();

    return () => {
      mounted = false;
    };
  }, [formationWithContent]);

  if ((isLoading || !hasFetched) && !formation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  if (hasFetched && !formation) {
    notFound();
  }

  const f = formationWithContent!;

  // Reviews pour cette formation
  const formationReviews = reviewsMock.filter((r) => r.formationId === f.id);

  // Sessions présentielles pour cette formation
  const formationSessions = apiSessions;

  // Formations similaires (même secteur)
  const formationsSimilaires = formationsNormalized
    .filter((x) => x.id !== f.id && x.secteur === f.secteur)
    .slice(0, 3);

  // ─── Routing vers le bon layout selon le format ───
  if (f.format === "Live") {
    return (
      <WebinarLayout
        formation={f}
        formationReviews={formationReviews}
        formationsSimilaires={formationsSimilaires}
      />
    );
  }

  if (f.format === "Présentiel" || f.format === "Hybride") {
    return (
      <PresentielLayout
        formation={f}
        formationReviews={formationReviews}
        formationSessions={formationSessions}
        formationsSimilaires={formationsSimilaires}
      />
    );
  }

  // "Vidéo" = à son rythme (défaut)
  return (
    <ASonRythmeLayout
      formation={f}
      formationReviews={formationReviews}
      formationsSimilaires={formationsSimilaires}
    />
  );
}
