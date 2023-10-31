import { useEffect, useState } from 'react'
import Cards from '../components/Cards'
import Filter from '../components/Filter'
import Pagination from '../components/Pagination'
import { useAdventure } from '../utils/ctx/adventure.ctx'

const Home = () => {
  const [filteredAdventures, setFilteredAdventures] = useState([]);
  const {state} = useAdventure();
  const {adventures, categories_filters, filtered_adventures} = state;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPorPage, setItemsPorPage] = useState(10);

  const lastIndex = currentPage * itemsPorPage;
  const firstIndex = lastIndex - itemsPorPage;
  const visibleAdventures = filteredAdventures.slice(firstIndex, lastIndex);

  useEffect(() => {
    let filtered = adventures

    if (categories_filters.length > 0) {
      filtered = filtered.filter(adventure =>
        categories_filters.includes(adventure.categoria.nombre)
      )
    }
    if (filtered_adventures.length > 0 ) {
      filtered = filtered_adventures
    }
    setFilteredAdventures(filtered)
    setCurrentPage(1)
  }, [categories_filters, filtered_adventures, adventures])

  return (
      <div className='flex flex-col items-center pt-2 pb-4 md:pt-5'>
      <Filter/>
          <section className='lg:w-5/6 w-full px-3'>
            <div className='flex flex-col h-20 justify-center items-center my-5 text-primary md:h-16'>
              <h2 className='text-center'>¡NO TE PIERDAS LAS PRÓXIMAS SALIDAS!</h2>
              <h4 className='text-center'>Encontrá las actividades más emocionantes</h4>
              <hr className="underline my-2 w-20 text-tertiary border-2"/>
            </div>
            <div className='grid card-container grid-cols-2 max-[580px]:grid-cols-1 gap-6 my-3'>
              {visibleAdventures.map(adventure => <Cards adventure={adventure} key={adventure.id}/>)}
            </div>
            <Pagination 
              filteredAdventures={filteredAdventures} 
              adventuresList={adventures} 
              currentPage={currentPage} 
              setCurrentPage={setCurrentPage} 
              visibleAdventures={visibleAdventures.length}
            />
          </section>
      </div>
  )
}

export default Home