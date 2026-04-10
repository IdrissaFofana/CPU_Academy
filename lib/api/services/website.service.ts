/**
 * Service pour les partenaires et l'équipe du site web
 * Retour des données brutes sans/avec formattage selon l'API
 */

import { apiClient } from '@/lib/api';
import { API_ENDPOINTS } from '../config';

export interface Partenaire {
  id: string;
  nom: string;
  logo: string;
  lien?: string;
  description?: string | null;
  categorie?: string | null;
  type?: string;
}

export interface Membre {
  id: string;
  nom: string;
  role: string;
  photo: string;
  bio?: string;
  ordre?: number;
  odre?: number;
  reseauxSociaux?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

/**
 * Service pour les partenaires du site web
 */
export const partenaireService = {
  /**
   * Récupérer les partenaires du site web
   */
  async getForSiteWeb(type?: string): Promise<Partenaire[]> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data: Partenaire[] | Partenaire;
      }>('/api/formation/partenaire', {
        params: type ? { type } : undefined,
      });

      // Gérer les deux formats de réponse possibles
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return response.data ? [response.data] : [];
    } catch (error) {
      console.error('❌ Erreur lors du chargement des partenaires:', error);
      return [];
    }
  },
};

/**
 * Service pour l'équipe du site web
 */
export const equipeService = {
  /**
   * Récupérer l'équipe du site web
   */
  async getForSiteWeb(): Promise<Membre[]> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        data: Membre[] | Membre;
      }>('/api/formation/siteequipe');

      // Gérer les deux formats de réponse possibles
      if (Array.isArray(response.data)) {
        return response.data;
      }
      return response.data ? [response.data] : [];
    } catch (error) {
      console.error('❌ Erreur lors du chargement de l\'équipe:', error);
      return [];
    }
  },
};
