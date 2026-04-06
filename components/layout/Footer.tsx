import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { CookieSettingsButton } from "@/components/layout/CookieSettingsButton";

export function Footer() {
  return (
    <footer className="bg-[#1a1f2e] text-slate-300 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-10 mb-8 sm:mb-12">
          {/* À propos de CPU Formation */}
          <div>
            <h3 className="text-cpu-orange font-semibold text-lg mb-4">À propos de CPU Formation</h3>
            <div className="mb-4">
              <div className="bg-white p-3 rounded-lg inline-block">
                <Image 
                  src="/images/cpu-logo.png" 
                  alt="CPU Logo" 
                  width={120} 
                  height={120}
                  className="rounded"
                />
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              L&apos;académie de formation de la Confédération Patronale Unique des PME de Côte d&apos;Ivoire, dédiée au renforcement des compétences professionnelles.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 rounded bg-slate-700 hover:bg-cpu-orange flex items-center justify-center transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-slate-700 hover:bg-cpu-orange flex items-center justify-center transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-slate-700 hover:bg-cpu-orange flex items-center justify-center transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded bg-slate-700 hover:bg-cpu-orange flex items-center justify-center transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Formations */}
          <div>
            <h3 className="text-cpu-orange font-semibold text-lg mb-4">Formations</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/catalogue" className="text-slate-400 hover:text-cpu-orange transition-colors">
                  Catalogue de formations
                </Link>
              </li>
              <li>
                <Link href="/parcours" className="text-slate-400 hover:text-cpu-orange transition-colors">
                  Parcours métiers
                </Link>
              </li>
              <li>
                <Link href="/certifications" className="text-slate-400 hover:text-cpu-orange transition-colors">
                  Certifications
                </Link>
              </li>
              <li>
                <Link href="/entreprises" className="text-slate-400 hover:text-cpu-orange transition-colors">
                  Solutions entreprises
                </Link>
              </li>
              <li>
                <Link href="/experts" className="text-slate-400 hover:text-cpu-orange transition-colors">
                  Nos experts
                </Link>
              </li>
            </ul>
          </div>

          {/* À propos */}
          <div>
            <h3 className="text-cpu-orange font-semibold text-lg mb-4">À propos</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-cpu-orange transition-colors font-medium">
                  Qui sommes-nous ?
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-cpu-orange transition-colors font-medium">
                  Blog & Actualités
                </Link>
              </li>
              <li>
                <Link href="/about?tab=equipe" className="text-slate-400 hover:text-cpu-orange transition-colors">
                  Notre équipe
                </Link>
              </li>
              <li>
                <Link href="/about?tab=partenaires" className="text-slate-400 hover:text-cpu-orange transition-colors">
                  Nos partenaires
                </Link>
              </li>
              <li>
                <Link href="/ressources/faq" className="text-slate-400 hover:text-cpu-orange transition-colors">
                  Centre d'aide
                </Link>
              </li>
              <li>
                <Link href="/rac" className="text-slate-400 hover:text-cpu-orange transition-colors">
                  RAC
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-cpu-orange font-semibold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-slate-400">
                <svg className="w-4 h-4 text-cpu-orange flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>937R+MCQ, Bingerville, Abidjan, Côte d&apos;Ivoire</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400">
                <svg className="w-4 h-4 text-cpu-orange flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <div className="flex flex-col gap-0.5">
                  <a href="tel:+2252520008258" className="hover:text-cpu-orange transition-colors">+225 25 20 00 82 58</a>
                  <a href="tel:+2250707558846" className="hover:text-cpu-orange transition-colors">+225 07 07 55 88 46</a>
                  <a href="tel:+2250707061296" className="hover:text-cpu-orange transition-colors">+225 07 07 06 12 96</a>
                  <a href="tel:+2250173432414" className="hover:text-cpu-orange transition-colors">+225 01 73 43 24 14</a>
                  <a href="tel:+2250707910959" className="hover:text-cpu-orange transition-colors">+225 07 07 91 09 59</a>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <svg className="w-4 h-4 text-cpu-orange flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <a href="mailto:info@cpupme.ci" className="hover:text-cpu-orange transition-colors">info@cpupme.ci</a>
              </div>
            </div>
          </div>

          {/* Légal */}
          <div>
            <h3 className="text-cpu-orange font-semibold text-lg mb-4">Légal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/mentions-legales" className="text-slate-400 hover:text-cpu-orange transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/politique-confidentialite" className="text-slate-400 hover:text-cpu-orange transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/cgu" className="text-slate-400 hover:text-cpu-orange transition-colors">
                  CGU
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-6 sm:pt-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center text-sm">
            <p className="text-slate-400 text-center sm:text-left">
              &copy; 2026 CPU Formation. Tous droits réservés.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <CookieSettingsButton />
              <p className="text-slate-400 text-center sm:text-right text-xs sm:text-sm">
                  Une initiative de la <span className="text-cpu-orange font-medium">CPU&#8209;PME</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

