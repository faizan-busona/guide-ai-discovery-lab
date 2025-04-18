
import { useState } from 'react';
import { Star, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useApp } from '@/context/AppContext';
import { useToast } from '@/hooks/use-toast';
import { Comment as CommentType } from '@/types/types';

interface CommentSectionProps {
  toolId: string;
}

export function CommentSection({ toolId }: CommentSectionProps) {
  const { currentUser, getToolComments, addComment, hideComment } = useApp();
  const { toast } = useToast();
  const [commentText, setCommentText] = useState('');
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  
  const comments = getToolComments(toolId);
  
  const handleSubmit = () => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please login to add a comment",
        variant: "destructive",
      });
      return;
    }
    
    if (commentText.trim().length < 4) {
      toast({
        title: "Comment too short",
        description: "Please write at least 4 characters",
        variant: "destructive",
      });
      return;
    }
    
    addComment(toolId, rating, commentText);
    setCommentText('');
    setRating(5);
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-semibold">User Reviews</h3>
      
      {currentUser && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Your Rating</p>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${
                    star <= (hoveredStar || rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          
          <Textarea
            placeholder="Share your experience with this tool..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            className="mb-3"
            rows={3}
          />
          
          <Button onClick={handleSubmit}>
            Submit Review
          </Button>
        </div>
      )}
      
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              onHideComment={() => hideComment(comment.id)} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border rounded-lg">
          <p className="text-gray-500">No reviews yet. Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );
}

interface CommentItemProps {
  comment: CommentType;
  onHideComment: () => void;
}

function CommentItem({ comment, onHideComment }: CommentItemProps) {
  const { currentUser } = useApp();
  const { toast } = useToast();
  
  const handleReportClick = () => {
    toast({
      title: "Comment Reported",
      description: "Thank you for reporting this comment. Our team will review it.",
    });
  };
  
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex justify-between">
        <div className="flex items-center mb-3">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage src={comment.userAvatar} alt={comment.userName} />
            <AvatarFallback>
              {comment.userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{comment.userName}</p>
            <div className="flex items-center">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= comment.rating 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex">
          {currentUser?.isAdmin ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onHideComment}
              className="text-red-500 text-xs h-8"
            >
              Hide Comment
            </Button>
          ) : currentUser && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleReportClick}
              className="h-8 w-8 text-gray-400 hover:text-red-500"
            >
              <Flag className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <p className="text-gray-700">{comment.text}</p>
    </div>
  );
}
