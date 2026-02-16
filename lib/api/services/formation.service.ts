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
   * Récupérer toutes les formations
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
