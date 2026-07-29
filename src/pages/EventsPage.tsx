import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock,
  Search,
  Filter,
  Plus
} from "lucide-react";

export default function EventsPage() {
  const { profile, userRole } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock events data - will be replaced with real data from Supabase
  const events = [
    {
      id: "1",
      title: "AI Workshop: Machine Learning Basics",
      community: "Tech Innovators Society",
      date: "Dec 15, 2024",
      time: "2:00 PM - 5:00 PM",
      location: "Computer Lab 201",
      attendees: 45,
      maxCapacity: 60,
      category: "Workshop",
      description: "Learn the fundamentals of machine learning with hands-on projects.",
      isRegistered: false
    },
    {
      id: "2",
      title: "Art Exhibition: Future Visions",
      community: "Creative Arts Collective",
      date: "Dec 20, 2024",
      time: "6:00 PM - 9:00 PM",
      location: "Arts Building Gallery",
      attendees: 120,
      maxCapacity: 150,
      category: "Exhibition",
      description: "Showcasing digital artwork from our talented community members.",
      isRegistered: true
    },
    {
      id: "3",
      title: "Basketball Tournament Finals",
      community: "Athletics & Wellness Club",
      date: "Dec 18, 2024",
      time: "4:00 PM - 7:00 PM",
      location: "Main Gymnasium",
      attendees: 200,
      maxCapacity: 250,
      category: "Sports",
      description: "Join us for the exciting finals of our inter-community basketball tournament.",
      isRegistered: false
    }
  ];

  const myEvents = events.filter(e => e.isRegistered);
  const upcomingEvents = events.filter(e => !e.isRegistered);

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle Button */}
      <ThemeToggle />
      <Navigation userRole={userRole as 'student' | 'faculty' | 'community'} />
      
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Events</h1>
            <p className="text-muted-foreground">
              Discover and join exciting campus events
            </p>
          </div>
          
          {userRole === 'faculty' && (
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          )}
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-premium transition-smooth">
                  <div className="h-32 bg-gradient-hero"></div>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <Badge>{event.category}</Badge>
                      <div className="text-right">
                        <p className="text-sm font-medium">{event.date}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees}/{event.maxCapacity} attending
                      </div>
                    </div>

                    <div className="pt-2">
                      <Button className="w-full">Register</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-events" className="space-y-6">
            {myEvents.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden">
                    <div className="h-32 bg-gradient-hero"></div>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge>{event.category}</Badge>
                        <Badge variant="secondary">Registered</Badge>
                      </div>
                      <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                      </p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          {event.date}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          {event.time}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          {event.location}
                        </div>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button className="flex-1" variant="outline">
                          View Details
                        </Button>
                        <Button className="flex-1" variant="destructive">
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="p-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Events Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Register for events to see them here.
                </p>
                <Button>Browse Events</Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past">
            <Card className="p-12 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No Past Events</h3>
              <p className="text-muted-foreground">
                Your attended events will appear here.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
