"use client";

import { useState, useEffect } from 'react';
import { formationService } from '@/lib/api/services';
import { Formation, PaginatedResponse } from '@/lib/api/types';
import type { Chapitre, Lecon } from '@/types';
import { getFriendlyApiErrorMessage } from '@/lib/api/error-messages';

interface UseFormationsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  level?: string;
  status?: string;
  featured?: boolean;
  autoFetch?: boolean;
}

export function useFormations(params: UseFormationsParams = {}) {
  const { autoFetch = true, ...queryParams } = params;
  const [data, setData] = useState<PaginatedResponse<Formation> | null>(null);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFormations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Map hook params to public API query params
      const publicParams: Record<string, string> = {};
      if (queryParams.search) publicParams.q = queryParams.search;
      if (queryParams.level) publicParams.niveau = queryParams.level;

      const response = await formationService.getPublic(publicParams);
      const raw = response as any;

      let items: Formation[] = [];
      if (Array.isArray(raw)) {
        items = raw;
      } else if (Array.isArray(raw?.data)) {
        items = raw.data;
      } else if (Array.isArray(raw?.data?.data)) {
        items = raw.data.data;
      }

      // Client-side pagination (API doesn't paginate public endpoint)
      const page = params.page || 1;
      const limit = params.limit || items.length || 1;

      const normalized = {
        success: true,
        message: "",
        data: items,
        meta: {
          total: items.length,
          page,
          limit,
          totalPages: limit ? Math.ceil(items.length / limit) : 1,
        },
      };

      setData(normalized);
    } catch (err) {
      setError(new Error(getFriendlyApiErrorMessage(err, 'default')));
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchFormations();
    }
  }, [
    params.page,
    params.limit,
    params.search,
    params.categoryId,
    params.level,
    params.status,
    params.featured,
    autoFetch,
  ]);

  return {
    formations: data?.data || [],
    meta: data?.meta,
    isLoading,
    hasFetched,
    error,
    refetch: fetchFormations,
  };
}

export function useFormation(id: string, autoFetch = true) {
  const [formation, setFormation] = useState<Formation | null>(null);
  const [isLoading, setIsLoading] = useState(autoFetch && Boolean(id));
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFormation = async () => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await formationService.getById(id);
      setFormation(response.data);
    } catch (err) {
      setError(new Error(getFriendlyApiErrorMessage(err, 'default')));
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  useEffect(() => {
    if (autoFetch && id) {
      fetchFormation();
    }
  }, [id, autoFetch]);

  return {
    formation,
    isLoading,
    hasFetched,
    error,
    refetch: fetchFormation,
  };
}

function mapLecon(lecon: any, index: number): Lecon {
  const type = lecon.type_contenu === 'pdf' ? 'ressources' : 'video';

  return {
    id: lecon.id?.toString() || `lesson-${index + 1}`,
    titre: lecon.titre || `Leçon ${index + 1}`,
    type,
    ordre: index + 1,
    duree: 10,
    contenu: lecon.contenu || '',
    videoUrl: lecon.type_contenu === 'video' ? lecon.contenu || '' : undefined,
    ressources:
      lecon.type_contenu === 'pdf'
        ? [
            {
              id: `${lecon.id || index}-resource`,
              nom: lecon.titre || 'Document',
              type: 'pdf',
              url: lecon.contenu || '',
            },
          ]
        : undefined,
  };
}

function mapChapitre(chapitre: any): Chapitre {
  const lecons = Array.isArray(chapitre.lecons)
    ? chapitre.lecons.map((lecon: any, index: number) => mapLecon(lecon, index))
    : [];

  return {
    id: chapitre.id?.toString() || '',
    titre: chapitre.titre || 'Chapitre',
    description: chapitre.description || undefined,
    ordre: 1,
    duree: Math.max(10, lecons.length * 10),
    lecons,
  };
}

export function useFormationContent(formationId: string, autoFetch = true) {
  const [chapitres, setChapitres] = useState<Chapitre[]>([]);
  const [isLoading, setIsLoading] = useState(autoFetch && Boolean(formationId));
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchContent = async () => {
    if (!formationId) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await formationService.getChapitresByFormationId(formationId);
      const rawChapitres = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : [];

      const resolvedChapitres = await Promise.all(
        rawChapitres.map(async (chapitre: any) => {
          let lecons = Array.isArray(chapitre.lecons) ? chapitre.lecons : [];

          if (lecons.length === 0) {
            const leconsResponse = await formationService.getLeconsByChapitreId(chapitre.id);
            lecons = Array.isArray(leconsResponse)
              ? leconsResponse
              : Array.isArray(leconsResponse?.data)
              ? leconsResponse.data
              : [];
          }

          return mapChapitre({ ...chapitre, lecons });
        })
      );

      setChapitres(resolvedChapitres);
    } catch (err) {
      setError(new Error(getFriendlyApiErrorMessage(err, 'default')));
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  useEffect(() => {
    if (autoFetch && formationId) {
      fetchContent();
    }
  }, [formationId, autoFetch]);

  return {
    chapitres,
    isLoading,
    hasFetched,
    error,
    refetch: fetchContent,
  };
}

export function useFormationMutations() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createFormation = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await formationService.create(data);
      return response.data;
    } catch (err) {
      setError(new Error(getFriendlyApiErrorMessage(err, 'default')));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormation = async (id: string, data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await formationService.update(id, data);
      return response.data;
    } catch (err) {
      setError(new Error(getFriendlyApiErrorMessage(err, 'default')));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFormation = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await formationService.delete(id);
    } catch (err) {
      setError(new Error(getFriendlyApiErrorMessage(err, 'default')));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const publishFormation = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await formationService.publish(id);
      return response.data;
    } catch (err) {
      setError(new Error(getFriendlyApiErrorMessage(err, 'default')));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const archiveFormation = async (id: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await formationService.archive(id);
      return response.data;
    } catch (err) {
      setError(new Error(getFriendlyApiErrorMessage(err, 'default')));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createFormation,
    updateFormation,
    deleteFormation,
    publishFormation,
    archiveFormation,
    isLoading,
    error,
  };
}
