"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  Building2,
  CheckCircle2,
  Linkedin,
  ArrowRight,
  GraduationCap,
  Shield,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSimpleAuth } from "@/contexts/SimpleAuthContext";

const STATS = [
  { value: "350+", label: "Formations" },
  { value: "10k+", label: "Apprenants" },
  { value: "150+", label: "Formateurs" },
  { value: "98%", label: "Satisfaits" },
];

const FEATURES = [
  { icon: CheckCircle2, text: "Certifications reconnues par l'État" },
  { icon: Shield,       text: "Financement CPF & entreprise disponible" },
  { icon: TrendingUp,   text: "Suivi de progression en temps réel" },
  { icon: Clock,        text: "Présentiel, webinaires & formations à votre rythme" },
];

export default function ConnexionPage() {
  const router = useRouter();
  const { login } = useSimpleAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"individuel" | "entreprise" | "formateur">("individuel");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    nom: "",
    prenom: "",
    telephone: "",
    entreprise: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name: `${formData.prenom || "Utilisateur"} ${formData.nom || "CPU"}`.trim(),
      email: formData.email || "utilisateur@cpu.local",
    });
    const redirectTo =
      typeof window !== "undefined"
        ? new URLSearchParams(window.location.search).get("redirect") || "/dashboard"
        : "/dashboard";
    router.push(redirectTo);
  };

  return (
    <div className="min-h-screen bg-orange-50/60 flex items-center justify-center p-4 py-10">
      {/* Fond : bulles décoratives flottantes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-0">
        <div className="absolute top-[10%]  left-[5%]  w-64 h-64 bg-cpu-orange/5  rounded-full animate-float-slow" />
        <div className="absolute bottom-[15%] right-[8%]  w-80 h-80 bg-orange-300/10 rounded-full animate-float-slow animation-delay-400" />
        <div className="absolute top-[55%]  left-[50%] w-48 h-48 bg-cpu-orange/5  rounded-full animate-float-slow animation-delay-700" />
      </div>

      <div className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-orange-100/80 overflow-hidden flex flex-col lg:flex-row animate-scale-in">

        {/* ── PANNEAU GAUCHE ── */}
        <div className="hidden lg:flex lg:w-[44%] bg-cpu-orange flex-col justify-between p-10 relative overflow-hidden">
          {/* Cercles décoratifs animés */}
          <div className="absolute -top-20 -right-20  w-72 h-72 bg-white/10 rounded-full animate-float-slow" />
          <div className="absolute top-1/2  -right-32  w-96 h-96 bg-white/5  rounded-full animate-float-slow animation-delay-500" style={{ animationDuration: "9s" }} />
          <div className="absolute -bottom-24 -left-20  w-80 h-80 bg-orange-600/30 rounded-full animate-float-slow animation-delay-300" style={{ animationDuration: "8s" }} />
          {/* Carré rotatif */}
          <div className="absolute bottom-32 right-8 w-14 h-14 bg-white/10 rounded-2xl animate-rotate-slow" />
          {/* Mini losange fixe */}
          <div className="absolute top-1/3 left-6 w-5 h-5 bg-white/20 rounded rotate-45" />

          {/* Logo */}
          <div className="relative z-10 animate-slide-from-left animation-delay-300">
            <Link href="/">
              <Image
                src="/images/cpu-logo.png"
                alt="CPU Formation"
                width={110}
                height={44}
                className="h-11 w-auto brightness-0 invert"
              />
            </Link>
          </div>

          {/* Contenu central */}
          <div className="relative z-10 space-y-8">
            <div>
              {/* Badge */}
              <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-white/20 text-white tracking-widest uppercase mb-5 animate-scale-in animation-delay-400">
                Plateforme N°1 en Côte d'Ivoire
              </span>
              {/* Headline */}
              <h1 className="text-3xl xl:text-4xl font-bold text-white leading-snug animate-slide-from-left animation-delay-500">
                Investissez dans<br />votre avenir<br />
                <span className="text-orange-100">professionnel</span>
              </h1>
              {/* Sous-titre */}
              <p className="mt-4 text-orange-100 text-sm leading-relaxed max-w-xs animate-fade-in-up animation-delay-600">
                Des milliers de professionnels font évoluer leur carrière grâce à nos programmes certifiants.
              </p>
            </div>

            {/* Feature list */}
            <ul className="space-y-3.5">
              {FEATURES.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <li
                    key={i}
                    className="flex items-center gap-3 group animate-slide-from-left"
                    style={{ animationDelay: `${0.7 + i * 0.1}s` }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0 group-hover:scale-125 group-hover:rotate-12 group-hover:bg-white/35 transition-all duration-300">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white text-sm group-hover:translate-x-1 transition-transform duration-200">{feat.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Bas : stats + témoignage */}
          <div className="relative z-10 animate-fade-in-up animation-delay-1100">
            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 pt-6 border-t border-white/20 mb-5">
              {STATS.map((s, i) => (
                <div key={i} className="text-center animate-bounce-soft" style={{ animationDelay: `${1.2 + i * 0.08}s` }}>
                  <p className="text-white font-bold text-xl leading-none">{s.value}</p>
                  <p className="text-orange-100 text-[11px] mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Témoignage */}
            <div className="bg-white/15 rounded-2xl p-4 animate-slide-from-left animation-delay-1300 hover:bg-white/20 transition-colors duration-300">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5 fill-yellow-300 animate-star-pop" style={{ animationDelay: `${1.4 + i * 0.07}s` }} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white text-xs leading-relaxed italic">
                "CPU Formation a transformé ma carrière. Les certifications sont vraiment reconnues !"
              </p>
              <p className="text-orange-200 text-[11px] mt-2 font-semibold">— Koffi A., Ingénieur certifié</p>
            </div>
          </div>
        </div>

        {/* ── PANNEAU DROIT ── */}
        <div className="flex-1 flex flex-col justify-center px-7 sm:px-12 py-10">

          {/* Logo mobile */}
          <div className="lg:hidden mb-7 flex items-center justify-between animate-fade-in-up animation-delay-200">
            <Link href="/">
              <Image src="/images/cpu-logo.png" alt="CPU Formation" width={100} height={40} className="h-10 w-auto" />
            </Link>
            <Link href="/" className="text-xs text-slate-400 hover:text-cpu-orange transition-colors">
              ← Retour au site
            </Link>
          </div>

          <div className="w-full max-w-md mx-auto">

            {/* Entête */}
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-slate-900 animate-fade-in-up animation-delay-300">
                {isLogin ? "Bon retour 👋" : "Rejoignez-nous"}
              </h2>
              <p className="text-slate-500 mt-1.5 text-sm animate-fade-in-up animation-delay-400">
                {isLogin
                  ? "Connectez-vous pour accéder à votre espace d'apprentissage"
                  : "Créez votre compte et démarrez votre formation dès aujourd'hui"}
              </p>
            </div>

            {/* Toggle connexion / inscription */}
            <div className="flex p-1 bg-slate-100 rounded-xl mb-7 gap-1 animate-scale-in animation-delay-500">
              {(["Connexion", "Inscription"] as const).map((label, i) => {
                const active = i === 0 ? isLogin : !isLogin;
                return (
                  <button
                    key={label}
                    onClick={() => setIsLogin(i === 0)}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 ${
                      active
                        ? "bg-cpu-orange text-white shadow-sm scale-[1.02]"
                        : "text-slate-500 hover:text-slate-700 hover:bg-white/60"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Profil — inscription seulement */}
            {!isLogin && (
              <div className="mb-5 animate-fade-in">
                <Label className="mb-2.5 block font-semibold text-slate-700 text-sm">Je suis</Label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: "individuel", icon: User, label: "Individuel" },
                    { value: "entreprise", icon: Building2, label: "Entreprise" },
                    { value: "formateur", icon: GraduationCap, label: "Formateur" },
                  ] as const).map(({ value, icon: Icon, label }, i) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setUserType(value)}
                      className={`flex flex-col items-center gap-2 py-3.5 rounded-xl border-2 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                        userType === value
                          ? "border-cpu-orange bg-orange-50 text-cpu-orange shadow-sm shadow-orange-100"
                          : "border-slate-200 text-slate-500 hover:border-orange-200 hover:bg-orange-50/40"
                      } animate-bounce-soft`}
                      style={{ animationDelay: `${0.1 + i * 0.08}s` }}
                    >
                      <Icon className={`w-5 h-5 transition-transform duration-300 ${userType === value ? "scale-110" : ""}`} />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Champs inscription */}
              {!isLogin && (
                <div className="space-y-4 animate-fade-in">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5 animate-fade-in-up animation-delay-100">
                      <Label className="text-sm font-medium text-slate-700">Prénom</Label>
                      <Input
                        placeholder="Prénom"
                        value={formData.prenom}
                        onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                        className="h-11 border-slate-200 focus:border-cpu-orange focus:ring-0 transition-all duration-200 hover:border-slate-300"
                        required
                      />
                    </div>
                    <div className="space-y-1.5 animate-fade-in-up animation-delay-200">
                      <Label className="text-sm font-medium text-slate-700">Nom</Label>
                      <Input
                        placeholder="Nom"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="h-11 border-slate-200 focus:border-cpu-orange focus:ring-0 transition-all duration-200 hover:border-slate-300"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 animate-fade-in-up animation-delay-300">
                    <Label className="text-sm font-medium text-slate-700">Téléphone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        type="tel"
                        placeholder="+225 XX XX XX XX XX"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        className="pl-10 h-11 border-slate-200 focus:border-cpu-orange focus:ring-0 transition-all duration-200 hover:border-slate-300"
                        required
                      />
                    </div>
                  </div>

                  {userType === "entreprise" && (
                    <div className="space-y-1.5 animate-fade-in-up animation-delay-100">
                      <Label className="text-sm font-medium text-slate-700">Nom de l'entreprise</Label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="Votre entreprise"
                          value={formData.entreprise}
                          onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                          className="pl-10 h-11 border-slate-200 focus:border-cpu-orange focus:ring-0 transition-all duration-200 hover:border-slate-300"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Email */}
              <div className="space-y-1.5 animate-fade-in-up animation-delay-600">
                <Label className="text-sm font-medium text-slate-700">Email</Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-cpu-orange transition-colors duration-200" />
                  <Input
                    type="email"
                    placeholder="votre@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 h-11 border-slate-200 focus:border-cpu-orange focus:ring-0 transition-all duration-200 hover:border-slate-300"
                    required
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="space-y-1.5 animate-fade-in-up animation-delay-700">
                <Label className="text-sm font-medium text-slate-700">Mot de passe</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-cpu-orange transition-colors duration-200" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-10 pr-10 h-11 border-slate-200 focus:border-cpu-orange focus:ring-0 transition-all duration-200 hover:border-slate-300"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cpu-orange transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {isLogin && (
                  <div className="flex justify-end pt-0.5">
                    <Link href="/mot-de-passe-oublie" className="text-xs text-cpu-orange hover:underline hover:text-orange-600 transition-colors">
                      Mot de passe oublié ?
                    </Link>
                  </div>
                )}
              </div>

              {/* Se souvenir de moi */}
              {isLogin && (
                <label className="flex items-center gap-2 cursor-pointer pt-0.5 group animate-fade-in animation-delay-800">
                  <input type="checkbox" className="rounded border-slate-300 text-cpu-orange focus:ring-cpu-orange" />
                  <span className="text-sm text-slate-600 group-hover:text-slate-800 transition-colors">Se souvenir de moi</span>
                </label>
              )}

              {/* Bouton principal */}
              <div className="animate-fade-in-up animation-delay-800">
                <Button
                  type="submit"
                  className="w-full h-12 bg-cpu-orange hover:bg-orange-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-orange-200 active:scale-[0.97] text-base mt-1 shine-effect group overflow-hidden"
                >
                  <span className="group-hover:tracking-wide transition-all duration-300">
                    {isLogin ? "Se connecter" : "Créer mon compte"}
                  </span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>

              {/* Séparateur */}
              <div className="relative my-1 animate-fade-in animation-delay-900">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-slate-400">Ou continuer avec</span>
                </div>
              </div>

              {/* Boutons sociaux */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 h-11 rounded-xl border-2 border-slate-200 text-sm font-medium text-slate-700 hover:border-orange-300 hover:bg-orange-50/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 active:scale-[0.97] animate-fade-in-up animation-delay-900"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 h-11 rounded-xl border-2 border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-300 hover:bg-blue-50/40 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 active:scale-[0.97] animate-fade-in-up animation-delay-1000"
                >
                  <Linkedin className="w-4 h-4 text-[#0A66C2]" />
                  LinkedIn
                </button>
              </div>

              {/* Conditions */}
              {!isLogin && (
                <p className="text-xs text-center text-slate-400 pt-0.5 animate-fade-in animation-delay-1100">
                  En vous inscrivant, vous acceptez nos{" "}
                  <Link href="/conditions" className="text-cpu-orange hover:underline">Conditions</Link>
                  {" "}et notre{" "}
                  <Link href="/confidentialite" className="text-cpu-orange hover:underline">Politique de confidentialité</Link>.
                </p>
              )}
            </form>

            {/* Basculer connexion / inscription */}
            <p className="text-sm text-center text-slate-500 mt-6 animate-fade-in animation-delay-1100">
              {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-cpu-orange font-semibold hover:underline hover:text-orange-600 transition-colors"
              >
                {isLogin ? "Créer un compte" : "Se connecter"}
              </button>
            </p>

            {/* Retour au site — desktop */}
            <div className="hidden lg:block text-center mt-4 animate-fade-in animation-delay-1200">
              <Link href="/" className="text-xs text-slate-400 hover:text-cpu-orange transition-colors group">
                <span className="group-hover:-translate-x-0.5 inline-block transition-transform">←</span> Retour au site
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
