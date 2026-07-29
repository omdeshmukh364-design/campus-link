import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { OpportunitiesBoard } from "@/components/opportunities/OpportunitiesBoard";
import { useAuth } from "@/hooks/useAuth";
import ThemeToggle from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";

export default function OpportunitiesPage() {
  const { userRole } = useAuth();
  const { toast } = useToast();

  // Sample opportunities data
  const sampleOpportunities = [
    {
      id: "1",
      title: "Software Engineering Intern",
      description: "Join our dynamic team to work on cutting-edge web applications. You'll collaborate with senior developers, participate in code reviews, and contribute to real-world projects that impact thousands of users.",
      opportunity_type: "internship" as const,
      company_organization: "Tech Innovators Inc.",
      location: "San Francisco, CA",
      is_remote: false,
      requirements: [
        "Currently pursuing Computer Science or related degree",
        "Strong programming fundamentals",
        "Experience with web technologies"
      ],
      skills_required: ["JavaScript", "React", "Node.js", "Git"],
      application_deadline: "2024-12-31",
      application_url: "https://techinnovators.com/apply",
      salary_range: "$25-30/hour",
      created_at: "2024-11-01",
      creator: {
        name: "Sarah Johnson",
        avatar: "/api/placeholder/40/40",
        title: "Senior Engineering Manager"
      }
    },
    {
      id: "2",
      title: "AI Research Assistant",
      description: "Exciting opportunity to work on machine learning research projects in natural language processing. Perfect for students interested in pursuing graduate studies in AI.",
      opportunity_type: "research" as const,
      company_organization: "University AI Lab",
      location: "Campus",
      is_remote: true,
      requirements: [
        "Strong background in mathematics and statistics",
        "Experience with Python and ML libraries",
        "Interest in NLP research"
      ],
      skills_required: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "NLP"],
      application_deadline: "2024-12-15",
      salary_range: "$20/hour",
      created_at: "2024-10-28",
      creator: {
        name: "Dr. Michael Chen",
        avatar: "/api/placeholder/40/40",
        title: "AI Research Professor"
      }
    },
    {
      id: "3",
      title: "Hackathon 2024: Build the Future",
      description: "48-hour hackathon focused on sustainability and climate change solutions. Win prizes up to $10,000 and get mentorship from industry leaders.",
      opportunity_type: "competition" as const,
      company_organization: "Green Tech Society",
      location: "Innovation Hub",
      is_remote: false,
      requirements: [
        "Teams of 2-4 students",
        "Focus on sustainability themes",
        "Present working prototype"
      ],
      skills_required: ["Programming", "Design", "Presentation"],
      application_deadline: "2024-11-30",
      created_at: "2024-10-25",
      creator: {
        name: "Alex Rivera",
        avatar: "/api/placeholder/40/40",
        title: "Green Tech Society President"
      }
    },
    {
      id: "4",
      title: "Full Stack Developer",
      description: "Join our startup as a full-time developer. Work on exciting projects, learn from experienced mentors, and help build products that make a difference.",
      opportunity_type: "job" as const,
      company_organization: "StartupXYZ",
      location: "Remote",
      is_remote: true,
      requirements: [
        "Bachelor's degree in Computer Science or equivalent experience",
        "2+ years of web development experience",
        "Strong problem-solving skills"
      ],
      skills_required: ["React", "Node.js", "PostgreSQL", "AWS", "TypeScript"],
      application_deadline: "2024-12-20",
      salary_range: "$80,000 - $120,000",
      created_at: "2024-10-30",
      creator: {
        name: "Emma Thompson",
        avatar: "/api/placeholder/40/40",
        title: "CTO"
      }
    },
    {
      id: "5",
      title: "Mobile App Development Project",
      description: "Collaborate with a team to build a mobile app for local businesses. Great opportunity to gain real-world experience and build your portfolio.",
      opportunity_type: "project" as const,
      company_organization: "Community Tech Initiative",
      location: "Local Community Center",
      is_remote: false,
      requirements: [
        "Interest in mobile development",
        "Ability to work in teams",
        "Commitment for 3-month project"
      ],
      skills_required: ["React Native", "JavaScript", "UI/UX Design"],
      application_deadline: "2024-11-25",
      created_at: "2024-10-20",
      creator: {
        name: "David Park",
        avatar: "/api/placeholder/40/40",
        title: "Community Tech Coordinator"
      }
    }
  ];

  const canCreateOpportunity = userRole === 'faculty' || userRole === 'admin';

  const handleCreateOpportunity = () => {
    toast({
      title: "Create Opportunity",
      description: "Opportunity creation feature coming soon!"
    });
  };

  const handleApply = (opportunityId: string) => {
    const opportunity = sampleOpportunities.find(o => o.id === opportunityId);
    if (opportunity?.application_url) {
      window.open(opportunity.application_url, '_blank');
    } else {
      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully!"
      });
    }
  };

  const handleSave = (opportunityId: string) => {
    toast({
      title: "Opportunity Saved",
      description: "This opportunity has been saved to your list."
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeToggle />
      
      <main className="container py-8">
        <OpportunitiesBoard
          opportunities={sampleOpportunities}
          canCreateOpportunity={canCreateOpportunity}
          onCreateOpportunity={handleCreateOpportunity}
          onApply={handleApply}
          onSave={handleSave}
        />
      </main>
    </div>
  );
}