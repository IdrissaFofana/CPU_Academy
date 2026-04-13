import { apiClient } from "../client";
import { API_ENDPOINTS } from "../config";

export type ApiParcoursResponse = {
  success: boolean;
  data: any[];
};

export const parcoursService = {
  async getPublic(): Promise<any> {
    return await apiClient.get<any>(API_ENDPOINTS.PARCOURS.PUBLIC);
  },
};
