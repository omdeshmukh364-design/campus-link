import { Users, Star, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CommunityCardProps {
  id: string;
  name: string;
  description: string;
  members: number;
  rating: number;
  category: string;
  image: string;
  nextEvent?: string;
  location?: string;
  isJoined?: boolean;
  onJoin?: (id: string) => void;
  onView?: (id: string) => void;
}

export function CommunityCard({
  id,
  name,
  description,
  members,
  rating,
  category,
  image,
  nextEvent,
  location,
  isJoined = false,
  onJoin,
  onView,
}: CommunityCardProps) {
  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-smooth bg-gradient-card hover:shadow-glow cursor-pointer dark:bg-[#232326] dark:text-white">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={`${name} cover`}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Category Badge */}
          <Badge 
            className="absolute top-3 right-3 bg-background/90 text-foreground border-0"
          >
            {category}
          </Badge>

          {/* Rating */}
          <div className="absolute bottom-3 left-3 flex items-center space-x-1 text-white">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-smooth dark:text-white">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2 dark:text-gray-300">
              {description}
            </p>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{members.toLocaleString()} members</span>
            </div>
            
            {location && (
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            )}
          </div>

          {nextEvent && (
            <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
              <Calendar className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Next Event</p>
                <p className="text-sm font-medium">{nextEvent}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onView?.(id)}
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant={isJoined ? "secondary" : "default"}
          size="sm"
          onClick={() => onJoin?.(id)}
          className="flex-1"
        >
          {isJoined ? "Joined" : "Join Community"}
        </Button>
      </CardFooter>
    </Card>
  );
}