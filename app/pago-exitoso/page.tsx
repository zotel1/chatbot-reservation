'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Pointer as Spinner } from 'lucide-react'

function PagoExitosoContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const paymentId = searchParams.get('payment_id')
  const status = searchParams.get('status')

  useEffect(() => {
    if (status === 'approved' && paymentId) {
      // Store payment info in sessionStorage for the reservation form
      sessionStorage.setItem('payment_id', paymentId)
      sessionStorage.setItem('payment_status', status)
    }
  }, [paymentId, status])

  const handleContinue = () => {
    router.push('/formulario-reserva')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
      <Card className="bg-zinc-900 border-zinc-800 p-8 md:p-12 max-w-lg text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Pago exitoso
        </h1>
        
        <p className="text-zinc-400 mb-2">
          Tu pago de <span className="text-amber-500 font-semibold">$10 ARS</span> ha sido procesado correctamente.
        </p>
        
        <p className="text-zinc-500 text-sm mb-8">
          ID de pago: {paymentId}
        </p>
        
        <Button
          onClick={handleContinue}
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold w-full"
        >
          Completar mi reserva
        </Button>
      </Card>
    </main>
  )
}

export default function PagoExitosoPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <Spinner className="w-12 h-12 text-amber-500" />
      </main>
    }>
      <PagoExitosoContent />
    </Suspense>
  )
}
