"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles, TrendingUp, Calendar, Gift } from "lucide-react";

interface Announcement {
  id: string;
  message: string;
  link?: string;
  linkText?: string;
  type: "promo" | "event" | "news" | "gift";
  icon: React.ReactNode;
}

const announcements: Announcement[] = [
  {
    id: "promo-2026",
    message: "🎉 Promotion exceptionnelle : -30% sur tous les parcours métiers jusqu'au 28 février !",
    link: "/parcours",
    linkText: "Découvrir",
    type: "promo",
    icon: <Gift className="w-4 h-4" />
  },
  {
    id: "webinar-seo",
    message: "📅 Webinaire gratuit ce vendredi : 'SEO 2026 - Les nouvelles tendances'",
    link: "/webinaires",
    linkText: "S'inscrire",
    type: "event",
    icon: <Calendar className="w-4 h-4" />
  },
  {
    id: "new-formations",
    message: "✨ 12 nouvelles formations ajoutées cette semaine !",
    link: "/catalogue",
    linkText: "Voir",
    type: "news",
    icon: <Sparkles className="w-4 h-4" />
  }
];

export function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  // Vérifier si l'annonce a déjà été fermée
  useEffect(() => {
    const dismissed = localStorage.getItem(`announcement-dismissed-${announcements[currentIndex].id}`);
    setIsDismissed(dismissed === "true");
  }, [currentIndex]);

  // Rotation automatique des annonces
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(`announcement-dismissed-${announcements[currentIndex].id}`, "true");
    setIsVisible(false);
  };

  if (!isVisible || isDismissed) return null;

  const currentAnnouncement = announcements[currentIndex];

  const bgColorClass = {
    promo: "bg-gradient-to-r from-red-500 to-pink-500",
    event: "bg-gradient-to-r from-blue-500 to-cyan-500",
    news: "bg-gradient-to-r from-purple-500 to-indigo-500",
    gift: "bg-gradient-to-r from-orange-500 to-yellow-500"
  }[currentAnnouncement.type];

  return (
    <div
      className={`${bgColorClass} text-white py-2.5 px-4 relative animate-in slide-in-from-top duration-500`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-3 text-sm relative">
          <div className="flex items-center gap-2">
            <span className="animate-pulse">{currentAnnouncement.icon}</span>
            <p className="font-medium">{currentAnnouncement.message}</p>
          </div>
          
          {currentAnnouncement.link && (
            <Link
              href={currentAnnouncement.link}
              className="underline font-semibold hover:scale-105 transition-transform duration-200 whitespace-nowrap"
            >
              {currentAnnouncement.linkText || "En savoir plus"} →
            </Link>
          )}

          {/* Indicateurs de pagination */}
          <div className="hidden md:flex items-center gap-1.5 ml-4">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"
                }`}
                aria-label={`Annonce ${index + 1}`}
              />
            ))}
          </div>

          {/* Bouton fermer */}
          <button
            onClick={handleDismiss}
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-white/20 rounded-full p-1 transition-colors duration-200"
            aria-label="Fermer l'annonce"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

