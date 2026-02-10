import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showClearButton?: boolean;
  size?: "sm" | "md" | "lg";
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Rechercher...",
  className = "",
  showClearButton = true,
  size = "md"
}: SearchBarProps) {
  const sizeClasses = {
    sm: "h-9 text-sm",
    md: "h-10 text-sm",
    lg: "h-12 text-base"
  };

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <div className={"relative " + className}>
      <Search className={"absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 " + iconSizes[size]} />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={"pl-10 pr-10 border-2 border-slate-200 focus:border-cpu-orange transition-all " + sizeClasses[size]}
      />
      {showClearButton && value && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0 hover:bg-slate-100"
        >
          <X className={"text-slate-400 hover:text-slate-600 " + iconSizes[size]} />
        </Button>
      )}
    </div>
  );
}
