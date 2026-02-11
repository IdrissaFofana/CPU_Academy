import {
  BookOpen,
  Award,
  Clock,
  Target,
  CheckCircle2,
  Brain,
  Flame,
  Activity,
  Medal,
  Trophy,
} from "lucide-react";
import type {
  User,
  Formation,
  Activite,
  Badge,
  Competence,
  Deadline,
  Session,
  FormationRecommandee,
  StatsEvolution,
} from "@/types/dashboard";

export const mockUser: User = {
  id: "1",
  nom: "Kouassi Amani",
  prenom: "Jean",
  email: "kouassi.amani@email.ci",
  photo: "/images/default-avatar.png",
  typeMembre: "or",
  formationsEnCours: 3,
  formationsCompletees: 12,
  certificatsObtenus: 8,
  heuresApprentissage: 156,
  heuressemaine: 8,
  joursConsecutifs: 7,
  niveauGlobal: "Intermédiaire",
  pointsXP: 1250,
  rang: 42,
};

export const mockFormationsEnCours: Formation[] = [
  {
    id: 1,
    titre: "Marketing Digital Avancé",
    slug: "marketing-digital-avance",
    categorie: "Marketing",
    duree: "8 semaines",
    progression: 65,
    prochainModule: "SEO & Analytics",
  },
  {
    id: 2,
    titre: "Gestion Financière",
    slug: "gestion-financiere",
    categorie: "Finance",
    duree: "6 semaines",
    progression: 45,
    prochainModule: "Budgétisation",
  },
  {
    id: 3,
    titre: "Leadership & Management",
    slug: "leadership-management",
    categorie: "Management",
    duree: "10 semaines",
    progression: 30,
    prochainModule: "Communication d'équipe",
  },
];

export const mockActivitesRecentes: Activite[] = [
  {
    type: "completion",
    texte: "Module 'Stratégie Marketing' complété",
    date: "Il y a 2h",
    color: "text-cpu-orange",
    icon: CheckCircle2,
  },
  {
    type: "certificat",
    texte: "Certificat 'Marketing Digital' obtenu",
    date: "Il y a 1 jour",
    color: "text-orange-600",
    icon: Award,
  },
  {
    type: "quizz",
    texte: "Quiz 'Finance d'entreprise' - 85%",
    date: "Il y a 2 jours",
    color: "text-slate-600",
    icon: Brain,
  },
  {
    type: "inscription",
    texte: "Nouvelle formation commencée",
    date: "Il y a 3 jours",
    color: "text-cpu-orange",
    icon: BookOpen,
  },
];

export const mockBadges: Badge[] = [
  {
    id: 1,
    nom: "Premier Pas",
    description: "Première formation complétée",
    icon: Medal,
    unlocked: true,
    color: "bg-cpu-orange",
  },
  {
    id: 2,
    nom: "Marathonien",
    description: "10 formations complétées",
    icon: Trophy,
    unlocked: true,
    color: "bg-orange-500",
  },
  {
    id: 3,
    nom: "Expert",
    description: "5 certifications obtenues",
    icon: Award,
    unlocked: true,
    color: "bg-cpu-orange",
  },
  {
    id: 4,
    nom: "Assidu",
    description: "30 jours consécutifs",
    icon: Flame,
    unlocked: false,
    color: "bg-gray-300",
  },
];

export const mockCompetences: Competence[] = [
  { nom: "Marketing Digital", niveau: 85, couleur: "bg-cpu-orange" },
  { nom: "Gestion Financière", niveau: 70, couleur: "bg-orange-500" },
  { nom: "Leadership", niveau: 78, couleur: "bg-cpu-orange" },
  { nom: "Communication", niveau: 65, couleur: "bg-orange-600" },
  { nom: "Analyse de Données", niveau: 55, couleur: "bg-orange-400" },
];

export const mockDeadlines: Deadline[] = [
  {
    id: 1,
    titre: "Examen Final - Marketing Digital",
    date: "3 jours",
    urgent: true,
  },
  {
    id: 2,
    titre: "Projet: Étude de Marché",
    date: "5 jours",
    urgent: false,
  },
  {
    id: 3,
    titre: "Quiz: Gestion Financière",
    date: "1 semaine",
    urgent: false,
  },
];

export const mockProchainesSessions: Session[] = [
  {
    id: 1,
    titre: "Webinaire: Tendances Marketing 2026",
    formateur: "Dr. Kouadio Yao",
    date: "15 Fév",
    heure: "14h00",
    participants: 45,
  },
  {
    id: 2,
    titre: "Workshop: Stratégies de Croissance",
    formateur: "Marie Touré",
    date: "18 Fév",
    heure: "10h00",
    participants: 32,
  },
];

export const mockRecommandations: FormationRecommandee[] = [
  {
    id: 1,
    titre: "E-commerce & Marketplace",
    slug: "ecommerce-marketplace",
    niveau: "Intermédiaire",
    duree: "4 semaines",
    note: 4.8,
    prix: 75000,
  },
  {
    id: 2,
    titre: "Data Analytics pour Marketeurs",
    slug: "data-analytics-marketeurs",
    niveau: "Avancé",
    duree: "6 semaines",
    note: 4.9,
    prix: 95000,
  },
  {
    id: 3,
    titre: "Gestion de Projet Agile",
    slug: "gestion-projet-agile",
    niveau: "Débutant",
    duree: "3 semaines",
    note: 4.7,
    prix: 65000,
  },
  {
    id: 4,
    titre: "Communication Corporate",
    slug: "communication-corporate",
    niveau: "Intermédiaire",
    duree: "5 semaines",
    note: 4.6,
    prix: 80000,
  },
];

export const mockStatsEvolution: StatsEvolution = {
  heuresCeSemaine: [2, 3, 2, 4, 3, 5, 2],
  heuresSemaineDerniere: [1, 2, 3, 2, 3, 4, 2],
  evolutionHeures: 15,
  evolutionModules: 8,
  evolutionCertificats: 2,
};

