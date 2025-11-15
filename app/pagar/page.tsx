'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { CheckCircle, XCircle } from 'lucide-react'

export default function PagarPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    createPayment()
  }, [])

  const createPayment = async () => {
    try {
      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Seña de Reserva - Bar Virtual',
          quantity: 1,
          unit_price: 10,
        }),
      })

      const data = await response.json()

      if (data.init_point) {
        // Redirect to Mercado Pago checkout
        window.location.href = data.init_point
      } else {
        setError('Error al crear la preferencia de pago')
        setLoading(false)
      }
    } catch (err) {
      console.error('[v0] Payment creation error:', err)
      setError('Error al procesar el pago')
      setLoading(false)
    }
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
        <Card className="bg-zinc-900 border-zinc-800 p-8 max-w-md text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Error al procesar</h1>
          <p className="text-zinc-400">{error}</p>
        </Card>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
      <Card className="bg-zinc-900 border-zinc-800 p-8 max-w-md text-center">
        <Spinner className="w-16 h-16 text-amber-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Redirigiendo a Mercado Pago</h1>
        <p className="text-zinc-400">Por favor espera mientras procesamos tu solicitud...</p>
      </Card>
    </main>
  )
}
