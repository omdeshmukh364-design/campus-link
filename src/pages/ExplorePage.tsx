import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { CommunityCard } from "@/components/CommunityCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import ThemeToggle from "@/components/ThemeToggle";
import { 
  Search,
  Filter,
  TrendingUp,
  Users,
  Star
} from "lucide-react";

import techClubIcon from "@/assets/tech-club-icon.jpg";
import artsClubIcon from "@/assets/arts-club-icon.jpg";
import sportsClubIcon from "@/assets/sports-club-icon.jpg";

export default function ExplorePage() {
  const { profile, userRole } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    "All",
    "Technology",
    "Arts",
    "Sports",
    "Science",
    "Business",
    "Social"
  ];

  // Mock communities data - will be replaced with real data from Supabase
  const communities = [
    {
      id: "1",
      name: "Tech Innovators Society",
      description: "Building the future through technology. Join us for hackathons, workshops, and networking.",
      members: 1250,
      rating: 4.8,
      category: "Technology",
      image: techClubIcon,
      nextEvent: "AI Workshop - Dec 15",
      location: "Computer Lab 201",
      isJoined: false,
    },
    {
      id: "2",
      name: "Creative Arts Collective",
      description: "Express your creativity through various art forms. From painting to digital design.",
      members: 890,
      rating: 4.7,
      category: "Arts",
      image: artsClubIcon,
      nextEvent: "Art Exhibition - Dec 20",
      location: "Arts Building",
      isJoined: false,
    },
    {
      id: "3",
      name: "Athletics & Wellness Club",
      description: "Promoting physical fitness and mental well-being. Join our sports teams.",
      members: 2100,
      rating: 4.9,
      category: "Sports",
      image: sportsClubIcon,
      nextEvent: "Basketball Tournament - Dec 18",
      location: "Main Gymnasium",
      isJoined: false,
    },
  ];

  const trendingCommunities = communities.slice(0, 3);
  
  const filteredCommunities = communities.filter(community => {
    const matchesSearch = community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "All" || 
                           community.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleJoinCommunity = (id: string) => {
    // Implement join community logic
  };

  const handleViewCommunity = (id: string) => {
    // Implement view community logic
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#18181b]">
      {/* Theme Toggle Button */}
      <ThemeToggle />
      <Navigation userRole={userRole as 'student' | 'faculty' | 'community'} />
      
      <div className="container py-8 dark:text-white">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore Communities</h1>
          <p className="text-muted-foreground">
            Discover communities that match your interests and passions
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category || (!selectedCategory && category === "All") ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-smooth"
              onClick={() => setSelectedCategory(category === "All" ? null : category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 dark:bg-[#232326] dark:text-white">
              <h3 className="font-bold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-success" />
                Trending
              </h3>
              
              <div className="space-y-4">
                {trendingCommunities.map((community, index) => (
                  <div key={community.id} className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-2xl font-bold text-muted-foreground mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-medium text-sm line-clamp-2">
                          {community.name}
                        </h4>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Users className="h-3 w-3 mr-1" />
                          {community.members}
                        </div>
                      </div>
                    </div>
                    {index < trendingCommunities.length - 1 && (
                      <div className="border-b" />
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-medium mb-3">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Communities</span>
                    <span className="font-medium">{communities.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Active Members</span>
                    <span className="font-medium">
                      {communities.reduce((acc, c) => acc + c.members, 0)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {filteredCommunities.length} Communities Found
              </h2>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4" />
                <span>Sorted by popularity</span>
              </div>
            </div>

            {filteredCommunities.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCommunities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    {...community}
                    onJoin={handleJoinCommunity}
                    onView={handleViewCommunity}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Communities Found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button onClick={() => { setSearchQuery(""); setSelectedCategory(null); }}>
                  Clear Filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
