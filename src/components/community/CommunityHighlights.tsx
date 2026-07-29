import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Highlight {
  id: string;
  title: string;
  cover_image: string;
  posts_count: number;
  posts?: Array<{
    id: string;
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
    caption?: string;
    created_at: string;
  }>;
}

interface CommunityHighlightsProps {
  highlights: Highlight[];
  canEdit?: boolean;
  onCreateHighlight?: () => void;
  onEditHighlight?: (highlight: Highlight) => void;
}

export function CommunityHighlights({
  highlights,
  canEdit = false,
  onCreateHighlight,
  onEditHighlight
}: CommunityHighlightsProps) {
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(null);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  const openHighlight = (highlight: Highlight) => {
    setSelectedHighlight(highlight);
    setCurrentPostIndex(0);
  };

  const nextPost = () => {
    if (selectedHighlight?.posts && currentPostIndex < selectedHighlight.posts.length - 1) {
      setCurrentPostIndex(currentPostIndex + 1);
    }
  };

  const prevPost = () => {
    if (currentPostIndex > 0) {
      setCurrentPostIndex(currentPostIndex - 1);
    }
  };

  return (
    <div className="space-y-4">
      {/* Highlights Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Highlights</h3>
        {canEdit && (
          <Button onClick={onCreateHighlight} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Highlight
          </Button>
        )}
      </div>

      {/* Highlights Grid */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {/* Create New Highlight (for editors) */}
        {canEdit && (
          <div 
            className="flex-shrink-0 cursor-pointer group"
            onClick={onCreateHighlight}
          >
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-muted-foreground/50 flex items-center justify-center group-hover:border-primary transition-colors">
              <Plus className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
            </div>
            <p className="text-xs text-center mt-2 text-muted-foreground">New</p>
          </div>
        )}

        {/* Existing Highlights */}
        {highlights.map((highlight) => (
          <div 
            key={highlight.id}
            className="flex-shrink-0 cursor-pointer group"
            onClick={() => openHighlight(highlight)}
          >
            <div className="relative">
              {/* Highlight Circle */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gradient-primary p-0.5 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img 
                    src={highlight.cover_image} 
                    alt={highlight.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Posts Count Badge */}
              <Badge 
                variant="secondary" 
                className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {highlight.posts_count}
              </Badge>
            </div>
            
            {/* Highlight Title */}
            <p className="text-xs text-center mt-2 max-w-[80px] truncate">
              {highlight.title}
            </p>
          </div>
        ))}
      </div>

      {/* Highlight Viewer Modal */}
      <Dialog open={!!selectedHighlight} onOpenChange={() => setSelectedHighlight(null)}>
        <DialogContent className="max-w-md max-h-[80vh] p-0 overflow-hidden">
          {selectedHighlight && selectedHighlight.posts && (
            <div className="relative h-full">
              {/* Header */}
              <DialogHeader className="p-4 border-b">
                <DialogTitle className="text-center">{selectedHighlight.title}</DialogTitle>
              </DialogHeader>
              
              {/* Story Content */}
              <div className="relative aspect-[9/16] bg-black">
                {selectedHighlight.posts.length > 0 && (
                  <>
                    {/* Current Post */}
                    {selectedHighlight.posts[currentPostIndex].type === 'video' ? (
                      <video 
                        src={selectedHighlight.posts[currentPostIndex].url}
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                      />
                    ) : (
                      <img 
                        src={selectedHighlight.posts[currentPostIndex].url}
                        alt="Highlight post"
                        className="w-full h-full object-contain"
                      />
                    )}
                    
                    {/* Navigation Arrows */}
                    {selectedHighlight.posts.length > 1 && (
                      <>
                        {currentPostIndex > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                            onClick={prevPost}
                          >
                            ←
                          </Button>
                        )}
                        
                        {currentPostIndex < selectedHighlight.posts.length - 1 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                            onClick={nextPost}
                          >
                            →
                          </Button>
                        )}
                      </>
                    )}
                    
                    {/* Progress Indicators */}
                    {selectedHighlight.posts.length > 1 && (
                      <div className="absolute top-4 left-4 right-4 flex gap-1">
                        {selectedHighlight.posts.map((_, index) => (
                          <div
                            key={index}
                            className={`flex-1 h-1 rounded-full ${
                              index <= currentPostIndex ? 'bg-white' : 'bg-white/30'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Caption */}
                    {selectedHighlight.posts[currentPostIndex].caption && (
                      <div className="absolute bottom-4 left-4 right-4 bg-black/50 text-white p-3 rounded-lg">
                        <p className="text-sm">
                          {selectedHighlight.posts[currentPostIndex].caption}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}