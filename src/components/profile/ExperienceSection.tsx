import { useState } from "react";
import { Plus, Edit, Trash2, MapPin, Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Experience {
  id: string;
  title: string;
  company_organization: string;
  location?: string;
  start_date: string;
  end_date?: string;
  is_current: boolean;
  description?: string;
  skills_used?: string[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
  isOwnProfile?: boolean;
  onAdd?: () => void;
  onEdit?: (experience: Experience) => void;
  onDelete?: (id: string) => void;
}

export function ExperienceSection({ 
  experiences, 
  isOwnProfile = false, 
  onAdd, 
  onEdit, 
  onDelete 
}: ExperienceSectionProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM yyyy');
  };

  const getDuration = (startDate: string, endDate?: string) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    
    if (months < 12) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      return `${years} year${years !== 1 ? 's' : ''}${remainingMonths > 0 ? ` ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}` : ''}`;
    }
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Experience</CardTitle>
        {isOwnProfile && (
          <Button onClick={onAdd} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-6">
        {experiences.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No experience added yet</p>
            {isOwnProfile && (
              <Button onClick={onAdd} variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Experience
              </Button>
            )}
          </div>
        ) : (
          experiences.map((experience) => (
            <div key={experience.id} className="relative group">
              <div className="flex gap-4">
                {/* Company Logo Placeholder */}
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                  {experience.company_organization.charAt(0)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{experience.title}</h3>
                      <p className="text-primary font-medium">{experience.company_organization}</p>
                      
                      <div className="flex flex-wrap gap-2 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {formatDate(experience.start_date)} - {experience.is_current ? 'Present' : formatDate(experience.end_date!)}
                          </span>
                        </div>
                        <span>•</span>
                        <span>{getDuration(experience.start_date, experience.end_date)}</span>
                        
                        {experience.location && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{experience.location}</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {isOwnProfile && (
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEdit?.(experience)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete?.(experience.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {experience.description && (
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {experience.description}
                    </p>
                  )}
                  
                  {experience.skills_used && experience.skills_used.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {experience.skills_used.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* Divider */}
              {experiences.indexOf(experience) < experiences.length - 1 && (
                <div className="border-b mt-6" />
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}