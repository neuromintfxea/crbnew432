import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Building2, 
  Home, 
  Briefcase, 
  BarChart3, 
  Scale 
} from "lucide-react";
import { ProcessingModal } from "@/components/ProcessingModal";
import { PricingModal } from "@/components/PricingModal";
import { PaymentModal } from "@/components/PaymentModal";

const purposes = [
  { id: "loan", label: "Loan Application", icon: CreditCard },
  { id: "employment", label: "Employment", icon: Building2 },
  { id: "housing", label: "Housing/Rental", icon: Home },
  { id: "business", label: "Business", icon: Briefcase },
  { id: "personal", label: "Personal Review", icon: BarChart3 },
  { id: "legal", label: "Legal Matters", icon: Scale },
];

export const ReportPurpose = () => {
  const navigate = useNavigate();
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [showProcessing, setShowProcessing] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<"standard" | "gold">("standard");
  const [selectedPrice, setSelectedPrice] = useState(105);
  const [userData, setUserData] = useState({ name: "USER", nationalId: "00000000" });

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  const handleGetReport = () => {
    setShowProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setShowProcessing(false);
      setShowPricing(true);
    }, 3000);
  };

  const handleSelectPlan = (plan: "standard" | "gold", price: number) => {
    setSelectedPlan(plan);
    setSelectedPrice(price);
    setShowPricing(false);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    // Navigate to credit score results page
    navigate("/credit-score", { state: { plan: selectedPlan } });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showDashboard />
      <main className="flex-1 gradient-soft pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-3">
              Select Report Purpose
            </h1>
            <p className="text-muted-foreground">
              Choose the main reason why you need your CRB report
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {purposes.map((purpose) => {
              const Icon = purpose.icon;
              const isSelected = selectedPurpose === purpose.id;
              
              return (
                <div
                  key={purpose.id}
                  onClick={() => setSelectedPurpose(purpose.id)}
                  className={`
                    bg-card rounded-xl p-6 cursor-pointer transition-all duration-200
                    border-2 hover:shadow-lg
                    ${isSelected 
                      ? "border-primary shadow-lg" 
                      : "border-transparent hover:border-primary/30"
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-12 h-12 rounded-xl flex items-center justify-center
                      ${isSelected ? "bg-primary/10" : "bg-secondary"}
                    `}>
                      <Icon className={`w-6 h-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <span className="font-semibold text-foreground">{purpose.label}</span>
                  </div>
                  
                  {isSelected && (
                    <Button 
                      variant="hero" 
                      className="w-full mt-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGetReport();
                      }}
                    >
                      Get Your Report Now
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />

      <ProcessingModal isOpen={showProcessing} />
      
      <PricingModal 
        isOpen={showPricing}
        onClose={() => setShowPricing(false)}
        userData={userData}
        onSelectPlan={handleSelectPlan}
      />
      
      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        amount={selectedPrice}
        onSubmit={handlePaymentComplete}
        bundleName={selectedPlan === "standard" ? "CRB Standard Report" : "CRB Gold Report"}
      />
    </div>
  );
};

export default ReportPurpose;
