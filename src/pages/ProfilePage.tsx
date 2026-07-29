import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ExperienceSection } from "@/components/profile/ExperienceSection";
import { ProjectsSection } from "@/components/profile/ProjectsSection";
import { SkillsSection } from "@/components/profile/SkillsSection";
import { AchievementsSection } from "@/components/profile/AchievementsSection";
import { ConnectionsSection } from "@/components/networking/ConnectionsSection";
import { useAuth } from "@/hooks/useAuth";
import ThemeToggle from "@/components/ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { userId } = useParams();
  const { user, profile: currentUserProfile } = useAuth();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState(null);
  const [experiences, setExperiences] = useState([]);
  const [projects, setProjects] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [connections, setConnections] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const isOwnProfile = !userId || userId === user?.id;
  const profileUserId = userId || user?.id;

  // Sample data for demonstration
  const sampleExperiences = [
    {
      id: "1",
      title: "Software Engineering Intern",
      company_organization: "Tech Innovators Inc.",
      location: "San Francisco, CA",
      start_date: "2024-06-01",
      end_date: "2024-08-31",
      is_current: false,
      description: "Developed full-stack web applications using React and Node.js. Collaborated with senior developers on feature implementation and bug fixes. Gained experience in agile development methodologies.",
      skills_used: ["React", "Node.js", "JavaScript", "Git", "Agile"]
    },
    {
      id: "2",
      title: "Research Assistant",
      company_organization: "University AI Lab",
      location: "Campus",
      start_date: "2024-01-15",
      is_current: true,
      description: "Assisting in machine learning research projects. Working on natural language processing models and data analysis.",
      skills_used: ["Python", "TensorFlow", "Machine Learning", "Data Analysis"]
    }
  ];

  const sampleProjects = [
    {
      id: "1",
      title: "CampusLink Platform",
      description: "A comprehensive college networking platform connecting students, faculty, and communities. Built with React, TypeScript, and Supabase.",
      technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS", "Vite"],
      project_url: "https://campuslink.demo.com",
      github_url: "https://github.com/user/campuslink",
      image_urls: ["/api/placeholder/400/200"],
      start_date: "2024-09-01",
      is_ongoing: true
    },
    {
      id: "2",
      title: "AI Study Buddy",
      description: "An AI-powered study companion that helps students with personalized learning recommendations and progress tracking.",
      technologies: ["Python", "OpenAI API", "Flask", "React", "PostgreSQL"],
      github_url: "https://github.com/user/ai-study-buddy",
      start_date: "2024-03-01",
      end_date: "2024-05-31",
      is_ongoing: false
    }
  ];

  const sampleAchievements = [
    {
      id: "1",
      title: "AWS Cloud Practitioner",
      description: "Foundational understanding of AWS Cloud concepts, services, and terminology.",
      issuer: "Amazon Web Services",
      date_achieved: "2024-08-15",
      certificate_url: "https://aws.amazon.com/certification/",
      achievement_type: "certification" as const
    },
    {
      id: "2",
      title: "Best Innovation Award",
      description: "Awarded for the most innovative project at the college hackathon.",
      issuer: "College Tech Society",
      date_achieved: "2024-04-20",
      achievement_type: "award" as const
    },
    {
      id: "3",
      title: "Dean's List",
      description: "Academic excellence recognition for maintaining high GPA.",
      issuer: "University",
      date_achieved: "2024-05-30",
      achievement_type: "academic" as const
    }
  ];

  const sampleConnections = [
    {
      id: "1",
      user_id: "user1",
      full_name: "Sarah Johnson",
      headline: "Computer Science Professor | AI Researcher",
      profile_picture_url: "/api/placeholder/40/40",
      college_name: "Tech University",
      department: "Computer Science",
      mutual_connections: 5
    },
    {
      id: "2",
      user_id: "user2",
      full_name: "Alex Chen",
      headline: "Software Engineering Student | Full Stack Developer",
      profile_picture_url: "/api/placeholder/40/40",
      college_name: "Tech University",
      department: "Computer Science",
      mutual_connections: 12
    }
  ];

  useEffect(() => {
    if (profileUserId) {
      fetchProfileData();
    }
  }, [profileUserId]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      
      // For now, use sample data
      setProfile(currentUserProfile || {
        id: profileUserId,
        full_name: "John Doe",
        headline: "Computer Science Student | Aspiring Software Engineer",
        bio: "Passionate about technology and innovation. Currently pursuing Computer Science with a focus on AI and machine learning. Love building projects that solve real-world problems.",
        location: "San Francisco, CA",
        college_name: "Tech University",
        department: "Computer Science",
        year_of_study: 3,
        verification_status: "verified",
        created_at: "2024-01-01"
      });
      
      setExperiences(sampleExperiences);
      setProjects(sampleProjects);
      setAchievements(sampleAchievements);
      setConnections(sampleConnections);
      
    } catch (error) {
      console.error('Error fetching profile data:', error);
      toast({
        title: "Error",
        description: "Failed to load profile data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    toast({
      title: "Connection Request Sent",
      description: "Your connection request has been sent successfully."
    });
  };

  const handleMessage = () => {
    toast({
      title: "Message",
      description: "Messaging feature coming soon!"
    });
  };

  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "Profile editing feature coming soon!"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <ThemeToggle />
        <div className="container py-8">
          <div className="text-center">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeToggle />
      
      <main className="container py-8 space-y-8">
        {/* Profile Header */}
        <ProfileHeader
          profile={profile}
          isOwnProfile={isOwnProfile}
          connectionStatus="none"
          onConnect={handleConnect}
          onMessage={handleMessage}
          onEdit={handleEditProfile}
        />

        {/* Profile Content Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="space-y-6">
            <AchievementsSection
              achievements={achievements}
              isOwnProfile={isOwnProfile}
            />
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <ExperienceSection
              experiences={experiences}
              isOwnProfile={isOwnProfile}
            />
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <ProjectsSection
              projects={projects}
              isOwnProfile={isOwnProfile}
            />
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <SkillsSection
              skills={["React", "TypeScript", "Node.js", "Python", "Machine Learning", "AWS", "Git", "Agile"]}
              isOwnProfile={isOwnProfile}
            />
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <ConnectionsSection
              connections={connections}
              pendingRequests={pendingRequests}
              sentRequests={sentRequests}
              isOwnProfile={isOwnProfile}
            />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
