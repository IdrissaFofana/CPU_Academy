import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api/client';
import { API_ENDPOINTS } from '@/lib/api/config';
import { getFriendlyApiErrorMessage } from '@/lib/api/error-messages';

export interface BlogAuthor {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  bio: string;
  email: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogMedia {
  id: string;
  url: string;
  filename: string;
  mimeType: string;
  size?: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  status: 'published' | 'draft' | 'scheduled' | 'archived';
  author: BlogAuthor;
  authorId: string;
  readingTime: number | null;
  isFeatured: boolean;
  allowComments: boolean;
  publishedAt: string;
  categories: BlogCategory[];
  tags: BlogTag[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogListResponse {
  data: BlogPost[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

type BlogMediaResponse =
  | BlogMedia[]
  | { data?: BlogMedia[] }
  | { success?: boolean; data?: BlogMedia[] };

export function resolveBlogMediaUrl(
  featuredImage: string | null | undefined,
  mediaById: Record<string, string>
): string | null {
  if (!featuredImage) return null;

  if (featuredImage.startsWith('http://') || featuredImage.startsWith('https://')) {
    return featuredImage;
  }

  if (featuredImage.startsWith('/')) {
    // ✅ Importer depuis le client API centralisé au lieu de process.env
    const { API_CONFIG } = require('@/lib/api');
    return `${API_CONFIG.BASE_URL}${featuredImage}`;
  }

  return mediaById[featuredImage] || null;
}

export function useBlogMediaMap() {
  const [mediaById, setMediaById] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await apiClient.get<BlogMediaResponse>(API_ENDPOINTS.BLOG.MEDIA);
        const payload = response as unknown as BlogMediaResponse;

        const rawItems = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.data)
            ? payload.data
            : [];

        const map = rawItems.reduce<Record<string, string>>((acc, media) => {
          if (media?.id && media?.url) {
            acc[media.id] = media.url;
          }
          return acc;
        }, {});

        setMediaById(map);
      } catch {
        // Endpoint /blog/media is protected; keep public pages functional without media map.
        setMediaById({});
      }
    };

    fetchMedia();
  }, []);

  return mediaById;
}

export function useBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get<{ data: BlogListResponse }>(
          API_ENDPOINTS.BLOG.POSTS_PUBLIC
        );
        setPosts(response.data.data || []);
      } catch (err) {
        setError(getFriendlyApiErrorMessage(err, 'blog.list'));
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { posts, loading, error };
}

export function useBlogPost(slug: string | null) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(!!slug);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setPost(null);
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiClient.get<{ data: BlogPost }>(
          API_ENDPOINTS.BLOG.POST_BY_SLUG(slug)
        );
        setPost(response.data);
      } catch (err) {
        setError(getFriendlyApiErrorMessage(err, 'blog.detail'));
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
}
