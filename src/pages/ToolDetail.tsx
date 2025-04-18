
import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ExternalLink, 
  Star, 
  Bookmark, 
  Share2, 
  ArrowLeft, 
  ChevronRight, 
  Play 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ToolCard } from '@/components/ToolCard';
import { CommentSection } from '@/components/CommentSection';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';

const ToolDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { getToolById, getRelatedTools, toggleBookmark, isBookmarked, currentUser } = useApp();
  const { toast } = useToast();
  
  const tool = getToolById(id || '');
  const relatedTools = getRelatedTools(id || '');
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, [id]);
  
  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container py-10">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Tool Not Found</h1>
            <p className="text-gray-600 mb-6">The tool you're looking for doesn't exist or has been removed.</p>
            <Link to="/">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const getPriceBadgeClass = (price: string) => {
    switch (price) {
      case 'Free':
        return 'price-badge-free';
      case 'Paid':
        return 'price-badge-paid';
      case 'Freemium':
        return 'price-badge-freemium';
      default:
        return '';
    }
  };
  
  const handleBookmarkClick = () => {
    toggleBookmark(tool.id);
  };
  
  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied",
      description: "Tool link copied to clipboard",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container py-8">
          <div className="mb-6">
            <Link to="/" className="text-ai-primary hover:underline flex items-center text-sm">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to tools
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg border">
                <div className="flex items-start mb-6">
                  <div className="h-16 w-16 rounded-md bg-gray-100 flex-shrink-0 mr-4 overflow-hidden">
                    <img 
                      src={tool.logo} 
                      alt={`${tool.name} logo`} 
                      className="h-full w-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h1 className="text-2xl font-bold">{tool.name}</h1>
                      
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={handleBookmarkClick}
                          className={isBookmarked(tool.id) ? 'text-ai-primary' : 'text-gray-400'}
                        >
                          <Bookmark className={`h-5 w-5 ${isBookmarked(tool.id) ? 'fill-current' : ''}`} />
                        </Button>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={handleShareClick}
                        >
                          <Share2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline" className={getPriceBadgeClass(tool.price)}>
                        {tool.price}
                      </Badge>
                      
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{tool.rating.toFixed(1)}</span>
                        <span className="text-gray-400 ml-1">({tool.ratingCount})</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-lg mb-6">
                  {tool.oneLiner}
                </p>
                
                <a 
                  href={tool.externalLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block w-full mb-6"
                >
                  <Button className="w-full">
                    Try Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </a>
                
                {tool.videoLink && (
                  <div className="mb-6">
                    <div className="rounded-lg overflow-hidden border">
                      <AspectRatio ratio={16 / 9}>
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <a 
                            href={tool.videoLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center justify-center flex-col"
                          >
                            <div className="h-16 w-16 rounded-full bg-ai-primary/80 flex items-center justify-center mb-2">
                              <Play className="h-8 w-8 text-white ml-1" />
                            </div>
                            <span className="text-gray-600">Watch Demo on YouTube</span>
                          </a>
                        </div>
                      </AspectRatio>
                    </div>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {tool.tags.map((tag) => (
                    <span key={tag} className="tag-badge">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h2 className="text-xl font-semibold mb-3">About {tool.name}</h2>
                <div className="prose prose-gray max-w-none">
                  <p className="whitespace-pre-line">{tool.description}</p>
                </div>
                
                <Separator className="my-8" />
                
                <CommentSection toolId={tool.id} />
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {relatedTools.length > 0 && (
                <div className="bg-white p-6 rounded-lg border">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Related Tools</h3>
                    <Link to={`/category/${tool.categories[0]}`} className="text-ai-primary text-sm flex items-center hover:underline">
                      More <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                  
                  <div className="space-y-4">
                    {relatedTools.map((relatedTool) => (
                      <Link 
                        key={relatedTool.id} 
                        to={`/tool/${relatedTool.id}`}
                        className="block p-3 border rounded hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded bg-gray-100 flex-shrink-0 mr-3 overflow-hidden">
                            <img 
                              src={relatedTool.logo} 
                              alt={`${relatedTool.name} logo`} 
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          
                          <div>
                            <h4 className="font-medium">{relatedTool.name}</h4>
                            <div className="flex items-center text-sm">
                              <Star className="h-3 w-3 text-yellow-400 mr-1" />
                              <span>{relatedTool.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-ai-soft-purple p-6 rounded-lg">
                <h3 className="font-semibold text-ai-tertiary mb-3">Know a better tool?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  If you know of a great AI tool that's not listed here, let us know.
                </p>
                <Link to="/suggest-tool">
                  <Button variant="outline" className="w-full border-ai-primary text-ai-primary hover:bg-ai-primary hover:text-white">
                    Suggest a Tool
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ToolDetail;
