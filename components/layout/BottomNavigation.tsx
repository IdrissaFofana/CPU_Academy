"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, LayoutDashboard, User, Book } from "lucide-react";

const navItems = [
  { href: "/", icon: Home, label: "Accueil" },
  { href: "/catalogue", icon: Search, label: "Explorer" },
  { href: "/mes-formations", icon: Book, label: "Formations" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/profil", icon: User, label: "Profil" },
];

export function BottomNavigation() {
  const pathname = usePathname();

  // Ne pas afficher sur les pages de cours
  if (pathname.includes("/formations/") && pathname.includes("/learn")) {
    return null;
  }

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 z-40 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? "text-cpu-orange"
                  : "text-gray-600 hover:text-cpu-orange hover:bg-orange-50"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-cpu-orange rounded-full animate-in slide-in-from-top-1 duration-200" />
              )}
              <Icon className={`w-6 h-6 transition-transform duration-200 ${isActive ? "scale-110" : ""}`} />
              <span className={`text-xs font-medium ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
