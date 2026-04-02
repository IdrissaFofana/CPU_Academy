import type { Chapitre } from "@/types";
import { mapApiFormationToAppFormation } from "@/lib/adapters/formation-adapter";
import { cleanApiText, decodeHtmlEntities, getModeFallbackImage } from "@/lib/utils";

export type WebinaireStatus = "a-venir" | "live" | "termine";

export interface WebinaireResource {
  id: string;
  titre: string;
  type: "pdf" | "video" | "lien";
  url: string;
}

export interface WebinaireProgrammeItem {
  id: string;
  titre: string;
  description: string;
  temps: string;
}

export interface WebinaireViewModel {
  id: string;
  titre: string;
  description: string;
  secteur: string;
  themes: string[];
  statut: WebinaireStatus;
  mode: string;
  date: Date | null;
  dureeMinutes: number;
  inscrits: number;
  gratuit: boolean;
  prix: number;
  prixMembre?: number;
  thumbnail: string;
  publicCible: string;
  prerequis: string[];
  formateur: {
    nomComplet: string;
    bio: string;
    domaine: string;
  };
  liveUrl?: string;
  replayUrl?: string;
  raw: any;
}

function parseDate(value: unknown): Date | null {
  if (!value) return null;

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value;
  }

  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }

  if (typeof value === "object") {
    const maybe = value as Record<string, unknown>;
    const inner = maybe.date || maybe.value || maybe.iso || maybe.timestamp;
    if (typeof inner === "string" || typeof inner === "number") {
      const d = new Date(inner);
      return Number.isNaN(d.getTime()) ? null : d;
    }
  }

  return null;
}

function normalizeUrl(value: unknown): string {
  const cleaned = cleanApiText(typeof value === "string" ? value : "");
  if (!cleaned) return "";

  const decoded = decodeHtmlEntities(cleaned);
  if (/^https?:\/\//i.test(decoded)) return decoded;
  if (decoded.startsWith("//")) return `https:${decoded}`;
  if (decoded.startsWith("www.")) return `https://${decoded}`;

  return decoded;
}

export function isWebinaireFormation(raw: any): boolean {
  const mode = (raw?.mode || raw?.format || raw?.modalite || "").toString().toLowerCase();
  return mode.includes("webinaire") || mode.includes("live");
}

export function getWebinaireStatus(raw: any): WebinaireStatus {
  const mode = (raw?.mode || "").toString().toLowerCase();
  const now = Date.now();
  const date = parseDate(raw?.date || raw?.startDate || raw?.created_at || raw?.updated_at);

  if (!date) {
    return mode.includes("live") ? "live" : "a-venir";
  }

  const diffMs = date.getTime() - now;
  const diffHours = Math.abs(diffMs) / (1000 * 60 * 60);

  if (diffMs > 0) return "a-venir";
  if (diffHours <= 3) return "live";
  return "termine";
}

function extractThemes(raw: any, secteur: string): string[] {
  const tags = Array.isArray(raw?.tags)
    ? raw.tags
    : typeof raw?.tags === "string"
    ? raw.tags.split(",")
    : [];

  const base = [
    ...tags,
    raw?.category?.name,
    raw?.category,
    raw?.module?.name,
    secteur,
  ]
    .map((v) => cleanApiText(v))
    .filter(Boolean);

  const unique = Array.from(new Set(base));
  return unique.length > 0 ? unique : ["Webinaire"];
}

export function mapApiFormationToWebinaire(raw: any): WebinaireViewModel {
  const formation = mapApiFormationToAppFormation(raw);
  const date = parseDate(raw?.date || raw?.startDate || raw?.created_at || raw?.updated_at);
  const statut = getWebinaireStatus(raw);

  const fallbackImage = getModeFallbackImage(raw?.mode || formation.format, raw?.mode || formation.modalite);
  const image = normalizeUrl(raw?.image || raw?.thumbnail || formation.image);
  const liveUrl = normalizeUrl(raw?.lien);
  const fileUrl = normalizeUrl(raw?.fichier);
  const resourceUrl = normalizeUrl(raw?.ressource);

  const fullName = `${formation.expert?.prenom || ""} ${formation.expert?.nom || ""}`.trim();

  return {
    id: formation.id,
    titre: formation.titre,
    description: formation.description || formation.resume || "Webinaire CPU Academy",
    secteur: formation.secteur || "Formation",
    themes: extractThemes(raw, formation.secteur || "Formation"),
    statut,
    mode: (raw?.mode || formation.modalite || "webinaire").toString(),
    date,
    dureeMinutes: Math.max(30, Math.round((Number(raw?.duration || formation.duree || 1) || 1) * 60)),
    inscrits: Number(raw?.totalStudents || raw?.nbInscrits || formation.nbInscrits || 0),
    gratuit: !raw?.isPaid || Number(raw?.price ?? formation.prixPublic ?? 0) <= 0,
    prix: Number(raw?.price ?? formation.prixPublic ?? 0),
    prixMembre: Number(raw?.price_member ?? formation.prixMembre ?? 0) || undefined,
    thumbnail: image || fallbackImage,
    publicCible: formation.resume || "Entrepreneurs, dirigeants de PME et porteurs de projet",
    prerequis: formation.prerequis || ["Aucun prerequis specifique"],
    formateur: {
      nomComplet: fullName || "Expert CPU Academy",
      bio: formation.expert?.bio || "Formateur CPU Academy",
      domaine: formation.expert?.domaines?.[0] || formation.secteur || "Formation professionnelle",
    },
    liveUrl: liveUrl || undefined,
    replayUrl: fileUrl || resourceUrl || liveUrl || undefined,
    raw,
  };
}

export function formatWebinaireDate(date: Date | null, withTime = true): string {
  if (!date) return "Date a confirmer";

  return new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
  }).format(date);
}

