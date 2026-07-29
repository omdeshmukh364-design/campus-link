import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { CommunityProfile } from "@/components/community/CommunityProfile";
import { useAuth } from "@/hooks/useAuth";
import ThemeToggle from "@/components/ThemeToggle";
import { useToast } from "@/hooks/use-toast";

export default function CommunityDetail() {
  const { id } = useParams();
  const { userRole } = useAuth();
  const { toast } = useToast();
  const [membershipStatus, setMembershipStatus] = useState<'none' | 'pending' | 'member' | 'admin'>('none');

  // Sample community data with Instagram-style features
  const community = {
    id: id || "1",
    name: "Tech Innovators Society",
    description: "Building the future through technology. Join us for hackathons, workshops, and networking with industry leaders. We focus on cutting-edge technologies like AI, blockchain, and web development. Our community is dedicated to fostering innovation and collaboration among students passionate about technology.",
    category: "Technology",
    cover_image_url: "/api/placeholder/800/300",
    logo_url: "/api/placeholder/200/200",
    website_url: "https://techinnovators.edu",
    social_links: {
      instagram: "https://instagram.com/techinnovators",
      twitter: "https://twitter.com/techinnovators",
      linkedin: "https://linkedin.com/company/techinnovators",
      github: "https://github.com/techinnovators"
    },
    location: "Computer Science Building, Room 201",
    meeting_schedule: "Every Tuesday 6:00 PM",
    tags: ["AI", "WebDev", "Hackathons", "Innovation", "Networking", "MachineLearning"],
    member_count: 1250,
    is_verified: true,
    created_at: "2020-09-01T00:00:00Z"
  };

  const handleJoin = () => {
    if (membershipStatus === 'none') {
      setMembershipStatus('pending');
      toast({
        title: "Join Request Sent",
        description: "Your request to join the community has been sent for approval."
      });
    }
  };

  const handleMessage = () => {
    toast({
      title: "Message Community",
      description: "Community messaging feature coming soon!"
    });
  };

  const handleEdit = () => {
    toast({
      title: "Edit Community",
      description: "Community editing feature coming soon!"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ThemeToggle />
      
      <main className="container py-8">
        <CommunityProfile
          community={community}
          membershipStatus={membershipStatus}
          isOwner={false}
          onJoin={handleJoin}
          onMessage={handleMessage}
          onEdit={handleEdit}
        />
      </main>
    </div>
  );
}
