// Types spécifiques au Dashboard Apprenant

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  photo?: string;
  typeMembre: "or" | "argent" | "bronze" | "gratuit";
  formationsEnCours: number;
  formationsCompletees: number;
  certificatsObtenus: number;
  heuresApprentissage: number;
  heuressemaine: number;
  joursConsecutifs: number;
  niveauGlobal: "Débutant" | "Intermédiaire" | "Avancé" | "Expert";
  pointsXP: number;
  rang: number;
}

export interface Formation {
  id: number;
  titre: string;
  categorie: string;
  duree: string;
  progression: number;
  prochainModule: string;
}

export interface Activite {
  type: "completion" | "certificat" | "quizz" | "inscription";
  texte: string;
  date: string;
  icon: any;
  color: string;
}

export interface Badge {
  id: number;
  nom: string;
  description: string;
  icon: any;
  unlocked: boolean;
  color: string;
}

export interface Competence {
  nom: string;
  niveau: number;
  couleur: string;
}

export interface Deadline {
  id: number;
  titre: string;
  date: string;
  urgent: boolean;
}

export interface Session {
  id: number;
  titre: string;
  formateur: string;
  date: string;
  heure: string;
  participants: number;
}

export interface FormationRecommandee {
  id: number;
  titre: string;
  niveau: "Débutant" | "Intermédiaire" | "Avancé";
  duree: string;
  note: number;
  prix: number;
}

export interface StatsEvolution {
  heuresCeSemaine: number[];
  heuresSemaineDerniere: number[];
  evolutionHeures: number;
  evolutionModules: number;
  evolutionCertificats: number;
}

export interface Stat {
  icon: any;
  label: string;
  value: number;
  evolution: number;
  color: string;
  bgColor: string;
  trend: "up" | "down";
}

export interface DashboardTab {
  id: string;
  label: string;
  icon: any;
  href: string;
}

export interface DashboardState {
  userData: User;
  formationsEnCours: Formation[];
  activitesRecentes: Activite[];
  badges: Badge[];
  competences: Competence[];
  deadlines: Deadline[];
  prochainesSessions: Session[];
  recommandations: FormationRecommandee[];
  statsEvolution: StatsEvolution;
  activeTab: string;
}
