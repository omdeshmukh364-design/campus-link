import { useState } from "react";
import { Plus, Edit, Trash2, ExternalLink, Github, Calendar, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Project {
  id: string;
  title: string;
  description: string;
  technologies?: string[];
  project_url?: string;
  github_url?: string;
  image_urls?: string[];
  start_date: string;
  end_date?: string;
  is_ongoing: boolean;
}

interface ProjectsSectionProps {
  projects: Project[];
  isOwnProfile?: boolean;
  onAdd?: () => void;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
}

export function ProjectsSection({ 
  projects, 
  isOwnProfile = false, 
  onAdd, 
  onEdit, 
  onDelete 
}: ProjectsSectionProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM yyyy');
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Projects</CardTitle>
        {isOwnProfile && (
          <Button onClick={onAdd} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        )}
      </CardHeader>
      
      <CardContent>
        {projects.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No projects added yet</p>
            {isOwnProfile && (
              <Button onClick={onAdd} variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Project
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.id} className="group border shadow-sm hover:shadow-md transition-smooth">
                <div className="relative">
                  {/* Project Image */}
                  {project.image_urls && project.image_urls.length > 0 ? (
                    <div className="h-48 overflow-hidden rounded-t-lg">
                      <img 
                        src={project.image_urls[0]} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-primary rounded-t-lg flex items-center justify-center">
                      <div className="text-primary-foreground text-4xl font-bold">
                        {project.title.charAt(0)}
                      </div>
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <Badge 
                    className={`absolute top-3 right-3 ${
                      project.is_ongoing 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {project.is_ongoing ? 'Ongoing' : 'Completed'}
                  </Badge>
                  
                  {/* Edit/Delete Actions */}
                  {isOwnProfile && (
                    <div className="absolute top-3 left-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onEdit?.(project)}
                        className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onDelete?.(project.id)}
                        className="h-8 w-8 p-0 bg-background/80 backdrop-blur-sm text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-lg">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                    
                    {/* Date Range */}
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDate(project.start_date)} - {
                          project.is_ongoing ? 'Present' : formatDate(project.end_date!)
                        }
                      </span>
                    </div>
                    
                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>
                    )}
                    
                    {/* Action Links */}
                    <div className="flex gap-2 pt-2">
                      {project.project_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex-1"
                        >
                          <a href={project.project_url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Live Demo
                          </a>
                        </Button>
                      )}
                      
                      {project.github_url && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="flex-1"
                        >
                          <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                            <Github className="h-3 w-3 mr-1" />
                            Code
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}