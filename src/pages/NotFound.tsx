
import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // For /tools/{id} URLs, redirect to /tool/{id}
    if (location.pathname.startsWith('/tools/')) {
      const toolId = location.pathname.replace('/tools/', '');
      navigate(`/tool/${toolId}`, { replace: true });
      return;
    }
    
    // For /tools URL, redirect to home page
    if (location.pathname === '/tools') {
      navigate('/', { replace: true });
      return;
    }

    // Log error for debugging
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    document.title = '404 - Page Not Found | AIGuideHub';
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center bg-gray-50 py-16">
        <div className="text-center px-4">
          <h1 className="text-7xl font-bold text-ai-primary mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Oops! The page you're looking for doesn't exist.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/">Return to Home</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link to="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
