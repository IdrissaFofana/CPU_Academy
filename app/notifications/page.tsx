"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Mail,
  Check,
  Trash2,
  ShoppingCart,
  GraduationCap,
  Award,
  CreditCard,
  MessageCircle,
  Info,
  AlertCircle,
  CheckCircle,
  XCircle,
  Filter,
  MoreVertical,
} from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";
import Link from "next/link";
import { useTestNotifications } from "@/lib/testNotifications";

type FilterType = "all" | "success" | "info" | "warning" | "error" | "message";

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMins = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMs / 3600000);
  const diffInDays = Math.floor(diffInMs / 86400000);

  if (diffInMins < 1) return "Il y a quelques secondes";
  if (diffInMins < 60) return `Il y a ${diffInMins} minute${diffInMins > 1 ? "s" : ""}`;
  if (diffInHours < 24) return `Il y a ${diffInHours} heure${diffInHours > 1 ? "s" : ""}`;
  if (diffInDays < 7) return `Il y a ${diffInDays} jour${diffInDays > 1 ? "s" : ""}`;
  return date.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
}

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotifications();
  const { createTestNotifications } = useTestNotifications();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredNotifications = filter === "all" 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case "info":
        return <Info className="w-5 h-5 text-blue-500" />;
      case "message":
        return <MessageCircle className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-slate-500" />;
    }
  };

  const getBgColor = (type: string, read: boolean) => {
    if (read) return "bg-white";
    
    switch (type) {
      case "success":
        return "bg-green-50";
      case "error":
        return "bg-red-50";
      case "warning":
        return "bg-orange-50";
      case "info":
        return "bg-blue-50";
      case "message":
        return "bg-purple-50";
      default:
        return "bg-slate-50";
    }
  };

  const filterOptions: { value: FilterType; label: string; count: number }[] = [
    { value: "all", label: "Toutes", count: notifications.length },
    { value: "success", label: "Succès", count: notifications.filter(n => n.type === "success").length },
    { value: "message", label: "Messages", count: notifications.filter(n => n.type === "message").length },
    { value: "info", label: "Infos", count: notifications.filter(n => n.type === "info").length },
    { value: "warning", label: "Alertes", count: notifications.filter(n => n.type === "warning").length },
    { value: "error", label: "Erreurs", count: notifications.filter(n => n.type === "error").length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                <Bell className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Notifications</h1>
                <p className="text-slate-300">
                  {unreadCount > 0 
                    ? `${unreadCount} notification${unreadCount > 1 ? "s" : ""} non lue${unreadCount > 1 ? "s" : ""}`
                    : "Aucune nouvelle notification"
                  }
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {notifications.length === 0 && (
                <Button
                  onClick={createTestNotifications}
                  variant="outline"
                  className="bg-green-600 border-green-700 text-white hover:bg-green-700"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Générer notifications test
                </Button>
              )}
              {unreadCount > 0 && (
                <Button
                  onClick={markAllAsRead}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Tout marquer comme lu
                </Button>
              )}
              {notifications.length > 0 && (
                <Button
                  onClick={clearAll}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Tout supprimer
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filtres */}
        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <h2 className="font-semibold text-slate-900">Filtrer par type</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => setFilter(option.value)}
                variant={filter === option.value ? "default" : "outline"}
                className={filter === option.value ? "bg-cpu-orange hover:bg-cpu-orange/90" : ""}
              >
                {option.label}
                {option.count > 0 && (
                  <Badge className="ml-2 bg-slate-100 text-slate-700 border-0">
                    {option.count}
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </Card>

        {/* Liste des notifications */}
        <div className="space-y-3">
          {filteredNotifications.length === 0 ? (
            <Card className="p-12 text-center">
              <Bell className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                Aucune notification
              </h3>
              <p className="text-slate-600">
                {filter === "all" 
                  ? "Vous n'avez aucune notification pour le moment"
                  : `Aucune notification de type "${filterOptions.find(f => f.value === filter)?.label}"`
                }
              </p>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card
                key={notification.id}
                className={`p-6 border-2 hover:border-cpu-orange transition-all duration-200 ${
                  getBgColor(notification.type, notification.read)
                } ${!notification.read ? "border-l-4 border-l-cpu-orange" : ""}`}
              >
                <div className="flex gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    {notification.sender?.avatar ? (
                      <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden">
                        <img
                          src={notification.sender.avatar}
                          alt={notification.sender.nom}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                        {getIcon(notification.type)}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-slate-900 mb-1">
                          {notification.titre}
                          {!notification.read && (
                            <span className="ml-2 inline-block w-2 h-2 bg-cpu-orange rounded-full"></span>
                          )}
                        </h3>
                        {notification.sender && (
                          <p className="text-sm text-slate-600 mb-2">
                            De: {notification.sender.nom}
                          </p>
                        )}
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                            className="text-slate-600 hover:text-slate-900"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-slate-700 mb-3">{notification.message}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-500">
                        {formatTimeAgo(notification.timestamp)}
                      </span>

                      {notification.link && (
                        <Link href={notification.link}>
                          <Button
                            size="sm"
                            className="bg-cpu-orange hover:bg-cpu-orange/90 text-white"
                          >
                            Voir plus
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
