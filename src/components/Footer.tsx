
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6 md:py-10">
      <div className="container flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-ai-primary flex items-center justify-center">
              <span className="text-white font-semibold">A</span>
            </div>
            <span className="font-bold text-xl">AIGuideHub</span>
          </Link>
          <p className="text-sm text-muted-foreground mt-2">
            Discover the right AI tools for your specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-12">
          <div className="flex flex-col space-y-2">
            <h4 className="font-medium">Resources</h4>
            <Link to="/categories" className="text-sm text-muted-foreground hover:text-ai-primary transition-colors">
              Categories
            </Link>
            <Link to="/trending" className="text-sm text-muted-foreground hover:text-ai-primary transition-colors">
              Trending
            </Link>
            <Link to="/newest" className="text-sm text-muted-foreground hover:text-ai-primary transition-colors">
              Newest
            </Link>
          </div>
          
          <div className="flex flex-col space-y-2">
            <h4 className="font-medium">About</h4>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-ai-primary transition-colors">
              About Us
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-ai-primary transition-colors">
              Contact
            </Link>
            <Link to="/faq" className="text-sm text-muted-foreground hover:text-ai-primary transition-colors">
              FAQ
            </Link>
          </div>
          
          <div className="flex flex-col space-y-2 col-span-2 sm:col-span-1">
            <h4 className="font-medium">Legal</h4>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-ai-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-ai-primary transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-ai-primary transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
      
      <div className="container mt-8 pt-4 border-t">
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} AIGuideHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
