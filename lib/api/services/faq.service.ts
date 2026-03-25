import { apiClient } from '../client';
import { API_ENDPOINTS } from '../config';
import { Faq } from '../types';

export const faqService = {
  async getAll(params?: { statut?: string }): Promise<Faq[]> {
    return apiClient.get<Faq[]>(API_ENDPOINTS.FAQS.BASE, { params });
  },

  async getPublic(params?: { siteId?: string; statut?: string }): Promise<Faq[]> {
    return apiClient.get<Faq[]>(API_ENDPOINTS.FAQS.PUBLIC, { params });
  },

  async getById(id: string): Promise<Faq> {
    return apiClient.get<Faq>(API_ENDPOINTS.FAQS.BY_ID(id));
  },

  async recordView(id: string): Promise<Faq> {
    return apiClient.post<Faq>(API_ENDPOINTS.FAQS.VIEW(id));
  },

  async recordUseful(id: string): Promise<Faq> {
    return apiClient.post<Faq>(API_ENDPOINTS.FAQS.USEFUL(id));
  },
};
