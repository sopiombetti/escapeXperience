import React from 'react'
import Historial from '../components/Reservas/Historial'
import { useAdventure } from '../utils/ctx/adventure.ctx'
import { useUser } from '../utils/ctx/user.ctx'

const BookingHistory = () => {

    const {state} = useAdventure()
    const {bookings} = state

    const {state: stateUser} = useUser()
    const {session } = stateUser

    const userBookings = bookings.filter((book) => book.usuarioId == session.id)

  return (
    <div className='flex justify-center'>
        <section className='w-9/12 flex flex-col items-center'>
        <h2 className='mt-4 mb-1.5'>Mis Reservas</h2>
        <hr className="underline w-20 text-tertiary border-2"/>
            {userBookings.map(booking =>
                <ul className='w-full mt-4'>
                    <Historial reserva={booking} key={booking.id}/> 
                </ul> 
            )}
        </section>
    </div>
  )
}

export default BookingHistory