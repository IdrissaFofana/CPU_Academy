import { mapApiFormationToAppFormation } from "@/lib/adapters/formation-adapter";
import type { Formation, Parcours } from "@/types";

type RawParcours = {
  id?: string;
  nom?: string;
  description?: string;
  formations?: any[];
  created_at?: unknown;
};

const PARCOURS_COLORS = [
  { color: "orange", gradient: "from-orange-500 to-orange-600" },
  { color: "blue", gradient: "from-blue-500 to-blue-600" },
  { color: "indigo", gradient: "from-indigo-500 to-indigo-600" },
  { color: "green", gradient: "from-green-500 to-green-600" },
  { color: "purple", gradient: "from-purple-500 to-purple-600" },
  { color: "cyan", gradient: "from-cyan-500 to-cyan-600" },
] as const;

export type ParcoursDetails = {
  id: string;
  titre: string;
  description: string;
  image: string;
  bestseller: boolean;
  niveau: "Débutant" | "Intermédiaire" | "Avancé";
  format: string;
  dureeTotal: number;
  nbInscrits: number;
  notesMoyenne: number;
  nbAvis: number;
  certifiant: boolean;
  prix: number;
  prixOriginal?: number;
  objectifs: string[];
  competences: string[];
  formations: Formation[];
  instructeur?: {
    nom: string;
    titre: string;
    photo?: string;
  };
  etapes: Array<{
    titre: string;
    duree: number;
    formations: string[];
  }>;
};

function normalizeArray(value: unknown): any[] {
  if (Array.isArray(value)) return value;
  return [];
}

