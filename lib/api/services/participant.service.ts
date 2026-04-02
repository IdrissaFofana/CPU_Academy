import { apiClient } from "../client";
import { API_ENDPOINTS } from "../config";
import { ApiResponse, CreateParticipantDto, Participant } from "../types";

/**
 * Service des participations / inscriptions a une formation
 */
export const participantService = {
  /**
   * Inscrire un utilisateur a une formation
   */
  async create(data: CreateParticipantDto): Promise<ApiResponse<Participant> | Participant> {
    return apiClient.post<ApiResponse<Participant> | Participant>(
      API_ENDPOINTS.PARTICIPANTS.BASE,
      data
    );
  },

  /**
   * Participations d'une formation
   */
  async getByFormation(formationId: string): Promise<ApiResponse<Participant[]> | Participant[]> {
    return apiClient.get<ApiResponse<Participant[]> | Participant[]>(
      API_ENDPOINTS.PARTICIPANTS.BY_FORMATION(formationId)
    );
  },

  /**
   * Participations d'un utilisateur
   */
  async getByUser(userId: string): Promise<ApiResponse<Participant[]> | Participant[]> {
    return apiClient.get<ApiResponse<Participant[]> | Participant[]>(
      API_ENDPOINTS.PARTICIPANTS.BY_USER(userId)
    );
  },
};
