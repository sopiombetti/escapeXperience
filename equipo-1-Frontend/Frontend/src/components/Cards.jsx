import { Link } from "react-router-dom"
import { ADVENTURES_ATTR as ADV, CATEGORIES_ATTR as CAT } from "../utils/api/adventures.api"
import { useState } from "react"
import { useAdventure } from "../utils/ctx/adventure.ctx"
import { useUser } from "../utils/ctx/user.ctx"

const Cards = ({adventure, origin}) => {

  const {state, dispatch} = useAdventure()
  const {adventuresFavs} = state

  const {state: stateUser} = useUser()
  const { session } = stateUser

  const isAdvFav = adventuresFavs.find((avFav) => avFav.id == adventure.id)

  const [disable, setDisable] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(true);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const maxChars = 100;
  const truncatedDescription = adventure.descripcion.slice(0, maxChars);
  const maxChars2 = 300;
  const truncatedDescription2 = adventure.descripcion.slice(0, maxChars2);

  const handleFav = () => {
    if(isAdvFav){
      dispatch("DISLIKE_ADVENTURE", adventuresFavs.filter((ad) => ad.id != adventure.id))
    }
    else{
      adventuresFavs.push(adventure)
      dispatch("LIKE_ADVENTURE", adventuresFavs)
    }
  }

  return (
    adventure &&
      <div className="card flex flex-col rounded-xl shadow-xl max-w-[600px] md:flex-row overflow-hidden h-[200px] border border-tertiary-200" style={{borderTopWidth: 2, borderTopColor: `${adventure[ADV.CATEGORIA][CAT.COLOR]}`}}>
        
          <div className="relative min-h-[200px] min-w-[200px] bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${adventure.imagenes[0].url})`}}>
            <h4 className="flex font-bold bg-white text-xs p-2 md:hidden">
              <Link to={"/detail/" + adventure.id}>{adventure.nombre}</Link>
            </h4>
              
            <div className="md:hidden absolute top-1 right-2">
              {session.id && 
                <button onClick={handleFav} disabled={disable} className="mx-1">
                {isAdvFav ? 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                :
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                }
                </button>                
              }
            </div>
          </div>
        
        <div className="p-1 px-3">
          <div className="flex justify-between items-start">
            <Link to={"/detail/" + adventure.id}><h3 className="font-bold w-full">{adventure.nombre}</h3></Link>
            <div className="flex">
              {session.id && 
                <button onClick={handleFav} disabled={disable} className="">
                  {isAdvFav ? 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 ml-5">
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  }
                </button>                
              }
            </div>
          </div>
          
            {showFullDescription ?
              ( 
                <p className="text-xs my-3 overflow-hidden md:flex md:flex-col items-start">
                  {truncatedDescription+'...'}
                    <span onClick={toggleDescription} className="invisible lg:visible text-secondary font-bold cursor-pointer">
                      Leer más
                    </span>
                </p>
              )
              :
              (
                <p className="text-xs my-3 overflow-hidden md:flex md:flex-col items-start">
                {truncatedDescription2} 
                  <span onClick={toggleDescription} className="invisible lg:visible text-secondary font-bold cursor-pointer">
                    Leer menos
                  </span>
                </p>
              )    
            }
            <Link to={"/detail/" + adventure.id}>
              <div className="hidden xl:grid xl:grid-cols-2 xl:text-xs xl:my-4">
                <p className="font-bold ">Ubicación: <span className="font-normal">{adventure.ubicacion}</span></p>
                <p className="ml-5 font-bold">Empresa: <span className="font-normal">{adventure.operador}</span> </p>
                <p className="mt-1 font-bold">Precio p/persona: <span className="font-normal">${adventure.precio} USD</span></p>
              </div>
            </Link>  
            <div className="my-3 w-full">
              <Link to={"/detail/" + adventure.id} className="text-center text-xs text-secondary font-bold">Ver fechas disponibles</Link>
            </div>
        </div>
      </div>
    
  )
}

export default Cards