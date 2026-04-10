import { AxiosError } from "axios";

type ApiErrorContext =
  | "default"
  | "blog.list"
  | "blog.detail"
  | "guides.list"
  | "certifications.verify"
  | "formations.search";

const CONTEXT_MESSAGES: Record<ApiErrorContext, string> = {
  default: "Le service est temporairement indisponible. Veuillez reessayer dans quelques instants.",
  "blog.list": "Impossible de charger les articles pour le moment.",
  "blog.detail": "Impossible de charger cet article pour le moment.",
  "guides.list": "Impossible de charger les guides pour le moment.",
  "certifications.verify": "Impossible de verifier ce certificat pour le moment.",
  "formations.search": "Impossible d'effectuer la recherche pour le moment.",
};

function getStatus(error: unknown): number | undefined {
  const e = error as AxiosError | (Error & { status?: number; response?: { status?: number } });
  return e?.status ?? e?.response?.status;
}

function getCode(error: unknown): string | undefined {
  const e = error as AxiosError | (Error & { code?: string });
  return e?.code;
}

function getRawMessage(error: unknown): string {
  const e = error as AxiosError | (Error & { response?: { data?: unknown } });
  const responseMessage = (e?.response?.data as any)?.message;
  return String(responseMessage || e?.message || "");
}

export function getFriendlyApiErrorMessage(
  error: unknown,
  context: ApiErrorContext = "default"
): string {
  const status = getStatus(error);
  const code = getCode(error);
  const raw = getRawMessage(error).toLowerCase();

  if (
    code === "ERR_NETWORK" ||
    raw.includes("network error") ||
    raw.includes("err_name_not_resolved") ||
    raw.includes("eai_again") ||
    raw.includes("fetch failed")
  ) {
    return "Connexion impossible au serveur. Verifiez votre connexion puis reessayez.";
  }

  if (status === 401) {
    return "Votre session a expire. Veuillez vous reconnecter.";
  }

  if (status === 403) {
    return "Vous n'avez pas l'autorisation pour cette action.";
  }

  if (status === 404) {
    return "La ressource demandee est introuvable.";
  }

  if (status === 422) {
    return "Certaines informations sont invalides. Verifiez les champs puis reessayez.";
  }

  if (status !== undefined && status >= 500) {
    return "Le service rencontre un probleme temporaire. Veuillez reessayer plus tard.";
  }

  return CONTEXT_MESSAGES[context] ?? CONTEXT_MESSAGES.default;
}
