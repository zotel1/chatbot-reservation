import { ReservationHero } from '@/components/reservation-hero'
import { ReservationBenefits } from '@/components/reservation-benefits'
import { ReservationCTA } from '@/components/reservation-cta'

export default function ReservarPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <ReservationHero />
      <ReservationBenefits />
      <ReservationCTA />
    </main>
  )
}
