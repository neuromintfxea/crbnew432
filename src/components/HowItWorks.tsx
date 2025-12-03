import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    number: 1,
    title: "Create Account",
    description: "Sign up in minutes with your basic information and ID details.",
  },
  {
    number: 2,
    title: "Choose Plan",
    description: "Select the subscription plan that best fits your needs.",
  },
  {
    number: 3,
    title: "Verify Identity",
    description: "Complete the secure KYC process for account verification.",
  },
  {
    number: 4,
    title: "Get Results",
    description: "Instantly access your CRB status and credit insights.",
  },
];

export const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span>📋</span>
            <span className="text-sm font-medium text-primary">Simple Process</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to transform your financial future and unlock borrowing opportunities.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-16 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full"></div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center relative">
                <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl gradient-primary flex items-center justify-center shadow-soft">
                  <span className="font-display text-2xl font-bold text-primary-foreground">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" onClick={() => navigate("/auth")}>
            Start Your Journey
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
