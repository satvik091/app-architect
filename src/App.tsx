import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ResumeOptimizer from "./pages/tools/ResumeOptimizer";
import JDAligner from "./pages/tools/JDAligner";
import InterviewPrep from "./pages/tools/InterviewPrep";
import CoverLetter from "./pages/tools/CoverLetter";
import LinkedInOptimizer from "./pages/tools/LinkedInOptimizer";
import JobPlanner from "./pages/tools/JobPlanner";
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tools/resume" element={<ResumeOptimizer />} />
          <Route path="/tools/jd-align" element={<JDAligner />} />
          <Route path="/tools/interview" element={<InterviewPrep />} />
          <Route path="/tools/cover-letter" element={<CoverLetter />} />
          <Route path="/tools/linkedin" element={<LinkedInOptimizer />} />
          <Route path="/tools/planner" element={<JobPlanner />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
