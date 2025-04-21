
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/lib/supabase-types';

const Categories = () => {
  const [categories, setCategories] = useState<Tables<'categories'>[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tools, setTools] = useState<Tables<'tools'>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('hidden', false);

        if (error) {
          console.error('Error fetching categories:', error);
          return;
        }

        if (data && data.length > 0) {
          setCategories(data);
          setSelectedCategory(data[0].id);
        }
      } catch (error) {
        console.error('Error in categories fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    const fetchToolsByCategory = async () => {
      setLoading(true);
      try {
        // First get the tool ids linked to this category
        const { data: linkedTools, error: linkError } = await supabase
          .from('tool_categories')
          .select('tool_id')
          .eq('category_id', selectedCategory);

        if (linkError) {
          console.error('Error fetching tool links:', linkError);
          setLoading(false);
          return;
        }

        if (!linkedTools || linkedTools.length === 0) {
          setTools([]);
          setLoading(false);
          return;
        }

        // Then get the tool details
        const toolIds = linkedTools.map(link => link.tool_id);
        
        const { data: toolsData, error: toolsError } = await supabase
          .from('tools')
          .select('*')
          .in('id', toolIds)
          .eq('hidden', false);
          
        if (toolsError) {
          console.error('Error fetching tools:', toolsError);
          setLoading(false);
          return;
        }
        
        setTools(toolsData || []);
      } catch (error) {
        console.error('Error in tools fetch:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchToolsByCategory();
  }, [selectedCategory]);

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
          <h1 className="text-2xl font-bold mb-6">Browse by Category</h1>
          
          {loading && categories.length === 0 ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-ai-primary" />
            </div>
          ) : (
            <>
              <div className="mb-8 overflow-x-auto">
                <div className="flex space-x-2 pb-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-ai-primary text-white'
                          : 'bg-white text-gray-700 border hover:bg-gray-50'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              
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
                  <h2 className="text-xl font-semibold mb-2">No tools found</h2>
                  <p className="text-gray-600">
                    No tools available in this category yet.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
