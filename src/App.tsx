
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { AuthProvider } from "@/context/AuthContext";
import RouteGuard from "@/components/RouteGuard";

import Index from "./pages/Index";
import ToolDetail from "./pages/ToolDetail";
import SearchResults from "./pages/SearchResults";
import { Login, Signup } from "./pages/AuthPages";
import Bookmarks from "./pages/Bookmarks";
import Categories from "./pages/Categories";
import Trending from "./pages/Trending";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Dashboard from "./pages/Dashboard";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/tool/:id" element={<ToolDetail />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/cookies" element={<CookiePolicy />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/trending" element={<Trending />} />
              
              {/* Auth routes - redirect logged in users */}
              <Route path="/login" element={
                <RouteGuard>
                  <Login />
                </RouteGuard>
              } />
              <Route path="/signup" element={
                <RouteGuard>
                  <Signup />
                </RouteGuard>
              } />
              
              {/* Protected routes - require authentication */}
              <Route path="/dashboard" element={
                <RouteGuard requireAuth>
                  <Dashboard />
                </RouteGuard>
              } />
              <Route path="/bookmarks" element={
                <RouteGuard requireAuth>
                  <Bookmarks />
                </RouteGuard>
              } />
              
              {/* Admin routes - require authentication and admin role */}
              <Route path="/admin" element={
                <RouteGuard requireAuth requireAdmin>
                  <AdminDashboard />
                </RouteGuard>
              } />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
