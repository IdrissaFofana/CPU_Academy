"use client";

import { useState, useEffect } from 'react';
import { partenaireService, equipeService, Partenaire, Membre } from '@/lib/api/services/website.service';
import { getFriendlyApiErrorMessage } from '@/lib/api/error-messages';

interface UsePartenairesParams {
  type?: string;
}

/**
 * Hook pour récupérer les partenaires du site web
 * 
 * ✅ Utilise le service centralisé (partenaireService)
 * ✅ Gère automatiquement les erreurs
 * ✅ Pas de hardcoding d'URLs
 * 
 * @example
 * const { data, isLoading, error } = usePartenairesForSiteWeb();
 */
export function usePartenairesForSiteWeb(params: UsePartenairesParams = {}) {
  const [data, setData] = useState<Partenaire[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const partenairesData = await partenaireService.getForSiteWeb(params.type);
        setData(partenairesData);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Partenaires chargés via service:', partenairesData.length);
        }
      } catch (err: any) {
        setError(new Error(getFriendlyApiErrorMessage(err, 'default')));
        
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            '⚠️ API Partenaires non accessible.',
            '\nLe site affichera un message approprié.'
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params.type]);

  return {
    data,
    isLoading,
    error,
  };
}

/**
 * Hook pour récupérer l'équipe du site web
 * 
 * ✅ Utilise le service centralisé (equipeService)
 * ✅ Gère automatiquement les erreurs
 * ✅ Pas de hardcoding d'URLs
 * 
 * @example
 * const { data, isLoading, error } = useEquipeForSiteWeb();
 */
export function useEquipeForSiteWeb() {
  const [data, setData] = useState<Membre[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const equipeData = await equipeService.getForSiteWeb();
        setData(equipeData);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Équipe chargée via service:', equipeData.length);
        }
      } catch (err: any) {
        setError(new Error(getFriendlyApiErrorMessage(err, 'default')));
        
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            '⚠️ API Équipe non accessible.',
            '\nLe site affichera un message approprié.'
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
  };
}
