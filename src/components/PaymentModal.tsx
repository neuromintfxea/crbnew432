import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSubmit: () => void;
  bundleName?: string;
}

export const PaymentModal = ({ isOpen, onClose, amount, onSubmit, bundleName = "CRB Report" }: PaymentModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!phoneNumber.trim()) {
      setError("Phone number is required");
      return;
    }
    
    const cleanedPhone = phoneNumber.replace(/\s/g, "");
    if (!/^(07|01|\+254|254)\d{8,9}$/.test(cleanedPhone)) {
      setError("Enter a valid M-PESA phone number");
      return;
    }
    
    setError("");
    setIsLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("initiate-payment", {
        body: {
          phone: cleanedPhone,
          amount: amount,
          bundleName: bundleName,
        },
      });

      if (fnError) {
        throw new Error(fnError.message);
      }

      if (!data.success) {
        throw new Error(data.error || "Payment initiation failed");
      }

      toast({
        title: "STK Push Sent",
        description: "Check your phone and enter your M-PESA PIN to complete payment.",
      });
      
      onSubmit();
    } catch (err: any) {
      console.error("Payment error:", err);
      toast({
        title: "Payment Failed",
        description: err.message || "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
        
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Complete Payment</DialogTitle>
        </DialogHeader>

        <div className="bg-secondary/50 rounded-xl p-4 mb-4">
          <p className="text-sm text-muted-foreground mb-1">Payment Amount</p>
          <p className="text-2xl font-bold text-primary">KES {amount}</p>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your M-PESA phone number below. You will receive an STK push prompt on your phone to complete the payment.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mpesa" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              M-PESA Phone Number
            </Label>
            <Input
              id="mpesa"
              placeholder="0712345678"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                setError("");
              }}
              className={error ? "border-destructive" : ""}
            />
            <p className="text-xs text-muted-foreground">
              Enter your M-PESA registered phone number
            </p>
            {error && <p className="text-xs text-destructive">{error}</p>}
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <p className="font-semibold text-sm text-foreground mb-2">What happens next:</p>
            <ol className="text-sm text-muted-foreground space-y-1">
              <li>1. You'll receive an STK push on your phone</li>
              <li>2. Enter your M-PESA PIN to confirm</li>
              <li>3. Payment will be verified automatically</li>
              <li>4. You'll get instant access to your report</li>
            </ol>
          </div>

          <Button variant="hero" className="w-full" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              "Pay with M-PESA"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
