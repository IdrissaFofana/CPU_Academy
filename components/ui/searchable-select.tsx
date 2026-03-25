"use client";

import * as React from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type SearchableSelectOption = {
  value: string;
  label: string;
};

interface SearchableSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: SearchableSelectOption[];
  placeholder: string;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
  triggerId?: string;
}

export function SearchableSelect({
  value,
  onValueChange,
  options,
  placeholder,
  searchPlaceholder = "Rechercher...",
  emptyText = "Aucun résultat",
  className,
  triggerId,
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (!open) {
      setSearch("");
      return;
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [open]);

  const selectedOption = options.find((option) => option.value === value);
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          id={triggerId}
          type="button"
          variant="outline"
          className={cn(
            "h-11 w-full justify-between border-slate-200 bg-white px-3 font-normal text-sm text-slate-900 hover:bg-white",
            className
          )}
        >
          <span className={cn("truncate", !selectedOption && "text-slate-500")}>
            {selectedOption?.label || placeholder}
          </span>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[var(--radix-dropdown-menu-trigger-width)] rounded-md border border-slate-200 bg-white p-0 shadow-md"
        sideOffset={6}
        onCloseAutoFocus={(event) => event.preventDefault()}
      >
        <div className="border-b border-slate-100 p-2" onKeyDown={(event) => event.stopPropagation()}>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              ref={inputRef}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={searchPlaceholder}
              className="h-9 border-slate-200 pl-9 text-sm"
            />
          </div>
        </div>

        {filteredOptions.length > 0 ? (
          <div className="max-h-64 overflow-y-auto p-1">
            <DropdownMenuRadioGroup
              value={value}
              onValueChange={(nextValue) => {
                onValueChange(nextValue);
                setOpen(false);
              }}
            >
              {filteredOptions.map((option) => (
                <DropdownMenuRadioItem
                  key={option.value}
                  value={option.value}
                  className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-slate-700 focus:bg-slate-100"
                >
                  <Check
                    className={cn(
                      "h-4 w-4 text-cpu-orange",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="truncate">{option.label}</span>
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </div>
        ) : (
          <div className="px-3 py-6 text-center text-sm text-slate-500">{emptyText}</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}