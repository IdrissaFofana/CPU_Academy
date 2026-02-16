/**
 * Types API - Générés depuis le Swagger
 */

// Export des types spécifiques
export * from './types/missionvision.types';

// ============================================
// Common Types
// ============================================

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ============================================
// Auth Types
// ============================================

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  admin: Admin;
}

export interface RefreshTokenDto {
  refresh_token: string;
}

export interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
}

export interface VerifyTokenDto {
  token: string;
}

export interface TokenPayload {
  id: string;
  userId: string;
  email: string;
  role: string;
  status: string;
}

// ============================================
// Admin Types
// ============================================

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'super_admin' | 'moderator';
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
}

export interface CreateAdminDto {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'super_admin' | 'moderator';
}

export interface UpdateAdminDto {
  name?: string;
  email?: string;
  password?: string;
  role?: 'admin' | 'super_admin' | 'moderator';
  status?: 'active' | 'inactive' | 'suspended';
}

// ============================================
// User Types
// ============================================

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'enterprise';
  status: 'active' | 'inactive' | 'suspended';
  emailVerified: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  role?: 'student' | 'instructor' | 'enterprise';
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  status?: 'active' | 'inactive' | 'suspended';
}

// ============================================
// Formation Types
// ============================================

export interface Formation {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  duration: number; // en minutes
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  discountPrice?: number;
  categoryId: string;
  instructorId: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  rating: number;
  totalReviews: number;
  totalStudents: number;
  prerequisites?: string[];
  objectives?: string[];
  tags?: string[];
  created_at: string;
  updated_at: string;
  category?: Category;
  instructor?: User;
  chapters?: Chapter[];
}

export interface CreateFormationDto {
  title: string;
  description: string;
  shortDescription?: string;
  thumbnail?: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  price: number;
  discountPrice?: number;
  categoryId: string;
  instructorId: string;
  prerequisites?: string[];
  objectives?: string[];
  tags?: string[];
}

export interface UpdateFormationDto {
  title?: string;
  description?: string;
  shortDescription?: string;
  thumbnail?: string;
  duration?: number;
  level?: 'beginner' | 'intermediate' | 'advanced';
  price?: number;
  discountPrice?: number;
  categoryId?: string;
  status?: 'draft' | 'published' | 'archived';
  featured?: boolean;
  prerequisites?: string[];
  objectives?: string[];
  tags?: string[];
}

// ============================================
// Category Types
// ============================================

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  parentId?: string;
  order: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  children?: Category[];
  formationsCount?: number;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  parentId?: string;
  order?: number;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
  parentId?: string;
  order?: number;
  status?: 'active' | 'inactive';
}

// ============================================
// Chapter Types
// ============================================

export interface Chapter {
  id: string;
  formationId: string;
  title: string;
  description?: string;
  order: number;
  duration: number;
  created_at: string;
  updated_at: string;
  lessons?: Lesson[];
}

export interface CreateChapterDto {
  formationId: string;
  title: string;
  description?: string;
  order: number;
}

// ============================================
// Lesson Types
// ============================================

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  description?: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  content?: string;
  videoUrl?: string;
  duration: number;
  order: number;
  isFree: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateLessonDto {
  chapterId: string;
  title: string;
  description?: string;
  type: 'video' | 'text' | 'quiz' | 'assignment';
  content?: string;
  videoUrl?: string;
  duration: number;
  order: number;
  isFree?: boolean;
}

// ============================================
// Enrollment Types
// ============================================

export interface Enrollment {
  id: string;
  userId: string;
  formationId: string;
  status: 'active' | 'completed' | 'cancelled' | 'suspended';
  progress: number; // 0-100
  startDate: string;
  completionDate?: string;
  certificateUrl?: string;
  created_at: string;
  updated_at: string;
  user?: User;
  formation?: Formation;
}

export interface CreateEnrollmentDto {
  userId: string;
  formationId: string;
}

export interface UpdateEnrollmentDto {
  status?: 'active' | 'completed' | 'cancelled' | 'suspended';
  progress?: number;
  completionDate?: string;
  certificateUrl?: string;
}

// ============================================
// Health Check Types
// ============================================

export interface HealthResponse {
  status: string;
  timestamp: string;
  service: string;
  uptime: number;
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
}

// ============================================
// Error Types
// ============================================

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
  details?: any;
}
