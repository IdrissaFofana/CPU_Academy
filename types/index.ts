// Types généraux
export type Niveau = "Débutant" | "Intermédiaire" | "Avancé";
export type Format = "Vidéo" | "Live" | "Présentiel" | "Hybride";
export type Statut = "brouillon" | "soumis" | "publié" | "archivé";

// Objectifs métier
export type ObjectifMetier = 
  | "Gagner des marchés" 
  | "Vendre +" 
  | "Obtenir financement" 
  | "Industrialiser" 
  | "Digitaliser" 
  | "Piloter";

// Modules liés
export type ModuleLie = 
  | "AO" 
  | "Marketplace" 
  | "Financement" 
  | "Incubateur" 
  | "Data" 
  | "Événements" 
  | "Affiliation";

// Parcours
export type ParcoursType = 
  | "Accès Marchés (AO)"
  | "Vente & Marketplace"
  | "Financement & Bancabilité"
  | "Production++ (Qualité, certif, PI)"
  | "Pilotage & Data"
  | "Leadership & RH";

// Parcours complet avec formations
export interface Parcours {
  id: string;
  titre: string;
  slug: string;
  sousTitre: string;
  description: string;
  image?: string;
  icon?: string;
  color: string;
  gradient: string;
  
  // Objectifs et public
  objectifs: string[];
  publicCible: string;
  competences: string[];
  
  // Durée et format
  dureeTotal: number; // en heures
  format: Format;
  niveau: Niveau;
  
  // Formations incluses
  formationsIds: string[];
  formations?: Formation[];
  
  // Certification
  certifiant: boolean;
  certificat?: {
    nom: string;
    badge: string;
    criteres: string[];
  };
  
  // Prix
  gratuit: boolean;
  prixPublic?: number;
  prixMembre?: number;
  
  // Stats
  nbInscrits?: number;
  notesMoyenne?: number;
  tauxCompletion?: number;
  
  // Métadonnées
  statut: Statut;
  dateCreation: string;
  datePublication?: string;
  
  // Structure du parcours
  modules?: ModuleParcours[];
  
  // Amélioration design card
  nbAvis?: number;              // Nombre total d'avis
  nbInscritsMonth?: number;     // Inscrits ce mois
  nbInscritsWeek?: number;      // Inscrits cette semaine
  
  instructeur?: {               // Info instructeur
    nom: string;
    titre: string;
    photo?: string;
    specialite?: string;
  };
}

// Module d'un parcours
export interface ModuleParcours {
  id: string;
  titre: string;
  description: string;
  ordre: number;
  duree: number; // en heures
  formationsIds: string[];
  obligatoire: boolean;
}

// Compétences
export interface Competence {
  id: string;
  nom: string;
  description: string;
  categorie: string;
}

// Expert/Formateur
export interface Expert {
  id: string;
  nom: string;
  prenom: string;
  photo: string;
  bio: string;
  domaines: string[];
  region: string;
  ville?: string;
  realisations: string[];
  notemoyenne?: number;
  nbCours: number;
  nbApprenants?: number;
}

// Module de Formation
export interface Module {
  id: string;
  titre: string;
  description: string;
  ordre: number;
  duree: number; // en heures
  objectifs: string[];
}

// Formation
export interface Formation {
  id: string;
  titre: string;
  slug: string;
  image?: string; // URL de l'image de la formation
  modalite?: string; // Hybride, En ligne, Présentiel
  secteur?: string; // Secteur Primaire, Secondaire, Tertiaire
  resume: string;
  description: string;
  objectifs: string[];
  prerequis: string[];
  livrables: string[];
  
  // Métadonnées
  competences: string[];
  niveau: Niveau;
  format: Format;
  duree: number; // en heures
  langue: string;
  
  // Liaison
  moduleLie?: ModuleLie;
  objectifMetier?: ObjectifMetier;
  parcours?: ParcoursType[];
  
  // Géographie
  region?: string;
  ville?: string;
  
  // Expert/Formateur
  expertId: string;
  expert?: Expert;
  
  // Modules de la formation
  modules?: Module[];
  
  // Certification
  certifiant: boolean;
  certificat?: {
    criteres: {
      quiz: boolean;
      noteMinimale?: number;
      devoir: boolean;
    };
    badge: string;
    nomCertificat: string;
  };
  
