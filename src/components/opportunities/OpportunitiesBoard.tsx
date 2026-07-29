import { useState } from "react";
import { Search, MapPin, Calendar, Clock, Briefcase, GraduationCap, Trophy, Beaker, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

interface Opportunity {
  id: string;
  title: string;
  description: string;
  opportunity_type: 'internship' | 'job' | 'research' | 'project' | 'competition';
  company_organization: string;
  location?: string;
  is_remote: boolean;
  requirements?: string[];
  skills_required?: string[];
  application_deadline?: string;
  application_url?: string;
  salary_range?: string;
  created_at: string;
  creator: {
    name: string;
    avatar?: string;
    title: string;
  };
}

interface OpportunitiesBoardProps {
  opportunities: Opportunity[];
  canCreateOpportunity?: boolean;
  onCreateOpportunity?: () => void;
  onApply?: (opportunityId: string) => void;
  onSave?: (opportunityId: string) => void;
}

export function OpportunitiesBoard({
  opportunities,
  canCreateOpportunity = false,
  onCreateOpportunity,
  onApply,
  onSave
}: OpportunitiesBoardProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState<string>("all");

  const getOpportunityIcon = (type: Opportunity['opportunity_type']) => {
    switch (type) {
      case 'internship': return <Briefcase className="h-4 w-4" />;
      case 'job': return <Briefcase className="h-4 w-4" />;
      case 'research': return <Beaker className="h-4 w-4" />;
      case 'project': return <GraduationCap className="h-4 w-4" />;
      case 'competition': return <Trophy className="h-4 w-4" />;
      default: return <Briefcase className="h-4 w-4" />;
    }
  };

  const getOpportunityColor = (type: Opportunity['opportunity_type']) => {
    switch (type) {
      case 'internship': return 'bg-blue-500';
      case 'job': return 'bg-green-500';
      case 'research': return 'bg-purple-500';
      case 'project': return 'bg-orange-500';
      case 'competition': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.company_organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         opportunity.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === "all" || opportunity.opportunity_type === typeFilter;
    
    const matchesLocation = locationFilter === "all" || 
                           (locationFilter === "remote" && opportunity.is_remote) ||
                           (opportunity.location?.toLowerCase().includes(locationFilter.toLowerCase()));

    return matchesSearch && matchesType && matchesLocation;
  });

  const groupedOpportunities = {
    all: filteredOpportunities,
    internships: filteredOpportunities.filter(o => o.opportunity_type === 'internship'),
    jobs: filteredOpportunities.filter(o => o.opportunity_type === 'job'),
    research: filteredOpportunities.filter(o => o.opportunity_type === 'research'),
    projects: filteredOpportunities.filter(o => o.opportunity_type === 'project'),
    competitions: filteredOpportunities.filter(o => o.opportunity_type === 'competition')
  };

  const isDeadlineApproaching = (deadline?: string) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilDeadline <= 7 && daysUntilDeadline > 0;
  };

  const OpportunityCard = ({ opportunity }: { opportunity: Opportunity }) => (
    <Card className="hover:shadow-md transition-smooth">
      <CardContent className="p-6">
        <div className="flex gap-4">
          {/* Company/Organization Logo */}
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white flex-shrink-0 ${getOpportunityColor(opportunity.opportunity_type)}`}>
            {getOpportunityIcon(opportunity.opportunity_type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-lg hover:text-primary cursor-pointer transition-colors">
                  {opportunity.title}
                </h3>
                <p className="text-primary font-medium">{opportunity.company_organization}</p>
                
                <div className="flex flex-wrap gap-2 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{opportunity.is_remote ? 'Remote' : opportunity.location || 'Location TBD'}</span>
                  </div>
                  
                  {opportunity.salary_range && (
                    <>
                      <span>•</span>
                      <span>{opportunity.salary_range}</span>
                    </>
                  )}
                  
                  {opportunity.application_deadline && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>Deadline: {format(new Date(opportunity.application_deadline), 'MMM dd')}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Badge variant="outline" className="capitalize">
                  {opportunity.opportunity_type}
                </Badge>
                {isDeadlineApproaching(opportunity.application_deadline) && (
                  <Badge variant="destructive" className="text-xs">
                    Deadline Soon
                  </Badge>
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {opportunity.description}
            </p>
            
            {/* Skills Required */}
            {opportunity.skills_required && opportunity.skills_required.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {opportunity.skills_required.slice(0, 4).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {opportunity.skills_required.length > 4 && (
                  <Badge variant="secondary" className="text-xs">
                    +{opportunity.skills_required.length - 4} more
                  </Badge>
                )}
              </div>
            )}
            
            {/* Posted by */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={opportunity.creator.avatar} />
                  <AvatarFallback className="text-xs">
                    {opportunity.creator.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>Posted by {opportunity.creator.name}</span>
                <span>•</span>
                <span>{format(new Date(opportunity.created_at), 'MMM dd')}</span>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSave?.(opportunity.id)}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  onClick={() => onApply?.(opportunity.id)}
                  className="bg-primary hover:bg-primary/90"
                >
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Opportunities</h1>
          <p className="text-muted-foreground">Discover internships, jobs, research, and more</p>
        </div>
        
        {canCreateOpportunity && (
          <Button onClick={onCreateOpportunity}>
            <Plus className="h-4 w-4 mr-2" />
            Post Opportunity
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="internship">Internships</SelectItem>
                <SelectItem value="job">Jobs</SelectItem>
                <SelectItem value="research">Research</SelectItem>
                <SelectItem value="project">Projects</SelectItem>
                <SelectItem value="competition">Competitions</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="san francisco">San Francisco</SelectItem>
                <SelectItem value="new york">New York</SelectItem>
                <SelectItem value="boston">Boston</SelectItem>
                <SelectItem value="seattle">Seattle</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Opportunities Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All ({groupedOpportunities.all.length})</TabsTrigger>
          <TabsTrigger value="internships">Internships ({groupedOpportunities.internships.length})</TabsTrigger>
          <TabsTrigger value="jobs">Jobs ({groupedOpportunities.jobs.length})</TabsTrigger>
          <TabsTrigger value="research">Research ({groupedOpportunities.research.length})</TabsTrigger>
          <TabsTrigger value="projects">Projects ({groupedOpportunities.projects.length})</TabsTrigger>
          <TabsTrigger value="competitions">Competitions ({groupedOpportunities.competitions.length})</TabsTrigger>
        </TabsList>

        {Object.entries(groupedOpportunities).map(([key, opps]) => (
          <TabsContent key={key} value={key} className="space-y-4">
            {opps.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No opportunities found matching your criteria</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              opps.map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}