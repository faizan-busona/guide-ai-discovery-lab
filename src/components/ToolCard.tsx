
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bookmark, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { Tool } from '@/types/types';

interface ToolCardProps {
  tool: Tool;
  featured?: boolean;
  isBookmarked?: boolean;
  onBookmarkChange?: (toolId: string, isBookmarked: boolean) => void;
}

export function ToolCard({ 
  tool, 
  featured = false, 
  isBookmarked = false,
  onBookmarkChange
}: ToolCardProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] = useState(isBookmarked);
  const [isHovering, setIsHovering] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  
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
  
  const handleBookmarkClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      navigate('/login', { state: { returnUrl: `/tool/${tool.id}` } });
      return;
    }
    
    if (isBookmarking) return;
    
    setIsBookmarking(true);
    
    try {
      if (!bookmarked) {
        // Add bookmark
        const { error } = await supabase
          .from('bookmarks')
          .insert({
            user_id: user.id,
            tool_id: tool.id
          });
          
        if (error) {
          console.error('Error adding bookmark:', error);
          toast.error('Failed to bookmark tool');
          return;
        }
        
        setBookmarked(true);
        if (onBookmarkChange) onBookmarkChange(tool.id, true);
        toast.success('Tool bookmarked successfully');
      } else {
        // Remove bookmark
        const { error } = await supabase
          .from('bookmarks')
          .delete()
          .eq('user_id', user.id)
          .eq('tool_id', tool.id);
          
        if (error) {
          console.error('Error removing bookmark:', error);
          toast.error('Failed to remove bookmark');
          return;
        }
        
        setBookmarked(false);
        if (onBookmarkChange) onBookmarkChange(tool.id, false);
        toast.success('Bookmark removed');
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Something went wrong');
    } finally {
      setIsBookmarking(false);
    }
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
                  className={`h-8 w-8 ${bookmarked ? 'text-ai-primary' : 'text-gray-400'}`}
                  onClick={handleBookmarkClick}
                  disabled={isBookmarking}
                >
                  <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} />
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
