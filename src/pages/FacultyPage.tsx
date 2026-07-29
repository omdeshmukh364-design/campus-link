import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Award, 
  Calendar,
  Settings,
  BarChart3,
  BookOpen,
  Shield,
  CheckCircle,
  ArrowRight,
  Search,
  Filter,
  Plus
} from "lucide-react";
import campusLinkLogo from "@/assets/campus-link-logo.png";
import ThemeToggle from "@/components/ThemeToggle";

export default function FacultyPage() {
  const [collegeSearch, setCollegeSearch] = useState("");
  
  const facultyFeatures = [
    {
      icon: <Settings className="h-8 w-8" />,
      title: "Community Management",
      description: "Full control over community approval, member management, and content moderation.",
      benefits: ["Approve/reject community requests", "Manage student memberships", "Content oversight"]
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: "Analytics & Insights",
      description: "Comprehensive analytics to track student engagement and community growth.",
      benefits: ["Student engagement metrics", "Community performance", "Activity reports"]
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Academic Integration",
      description: "Seamless integration with academic programs and curriculum planning.",
      benefits: ["Course-community links", "Academic calendar sync", "Grade integration"]
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security & Privacy",
      description: "Advanced security controls to protect student data and ensure safe interactions.",
      benefits: ["Data privacy controls", "Student safety monitoring", "Compliance reporting"]
    }
  ];

  const colleges = [
    {
      name: "Stanford University",
      students: 17249,
      communities: 150,
      engagement: 92,
      status: "Active"
    },
    {
      name: "MIT",
      students: 11520,
      communities: 120,
      engagement: 89,
      status: "Active"
    },
    {
      name: "Harvard University",
      students: 23731,
      communities: 200,
      engagement: 91,
      status: "Active"
    },
    {
      name: "UC Berkeley",
      students: 45036,
      communities: 300,
      engagement: 88,
      status: "Active"
    },
    {
      name: "Your College",
      students: 0,
      communities: 0,
      engagement: 0,
      status: "Available"
    }
  ];

  const filteredColleges = colleges.filter(college =>
    college.name.toLowerCase().includes(collegeSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle Button */}
      <ThemeToggle />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={campusLinkLogo} alt="CampusLink Logo" className="h-8 w-8 rounded-lg" />
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CampusLink
            </h1>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">Faculty Portal</Badge>
            <Link to="/auth">
              <Button variant="outline">Faculty Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button>Request Access</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-primary-foreground">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20">
                  Faculty Portal
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
                  Empower Your{" "}
                  <span className="bg-gradient-accent bg-clip-text text-transparent">
                    Institution
                  </span>
                </h1>
                <p className="text-xl opacity-90 max-w-lg">
                  Take control of student engagement and community building with our comprehensive faculty management platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button size="lg" variant="secondary" className="shadow-glow">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                  Schedule Demo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 animate-float"></div>
              <Card className="relative bg-card/90 backdrop-blur-sm shadow-premium">
                <CardHeader>
                  <CardTitle>Faculty Dashboard Preview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Active Communities</span>
                    <Badge variant="secondary">24</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pending Approvals</span>
                    <Badge variant="destructive">3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Student Engagement</span>
                    <Badge variant="default">92%</Badge>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-sm text-muted-foreground mb-2">Recent Activity</div>
                    <div className="space-y-2">
                      <div className="text-sm">Tech Club requested new member approval</div>
                      <div className="text-sm">Arts Society posted achievement</div>
                      <div className="text-sm">Sports Club scheduled event</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Faculty Tools</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage and enhance student community experiences at your institution.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {facultyFeatures.map((feature, index) => (
              <Card key={index} className="hover:shadow-premium transition-smooth">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                      {feature.icon}
                    </div>
                    <div>
                      <CardTitle>{feature.title}</CardTitle>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* College Integration Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">College Integration</h2>
            <p className="text-xl text-muted-foreground">
              Seamlessly integrate CampusLink with your institution's existing systems
            </p>
          </div>

          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search colleges..."
                value={collegeSearch}
                onChange={(e) => setCollegeSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college, index) => (
              <Card key={index} className={`hover:shadow-premium transition-smooth ${
                college.status === 'Available' ? 'border-dashed border-2 border-primary' : ''
              }`}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{college.name}</CardTitle>
                    <Badge variant={college.status === 'Active' ? 'default' : 'secondary'}>
                      {college.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {college.status === 'Active' ? (
                    <>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Students</div>
                          <div className="font-medium">{college.students.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Communities</div>
                          <div className="font-medium">{college.communities}</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Engagement Rate</span>
                          <span className="font-medium">{college.engagement}%</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-smooth" 
                            style={{ width: `${college.engagement}%` }}
                          ></div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <Plus className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground mb-4">
                        Ready to integrate CampusLink with your institution?
                      </p>
                      <Button>Request Integration</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="container">
          <div className="text-center text-primary-foreground">
            <h2 className="text-4xl font-bold mb-6">Ready to Enhance Student Engagement?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join leading universities in creating meaningful student communities with CampusLink's faculty tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="shadow-glow">
                  Faculty Access
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/50 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={campusLinkLogo} alt="CampusLink Logo" className="h-6 w-6 rounded" />
                <span className="font-bold">CampusLink</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Empowering educational institutions with next-generation community tools.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Faculty Tools</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Community Management</div>
                <div>Analytics Dashboard</div>
                <div>Student Oversight</div>
                <div>Compliance Tools</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Faculty Help Center</div>
                <div>Training Resources</div>
                <div>Technical Support</div>
                <div>Integration Guide</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>faculty@campuslink.edu</div>
                <div>1-800-CAMPUS</div>
                <div>Schedule Consultation</div>
                <div>Request Demo</div>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CampusLink Faculty Portal. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}