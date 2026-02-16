"use client";

import { useState, useEffect } from 'react';

// Types pour les partenaires
interface Partenaire {
  id: string;
  nom: string;
  logo: string;
  lien?: string;
  type?: string;
}

// Types pour l'équipe
interface Membre {
  id: string;
  nom: string;
  role: string;
  photo: string;
  bio?: string;
  ordre?: number;
  odre?: number;
  reseauxSociaux?: {
    linkedin?: string;
    email?: string;
  };
}

interface UsePartenairesParams {
  type?: string;
}

/**
 * Hook pour récupérer les partenaires du site web
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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.cpupme.com';
        const endpoint = `${apiUrl}/api/partenaire/for-site-web${params.type ? `?type=${params.type}` : ''}`;
        
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const result = await response.json();
        // L'API retourne { success: true, data: { success: true, data: [...] } }
        const partenairesData = result.data?.data || result.data || [];
        setData(partenairesData);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Partenaires chargés:', partenairesData?.length || 0);
        }
      } catch (err: any) {
        const error = err as Error;
        setError(error);
        
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
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.cpupme.com';
        const endpoint = `${apiUrl}/api/siteequipe/for-site-web`;
        
        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        
        const result = await response.json();
        // L'API retourne { success: true, data: { success: true, data: [...] } }
        const equipeData = result.data?.data || result.data || [];
        setData(equipeData);
        
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Équipe chargée:', equipeData?.length || 0);
        }
      } catch (err: any) {
        const error = err as Error;
        setError(error);
        
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
