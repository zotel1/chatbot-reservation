'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CreditCard, Shield, Clock } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function ReservationCTA() {
  const router = useRouter()

  const handleReserve = () => {
    // Will redirect to Mercado Pago payment
    router.push('/pagar')
  }

  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20 p-8 md:p-12 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">
            Lista para reservar tu mesa
          </h2>
          <p className="text-zinc-300 text-lg text-pretty">
            Paga solo $10 ARS de seña y completa tu reserva en segundos
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
              <CreditCard className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-white font-semibold mb-1">Pago seguro</h3>
            <p className="text-zinc-400 text-sm">Procesado por Mercado Pago</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
              <Shield className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-white font-semibold mb-1">100% Confiable</h3>
            <p className="text-zinc-400 text-sm">Tus datos están protegidos</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center mb-3">
              <Clock className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-white font-semibold mb-1">Rápido y fácil</h3>
            <p className="text-zinc-400 text-sm">Reserva en menos de 2 minutos</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <Button
            onClick={handleReserve}
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold text-lg px-12 py-6 h-auto"
          >
            Pagar seña de $10 ARS
          </Button>
          <p className="text-zinc-500 text-sm mt-4">
            Serás redirigido a Mercado Pago para completar el pago
          </p>
        </div>
      </Card>
    </section>
  )
}
