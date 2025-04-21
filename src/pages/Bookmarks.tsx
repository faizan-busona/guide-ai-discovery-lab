
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { Tables } from '@/lib/supabase-types';

const Bookmarks = () => {
  const { user, profile } = useAuth();
  const [bookmarkedTools, setBookmarkedTools] = useState<Tables<'tools'>[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchBookmarkedTools = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      
      try {
        // First get the bookmarks for this user
        const { data: bookmarks, error: bookmarksError } = await supabase
          .from('bookmarks')
          .select('tool_id')
          .eq('user_id', user.id);
          
        if (bookmarksError) {
          console.error('Error fetching bookmarks:', bookmarksError);
          setLoading(false);
          return;
        }
        
        if (!bookmarks || bookmarks.length === 0) {
          setBookmarkedTools([]);
          setLoading(false);
          return;
        }
        
        // Then get the tool details for each bookmark
        const toolIds = bookmarks.map(bookmark => bookmark.tool_id);
        
        const { data: tools, error: toolsError } = await supabase
          .from('tools')
          .select('*')
          .in('id', toolIds)
          .eq('hidden', false);
          
        if (toolsError) {
          console.error('Error fetching bookmarked tools:', toolsError);
          setLoading(false);
          return;
        }
        
        setBookmarkedTools(tools || []);
      } catch (error) {
        console.error('Error in bookmarks fetch:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookmarkedTools();
  }, [user]);
  
  if (!user) {
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
  
  // Utility: change DB price (string) to allowed Tool type
  function normalizePrice(price: string): 'Free' | 'Paid' | 'Freemium' {
    if (price === 'Free' || price === 'Paid' || price === 'Freemium') return price;
    return 'Freemium';
  }
  
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
          
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-ai-primary" />
            </div>
          ) : bookmarkedTools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedTools.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={{
                    id: tool.id,
                    name: tool.name,
                    logo: tool.logo,
                    oneLiner: tool.one_liner,
                    description: tool.description,
                    price: normalizePrice(tool.price), // FIXED
                    categories: [],
                    tags: tool.tags,
                    externalLink: tool.external_link,
                    videoLink: tool.video_link || '',
                    viewCount: tool.view_count || 0,
                    rating: 0,
                    ratingCount: 0,
                    featured: tool.featured || false,
                    hidden: tool.hidden || false,
                    createdAt: new Date(tool.created_at)
                  }} 
                />
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
