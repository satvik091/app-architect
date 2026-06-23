import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ResumeOptimizer from "./pages/tools/ResumeOptimizer";
import JDAligner from "./pages/tools/JDAligner";
import InterviewPrep from "./pages/tools/InterviewPrep";
import CoverLetter from "./pages/tools/CoverLetter";
import LinkedInOptimizer from "./pages/tools/LinkedInOptimizer";
import JobPlanner from "./pages/tools/JobPlanner";
import ResumeRanker from "./pages/tools/ResumeRanker";
import ResumeTailor from "./pages/tools/ResumeTailor";
import BulletImprover from "./pages/tools/BulletImprover";
import ResumeSummary from "./pages/tools/ResumeSummary";
import ResumeATS from "./pages/tools/ResumeATS";
import CareerChange from "./pages/tools/CareerChange";
import BulletCreator from "./pages/tools/BulletCreator";
import ResumeSeniorize from "./pages/tools/ResumeSeniorize";
import EntryResume from "./pages/tools/EntryResume";
import ResumeLayout from "./pages/tools/ResumeLayout";
import MasterResume from "./pages/tools/MasterResume";
import SavedDocuments from "./pages/SavedDocuments";
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
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/tools/resume" element={<ProtectedRoute><ResumeOptimizer /></ProtectedRoute>} />
            <Route path="/tools/jd-align" element={<ProtectedRoute><JDAligner /></ProtectedRoute>} />
            <Route path="/tools/interview" element={<ProtectedRoute><InterviewPrep /></ProtectedRoute>} />
            <Route path="/tools/cover-letter" element={<ProtectedRoute><CoverLetter /></ProtectedRoute>} />
            <Route path="/tools/linkedin" element={<ProtectedRoute><LinkedInOptimizer /></ProtectedRoute>} />
            <Route path="/tools/planner" element={<ProtectedRoute><JobPlanner /></ProtectedRoute>} />
            <Route path="/tools/resume-ranker" element={<ProtectedRoute><ResumeRanker /></ProtectedRoute>} />
            <Route path="/tools/resume-tailor" element={<ProtectedRoute><ResumeTailor /></ProtectedRoute>} />
            <Route path="/tools/bullet-improve" element={<ProtectedRoute><BulletImprover /></ProtectedRoute>} />
            <Route path="/tools/resume-summary" element={<ProtectedRoute><ResumeSummary /></ProtectedRoute>} />
            <Route path="/tools/resume-ats" element={<ProtectedRoute><ResumeATS /></ProtectedRoute>} />
            <Route path="/tools/career-change" element={<ProtectedRoute><CareerChange /></ProtectedRoute>} />
            <Route path="/tools/bullet-create" element={<ProtectedRoute><BulletCreator /></ProtectedRoute>} />
            <Route path="/tools/resume-seniorize" element={<ProtectedRoute><ResumeSeniorize /></ProtectedRoute>} />
            <Route path="/tools/entry-resume" element={<ProtectedRoute><EntryResume /></ProtectedRoute>} />
            <Route path="/tools/resume-layout" element={<ProtectedRoute><ResumeLayout /></ProtectedRoute>} />
            <Route path="/tools/master-resume" element={<ProtectedRoute><MasterResume /></ProtectedRoute>} />
            <Route path="/saved" element={<ProtectedRoute><SavedDocuments /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
