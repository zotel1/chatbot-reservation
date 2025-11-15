'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Calendar, Instagram } from 'lucide-react'
import { useRouter } from 'next/navigation'

type ReservationModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ReservationModal({ open, onOpenChange }: ReservationModalProps) {
  const router = useRouter()

  const handleYes = () => {
    onOpenChange(false)
    router.push('/reservar')
  }

  const handleNo = () => {
    onOpenChange(false)
    // Redirect to Instagram
    window.open('https://instagram.com/tubar', '_blank')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            ¿Deseas hacer una reserva?
          </DialogTitle>
          <DialogDescription className="text-zinc-400 text-center">
            Reserva tu mesa ahora y asegura tu lugar en el mejor bar de la ciudad
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-3 mt-4">
          <Button
            onClick={handleYes}
            className="bg-amber-500 hover:bg-amber-600 text-zinc-950 font-semibold py-6"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Sí, quiero reservar
          </Button>
          
          <Button
            onClick={handleNo}
            variant="outline"
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 py-6"
          >
            <Instagram className="w-5 h-5 mr-2" />
            No, ver Instagram
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
