"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { 
  CheckCircle, 
  Award, 
  FileCheck, 
  ClipboardCheck, 
  Users, 
  Calendar,
  ArrowRight,
  Download,
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Shield,
  ThumbsUp,
  QrCode,
  Layers,
  Hammer,
  Database,
  Folder,
  UserCheck,
  BadgeCheck,
  Search,
  Car,
  Home,
  Snowflake,
  Wrench,
  Shirt,
  Scissors,
  Wheat,
  Laptop,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Upload,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageBanner } from "@/components/layout/PageBanner";
import { racService, type RacMetierPublic, type RacMetierRequiredDocument } from "@/lib/api/services/rac.service";
import { faqService } from "@/lib/api/services";
import { getFriendlyApiErrorMessage } from "@/lib/api/error-messages";
import type { Faq } from "@/lib/api/types";
import Link from "next/link";

// ─── FileUploadZone ───────────────────────────────────────────────────────────
function FileUploadZone({
  label,
  formats,
  required,
  value,
  onUrlChange,
}: {
  label: string;
  formats?: string[] | null;
  required?: boolean;
  value: string;
  onUrlChange: (url: string) => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const acceptedTypes =
    formats && formats.length > 0
      ? formats.map((f) => `.${f.toLowerCase()}`).join(",")
      : ".pdf,.doc,.docx,.jpg,.jpeg,.png";

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const text = e.dataTransfer.getData("text/plain");
    if (text && (text.startsWith("http://") || text.startsWith("https://"))) {
      onUrlChange(text.trim());
      setFileName("");
      return;
    }
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFileName(file.name);
      onUrlChange(URL.createObjectURL(file));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onUrlChange(URL.createObjectURL(file));
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text/plain").trim();
    if (text.startsWith("http://") || text.startsWith("https://")) {
      e.preventDefault();
      onUrlChange(text);
      setFileName("");
    }
  };

  const clear = () => {
    onUrlChange("");
    setFileName("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const hasValue = Boolean(value && value.trim());

  return (
    <div className="space-y-2" onPaste={handlePaste} tabIndex={-1}>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm font-semibold text-gray-800">{label}</span>
        {required && (
          <span className="text-[11px] font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
            Obligatoire
          </span>
        )}
        {formats && formats.length > 0 && (
          <span className="text-[11px] text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
            {formats.map((f) => f.toUpperCase()).join(" · ")}
          </span>
        )}
      </div>

      {!hasValue ? (
        <div
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 group select-none ${
            isDragging
              ? "border-orange-500 bg-orange-50/80 scale-[1.01] shadow-lg shadow-orange-100"
              : "border-gray-200 hover:border-orange-400 hover:bg-orange-50/40"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={acceptedTypes}
            className="hidden"
            onChange={handleFileChange}
          />
          <div
            className={`w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center transition-all duration-300 ${
              isDragging
                ? "bg-orange-100 scale-110 rotate-3"
                : "bg-gray-100 group-hover:bg-orange-100 group-hover:scale-105"
            }`}
          >
            <Upload
              className={`w-7 h-7 transition-colors ${
                isDragging
                  ? "text-orange-500"
                  : "text-gray-400 group-hover:text-orange-500"
              }`}
            />
          </div>
          <p
            className={`font-semibold text-sm mb-1 transition-colors ${
              isDragging
                ? "text-orange-600"
                : "text-gray-600 group-hover:text-orange-600"
            }`}
          >
            {isDragging ? "✓ Déposez ici" : "Glisser-déposer ou cliquer pour sélectionner"}
          </p>
          <p className="text-xs text-gray-400 mb-3">Formats acceptés : {acceptedTypes.replace(/\./g, "").toUpperCase()}</p>
          <div className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm">
            <kbd className="bg-gray-50 border border-gray-300 rounded px-1 py-0.5 text-[10px] font-mono text-gray-500">Ctrl+V</kbd>
            <span>pour coller une URL</span>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 p-4 bg-green-50 border-2 border-green-200 rounded-2xl animate-fade-in group">
          <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-green-800 truncate">
              {fileName || value}
            </p>
            <p className="text-xs text-green-600 mt-0.5">
              {fileName ? "Fichier sélectionné" : "URL configurée"}
            </p>
          </div>
          <button
            type="button"
            onClick={clear}
            className="w-9 h-9 rounded-xl bg-green-100 hover:bg-red-100 flex items-center justify-center transition-all duration-200 flex-shrink-0 hover:scale-110"
            aria-label="Supprimer"
          >
            <X className="w-4 h-4 text-green-600 hover:text-red-500 transition-colors" />
          </button>
        </div>
      )}
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

function normalizeFaqCategory(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function RACPage() {
  const [selectedType, setSelectedType] = useState("professionnel");
  const [openSecteur, setOpenSecteur] = useState<string>("automobile");
  const [searchMetier, setSearchMetier] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Tous");

  const typesRAC = [
    {
      id: "professionnel",
      title: "Professionnel",
      description: "Pour valider vos compétences acquises par l'expérience professionnelle",
      icon: <Briefcase className="w-6 h-6" />,
      color: "orange"
    },
    {
      id: "formation",
      title: "Formation continue",
      description: "Pour reconnaître les acquis de vos formations non diplômantes",
      icon: <GraduationCap className="w-6 h-6" />,
      color: "blue"
    },
    {
      id: "mixte",
      title: "Parcours mixte",
      description: "Combinaison d'expérience professionnelle et de formations",
      icon: <Target className="w-6 h-6" />,
      color: "green"
    }
  ];

  const avantages = [
    {
      icon: <ThumbsUp className="w-8 h-8 text-orange-500" />,
      title: "Pas de formation obligatoire",
      description: "Le RAC valorise ce que vous savez déjà faire. Pas besoin de retourner en formation."
    },
    {
      icon: <Award className="w-8 h-8 text-orange-500" />,
      title: "Certification officielle",
      description: "Obtenez un certificat reconnu, vérifiable via QR code dans le registre national."
    },
    {
      icon: <Layers className="w-8 h-8 text-orange-500" />,
      title: "Validation modulaire",
      description: "Validez 1 bloc ou la certification complète selon votre niveau de maîtrise."
    },
    {
      icon: <Hammer className="w-8 h-8 text-orange-500" />,
      title: "Épreuve pratique réelle",
      description: "Au moins 1 mise en situation professionnelle pour garantir la crédibilité."
    },
    {
      icon: <Database className="w-8 h-8 text-orange-500" />,
      title: "Traçabilité numérique",
      description: "Dossier numérique complet, décisions motivées et certificat vérifiable."
    },
    {
      icon: <Briefcase className="w-8 h-8 text-orange-500" />,
      title: "Accès aux marchés",
      description: "Ouvre les portes des appels d'offres, financements et opportunités d'emploi."
    }
  ];

  const etapes = [
    {
      numero: 1,
      titre: "Information & Candidature",
      icon: <FileCheck className="w-6 h-6" />,
      description: "Découvrez le RAC et déposez votre candidature avec vos justificatifs d'expérience",
      duree: "1-2 semaines"
    },
    {
      numero: 2,
      titre: "Analyse de recevabilité",
      icon: <ClipboardCheck className="w-6 h-6" />,
      description: "Vérification de vos preuves et de votre éligibilité au métier choisi",
      duree: "1-2 semaines"
    },
    {
      numero: 3,
      titre: "Constitution du dossier",
      icon: <Folder className="w-6 h-6" />,
      description: "Accompagnement pour documenter vos compétences par blocs",
      duree: "2-4 semaines"
    },
    {
      numero: 4,
      titre: "Évaluation pratique",
      icon: <Hammer className="w-6 h-6" />,
      description: "Mise en situation professionnelle et/ou épreuve pratique devant jury",
      duree: "1-2 jours"
    },
    {
      numero: 5,
      titre: "Jury de certification",
      icon: <UserCheck className="w-6 h-6" />,
      description: "Délibération et décision sur la validation totale ou partielle",
      duree: "1 semaine"
    },
    {
      numero: 6,
      titre: "Délivrance du certificat",
      icon: <BadgeCheck className="w-6 h-6" />,
      description: "Remise du certificat avec QR code de vérification dans le registre national",
      duree: "1-2 semaines"
    }
  ];

  const documentsRequis = [
    "CV détaillé",
    "Copies des diplômes et certifications",
    "Attestations d'employeurs",
    "Preuves de réalisations (projets, rapports, etc.)",
    "Lettre de motivation",
    "Pièce d'identité"
  ];

  const secteursMetiers = [
    {
      id: "automobile",
      nom: "Automobile & Transport",
      icon: <Car className="w-5 h-5" />,
      nombreMetiers: 6,
      metiers: [
        { nom: "Mécanique automobile", blocs: 5, duree: "3-5 mois", niveau: "CAP/BT" },
        { nom: "Peinture automobile", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" },
        { nom: "Logistique & Transport", blocs: 6, duree: "4-8 mois", niveau: "BT/BTS" },
        { nom: "Mécanique moto", blocs: 4, duree: "2-4 mois", niveau: "CAP" },
        { nom: "Électricité automobile", blocs: 5, duree: "3-6 mois", niveau: "BT" },
        { nom: "Carrosserie automobile", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" }
      ]
    },
    {
      id: "btp",
      nom: "BTP & Construction",
      icon: <Home className="w-5 h-5" />,
      nombreMetiers: 7,
      metiers: [
        { nom: "Maçonnerie", blocs: 5, duree: "4-6 mois", niveau: "CAP/BT" },
        { nom: "Plomberie", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" },
        { nom: "Électricité bâtiment", blocs: 5, duree: "4-6 mois", niveau: "BT" },
        { nom: "Menuiserie bois", blocs: 4, duree: "3-5 mois", niveau: "CAP" },
        { nom: "Carrelage & Faïence", blocs: 3, duree: "2-4 mois", niveau: "CAP" },
        { nom: "Peinture bâtiment", blocs: 3, duree: "2-4 mois", niveau: "CAP" },
        { nom: "Chef de chantier", blocs: 6, duree: "5-8 mois", niveau: "BTS" }
      ]
    },
    {
      id: "froid",
      nom: "Froid & Climatisation",
      icon: <Snowflake className="w-5 h-5" />,
      nombreMetiers: 3,
      metiers: [
        { nom: "Froid commercial", blocs: 5, duree: "4-6 mois", niveau: "BT" },
        { nom: "Climatisation", blocs: 5, duree: "4-6 mois", niveau: "BT" },
        { nom: "Maintenance frigorifique", blocs: 6, duree: "5-7 mois", niveau: "BTS" }
      ]
    },
    {
      id: "metallurgie",
      nom: "Métallurgie & Soudure",
      icon: <Wrench className="w-5 h-5" />,
      nombreMetiers: 8,
      metiers: [
        { nom: "Soudure TIG", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" },
        { nom: "Soudure MIG/MAG", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" },
        { nom: "Soudure arc électrique", blocs: 4, duree: "3-5 mois", niveau: "CAP" },
        { nom: "Chaudronnerie", blocs: 5, duree: "4-6 mois", niveau: "BT" },
        { nom: "Métallerie", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" },
        { nom: "Serrurerie", blocs: 4, duree: "3-5 mois", niveau: "CAP" },
        { nom: "Tuyauterie industrielle", blocs: 5, duree: "4-6 mois", niveau: "BT" },
        { nom: "Contrôle qualité soudure", blocs: 4, duree: "3-5 mois", niveau: "BT/BTS" }
      ]
    },
    {
      id: "habillement",
      nom: "Habillement & Couture",
      icon: <Shirt className="w-5 h-5" />,
      nombreMetiers: 4,
      metiers: [
        { nom: "Couture mode", blocs: 4, duree: "3-5 mois", niveau: "CAP" },
        { nom: "Stylisme modélisme", blocs: 5, duree: "4-6 mois", niveau: "BT" },
        { nom: "Retouche & réparation", blocs: 3, duree: "2-4 mois", niveau: "CAP" },
        { nom: "Maroquinerie", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" }
      ]
    },
    {
      id: "coiffure",
      nom: "Coiffure & Esthétique",
      icon: <Scissors className="w-5 h-5" />,
      nombreMetiers: 4,
      metiers: [
        { nom: "Coiffure mixte", blocs: 5, duree: "4-6 mois", niveau: "CAP/BT" },
        { nom: "Tressage africain", blocs: 3, duree: "2-4 mois", niveau: "CAP" },
        { nom: "Esthétique & soins", blocs: 5, duree: "4-6 mois", niveau: "CAP/BT" },
        { nom: "Maquillage professionnel", blocs: 3, duree: "2-4 mois", niveau: "CAP" }
      ]
    },
    {
      id: "agroalimentaire",
      nom: "Agroalimentaire",
      icon: <Wheat className="w-5 h-5" />,
      nombreMetiers: 4,
      metiers: [
        { nom: "Boulangerie-pâtisserie", blocs: 5, duree: "4-6 mois", niveau: "CAP/BT" },
        { nom: "Cuisine professionnelle", blocs: 5, duree: "4-6 mois", niveau: "CAP/BT" },
        { nom: "Transformation alimentaire", blocs: 4, duree: "3-5 mois", niveau: "BT" },
        { nom: "Hygiène alimentaire", blocs: 3, duree: "2-4 mois", niveau: "CAP" }
      ]
    },
    {
      id: "numerique",
      nom: "Numérique & Informatique",
      icon: <Laptop className="w-5 h-5" />,
      nombreMetiers: 4,
      metiers: [
        { nom: "Maintenance informatique", blocs: 5, duree: "4-6 mois", niveau: "BT/BTS" },
        { nom: "Développement web", blocs: 6, duree: "5-8 mois", niveau: "BTS" },
        { nom: "Réseaux & télécoms", blocs: 5, duree: "4-6 mois", niveau: "BT/BTS" },
        { nom: "Bureautique avancée", blocs: 4, duree: "3-5 mois", niveau: "CAP/BT" }
      ]
    }
  ];

  const formations = [
    {
      titre: "Gestion de Projet Agile",
      niveau: "Intermédiaire",
      duree: "120 heures d'expérience",
      prix: "75 000 FCFA"
    },
    {
      titre: "Marketing Digital PME",
      niveau: "Avancé",
      duree: "150 heures d'expérience",
      prix: "85 000 FCFA"
    },
    {
      titre: "Gestion Financière PME",
      niveau: "Intermédiaire",
      duree: "100 heures d'expérience",
      prix: "70 000 FCFA"
    },
    {
      titre: "Entrepreneuriat & Innovation",
      niveau: "Tous niveaux",
      duree: "80 heures d'expérience",
      prix: "65 000 FCFA"
    }
  ];

  type DocumentJointForm = {
    name: string;
    type: string;
    url: string;
  };

  type RacFormData = {
    racMetierId: string;
    candidat: string;
    email: string;
    telephone: string;
    dateDepot: string;
    anneesExperience: number;
    documentsJoints: DocumentJointForm[];
    commentaireLibre: string;
  };

  const [racMetiersApi, setRacMetiersApi] = useState<RacMetierPublic[]>([]);
  const [requiredDocumentsForSelected, setRequiredDocumentsForSelected] = useState<RacMetierRequiredDocument[]>([]);
  const [loadingRacMetiers, setLoadingRacMetiers] = useState(true);
  const [loadingRequiredDocuments, setLoadingRequiredDocuments] = useState(false);
  const [racSubmitStatus, setRacSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [racSubmitMessage, setRacSubmitMessage] = useState<string | null>(null);
  const [isSubmittingRac, setIsSubmittingRac] = useState(false);
  const [createdRacDossier, setCreatedRacDossier] = useState<{ id: string; statut?: string; timelineCount?: number } | null>(null);
  const [racFaqs, setRacFaqs] = useState<Faq[]>([]);
  const [loadingRacFaqs, setLoadingRacFaqs] = useState(true);
  const [racFaqError, setRacFaqError] = useState<string | null>(null);
  const viewedFaqIdsRef = useRef<Set<string>>(new Set());
  const [racFormVisible, setRacFormVisible] = useState(false);
  const [racFormData, setRacFormData] = useState<RacFormData>({
    racMetierId: "",
    candidat: "",
    email: "",
    telephone: "",
    dateDepot: new Date().toISOString().slice(0, 10),
    anneesExperience: 0,
    documentsJoints: [{ name: "", type: "", url: "" }],
    commentaireLibre: "",
  });

  useEffect(() => {
    let cancelled = false;
    async function fetchRacMetiers() {
      setLoadingRacMetiers(true);
      try {
        const items = await racService.getPublicMetiers();
        if (!cancelled) {
          setRacMetiersApi(items);
        }
      } catch {
        if (!cancelled) {
          setRacMetiersApi([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingRacMetiers(false);
        }
      }
    }
    fetchRacMetiers();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchRacFaqs() {
      setLoadingRacFaqs(true);
      setRacFaqError(null);

      try {
        const items = await faqService.getPublic({ statut: "Publié" });
        const filtered = items
          .filter((faq) => normalizeFaqCategory(String(faq.categorie || "")) === "rac")
          .sort((a, b) => (a.ordre || 0) - (b.ordre || 0));

        if (!cancelled) {
          setRacFaqs(filtered);
        }
      } catch (error: unknown) {
        if (!cancelled) {
          setRacFaqs([]);
          setRacFaqError(getFriendlyApiErrorMessage(error, "default"));
        }
      } finally {
        if (!cancelled) {
          setLoadingRacFaqs(false);
        }
      }
    }

    fetchRacFaqs();

    return () => {
      cancelled = true;
    };
  }, []);

  // Scroll-reveal animation for page sections
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const selectedRacMetier = useMemo(
    () => racMetiersApi.find((m) => m.id === racFormData.racMetierId) || null,
    [racMetiersApi, racFormData.racMetierId]
  );

  const displaySecteursMetiers = useMemo(() => {
    if (racMetiersApi.length === 0) return secteursMetiers;

    const grouped = racMetiersApi.reduce<Record<string, { id: string; nom: string; metiers: any[] }>>((acc, metier) => {
      const key = (metier.secteur || "Autres").trim();
      if (!acc[key]) {
        acc[key] = {
          id: key.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "autres",
          nom: key,
          metiers: [],
        };
      }
      acc[key].metiers.push({
        id: metier.id,
        nom: metier.nom,
        blocs: metier.requiredDocuments?.length ?? 0,
        duree: "RAC",
        niveau: metier.niveau || "N/A",
        requiredDocuments: metier.requiredDocuments || [],
      });
      return acc;
    }, {});

    return Object.values(grouped).map((secteur) => ({
      ...secteur,
      icon: <Briefcase className="w-5 h-5" />,
      nombreMetiers: secteur.metiers.length,
    }));
  }, [racMetiersApi]);

  const sectorFilterOptions = useMemo(() => {
    const names = displaySecteursMetiers.map((s) => s.nom);
    return ["Tous", ...names.slice(0, 6)];
  }, [displaySecteursMetiers]);

  const setRacField = <K extends keyof RacFormData>(field: K, value: RacFormData[K]) => {
    setRacFormData((prev) => ({ ...prev, [field]: value }));
    if (racSubmitStatus !== "idle") setRacSubmitStatus("idle");
    if (racSubmitMessage) setRacSubmitMessage(null);
    if (createdRacDossier) setCreatedRacDossier(null);
  };

  const updateDocument = (index: number, field: keyof DocumentJointForm, value: string) => {
    setRacFormData((prev) => {
      const next = [...prev.documentsJoints];
      next[index] = { ...next[index], [field]: value };
      return { ...prev, documentsJoints: next };
    });
    if (racSubmitStatus !== "idle") setRacSubmitStatus("idle");
    if (racSubmitMessage) setRacSubmitMessage(null);
    if (createdRacDossier) setCreatedRacDossier(null);
  };

  const inferDocType = (rawType: string, rawUrl: string): string => {
    const byType = rawType.trim().toLowerCase();
    if (byType) return byType;

    const cleanUrl = rawUrl.trim().split("?")[0].split("#")[0];
    const ext = cleanUrl.includes(".") ? cleanUrl.split(".").pop() || "" : "";
    return ext.trim().toLowerCase() || "pdf";
  };

  const addDocumentRow = () => {
    setRacFormData((prev) => ({
      ...prev,
      documentsJoints: [...prev.documentsJoints, { name: "", type: "", url: "" }],
    }));
  };

  const removeDocumentRow = (index: number) => {
    setRacFormData((prev) => {
      if (prev.documentsJoints.length <= 1) return prev;
      return {
        ...prev,
        documentsJoints: prev.documentsJoints.filter((_, i) => i !== index),
      };
    });
  };

  const prefillForMetier = async (metierId: string) => {
    const metier = racMetiersApi.find((m) => m.id === metierId);
    setLoadingRequiredDocuments(true);

    let requiredDocs = metier?.requiredDocuments || [];
    try {
      const fromApi = await racService.getMetierRequiredDocuments(metierId);
      if (fromApi.length > 0) {
        requiredDocs = fromApi;
      }
    } catch {
      // Keep fallback docs from public metier payload
    } finally {
      setLoadingRequiredDocuments(false);
    }

    setRequiredDocumentsForSelected(requiredDocs);

    const docs = requiredDocs.map((d) => ({
      name: d.label || "",
      type: (d.formats?.[0] || "pdf").toLowerCase(),
      url: "",
    }));

    setRacFormData((prev) => ({
      ...prev,
      racMetierId: metierId,
      documentsJoints: docs.length > 0 ? docs : [{ name: "", type: "pdf", url: "" }],
    }));
    setRacSubmitStatus("idle");
    setRacSubmitMessage(null);
    setRacFormVisible(true);
    setTimeout(() => {
      document.getElementById("rac-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  const closeRacForm = () => {
    setRacFormVisible(false);
    setRacSubmitStatus("idle");
    setRacSubmitMessage(null);
    setIsSubmittingRac(false);
  };

  const handleFaqView = async (faqId: string) => {
    if (!faqId || viewedFaqIdsRef.current.has(faqId)) return;

    viewedFaqIdsRef.current.add(faqId);

    try {
      await faqService.recordView(faqId);
      setRacFaqs((prev) =>
        prev.map((item) =>
          item.id === faqId
            ? { ...item, vues: Number(item.vues || 0) + 1 }
            : item
        )
      );
    } catch {
      // Do not block FAQ interaction when metrics endpoint fails.
    }
  };

  const handleRacSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const docsPayload = racFormData.documentsJoints
      .map((d) => ({
        name: d.name.trim(),
        type: inferDocType(d.type, d.url),
        url: d.url.trim(),
      }))
      .filter((d) => d.name && d.type && d.url);

    if (!racFormData.racMetierId || !racFormData.candidat || !racFormData.email || !racFormData.telephone || !racFormData.dateDepot) {
      setRacSubmitStatus("error");
      setRacSubmitMessage("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (requiredDocumentsForSelected.length > 0) {
      const missingRequired = requiredDocumentsForSelected.some((doc, idx) => {
        if (!doc.obligatoire) return false;
        const row = racFormData.documentsJoints[idx];
        return !row || !row.url || !row.url.trim();
      });

      if (missingRequired) {
        setRacSubmitStatus("error");
        setRacSubmitMessage("Veuillez joindre tous les documents obligatoires du RAC métier sélectionné.");
        return;
      }

      const invalidFormat = requiredDocumentsForSelected.some((doc, idx) => {
        const allowed = (doc.formats || []).map((f) => f.toLowerCase());
        if (allowed.length === 0) return false;
        const row = racFormData.documentsJoints[idx];
        if (!row) return false;
        return !allowed.includes(inferDocType(row.type, row.url));
      });

      if (invalidFormat) {
        setRacSubmitStatus("error");
        setRacSubmitMessage("Un ou plusieurs documents ont un format non autorisé par le RAC métier.");
        return;
      }
    }

    if (docsPayload.length === 0) {
      setRacSubmitStatus("error");
      setRacSubmitMessage("Ajoutez au moins un document justificatif valide.");
      return;
    }

    try {
      setIsSubmittingRac(true);
      const created = await racService.createDossier({
        racMetierId: racFormData.racMetierId,
        candidat: racFormData.candidat,
        email: racFormData.email,
        telephone: racFormData.telephone,
        dateDepot: racFormData.dateDepot,
        anneesExperience: Number(racFormData.anneesExperience) || 0,
        documentsJoints: docsPayload,
      });

      let timelineCount = 0;
      if (created?.id) {
        try {
          const timeline = await racService.getDossierTimeline(created.id);
          timelineCount = timeline.length;
        } catch {
          timelineCount = 0;
        }
      }

      setRacSubmitStatus("success");
      setRacSubmitMessage(null);
      if (created?.id) {
        setCreatedRacDossier({
          id: created.id,
          statut: created.statut,
          timelineCount,
        });
      } else {
        setCreatedRacDossier(null);
      }
      setRacFormData((prev) => ({
        ...prev,
        candidat: "",
        email: "",
        telephone: "",
        anneesExperience: 0,
        commentaireLibre: "",
        documentsJoints:
          requiredDocumentsForSelected.length > 0
            ? requiredDocumentsForSelected.map((doc) => ({
                name: doc.label || "",
                type: (doc.formats?.[0] || "pdf").toLowerCase(),
                url: "",
              }))
            : [{ name: "", type: "", url: "" }],
      }));
    } catch (error: unknown) {
      setRacSubmitStatus("error");
      setRacSubmitMessage(getFriendlyApiErrorMessage(error, "default"));
      setCreatedRacDossier(null);
    } finally {
      setIsSubmittingRac(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <PageBanner 
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "RAC" }
        ]}
        slides={[
          {
            image: "/images/default-formation.jpg",
            title: "Reconnaissance des Acquis de Compétences",
            subtitle: "Obtenez une certification officielle basée sur votre expérience professionnelle",
            badge: {
              icon: "🎯 ",
              number: "3-6",
              text: "Mois pour être certifié",
              subtext: "Processus accéléré"
            },
            trustBadges: [
              {
                icon: "check",
                color: "green",
                title: "Sans formation",
                subtitle: "Valorisation directe"
              },
              {
                icon: "check",
                color: "blue",
                title: "Certification officielle",
                subtitle: "Reconnue par l'État"
              },
              {
                icon: "users",
                color: "orange",
                title: "1,200+",
                subtitle: "Certifiés par RAC"
              }
            ]
          },
          {
            image: "/images/formation-agriculture.png",
            title: "Valorisez Votre Expérience",
            subtitle: "Transformez vos compétences en certifications reconnues",
            badge: {
              icon: "+",
              number: "5",
              text: "Années minimum",
              subtext: "D'expérience requise"
            },
            trustBadges: [
              {
                icon: "building",
                color: "purple",
                title: "Tous secteurs",
                subtitle: "Agriculture, Tech, Commerce..."
              },
              {
                icon: "check",
                color: "green",
                title: "Portfolio de preuves",
                subtitle: "Dossier personnalisé"
              },
              {
                icon: "users",
                color: "orange",
                title: "Accompagnement",
                subtitle: "Conseiller dédié"
              }
            ]
          },
          {
            image: "/images/default-formation.jpg",
            title: "Certification Sans Formation Complète",
            subtitle: "Gagnez du temps en validant directement vos acquis professionnels",
            badge: {
              number: "90%",
              text: "Taux de réussite",
              subtext: "Avec accompagnement"
            },
            trustBadges: [
              {
                icon: "users",
                color: "blue",
                title: "Jury d'experts",
                subtitle: "Évaluation professionnelle"
              },
              {
                icon: "users",
                color: "orange",
                title: "Entretien individuel",
                subtitle: "Présentation de parcours"
              },
              {
                icon: "check",
                color: "green",
                title: "Équivalence diplôme",
                subtitle: "Même valeur"
              }
            ]
          }
        ]}
      />

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-green-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg transition-all duration-300 hover:scale-105  group"
              onClick={() => {
                setRacFormVisible(true);
                setTimeout(() => document.getElementById("rac-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
              }}
            >
              Déposer ma candidature
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="border-2 border-gray-300 hover:border-orange-500 hover:bg-orange-50 px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:scale-105  group">
              Télécharger le guide
              <Download className="ml-2 w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>

      {/* Qu'est-ce que le RAC */}
      <section className="py-16 bg-white" data-reveal>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Qu'est-ce que le RAC ?
              </h2>
              <p className="text-lg text-gray-600">
                Le RAC est un processus qui permet d'évaluer et de reconnaître officiellement les compétences 
                que vous avez acquises par votre expérience de travail et vos apprentissages.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-green-50 rounded-2xl p-8 md:p-12 border border-orange-100">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    Pourquoi choisir le RAC ?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Valorisez votre expérience professionnelle</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Réduisez la durée de votre parcours de formation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Obtenez une certification reconnue</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Économisez temps et argent</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-orange-500" />
                    Pour qui ?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Professionnels avec plusieurs années d'expérience</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Entrepreneurs et chefs d'entreprise</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Personnes en reconversion professionnelle</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ArrowRight className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">Autodidactes souhaitant obtenir une certification</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Types de RAC */}
      <section className="py-16 bg-gray-50" data-reveal>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Types de RAC proposés
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choisissez le type de reconnaissance qui correspond à votre profil
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {typesRAC.map((type, index) => (
              <Card
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-6 cursor-pointer transition-all duration-300 animate-fade-in group relative overflow-hidden ${
                  selectedType === type.id
                    ? "border-2 border-orange-500 shadow-xl scale-105 bg-gradient-to-br from-orange-50 to-white"
                    : "border-2 border-gray-200 hover:border-orange-300 hover:scale-105 hover:-translate-y-2"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background decoration */}
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-orange-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 ${
                  selectedType === type.id ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg' : 'bg-orange-100'
                }`}>
                  <div className={selectedType === type.id ? 'text-white' : 'text-orange-600'}>
                    {type.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                  {type.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {type.description}
                </p>
                {selectedType === type.id && (
                  <div className="absolute top-4 right-4">
                    <CheckCircle className="w-6 h-6 text-orange-500 animate-scale-in" />
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-white" data-reveal>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Award className="w-4 h-4" />
              Avantages
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir le RAC ?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Le RAC vous offre une voie rapide et crédible vers la certification
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {avantages.map((avantage, index) => (
              <Card key={index} className="p-6 transition-all duration-300 border-2 border-gray-100 hover:border-orange-200 hover:scale-105 group animate-fade-in relative overflow-hidden" style={{ animationDelay: `${index * 100}ms` }}>
                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="flex items-start gap-4 relative z-10">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center group-hover:bg-orange-100 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {avantage.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {avantage.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {avantage.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Validation modulaire */}
      <section className="py-16 bg-gradient-to-br from-white via-orange-50 to-green-50" data-reveal>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Layers className="w-4 h-4" />
                Blocs de compétences
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Validation modulaire
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Chaque certification est découpée en blocs que vous pouvez valider progressivement
              </p>
            </div>

            {/* Deux options : Partielle vs Complète */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Validation partielle */}
              <Card className="p-8 border-2 border-orange-200 bg-white transition-all">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-orange-600 mb-2">
                      Validation partielle
                    </h3>
                    <p className="text-gray-600">
                      Validez un ou plusieurs blocs
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Attestation par bloc validé</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Blocs capitalisables à vie</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Reprise possible pour compléter</span>
                  </li>
                </ul>
              </Card>

              {/* Certification complète */}
              <Card className="p-8 border-2 border-green-200 bg-gradient-to-br from-white to-green-50 transition-all relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  <div className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    RECOMMANDÉ
                  </div>
                </div>
                
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Certification complète
                    </h3>
                    <p className="text-gray-600">
                      Validez tous les blocs requis
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Certificat professionnel officiel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">QR code de vérification</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">Inscription au registre national</span>
                  </li>
                </ul>
              </Card>
            </div>

            {/* Exemple : Mécanique automobile */}
            <Card className="p-8 bg-white border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Exemple : Mécanique automobile (5 blocs)
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {[
                  { num: 1, titre: "Diagnostic moteur" },
                  { num: 2, titre: "Systèmes de freinage" },
                  { num: 3, titre: "Transmission" },
                  { num: 4, titre: "Électricité auto" },
                  { num: 5, titre: "Révision & entretien" }
                ].map((bloc, index) => (
                  <div 
                    key={bloc.num}
                    className="p-4 border-2 border-dashed border-gray-300 rounded-xl text-center hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 group cursor-pointer animate-fade-in hover:scale-105 "
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-orange-100 text-gray-700 group-hover:text-orange-600 flex items-center justify-center font-bold mx-auto mb-3 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                      {bloc.num}
                    </div>
                    <h4 className="font-semibold text-gray-900 text-sm leading-tight group-hover:text-orange-600 transition-colors">
                      Bloc {bloc.num}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {bloc.titre}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                <p className="text-sm text-blue-900">
                  <strong>Comment ça marche ?</strong> Vous pouvez valider uniquement les blocs 1 et 2 cette année, 
                  puis compléter les blocs 3, 4 et 5 plus tard. Chaque bloc validé reste acquis définitivement.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Processus en 6 étapes */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50" data-reveal>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              6 étapes pour obtenir votre certification RAC
            </h2>
            <p className="text-lg text-gray-600">
              Un parcours simple et accompagné du début à la fin
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {etapes.map((etape, index) => (
                <Card 
                  key={index} 
                  className="p-6 transition-all duration-300 border-2 border-gray-100 hover:border-orange-300 hover:scale-105  group relative overflow-hidden animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Numéro en arrière-plan */}
                  <div className="absolute -top-4 -right-4 text-8xl font-bold text-orange-50 group-hover:text-orange-100 transition-all duration-500 group-hover:scale-110">
                    {etape.numero}
                  </div>
                  
                  <div className="relative z-10">
                    {/* Icône */}
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      {etape.icon}
                    </div>
                    
                    {/* Titre */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                      {etape.titre}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {etape.description}
                    </p>
                    
                    {/* Durée */}
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <Clock className="w-4 h-4 group-hover:scale-110 transition-transform" />
                      <span className="text-sm">Durée : {etape.duree}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents requis */}
      <section className="py-16 bg-white" data-reveal>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Documents requis
              </h2>
              <p className="text-lg text-gray-600">
                Préparez ces documents pour constituer votre dossier
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {documentsRequis.map((doc, index) => (
                <Card key={index} className="p-4 flex items-center gap-3 border-2 border-gray-100 hover:border-orange-300 transition-all duration-300 group cursor-pointer hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                  <FileCheck className="w-6 h-6 text-orange-500 flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300" />
                  <span className="text-gray-700 font-medium group-hover:text-orange-600 transition-colors">{doc}</span>
                </Card>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
              <div className="flex items-start gap-3">
                <ClipboardCheck className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-2">Conseil important</h4>
                  <p className="text-blue-800 text-sm">
                    Plus vos documents sont complets et détaillés, plus l'évaluation de votre dossier sera rapide. 
                    N'hésitez pas à fournir tous les éléments prouvant vos compétences (certificats, lettres de recommandation, 
                    portfolios, etc.).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Métiers certifiables RAC */}
      <section className="py-16 bg-gray-50" data-reveal>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Métiers certifiables RAC
              </h2>
              <p className="text-lg text-gray-600">
                35+ métiers répartis dans 8 secteurs d'activité
              </p>
            </div>

            {/* Barre de recherche et filtres */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
                {/* Recherche */}
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un métier..."
                    value={searchMetier}
                    onChange={(e) => setSearchMetier(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                  />
                </div>

                {/* Filtres */}
                <div className="flex gap-2 flex-wrap justify-center">
                  {sectorFilterOptions.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setSelectedFilter(filter)}
                      className={`px-4 py-2 rounded-xl font-medium transition-all ${
                        selectedFilter === filter
                          ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg"
                          : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Liste des secteurs avec accordéon */}
            <div className="space-y-4">
              {displaySecteursMetiers
                .filter(secteur => {
                  // Filtrage par catégorie
                  if (selectedFilter === "Tous") return true;
                  return secteur.nom === selectedFilter;
                })
                .filter(secteur => {
                  // Filtrage par recherche
                  if (!searchMetier) return true;
                  const searchLower = searchMetier.toLowerCase();
                  return secteur.nom.toLowerCase().includes(searchLower) ||
                         secteur.metiers.some(metier => metier.nom.toLowerCase().includes(searchLower));
                })
                .length === 0 ? (
                  <Card className="p-12 text-center border-2 border-gray-200">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          Aucun métier trouvé
                        </h3>
                        <p className="text-gray-600">
                          Essayez de modifier vos critères de recherche ou vos filtres
                        </p>
                      </div>
                      <Button 
                        onClick={() => {
                          setSearchMetier("");
                          setSelectedFilter("Tous");
                        }}
                        variant="outline" 
                        className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                      >
                        Réinitialiser les filtres
                      </Button>
                    </div>
                  </Card>
                ) : (
                  displaySecteursMetiers
                    .filter(secteur => {
                      // Filtrage par catégorie
                      if (selectedFilter === "Tous") return true;
                      return secteur.nom === selectedFilter;
                    })
                    .filter(secteur => {
                      // Filtrage par recherche
                      if (!searchMetier) return true;
                      const searchLower = searchMetier.toLowerCase();
                      return secteur.nom.toLowerCase().includes(searchLower) ||
                             secteur.metiers.some(metier => metier.nom.toLowerCase().includes(searchLower));
                    })
                    .map((secteur) => (
                <Card 
                  key={secteur.id} 
                  className="border-2 border-gray-200 hover:border-orange-300 transition-all overflow-hidden"
                >
                  {/* En-tête du secteur */}
                  <button
                    onClick={() => setOpenSecteur(openSecteur === secteur.id ? "" : secteur.id)}
                    className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                        {secteur.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {secteur.nom}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                            {secteur.nombreMetiers} métiers
                          </span>
                        </div>
                      </div>
                    </div>
                    {openSecteur === secteur.id ? (
                      <ChevronUp className="w-6 h-6 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </button>

                  {/* Contenu développé */}
                  {openSecteur === secteur.id && (
                    <div className="px-6 pb-6 border-t-2 border-gray-100">
                      <div className="grid md:grid-cols-2 gap-4 pt-4">
                        {secteur.metiers
                          .filter(metier => {
                            // Filtrage par recherche dans les métiers
                            if (!searchMetier) return true;
                            return metier.nom.toLowerCase().includes(searchMetier.toLowerCase());
                          })
                          .map((metier, idx) => (
                          <div 
                            key={idx}
                            className="p-4 bg-white border-2 border-gray-100 rounded-xl hover:border-orange-300 transition-all duration-300 group cursor-pointer hover:scale-105  animate-fade-in relative overflow-hidden"
                            style={{ animationDelay: `${idx * 50}ms` }}
                          >
                            {/* Background glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            
                            <div className="relative z-10">
                              <div className="flex items-start justify-between mb-3">
                                <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                                  {metier.nom}
                                </h4>
                                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded group-hover:scale-110 transition-transform">
                                  {metier.niveau}
                                </span>
                              </div>
                              <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                  <Layers className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
                                  <span>{metier.blocs} blocs</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-green-500 group-hover:scale-110 transition-transform" />
                                  <span>{metier.duree}</span>
                                </div>
                              </div>
                              <Button
                                className="w-full mt-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-sm transition-all"
                                onClick={() => {
                                  const apiMetierId = (metier as any).id as string | undefined;
                                  if (apiMetierId) {
                                    prefillForMetier(apiMetierId);
                                  } else {
                                    document.getElementById("rac-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
                                  }
                                }}
                              >
                                Postuler
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              ))
                )}
            </div>

            {/* Bouton voir tous */}
            <div className="text-center mt-8">
              <Link href="/catalogue">
                <Button variant="outline" className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-6 text-lg">
                  Voir tous les métiers certifiables
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Formulaire dépôt dossier RAC — affiché uniquement au clic Postuler */}
      {racFormVisible && (
        <section id="rac-form" className="py-16 bg-gradient-to-br from-orange-50/60 via-white to-green-50/40 relative overflow-hidden">
          {/* Decorative blobs */}
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-orange-100 rounded-full opacity-25 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-green-100 rounded-full opacity-25 blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto animate-form-reveal">

              {/* Form header */}
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    <FileCheck className="w-4 h-4" />
                    Dossier de candidature
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    Postuler au RAC
                  </h2>
                  {selectedRacMetier ? (
                    <p className="text-lg text-orange-600 font-semibold">
                      {selectedRacMetier.nom}
                      {selectedRacMetier.secteur ? ` · ${selectedRacMetier.secteur}` : ""}
                      {selectedRacMetier.niveau ? ` · ${selectedRacMetier.niveau}` : ""}
                    </p>
                  ) : (
                    <p className="text-gray-500 text-base">Sélectionnez un métier pour personnaliser votre dossier</p>
                  )}
                </div>
                <button
                  onClick={closeRacForm}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center transition-all duration-200 flex-shrink-0 hover:scale-110 group mt-1"
                  aria-label="Fermer le formulaire"
                >
                  <X className="w-5 h-5 text-gray-500 group-hover:text-red-500 transition-colors" />
                </button>
              </div>

              <Card className="border-2 border-orange-100 shadow-2xl rounded-3xl overflow-hidden">
                <form className="p-6 md:p-10 space-y-10" onSubmit={handleRacSubmit}>

                  {/* Métier selector (only if no pre-selected métier) */}
                  {!selectedRacMetier && (
                    <div className="space-y-2">
                      <Label htmlFor="rac-metier-select" className="font-semibold text-gray-800">
                        Choisir un métier RAC <span className="text-orange-500">*</span>
                      </Label>
                      <select
                        id="rac-metier-select"
                        value={racFormData.racMetierId}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val) void prefillForMetier(val);
                          else setRacField("racMetierId", "");
                        }}
                        className="w-full h-12 rounded-xl border-2 border-slate-200 bg-white px-3 text-sm focus:outline-none focus:border-orange-400 transition-colors"
                        required
                      >
                        <option value="">— Sélectionnez un métier —</option>
                        {racMetiersApi.map((m) => (
                          <option key={m.id} value={m.id}>
                            {m.nom}{m.secteur ? ` — ${m.secteur}` : ""}
                          </option>
                        ))}
                      </select>
                      {loadingRacMetiers && (
                        <p className="text-xs text-slate-400">Chargement des métiers depuis l'API…</p>
                      )}
                    </div>
                  )}

                  {/* ── Section 1 : Informations personnelles ── */}
                  <div>
                    <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-orange-100">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                        1
                      </div>
                      Informations personnelles
                    </h3>
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <Label htmlFor="rac-candidat" className="font-medium text-gray-700">
                          Nom complet <span className="text-orange-500">*</span>
                        </Label>
                        <Input
                          id="rac-candidat"
                          value={racFormData.candidat}
                          onChange={(e) => setRacField("candidat", e.target.value)}
                          className="h-12 rounded-xl border-2 border-slate-200 focus:border-orange-400 transition-colors"
                          placeholder="Jean Dupont"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rac-email" className="font-medium text-gray-700">
                          Email <span className="text-orange-500">*</span>
                        </Label>
                        <Input
                          id="rac-email"
                          type="email"
                          value={racFormData.email}
                          onChange={(e) => setRacField("email", e.target.value)}
                          className="h-12 rounded-xl border-2 border-slate-200 focus:border-orange-400 transition-colors"
                          placeholder="jean@exemple.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rac-telephone" className="font-medium text-gray-700">
                          Téléphone <span className="text-orange-500">*</span>
                        </Label>
                        <Input
                          id="rac-telephone"
                          value={racFormData.telephone}
                          onChange={(e) => setRacField("telephone", e.target.value)}
                          className="h-12 rounded-xl border-2 border-slate-200 focus:border-orange-400 transition-colors"
                          placeholder="+225 07 00 00 00"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rac-experience" className="font-medium text-gray-700">
                          Années d'expérience
                        </Label>
                        <Input
                          id="rac-experience"
                          type="number"
                          min={0}
                          max={50}
                          value={racFormData.anneesExperience}
                          onChange={(e) => setRacField("anneesExperience", Number(e.target.value))}
                          className="h-12 rounded-xl border-2 border-slate-200 focus:border-orange-400 transition-colors"
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="rac-date-depot" className="font-medium text-gray-700">
                          Date de dépôt <span className="text-orange-500">*</span>
                        </Label>
                        <Input
                          id="rac-date-depot"
                          type="date"
                          value={racFormData.dateDepot}
                          onChange={(e) => setRacField("dateDepot", e.target.value)}
                          className="h-12 rounded-xl border-2 border-slate-200 focus:border-orange-400 transition-colors w-full md:w-56"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── Section 2 : Documents justificatifs ── */}
                  <div>
                    <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-orange-100">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                        2
                      </div>
                      Documents justificatifs
                    </h3>

                    {/* Per-métier required documents */}
                    {loadingRequiredDocuments ? (
                      <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                        Chargement des documents requis du métier sélectionné...
                      </div>
                    ) : requiredDocumentsForSelected.length > 0 ? (
                      <div className="space-y-5">
                        <div className="flex items-center gap-3 p-4 bg-blue-50 border-2 border-blue-100 rounded-2xl">
                          <ClipboardCheck className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          <p className="text-sm text-blue-800">
                            <strong>{requiredDocumentsForSelected.length} document(s)</strong> requis pour la certification{" "}
                            <strong>{selectedRacMetier?.nom || "sélectionnée"}</strong>. Glissez-déposez ou collez une URL (Ctrl+V).
                          </p>
                        </div>
                        {requiredDocumentsForSelected.map((doc, idx) => (
                          <div
                            key={`${doc.label}-${idx}`}
                            className="bg-white border-2 border-slate-100 rounded-2xl p-5 hover:border-orange-200 transition-colors shadow-sm animate-fade-in"
                            style={{ animationDelay: `${idx * 60}ms` }}
                          >
                            <FileUploadZone
                              label={doc.label}
                              formats={doc.formats || null}
                              required={doc.obligatoire}
                              value={racFormData.documentsJoints[idx]?.url || ""}
                              onUrlChange={(url) => updateDocument(idx, "url", url)}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Generic document fields (no métier selected or no required docs) */
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-sm text-slate-500">
                            Ajoutez vos documents justificatifs (CV, attestations, diplômes…)
                          </p>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={addDocumentRow}
                            className="border-orange-300 text-orange-600 hover:bg-orange-50 rounded-xl gap-1"
                          >
                            <Plus className="w-4 h-4" /> Ajouter
                          </Button>
                        </div>
                        <div className="space-y-4">
                          {racFormData.documentsJoints.map((doc, idx) => (
                            <div
                              key={`doc-${idx}`}
                              className="bg-white border-2 border-slate-100 rounded-2xl p-5 hover:border-orange-200 transition-colors shadow-sm relative"
                            >
                              {racFormData.documentsJoints.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeDocumentRow(idx)}
                                  className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                                  aria-label="Supprimer ce document"
                                >
                                  <Trash2 className="w-3.5 h-3.5 text-red-500" />
                                </button>
                              )}
                              <div className="space-y-2 mb-4">
                                <Label className="font-medium text-gray-700">Nom du document</Label>
                                <Input
                                  value={doc.name}
                                  placeholder="Ex : CV professionnel, Attestation employeur…"
                                  onChange={(e) => updateDocument(idx, "name", e.target.value)}
                                  className="h-11 rounded-xl border-2 border-slate-200 focus:border-orange-400 transition-colors"
                                />
                              </div>
                              <FileUploadZone
                                label="Fichier ou URL"
                                formats={null}
                                required={false}
                                value={doc.url}
                                onUrlChange={(url) => updateDocument(idx, "url", url)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Section 3 : Commentaire ── */}
                  <div>
                    <h3 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-6 pb-3 border-b-2 border-orange-100">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center text-sm font-bold shadow-sm">
                        3
                      </div>
                      Commentaire <span className="text-gray-400 font-normal text-base ml-1">(facultatif)</span>
                    </h3>
                    <Textarea
                      id="rac-commentaire"
                      rows={4}
                      value={racFormData.commentaireLibre}
                      onChange={(e) => setRacField("commentaireLibre", e.target.value)}
                      placeholder="Décrivez votre parcours, vos motivations, ou toute information utile pour l'évaluation de votre dossier…"
                      className="rounded-xl border-2 border-slate-200 focus:border-orange-400 transition-colors resize-none"
                    />
                  </div>

                  {/* Feedback messages */}
                  {racSubmitStatus === "error" && (
                    <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <X className="w-3.5 h-3.5 text-red-600" />
                      </div>
                      <div className="text-sm text-red-700">
                        <p className="font-semibold mb-1">Impossible d'envoyer le dossier</p>
                        <p>{racSubmitMessage || "Vérifiez que tous les champs obligatoires sont remplis (nom, email, téléphone, date de dépôt)."}</p>
                      </div>
                    </div>
                  )}
                  {racSubmitStatus === "success" && (
                    <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-4 flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-700" />
                      </div>
                      <div className="text-sm text-green-700">
                        <p className="font-semibold mb-1">Dossier envoyé avec succès !</p>
                        <p>Notre équipe examinera votre candidature et vous contactera dans les meilleurs délais.</p>
                        {createdRacDossier?.id && (
                          <p className="mt-2 text-green-800">
                            Référence dossier: <strong>{createdRacDossier.id}</strong>
                            {createdRacDossier.statut ? ` · Statut: ${createdRacDossier.statut}` : ""}
                            {typeof createdRacDossier.timelineCount === "number" ? ` · Timeline: ${createdRacDossier.timelineCount} événement(s)` : ""}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Submit row */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={isSubmittingRac || loadingRequiredDocuments}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-14 text-base rounded-2xl shadow-lg hover:shadow-orange-200 hover:scale-[1.02] transition-all duration-200 font-semibold"
                    >
                      <FileCheck className="mr-2 w-5 h-5" />
                      {isSubmittingRac ? "Envoi en cours..." : "Envoyer mon dossier RAC"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={closeRacForm}
                      disabled={isSubmittingRac}
                      className="border-2 border-gray-300 text-gray-600 hover:border-red-300 hover:text-red-600 h-14 px-8 rounded-2xl transition-all"
                    >
                      Annuler
                    </Button>
                  </div>

                </form>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-16 bg-white" data-reveal>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Questions fréquentes
              </h2>
            </div>

            <div className="space-y-4">
              {loadingRacFaqs && (
                <Card className="p-6 border-2 border-gray-100 text-sm text-gray-500">
                  Chargement des FAQ RAC...
                </Card>
              )}

              {!loadingRacFaqs && racFaqError && (
                <Card className="p-6 border-2 border-red-100 bg-red-50 text-sm text-red-700">
                  Impossible de charger les FAQ RAC pour le moment.
                </Card>
              )}

              {!loadingRacFaqs && !racFaqError && racFaqs.length === 0 && (
                <Card className="p-6 border-2 border-gray-100 text-sm text-gray-600">
                  Aucune FAQ de catégorie RAC n'est disponible pour le moment.
                </Card>
              )}

              {!loadingRacFaqs && !racFaqError && racFaqs.map((faq, index) => (
                <Card
                  key={faq.id}
                  className="p-6 border-2 border-gray-100 hover:border-orange-300 transition-all duration-300 group cursor-pointer hover:scale-102 animate-fade-in"
                  style={{ animationDelay: `${index * 80}ms` }}
                  onClick={() => void handleFaqView(faq.id)}
                >
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-start gap-3 group-hover:text-orange-600 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                    {faq.question}
                  </h4>
                  <p className="text-gray-600 pl-8 leading-relaxed">
                    {faq.reponse}
                  </p>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/ressources/faq">
                <Button variant="outline" className="border-2 border-gray-300 hover:border-orange-500">
                  Voir toutes les FAQ
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gray-50" data-reveal>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 lg:p-16 text-center shadow-2xl">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Prêt à démarrer ?
              </h2>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Explorez nos formations et commencez votre parcours dès aujourd'hui
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-6 text-base md:text-lg rounded-xl shadow-lg transition-all duration-300 font-semibold hover:scale-105 group"
                  onClick={() => {
                    setRacFormVisible(true);
                    setTimeout(() => document.getElementById("rac-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
                  }}
                >
                  Déposer ma candidature
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-base md:text-lg rounded-xl shadow-lg transition-all duration-300 font-semibold hover:scale-105"
                  onClick={() => {
                    setRacFormVisible(true);
                    setTimeout(() => document.getElementById("rac-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
                  }}
                >
                  Parler à un conseiller
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

