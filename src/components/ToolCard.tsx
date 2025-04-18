
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useApp } from '@/context/AppContext';
import { Tool } from '@/types/types';

interface ToolCardProps {
  tool: Tool;
  featured?: boolean;
}

export function ToolCard({ tool, featured = false }: ToolCardProps) {
  const { toggleBookmark, isBookmarked, currentUser } = useApp();
  const [isHovering, setIsHovering] = useState(false);
  
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
  
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleBookmark(tool.id);
  };
  
  return (
    <Card className={`tool-card overflow-hidden ${featured ? 'border-ai-primary shadow-md' : ''}`}>
      <Link 
        to={`/tool/${tool.id}`}
        className="block h-full"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <CardContent className="p-4 relative">
          {featured && (
            <Badge className="absolute top-2 right-2 bg-ai-primary hover:bg-ai-secondary">
              Featured
            </Badge>
          )}
          
          <div className="flex items-start mb-3">
            <div className="h-12 w-12 rounded-md bg-gray-100 overflow-hidden mr-3 flex-shrink-0">
              <img 
                src={tool.logo} 
                alt={`${tool.name} logo`} 
                className="h-full w-full object-cover" 
              />
            </div>
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-lg truncate">{tool.name}</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-8 w-8 ${isBookmarked(tool.id) ? 'text-ai-primary' : 'text-gray-400'}`}
                  onClick={handleBookmarkClick}
                >
                  <Bookmark className={`h-5 w-5 ${isBookmarked(tool.id) ? 'fill-current' : ''}`} />
                </Button>
              </div>
              
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className={getPriceBadgeClass(tool.price)}>
                  {tool.price}
                </Badge>
                
                <div className="flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>{tool.rating.toFixed(1)}</span>
                  <span className="text-gray-400 ml-1">({tool.ratingCount})</span>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
            {tool.oneLiner}
          </p>
          
          <div className="flex flex-wrap gap-1 mt-3">
            {tool.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="tag-badge">
                {tag}
              </span>
            ))}
            {tool.tags.length > 3 && (
              <span className="tag-badge">+{tool.tags.length - 3}</span>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="px-4 pb-4 pt-0 flex justify-between">
          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
