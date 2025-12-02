import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Format phone number to 254 format
function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\s/g, '').replace(/[^0-9]/g, '');
  
  if (cleaned.startsWith('0')) {
    return '254' + cleaned.slice(1);
  }
  if (cleaned.startsWith('+254')) {
    return cleaned.slice(1);
  }
  if (cleaned.startsWith('254')) {
    return cleaned;
  }
  return cleaned;
}

// Validate Kenyan phone number
function isValidKenyanPhone(phone: string): boolean {
  const formatted = formatPhoneNumber(phone);
  return /^254[17]\d{8}$/.test(formatted);
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone, amount, bundleName } = await req.json();

    console.log('Received payment request:', { phone, amount, bundleName });

    // Validate inputs
    if (!phone || !amount || !bundleName) {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing required fields: phone, amount, bundleName' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!isValidKenyanPhone(phone)) {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid Kenyan phone number format. Use format: 07XXXXXXXX or 254XXXXXXXXX' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (amount < 10) {
      return new Response(
        JSON.stringify({ success: false, error: 'Minimum amount is KES 10' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const formattedPhone = formatPhoneNumber(phone);
    const apiKey = Deno.env.get('LIPANA_API_KEY');

    if (!apiKey) {
      console.error('LIPANA_API_KEY not configured');
      return new Response(
        JSON.stringify({ success: false, error: 'Payment service not configured. Please contact support.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    console.log('Calling Lipana API with:', { phone: formattedPhone, amount, bundleName });

    // Call Lipana STK Push API
    // Using x-api-key header as per Lipana documentation
    const response = await fetch('https://api.lipana.dev/v1/transactions/push-stk', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        phone: formattedPhone,
        amount: Number(amount),
        bundleName: bundleName,
      }),
    });

    const data = await response.json();
    console.log('Lipana API response:', data);

    if (!response.ok) {
      console.error('Lipana API error:', data);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: data.message || data.error || 'Payment initiation failed. Please try again.' 
        }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Store payment record in database
    const { error: dbError } = await supabase.from('payments').insert({
      phone: formattedPhone,
      amount: Number(amount),
      bundle_name: bundleName,
      transaction_id: data.transactionId,
      checkout_request_id: data.checkoutRequestID,
      status: 'pending',
    });

    if (dbError) {
      console.error('Database insert error:', dbError);
      // Don't fail the request, payment was initiated successfully
    }

    return new Response(
      JSON.stringify({
        success: true,
        transactionId: data.transactionId,
        checkoutRequestID: data.checkoutRequestID,
        message: 'STK push sent successfully. Please check your phone and enter your M-PESA PIN.',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in initiate-payment function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
