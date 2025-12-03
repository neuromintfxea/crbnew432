import { Shield, FileCheck, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Shield,
    title: "Instant CRB Verification",
    description: "Get your CRB status verification instantly without the hassle of physical visits or long waits.",
    color: "bg-feature-blue",
  },
  {
    icon: FileCheck,
    title: "CRB Blacklist Clearance",
    description: "Get expert assistance to help you remove and clear your name from CRB blacklists through our specialized dispute resolution service.",
    color: "bg-feature-cyan",
  },
  {
    icon: Wallet,
    title: "Express Loan Connections",
    description: "Connect directly with our partnered lending platforms that can issue loans to you immediately based on your improved credit status.",
    color: "bg-feature-indigo",
  },
];

export const Features = () => {
  const navigate = useNavigate();

  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span>✨</span>
            <span className="text-sm font-medium text-primary">Why Choose Us</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Comprehensive Credit Solutions
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your financial journey with our cutting-edge platform designed to unlock your borrowing potential.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate("/auth")}
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