  // Prix
  gratuit: boolean;
  prixPublic?: number;
  prixMembre?: number;
  
  // Programme (chapitres = contenus détaillés des modules)
  chapitres?: Chapitre[];
  
  // Stats
  nbInscrits?: number;
  notesMoyenne?: number;
  tauxCompletion?: number;
  
  // Statut
  statut: Statut;
  dateCreation: string;
  dateModification: string;
  datePublication?: string;
  
  // Badges visuels
  badges?: ("Certifiant" | "Live" | "Présentiel" | "Gratuit" | "Nouveau")[];
}

// Chapitre de formation
export interface Chapitre {
  id: string;
  titre: string;
  description?: string;
  ordre: number;
  duree: number; // en minutes
  lecons: Lecon[];
}

// Leçon
export interface Lecon {
  id: string;
  titre: string;
  type: "video" | "texte" | "quiz" | "devoir" | "ressources";
  ordre: number;
  duree?: number; // en minutes
  contenu?: string;
  videoUrl?: string;
  ressources?: Ressource[];
  quiz?: Quiz;
  devoir?: Devoir;
}

// Ressource
export interface Ressource {
  id: string;
  nom: string;
  type: "pdf" | "doc" | "xls" | "modele" | "checklist" | "autre";
  url: string;
  taille?: string;
}

// Quiz
export interface Quiz {
  id: string;
  questions: Question[];
  noteMinimale: number; // en %
  tentativesMax?: number;
}

// Question de quiz
export interface Question {
  id: string;
  question: string;
  type: "qcm" | "vrai-faux" | "texte-libre";
  options?: string[];
  reponseCorrecte: string | string[];
  explication?: string;
}

// Devoir
export interface Devoir {
  id: string;
  titre: string;
  instructions: string;
  dateEcheance?: string;
  typeFichier?: string[];
  tailleMax?: number; // en MB
}

// Certification
export interface Certification {
  id: string;
  nom: string;
  badge: string;
  description: string;
  formationsRequises: string[];
  competencesValidees: string[];
  exemple: string; // URL du certificat exemple
}

// Région
export interface Region {
  id: string;
  nom: string;
  code: string;
  villes: string[];
  coordonnees?: {
    lat: number;
    lng: number;
  };
}

// Utilisateur
export interface Utilisateur {
  id: string;
  email: string;
  telephone?: string;
  nom: string;
  prenom: string;
  photo?: string;
  role: "individuel" | "entreprise" | "formateur" | "admin";
  typeMembre?: "gratuit" | "bronze" | "argent" | "or";
  
  // Profil
  region?: string;
  ville?: string;
  entreprise?: string;
  poste?: string;
  secteur?: string;
  
  // Entreprise
  entrepriseId?: string;
  
  // Formateur
  estFormateur?: boolean;
  autorisationPublier?: boolean;
  
  // Progression
  formationsInscrites?: string[];
  formationsCompletees?: string[];
  certificatsObtenus?: string[];
  
  dateInscription: string;
}

// Entreprise
export interface Entreprise {
  id: string;
  nom: string;
  logo?: string;
  secteur: string;
  taille: string;
  region: string;
  ville: string;
  
  // Abonnement
  plan: "gratuit" | "starter" | "business" | "entreprise";
  nbCollaborateurs: number;
  limiteCollaborateurs: number;
  
  // Contact
  contactNom: string;
  contactEmail: string;
  contactTelephone: string;
  
  // Stats
  collaborateurs: CollaborateurEntreprise[];
  
  dateCreation: string;
}

// Collaborateur d'entreprise
export interface CollaborateurEntreprise {
  utilisateurId: string;
  utilisateur?: Utilisateur;
  role: string;
  equipe?: string;
  site?: string;
  statut: "invité" | "actif" | "désactivé";
  dateInvitation: string;
  dateActivation?: string;
}

// Inscription à une formation
export interface Inscription {
  id: string;
  utilisateurId: string;
  formationId: string;
  dateInscription: string;
  statut: "en cours" | "terminée" | "abandonnée";
  progression: number; // en %
  tempsTotal?: number; // en minutes
  
