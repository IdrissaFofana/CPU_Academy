export type CertificateVerifyPayload = {
  id?: string;
  code?: string;
  typeCertification?: {
    nom?: string;
    code?: string;
    niveau?: string;
  };
  formation?: {
    title?: string;
  };
  dateExpiration?: string | null;
  dateDelivrance?: string | null;
  tauxReussite?: string | number;
};

export type CertificateVerifyResponse = {
  valid: boolean;
  certification?: CertificateVerifyPayload;
};

export function normalizeCertificateVerifyResponse(payload: unknown): CertificateVerifyResponse {
  const source =
    payload && typeof payload === "object" && "data" in (payload as object)
      ? ((payload as { data?: unknown }).data as Record<string, unknown>) || {}
      : (payload as Record<string, unknown>) || {};

  const certification =
    source.certification ||
    (source.id || source.code || source.typeCertification || source.formation ? source : undefined);

  return {
    valid: typeof source.valid === "boolean" ? source.valid : Boolean(certification),
    certification: certification as CertificateVerifyPayload | undefined,
  };
}

export function formatCertificateApiDate(value: unknown): string {
  if (!value) return "Non renseignée";
  if (typeof value !== "string") return "Non renseignée";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("fr-FR");
}
