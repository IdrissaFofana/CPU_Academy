import { sessionService } from "@/lib/api/services/session.service";

function extractSessions(payload: unknown): Record<string, unknown>[] {
  if (Array.isArray(payload)) return payload as Record<string, unknown>[];
  if (payload && typeof payload === "object") {
    const root = payload as Record<string, unknown>;
    if (Array.isArray(root.data)) return root.data as Record<string, unknown>[];
    const nested = root.data as { data?: unknown } | undefined;
    if (nested && Array.isArray(nested.data)) return nested.data as Record<string, unknown>[];
  }
  return [];
}

/** Agrège les inscrits des sessions publiques par formation (API `sessions/public`). */
export async function fetchEnrollmentCountByFormationId(): Promise<Record<string, number>> {
  try {
    const raw = await sessionService.getPublic();
    const sessions = extractSessions(raw);
    const map = new Map<string, number>();

    for (const session of sessions) {
      const fid = String(
        session.formationId ?? session.formation_id ?? "",
      ).trim();
      if (!fid) continue;
      const n = Number(session.inscrits ?? session.registered ?? 0);
      if (!Number.isFinite(n) || n < 0) continue;
      map.set(fid, (map.get(fid) ?? 0) + Math.round(n));
    }

    return Object.fromEntries(map);
  } catch {
    return {};
  }
}

let cachedCounts: Record<string, number> | null = null;
let cachePromise: Promise<Record<string, number>> | null = null;

export function loadFormationCardEnrollmentCounts(): Promise<Record<string, number>> {
  if (cachedCounts) return Promise.resolve(cachedCounts);
  if (!cachePromise) {
    cachePromise = fetchEnrollmentCountByFormationId().then((map) => {
      cachedCounts = map;
      return map;
    });
  }
  return cachePromise;
}
