import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { title, quantity, unit_price } = await req.json()
    
    const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN
    
    if (!MERCADOPAGO_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Mercado Pago access token not configured' },
        { status: 500 }
      )
    }
    
    // Get base URL for callbacks
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
    
    const preference = {
      items: [
        {
          title,
          quantity,
          unit_price,
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        success: `${baseUrl}/pago-exitoso`,
        failure: `${baseUrl}/pago-fallido`,
        pending: `${baseUrl}/pago-pendiente`,
      },
      auto_return: 'approved',
      notification_url: `${baseUrl}/api/mercadopago/webhook`,
      statement_descriptor: 'BAR VIRTUAL',
      external_reference: `reserva_${Date.now()}`,
    }
    
    const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
      },
      body: JSON.stringify(preference),
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      console.error('[v0] Mercado Pago error:', data)
      return NextResponse.json(
        { error: 'Error creating payment preference' },
        { status: response.status }
      )
    }
    
    return NextResponse.json({
      id: data.id,
      init_point: data.init_point,
    })
  } catch (error) {
    console.error('[v0] Create preference error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
