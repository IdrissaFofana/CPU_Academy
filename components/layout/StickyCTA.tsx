"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Afficher le CTA après avoir scrollé 300px
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      <div className="bg-gradient-to-r from-cpu-orange to-cpu-orange/90 backdrop-blur-lg border-t border-orange-600 shadow-2xl animate-slide-up">
        <Link 
          href="/catalogue"
          className="flex items-center justify-center gap-3 px-6 py-4 text-white font-semibold text-base active:scale-95 transition-transform"
        >
          <Search className="w-5 h-5" />
          <span>Trouver une formation</span>
        </Link>
      </div>
    </div>
  );
}

