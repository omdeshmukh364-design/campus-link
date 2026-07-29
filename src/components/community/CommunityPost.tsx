import { useState } from "react";
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";

interface PostMedia {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

interface PostComment {
  id: string;
  author: {
    name: string;
    avatar?: string;
  };
  content: string;
  created_at: string;
  likes: number;
}

interface CommunityPostProps {
  post: {
    id: string;
    author: {
      name: string;
      avatar?: string;
      role: string;
    };
    community?: {
      name: string;
      avatar?: string;
    };
    content: string;
    media?: PostMedia[];
    tags?: string[];
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    created_at: string;
    isLiked?: boolean;
    isSaved?: boolean;
  };
  comments?: PostComment[];
  showComments?: boolean;
  onLike?: () => void;
  onComment?: (comment: string) => void;
  onShare?: () => void;
  onSave?: () => void;
  onReport?: () => void;
}

export function CommunityPost({
  post,
  comments = [],
  showComments = false,
  onLike,
  onComment,
  onShare,
  onSave,
  onReport
}: CommunityPostProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [commentText, setCommentText] = useState("");
  const [showAllComments, setShowAllComments] = useState(false);

  const nextMedia = () => {
    if (post.media && currentMediaIndex < post.media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };

  const prevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  const handleComment = () => {
    if (commentText.trim() && onComment) {
      onComment(commentText.trim());
      setCommentText("");
    }
  };

  const displayedComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-smooth max-w-lg mx-auto">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>
              {post.author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{post.author.name}</span>
              <Badge variant="outline" className="text-xs">{post.author.role}</Badge>
            </div>
            
            {post.community && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span>in</span>
                <span className="font-medium">{post.community.name}</span>
              </div>
            )}
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onShare}>Share</DropdownMenuItem>
            <DropdownMenuItem onClick={onReport}>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Post Media */}
      {post.media && post.media.length > 0 && (
        <div className="relative aspect-square bg-black">
          {/* Current Media */}
          {post.media[currentMediaIndex].type === 'video' ? (
            <video 
              src={post.media[currentMediaIndex].url}
              className="w-full h-full object-cover"
              controls
              poster={post.media[currentMediaIndex].thumbnail}
            />
          ) : (
            <img 
              src={post.media[currentMediaIndex].url}
              alt="Post media"
              className="w-full h-full object-cover"
            />
          )}
          
          {/* Media Navigation */}
          {post.media.length > 1 && (
            <>
              {currentMediaIndex > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 h-8 w-8 p-0"
                  onClick={prevMedia}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              )}
              
              {currentMediaIndex < post.media.length - 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 h-8 w-8 p-0"
                  onClick={nextMedia}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
              
              {/* Media Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                {post.media.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentMediaIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Video Play Indicator */}
          {post.media[currentMediaIndex].type === 'video' && (
            <div className="absolute top-4 right-4">
              <Play className="h-5 w-5 text-white" />
            </div>
          )}
        </div>
      )}

      <CardContent className="p-4 space-y-3">
        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button 
              className="flex items-center gap-2 hover:text-red-500 transition-colors"
              onClick={onLike}
            >
              <Heart className={`h-6 w-6 ${post.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            
            <button className="flex items-center gap-2 hover:text-blue-500 transition-colors">
              <MessageCircle className="h-6 w-6" />
            </button>
            
            <button 
              className="flex items-center gap-2 hover:text-green-500 transition-colors"
              onClick={onShare}
            >
              <Share className="h-6 w-6" />
            </button>
          </div>
          
          <button 
            className="hover:text-yellow-500 transition-colors"
            onClick={onSave}
          >
            <Bookmark className={`h-6 w-6 ${post.isSaved ? 'fill-yellow-500 text-yellow-500' : ''}`} />
          </button>
        </div>

        {/* Likes Count */}
        <div className="font-semibold text-sm">
          {post.likes.toLocaleString()} {post.likes === 1 ? 'like' : 'likes'}
        </div>

        {/* Post Content */}
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-semibold mr-2">{post.author.name}</span>
            <span>{post.content}</span>
          </div>
          
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {post.tags.map((tag, index) => (
                <span key={index} className="text-sm text-blue-600 hover:underline cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="space-y-3 border-t pt-3">
            {/* View all comments link */}
            {comments.length > 2 && !showAllComments && (
              <button 
                className="text-sm text-muted-foreground hover:text-foreground"
                onClick={() => setShowAllComments(true)}
              >
                View all {comments.length} comments
              </button>
            )}
            
            {/* Comments List */}
            <div className="space-y-2">
              {displayedComments.map((comment) => (
                <div key={comment.id} className="flex gap-2 text-sm">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback className="text-xs">
                      {comment.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <span className="font-semibold mr-2">{comment.author.name}</span>
                    <span>{comment.content}</span>
                    
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span>{format(new Date(comment.created_at), 'MMM d')}</span>
                      <button className="hover:text-foreground">
                        {comment.likes} {comment.likes === 1 ? 'like' : 'likes'}
                      </button>
                      <button className="hover:text-foreground">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add Comment */}
            <div className="flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                className="flex-1 border-0 bg-muted/30 focus:bg-background"
              />
              <Button 
                onClick={handleComment}
                disabled={!commentText.trim()}
                variant="ghost"
                size="sm"
              >
                Post
              </Button>
            </div>
          </div>
        )}

        {/* Post Timestamp */}
        <div className="text-xs text-muted-foreground uppercase tracking-wide">
          {format(new Date(post.created_at), 'MMM d, yyyy')}
        </div>
      </CardContent>
    </Card>
  );
}