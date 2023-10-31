import React, { useState } from 'react'
import { useAdventure } from '../../utils/ctx/adventure.ctx'
import { useUser } from '../../utils/ctx/user.ctx'
import PoliciesList from '../PoliciesList'

const PolicyForm = ({politicaEdit}) => {

    const { dispatch } = useAdventure()
    const { state: stateUser } = useUser()
    const { session } = stateUser

    const token = session.jwt

    const auth = {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }

    const [newPolicy, setNewPolicy] = useState({
        titulo: "",
        descripcion: ""
      })

    const [editPolicy, setEditPolicy] = useState(politicaEdit)


    const handleSubmitPolicy = (e) => {
      e.preventDefault()
      
      if(politicaEdit){
        dispatch("EDIT_POLICY", {id: editPolicy.id, policy: editPolicy, auth: auth})
      }
      else{
        dispatch("ADD_POLICY", {policy: newPolicy, auth: auth})
      }
    }

    return (
        <form className="mt-8 flex flex-col grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6" onSubmit={handleSubmitPolicy}>
              <div className="sm:col-span-4">
                <label htmlFor="policyname" className="block text-sm font-medium leading-6 text-gray-900">
                  Título de la Política*
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-secondary-600 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary sm:max-w-md">
                    <input
                      type="text"
                      name="policyname"
                      id="policyname"
                      autoComplete="name"
                      value={politicaEdit && editPolicy.titulo}
                      onChange={(e) => {politicaEdit ? setEditPolicy({...editPolicy, titulo: e.target.value}) : setNewPolicy({...newPolicy, titulo: e.target.value})}}
                      className="block grow border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      
                    />
                  </div>
                </div>
              </div>
              <div className="col-span-full">
                <label htmlFor="policydescription" className="block text-sm font-medium leading-6 text-gray-900">
                  Descripción*
                </label>
                <div className="mt-2">
                  <textarea
                    id="policydescription"
                    name="policydescription"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-secondary-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6"
                    value={politicaEdit && editPolicy.descripcion}
                    onChange={(e) => {politicaEdit ? setEditPolicy({...editPolicy, descripcion: e.target.value}) : setNewPolicy({...newPolicy, descripcion: e.target.value})}}
                  />
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
  )
}

export default PolicyForm