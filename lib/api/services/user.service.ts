import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import {
  User,
  CreateUserDto,
  UpdateUserDto,
  ApiResponse,
  PaginatedResponse,
} from '../types';

/**
 * Service des utilisateurs
 */
export const userService = {
  /**
   * Récupérer tous les utilisateurs
   */
  async getAll(params?: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
  }): Promise<PaginatedResponse<User>> {
    return apiClient.get<PaginatedResponse<User>>(
      API_ENDPOINTS.USERS.BASE,
      { params }
    );
  },

  /**
   * Récupérer un utilisateur par ID
   */
  async getById(id: string): Promise<ApiResponse<User>> {
    return apiClient.get<ApiResponse<User>>(
      API_ENDPOINTS.USERS.BY_ID(id)
    );
  },

  /**
   * Créer un utilisateur
   */
  async create(data: CreateUserDto): Promise<ApiResponse<User>> {
    return apiClient.post<ApiResponse<User>>(
      API_ENDPOINTS.USERS.BASE,
      data
    );
  },

  /**
   * Mettre à jour un utilisateur
   */
  async update(id: string, data: UpdateUserDto): Promise<ApiResponse<User>> {
    return apiClient.put<ApiResponse<User>>(
      API_ENDPOINTS.USERS.BY_ID(id),
      data
    );
  },

  /**
   * Supprimer un utilisateur
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<ApiResponse<void>>(
      API_ENDPOINTS.USERS.BY_ID(id)
    );
  },

  /**
   * Suspendre un utilisateur
   */
  async suspend(id: string): Promise<ApiResponse<User>> {
    return apiClient.patch<ApiResponse<User>>(
      `${API_ENDPOINTS.USERS.BY_ID(id)}/suspend`
    );
  },

  /**
   * Activer un utilisateur
   */
  async activate(id: string): Promise<ApiResponse<User>> {
    return apiClient.patch<ApiResponse<User>>(
      `${API_ENDPOINTS.USERS.BY_ID(id)}/activate`
    );
  },
};
