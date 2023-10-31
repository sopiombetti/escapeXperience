import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react'

export default function Pagination({filteredAdventures, adventuresList, currentPage, setCurrentPage, visibleAdventures}) {

  const cantidadPaginas = []
  let totalItems = filteredAdventures.length
  let limitItems = 10

  for (let i = 1; i <= Math.ceil(totalItems/limitItems);i++){
    cantidadPaginas.push(i)
  }
  const paginaAnterior = () => {
    setCurrentPage(currentPage-1)
  }
  const paginaSiguiente = () => {
    setCurrentPage(currentPage+1)
  }
  const paginaSeleccionada = (page) => {
  setCurrentPage(page)
}

  return (
    <div className="flex  items-center md:flex-row  justify-around lg:flex-row border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-col items-center sm:flex-row sm:grow sm:items-center sm:justify-between">
        <div className="mb-2 sm:m-0">
          <p className="text-xs md:text-sm text-gray-700 text-center">
            Mostrando <span className="font-medium">{visibleAdventures}</span> de <span className="font-medium">{filteredAdventures.length}</span> resultados
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={paginaAnterior}
              disabled = {currentPage === 1}
              className="cursor-pointer relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-secondary-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Anterior</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>            
            
            {
              cantidadPaginas.map(nroPage => (
                <a
                  key={nroPage}
                  onClick={() => paginaSeleccionada(nroPage)}
                  aria-current="page"
                  className={`${nroPage === currentPage ? 'bg-secondary text-white':'bg-white text-gray-400'} cursor-pointer relative z-10 inline-flex items-center hover:bg-secondary hover:text-white ring-1 ring-inset ring-secondary-300 px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-100`}
                >
                  {nroPage}
                </a>
              
              ))
            }

            <button
              onClick={paginaSiguiente}
              disabled = {currentPage >= cantidadPaginas.length}
              className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-secondary-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Siguiente</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}