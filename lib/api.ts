/**
 * Client API centralisé - Point d'accès unique pour tous les appels API
 * 
 * Cette classe gère :
 * - La concaténation baseURL + endpoint
 * - Les headers (Content-Type, Authorization, etc.)
 * - La gestion des erreurs et réponses
 * - Le nettoyage des données
 * - Le refresh automatique des tokens
 * 
 * ✅ USAGE :
 *   import { apiClient } from '@/lib/api';
 *   
 *   // GET
 *   const formations = await apiClient.get('/api/formation/formations/public');
 *   
 *   // POST
 *   const result = await apiClient.post('/api/auth/login', { email, password });
 *   
 *   // PUT/PATCH
 *   const updated = await apiClient.put('/api/users/123', { name: 'New Name' });
 *   
 *   // DELETE
 *   await apiClient.delete('/api/users/123');
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG } from './api/config';
import { cleanObjectStrings } from './utils';
import { getFriendlyApiErrorMessage } from './api/error-messages';

/**
 * Instance Axios configurée pour l'API
 */
class ApiClient {
  private client: AxiosInstance;
  private refreshTokenPromise: Promise<string> | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Configuration des interceptors (requête/réponse)
   */
  private setupInterceptors() {
    // Request interceptor - Ajouter le token à chaque requête
    this.client.interceptors.request.use(
      (config) => {
        // Ajouter le token d'authentification s'il existe
        const token = this.getToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor - Nettoyer les données et gérer les erreurs
    this.client.interceptors.response.use(
      (response) => {
        // Nettoyer automatiquement les caractères spéciaux dans toutes les réponses
        if (response.data) {
          response.data = cleanObjectStrings(response.data);
        }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        // Si erreur 401 et qu'on n'a pas déjà essayé de rafraîchir
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // Rafraîchir le token
            const newToken = await this.refreshAccessToken();
            
            // Réessayer la requête originale avec le nouveau token
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            return this.client(originalRequest);
          } catch (refreshError) {
            // Si le refresh échoue, déconnecter l'utilisateur
            this.clearTokens();
            if (typeof window !== 'undefined') {
              window.location.href = '/connexion';
            }
            return Promise.reject(refreshError);
          }
        }

        // Pour les autres erreurs, les propager avec plus de contexte
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Récupérer le token d'accès
   */
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(API_CONFIG.TOKEN_KEY);
  }

  /**
   * Stockages des tokens
   */
  private setTokens(accessToken: string, refreshToken?: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(API_CONFIG.TOKEN_KEY, accessToken);
    if (refreshToken) {
      localStorage.setItem(API_CONFIG.REFRESH_TOKEN_KEY, refreshToken);
    }
  }

  /**
   * Effacer les tokens
   */
  private clearTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(API_CONFIG.TOKEN_KEY);
    localStorage.removeItem(API_CONFIG.REFRESH_TOKEN_KEY);
  }

  /**
   * Rafraîchir le token d'accès
   */
  private async refreshAccessToken(): Promise<string> {
    // Vérifier si on a déjà une requête en cours de refresh
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    const refreshToken = typeof window !== 'undefined' 
      ? localStorage.getItem(API_CONFIG.REFRESH_TOKEN_KEY)
      : null;

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    this.refreshTokenPromise = this.client
      .post<{ accessToken: string; refreshToken?: string }>('/api/auth/refresh', {
        refreshToken,
      })
      .then((response) => {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        this.setTokens(accessToken, newRefreshToken);
        return accessToken;
      })
      .catch((error) => {
        this.clearTokens();
        throw error;
      })
      .finally(() => {
        this.refreshTokenPromise = null;
      });

    return this.refreshTokenPromise;
  }

  /**
   * Gérer les erreurs API
   */
  private handleError(error: AxiosError): Error {
    const apiError = new Error(getFriendlyApiErrorMessage(error, 'default'));
    (apiError as any).status = error.response?.status;
    (apiError as any).response = error.response;
    (apiError as any).technicalMessage = (error.response?.data as any)?.message || error.message;
    (apiError as any).code = error.code;
    
    return apiError;
  }

  /**
   * GET - Récupérer des données
   */
  async get<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(endpoint, config);
    return response.data;
  }

  /**
   * POST - Créer une ressource
   */
  async post<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * PUT - Remplacer une ressource
   */
  async put<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * PATCH - Mettre à jour partiellement une ressource
   */
  async patch<T = any>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<T>(endpoint, data, config);
    return response.data;
  }

  /**
   * DELETE - Supprimer une ressource
   */
  async delete<T = any>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<T>(endpoint, config);
    return response.data;
  }

  /**
   * Méthodes publiques pour gérer les tokens
   */
  public saveTokens(accessToken: string, refreshToken?: string): void {
    this.setTokens(accessToken, refreshToken);
  }

  public removeTokens(): void {
    this.clearTokens();
  }

  public hasToken(): boolean {
    return !!this.getToken();
  }
}

/**
 * Instance unique du client API
 * Exportée pour usage dans les services
 */
export const apiClient = new ApiClient();

/**
 * Re-export pour faciliter l'import
 */
export { API_CONFIG } from './api/config';
