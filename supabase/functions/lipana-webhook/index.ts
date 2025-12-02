import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    console.log('Received Lipana webhook payload:', JSON.stringify(payload, null, 2));

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Extract relevant fields from Lipana callback
    const {
      checkoutRequestID,
      transactionId,
      resultCode,
      resultDesc,
      mpesaReceiptNumber,
      amount,
      phone,
    } = payload;

    // Determine payment status based on result code
    // ResultCode 0 means success
    const status = resultCode === 0 || resultCode === '0' ? 'completed' : 'failed';

    console.log('Updating payment record:', { checkoutRequestID, status, resultCode });

    // Update payment record in database
    const { data, error: dbError } = await supabase
      .from('payments')
      .update({
        status,
        result_code: String(resultCode),
        result_desc: resultDesc,
        mpesa_receipt_number: mpesaReceiptNumber,
      })
      .eq('checkout_request_id', checkoutRequestID)
      .select();

    if (dbError) {
      console.error('Database update error:', dbError);
      return new Response(
        JSON.stringify({ success: false, error: 'Failed to update payment record' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Payment record updated successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Webhook processed successfully',
        status,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in lipana-webhook function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
