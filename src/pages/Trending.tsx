
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/lib/supabase-types';

const Trending = () => {
  const [tools, setTools] = useState<Tables<'tools'>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingTools = async () => {
      try {
        // Fetch tools sorted by view count (trending)
        const { data, error } = await supabase
          .from('tools')
          .select('*')
          .eq('hidden', false)
          .order('view_count', { ascending: false })
          .limit(12);

        if (error) {
          console.error('Error fetching trending tools:', error);
          return;
        }

        setTools(data || []);
      } catch (error) {
        console.error('Error in trending tools fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingTools();
  }, []);

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
          <h1 className="text-2xl font-bold mb-6">Trending Tools</h1>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-ai-primary" />
            </div>
          ) : tools.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <ToolCard 
                  key={tool.id} 
                  tool={{
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
              <h2 className="text-xl font-semibold mb-2">No trending tools</h2>
              <p className="text-gray-600">
                There are no trending tools available at the moment.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Trending;
