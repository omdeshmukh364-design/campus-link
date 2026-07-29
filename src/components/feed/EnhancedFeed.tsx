import { useState } from "react";
import { Plus, TrendingUp, Clock, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CommunityPost } from "@/components/community/CommunityPost";
import { useToast } from "@/hooks/use-toast";

interface EnhancedFeedProps {
  canCreatePost?: boolean;
  onCreatePost?: () => void;
}

export function EnhancedFeed({ canCreatePost = false, onCreatePost }: EnhancedFeedProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const { toast } = useToast();

  // Sample posts data with Instagram-style content
  const samplePosts = [
    {
      id: "1",
      author: {
        name: "Alex Chen",
        avatar: "/api/placeholder/40/40",
        role: "Computer Science Student"
      },
      community: {
        name: "Tech Innovators Society",
        avatar: "/api/placeholder/40/40"
      },
      content: "Just finished our AI-powered study assistant project! 🤖 This tool helps students create personalized study schedules and tracks their progress. Built with React, Python, and OpenAI API. Excited to present this at the upcoming tech showcase! #AI #StudyTech #Innovation",
      media: [
        {
          id: "1",
          type: "image" as const,
          url: "/api/placeholder/600/600",
          thumbnail: "/api/placeholder/600/600"
        },
        {
          id: "2", 
          type: "image" as const,
          url: "/api/placeholder/600/600",
          thumbnail: "/api/placeholder/600/600"
        }
      ],
      tags: ["AI", "StudyTech", "Innovation", "React", "Python"],
      likes: 156,
      comments: 23,
      shares: 12,
      saves: 8,
      created_at: "2024-11-15T10:30:00Z",
      isLiked: true,
      isSaved: false
    },
    {
      id: "2",
      author: {
        name: "Dr. Sarah Johnson",
        avatar: "/api/placeholder/40/40",
        role: "Computer Science Professor"
      },
      community: {
        name: "Tech Innovators Society",
        avatar: "/api/placeholder/40/40"
      },
      content: "Excited to announce our upcoming Machine Learning Workshop! 📚 We'll cover neural networks, deep learning, and hands-on projects. Perfect for students looking to dive deeper into AI. Registration opens tomorrow!",
      media: [
        {
          id: "3",
          type: "video" as const,
          url: "/api/placeholder/600/600",
          thumbnail: "/api/placeholder/600/600"
        }
      ],
      tags: ["MachineLearning", "Workshop", "AI", "Education"],
      likes: 89,
      comments: 15,
      shares: 8,
      saves: 12,
      created_at: "2024-11-14T14:20:00Z",
      isLiked: false,
      isSaved: true
    },
    {
      id: "3",
      author: {
        name: "Maya Patel",
        avatar: "/api/placeholder/40/40",
        role: "Design Student"
      },
      community: {
        name: "Creative Arts Collective",
        avatar: "/api/placeholder/40/40"
      },
      content: "Working on a new UI/UX design for our college's student portal! 🎨 The goal is to make it more intuitive and accessible for all students. Here's a sneak peek at the dashboard redesign. What do you think?",
      media: [
        {
          id: "4",
          type: "image" as const,
          url: "/api/placeholder/600/600",
          thumbnail: "/api/placeholder/600/600"
        }
      ],
      tags: ["UIUX", "Design", "StudentPortal", "Accessibility"],
      likes: 234,
      comments: 45,
      shares: 28,
      saves: 19,
      created_at: "2024-11-13T16:45:00Z",
      isLiked: true,
      isSaved: false
    },
    {
      id: "4",
      author: {
        name: "James Wilson",
        avatar: "/api/placeholder/40/40",
        role: "Engineering Student"
      },
      community: {
        name: "Robotics Club",
        avatar: "/api/placeholder/40/40"
      },
      content: "Our autonomous drone project is finally taking flight! 🚁 After months of coding and testing, we've successfully implemented computer vision for obstacle detection. Next step: adding delivery capabilities for campus use.",
      media: [
        {
          id: "5",
          type: "video" as const,
          url: "/api/placeholder/600/600",
          thumbnail: "/api/placeholder/600/600"
        },
        {
          id: "6",
          type: "image" as const,
          url: "/api/placeholder/600/600",
          thumbnail: "/api/placeholder/600/600"
        }
      ],
      tags: ["Robotics", "Drone", "ComputerVision", "Engineering"],
      likes: 178,
      comments: 32,
      shares: 15,
      saves: 25,
      created_at: "2024-11-12T11:15:00Z",
      isLiked: false,
      isSaved: true
    }
  ];

  // Sample comments for posts
  const sampleComments = {
    "1": [
      {
        id: "c1",
        author: {
          name: "Emma Davis",
          avatar: "/api/placeholder/30/30"
        },
        content: "This looks amazing! Can't wait to try it out 🔥",
        created_at: "2024-11-15T11:00:00Z",
        likes: 5
      },
      {
        id: "c2",
        author: {
          name: "Michael Brown",
          avatar: "/api/placeholder/30/30"
        },
        content: "Great work! The UI looks really clean and intuitive",
        created_at: "2024-11-15T11:30:00Z",
        likes: 3
      }
    ],
    "2": [
      {
        id: "c3",
        author: {
          name: "Lisa Zhang",
          avatar: "/api/placeholder/30/30"
        },
        content: "Definitely signing up for this! Thanks for organizing 🙏",
        created_at: "2024-11-14T15:00:00Z",
        likes: 8
      }
    ]
  };

  const handleLike = (postId: string) => {
    toast({
      title: "Post liked!",
      description: "You liked this post"
    });
  };

  const handleComment = (postId: string, comment: string) => {
    toast({
      title: "Comment added!",
      description: "Your comment has been posted"
    });
  };

  const handleShare = (postId: string) => {
    toast({
      title: "Post shared!",
      description: "Post has been shared to your network"
    });
  };

  const handleSave = (postId: string) => {
    toast({
      title: "Post saved!",
      description: "Post has been saved to your collection"
    });
  };

  const handleReport = (postId: string) => {
    toast({
      title: "Post reported",
      description: "Thank you for reporting. We'll review this content."
    });
  };

  const filteredPosts = samplePosts.filter(post => {
    switch (activeFilter) {
      case "trending":
        return post.likes > 150;
      case "recent":
        return new Date(post.created_at) > new Date(Date.now() - 24 * 60 * 60 * 1000);
      case "following":
        return post.author.role === "Computer Science Student"; // Mock following logic
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      {/* Feed Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Community Feed</h2>
          <p className="text-muted-foreground">Discover what's happening in your communities</p>
        </div>
        
        {canCreatePost && (
          <Button onClick={onCreatePost}>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        )}
      </div>

      {/* Feed Filters */}
      <Tabs value={activeFilter} onValueChange={setActiveFilter}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            All Posts
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Recent
          </TabsTrigger>
          <TabsTrigger value="following" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Following
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeFilter} className="space-y-6 mt-6">
          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <div className="text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No posts found for this filter</p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <CommunityPost
                  key={post.id}
                  post={post}
                  comments={sampleComments[post.id] || []}
                  showComments={true}
                  onLike={() => handleLike(post.id)}
                  onComment={(comment) => handleComment(post.id, comment)}
                  onShare={() => handleShare(post.id)}
                  onSave={() => handleSave(post.id)}
                  onReport={() => handleReport(post.id)}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Trending Topics Sidebar */}
      <Card className="lg:hidden">
        <CardHeader>
          <CardTitle className="text-lg">Trending Topics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {["AI", "MachineLearning", "WebDev", "Design", "Robotics", "Hackathon"].map((tag) => (
              <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
                #{tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}