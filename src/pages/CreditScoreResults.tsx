import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  Lightbulb,
  CreditCard,
  Calendar,
  Shield,
  Download,
  ArrowLeft
} from "lucide-react";

interface CreditTip {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  icon: typeof TrendingUp;
}

const tips: CreditTip[] = [
  {
    id: "1",
    title: "Pay Bills On Time",
    description: "Payment history accounts for 35% of your credit score. Set up automatic payments or reminders to never miss a due date.",
    impact: "high",
    icon: Calendar,
  },
  {
    id: "2",
    title: "Keep Credit Utilization Low",
    description: "Try to use less than 30% of your available credit. High utilization signals financial stress to lenders.",
    impact: "high",
    icon: CreditCard,
  },
  {
    id: "3",
    title: "Don't Close Old Accounts",
    description: "Length of credit history matters. Keep old accounts open even if you don't use them frequently.",
    impact: "medium",
    icon: Shield,
  },
  {
    id: "4",
    title: "Limit New Credit Applications",
    description: "Each application creates a hard inquiry. Too many in a short period can lower your score.",
    impact: "medium",
    icon: AlertTriangle,
  },
  {
    id: "5",
    title: "Diversify Credit Types",
    description: "A mix of credit cards, loans, and other credit types shows you can manage different accounts responsibly.",
    impact: "low",
    icon: TrendingUp,
  },
];

const getScoreCategory = (score: number) => {
  if (score >= 750) return { label: "Excellent", color: "text-green-600", bg: "bg-green-100" };
  if (score >= 700) return { label: "Good", color: "text-emerald-600", bg: "bg-emerald-100" };
  if (score >= 650) return { label: "Fair", color: "text-yellow-600", bg: "bg-yellow-100" };
  if (score >= 600) return { label: "Poor", color: "text-orange-600", bg: "bg-orange-100" };
  return { label: "Very Poor", color: "text-red-600", bg: "bg-red-100" };
};

const getImpactBadge = (impact: string) => {
  switch (impact) {
    case "high":
      return <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">High Impact</span>;
    case "medium":
      return <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">Medium Impact</span>;
    default:
      return <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">Low Impact</span>;
  }
};

export const CreditScoreResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userData, setUserData] = useState({ name: "USER", nationalId: "00000000" });
  
  // Mock credit score - in production this would come from the API
  const creditScore = 685;
  const scoreCategory = getScoreCategory(creditScore);
  const plan = location.state?.plan || "standard";

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar showDashboard />
      <main className="flex-1 gradient-soft pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="mb-6"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          {/* Credit Score Card */}
          <div className="bg-card rounded-2xl shadow-lg p-8 mb-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient mb-2">
                Your Credit Report
              </h1>
              <p className="text-muted-foreground">
                Report generated for {userData.name} • ID: {userData.nationalId}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Score Circle */}
              <div className="flex flex-col items-center">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted/20"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${(creditScore / 850) * 553} 553`}
                      className="text-primary"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-foreground">{creditScore}</span>
                    <span className={`text-sm font-semibold ${scoreCategory.color}`}>
                      {scoreCategory.label}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-4">Score range: 300 - 850</p>
              </div>

              {/* Score Details */}
              <div className="space-y-4">
                <div className={`${scoreCategory.bg} rounded-xl p-4`}>
                  <div className="flex items-center gap-3 mb-2">
                    {creditScore >= 700 ? (
                      <CheckCircle2 className={`w-6 h-6 ${scoreCategory.color}`} />
                    ) : creditScore >= 600 ? (
                      <AlertTriangle className={`w-6 h-6 ${scoreCategory.color}`} />
                    ) : (
                      <TrendingDown className={`w-6 h-6 ${scoreCategory.color}`} />
                    )}
                    <span className={`font-semibold ${scoreCategory.color}`}>
                      {scoreCategory.label} Credit Score
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80">
                    {creditScore >= 700
                      ? "You have a good credit standing. Keep up the excellent financial habits!"
                      : creditScore >= 600
                      ? "Your credit is fair. Follow our tips below to improve your score."
                      : "Your credit needs attention. Focus on the high-impact tips to improve."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Report Type</p>
                    <p className="font-semibold capitalize">{plan} Report</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-sm text-muted-foreground">Generated</p>
                    <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Report (PDF)
                </Button>
              </div>
            </div>
          </div>

          {/* Credit Tips Section */}
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Tips to Improve Your Score</h2>
                <p className="text-muted-foreground">Follow these recommendations to boost your credit rating</p>
              </div>
            </div>

            <div className="space-y-4">
              {tips.map((tip) => {
                const Icon = tip.icon;
                return (
                  <div
                    key={tip.id}
                    className="bg-card rounded-xl p-5 border border-border hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{tip.title}</h3>
                          {getImpactBadge(tip.impact)}
                        </div>
                        <p className="text-sm text-muted-foreground">{tip.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {plan === "gold" && (
              <div className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">Gold Member Benefits</h3>
                </div>
                <ul className="space-y-2 text-sm text-yellow-700 dark:text-yellow-300">
                  <li>✓ Detailed credit history analysis</li>
                  <li>✓ Personalized improvement roadmap</li>
                  <li>✓ 24/7 credit monitoring alerts</li>
                  <li>✓ Identity theft protection tips</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreditScoreResults;
