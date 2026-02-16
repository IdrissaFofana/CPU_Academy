import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Décode les entités HTML dans une chaîne de caractères
 * Gère les cas de double encodage comme &amp;#x27; → '
 */
export function decodeHtmlEntities(text: string): string {
  if (typeof window === 'undefined') {
    // Côté serveur : décodage manuel
    return text
      .replace(/&amp;#x27;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&amp;#39;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&amp;quot;/g, '"')
      .replace(/&quot;/g, '"')
      .replace(/&amp;lt;/g, '<')
      .replace(/&lt;/g, '<')
      .replace(/&amp;gt;/g, '>')
      .replace(/&gt;/g, '>')
      .replace(/&amp;amp;/g, '&')
      .replace(/&amp;/g, '&');
  }
  
  // Côté client : utiliser le DOM
  const textarea = document.createElement('textarea');
  
  // Premier décodage
  textarea.innerHTML = text;
  let decoded = textarea.value;
  
  // Deuxième décodage si nécessaire (double encodage)
  if (decoded.includes('&')) {
    textarea.innerHTML = decoded;
    decoded = textarea.value;
  }
  
  return decoded;
}

/**
 * Nettoie une chaîne de texte provenant de l'API
 * - Décode les entités HTML
 * - Normalise les espaces
 * - Supprime les balises HTML si présentes
 */
export function cleanApiText(text: string | undefined | null): string {
  if (!text) return '';
  
  let cleaned = text;
  
  // Décodage des entités HTML
  cleaned = decodeHtmlEntities(cleaned);
  
  // Suppression des balises HTML si présentes
  cleaned = cleaned.replace(/<[^>]*>/g, '');
  
  // Normalisation des espaces
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  return cleaned;
}

/**
 * Nettoie récursivement un objet en décodant toutes les chaînes
 */
export function cleanObjectStrings<T>(obj: T): T {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (typeof obj === 'string') {
    return cleanApiText(obj) as any;
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => cleanObjectStrings(item)) as any;
  }
  
  if (typeof obj === 'object') {
    const cleaned: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        cleaned[key] = cleanObjectStrings((obj as any)[key]);
      }
    }
    return cleaned;
  }
  
  return obj;
}


