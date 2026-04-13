import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Retourne l'image de fallback correspondant au type (mode/format) de la formation.
 * webinaire / live      → formation-webinaire-default.svg
 * presentiel            → formation-presentiel-default.svg
 * a_son_rythme / vidéo  → formation-rythme-default.svg
 */
export function getModeFallbackImage(format?: string, modalite?: string): string {
  const f = (format || "").toLowerCase();
  const m = (modalite || "").toLowerCase();

  if (f.includes("live") || m.includes("webinaire") || m.includes("live")) {
    return "/images/formation-webinaire-default.svg";
  }
  if (f.includes("présentiel") || f.includes("presentiel") || m.includes("presentiel")) {
    return "/images/formation-presentiel-default.svg";
  }
  if (f.includes("vidéo") || f.includes("video") || m.includes("a_son_rythme") || m.includes("rythme")) {
    return "/images/formation-rythme-default.svg";
  }
  return "/images/formation-presentiel-default.svg";
}

/**
 * Retourne l'image de fallback correspondant au secteur de la formation.
 * Secteur Primaire  → formation-agriculture.png
 * Secteur Secondaire → formation-tech.png
 * Secteur Tertiaire / autre → default-formation.jpg
 */
export function getSecteurFallbackImage(secteur?: string): string {
  const s = (secteur || "").toLowerCase();
  if (
    s.includes("primaire") ||
    s.includes("agriculture") ||
    s.includes("élevage") ||
    s.includes("elevage") ||
    s.includes("pêche") ||
    s.includes("peche") ||
    s.includes("forestier") ||
    s.includes("minier")
  ) {
    return "/images/formation-agriculture.png";
  }
  if (
    s.includes("secondaire") ||
    s.includes("industrie") ||
    s.includes("tech") ||
    s.includes("numérique") ||
    s.includes("numerique") ||
    s.includes("btp") ||
    s.includes("construction") ||
    s.includes("manufacture") ||
    s.includes("transformation")
  ) {
    return "/images/formation-tech.png";
  }
  return "/images/default-formation.jpg";
}

function splitTitleLines(value: string, maxCharsPerLine = 24, maxLines = 3): string[] {
  const words = value.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return ["PARCOURS METIER"];

  const lines: string[] = [];
  let currentLine = "";

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      currentLine = candidate;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      lines.push(word.slice(0, maxCharsPerLine));
      currentLine = word.slice(maxCharsPerLine);
    }

    if (lines.length >= maxLines - 1) break;
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  if (lines.length > maxLines) {
    return lines.slice(0, maxLines);
  }

  return lines;
}

function getParcoursColorPair(normalized: string): [string, string] {
  const palettes: Array<[string, string]> = [
    ["#EA580C", "#FB923C"],
    ["#0369A1", "#0EA5E9"],
    ["#166534", "#22C55E"],
    ["#4338CA", "#818CF8"],
    ["#0F766E", "#2DD4BF"],
    ["#9A3412", "#FDBA74"],
  ];

  const hash = normalized.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return palettes[hash % palettes.length];
}

export function getParcoursFallbackImage(parcoursName?: string): string {
  const cleanName = (parcoursName || "Parcours metier").trim() || "Parcours metier";
  const normalized = cleanName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  const [from, to] = getParcoursColorPair(normalized);
  const lines = splitTitleLines(cleanName.toUpperCase());
  const lineY = [180, 228, 276];
  const textNodes = lines
    .map(
      (line, idx) =>
        `<text x="56" y="${lineY[idx] || 276}" font-family="Segoe UI, Arial, sans-serif" font-size="40" font-weight="800" fill="#FFFFFF" letter-spacing="0.5">${line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</text>`
    )
    .join("");

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675" role="img" aria-label="${cleanName}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}" />
      <stop offset="100%" stop-color="${to}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)" />
  <circle cx="1080" cy="-20" r="260" fill="rgba(255,255,255,0.12)" />
  <circle cx="-80" cy="720" r="300" fill="rgba(255,255,255,0.10)" />
  <rect x="48" y="84" width="310" height="42" rx="21" fill="rgba(255,255,255,0.18)" />
  <text x="72" y="113" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="700" fill="#FFFFFF">PARCOURS METIER</text>
  ${textNodes}
</svg>`;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
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


