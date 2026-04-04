/**
 * Configuration de l'API
 */

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'https://back.cpupme.com',
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
    BASE: '/api/formation/formations',
    PUBLIC: '/api/formation/formations/public',
    BY_ID: (id: string) => `/api/formation/formations/${id}`,
  },

  PARCOURS: {
    BASE: '/api/formation/parcours',
    PUBLIC: '/api/formation/parcours/public',
    BY_ID: (id: string) => `/api/formation/parcours/${id}`,
  },

  CHAPITRES: {
    BASE: '/api/formation/chapitres',
    LECONS: '/api/formation/chapitres/lecons',
  },

  SESSIONS: {
    PUBLIC: '/api/formation/sessions/public',
    PUBLIC_BY_ID: (id: string) => `/api/formation/sessions/public/${id}`,
  },

  PARTICIPANTS: {
    BASE: '/api/formation/participants',
    BY_ID: (id: string) => `/api/formation/participants/${id}`,
    BY_FORMATION: (formationId: string) => `/api/formation/participants/formation/${formationId}`,
    BY_USER: (userId: string) => `/api/formation/participants/user/${userId}`,
    ME_FORMATIONS: '/api/formation/participant/me/formations',
  },

  CENTRE_FORMATIONS: {
    BASE: '/api/centre-formations',
    BY_ID: (id: string) => `/api/centre-formations/${id}`,
  },
  
  // Users
  USERS: {
    BASE: '/api/users',
    BY_ID: (id: string) => `/api/users/${id}`,
  },
  
  // Categories
  CATEGORIES: {
    BASE: '/api/formation/categories',
    PUBLIC: '/api/formation/categories/public',
    BY_ID: (id: string) => `/api/formation/categories/${id}`,
  },

  // FAQs
  FAQS: {
    BASE: '/api/formation/faqs',
    PUBLIC: '/api/formation/faqs/public',
    BY_ID: (id: string) => `/api/formation/faqs/${id}`,
    VIEW: (id: string) => `/api/formation/faqs/${id}/view`,
    USEFUL: (id: string) => `/api/formation/faqs/${id}/utile`,
  },

  // Ressources
  RESSOURCES: {
    BASE: '/api/formation/ressources',
    PUBLIC: '/api/formation/ressources',
    BY_ID: (id: string) => `/api/formation/ressources/${id}`,
  },

  // Promotions
  PROMOTIONS: {
    BASE: '/api/formation/promotions',
    PUBLIC: '/api/formation/promotions',
    BY_ID: (id: string) => `/api/formation/promotions/${id}`,
  },

  // Blog
  BLOG: {
    POSTS: '/api/formation/blog/posts',
    POSTS_PUBLIC: '/api/formation/blog/posts/public',
    POST_BY_SLUG: (slug: string) => `/api/formation/blog/posts/slug/${slug}`,
    POST_BY_ID: (id: string) => `/api/formation/blog/posts/${id}`,
    MEDIA: '/api/formation/blog/media',
    MEDIA_BY_ID: (id: string) => `/api/formation/blog/media/${id}`,
    CATEGORIES: '/api/formation/blog/categories',
    TAGS: '/api/formation/blog/tags',
    AUTHORS: '/api/formation/blog/authors',
    COMMENTS: '/api/formation/blog/comments',
    COMMENTS_BY_POST: (postId: string) => `/api/formation/blog/comments/post/${postId}`,
  },

  CERTIFICATIONS: {
    TYPES: '/api/formation/types-certifications',
    VERIFY_BY_CODE: (code: string) => `/api/formation/certificats/verify/${code}`,
  },
  
  // Enrollments
  ENROLLMENTS: {
    BASE: '/api/enrollments',
    BY_ID: (id: string) => `/api/enrollments/${id}`,
  },
} as const;
