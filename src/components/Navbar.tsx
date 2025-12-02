import { Button } from "@/components/ui/button";
import { Shield, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  showDashboard?: boolean;
}

export const Navbar = ({ showDashboard }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-primary-foreground text-lg">
              MetroCheck CRB Checker
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-primary-foreground/80 hover:text-primary-foreground transition-colors rounded-lg hover:bg-primary-foreground/10"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {showDashboard ? (
              <Button variant="ghost" size="sm" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button variant="hero" size="sm" onClick={() => navigate("/auth")}>
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-primary-foreground/10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block px-4 py-3 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {!showDashboard && (
              <div className="flex gap-3 mt-4 px-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex-1 text-primary-foreground/80 border border-primary-foreground/20"
                  onClick={() => { setIsOpen(false); navigate("/login"); }}
                >
                  Login
                </Button>
                <Button 
                  variant="hero" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => { setIsOpen(false); navigate("/auth"); }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
