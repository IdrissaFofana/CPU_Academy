"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Smartphone,
  Check,
  Lock,
  Tag,
  AlertCircle,
  ArrowRight,
  Shield,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      titre: "Marketing Digital Avancé",
      categorie: "Marketing",
      duree: "20h",
      prix: 350000,
      image: "/images/formation-1.jpg",
      certifiant: true,
    },
    {
      id: 2,
      titre: "Gestion Financière pour PME",
      categorie: "Finance",
      duree: "18h",
      prix: 280000,
      image: "/images/formation-2.jpg",
      certifiant: true,
    },
  ]);

  const paymentMethods = [
    {
      id: "orange",
      nom: "Orange Money",
      icon: "📱",
      frais: 0,
      description: "Paiement via Orange Money",
    },
    {
      id: "mtn",
      nom: "MTN Mobile Money",
      icon: "📱",
      frais: 0,
      description: "Paiement via MTN Mobile Money",
    },
    {
      id: "wave",
      nom: "Wave",
      icon: "🌊",
      frais: 0,
      description: "Paiement via Wave",
    },
    {
      id: "visa",
      nom: "Carte Visa/Mastercard",
      icon: "💳",
      frais: 2.5,
      description: "Paiement par carte bancaire (+2.5% frais)",
    },
  ];

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.prix, 0);
  const reduction = promoApplied ? subtotal * 0.1 : 0;
  const selectedMethod = paymentMethods.find((m) => m.id === paymentMethod);
  const frais = selectedMethod ? (subtotal - reduction) * (selectedMethod.frais / 100) : 0;
  const total = subtotal - reduction + frais;

  const steps = [
    { id: 1, titre: "Panier", icon: ShoppingCart },
    { id: 2, titre: "Paiement", icon: CreditCard },
    { id: 3, titre: "Confirmation", icon: Check },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="flex items-center gap-4">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2">Finaliser ma commande</h1>
              <p className="text-slate-300">
                {cartItems.length} formation{cartItems.length > 1 ? "s" : ""} dans votre panier
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 lg:px-16 py-12">
        {/* Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-cpu-orange text-white scale-110"
                          : "bg-slate-200 text-slate-400"
                      }`}
                    >
                      {isCompleted ? <Check className="w-8 h-8" /> : <Icon className="w-8 h-8" />}
                    </div>
                    <span
                      className={`mt-3 text-sm font-semibold ${
                        isActive ? "text-cpu-orange" : isCompleted ? "text-green-600" : "text-slate-400"
                      }`}
                    >
                      {step.titre}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-32 h-1 mx-4 transition-all duration-300 ${
                        currentStep > step.id ? "bg-green-500" : "bg-slate-200"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Panier */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <Card className="p-6 border-2 border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Votre panier</h2>

                  {cartItems.length > 0 ? (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <Card key={item.id} className="p-6 border-2 border-slate-100 hover:border-cpu-orange transition-all duration-300">
                          <div className="flex gap-6">
                            <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-cpu-orange/10 to-blue-500/10 flex items-center justify-center flex-shrink-0">
                              <ShoppingCart className="w-12 h-12 text-cpu-orange" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <Badge className="bg-slate-100 text-slate-700 border-0 mb-2">
                                    {item.categorie}
                                  </Badge>
                                  <h3 className="text-lg font-bold text-slate-900">{item.titre}</h3>
                                  <p className="text-sm text-slate-600 mt-1">Durée: {item.duree}</p>
                                  {item.certifiant && (
                                    <Badge className="bg-cpu-orange text-white border-0 mt-2">
                                      <Award className="w-3 h-3 mr-1" />
                                      Certifiant
                                    </Badge>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeItem(item.id)}
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <span className="text-2xl font-bold text-cpu-orange">
                                  {item.prix.toLocaleString()} FCFA
                                </span>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-600 mb-6">Votre panier est vide</p>
                      <Button className="bg-cpu-orange hover:bg-orange-600 text-white" asChild>
                        <Link href="/catalogue">Explorer le catalogue</Link>
                      </Button>
                    </div>
                  )}
                </Card>

                {cartItems.length > 0 && (
                  <Card className="p-6 border-2 border-slate-100">
                    <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-cpu-orange" />
                      Code promo
                    </h3>
                    <div className="flex gap-3">
                      <Input
                        placeholder="Entrez votre code promo"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                        disabled={promoApplied}
                      />
                      <Button
                        onClick={applyPromo}
                        disabled={promoApplied || !promoCode}
                        className={promoApplied ? "bg-green-500" : "bg-cpu-orange hover:bg-orange-600"}
                      >
                        {promoApplied ? <Check className="w-4 h-4" /> : "Appliquer"}
                      </Button>
                    </div>
                    {promoApplied && (
                      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
                        <Check className="w-5 h-5" />
                        <span className="font-semibold">-10% appliqué avec succès !</span>
                      </div>
                    )}
                  </Card>
                )}
              </div>
            )}

            {/* Step 2: Paiement */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <Card className="p-6 border-2 border-slate-100">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6">Méthode de paiement</h2>

                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <Card
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-6 border-2 cursor-pointer transition-all duration-300 ${
                          paymentMethod === method.id
                            ? "border-cpu-orange bg-orange-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              paymentMethod === method.id
                                ? "border-cpu-orange bg-cpu-orange"
                                : "border-slate-300"
                            }`}
                          >
                            {paymentMethod === method.id && <Check className="w-4 h-4 text-white" />}
                          </div>
                          <div className="text-3xl">{method.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-bold text-slate-900">{method.nom}</h3>
                            <p className="text-sm text-slate-600">{method.description}</p>
                          </div>
                          {method.frais > 0 && (
                            <Badge className="bg-slate-100 text-slate-700 border-0">
                              +{method.frais}% frais
                            </Badge>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>

                {paymentMethod && (
                  <Card className="p-6 border-2 border-slate-100">
                    <h3 className="font-bold text-lg text-slate-900 mb-4">
                      Informations de paiement
                    </h3>
                    
                    {paymentMethod === "visa" ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="card-number">Numéro de carte</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Date d'expiration</Label>
                            <Input id="expiry" placeholder="MM/AA" />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" placeholder="123" type="password" />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Label htmlFor="phone">Numéro de téléphone</Label>
                        <Input id="phone" placeholder="+225 XX XX XX XX XX" />
                        <p className="text-sm text-slate-600 mt-2">
                          Vous recevrez un message pour confirmer le paiement
                        </p>
                      </div>
                    )}
                  </Card>
                )}

                <Card className="p-4 bg-blue-50 border-2 border-blue-200">
                  <div className="flex gap-3">
                    <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Paiement 100% sécurisé</h4>
                      <p className="text-sm text-blue-700">
                        Toutes vos transactions sont cryptées et sécurisées. Vos informations bancaires ne sont jamais stockées.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && (
              <Card className="p-12 text-center border-2 border-green-200 bg-green-50">
                <div className="inline-flex p-6 rounded-full bg-green-500 mb-6">
                  <Check className="w-16 h-16 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">
                  Paiement réussi ! 🎉
                </h2>
                <p className="text-lg text-slate-600 mb-8">
                  Votre inscription a été confirmée. Un email de confirmation vous a été envoyé.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-cpu-orange hover:bg-orange-600 text-white" asChild>
                    <Link href="/mes-formations">
                      Accéder à mes formations
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/dashboard">Retour au dashboard</Link>
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar - Récapitulatif */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-2 border-slate-100 sticky top-24">
              <h3 className="font-bold text-xl text-slate-900 mb-6">Récapitulatif</h3>

              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Sous-total ({cartItems.length} formations)</span>
                  <span className="font-semibold">{subtotal.toLocaleString()} FCFA</span>
                </div>

                {promoApplied && (
                  <div className="flex items-center justify-between text-green-600">
                    <span className="flex items-center gap-1">
                      <Tag className="w-4 h-4" />
                      Réduction (10%)
                    </span>
                    <span className="font-semibold">-{reduction.toLocaleString()} FCFA</span>
                  </div>
                )}

                {frais > 0 && (
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Frais de transaction</span>
                    <span className="font-semibold">{frais.toLocaleString()} FCFA</span>
                  </div>
                )}

                <div className="pt-4 border-t-2 border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-slate-900">Total</span>
                    <span className="text-2xl font-bold text-cpu-orange">
                      {total.toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              </div>

              {currentStep < 3 && (
                <>
                  {currentStep === 1 && cartItems.length > 0 && (
                    <Button
                      onClick={() => setCurrentStep(2)}
                      className="w-full bg-cpu-orange hover:bg-orange-600 text-white py-6 mb-4"
                    >
                      Passer au paiement
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  )}

                  {currentStep === 2 && (
                    <>
                      <Button
                        onClick={() => setCurrentStep(3)}
                        disabled={!paymentMethod}
                        className="w-full bg-cpu-orange hover:bg-orange-600 text-white py-6 mb-3"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        Confirmer le paiement
                      </Button>
                      <Button
                        onClick={() => setCurrentStep(1)}
                        variant="outline"
                        className="w-full"
                      >
                        Retour au panier
                      </Button>
                    </>
                  )}
                </>
              )}

              {/* Avantages */}
              <div className="mt-6 pt-6 border-t border-slate-200">
                <h4 className="font-semibold text-slate-900 mb-4">Inclus dans votre achat</h4>
                <div className="space-y-3">
                  {[
                    "Accès à vie aux formations",
                    "Certificat de réussite",
                    "Support des formateurs",
                    "Mises à jour gratuites",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
