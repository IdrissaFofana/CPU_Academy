"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
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
  Facebook,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function ConnexionPage() {
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
    console.log("Form submitted:", formData);
    // Logique de connexion/inscription
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="container mx-auto px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Info */}
            <div className="space-y-8">
              <div>
                <Link href="/" className="inline-flex items-center mb-8">
                  <Image src="/images/cpu-logo.png" alt="CPU Academy" width={120} height={48} className="h-12 w-auto" />
                </Link>
                <h1 className="text-5xl font-bold text-slate-900 mb-4">
                  Bienvenue sur <span className="text-cpu-orange">CPU Academy</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  La plateforme N°1 de formation professionnelle en Côte d'Ivoire
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border-2 border-slate-100 hover:border-cpu-orange hover:shadow-lg transition-all duration-300">
                  <div className="bg-gradient-to-br from-cpu-orange to-orange-600 p-3 rounded-lg inline-flex mb-4">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">350+ formations</h3>
                  <p className="text-slate-600 text-sm">
                    Dans tous les secteurs professionnels
                  </p>
                </Card>

                <Card className="p-6 border-2 border-slate-100 hover:border-cpu-orange hover:shadow-lg transition-all duration-300">
                  <div className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-lg inline-flex mb-4">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">Certifications reconnues</h3>
                  <p className="text-slate-600 text-sm">
                    Valorisez votre profil professionnel
                  </p>
                </Card>

                <Card className="p-6 border-2 border-slate-100 hover:border-cpu-orange hover:shadow-lg transition-all duration-300">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-3 rounded-lg inline-flex mb-4">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">10,000+ apprenants</h3>
                  <p className="text-slate-600 text-sm">
                    Rejoignez une communauté active
                  </p>
                </Card>

                <Card className="p-6 border-2 border-slate-100 hover:border-cpu-orange hover:shadow-lg transition-all duration-300">
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-lg inline-flex mb-4">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900 mb-2">Formateurs experts</h3>
                  <p className="text-slate-600 text-sm">
                    Apprenez des meilleurs professionnels
                  </p>
                </Card>
              </div>

              <Card className="p-6 bg-gradient-to-r from-cpu-orange to-orange-600 text-white border-0">
                <div className="flex items-center gap-4">
                  <Sparkles className="w-8 h-8 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Offre spéciale inscription</h3>
                    <p className="text-orange-100">
                      Première formation à -30% pour les nouveaux membres
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Side - Form */}
            <Card className="p-8 border-2 border-slate-100 shadow-2xl">
              {/* Toggle Login/Register */}
              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-xl mb-8">
                <Button
                  onClick={() => setIsLogin(true)}
                  variant="ghost"
                  className={`flex-1 rounded-lg transition-all duration-200 ${
                    isLogin ? "bg-cpu-orange text-white shadow-md" : "text-slate-700"
                  }`}
                >
                  Connexion
                </Button>
                <Button
                  onClick={() => setIsLogin(false)}
                  variant="ghost"
                  className={`flex-1 rounded-lg transition-all duration-200 ${
                    !isLogin ? "bg-cpu-orange text-white shadow-md" : "text-slate-700"
                  }`}
                >
                  Inscription
                </Button>
              </div>

              {/* User Type Selection (Only for Registration) */}
              {!isLogin && (
                <div className="mb-6">
                  <Label className="mb-3 block font-semibold text-slate-700">
                    Je suis
                  </Label>
                  <div className="grid grid-cols-3 gap-3">
                    <Button
                      type="button"
                      onClick={() => setUserType("individuel")}
                      variant="outline"
                      className={`h-auto py-4 flex flex-col items-center gap-2 ${
                        userType === "individuel" ? "border-2 border-cpu-orange bg-orange-50" : ""
                      }`}
                    >
                      <User className="w-6 h-6" />
                      <span className="text-xs">Individuel</span>
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setUserType("entreprise")}
                      variant="outline"
                      className={`h-auto py-4 flex flex-col items-center gap-2 ${
                        userType === "entreprise" ? "border-2 border-cpu-orange bg-orange-50" : ""
                      }`}
                    >
                      <Building2 className="w-6 h-6" />
                      <span className="text-xs">Entreprise</span>
                    </Button>
                    <Button
                      type="button"
                      onClick={() => setUserType("formateur")}
                      variant="outline"
                      className={`h-auto py-4 flex flex-col items-center gap-2 ${
                        userType === "formateur" ? "border-2 border-cpu-orange bg-orange-50" : ""
                      }`}
                    >
                      <Sparkles className="w-6 h-6" />
                      <span className="text-xs">Formateur</span>
                    </Button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Registration Fields */}
                {!isLogin && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="prenom" className="mb-2 block text-slate-700">
                          Prénom
                        </Label>
                        <Input
                          id="prenom"
                          type="text"
                          placeholder="Votre prénom"
                          value={formData.prenom}
                          onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
                          className="h-12"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="nom" className="mb-2 block text-slate-700">
                          Nom
                        </Label>
                        <Input
                          id="nom"
                          type="text"
                          placeholder="Votre nom"
                          value={formData.nom}
                          onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="telephone" className="mb-2 block text-slate-700">
                        Téléphone
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                          id="telephone"
                          type="tel"
                          placeholder="+225 XX XX XX XX XX"
                          value={formData.telephone}
                          onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                          className="pl-11 h-12"
                          required
                        />
                      </div>
                    </div>

                    {userType === "entreprise" && (
                      <div>
                        <Label htmlFor="entreprise" className="mb-2 block text-slate-700">
                          Nom de l'entreprise
                        </Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <Input
                            id="entreprise"
                            type="text"
                            placeholder="Votre entreprise"
                            value={formData.entreprise}
                            onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                            className="pl-11 h-12"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="mb-2 block text-slate-700">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-11 h-12"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password" className="mb-2 block text-slate-700">
                    Mot de passe
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pl-11 pr-11 h-12"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-1 top-1/2 -translate-y-1/2"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>

                {/* Forgot Password (Login only) */}
                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-slate-600">Se souvenir de moi</span>
                    </label>
                    <Link href="/mot-de-passe-oublie" className="text-sm text-cpu-orange hover:underline">
                      Mot de passe oublié ?
                    </Link>
                  </div>
                )}

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-cpu-orange hover:bg-orange-600 text-white h-12 text-base font-semibold"
                >
                  {isLogin ? "Se connecter" : "Créer mon compte"}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-slate-500">Ou continuer avec</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 hover:bg-slate-50"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 hover:bg-slate-50"
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </Button>
                </div>

                {/* Terms */}
                {!isLogin && (
                  <p className="text-xs text-center text-slate-600">
                    En vous inscrivant, vous acceptez nos{" "}
                    <Link href="/conditions" className="text-cpu-orange hover:underline">
                      Conditions d'utilisation
                    </Link>{" "}
                    et notre{" "}
                    <Link href="/confidentialite" className="text-cpu-orange hover:underline">
                      Politique de confidentialité
                    </Link>
                  </p>
                )}
              </form>

              {/* Switch Mode */}
              <div className="mt-6 text-center text-sm">
                {isLogin ? (
                  <p className="text-slate-600">
                    Pas encore de compte ?{" "}
                    <button
                      onClick={() => setIsLogin(false)}
                      className="text-cpu-orange font-semibold hover:underline"
                    >
                      Créer un compte
                    </button>
                  </p>
                ) : (
                  <p className="text-slate-600">
                    Vous avez déjà un compte ?{" "}
                    <button
                      onClick={() => setIsLogin(true)}
                      className="text-cpu-orange font-semibold hover:underline"
                    >
                      Se connecter
                    </button>
                  </p>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
