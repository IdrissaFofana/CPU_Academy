"use client";

import { useEffect, useState, use } from "react";
import { notFound, useRouter } from "next/navigation";
import Link from "next/link";
import { formationsMock } from "@/data/mock";
import { Button } from "@/components/ui/button";

export default function CertificatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const formation = formationsMock.find((f) => f.slug === slug);

  if (!formation) {
    notFound();
  }

  const [examResult, setExamResult] = useState<any>(null);
  const [certificateData, setCertificateData] = useState<any>(null);
  const [canAccessCertificate, setCanAccessCertificate] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a réussi l'examen
    const resultKey = `examen-final-${formation.id}`;
    const saved = localStorage.getItem(resultKey);

    if (saved) {
      const result = JSON.parse(saved);
      
      if (result.passed) {
        setExamResult(result);
        setCanAccessCertificate(true);

        // Générer les données du certificat
        const certData = {
          studentName: "Kouamé Jean-Claude", // Mock - à remplacer par vraies données user
          formationTitle: formation.titre,
          completionDate: new Date(result.completedAt).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          score: result.score,
          certificateId: `CPU-${formation.id.toUpperCase()}-${Date.now()}`,
          issueDate: new Date().toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          verificationUrl: `https://cpu-academy.ci/verify/${formation.id}-${Date.now()}`,
        };

        setCertificateData(certData);

        // Sauvegarder dans mes-certifications
        const certificatesKey = "my-certificates";
        const existingCerts = localStorage.getItem(certificatesKey);
        const certs = existingCerts ? JSON.parse(existingCerts) : [];
        
        // Éviter les doublons
        const alreadyExists = certs.some(
          (c: any) => c.formationId === formation.id
        );
        
        if (!alreadyExists) {
          certs.push({
            ...certData,
            formationId: formation.id,
            formationSlug: formation.slug,
          });
          localStorage.setItem(certificatesKey, JSON.stringify(certs));
        }
      }
    }
  }, [formation]);

  const handleDownloadPDF = () => {
    // Simuler le téléchargement (à implémenter avec html2canvas + jspdf plus tard)
    alert(
      "Fonctionnalité de téléchargement PDF en cours de développement.\n\n" +
      "Le certificat sera téléchargé au format PDF avec :\n" +
      "- Design professionnel CPU Academy\n" +
      "- QR code de vérification\n" +
      "- Signature numérique"
    );
  };

  const handleShareLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
      formation.titre
    )}&organizationId=CPU-Academy&issueYear=${new Date().getFullYear()}&issueMonth=${
      new Date().getMonth() + 1
    }&certUrl=${encodeURIComponent(window.location.href)}`;

    window.open(linkedInUrl, "_blank");
  };

  const handleSendEmail = () => {
    const subject = `Certificat CPU Academy - ${formation.titre}`;
    const body = `
Bonjour,

Je vous fais part de l'obtention de mon certificat de formation délivré par CPU Academy.

Formation : ${formation.titre}
Date d'obtention : ${certificateData?.completionDate}
Score : ${examResult?.score}%
Certificat : ${window.location.href}

