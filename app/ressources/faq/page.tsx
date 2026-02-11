"use client";

import { useState } from "react";
import { PageBanner } from "@/components/layout/PageBanner";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  ChevronDown,
  HelpCircle,
  BookOpen,
  CreditCard,
  GraduationCap,
  FileText,
  Users,
  Mail,
  Phone,
  MessageCircle
} from "lucide-react";

const categories = [
  { 
    id: "all", 
    label: "Toutes", 
    icon: HelpCircle, 
    activeClass: "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg",
    iconColor: "text-orange-600"
  },
  { 
    id: "formations", 
    label: "Formations", 
    icon: GraduationCap, 
    activeClass: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg",
    iconColor: "text-blue-600"
  },
  { 
    id: "inscriptions", 
    label: "Inscriptions", 
    icon: FileText, 
    activeClass: "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg",
    iconColor: "text-green-600"
  },
  { 
    id: "paiements", 
    label: "Paiements", 
    icon: CreditCard, 
    activeClass: "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg",
    iconColor: "text-purple-600"
  },
  { 
    id: "certifications", 
    label: "Certifications", 
    icon: BookOpen, 
    activeClass: "bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-lg",
    iconColor: "text-indigo-600"
  },
  { 
    id: "entreprises", 
    label: "Entreprises", 
    icon: Users, 
    activeClass: "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg",
    iconColor: "text-cyan-600"
  }
];

