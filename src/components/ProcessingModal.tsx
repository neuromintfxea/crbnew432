import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Shield } from "lucide-react";

interface ProcessingModalProps {
  isOpen: boolean;
}

export const ProcessingModal = ({ isOpen }: ProcessingModalProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md" hideCloseButton>
        <div className="flex flex-col items-center text-center py-6">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          
          <h2 className="font-display text-xl font-bold text-foreground mb-2">
            Generating Your CRB Report
          </h2>
          <p className="text-muted-foreground text-sm mb-6">
            Please wait while we process your report...
          </p>

          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="40"
                cy="40"
                r="36"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeDasharray={226}
                strokeDashoffset={226 - (226 * Math.min(progress, 100)) / 100}
                className="text-primary transition-all duration-200"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-semibold text-foreground">
                {Math.min(Math.round(progress), 100)}%
              </span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm mt-4">Processing...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
