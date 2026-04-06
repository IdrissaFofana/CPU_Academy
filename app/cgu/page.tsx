import type { Metadata } from "next";
import Link from "next/link";
import { ScrollText, ChevronRight } from "lucide-react";
import { LegalSummaryNav } from "@/components/legal/LegalSummaryNav";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation - CPU Formation",
  description:
    "Conditions générales d'utilisation de la plateforme CPU Formation.",
  robots: { index: true, follow: true },
};

const ARTICLES = [
  {
    id: "objet",
    title: "Article 1 – Objet",
    content: (
      <p>
        Les présentes Conditions Générales d&apos;Utilisation (CGU) ont pour
        objet de définir les modalités et conditions dans lesquelles{" "}
        <strong>CPU Formation</strong>, plateforme éditée par la{" "}
        <strong>CPU-PMECI</strong>, met à disposition ses services numériques de
        formation professionnelle, et les conditions dans lesquelles
        l&apos;utilisateur accède et utilise ces services.
      </p>
    ),
  },
  {
    id: "acceptation",
    title: "Article 2 – Acceptation des CGU",
    content: (
      <p>
        L&apos;accès et l&apos;utilisation du site impliquent l&apos;acceptation
        pleine et entière des présentes CGU. Si vous n&apos;acceptez pas ces
        conditions, veuillez ne pas utiliser le site. CPU Formation se réserve
        le droit de modifier les CGU à tout moment ; les modifications prennent
        effet dès leur publication en ligne.
      </p>
    ),
  },
  {
    id: "acces",
    title: "Article 3 – Accès à la plateforme",
    content: (
      <>
        <p>
          L&apos;accès à certaines fonctionnalités (inscription à des
          formations, suivi de parcours, téléchargement d&apos;attestations)
          nécessite la création d&apos;un compte utilisateur. L&apos;utilisateur
          s&apos;engage à :
        </p>
        <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-600">
          <li>Fournir des informations exactes et à jour lors de son inscription.</li>
          <li>
            Maintenir la confidentialité de ses identifiants de connexion.
          </li>
          <li>
            Notifier CPU Formation sans délai de tout accès non autorisé à son
            compte.
          </li>
        </ul>
        <p className="mt-3">
          CPU Formation se réserve le droit de suspendre ou supprimer tout
          compte en cas de violation des présentes CGU ou d&apos;utilisation
          frauduleuse.
        </p>
      </>
    ),
  },
  {
    id: "formations",
    title: "Article 4 – Inscriptions et formations",
    content: (
      <>
        <p>
          L&apos;inscription à une formation vaut commande ferme. Le prix
          affiché est en francs CFA (FCFA) toutes taxes comprises.
        </p>
        <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-600">
          <li>
            <strong>Formation en ligne</strong> : accès ouvert après validation
            du paiement, selon les modalités indiquées sur la fiche formation.
          </li>
          <li>
            <strong>Formation présentielle</strong> : confirmation sous réserve
            de disponibilité des places. CPU Formation se réserve le droit
            d&apos;annuler ou reporter une session avec un délai de prévenance
            de 48 h minimum.
          </li>
          <li>
            <strong>Attestation de suivi</strong> : délivrée après complétion
            d&apos;au moins 80 % du contenu et réussite des évaluations.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "paiement",
    title: "Article 5 – Paiement et remboursement",
    content: (
      <>
        <p>
          Les paiements sont traités via des prestataires sécurisés. CPU
          Formation ne stocke aucune donnée bancaire.
        </p>
        <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-600">
          <li>
            <strong>Droit de rétractation</strong> : pour les formations en
            ligne, vous disposez d&apos;un délai de <strong>7 jours</strong>{" "}
            après l&apos;achat pour demander un remboursement, à condition de
            n&apos;avoir accédé à aucun contenu.
          </li>
          <li>
            <strong>Formations présentielles</strong> : remboursement possible
            jusqu&apos;à 72 h avant le début de la session.
          </li>
          <li>
            Les demandes de remboursement sont à adresser à{" "}
            <a
              href="mailto:info@cpupme.ci"
              className="text-[#F17425] hover:underline"
            >
              info@cpupme.ci
            </a>
            .
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "propriete",
    title: "Article 6 – Propriété intellectuelle",
    content: (
      <p>
        Les contenus pédagogiques (vidéos, supports, exercices, quiz) sont la
        propriété exclusive de CPU Formation ou de ses formateurs partenaires.
        Toute reproduction, redistribution ou utilisation commerciale sans
        autorisation écrite est interdite. L&apos;utilisateur bénéficie
        d&apos;une licence personnelle, non exclusive et non cessible pour les
        contenus auxquels il a souscrit.
      </p>
    ),
  },
  {
    id: "conduite",
    title: "Article 7 – Règles de conduite",
    content: (
      <>
        <p>L&apos;utilisateur s&apos;interdit notamment :</p>
        <ul className="list-disc list-inside mt-3 space-y-1.5 text-gray-600">
          <li>
            De partager ses identifiants ou de permettre un accès concurrent à
            son compte.
          </li>
          <li>
            De publier dans les espaces communautaires tout contenu offensant,
            discriminatoire ou illicite.
          </li>
          <li>
            De tenter de contourner les mesures de protection technique des
            contenus.
          </li>
          <li>De recueillir des données sur d&apos;autres utilisateurs.</li>
        </ul>
      </>
    ),
  },
  {
    id: "responsabilite",
    title: "Article 8 – Responsabilité",
    content: (
      <p>
        CPU Formation met tout en œuvre pour assurer la disponibilité et la
        qualité de la plateforme. Elle ne peut être tenue responsable des
        interruptions liées à des opérations de maintenance, à un cas de force
        majeure ou à des défaillances de réseaux tiers. La responsabilité de
        CPU Formation est limitée au montant effectivement payé par
        l&apos;utilisateur pour la formation concernée.
      </p>
    ),
  },
  {
    id: "donnees",
    title: "Article 9 – Données personnelles",
    content: (
      <p>
        Le traitement des données personnelles dans le cadre de l&apos;utilisation
        de la plateforme est régi par notre{" "}
        <Link
          href="/politique-confidentialite"
          className="text-[#F17425] hover:underline font-medium"
        >
          Politique de confidentialité
        </Link>
        , qui fait partie intégrante des présentes CGU.
      </p>
    ),
  },
  {
    id: "droit-applicable",
    title: "Article 10 – Droit applicable et litiges",
    content: (
      <p>
        Les présentes CGU sont régies par le droit ivoirien. En cas de litige,
        les parties s&apos;engagent à rechercher une solution amiable. À défaut,
        le litige sera soumis aux juridictions compétentes d&apos;Abidjan, Côte
        d&apos;Ivoire.
      </p>
    ),
  },
];

export default function CguPage() {
  const summaryItems = ARTICLES.map((article) => ({
    id: article.id,
    label: article.title.replace(/^Article\s+\d+\s*[–-]\s*/i, ""),
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
            <span className="text-slate-300">CGU</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#F17425]/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <ScrollText className="w-5 h-5 text-[#F17425]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">
              Conditions Générales d&apos;Utilisation
            </h1>
          </div>
          <p className="text-slate-400 text-sm">
            Dernière mise à jour :{" "}
            <strong className="text-slate-300">6 avril 2026</strong>
          </p>
        </div>
      </div>

      {/* ── Contenu ── */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <LegalSummaryNav
            title="Articles"
            subtitle="Accès rapide aux règles d'utilisation de la plateforme"
            updatedAt="6 avril 2026"
            icon={<ScrollText className="w-4 h-4" />}
            items={summaryItems}
          />

          <main className="flex-1 min-w-0 w-full space-y-5 sm:space-y-6">
            {ARTICLES.map((a) => (
              <section
                key={a.id}
                id={a.id}
                className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 lg:p-6 shadow-sm scroll-mt-24"
              >
                <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 pb-3 border-b border-gray-100">
                  {a.title}
                </h2>
                <div className="text-sm text-gray-600 leading-relaxed">
                  {a.content}
                </div>
              </section>
            ))}

            {/* Contact */}
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <ScrollText className="w-7 h-7 sm:w-8 sm:h-8 text-[#F17425] flex-shrink-0" />
              <div>
                <p className="font-semibold text-gray-900">
                  Une question sur nos conditions ?
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  Écrivez-nous à{" "}
                  <a
                    href="mailto:info@cpupme.ci"
                    className="text-[#F17425] hover:underline font-medium"
                  >
                    info@cpupme.ci
                  </a>
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