const faqs = [
  {
    id: 1,
    question: "Comment s'inscrire à une formation ?",
    reponse: "Pour vous inscrire, rendez-vous sur la page de la formation qui vous intéresse, cliquez sur le bouton 'S'inscrire' et suivez les étapes. Vous devrez créer un compte si vous n'en avez pas déjà un, puis compléter le formulaire d'inscription avec vos informations personnelles et professionnelles.",
    categorie: "inscriptions"
  },
  {
    id: 2,
    question: "Quels sont les modes de paiement acceptés ?",
    reponse: "Nous acceptons plusieurs modes de paiement : cartes bancaires (Visa, Mastercard), Mobile Money (Orange Money, MTN Money, Moov Money), virements bancaires et paiements en espèces à nos centres. Pour les entreprises, nous proposons également la facturation avec paiement différé.",
    categorie: "paiements"
  },
  {
    id: 3,
    question: "Les formations sont-elles certifiantes ?",
    reponse: "Oui, toutes nos formations sont certifiantes. À l'issue de votre formation et après validation de vos acquis, vous recevrez une attestation ou un certificat reconnu. Certaines de nos formations préparent également à des certifications internationales (ISO, PMI, etc.).",
    categorie: "certifications"
  },
  {
    id: 4,
    question: "Quelle est la durée moyenne d'une formation ?",
    reponse: "La durée varie selon le type de formation. Les formations courtes durent de 1 à 3 jours (7-21 heures), les formations standard de 1 à 2 semaines (35-70 heures), et les parcours complets peuvent s'étendre sur plusieurs mois avec un rythme flexible adapté aux professionnels.",
    categorie: "formations"
  },
  {
    id: 5,
    question: "Puis-je financer ma formation avec mon CPF ?",
    reponse: "Les formations CPU Formation sont éligibles au financement par différents dispositifs selon votre situation : Plan de développement des compétences pour les salariés, Fonds d'Assurance Formation (FAF) pour les indépendants, et financement personnel avec possibilité d'échelonnement.",
    categorie: "paiements"
  },
  {
    id: 6,
    question: "Proposez-vous des formations sur mesure pour les entreprises ?",
    reponse: "Absolument ! Nous concevons des programmes de formation sur mesure adaptés aux besoins spécifiques de votre entreprise. Notre équipe pédagogique peut intervenir dans vos locaux ou accueillir vos collaborateurs dans nos centres. Contactez notre service entreprises pour un devis personnalisé.",
    categorie: "entreprises"
  },
  {
    id: 7,
    question: "Les formations sont-elles disponibles en ligne ?",
    reponse: "Oui, nous proposons trois formats : formations en présentiel dans nos 15 centres régionaux, formations en ligne via notre plateforme e-learning, et formations hybrides combinant sessions en ligne et présentiel. Toutes nos formations en ligne incluent l'accès aux supports, exercices pratiques et accompagnement par un formateur.",
    categorie: "formations"
  },
  {
    id: 8,
    question: "Comment obtenir mon attestation de formation ?",
    reponse: "Votre attestation est délivrée automatiquement à l'issue de votre formation, après validation de votre assiduité et réussite aux évaluations. Elle est disponible en téléchargement sur votre espace personnel sous 48h et vous recevez également une version papier par courrier.",
    categorie: "certifications"
  },
  {
    id: 9,
    question: "Puis-je annuler ou reporter mon inscription ?",
    reponse: "Oui, vous pouvez annuler ou reporter votre inscription jusqu'à 7 jours avant le début de la formation sans frais. Entre 7 jours et 48h, des frais de 30% s'appliquent. Moins de 48h avant le début, la formation est due en totalité sauf cas de force majeure justifié.",
    categorie: "inscriptions"
  },
  {
    id: 10,
    question: "Y a-t-il des prérequis pour suivre les formations ?",
    reponse: "Les prérequis varient selon les formations. Ils sont clairement indiqués sur chaque fiche formation. Les formations de niveau débutant sont accessibles sans prérequis particulier, tandis que les formations avancées peuvent nécessiter une expérience professionnelle ou des connaissances préalables spécifiques.",
    categorie: "formations"
  },
  {
    id: 11,
    question: "Comment faire une demande de devis pour mon entreprise ?",
    reponse: "Pour obtenir un devis, rendez-vous sur notre page Entreprises et remplissez le formulaire de demande de devis, ou contactez-nous directement au +225 27 XX XX XX XX. Notre équipe vous recontactera sous 24h pour discuter de vos besoins et vous proposer une solution adaptée.",
    categorie: "entreprises"
  },
  {
    id: 12,
    question: "Les supports de cours sont-ils fournis ?",
    reponse: "Oui, tous les supports pédagogiques sont inclus dans le prix de la formation : documentation complète, exercices pratiques, études de cas, et accès à notre plateforme en ligne avec ressources complémentaires. Vous conservez l'accès aux supports pendant 6 mois après la formation.",
    categorie: "formations"
  },
  {
    id: 13,
    question: "Proposez-vous un suivi après la formation ?",
    reponse: "Oui, nous assurons un suivi post-formation pendant 3 mois. Vous pouvez contacter votre formateur par email pour des questions, accéder à notre forum d'entraide, et bénéficier de webinaires de suivi mensuels. Un coaching individuel peut également être ajouté en option.",
    categorie: "formations"
  },
  {
    id: 14,
    question: "Les certifications sont-elles reconnues internationalement ?",
    reponse: "Nos certifications internes sont reconnues en Côte d'Ivoire et dans la sous-région. Pour les certifications internationales (ISO, PMI, PRINCE2, etc.), nous sommes centre d'examen agréé et nos formations vous préparent aux examens officiels qui délivrent des certifications reconnues mondialement.",
    categorie: "certifications"
  },
  {
    id: 15,
    question: "Comment suivre ma candidature après inscription ?",
    reponse: "Après votre inscription, vous recevez un email de confirmation avec un lien vers votre espace personnel. Vous pouvez y suivre l'état de votre dossier, télécharger vos documents, et recevoir toutes les informations relatives à votre formation (convocation, planning, supports).",
    categorie: "inscriptions"
  }
];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  // Filtrer les FAQs
  const filteredFAQs = faqs.filter(faq => {
    const matchCategory = selectedCategory === "all" || faq.categorie === selectedCategory;
    const matchSearch = searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.reponse.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <>
      <PageBanner 
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Ressources", href: "/ressources/guides" },
          { label: "FAQ" }
        ]}
        slides={[
          {
            image: "/images/formation-tech.png",
            title: "Foire aux Questions",
            subtitle: "Trouvez rapidement les réponses à vos questions",
          },
          {
            image: "/images/formation-agriculture.png",
            title: "Centre d'Aide",
            subtitle: "Toutes les réponses aux questions fréquentes sur nos services",
          }
        ]}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-orange-50/10">
        <section className="container mx-auto px-8 lg:px-16 py-12">
          {/* Stats rapides */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12">
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center border-2 border-slate-100 shadow-md transition-all duration-500  animate-fade-in group">
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <HelpCircle className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1 text-slate-900 group-hover:text-orange-600 transition-colors">15+</div>
              <div className="text-xs md:text-sm text-slate-600">Questions fréquentes</div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center border-2 border-slate-100 shadow-md transition-all duration-500  animate-fade-in group" style={{ animationDelay: "100ms" }}>
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1 text-slate-900 group-hover:text-blue-600 transition-colors">24/7</div>
              <div className="text-xs md:text-sm text-slate-600">Support disponible</div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center border-2 border-slate-100 shadow-md transition-all duration-500  animate-fade-in group" style={{ animationDelay: "200ms" }}>
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Phone className="w-6 h-6 md:w-8 md:h-8 text-green-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1 text-slate-900 group-hover:text-green-600 transition-colors">&lt; 2h</div>
              <div className="text-xs md:text-sm text-slate-600">Temps de réponse</div>
            </div>
            
            <div className="bg-white rounded-2xl p-4 md:p-6 text-center border-2 border-slate-100 shadow-md transition-all duration-500  animate-fade-in group" style={{ animationDelay: "300ms" }}>
              <div className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-purple-600" />
              </div>
              <div className="text-2xl md:text-3xl font-bold mb-1 text-slate-900 group-hover:text-purple-600 transition-colors">1000+</div>
              <div className="text-xs md:text-sm text-slate-600">Questions résolues</div>
            </div>
          </div>

          {/* Barre de recherche */}
          <div className="max-w-2xl mx-auto mb-12 animate-slide-up">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Rechercher une question..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 text-lg border-2 border-slate-200 rounded-2xl focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 focus:outline-none transition-all shadow-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer text-xl"
                >
                  ✕
                </button>
              )}
            </div>
            <p className="text-center text-sm text-slate-500 mt-3">
              Tapez des mots-clés comme "inscription", "paiement", "certification"...
            </p>
          </div>

          {/* Catégories - Design mobile-first avec Select sur mobile et boutons sur desktop */}
          <div className="mb-12 animate-fade-in">
            {/* Version mobile - Select dropdown */}
            <div className="block lg:hidden">
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.id)}
                  className="w-full px-4 py-3 pr-10 text-base font-semibold bg-white border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all shadow-md appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Version desktop - Boutons horizontaux */}
            <div className="hidden lg:flex flex-wrap justify-center gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      isActive
                        ? `${cat.activeClass} scale-105`
                        : "bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200 hover:border-slate-300 shadow-md hover:scale-105"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : cat.iconColor}`} />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Liste des FAQs */}
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQs.map((faq, idx) => (
                  <Card
                    key={faq.id}
                    className="overflow-hidden border-2 border-slate-100 hover:border-orange-200 transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full p-6 flex items-start justify-between gap-4 text-left hover:bg-slate-50/50 transition-colors"
                    >
                      <div className="flex-grow">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center flex-shrink-0">
                            <HelpCircle className="w-5 h-5 text-orange-600" />
                          </div>
                          <Badge variant="outline" className="text-xs bg-slate-50">
                            {categories.find(c => c.id === faq.categorie)?.label}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {faq.question}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`w-6 h-6 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                          openFAQ === faq.id ? "rotate-180 text-orange-600" : ""
                        }`}
                      />
                    </button>
                    
                    <div
                      className={`overflow-hidden transition-all duration-500 ${
                        openFAQ === faq.id ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-6 pt-2">
                        <div className="pl-11 pr-10">
                          <div className="h-px bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200 mb-4"></div>
                          <p className="text-slate-700 leading-relaxed animate-fade-in">
                            {faq.reponse}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 animate-fade-in">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <p className="text-xl text-slate-500 font-semibold mb-2">Aucune question trouvée</p>
                <p className="text-slate-400">Essayez de modifier vos critères de recherche</p>
              </div>
            )}
          </div>

          {/* Section contact */}
          <div className="max-w-4xl mx-auto mt-16">
            <div className="bg-gradient-to-r from-orange-50 via-white to-blue-50 rounded-3xl p-8 md:p-12 border-2 border-slate-100 shadow-xl">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                  Vous ne trouvez pas la réponse ?
                </h2>
                <p className="text-lg text-slate-600">
                  Notre équipe est là pour vous aider
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <a
                  href="mailto:contact@cpuformation.ci"
                  className="group flex flex-col items-center p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-orange-300 transition-all duration-300 "
                >
                  <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-3 group-hover:bg-orange-500 transition-colors">
                    <Mail className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Email</h3>
                  <p className="text-sm text-slate-600 text-center">contact@cpuformation.ci</p>
                </a>

                <a
                  href="tel:+22527000000"
                  className="group flex flex-col items-center p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-blue-300 transition-all duration-300 "
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3 group-hover:bg-blue-500 transition-colors">
                    <Phone className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Téléphone</h3>
                  <p className="text-sm text-slate-600 text-center">+225 27 XX XX XX XX</p>
                </a>

                <a
                  href="#chat"
                  onClick={(e) => {
                    e.preventDefault();
                    // Ici vous pouvez ouvrir un widget de chat
                    alert("Chat en direct disponible bientôt !");
                  }}
                  className="group flex flex-col items-center p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-green-300 transition-all duration-300  cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-3 group-hover:bg-green-500 transition-colors">
                    <MessageCircle className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-1">Chat en direct</h3>
                  <p className="text-sm text-slate-600 text-center">Réponse immédiate</p>
                </a>
              </div>

              {/* Formulaire de contact */}
              <div id="contact-form" className="bg-white rounded-2xl p-8 border-2 border-slate-100 shadow-md scroll-mt-24">
                <h3 className="text-xl font-bold text-slate-900 mb-2 text-center">Laissez-nous un message</h3>
                <p className="text-sm text-slate-600 mb-6 text-center">Nous vous répondrons dans les plus brefs délais</p>
                
                <form className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="nom" className="block text-sm font-semibold text-slate-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="nom"
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                        placeholder="Votre nom"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="block text-sm font-semibold text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                        placeholder="votre@email.com"
                        suppressHydrationWarning
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="telephone" className="block text-sm font-semibold text-slate-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      id="telephone"
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                      placeholder="+225 XX XX XX XX XX"
                    />
                  </div>

                  <div>
                    <label htmlFor="sujet" className="block text-sm font-semibold text-slate-700 mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      id="sujet"
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all"
                      placeholder="Objet de votre message"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all resize-none"
                      placeholder="Décrivez votre demande ou question..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 .5"
                  >
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="w-5 h-5" />
                      Envoyer le message
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

