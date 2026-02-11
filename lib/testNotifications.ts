// Utilitaires pour créer des notifications de test
// Utilisé uniquement pour la démonstration

import { useNotifications } from "@/contexts/NotificationContext";

export function useTestNotifications() {
  const { addNotification } = useNotifications();

  const createTestNotifications = () => {
    // Notification de paiement réussi
    addNotification({
      type: "success",
      titre: "Paiement confirmé 🎉",
      message: "Votre paiement de 350,000 FCFA a été validé avec succès. Vous pouvez maintenant accéder à vos formations.",
      link: "/mes-formations",
    });

    // Notification d'inscription gratuite
    setTimeout(() => {
      addNotification({
        type: "success",
        titre: "Inscription réussie",
        message: 'Vous êtes maintenant inscrit à "Introduction au Marketing Digital". Commencez dès maintenant !',
        icon: "🎓",
        link: "/formations/marketing-digital/learn",
      });
    }, 1000);

    // Message d'un formateur
    setTimeout(() => {
      addNotification({
        type: "message",
        titre: "Nouveau message",
        message: "Votre formateur a répondu à votre question sur le module 3.",
        sender: {
          nom: "M. Kouassi Jean",
          avatar: "/images/avatar-formateur.jpg",
        },
        link: "/messages",
      });
    }, 2000);

    // Information sur une nouvelle formation
    setTimeout(() => {
      addNotification({
        type: "info",
        titre: "Nouvelle formation disponible",
        message: "La formation 'Gestion Avancée de Projet' est maintenant disponible. Inscrivez-vous dès maintenant !",
        icon: "📚",
        link: "/catalogue",
      });
    }, 3000);

    // Alerte sur une date limite
    setTimeout(() => {
      addNotification({
        type: "warning",
        titre: "Date limite approchante",
        message: "Il ne vous reste que 3 jours pour terminer l'examen final de 'Comptabilité PME'.",
        link: "/formations/comptabilite-pme/examen-final",
      });
    }, 4000);
  };

  return { createTestNotifications };
}
