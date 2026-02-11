import React, { useState, useRef, useEffect } from 'react';
import { Search, Clock, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  suggestions?: string[];
  recentSearches?: string[];
  onSelectSuggestion?: (suggestion: string) => void;
  onClearHistory?: () => void;
}

export function SearchAutocomplete({
  value,
  onChange,
  suggestions = [],
  recentSearches = [],
  onSelectSuggestion,
  onClearHistory,
}: SearchAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filtrer les suggestions basées sur la saisie
  const filteredSuggestions = suggestions.filter(s =>
    s.toLowerCase().includes(value.toLowerCase())
  );

  const shouldShowDropdown = isOpen && (value.trim() || recentSearches.length > 0);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (searchTerm: string) => {
    onChange(searchTerm);
    onSelectSuggestion?.(searchTerm);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 transition-colors group-focus-within:text-cpu-orange" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Rechercher une formation, un domaine..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full h-14 pl-12 pr-4 text-lg text-slate-900 placeholder:text-slate-400 bg-white border-2 border-slate-200 shadow-lg focus:shadow-2xl focus:border-cpu-orange transition-all duration-300 rounded-xl focus:outline-none"
          aria-expanded={shouldShowDropdown ? "true" : "false"}
          aria-autocomplete="list"
          aria-owns={shouldShowDropdown ? "search-suggestions" : undefined}
        />
      </div>

      {/* Dropdown Suggestions */}
      {shouldShowDropdown && (
        <div
          id="search-suggestions"
          className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 overflow-hidden max-h-96 overflow-y-auto"
          role="listbox"
        >
          {/* Suggestions */}
          {filteredSuggestions.length > 0 && (
            <div className="border-b border-gray-100">
              <div className="p-2 text-xs font-semibold text-gray-500 px-4 py-2 bg-gray-50">
                Suggestions
              </div>
              {filteredSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSelect(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-cpu-orange/10 hover:text-cpu-orange transition-colors border-b border-gray-50 last:border-b-0"
                  role="option"
                >
                  <Search className="inline w-4 h-4 mr-2 text-gray-400" />
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && !value.trim() && (
            <div>
              <div className="flex items-center justify-between p-2 px-4 py-2 bg-gray-50 text-xs font-semibold text-gray-500">
                Recherches récentes
                {onClearHistory && (
                  <button
                    onClick={onClearHistory}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Effacer l'historique"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              {recentSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => handleSelect(search)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors border-b border-gray-50 last:border-b-0 flex items-center gap-2"
                  role="option"
                >
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredSuggestions.length === 0 && recentSearches.length === 0 && value.trim() && (
            <div className="p-8 text-center text-gray-500">
              <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p>Aucune formation trouvée pour "{value}"</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

