import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ThemeToggle from "@/components/ThemeToggle";
import HeroSection from "@/components/HeroSection";
import { 
  Users, 
  Award, 
  Globe, 
  Shield, 
  Zap, 
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles,
  BookOpen,
  Network,
  TrendingUp,
  Heart,
  MessageCircle,
  Camera,
  Briefcase
} from "lucide-react";
import campusLinkLogo from "@/assets/campus-link-logo.png";

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Building",
      description: "Connect students with clubs and communities that match their interests and goals."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Platform",
      description: "Advanced security measures prevent fake accounts and ensure authentic connections."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Real-time Updates",
      description: "Stay updated with instant notifications about events, opportunities, and community activities."
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Smart Matching",
      description: "AI-powered recommendations help students find the perfect communities for their interests."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Theme Toggle Button */}
      <ThemeToggle />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={campusLinkLogo} alt="CampusLink Logo" className="h-8 w-8 rounded-lg" />
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              CampusLink
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/faculty">
              <Button variant="ghost">Faculty Portal</Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose CampusLink?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of college community engagement with our cutting-edge platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-smooth hover:shadow-premium ${
                  activeFeature === index ? 'border-primary shadow-premium' : ''
                }`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4 mx-auto">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-center">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Security & Privacy First</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Your safety is our top priority. We've implemented enterprise-grade security 
                measures to protect your data and prevent fake accounts.
              </p>
              
              <div className="space-y-4">
                {[
                  "End-to-end encryption for all communications",
                  "Multi-factor authentication for account security",
                  "Advanced AI-powered fake account detection",
                  "GDPR compliant data protection",
                  "Real-time security monitoring"
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20"></div>
              <Card className="relative bg-gradient-card shadow-premium">
                <CardContent className="p-8">
                  <div className="text-center">
                    <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">99.9% Uptime</h3>
                    <p className="text-muted-foreground mb-6">
                      Reliable platform with enterprise-grade infrastructure
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">256-bit</div>
                        <div className="text-sm text-muted-foreground">SSL Encryption</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">24/7</div>
                        <div className="text-sm text-muted-foreground">Security Monitoring</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero">
        <div className="container">
          <div className="text-center text-primary-foreground">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your College Experience?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Build meaningful connections and join vibrant communities on CampusLink.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="shadow-glow">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/faculty">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  Faculty Portal
                </Button>
              </Link>
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
                Connecting students and communities for a brighter future.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Platform</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Communities</div>
                <div>Events</div>
                <div>Networking</div>
                <div>Resources</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Help Center</div>
                <div>Contact Us</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Twitter</div>
                <div>LinkedIn</div>
                <div>Facebook</div>
                <div>Instagram</div>
              </div>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 CampusLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}