"use client";

import { useState, useEffect } from "react";
import { useNotifications } from "@/contexts/NotificationContext";
import { X, Bell, CheckCircle, AlertCircle, Info, MessageCircle } from "lucide-react";
import Link from "next/link";

export function NotificationBanner() {
  const { notifications } = useNotifications();
  const [currentNotif, setCurrentNotif] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Afficher seulement les notifications non lues et non rejetées
    const unreadNotifs = notifications.filter(
      (n) => !n.read && !dismissedIds.has(n.id)
    );

    if (unreadNotifs.length > 0) {
      // Prendre la plus récente
      const latestNotif = unreadNotifs[0];
      setCurrentNotif(latestNotif);
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [notifications, dismissedIds]);

  const handleDismiss = () => {
    if (currentNotif) {
      setDismissedIds((prev) => new Set(prev).add(currentNotif.id));
    }
    setIsVisible(false);
  };

  if (!isVisible || !currentNotif) return null;

  const getIcon = () => {
    switch (currentNotif.type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "warning":
        return <AlertCircle className="w-5 h-5" />;
      case "message":
        return <MessageCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getBgColor = () => {
    switch (currentNotif.type) {
      case "success":
        return "bg-green-600";
      case "error":
        return "bg-red-600";
      case "warning":
        return "bg-orange-600";
      case "message":
        return "bg-purple-600";
      default:
        return "bg-blue-600";
    }
  };

  return (
    <div
      className={`${getBgColor()} text-white py-3 px-4 relative z-50 animate-slide-down`}
      role="alert"
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {getIcon()}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm">{currentNotif.titre}</p>
            <p className="text-xs opacity-90 truncate">{currentNotif.message}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {currentNotif.link && (
            <Link
              href={currentNotif.link}
              className="text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors"
            >
              Voir
            </Link>
          )}
          <Link
            href="/notifications"
            className="text-xs font-semibold bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors"
          >
            Toutes les notifications
          </Link>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
