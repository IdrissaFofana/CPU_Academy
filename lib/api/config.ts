/**
 * Configuration de l'API
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '30000'),
  TOKEN_KEY: process.env.NEXT_PUBLIC_TOKEN_KEY || 'cpu_access_token',
  REFRESH_TOKEN_KEY: process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'cpu_refresh_token',
} as const;

export const API_ENDPOINTS = {
  // Health
  HEALTH: '/health',
  
  // Auth
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    VERIFY_TOKEN: '/api/auth/verify-token',
    PROFILE: '/api/auth/profile',
  },
  
  // Admins
  ADMINS: {
    BASE: '/api/admins',
    BY_ID: (id: string) => `/api/admins/${id}`,
  },
  
  // Formations
  FORMATIONS: {
    BASE: '/api/formations',
    BY_ID: (id: string) => `/api/formations/${id}`,
  },
  
  // Users
  USERS: {
    BASE: '/api/users',
    BY_ID: (id: string) => `/api/users/${id}`,
  },
  
  // Categories
  CATEGORIES: {
    BASE: '/api/categories',
    BY_ID: (id: string) => `/api/categories/${id}`,
  },
  
  // Enrollments
  ENROLLMENTS: {
    BASE: '/api/enrollments',
    BY_ID: (id: string) => `/api/enrollments/${id}`,
  },
} as const;
