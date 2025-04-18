
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';

const Bookmarks = () => {
  const { currentUser, tools } = useApp();
  
  if (!currentUser) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-10">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-6">You need to be signed in to view your bookmarks.</p>
            <Link to="/login">
              <Button>
                Sign In
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const bookmarkedTools = tools.filter(tool => 
    currentUser.bookmarks.includes(tool.id) && !tool.hidden
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container py-8">
          <div className="mb-6">
            <Link to="/" className="text-ai-primary hover:underline flex items-center text-sm">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to home
            </Link>
          </div>
          
          <h1 className="text-2xl font-bold mb-6">Your Bookmarked Tools</h1>
          
          {bookmarkedTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border">
              <h2 className="text-xl font-semibold mb-2">No bookmarks yet</h2>
              <p className="text-gray-600 mb-6">
                You haven't bookmarked any tools yet. Browse tools and click the bookmark icon to save them here.
              </p>
              <Link to="/">
                <Button>
                  Discover Tools
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Bookmarks;
