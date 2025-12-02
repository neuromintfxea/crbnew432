import { Shield, Facebook, Twitter, Instagram, MessageCircle, Mail } from "lucide-react";

const quickLinks = ["Home", "Features", "Reviews", "FAQ", "Terms & Conditions"];
const services = ["CRB Status Check", "Credit Score", "Detailed Credit Report", "Credit Repair"];

export const Footer = () => {
  return (
    <footer className="bg-navy text-primary-foreground/80 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-primary-foreground text-lg">
                MetroCheck CRB Checker
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Kenya's leading CRB status verification platform. Get your credit report and improve your financial standing.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm hover:text-primary-foreground transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a href="#" className="text-sm hover:text-primary-foreground transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-primary"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-primary-foreground mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-colors text-sm"
              >
                <MessageCircle className="w-4 h-4 text-primary" />
                Send us a message
              </a>
              <a
                href="mailto:support@metropolcrb.co.ke"
                className="flex items-center gap-3 px-4 py-2.5 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg transition-colors text-sm"
              >
                <Mail className="w-4 h-4 text-primary" />
                support@metropolcrb.co.ke
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary-foreground/10 text-center text-sm">
          <p>© 2025 MetroCheck CRB Checker. All rights reserved. <a href="#" className="underline hover:text-primary-foreground">Terms & Conditions</a> | <a href="#" className="underline hover:text-primary-foreground">Privacy Policy</a></p>
        </div>
      </div>
    </footer>
  );
};
