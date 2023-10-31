import React, { useEffect, useState } from 'react'
import { useUser } from '../utils/ctx/user.ctx'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAdventure } from '../utils/ctx/adventure.ctx'

const Booking = () => {

    const {state:stateUser} = useUser()
    const {session} = stateUser

    const {state, dispatch} = useAdventure()
    const {adventures} = state

    const [ adventure, setAdventure ] = useState()

    const param = useParams()
    const navigate = useNavigate()
    const [cantPersonas, setCantPersonas] = useState(0)
    const [show, setShow] = useState(false)

    const token = session.jwt

    const auth = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
        setAdventure(adventures.find((adventure) => adventure.id === parseInt(param.id)))
    }, [param.id, adventures])

    const dateFormat = (date) => {
      let d = new Date(date)
      let month = d.getMonth() +1
      let day = d.getDate()
      let year = d.getFullYear()
      if(month < 10){
        month = '0' + month}
      if(day < 10){
        day = '0' + day}
      return [year, month, day].join('-')
    }
   
    
    const handleSubmit = (e) => {
      e.preventDefault()

      const date = dateFormat(param.date)

      const booking = {
        fechaReservaAventura: date,
        cantidadPersonas: Number.parseInt(cantPersonas),
        usuarioId: session.id,
        aventuraId: adventure.id
      }

      if(cantPersonas < 1){
        setShow(true)
      }
      else{
        dispatch("ADD_BOOKING", {booking: booking, auth: auth})
      }
    }

 

  return (
    adventure &&
    <div className='flex justify-center items-center my-5'>
        <form onSubmit={handleSubmit} className='w-9/12 flex flex-col justify-center md:w-8/12'>
        
            <h2 className='text-lg sm:text-xl mb-4 mt-3 p-3 rounded bg-secondary-200 rounded font-bold'>Información de la reserva:</h2>
            <div className='flex flex-col md:flex-row md:justify-between md:px-3'>
              <img className='h-[160px] max-w-[220px] rounded-lg' src={adventure.imagenes[0].url}/>
              <div className='flex flex-col mt-2 justify-center w-full md:w-9/12 md:mt-0 md:ml-2'>
                <li className="flex flex-col space-y-4 gap-x-6 py-2 px-3 lg:flex-row lg:justify-between lg:items-center lg:space-y-0">
                  <div className="flex min-w-0 gap-x-4">
                      <p className="text-sm sm:text-base font-semibold leading-6 text-gray-900">Nombre de la aventura:</p>
                  </div>
                  <div className="flex shrink-0 sm:flex sm:flex-row sm:items-end">
                      <p className='text-sm sm:text-base leading-6 text-gray-900'>{adventure.nombre}</p>
                  </div>
                </li>
                <hr className='text-gray my-4'/>
                <li className="flex flex-col space-y-4 gap-x-6 py-2 px-3 lg:flex-row lg:justify-between lg:space-y-0">
                  <div className="flex min-w-0 gap-x-4">
                      <p className="text-sm sm:text-base font-semibold leading-6 text-gray-900">Ubicación:</p>
                  </div>
                  <div className="flex shrink-0 sm:flex sm:flex-row sm:items-end">
                      <p className='text-sm sm:text-base leading-6 text-gray-900'>{adventure.ubicacion}</p>
                  </div>
                </li>
              </div>
            </div>
            <hr className='text-gray my-4'/>
            <li className="flex flex-col space-y-4 gap-x-6 py-2 px-3 md:flex-row md:justify-between md:space-y-0">
              <div className="flex min-w-0 gap-x-4">
                  <p className="text-sm sm:text-base font-semibold leading-6 text-gray-900">Fecha seleccionada:</p>
              </div>
              <div className="flex shrink-0 sm:flex sm:flex-row sm:items-end">
                  <p className='text-sm sm:text-base leading-6 text-gray-900'>{new Date(param.date).toLocaleDateString()}</p>
              </div>
            </li>
            <hr className='text-gray my-4'/>
            <li className="flex flex-col space-y-4 gap-x-6 py-2 px-3 md:flex-row md:justify-between md:space-y-0">
              <div className="flex min-w-0 gap-x-4">
                  <p className="text-sm sm:text-base font-semibold leading-6 text-gray-900">Precio por persona:</p>
              </div>
              <div className="flex shrink-0 sm:flex sm:flex-row sm:items-end">
                  <p className='text-sm sm:text-base leading-6 text-gray-900'>${adventure.precio} USD</p>
              </div>
            </li>
            <hr className='text-gray my-4'/>
            <li className="flex flex-col space-y-4 gap-x-6 py-2 px-3 md:flex-row md:justify-between md:space-y-0">
              <div className="flex flex-col min-w-0 gap-x-4">
                  <p className="text-sm sm:text-base font-semibold leading-6 text-gray-900">Cantidad de personas:</p>
                  {show && <p className='text-red-500 mt-2 text-sm'>Por favor seleccione la cantidad de personas</p>}
              </div>
              <div className="flex shrink-0 sm:flex sm:flex-row sm:items-end">
                  <input type='number' min="0" id='cupo' onChange={(e) => setCantPersonas(e.target.value)} className='flex w-[300px] h-[32px] px-2 rounded-md shadow-sm ring-1 ring-inset ring-secondary-600 focus-within:ring-1.5 focus-within:ring-inset focus-within:ring-secondary'/>
              </div>
            </li>

            <h2 className='text-lg sm:text-xl mb-4 mt-3 p-3 rounded bg-secondary-200 rounded font-bold'>Políticas de reserva:</h2>
            {adventure.politicas.map(politica =>  
            <div>
              <li className="flex flex-col space-y-4 gap-x-6 py-2 px-3 md:flex-row md:justify-between md:space-y-0">
                <div className="flex flex-col min-w-0 gap-x-4">
                    <p className="text-sm mb-2 sm:text-base font-semibold leading-6 text-gray-900">{politica.titulo}:</p>
                    <p className='text-sm sm:text-base font-normal leading-6 text-gray-900'>{politica.descripcion}</p>
                </div>
              </li>
              <hr className='text-gray my-4'/>
            </div>
            )}
           
            <h2 className='text-lg sm:text-xl mb-4 mt-3 p-3 rounded bg-secondary-200 rounded font-bold'>Datos del usuario:</h2>
            <li className="flex flex-col space-y-4 gap-x-6 py-2 px-3 md:flex-row md:justify-between md:space-y-0">
              <div className="flex min-w-0 gap-x-4">
                  <p className="text-sm sm:text-base font-semibold leading-6 text-gray-900">Nombre y Apellido:</p>
              </div>
              <div className="flex shrink-0 sm:flex sm:flex-row sm:items-end">
                  <p className='text-sm sm:text-base leading-6 text-gray-900'>{session.nombre} {session.apellido}</p>
              </div>
            </li>
            <hr className='text-gray my-4'/>
            <li className="flex flex-col space-y-4 gap-x-6 py-2 px-3 md:flex-row md:justify-between md:space-y-0">
              <div className="flex min-w-0 gap-x-4">
                  <p className="text-sm sm:text-base font-semibold leading-6 text-gray-900">Email:</p>
              </div>
              <div className="flex shrink-0 sm:flex sm:flex-row sm:items-end">
                  <p className='text-sm sm:text-base leading-6 text-gray-900'>{session.email}</p>
              </div>
            </li>
            <hr className='text-gray my-4'/>
            <li className="flex flex-col space-y-4 gap-x-6 py-2 px-3 md:flex-row md:justify-between md:space-y-0">
              <div className="flex min-w-0 gap-x-4">
                  <p className="text-sm sm:text-base font-semibold leading-6 text-gray-900">Teléfono:</p>
              </div>
              <div className="flex shrink-0 sm:flex sm:flex-row sm:items-end">
                  <input type='text' id='cellphone' className='flex w-[300px] h-[30px] px-2 rounded-md shadow-sm ring-1 ring-inset ring-secondary-600 focus-within:ring-1.5 focus-within:ring-inset focus-within:ring-secondary'/>
              </div>
            </li>
            <div className="mt-12 flex items-center justify-end gap-x-6">
              <Link to={"/detail/" + adventure.id}><button className='font-semibold'>Volver atrás</button></Link>
              <button
                type="submit"
                className="rounded-md bg-tertiary px-4 py-3 text-base font-semibold text-color-text-dark shadow-sm hover:bg-tertiary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Confirmar Reserva
              </button>
            </div>
        </form>
    </div>
  )
}

export default Booking