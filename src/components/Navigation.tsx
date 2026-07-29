import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Search, User, Settings, LogOut, Calendar, Compass } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface NavigationProps {
  userRole?: 'student' | 'faculty' | 'community';
}

export function Navigation({ userRole }: NavigationProps) {
  const [notificationCount] = useState(3);
  const { profile, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
      navigate("/");
    }
  };

  const currentUserRole = userRole;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo and Brand */}
        <Link to="/" className="flex items-center space-x-2">
          <img src="/campus-link-logo.png" alt="CampusLink Logo" className="h-8 w-8 rounded-lg" />
          <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            CampusLink
          </h1>
        </Link>

        {/* Search Bar - Only show when authenticated */}
        {user && (
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search communities, students, or posts..."
                className="pl-10 bg-muted/30 border-0 focus:bg-background transition-smooth"
              />
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              {/* Role Badge */}
              {currentUserRole && (
                <Badge 
                  variant={currentUserRole === 'faculty' ? 'default' : currentUserRole === 'community' ? 'secondary' : 'outline'}
                  className="capitalize hidden sm:flex"
                >
                  {currentUserRole}
                </Badge>
              )}

              {/* Navigation Links */}
              <Link to="/dashboard" className="hidden md:block">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              
              <Link to="/explore" className="hidden md:block">
                <Button variant="ghost" size="sm">
                  <Compass className="h-4 w-4 mr-2" />
                  Explore
                </Button>
              </Link>
              
              <Link to="/opportunities" className="hidden md:block">
                <Button variant="ghost" size="sm">
                  Opportunities
                </Button>
              </Link>
                      {currentUserRole && (
                        <Badge 
                          variant={currentUserRole === 'faculty' ? 'default' : currentUserRole === 'community' ? 'secondary' : 'outline'}
                          className="capitalize hidden sm:flex"
                        >
                          {currentUserRole}
                        </Badge>
                      )}
              {/* Notifications */}
              <Link to="/notifications">
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="h-5 w-5" />
                  {notificationCount > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 text-xs p-0 flex items-center justify-center"
                    >
                      {notificationCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarFallback>
                        {profile?.full_name?.[0] || user.email?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {profile?.full_name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link to="/auth">
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
