import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle, Mail, Calendar, Instagram } from 'lucide-react'
import Link from 'next/link'

export default function ReservaConfirmadaPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
      <Card className="bg-zinc-900 border-zinc-800 p-8 md:p-12 max-w-2xl text-center">
        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Reserva confirmada
        </h1>
        
        <p className="text-zinc-400 text-lg mb-8">
          Tu reserva ha sido procesada exitosamente. Recibirás toda la información en tu correo electrónico.
        </p>

        <div className="bg-zinc-800/50 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-amber-500" />
            Notificaciones enviadas
          </h2>
          
          <ul className="space-y-3 text-zinc-400 text-sm">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Confirmación enviada a tu email</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Notificación enviada al encargado del bar</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Evento agregado a Google Calendar del encargado</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Reserva registrada en Google Sheets</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/" className="flex-1">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold w-full"
            >
              Volver al inicio
            </Button>
          </Link>
          
          <a 
            href="https://instagram.com/tubar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 w-full"
            >
              <Instagram className="w-5 h-5 mr-2" />
              Síguenos
            </Button>
          </a>
        </div>
      </Card>
    </main>
  )
}
