
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Colonne 1: À propos */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cpu-orange">À propos de CPU-Académie</h3>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/6345545e-e4f5-4b90-9366-2280db22507b.png" 
                alt="CPU-PME.CI" 
                className="h-12 w-auto mb-3" 
              />
            </div>
            <p className="text-gray-400 text-sm">
              L'académie de formation de la Confédération Patronale Unique des PME de Côte d'Ivoire, 
              dédiée au renforcement des compétences professionnelles.
            </p>
            <div className="flex mt-4 space-x-3">
              <SocialLink href="#" icon={<Facebook className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Twitter className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Instagram className="w-4 h-4" />} />
              <SocialLink href="#" icon={<Linkedin className="w-4 h-4" />} />
            </div>
          </div>

          {/* Colonne 2: Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cpu-orange">Liens rapides</h3>
            <ul className="space-y-2">
              <FooterLink href="/formations">Catalogue des formations</FooterLink>
              <FooterLink href="/certifications">Certifications</FooterLink>
              <FooterLink href="/entreprises">Espace Entreprises</FooterLink>
              <FooterLink href="/regions">Régions & Métiers</FooterLink>
              <FooterLink href="/tarification">Abonnements & Tarification</FooterLink>
              <FooterLink href="/communaute">Communauté & Ressources</FooterLink>
            </ul>
          </div>

          {/* Colonne 3: Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cpu-orange">Support</h3>
            <ul className="space-y-2">
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/aide">Centre d'aide</FooterLink>
              <FooterLink href="/contact">Contact & Support</FooterLink>
              <FooterLink href="/devenir-formateur">Espace recrutement formateurs</FooterLink>
              <FooterLink href="/mentions-legales">Mentions légales</FooterLink>
              <FooterLink href="/confidentialite">Politique de confidentialité</FooterLink>
            </ul>
          </div>

          {/* Colonne 4: Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-cpu-orange">Contact</h3>
            <address className="not-italic text-gray-400 space-y-2 text-sm">
              <p>Confédération Patronale Unique des PME</p>
              <p>Abidjan, Côte d'Ivoire</p>
              <p className="mt-2">
                <strong className="text-gray-300">Email:</strong> contact@cpu-pme.ci
              </p>
              <p>
                <strong className="text-gray-300">Téléphone:</strong> +225 XX XX XX XX
              </p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CPU-Académie. Tous droits réservés.</p>
          <p className="mt-2 md:mt-0">
            Une initiative de la <a href="#" className="text-cpu-orange hover:underline">Confédération Patronale Unique des PME de Côte d'Ivoire</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <li>
      <Link to={href} className="text-gray-400 hover:text-cpu-orange transition-colors duration-200 text-sm">
        {children}
      </Link>
    </li>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <a 
      href={href} 
      className="text-gray-400 hover:text-cpu-orange bg-gray-800 p-2 rounded-full transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      {icon}
    </a>
  );
};

export default Footer;
