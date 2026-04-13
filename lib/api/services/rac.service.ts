import { apiClient } from "../client";
import { API_ENDPOINTS } from "../config";

export type RacMetierRequiredDocument = {
  id?: string;
  label: string;
  obligatoire?: boolean;
  formats?: string[] | null;
  tailleMax?: number | null;
  ordre?: number;
};

export type RacMetierPublic = {
  id: string;
  nom: string;
  description?: string | null;
  secteur: string;
  niveau: string;
  publication?: boolean;
  requiredDocuments?: RacMetierRequiredDocument[];
};

export type RacDossierDocumentJoint = {
  name: string;
  type: string;
  url: string;
};

export type CreateRacDossierPayload = {
  racMetierId: string;
  candidat: string;
  email: string;
  telephone: string;
  dateDepot: string;
  anneesExperience: number;
  documentsJoints: RacDossierDocumentJoint[];
};

export type RacDecisionFinale = "accepted" | "accepted_with_attention" | "rejected";

export type RacDossierStatut = "En attente" | "En évaluation" | "Validé" | "Rejeté";

export type RacDossier = {
  id: string;
  racMetierId: string;
  candidat: string;
  email: string;
  telephone: string;
  dateDepot: string;
  anneesExperience?: number;
  documentsJoints?: RacDossierDocumentJoint[];
  statut: RacDossierStatut;
  decisionFinale?: RacDecisionFinale | null;
  created_at?: string;
  updated_at?: string;
};

export type RacTimelineEvent = {
  id: string;
  racId: string;
  eventType: string;
  label: string;
  created_at?: string;
};

function extractArray<T>(response: unknown): T[] {
  if (Array.isArray(response)) return response as T[];
  if (response && typeof response === "object") {
    const root = response as { data?: unknown };
    if (Array.isArray(root.data)) return root.data as T[];
    if (root.data && typeof root.data === "object" && Array.isArray((root.data as { data?: unknown }).data)) {
      return (root.data as { data: T[] }).data;
    }
  }
  return [];
}

function extractObject<T>(response: unknown): T | null {
  if (response && typeof response === "object") {
    const root = response as { data?: unknown };
    if (root.data && typeof root.data === "object") {
      return root.data as T;
    }
    return response as T;
  }
  return null;
}

export const racService = {
  async getPublicMetiers(): Promise<RacMetierPublic[]> {
    const response = await apiClient.get<unknown>(API_ENDPOINTS.RAC.METIERS_PUBLIC);
    return extractArray<RacMetierPublic>(response);
  },

  async getMetierRequiredDocuments(metierId: string): Promise<RacMetierRequiredDocument[]> {
    const response = await apiClient.get<unknown>(API_ENDPOINTS.RAC.METIER_REQUIRED_DOCUMENTS(metierId));
    return extractArray<RacMetierRequiredDocument>(response);
  },

  async createDossier(payload: CreateRacDossierPayload): Promise<RacDossier | null> {
    const response = await apiClient.post<unknown>(API_ENDPOINTS.RAC.DOSSIERS, payload);
    return extractObject<RacDossier>(response);
  },

  async getDossiers(racMetierId?: string): Promise<RacDossier[]> {
    const response = await apiClient.get<unknown>(API_ENDPOINTS.RAC.DOSSIERS, {
      params: racMetierId ? { racMetierId } : undefined,
    });
    return extractArray<RacDossier>(response);
  },

  async getDossierById(dossierId: string): Promise<RacDossier | null> {
    const response = await apiClient.get<unknown>(API_ENDPOINTS.RAC.DOSSIER_BY_ID(dossierId));
    return extractObject<RacDossier>(response);
  },

  async getDossierTimeline(dossierId: string): Promise<RacTimelineEvent[]> {
    const response = await apiClient.get<unknown>(API_ENDPOINTS.RAC.DOSSIER_TIMELINE(dossierId));
    return extractArray<RacTimelineEvent>(response);
  },
};
