import { apiClient } from "../client";
import { API_ENDPOINTS } from "../config";
import { FormationSessionPublicApi } from "../types";

/**
 * Service des sessions publiques de formation
 */
export const sessionService = {
  /**
   * Liste des sessions publiques (optionnellement filtrees par formation)
   */
  async getPublic(params?: { formationId?: string }): Promise<FormationSessionPublicApi[] | { data?: FormationSessionPublicApi[] }> {
    return apiClient.get<FormationSessionPublicApi[] | { data?: FormationSessionPublicApi[] }>(
      API_ENDPOINTS.SESSIONS.PUBLIC,
      { params }
    );
  },

  /**
   * Detail d'une session publique
   */
  async getPublicById(id: string): Promise<FormationSessionPublicApi> {
    return apiClient.get<FormationSessionPublicApi>(API_ENDPOINTS.SESSIONS.PUBLIC_BY_ID(id));
  },
};
