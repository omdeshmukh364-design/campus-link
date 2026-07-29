import { useState } from "react";
import { Plus, Edit, Trash2, Award, ExternalLink, Calendar, Medal, Trophy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Achievement {
  id: string;
  title: string;
  description?: string;
  issuer: string;
  date_achieved: string;
  certificate_url?: string;
  image_url?: string;
  achievement_type: 'certification' | 'award' | 'competition' | 'academic' | 'other';
}

interface AchievementsSectionProps {
  achievements: Achievement[];
  isOwnProfile?: boolean;
  onAdd?: () => void;
  onEdit?: (achievement: Achievement) => void;
  onDelete?: (id: string) => void;
}

export function AchievementsSection({ 
  achievements, 
  isOwnProfile = false, 
  onAdd, 
  onEdit, 
  onDelete 
}: AchievementsSectionProps) {
  const getAchievementIcon = (type: Achievement['achievement_type']) => {
    switch (type) {
      case 'certification': return <Award className="h-5 w-5" />;
      case 'award': return <Trophy className="h-5 w-5" />;
      case 'competition': return <Medal className="h-5 w-5" />;
      case 'academic': return <Star className="h-5 w-5" />;
      default: return <Award className="h-5 w-5" />;
    }
  };

  const getAchievementColor = (type: Achievement['achievement_type']) => {
    switch (type) {
      case 'certification': return 'bg-blue-500';
      case 'award': return 'bg-yellow-500';
      case 'competition': return 'bg-purple-500';
      case 'academic': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM yyyy');
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Achievements & Certifications</CardTitle>
        {isOwnProfile && (
          <Button onClick={onAdd} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Achievement
          </Button>
        )}
      </CardHeader>
      
      <CardContent>
        {achievements.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No achievements added yet</p>
            {isOwnProfile && (
              <Button onClick={onAdd} variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Achievement
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement) => (
              <Card key={achievement.id} className="group border shadow-sm hover:shadow-md transition-smooth">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    {/* Achievement Icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0 ${getAchievementColor(achievement.achievement_type)}`}>
                      {getAchievementIcon(achievement.achievement_type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{achievement.title}</h3>
                          <p className="text-primary text-sm font-medium">{achievement.issuer}</p>
                          
                          <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(achievement.date_achieved)}</span>
                          </div>
                        </div>
                        
                        {isOwnProfile && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onEdit?.(achievement)}
                              className="h-6 w-6 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onDelete?.(achievement.id)}
                              className="h-6 w-6 p-0 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {achievement.description && (
                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {achievement.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-3">
                        <Badge variant="outline" className="text-xs capitalize">
                          {achievement.achievement_type}
                        </Badge>
                        
                        {achievement.certificate_url && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="h-6 text-xs px-2"
                          >
                            <a href={achievement.certificate_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Achievement Image */}
                  {achievement.image_url && (
                    <div className="mt-3 rounded-lg overflow-hidden">
                      <img 
                        src={achievement.image_url} 
                        alt={achievement.title}
                        className="w-full h-32 object-cover"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}