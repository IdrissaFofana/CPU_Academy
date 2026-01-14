import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Award,
  BadgeCheck,
  Book,
  BookOpen,
  Briefcase,
  Building,
  ChevronDown,
  FileText,
  Globe,
  GraduationCap,
  HelpCircle,
  Home,
  Landmark,
  Lightbulb,
  LogIn,
  MapPin,
  Menu,
  Rocket,
  ShoppingBag,
  Store,
  TrendingUp,
  User,
  Users,
  Wallet,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/6345545e-e4f5-4b90-9366-2280db22507b.png" 
                alt="CPU-PME.CI" 
                className="h-12 w-auto"
              />
              <span className="ml-3 text-xl font-bold text-cpu-black hidden md:block">
                CPU Academy
              </span>
            </Link>
          </div>

          {/* Menu de navigation principal - version desktop */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            <NavLink href="/" icon={<Home className="w-4 h-4 mr-1" />}>
              Accueil
            </NavLink>
            
            <NavLinkWithDropdown 
              title="Catalogue" 
              icon={<Book className="w-4 h-4 mr-1" />}
              items={[
                { label: "Toutes les formations", href: "/formations", icon: <BookOpen className="w-4 h-4" /> },
                { label: "Par Secteur", href: "/formations?filter=secteur", icon: <Briefcase className="w-4 h-4" /> },
                { label: "Par Région", href: "/formations?filter=region", icon: <MapPin className="w-4 h-4" /> },
                { label: "Par Niveau", href: "/formations?filter=niveau", icon: <TrendingUp className="w-4 h-4" /> },
                { label: "Formations certifiantes", href: "/formations?certification=true", icon: <Award className="w-4 h-4" /> },
              ]}
            />

            <NavLinkWithDropdown 
              title="Parcours" 
              icon={<Rocket className="w-4 h-4 mr-1" />}
              items={[
                { label: "Entrepreneur & PME", href: "/parcours/entrepreneur", icon: <Lightbulb className="w-4 h-4" /> },
                { label: "Entreprise & Corporate", href: "/parcours/corporate", icon: <Building className="w-4 h-4" /> },
                { label: "Accès Marchés (AO)", href: "/parcours/marches", icon: <ShoppingBag className="w-4 h-4" /> },
                { label: "Marketplace & Vente", href: "/parcours/marketplace", icon: <Store className="w-4 h-4" /> },
                { label: "Financement & Bancabilité", href: "/parcours/financement", icon: <Wallet className="w-4 h-4" /> },
                { label: "Incubateur / Production++", href: "/parcours/incubateur", icon: <Rocket className="w-4 h-4" /> },
              ]}
            />

            <NavLink href="/certifications" icon={<Award className="w-4 h-4 mr-1" />}>
              Certifications
            </NavLink>

            <NavLinkWithDropdown 
              title="Experts" 
              icon={<Users className="w-4 h-4 mr-1" />}
              items={[
                { label: "Annuaire des experts", href: "/experts", icon: <Users className="w-4 h-4" /> },
                { label: "Devenir formateur", href: "/devenir-formateur", icon: <GraduationCap className="w-4 h-4" /> },
              ]}
            />

            <NavLink href="/regions" icon={<Globe className="w-4 h-4 mr-1" />}>
              Régions
            </NavLink>

            <NavLinkWithDropdown 
              title="Entreprises" 
              icon={<Building className="w-4 h-4 mr-1" />}
              items={[
                { label: "Formations intra-entreprise", href: "/entreprises", icon: <Building className="w-4 h-4" /> },
                { label: "Packs équipes", href: "/entreprises/packs", icon: <Users className="w-4 h-4" /> },
                { label: "Évaluation des compétences", href: "/entreprises/evaluation", icon: <BadgeCheck className="w-4 h-4" /> },
              ]}
            />

            <NavLinkWithDropdown 
              title="Ressources" 
              icon={<FileText className="w-4 h-4 mr-1" />}
              items={[
                { label: "Guides & modèles", href: "/ressources", icon: <FileText className="w-4 h-4" /> },
                { label: "Webinaires & replays", href: "/ressources/webinaires", icon: <BookOpen className="w-4 h-4" /> },
                { label: "FAQ", href: "/support", icon: <HelpCircle className="w-4 h-4" /> },
              ]}
            />
          </div>

          {/* Boutons d'action */}
          <div className="hidden lg:flex items-center space-x-2">
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/connexion">
                    <LogIn className="w-4 h-4 mr-2" />
                    Connexion
                  </Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                  <Link to="/inscription">S'inscrire</Link>
                </Button>
              </>
            )}
          </div>

          {/* Bouton menu mobile */}
          <div className="lg:hidden flex items-center">
            <button
              className="text-gray-700 hover:text-cpu-orange focus:outline-none focus:ring-2 focus:ring-cpu-orange p-2 rounded-md"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white pb-4 px-4 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="space-y-1">
            <MobileNavLink href="/" icon={<Home className="w-5 h-5 mr-3" />}>
              Accueil
            </MobileNavLink>
            
            <div className="py-2">
              <span className="px-3 text-xs font-semibold text-gray-400 uppercase">Formations</span>
            </div>
            <MobileNavLink href="/formations" icon={<Book className="w-5 h-5 mr-3" />}>
              Catalogue des formations
            </MobileNavLink>
            <MobileNavLink href="/parcours/entrepreneur" icon={<Lightbulb className="w-5 h-5 mr-3" />}>
              Parcours Entrepreneur
            </MobileNavLink>
            <MobileNavLink href="/parcours/corporate" icon={<Building className="w-5 h-5 mr-3" />}>
              Parcours Corporate
            </MobileNavLink>
            <MobileNavLink href="/certifications" icon={<Award className="w-5 h-5 mr-3" />}>
              Certifications & Badges
            </MobileNavLink>
            
            <div className="py-2">
              <span className="px-3 text-xs font-semibold text-gray-400 uppercase">Réseau</span>
            </div>
            <MobileNavLink href="/experts" icon={<Users className="w-5 h-5 mr-3" />}>
              Experts & Formateurs
            </MobileNavLink>
            <MobileNavLink href="/regions" icon={<Globe className="w-5 h-5 mr-3" />}>
              Régions
            </MobileNavLink>
            <MobileNavLink href="/entreprises" icon={<Landmark className="w-5 h-5 mr-3" />}>
              Solutions Entreprises
            </MobileNavLink>
            
            <div className="py-2">
              <span className="px-3 text-xs font-semibold text-gray-400 uppercase">Support</span>
            </div>
            <MobileNavLink href="/ressources" icon={<FileText className="w-5 h-5 mr-3" />}>
              Ressources
            </MobileNavLink>
            <MobileNavLink href="/support" icon={<HelpCircle className="w-5 h-5 mr-3" />}>
              Aide & FAQ
            </MobileNavLink>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-2">
            {isLoggedIn ? (
              <MobileNavLink href="/profil" icon={<User className="w-5 h-5 mr-3" />}>
                Mon profil
              </MobileNavLink>
            ) : (
              <>
                <Button variant="outline" className="w-full justify-center" asChild>
                  <Link to="/connexion">Connexion</Link>
                </Button>
                <Button variant="default" className="w-full justify-center" asChild>
                  <Link to="/inscription">S'inscrire</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Composant de lien de navigation
const NavLink = ({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ReactNode }) => {
  return (
    <Link
      to={href}
      className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-cpu-orange hover:bg-gray-100 rounded-md flex items-center transition-colors duration-200"
    >
      {icon}
      {children}
    </Link>
  );
};

// Composant de lien avec dropdown
const NavLinkWithDropdown = ({ 
  title, 
  items, 
  icon 
}: { 
  title: string; 
  items: { label: string; href: string; icon?: React.ReactNode }[]; 
  icon?: React.ReactNode 
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-cpu-orange hover:bg-gray-100 rounded-md flex items-center transition-colors duration-200">
          {icon}
          {title}
          <ChevronDown className="w-3 h-3 ml-1" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 bg-white">
        {items.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link to={item.href} className="w-full flex items-center gap-2">
              {item.icon}
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Composant de lien mobile
const MobileNavLink = ({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) => {
  return (
    <Link
      to={href}
      className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-cpu-orange hover:bg-gray-50 rounded-md flex items-center"
    >
      {icon}
      {children}
    </Link>
  );
};

// Menu utilisateur
const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative">
          <User className="w-5 h-5 mr-2" />
          <span>Mon compte</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white">
        <DropdownMenuItem asChild>
          <Link to="/profil" className="w-full">
            Mon profil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/mes-formations" className="w-full">
            Mes formations
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/mes-certifications" className="w-full">
            Mes certifications
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/favoris" className="w-full">
            Favoris
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/paiements" className="w-full">
            Mes paiements
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/aide" className="w-full">
            Centre d'aide
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/deconnexion" className="w-full text-destructive">
            Déconnexion
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
