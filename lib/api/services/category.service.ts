import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import {
  Category,
  CreateCategoryDto,
  UpdateCategoryDto,
  ApiResponse,
} from '../types';

/**
 * Service des catégories
 */
export const categoryService = {
  /**
   * Récupérer toutes les catégories
   */
  async getAll(params?: {
    status?: string;
    parentId?: string;
  }): Promise<ApiResponse<Category[]>> {
    return apiClient.get<ApiResponse<Category[]>>(
      API_ENDPOINTS.CATEGORIES.BASE,
      { params }
    );
  },

  /**
   * Récupérer une catégorie par ID
   */
  async getById(id: string): Promise<ApiResponse<Category>> {
    return apiClient.get<ApiResponse<Category>>(
      API_ENDPOINTS.CATEGORIES.BY_ID(id)
    );
  },

  /**
   * Créer une catégorie
   */
  async create(data: CreateCategoryDto): Promise<ApiResponse<Category>> {
    return apiClient.post<ApiResponse<Category>>(
      API_ENDPOINTS.CATEGORIES.BASE,
      data
    );
  },

  /**
   * Mettre à jour une catégorie
   */
  async update(id: string, data: UpdateCategoryDto): Promise<ApiResponse<Category>> {
    return apiClient.put<ApiResponse<Category>>(
      API_ENDPOINTS.CATEGORIES.BY_ID(id),
      data
    );
  },

  /**
   * Supprimer une catégorie
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.CATEGORIES.BY_ID(id)
    );
  },

  /**
   * Réorganiser les catégories
   */
  async reorder(data: { id: string; order: number }[]): Promise<ApiResponse<void>> {
    return apiClient.patch<ApiResponse<void>>(
      `${API_ENDPOINTS.CATEGORIES.BASE}/reorder`,
      data
    );
  },
};
