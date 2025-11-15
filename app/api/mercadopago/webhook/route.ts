import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    
    console.log('[v0] Mercado Pago webhook received:', body)
    
    // Verify webhook authenticity (recommended in production)
    // You should verify the x-signature header
    
    if (body.type === 'payment') {
      const paymentId = body.data.id
      
      // Fetch payment details
      const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN
      
      if (!MERCADOPAGO_ACCESS_TOKEN) {
        return NextResponse.json({ error: 'Access token not configured' }, { status: 500 })
      }
      
      const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        },
      })
      
      const payment = await response.json()
      
      console.log('[v0] Payment details:', payment)
      
      // Here you can:
      // 1. Store payment in database
      // 2. Send confirmation emails
      // 3. Update reservation status
      
      if (payment.status === 'approved') {
        // Payment approved - proceed with reservation
        console.log('[v0] Payment approved:', payment.external_reference)
      }
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[v0] Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing error' }, { status: 500 })
  }
}
