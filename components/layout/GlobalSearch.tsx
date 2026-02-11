"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Book, Users, Video, Rocket, X, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchResult {
  id: string;
  title: string;
  type: "formation" | "parcours" | "expert" | "webinaire";
  href: string;
  description?: string;
}

// Mock data - À remplacer par une vraie recherche
const mockSearchResults = (query: string): SearchResult[] => {
  if (!query || query.length < 2) return [];
  
  const allResults: SearchResult[] = [
    { id: "1", title: "Formation Excel Avancé", type: "formation", href: "/catalogue", description: "Maîtrisez Excel de A à Z" },
    { id: "2", title: "Parcours Data Analyst", type: "parcours", href: "/parcours", description: "Devenez analyste de données" },
    { id: "3", title: "Expert Marketing Digital", type: "expert", href: "/experts", description: "Jean Kouassi - 15 ans d'expérience" },
    { id: "4", title: "Webinaire: SEO 2026", type: "webinaire", href: "/webinaires", description: "Les tendances SEO actuelles" },
    { id: "5", title: "Formation Python", type: "formation", href: "/catalogue", description: "Programmation Python pour débutants" },
    { id: "6", title: "Parcours Entrepreneur", type: "parcours", href: "/parcours/entrepreneur", description: "Lancez votre startup" },
  ];
  
  return allResults.filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.description?.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 6);
};

const getIconByType = (type: string) => {
  switch (type) {
    case "formation": return <Book className="w-4 h-4" />;
    case "parcours": return <Rocket className="w-4 h-4" />;
    case "expert": return <Users className="w-4 h-4" />;
    case "webinaire": return <Video className="w-4 h-4" />;
    default: return <Search className="w-4 h-4" />;
  }
};

const getColorByType = (type: string) => {
  switch (type) {
    case "formation": return "text-blue-600 bg-blue-50";
    case "parcours": return "text-purple-600 bg-purple-50";
    case "expert": return "text-green-600 bg-green-50";
    case "webinaire": return "text-orange-600 bg-orange-50";
    default: return "text-gray-600 bg-gray-50";
  }
};

interface GlobalSearchProps {
  isMobile?: boolean;
  onClose?: () => void;
}

export function GlobalSearch({ isMobile = false, onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Focus automatique quand le composant est monté (mode desktop)
  useEffect(() => {
    if (!isMobile && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMobile]);

  // Recherche avec debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length >= 2) {
        const searchResults = mockSearchResults(query);
        setResults(searchResults);
        setIsOpen(searchResults.length > 0);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Fermer en cliquant à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        if (onClose && !isMobile) {
          onClose();
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, isMobile]);

  // Navigation clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % results.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
        break;
      case "Enter":
        e.preventDefault();
        if (results[selectedIndex]) {
          router.push(results[selectedIndex].href);
          setIsOpen(false);
          setQuery("");
        }
        break;
      case "Escape":
        setIsOpen(false);
        inputRef.current?.blur();
        if (onClose && !isMobile) {
          onClose();
        }
        break;
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleClose = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    if (onClose && !isMobile) {
      onClose();
    }
  };

  return (
    <div ref={searchRef} className={`relative ${isMobile ? 'w-full' : 'w-full max-w-xl'}`}>
      {/* Input de recherche */}
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cpu-orange transition-colors duration-200">
          <Search className="w-5 h-5" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length >= 2 && results.length > 0 && setIsOpen(true)}
          placeholder="Rechercher formations, parcours, experts..."
          className="w-full pl-11 pr-24 py-2.5 border-2 border-gray-200 rounded-xl focus:border-cpu-orange focus:ring-2 focus:ring-orange-100 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-400 hover:border-gray-300"
        />
        {query && (
          <button
            onClick={clearSearch}
            className={`absolute ${!isMobile && onClose ? 'right-12' : 'right-14'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200`}
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {!isMobile && onClose && (
          <button
            onClick={handleClose}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors duration-200"
            title="Fermer la recherche"
          >
            <X className="w-5 h-5" />
          </button>
        )}
        {!onClose && (
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-medium text-gray-500 bg-gray-100 rounded border border-gray-300 hidden lg:inline-block">
            ⌘K
          </kbd>
        )}
      </div>

      {/* Résultats de recherche */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border-2 border-gray-100 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-transparent border-b border-gray-100">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">
                {results.length} résultat{results.length > 1 ? 's' : ''} trouvé{results.length > 1 ? 's' : ''}
              </p>
              <TrendingUp className="w-4 h-4 text-cpu-orange" />
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {results.map((result, index) => (
              <Link
                key={result.id}
                href={result.href}
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                }}
                className={`block px-4 py-3 transition-all duration-150 border-l-4 ${
                  index === selectedIndex
                    ? "bg-orange-50 border-cpu-orange"
                    : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${getColorByType(result.type)} flex-shrink-0`}>
                    {getIconByType(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-gray-900 truncate">
                      {result.title}
                    </h4>
                    {result.description && (
                      <p className="text-xs text-gray-600 mt-0.5 truncate">
                        {result.description}
                      </p>
                    )}
                    <span className="inline-block mt-1 text-xs font-medium text-gray-500 capitalize">
                      {result.type}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <p className="text-xs text-gray-600 flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 text-xs bg-white rounded border border-gray-300">↑↓</kbd>
              Navigation
              <kbd className="px-1.5 py-0.5 text-xs bg-white rounded border border-gray-300">↵</kbd>
              Sélectionner
              <kbd className="px-1.5 py-0.5 text-xs bg-white rounded border border-gray-300">Esc</kbd>
              Fermer
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

