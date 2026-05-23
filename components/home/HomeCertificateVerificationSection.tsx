"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Search, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { certificationService } from "@/lib/api/services";
import { getFriendlyApiErrorMessage } from "@/lib/api/error-messages";
import {
  formatCertificateApiDate,
  normalizeCertificateVerifyResponse,
  type CertificateVerifyResponse,
} from "@/lib/certificates/verify-response";

export function HomeCertificateVerificationSection() {
  const searchParams = useSearchParams();
  const autoVerifyConsumed = useRef(false);

  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [verifyResult, setVerifyResult] = useState<CertificateVerifyResponse | null>(null);

  const verifyWithCode = useCallback(async (codeRaw: string) => {
    const code = codeRaw.trim();
    if (!code) {
      setVerifyResult(null);
      setVerifyError("Veuillez entrer un numéro de certificat.");
      return;
    }

    setIsVerifying(true);
    setVerifyError(null);
    setVerifyResult(null);

    try {
      const response = await certificationService.verifyByCode(encodeURIComponent(code));
      const normalized = normalizeCertificateVerifyResponse(response);

      if (normalized.valid) {
        setVerifyResult(normalized);
      } else {
        setVerifyError("Certificat invalide ou introuvable.");
      }
    } catch (error: unknown) {
      setVerifyError(getFriendlyApiErrorMessage(error, "certifications.verify"));
    } finally {
      setIsVerifying(false);
    }
  }, []);

  useEffect(() => {
    const raw = searchParams.get("code") ?? searchParams.get("verify");
    if (!raw) return;

    const decoded = raw.trim();
    setVerificationCode(decoded);

    const shouldAuto =
      searchParams.get("auto") === "1" ||
      searchParams.get("verifier") === "1" ||
      searchParams.get("verifyNow") === "1";

    if (shouldAuto && !autoVerifyConsumed.current) {
      autoVerifyConsumed.current = true;
      void verifyWithCode(decoded);
    }
  }, [searchParams, verifyWithCode]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    autoVerifyConsumed.current = true;
    await verifyWithCode(verificationCode);
  };

  const certification = verifyResult?.certification;

  return (
    <section id="verifier-certificat" className="py-10 md:py-16 bg-white">
      <div className="container mx-auto max-w-7xl px-6 lg:px-16">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-xl md:rounded-3xl md:p-12">
            <div className="mb-6 text-center md:mb-8">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 md:mb-6 md:h-20 md:w-20">
                <Shield className="h-8 w-8 text-cpu-orange md:h-10 md:w-10" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-slate-900 md:mb-4 md:text-3xl lg:text-4xl">
                Vérification de certificat
              </h2>
              <p className="text-base text-slate-600 md:text-lg">
                Entrez le numéro figurant sur le document pour confirmer son authenticité auprès de CPU
                Formation.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mb-3 flex flex-col gap-3 md:mb-4 md:flex-row md:gap-4"
            >
              <input
                type="text"
                value={verificationCode}
                onChange={(event) => setVerificationCode(event.target.value)}
                placeholder="Ex : CERT-NESTJS-PRO"
                className="flex-1 rounded-lg border-2 border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-cpu-orange focus:outline-none md:rounded-xl md:px-6 md:py-4 md:text-base"
                aria-label="Numéro de certificat"
              />
              <Button
                type="submit"
                disabled={isVerifying}
                className="cursor-pointer rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-3 text-sm text-white shadow-lg transition-opacity hover:opacity-90 disabled:opacity-70 md:rounded-xl md:px-8 md:py-4 md:text-base"
              >
                <Search className="mr-2 h-5 w-5" />
                {isVerifying ? "Vérification…" : "Vérifier"}
              </Button>
            </form>

            {verifyError && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                {verifyError}
              </div>
            )}

            {verifyResult?.valid && certification && (
              <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-4 md:p-5">
                <div className="mb-3 flex items-center gap-2 font-semibold text-green-700">
                  <CheckCircle2 className="h-5 w-5" />
                  Certificat authentique
                </div>
                <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">
                  <p className="text-slate-700">
                    <span className="font-semibold">Code :</span> {certification.code || "—"}
                  </p>
                  <p className="text-slate-700">
                    <span className="font-semibold">Type :</span>{" "}
                    {certification.typeCertification?.nom || "—"}
                  </p>
                  <p className="text-slate-700">
                    <span className="font-semibold">Niveau :</span>{" "}
                    {certification.typeCertification?.niveau || "—"}
                  </p>
                  <p className="text-slate-700">
                    <span className="font-semibold">Formation :</span>{" "}
                    {certification.formation?.title || "—"}
                  </p>
                  <p className="text-slate-700">
                    <span className="font-semibold">Date de délivrance :</span>{" "}
                    {formatCertificateApiDate(certification.dateDelivrance)}
                  </p>
                  <p className="text-slate-700">
                    <span className="font-semibold">Date d&apos;expiration :</span>{" "}
                    {formatCertificateApiDate(certification.dateExpiration)}
                  </p>
                </div>
              </div>
            )}

            <p className="text-center text-sm text-slate-500">
              Le numéro se trouve en bas à droite du certificat.{" "}
              <Link
                href="/certifications#verifier-certificat"
                className="font-medium text-cpu-orange hover:underline"
              >
                En savoir plus sur les certifications
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
