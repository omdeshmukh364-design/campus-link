import { useState } from "react";
import { Camera, MapPin, Calendar, Link as LinkIcon, Edit, UserPlus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

interface ProfileHeaderProps {
  profile: {
    id: string;
    full_name: string;
    headline?: string;
    bio?: string;
    location?: string;
    profile_picture_url?: string;
    cover_image_url?: string;
    college_name?: string;
    department?: string;
    year_of_study?: number;
    verification_status: 'pending' | 'verified' | 'rejected';
    created_at: string;
  };
  isOwnProfile?: boolean;
  connectionStatus?: 'none' | 'pending' | 'connected';
  onConnect?: () => void;
  onMessage?: () => void;
  onEdit?: () => void;
}

export function ProfileHeader({ 
  profile, 
  isOwnProfile = false, 
  connectionStatus = 'none',
  onConnect,
  onMessage,
  onEdit 
}: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const getConnectionButtonText = () => {
    switch (connectionStatus) {
      case 'pending': return 'Pending';
      case 'connected': return 'Connected';
      default: return 'Connect';
    }
  };

  const getConnectionButtonVariant = () => {
    switch (connectionStatus) {
      case 'pending': return 'outline' as const;
      case 'connected': return 'secondary' as const;
      default: return 'default' as const;
    }
  };

  return (
    <Card className="border-0 shadow-premium bg-gradient-card">
      {/* Cover Image */}
      <div className="relative h-48 bg-gradient-hero rounded-t-lg overflow-hidden">
        {profile.cover_image_url ? (
          <img 
            src={profile.cover_image_url} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-hero" />
        )}
        
        {isOwnProfile && (
          <Button
            variant="secondary"
            size="sm"
            className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm"
          >
            <Camera className="h-4 w-4 mr-2" />
            Edit Cover
          </Button>
        )}
      </div>

      <CardContent className="relative px-6 pb-6">
        {/* Profile Picture */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between -mt-16 mb-4">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
              <AvatarImage src={profile.profile_picture_url} />
              <AvatarFallback className="text-2xl bg-gradient-primary text-primary-foreground">
                {profile.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            {isOwnProfile && (
              <Button
                variant="secondary"
                size="sm"
                className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4 sm:mt-0">
            {isOwnProfile ? (
              <Button onClick={onEdit} variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button 
                  onClick={onConnect}
                  variant={getConnectionButtonVariant()}
                  disabled={connectionStatus === 'pending'}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {getConnectionButtonText()}
                </Button>
                <Button onClick={onMessage} variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Message
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{profile.full_name}</h1>
            {profile.verification_status === 'verified' && (
              <Badge variant="default" className="bg-success text-success-foreground">
                Verified
              </Badge>
            )}
          </div>

          {profile.headline && (
            <p className="text-lg text-muted-foreground">{profile.headline}</p>
          )}

          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {profile.college_name && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{profile.college_name}</span>
              </div>
            )}
            
            {profile.department && (
              <div className="flex items-center gap-1">
                <span>•</span>
                <span>{profile.department}</span>
              </div>
            )}

            {profile.year_of_study && (
              <div className="flex items-center gap-1">
                <span>•</span>
                <span>Year {profile.year_of_study}</span>
              </div>
            )}

            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>
            )}
          </div>

          {profile.bio && (
            <p className="text-sm leading-relaxed max-w-2xl">{profile.bio}</p>
          )}

          {/* Quick Stats */}
          <div className="flex gap-6 pt-4 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-primary">156</div>
              <div className="text-xs text-muted-foreground">Connections</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">23</div>
              <div className="text-xs text-muted-foreground">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-primary">8</div>
              <div className="text-xs text-muted-foreground">Achievements</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}