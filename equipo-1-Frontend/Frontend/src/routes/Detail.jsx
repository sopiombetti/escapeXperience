import { useParams } from 'react-router'
import DemoCarousel from '../components/DemoCarousel'
import { useNavigate } from "react-router-dom";
import { useAdventure } from '../utils/ctx/adventure.ctx';
import { useUser } from '../utils/ctx/user.ctx';
import { useEffect, useState } from 'react';
import { ADVENTURES_ATTR as ADV } from '../utils/api/adventures.api';
import Reservas from '../components/Reservas';
import BotonCompartir from '../components/Botones/BotonCompartir';

const Detail = () => {
  const [ adventure, setAdventure ] = useState()
  const navigate = useNavigate()
  const {state, dispatch} = useAdventure()
  const {adventures} = state
  const {state: stateUser} = useUser()
  const {session} = stateUser
  const param = useParams()

  useEffect(() => {
    setAdventure(adventures.find((adventure) => adventure.id === parseInt(param.id)))
  }, [param.id, adventures])


  const [newRating, setNewRating] = useState({
    puntuacion: 0,
    aventura_id: parseInt(param.id),
    usuario_id: session.id,
    critica: ""
  })

  const handelSubmitRating = (e) => {
    e.preventDefault()
    dispatch("ADD_RATING", newRating)
  }


  return (
    adventure &&
    (<div className='flex flex-col items-center mb-3 text-primary-700'>

      <div className='w-10/12 md:w-10/12 xl:w-8/12'> 
        <DemoCarousel img={adventure[ADV.ARRAY_IMAGENES]}/>
      </div>

      <section className='flex flex-col w-10/12 md:w-10/12 xl:w-8/12'>

        <div className='flex justify-between my-2'>
          <div className='space-y-3 self-center'>
            <h2 className='text-left'>{adventure.nombre}</h2>
            <h3>{adventure.categoria.nombre} - {adventure.ubicacion}</h3>
          </div>
          <div className='flex items-start justify-between mb-2 flex-col-reverse md:flex-row gap-5 md:gap-1'>
            <BotonCompartir adventure={adventure}/>
            <button className='text-secondary-600 font-semibold text-sm ml-4 mt-1 self-end md:self-start' onClick={() => navigate(-1)}>Volver atrás</button>
          </div>
        </div>

        <h3 className='mb-4 mt-6 font-bold'>Descripción:</h3>
        <p className='my-2'>{adventure.descripcion}</p>
        
        <h3 className='mb-3 mt-6 font-bold'>Características:</h3>
        <div className='grid grid-cols-1 mt-2 mb-6 md:grid-cols-2'>{adventure.caracteristicas.map(caract => 
          <div className='flex items-center my-2'>
            {caract.icono == `<span className="material-symbols-outlined">tooltip</span>` && <span className="material-symbols-outlined">tooltip</span>}
            {caract.icono == `<span className="material-symbols-outlined">map</span>` && <span className="material-symbols-outlined">map</span>}
            {caract.icono == `<span className="material-symbols-outlined">restaurant</span>` && <span className="material-symbols-outlined">restaurant</span>}
            {caract.icono == `<span className="material-symbols-outlined">hiking</span>` && <span className="material-symbols-outlined">hiking</span>}
            {caract.icono == `<span className="material-symbols-outlined">directions_bus</span>` && <span className="material-symbols-outlined">directions_bus</span>}
            {caract.icono == `<span className="material-symbols-outlined">family_restroom</span>` && <span className="material-symbols-outlined">family_restroom</span>}
            {caract.icono == `<span className="material-symbols-outlined">tour</span>` && <span className="material-symbols-outlined">tour</span>}
            {caract.icono == `<span className="material-symbols-outlined">health_and_safety</span>` && <span className="material-symbols-outlined">health_and_safety</span>}
            
            <p className='mx-3'>{caract.nombre}</p>
          </div>
          )}
        </div>
        
        <Reservas precio={adventure.precio} nombre={adventure.nombre} id={adventure.id} dates={adventure.fechaInicio}/>
        
        <h3 className='mb-4 mt-7 font-bold underline'>Políticas:</h3>
        <div className='flex flex-col space-y-4 mt-2 mb-6 md:grid md:grid-cols-3 md:space-x-7 items-baseline'>
          {adventure.politicas.map(policy => 
            <div className='flex flex-col'>
              <p className='font-semibold'>{policy.titulo}</p>
              <p>{policy.descripcion}</p>
            </div>
          )}
        </div>
        <hr className='text-gray my-4'/>
        
        <div className='valoraciones flex flex-col my-7 md:flex-row md:justify-between'>
          <div className='flex flex-col items-center space-y-5 py-5'>
            <h3 className=' text-center font-bold'>Opiniones:</h3>
            <div className='flex flex-col border-secondary-400 border-2 p-4 max-h-[100px] rounded'>
              <div className='flex'>
                {Array.from({ length: adventure.promedioPuntuacion}, (i) => <p className="mt-1 truncate text-xs leading-5 text-gray-500 text-tertiary"><span class="material-symbols-outlined">star</span></p>)}
              </div>
              <p className='text-xs text-center'>{adventure.cantidadPuntuaciones} reseñas</p>
            </div>
          </div>
          <div className='md:w-9/12 md:ml-5'>
            <ul role="list" className="divide-y divide-gray-100">
              {adventure.puntuaciones.map((puntuacion) => (
                <li key={puntuacion.id} className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{puntuacion.usuario.nombre} {puntuacion.usuario.apellido}</p>
                      <div className='flex'>
                        {Array.from({ length: puntuacion.puntuacion}, (i) => <p className="mt-1 truncate text-xs leading-5 text-gray-500 text-tertiary"><span class="material-symbols-outlined">star</span></p>)}
                      </div>
                      <p className="mt-1 text-xs leading-5 text-gray-500">{puntuacion.critica}</p>
                    </div>
                  </div>
                </li>
              ))}
              {session.id &&
              <li className="flex justify-between gap-x-6 py-5">
                <div className="flex min-w-0 w-full gap-x-4">
                  <form onSubmit={handelSubmitRating} className="min-w-0 w-full flex-col space-y-3">
                    <p className='font-semibold'>Cuéntanos cómo fue tu experiencia:</p>
                    <div>
                      {[1, 2, 3, 4, 5].map((value) => (
                        <span
                          key={value}
                          className={`material-symbols-outlined cursor-pointer ${
                            value <= newRating.puntuacion ? 'text-tertiary' : 'text-gray'
                          }`}
                          onClick={() => setNewRating({...newRating, puntuacion: value})}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <textarea onChange={(e) => setNewRating({...newRating, critica: e.target.value})} className='w-full border-2 rounded border-secondary-400 p-2' placeholder='Añade un comentario'/>
                    <button type='submit' className='my-2  bg-tertiary font-semibold px-4 py-2 rounded'>Publicar reseña</button>
                  </form>
                </div>
              </li>
              }
            </ul>
          </div>
        </div>
      </section>
    </div>)
  )
}

export default Detail