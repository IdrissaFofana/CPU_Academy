export const SHOW_A_SON_RYTHME = false;

function normalizeText(value?: string): string {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export function isASonRythmeFormation(modeOrFormat?: string, modalite?: string): boolean {
  const a = normalizeText(modeOrFormat);
  const b = normalizeText(modalite);

  return (
    a.includes("a_son_rythme") ||
    a.includes("a son rythme") ||
    a.includes("video") ||
    a.includes("vidéo") ||
    b.includes("a_son_rythme") ||
    b.includes("a son rythme") ||
    b.includes("video") ||
    b.includes("vidéo")
  );
}
