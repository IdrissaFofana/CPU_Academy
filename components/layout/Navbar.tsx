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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Award,
  BadgeCheck,
  Book,
  BookOpen,
  Briefcase,
  Building,
  CheckCircle,
  ChevronDown,
  Compass,
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
  Bell,
  Sparkles,
  Zap,
} from "lucide-react";
import { GlobalSearch } from "@/components/layout/GlobalSearch";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn] = useState(true); // TODO: Remplacer par vraie authentification
  const [scrolled, setScrolled] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [accountDrawerOpen, setAccountDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Notifications mock data (combinées notifications + messages)
  const [notificationCount] = useState(8); // 3 notifications + 5 messages
  const [cartItemCount] = useState(2);

  // Progression utilisateur mock
  const [userProgress] = useState(67); // Pourcentage de progression

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

  // Raccourci clavier pour ouvrir la palette de commandes
  useKeyboardShortcuts([
    {
      key: "k",
      ctrl: true,
      action: () => setCommandPaletteOpen(true),
    },
  ]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
      
      <nav className={`bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 animate-slide-down ${
        scrolled ? "shadow-lg border-b border-gray-100" : "shadow-md"
      }`}>
        <div className="container mx-auto px-6 lg:px-16">
          <div className="flex items-center justify-between gap-4 h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center group">
                <div className="relative">
                  <Image 
                    src="/images/cpu-logo.png" 
                    alt="CPU Formation" 
                    width={120}
                    height={44}
                    className="h-11 w-auto transition-transform duration-300 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cpu-orange/20 to-cpu-green/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl -z-10" />
                </div>
              </Link>
            </div>

            {/* Barre de recherche - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-6">
              <GlobalSearch />
            </div>

            {/* Menu de navigation principal - version desktop */}
            <div className="hidden lg:flex lg:items-center lg:gap-1 flex-shrink-0">
              <NavLinkWithDropdown 
                title="Explorer" 
                icon={<Compass className="w-4 h-4 mr-1" />}
                items={[
                  { label: "Catalogue de formations", href: "/catalogue", icon: <Book className="w-4 h-4" />, description: "245 formations disponibles" },
                  { label: "Parcours métiers", href: "/parcours", icon: <Rocket className="w-4 h-4" />, description: "Programmes complets certifiants" },
                  { label: "Centres de formation", href: "/centres-formation", icon: <MapPin className="w-4 h-4" />, description: "15 centres en Côte d'Ivoire" },
                  { label: "Webinaires live", href: "/webinaires", icon: <Video className="w-4 h-4" />, description: "Sessions interactives en direct" },
                  { label: "Certifications", href: "/certifications", icon: <Award className="w-4 h-4" />, description: "Validez vos compétences" },
                ]}
                isMegaMenu={true}
              />

              {isLoggedIn && (
                <NavLink href="/mes-formations" icon={<BookOpen className="w-4 h-4 mr-1" />}>
                  Mes formations
                </NavLink>
              )}

              <NavLinkWithDropdown 
                title="Professionnels" 
                icon={<Briefcase className="w-4 h-4 mr-1" />}
                items={[
                  { label: "Experts & Formateurs", href: "/experts", icon: <Users className="w-4 h-4" />, description: "Découvrez nos experts certifiés" },
                  { label: "Solutions Entreprises", href: "/entreprises", icon: <Building className="w-4 h-4" />, description: "Formations sur mesure pour entreprises" },
                ]}
                isMegaMenu={false}
              />
            </div>

            {/* Boutons d'action */}
            <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
              {/* Bouton recherche rapide */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCommandPaletteOpen(true)}
                className="gap-2 text-gray-600 hover:text-cpu-orange"
              >
                <Zap className="w-4 h-4" />
                <span className="text-xs">⌘K</span>
              </Button>

              {/* Notifications (combinées avec messages) */}
              {isLoggedIn && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative hover:bg-orange-50"
                    asChild
                  >
                    <Link href="/notifications">
                      <Bell className="w-5 h-5 text-gray-600" />
                      {notificationCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                          {notificationCount}
                        </span>
                      )}
                    </Link>
                  </Button>

                  {/* Panier */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="relative hover:bg-orange-50"
                    asChild
                  >
                    <Link href="/checkout">
                      <ShoppingBag className="w-5 h-5 text-gray-600" />
                      {cartItemCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-cpu-orange text-white text-xs font-bold rounded-full flex items-center justify-center">
                          {cartItemCount}
                        </span>
                      )}
                    </Link>
                  </Button>
                </>
              )}

              {isLoggedIn ? (
                <UserMenu userProgress={userProgress} isOpen={accountDrawerOpen} setIsOpen={setAccountDrawerOpen} />
              ) : (
                <Button 
                  size="sm" 
                  className="cursor-pointer bg-cpu-orange hover:bg-cpu-orange/90 text-white shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 transition-all duration-200 hover:scale-105"
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

          {/* Barre de recherche mobile */}
          <div className="lg:hidden pb-4">
            <GlobalSearch isMobile={true} />
          </div>
        </div>

      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md pb-4 px-4 shadow-2xl max-h-[80vh] overflow-y-auto animate-in slide-in-from-top-2 duration-300 border-t border-gray-100 custom-scrollbar">
          {/* Header du menu mobile avec avatar et progression */}
          {isLoggedIn && (
            <div className="py-4 mb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cpu-orange to-cpu-green flex items-center justify-center text-white font-bold text-lg">
                    U
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">Mon compte</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-cpu-orange to-cpu-green"
                        style={{ width: `${userProgress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-cpu-orange">{userProgress}%</span>
                  </div>
                </div>
              </div>
              
              {/* Badge notifications mobile (combiné) */}
              <div className="mt-3">
                <Link href="/notifications" className="w-full bg-red-50 rounded-lg px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-red-600" />
                    <span className="text-sm font-medium text-red-700">Notifications & Messages</span>
                  </div>
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {notificationCount}
                  </span>
                </Link>
              </div>
            </div>
          )}

          <div className="space-y-1">
            <div className="py-2 mt-2">
              <div className="px-3 py-1.5 bg-gradient-to-r from-orange-50 to-transparent rounded-lg flex items-center justify-between">
                <span className="text-xs font-semibold text-cpu-orange uppercase tracking-wider flex items-center gap-1">
                  <Compass className="w-3 h-3" />
                  Explorer
                </span>
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
                  <div className="px-3 py-1.5 bg-gradient-to-r from-orange-50 to-transparent rounded-lg flex items-center justify-between">
                    <span className="text-xs font-semibold text-cpu-orange uppercase tracking-wider flex items-center gap-1">
                      <LayoutDashboard className="w-3 h-3" />
                      Dashboards
                    </span>
                  </div>
                </div>
                <MobileNavLink href="/dashboard" icon={<GraduationCap className="w-5 h-5" />}>
                  Dashboard Apprenant
                </MobileNavLink>
                <MobileNavLink href="/dashboard-entreprise" icon={<Building className="w-5 h-5" />}>
                  Dashboard Entreprise
                </MobileNavLink>
                <MobileNavLink href="/dashboard-formateur" icon={<Users className="w-5 h-5" />}>
                  Dashboard Formateur
                </MobileNavLink>
                
                <div className="py-2 mt-2">
                  <div className="px-3 py-1.5 bg-gradient-to-r from-orange-50 to-transparent rounded-lg flex items-center justify-between">
                    <span className="text-xs font-semibold text-cpu-orange uppercase tracking-wider flex items-center gap-1">
                      <Book className="w-3 h-3" />
                      Mon espace
                    </span>
                  </div>
                </div>
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
                <span className="text-xs font-semibold text-cpu-orange uppercase tracking-wider flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  Professionnels
                </span>
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
                <span className="text-xs font-semibold text-cpu-orange uppercase tracking-wider flex items-center gap-1">
                  <HelpCircle className="w-3 h-3" />
                  Support
                </span>
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

          <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
            {isLoggedIn ? (
              <>
                <MobileNavLink href="/profil" icon={<User className="w-5 h-5" />}>
                  Mon profil
                </MobileNavLink>
                <Button
                  variant="outline"
                  className="w-full justify-start border-2 border-red-200 text-red-600 hover:bg-red-50"
                  asChild
                >
                  <Link href="/deconnexion" className="flex items-center gap-2">
                    <LogIn className="w-5 h-5 rotate-180" />
                    Déconnexion
                  </Link>
                </Button>
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
    </>
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
  icon,
  isMegaMenu = false,
}: { 
  title: string; 
  items: { label: string; href: string; icon?: React.ReactNode; description?: string }[]; 
  icon?: React.ReactNode;
  isMegaMenu?: boolean;
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
        className={`${isMegaMenu ? 'w-80' : 'w-64'} bg-white shadow-2xl border-2 border-orange-100 rounded-xl animate-in slide-in-from-top-2 duration-200 overflow-hidden`}
      >
        {isMegaMenu && (
          <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-transparent border-b border-gray-100">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cpu-orange" />
              Explorez nos formations
            </h3>
          </div>
        )}
        {items.map((item, index) => (
          <DropdownMenuItem 
            key={item.href} 
            asChild
            className={`${index !== 0 ? "mt-1" : ""}`}
          >
            <Link 
              href={item.href} 
              className={`w-full flex items-start gap-3 cursor-pointer px-3 py-2.5 rounded-md transition-all duration-200 group/item ${
                pathname === item.href 
                  ? "bg-orange-100 text-cpu-orange font-medium" 
                  : "text-gray-700 hover:bg-orange-50 hover:text-cpu-orange"
              }`}
            >
              <span className={`flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200 flex-shrink-0 ${
                pathname === item.href 
                  ? "bg-cpu-orange text-white" 
                  : "bg-gray-50 text-gray-600 group-hover/item:bg-orange-100 group-hover/item:text-cpu-orange"
              }`}>
                {item.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-medium">{item.label}</div>
                {isMegaMenu && item.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.description}</p>
                )}
              </div>
            </Link>
          </DropdownMenuItem>
        ))}
        {isMegaMenu && (
          <div className="px-3 py-2 bg-gray-50 border-t border-gray-100">
            <Link 
              href="/catalogue" 
              className="text-xs text-cpu-orange hover:underline font-medium flex items-center gap-1"
            >
              Voir tout le catalogue
              <TrendingUp className="w-3 h-3" />
            </Link>
          </div>
        )}
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

// Menu utilisateur avec drawer animé
const UserMenu = ({ userProgress, isOpen, setIsOpen }: { userProgress: number, isOpen: boolean, setIsOpen: (open: boolean) => void }) => {
  // TODO: Remplacer par le vrai type d'utilisateur depuis le contexte d'authentification
  // Pour le développement, tous les dashboards sont visibles
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="relative hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 group"
        >
          <div className="relative mr-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cpu-orange to-cpu-green flex items-center justify-center text-white font-bold ring-2 ring-white dark:ring-gray-900 transition-transform duration-200 group-hover:scale-110">
              U
            </div>
            {/* Indicateur de progression circulaire */}
            <svg className="absolute -top-1 -right-1 w-11 h-11 -rotate-90">
              <circle
                cx="22"
                cy="22"
                r="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-200 dark:text-gray-700"
              />
              <circle
                cx="22"
                cy="22"
                r="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 20}`}
                strokeDashoffset={`${2 * Math.PI * 20 * (1 - userProgress / 100)}`}
                className="text-cpu-orange transition-all duration-500"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium">Mon compte</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">{userProgress}% complété</span>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[380px] sm:w-[480px] overflow-y-auto">
        {/* Header avec progression */}
        <div className="mb-6">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-left">Mon compte</SheetTitle>
          </SheetHeader>
          
          <div className="px-4 py-3 bg-gradient-to-r from-orange-50 to-transparent border border-orange-100 rounded-xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cpu-orange to-cpu-green flex items-center justify-center text-white font-bold text-xl shadow-lg">
                U
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-lg">Utilisateur</h4>
                <p className="text-sm text-gray-600">Apprenant actif</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-700 font-medium">Progression globale</span>
                <span className="font-bold text-cpu-orange">{userProgress}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-cpu-orange to-cpu-green transition-all duration-500"
                  style={{ width: `${userProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dashboards Section */}
        <div className="mb-6">
          <div className="px-2 py-2 mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" />
              Dashboards
            </span>
          </div>
          
          <div className="space-y-2">
            <Link 
              href="/dashboard" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-all group border border-transparent hover:border-orange-200"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-gray-900 block">Dashboard Apprenant</span>
                <span className="text-xs text-gray-500">Votre espace d&apos;apprentissage</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
            </Link>
            
            <Link 
              href="/dashboard-entreprise" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-all group border border-transparent hover:border-orange-200"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                <Building className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-gray-900 block">Dashboard Entreprise</span>
                <span className="text-xs text-gray-500">Gérez votre organisation</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
            </Link>
            
            <Link 
              href="/dashboard-formateur" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-all group border border-transparent hover:border-orange-200"
            >
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                <Users className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-gray-900 block">Dashboard Formateur</span>
                <span className="text-xs text-gray-500">Espace formateur</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
            </Link>
          </div>
        </div>
        
        <div className="h-px bg-gray-200 my-6" />
        
        {/* Profil Section */}
        <div className="mb-6">
          <Link 
            href="/profil" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-purple-50 transition-all group border border-transparent hover:border-purple-200"
          >
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
              <User className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <span className="font-semibold text-gray-900 block">Mon profil</span>
              <span className="text-xs text-gray-500">Informations personnelles</span>
            </div>
            <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
          </Link>
        </div>
        
        <div className="h-px bg-gray-200 my-6" />
        
        {/* Formations & Certifications */}
        <div className="mb-6">
          <div className="px-2 py-2 mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
              <Book className="w-4 h-4" />
              Mon apprentissage
            </span>
          </div>
          
          <div className="space-y-2">
            <Link 
              href="/mes-formations" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-50 transition-all group border border-transparent hover:border-green-200"
            >
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                <Book className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-gray-900 block">Mes formations</span>
                <span className="text-xs text-gray-500">Parcours en cours</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
            </Link>
            
            <Link 
              href="/mes-certifications" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-yellow-50 transition-all group border border-transparent hover:border-yellow-200"
            >
              <div className="w-10 h-10 rounded-lg bg-yellow-50 flex items-center justify-center text-yellow-600 group-hover:scale-110 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-gray-900 block">Mes certifications</span>
                <span className="text-xs text-gray-500">Diplômes obtenus</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
            </Link>

            <Link 
              href="/checkout" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-50 transition-all group border border-transparent hover:border-orange-200"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-cpu-orange group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-semibold text-gray-900 block">Mon panier</span>
                <span className="text-xs text-gray-500">Vos articles en attente</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
            </Link>
          </div>
        </div>
        
        <div className="h-px bg-gray-200 my-6" />
        
        {/* Actions */}
        <div className="space-y-2">
          <Link 
            href="/ressources/faq" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-200"
          >
            <HelpCircle className="w-5 h-5 text-gray-600 group-hover:scale-110 transition-transform" />
            <span className="flex-1 font-medium text-gray-900">Centre d&apos;aide</span>
            <ChevronDown className="w-4 h-4 text-gray-400 rotate-[-90deg]" />
          </Link>
          
          <Link 
            href="/deconnexion" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all group border border-transparent hover:border-red-200"
          >
            <LogIn className="w-5 h-5 text-red-600 rotate-180 group-hover:scale-110 transition-transform" />
            <span className="flex-1 font-semibold text-red-600">Déconnexion</span>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
