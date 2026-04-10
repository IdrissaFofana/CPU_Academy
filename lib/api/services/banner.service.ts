/**
 * Service pour les banners du site web
 */

import { apiClient } from '@/lib/api';

export interface Banner {
  id: string;
  title: string;
  description?: string;
  image: string;
  link?: string;
  buttonText?: string;
  position?: string;
  is_active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Service pour les banners
 */
export const bannerService = {
  /**
   * Récupérer les banners du site web
   * @param position - Position des banniers (ex: "homepage")
   * @param activeOnly - Retourner uniquement les banniers actifs
   */
  async getForSiteWeb(position?: string, activeOnly?: boolean): Promise<Banner[]> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data: Banner[];
      }>('/api/banners/for-site-web', {
        params: {
          ...(position && { position }),
          ...(activeOnly !== undefined && { activeOnly }),
        },
      });

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('❌ Erreur lors du chargement des banners:', error);
      return [];
    }
  },

  /**
   * Récupérer tous les banners (avec filtre optionnel)
   */
  async getAll(): Promise<Banner[]> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data: Banner[];
      }>('/api/banners');

      return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
      console.error('❌ Erreur lors du chargement de tous les banners:', error);
      return [];
    }
  },
};
