import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'
import Link from 'next/link'

export default function PagoFallidoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
      <Card className="bg-zinc-900 border-zinc-800 p-8 md:p-12 max-w-lg text-center">
        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Pago rechazado
        </h1>
        
        <p className="text-zinc-400 mb-8">
          Hubo un problema al procesar tu pago. Por favor intenta nuevamente o usa otro método de pago.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/pagar" className="flex-1">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold w-full"
            >
              Reintentar pago
            </Button>
          </Link>
          
          <Link href="/" className="flex-1">
            <Button
              size="lg"
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 w-full"
            >
              Volver al inicio
            </Button>
          </Link>
        </div>
      </Card>
    </main>
  )
}
