"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { faqService } from '@/lib/api/services';
import { Faq } from '@/lib/api/types';

interface UseFaqsParams {
  statut?: string;
  autoFetch?: boolean;
}

function normalizeText(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');
}

function normalizeFaqs(raw: unknown): Faq[] {
  if (Array.isArray(raw)) {
    return raw as Faq[];
  }

  if (raw && typeof raw === 'object') {
    const data = (raw as { data?: unknown }).data;

    if (Array.isArray(data)) {
      return data as Faq[];
    }

    if (data && typeof data === 'object' && Array.isArray((data as { data?: unknown }).data)) {
      return (data as { data: Faq[] }).data;
    }
  }

  return [];
}

function normalizeFaq(raw: unknown): Faq | null {
  if (!raw || typeof raw !== 'object') {
    return null;
  }

  if ('id' in (raw as Record<string, unknown>)) {
    return raw as Faq;
  }

  if ('data' in (raw as Record<string, unknown>)) {
    const nested = (raw as { data?: unknown }).data;
    if (nested && typeof nested === 'object' && 'id' in (nested as Record<string, unknown>)) {
      return nested as Faq;
    }
  }

  return null;
}

export function useFaqs(params: UseFaqsParams = {}) {
  const { autoFetch = true, statut = 'Publié' } = params;
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const viewedFaqIdsRef = useRef(new Set<string>());
  const usefulFaqIdsRef = useRef(new Set<string>());

  const fetchFaqs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await faqService.getAll();
      const items = normalizeFaqs(response)
        .filter((faq) => faq?.question && faq?.reponse)
        .filter((faq) => {
          if (!statut) return true;
          return normalizeText(faq.statut || '') === normalizeText(statut);
        })
        .map((faq) => ({
          ...faq,
          question: decodeHtmlEntities(faq.question),
          reponse: decodeHtmlEntities(faq.reponse),
        }))
        .sort((left, right) => (left.ordre ?? 0) - (right.ordre ?? 0));

      setFaqs(items);
    } catch (err) {
      setFaqs([]);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchFaqs();
    }
  }, [autoFetch, statut]);

  const recordView = useCallback(async (id: string) => {
    if (!id || viewedFaqIdsRef.current.has(id)) {
      return;
    }

    viewedFaqIdsRef.current.add(id);
    setFaqs((current) =>
      current.map((faq) => (faq.id === id ? { ...faq, vues: (faq.vues || 0) + 1 } : faq))
    );

    try {
      const response = await faqService.recordView(id);
      const updated = normalizeFaq(response);

      if (updated?.id) {
        setFaqs((current) =>
          current.map((faq) => (faq.id === updated.id ? { ...faq, ...updated } : faq))
        );
      }
    } catch {
      // Keep optimistic value; avoid UX jitter if stats endpoint is unavailable.
    }
  }, []);

  const recordUseful = useCallback(async (id: string) => {
    if (!id || usefulFaqIdsRef.current.has(id)) {
      return;
    }

    usefulFaqIdsRef.current.add(id);
    setFaqs((current) =>
      current.map((faq) => (faq.id === id ? { ...faq, utile: (faq.utile || 0) + 1 } : faq))
    );

    try {
      const response = await faqService.recordUseful(id);
      const updated = normalizeFaq(response);

      if (updated?.id) {
        setFaqs((current) =>
          current.map((faq) => (faq.id === updated.id ? { ...faq, ...updated } : faq))
        );
      }
    } catch {
      // Keep optimistic value; avoid UX jitter if stats endpoint is unavailable.
    }
  }, []);

  const hasMarkedUseful = useCallback((id: string) => usefulFaqIdsRef.current.has(id), []);

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        faqs
          .map((faq) => faq.categorie)
          .filter((value): value is string => Boolean(value))
      )
    );
  }, [faqs]);

  return {
    faqs,
    categories,
    isLoading,
    error,
    recordView,
    recordUseful,
    hasMarkedUseful,
    refetch: fetchFaqs,
  };
}
