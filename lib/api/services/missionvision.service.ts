import { apiClient } from '../client';
import { ApiResponse } from '../types';
import { MissionVision } from '../types/missionvision.types';

/**
 * Service Mission/Vision - Page À propos
 */
export const missionVisionService = {
  /**
   * Récupérer les missions/visions actives pour le site web
   * Endpoint: GET /api/missionvision/for-site-web
   */
  async getForSiteWeb(): Promise<ApiResponse<MissionVision[]>> {
    const response = await apiClient.get<ApiResponse<ApiResponse<MissionVision[]>>>(
      '/api/missionvision/for-site-web'
    );
    // L'API retourne un double wrapping: { success, data: { success, data: [...] } }
    // On extrait le vrai tableau de données
    return {
      success: response.success,
      data: response.data?.data || [],
      message: response.message
    };
  },

  /**
   * Récupérer toutes les missions/visions
   * Endpoint: GET /api/missionvision
   */
  async getAll(activeOnly?: boolean): Promise<ApiResponse<MissionVision[]>> {
    return apiClient.get<ApiResponse<MissionVision[]>>(
      '/api/missionvision',
      { params: { activeOnly } }
    );
  },

  /**
   * Récupérer une mission/vision par ID
   * Endpoint: GET /api/missionvision/{id}
   */
  async getById(id: string): Promise<ApiResponse<MissionVision>> {
    return apiClient.get<ApiResponse<MissionVision>>(
      `/api/missionvision/${id}`
    );
  },
};
