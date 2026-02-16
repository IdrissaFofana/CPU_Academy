"use client";

import { useState, useEffect } from 'react';
import { formationService } from '@/lib/api/services';
import { Formation, PaginatedResponse } from '@/lib/api/types';

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFormations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await formationService.getAll(queryParams);
      const raw = response as any;
      let items: Formation[] = [];
      let meta = raw?.meta;

      if (Array.isArray(raw)) {
        items = raw;
      } else if (Array.isArray(raw?.data)) {
        items = raw.data;
      } else if (Array.isArray(raw?.data?.data)) {
        items = raw.data.data;
        meta = raw.data.meta || meta;
      }

      const normalized = {
        success: raw?.success ?? true,
        message: raw?.message ?? "",
        data: items,
        meta: meta || {
          total: items.length,
          page: params.page || 1,
          limit: params.limit || items.length || 1,
          totalPages: items.length ? 1 : 0,
        },
      };

      setData(normalized);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
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
    error,
    refetch: fetchFormations,
  };
}

export function useFormation(id: string, autoFetch = true) {
  const [formation, setFormation] = useState<Formation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchFormation = async () => {
    if (!id) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await formationService.getById(id);
      setFormation(response.data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
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
    error,
    refetch: fetchFormation,
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
      setError(err as Error);
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
      setError(err as Error);
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
      setError(err as Error);
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
      setError(err as Error);
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
      setError(err as Error);
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
