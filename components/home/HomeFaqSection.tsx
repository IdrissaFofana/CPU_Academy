"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFaqs } from "@/hooks/useFaqs";

export function HomeFaqSection() {
  const { faqs, isLoading, error } = useFaqs();
  const displayedFaqs = faqs.slice(0, 5);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(openId === id ? null : id);

  return (
    <section className="py-10 md:py-16 bg-slate-50">
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-cpu-orange p-2.5 rounded-xl">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-cpu-orange font-semibold text-sm uppercase tracking-wide">
                Questions fréquentes
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Tout ce que vous devez savoir
            </h2>
            <p className="mt-3 text-slate-600 max-w-xl">
              Retrouvez les réponses aux questions les plus courantes sur nos
              formations, inscriptions et financements.
            </p>
            {error && (
              <p className="mt-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 inline-block">
                Impossible de charger les FAQ pour le moment.
              </p>
            )}
          </div>
          <Button
            variant="outline"
            className="shrink-0 border-2 border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white transition-colors"
            asChild
          >
            <Link href="/faq">
              Toutes les FAQ
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Accordion */}
        <div className="grid lg:grid-cols-2 gap-4">
          {isLoading && displayedFaqs.length === 0 && (
            <div className="lg:col-span-2 grid gap-4 md:grid-cols-2">
              {[0, 1, 2, 3].map((item) => (
                <div key={item} className="bg-white rounded-2xl border-2 border-slate-100 p-6 animate-pulse">
                  <div className="h-5 w-3/4 bg-slate-200 rounded mb-4" />
                  <div className="h-4 w-full bg-slate-100 rounded mb-2" />
                  <div className="h-4 w-5/6 bg-slate-100 rounded" />
                </div>
              ))}
            </div>
          )}

          {displayedFaqs.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-cpu-orange shadow-lg shadow-orange-100"
                    : "border-slate-100 hover:border-slate-200 shadow-sm"
                } ${index === displayedFaqs.length - 1 && displayedFaqs.length % 2 !== 0 ? "lg:col-span-2" : ""}`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                  onClick={() => toggle(faq.id)}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        isOpen
                          ? "bg-cpu-orange text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span
                      className={`font-semibold text-base ${
                        isOpen ? "text-cpu-orange" : "text-slate-900"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 transition-transform duration-200 ${
                      isOpen
                        ? "rotate-180 text-cpu-orange"
                        : "text-slate-400"
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-0">
                    <div className="ml-12 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.reponse}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {!isLoading && displayedFaqs.length === 0 && (
            <div className="lg:col-span-2 bg-white rounded-2xl border-2 border-slate-100 p-10 text-center text-slate-500">
              Aucune FAQ disponible pour le moment.
            </div>
          )}
        </div>

        {/* CTA bas */}
        <div className="mt-10 text-center">
          <p className="text-slate-500 mb-4">
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              className="bg-cpu-orange hover:bg-orange-600 text-white"
              asChild
            >
              <Link href="/faq">
                Consulter toutes les questions
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" className="border-2" asChild>
              <Link href="/support">Contacter le support</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