Cordialement,
${certificateData?.studentName}
    `.trim();

    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  if (!canAccessCertificate || !certificateData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Certificat non disponible
          </h1>
          <p className="text-slate-600 mb-6">
            Vous devez réussir l'examen final avec au moins 75% pour obtenir
            votre certificat.
          </p>
          <Link href={`/formations/${slug}/examen-final`}>
            <Button className="bg-cpu-orange hover:bg-cpu-orange/90 text-white">
              Passer l'examen final
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Success Message */}
        <div className="text-center mb-12 animate-fadeInUp">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">
            🎉 Félicitations {certificateData.studentName} !
          </h1>
          <p className="text-xl text-slate-600">
            Vous avez réussi la formation avec un score de{" "}
            <span className="font-bold text-green-600">{examResult.score}%</span>
          </p>
        </div>

        {/* Certificate */}
        <div
          id="certificate"
          className="bg-white rounded-2xl shadow-2xl p-12 mb-8 relative overflow-hidden"
        >
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-cpu-orange/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-500/10 to-transparent rounded-full translate-x-1/2 translate-y-1/2" />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-12 border-b-4 border-cpu-orange pb-8">
              <div className="flex justify-center items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-cpu-orange rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">CPU</span>
                </div>
                <div className="text-left">
                  <h2 className="text-3xl font-bold text-slate-900">
                    CPU Academy
                  </h2>
                  <p className="text-sm text-slate-600">
                    Centrale des Professionnels et Universités de Côte d'Ivoire
                  </p>
                </div>
              </div>
            </div>

            {/* Certificate Type */}
            <div className="text-center mb-8">
              <h3 className="text-5xl font-serif font-bold text-slate-900 mb-2">
                Certificat de Réussite
              </h3>
              <p className="text-lg text-slate-600">
                Ce certificat atteste que
              </p>
            </div>

            {/* Student Name */}
            <div className="text-center mb-8">
              <p className="text-5xl font-serif font-bold text-cpu-orange mb-2">
                {certificateData.studentName}
              </p>
              <div className="w-64 h-1 bg-gradient-to-r from-transparent via-cpu-orange to-transparent mx-auto" />
            </div>

            {/* Formation Details */}
            <div className="text-center mb-12">
              <p className="text-lg text-slate-700 mb-4">
                a complété avec succès la formation
              </p>
              <h4 className="text-3xl font-bold text-slate-900 mb-4">
                {certificateData.formationTitle}
              </h4>
              <p className="text-slate-600">
                Le {certificateData.completionDate}
              </p>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-12 mb-12">
              <div className="text-center">
                <div className="text-4xl font-bold text-cpu-orange mb-1">
                  {examResult.score}%
                </div>
                <div className="text-sm text-slate-600">Score final</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cpu-orange mb-1">
                  {formation.duree}
                </div>
                <div className="text-sm text-slate-600">Heures de formation</div>
              </div>
            </div>

            {/* QR Code & Certificate ID */}
            <div className="flex items-center justify-between pt-8 border-t border-slate-200">
              <div>
                <p className="text-sm text-slate-600 mb-1">N° Certificat</p>
                <p className="text-lg font-mono font-semibold text-slate-900">
                  {certificateData.certificateId}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  Délivré le {certificateData.issueDate}
                </p>
              </div>

              {/* Mock QR Code */}
              <div className="text-center">
                <div className="w-32 h-32 bg-slate-900 rounded-lg flex items-center justify-center mb-2">
                  <div className="text-white text-xs">QR CODE</div>
                </div>
                <p className="text-xs text-slate-500">
                  Vérifier l'authenticité
                </p>
              </div>

              {/* Signature */}
              <div className="text-center">
                <div className="w-40 h-16 border-b-2 border-slate-900 mb-2 flex items-end justify-center pb-2">
                  <span className="font-serif italic text-2xl text-slate-900">
                    Dr. Kouassi
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-900">
                  Directeur CPU Academy
                </p>
                <p className="text-xs text-slate-600">
                  Centrale des Professionnels
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-6">
            Partagez votre réussite
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleDownloadPDF}
              className="bg-cpu-orange hover:bg-cpu-orange/90 text-white h-auto py-4"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Télécharger PDF
            </Button>

            <Button
              onClick={handleShareLinkedIn}
              variant="outline"
              className="border-blue-600 text-blue-600 hover:bg-blue-50 h-auto py-4"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Partager sur LinkedIn
            </Button>

            <Button
              onClick={handleSendEmail}
              variant="outline"
              className="h-auto py-4"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Envoyer par email
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex gap-3">
            <svg
              className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">À propos de ce certificat</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>
                  Ce certificat est accessible à tout moment depuis votre tableau
                  de bord
                </li>
                <li>
                  Il peut être partagé avec vos employeurs ou sur vos réseaux
                  sociaux
                </li>
                <li>
                  Le QR code permet à quiconque de vérifier l'authenticité du
                  certificat
                </li>
                <li>
                  Ce certificat est sauvegardé dans votre section "Mes
                  Certifications"
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/mes-certifications" className="flex-1">
            <Button variant="outline" className="w-full">
              Voir mes certifications
            </Button>
          </Link>
          <Link href="/catalogue" className="flex-1">
            <Button className="w-full bg-cpu-orange hover:bg-cpu-orange/90 text-white">
              Explorer d'autres formations
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
