import { Card } from '@/components/ui/card'
import { Tv, Waves, Gamepad2, Wine, Music, Users } from 'lucide-react'

const spaces = [
  {
    icon: Waves,
    name: 'Pool',
    description: 'Área de piscina con ambiente relajado y música chill',
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500/10',
  },
  {
    icon: Tv,
    name: 'TV Gigante',
    description: 'Pantalla de 100" para eventos deportivos y shows',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Gamepad2,
    name: 'Sala de Juegos',
    description: 'Pool, dardos, arcade y mucha diversión',
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: Wine,
    name: 'Barra',
    description: 'Barra principal con los mejores bartenders',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
  },
  {
    icon: Music,
    name: 'Patio',
    description: 'Terraza al aire libre con DJ en vivo',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    icon: Users,
    name: 'Área VIP',
    description: 'Espacio exclusivo para grupos grandes',
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
  },
]

export function ReservationBenefits() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Elige tu espacio perfecto
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          Cada zona tiene su propia personalidad. Selecciona la que mejor se adapte a tu estilo.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {spaces.map((space) => {
          const Icon = space.icon
          return (
            <Card
              key={space.name}
              className="bg-zinc-900/50 border-zinc-800 p-6 hover:border-amber-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className={`w-12 h-12 rounded-xl ${space.bgColor} flex items-center justify-center mb-4`}>
                <Icon className={`w-6 h-6 ${space.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{space.name}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{space.description}</p>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
