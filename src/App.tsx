
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import AssetDetails from "./pages/AssetDetails";
import AddAsset from "./pages/AddAsset";
import { Inspections } from '@/pages/Inspections';
import { NewInspection } from '@/pages/NewInspection';
import { InspectionTemplates } from '@/pages/InspectionTemplates';
import { NewInspectionTemplate } from '@/pages/NewInspectionTemplate';
import NotFound from "./pages/NotFound";
import Navbar from "./components/layout/Navbar";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <div className="pt-16">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/assets" element={<Assets />} />
            <Route path="/assets/new" element={<AddAsset />} />
            <Route path="/assets/:id" element={<AssetDetails />} />
            <Route path="/inspections" element={<Inspections />} />
            <Route path="/inspections/new" element={<NewInspection />} />
            <Route path="/inspection-templates" element={<InspectionTemplates />} />
            <Route path="/inspection-templates/new" element={<NewInspectionTemplate />} />
            <Route path="/reports" element={<NotFound />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
