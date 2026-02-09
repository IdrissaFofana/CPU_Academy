"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PageBanner } from "@/components/layout/PageBanner";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Users,
  Wifi,
  Car,
  Utensils,
  Monitor,
  Snowflake,
  Bus,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { centresFormationMock } from "@/data/mock";

export default function CentresFormationPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  const regions = ["all", ...new Set(centresFormationMock.map((c) => c.region))];

  const filteredCentres =
    selectedRegion === "all"
      ? centresFormationMock
      : centresFormationMock.filter((c) => c.region === selectedRegion);

  return (
    <>
      <PageBanner
        title="Nos Centres de Formation"
        subtitle="Découvrez nos espaces équipés et professionnels partout en Côte d'Ivoire"
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Centres de Formation" }
        ]}
      />

      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl py-8 lg:py-12">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4 md:gap-6 mb-8 lg:mb-12">
            <Card className="p-6 bg-emerald-50 border-emerald-200 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-4">
                <div className="bg-emerald-500 text-white p-3 rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-emerald-900">{centresFormationMock.length}</p>
                  <p className="text-sm text-emerald-700">Centres de formation</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-4">
                <div className="bg-blue-500 text-white p-3 rounded-lg">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-blue-900">{regions.length - 1}</p>
                  <p className="text-sm text-blue-700">Régions de Côte d'Ivoire</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-purple-50 border-purple-200 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-4">
                <div className="bg-purple-500 text-white p-3 rounded-lg">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-900">{centresFormationMock.reduce((acc, c) => acc + c.capacite, 0).toLocaleString()}+</p>
                  <p className="text-sm text-purple-700">Apprenants pouvant être accueillis</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Main layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <Card className="p-6 border border-slate-200 sticky top-24">
                <h2 className="text-lg font-bold text-slate-900 mb-6">Filtres</h2>
                <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wide text-slate-700">Région</h3>
                <div className="space-y-2">
                  {regions.map((region) => (
                    <Button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      variant="ghost"
                      className={`w-full justify-start text-sm transition-all ${
                        selectedRegion === region
                          ? "bg-cpu-orange text-white hover:bg-cpu-orange"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {region === "all" ? "Toutes les régions" : region}
                    </Button>
                  ))}
                </div>
              </Card>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="mb-8">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">{filteredCentres.length}</span> centre{filteredCentres.length > 1 ? "s" : ""} trouvé{filteredCentres.length > 1 ? "s" : ""}
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-6 mb-12">
                {filteredCentres.map((centre, idx) => (
                  <Card key={centre.id} className="p-6 border-2 border-slate-100 hover:border-cpu-orange hover:shadow-lg transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${Math.min(idx * 0.1, 0.8)}s` }}>
                    <div className="relative h-56 rounded-lg overflow-hidden mb-5 group">
                      <img src={centre.photos[0]} alt={centre.nom} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <Badge className="absolute top-4 right-4 bg-cpu-orange text-white border-0 shadow-lg"><MapPin className="w-3 h-3 mr-1" />{centre.ville}</Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{centre.nom}</h3>
                        <p className="text-sm text-slate-600 flex items-start gap-2"><MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-cpu-orange" />{centre.adresse}</p>
                      </div>

                      <div className="grid grid-cols-1 gap-2 text-xs md:text-sm pt-3 pb-3 border-t border-b border-slate-100">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="w-4 h-4 text-cpu-orange flex-shrink-0" />
                          <a href={`tel:${centre.contact.telephone}`} className="hover:text-cpu-orange transition-colors truncate">{centre.contact.telephone}</a>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Mail className="w-4 h-4 text-cpu-orange flex-shrink-0" />
                          <a href={`mailto:${centre.contact.email}`} className="hover:text-cpu-orange transition-colors truncate">{centre.contact.email}</a>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Clock className="w-4 h-4 text-cpu-orange flex-shrink-0" />{centre.horaires}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-slate-900 mb-3 text-sm flex items-center gap-2"><Monitor className="w-4 h-4 text-cpu-orange" />Équipements & Services</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-emerald-50 border-emerald-200 text-emerald-700 text-xs"><Users className="w-3 h-3 mr-1" />{centre.capacite} places</Badge>
                          {centre.parking && <Badge className="bg-blue-50 border-blue-200 text-blue-700 text-xs"><Car className="w-3 h-3 mr-1" />Parking</Badge>}
                          {centre.restauration && <Badge className="bg-orange-50 border-orange-200 text-orange-700 text-xs"><Utensils className="w-3 h-3 mr-1" />Restauration</Badge>}
                          {centre.equipements.includes("Wi-Fi") && <Badge className="bg-purple-50 border-purple-200 text-purple-700 text-xs"><Wifi className="w-3 h-3 mr-1" />Wi-Fi</Badge>}
                          {centre.equipements.includes("Climatisation") && <Badge className="bg-cyan-50 border-cyan-200 text-cyan-700 text-xs"><Snowflake className="w-3 h-3 mr-1" />Climatisé</Badge>}
                        </div>
                      </div>

                      {centre.transportsPublics && centre.transportsPublics.length > 0 && (
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs md:text-sm">
                          <p className="font-medium text-slate-700 mb-1 flex items-center gap-2"><Bus className="w-4 h-4 text-cpu-orange" />Transports publics</p>
                          <p className="text-slate-600">{centre.transportsPublics.join(", ")}</p>
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        <Link href={`/catalogue?centre=${centre.id}`} className="flex-1">
                          <Button className="w-full bg-cpu-orange hover:bg-cpu-orange/90 text-white text-sm">Voir les formations</Button>
                        </Link>
                        <Button variant="outline" className="hover:bg-cpu-orange hover:text-white hover:border-cpu-orange text-sm" onClick={() => window.open(`https://www.google.com/maps?q=${centre.coordonnees.lat},${centre.coordonnees.lng}`, "_blank")}>
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredCentres.length === 0 && (
                <div className="text-center py-12 md:py-16">
                  <MapPin className="w-12 h-12 md:w-16 md:h-16 text-slate-300 mx-auto mb-3 md:mb-4" />
                  <p className="text-slate-500 text-sm md:text-base">Aucun centre ne correspond à votre sélection.</p>
                </div>
              )}

              <div className="mt-8 md:mt-12 lg:mt-16 bg-cpu-orange rounded-xl md:rounded-2xl p-8 md:p-12 text-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Vous ne trouvez pas de centre près de chez vous ?</h2>
                <p className="text-base md:text-lg text-orange-50 mb-6 max-w-2xl mx-auto">Découvrez nos formations en ligne accessibles partout, à tout moment, avec des experts de haut niveau.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/catalogue"><Button className="bg-white text-cpu-orange hover:bg-orange-50 font-bold">Explorer les formations en ligne</Button></Link>
                  <Link href="/support"><Button variant="outline" className="border-white text-white hover:bg-white/10 font-bold">Nous contacter</Button></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
