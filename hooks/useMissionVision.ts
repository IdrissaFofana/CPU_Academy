"use client";

import { useState, useEffect } from 'react';
import { missionVisionService } from '@/lib/api/services';
import { MissionVision } from '@/lib/api/types/missionvision.types';

/**
 * Hook pour récupérer les missions/visions pour le site web
 * Note: Le nettoyage des caractères spéciaux est fait automatiquement par le client API
 */
export function useMissionVision() {
  const [data, setData] = useState<MissionVision[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await missionVisionService.getForSiteWeb();
        // Les données sont automatiquement nettoyées par le client API
        setData(response.data || []);
        
        // Log de confirmation en développement
        if (process.env.NODE_ENV === 'development' && response.data?.[0]) {
          console.log('✅ Mission/Vision chargées et nettoyées:', {
            titre: response.data[0].data.mission.titre,
            textePreview: response.data[0].data.mission.textePrincipal.substring(0, 100) + '...',
            caracteresSpeciaux: {
              apostrophes: (response.data[0].data.mission.textePrincipal.match(/'/g) || []).length,
              guillemets: (response.data[0].data.mission.textePrincipal.match(/"/g) || []).length,
            }
          });
        }
      } catch (err: any) {
        const error = err as Error;
        setError(error);
        
        // Log détaillé pour le développement
        if (err.code === 'ERR_NETWORK' || err.message === 'Network Error') {
          console.warn(
            '⚠️ API Mission/Vision non accessible.',
            '\nVérifiez que l\'API backend est démarrée et accessible.',
            `\nURL configurée: ${process.env.NEXT_PUBLIC_API_URL || 'Non définie'}`,
            '\n→ Le site affichera le contenu statique par défaut.'
          );
        } else {
          console.error('Erreur lors du chargement des missions/visions:', err);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    missionVision: data[0] || null, // On prend la première (normalement une seule active)
    allMissionVisions: data,
    isLoading,
    error,
  };
}
