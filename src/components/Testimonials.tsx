import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Peter Kamau",
    role: "Small Business Owner",
    initials: "PK",
    content: "CRB Checker transformed my business loan journey! After clearing my listing, I secured funding for my shop expansion within just 2 weeks. Their step-by-step guidance was invaluable.",
  },
  {
    name: "Mary Wanjiku",
    role: "Bank Employee",
    initials: "MW",
    content: "As someone who works in banking, I'm impressed with CRB Checker's accuracy and speed. The platform helped me identify and resolve errors in my own listing that I wasn't even aware of!",
  },
  {
    name: "David Kiprotich",
    role: "Real Estate Agent",
    initials: "DK",
    content: "I recommend CRB Checker to all my clients looking to qualify for mortgages. Their blacklist clearance service helped me close more deals by getting my clients loan-ready.",
  },
];

export const Testimonials = () => {
  return (
    <section id="reviews" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <span>💬</span>
            <span className="text-sm font-medium text-primary">Success Stories</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who've transformed their financial futures with our platform.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-xl p-6 shadow-card border border-border hover:shadow-lg transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground italic mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-primary">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
