import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const CTA = () => {
  const navigate = useNavigate();

  return (
    <section id="contact" className="py-20 gradient-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
          Ready to Transform Your<br />Financial Future?
        </h2>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-10">
          Join thousands of Kenyans who are improving their credit scores and unlocking financial opportunities.
        </p>
        <Button variant="cta" size="xl" onClick={() => navigate("/auth")}>
          Start Your Journey Today
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </section>
  );
};
