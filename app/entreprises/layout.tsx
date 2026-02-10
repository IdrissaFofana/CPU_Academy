import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formation Entreprise Côte d'Ivoire | Solutions sur mesure - CPU Formation",
  description: "Formation professionnelle pour entreprises en Côte d'Ivoire. Packs métiers, accompagnement, FDFP. 200+ entreprises formées, satisfaction 95%. Devis gratuit sous 24h.",
  keywords: [
    "formation entreprise côte d'ivoire",
    "formation professionnelle abidjan",
    "FDFP formation",
    "formation sur mesure CI",
    "pack formation métier",
    "formation management CI",
    "formation commercial abidjan"
  ],
  openGraph: {
    title: "CPU Formation | Solutions Entreprises",
    description: "Développez les compétences de vos équipes. Prise en charge FDFP jusqu'à 70%.",
    images: ["/og-entreprises.jpg"],
    type: "website",
    locale: "fr_CI"
  },
  alternates: {
    canonical: "https://cpu-formation.ci/entreprises"
  }
};

export default function EntreprisesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
