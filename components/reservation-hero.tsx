import { Sparkles, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function ReservationHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/vibrant-nightlife-bar-atmosphere.jpg')] bg-cover bg-center opacity-20" />
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <Link href="/">
          <Button variant="ghost" className="text-zinc-400 hover:text-zinc-100 mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al chat
          </Button>
        </Link>
        
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="text-amber-500 text-sm font-medium">Reserva Exclusiva</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight text-balance">
            Asegura tu lugar en la mejor <span className="text-amber-500">experiencia</span>
          </h1>
          
          <p className="text-xl text-zinc-400 mb-8 text-pretty leading-relaxed">
            Reserva tu mesa con solo 10 pesos argentinos de seña y disfruta de una noche inolvidable. 
            Elige tu espacio favorito y garantiza tu diversión.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center text-sm text-zinc-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <span>Seña de solo $10 ARS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <span>Confirmación instantánea</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <span>Cancela hasta 2 horas antes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
