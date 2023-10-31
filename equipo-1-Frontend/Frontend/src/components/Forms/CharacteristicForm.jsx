import { useState } from "react"
import { useAdventure } from "../../utils/ctx/adventure.ctx"
import { useUser } from "../../utils/ctx/user.ctx"

export default function CharacteristicForm({caracteristicaEdit}) {
    const {state, dispatch} = useAdventure()
    const {characteristics} = state
    const [showicon, setshowicon] = useState(false)

    const {state: stateUser} = useUser()
    const { users, session } = stateUser

    const [bodyCh, setBodyCh] = useState({
        nombre: "",
        icono: ""
    })
    const [editCharacteristic, setEditCharacteristic] = useState(caracteristicaEdit)

    const token = session.jwt

    const auth = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const handleSubmitCharacteristic = (e) => {
        e.preventDefault()
        if(caracteristicaEdit){
          dispatch("EDIT_CHARACT", {id: editCharacteristic.id, charact: editCharacteristic, auth: auth})
        }
        else{
          dispatch('ADD_CHARACTERISTIC', {characteristic: bodyCh, auth: auth})
        }
    }

    return(

            <form className="w-8/12 mt-8 flex flex-col grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6" onSubmit={handleSubmitCharacteristic}>
              <div className="sm:col-span-4">
                <label htmlFor="characteristicname" className="block text-sm font-medium leading-6 text-gray-900">
                  Nombre de la Característica*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-secondary-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary sm:max-w-md">
                    <input
                      type="text"
                      name="characteristicname"
                      id="characteristicname"
                      autoComplete="name"
                      className="block grow border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      value={caracteristicaEdit && editCharacteristic.nombre}
                      onChange={(e) => {caracteristicaEdit ? setEditCharacteristic({...editCharacteristic, nombre: e.target.value}) : setBodyCh({...bodyCh, nombre: e.target.value})}}
                    />
                  </div>
                </div>
              </div>
            
              <div className="sm:col-span-4">
                <label htmlFor="categoryurl" className="block text-sm font-medium leading-6 text-gray-900">
                  Icono asociado*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-secondary-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary sm:max-w-md">
                    <select
                      name="categorurl"
                      id="categoryurl"
                      autoComplete="name"
                      className="block grow border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      value={caracteristicaEdit && editCharacteristic.icono}
                      onChange={(e) => {caracteristicaEdit ? setEditCharacteristic({...editCharacteristic, icono: `<span className="material-symbols-outlined">${e.target.value}</span>`}) : setBodyCh({...bodyCh, icono: `<span className="material-symbols-outlined">${e.target.value}</span>`})}}
                    >
                        <option disabled selected>Elegí un ícono</option>
                        <option className="material-symbols-outlined">tooltip</option>
                        <option className="material-symbols-outlined">map</option>
                        <option className="material-symbols-outlined">restaurant</option>
                        <option className="material-symbols-outlined">hiking</option>
                        <option className="material-symbols-outlined">directions_bus</option>
                        <option className="material-symbols-outlined">family_restroom</option>
                        <option className="material-symbols-outlined">tour</option>
                        <option className="material-symbols-outlined">health_and_safety</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="rounded-md bg-tertiary px-3 py-2 text-sm font-semibold text-color-text-dark shadow-sm hover:bg-tertiary-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Guardar
                </button>
              </div>
            </form>
)}