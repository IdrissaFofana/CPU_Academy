import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Parcours de Formation | CPU Formation",
  description: "Découvrez nos parcours de formation complets et certifiants. Progressez rapidement avec des programmes structurés adaptés à votre niveau. De débutant à expert.",
  keywords: [
    "parcours formation côte d'ivoire",
    "parcours certifiant abidjan",
    "formation progressive",
    "parcours professionnel",
    "certification cpu formation",
    "formation complète pme"
  ],
  openGraph: {
    title: "Parcours de Formation Certifiants | CPU Formation",
    description: `${typeof window === 'undefined' ? '' : ''}Parcours complets pour transformer votre carrière. Certifications reconnues, accompagnement personnalisé, formations progressives.`,
    type: "website",
    url: "https://cpu-formation.ci/parcours",
    images: [
      {
        url: "/images/parcours-og.jpg",
        width: 1200,
        height: 630,
        alt: "Parcours de formation CPU Formation"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Parcours de Formation | CPU Formation",
    description: "Programmes certifiants complets pour PME ivoiriennes",
    images: ["/images/parcours-og.jpg"]
  }
};

export default function ParcoursLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
