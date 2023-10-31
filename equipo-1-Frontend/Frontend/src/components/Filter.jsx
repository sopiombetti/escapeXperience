import { CATEGORIES_ATTR as CAT } from "../utils/api/adventures.api";
import { useAdventure } from "../utils/ctx/adventure.ctx";
import { useEffect, useState } from "react";
import { categoriesActions } from "../utils/ctx/adventure.ctx";
import BarraSearch from "./BarraSearch";


const Filter = () => {   
    const { state, dispatch } = useAdventure();
    const { categories } = state;
    const [filtradoPor, setFiltrado] = useState({})

    const categoriasSinGeneral = categories.slice(1)
    useEffect(() => {
        const tempFilters = {}
        categories.forEach(category => tempFilters[category[CAT.NOMBRE]] = false)
        setFiltrado(tempFilters)
    }, [categories])

    const handleFilter = (nombre) => {
        setFiltrado({...filtradoPor, [nombre]: !filtradoPor[nombre]})
    }

    useEffect(() => {
        const filter_categories = Object.entries(filtradoPor).filter(([key, value]) => value).map(([key, value]) => key)
        dispatch(categoriesActions.SET_FILER_CATEGORIES, filter_categories)
    }, [filtradoPor])

    return (
        <div className="flex flex-col items-center w-full px-2">
            <BarraSearch/>
            <section className="flex lg:w-10/12 w-full gap-x-3 justify-center relative z-10 flex-wrap md:flex-nowrap">
                {categoriasSinGeneral.map(category => 
                    <div key={category.id} className={`category max-[768px]:basis-[30%] max-[651px]:basis-[48%] ${filtradoPor[category[CAT.NOMBRE]] && "selected"}`} style={{backgroundImage: `url(${category[CAT.IMAGE_URL]})`, boxShadow: `inset 0 0 5px 8px ${category[CAT.COLOR]}`}} onClick={() => handleFilter(category[CAT.NOMBRE])}>
                        <p>{category[CAT.NOMBRE]}</p>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Filter