import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, Crown, X } from "lucide-react";

// Generate random price within range
const getRandomPrice = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: { name: string; nationalId: string };
  onSelectPlan: (plan: "standard" | "gold", price: number) => void;
}

const standardFeatures = [
  "Credit Score Analysis",
  "Payment History Overview",
  "Credit Utilization Report",
  "Basic Recommendations",
];

const goldFeatures = [
  "All Standard Features",
  "Loan Application Matches",
  "Credit Score Simulator",
  "Personalized Improvement Plan",
  "Monthly Score Updates",
  "Direct Lender Connections",
];

export const PricingModal = ({ isOpen, onClose, userData, onSelectPlan }: PricingModalProps) => {
  const [standardPrice, setStandardPrice] = useState(105);
  const [goldPrice, setGoldPrice] = useState(156);

  useEffect(() => {
    if (isOpen) {
      setStandardPrice(getRandomPrice(100, 110));
      setGoldPrice(getRandomPrice(150, 170));
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center mb-6 pt-2">
          <h2 className="font-display text-xl font-bold text-foreground">
            Hello {userData.name}
          </h2>
          <p className="text-muted-foreground text-sm">
            ID Number: {userData.nationalId}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Standard Plan */}
          <div className="border border-border rounded-xl p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-lg text-foreground">Standard Report</h3>
              <p className="text-muted-foreground text-sm">Basic credit information</p>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-foreground">KES {standardPrice}</span>
              <span className="text-muted-foreground text-sm ml-2">One-time payment</span>
            </div>

            <ul className="space-y-3 mb-6">
              {standardFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              variant="hero" 
              className="w-full"
              onClick={() => onSelectPlan("standard", standardPrice)}
            >
              Select Standard →
            </Button>
          </div>

          {/* Gold Premium Plan */}
          <div className="border-2 border-primary rounded-xl p-6 relative">
            <div className="absolute -top-3 right-4">
              <span className="bg-yellow-500 text-yellow-950 text-xs font-bold px-3 py-1 rounded-full">
                RECOMMENDED
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-lg text-foreground">Gold Premium</h3>
              </div>
              <p className="text-muted-foreground text-sm">Enhanced credit insights</p>
            </div>
            
            <div className="mb-6">
              <span className="text-3xl font-bold text-foreground">KES {goldPrice}</span>
              <span className="text-muted-foreground text-sm ml-2">One-time payment</span>
            </div>

            <ul className="space-y-3 mb-6">
              {goldFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              variant="hero" 
              className="w-full"
              onClick={() => onSelectPlan("gold", goldPrice)}
            >
              Select Gold Premium →
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
