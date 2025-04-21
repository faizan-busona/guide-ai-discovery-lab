
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
import { toast } from '@/components/ui/sonner';
import { Tool } from '@/types/types';

const Bookmarks = () => {
  const { user } = useAuth();
  const [bookmarkedTools, setBookmarkedTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkStatus, setBookmarkStatus] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    document.title = 'Your Bookmarks | AIGuideHub';
    fetchBookmarkedTools();
  }, [user]);
  
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
        toast.error('Failed to load bookmarks');
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
      
      // Create a bookmark status object
      const newBookmarkStatus: Record<string, boolean> = {};
      toolIds.forEach(id => {
        newBookmarkStatus[id] = true;
      });
      setBookmarkStatus(newBookmarkStatus);
      
      const { data: tools, error: toolsError } = await supabase
        .from('tools')
        .select(`
          id, 
          name, 
          logo, 
          one_liner, 
          description, 
          tags, 
          price, 
          external_link, 
          video_link, 
          view_count, 
          featured, 
          hidden, 
          created_at
        `)
        .in('id', toolIds)
        .eq('hidden', false);
        
      if (toolsError) {
        console.error('Error fetching bookmarked tools:', toolsError);
        toast.error('Failed to load tool details');
        setLoading(false);
        return;
      }
      
      // Get average ratings for each tool
      const formattedTools = await Promise.all(tools.map(async (tool) => {
        // Fetch average rating and count
        const { data: ratingData, error: ratingError } = await supabase
          .from('comments')
          .select('rating')
          .eq('tool_id', tool.id)
          .eq('hidden', false);
        
        let rating = 0;
        let ratingCount = 0;
        
        if (!ratingError && ratingData && ratingData.length > 0) {
          ratingCount = ratingData.length;
          rating = ratingData.reduce((acc, curr) => acc + curr.rating, 0) / ratingCount;
        }
        
        return {
          id: tool.id,
          name: tool.name,
          logo: tool.logo,
          oneLiner: tool.one_liner,
          description: tool.description,
          price: normalizePrice(tool.price),
          categories: [],
          tags: tool.tags,
          externalLink: tool.external_link,
          videoLink: tool.video_link || '',
          viewCount: tool.view_count || 0,
          rating,
          ratingCount,
          featured: tool.featured || false,
          hidden: tool.hidden || false,
          createdAt: new Date(tool.created_at)
        };
      }));
      
      setBookmarkedTools(formattedTools);
    } catch (error) {
      console.error('Error in bookmarks fetch:', error);
      toast.error('Failed to load bookmarks');
    } finally {
      setLoading(false);
    }
  };
  
  // Utility: change DB price (string) to allowed Tool type
  function normalizePrice(price: string): 'Free' | 'Paid' | 'Freemium' {
    if (price === 'Free' || price === 'Paid' || price === 'Freemium') return price;
    return 'Freemium';
  }
  
  const handleBookmarkChange = (toolId: string, isBookmarked: boolean) => {
    setBookmarkStatus(prev => ({ ...prev, [toolId]: isBookmarked }));
    
    if (!isBookmarked) {
      // Remove tool from list if unbookmarked
      setBookmarkedTools(prev => prev.filter(tool => tool.id !== toolId));
    }
  };
  
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
                  tool={tool}
                  isBookmarked={bookmarkStatus[tool.id] || false}
                  onBookmarkChange={handleBookmarkChange}
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
