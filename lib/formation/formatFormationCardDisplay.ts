import { mapApiNiveauToDisplayLabel } from "@/lib/formation/mapFormationNiveau";

/** Libellé durée pour les cartes catalogue (semaines si ≤ 52, sinon heures). */
export function formatFormationCardDuration(duree?: number | null): string {
  const n = Number(duree);
  if (!Number.isFinite(n) || n <= 0) return "—";
  if (n <= 52) return `${Math.round(n)} semaine${n > 1 ? "s" : ""}`;
  return `${Math.round(n)} h`;
}

export function formatFormationCardLocation(formation: {
  ville?: string | null;
  region?: string | null;
}): string {
  const ville = String(formation.ville ?? "").trim();
  const region = String(formation.region ?? "").trim();
  return ville || region || "Abidjan";
}

function pickPositiveNumber(...values: unknown[]): number {
  for (const value of values) {
    const n = Number(value);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return 0;
}

function nestedExpertRating(formation: Record<string, unknown>): number {
  for (const key of ["expert", "formateur", "instructor"]) {
    const nested = formation[key];
    if (!nested || typeof nested !== "object") continue;
    const r = (nested as Record<string, unknown>).notemoyenne ?? (nested as Record<string, unknown>).rating;
    const n = Number(r);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return 0;
}

function participantsCount(formation: Record<string, unknown>): number {
  const list = formation.participants;
  if (Array.isArray(list)) return list.length;
  const count = (formation._count as Record<string, unknown> | undefined)?.participants;
  return pickPositiveNumber(count);
}

export function resolveFormationCardRating(formation: Record<string, unknown>): number {
  return pickPositiveNumber(
    formation.notesMoyenne,
    formation.noteMoyenne,
    formation.note_moyenne,
    formation.notemoyenne,
    formation.averageRating,
    formation.avg_rating,
    formation.avgRating,
    formation.rating,
    nestedExpertRating(formation),
  );
}

function readNumericField(formation: Record<string, unknown>, keys: string[]): number | null {
  for (const key of keys) {
    if (!(key in formation)) continue;
    const n = Number(formation[key]);
    if (Number.isFinite(n) && n >= 0) return Math.round(n);
  }
  return null;
}

export function resolveFormationCardStudents(
  formation: Record<string, unknown>,
  sessionCounts?: Record<string, number>,
): number | null {
  const formationId = String(formation.id ?? formation._id ?? "").trim();

  const fromFormation = readNumericField(formation, [
    "nbInscrits",
    "nb_inscrits",
    "totalStudents",
    "total_students",
    "students",
    "inscrits",
    "participant_count",
    "participants_count",
    "participantCount",
    "participantsCount",
    "nb_participants",
    "nombreParticipants",
  ]);

  const fromList = participantsCount(formation);
  const fromSessions =
    formationId && sessionCounts && formationId in sessionCounts
      ? sessionCounts[formationId]
      : null;

  const expert = formation.expert ?? formation.formateur;
  let fromExpert: number | null = null;
  if (expert && typeof expert === "object") {
    const n = Number(
      (expert as Record<string, unknown>).nbApprenants ??
        (expert as Record<string, unknown>).totalStudents ??
        0,
    );
    if (Number.isFinite(n) && n > 0) fromExpert = Math.round(n);
  }

  const candidates = [fromFormation, fromList > 0 ? fromList : null, fromSessions, fromExpert].filter(
    (v): v is number => v != null && v >= 0,
  );

  if (candidates.length === 0) return null;
  return Math.max(...candidates);
}

/** Affichage note carte : valeur ou tiret si indisponible. */
export function formatFormationCardRatingLabel(formation: Record<string, unknown>): string {
  const rating = resolveFormationCardRating(formation);
  return rating > 0 ? rating.toFixed(1) : "—";
}

/** Affichage inscrits carte : nombre formaté (y compris 0) ou tiret si inconnu. */
export function formatFormationCardStudentsLabel(
  formation: Record<string, unknown>,
  sessionCounts?: Record<string, number> | null,
): string {
  const count = resolveFormationCardStudents(
    formation,
    sessionCounts ?? undefined,
  );
  if (count === null) return "—";
  return new Intl.NumberFormat("fr-FR").format(count);
}

export function resolveNiveauDisplayLabel(niveau?: string | null): string {
  if (!niveau?.trim()) return "Tous niveaux";
  return mapApiNiveauToDisplayLabel(niveau) || niveau;
}

export function niveauPillClass(niveau?: string | null): string {
  const key = (niveau ?? "").toLowerCase();
  if (key.includes("débutant") || key.includes("debutant") || key === "beginner") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
  if (key.includes("intermédiaire") || key.includes("intermediaire") || key === "intermediate") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }
  if (key.includes("avancé") || key.includes("avance") || key === "advanced" || key === "expert") {
    return "bg-amber-50 text-amber-800 border-amber-200";
  }
  return "bg-slate-50 text-slate-600 border-slate-200";
}

export function formatFormationCardPrice(amount: number, gratuit?: boolean): string {
  if (gratuit || amount <= 0) return "Gratuit";
  return `${new Intl.NumberFormat("fr-FR").format(amount)} FCFA`;
}
