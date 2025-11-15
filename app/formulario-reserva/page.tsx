'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar, Users, Phone, Mail, MapPin, Clock } from 'lucide-react'

const SPACES = [
  { value: 'patio', label: 'Patio' },
  { value: 'pool', label: 'Pool' },
  { value: 'tv-gigante', label: 'TV Gigante' },
  { value: 'sala-juegos', label: 'Sala de Juegos' },
  { value: 'barra', label: 'Barra' },
  { value: 'vip', label: 'Área VIP' },
]

const HOURS = Array.from({ length: 13 }, (_, i) => {
  const hour = i + 18 // Start from 18:00 (6 PM)
  const displayHour = hour > 23 ? hour - 24 : hour
  return {
    value: `${displayHour.toString().padStart(2, '0')}:00`,
    label: `${displayHour.toString().padStart(2, '0')}:00`,
  }
})

export default function FormularioReservaPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentVerified, setPaymentVerified] = useState(false)
  
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    personas: '',
    espacio: '',
    fecha: '',
    hora: '',
  })

  useEffect(() => {
    // Verify payment was made
    const paymentId = sessionStorage.getItem('payment_id')
    const paymentStatus = sessionStorage.getItem('payment_status')
    
    if (!paymentId || paymentStatus !== 'approved') {
      router.push('/pagar')
    } else {
      setPaymentVerified(true)
    }
  }, [router])

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const paymentId = sessionStorage.getItem('payment_id')
      
      const response = await fetch('/api/reserva/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          paymentId,
        }),
      })

      if (response.ok) {
        // Clear payment info
        sessionStorage.removeItem('payment_id')
        sessionStorage.removeItem('payment_status')
        
        // Redirect to confirmation
        router.push('/reserva-confirmada')
      } else {
        alert('Error al crear la reserva. Por favor intenta nuevamente.')
      }
    } catch (error) {
      console.error('[v0] Reservation error:', error)
      alert('Error al procesar la reserva.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!paymentVerified) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center">
        <div className="text-white">Verificando pago...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">
            Completa tu reserva
          </h1>
          <p className="text-zinc-400">
            Solo unos datos más y tu mesa estará lista
          </p>
        </div>

        <Card className="bg-zinc-900 border-zinc-800 p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nombre */}
            <div className="space-y-2">
              <Label htmlFor="nombre" className="text-zinc-200">
                Nombre completo
              </Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => handleChange('nombre', e.target.value)}
                placeholder="Juan Pérez"
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-zinc-200 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="tu@email.com"
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                required
              />
            </div>

            {/* Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="telefono" className="text-zinc-200 flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Número de teléfono
              </Label>
              <Input
                id="telefono"
                type="tel"
                value={formData.telefono}
                onChange={(e) => handleChange('telefono', e.target.value)}
                placeholder="+54 9 11 1234-5678"
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                required
              />
            </div>

            {/* Número de personas */}
            <div className="space-y-2">
              <Label htmlFor="personas" className="text-zinc-200 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Número de personas
              </Label>
              <Input
                id="personas"
                type="number"
                min="1"
                max="20"
                value={formData.personas}
                onChange={(e) => handleChange('personas', e.target.value)}
                placeholder="4"
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                required
              />
            </div>

            {/* Espacio */}
            <div className="space-y-2">
              <Label htmlFor="espacio" className="text-zinc-200 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Espacio preferido
              </Label>
              <Select value={formData.espacio} onValueChange={(value) => handleChange('espacio', value)}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                  <SelectValue placeholder="Selecciona un espacio" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {SPACES.map((space) => (
                    <SelectItem key={space.value} value={space.value} className="text-zinc-100">
                      {space.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Fecha */}
            <div className="space-y-2">
              <Label htmlFor="fecha" className="text-zinc-200 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Fecha de reserva
              </Label>
              <Input
                id="fecha"
                type="date"
                value={formData.fecha}
                onChange={(e) => handleChange('fecha', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-zinc-800 border-zinc-700 text-zinc-100"
                required
              />
            </div>

            {/* Hora */}
            <div className="space-y-2">
              <Label htmlFor="hora" className="text-zinc-200 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Hora de llegada
              </Label>
              <Select value={formData.hora} onValueChange={(value) => handleChange('hora', value)}>
                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-zinc-100">
                  <SelectValue placeholder="Selecciona una hora" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border-zinc-700">
                  {HOURS.map((hour) => (
                    <SelectItem key={hour.value} value={hour.value} className="text-zinc-100">
                      {hour.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold py-6 text-lg"
            >
              {isSubmitting ? 'Confirmando...' : 'Confirmar reserva'}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  )
}
