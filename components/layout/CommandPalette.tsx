"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Home,
  Book,
  Rocket,
  Users,
  Building,
  Award,
  Video,
  HelpCircle,
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  MapPin,
  Sparkles,
} from "lucide-react";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

interface Command {
  id: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const commands: Command[] = [
    {
      id: "home",
      label: "Accueil",
      description: "Retour à la page d'accueil",
      icon: <Home className="w-5 h-5" />,
      action: () => {
        router.push("/");
        onClose();
      },
      keywords: ["accueil", "home", "main"],
    },
    {
      id: "catalogue",
      label: "Catalogue de formations",
      description: "Explorer toutes les formations",
      icon: <Book className="w-5 h-5" />,
      action: () => {
        router.push("/catalogue");
        onClose();
      },
      keywords: ["catalogue", "formations", "cours"],
    },
    {
      id: "parcours",
      label: "Parcours métiers",
      description: "Découvrir les parcours professionnels",
      icon: <Rocket className="w-5 h-5" />,
      action: () => {
        router.push("/parcours");
        onClose();
      },
      keywords: ["parcours", "métiers", "carrière"],
    },
    {
      id: "centres",
      label: "Centres de formation",
      description: "Trouver un centre près de chez vous",
      icon: <MapPin className="w-5 h-5" />,
      action: () => {
        router.push("/centres-formation");
        onClose();
      },
      keywords: ["centres", "formation", "localisation"],
    },
    {
      id: "webinaires",
      label: "Webinaires",
      description: "Participer aux webinaires live",
      icon: <Video className="w-5 h-5" />,
      action: () => {
        router.push("/webinaires");
        onClose();
      },
      keywords: ["webinaires", "live", "vidéo"],
    },
    {
      id: "experts",
      label: "Experts & Formateurs",
      description: "Rencontrer nos experts",
      icon: <Users className="w-5 h-5" />,
      action: () => {
        router.push("/experts");
        onClose();
      },
      keywords: ["experts", "formateurs", "professeurs"],
    },
    {
      id: "entreprises",
      label: "Solutions entreprises",
      description: "Offres pour les entreprises",
      icon: <Building className="w-5 h-5" />,
      action: () => {
        router.push("/entreprises");
        onClose();
      },
      keywords: ["entreprises", "corporate", "b2b"],
    },
    {
      id: "certifications",
      label: "Certifications",
      description: "Vos certifications et badges",
      icon: <Award className="w-5 h-5" />,
      action: () => {
        router.push("/certifications");
        onClose();
      },
      keywords: ["certifications", "badges", "diplômes"],
    },
    {
      id: "dashboard",
      label: "Mon Dashboard",
      description: "Accéder à votre espace personnel",
      icon: <LayoutDashboard className="w-5 h-5" />,
      action: () => {
        router.push("/dashboard");
        onClose();
      },
      keywords: ["dashboard", "tableau de bord", "espace"],
    },
    {
      id: "profil",
      label: "Mon Profil",
      description: "Gérer votre profil",
      icon: <User className="w-5 h-5" />,
      action: () => {
        router.push("/profil");
        onClose();
      },
      keywords: ["profil", "compte", "paramètres"],
    },
    {
      id: "aide",
      label: "Centre d'aide",
      description: "Obtenir de l'aide",
      icon: <HelpCircle className="w-5 h-5" />,
      action: () => {
        router.push("/ressources/faq");
        onClose();
      },
      keywords: ["aide", "help", "support", "faq"],
    },
  ];

  const filteredCommands = commands.filter((command) => {
    const searchTerm = query.toLowerCase();
    return (
      command.label.toLowerCase().includes(searchTerm) ||
      command.description?.toLowerCase().includes(searchTerm) ||
      command.keywords?.some((keyword) => keyword.toLowerCase().includes(searchTerm))
    );
  });

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        break;
      case "Enter":
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
        break;
      case "Escape":
        onClose();
        break;
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Palette */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[201] px-4 animate-in slide-in-from-top-4 duration-200">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden">
          {/* Input */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-200">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Recherchez une page ou une action..."
              className="flex-1 outline-none text-gray-900 placeholder-gray-400 text-lg"
            />
            <kbd className="px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded border border-gray-300">
              Esc
            </kbd>
          </div>

          {/* Commandes */}
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {filteredCommands.length > 0 ? (
              <div className="p-2">
                {filteredCommands.map((command, index) => (
                  <button
                    key={command.id}
                    onClick={() => command.action()}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-150 text-left ${
                      index === selectedIndex
                        ? "bg-orange-50 text-cpu-orange"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${
                        index === selectedIndex
                          ? "bg-cpu-orange text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {command.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold truncate">{command.label}</h4>
                      {command.description && (
                        <p className="text-sm text-gray-500 truncate">{command.description}</p>
                      )}
                    </div>
                    {index === selectedIndex && (
                      <kbd className="px-2 py-1 text-xs font-medium bg-white rounded border border-gray-300 flex-shrink-0">
                        ↵
                      </kbd>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center">
                <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Aucune commande trouvée</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">↑↓</kbd>
                  Navigation
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-white rounded border border-gray-300">↵</kbd>
                  Sélectionner
                </span>
              </div>
              <span className="text-gray-400">⌘K pour ouvrir</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
