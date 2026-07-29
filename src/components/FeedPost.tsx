import { useState } from "react";
import { Heart, MessageCircle, Share, MoreHorizontal, Users, Bookmark, Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface FeedPostProps {
  id: string;
  author: {
    name: string;
    avatar?: string;
    role: 'student' | 'faculty' | 'community';
    title?: string;
  };
  community?: {
    name: string;
    logo?: string;
  };
  content: string;
  images?: string[];
  video?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares?: number;
  isLiked?: boolean;
  isSaved?: boolean;
  type?: 'post' | 'story' | 'achievement' | 'recruitment' | 'event';
  hashtags?: string[];
  location?: string;
}

export function FeedPost({
  id,
  author,
  community,
  content,
  images = [],
  video,
  timestamp,
  likes,
  comments,
  shares = 0,
  isLiked = false,
  isSaved = false,
  type = 'post',
  hashtags = [],
  location
}: FeedPostProps) {
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [likeCount, setLikeCount] = useState(likes);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleShare = () => {
    // Implement share functionality
    navigator.share?.({
      title: `Post by ${author.name}`,
      text: content,
      url: window.location.href
    });
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // Implement comment functionality
      setNewComment("");
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'achievement': return 'bg-success text-success-foreground';
      case 'recruitment': return 'bg-secondary text-secondary-foreground';
      case 'story': return 'bg-accent text-accent-foreground';
      case 'event': return 'bg-purple-500 text-white';
      default: return 'bg-primary text-primary-foreground';
    }
  };

  const renderHashtags = (text: string) => {
    return text.split(' ').map((word, index) => {
      if (word.startsWith('#')) {
        return (
          <span key={index} className="text-primary hover:underline cursor-pointer">
            {word}{' '}
          </span>
        );
      }
      return word + ' ';
    });
  };

  return (
    <Card className="border-0 shadow-sm hover:shadow-md transition-smooth max-w-lg mx-auto">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={author.avatar} />
              <AvatarFallback className="bg-gradient-primary text-primary-foreground">
                {author.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-sm">{author.name}</p>
                <Badge 
                  variant="outline" 
                  className={`text-xs ${getTypeColor(author.role)}`}
                >
                  {author.role}
                </Badge>
                {type !== 'post' && (
                  <Badge variant="secondary" className="text-xs capitalize">
                    {type}
                  </Badge>
                )}
              </div>
              
              {author.title && (
                <p className="text-xs text-muted-foreground">{author.title}</p>
              )}
              
              <div className="flex items-center space-x-2 mt-1">
                {community && (
                  <div className="flex items-center space-x-1">
                    <Users className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{community.name}</span>
                  </div>
                )}
                {location && (
                  <>
                    {community && <span className="text-xs text-muted-foreground">•</span>}
                    <span className="text-xs text-muted-foreground">{location}</span>
                  </>
                )}
                <span className="text-xs text-muted-foreground">• {timestamp}</span>
              </div>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuItem>Save</DropdownMenuItem>
              <DropdownMenuItem>Copy Link</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">Report</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-0">
        {/* Content */}
        <div className="px-6">
          <p className="text-sm leading-relaxed">
            {renderHashtags(content)}
          </p>
          
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {hashtags.map((tag, index) => (
                <span key={index} className="text-primary text-sm hover:underline cursor-pointer">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {/* Media Content */}
        {images.length > 0 && (
          <div className="relative">
            <div className="aspect-square overflow-hidden">
              <img 
                src={images[currentImageIndex]} 
                alt="Post content"
                className="w-full h-full object-cover"
              />
            </div>
            
            {images.length > 1 && (
              <>
                <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                  {currentImageIndex + 1}/{images.length}
                </div>
                
                <div className="flex justify-center space-x-1 mt-2 px-6">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {video && (
          <div className="aspect-video">
            <video 
              src={video} 
              controls 
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        )}

        {/* Actions */}
        <div className="px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`flex items-center space-x-2 p-0 h-auto ${
                  liked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Heart className={`h-6 w-6 ${liked ? 'fill-current' : ''}`} />
              </Button>

              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground p-0 h-auto"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="h-6 w-6" />
              </Button>

              <Button 
                variant="ghost" 
                size="sm" 
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground p-0 h-auto"
                onClick={handleShare}
              >
                <Send className="h-6 w-6" />
              </Button>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className={`p-0 h-auto ${
                saved ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Bookmark className={`h-6 w-6 ${saved ? 'fill-current' : ''}`} />
            </Button>
          </div>

          {/* Like count */}
          <div className="mt-2">
            <p className="text-sm font-semibold">
              {likeCount} {likeCount === 1 ? 'like' : 'likes'}
            </p>
          </div>

          {/* Comments preview */}
          {comments > 0 && (
            <button 
              onClick={() => setShowComments(!showComments)}
              className="text-sm text-muted-foreground hover:text-foreground mt-1"
            >
              View all {comments} comments
            </button>
          )}

          {/* Add comment */}
          <div className="flex items-center space-x-2 mt-3">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-xs">U</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex items-center space-x-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="border-0 bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0"
                onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <Button variant="ghost" size="sm" className="p-0 h-auto">
                <Smile className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}