import { useState } from "react";
import { Grid, List, Search, Heart, MessageCircle, Share, Play, Image as ImageIcon, Filter, Sparkles, Eye, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface CommunityMedia {
    id: string;
    type: 'image' | 'video' | 'carousel';
    url: string;
    thumbnail?: string;
    caption?: string;
    likes: number;
    comments: number;
    shares: number;
    created_at: string;
    author: {
        name: string;
        avatar?: string;
        role: string;
    };
    tags?: string[];
    isLiked?: boolean;
}

interface CommunityGalleryProps {
    media: CommunityMedia[];
    canPost?: boolean;
    onLike?: (mediaId: string) => void;
    onComment?: (mediaId: string) => void;
    onShare?: (mediaId: string) => void;
    onCreatePost?: () => void;
}

export function CommunityGallery({
    media,
    canPost = false,
    onLike,
    onComment,
    onShare,
    onCreatePost
}: CommunityGalleryProps) {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedMedia, setSelectedMedia] = useState<CommunityMedia | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterTag, setFilterTag] = useState<string>("all");

    // Get all unique tags from media
    const allTags = Array.from(
        new Set(media.flatMap(item => item.tags || []))
    );

    // Filter media based on search and tags
    const filteredMedia = media.filter(item => {
        const matchesSearch = item.caption?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.author.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTag = filterTag === "all" || item.tags?.includes(filterTag);
        return matchesSearch && matchesTag;
    });

    const MediaCard = ({ item }: { item: CommunityMedia }) => (
        <Card
            className="group cursor-pointer overflow-hidden notion-card hover:shadow-xl hover:scale-[1.02] transition-all duration-300 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-0"
            onClick={() => setSelectedMedia(item)}
        >
            <div className="relative aspect-square overflow-hidden">
                {/* Media Preview */}
                <img
                    src={item.thumbnail || item.url}
                    alt={item.caption || "Community media"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                />

                {/* Premium Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                {/* Media Type Indicator */}
                <div className="absolute top-3 right-3">
                    {item.type === 'video' && (
                        <Badge className="bg-black/80 backdrop-blur-sm text-white border-0 shadow-lg">
                            <Play className="h-3 w-3 mr-1 fill-current" />
                            Video
                        </Badge>
                    )}
                    {item.type === 'carousel' && (
                        <Badge className="bg-black/80 backdrop-blur-sm text-white border-0 shadow-lg">
                            <ImageIcon className="h-3 w-3 mr-1" />
                            Gallery
                        </Badge>
                    )}
                </div>

                {/* Premium Hover Stats */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="flex gap-6 text-white">
                        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full">
                            <Heart className="h-4 w-4" />
                            <span className="text-sm font-medium">{item.likes.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full">
                            <MessageCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">{item.comments}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full">
                            <Eye className="h-4 w-4" />
                            <span className="text-sm font-medium">{Math.floor(Math.random() * 1000) + 100}</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 rounded-full"
                        onClick={(e) => {
                            e.stopPropagation();
                            // Handle bookmark
                        }}
                    >
                        <Bookmark className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Premium List View Content */}
            {viewMode === 'list' && (
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                            <AvatarImage src={item.author.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-foreground font-medium">
                                {item.author.name.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0 space-y-3">
                            <div className="flex items-center gap-3">
                                <span className="font-semibold notion-heading">{item.author.name}</span>
                                <Badge variant="outline" className="text-xs bg-muted/50 border-0">
                                    {item.author.role}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                    {new Date(item.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            {item.caption && (
                                <p className="notion-text text-sm leading-relaxed line-clamp-2">
                                    {item.caption}
                                </p>
                            )}

                            {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {item.tags.slice(0, 4).map((tag, index) => (
                                        <Badge 
                                            key={index} 
                                            variant="secondary" 
                                            className="text-xs bg-gradient-to-r from-primary/10 to-accent/10 border-0 hover:from-primary/20 hover:to-accent/20 transition-all duration-200 cursor-pointer"
                                        >
                                            #{tag}
                                        </Badge>
                                    ))}
                                    {item.tags.length > 4 && (
                                        <Badge variant="outline" className="text-xs">
                                            +{item.tags.length - 4}
                                        </Badge>
                                    )}
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-2 border-t border-border/50">
                                <div className="flex gap-6">
                                    <button
                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-red-500 transition-all duration-200 hover:scale-105"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onLike?.(item.id);
                                        }}
                                    >
                                        <Heart className={`h-4 w-4 ${item.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                                        <span className="font-medium">{item.likes.toLocaleString()}</span>
                                    </button>

                                    <button
                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-blue-500 transition-all duration-200 hover:scale-105"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onComment?.(item.id);
                                        }}
                                    >
                                        <MessageCircle className="h-4 w-4" />
                                        <span className="font-medium">{item.comments}</span>
                                    </button>

                                    <button
                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-green-500 transition-all duration-200 hover:scale-105"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onShare?.(item.id);
                                        }}
                                    >
                                        <Share className="h-4 w-4" />
                                        <span className="font-medium">{item.shares}</span>
                                    </button>
                                </div>

                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="h-8 px-3 text-xs hover:bg-primary/10 transition-all duration-200"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedMedia(item);
                                    }}
                                >
                                    View Details
                                </Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            )}
        </Card>
    );

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Premium Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm">
                            <Sparkles className="h-5 w-5 text-primary" />
                        </div>
                        <h2 className="text-3xl font-bold notion-heading bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                            Community Gallery
                        </h2>
                    </div>
                    <p className="notion-text-muted ml-12">Discover amazing work from our talented community</p>
                </div>

                {canPost && (
                    <Button 
                        onClick={onCreatePost}
                        className="notion-button bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-200"
                    >
                        <ImageIcon className="h-4 w-4 mr-2" />
                        Create Post
                    </Button>
                )}
            </div>

            {/* Premium Filters Bar */}
            <div className="notion-card p-6 backdrop-blur-sm bg-card/50">
                <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-3 flex-1">
                        {/* Enhanced Search */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search posts, creators, or tags..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="notion-input pl-11 h-11 bg-background/50 backdrop-blur-sm border-0 shadow-sm focus:shadow-md transition-all duration-200"
                            />
                        </div>

                        {/* Tag Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                            <select
                                value={filterTag}
                                onChange={(e) => setFilterTag(e.target.value)}
                                className="notion-input pl-10 pr-8 h-11 bg-background/50 backdrop-blur-sm border-0 shadow-sm appearance-none cursor-pointer hover:shadow-md transition-all duration-200"
                            >
                                <option value="all">All Tags</option>
                                {allTags.map(tag => (
                                    <option key={tag} value={tag}>#{tag}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className="flex gap-1 p-1 bg-muted/50 rounded-lg backdrop-blur-sm">
                        <Button
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            className={`h-9 px-4 transition-all duration-200 ${
                                viewMode === 'grid' 
                                    ? 'bg-background shadow-sm' 
                                    : 'hover:bg-background/50'
                            }`}
                        >
                            <Grid className="h-4 w-4 mr-2" />
                            Grid
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                            className={`h-9 px-4 transition-all duration-200 ${
                                viewMode === 'list' 
                                    ? 'bg-background shadow-sm' 
                                    : 'hover:bg-background/50'
                            }`}
                        >
                            <List className="h-4 w-4 mr-2" />
                            List
                        </Button>
                    </div>
                </div>
            </div>

            {/* Premium Media Grid/List */}
            {filteredMedia.length === 0 ? (
                <Card className="notion-card border-dashed border-2 border-muted/50">
                    <CardContent className="p-12 text-center">
                        <div className="space-y-4">
                            <div className="p-4 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 w-fit mx-auto">
                                <ImageIcon className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-semibold notion-heading">No posts yet</h3>
                                <p className="notion-text-muted max-w-sm mx-auto">
                                    {searchQuery || filterTag !== "all" 
                                        ? "No posts match your current filters. Try adjusting your search."
                                        : "This community hasn't shared any posts yet. Be the first to contribute!"
                                    }
                                </p>
                            </div>
                            {canPost && (
                                <Button 
                                    onClick={onCreatePost} 
                                    className="mt-6 bg-gradient-to-r from-primary to-accent hover:shadow-lg hover:scale-105 transition-all duration-200"
                                >
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Create the first post
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="animate-slide-up">
                    {viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredMedia.map((item, index) => (
                                <div 
                                    key={item.id} 
                                    className="animate-fade-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <MediaCard item={item} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredMedia.map((item, index) => (
                                <div 
                                    key={item.id} 
                                    className="animate-fade-in"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <MediaCard item={item} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Premium Media Detail Modal */}
            <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden p-0 bg-gradient-to-br from-background to-muted/20 backdrop-blur-xl border-0 shadow-2xl">
                    {selectedMedia && (
                        <div className="grid lg:grid-cols-3 h-full">
                            {/* Media Display */}
                            <div className="lg:col-span-2 relative bg-black rounded-l-xl overflow-hidden">
                                {selectedMedia.type === 'video' ? (
                                    <video
                                        src={selectedMedia.url}
                                        controls
                                        className="w-full h-full object-contain"
                                        autoPlay
                                    />
                                ) : (
                                    <img
                                        src={selectedMedia.url}
                                        alt={selectedMedia.caption || "Community media"}
                                        className="w-full h-full object-contain"
                                    />
                                )}
                                
                                {/* Media Type Badge */}
                                <div className="absolute top-4 left-4">
                                    {selectedMedia.type === 'video' && (
                                        <Badge className="bg-black/80 backdrop-blur-sm text-white border-0">
                                            <Play className="h-3 w-3 mr-1 fill-current" />
                                            Video
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Premium Info Panel */}
                            <div className="flex flex-col bg-card/50 backdrop-blur-sm">
                                <DialogHeader className="p-6 border-b border-border/50">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                                            <AvatarImage src={selectedMedia.author.avatar} />
                                            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20">
                                                {selectedMedia.author.name.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <DialogTitle className="notion-heading text-lg">{selectedMedia.author.name}</DialogTitle>
                                            <Badge variant="outline" className="text-xs mt-1 bg-muted/50 border-0">
                                                {selectedMedia.author.role}
                                            </Badge>
                                        </div>
                                    </div>
                                </DialogHeader>

                                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                                    {/* Caption */}
                                    {selectedMedia.caption && (
                                        <div className="space-y-2">
                                            <h4 className="font-medium notion-heading text-sm">Description</h4>
                                            <p className="notion-text leading-relaxed">{selectedMedia.caption}</p>
                                        </div>
                                    )}

                                    {/* Tags */}
                                    {selectedMedia.tags && selectedMedia.tags.length > 0 && (
                                        <div className="space-y-3">
                                            <h4 className="font-medium notion-heading text-sm">Tags</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedMedia.tags.map((tag, index) => (
                                                    <Badge 
                                                        key={index} 
                                                        variant="secondary" 
                                                        className="text-xs bg-gradient-to-r from-primary/10 to-accent/10 border-0 hover:from-primary/20 hover:to-accent/20 transition-all duration-200 cursor-pointer"
                                                    >
                                                        #{tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Stats */}
                                    <div className="space-y-3">
                                        <h4 className="font-medium notion-heading text-sm">Engagement</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="notion-card p-3 text-center">
                                                <div className="text-lg font-bold text-primary">{selectedMedia.likes.toLocaleString()}</div>
                                                <div className="text-xs text-muted-foreground">Likes</div>
                                            </div>
                                            <div className="notion-card p-3 text-center">
                                                <div className="text-lg font-bold text-primary">{selectedMedia.comments}</div>
                                                <div className="text-xs text-muted-foreground">Comments</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Bar */}
                                <div className="p-6 border-t border-border/50 bg-muted/20">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex gap-4">
                                            <button
                                                className="flex items-center gap-2 text-muted-foreground hover:text-red-500 transition-all duration-200 hover:scale-110"
                                                onClick={() => onLike?.(selectedMedia.id)}
                                            >
                                                <Heart className={`h-5 w-5 ${selectedMedia.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                                                <span className="font-medium">{selectedMedia.likes.toLocaleString()}</span>
                                            </button>

                                            <button
                                                className="flex items-center gap-2 text-muted-foreground hover:text-blue-500 transition-all duration-200 hover:scale-110"
                                                onClick={() => onComment?.(selectedMedia.id)}
                                            >
                                                <MessageCircle className="h-5 w-5" />
                                                <span className="font-medium">{selectedMedia.comments}</span>
                                            </button>

                                            <button
                                                className="flex items-center gap-2 text-muted-foreground hover:text-green-500 transition-all duration-200 hover:scale-110"
                                                onClick={() => onShare?.(selectedMedia.id)}
                                            >
                                                <Share className="h-5 w-5" />
                                            </button>
                                        </div>

                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-muted-foreground hover:text-primary"
                                        >
                                            <Bookmark className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    
                                    <div className="text-xs text-muted-foreground text-center">
                                        Posted on {new Date(selectedMedia.created_at).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}