import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import { 
  Book,
  FileQuestion,
  HelpCircle,
  Mail,
  MessageCircle,
  Phone,
  Search,
} from "lucide-react";
import { useState } from "react";

const faqCategories = [
  {
    name: "Inscription & Compte",
    icon: <Book className="h-5 w-5" />,
    questions: [
      {
        q: "Comment créer un compte sur CPU Academy ?",
        a: "Cliquez sur 'S'inscrire' en haut à droite, remplissez le formulaire avec vos informations et validez votre email. Votre compte sera actif immédiatement."
      },
      {
        q: "J'ai oublié mon mot de passe, que faire ?",
        a: "Cliquez sur 'Mot de passe oublié' sur la page de connexion. Un lien de réinitialisation sera envoyé à votre adresse email."
      },
      {
        q: "Comment modifier mes informations personnelles ?",
        a: "Connectez-vous à votre compte, accédez à 'Mon profil' et cliquez sur 'Modifier mes informations'."
      },
    ]
  },
  {
    name: "Formations",
    icon: <FileQuestion className="h-5 w-5" />,
    questions: [
      {
        q: "Comment m'inscrire à une formation ?",
        a: "Rendez-vous sur la page de la formation souhaitée, cliquez sur 'S'inscrire', choisissez la session et procédez au paiement."
      },
      {
        q: "Les formations sont-elles accessibles sur mobile ?",
        a: "Oui, toutes nos formations en ligne sont accessibles sur ordinateur, tablette et smartphone."
      },
      {
        q: "Puis-je suivre plusieurs formations en même temps ?",
        a: "Oui, vous pouvez vous inscrire à autant de formations que vous le souhaitez et les suivre à votre rythme."
      },
      {
        q: "Les formations en présentiel sont-elles disponibles dans ma région ?",
        a: "Consultez notre page 'Régions' pour voir les formations disponibles près de chez vous. Nous couvrons les 19 régions de Côte d'Ivoire."
      },
    ]
  },
  {
    name: "Paiements",
    icon: <HelpCircle className="h-5 w-5" />,
    questions: [
      {
        q: "Quels modes de paiement acceptez-vous ?",
        a: "Nous acceptons Orange Money, MTN Mobile Money, Moov Money, les cartes bancaires (Visa, Mastercard) et les virements bancaires."
      },
      {
        q: "Puis-je payer en plusieurs fois ?",
        a: "Oui, le paiement en 2 ou 3 fois est disponible pour les formations de plus de 100 000 FCFA. Contactez-nous pour en savoir plus."
      },
      {
        q: "Comment obtenir une facture ?",
        a: "Les factures sont générées automatiquement après chaque paiement et envoyées par email. Vous pouvez aussi les télécharger depuis votre espace personnel."
      },
      {
        q: "Puis-je me faire rembourser ?",
        a: "Le remboursement est possible jusqu'à 7 jours avant le début de la formation. Passé ce délai, un avoir vous sera proposé."
      },
    ]
  },
  {
    name: "Certifications",
    icon: <FileQuestion className="h-5 w-5" />,
    questions: [
      {
        q: "Comment obtenir mon certificat ?",
        a: "Après avoir complété tous les modules et réussi l'évaluation finale (minimum 70%), votre certificat sera généré automatiquement et accessible dans votre espace."
      },
      {
        q: "Les certificats sont-ils reconnus ?",
        a: "Nos certificats sont reconnus par les entreprises et institutions partenaires. Ils sont vérifiables en ligne via leur numéro unique."
      },
      {
        q: "Comment faire vérifier mon certificat par un employeur ?",
        a: "Partagez le numéro de certificat ou le lien de vérification. L'employeur peut vérifier l'authenticité sur notre page dédiée."
      },
    ]
  },
];

const SupportPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredFaq = selectedCategory 
    ? faqCategories.filter(cat => cat.name === selectedCategory)
    : faqCategories;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-cpu-orange/10 via-white to-cpu-green/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 bg-cpu-green/10 text-cpu-green hover:bg-cpu-green/20">
                Centre d'aide
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Comment pouvons-nous vous aider ?
              </h1>
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Rechercher dans la FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 py-6 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                onClick={() => setSelectedCategory(null)}
              >
                Tout afficher
              </Button>
              {faqCategories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              {filteredFaq.map((category) => (
                <div key={category.name} className="mb-8">
                  <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    {category.icon}
                    {category.name}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-2">
                    {category.questions
                      .filter(q => 
                        searchTerm === "" || 
                        q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        q.a.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map((item, idx) => (
                        <AccordionItem 
                          key={idx} 
                          value={`${category.name}-${idx}`}
                          className="bg-white border rounded-lg px-4"
                        >
                          <AccordionTrigger className="text-left hover:no-underline">
                            {item.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Vous n'avez pas trouvé la réponse ?
              </h2>
              <p className="text-gray-600">
                Contactez notre équipe support, nous sommes là pour vous aider.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-cpu-orange/10 text-cpu-orange p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                    <Phone className="h-8 w-8" />
                  </div>
                  <CardTitle>Par téléphone</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">Du lundi au vendredi</p>
                  <p className="text-gray-600 mb-4">8h - 18h</p>
                  <Button variant="outline" className="w-full">
                    +225 27 XX XX XX XX
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-cpu-green/10 text-cpu-green p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                    <Mail className="h-8 w-8" />
                  </div>
                  <CardTitle>Par email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">Réponse sous 24h</p>
                  <p className="text-gray-600 mb-4">ouvrées</p>
                  <Button variant="outline" className="w-full">
                    support@cpu-academy.ci
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-cpu-orange/10 text-cpu-orange p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                    <MessageCircle className="h-8 w-8" />
                  </div>
                  <CardTitle>Chat en direct</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-2">Assistance instantanée</p>
                  <p className="text-gray-600 mb-4">9h - 17h</p>
                  <Button className="w-full">
                    Démarrer le chat
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Envoyer un message</CardTitle>
                <CardDescription>
                  Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                      <Input placeholder="Votre nom" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input type="email" placeholder="votre@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                    <Input placeholder="Sujet de votre message" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <Textarea placeholder="Décrivez votre problème ou question..." rows={5} />
                  </div>
                  <Button className="w-full" size="lg">
                    Envoyer le message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SupportPage;
