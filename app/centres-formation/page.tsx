"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchBar } from "@/components/ui/search-bar";
import { PageBanner } from "@/components/layout/PageBanner";
import {
  MapPin,
  Send,
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
  Grid3x3,
  List,
  LayoutGrid
} from "lucide-react";
import Link from "next/link";
import { centresFormationMock } from "@/data/mock";

type ViewMode = "grid" | "list" | "compact";

export default function CentresFormationPage() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const regions = ["all", ...new Set(centresFormationMock.map((c) => c.region))];

  const filteredCentres = centresFormationMock.filter((centre) => {
    const matchRegion = selectedRegion === "all" || centre.region === selectedRegion;
    const matchSearch = searchTerm === "" ||
      centre.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      centre.ville.toLowerCase().includes(searchTerm.toLowerCase()) ||
      centre.adresse.toLowerCase().includes(searchTerm.toLowerCase());
    return matchRegion && matchSearch;
  });

  return (
    <>
      <PageBanner
        breadcrumb={[
          { label: "Accueil", href: "/" },
          { label: "Centres de Formation" }
        ]}
        slides={[
          {
            image: "/images/formation-tech.png",
            title: "Nos Centres de Formation",
            subtitle: "Découvrez nos espaces équipés et professionnels partout en Côte d'Ivoire",
            buttons: [
              { label: "Trouver un centre", href: "#centres", icon: <MapPin className="h-5 w-5" /> },
              { label: "Contactez-nous", href: "/support", variant: "outline", icon: <Send className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/formation-agriculture.png",
            title: "Infrastructures Modernes",
            subtitle: "Des équipements de pointe pour une formation optimale",
            buttons: [
              { label: "Visiter un centre", href: "#centres", icon: <MapPin className="h-5 w-5" /> }
            ]
          },
          {
            image: "/images/formation-tech.png",
            title: "Accessibilité Nationale",
            subtitle: "Présents dans toutes les grandes villes de Côte d'Ivoire",
            buttons: [
              { label: "Localisation", href: "/regions", icon: <MapPin className="h-5 w-5" /> }
            ]
          }
        ]}
      />

      <div className="min-h-screen bg-slate-50">
        <div className="container mx-auto px-6 lg:px-16 max-w-7xl py-8 lg:py-12">


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
              {/* Recherche + Nombre de résultats + View Mode Toggle */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
                <div className="flex-1 max-w-md">
                  <SearchBar 
                    value={searchTerm}
                    onChange={setSearchTerm}
                    placeholder="Rechercher un centre..."
                    size="md"
                  />
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm text-slate-600">
                    <span className="font-semibold">{filteredCentres.length}</span> centre{filteredCentres.length > 1 ? "s" : ""} trouvé{filteredCentres.length > 1 ? "s" : ""}
                  </p>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={viewMode === "grid" ? "bg-cpu-orange text-white" : ""}
                    >
                      <Grid3x3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={viewMode === "list" ? "bg-cpu-orange text-white" : ""}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "compact" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("compact")}
                      className={viewMode === "compact" ? "bg-cpu-orange text-white" : ""}
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className={(viewMode === "grid" 
                  ? "grid lg:grid-cols-2 gap-6" 
                  : viewMode === "compact" 
                  ? "grid md:grid-cols-3 gap-4" 
                  : "space-y-4") + " mb-12"}>
                {filteredCentres.map((centre, idx) => {
                  const isListMode = viewMode === "list";
                  const isCompactMode = viewMode === "compact";
                  const cardPadding = isListMode ? "p-0 overflow-hidden flex flex-col md:flex-row" : "p-6";
                  const cardClassName = "border-2 border-slate-100 hover:border-cpu-orange transition-all duration-300 animate-fade-in-up " + cardPadding;
                  const photoClassName = isListMode ? "relative overflow-hidden group md:w-64 h-48 md:h-auto flex-shrink-0" : "relative overflow-hidden group h-56 rounded-lg mb-5";
                  const badgeClassName = isListMode ? "absolute top-4 left-4 bg-cpu-orange text-white border-0 shadow-lg" : "absolute top-4 right-4 bg-cpu-orange text-white border-0 shadow-lg";
                  const contentClassName = isListMode ? "flex-1 p-6 space-y-4" : "space-y-4";
                  const titleClassName = isCompactMode ? "font-bold text-slate-900 text-base mb-2" : "font-bold text-slate-900 text-xl mb-2";
                  const addressClassName = isCompactMode ? "text-slate-600 flex items-start gap-2 text-xs" : "text-slate-600 flex items-start gap-2 text-sm";
                  const iconSize = isCompactMode ? "w-3 h-3" : "w-4 h-4";
                  const iconSizeSmall = isCompactMode ? "w-2 h-2" : "w-3 h-3";
                  const textSize = isCompactMode ? "text-xs" : "text-xs md:text-sm";
                  const buttonTextSize = isCompactMode ? "text-xs" : "text-sm";
                  const buttonPadding = isCompactMode ? "text-xs px-2" : "text-sm";
                  const animationDelay = Math.min(idx * 0.1, 0.8) + "s";
                  const headerClassName = isCompactMode ? "font-semibold text-slate-900 flex items-center gap-2 text-xs mb-2" : "font-semibold text-slate-900 flex items-center gap-2 text-sm mb-3";
                  const headerTitle = isCompactMode ? "Équipements" : "Équipements & Services";
                  const badgeTextSize = "text-xs";
                  const buttonText = isCompactMode ? "Formations" : "Voir les formations";
                  
                  return (
                  <Card key={centre.id} className={cardClassName} style={{ animationDelay: animationDelay }}>
                    {/* Photo */}
                    <div className={photoClassName}>
                      <img src={centre.photos[0]} alt={centre.nom} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <Badge className={badgeClassName}>
                        <MapPin className="w-3 h-3 mr-1" />{centre.ville}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className={contentClassName}>
                      <div>
                        <h3 className={titleClassName}>{centre.nom}</h3>
                        <p className={addressClassName}>
                          <MapPin className={iconSize + " flex-shrink-0 mt-0.5 text-cpu-orange"} />
                          {centre.adresse}
                        </p>
                      </div>

                      <div className={"grid grid-cols-1 gap-2 pt-3 pb-3 border-t border-b border-slate-100 " + textSize}>
                        {!isCompactMode && (
                          <>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Phone className={"text-cpu-orange flex-shrink-0 " + iconSize} />
                              <a href={"tel:" + centre.contact.telephone} className="hover:text-cpu-orange transition-colors truncate">{centre.contact.telephone}</a>
                            </div>
                            <div className="flex items-center gap-2 text-slate-600">
                              <Mail className={"text-cpu-orange flex-shrink-0 " + iconSize} />
                              <a href={"mailto:" + centre.contact.email} className="hover:text-cpu-orange transition-colors truncate">{centre.contact.email}</a>
                            </div>
                          </>
                        )}
                        <div className="flex items-center gap-2 text-slate-600">
                          <Clock className={"text-cpu-orange flex-shrink-0 " + iconSize} />
                          {centre.horaires}
                        </div>
                      </div>

                      <div>
                        <h4 className={headerClassName}>
                          <Monitor className={"text-cpu-orange " + iconSize} />
                          {headerTitle}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge className={"bg-emerald-50 border-emerald-200 text-emerald-700 " + badgeTextSize}>
                            <Users className={"mr-1 " + iconSizeSmall} />
                            {centre.capacite}
                          </Badge>
                          {centre.parking && <Badge className={"bg-blue-50 border-blue-200 text-blue-700 " + badgeTextSize}><Car className={"mr-1 " + iconSizeSmall} />Parking</Badge>}
                          {!isCompactMode && centre.restauration && <Badge className="bg-orange-50 border-orange-200 text-orange-700 text-xs"><Utensils className="w-3 h-3 mr-1" />Restauration</Badge>}
                          {centre.equipements.includes("Wi-Fi") && <Badge className={"bg-purple-50 border-purple-200 text-purple-700 " + badgeTextSize}><Wifi className={"mr-1 " + iconSizeSmall} />Wi-Fi</Badge>}
                          {!isCompactMode && centre.equipements.includes("Climatisation") && <Badge className="bg-cyan-50 border-cyan-200 text-cyan-700 text-xs"><Snowflake className="w-3 h-3 mr-1" />Climatisé</Badge>}
                        </div>
                      </div>

                      {!isCompactMode && centre.transportsPublics && centre.transportsPublics.length > 0 && (
                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs md:text-sm">
                          <p className="font-medium text-slate-700 mb-1 flex items-center gap-2"><Bus className="w-4 h-4 text-cpu-orange" />Transports publics</p>
                          <p className="text-slate-600">{centre.transportsPublics.join(", ")}</p>
                        </div>
                      )}

                      <div className="flex gap-3 pt-2">
                        <Link href={"/catalogue?centre=" + centre.id} className="flex-1">
                          <Button className={"w-full bg-cpu-orange hover:bg-cpu-orange/90 text-white " + buttonTextSize}>
                            {buttonText}
                          </Button>
                        </Link>
                        <Button variant="outline" className={"hover:bg-cpu-orange hover:text-white hover:border-cpu-orange " + buttonPadding} onClick={() => window.open("https://www.google.com/maps?q=" + centre.coordonnees.lat + "," + centre.coordonnees.lng, "_blank")}>
                          <ExternalLink className={iconSize} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                  );
                })}
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

