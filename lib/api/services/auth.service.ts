import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import {
  LoginDto,
  LoginResponse,
  RefreshTokenDto,
  RefreshTokenResponse,
  VerifyTokenDto,
  TokenPayload,
  Admin,
} from '../types';

/**
 * Service d'authentification
 */
export const authService = {
  /**
   * Connexion
   */
  async login(credentials: LoginDto): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    
    // Sauvegarder les tokens
    if (response.access_token && response.refresh_token) {
      apiClient.saveTokens(response.access_token, response.refresh_token);
    }
    
    return response;
  },

  /**
   * Déconnexion
   */
  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } finally {
      // Supprimer les tokens même si la requête échoue
      apiClient.removeTokens();
    }
  },

  /**
   * Rafraîchir le token
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await apiClient.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refresh_token: refreshToken }
    );
    
    // Sauvegarder les nouveaux tokens
    if (response.access_token && response.refresh_token) {
      apiClient.saveTokens(response.access_token, response.refresh_token);
    }
    
    return response;
  },

  /**
   * Vérifier la validité d'un token
   */
  async verifyToken(token: string): Promise<TokenPayload> {
    return apiClient.post<TokenPayload>(
      API_ENDPOINTS.AUTH.VERIFY_TOKEN,
      { token }
    );
  },

  /**
   * Récupérer le profil de l'utilisateur connecté
   */
  async getProfile(): Promise<Admin> {
    return apiClient.get<Admin>(API_ENDPOINTS.AUTH.PROFILE);
  },

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    return apiClient.hasToken();
  },
};
