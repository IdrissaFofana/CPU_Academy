import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ChevronRight } from "lucide-react";
import { LegalSummaryNav } from "@/components/legal/LegalSummaryNav";

export const metadata: Metadata = {
  title: "Politique de Confidentialité - CPU Formation",
  description:
    "Politique de confidentialité et de protection des données personnelles de CPU Formation, plateforme de la CPU-PMECI.",
  robots: { index: true, follow: true },
};

const SECTIONS = [
  {
    id: "identite",
    title: "1. Identité du responsable de traitement",
    content: (
      <>
        <p>
          La présente politique de confidentialité s&apos;applique au site{" "}
          <strong>CPU Formation</strong> (ci-après « le Site »), édité par la{" "}
          <strong>
            Confédération Patronale Unique des PME de Côte d&apos;Ivoire
            (CPU-PMECI)
          </strong>
          , dont le siège social est situé au :{" "}
          <strong>937R+MCQ, Bingerville, Abidjan, Côte d&apos;Ivoire</strong>.
        </p>
        <p className="mt-3">
          Contact DPO :{" "}
          <a
            href="mailto:info@cpupme.ci"
            className="text-[#F17425] hover:underline"
          >
            info@cpupme.ci
          </a>
        </p>
      </>
    ),
  },
  {
    id: "donnees-collectees",
    title: "2. Données collectées",
    content: (
      <>
        <p>
          Dans le cadre de vos interactions avec le Site, nous pouvons collecter
          les catégories de données suivantes :
        </p>
        <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-600">
          <li>
            <strong>Données d&apos;identification</strong> : nom, prénom, adresse
            e-mail, numéro de téléphone.
          </li>
          <li>
            <strong>Données professionnelles</strong> : nom de l&apos;entreprise,
            secteur d&apos;activité, fonction.
          </li>
          <li>
            <strong>Données de navigation</strong> : adresse IP, pages
            consultées, durée de visite, type de navigateur (cookies analytiques
            si consentis).
          </li>
          <li>
            <strong>Données de transaction</strong> : formations achetées,
            historique de commandes, informations de paiement (traitées par un
            prestataire sécurisé, non stockées chez nous).
          </li>
          <li>
            <strong>Préférences utilisateur</strong> : favoris, thème, panier
            (stockés localement sur votre appareil).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "finalites",
    title: "3. Finalités du traitement",
    content: (
      <>
        <p>Vos données sont traitées pour les finalités suivantes :</p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-orange-50">
                <th className="text-left p-3 border border-gray-200 font-semibold">
                  Finalité
                </th>
                <th className="text-left p-3 border border-gray-200 font-semibold">
                  Base légale
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {[
                [
                  "Gestion de votre compte et de vos inscriptions aux formations",
                  "Exécution du contrat",
                ],
                [
                  "Traitement des paiements et émission de factures",
                  "Exécution du contrat",
                ],
                [
                  "Envoi de communications liées à votre formation (rappels, attestations)",
                  "Exécution du contrat",
                ],
                [
                  "Amélioration du Site et analyse des usages",
                  "Intérêt légitime / Consentement",
                ],
                [
                  "Envoi de newsletters et offres promotionnelles",
                  "Consentement",
                ],
                ["Réponse à vos demandes de support", "Intérêt légitime"],
                [
                  "Respect de nos obligations légales et fiscales",
                  "Obligation légale",
                ],
              ].map(([fin, base]) => (
                <tr key={fin} className="hover:bg-gray-50">
                  <td className="p-3 border border-gray-200">{fin}</td>
                  <td className="p-3 border border-gray-200 text-[#F17425] font-medium whitespace-nowrap">
                    {base}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: "conservation",
    title: "4. Durée de conservation",
    content: (
      <ul className="list-disc list-inside space-y-1.5 text-gray-600">
        <li>
          Données de compte actif : <strong>durée de la relation</strong> + 3
          ans après la dernière activité.
        </li>
        <li>
          Données de facturation : <strong>10 ans</strong> (obligation
          comptable).
        </li>
        <li>
          Données de navigation (analytiques) :{" "}
          <strong>13 mois maximum</strong>.
        </li>
        <li>
          Consentements cookies :{" "}
          <strong>6 mois</strong> (renouvelés à expiration).
        </li>
        <li>
          Prospects (formulaire de contact) :{" "}
          <strong>3 ans</strong> sans interaction.
        </li>
      </ul>
    ),
  },
  {
    id: "destinataires",
    title: "5. Destinataires des données",
    content: (
      <>
        <p>
          Vos données peuvent être partagées avec les catégories de destinataires
          suivantes :
        </p>
        <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-600">
          <li>
            <strong>Prestataires techniques</strong> : hébergement, paiement
            sécurisé, envoi d&apos;e-mails transactionnels.
          </li>
          <li>
            <strong>Formateurs partenaires</strong> : uniquement les données
            nécessaires à l&apos;organisation de la formation.
          </li>
          <li>
            <strong>Autorités publiques</strong> : sur réquisition légale.
          </li>
        </ul>
        <p className="mt-3">
          Aucune donnée n&apos;est vendue à des tiers. Tout sous-traitant est
          lié par un accord de traitement de données conforme à nos obligations.
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "6. Cookies et traceurs",
    content: (
      <>
        <p>
          Le Site utilise des cookies. Vous pouvez à tout moment consulter et
          modifier vos préférences via le lien{" "}
          <strong>« Gérer mes cookies »</strong> présent en bas de chaque page.
        </p>
        <div className="mt-4 space-y-3">
          {[
            {
              name: "Essentiels",
              desc: "Nécessaires au fonctionnement du site (session, panier, authentification). Toujours actifs, ne nécessitent pas de consentement.",
              duration: "Session / 1 an",
            },
            {
              name: "Fonctionnels",
              desc: "Mémorisent vos préférences (thème, favoris, notifications) pour personnaliser votre expérience.",
              duration: "1 an",
            },
            {
              name: "Analytiques",
              desc: "Mesurent l'audience et l'utilisation du site pour améliorer nos contenus.",
              duration: "13 mois",
            },
            {
              name: "Marketing",
              desc: "Permettent de personnaliser les offres et communications selon vos préférences.",
              duration: "6 mois",
            },
          ].map((c) => (
            <div
              key={c.name}
              className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100"
            >
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-[#F17425] mt-2" />
              <div>
                <p className="font-semibold text-gray-900">{c.name}</p>
                <p className="text-sm text-gray-500 mt-0.5">{c.desc}</p>
                <p className="text-xs text-gray-400 mt-1">
                  Conservation : {c.duration}
                </p>
              </div>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "droits",
    title: "7. Vos droits",
    content: (
      <>
        <p>
          Conformément à la réglementation applicable en matière de protection
          des données, vous disposez des droits suivants :
        </p>
        <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-600">
          <li>
            <strong>Droit d&apos;accès</strong> : obtenir une copie de vos
            données.
          </li>
          <li>
            <strong>Droit de rectification</strong> : corriger des données
            inexactes.
          </li>
          <li>
            <strong>Droit à l&apos;effacement</strong> : demander la suppression
            de vos données.
          </li>
          <li>
            <strong>Droit à la limitation</strong> : limiter le traitement dans
            certains cas.
          </li>
          <li>
            <strong>Droit à la portabilité</strong> : recevoir vos données dans
            un format structuré.
          </li>
          <li>
            <strong>Droit d&apos;opposition</strong> : s&apos;opposer à un
            traitement fondé sur l&apos;intérêt légitime ou à des fins de
            prospection.
          </li>
          <li>
            <strong>Droit de retirer votre consentement</strong> à tout moment,
            sans affecter la licéité du traitement antérieur.
          </li>
        </ul>
        <p className="mt-4">
          Pour exercer vos droits, contactez-nous :{" "}
          <a
            href="mailto:info@cpupme.ci"
            className="text-[#F17425] hover:underline font-medium"
          >
            info@cpupme.ci
          </a>{" "}
          ou par courrier au siège social. Nous vous répondrons dans un délai
          d&apos;un mois.
        </p>
      </>
    ),
  },
  {
    id: "securite",
    title: "8. Sécurité",
    content: (
      <p>
        CPU Formation met en œuvre des mesures techniques et organisationnelles
        appropriées pour protéger vos données contre tout accès non autorisé,
        perte, destruction ou altération : chiffrement HTTPS/TLS, accès
        restreints, journalisation des accès, sauvegardes régulières. En cas de
        violation de données susceptible d&apos;engendrer un risque pour vos
        droits, vous serez notifié dans les délais réglementaires.
      </p>
    ),
  },
  {
    id: "modifications",
    title: "9. Modifications de la politique",
    content: (
      <p>
        Cette politique peut être mise à jour à tout moment. La version en ligne
        fait foi. En cas de modification substantielle, vous serez informé par
        e-mail ou via une notification sur le Site. La date de dernière mise à
        jour est indiquée en bas de page.
      </p>
    ),
  },
];

export default function PolitiqueConfidentialitePage() {
  const summaryItems = SECTIONS.map((section) => ({
    id: section.id,
    label: section.title.replace(/^\d+\.\s*/, ""),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero ── */}
      <div className="bg-[#1a1f2e] text-white py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="text-slate-300">Politique de confidentialité</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#F17425]/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-[#F17425]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Politique de confidentialité
            </h1>
          </div>
          <p className="text-slate-400 text-sm">
            Dernière mise à jour : <strong className="text-slate-300">6 avril 2026</strong>
          </p>
        </div>
      </div>

      {/* ── Contenu ── */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <LegalSummaryNav
            title="Sommaire"
            subtitle="Accès rapide aux rubriques clés de confidentialité"
            updatedAt="6 avril 2026"
            icon={<Shield className="w-4 h-4" />}
            items={summaryItems}
          />

          {/* Sections */}
          <main className="flex-1 min-w-0 w-full space-y-5 sm:space-y-6 lg:space-y-8">
            {SECTIONS.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 lg:p-6 shadow-sm scroll-mt-24"
              >
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 pb-3 border-b border-gray-100">
                  {s.title}
                </h2>
                <div className="text-gray-600 text-sm leading-relaxed">
                  {s.content}
                </div>
              </section>
            ))}

            {/* Contact card */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-[#F17425] flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">
                  Une question sur vos données ?
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  Contactez notre équipe à{" "}
                  <a
                    href="mailto:info@cpupme.ci"
                    className="text-[#F17425] hover:underline font-medium"
                  >
                    info@cpupme.ci
                  </a>{" "}
                  — nous répondons sous 30 jours.
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
