'use client'

import { useState } from 'react'
import { ChatInterface } from '@/components/chat-interface'
import { ReservationModal } from '@/components/reservation-modal'

export default function HomePage() {
  const [messageCount, setMessageCount] = useState(0)
  const [showReservationModal, setShowReservationModal] = useState(false)

  const handleMessageSent = (message: string) => {
    const lowerMessage = message.toLowerCase()
    const reservationKeywords = ['reserva', 'reservas', 'reservar']
    
    // Check if message contains reservation keywords
    const hasReservationKeyword = reservationKeywords.some(keyword => 
      lowerMessage.includes(keyword)
    )
    
    if (hasReservationKeyword) {
      setShowReservationModal(true)
      return
    }
    
    // Increment message count
    const newCount = messageCount + 1
    setMessageCount(newCount)
    
    // Show modal after 10 messages
    if (newCount >= 10) {
      setShowReservationModal(true)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-3 tracking-tight">
            Bar <span className="text-amber-500">Virtual</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Tu asistente virtual para menús, horarios y reservas
          </p>
        </div>
        
        <ChatInterface onMessageSent={handleMessageSent} />
        
        <ReservationModal 
          open={showReservationModal}
          onOpenChange={setShowReservationModal}
        />
      </div>
    </main>
  )
}
