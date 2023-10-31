import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../utils/ctx/user.ctx';
import { useState } from 'react';
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

const Reservas = ({precio, nombre, id, dates}) => {

  const {state:stateUser} = useUser()
  const {session} = stateUser
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  const [selectedDate, setSelectedDate] = useState(null)
  const dateFormat = (date) => {
    let d = new Date(date)
    let month = d.getMonth() +1
    let day = d.getDay()
    let year = d.getFullYear()
    if(month.length < 2)
      month = '0' + month
    if(day.length < 2)
      day = '0' + day
    return [year, month, day].join('-')
  }

  const handleBooking = () => {
    if(!session.id){
      navigate("/login")
    }
    else if(selectedDate == null){
      setShow(true)
    }
    else{
      navigate("/booking/" + id + "/" + selectedDate)
    }
  }

  return (
    <div className='flex flex-col border-secondary border-2 p-4 rounded my-5'>
      <h3 className='mb-4 font-bold text-xl'>Reservar actividad: {nombre}</h3>
      
      <div className="flex flex-col items-start md:flex-row md:items-center ">
        <div className="m-2 max-[620px]:w-auto">
          <DatePicker 
            selected={selectedDate}
            onChange={date=>setSelectedDate(date)} 
            className="h-12 block min-h-[auto] max-[620px]:w-auto w-full placeholder-gray rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none"
            placeholderText="dd/mm/aaaa"
            dateFormat="dd/MM/yyyy"
            minDate={new Date()}
            maxDate={new Date(2023,11,31)}
            includeDateIntervals={[
              { start: new Date(), end: new Date(dates)},
            ]}
            excludeDates={[new Date('2023-10-24'), new Date('2023-10-30')]}
          /> 
        </div>

        {/* <input placeholder="Cantidad de personas" type='number' id="time" onChange={()} className="h-12 block min-h-[auto] m-2 placeholder-gray rounded border-0 bg-white px-3 py-[0.32rem] leading-[1.6] outline-none"/> */}

        <div className='bg-white h-12 px-4 py-3 my-2 mx-4 rounded'>
          <p className='font-bold'>${precio} USD</p>
        </div>

        <button onClick={handleBooking} className="my-2 mx-4 bg-tertiary font-semibold px-4 py-2 rounded">Reservar</button>
        
        {show && <p className='text-red-500 text-base ml-2'>Por favor seleccione una fecha</p>}
      </div>

      {!session.id && <p className='text-xs text-[#8a2020] m-2'>
          *Para realizar una reserva deberá 
          <a className="mx-1 underline" href={"/login"}>INICIAR SESIÓN.</a>
          <br /> 
          *Si no tiene cuenta, deberá 
          <a className="mx-1 underline" href={"/singup"}>REGISTRARSE.</a>
        </p>}
      
    </div>
  )
}

export default Reservas