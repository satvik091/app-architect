import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
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
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/tools/resume" element={<ProtectedRoute><ResumeOptimizer /></ProtectedRoute>} />
            <Route path="/tools/jd-align" element={<ProtectedRoute><JDAligner /></ProtectedRoute>} />
            <Route path="/tools/interview" element={<ProtectedRoute><InterviewPrep /></ProtectedRoute>} />
            <Route path="/tools/cover-letter" element={<ProtectedRoute><CoverLetter /></ProtectedRoute>} />
            <Route path="/tools/linkedin" element={<ProtectedRoute><LinkedInOptimizer /></ProtectedRoute>} />
            <Route path="/tools/planner" element={<ProtectedRoute><JobPlanner /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
