import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import ProfilePage from "./pages/ProfilePage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import ParentsCornerPage from "./pages/ParentsCornerPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFound from "./pages/NotFound";
import CareerQuizPage from '@/pages/CareerQuizPage';
import CareerGuidancePage from '@/pages/CareerGuidancePage';
import CareerChatPage from '@/pages/CareerChatPage';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/parents" element={<ParentsCornerPage />} />
            
            {/* Protected Routes */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/opportunities" element={
              <ProtectedRoute>
                <OpportunitiesPage />
              </ProtectedRoute>
            } />
            <Route path="/career-quiz" element={<ProtectedRoute><CareerQuizPage /></ProtectedRoute>} />
            <Route path="/career-guidance" element={
              <ProtectedRoute>
                <CareerGuidancePage />
              </ProtectedRoute>
            } />
            <Route path="/career-chat" element={
              <ProtectedRoute>
                <CareerChatPage />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
