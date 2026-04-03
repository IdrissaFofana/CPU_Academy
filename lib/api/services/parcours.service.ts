import { apiClient } from "../client";
import { API_ENDPOINTS } from "../config";

export type ApiParcoursResponse = {
  success: boolean;
  data: any[];
};

export const parcoursService = {
  async getPublic(): Promise<ApiParcoursResponse> {
    // Swagger can expose either /public or base route depending on environment.
    try {
      return await apiClient.get<ApiParcoursResponse>(API_ENDPOINTS.PARCOURS.PUBLIC);
    } catch {
      return await apiClient.get<ApiParcoursResponse>(API_ENDPOINTS.PARCOURS.BASE);
    }
  },
};
