import { apiClient } from "../client";
import { API_ENDPOINTS } from "../config";

export const certificationService = {
  async getTypes(): Promise<any> {
    return apiClient.get(API_ENDPOINTS.CERTIFICATIONS.TYPES);
  },

  async verifyByCode(code: string): Promise<any> {
    return apiClient.get(API_ENDPOINTS.CERTIFICATIONS.VERIFY_BY_CODE(code));
  },
};
