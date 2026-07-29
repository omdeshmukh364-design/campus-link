import { useState } from "react";
import { Camera, MapPin, Calendar, Link as LinkIcon, Edit, UserPlus, MessageCircle, Users, Award, Globe, Instagram, Twitter, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommunityGallery } from "./CommunityGallery";
import { CommunityHighlights } from "./CommunityHighlights";

interface CommunityProfileProps {
  community: {
    id: string;
    name: string;
    description: string;
    category: string;
    cover_image_url?: string;
    logo_url?: string;
    website_url?: string;
    social_links?: Record<string, string>;
    location?: string;
    meeting_schedule?: string;
    tags?: string[];
    member_count: number;
    is_verified: boolean;
    created_at: string;
  };
  membershipStatus?: 'none' | 'pending' | 'member' | 'admin';
  isOwner?: boolean;
  onJoin?: () => void;
  onMessage?: () => void;
  onEdit?: () => void;
}

export function CommunityProfile({ 
  community, 
  membershipStatus = 'none',
  isOwner = false,
  onJoin,
  onMessage,
  onEdit 
}: CommunityProfileProps) {
  const [activeTab, setActiveTab] = useState("posts");

  // Sample media data for the gallery
  const sampleMedia = [
    {
      id: "1",
      type: "image" as const,
      url: "/api/placeholder/400/400",
      thumbnail: "/api/placeholder/400/400",
      caption: "Our latest hackathon project - an AI-powered study assistant! 🤖✨ #AI #Hackathon #Innovation",
      likes: 156,
      comments: 23,
      shares: 12,
      created_at: "2024-11-15",
      author: {
        name: "Alex Chen",
        avatar: "/api/placeholder/40/40",
        role: "Project Lead"
      },
      tags: ["AI", "Hackathon", "Innovation"],
      isLiked: true
    },
    {
      id: "2",
      type: "video" as const,
      url: "/api/placeholder/400/400",
      thumbnail: "/api/placeholder/400/400",
      caption: "Behind the scenes of our robotics workshop! Students learning to build autonomous robots 🤖",
      likes: 89,
      comments: 15,
      shares: 8,
      created_at: "2024-11-12",
      author: {
        name: "Sarah Johnson",
        avatar: "/api/placeholder/40/40",
        role: "Faculty Advisor"
      },
      tags: ["Robotics", "Workshop", "Learning"],
      isLiked: false
    },
    {
      id: "3",
      type: "carousel" as const,
      url: "/api/placeholder/400/400",
      thumbnail: "/api/placeholder/400/400",
      caption: "Tech Society Annual Showcase 2024 - Amazing projects from our talented members! Swipe to see all the innovations 👉",
      likes: 234,
      comments: 45,
      shares: 28,
      created_at: "2024-11-10",
      author: {
        name: "Maya Patel",
        avatar: "/api/placeholder/40/40",
        role: "Event Coordinator"
      },
      tags: ["Showcase", "Projects", "Annual"],
      isLiked: true
    }
  ];

  // Sample highlights data
  const sampleHighlights = [
    {
      id: "1",
      title: "Hackathons",
      cover_image: "/api/placeholder/100/100",
      posts_count: 12
    },
    {
      id: "2", 
      title: "Workshops",
      cover_image: "/api/placeholder/100/100",
      posts_count: 8
    },
    {
      id: "3",
      title: "Projects",
      cover_image: "/api/placeholder/100/100", 
      posts_count: 15
    },
    {
      id: "4",
      title: "Events",
      cover_image: "/api/placeholder/100/100",
      posts_count: 6
    }
  ];

  const getJoinButtonText = () => {
    switch (membershipStatus) {
      case 'pending': return 'Pending';
      case 'member': return 'Joined';
      case 'admin': return 'Admin';
      default: return 'Join Community';
    }
  };

  const getJoinButtonVariant = () => {
    switch (membershipStatus) {
      case 'pending': return 'outline' as const;
      case 'member': return 'secondary' as const;
      case 'admin': return 'default' as const;
      default: return 'default' as const;
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return <Instagram className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      case 'website': return <Globe className="h-4 w-4" />;
      default: return <LinkIcon className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Community Header */}
      <Card className="border-0 shadow-premium bg-gradient-card overflow-hidden">
        {/* Cover Image */}
        <div className="relative h-64 bg-gradient-hero">
          {community.cover_image_url ? (
            <img 
              src={community.cover_image_url} 
              alt="Community Cover" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-hero flex items-center justify-center">
              <div className="text-primary-foreground text-6xl font-bold opacity-20">
                {community.name.charAt(0)}
              </div>
            </div>
          )}
          
          {isOwner && (
            <Button
              variant="secondary"
              size="sm"
              className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
            >
              <Camera className="h-4 w-4 mr-2" />
              Edit Cover
            </Button>
          )}
          
          {/* Category Badge */}
          <Badge 
            className="absolute top-4 left-4 bg-background/90 text-foreground border-0"
          >
            {community.category}
          </Badge>
        </div>

        <CardContent className="relative px-6 pb-6">
          {/* Community Logo & Info */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-6">
            <div className="flex items-end gap-4">
              {/* Community Logo */}
              <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                <AvatarImage src={community.logo_url} />
                <AvatarFallback className="text-3xl bg-gradient-primary text-primary-foreground">
                  {community.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              
              {isOwner && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="mb-2"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Edit Logo
                </Button>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4 sm:mt-0">
              {isOwner ? (
                <Button onClick={onEdit} variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Community
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={onJoin}
                    variant={getJoinButtonVariant()}
                    disabled={membershipStatus === 'pending'}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    {getJoinButtonText()}
                  </Button>
                  <Button onClick={onMessage} variant="outline">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Community Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">{community.name}</h1>
              {community.is_verified && (
                <Badge variant="default" className="bg-success text-success-foreground">
                  <Award className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              {community.description}
            </p>

            {/* Community Stats & Info */}
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span className="font-medium">{community.member_count.toLocaleString()}</span>
                <span>members</span>
              </div>
              
              {community.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{community.location}</span>
                </div>
              )}

              {community.meeting_schedule && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{community.meeting_schedule}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {community.tags && community.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {community.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}

            {/* Social Links */}
            {community.social_links && Object.keys(community.social_links).length > 0 && (
              <div className="flex gap-2 pt-2">
                {Object.entries(community.social_links).map(([platform, url]) => (
                  <Button
                    key={platform}
                    variant="outline"
                    size="sm"
                    asChild
                    className="h-8 w-8 p-0"
                  >
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      {getSocialIcon(platform)}
                    </a>
                  </Button>
                ))}
                
                {community.website_url && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="h-8 w-8 p-0"
                  >
                    <a href={community.website_url} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            )}

            {/* Quick Stats */}
            <div className="flex gap-8 pt-4 border-t">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">156</div>
                <div className="text-xs text-muted-foreground">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">23</div>
                <div className="text-xs text-muted-foreground">Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">8</div>
                <div className="text-xs text-muted-foreground">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-xs text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Community Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <CommunityGallery
            media={sampleMedia}
            canPost={isOwner || membershipStatus === 'admin' || membershipStatus === 'member'}
          />
        </TabsContent>

        <TabsContent value="highlights" className="space-y-4">
          <CommunityHighlights
            highlights={sampleHighlights}
            canEdit={isOwner || membershipStatus === 'admin'}
          />
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          {/* Events content will be added here */}
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Community events will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          {/* Members content will be added here */}
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Community members will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-4">
          {/* About content will be added here */}
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Community information will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}