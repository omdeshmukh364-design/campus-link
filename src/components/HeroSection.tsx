import { ArrowRight, Users, Award, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-campus.jpg";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div className="container py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-primary-foreground">
                Connect. Grow.{" "}
                <span className="bg-gradient-accent bg-clip-text text-transparent animate-pulse-subtle">
                  Achieve.
                </span>
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-lg">
                Bridge the gap between students and communities. Discover opportunities, 
                showcase your skills, and build lasting connections in your college ecosystem.
              </p>
            </div>

            {/* Reach Out Button - moved and aligned */}
            <div className="flex justify-start mt-6">
              <Button
                asChild
                size="lg"
                variant="secondary"
                className="shadow-glow"
              >
                <a href="mailto:sahil.hirawe24@pcu.edu.in">
                  Reach Out: sahil.hirawe24@pcu.edu.in
                </a>
              </Button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="group shadow-glow">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-smooth group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">
                Explore Communities
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-primary rounded-3xl blur-3xl opacity-20 animate-float"></div>
            <img
              src={heroImage}
              alt="Students collaborating in college campus"
              className="relative rounded-3xl shadow-premium animate-float"
              style={{ animationDelay: '1s' }}
            />
            
            {/* Floating Cards */}
            <div className="absolute -top-6 -right-6 bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-premium animate-float" style={{ animationDelay: '2s' }}>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full animate-pulse-subtle"></div>
                <span className="text-sm font-medium">250 Communities Active</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 bg-card/90 backdrop-blur-sm rounded-xl p-4 shadow-premium animate-float" style={{ animationDelay: '3s' }}>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">95%</div>
                <div className="text-xs text-muted-foreground">Student Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px] opacity-20"></div>
    </section>
  );
}

export default HeroSection;