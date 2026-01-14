"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PageBanner } from "@/components/layout/PageBanner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  CheckCircle2,
  CreditCard,
  User,
  Mail,
  Phone,
  Briefcase,
  Building2,
  AlertCircle
} from "lucide-react";
import { formationsMock } from "@/data/mock";
import type { Formation } from "@/types";

export default function InscriptionPage() {
  const searchParams = useSearchParams();
  const formationId = searchParams.get("formation");
  const [selectedFormation, setSelectedFormation] = useState<Formation | null>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Informations personnelles
    civilite: "",
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    dateNaissance: "",
    
    // Informations professionnelles
    statut: "",
    entreprise: "",
    poste: "",
    secteur: "",
    experience: "",
    
    // Informations formation
    session: "",
    modalite: "",
    financement: "",
    
    // Informations complémentaires
    objectifs: "",
    attentes: "",
    besoinsSpecifiques: "",
    
    // Conditions
    accepteConditions: false,
    accepteNewsletter: false
  });

  useEffect(() => {
    if (formationId) {
      const formation = formationsMock.find((f: Formation) => f.id === formationId);
      setSelectedFormation(formation || null);
    }
  }, [formationId]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, envoyer les données au backend
    console.log("Inscription soumise:", { formation: selectedFormation, data: formData });
    alert("Votre inscription a été enregistrée ! Nous vous contacterons sous 24h.");
  };

  if (!selectedFormation) {
    return (
      <>
        <PageBanner 
          title="Inscription à une formation"
          subtitle="Veuillez sélectionner une formation"
          breadcrumb={[
            { label: "Accueil", href: "/" },
            { label: "Inscription" }
          ]}
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/10 py-12">
          <div className="container mx-auto px-8 lg:px-16">
            <Card className="max-w-2xl mx-auto p-12 text-center">
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-orange-500" />
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Aucune formation sélectionnée</h2>
              <p className="text-slate-600 mb-6">
                Pour vous inscrire, veuillez d'abord sélectionner une formation depuis le catalogue.
              </p>
              <a
                href="/catalogue"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <BookOpen className="w-5 h-5" />
                Voir le catalogue
              </a>
            </Card>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageBanner 
        title="Inscription à la formation"
        subtitle={selectedFormation.titre}
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Catalogue", href: "/catalogue" },
          { label: "Inscription" }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/10 py-12">
        <div className="container mx-auto px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all ${
                      step >= s 
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg scale-110" 
                        : "bg-slate-200 text-slate-500"
                    }`}>
                      {step > s ? <CheckCircle2 className="w-6 h-6" /> : s}
                    </div>
                    {s < 3 && (
                      <div className={`w-24 h-1 mx-2 transition-all ${
                        step > s ? "bg-orange-500" : "bg-slate-200"
                      }`}></div>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-center gap-8 text-sm font-semibold">
                <span className={step >= 1 ? "text-orange-600" : "text-slate-400"}>Informations</span>
                <span className={step >= 2 ? "text-orange-600" : "text-slate-400"}>Détails</span>
                <span className={step >= 3 ? "text-orange-600" : "text-slate-400"}>Confirmation</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Sidebar - Formation Info */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8 p-6 border-2 border-slate-100 shadow-xl">
                  <div className="mb-4">
                    <Badge className="bg-orange-100 text-orange-700 border-0 mb-3">
                      {selectedFormation.secteur || "Formation professionnelle"}
                    </Badge>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{selectedFormation.titre}</h3>
                    <p className="text-sm text-slate-600">{selectedFormation.description}</p>
                  </div>

                  <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <Clock className="w-4 h-4 text-orange-600" />
                      <span>{selectedFormation.duree} heures</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <Users className="w-4 h-4 text-orange-600" />
                      <span>{selectedFormation.niveau}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      <span>{selectedFormation.modalite}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-700">
                      <Award className="w-4 h-4 text-orange-600" />
                      <span>Certification incluse</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    {selectedFormation.gratuit ? (
                      <div className="text-3xl font-bold text-green-600 mb-1">Gratuit</div>
                    ) : (
                      <div className="text-3xl font-bold text-orange-600 mb-1">
                        {((selectedFormation.prixMembre || selectedFormation.prixPublic || 350000)).toLocaleString()} FCFA
                      </div>
                    )}
                    <p className="text-xs text-slate-500">Prix par participant</p>
                  </div>

                  <div className="bg-orange-50 rounded-xl p-4 border border-orange-200">
                    <p className="text-xs text-orange-800 font-semibold mb-2">✓ Inclus dans votre formation :</p>
                    <ul className="text-xs text-orange-700 space-y-1">
                      <li>• Support de cours complet</li>
                      <li>• Accès plateforme e-learning</li>
                      <li>• Suivi post-formation 3 mois</li>
                      <li>• Certification officielle</li>
                    </ul>
                  </div>
                </Card>
              </div>

              {/* Main Form */}
              <div className="lg:col-span-2">
                <Card className="p-8 border-2 border-slate-100 shadow-xl">
                  <form onSubmit={handleSubmit}>
                    {/* Step 1: Informations personnelles */}
                    {step === 1 && (
                      <div className="space-y-6 animate-fade-in">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">Informations personnelles</h3>
                          <p className="text-slate-600 mb-6">Veuillez remplir vos coordonnées</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Civilité *
                            </label>
                            <select
                              required
                              value={formData.civilite}
                              onChange={(e) => handleInputChange("civilite", e.target.value)}
                              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                            >
                              <option value="">Sélectionner</option>
                              <option value="M">M.</option>
                              <option value="Mme">Mme</option>
                              <option value="Mlle">Mlle</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Nom *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.nom}
                              onChange={(e) => handleInputChange("nom", e.target.value)}
                              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                              placeholder="Votre nom"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Prénom *
                            </label>
                            <input
                              type="text"
                              required
                              value={formData.prenom}
                              onChange={(e) => handleInputChange("prenom", e.target.value)}
                              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                              placeholder="Votre prénom"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Email *
                            </label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                                placeholder="votre@email.com"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Téléphone *
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <input
                                type="tel"
                                required
                                value={formData.telephone}
                                onChange={(e) => handleInputChange("telephone", e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                                placeholder="+225 XX XX XX XX XX"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Date de naissance *
                          </label>
                          <input
                            type="date"
                            required
                            value={formData.dateNaissance}
                            onChange={(e) => handleInputChange("dateNaissance", e.target.value)}
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                          />
                        </div>

                        <div className="flex justify-end pt-4">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                          >
                            Continuer
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Informations professionnelles et formation */}
                    {step === 2 && (
                      <div className="space-y-6 animate-fade-in">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">Informations professionnelles</h3>
                          <p className="text-slate-600 mb-6">Parlez-nous de votre parcours</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Statut professionnel *
                            </label>
                            <select
                              required
                              value={formData.statut}
                              onChange={(e) => handleInputChange("statut", e.target.value)}
                              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                            >
                              <option value="">Sélectionner</option>
                              <option value="salarie">Salarié(e)</option>
                              <option value="independant">Indépendant(e)</option>
                              <option value="entrepreneur">Entrepreneur</option>
                              <option value="etudiant">Étudiant(e)</option>
                              <option value="demandeur">Demandeur d'emploi</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Secteur d'activité
                            </label>
                            <input
                              type="text"
                              value={formData.secteur}
                              onChange={(e) => handleInputChange("secteur", e.target.value)}
                              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                              placeholder="Ex: Commerce, IT, Finance..."
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Entreprise
                            </label>
                            <div className="relative">
                              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <input
                                type="text"
                                value={formData.entreprise}
                                onChange={(e) => handleInputChange("entreprise", e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                                placeholder="Nom de votre entreprise"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Poste actuel
                            </label>
                            <div className="relative">
                              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                              <input
                                type="text"
                                value={formData.poste}
                                onChange={(e) => handleInputChange("poste", e.target.value)}
                                className="w-full pl-11 pr-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                                placeholder="Votre fonction"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold text-slate-900 mb-4 mt-8">Préférences de formation</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Session souhaitée *
                            </label>
                            <select
                              required
                              value={formData.session}
                              onChange={(e) => handleInputChange("session", e.target.value)}
                              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                            >
                              <option value="">Sélectionner</option>
                              <option value="fevrier-2026">Février 2026</option>
                              <option value="mars-2026">Mars 2026</option>
                              <option value="avril-2026">Avril 2026</option>
                              <option value="flexible">Flexible</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                              Mode de financement *
                            </label>
                            <select
                              required
                              value={formData.financement}
                              onChange={(e) => handleInputChange("financement", e.target.value)}
                              className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                            >
                              <option value="">Sélectionner</option>
                              <option value="personnel">Financement personnel</option>
                              <option value="entreprise">Prise en charge entreprise</option>
                              <option value="cpf">CPF / Fonds formation</option>
                              <option value="autre">Autre</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Vos objectifs pour cette formation
                          </label>
                          <textarea
                            value={formData.objectifs}
                            onChange={(e) => handleInputChange("objectifs", e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all resize-none"
                            placeholder="Quels sont vos objectifs en suivant cette formation ?"
                          ></textarea>
                        </div>

                        <div className="flex justify-between pt-4">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="px-8 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
                          >
                            Retour
                          </button>
                          <button
                            type="button"
                            onClick={() => setStep(3)}
                            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
                          >
                            Continuer
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Confirmation */}
                    {step === 3 && (
                      <div className="space-y-6 animate-fade-in">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900 mb-2">Confirmation</h3>
                          <p className="text-slate-600 mb-6">Vérifiez vos informations avant de soumettre</p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                          <h4 className="font-bold text-slate-900 mb-4">Récapitulatif de votre inscription</h4>
                          
                          <div className="grid md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Nom complet</p>
                              <p className="font-semibold text-slate-900">{formData.civilite} {formData.prenom} {formData.nom}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Email</p>
                              <p className="font-semibold text-slate-900">{formData.email}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Téléphone</p>
                              <p className="font-semibold text-slate-900">{formData.telephone}</p>
                            </div>
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Statut</p>
                              <p className="font-semibold text-slate-900">{formData.statut}</p>
                            </div>
                            {formData.entreprise && (
                              <div>
                                <p className="text-xs text-slate-500 mb-1">Entreprise</p>
                                <p className="font-semibold text-slate-900">{formData.entreprise}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-xs text-slate-500 mb-1">Session</p>
                              <p className="font-semibold text-slate-900">{formData.session}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              required
                              checked={formData.accepteConditions}
                              onChange={(e) => handleInputChange("accepteConditions", e.target.checked)}
                              className="mt-1 w-5 h-5 text-orange-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-orange-500/20"
                            />
                            <span className="text-sm text-slate-700">
                              J'accepte les <a href="#" className="text-orange-600 hover:underline font-semibold">conditions générales</a> et la <a href="#" className="text-orange-600 hover:underline font-semibold">politique de confidentialité</a> *
                            </span>
                          </label>

                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={formData.accepteNewsletter}
                              onChange={(e) => handleInputChange("accepteNewsletter", e.target.checked)}
                              className="mt-1 w-5 h-5 text-orange-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-orange-500/20"
                            />
                            <span className="text-sm text-slate-700">
                              J'accepte de recevoir des informations sur les formations et actualités de CPU Academy
                            </span>
                          </label>
                        </div>

                        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                          <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm text-blue-800 font-semibold mb-1">Prochaines étapes</p>
                              <ul className="text-xs text-blue-700 space-y-1">
                                <li>• Vous recevrez un email de confirmation sous 24h</li>
                                <li>• Notre équipe vous contactera pour finaliser votre inscription</li>
                                <li>• Un acompte de 30% sera demandé pour valider votre place</li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between pt-4">
                          <button
                            type="button"
                            onClick={() => setStep(2)}
                            className="px-8 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
                          >
                            Retour
                          </button>
                          <button
                            type="submit"
                            className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                          >
                            <CheckCircle2 className="w-5 h-5" />
                            Confirmer mon inscription
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
