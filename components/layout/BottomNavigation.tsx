"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, LayoutDashboard, User, Book } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Accueil", mobileLabel: "Accueil" },
  { href: "/catalogue", icon: Search, label: "Explorer", mobileLabel: "Catalogue" },
  { href: "/mes-formations", icon: Book, label: "Formations", mobileLabel: "Cours" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard", mobileLabel: "Espace" },
  { href: "/profil", icon: User, label: "Profil", mobileLabel: "Profil" },
];

export function BottomNavigation() {
  const pathname = usePathname();

  // Ne pas afficher sur les pages de cours
  if (pathname.includes("/formations/") && pathname.includes("/learn")) {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 w-full max-w-full bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 safe-area-bottom overflow-hidden">
      <div className="grid grid-cols-5 items-center w-full max-w-full px-1 py-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-label={item.label}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 min-w-0 py-1 sm:py-1.5 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? "text-cpu-orange"
                  : "text-gray-600 hover:text-cpu-orange hover:bg-orange-50"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-1 bg-cpu-orange rounded-full animate-in slide-in-from-top-1 duration-200" />
              )}
              <Icon className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ${isActive ? "scale-110" : ""}`} />
              <span className={`text-[8px] xs:text-[9px] font-medium truncate w-full text-center leading-none px-0.5 ${isActive ? "font-semibold" : ""}`}>
                {item.mobileLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

