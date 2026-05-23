import { apiClient } from "@/lib/api";
import { API_ENDPOINTS } from "@/lib/api/config";

function parseTemoignagesList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (payload && typeof payload === "object") {
    const o = payload as Record<string, unknown>;
    if (Array.isArray(o.data)) return o.data;
    const nested = o.data as { data?: unknown } | undefined;
    if (nested && Array.isArray(nested.data)) return nested.data;
  }
  return [];
}

function formationIdFromTemoignage(raw: Record<string, unknown>): string {
  const formation = raw.formation;
  if (formation && typeof formation === "object") {
    const id = String((formation as { id?: string }).id ?? "").trim();
    if (id) return id;
  }
  return String(raw.formation_id ?? raw.formationId ?? "").trim();
}

/** Moyenne des notes témoignages publiés, par `formation_id`. */
export async function fetchAvgRatingByFormationId(): Promise<Record<string, number>> {
  try {
    const payload = await apiClient.get<unknown>(API_ENDPOINTS.TEMOIGNAGES.PUBLIC);
    const items = parseTemoignagesList(payload);
    const buckets = new Map<string, { sum: number; count: number }>();

    for (const item of items) {
      if (!item || typeof item !== "object") continue;
      const raw = item as Record<string, unknown>;
      if (raw.afficher === false || raw.afficher === 0) continue;
      const fid = formationIdFromTemoignage(raw);
      const note = Number(raw.note ?? raw.rating);
      if (!fid || !Number.isFinite(note) || note <= 0) continue;
      const prev = buckets.get(fid) ?? { sum: 0, count: 0 };
      buckets.set(fid, { sum: prev.sum + note, count: prev.count + 1 });
    }

    const out: Record<string, number> = {};
    for (const [fid, { sum, count }] of buckets) {
      if (count > 0) out[fid] = Math.round((sum / count) * 10) / 10;
    }
    return out;
  } catch {
    return {};
  }
}

let cachedRatings: Record<string, number> | null = null;
let cachePromise: Promise<Record<string, number>> | null = null;

/** Cache module pour éviter N appels sur une grille de cartes. */
export function loadFormationCardRatings(): Promise<Record<string, number>> {
  if (cachedRatings) return Promise.resolve(cachedRatings);
  if (!cachePromise) {
    cachePromise = fetchAvgRatingByFormationId().then((map) => {
      cachedRatings = map;
      return map;
    });
  }
  return cachePromise;
}
