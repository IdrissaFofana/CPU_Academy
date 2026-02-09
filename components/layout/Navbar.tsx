"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
  CheckCircle,
  ChevronDown,
  FileText,
  Globe,
  GraduationCap,
  HelpCircle,
  Home,
  Info,
  LayoutDashboard,
  Landmark,
  Lightbulb,
  LogIn,
  MapPin,
  Menu,
  Newspaper,
  Rocket,
  ShoppingBag,
  Store,
  TrendingUp,
  User,
  Users,
  Video,
  Wallet,
  X,
} from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn] = useState(true); // TODO: Remplacer par vraie authentification
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 animate-slide-down ${
      scrolled ? "shadow-lg border-b border-gray-100" : "shadow-md"
    }`}>
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image 
                  src="/images/cpu-logo.png" 
                  alt="CPU-PME.CI" 
                  width={120}
                  height={44}
                  className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cpu-orange/10 to-cpu-green/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
              </div>
            </Link>
          </div>

          {/* Menu de navigation principal - version desktop */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:flex-1 lg:px-8">
            <div className="flex items-center space-x-1">
              <NavLinkWithDropdown 
                title="Formations" 
                icon={<Book className="w-4 h-4 mr-1" />}
                items={[
                  { label: "Catalogue de formations", href: "/catalogue", icon: <Book className="w-4 h-4" /> },
                  { label: "Parcours métiers", href: "/parcours", icon: <Rocket className="w-4 h-4" /> },
                  { label: "Centres de formation", href: "/centres-formation", icon: <MapPin className="w-4 h-4" /> },
                  { label: "Webinaires live", href: "/webinaires", icon: <Video className="w-4 h-4" /> },
                  { label: "Certifications", href: "/certifications", icon: <Award className="w-4 h-4" /> },
                ]}
              />

              {isLoggedIn && (
                <NavLinkWithDropdown 
                  title="Pour vous" 
                  icon={<User className="w-4 h-4 mr-1" />}
                  items={[
                    { label: "Dashboard Apprenant", href: "/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
                    { label: "Dashboard Formateur", href: "/dashboard-formateur", icon: <LayoutDashboard className="w-4 h-4" /> },
                    { label: "Dashboard Entreprise", href: "/dashboard-entreprise", icon: <LayoutDashboard className="w-4 h-4" /> },
                    { label: "Mes formations", href: "/mes-formations", icon: <Book className="w-4 h-4" /> },
                    { label: "Mes certifications", href: "/mes-certifications", icon: <Award className="w-4 h-4" /> },
                  ]}
                />
              )}

              <NavLinkWithDropdown 
                title="Entreprises" 
                icon={<Building className="w-4 h-4 mr-1" />}
                items={[
                  { label: "Solutions entreprises", href: "/entreprises", icon: <Building className="w-4 h-4" /> },
                  { label: "Packs équipes", href: "/entreprises#former-vos-equipes", icon: <Users className="w-4 h-4" /> },
                ]}
              />

              <NavLink href="/experts" icon={<Users className="w-4 h-4 mr-1" />}>
                Experts
              </NavLink>

              <NavLinkWithDropdown 
                title="Support" 
                icon={<HelpCircle className="w-4 h-4 mr-1" />}
                items={[
                  { label: "Centre d'aide", href: "/ressources/faq", icon: <HelpCircle className="w-4 h-4" /> },
                  { label: "Guides & ressources", href: "/ressources/guides", icon: <FileText className="w-4 h-4" /> },
                  { label: "RAC", href: "/rac", icon: <CheckCircle className="w-4 h-4" /> },
                ]}
              />
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <Button 
                size="sm" 
                className="cursor-pointer bg-cpu-orange hover:bg-cpu-orange/90 text-white shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 transition-all duration-200"
                asChild
              >
                <Link href="/connexion">
                  <LogIn className="w-4 h-4 mr-2" />
                  Connexion
                </Link>
              </Button>
            )}
          </div>

          {/* Bouton menu mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              className="cursor-pointer text-gray-700 hover:text-cpu-orange focus:outline-none focus:ring-2 focus:ring-cpu-orange p-2 rounded-md transition-all duration-200 hover:bg-gray-100"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMenuOpen}
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
        <div className="lg:hidden bg-white/95 backdrop-blur-md pb-4 px-4 shadow-lg max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-300 border-t border-gray-100">
          <div className="space-y-1">
            <div className="py-2 mt-2">
              <div className="px-3 py-1.5 bg-gradient-to-r from-orange-50 to-transparent rounded-lg">
                <span className="text-xs font-semibold text-cpu-orange uppercase tracking-wider">Formations</span>
              </div>
            </div>
            <MobileNavLink href="/catalogue" icon={<Book className="w-5 h-5" />}>
              Catalogue de formations
            </MobileNavLink>
            <MobileNavLink href="/parcours" icon={<Rocket className="w-5 h-5" />}>
              Parcours métiers
            </MobileNavLink>
            <MobileNavLink href="/centres-formation" icon={<MapPin className="w-5 h-5" />}>
              Centres de formation
            </MobileNavLink>
            <MobileNavLink href="/webinaires" icon={<Video className="w-5 h-5" />}>
              Webinaires live
            </MobileNavLink>
            <MobileNavLink href="/certifications" icon={<Award className="w-5 h-5" />}>
              Certifications
            </MobileNavLink>
            
            {isLoggedIn && (
              <>
                <div className="py-2 mt-2">
                  <div className="px-3 py-1.5 bg-gradient-to-r from-orange-50 to-transparent rounded-lg">
                    <span className="text-xs font-semibold text-cpu-orange uppercase tracking-wider">Mon espace</span>
                  </div>
                </div>
                <MobileNavLink href="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />}>
                  Dashboard Apprenant
                </MobileNavLink>
                <MobileNavLink href="/dashboard-formateur" icon={<LayoutDashboard className="w-5 h-5" />}>
                  Dashboard Formateur
                </MobileNavLink>
                <MobileNavLink href="/dashboard-entreprise" icon={<LayoutDashboard className="w-5 h-5" />}>
                  Dashboard Entreprise
                </MobileNavLink>
                <MobileNavLink href="/mes-formations" icon={<Book className="w-5 h-5" />}>
                  Mes formations
                </MobileNavLink>
                <MobileNavLink href="/mes-certifications" icon={<Award className="w-5 h-5" />}>
                  Mes certifications
                </MobileNavLink>
              </>
            )}
            
            <div className="py-2 mt-2">
              <div className="px-3 py-1.5 bg-gradient-to-r from-orange-50 to-transparent rounded-lg">
                <span className="text-xs font-semibold text-cpu-orange uppercase tracking-wider">Entreprises & Experts</span>
              </div>
            </div>
            <MobileNavLink href="/entreprises" icon={<Building className="w-5 h-5" />}>
              Solutions entreprises
            </MobileNavLink>
            <MobileNavLink href="/experts" icon={<Users className="w-5 h-5" />}>
              Experts & Formateurs
            </MobileNavLink>
            
            <div className="py-2 mt-2">
              <div className="px-3 py-1.5 bg-gradient-to-r from-orange-50 to-transparent rounded-lg">
                <span className="text-xs font-semibold text-cpu-orange uppercase tracking-wider">Support</span>
              </div>
            </div>
            <MobileNavLink href="/ressources/faq" icon={<HelpCircle className="w-5 h-5" />}>
              Centre d'aide
            </MobileNavLink>
            <MobileNavLink href="/ressources/guides" icon={<FileText className="w-5 h-5" />}>
              Guides & Ressources
            </MobileNavLink>
            <MobileNavLink href="/rac" icon={<CheckCircle className="w-5 h-5" />}>
              RAC
            </MobileNavLink>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-2">
            {isLoggedIn ? (
              <>
                <MobileNavLink href="/dashboard" icon={<LayoutDashboard className="w-5 h-5" />}>
                  Mon dashboard
                </MobileNavLink>
                <MobileNavLink href="/profil" icon={<User className="w-5 h-5" />}>
                  Mon profil
                </MobileNavLink>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="w-full justify-center border-2 hover:border-cpu-orange hover:text-cpu-orange transition-all duration-200" 
                  asChild
                >
                  <Link href="/connexion">
                    <LogIn className="w-4 h-4 mr-2" />
                    Connexion
                  </Link>
                </Button>
                <Button 
                  className="w-full justify-center bg-cpu-orange hover:bg-cpu-orange/90 text-white shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 transition-all duration-200" 
                  asChild
                >
                  <Link href="/inscription">S&apos;inscrire</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

// Composant de lien de navigation
const NavLink = ({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={`px-3 py-2 text-sm font-medium rounded-md flex items-center transition-all duration-200 group relative ${
        isActive 
          ? "text-cpu-orange bg-orange-50" 
          : "text-gray-700 hover:text-cpu-orange hover:bg-gray-50"
      }`}
    >
      {icon}
      {children}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-cpu-orange rounded-full" />
      )}
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
  const pathname = usePathname();
  // Extract base path from items (remove hash anchors)
  const isActive = items.some(item => {
    const basePath = item.href.split('#')[0];
    return pathname === basePath || pathname.startsWith(basePath + '/');
  });
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className={`px-3 py-2 text-sm font-medium rounded-md flex items-center transition-all duration-200 group ${
          isActive 
            ? "text-cpu-orange bg-orange-50" 
            : "text-gray-700 hover:text-cpu-orange hover:bg-gray-50"
        }`}>
          {icon}
          {title}
          <ChevronDown className={`w-3 h-3 ml-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-64 bg-white shadow-2xl border-2 border-orange-100 rounded-xl animate-in slide-in-from-top-2 duration-200 overflow-hidden"
      >
        {items.map((item, index) => (
          <DropdownMenuItem 
            key={item.href} 
            asChild
            className={`${index !== 0 ? "mt-1" : ""}`}
          >
            <Link 
              href={item.href} 
              className={`w-full flex items-center gap-3 cursor-pointer px-3 py-2.5 rounded-md transition-all duration-200 group/item ${
                pathname === item.href 
                  ? "bg-orange-100 text-cpu-orange font-medium" 
                  : "text-gray-700 hover:bg-orange-50 hover:text-cpu-orange"
              }`}
            >
              <span className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 ${
                pathname === item.href 
                  ? "bg-cpu-orange text-white" 
                  : "bg-gray-50 text-gray-600 group-hover/item:bg-orange-100 group-hover/item:text-cpu-orange"
              }`}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// Composant de lien mobile
const MobileNavLink = ({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={`block px-3 py-3 text-base font-medium rounded-lg flex items-center transition-all duration-200 ${
        isActive 
          ? "text-cpu-orange bg-orange-50 font-semibold" 
          : "text-gray-700 hover:text-cpu-orange hover:bg-gray-50"
      }`}
    >
      <span className={`flex items-center justify-center w-10 h-10 rounded-lg mr-3 transition-colors duration-200 ${
        isActive 
          ? "bg-cpu-orange/10 text-cpu-orange" 
          : "bg-gray-100 text-gray-600"
      }`}>
        {icon}
      </span>
      {children}
    </Link>
  );
};

// Menu utilisateur
const UserMenu = () => {
  // TODO: Remplacer par le vrai type d'utilisateur depuis le contexte d'authentification
  // Pour le développement, tous les dashboards sont visibles
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative hover:bg-gray-100 transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cpu-orange to-cpu-green flex items-center justify-center text-white font-medium mr-2">
            U
          </div>
          <span>Mon compte</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white shadow-xl border border-gray-200">
        {/* Paramètres et gestion du compte uniquement */}
        <DropdownMenuItem asChild>
          <Link href="/profil" className="w-full cursor-pointer flex items-center gap-2">
            <User className="w-4 h-4" />
            Mon profil
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href="/favoris" className="w-full cursor-pointer flex items-center gap-2">
            <Wallet className="w-4 h-4" />
            Favoris
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/checkout" className="w-full cursor-pointer flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            Panier
          </Link>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem asChild>
          <Link href="/ressources/faq" className="w-full cursor-pointer flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Centre d&apos;aide
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/deconnexion" className="w-full text-destructive cursor-pointer">
            Déconnexion
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
