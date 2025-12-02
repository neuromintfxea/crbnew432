-- Create payments table to store M-Pesa transactions
CREATE TABLE public.payments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone VARCHAR(15) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  bundle_name VARCHAR(255) NOT NULL,
  transaction_id VARCHAR(100),
  checkout_request_id VARCHAR(100),
  status VARCHAR(50) NOT NULL DEFAULT 'pending',
  mpesa_receipt_number VARCHAR(100),
  result_code VARCHAR(10),
  result_desc TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert payments (since no auth required for payment initiation)
CREATE POLICY "Anyone can create payments" 
ON public.payments 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading payments (for webhook updates and status checks)
CREATE POLICY "Anyone can read payments" 
ON public.payments 
FOR SELECT 
USING (true);

-- Create policy to allow updates (for webhook callback updates)
CREATE POLICY "Anyone can update payments" 
ON public.payments 
FOR UPDATE 
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_payments_checkout_request_id ON public.payments(checkout_request_id);
CREATE INDEX idx_payments_transaction_id ON public.payments(transaction_id);
CREATE INDEX idx_payments_phone ON public.payments(phone);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_payments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_payments_updated_at
BEFORE UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION public.update_payments_updated_at();