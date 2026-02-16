"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Sparkles, Calendar, Gift, CheckCircle, AlertCircle, Info, MessageCircle, Bell } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";

interface Announcement {
  id: string;
  message: string;
  link?: string;
  linkText?: string;
  type: "promo" | "event" | "news" | "gift";
  icon: React.ReactNode;
}

interface DisplayItem {
  id: string;
  message: string;
  link?: string;
  linkText?: string;
  type: "promo" | "event" | "news" | "gift" | "success" | "error" | "warning" | "notification" | "info";
  icon: React.ReactNode;
  isNotification?: boolean;
  titre?: string;
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
  const { notifications } = useNotifications();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const [allItems, setAllItems] = useState<DisplayItem[]>([]);

  // Combiner les notifications et les annonces
  useEffect(() => {
    // Transformer les notifications non lues en DisplayItems
    const notifItems: DisplayItem[] = notifications
      .filter((n) => !n.read && !dismissedIds.has(n.id))
      .map((notif) => {
        let icon: React.ReactNode;
        let type: DisplayItem["type"];
        
        switch (notif.type) {
          case "success":
            icon = <CheckCircle className="w-4 h-4" />;
            type = "success";
            break;
          case "error":
            icon = <AlertCircle className="w-4 h-4" />;
            type = "error";
            break;
          case "warning":
            icon = <AlertCircle className="w-4 h-4" />;
            type = "warning";
            break;
          case "message":
            icon = <MessageCircle className="w-4 h-4" />;
            type = "notification";
            break;
          default:
            icon = <Info className="w-4 h-4" />;
            type = "info";
        }

        return {
          id: notif.id,
          titre: notif.titre,
          message: notif.message,
          link: notif.link || "/notifications",
          linkText: notif.link ? "Voir" : "Toutes",
          type,
          icon,
          isNotification: true
        };
      });

    // Filtrer les annonces déjà rejetées
    const announcementItems: DisplayItem[] = announcements
      .filter((ann) => !dismissedIds.has(ann.id))
      .map((ann) => ({ ...ann, isNotification: false }));

    // Priorité aux notifications, puis annonces
    const combined = [...notifItems, ...announcementItems];
    setAllItems(combined);

    // Réinitialiser l'index si nécessaire
    if (currentIndex >= combined.length) {
      setCurrentIndex(0);
    }
  }, [notifications, dismissedIds, currentIndex]);

  // Rotation automatique
  useEffect(() => {
    if (allItems.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [allItems.length]);

  const handleDismiss = () => {
    if (allItems[currentIndex]) {
      const currentId = allItems[currentIndex].id;
      setDismissedIds((prev) => new Set(prev).add(currentId));
      
      // Sauvegarder dans localStorage seulement pour les annonces
      if (!allItems[currentIndex].isNotification) {
        localStorage.setItem(`announcement-dismissed-${currentId}`, "true");
      }
    }
  };

  // Charger les annonces rejetées depuis localStorage
  useEffect(() => {
    const dismissed = new Set<string>();
    announcements.forEach((ann) => {
      const isDismissed = localStorage.getItem(`announcement-dismissed-${ann.id}`);
      if (isDismissed === "true") {
        dismissed.add(ann.id);
      }
    });
    setDismissedIds(dismissed);
  }, []);

  if (!isVisible || allItems.length === 0) return null;

  const currentItem = allItems[currentIndex];
  if (!currentItem) return null;

  const bgColorClass = {
    promo: "bg-red-500",
    event: "bg-blue-500",
    news: "bg-purple-500",
    gift: "bg-orange-500",
    success: "bg-green-600",
    error: "bg-red-600",
    warning: "bg-orange-600",
    notification: "bg-purple-600",
    info: "bg-blue-600"
  }[currentItem.type];

  return (
    <div
      className={`${bgColorClass} text-white py-2.5 px-4 relative animate-in slide-in-from-top duration-500`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-3 text-sm relative">
          <div className="flex items-center gap-2">
            <span className="animate-pulse">{currentItem.icon}</span>
            <div>
              {currentItem.isNotification && currentItem.titre && (
                <p className="font-bold text-xs">{currentItem.titre}</p>
              )}
              <p className="font-medium">{currentItem.message}</p>
            </div>
          </div>
          
          {currentItem.link && (
            <Link
              href={currentItem.link}
              className="underline font-semibold hover:scale-105 transition-transform duration-200 whitespace-nowrap"
            >
              {currentItem.linkText || "En savoir plus"} →
            </Link>
          )}

          {/* Indicateurs de pagination */}
          {allItems.length > 1 && (
            <div className="hidden md:flex items-center gap-1.5 ml-4">
              {allItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-white w-6" : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Item ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Bouton fermer */}
          <button
            onClick={handleDismiss}
            className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-white/20 rounded-full p-1 transition-colors duration-200"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

