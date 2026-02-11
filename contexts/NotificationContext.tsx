"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type NotificationType = "success" | "info" | "warning" | "error" | "message";

export interface Notification {
  id: string;
  type: NotificationType;
  titre: string;
  message: string;
  timestamp: Date;
  read: boolean;
  icon?: string;
  link?: string;
  sender?: {
    nom: string;
    avatar?: string;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger les notifications depuis localStorage
  useEffect(() => {
    const savedNotifications = localStorage.getItem("cpu_notifications");
    if (savedNotifications) {
      try {
        const parsed = JSON.parse(savedNotifications);
        // Convertir les timestamps string en Date
        const notifs = parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp),
        }));
        setNotifications(notifs);
      } catch (error) {
        console.error("Erreur lors du chargement des notifications:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Sauvegarder dans localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cpu_notifications", JSON.stringify(notifications));
    }
  }, [notifications, isLoaded]);

  const addNotification = (notif: Omit<Notification, "id" | "timestamp" | "read">) => {
    const newNotification: Notification = {
      ...notif,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false,
    };
    
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAll,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
