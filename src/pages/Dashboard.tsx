import { EnhancedFeed } from "@/components/feed/EnhancedFeed";
import { useAuth } from "@/hooks/useAuth";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  Plus, 
  Star,
  Calendar,
  Users,
  Award,
  Compass,
  Bell,
  Settings,
  User
} from "lucide-react";

interface DashboardProps {
  userRole?: 'student' | 'faculty' | 'community';
}

export default function Dashboard({ userRole }: DashboardProps) {
  const { profile, userRole: authUserRole } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle Button */}
      <ThemeToggle />
      <main className="container py-4 md:py-8">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 h-[calc(100vh-2rem)] md:h-[calc(100vh-4rem)]">
          {/* Left Sidebar: Quick Access */}
          <aside className="hidden md:flex flex-col gap-4 items-center w-full md:w-1/5 max-w-xs h-full sticky top-4">
            <Card className="w-full rounded-2xl shadow-premium border-0 bg-gradient-to-br from-primary/10 via-background to-accent/10">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-center">Quick Access</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <Button asChild variant="ghost" className="justify-start gap-2 rounded-xl hover:bg-primary/10">
                  <a href="/dashboard" className="flex items-center gap-2"><Award className="h-5 w-5 text-primary" /> Home</a>
                </Button>
                <Button asChild variant="ghost" className="justify-start gap-2 rounded-xl hover:bg-accent/10">
                  <a href="/search" className="flex items-center gap-2"><Search className="h-5 w-5 text-accent" /> Search</a>
                </Button>
                <Button asChild variant="ghost" className="justify-start gap-2 rounded-xl hover:bg-accent/10">
                  <a href="/explore" className="flex items-center gap-2"><Compass className="h-5 w-5 text-accent" /> Explore</a>
                </Button>
                <Button asChild variant="ghost" className="justify-start gap-2 rounded-xl hover:bg-success/10">
                  <a href="/messages" className="flex items-center gap-2"><Users className="h-5 w-5 text-success" /> Messages</a>
                </Button>
                <Button asChild variant="ghost" className="justify-start gap-2 rounded-xl hover:bg-yellow-100">
                  <a href="/notifications" className="flex items-center gap-2"><Bell className="h-5 w-5 text-yellow-500" /> Notifications</a>
                </Button>
                <Button asChild variant="ghost" className="justify-start gap-2 rounded-xl hover:bg-primary/10">
                  <a href="/create-community" className="flex items-center gap-2"><Plus className="h-5 w-5 text-primary" /> Create Community</a>
                </Button>
                <Button asChild variant="ghost" className="justify-start gap-2 rounded-xl hover:bg-primary/10">
                  <a href="/profile" className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Profile</a>
                </Button>
                <Button asChild variant="ghost" className="justify-start gap-2 rounded-xl hover:bg-muted/10">
                  <a href="/settings" className="flex items-center gap-2"><Settings className="h-5 w-5 text-muted-foreground" /> Settings</a>
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Center Feed Area: Posts (scrollable) */}
          <section className="flex-1 h-full overflow-y-auto pb-8">
            <EnhancedFeed canCreatePost={true} />
          </section>

          {/* Right Panel: User Profile */}
          <aside className="hidden md:block w-full md:w-1/5 max-w-xs h-full sticky top-4">
            <Card className="bg-gradient-to-br from-primary/10 via-background to-accent/10 rounded-2xl shadow-premium border-0">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" /> Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-3xl font-bold text-white shadow-lg mb-2">
                    {profile?.full_name ? profile.full_name[0] : "U"}
                  </div>
                  <div className="font-semibold text-lg">{profile?.full_name || "User"}</div>
                  <div className="text-xs text-muted-foreground">{profile?.email || "No email"}</div>
                  <div className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                    <Award className="h-4 w-4 text-accent" />
                    <span className="capitalize">{authUserRole || "student"}</span>
                  </div>
                </div>
                <div className="mb-6 bg-muted/30 rounded-xl p-3">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      <span>Communities</span>
                    </div>
                    <span className="font-bold">12</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span>Events</span>
                    </div>
                    <span className="font-bold">8</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span>Views</span>
                    </div>
                    <span className="font-bold">156</span>
                  </div>
                </div>
                <Button asChild variant="outline" className="w-full rounded-xl mt-2">
                  <a href="/profile">View Full Profile</a>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
    </div>
  );
}