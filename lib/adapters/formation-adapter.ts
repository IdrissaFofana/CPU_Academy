import type { Chapitre, Expert, Formation, Lecon } from "@/types";

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function mapExpert(raw: any): Expert | undefined {
  if (!raw) return undefined;

  const prenom = raw.firstname || raw.prenom || "Expert";
  const nom = raw.lastname || raw.nom || "CPU";

  return {
    id: raw.id?.toString() || "",
    nom,
    prenom,
    photo: raw.photo || "",
    bio: raw.bio || "Formateur CPU Academy",
    domaines: Array.isArray(raw.domaines)
      ? raw.domaines
      : [raw.titre || "Formation professionnelle"],
    region: raw.region || "Cote d'Ivoire",
    ville: raw.ville,
    realisations: Array.isArray(raw.realisations)
      ? raw.realisations
      : ["Animation de formations professionnelles"],
    notemoyenne: Number(raw.notemoyenne || raw.rating || 4.5),
    nbCours: Number(raw.nbCours || 1),
    nbApprenants: Number(raw.nbApprenants || raw.totalStudents || 0),
  };
}

function buildFallbackChapitres(raw: any): Chapitre[] {
  const title = raw.title || raw.titre || "Introduction";
  const description = raw.description || raw.resume || "Contenu de formation";
  const dureeHeures = Math.max(1, Number(raw.duration || raw.duree || 1));

  const lecon: Lecon = {
    id: `${raw.id || "formation"}-lesson-1`,
    titre: `Demarrer: ${title}`,
    type: "video",
    ordre: 1,
    duree: Math.max(5, dureeHeures * 10),
    contenu: description,
  };

  return [
    {
      id: `${raw.id || "formation"}-chapter-1`,
      titre: "Contenu principal",
      description: "Commencez votre parcours de formation",
      ordre: 1,
      duree: Math.max(30, dureeHeures * 60),
      lecons: [lecon],
    },
  ];
}

export function mapApiFormationToAppFormation(raw: any): Formation {
  const levelMap: Record<string, Formation["niveau"]> = {
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé",
    debutant: "Débutant",
    intermediaire: "Intermédiaire",
    avance: "Avancé",
    "Débutant": "Débutant",
    "Intermédiaire": "Intermédiaire",
    "Avancé": "Avancé",
  };

  const modeMap: Record<string, Formation["format"]> = {
    presentiel: "Présentiel",
    hybride: "Hybride",
    live: "Live",
    webinaire: "Live",
    video: "Vidéo",
    document: "Vidéo",
    a_son_rythme: "Vidéo",
  };

  const now = new Date().toISOString();
  const rawDuration = raw.duration ?? raw.duree ?? 0;
  const durationHours = Math.max(1, Number(rawDuration) || 1);
  const mode = (raw.mode || raw.format || "").toString().toLowerCase();
  const titre = raw.title || raw.titre || "Formation";

  const expert = mapExpert(raw.formateur || raw.expert || raw.instructor);
  const chapitres = Array.isArray(raw.chapitres) && raw.chapitres.length > 0 ? raw.chapitres : buildFallbackChapitres(raw);

  return {
    id: raw.id?.toString() || raw._id?.toString() || "",
    titre,
    slug: raw.slug || slugify(titre),
    description: raw.description || raw.resume || "",
    resume: raw.shortDescription || raw.description || raw.resume || "",
    image: raw.image || raw.thumbnail,
    modalite: raw.mode || raw.modalite || "En ligne",
    niveau: levelMap[raw.level] || levelMap[raw.niveau] || "Débutant",
    secteur: raw.category?.name || raw.category || raw.secteur || "Formation",
    objectifs: raw.objectives || raw.objectifs || ["Acquerir des competences pratiques"],
    prerequis: raw.prerequisites || raw.prerequis || ["Aucun prerequis specifique"],
    livrables: raw.livrables || ["Support de cours"],
    competences: raw.tags || raw.competences || [],
    format: modeMap[mode] || raw.format || "Vidéo",
    duree: durationHours,
    langue: raw.langue || "Français",
    moduleLie: raw.moduleLie,
    objectifMetier: raw.objectifMetier,
    parcours: raw.parcours || [],
    region: raw.region || raw.location,
    ville: raw.ville,
    expertId: raw.instructorId || raw.formateur_id || expert?.id || "",
    expert,
    certifiant: Boolean(raw.certifiant || raw.certification_delivrer_badge),
    certificat: raw.certificat,
    gratuit: raw.isPaid === false || raw.price === 0 || raw.price === null || raw.gratuit === true,
    prixPublic: raw.price ?? raw.prixPublic ?? raw.prix ?? 0,
    prixMembre: raw.price_member ?? raw.prixMembre ?? undefined,
    modules: raw.modules || [],
    chapitres,
    nbInscrits: raw.totalStudents || raw.nbInscrits || 0,
    notesMoyenne: raw.rating || raw.notesMoyenne || 0,
    tauxCompletion: raw.tauxCompletion,
    statut:
      raw.status === "published" || raw.statut === "publié"
        ? "publié"
        : raw.status === "archived" || raw.statut === "archivé"
        ? "archivé"
        : "brouillon",
    dateCreation: raw.created_at || raw.dateCreation || now,
    dateModification: raw.updated_at || raw.dateModification || now,
    datePublication: raw.datePublication || raw.updated_at || undefined,
    badges: raw.badges || [],
  };
}