export function programmeFromChapitres(chapitres: Chapitre[]): WebinaireProgrammeItem[] {
  return chapitres.map((chapitre, index) => ({
    id: chapitre.id,
    titre: chapitre.titre,
    description: chapitre.description || "Contenu detaille du chapitre",
    temps: `${Math.max(10, chapitre.duree || 0)} min`,
  })).filter((item) => Boolean(item.titre));
}

function leconResourceFromUrl(id: string, titre: string, url: string, type: "pdf" | "video" | "lien"): WebinaireResource {
  return {
    id,
    titre: titre || "Ressource",
    type,
    url,
  };
}

export function ressourcesFromChapitres(chapitres: Chapitre[]): WebinaireResource[] {
  const resources: WebinaireResource[] = [];

  chapitres.forEach((chapitre) => {
    chapitre.lecons.forEach((lecon) => {
      const baseTitle = `${chapitre.titre} - ${lecon.titre}`;

      if (Array.isArray(lecon.ressources)) {
        lecon.ressources.forEach((res, idx) => {
          if (!res?.url) return;
          resources.push(
            leconResourceFromUrl(
              `${lecon.id}-res-${idx}`,
              cleanApiText(res.nom || baseTitle),
              res.url,
              res.type === "pdf" ? "pdf" : "lien"
            )
          );
        });
      }

      const contentUrl = normalizeUrl(lecon.videoUrl || lecon.contenu);
      if (contentUrl) {
        const type = lecon.type === "video" ? "video" : contentUrl.endsWith(".pdf") ? "pdf" : "lien";
        resources.push(
          leconResourceFromUrl(`${lecon.id}-content`, cleanApiText(baseTitle), contentUrl, type)
        );
      }
    });
  });

  return Array.from(new Map(resources.map((r) => [r.url, r])).values());
}

export function firstReplayUrl(chapitres: Chapitre[]): string | undefined {
  for (const chapitre of chapitres) {
    for (const lecon of chapitre.lecons) {
      const url = normalizeUrl(lecon.videoUrl || lecon.contenu);
      if (url) return url;
    }
  }
  return undefined;
}
