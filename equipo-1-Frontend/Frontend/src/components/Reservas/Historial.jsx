import React from 'react'
import { ADVENTURES_ATTR as ADV} from "../../utils/api/adventures.api"
import { useAdventure } from '../../utils/ctx/adventure.ctx'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from '../../utils/ctx/user.ctx';
import { Link } from 'react-router-dom';


const Historial = ({reserva}) => {

  const {state} = useAdventure()
  const {adventures} = state

  const adventureBooked = adventures.filter((adv) => adv.id == reserva.aventuraId)


  const formatearFecha = (date) => {
    let d = new Date(date)
    let month = `${d.getMonth() +1}`
    let day = `${d.getDate()}`
    let year = `${d.getFullYear()}`
    if(month.length < 2)
      month = '0' + month
    if(day.length < 2)
      day = '0' + day
    return [day, month, year].join('/')
  } 

  return (
        <li className='flex items-center justify-around w-full border-b-2 border-primary-300 py-4 dark:border-opacity-50'>
          <div className='w-2/5 text-xs sm:w-1/5 md:text-base flex flex-col items-center'>
            <p className='w-full text-center lg:text-start'>Día de la actividad</p>
            <DatePicker
              className='w-full bg-white rounded placeholder-primary text-center xl:w-3/5'
              placeholderText={reserva.fechaReservaAventura}
              disabled
            />
          </div>

          <div className='w-3/5 m-4 text-xs md:text-base'>
            <h2 className='mb-2 text-xs md:text-base'>{reserva.aventuraNombre}</h2>
            <p>{reserva.operador}</p>
            <p>${reserva.precio} - Reserva realizada el {reserva.fechaReserva}</p><br/>
            <Link to={"/detail/" + reserva.aventuraId}><p className="text-xs md:text-base font-semibold text-secondary">Puntuar Experiencia</p></Link>
          </div>

          <img src={adventureBooked[0].imagenes[0].url} alt="Imagen aventura reservada" className='hidden md:flex w-1/5'/>

        </li>
  )
}

export default Historial