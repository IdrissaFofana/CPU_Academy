import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#1a1f2e] text-slate-300">
      <div className="container mx-auto px-6 lg:px-16 max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
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
                <Link href="/about#equipe" className="text-slate-400 hover:text-cpu-orange transition-colors">
                  Notre équipe
                </Link>
              </li>
              <li>
                <Link href="/about#partenaires" className="text-slate-400 hover:text-cpu-orange transition-colors">
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
            <div className="space-y-4 text-sm">
              <p className="text-slate-400">
                Confédération Patronale Unique des PME<br />
                Abidjan, Côte d&apos;Ivoire
              </p>
              <div className="space-y-2">
                <p className="text-slate-400">
                  <span className="font-semibold text-white">Email:</span> contact@cpu-pme.ci
                </p>
                <p className="text-slate-400">
                  <span className="font-semibold text-white">Téléphone:</span> +225 XX XX XX XX
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-slate-400">
              © 2026 CPU Formation. Tous droits réservés.
            </p>
            <p className="text-slate-400">
              Une initiative de la <span className="text-cpu-orange font-medium">Confédération Patronale Unique des PME de Côte d&apos;Ivoire</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