  // Évaluation
  quizTermines?: string[];
  devoirsTermines?: string[];
  noteFinale?: number;
  
  // Certificat
  certificatObtenu?: boolean;
  dateCertificat?: string;
  certificatUrl?: string;
  
  // Avis
  avis?: AvisFormation;
}

// Avis sur une formation
export interface AvisFormation {
  id: string;
  utilisateurId: string;
  utilisateur?: Utilisateur;
  formationId: string;
  note: number; // 1-5
  commentaire?: string;
  date: string;
}

// Session (pour live/présentiel)
export interface Session {
  id: string;
  formationId: string;
  type: "live" | "présentiel";
  dateDebut: string;
  dateFin: string;
  
  // Présentiel
  lieu?: string;
  adresse?: string;
  region?: string;
  ville?: string;
  capaciteMax?: number;
  
  // Live
  urlLive?: string;
  
  // Participants
  inscrits: string[]; // IDs utilisateurs
  presents?: string[];
  
  statut: "planifiée" | "en cours" | "terminée" | "annulée";
}

// Recherche sauvegardée
export interface RechercheSauvegardee {
  id: string;
  utilisateurId: string;
  nom: string;
  filtres: FiltresRecherche;
  dateCreation: string;
}

// Filtres de recherche
export interface FiltresRecherche {
  motCle?: string;
  competences?: string[];
  objectifs?: ObjectifMetier[];
  modulesLies?: ModuleLie[];
  filiere?: {
    n1?: string;
    n2?: string;
    n3?: string;
    n4?: string;
  };
  region?: string;
  ville?: string;
  niveau?: Niveau[];
  format?: Format[];
  dureeMin?: number;
  dureeMax?: number;
  gratuit?: boolean;
  certifiant?: boolean;
  expertId?: string;
}

// Panier
export interface Panier {
  id: string;
  utilisateurId: string;
  items: ItemPanier[];
  total: number;
  dateCreation: string;
  dateModification: string;
}

// Item du panier
export interface ItemPanier {
  formationId: string;
  formation?: Formation;
  prix: number;
  remise?: number;
}

// ==================== PHASE 2: TYPES ====================

// Centre de formation (présentiel)
export interface CentreFormation {
  id: string;
  nom: string;
  adresse: string;
  ville: string;
  region: string;
  coordonnees: {
    lat: number;
    lng: number;
  };
  photos: string[];
  horaires: string;
  contact: {
    telephone: string;
    email: string;
  };
  formationsDisponibles: string[]; // IDs formations
  capacite: number;
  equipements: string[];
  parking: boolean;
  restauration: boolean;
  transportsPublics?: string[];
}

// Session présentielle
export interface SessionPresentiel {
  id: string;
  formationId: string;
  centreId: string;
  centre?: CentreFormation;
  dateDebut: Date;
  dateFin: Date;
  horaires: string; // "9h-17h"
  capacite: number;
  inscrits: number;
  prix: number;
  materielFourni: string[];
  restauration: boolean;
  hebergementPartenaires?: {
    nom: string;
    tarif: number;
    distance: string;
  }[];
}

// Webinaire
export interface Webinaire {
  id: string;
  titre: string;
  slug: string;
  description: string;
  themes: string[];
  publicCible: string;
  prerequis?: string[];
  formateur: Expert;
  date: Date;
  duree: number; // minutes
  statut: "a-venir" | "live" | "termine";
  lienMeet?: string;
  inscrits: number;
  capacite?: number;
  gratuit: boolean;
  prix?: number;
  programme: {
    temps: string;
    titre: string;
    description: string;
  }[];
  ressources: {
    titre: string;
    url: string;
    type: "pdf" | "lien";
  }[];
  replay?: {
    url: string;
    duree: number;
  };
  thumbnail: string;
}

// Review (avis sur formation)
export interface Review {
  id: string;
  formationId: string;
  userId: string;
  userName: string;
  userPhoto?: string;
  rating: number; // 1-5
  titre?: string;
  commentaire: string;
  date: Date;
  formationTerminee: boolean;
  helpful: number;
  notHelpful: number;
  reponseInstructeur?: {
    texte: string;
    date: Date;
  };
  photos?: string[];
}
