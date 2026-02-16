import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { API_CONFIG } from './config';
import { cleanObjectStrings } from '@/lib/utils';

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
   * Configuration des interceptors
   */
  private setupInterceptors() {
    // Request interceptor - Ajouter le token à chaque requête
    // ⚠️ TEMPORAIRE - Désactivé en attendant l'authentification frontend
    this.client.interceptors.request.use(
      (config) => {
        // const token = this.getToken();
        // if (token && config.headers) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
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

        // ⚠️ TEMPORAIRE - Auth désactivée pour le moment
        // L'authentification sera activée après la livraison du système frontend
        // Pour l'instant, on ne gère pas les erreurs 401
        
        // Si erreur 401 et qu'on n'a pas déjà essayé de rafraîchir
        // if (error.response?.status === 401 && !originalRequest._retry) {
        //   originalRequest._retry = true;

        //   try {
        //     // Rafraîchir le token
        //     const newToken = await this.refreshAccessToken();
            
        //     // Réessayer la requête originale avec le nouveau token
        //     if (originalRequest.headers) {
        //       originalRequest.headers.Authorization = `Bearer ${newToken}`;
        //     }
        //     return this.client(originalRequest);
        //   } catch (refreshError) {
        //     // Si le refresh échoue, déconnecter l'utilisateur
        //     this.clearTokens();
        //     if (typeof window !== 'undefined') {
        //       window.location.href = '/connexion';
        //     }
        //     return Promise.reject(refreshError);
        //   }
        // }

        return Promise.reject(error);
      }
    );
  }

  /**
   * Rafraîchir le token d'accès
   */
  private async refreshAccessToken(): Promise<string> {
    // Si un refresh est déjà en cours, attendre sa résolution
    if (this.refreshTokenPromise) {
      return this.refreshTokenPromise;
    }

    this.refreshTokenPromise = (async () => {
      try {
        const refreshToken = this.getRefreshToken();
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(
          `${API_CONFIG.BASE_URL}/api/auth/refresh`,
          { refresh_token: refreshToken }
        );

        const { access_token, refresh_token } = response.data;
        
        this.setToken(access_token);
        this.setRefreshToken(refresh_token);

        return access_token;
      } catch (error) {
        this.clearTokens();
        throw error;
      } finally {
        this.refreshTokenPromise = null;
      }
    })();

    return this.refreshTokenPromise;
  }

  /**
   * Récupérer le token d'accès
   */
  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(API_CONFIG.TOKEN_KEY);
  }

  /**
   * Récupérer le refresh token
   */
  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(API_CONFIG.REFRESH_TOKEN_KEY);
  }

  /**
   * Sauvegarder le token d'accès
   */
  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(API_CONFIG.TOKEN_KEY, token);
    }
  }

  /**
   * Sauvegarder le refresh token
   */
  private setRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(API_CONFIG.REFRESH_TOKEN_KEY, token);
    }
  }

  /**
   * Supprimer tous les tokens
   */
  private clearTokens(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(API_CONFIG.TOKEN_KEY);
      localStorage.removeItem(API_CONFIG.REFRESH_TOKEN_KEY);
    }
  }

  /**
   * Méthodes HTTP
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config);
    return response.data;
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config);
    return response.data;
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config);
    return response.data;
  }

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.patch(url, data, config);
    return response.data;
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config);
    return response.data;
  }

  /**
   * Méthodes publiques pour gérer les tokens
   */
  public saveTokens(accessToken: string, refreshToken: string): void {
    this.setToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  public removeTokens(): void {
    this.clearTokens();
  }

  public hasToken(): boolean {
    return !!this.getToken();
  }
}

// Export d'une instance unique
export const apiClient = new ApiClient();
