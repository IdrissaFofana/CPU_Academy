import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import {
  Formation,
  CreateFormationDto,
  UpdateFormationDto,
  ApiResponse,
  PaginatedResponse,
} from '../types';

/**
 * Service des formations
 */
export const formationService = {
  /**
   * Catalogue public des formations (avec filtres)
   */
  async getPublic(params?: {
    q?: string;
    category?: string;
    niveau?: string;
    mode?: string;
    isPaid?: string;
    priceMin?: string;
    priceMax?: string;
    sort?: string;
  }): Promise<{ success: boolean; data: Formation[] }> {
    return apiClient.get<{ success: boolean; data: Formation[] }>(
      API_ENDPOINTS.FORMATIONS.PUBLIC,
      { params }
    );
  },

  /**
   * Récupérer toutes les formations (admin)
   */
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    categoryId?: string;
    level?: string;
    status?: string;
    featured?: boolean;
  }): Promise<PaginatedResponse<Formation>> {
    return apiClient.get<PaginatedResponse<Formation>>(
      API_ENDPOINTS.FORMATIONS.BASE,
      { params }
    );
  },

  /**
   * Récupérer une formation par ID
   */
  async getById(id: string): Promise<ApiResponse<Formation>> {
    return apiClient.get<ApiResponse<Formation>>(
      API_ENDPOINTS.FORMATIONS.BY_ID(id)
    );
  },

  /**
   * Récupérer les chapitres d'une formation
   */
  async getChapitresByFormationId(formationId: string): Promise<any> {
    return apiClient.get(
      API_ENDPOINTS.CHAPITRES.BASE,
      { params: { formation_id: formationId } }
    );
  },

  /**
   * Récupérer les leçons d'un chapitre
   */
  async getLeconsByChapitreId(chapitreId: string): Promise<any> {
    return apiClient.get(
      API_ENDPOINTS.CHAPITRES.LECONS,
      { params: { chapitre_id: chapitreId } }
    );
  },

  /**
   * Créer une formation
   */
  async create(data: CreateFormationDto): Promise<ApiResponse<Formation>> {
    return apiClient.post<ApiResponse<Formation>>(
      API_ENDPOINTS.FORMATIONS.BASE,
      data
    );
  },

  /**
   * Mettre à jour une formation
   */
  async update(id: string, data: UpdateFormationDto): Promise<ApiResponse<Formation>> {
    return apiClient.put<ApiResponse<Formation>>(
      API_ENDPOINTS.FORMATIONS.BY_ID(id),
      data
    );
  },

  /**
   * Supprimer une formation
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.FORMATIONS.BY_ID(id)
    );
  },

  /**
   * Publier une formation
   */
  async publish(id: string): Promise<ApiResponse<Formation>> {
    return apiClient.patch<ApiResponse<Formation>>(
      `${API_ENDPOINTS.FORMATIONS.BY_ID(id)}/publish`
    );
  },

  /**
   * Archiver une formation
   */
  async archive(id: string): Promise<ApiResponse<Formation>> {
    return apiClient.patch<ApiResponse<Formation>>(
      `${API_ENDPOINTS.FORMATIONS.BY_ID(id)}/archive`
    );
  },
};
