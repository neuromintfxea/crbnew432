import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Phone, X, Loader2, CheckCircle2, XCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  onSubmit: () => void;
  bundleName?: string;
}

type PaymentStatus = "idle" | "initiating" | "pending" | "completed" | "failed";

export const PaymentModal = ({ isOpen, onClose, amount, onSubmit, bundleName = "CRB Report" }: PaymentModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [checkoutRequestID, setCheckoutRequestID] = useState<string | null>(null);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup polling on unmount or close
  useEffect(() => {
    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, []);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
      setPaymentStatus("idle");
      setCheckoutRequestID(null);
      setError("");
    }
  }, [isOpen]);

  const checkPaymentStatus = async (requestId: string) => {
    try {
      const { data, error: fnError } = await supabase.functions.invoke("check-payment-status", {
        body: { checkoutRequestID: requestId },
      });

      if (fnError || !data.success) {
        console.log("Status check:", data?.payment?.status || "pending");
        return;
      }

      if (data.payment.status === "completed") {
        setPaymentStatus("completed");
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
        toast({
          title: "Payment Successful!",
          description: `Receipt: ${data.payment.mpesaReceiptNumber}`,
        });
        setTimeout(() => {
          onSubmit();
        }, 2000);
      } else if (data.payment.status === "failed") {
        setPaymentStatus("failed");
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
        }
        toast({
          title: "Payment Failed",
          description: data.payment.resultDesc || "The payment was not completed.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error checking payment status:", err);
    }
  };

  const handleSubmit = async () => {
    if (!phoneNumber.trim()) {
      setError("Phone number is required");
      return;
    }
    
    const cleanedPhone = phoneNumber.replace(/\s/g, "");
    if (!/^(07|01|\+254|254)\d{8,9}$/.test(cleanedPhone)) {
      setError("Enter a valid M-PESA phone number (e.g., 0712345678)");
      return;
    }
    
    setError("");
    setPaymentStatus("initiating");

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

      setCheckoutRequestID(data.checkoutRequestID);
      setPaymentStatus("pending");

      toast({
        title: "STK Push Sent",
        description: "Check your phone and enter your M-PESA PIN to complete payment.",
      });

      // Start polling for payment status
      pollIntervalRef.current = setInterval(() => {
        checkPaymentStatus(data.checkoutRequestID);
      }, 5000);

      // Stop polling after 2 minutes
      setTimeout(() => {
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          if (paymentStatus === "pending") {
            setPaymentStatus("failed");
            toast({
              title: "Payment Timeout",
              description: "Payment was not completed within the expected time.",
              variant: "destructive",
            });
          }
        }
      }, 120000);

    } catch (err: any) {
      console.error("Payment error:", err);
      setPaymentStatus("idle");
      toast({
        title: "Payment Failed",
        description: err.message || "Failed to initiate payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRetry = () => {
    setPaymentStatus("idle");
    setCheckoutRequestID(null);
    setError("");
  };

  const renderContent = () => {
    if (paymentStatus === "pending") {
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Clock className="w-8 h-8 text-primary animate-pulse" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Waiting for Payment</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Please check your phone and enter your M-PESA PIN to complete the payment.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            Checking payment status...
          </div>
        </div>
      );
    }

    if (paymentStatus === "completed") {
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-green-700 mb-2">Payment Successful!</h3>
          <p className="text-muted-foreground text-sm">
            Your payment has been received. Redirecting...
          </p>
        </div>
      );
    }

    if (paymentStatus === "failed") {
      return (
        <div className="text-center py-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-red-700 mb-2">Payment Failed</h3>
          <p className="text-muted-foreground text-sm mb-4">
            The payment was not completed. Please try again.
          </p>
          <Button variant="hero" onClick={handleRetry}>
            Try Again
          </Button>
        </div>
      );
    }

    return (
      <>
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
              disabled={paymentStatus === "initiating"}
            />
            <p className="text-xs text-muted-foreground">
              Enter your M-PESA registered phone number (Safaricom)
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

          <Button 
            variant="hero" 
            className="w-full" 
            onClick={handleSubmit} 
            disabled={paymentStatus === "initiating"}
          >
            {paymentStatus === "initiating" ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending STK Push...
              </>
            ) : (
              "Pay with M-PESA"
            )}
          </Button>
        </div>
      </>
    );
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
          <DialogTitle className="text-xl font-bold">
            {paymentStatus === "completed" ? "Payment Complete" : 
             paymentStatus === "failed" ? "Payment Failed" :
             paymentStatus === "pending" ? "Processing Payment" : "Complete Payment"}
          </DialogTitle>
        </DialogHeader>

        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};
