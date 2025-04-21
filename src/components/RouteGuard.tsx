
import { ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface RouteGuardProps {
  children: ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectTo?: string;
}

const RouteGuard = ({
  children,
  requireAuth = false,
  requireAdmin = false,
  redirectTo = '/login'
}: RouteGuardProps) => {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Skip redirect during initial loading
    if (loading) return;

    // Handle authentication requirements
    if (requireAuth && !user) {
      // Redirect to login with return URL
      navigate(redirectTo, { 
        state: { returnUrl: location.pathname },
        replace: true 
      });
      return;
    }

    // Handle admin requirements
    if (requireAdmin && !isAdmin) {
      navigate('/', { replace: true });
      return;
    }

    // Redirect logged-in users away from auth pages
    if (user && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/');
    }
  }, [user, isAdmin, loading, requireAuth, requireAdmin, navigate, redirectTo, location.pathname]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  // If auth check passes, render children
  return <>{children}</>;
};

export default RouteGuard;
