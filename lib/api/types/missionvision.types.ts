/**
 * Types pour Mission et Vision - Page À propos
 */

export interface MissionItem {
  id: string;
  texte: string;
}

export interface MissionData {
  titre: string;
  icone?: string;
  textePrincipal: string;
  sousTitre: string;
  objectifs?: MissionItem[];
}

export interface VisionItem {
  id: string;
  texte: string;
}

export interface Engagement {
  titre?: string;
  citation?: string;
}

export interface VisionData {
  titre: string;
  icone?: string;
  textePrincipal: string;
  sousTitre: string;
  aspirations?: VisionItem[];
  engagement?: Engagement;
}

export interface MissionVision {
  id: string;
  data: {
    mission: MissionData;
    vision: VisionData;
  };
  ordre: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface CreateMissionVisionDto {
  mission: MissionData;
  vision: VisionData;
  ordre?: number;
  isActive?: boolean;
}

export interface UpdateMissionVisionDto {
  mission?: MissionData;
  vision?: VisionData;
  ordre?: number;
  isActive?: boolean;
}
