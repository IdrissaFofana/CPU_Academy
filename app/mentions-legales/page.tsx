import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ChevronRight } from "lucide-react";
import { LegalSummaryNav } from "@/components/legal/LegalSummaryNav";

export const metadata: Metadata = {
  title: "Mentions Légales - CPU Formation",
  description:
    "Mentions légales du site CPU Formation, édité par la CPU-PMECI.",
  robots: { index: true, follow: true },
};

const SECTION_LINKS = [
  { id: "editeur", label: "Éditeur du site" },
  { id: "hebergement", label: "Hébergement" },
  { id: "propriete", label: "Propriété intellectuelle" },
  { id: "responsabilite", label: "Limitation de responsabilité" },
  { id: "liens", label: "Liens hypertextes" },
  { id: "donnees", label: "Données personnelles & cookies" },
  { id: "droit-applicable", label: "Droit applicable" },
];

export default function MentionsLegalesPage() {
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
            <span className="text-slate-300">Mentions légales</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#F17425]/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-[#F17425]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold">Mentions légales</h1>
          </div>
          <p className="text-slate-400 text-sm">
            Dernière mise à jour :{" "}
            <strong className="text-slate-300">6 avril 2026</strong>
          </p>
        </div>
      </div>

      {/* ── Sections ── */}
      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          <LegalSummaryNav
            title="Mentions"
            subtitle="Accès rapide aux informations légales du site"
            updatedAt="6 avril 2026"
            icon={<FileText className="w-4 h-4" />}
            items={SECTION_LINKS}
          />

          <main className="flex-1 min-w-0 w-full space-y-5 sm:space-y-6">
        {/* Éditeur */}
        <section id="editeur" className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 lg:p-6 shadow-sm scroll-mt-24">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            1. Éditeur du site
          </h2>
          <div className="text-sm text-gray-600 leading-relaxed space-y-2">
            <p>
              <strong>Raison sociale :</strong> Confédération Patronale Unique
              des PME de Côte d&apos;Ivoire (CPU-PMECI)
            </p>
            <p>
              <strong>Siège social :</strong> 937R+MCQ, Bingerville, Abidjan,
              Côte d&apos;Ivoire
            </p>
            <p>
              <strong>Téléphone :</strong>{" "}
              <a
                href="tel:+2252520008258"
                className="text-[#F17425] hover:underline"
              >
                +225 25 20 00 82 58
              </a>
            </p>
            <p>
              <strong>E-mail :</strong>{" "}
              <a
                href="mailto:info@cpupme.ci"
                className="text-[#F17425] hover:underline"
              >
                info@cpupme.ci
              </a>
            </p>
            <p>
              <strong>Directeur de la publication :</strong> La direction
              générale de la CPU-PMECI
            </p>
          </div>
        </section>

        {/* Hébergement */}
        <section id="hebergement" className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 lg:p-6 shadow-sm scroll-mt-24">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            2. Hébergement
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le site est hébergé par un prestataire tiers. Pour toute demande
            relative à l&apos;hébergement, contactez-nous à{" "}
            <a
              href="mailto:info@cpupme.ci"
              className="text-[#F17425] hover:underline"
            >
              info@cpupme.ci
            </a>
            .
          </p>
        </section>

        {/* Propriété intellectuelle */}
        <section id="propriete" className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 lg:p-6 shadow-sm scroll-mt-24">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            3. Propriété intellectuelle
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            L&apos;ensemble du contenu du site CPU Formation (textes, images,
            logos, vidéos, icônes, supports de formation) est protégé par le
            droit de la propriété intellectuelle en vigueur en Côte
            d&apos;Ivoire. Toute reproduction, représentation, distribution ou
            exploitation de tout ou partie de ces éléments sans autorisation
            expresse et préalable de la CPU-PMECI est strictement interdite et
            constituerait une contrefaçon.
          </p>
        </section>

        {/* Responsabilité */}
        <section id="responsabilite" className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 lg:p-6 shadow-sm scroll-mt-24">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            4. Limitation de responsabilité
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            CPU Formation s&apos;efforce de maintenir des informations à jour et
            exactes. Cependant, elle ne peut garantir l&apos;exhaustivité ni
            l&apos;absence d&apos;erreur du contenu proposé. CPU Formation
            décline toute responsabilité pour tout dommage direct ou indirect
            résultant de l&apos;utilisation ou de l&apos;impossibilité
            d&apos;utiliser le site, ou de toute information qui y est contenue.
          </p>
        </section>

        {/* Liens externes */}
        <section id="liens" className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 lg:p-6 shadow-sm scroll-mt-24">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            5. Liens hypertextes
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Le site peut contenir des liens vers des sites externes. CPU
            Formation n&apos;est pas responsable du contenu de ces sites tiers
            ni de leur politique de confidentialité.
          </p>
        </section>

        {/* Données personnelles */}
        <section id="donnees" className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 lg:p-6 shadow-sm scroll-mt-24">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            6. Données personnelles & cookies
          </h2>
          <div className="text-sm text-gray-600 leading-relaxed space-y-2">
            <p>
              Le traitement de vos données personnelles est détaillé dans notre{" "}
              <Link
                href="/politique-confidentialite"
                className="text-[#F17425] hover:underline font-medium"
              >
                Politique de confidentialité
              </Link>
              .
            </p>
            <p>
              La gestion des cookies est disponible via le lien{" "}
              <strong>« Gérer mes cookies »</strong> en bas de chaque page.
            </p>
          </div>
        </section>

        {/* Droit applicable */}
        <section id="droit-applicable" className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 lg:p-6 shadow-sm scroll-mt-24">
          <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">
            7. Droit applicable
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Les présentes mentions légales sont régies par le droit ivoirien.
            Tout litige relatif à l&apos;utilisation du site sera soumis à la
            compétence exclusive des juridictions compétentes de Côte
            d&apos;Ivoire.
          </p>
        </section>
          </main>
        </div>
      </div>
    </div>
  );
}
