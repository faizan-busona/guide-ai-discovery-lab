
import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';
import { FilterBar } from '@/components/FilterBar';
import { NaturalSearchBar } from '@/components/NaturalSearchBar';
import { useApp } from '@/context/AppContext';

const SearchResults = () => {
  const location = useLocation();
  const { searchTools, semanticSearch } = useApp();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNaturalSearch, setIsNaturalSearch] = useState(false);
  
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const regularQuery = queryParams.get('q');
    const naturalQuery = queryParams.get('nq');
    
    const fetchResults = async () => {
      setLoading(true);
      
      if (naturalQuery) {
        setSearchQuery(naturalQuery);
        setIsNaturalSearch(true);
        const naturalResults = await semanticSearch(naturalQuery);
        setResults(naturalResults);
      } else if (regularQuery) {
        setSearchQuery(regularQuery);
        setIsNaturalSearch(false);
        const regularResults = searchTools(regularQuery);
        setResults(regularResults);
      } else {
        setResults([]);
      }
      
      setLoading(false);
    };
    
    fetchResults();
  }, [location.search, searchTools, semanticSearch]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="bg-white py-8 border-b">
          <div className="container">
            <div className="mb-6">
              <Link to="/" className="text-ai-primary hover:underline flex items-center text-sm">
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to home
              </Link>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">
                {isNaturalSearch 
                  ? "AI-Powered Tool Search" 
                  : "Search Results"
                }
              </h1>
              <NaturalSearchBar />
            </div>
          </div>
        </div>
        
        <div className="container py-8">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-ai-primary" />
              <span className="ml-2 text-gray-600">Searching for the best tools...</span>
            </div>
          ) : (
            <>
              {results.length > 0 ? (
                <>
                  <div className="mb-4">
                    <p className="text-gray-600">
                      {isNaturalSearch 
                        ? `Found ${results.length} AI tools that ${searchQuery}` 
                        : `Found ${results.length} results for "${searchQuery}"`
                      }
                    </p>
                  </div>
                  
                  <FilterBar />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {results.map((tool) => (
                      <ToolCard key={tool.id} tool={tool} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <h2 className="text-xl font-semibold mb-2">No tools found</h2>
                  <p className="text-gray-600 mb-6">
                    {isNaturalSearch 
                      ? `We couldn't find any AI tools that "${searchQuery}"` 
                      : `No results found for "${searchQuery}"`
                    }
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Link to="/">
                      <Button variant="outline">
                        Browse All Tools
                      </Button>
                    </Link>
                    {isNaturalSearch && (
                      <Link to={`/search?q=${encodeURIComponent(searchQuery)}`}>
                        <Button>
                          Try Regular Search
                        </Button>
                      </Link>
                    )}
                  </div>
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

export default SearchResults;