function toNumber(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toIsoDate(value: unknown): string {
  if (typeof value === "string") {
    const date = new Date(value);
    if (!Number.isNaN(date.getTime())) return date.toISOString();
  }
  return new Date().toISOString();
}

function getDominantFormat(formations: Formation[]): string {
  const scores = formations.reduce<Record<string, number>>((acc, formation) => {
    const key = formation.format || "Hybride";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] || "Hybride";
}

function getDominantNiveau(formations: Formation[]): "Débutant" | "Intermédiaire" | "Avancé" {
  const levels = formations.map((formation) => formation.niveau);
  if (levels.includes("Avancé")) return "Avancé";
  if (levels.includes("Intermédiaire")) return "Intermédiaire";
  return "Débutant";
}

function getRelatedFormations(rawParcours: RawParcours): Formation[] {
  return normalizeArray(rawParcours.formations).map((item) => mapApiFormationToAppFormation(item));
}

export function buildParcoursFromApi(rawParcoursList: any[]): Parcours[] {
  return normalizeArray(rawParcoursList).map((rawItem, index) => {
    const rawParcours = (rawItem || {}) as RawParcours;
    const related = getRelatedFormations(rawParcours);
    const colorTheme = PARCOURS_COLORS[index % PARCOURS_COLORS.length];
    const totalDuree = related.reduce((sum, item) => sum + (item.duree || 0), 0);
    const totalInscrits = related.reduce((sum, item) => sum + (item.nbInscrits || 0), 0);
    const totalEvaluation = related.reduce((sum, item) => sum + (item.notesMoyenne || 0), 0);
    const totalPrixPublic = related.reduce((sum, item) => sum + toNumber(item.prixPublic), 0);
    const totalPrixMembre = related.reduce((sum, item) => sum + toNumber(item.prixMembre), 0);

    const competences = Array.from(
      new Set(related.flatMap((item) => (Array.isArray(item.competences) ? item.competences : [])))
    ).slice(0, 8);

    const niveaux = related.map((item) => item.niveau);
    const niveau = niveaux.includes("Avancé")
      ? "Avancé"
      : niveaux.includes("Intermédiaire")
      ? "Intermédiaire"
      : "Débutant";

    const parcours: Parcours = {
      id: rawParcours.id || `parcours-${index}`,
      titre: rawParcours.nom || `Parcours ${index + 1}`,
      slug: rawParcours.id || `parcours-${index}`,
      sousTitre: "Parcours métier",
      description: rawParcours.description || "Parcours professionnel dynamique",
      image: related.find((item) => Boolean(item.image))?.image || "/images/default-formation.jpg",
      icon: "target",
      color: colorTheme.color,
      gradient: colorTheme.gradient,
      objectifs: Array.from(new Set(related.flatMap((item) => item.objectifs || []))).slice(0, 6),
      publicCible: "Entrepreneurs, salariés et professionnels en évolution",
      competences: competences.length > 0 ? competences : ["Compétences métier", "Application pratique"],
      dureeTotal: Math.max(1, totalDuree),
      format: getDominantFormat(related) as Parcours["format"],
      niveau,
      formationsIds: related.map((item) => item.id),
      formations: related,
      certifiant: related.some((item) => item.certifiant),
      gratuit: related.every((item) => item.gratuit),
      prixPublic: totalPrixPublic,
      prixMembre: totalPrixMembre,
      nbInscrits: totalInscrits,
      notesMoyenne: Number(totalEvaluation.toFixed(1)),
      tauxCompletion: undefined,
      statut: "publié",
      dateCreation: toIsoDate(rawParcours.created_at),
      datePublication: undefined,
      nbAvis: Math.max(related.length * 4, Math.round(totalInscrits / 5)),
      nbInscritsMonth: Math.round(totalInscrits * 0.07),
      nbInscritsWeek: Math.round(totalInscrits * 0.015),
      instructeur: related[0]?.expert
        ? {
            nom: `${related[0].expert.prenom} ${related[0].expert.nom}`,
            titre: related[0].expert.bio || "Expert CPU",
            photo: related[0].expert.photo,
            specialite: related[0].expert.domaines?.[0],
          }
        : {
            nom: "Experts CPU",
            titre: "Formateurs certifiés",
          },
    };
    return parcours;
  });
}

export function buildParcoursDetailsFromApi(rawParcoursList: any[], parcoursId: string): ParcoursDetails | null {
  const rawParcours = normalizeArray(rawParcoursList).find((item) => item?.id === parcoursId) as RawParcours | undefined;
  if (!rawParcours) return null;

  const related = getRelatedFormations(rawParcours);
  if (related.length === 0) return null;

  const totalDuree = related.reduce((sum, item) => sum + (item.duree || 0), 0);
  const totalInscrits = related.reduce((sum, item) => sum + (item.nbInscrits || 0), 0);
  const totalEvaluation = related.reduce((sum, item) => sum + (item.notesMoyenne || 0), 0);

  const competences = Array.from(new Set(related.flatMap((item) => item.competences || []))).slice(0, 12);
  const objectifs = Array.from(new Set(related.flatMap((item) => item.objectifs || []))).slice(0, 8);

  const totalPrixPublic = related.reduce((sum, item) => sum + toNumber(item.prixPublic), 0);
  const totalPrixMembre = related.reduce((sum, item) => sum + toNumber(item.prixMembre), 0);
  const computedPrix = totalPrixMembre > 0 ? totalPrixMembre : totalPrixPublic;
  const computedPrixOriginal = totalPrixMembre > 0 && totalPrixPublic > totalPrixMembre ? totalPrixPublic : undefined;

  const etapes = related.slice(0, 5).map((formation, index) => ({
    titre: `Étape ${index + 1}: ${formation.titre}`,
    duree: formation.duree || 1,
    formations: (formation.modules || []).slice(0, 4).map((module) => module.titre),
  }));

  const firstExpert = related.find((formation) => formation.expert)?.expert;

  return {
    id: rawParcours.id || parcoursId,
    titre: rawParcours.nom || "Parcours",
    description: rawParcours.description || "Parcours professionnel dynamique",
    image: related.find((item) => Boolean(item.image))?.image || "/images/default-formation.jpg",
    bestseller: totalInscrits >= 1000,
    niveau: getDominantNiveau(related),
    format: getDominantFormat(related),
    dureeTotal: Math.max(1, totalDuree),
    nbInscrits: totalInscrits,
    notesMoyenne: Number(totalEvaluation.toFixed(1)),
    nbAvis: Math.max(related.length * 6, Math.round(totalInscrits / 4)),
    certifiant: related.some((item) => item.certifiant),
    prix: computedPrix,
    prixOriginal: computedPrixOriginal,
    objectifs: objectifs.length > 0 ? objectifs : ["Structurer un parcours métier concret", "Développer des compétences pratiques"],
    competences: competences.length > 0 ? competences : ["Gestion opérationnelle", "Leadership", "Exécution terrain"],
    formations: related,
    instructeur: firstExpert
      ? {
          nom: `${firstExpert.prenom} ${firstExpert.nom}`,
          titre: firstExpert.bio || "Expert CPU",
          photo: firstExpert.photo,
        }
      : undefined,
    etapes,
  };
}
