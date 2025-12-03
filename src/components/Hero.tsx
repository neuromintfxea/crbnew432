import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroDashboard from "@/assets/hero-dashboard.png";

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="pt-24 pb-16 gradient-soft">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-sm">🚀</span>
              <span className="text-sm font-medium text-primary">Kenya's Leading Credit Platform</span>
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Unlock Your{" "}
              <span className="text-gradient">Financial Freedom</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Transform your financial journey with instant CRB verification. Get real-time credit insights and unlock borrowing opportunities from top lending institutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>
                Start Your Credit Check
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="heroOutline" size="lg" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
                Discover Features
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2.5 gradient-primary rounded-full">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-primary-foreground/20 border-2 border-primary flex items-center justify-center"
                    >
                      <Users className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                  ))}
                </div>
                <span className="text-primary-foreground font-semibold text-sm ml-1">
                  <span className="text-yellow-300">11,180+</span> Kenyans checked their CRB status this week
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-slide-in-right" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              <div className="absolute inset-0 gradient-primary opacity-20 blur-3xl rounded-3xl"></div>
              <div className="relative bg-card rounded-2xl shadow-card overflow-hidden border border-border">
                <img
                  src={heroDashboard}
                  alt="CRB Status Dashboard showing credit score and financial insights"
                  className="w-full h-auto"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-6">
                  <p className="text-primary-foreground font-semibold text-center">
                    Stay Updated, Access Your CRB Status Today
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
