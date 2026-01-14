import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Formations from "./pages/Formations";
import FormationDetail from "./pages/FormationDetail";
import Certifications from "./pages/Certifications";
import Parcours from "./pages/Parcours";
import Experts from "./pages/Experts";
import Regions from "./pages/Regions";
import Entreprises from "./pages/Entreprises";
import Ressources from "./pages/Ressources";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/formations/:id" element={<FormationDetail />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/parcours/:type" element={<Parcours />} />
          <Route path="/experts" element={<Experts />} />
          <Route path="/devenir-formateur" element={<Experts />} />
          <Route path="/regions" element={<Regions />} />
          <Route path="/entreprises" element={<Entreprises />} />
          <Route path="/entreprises/packs" element={<Entreprises />} />
          <Route path="/entreprises/evaluation" element={<Entreprises />} />
          <Route path="/ressources" element={<Ressources />} />
          <Route path="/ressources/webinaires" element={<Ressources />} />
          <Route path="/support" element={<Support />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
