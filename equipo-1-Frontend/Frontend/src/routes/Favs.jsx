import React from 'react'
import Cards from '../components/Cards'
import { useAdventure } from '../utils/ctx/adventure.ctx'

const Favs = () => {

    const {state} = useAdventure()
    const {adventuresFavs} = state

  return (
    <div className='flex flex-col items-center'>
        <h2 className='mt-4 mb-1.5'>Mis Favoritos</h2>
        <hr className="underline w-20 text-tertiary border-2"/>
        <div className="grid grid-cols-2 gap-6 m-10">
            {adventuresFavs.map(adventureFav => <Cards key={adventureFav.id} adventure={adventureFav} origin={true}/>)}
        </div>
    </div>
  )
}

export default Favs