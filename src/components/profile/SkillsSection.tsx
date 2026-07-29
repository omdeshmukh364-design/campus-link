import { useState } from "react";
import { Plus, X, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Skill {
  name: string;
  endorsements: {
    count: number;
    endorsers: Array<{
      id: string;
      name: string;
      avatar?: string;
    }>;
  };
}

interface SkillsSectionProps {
  skills: string[];
  endorsements?: Record<string, Skill['endorsements']>;
  isOwnProfile?: boolean;
  onAddSkill?: (skill: string) => void;
  onRemoveSkill?: (skill: string) => void;
  onEndorseSkill?: (skill: string) => void;
}

export function SkillsSection({ 
  skills, 
  endorsements = {},
  isOwnProfile = false, 
  onAddSkill, 
  onRemoveSkill,
  onEndorseSkill
}: SkillsSectionProps) {
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const handleAddSkill = () => {
    if (newSkill.trim() && onAddSkill) {
      onAddSkill(newSkill.trim());
      setNewSkill("");
      setIsAddingSkill(false);
    }
  };

  const getSkillWithEndorsements = (skill: string): Skill => ({
    name: skill,
    endorsements: endorsements[skill] || { count: 0, endorsers: [] }
  });

  const sortedSkills = skills
    .map(getSkillWithEndorsements)
    .sort((a, b) => b.endorsements.count - a.endorsements.count);

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Skills & Endorsements</CardTitle>
        {isOwnProfile && (
          <Button 
            onClick={() => setIsAddingSkill(true)} 
            variant="outline" 
            size="sm"
            disabled={isAddingSkill}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Skill
          </Button>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Add Skill Input */}
        {isAddingSkill && (
          <div className="flex gap-2">
            <Input
              placeholder="Enter a skill..."
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
              className="flex-1"
              autoFocus
            />
            <Button onClick={handleAddSkill} size="sm">
              Add
            </Button>
            <Button 
              onClick={() => {
                setIsAddingSkill(false);
                setNewSkill("");
              }} 
              variant="outline" 
              size="sm"
            >
              Cancel
            </Button>
          </div>
        )}

        {skills.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No skills added yet</p>
            {isOwnProfile && (
              <Button onClick={() => setIsAddingSkill(true)} variant="outline" className="mt-4">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Skill
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedSkills.map((skill) => (
              <div key={skill.name} className="group">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{skill.name}</h3>
                      {skill.endorsements.count > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {skill.endorsements.count} endorsement{skill.endorsements.count !== 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                    
                    {/* Endorsers */}
                    {skill.endorsements.endorsers.length > 0 && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex -space-x-2">
                          {skill.endorsements.endorsers.slice(0, 3).map((endorser) => (
                            <Avatar key={endorser.id} className="h-6 w-6 border-2 border-background">
                              <AvatarImage src={endorser.avatar} />
                              <AvatarFallback className="text-xs">
                                {endorser.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          Endorsed by {skill.endorsements.endorsers[0]?.name}
                          {skill.endorsements.count > 1 && ` and ${skill.endorsements.count - 1} other${skill.endorsements.count > 2 ? 's' : ''}`}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {!isOwnProfile && onEndorseSkill && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEndorseSkill(skill.name)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Endorse
                      </Button>
                    )}
                    
                    {isOwnProfile && onRemoveSkill && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveSkill(skill.name)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}