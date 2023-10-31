import React, { useState } from 'react'
import { useUser } from '../utils/ctx/user.ctx'
import { useAdventure } from '../utils/ctx/adventure.ctx'
import Cards from '../components/Cards'
import Historial from '../components/Reservas/Historial'


const initialSectionsViews = {account: false, favs: false, bookings: false}

const Account = () => {
  
    const {state: stateUser} = useUser()
    const {session } = stateUser

    return (
    <div className='flex justify-center w-screen md:flex-row'>
        <section className='flex flex-col justify-center items-center w-10/12'>
        <h2 className='mt-4 mb-1.5'>Mi Cuenta</h2>
        <hr className="underline w-20 text-tertiary border-2"/>
            <div className='felx flex-col w-full mt-6 space-y-3 border-secondary border-2 ml-8 rounded p-3 md:w-10/12 lg:w-8/12'>
                <h3 className='bg-secondary-200 m-2 p-2 text-center rounded font-bold'>Datos personales</h3>
                <p>Nombre: {session.nombre}</p>
                <p>Apellido: {session.apellido}</p>
                <p>Mail: {session.email}</p>
                <p>Rol: {session.usuarioRol.rol}</p>
            </div>
        </section>
    </div>
  )
}

export default Account