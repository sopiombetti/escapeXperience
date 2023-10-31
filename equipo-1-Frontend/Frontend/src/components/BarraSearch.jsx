import Calendary from './Calendary';
import SearchInput from './SearchInput';
import { suggestions } from "../utils/scripts/suggestions"
import { useAdventure } from '../utils/ctx/adventure.ctx';
import { useEffect, useState } from 'react';

const BarraSearch = () => {
	const {state, dispatch} = useAdventure()
  const {filtered_adventures, date_selected_filter, palabraClave_filter} = state

	const handleSubmit = (e) => {
    e.preventDefault()

			if(date_selected_filter != '1969-12-31'){
				dispatch('FILTER_BY_DATE', date_selected_filter)
			}
			if(palabraClave_filter.length > 0){
				dispatch('FILTER_BY_WORD', palabraClave_filter)
			}
  }

	return (
		<section className="bg-tertiary-400 mb-2 p-2 md:items-center lg:w-10/12 w-full rounded relative z-20">
			<form className="z-30 w-full max-[750px]:flex-col flex items-center justify-around" method="GET" onSubmit={handleSubmit}>
				<div className="m-2 max-[620px]:w-auto">
					<h3 className="text-secondary-600 font-bold">¡BUSCAR AVENTURA!</h3>
				</div>
				<div className='flex flex-col min-[500px]:flex-row grow'>
					<Calendary placeholder={"Fecha"}/>
					<SearchInput suggestions={suggestions}/>
				</div>
				
				<div className="m-2 max-[620px]:w-auto">
					<button type="submit" className="p-2 text-medium font-medium h-12 w-40 text-white bg-secondary rounded border border-secondary hover:bg-secondary-300 hover:border-secondary-300 focus:ring-1 focus:outline-none focus:ring-secondary-300">
						Buscar
					</button>
				</div>
			</form>
		</section>
	);
};

export default BarraSearch