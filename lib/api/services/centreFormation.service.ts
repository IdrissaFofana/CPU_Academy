import { apiClient } from "../client";
import { API_ENDPOINTS } from "../config";
import {
  CentreFormationApi,
  CreateCentreFormationDto,
  UpdateCentreFormationDto,
} from "../types";

function extractCentres(raw: unknown): CentreFormationApi[] {
  if (Array.isArray(raw)) return raw as CentreFormationApi[];
  if (raw && typeof raw === "object") {
    const wrapped = raw as { data?: unknown };
    if (Array.isArray(wrapped.data)) return wrapped.data as CentreFormationApi[];
  }
  return [];
}

/**
 * Service des centres de formation
 */
export const centreFormationService = {
  /**
   * Liste des centres de formation
   */
  async getAll(): Promise<CentreFormationApi[]> {
    const response = await apiClient.get<
      CentreFormationApi[] | { success?: boolean; data?: CentreFormationApi[] }
    >(API_ENDPOINTS.CENTRE_FORMATIONS.BASE);

    return extractCentres(response);
  },

  /**
   * Détail d'un centre de formation
   */
  async getById(id: string): Promise<CentreFormationApi> {
    return apiClient.get<CentreFormationApi>(API_ENDPOINTS.CENTRE_FORMATIONS.BY_ID(id));
  },

  /**
   * Créer un centre (admin)
   */
  async create(data: CreateCentreFormationDto): Promise<CentreFormationApi> {
    return apiClient.post<CentreFormationApi>(API_ENDPOINTS.CENTRE_FORMATIONS.BASE, data);
  },

  /**
   * Mettre à jour un centre (admin)
   */
  async update(id: string, data: UpdateCentreFormationDto): Promise<CentreFormationApi> {
    return apiClient.put<CentreFormationApi>(API_ENDPOINTS.CENTRE_FORMATIONS.BY_ID(id), data);
  },

  /**
   * Supprimer un centre (admin)
   */
  async remove(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.CENTRE_FORMATIONS.BY_ID(id));
  },
};
