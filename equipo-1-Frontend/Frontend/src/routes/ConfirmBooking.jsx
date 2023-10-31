import React from 'react'
import { Link, useParams } from 'react-router-dom'

const ConfirmBooking = () => {

    const param = useParams()

  return (
    <div className='flex justify-center items-center'>
    {param.condition == "ok" ? 
    <div className='flex-col w-8/12 border-black border-2 text-center space-y-3 py-6 mt-10'>
      <h2>¡La reserva se ha realizado con éxito!</h2>
      <h4>A continuación le llegará un mail con el detalle de la reserva. ¡Gracias por confiar en nosotros!</h4>
      <Link to={"/"}><button className=' w-1/2 mt-5 justify-center rounded-full bg-tertiary px-3 py-1.5 text-sm font-semibold leading-6 text-primary shadow-sm hover:bg-tertiary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Seguir navegando en la página</button></Link>
    </div>
    :
    <div className='flex-col w-8/12 border-black border-2 text-center space-y-3 py-6 mt-10'>
      <h2>Hubo un problema al realizar la reserva</h2>
      <h4>Por favor, intente nuevamente en unos momentos. Si el problema persiste, contáctese con el proveedor de la aventura</h4>
      <p>{param.condition}</p>
      <Link to={"/"}><button className=' w-1/2 mt-5 justify-center rounded-full bg-tertiary px-3 py-1.5 text-sm font-semibold leading-6 text-primary shadow-sm hover:bg-tertiary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>Seguir navegando en la página</button></Link>
    </div>
    }
    
    </div>
  )
}

export default ConfirmBooking